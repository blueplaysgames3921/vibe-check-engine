"use client";

import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface InputFormProps {
  onGenerate: (topic: string) => void;
  isLoading: boolean;
}

export default function InputForm({ onGenerate, isLoading }: InputFormProps) {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onGenerate(topic);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto px-4 mt-8">
      <div className="relative group">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a boring topic..."
          className="w-full bg-zinc-900 border-2 border-zinc-800 text-white rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:border-purple-500 transition-all placeholder:text-zinc-600"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-xl transition-all"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </div>
      <p className="text-center text-zinc-500 text-xs mt-3">
        Try "Quantum Physics" or "Making the perfect grilled cheese"
      </p>
    </form>
  );
}

