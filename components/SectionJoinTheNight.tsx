'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface SectionJoinTheNightProps {
  id?: string;
  title?: string;
  pill1?: string;
  pill2?: string;
  actionPill?: {
    text: string;
    href: string;
  };
  tagline?: string[];
  platformLinks?: Array<{
    label: string;
    href: string;
  }>;
  brandTitle?: string;
  backgroundImage?: string;
}

export default function SectionJoinTheNight({
  id = 'join',
  title = 'Mulai Perjalanan Mendalang',
  pill1 = 'WARISAN BUDAYA UNESCO',
  pill2 = 'KONTROL WAYANG AI',
  actionPill = {
    text: 'MULAI MENDALANG →',
    href: '/stage',
  },
  tagline = [
    'WAYANG JAWI HADIR UNTUK',
    'MENJAGA TRADISI LELUHUR',
    'AGAR TETAP HIDUP, RELEVAN,',
    'DAN BERMAKNA HARI INI.',
  ],
  platformLinks = [
    { label: 'KATALOG TOKOH', href: '/katalog' },
    { label: 'PANDUAN MENDALANG', href: '/panduan' },
    { label: 'KREDIT & TENTANG KITA', href: '/kredit' },
  ],
  brandTitle = 'Panggung Wayang Jawi',
  backgroundImage = '/images/join-night-canvas-bg.png',
}: SectionJoinTheNightProps) {
  return (
    <section
      id={id}
      className="relative w-full bg-[#dedf42] text-[#000000] overflow-hidden select-none edge-fade-top"
    >
      {/* Full-Width Canvas Container matching Reference Ratio (1.60) */}
      <div className="relative w-full min-h-[620px] md:aspect-[1504/940] @container overflow-hidden flex flex-col justify-between px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-8 sm:pt-10 md:pt-12 pb-4 sm:pb-6 md:pb-8">
        {/* Authentic Wayang Character Profile Watermark Canvas */}
        <div className="absolute inset-0 bg-[#dedf42] pointer-events-none">
          <Image
            src={backgroundImage}
            alt="Wayang Character Profile Watermark"
            fill
            priority
            sizes="(max-width: 1504px) 100vw, 1504px"
            className="object-cover object-center pointer-events-none"
          />
        </div>

        {/* 1. TOP HEADER ROW: Left "Join the Night" + Pills, Right Tagline */}
        <div className="relative z-10 w-full flex flex-col md:flex-row items-start justify-between gap-6 md:gap-8">
          {/* Top-Left: "Join the Night" Title and 3 Pills */}
          <div className="flex flex-col items-start pointer-events-auto">
            <h2 data-gsap="join-title" className="font-playfair text-black text-[clamp(42px,10.2cqi,152px)] font-normal leading-[0.98] tracking-[-0.035em] mb-4 sm:mb-5 md:mb-6 select-text">
              <span data-gsap="join-title-line" className="block will-change-transform">{title}</span>
            </h2>

            {/* 3 Top Information Pills */}
            <div data-gsap="join-pills" className="flex flex-wrap items-center gap-2 sm:gap-2.5 md:gap-3">
              {/* Heritage Badge Pill */}
              <div className="px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full border border-black bg-transparent">
                <span className="font-sans font-bold text-black text-[clamp(8px,1.00cqi,13px)] tracking-wider uppercase whitespace-nowrap select-text">
                  {pill1}
                </span>
              </div>

              {/* Technology Badge Pill */}
              <div className="px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full border border-black bg-transparent">
                <span className="font-sans font-bold text-black text-[clamp(8px,1.00cqi,13px)] tracking-wider uppercase whitespace-nowrap select-text">
                  {pill2}
                </span>
              </div>

              {/* Action Link Pill */}
              <Link
                href={actionPill.href}
                className="px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full border border-black bg-black text-[#dedf42] hover:bg-white hover:text-black active:scale-95 transition-all group flex items-center gap-1.5 shadow-md focus:outline-none focus:ring-2 focus:ring-black"
              >
                <span className="font-sans font-bold text-[clamp(8px,1.00cqi,13px)] tracking-wider uppercase whitespace-nowrap">
                  {actionPill.text}
                </span>
              </Link>
            </div>
          </div>

          {/* Top-Right: 4-Line Event Tagline */}
          <div data-gsap="join-tagline" className="pointer-events-auto shrink-0 md:pt-4 text-left max-w-[260px]">
            <p className="font-sans font-bold text-black text-[clamp(8px,0.95cqi,13px)] leading-[1.38] tracking-wider uppercase select-text">
              {tagline.map((line, idx) => (
                <span key={idx} className="block whitespace-nowrap">
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* 2. BOTTOM SECTION: Navigation & Credit Pills directly above Giant Title */}
        <div className="relative z-10 w-full flex flex-col gap-3 sm:gap-4 md:gap-5 mt-auto pt-6 md:pt-0">
          {/* Action & Credit Pills sitting right above the giant title */}
          <div className="flex items-center justify-end">
            <div data-gsap="join-social" className="flex flex-wrap items-center justify-end gap-2 sm:gap-3 pointer-events-auto">
              {platformLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-5 sm:px-6 md:px-7 py-1.5 sm:py-2 rounded-full border border-black bg-transparent text-black font-sans font-bold text-[clamp(8px,0.95cqi,12px)] tracking-wider uppercase hover:bg-black hover:text-[#dedf42] active:scale-95 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Giant Bottom Headline: "Panggung Wayang Jawi" */}
          <div className="w-full pointer-events-auto">
            <h1 className="font-playfair text-black text-[clamp(28px,9.55cqi,146px)] font-normal leading-[0.95] tracking-[-0.02em] whitespace-nowrap select-text text-left">
              <span data-gsap="join-brand-line" className="block will-change-transform">{brandTitle}</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
