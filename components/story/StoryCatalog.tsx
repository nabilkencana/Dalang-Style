'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  WAYANG_STORIES,
  STORY_CATEGORIES,
  type WayangStoryItem,
} from '@/lib/wayang-stories';
import { StoryCard } from '@/components/story/StoryCard';
import { Search, BookOpen, Clock, X, ArrowRight } from 'lucide-react';

interface StoryCatalogProps {
  onSelectStory: (story: WayangStoryItem) => void;
}

export function StoryCatalog({ onSelectStory }: StoryCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered stories based on category & search query
  const filteredStories = useMemo(() => {
    return WAYANG_STORIES.filter((story) => {
      const matchCategory =
        selectedCategory === 'semua' || story.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        story.title.toLowerCase().includes(q) ||
        story.mainCharacter.toLowerCase().includes(q) ||
        story.synopsis.toLowerCase().includes(q) ||
        story.categoryLabel.toLowerCase().includes(q) ||
        story.tagline.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Featured Hero Story (e.g. Anoman Obong or Dewa Ruci)
  const featuredStory = WAYANG_STORIES.find((s) => s.featured) || WAYANG_STORIES[0];

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* ── 1. Featured Spotlight Hero Banner ── */}
      {featuredStory && !searchQuery && selectedCategory === 'semua' && (
        <section
          onClick={() => onSelectStory(featuredStory)}
          className="relative rounded-3xl bg-gradient-to-r from-[#21130a] via-[#160c07] to-[#21130a] border-2 border-[#d9a441]/50 p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] cursor-pointer group overflow-hidden transition-all hover:border-[#dedf42]"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#dedf42] text-black shadow-sm uppercase tracking-wider">
                  LAKON PILIHAN UTAMA
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/60 text-[#f2c76b] border border-[#d9a441]/30">
                  {featuredStory.categoryLabel}
                </span>
                <span className="text-xs font-mono text-[#f5ecd9]/60 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#dedf42]" />
                  <span>{featuredStory.readingTime}</span>
                </span>
              </div>

              <h2 className="font-serif italic font-bold text-3xl sm:text-4xl lg:text-5xl text-[#dedf42] group-hover:brightness-110 transition-all leading-tight">
                {featuredStory.title}
              </h2>

              <p className="font-sans text-xs sm:text-sm md:text-base text-[#f5ecd9]/85 leading-relaxed max-w-xl">
                {featuredStory.synopsis}
              </p>

              {/* Poetic quote */}
              <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 font-serif italic text-xs sm:text-sm text-[#f2c76b]">
                &ldquo;{featuredStory.pituturLuhur.javaneseQuote}&rdquo;
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectStory(featuredStory);
                  }}
                  className="px-6 py-3 rounded-2xl bg-[#dedf42] hover:bg-[#eae853] text-black font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg cursor-pointer active:scale-95"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Baca Lakon Pilihan</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Wayang Art Stage */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-[340px] rounded-3xl overflow-hidden bg-black/60 border border-[#d9a441]/30 p-4 shadow-inner group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                <Image
                  src={featuredStory.coverImage}
                  alt={featuredStory.title}
                  fill
                  className="object-contain p-4 drop-shadow-[0_10px_25px_rgba(217,164,65,0.3)]"
                  sizes="340px"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 2. Search Bar & Category Filter Bar ── */}
      <section className="space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-[#dedf42]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari naskah cerita, nama tokoh, atau babak..."
              className="w-full bg-[#150c08] border-2 border-[#d9a441]/30 hover:border-[#dedf42]/60 focus:border-[#dedf42] rounded-2xl py-3.5 pl-12 pr-10 text-xs sm:text-sm text-[#f5ecd9] placeholder-[#f5ecd9]/40 focus:outline-none focus:ring-1 focus:ring-[#dedf42] transition-all shadow-inner font-sans"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 p-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#f5ecd9] transition-all cursor-pointer"
                title="Hapus pencarian"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills (Clean, no emojis) */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {STORY_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-mono font-semibold transition-all whitespace-nowrap cursor-pointer shadow-sm ${
                  isSelected
                    ? 'bg-[#dedf42] text-black font-bold shadow-md shadow-[#dedf42]/20 scale-105'
                    : 'bg-[#150c08] text-[#f5ecd9]/80 border border-white/10 hover:border-[#dedf42]/40 hover:bg-[#1f120c] hover:text-white'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Filter Counter */}
        <div className="flex items-center justify-between text-xs font-mono text-[#f5ecd9]/60 px-1 border-b border-white/10 pb-3">
          <span>
            Menampilkan <strong>{filteredStories.length}</strong> dari {WAYANG_STORIES.length} Lakon Pewayangan
          </span>

          {(searchQuery || selectedCategory !== 'semua') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('semua');
              }}
              className="text-[#dedf42] hover:underline cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>
      </section>

      {/* ── 3. Grid of Curated Story Cards ── */}
      {filteredStories.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredStories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              onRead={onSelectStory}
            />
          ))}
        </section>
      ) : (
        /* Empty State */
        <div className="py-20 text-center rounded-3xl bg-[#150c08] border-2 border-dashed border-[#d9a441]/30 p-8 space-y-4">
          <div className="w-14 h-14 rounded-full bg-black/60 border border-white/15 flex items-center justify-center mx-auto text-[#dedf42]">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif italic font-bold text-xl text-[#dedf42]">
            Kisah Tidak Ditemukan
          </h3>
          <p className="text-xs sm:text-sm text-[#f5ecd9]/70 max-w-md mx-auto leading-relaxed">
            Tidak ada lakon yang cocok dengan kata kunci &quot;{searchQuery}&quot;. Silakan coba dengan kata kunci lain.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('semua');
            }}
            className="px-5 py-2.5 rounded-xl bg-[#dedf42] text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#eae853] transition-all cursor-pointer shadow-md"
          >
            Tampilkan Semua Kisah
          </button>
        </div>
      )}
    </div>
  );
}
