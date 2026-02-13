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
    
    // 1. Timeout protection: kill the request if it takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const url = `https://text.pollinations.ai/gemini-fast/${prompt}?json=true&seed=${Math.floor(Math.random() * 999999)}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Referer": "https://vibe-check-engine.vercel.app" },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json({ error: "Upstream_API_Failure" }, { status: 502 });
    }

    const text = await response.text();
    
    // 2. SAFE PARSE: This prevents the Vercel 500 crash
    try {
      const cleaned = text.replace(/```json|```/g, "").trim();
      const result = JSON.parse(cleaned);

      if (!result.hook || !result.body) throw new Error("Incomplete_JSON");

      return NextResponse.json(result);
    } catch (parseError) {
      console.error("JSON_PARSE_FAILED. Raw output was:", text);
      // Return 422 so frontend knows it's not valid JSON
      return NextResponse.json({ error: "Invalid_Format" }, { status: 422 });
    }

  } catch (error: any) {
    console.error("CRITICAL_API_FAULT:", error);
    const status = error.name === 'AbortError' ? 504 : 500;
    return NextResponse.json({ error: "Internal_Server_Error" }, { status });
  }
}
