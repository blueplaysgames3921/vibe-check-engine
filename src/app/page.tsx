"use client";
import { useState } from "react";
import Header from "@/components/Header";
import InputForm from "@/components/InputForm";
import ResultCard from "@/components/ResultCard";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Operational_v1.0.4");

  // DUMMY RESPONSE: Used when Pollinations is down
  const dummyData = {
    hook: "OFFLINE_SYNTHESIS",
    body: "The central intelligence node (Pollinations) is currently unreachable. Displaying cached architectural protocols for system validation.",
    imagePrompt: "brutalist monolithic tower in a dark purple void, cinematic lighting, sharp edges"
  };

  async function generateContent(topic: string) {
    setLoading(true);
    setData(null);
    setStatus("Generating...");
    
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
      console.error("System Error:", e);
      // Fallback Logic
      setData(dummyData);
      setStatus("API_CONNECTION_INTERRUPTED_FALLBACK_ACTIVE");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center relative">
      <div className="noise-overlay" />
      <Header />
      
      <div className="w-full max-w-7xl px-6 pt-48 pb-20 relative z-10 text-center">
        <div className="mb-20 select-none">
          <h1 className="text-[14vw] md:text-[180px] font-[family-name:var(--font-archivo)] leading-[0.75] tracking-tighter uppercase italic">
            <span className="text-chrome block text-white">VIBE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 opacity-90 drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              ENGINE
            </span>
          </h1>
          <p className="mt-8 text-zinc-500 font-[family-name:var(--font-instrument)] text-xl md:text-2xl italic tracking-widest opacity-60 uppercase">
            {loading ? "Synthesizing..." : "High_Fidelity_Content_Terminal"}
          </p>
        </div>

        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-1000" />
          <InputForm onGenerate={generateContent} isLoading={loading} />
          
          <div className="mt-12 flex flex-col gap-2 opacity-30">
             <p className="text-[10px] font-mono tracking-[0.4em] text-white uppercase">Suggestions</p>
             <p className="text-sm font-[family-name:var(--font-instrument)] italic text-zinc-400">
               "Techno-brutalist architecture" • "Neo-tokyo street photography"
             </p>
          </div>
        </div>
      </div>

      <div className="w-full relative z-10 pb-40">
        <ResultCard data={data} />
      </div>

      {/* DYNAMIC FOOTER STATUS */}
      <footer className="py-10 text-[9px] font-mono tracking-[1.5em] uppercase pointer-events-none transition-colors duration-500">
        <span className={status.includes("OFFLINE") ? "text-red-500 opacity-100 animate-pulse" : "text-white opacity-10"}>
          System_Status // {status}
        </span>
      </footer>
    </main>
  );
}
