import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    const system = `You are a Psychological Content Strategist. 
Instructions:
1. "hook": Create a high-tension opening that forces the viewer to stop scrolling. No emojis.
2. "body": Write 3 rhythmic, hard-hitting sentences that explain the topic with authority.
3. "imagePrompt": Describe a cinematic, hyper-realistic scene. Keywords: [Subject], 8k, highly detailed, dramatic rim lighting, depth of field, 35mm lens, moody atmosphere, professional photography.

STRICT RULES:
- Return ONLY raw JSON.
- No markdown, no backticks, no conversational filler.
- Zero cringe, zero slang, zero "AI-style" introductions.

JSON Structure:
{
  "hook": "",
  "body": "",
  "imagePrompt": ""
}`;

    const prompt = encodeURIComponent(`${system} Topic: ${topic}`);
    const seed = Math.floor(Math.random() * 999999);
    
    // Using gemini-fast for better instruction following with JSON
    const url = `https://text.pollinations.ai/gemini-fast/${prompt}?json=true&seed=${seed}`;

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
    
    // Safety check for common AI markdown garbage
    const cleaned = text.replace(/```json|```/g, "").trim();
    const result = JSON.parse(cleaned);

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: "API Parse Error" }, { status: 500 });
  }
}
