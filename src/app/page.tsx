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
    <main className="min-h-screen bg-black flex flex-col items-center">
      <Header />
      <div className="w-full max-w-7xl px-6 pt-32 pb-20">
        <h1 className="text-[12vw] md:text-[150px] font-[family-name:var(--font-archivo)] leading-[0.8] tracking-tighter uppercase italic text-white text-center mb-20">
          VIBE <span className="text-zinc-800">ENGINE</span>
        </h1>
        <div className="max-w-2xl mx-auto">
          <InputForm onGenerate={generateContent} isLoading={loading} />
        </div>
      </div>
      <ResultCard data={data} />
    </main>
  );
}
