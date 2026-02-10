// src/app/page.tsx
"use client";

import { useState } from "react";
import Header from "@/components/Header";
import InputForm from "@/components/InputForm";
import ResultCard from "@/components/ResultCard";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateContent(topic: string) {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Generation failed");
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30 overflow-x-hidden font-sans">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      <Header />
      
      <div className="relative max-w-5xl mx-auto pt-24 pb-16 text-center px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          Engine Active
        </div>
        
        <h2 className="text-6xl md:text-8xl font-black tracking-tightest mb-8 leading-[0.85] bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20">
          VIBE <br /> ENGINE.
        </h2>
        
        <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
          Generate high-retention viral scripts and cinematic visuals in seconds.
        </p>
      </div>

      <div className="relative z-10 scale-110 mb-20">
        <InputForm onGenerate={generateContent} isLoading={loading} />
      </div>

      {error && (
        <div className="max-w-xl mx-auto mt-8 px-4">
          <div className="bg-red-500/5 border border-red-500/20 text-red-400 p-4 rounded-2xl text-center text-xs font-bold tracking-tight">
            {error}
          </div>
        </div>
      )}

      <ResultCard data={data} />
    </main>
  );
}
