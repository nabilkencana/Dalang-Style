'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface SectionJoinTheNightProps {
  id?: string;
  title?: string;
  datePill?: string;
  timePill?: string;
  venuePill?: {
    text: string;
    href: string;
  };
  tagline?: string[];
  socialLinks?: Array<{
    label: string;
    href: string;
  }>;
  brandTitle?: string;
  backgroundImage?: string;
}

export default function SectionJoinTheNight({
  id = 'join',
  title = 'Bergabunglah dalam Malam Ini',
  datePill = '21 JUNI 2026',
  timePill = '20.00 WIB - SELESAI',
  venuePill = {
    text: 'YASINTHA CAMPUS →',
    href: '/stage',
  },
  tagline = [
    'MALAM WAYANG JAWI',
    'BUKAN SEKADAR ACARA.',
    'INI ADALAH KENANGAN YANG',
    'MENUNGGU UNTUK TERJADI.',
  ],
  socialLinks = [
    { label: 'INSTAGRAM', href: 'https://instagram.com' },
    { label: 'TIKTOK', href: 'https://tiktok.com' },
  ],
  brandTitle = 'Malam Wayang Jawi',
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
            <h2 className="font-playfair text-black text-[clamp(42px,10.2cqi,152px)] font-normal leading-[0.88] tracking-[-0.035em] mb-4 sm:mb-5 md:mb-6 select-text">
              {title}
            </h2>

            {/* 3 Top Information Pills */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 md:gap-3">
              {/* Date Pill */}
              <div className="px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full border border-black bg-transparent">
                <span className="font-sans font-bold text-black text-[clamp(8px,1.00cqi,13px)] tracking-wider uppercase whitespace-nowrap select-text">
                  {datePill}
                </span>
              </div>

              {/* Time Pill */}
              <div className="px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full border border-black bg-transparent">
                <span className="font-sans font-bold text-black text-[clamp(8px,1.00cqi,13px)] tracking-wider uppercase whitespace-nowrap select-text">
                  {timePill}
                </span>
              </div>

              {/* Venue Link Pill */}
              <Link
                href={venuePill.href}
                className="px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full border border-black bg-transparent hover:bg-black hover:text-[#dedf42] active:scale-95 transition-all group flex items-center gap-1.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              >
                <span className="font-sans font-bold text-[clamp(8px,1.00cqi,13px)] tracking-wider uppercase whitespace-nowrap">
                  {venuePill.text}
                </span>
              </Link>
            </div>
          </div>

          {/* Top-Right: 4-Line Event Tagline */}
          <div className="pointer-events-auto shrink-0 md:pt-4 text-left max-w-[260px]">
            <p className="font-sans font-bold text-black text-[clamp(8px,0.95cqi,13px)] leading-[1.38] tracking-wider uppercase select-text">
              {tagline.map((line, idx) => (
                <span key={idx} className="block whitespace-nowrap">
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* 2. MIDDLE-BOTTOM ROW: Social Pills on Right */}
        <div className="relative z-10 w-full flex items-center justify-end pt-8 md:pt-0 my-auto md:my-0">
          <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-8 md:px-10 py-1.5 sm:py-2 rounded-full border border-black bg-transparent text-black font-sans font-bold text-[clamp(8px,1.00cqi,13px)] tracking-widest uppercase hover:bg-black hover:text-[#dedf42] active:scale-95 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* 3. GIANT BOTTOM HEADLINE: "The Night Wayang Jawi" */}
        <div className="relative z-10 w-full pt-4 md:pt-0 pointer-events-auto">
          <h1 className="font-playfair text-black text-[clamp(28px,9.55cqi,146px)] font-normal leading-[0.85] tracking-[-0.02em] whitespace-nowrap select-text text-left">
            {brandTitle}
          </h1>
        </div>
      </div>
    </section>
  );
}
