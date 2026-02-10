"use client";

import React from 'react';
import Image from 'next/image';
import { IMAGE_MODEL } from '@/lib/constants';

interface ResultCardProps {
  data: {
    hook: string;
    body: string;
    imagePrompt: string;
  } | null;
}

export default function ResultCard({ data }: ResultCardProps) {
  if (!data) return null;

  const seed = React.useMemo(() => Math.floor(Math.random() * 999999), [data]);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(data.imagePrompt)}?model=${IMAGE_MODEL}&width=1080&height=1350&nologo=true&seed=${seed}`;

  return (
    <div className="w-full max-w-xl mx-auto p-4 mt-8">
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col relative">
        
        {/* The Image Wrapper - MUST be relative and have a height/aspect */}
        <div className="relative w-full aspect-[4/5] bg-zinc-950 overflow-hidden">
          <Image
            src={imageUrl}
            alt="Cinematic Visual"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover transition-transform duration-1000"
            unoptimized
            priority
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          
          <div className="absolute bottom-0 p-8 w-full">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-sm">
                The Hook
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-[1.1] tracking-tight italic">
              "{data.hook}"
            </h3>
          </div>
        </div>
        
        <div className="p-8 bg-zinc-900">
          <div className="space-y-4">
            <div>
              <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">Narrative Script</h4>
              <p className="text-zinc-200 text-lg leading-relaxed font-medium">
                {data.body}
              </p>
            </div>
            
            <div className="pt-6">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`${data.hook}\n\n${data.body}`);
                  alert("Copied!");
                }}
                className="w-full py-4 bg-zinc-100 hover:bg-white text-black font-bold rounded-2xl transition-all active:scale-[0.98]"
              >
                Copy Viral Script
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
