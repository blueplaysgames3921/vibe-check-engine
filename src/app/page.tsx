"use client";
import { useState } from "react";
import Header from "@/components/Header";
import InputForm from "@/components/InputForm";
import ResultCard from "@/components/ResultCard";

// Define the shape of our data so TypeScript stays happy
interface VibeData {
  hook: string;
  body: string;
  imagePrompt: string;
}

export default function Home() {
  // FIX: We tell useState it can be <VibeData | null>
  const [data, setData] = useState<VibeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Operational_v1.0.4");

  const dummyData: VibeData = {
    hook: "SILICON_ARCH_V2",
    body: "System latency detected in Pollinations Node. Deploying architectural fallback sequence for UI validation.",
    imagePrompt: "cinematic brutalist monolith, deep purple atmospheric lighting, rain, high contrast"
  };

  async function generateContent(topic: string) {
    setLoading(true);
    setData(null);
    setStatus("SYNTHESIZING...");
    
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ topic }),
      });

      if (!res.ok) throw new Error("API_OFFLINE");

      const result = await res.json();
      setData(result);
      setStatus("Operational_v1.0.4");
    } catch (e) {
      console.error("Connection Error:", e);
      setData(dummyData); // Now this works!
      setStatus("NODE_OFFLINE_FALLBACK_ACTIVE");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden bg-black">
      {/* Dynamic Noise Layer */}
      <div className="noise-overlay" />
      
      {/* Subtle Background Glows - Adjusted for more "Premium" feel */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-600/10 blur-[140px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <Header />
      
      <div className="w-full max-w-7xl px-6 pt-48 pb-20 relative z-10 text-center">
        <div className="mb-20 select-none">
          <h1 className="text-[14vw] md:text-[180px] font-[family-name:var(--font-archivo)] leading-[0.75] tracking-tighter uppercase italic">
            <span className="text-chrome block text-white">VIBE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 opacity-90 drop-shadow-[0_0_40px_rgba(139,92,246,0.4)]">
              ENGINE
            </span>
          </h1>
          <p className="mt-8 text-zinc-500 font-[family-name:var(--font-instrument)] text-xl md:text-2xl italic tracking-[0.3em] opacity-40 uppercase">
            {loading ? "Reconfiguring_Vibe..." : "High_Fidelity_Content_Terminal"}
          </p>
        </div>

        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-1000" />
          <InputForm onGenerate={generateContent} isLoading={loading} />
        </div>
      </div>

      <div className="w-full relative z-10 pb-40">
        <ResultCard data={data} />
      </div>

      <footer className="py-10 text-[9px] font-mono tracking-[1.5em] uppercase pointer-events-none">
        <span className={status.includes("OFFLINE") ? "text-red-500 animate-pulse opacity-100" : "text-white opacity-20"}>
          System_Status // {status}
        </span>
      </footer>
    </main>
  );
}
