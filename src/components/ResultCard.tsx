"use client";

import React from 'react';
import Image from 'next/image';

export default function ResultCard({ data }: { data: any }) {
  if (!data) return null;

  const seed = React.useMemo(() => Math.floor(Math.random() * 999999), [data]);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(data.imagePrompt)}?model=flux&width=1080&height=1350&nologo=true&seed=${seed}`;

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-20">
      <div className="glass-reflection bg-[#050505] rounded-[2rem] overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
        
        <div className="relative w-full lg:w-1/2 aspect-[4/5] lg:aspect-auto overflow-hidden">
          <Image
            src={imageUrl}
            alt="Cinematic"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
        </div>

        <div className="w-full lg:w-1/2 p-12 lg:p-24 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/5">
          <div className="space-y-16">
            <div className="space-y-4">
              <div className="flex items-center gap-2 opacity-30">
                <span className="text-[10px] font-mono uppercase tracking-[0.5em]">Sequence_01</span>
              </div>
              <h3 className="text-5xl lg:text-7xl font-brutal leading-[0.85] text-white italic">
                {data.hook}
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 opacity-30">
                <span className="text-[10px] font-mono uppercase tracking-[0.5em]">Narrative_Log</span>
              </div>
              <p className="text-zinc-400 text-2xl lg:text-4xl font-serif leading-[1.1]">
                {data.body}
              </p>
            </div>
          </div>

          <button 
            onClick={() => navigator.clipboard.writeText(`${data.hook}\n\n${data.body}`)}
            className="mt-12 w-full h-20 bg-white text-black font-brutal text-[11px] uppercase tracking-[0.4em] hover:bg-zinc-200 transition-colors active:scale-[0.98]"
          >
            Copy Artifact
          </button>
        </div>
      </div>
    </div>
  );
}
