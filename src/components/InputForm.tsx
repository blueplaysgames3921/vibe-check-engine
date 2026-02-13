"use client";

import React, { useState, useEffect } from 'react';
import { Send, Loader2, Sparkles } from 'lucide-react';

interface InputFormProps {
  onGenerate: (topic: string) => void;
  isLoading: boolean;
}

export default function InputForm({ onGenerate, isLoading }: InputFormProps) {
  const [topic, setTopic] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onGenerate(topic);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`w-full max-w-2xl mx-auto px-4 mt-8 transition-transform duration-500 ${isFocused ? 'scale-[1.02]' : 'scale-100'}`}
    >
      <div className="relative group">
        {/* Animated Glow Border */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 ${isFocused ? 'opacity-50' : ''}`} />
        
        <div className="relative">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Initialize synthesis topic..."
            className="w-full bg-black border border-white/10 text-white rounded-2xl py-5 pl-6 pr-16 focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-zinc-700 font-[family-name:var(--font-instrument)] italic text-lg shadow-2xl"
            disabled={isLoading}
          />
          
          <button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white text-black hover:bg-purple-500 hover:text-white disabled:bg-zinc-900 disabled:text-zinc-700 rounded-xl transition-all duration-300 shadow-lg active:scale-90"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <div className="relative">
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Dynamic Status Hint */}
      <div className="flex justify-between items-center px-2 mt-4">
        <p className="text-zinc-600 text-[10px] font-mono tracking-[0.2em] uppercase">
          {isLoading ? "Status: Process_Active" : "Ready: Awaiting_Input"}
        </p>
        <p className="text-zinc-500 text-[10px] font-mono tracking-widest uppercase opacity-40">
          Press Enter to Sync
        </p>
      </div>

      {/* Suggested prompts with clickable interaction */}
      <div className="flex flex-wrap gap-3 justify-center mt-6">
        {["Quantum Entropy", "Neo-Brutalism", "Cyber-Noir"].map((suggested) => (
          <button
            key={suggested}
            type="button"
            onClick={() => setTopic(suggested)}
            className="text-[9px] font-mono text-zinc-600 hover:text-purple-400 border border-white/5 hover:border-purple-500/30 px-3 py-1 rounded-full transition-colors uppercase tracking-tighter"
          >
            {suggested}
          </button>
        ))}
      </div>
    </form>
  );
}
