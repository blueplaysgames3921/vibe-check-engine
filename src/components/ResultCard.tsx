"use client";

import React from 'react';
import Image from 'next/image';

export default function ResultCard({ data }: { data: any }) {
  if (!data) return null;

  const seed = React.useMemo(() => Math.floor(Math.random() * 999999), [data]);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(data.imagePrompt)}?model=flux&width=1080&height=1350&nologo=true&seed=${seed}`;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-24 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="relative group bg-[#0A0A0A] border border-white/[0.08] rounded-[3rem] p-3 shadow-2xl">
        
        {/* Visual Header */}
        <div className="relative w-full aspect-[4/5] rounded-[2.2rem] overflow-hidden">
          <Image
            src={imageUrl}
            alt="AI Visual"
            fill
            className="object-cover transition-transform duration-[5s] group-hover:scale-110"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
             <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] w-8 bg-purple-500"></div>
                <span className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.4em]">Viral Concept</span>
             </div>
             <h3 className="text-3xl md:text-5xl font-black text-white leading-[0.95] tracking-tighter uppercase italic">
               {data.hook}
             </h3>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-8 md:p-12">
          <div className="space-y-10">
            <div className="relative">
              <span className="absolute -left-4 top-0 h-full w-[1px] bg-white/10"></span>
              <p className="text-zinc-400 text-xl md:text-2xl leading-relaxed font-light font-serif italic">
                {data.body}
              </p>
            </div>
            
            <button 
              onClick={() => navigator.clipboard.writeText(`${data.hook}\n\n${data.body}`)}
              className="group relative w-full overflow-hidden py-6 bg-white text-black text-xs font-black uppercase tracking-[0.4em] rounded-2xl transition-all hover:invert active:scale-[0.98]"
            >
              <span className="relative z-10">Copy Script</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
