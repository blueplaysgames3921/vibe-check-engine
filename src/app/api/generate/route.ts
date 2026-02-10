// src/app/api/generate/route.ts
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
    const url = `https://text.pollinations.ai/gemini-fast/${prompt}?json=true&seed=${Math.floor(Math.random() * 999999)}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Referer": "https://vibe-check-engine.vercel.app" }
    });

    if (!response.ok) return NextResponse.json({ error: "API Down" }, { status: 500 });

    const text = await response.text();
    const result = JSON.parse(text.replace(/```json|```/g, "").trim());

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Build Error" }, { status: 500 });
  }
}
