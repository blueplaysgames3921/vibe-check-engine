import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();
    const apiKey = process.env.POLLINATIONS_API_KEY;

    // Direct endpoint with the model in the payload
    const response = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { 
            role: "system", 
            content: "You are a viral strategist. Output ONLY a raw JSON object with keys: hook, body, imagePrompt. No markdown." 
          },
          { role: "user", content: `Topic: ${topic}` }
        ],
        model: "nova-fast", // Hardcoded for stability
        jsonMode: true
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: `API Error: ${response.status}` }, { status: response.status });
    }

    const data = await response.json();
    
    // Pollinations returns the text directly or in an OpenAI choice object
    let content = data.choices ? data.choices[0].message.content : data;

    if (typeof content === "string") {
      content = JSON.parse(content.replace(/```json|```/g, "").trim());
    }

    return NextResponse.json(content);
  } catch (error: any) {
    console.error("Build error:", error.message);
    return NextResponse.json({ error: "Check console logs" }, { status: 500 });
  }
}
