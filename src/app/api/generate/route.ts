import { NextRequest, NextResponse } from "next/server";
import { TEXT_MODEL, SYSTEM_PROMPT, POLLINATIONS_BASE_URL } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const response = await fetch(POLLINATIONS_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Topic: ${topic}` }
        ],
        model: TEXT_MODEL,
        jsonMode: true,
        seed: Math.floor(Math.random() * 1000000)
      }),
    });

    const data = await response.json();
    let content = data.choices[0].message.content;

    // Safety check for JSON formatting
    if (typeof content === "string") {
      try {
        content = JSON.parse(content);
      } catch (e) {
        return NextResponse.json({ error: "AI returned invalid JSON. Try again." }, { status: 500 });
      }
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
