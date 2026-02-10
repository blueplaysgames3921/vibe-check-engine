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
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(data.imagePrompt)}?model=${IMAGE_MODEL}&width=1080&height=1080&nologo=true&seed=${seed}`;

  return (
    <div className="w-full max-w-lg mx-auto p-4 mt-8 relative">
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col relative">
        
        <div className="relative w-full h-[300px] min-h-[300px] max-h-[300px] overflow-hidden bg-zinc-950">
          <Image
            src={imageUrl}
            alt="Visual"
            fill
            sizes="(max-width: 768px) 100vw, 512px"
            style={{ objectFit: 'cover' }}
            unoptimized
            priority
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-0 p-6 w-full z-10">
            <span className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm mb-2 inline-block">
              Hook
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white leading-tight italic">
              "{data.hook}"
            </h3>
          </div>
        </div>
        
        <div className="p-6 bg-zinc-900 relative z-20">
          <div className="space-y-4">
            <div>
              <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Script</h4>
              <p className="text-zinc-200 text-base leading-snug font-medium">
                {data.body}
              </p>
            </div>
            
            <div className="pt-2">
              <button 
                onClick={() => navigator.clipboard.writeText(`${data.hook}\n\n${data.body}`)}
                className="w-full py-3 bg-zinc-100 hover:bg-white text-black font-bold rounded-xl transition-all active:scale-[0.98]"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
