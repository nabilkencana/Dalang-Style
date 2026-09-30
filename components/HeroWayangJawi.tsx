'use client';

import React from 'react';
import Link from 'next/link';
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
  ctaText = 'Panduan Mendalang',
  ctaHref = '/panduan',
}: HeroWayangJawiProps) {
  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden select-none flex flex-col justify-end">
      {/* ── Background Looping Video: Dalang Tradisional Memainkan Wayang ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none brightness-[1.18] contrast-[1.05]"
      >
        <source src={videoSrc} type="video/mp4" />
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
            className="flex items-end gap-2 sm:gap-3 md:gap-4 flex-wrap"
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
              className="max-w-[700px] drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]"
            />
            {/* Exact Studiova Pill Button right next to title */}
            {/* Studiova-Style Interactive Pill Button linking to /panduan with dynamic hover effects */}
            <Link
              href={ctaHref}
              className="mb-2 sm:mb-4 md:mb-5 lg:mb-6 group relative p-1.5 pl-5 sm:pl-6 bg-[#dedf42] hover:bg-[#e8ea4a] rounded-full transition-all duration-300 shadow-2xl hover:shadow-[0_10px_35px_rgba(222,223,66,0.4)] hover:scale-[1.03] active:scale-95 flex items-center gap-2.5 cursor-pointer shrink-0"
            >
              <span className="text-black font-sans font-bold text-xs sm:text-sm tracking-wider uppercase transition-transform duration-200 group-hover:translate-x-0.5">
                {ctaText}
              </span>
              <span className="size-10 sm:size-11 rounded-full bg-black text-[#dedf42] group-hover:bg-white group-hover:text-black flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-45">
                <svg
                  className="size-4 sm:size-4.5 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
