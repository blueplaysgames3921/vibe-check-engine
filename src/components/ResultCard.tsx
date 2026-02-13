"use client";

import React from 'react';
import Image from 'next/image';

export default function ResultCard({ data }: { data: any }) {
  if (!data) return null;

  const seed = React.useMemo(() => Math.floor(Math.random() * 999999), [data]);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(data.imagePrompt)}?model=flux&width=1080&height=1350&nologo=true&seed=${seed}`;

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-20">
      <div className="bg-[#050505] rounded-[2rem] overflow-hidden flex flex-col lg:flex-row min-h-[600px] border border-white/5 shadow-2xl">
        
        {/* LEFT PANEL: The Visual Artifact */}
        {/* We use h-[500px] lg:h-auto to ensure the container never has 0px height */}
        <div className="relative w-full lg:w-1/2 h-[500px] lg:min-h-[700px] bg-zinc-900">
          <Image
            src={imageUrl}
            alt="Cinematic Output"
            fill
            className="object-cover transition-opacity duration-1000"
            sizes="(max-width: 1024px) 100vw, 50vw"
            unoptimized
            priority
          />
          {/* Edge gradient to blend the image into the black UI */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
        </div>

        {/* RIGHT PANEL: The Typography */}
        <div className="w-full lg:w-1/2 p-12 lg:p-20 flex flex-col justify-between bg-zinc-950/30">
          <div className="space-y-16">
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/30 block">
                Sequence // 01
              </span>
              <h3 className="text-5xl lg:text-7xl font-brutal leading-[0.85] text-white italic tracking-tighter">
                {data.hook}
              </h3>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/30 block">
                Narrative // Log
              </span>
              <p className="text-zinc-300 text-2xl lg:text-4xl font-serif leading-[1.1] italic">
                {data.body}
              </p>
            </div>
          </div>

          <button 
            onClick={() => navigator.clipboard.writeText(`${data.hook}\n\n${data.body}`)}
            className="mt-12 w-full h-24 bg-white text-black font-brutal text-[11px] uppercase tracking-[0.4em] hover:bg-zinc-200 transition-all active:scale-95 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            Copy Artifact
          </button>
        </div>

      </div>
    </div>
  );
}
