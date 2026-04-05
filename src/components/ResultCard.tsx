"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { VibeData } from '@/lib/types';
import { GEN_BASE_URL, IMAGE_MODEL } from '@/lib/constants';

export default function ResultCard({ data }: { data: VibeData | null }) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!data) return null;

  // Fix: process.env vars (without NEXT_PUBLIC_ prefix) are server-only and are
  // undefined in "use client" components. The API route now builds the authenticated
  // image URL on the server and returns it as `imageUrl` in the JSON response.
  // Fall back to a keyless URL for the isFallback/demo case.
  const imageUrl = data.imageUrl
    ?? `${GEN_BASE_URL}/image/${encodeURIComponent(data.imagePrompt || "brutalist design")}?model=${IMAGE_MODEL}&width=1000&height=1250&nologo=true`;

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      
      {data.isFallback && (
        <div className="flex items-center gap-3 mb-8 ml-4 font-mono text-[10px] tracking-[0.4em] text-amber-500/60 uppercase italic">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
          Uplink Failure: Displaying Emergency Cache
        </div>
      )}

      <div className="premium-card rounded-[3rem] overflow-hidden flex flex-col lg:grid lg:grid-cols-12 min-h-[750px] bg-zinc-950 border border-white/5">
        {/* IMAGE SIDE */}
        <div className="lg:col-span-5 relative h-[500px] lg:h-auto overflow-hidden bg-zinc-900">
          <Image
            src={imageUrl}
            alt="Artifact"
            fill
            className={`object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            unoptimized
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        {/* CONTENT SIDE */}
        <div className="lg:col-span-7 p-12 lg:p-24 flex flex-col justify-between">
          <div className="space-y-16">
            <div className="space-y-4">
              <span className="text-purple-500/50 text-[10px] font-mono tracking-[0.6em] mb-4 block uppercase italic">Log_01 // Output</span>
              <h3 className="text-5xl lg:text-8xl font-[family-name:var(--font-archivo)] leading-[0.85] italic text-white">
                {data.hook}
              </h3>
            </div>

            <div className="space-y-4">
              <span className="text-blue-500/50 text-[10px] font-mono tracking-[0.6em] mb-4 block uppercase italic">Log_02 // Narrative</span>
              <p className="text-2xl lg:text-4xl font-[family-name:var(--font-instrument)] text-zinc-300 leading-tight italic">
                {data.body}
              </p>
            </div>
          </div>

          <button 
            onClick={() => navigator.clipboard.writeText(`${data.hook}\n\n${data.body}`)}
            className="group relative w-full h-24 mt-16 bg-white rounded-2xl overflow-hidden transition-all active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 text-black font-[family-name:var(--font-archivo)] text-[11px] uppercase tracking-[0.5em] group-hover:text-white transition-colors duration-300">
              Extract Artifact
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
