import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-6 border-b border-zinc-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
          <Sparkles className="text-white w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">
          VIBE<span className="text-purple-400">CHECK</span>
        </h1>
      </div>
      <a 
        href="https://pollinations.ai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-xs font-medium px-3 py-1.5 rounded-full border border-zinc-700 text-zinc-400 hover:border-purple-500 hover:text-white transition-colors"
      >
        Powered by Pollinations.ai
      </a>
    </header>
  );
}

