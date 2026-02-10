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
    <main className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 flex flex-col items-center">
        <div className="mb-12 flex flex-col items-center">
           <h1 className="text-[14vw] md:text-[10rem] font-black leading-[0.75] tracking-tighter text-white uppercase text-center">
             Vibe<br/><span className="text-zinc-800">Engine</span>
           </h1>
        </div>

        <div className="w-full max-w-2xl relative">
          <div className="absolute -inset-4 bg-purple-500/10 blur-3xl rounded-full opacity-50"></div>
          <InputForm onGenerate={generateContent} isLoading={loading} />
        </div>
      </div>

      {error && (
        <div className="max-w-xl mx-auto mb-12 px-4">
          <div className="border border-red-500/20 bg-red-500/5 p-4 rounded-xl text-red-500 text-[10px] font-black uppercase tracking-widest text-center">
            {error}
          </div>
        </div>
      )}

      <ResultCard data={data} />
      
      {/* Technical Footer Decoration */}
      <div className="fixed bottom-8 left-8 hidden lg:block">
         <p className="text-[10px] text-zinc-600 font-mono tracking-widest uppercase rotate-90 origin-left">
           Status: Optimal // Node: Gemini-Flash
         </p>
      </div>
    </main>
  );
}
