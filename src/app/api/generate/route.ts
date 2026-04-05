import { NextRequest, NextResponse } from "next/server";
import { GEN_BASE_URL, TEXT_MODEL, IMAGE_MODEL, SYSTEM_PROMPT } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    // Timeout to prevent Vercel from hanging and throwing a generic 504
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(`${GEN_BASE_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Fix: was single-quoted string literal — env var was never interpolated.
        // Must use backtick template literal so the value is substituted at runtime.
        Authorization: `Bearer ${process.env.POLLINATIONS_KEY}`,
      },
      body: JSON.stringify({
        model: TEXT_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Topic: ${topic}` },
        ],
        seed: Math.floor(Math.random() * 999999),
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json({ error: "UPSTREAM_SERVICE_DOWN" }, { status: 502 });
    }

    try {
      const envelope = await response.json();
      const raw = envelope?.choices?.[0]?.message?.content;

      if (!raw) throw new Error("EMPTY_CHOICES");

      const result = JSON.parse(raw);

      if (!result.hook || !result.body || !result.imagePrompt) {
        throw new Error("INCOMPLETE_DATA");
      }

      // The image endpoint must be fetched with the Bearer token.
      // The response body is the actual image URL string — not the image itself.
      const seed = Math.floor(Math.random() * 999999);
      const imageEndpoint = `${GEN_BASE_URL}/image/${encodeURIComponent(result.imagePrompt)}?model=${IMAGE_MODEL}&width=1000&height=1250&nologo=true&seed=${seed}`;

      const imageRes = await fetch(imageEndpoint, {
        headers: { Authorization: `Bearer ${process.env.POLLINATIONS_KEY}` },
      });

      if (!imageRes.ok) {
        return NextResponse.json({ error: "IMAGE_UPSTREAM_FAILED" }, { status: 502 });
      }

      const imageUrl = (await imageRes.text()).trim();

      return NextResponse.json({ ...result, imageUrl });
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
