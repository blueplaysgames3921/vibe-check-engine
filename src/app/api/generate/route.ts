import { NextRequest, NextResponse } from "next/server";
import { TEXT_MODEL, SYSTEM_PROMPT, POLLINATIONS_BASE_URL } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: `Topic: ${topic}` }
    ];

    const response = await fetch(POLLINATIONS_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://vibe-check-engine.vercel.app",
      },
      body: JSON.stringify({
        messages,
        model: TEXT_MODEL,
        jsonMode: true,
        seed: Math.floor(Math.random() * 1000000)
      }),
    });

    const data = await response.json();
    
    let content = data.choices[0].message.content;
    
    if (typeof content === 'string') {
        content = JSON.parse(content);
    }

    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}

