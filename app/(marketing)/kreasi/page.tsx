'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { StoryCatalog } from '@/components/story/StoryCatalog';
import { StoryReader } from '@/components/story/StoryReader';
import {
  WAYANG_STORIES,
  getStoryBySlug,
  type WayangStoryItem,
} from '@/lib/wayang-stories';
import { Sparkles, BookOpen, Layers } from 'lucide-react';

function StoryPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const storySlugParam = searchParams.get('slug') || searchParams.get('id') || searchParams.get('prompt') || '';

  const [activeStory, setActiveStory] = useState<WayangStoryItem | null>(() => {
    if (storySlugParam) {
      return (
        getStoryBySlug(storySlugParam) ||
        WAYANG_STORIES.find((s) => s.title.toLowerCase().includes(storySlugParam.toLowerCase())) ||
        null
      );
    }
    return null;
  });

  // Sync with search parameter if user navigates via browser history
  useEffect(() => {
    if (storySlugParam) {
      const match =
        getStoryBySlug(storySlugParam) ||
        WAYANG_STORIES.find((s) => s.title.toLowerCase().includes(storySlugParam.toLowerCase()));
      if (match) {
        setActiveStory(match);
      }
    }
  }, [storySlugParam]);

  const handleSelectStory = (story: WayangStoryItem) => {
    setActiveStory(story);
    router.push(`/kreasi?slug=${encodeURIComponent(story.slug)}`, { scroll: true });
  };

  const handleBackToCatalog = () => {
    setActiveStory(null);
    router.push('/kreasi', { scroll: true });
  };

  return (
    <div
      className="relative min-h-screen text-[#f5ecd9] overflow-x-hidden pt-28 pb-24 selection:bg-[#dedf42] selection:text-black font-sans"
      style={{
        background: 'radial-gradient(circle at 50% 10%, #1f140b 0%, #120b07 45%, #080402 100%)',
      }}
    >
      {/* ── Background Subtle Heritage Texture ── */}
      <div className="fixed inset-0 bg-repeat opacity-[0.03] pointer-events-none z-0 bg-[radial-gradient(#dedf42_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 space-y-10 sm:space-y-12">
        {/* ── Header Title ── */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#dedf42]/10 border border-[#dedf42]/30 text-[#dedf42] text-xs font-mono font-bold tracking-widest uppercase">
            <span>PUSTAKA KISAH • SASTRA PEDALANGAN NUSANTARA</span>
          </div>

          <h1 className="font-serif italic font-bold text-4xl sm:text-5xl lg:text-6xl text-[#dedf42] leading-[1.08] tracking-tight">
            Kisah Epik <span className="not-italic font-normal text-white">Wayang Jawi</span>
          </h1>

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#f5ecd9]/80 leading-relaxed max-w-2xl mx-auto">
            Jelajahi dan baca koleksi lakon pewayangan pilihan Nusantara—mulai dari wiracarita Mahabharata, Ramayana, lakon carangan keraton, hingga kearifan punokawan yang sarat pitutur luhur filosofi Jawa.
          </p>
        </header>

        {/* ── View Switcher: Reader vs Catalog ── */}
        {activeStory ? (
          <StoryReader
            story={activeStory}
            onBackToCatalog={handleBackToCatalog}
            onSelectStory={handleSelectStory}
          />
        ) : (
          <StoryCatalog onSelectStory={handleSelectStory} />
        )}
      </div>
    </div>
  );
}

export default function KreasiStoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0b0604] text-[#dedf42] flex items-center justify-center p-6">
          <div className="flex items-center gap-3 font-mono text-sm">
            <BookOpen className="w-5 h-5 animate-pulse text-[#dedf42]" />
            <span>Memuat Pustaka Kisah Wayang...</span>
          </div>
        </div>
      }
    >
      <StoryPageContent />
    </Suspense>
  );
}
