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
      className="group relative bg-[#150c08] border-2 border-[#d9a441]/25 hover:border-[#dedf42] rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_15px_45px_rgba(0,0,0,0.7)] hover:-translate-y-1 flex flex-col justify-between cursor-pointer overflow-hidden"
    >
      <div>
        {/* Top Badges: Category & Reading Time */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#dedf42]/15 text-[#dedf42] border border-[#dedf42]/30">
            {story.categoryLabel}
          </span>
          <span className="text-[11px] font-mono text-[#f5ecd9]/60 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#dedf42]" />
            <span>{story.readingTime}</span>
          </span>
        </div>

        {/* Visual Cover Stage */}
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black/70 border border-[#d9a441]/20 mb-5 flex items-center justify-center group-hover:border-[#dedf42]/50 transition-colors">
          <Image
            src={story.coverImage}
            alt={story.title}
            fill
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
          />

          {story.javaneseTitle && (
            <div className="absolute bottom-2 inset-x-2 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-sm border border-white/10 text-center">
              <span className="text-[11px] font-serif text-[#dedf42]/90 tracking-wider">
                {story.javaneseTitle}
              </span>
            </div>
          )}
        </div>

        {/* Story Title & Main Character */}
        <div className="space-y-1.5 mb-3">
          <h3 className="font-serif italic font-bold text-xl sm:text-2xl text-[#f5ecd9] group-hover:text-[#dedf42] transition-colors leading-tight">
            {story.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs font-mono text-[#f2c76b]">
            <User className="w-3.5 h-3.5 text-[#dedf42]" />
            <span>Tokoh: <strong>{story.mainCharacter}</strong></span>
          </div>
        </div>

        {/* Tagline & Synopsis */}
        <p className="font-sans text-xs sm:text-[13px] text-[#f5ecd9]/75 leading-relaxed line-clamp-3 mb-4">
          {story.synopsis}
        </p>
      </div>

      {/* Card Footer: Pitutur quote teaser & Read Action */}
      <div className="pt-4 border-t border-white/10 space-y-3">
        <div className="text-[11px] font-serif italic text-[#dedf42]/90 truncate">
          &ldquo;{story.pituturLuhur.javaneseQuote}&rdquo;
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRead(story);
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-black/60 group-hover:bg-[#dedf42] border border-[#d9a441]/40 group-hover:border-[#dedf42] text-xs font-mono font-bold text-[#dedf42] group-hover:text-black transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Baca Naskah Lakon</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </article>
  );
}
