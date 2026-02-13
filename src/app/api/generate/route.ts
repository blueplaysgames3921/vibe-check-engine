import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    const system = `You are a High-End Creative Director. Output ONLY raw JSON. 
Structure:
{
  "hook": "Aggressive high-stakes curiosity gap (max 10 words)",
  "body": "3 cinematic sentences with elite vocabulary and heavy impact.",
  "imagePrompt": "Cinematic photography, [Subject], hyper-detailed, 8k, moody lighting, shot on 35mm, high contrast, professional color grade, anamorphic lens flares."
}
RULES: No slang. No cringe. No markdown backticks.`;

    const prompt = encodeURIComponent(`${system} Topic: ${topic}`);
    // We use a timeout signal to prevent the function from hanging and crashing Vercel
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const url = `https://text.pollinations.ai/gemini-fast/${prompt}?json=true&seed=${Math.floor(Math.random() * 999999)}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Referer": "https://vibe-check-engine.vercel.app" },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json({ error: "Upstream_Fault" }, { status: 502 });
    }

    const text = await response.text();
    
    // SAFE PARSING LOGIC
    try {
      // Clean potential markdown and whitespace
      const cleaned = text.replace(/```json|```/g, "").trim();
      const result = JSON.parse(cleaned);

      // Validate the object has the keys we need
      if (!result.hook || !result.body) throw new Error("Incomplete_JSON");

      return NextResponse.json(result);
    } catch (parseError) {
      console.error("JSON_PARSE_FAILED:", text);
      return NextResponse.json({ error: "Invalid_Response_Format" }, { status: 422 });
    }

  } catch (error: any) {
    console.error("CRITICAL_API_FAULT:", error);
    // If it was a timeout/abort, return 504
    const status = error.name === 'AbortError' ? 504 : 500;
    return NextResponse.json({ error: "System_Fault" }, { status });
  }
}
