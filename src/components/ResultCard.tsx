"use client";

import React from 'react';
import Image from 'next/image';

export default function ResultCard({ data }: { data: any }) {
  if (!data) return null;

  const seed = React.useMemo(() => Math.floor(Math.random() * 999999), [data]);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(data.imagePrompt)}?model=flux&width=1080&height=1440&nologo=true&seed=${seed}`;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-40">
      <div className="flex flex-col md:flex-row bg-[#080808] border border-white/[0.05] overflow-hidden rounded-[4rem]">
        
        
        <div className="relative w-full md:w-1/2 h-[600px] md:h-auto overflow-hidden">
          <Image
            src={imageUrl}
            alt="Cinematic Visual"
            fill
            className="object-cover transition-transform duration-[10s] hover:scale-110"
            unoptimized
            priority
          />
        </div>

        <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-between">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-white/20 text-[10px] font-brutal uppercase tracking-[0.5em] block">Phase 01 // Hook</span>
              <h3 className="text-4xl md:text-6xl font-brutal text-white leading-[0.85] italic lowercase">
                {data.hook}
              </h3>
            </div>

            <div className="space-y-4">
              <span className="text-white/20 text-[10px] font-brutal uppercase tracking-[0.5em] block">Phase 02 // Narrative</span>
              <p className="text-zinc-400 text-2xl md:text-3xl font-serif leading-tight">
                {data.body}
              </p>
            </div>
          </div>

          <div className="mt-16">
            <button 
              onClick={() => navigator.clipboard.writeText(`${data.hook}\n\n${data.body}`)}
              className="w-full group relative overflow-hidden py-8 bg-white text-black text-[11px] font-brutal uppercase tracking-[0.4em] transition-all hover:bg-zinc-200"
            >
              <span className="relative z-10">Export Script</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
