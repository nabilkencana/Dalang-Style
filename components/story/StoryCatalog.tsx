'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import {
  WAYANG_STORIES,
  STORY_CATEGORIES,
  type WayangStoryItem,
} from '@/lib/wayang-stories';
import { StoryCard } from '@/components/story/StoryCard';
import {
  Search,
  BookOpen,
  Clock,
  X,
  ArrowRight,
  User,
  Bookmark,
  Sparkles,
  Layers,
  Scroll,
  Flame,
  CheckCircle2,
} from 'lucide-react';

interface StoryCatalogProps {
  onSelectStory: (story: WayangStoryItem) => void;
}

export function StoryCatalog({ onSelectStory }: StoryCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTokoh, setSelectedTokoh] = useState<string>('semua');
  const [sortBy, setSortBy] = useState<'featured' | 'title' | 'time'>('featured');
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>([]);
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);

  // Load bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wayang_story_bookmarks');
      if (saved) {
        setBookmarkedSlugs(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Unique list of main characters for quick filtering
  const characterList = useMemo(() => {
    const set = new Set<string>();
    WAYANG_STORIES.forEach((s) => {
      set.add(s.mainCharacter.split(' ')[0]); // first word or name
    });
    return Array.from(set);
  }, []);

  // Filtered and sorted stories
  const filteredStories = useMemo(() => {
    let list = WAYANG_STORIES.filter((story) => {
      // Category filter
      const matchCategory =
        selectedCategory === 'semua' || story.category === selectedCategory;

      // Tokoh filter
      const matchTokoh =
        selectedTokoh === 'semua' ||
        story.mainCharacter.toLowerCase().includes(selectedTokoh.toLowerCase());

      // Bookmark filter
      const matchBookmark = !showOnlyBookmarked || bookmarkedSlugs.includes(story.slug);

      // Search query
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        story.title.toLowerCase().includes(q) ||
        story.mainCharacter.toLowerCase().includes(q) ||
        story.synopsis.toLowerCase().includes(q) ||
        story.categoryLabel.toLowerCase().includes(q) ||
        story.tagline.toLowerCase().includes(q) ||
        story.supportingCharacters.some((c) => c.toLowerCase().includes(q)) ||
        story.acts.some((a) => a.content.toLowerCase().includes(q));

      return matchCategory && matchTokoh && matchBookmark && matchSearch;
    });

    if (sortBy === 'title') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'time') {
      list = [...list].sort((a, b) => {
        const timeA = parseInt(a.readingTime) || 0;
        const timeB = parseInt(b.readingTime) || 0;
        return timeA - timeB;
      });
    }

    return list;
  }, [selectedCategory, selectedTokoh, showOnlyBookmarked, bookmarkedSlugs, searchQuery, sortBy]);

  // Featured Spotlight Story
  const featuredStory = WAYANG_STORIES.find((s) => s.featured) || WAYANG_STORIES[0];

  return (
    <div className="w-full space-y-12 sm:space-y-16">
      {/* ── 1. Stats Banner Ribbon ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-3xl bg-[#150c08] border border-[#d9a441]/25 text-center shadow-lg">
        <div className="space-y-1">
          <p className="font-serif italic font-bold text-2xl sm:text-3xl text-[#dedf42]">
            {WAYANG_STORIES.length} Lakon
          </p>
          <p className="text-[11px] font-mono text-[#f5ecd9]/60 uppercase tracking-wider">
            Naskah Cerita Lengkap
          </p>
        </div>
        <div className="space-y-1">
          <p className="font-serif italic font-bold text-2xl sm:text-3xl text-[#dedf42]">
            {STORY_CATEGORIES.length - 1} Kategori
          </p>
          <p className="text-[11px] font-mono text-[#f5ecd9]/60 uppercase tracking-wider">
            Wiracarita Nusantara
          </p>
        </div>
        <div className="space-y-1">
          <p className="font-serif italic font-bold text-2xl sm:text-3xl text-[#dedf42]">
            {WAYANG_STORIES.reduce((acc, s) => acc + s.acts.length, 0)} Babak
          </p>
          <p className="text-[11px] font-mono text-[#f5ecd9]/60 uppercase tracking-wider">
            Pathet Nem, Sanga, Manyura
          </p>
        </div>
        <div className="space-y-1">
          <p className="font-serif italic font-bold text-2xl sm:text-3xl text-[#dedf42]">
            100% Sastra
          </p>
          <p className="text-[11px] font-mono text-[#f5ecd9]/60 uppercase tracking-wider">
            Kurasi Pedalangan Asli
          </p>
        </div>
      </div>

      {/* ── 2. Featured Spotlight Hero Showcase ── */}
      {featuredStory && !searchQuery && selectedCategory === 'semua' && selectedTokoh === 'semua' && !showOnlyBookmarked && (
        <section
          onClick={() => onSelectStory(featuredStory)}
          className="relative rounded-3xl bg-gradient-to-r from-[#26150b] via-[#160c07] to-[#26150b] border-2 border-[#d9a441]/50 p-6 sm:p-10 lg:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.8)] cursor-pointer group overflow-hidden transition-all hover:border-[#dedf42]"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#dedf42] text-black shadow-sm uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-black" />
                  SOROTAN LAKON UTAMA
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/60 text-[#f2c76b] border border-[#d9a441]/30">
                  {featuredStory.categoryLabel}
                </span>
                <span className="text-xs font-mono text-[#f5ecd9]/60 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#dedf42]" />
                  <span>{featuredStory.readingTime}</span>
                </span>
              </div>

              <div>
                <h2 className="font-serif italic font-bold text-3xl sm:text-4xl lg:text-5xl text-[#dedf42] group-hover:brightness-110 transition-all leading-[1.1] tracking-tight mb-2">
                  {featuredStory.title}
                </h2>
                <p className="font-serif text-sm sm:text-base text-[#f2c76b]/90 font-medium">
                  {featuredStory.tagline}
                </p>
              </div>

              <p className="font-sans text-xs sm:text-sm md:text-base text-[#f5ecd9]/85 leading-relaxed">
                {featuredStory.synopsis}
              </p>

              {/* Cast teaser */}
              <div className="flex items-center gap-2 text-xs font-mono text-[#f5ecd9]/70 flex-wrap">
                <span className="text-[#dedf42]">Tokoh Utama:</span>
                <span className="font-bold text-[#f5ecd9]">{featuredStory.mainCharacter}</span>
                <span className="text-white/20">•</span>
                <span>{featuredStory.characterRole}</span>
              </div>

              {/* Poetic quote */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-serif italic text-xs sm:text-sm text-[#f2c76b]">
                &ldquo;{featuredStory.pituturLuhur.javaneseQuote}&rdquo;
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectStory(featuredStory);
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-[#dedf42] hover:bg-[#eae853] text-black font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg cursor-pointer active:scale-95"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Mulai Membaca Lakon Ini</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Wayang Art Stage */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-[380px] rounded-3xl overflow-hidden bg-black/70 border-2 border-[#d9a441]/35 p-6 shadow-inner group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                <Image
                  src={featuredStory.coverImage}
                  alt={featuredStory.title}
                  fill
                  className="object-contain p-4 drop-shadow-[0_12px_30px_rgba(217,164,65,0.35)]"
                  sizes="(max-width: 768px) 100vw, 380px"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 3. Search Bar, Filter Controls & Category Tabs ── */}
      <section className="space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-[#dedf42]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari naskah cerita, kata kunci, atau tokoh (cth: Werkudara, Anoman, Karna, Semar)..."
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

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {STORY_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id && !showOnlyBookmarked;
            const count =
              cat.id === 'semua'
                ? WAYANG_STORIES.length
                : WAYANG_STORIES.filter((s) => s.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setShowOnlyBookmarked(false);
                }}
                className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-mono font-semibold transition-all whitespace-nowrap cursor-pointer shadow-sm flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#dedf42] text-black font-bold shadow-md shadow-[#dedf42]/20 scale-105'
                    : 'bg-[#150c08] text-[#f5ecd9]/80 border border-white/10 hover:border-[#dedf42]/40 hover:bg-[#1f120c] hover:text-white'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-black text-[#dedf42]' : 'bg-white/10 text-[#f5ecd9]/60'}`}>
                  {count}
                </span>
              </button>
            );
          })}

          {/* Bookmarked Filter Pill */}
          {bookmarkedSlugs.length > 0 && (
            <button
              type="button"
              onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-mono font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                showOnlyBookmarked
                  ? 'bg-[#dedf42] text-black font-bold shadow-md shadow-[#dedf42]/20 scale-105'
                  : 'bg-[#150c08] text-[#f2c76b] border border-[#d9a441]/40 hover:bg-[#1f120c]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>Tersimpan ({bookmarkedSlugs.length})</span>
            </button>
          )}
        </div>

        {/* Tokoh Quick Badges */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap pt-1 text-[11px] font-mono text-[#f5ecd9]/70">
          <span className="text-[#dedf42]/70 mr-1">Tokoh Cepat:</span>
          {characterList.map((tokoh) => (
            <button
              key={tokoh}
              type="button"
              onClick={() => setSelectedTokoh(selectedTokoh === tokoh ? 'semua' : tokoh)}
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                selectedTokoh === tokoh
                  ? 'bg-[#dedf42] text-black border-[#dedf42] font-bold'
                  : 'bg-black/50 border-white/10 hover:border-[#dedf42]/40 text-[#f5ecd9]/70 hover:text-white'
              }`}
            >
              {tokoh}
            </button>
          ))}
          {selectedTokoh !== 'semua' && (
            <button
              type="button"
              onClick={() => setSelectedTokoh('semua')}
              className="text-[#dedf42] hover:underline ml-1"
            >
              Reset Tokoh
            </button>
          )}
        </div>

        {/* Active Filter & Sort Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#f5ecd9]/60 px-1 border-b border-white/10 pb-3">
          <span>
            Menampilkan <strong>{filteredStories.length}</strong> dari {WAYANG_STORIES.length} Lakon Pewayangan
          </span>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span>Urutan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#150c08] border border-white/15 rounded-lg px-2.5 py-1 text-xs text-[#dedf42] focus:outline-none focus:border-[#dedf42] cursor-pointer"
              >
                <option value="featured">Sorotan Unggulan</option>
                <option value="title">Judul Lakon (A - Z)</option>
                <option value="time">Durasi Membaca</option>
              </select>
            </div>

            {(searchQuery || selectedCategory !== 'semua' || selectedTokoh !== 'semua' || showOnlyBookmarked) && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('semua');
                  setSelectedTokoh('semua');
                  setShowOnlyBookmarked(false);
                }}
                className="text-[#dedf42] hover:underline cursor-pointer"
              >
                Reset Semua
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. Grid of All Curated Story Cards ── */}
      {filteredStories.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
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
        <div className="py-20 text-center rounded-3xl bg-[#150c08] border-2 border-dashed border-[#d9a441]/30 p-8 space-y-4 max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-black/60 border border-white/15 flex items-center justify-center mx-auto text-[#dedf42]">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif italic font-bold text-xl text-[#dedf42]">
            Kisah Tidak Ditemukan
          </h3>
          <p className="text-xs sm:text-sm text-[#f5ecd9]/70 leading-relaxed">
            Tidak ada naskah lakon yang cocok dengan kriteria pencarian &quot;{searchQuery || selectedTokoh}&quot;. Silakan coba dengan kata kunci lain atau tampilkan seluruh naskah.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('semua');
              setSelectedTokoh('semua');
              setShowOnlyBookmarked(false);
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
