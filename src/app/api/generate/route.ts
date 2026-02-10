import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();
    
    // We encode the prompt directly into the URL to avoid the 404 body-parsing issues
    const systemInstruction = "You are a Gen-Z viral architect. Create a high-energy hook, a 3-sentence punchy script, and a cinematic image prompt. Return ONLY JSON.";
    const fullPrompt = encodeURIComponent(`${systemInstruction} Topic: ${topic}`);
    
    // Using the direct text path which is less likely to 404
    const url = `https://text.pollinations.ai/${fullPrompt}?model=nova-fast&json=true&seed=${Math.floor(Math.random() * 1000)}`;

    const response = await fetch(url, {
      method: "GET", // Changing to GET as it's more stable for the text-path endpoint
      headers: {
        "Referer": "https://vibe-check-engine.vercel.app",
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: `API Error: ${response.status}` }, { status: response.status });
    }

    const text = await response.text();
    
    // Clean up the response in case the AI added markdown backticks
    const cleanedText = text.replace(/```json|```/g, "").trim();
    const jsonResponse = JSON.parse(cleanedText);

    return NextResponse.json(jsonResponse);
  } catch (error: any) {
    return NextResponse.json({ error: "Build error or invalid JSON" }, { status: 500 });
  }
}
