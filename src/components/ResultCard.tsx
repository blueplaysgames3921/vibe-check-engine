// src/components/ResultCard.tsx
"use client";

import React from 'react';
import Image from 'next/image';

export default function ResultCard({ data }: { data: any }) {
  if (!data) return null;

  const seed = React.useMemo(() => Math.floor(Math.random() * 999999), [data]);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(data.imagePrompt)}?model=flux&width=1080&height=1350&nologo=true&seed=${seed}`;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 mt-12 mb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="group relative bg-[#0a0a0a] border border-zinc-800/50 rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="relative w-full aspect-[4/5] overflow-hidden">
          <Image
            src={imageUrl}
            alt="AI Visual"
            width={1080}
            height={1350}
            className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          
          <div className="absolute bottom-0 p-10 w-full">
            <div className="mb-6">
              <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Target Hook</span>
              <h3 className="text-3xl md:text-5xl font-black text-white leading-[0.9] tracking-tighter italic uppercase italic decoration-purple-500/50 underline-offset-8">
                {data.hook}
              </h3>
            </div>
          </div>
        </div>
        
        <div className="p-10 bg-[#0a0a0a]">
          <div className="space-y-8">
            <div className="p-8 bg-zinc-900/30 border border-zinc-800/50 rounded-[2rem]">
              <h4 className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-center">Script Blueprint</h4>
              <p className="text-zinc-100 text-xl leading-relaxed font-light text-center">
                {data.body}
              </p>
            </div>
            
            <button 
              onClick={() => navigator.clipboard.writeText(`${data.hook}\n\n${data.body}`)}
              className="w-full py-6 bg-white hover:bg-zinc-200 text-black text-xs font-black uppercase tracking-[0.3em] rounded-full transition-all active:scale-[0.97] shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)]"
            >
              Copy Blueprint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
