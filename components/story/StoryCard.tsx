'use client';

import React from 'react';
import Image from 'next/image';
import { type WayangStoryItem } from '@/lib/wayang-stories';
import { Clock, BookOpen, ArrowRight, User } from 'lucide-react';

interface StoryCardProps {
  story: WayangStoryItem;
  onRead: (story: WayangStoryItem) => void;
}

export function StoryCard({ story, onRead }: StoryCardProps) {
  return (
    <article
      onClick={() => onRead(story)}
      className="group relative h-full flex flex-col justify-between bg-[#080808] border border-white/10 hover:border-[#dedf42] rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(222,223,66,0.18)] hover:-translate-y-1.5 cursor-pointer overflow-hidden"
    >
      <div className="flex flex-col">
        {/* Top Badges: Category & Reading Time */}
        <div className="flex items-center justify-between gap-2 mb-4 h-6">
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#dedf42] text-black">
            {story.categoryLabel}
          </span>
          <span className="text-[11px] font-mono text-[#f4e7cd]/75 flex items-center gap-1.5 bg-black px-2.5 py-0.5 rounded-full border border-white/10">
            <Clock className="w-3 h-3 text-[#dedf42]" />
            <span>{story.readingTime}</span>
          </span>
        </div>

        {/* Visual Cover Stage with Yellow Halo */}
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black border border-white/10 mb-4 flex items-center justify-center group-hover:border-[#dedf42]/60 transition-colors">
          {/* Subtle Radial Yellow Light behind Puppet */}
          <div className="absolute inset-4 rounded-full bg-[radial-gradient(circle_at_center,rgba(222,223,66,0.22)_0%,transparent_70%)] pointer-events-none group-hover:scale-110 transition-transform duration-500" />

          <Image
            src={story.coverImage}
            alt={story.title}
            fill
            className="object-contain p-3 drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)] group-hover:scale-108 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
          />

          {story.javaneseTitle && (
            <div className="absolute bottom-2 inset-x-2 px-2.5 py-1 rounded-lg bg-black/90 backdrop-blur-md border border-[#dedf42]/30 text-center shadow-md">
              <span className="text-[11px] font-serif text-[#dedf42] tracking-widest font-medium">
                {story.javaneseTitle}
              </span>
            </div>
          )}
        </div>

        {/* Story Title & Main Character with Exact Fixed Baseline Heights */}
        <div className="space-y-1.5 mb-3">
          <h3 className="font-serif font-bold text-lg sm:text-xl text-white group-hover:text-[#dedf42] transition-colors leading-snug line-clamp-2 min-h-[3rem] flex items-center">
            {story.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs font-mono text-[#dedf42]">
            <User className="w-3.5 h-3.5 text-[#dedf42] shrink-0" />
            <span className="truncate">Tokoh: <strong className="text-white">{story.mainCharacter}</strong></span>
          </div>
        </div>

        {/* Tagline & Synopsis with Equal Line Clamp & Height */}
        <p className="font-sans text-xs sm:text-[13px] text-[#f4e7cd]/75 leading-relaxed line-clamp-3 min-h-[3.6rem] mb-4">
          {story.synopsis}
        </p>
      </div>

      {/* Card Footer: Pitutur quote teaser & Read Action */}
      <div className="pt-4 border-t border-white/10 space-y-3 mt-auto">
        <div className="text-[11px] font-serif italic text-[#dedf42]/90 truncate flex items-center gap-1 h-5">
          <span>“</span>
          <span className="truncate">{story.pituturLuhur.javaneseQuote}</span>
          <span>”</span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRead(story);
          }}
          className="w-full py-2.5 px-4 rounded-full bg-black group-hover:bg-[#dedf42] border border-[#dedf42]/40 group-hover:border-[#dedf42] text-xs font-sans font-bold text-[#dedf42] group-hover:text-black transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98 uppercase tracking-wider"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Baca Naskah Lakon</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </article>
  );
}
