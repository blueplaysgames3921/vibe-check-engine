import { NextRequest, NextResponse } from "next/server";
import { TEXT_MODEL } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();
    const apiKey = process.env.POLLINATIONS_API_KEY;

    // Use a simpler prompt structure
    const prompt = `Topic: ${topic}. Return ONLY a JSON object with keys "hook", "body", and "imagePrompt". Do not include markdown code blocks.`;

    const response = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { "Authorization": `Bearer ${apiKey}` } : {})
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are a viral content creator. Output JSON only." },
          { role: "user", content: prompt }
        ],
        model: TEXT_MODEL,
        seed: Math.floor(Math.random() * 1000)
      }),
    });

    if (!response.ok) {
      const errDetail = await response.text();
      console.error("DEBUG:", errDetail);
      return NextResponse.json({ error: `API Refused: ${response.status}` }, { status: response.status });
    }

    const data = await response.json();
    let content = data.choices[0].message.content;

    // Clean potential markdown wrap if the AI includes it
    if (content.includes("```")) {
      content = content.replace(/```json|```/g, "").trim();
    }

    return NextResponse.json(JSON.parse(content));
  } catch (error: any) {
    return NextResponse.json({ error: "Parsing or Network Error" }, { status: 500 });
  }
}
