"use client";

import React from 'react';
import Image from 'next/image';
import { IMAGE_BASE_URL, IMAGE_MODEL } from '@/lib/constants';

interface ResultCardProps {
  data: {
    hook: string;
    body: string;
    imagePrompt: string;
  } | null;
}

export default function ResultCard({ data }: ResultCardProps) {
  if (!data) return null;

const seed = Math.floor(Math.random() * 999999);
const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(data.imagePrompt)}?model=${IMAGE_MODEL}&width=1080&height=1920&nologo=true&seed=${seed}`;


  return (
    <div className="w-full max-w-2xl mx-auto p-4 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="relative aspect-[4/5] w-full bg-zinc-800">
          <img
            src={imageUrl}
            alt="Generated content visual"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          <div className="absolute bottom-0 p-6 w-full">
            <span className="bg-purple-600 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded mb-3 inline-block">
              Viral Hook
            </span>
            <h3 className="text-xl font-bold text-white leading-tight mb-2 italic">
              "{data.hook}"
            </h3>
          </div>
        </div>
        
        <div className="p-6">
          <h4 className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-3">Script Body</h4>
          <p className="text-zinc-200 leading-relaxed">
            {data.body}
          </p>
          <div className="mt-6 pt-6 border-t border-zinc-800">
            <button 
              onClick={() => navigator.clipboard.writeText(`${data.hook}\n\n${data.body}`)}
              className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-colors"
            >
              Copy Script
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

