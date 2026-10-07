'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import {
  WAYANG_STORIES,
  STORY_CATEGORIES,
  type WayangStoryItem,
} from '@/lib/wayang-stories';
import { StoryCard } from '@/components/story/StoryCard';
import StoryGsapAnimations from '@/components/story/StoryGsapAnimations';
import {
  Search,
  BookOpen,
  Sparkles,
  Clock,
  Layers,
  Scroll,
  User,
  Award,
  Bookmark,
  ChevronRight,
} from 'lucide-react';

interface StoryCatalogProps {
  onSelectStory: (story: WayangStoryItem) => void;
}

export function StoryCatalog({ onSelectStory }: StoryCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [selectedTokoh, setSelectedTokoh] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState('');
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

  // 9 Canonical Tokoh Wayang for quick filtering
  const characterList = useMemo(() => [
    { label: 'Kyai Semar', key: 'Semar' },
    { label: 'Sang Bima', key: 'Bima' },
    { label: 'Sang Arjuna', key: 'Arjuna' },
    { label: 'Sang Gatotkaca', key: 'Gatotkaca' },
    { label: 'Kyai Petruk', key: 'Petruk' },
    { label: 'Kyai Bagong', key: 'Bagong' },
    { label: 'Nala Gareng', key: 'Gareng' },
    { label: 'Prabu Rahwana', key: 'Rahwana' },
    { label: 'Resi Drona', key: 'Drona' },
  ], []);

  // Filtered and sorted stories
  const filteredStories = useMemo(() => {
    let list = WAYANG_STORIES.filter((story) => {
      // Category filter
      const matchCategory =
        selectedCategory === 'semua' || story.category === selectedCategory;

      // Tokoh filter
      const matchTokoh =
        selectedTokoh === 'semua' ||
        story.mainCharacter.toLowerCase().includes(selectedTokoh.toLowerCase()) ||
        story.tokohSlug.toLowerCase().includes(selectedTokoh.toLowerCase());

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
      {/* GSAP Entrance Animations Controller */}
      <StoryGsapAnimations filterKey={`${selectedCategory}-${selectedTokoh}-${searchQuery}-${showOnlyBookmarked}`} />

      {/* ── 1. Theatrical Stats Bar ── */}
      <div data-gsap="story-stats" className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-2 sm:p-3 rounded-2xl bg-[#080808] border border-[#dedf42]/25">
        <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-[#000000] border border-white/10 hover:border-[#dedf42] transition-all group">
          <div className="w-10 h-10 rounded-xl bg-[#dedf42]/10 border border-[#dedf42]/30 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#dedf42] group-hover:text-black text-[#dedf42] transition-all">
            <Scroll className="w-5 h-5" />
          </div>
          <div className="text-left space-y-0.5">
            <p className="font-sans font-black text-2xl sm:text-3xl text-[#dedf42] group-hover:text-white transition-colors leading-tight tracking-tight">
              9 Lakon
            </p>
            <p className="text-[11px] font-mono text-[#f4e7cd]/80 uppercase tracking-wider font-semibold">
              Naskah Lengkap
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-[#000000] border border-white/10 hover:border-[#dedf42] transition-all group">
          <div className="w-10 h-10 rounded-xl bg-[#dedf42]/10 border border-[#dedf42]/30 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#dedf42] group-hover:text-black text-[#dedf42] transition-all">
            <User className="w-5 h-5" />
          </div>
          <div className="text-left space-y-0.5">
            <p className="font-sans font-black text-2xl sm:text-3xl text-[#dedf42] group-hover:text-white transition-colors leading-tight tracking-tight">
              9 Tokoh
            </p>
            <p className="text-[11px] font-mono text-[#f4e7cd]/80 uppercase tracking-wider font-semibold">
              Ikon Jagad Pakeliran
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-[#000000] border border-white/10 hover:border-[#dedf42] transition-all group">
          <div className="w-10 h-10 rounded-xl bg-[#dedf42]/10 border border-[#dedf42]/30 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#dedf42] group-hover:text-black text-[#dedf42] transition-all">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-left space-y-0.5">
            <p className="font-sans font-black text-2xl sm:text-3xl text-[#dedf42] group-hover:text-white transition-colors leading-tight tracking-tight">
              27 Babak
            </p>
            <p className="text-[11px] font-mono text-[#f4e7cd]/80 uppercase tracking-wider font-semibold">
              Pathet Nem, Sanga, Manyura
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-[#000000] border border-white/10 hover:border-[#dedf42] transition-all group">
          <div className="w-10 h-10 rounded-xl bg-[#dedf42]/10 border border-[#dedf42]/30 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#dedf42] group-hover:text-black text-[#dedf42] transition-all">
            <Award className="w-5 h-5" />
          </div>
          <div className="text-left space-y-0.5">
            <p className="font-sans font-black text-2xl sm:text-3xl text-[#dedf42] group-hover:text-white transition-colors leading-tight tracking-tight">
              100%
            </p>
            <p className="text-[11px] font-mono text-[#f4e7cd]/80 uppercase tracking-wider font-semibold">
              Sastra Pedalangan
            </p>
          </div>
        </div>
      </div>

      {/* ── 2. Masterpiece Spotlight Showcase with Yellow Box Frame ── */}
      {featuredStory && !searchQuery && selectedCategory === 'semua' && selectedTokoh === 'semua' && !showOnlyBookmarked && (
        <section
          data-gsap="story-spotlight"
          onClick={() => onSelectStory(featuredStory)}
          className="relative rounded-2xl bg-[#080808] border-2 border-[#dedf42] p-6 sm:p-8 lg:p-10 shadow-[0_0_50px_rgba(222,223,66,0.12)] cursor-pointer group transition-all duration-300 hover:shadow-[0_0_80px_rgba(222,223,66,0.22)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#dedf42] text-black uppercase tracking-wider shadow-sm">
                  ★ Lakon Utama Unggulan
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-black text-[#f4e7cd]/80 border border-white/10">
                  {featuredStory.categoryLabel}
                </span>
                <span className="text-xs font-mono text-[#f4e7cd]/70 flex items-center gap-1 bg-black px-2.5 py-1 rounded-full border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-[#dedf42]" />
                  <span>{featuredStory.readingTime}</span>
                </span>
              </div>

              <div>
                <h2 className="font-serif italic font-bold text-3xl sm:text-4xl md:text-5xl text-[#dedf42] group-hover:brightness-125 transition-all leading-tight">
                  {featuredStory.title}
                </h2>
                {featuredStory.javaneseTitle && (
                  <p className="font-serif text-sm text-[#dedf42]/75 tracking-widest mt-1">
                    {featuredStory.javaneseTitle}
                  </p>
                )}
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#f4e7cd]/90 leading-relaxed line-clamp-3">
                {featuredStory.synopsis}
              </p>

              {/* Pitutur Box Excerpt */}
              <div className="p-4 rounded-xl bg-black border border-[#dedf42]/30 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#dedf42] font-semibold block">
                  Pitutur Luhur Lakon Ini:
                </span>
                <p className="font-serif italic text-xs sm:text-sm text-white line-clamp-2">
                  &ldquo;{featuredStory.pituturLuhur.javaneseQuote}&rdquo;
                </p>
                <p className="text-[11px] font-sans text-[#f4e7cd]/70 line-clamp-1">
                  {featuredStory.pituturLuhur.translation}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex items-center gap-4">
                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#dedf42] text-black font-sans font-bold text-xs uppercase tracking-wider group-hover:bg-white group-hover:scale-105 transition-all shadow-md">
                  <span>Mulai Membaca Lakon</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono text-[#f4e7cd]/60">
                  {featuredStory.acts.length} Babak Lengkap
                </span>
              </div>
            </div>

            {/* Right Artwork Showcase Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-[#dedf42]/40 bg-black shadow-2xl group-hover:border-[#dedf42] transition-all">
                <Image
                  src={featuredStory.coverImage}
                  alt={featuredStory.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 text-xs font-sans font-bold text-[#dedf42] bg-black/80 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                  Tokoh Utama: {featuredStory.mainCharacter}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 3. Search & Interactive Filter Controls ── */}
      <section data-gsap="story-search" className="space-y-6">
        {/* Search Input Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-[#dedf42]/70 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kisah lakon, tokoh, atau pitutur luhur..."
              className="w-full pl-12 pr-10 py-3.5 rounded-full bg-[#080808] border border-[#dedf42]/35 text-[#f4e7cd] placeholder-[#f4e7cd]/40 text-sm font-sans focus:outline-none focus:border-[#dedf42] focus:ring-1 focus:ring-[#dedf42] transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 text-xs font-mono text-[#dedf42]/70 hover:text-[#dedf42] cursor-pointer"
              >
                Hapus
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div data-gsap="story-cats" className="flex items-center justify-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#dedf42] text-black shadow-[0_0_20px_rgba(222,223,66,0.35)] scale-105'
                    : 'bg-[#0a0a0a] text-[#f4e7cd]/80 border border-white/15 hover:border-[#dedf42] hover:text-white'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isSelected ? 'bg-black text-[#dedf42]' : 'bg-white/10 text-[#f4e7cd]/70'}`}>
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
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-sans font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                showOnlyBookmarked
                  ? 'bg-[#dedf42] text-black shadow-[0_0_20px_rgba(222,223,66,0.35)] scale-105'
                  : 'bg-[#0a0a0a] text-[#dedf42] border border-[#dedf42]/40 hover:bg-[#141414]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>Tersimpan ({bookmarkedSlugs.length})</span>
            </button>
          )}
        </div>

        {/* Tokoh Quick Badges */}
        <div data-gsap="story-tokoh-tags" className="flex items-center justify-center gap-1.5 flex-wrap pt-1 text-[11px] font-mono text-[#f4e7cd]/75">
          <span className="text-[#dedf42] font-semibold mr-1 flex items-center gap-1">
            <User className="w-3 h-3 text-[#dedf42]" />
            Tokoh Cepat:
          </span>
          {characterList.map((tokoh) => (
            <button
              key={tokoh.key}
              type="button"
              onClick={() => setSelectedTokoh(selectedTokoh === tokoh.key ? 'semua' : tokoh.key)}
              className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                selectedTokoh === tokoh.key
                  ? 'bg-[#dedf42] text-black border-[#dedf42] font-bold shadow-sm'
                  : 'bg-[#0a0a0a] border-white/10 hover:border-[#dedf42] text-[#f4e7cd]/75 hover:text-white'
              }`}
            >
              {tokoh.label}
            </button>
          ))}
          {selectedTokoh !== 'semua' && (
            <button
              type="button"
              onClick={() => setSelectedTokoh('semua')}
              className="text-[#dedf42] hover:underline ml-1 font-semibold cursor-pointer"
            >
              Reset Tokoh
            </button>
          )}
        </div>

        {/* Active Filter & Sort Header Bar */}
        <div data-gsap="story-counter" className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#f4e7cd]/70 px-1 border-b border-[#dedf42]/15 pb-3">
          <span>
            Menampilkan <strong className="text-[#dedf42]">{filteredStories.length}</strong> dari {WAYANG_STORIES.length} Lakon Pewayangan
          </span>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span>Urutan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'title' | 'time')}
                className="bg-[#0a0a0a] border border-[#dedf42]/40 rounded-xl px-3 py-1.5 text-xs text-[#dedf42] focus:outline-none focus:border-[#dedf42] cursor-pointer"
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
                className="text-[#dedf42] hover:underline cursor-pointer font-semibold"
              >
                Reset Semua
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. Grid of All Curated Story Cards with ScrollTrigger Batch ── */}
      {filteredStories.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
          {filteredStories.map((story) => (
            <div key={story.id} data-gsap="story-card">
              <StoryCard
                story={story}
                onRead={onSelectStory}
              />
            </div>
          ))}
        </section>
      ) : (
        /* Empty State */
        <div className="py-20 text-center rounded-2xl bg-[#080808] border-2 border-dashed border-[#dedf42]/40 p-8 space-y-4 max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-black border border-[#dedf42] flex items-center justify-center mx-auto text-[#dedf42]">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif italic font-bold text-xl text-[#dedf42]">
            Kisah Tidak Ditemukan
          </h3>
          <p className="text-xs sm:text-sm text-[#f4e7cd]/75 leading-relaxed">
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
            className="px-5 py-2.5 rounded-full bg-[#dedf42] text-black font-sans font-bold text-xs uppercase tracking-wider hover:bg-white transition-all cursor-pointer shadow-md"
          >
            Tampilkan Semua Kisah
          </button>
        </div>
      )}
    </div>
  );
}
