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
      if (!response.ok) throw new Error(result.error);
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
      
      <div className="pt-40 pb-24 px-8 md:px-20 max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
        <div>
          <h1 className="text-[18vw] lg:text-[12rem] font-brutal leading-[0.7] tracking-tightest text-white uppercase italic">
            Vibe<br/><span className="text-white/10">Engine</span>
          </h1>
        </div>
        
        <div className="space-y-8">
          <p className="text-3xl md:text-4xl max-w-lg text-zinc-500 font-serif lowercase">
            High-retention architectural scripts. generated via gemini-flash logic.
          </p>
          <InputForm onGenerate={generateContent} isLoading={loading} />
        </div>
      </div>

      <ResultCard data={data} />
    </main>
  );
}
