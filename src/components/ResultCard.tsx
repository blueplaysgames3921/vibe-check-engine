"use client";
import { useState, useRef } from "react";
import Header from "@/components/Header";
import InputForm from "@/components/InputForm";
import ResultCard from "@/components/ResultCard";

interface VibeData {
  hook: string;
  body: string;
  imagePrompt: string;
  isFallback?: boolean;
}

export default function Home() {
  const [data, setData] = useState<VibeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Operational_v1.0.4");
  const resultRef = useRef<HTMLDivElement>(null);

  const dummyData: VibeData = {
    hook: "SIGNAL_LOST_RECOVERY",
    body: "The central intelligence uplink is offline (Error 1033). Displaying localized system artifact for terminal validation.",
    imagePrompt: "brutalist obsidian monolith, cinematic purple lightning, fog, hyper-realistic",
    isFallback: true
  };

  async function generateContent(topic: string) {
    setLoading(true);
    setData(null); // Clear previous to prevent UI mismatch
    setStatus("SYNTHESIZING_CORE...");
    
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      // 3. THE SHIELD: If status is not 200, stop immediately and use fallback
      if (!res.ok) {
        throw new Error(`API_REJECTED_WITH_STATUS_${res.status}`);
      }

      const result = await res.json();
      
      // 4. Validate object keys before setting state
      if (!result.hook) throw new Error("MALFORMED_DATA");

      setData(result);
      setStatus("CORE_STABLE");
      
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);

    } catch (e) {
      console.error("Frontend Safety Net Triggered:", e);
      // FORCE DUMMY DATA INSTEAD OF CRASHING
      setData(dummyData);
      setStatus("NODE_OFFLINE_FALLBACK_ACTIVE");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden bg-black">
      <div className="noise-overlay" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-600/10 blur-[140px] rounded-full pointer-events-none animate-pulse" />

      <Header />
      
      <div className="w-full max-w-7xl px-6 pt-48 pb-20 relative z-10 text-center">
        <div className="mb-20 select-none">
          <h1 className="text-[14vw] md:text-[180px] font-[family-name:var(--font-archivo)] leading-[0.75] tracking-tighter uppercase italic">
            <span className="text-chrome block text-white">VIBE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 opacity-90 drop-shadow-[0_0_40px_rgba(139,92,246,0.4)]">
              ENGINE
            </span>
          </h1>
          <p className="mt-8 text-zinc-500 font-[family-name:var(--font-instrument)] text-xl md:text-2xl italic tracking-[0.3em] opacity-40 uppercase">
            {loading ? "Reconfiguring_Vibe..." : "High_Fidelity_Content_Terminal"}
          </p>
        </div>

        <div className="max-w-2xl mx-auto relative group">
          <InputForm onGenerate={generateContent} isLoading={loading} />
        </div>
      </div>

      <div ref={resultRef} className="w-full relative z-10 pb-40 min-h-[50vh]">
        <ResultCard data={data} />
      </div>

      <footer className="fixed bottom-0 w-full bg-black/80 backdrop-blur-lg border-t border-white/5 py-4 px-8 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${status.includes("OFFLINE") ? "bg-red-500 animate-ping" : "bg-emerald-500 animate-pulse"}`} />
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
            {status}
          </span>
        </div>
        <div className="text-[9px] font-mono tracking-[1em] text-zinc-700 uppercase hidden md:block">
          Infrastructure_P_V1
        </div>
      </footer>
    </main>
  );
}
