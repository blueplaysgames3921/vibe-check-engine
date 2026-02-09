import { NextRequest, NextResponse } from "next/server";
import { TEXT_MODEL, SYSTEM_PROMPT } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();
    const apiKey = process.env.POLLINATIONS_API_KEY || "";

    const response = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "User-Agent": "VibeCheckEngine/1.0",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: topic }
        ],
        model: TEXT_MODEL,
        jsonMode: true,
        seed: Math.floor(Math.random() * 1000000)
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Pollinations API Error:", errorText);
      return NextResponse.json({ error: "Pollinations API refused request" }, { status: response.status });
    }

    const data = await response.json();
    let content = data.choices[0].message.content;

    if (typeof content === "string") {
      content = JSON.parse(content);
    }

    return NextResponse.json(content);
  } catch (error: any) {
    console.error("Runtime Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
