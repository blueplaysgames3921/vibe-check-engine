"use client";
import { useState } from "react";
import Header from "@/components/Header";
import InputForm from "@/components/InputForm";
import ResultCard from "@/components/ResultCard";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generateContent(topic: string) {
    setLoading(true);
    setData(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ topic }),
      });
      const result = await res.json();
      setData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center relative">
      {/* Texture Layer */}
      <div className="noise-overlay" />
      
      <Header />
      
      <div className="w-full max-w-7xl px-6 pt-48 pb-20 relative z-10 text-center">
        {/* MASSIVE BRANDING */}
        <div className="mb-20 select-none">
          <h1 className="text-[14vw] md:text-[180px] font-[family-name:var(--font-archivo)] leading-[0.75] tracking-tighter uppercase italic">
            <span className="text-chrome block">VIBE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 opacity-90 drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              ENGINE
            </span>
          </h1>
          <p className="mt-8 text-zinc-500 font-[family-name:var(--font-instrument)] text-xl md:text-2xl italic tracking-widest opacity-60">
            HIGH_FIDELITY_CONTENT_TERMINAL
          </p>
        </div>

        {/* INPUT SECTION */}
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

      {/* RESULT SECTION */}
      <div className="w-full relative z-10 pb-40">
        <ResultCard data={data} />
      </div>

      <footer className="py-10 opacity-10 text-[9px] font-mono tracking-[1.5em] uppercase pointer-events-none">
        System_Status // Operational_v1.0.4
      </footer>
    </main>
  );
}
