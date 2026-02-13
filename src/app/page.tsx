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
    <main className="min-h-screen bg-[#020202] flex flex-col items-center relative overflow-hidden">
      {/* ATMOSPHERIC BACKGROUND ELEMENTS */}
      <div className="noise-overlay" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />

      <Header />
      
      <div className="w-full max-w-7xl px-6 pt-48 pb-20 relative z-10">
        {/* THE PREMIUM TITLE: Dual-tone with a chrome-style gradient */}
        <div className="text-center mb-24 select-none">
          <h1 className="text-[14vw] md:text-[180px] font-[family-name:var(--font-archivo)] leading-[0.75] tracking-tighter uppercase italic">
            <span className="block text-white">VIBE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-zinc-200 via-zinc-500 to-zinc-800 opacity-80">
              ENGINE
            </span>
          </h1>
          <p className="mt-8 text-zinc-500 font-[family-name:var(--font-instrument)] text-2xl md:text-3xl italic tracking-wide">
            High-fidelity architectural scripts.
          </p>
        </div>

        <div className="max-w-2xl mx-auto relative group">
          {/* Subtle glow behind the input when active */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-1000" />
          <InputForm onGenerate={generateContent} isLoading={loading} />
        </div>
      </div>

      <div className="w-full relative z-10">
        <ResultCard data={data} />
      </div>

      {/* FOOTER DECOR */}
      <div className="py-12 opacity-20 text-[10px] font-mono tracking-[1em] uppercase">
        Vibe_Engine_Terminal_v1.0
      </div>
    </main>
  );
}
