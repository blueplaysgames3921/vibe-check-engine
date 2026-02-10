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
    <main className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1a1a1a_0%,#050505_100%)] -z-10" />
      
      <Header />
      
      <div className="max-w-4xl mx-auto pt-20 pb-12 text-center px-4">
        <div className="inline-block px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 text-xs font-medium mb-6 animate-fade-in">
          v1.0 is now live
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-600">
          Make Anything Viral.
        </h2>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Turn dry topics into high-retention social media scripts with AI-generated cinematic visuals.
        </p>
      </div>

      <div className="relative z-10">
        <InputForm onGenerate={generateContent} isLoading={loading} />
      </div>

      {error && (
        <div className="max-w-xl mx-auto mt-8 px-4">
          <div className="bg-red-500/5 border border-red-500/20 text-red-400 p-4 rounded-2xl text-center text-sm font-medium">
            {error}
          </div>
        </div>
      )}

      <ResultCard data={data} />
    </main>
  );
}
