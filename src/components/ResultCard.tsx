"use client";

import React from 'react';
import Image from 'next/image';
import { IMAGE_MODEL } from '@/lib/constants';

export default function ResultCard({ data }: { data: any }) {
  if (!data) return null;

  const seed = React.useMemo(() => Math.floor(Math.random() * 999999), [data]);
  
  // Use flux for HD quality, avoid 'turbo' or 'nova' for better visuals
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(data.imagePrompt)}?model=flux&width=1080&height=1080&nologo=true&seed=${seed}`;

  return (
    <div className="w-full max-w-xl mx-auto p-4 mt-12 mb-20 animate-in fade-in zoom-in duration-700">
      <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_-20px_rgba(168,85,247,0.15)]">
        
        <div className="relative w-full aspect-square bg-zinc-950 overflow-hidden">
          <Image
            src={imageUrl}
            alt="AI Visual"
            width={1080}
            height={1080}
            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
          
          <div className="absolute bottom-0 p-8 w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">The Hook</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white leading-tight italic tracking-tight">
              "{data.hook}"
            </h3>
          </div>
        </div>
        
        <div className="p-8">
          <div className="space-y-6">
            <div>
              <h4 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Viral Script</h4>
              <p className="text-zinc-200 text-lg leading-relaxed font-medium">
                {data.body}
              </p>
            </div>
            
            <button 
              onClick={() => navigator.clipboard.writeText(`${data.hook}\n\n${data.body}`)}
              className="w-full py-4 bg-white hover:bg-zinc-200 text-black font-black rounded-2xl transition-all active:scale-[0.98] shadow-xl shadow-white/5"
            >
              Copy Script
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
