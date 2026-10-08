'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { StoryCatalog } from '@/components/story/StoryCatalog';
import { StoryReader } from '@/components/story/StoryReader';
import TigerTearReveal from '@/components/ui/tiger-tear-reveal';
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
    router.push(`/kreasi?slug=${encodeURIComponent(story.slug)}`, { scroll: true });
  };

  const handleBackToCatalog = () => {
    setActiveStory(null);
    router.push('/kreasi', { scroll: true });
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
        /* ── Catalog Overview View ── */
        <div className="relative z-10 w-full">
          {/* 1. Full-Width Pinned Wayang Tear Reveal Hero Section */}
          <div className="w-full">
            <TigerTearReveal
              word="WAYANG"
              tagline="PUSTAKA KISAH • SASTRA PEDALANGAN"
              ink="#dedf42"
              paper="#0b0604"
              taglineColor="#cdb894"
              eyeColor="#f0a526"
              furColor="#d9832c"
              height="80svh"
              pin={true}
              pinDistance={1000}
              className="w-full"
            />
          </div>

          {/* 2. Story Catalog Grid Section (Full-Width aligned with Wayang section above) */}
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-28 pt-6 sm:pt-8 space-y-12 sm:space-y-16">
            <StoryCatalog onSelectStory={handleSelectStory} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function KreasiStoryPage() {
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
