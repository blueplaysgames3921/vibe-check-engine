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
      <div className="noise-overlay" />
      
      <Header />
      
      <div className="w-full max-w-7xl px-6 pt-48 pb-20 relative z-10 text-center">
        {/* TITANIC TYPOGRAPHY */}
        <h1 className="text-[14vw] md:text-[180px] font-[family-name:var(--font-archivo)] leading-[0.75] tracking-tighter uppercase italic mb-16">
          <span className="text-chrome block">VIBE</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-purple-800 opacity-90">
            ENGINE
          </span>
        </h1>

        <div className="max-w-2xl mx-auto relative group">
          {/* Subtle purple glow behind input */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-1000" />
          <InputForm onGenerate={generateContent} isLoading={loading} />
        </div>

        <p className="mt-8 text-zinc-600 font-[family-name:var(--font-instrument)] text-xl italic">
          Try "Hyper-dimensional luxury" or "Techno-brutalist architecture"
        </p>
      </div>

      <div className="w-full relative z-10 pb-40">
        <ResultCard data={data} />
      </div>

      {/* FOOTER TERMINAL STYLE */}
      <footer className="py-10 opacity-20 text-[10px] font-mono tracking-[1em] uppercase">
        Engine_Status // Nominal_v1.0
      </footer>
    </main>
  );
}
