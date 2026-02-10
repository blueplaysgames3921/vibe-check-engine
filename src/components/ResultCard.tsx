"use client";

import React from 'react';
import Image from 'next/image';

export default function ResultCard({ data }: { data: any }) {
  if (!data) return null;

  const seed = React.useMemo(() => Math.floor(Math.random() * 999999), [data]);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(data.imagePrompt)}?model=flux&width=1080&height=1350&nologo=true&seed=${seed}`;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-24">
      <div className="relative bg-[#0A0A0A] border border-white/10 rounded-[3rem] p-3 shadow-2xl">
        <div className="relative w-full h-[500px] rounded-[2.2rem] overflow-hidden bg-zinc-950">
          <Image
            src={imageUrl}
            alt="AI Visual"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-12 w-full">
             <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] w-8 bg-purple-500"></div>
                <span className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.4em]">Viral Concept</span>
             </div>
             <h3 className="text-4xl font-brutal text-white leading-[0.9] italic">
               {data.hook}
             </h3>
          </div>
        </div>
        <div className="p-12">
          <div className="space-y-10">
            <div className="relative">
              <span className="absolute -left-4 top-0 h-full w-[1px] bg-white/10"></span>
              <p className="text-zinc-400 text-2xl font-serif italic">
                {data.body}
              </p>
            </div>
            <button 
              onClick={() => navigator.clipboard.writeText(`${data.hook}\n\n${data.body}`)}
              className="w-full py-6 bg-white text-black text-[10px] font-brutal uppercase tracking-[0.4em] rounded-2xl transition-all hover:bg-zinc-200 active:scale-95"
            >
              Copy Script
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
