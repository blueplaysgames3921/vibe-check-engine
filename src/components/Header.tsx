import React from 'react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-[100] px-6 py-8 flex items-center justify-between mix-blend-difference">
      {/* LEFT: The Brand Mark */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 border border-white flex items-center justify-center rotate-45">
          <div className="w-2 h-2 bg-white -rotate-45 animate-pulse" />
        </div>
        <h1 className="text-2xl font-[family-name:var(--font-archivo)] tracking-tighter text-white uppercase italic">
          Vibe<span className="opacity-20">Check</span>
        </h1>
      </div>

      {/* RIGHT: The Credit Line */}
      <div className="flex items-center gap-8">
        <div className="hidden md:block h-[1px] w-20 bg-white/20" />
        <a 
          href="https://pollinations.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex flex-col items-end"
        >
          <span className="text-[8px] uppercase tracking-[0.5em] text-zinc-500 group-hover:text-white transition-colors">
            Infrastructure
          </span>
          <span className="text-[11px] font-[family-name:var(--font-instrument)] italic text-white leading-none">
            Pollinations_V1
          </span>
        </a>
      </div>
    </header>
  );
}
