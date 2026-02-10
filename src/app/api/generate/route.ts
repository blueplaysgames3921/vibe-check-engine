import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    // High-energy Gen-Z system instructions
    const system = "Expert content strategist. Output ONLY a JSON object with: 'hook' (shocking opening), 'body' (3 punchy sentences), 'imagePrompt' (a high-quality, cinematic, hyper-realistic description for an image generator). No conversational filler.";
    
    // Formatting the prompt for the URL path
    const prompt = encodeURIComponent(`${system} Topic: ${topic}`);
    
    // Seed makes the result unique every time
    const seed = Math.floor(Math.random() * 999999);
    
    // Correct URL Structure: /model/prompt?json=true&seed=123
    const url = `https://text.pollinations.ai/nova-fast/${prompt}?json=true&seed=${seed}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Referer": "https://vibe-check-engine.vercel.app",
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: `API Error: ${response.status}` }, { status: response.status });
    }

    const text = await response.text();
    
    // Clean and Parse
    const cleaned = text.replace(/```json|```/g, "").trim();
    const result = JSON.parse(cleaned);

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: "Check model path or JSON" }, { status: 500 });
  }
}
