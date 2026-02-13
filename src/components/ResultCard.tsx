"use client";
import React from 'react';
import Image from 'next/image';

export default function ResultCard({ data }: { data: any }) {
  if (!data) return null;

  const seed = React.useMemo(() => Math.floor(Math.random() * 999999), [data]);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(data.imagePrompt)}?model=flux&width=1000&height=1250&nologo=true&seed=${seed}`;

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="premium-card rounded-[3rem] overflow-hidden flex flex-col lg:grid lg:grid-cols-12 min-h-[750px]">
        
        {/* IMAGE SIDE */}
        <div className="lg:col-span-5 relative h-[500px] lg:h-auto overflow-hidden bg-zinc-900">
          <Image
            src={imageUrl}
            alt="Generated Artifact"
            fill
            className="object-cover transition-transform duration-[15s] hover:scale-110"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-900/5 to-transparent" />
        </div>

        {/* CONTENT SIDE */}
        <div className="lg:col-span-7 p-12 lg:p-24 flex flex-col justify-between">
          <div className="space-y-16">
            <div>
              <span className="text-purple-500/50 text-[10px] font-mono tracking-[0.6em] mb-4 block uppercase italic">Log_01 // Hook</span>
              <h3 className="text-5xl lg:text-8xl font-[family-name:var(--font-archivo)] leading-[0.85] italic text-chrome">
                {data.hook}
              </h3>
            </div>

            <div>
              <span className="text-blue-500/50 text-[10px] font-mono tracking-[0.6em] mb-4 block uppercase italic">Log_02 // Narrative</span>
              <p className="text-2xl lg:text-4xl font-[family-name:var(--font-instrument)] text-zinc-400 leading-tight italic">
                {data.body}
              </p>
            </div>
          </div>

          <button 
            onClick={() => navigator.clipboard.writeText(`${data.hook}\n\n${data.body}`)}
            className="group relative w-full h-24 mt-16 bg-white rounded-2xl overflow-hidden transition-all active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 text-black font-[family-name:var(--font-archivo)] text-[11px] uppercase tracking-[0.5em] group-hover:text-white transition-colors">
              Copy Artifact
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
