'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import StrokeText from '@/components/StrokeText';

export interface HeroWayangJawiProps {
  videoSrc?: string;
  taglineText?: {
    normal1?: string;
    highlight?: string;
    normal2?: string;
  };
  brandTitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function HeroWayangJawi({
  videoSrc = '/videos/hero-dalang-loop.mp4',
  taglineText = {
    normal1: 'Menghidupkan',
    highlight: 'seni wayang kulit',
    normal2: 'lewat panggung digital interaktif dan teknologi kecerdasan buatan.',
  },
  brandTitle = 'Wayang',
  ctaText = 'Mainkan Wayang',
  ctaHref = '/stage',
}: HeroWayangJawiProps) {
  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden select-none flex flex-col justify-end">
      {/* ── Background Looping Video: Dalang Tradisional Memainkan Wayang ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-dancers-backdrop.webp"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none brightness-[1.18] contrast-[1.05]"
      >
        <source src={videoSrc} type="video/mp4" />
        <track kind="captions" src="data:text/vtt,WEBVTT" label="ambient" default />
      </video>

      {/* ── Soft Vignette Overlays (Gentle contrast for bottom text while keeping the Dalang bright & clearly visible) ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none z-10" />

      {/* ── Bottom Content Container (Exact Studiova Reference Structure) ── */}
      <div className="relative z-20 w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 pb-10 sm:pb-14 md:pb-16 pt-32">
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* Top Tagline Row with Spinning Pinwheel/Leaf Icon */}
          <div
            data-gsap="hero-tagline"
            className="flex items-center gap-3.5 sm:gap-4.5 max-w-md sm:max-w-lg"
          >
            {/* Fast Spinning Pinwheel Icon in #dedf42 (3s per rotation) */}
            <div className="shrink-0 animate-[spin_3s_linear_infinite]">
              <svg
                width="36"
                height="38"
                viewBox="0 0 40 42"
                fill="none"
                className="size-7 sm:size-8 text-[#dedf42]"
                aria-hidden="true"
              >
                <path
                  d="M0 27.8928L13.9269 21.6025L21.943 26.3203L23.5624 41.7978L13.684 41.7148L15.1415 30.9551L13.4411 29.9619L5.10111 36.5836L0 27.8928Z"
                  fill="currentColor"
                />
                <path
                  d="M22.8342 25.6576L35.1419 34.8446L40 25.9887L30.1213 21.933V19.9466L40 15.8082L35.1419 7.03488L22.8342 16.2221V25.6576Z"
                  fill="currentColor"
                />
                <path
                  d="M21.943 15.4775L23.5624 0L13.684 0.165487L15.1415 10.9253L13.4411 11.9185L5.02015 5.29708L0 13.9049L13.9269 20.1952L21.943 15.4775Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <p className="text-white/80 text-sm sm:text-base md:text-lg font-sans leading-relaxed font-normal">
              {taglineText.normal1}{' '}
              <span className="text-[#dedf42] font-semibold">
                {taglineText.highlight}
              </span>{' '}
              {taglineText.normal2}
            </p>
          </div>

          {/* Bottom Row: Giant Title + Pill CTA Button + Secondary Action Link */}
          {/* Bottom Row: Giant Title + Pill CTA Button Side-by-Side */}
          <div
            data-gsap="hero-bottom"
            className="flex items-end gap-1 sm:gap-2 md:gap-3 flex-wrap"
          >
            <StrokeText
              text={`${brandTitle}.`}
              strokeColor="#dedf42"
              fillColor="#ffffff"
              strokeWidth={2}
              drawDuration={2}
              fillDelay={0.3}
              stagger={0.06}
              ease="power3.out"
              trigger="mount"
              fillMode="wipe"
              fontSize={150}
              fontWeight={800}
              letterSpacing={-4}
              hideStrokeOnFill
              charColors={{ 6: '#dedf42' }}
              className="shrink-0 drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]"
            />

            {/* Interactive Button With Icon from Prompt (Sliding badge pill with 500ms transition) */}
            <Link
              href={ctaHref}
              className="mb-2 sm:mb-4 md:mb-6 -ml-1 sm:ml-0 relative inline-flex items-center text-xs sm:text-sm font-sans font-bold uppercase tracking-wider rounded-full h-11 sm:h-12 p-1 ps-5 sm:ps-6 pe-13 sm:pe-14 group transition-all duration-500 hover:ps-13 sm:hover:ps-14 hover:pe-5 sm:hover:pe-6 w-fit overflow-hidden cursor-pointer select-none bg-[#dedf42] text-black shadow-2xl hover:shadow-[0_10px_35px_rgba(222,223,66,0.4)] active:scale-95 shrink-0"
            >
              <span className="relative z-10 transition-all duration-500 whitespace-nowrap">
                {ctaText}
              </span>
              <div className="absolute right-1 w-9 h-9 sm:w-10 sm:h-10 bg-black text-[#dedf42] rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-40px)] sm:group-hover:right-[calc(100%-44px)] group-hover:rotate-45 group-hover:bg-white group-hover:text-black shadow-md">
                <ArrowUpRight className="size-4 sm:size-4.5" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
