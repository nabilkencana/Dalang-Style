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
import { BookOpen } from 'lucide-react';

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
    } else {
      setActiveStory(null);
    }
  }, [storySlugParam]);

  const handleSelectStory = (story: WayangStoryItem) => {
    setActiveStory(story);
    router.push(`/story?slug=${encodeURIComponent(story.slug)}`, { scroll: true });
  };

  const handleBackToCatalog = () => {
    setActiveStory(null);
    router.push('/story', { scroll: true });
  };

  return (
    <div className="relative min-h-screen text-[#f4e7cd] overflow-x-hidden selection:bg-[#dedf42] selection:text-black font-sans bg-[#000000]">
      {/* ── Background Subtle Theatrical Ambient Grid ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Top Center Blencong Spotlight Glow */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] rounded-full blur-[140px] opacity-25"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(222, 223, 66, 0.6) 0%, rgba(222, 223, 66, 0.1) 50%, transparent 75%)',
          }}
        />
        {/* Subtle Heritage Dot Grid */}
        <div className="absolute inset-0 bg-repeat opacity-[0.03] bg-[radial-gradient(#dedf42_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {activeStory ? (
        /* ── Full Experience Story Reader View (Matching /tokoh/[slug]) ── */
        <div className="relative z-10 w-full">
          <StoryReader
            story={activeStory}
            onBackToCatalog={handleBackToCatalog}
            onSelectStory={handleSelectStory}
          />
        </div>
      ) : (
        /* ── Catalog Overview View with Cinematic Dossier Header ── */
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-28 sm:pt-36 pb-28 space-y-12 sm:space-y-16">
          {/* Monumental Hero Dossier Header */}
          <header className="text-center max-w-4xl mx-auto space-y-6">
            <div
              data-gsap="story-kicker"
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#0a0a0a] border border-[#dedf42]/40 text-[#dedf42] text-[11px] sm:text-xs font-mono font-bold tracking-[0.28em] uppercase shadow-[0_0_25px_rgba(222,223,66,0.15)]"
            >
              <span className="size-2 rounded-full bg-[#dedf42] animate-pulse" />
              <span>PUSTAKA KISAH • SASTRA PEDALANGAN NUSANTARA</span>
            </div>

            <div className="space-y-3">
              <h1
                data-gsap="story-title"
                className="font-serif italic font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#dedf42] leading-[0.98] tracking-tight"
              >
                Kisah Epik{' '}
                <span className="not-italic font-sans font-black uppercase text-white tracking-tighter">
                  Wayang Jawi
                </span>
              </h1>

              <p
                data-gsap="story-aksara"
                className="text-xs sm:text-sm md:text-base font-serif tracking-[0.3em] text-[#dedf42]/80 select-none pt-1"
              >
                ꦥꦸꦱ꧀ꦠꦏꦭꦏꦺꦴꦤ꧀ꦮꦪꦁꦗꦮꦶꦱꦱ꧀ꦠꦿꦤꦸꦱꦤ꧀ꦠꦫ
              </p>
            </div>

            <p
              data-gsap="story-subtitle"
              className="font-sans text-sm sm:text-base md:text-lg text-[#f4e7cd]/80 leading-relaxed max-w-2xl mx-auto"
            >
              Jelajahi 9 naskah lakon pewayangan pilihan Nusantara—mulai dari wiracarita Mahabharata, Ramayana, lakon carangan keraton, hingga kearifan punokawan yang sarat pitutur luhur filosofi Jawa.
            </p>

            <div
              data-gsap="story-divider"
              className="flex items-center justify-center gap-3 pt-2"
            >
              <div className="w-16 sm:w-28 h-[1.5px] bg-gradient-to-r from-transparent to-[#dedf42]" />
              <div className="size-2 rotate-45 border border-[#dedf42] bg-[#dedf42]" />
              <div className="w-16 sm:w-28 h-[1.5px] bg-gradient-to-l from-transparent to-[#dedf42]" />
            </div>
          </header>

          <StoryCatalog onSelectStory={handleSelectStory} />
        </div>
      )}
    </div>
  );
}

export default function StoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050303] text-[#dedf42] flex items-center justify-center p-6">
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
