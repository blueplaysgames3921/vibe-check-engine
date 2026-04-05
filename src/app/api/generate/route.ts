import { NextRequest, NextResponse } from "next/server";
import { GEN_BASE_URL, TEXT_MODEL, SYSTEM_PROMPT } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    // Timeout to prevent Vercel from hanging and throwing a generic 504
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    // Bug fixes applied:
    // 1. Correct domain: gen.pollinations.ai (not text.pollinations.ai — old/wrong)
    // 2. Correct method: POST to /v1/chat/completions (not GET with model in URL path)
    // 3. Correct request shape: OpenAI-compatible messages array with system + user roles
    // 4. response_format: json_object ensures structured output without markdown fences
    // 5. System prompt passed as a proper system message (not concatenated into the URL)
    const response = await fetch(`${GEN_BASE_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ${process.env.POLLINATIONS_KEY}'
      },
      body: JSON.stringify({
        model: TEXT_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Topic: ${topic}` },
        ],
        seed: Math.floor(Math.random() * 999999),
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json({ error: "UPSTREAM_SERVICE_DOWN" }, { status: 502 });
    }

    // Bug fix: /v1/chat/completions returns an OpenAI-compatible envelope.
    // The actual JSON string lives at choices[0].message.content — not the response root.
    // Old code did response.text() + JSON.parse(cleaned) which would get the outer envelope
    // and find no .hook/.body at the top level, causing a guaranteed 422 every time.
    try {
      const envelope = await response.json();
      const raw = envelope?.choices?.[0]?.message?.content;

      if (!raw) throw new Error("EMPTY_CHOICES");

      const result = JSON.parse(raw);

      // Bug fix: validate all three required fields, not just hook
      if (!result.hook || !result.body || !result.imagePrompt) {
        throw new Error("INCOMPLETE_DATA");
      }

      return NextResponse.json(result);
    } catch (parseError) {
      console.error("PARSING_ERROR:", parseError);
      return NextResponse.json({ error: "MALFORMED_AI_RESPONSE" }, { status: 422 });
    }

  } catch (error: any) {
    console.error("CRITICAL_FAULT:", error);
    const status = error.name === "AbortError" ? 504 : 500;
    return NextResponse.json({ error: "SYSTEM_FAILURE" }, { status });
  }
}
