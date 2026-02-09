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
    <main className="min-h-screen pb-20">
      <Header />
      
      <div className="max-w-4xl mx-auto pt-12 text-center px-4">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
          Make Anything Viral.
        </h2>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto">
          Turn dry topics into high-retention social media scripts with AI-generated cinematic visuals.
        </p>
      </div>

      <InputForm onGenerate={generateContent} isLoading={loading} />

      {error && (
        <div className="max-w-2xl mx-auto mt-6 px-4">
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center text-sm">
            {error}
          </div>
        </div>
      )}

      <ResultCard data={data} />
    </main>
  );
}

