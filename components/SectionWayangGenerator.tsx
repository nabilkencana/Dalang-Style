'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Compass,
  Sparkles,
  BookOpen,
  Clock,
  Swords,
  Scroll,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WAYANG_STORIES, type WayangStoryItem } from '@/lib/wayang-stories';

gsap.registerPlugin(ScrollTrigger);

export interface SectionWayangGeneratorProps {
  id?: string;
}

export default function SectionWayangGenerator({ id = 'kreasi' }: SectionWayangGeneratorProps) {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const featuredStories = WAYANG_STORIES.slice(0, 4);
  const activeStory: WayangStoryItem =
    featuredStories[activeStoryIndex] || featuredStories[0];

  const handleReadStory = (slug: string) => {
    router.push(`/kreasi?slug=${encodeURIComponent(slug)}`);
  };

  // ── GSAP ScrollTrigger: Fan-In Overlay (Menindihi section sebelumnya dari bottom-left 30° -> 0°) ──
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!innerRef.current || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop & Tablet (>= 768px): Menindihi section sebelumnya dengan rotasi menyapu 30° -> 0° dari bottom-left
    mm.add('(min-width: 768px)', () => {
      gsap.set(innerRef.current, { rotation: 30, transformOrigin: 'bottom left' });

      const tween = gsap.to(innerRef.current, {
        rotation: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        },
      });

      return () => {
        if (tween.scrollTrigger) tween.scrollTrigger.kill();
      };
    });

    // Mobile (< 768px): Menindihi section sebelumnya dengan rotasi menyapu 18° -> 0°
    mm.add('(max-width: 767px)', () => {
      gsap.set(innerRef.current, { rotation: 18, transformOrigin: 'bottom left' });

      const tween = gsap.to(innerRef.current, {
        rotation: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        },
      });

      return () => {
        if (tween.scrollTrigger) tween.scrollTrigger.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      data-gsap="kreasi-section"
      className="relative min-h-screen w-full overflow-hidden select-none font-sans z-30"
    >
      {/* ── Inner Animated Flow Art Container ── */}
      <div
        ref={innerRef}
        className="flow-art-container relative w-full bg-[#dedf42] text-black shadow-[0_-35px_80px_rgba(0,0,0,0.7)] flex flex-col justify-between will-change-transform"
        style={{ transformOrigin: 'bottom left' }}
      >
        {/* ── 1. Top Cultural Connector ── */}
        <div className="relative w-full border-t border-black/80 bg-[#dedf42] py-4 px-4 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between overflow-hidden">
          <div className="hidden sm:block h-[1px] flex-1 bg-black/30" />
          <div className="flex items-center gap-3 px-4 mx-auto sm:mx-0">
            <span className="text-[11px] font-mono tracking-[0.28em] text-black/75 uppercase font-semibold">
              ꦥꦸꦱ꧀ꦠꦏꦭꦏꦺꦴꦤ꧀ • PUSTAKA KISAH & SASTRA PEDALANGAN
            </span>
          </div>
          <div className="hidden sm:block h-[1px] flex-1 bg-black/30" />
        </div>

        {/* ── Background Subtle Heritage Texture ── */}
        <div className="absolute inset-0 bg-repeat opacity-[0.03] pointer-events-none z-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* ── 2. Main Atelier Canvas (Full Width) ── */}
        <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-8 sm:pt-12 pb-16 sm:pb-20">
          {/* Header Block */}
          <div className="max-w-4xl mb-10 sm:mb-14">
            <p className="font-mono text-xs font-bold tracking-[0.24em] text-black/75 uppercase mb-3">
              PUSTAKA KISAH PEWAYANGAN NUSANTARA
            </p>
            <h2 className="font-serif italic font-bold text-3xl sm:text-4xl lg:text-5xl text-[#050303] leading-[1.08] tracking-tight mb-4">
              Koleksi Lakon Agung,{' '}
              <span className="not-italic font-normal block sm:inline">
                Sarat Makna Budi Luhur & Filosofi Jawa.
              </span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-black/80 leading-relaxed max-w-2xl">
              Nikmati kisah-kisah epik pewayangan yang dikurasi secara sastrawi dan interaktif. Lengkap dengan kidung sulukan, babak pedalangan, glosarium istilah Jawa, dan pitutur luhur penuntun batin.
            </p>
          </div>

          {/* ── Interactive Two-Column Story Showcase ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* ── LEFT: Active Story Spotlight View (6 cols) ── */}
            <div className="lg:col-span-6 flex flex-col justify-between bg-[#0e0805] text-[#f5ecd9] rounded-3xl p-6 sm:p-8 border border-black/90 shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
              <div>
                {/* Header & Story Switcher Tabs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dedf42]/20 pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#dedf42] uppercase block">
                      SOROTAN LAKON PILIHAN
                    </span>
                    <h3 className="font-serif italic text-lg sm:text-xl text-[#f5ecd9] font-bold">
                      {activeStory.title}
                    </h3>
                  </div>

                  {/* Switcher Buttons */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {featuredStories.map((story, idx) => (
                      <button
                        key={story.id}
                        type="button"
                        onClick={() => setActiveStoryIndex(idx)}
                        className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${
                          activeStoryIndex === idx
                            ? 'bg-[#dedf42] text-black font-bold shadow-md shadow-[#dedf42]/20 scale-105'
                            : 'bg-white/[0.08] text-[#f5ecd9]/80 hover:text-white hover:bg-white/15'
                        }`}
                      >
                        {story.mainCharacter.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Wayang Cover Art */}
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/60 border border-[#d9a441]/25 flex items-center justify-center mb-6 group">
                  <Image
                    key={activeStory.id}
                    src={activeStory.coverImage}
                    alt={activeStory.title}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 550px"
                    priority
                  />
                </div>

                {/* Story Dossier */}
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-serif font-bold text-xl sm:text-2xl text-[#dedf42]">
                      {activeStory.mainCharacter}
                    </h4>
                    <span className="text-xs font-mono text-[#f5ecd9]/60 uppercase">
                      {activeStory.categoryLabel} • {activeStory.readingTime}
                    </span>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-[#f5ecd9]/85 leading-relaxed">
                    {activeStory.synopsis}
                  </p>

                  {/* Pitutur Excerpt */}
                  <p className="font-sans text-xs sm:text-sm text-[#dedf42] italic leading-relaxed pt-2 border-t border-white/10">
                    &ldquo;{activeStory.pituturLuhur.javaneseQuote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[#f5ecd9]/50 font-sans">Ingin membaca babak lengkap?</span>
                <button
                  type="button"
                  onClick={() => handleReadStory(activeStory.slug)}
                  className="inline-flex items-center gap-1.5 text-[#dedf42] font-semibold hover:underline cursor-pointer"
                >
                  Buka Halaman Baca &rarr;
                </button>
              </div>
            </div>

            {/* ── RIGHT: Story List Quick Access (6 cols) ── */}
            <div className="lg:col-span-6 flex flex-col justify-between bg-[#0e0805] text-[#f5ecd9] rounded-3xl p-6 sm:p-8 border border-black/90 shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
              <div className="space-y-4">
                <div className="border-b border-[#dedf42]/20 pb-3">
                  <span className="text-[10px] font-mono tracking-widest text-[#dedf42] uppercase block mb-1">
                    DAFTAR KISAH TERPOPULER
                  </span>
                  <h3 className="font-serif italic text-xl sm:text-2xl text-[#f5ecd9] font-bold">
                    Pilih & Baca Kisah Favorit Anda
                  </h3>
                </div>

                {/* List of Stories */}
                <div className="space-y-3">
                  {featuredStories.map((story) => (
                    <div
                      key={story.id}
                      onClick={() => handleReadStory(story.slug)}
                      className="p-3.5 sm:p-4 rounded-2xl bg-black/60 hover:bg-[#1f120c] border border-white/10 hover:border-[#dedf42]/50 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#dedf42] text-black">
                            {story.categoryLabel}
                          </span>
                          <span className="text-[10px] font-mono text-[#f5ecd9]/50">
                            {story.readingTime}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-sm sm:text-base text-[#f5ecd9] group-hover:text-[#dedf42] transition-colors truncate">
                          {story.title}
                        </h4>
                        <p className="text-xs font-sans text-[#f5ecd9]/60 line-clamp-1">
                          {story.tagline}
                        </p>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#dedf42] text-[#dedf42] group-hover:text-black flex items-center justify-center shrink-0 transition-colors shadow-sm">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA to All Stories */}
              <div className="pt-6 mt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => router.push('/kreasi')}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#dedf42] hover:bg-[#eae853] active:scale-[0.99] text-black font-sans font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Jelajahi Semua Kisah Wayang ({WAYANG_STORIES.length} Lakon)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. Bottom Theatrical Gradient Bridge ── */}
        <div className="relative w-full h-16 sm:h-24 md:h-32 bg-gradient-to-b from-[#dedf42] via-[#1c1808] to-[#050303] pointer-events-none" />
      </div>
    </section>
  );
}
