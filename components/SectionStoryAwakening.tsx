'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface SectionStoryAwakeningProps {
  id?: string;
  headerBrandText?: string;
  categoryLabel?: string;
  headline?: string[];
  block1?: {
    lines: string[];
    imageSrc: string;
    imageAlt: string;
  };
  block2?: {
    lines: string[];
    imageSrc: string;
    imageAlt: string;
  };
  readMoreText?: string;
  readMoreHref?: string;
  aksaraText?: string;
}

export default function SectionStoryAwakening({
  id = 'cara-bermain',
  headerBrandText = 'THE NIGHT WAYANG JAWI',
  categoryLabel = 'A STORY OF INNER AWAKENING',
  headline = [
    'When the world grows quiet and the',
    'night deepens, a different kind of',
    'journey begins.',
  ],
  block1 = {
    lines: [
      'BIMA, THE STRONGEST OF THE',
      'PANDAWA, IS KNOWN FOR HIS',
      'POWER, HIS COURAGE, HIS',
      'UNWAVERING WILL. YET ON THIS',
      'NIGHT, STRENGTH ALONE IS NOT',
      'ENOUGH.',
    ],
    imageSrc: '/images/story-bima-portrait.png',
    imageAlt: 'Wayang Wong Bima mask and costume portrait',
  },
  block2 = {
    lines: [
      'GUIDED BY A MYSTERIOUS CALLING,',
      'BIMA IS SENT TO SEEK TIRTA',
      'PRAWITASARI—THE SACRED WATER',
      'OF LIFE. BUT THIS IS NO ORDINARY',
      'QUEST. IT LEADS HIM BEYOND',
      'KINGDOMS AND BATTLEFIELDS...',
      'INTO THE VAST, UNKNOWN DEPTHS',
      'OF THE OCEAN.',
    ],
    imageSrc: '/images/story-ocean-battle.png',
    imageAlt: 'Bima encountering mystical forces in the deep ocean',
  },
  readMoreText = 'READ MORE →',
  readMoreHref = '/stage',
  aksaraText = 'ꦭꦏꦺꦴꦤ꧀ ꦧꦶꦩ ꦱꦸꦕꦶ ꦠꦶꦂꦠ ꦥꦿꦮꦶꦠꦱꦫꦶ',
}: SectionStoryAwakeningProps) {
  return (
    <section
      id={id}
      className="relative w-full bg-[#dedf42] text-[#000000] overflow-hidden select-none py-2 sm:py-3 md:py-4 edge-fade-top edge-fade-bottom"
      style={{
        background:
          'radial-gradient(circle at 75% 20%, #e8e84d 0%, #dedf42 55%, #cfd033 100%)',
      }}
    >
      {/* Canvas Container matching Poster Ratio (4:3) on desktop, adaptive on mobile - Full Width */}
      <div className="relative w-full px-3 sm:px-6 md:px-10 lg:px-12 xl:px-16 min-h-[580px] md:aspect-[1504/1128] @container overflow-hidden flex items-center justify-center py-10 md:py-0">
        {/* Subtle Ambient Vignette Overlay */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_60%,rgba(0,0,0,0.06)_95%] pointer-events-none z-10" />

        {/* PURE CODE: Outer Border Frame */}
        <div className="absolute inset-[3.5%_2.2%_3.8%_2.2%] md:inset-[4.17%_2.53%_4.34%_2.53%] border border-black/35 pointer-events-none z-20" />

        {/* PURE CODE: Top Center Label "THE NIGHT WAYANG JAWI" on the outer border line */}
        <div className="absolute top-[3.5%] md:top-[4.17%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#dedf42] px-3 sm:px-5 py-0.5 z-30 pointer-events-auto">
          <p className="font-sans font-bold text-black text-[clamp(8px,1.05cqi,14px)] tracking-[0.22em] sm:tracking-[0.25em] uppercase whitespace-nowrap select-text">
            {headerBrandText}
          </p>
        </div>

        {/* PURE CODE: Bottom Center Label "THE NIGHT WAYANG JAWI" on the outer border line */}
        <div className="absolute bottom-[3.8%] md:bottom-[4.34%] left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#dedf42] px-3 sm:px-5 py-0.5 z-30 pointer-events-auto">
          <p className="font-sans font-bold text-black text-[clamp(8px,1.05cqi,14px)] tracking-[0.22em] sm:tracking-[0.25em] uppercase whitespace-nowrap select-text">
            {headerBrandText}
          </p>
        </div>

        {/* INNER YELLOW STORY CARD (1126 x 814 = Aspect 1.383 on desktop) */}
        <div
          className="relative w-[94%] sm:w-[90%] md:w-[86%] lg:w-[82%] my-6 md:my-0 aspect-auto md:aspect-[1126/814] rounded-none overflow-hidden bg-[#dedf42] shadow-[0_25px_80px_rgba(0,0,0,0.85)] z-20 @container"
        >
          {/* Yellow Card Canvas with authentic Bima Wayang Watermark Illustration */}
          <div className="absolute inset-0 bg-[#dedf42] pointer-events-none">
            <Image
              src="/images/story-awakening-card-bg.png"
              alt="Bima Illustration Watermark Canvas"
              fill
              priority
              sizes="(max-width: 1504px) 75vw, 1126px"
              className="object-cover object-center pointer-events-none"
            />
          </div>

          {/* INNER BORDER: Inset 27px horizontal (2.40%), 17px top/bottom (2.09%) */}
          {/* Top border line */}
          <div className="absolute top-[2.09%] left-[2.40%] right-[2.40%] h-[1px] bg-black/85 pointer-events-none z-10" />
          {/* Bottom border line */}
          <div className="absolute bottom-[2.46%] left-[2.40%] right-[2.40%] h-[1px] bg-black/85 pointer-events-none z-10" />

          {/* Left border line with Aksara Jawa breakout in middle */}
          <div className="absolute top-[2.09%] bottom-[2.46%] left-[2.40%] w-[1px] flex flex-col items-center justify-between pointer-events-none z-10">
            <div className="w-[1px] flex-1 bg-black/85" />
            <div className="py-2 my-1 pointer-events-auto select-none">
              <span
                className="font-serif text-black/80 text-[clamp(7px,1.05cqi,13px)] tracking-[0.18em]"
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                }}
                aria-label="Aksara Jawa: Lakon Bima Suci Tirta Prawitasari"
              >
                {aksaraText}
              </span>
            </div>
            <div className="w-[1px] flex-1 bg-black/85" />
          </div>

          {/* Right border line with Aksara Jawa breakout in middle */}
          <div className="absolute top-[2.09%] bottom-[2.46%] right-[2.40%] w-[1px] flex flex-col items-center justify-between pointer-events-none z-10">
            <div className="w-[1px] flex-1 bg-black/85" />
            <div className="py-2 my-1 pointer-events-auto select-none">
              <span
                className="font-serif text-black/80 text-[clamp(7px,1.05cqi,13px)] tracking-[0.18em]"
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                }}
                aria-label="Aksara Jawa: Lakon Bima Suci Tirta Prawitasari"
              >
                {aksaraText}
              </span>
            </div>
            <div className="w-[1px] flex-1 bg-black/85" />
          </div>

          {/* CARD CONTENT LAYER */}
          <div className="relative md:absolute inset-0 flex flex-col items-center justify-between pt-[7.5%] pb-[7.2%] px-[7%] pointer-events-none z-20 gap-5 md:gap-0">
            {/* Top Section: Category Label + Main Headline */}
            <div className="w-full flex flex-col items-center text-center pointer-events-auto">
              {/* Category Label: "A STORY OF INNER AWAKENING" */}
              <p className="font-sans font-bold text-black text-[clamp(8px,1.15cqi,13.5px)] tracking-[0.24em] sm:tracking-[0.28em] uppercase mb-2 sm:mb-3 md:mb-3.5 select-text">
                {categoryLabel}
              </p>

              {/* Headline: 3 Lines in Playfair Display */}
              <h2 className="font-playfair text-black text-[clamp(17px,3.52cqi,41px)] font-normal leading-[1.14] tracking-[-0.02em] max-w-[530px] select-text">
                {headline.map((line, idx) => (
                  <span key={idx} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </h2>
            </div>

            {/* Middle Section: Two Story Blocks with Text on Left, Photo on Right */}
            <div className="w-full max-w-[340px] sm:max-w-[370px] md:max-w-[395px] flex flex-col gap-4 sm:gap-5 md:gap-6 my-auto pointer-events-auto">
              {/* Block 1: BIMA, THE STRONGEST OF THE PANDAWA... */}
              <div className="flex items-center justify-between gap-3 sm:gap-4 md:gap-6">
                {/* Left Text */}
                <div className="flex-1 text-left font-sans font-bold text-black text-[clamp(7px,0.94cqi,11.5px)] uppercase leading-[1.32] sm:leading-[1.38] tracking-wider select-text">
                  {block1.lines.map((line, idx) => (
                    <p key={idx} className="whitespace-nowrap">
                      {line}
                    </p>
                  ))}
                </div>

                {/* Right Photo */}
                <div className="relative w-[90px] sm:w-[110px] md:w-[130px] aspect-[126/138] shrink-0 border-[1.5px] border-black/90 shadow-md overflow-hidden bg-black">
                  <Image
                    src={block1.imageSrc}
                    alt={block1.imageAlt}
                    fill
                    sizes="130px"
                    className="object-cover object-center pointer-events-none"
                  />
                </div>
              </div>

              {/* Block 2: GUIDED BY A MYSTERIOUS CALLING... */}
              <div className="flex items-center justify-between gap-3 sm:gap-4 md:gap-6">
                {/* Left Text */}
                <div className="flex-1 text-left font-sans font-bold text-black text-[clamp(7px,0.94cqi,11.5px)] uppercase leading-[1.32] sm:leading-[1.38] tracking-wider select-text">
                  {block2.lines.map((line, idx) => (
                    <p key={idx} className="whitespace-nowrap">
                      {line}
                    </p>
                  ))}
                </div>

                {/* Right Photo */}
                <div className="relative w-[90px] sm:w-[110px] md:w-[130px] aspect-[125/133] shrink-0 border-[1.5px] border-black/90 shadow-md overflow-hidden bg-black">
                  <Image
                    src={block2.imageSrc}
                    alt={block2.imageAlt}
                    fill
                    sizes="130px"
                    className="object-cover object-center pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Section: "READ MORE →" Pill Button */}
            <div className="pointer-events-auto mt-2 md:mt-0">
              <Link
                href={readMoreHref}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-1.5 sm:py-2 rounded-full border-[1.5px] border-black text-black font-sans font-bold text-[clamp(8px,1.05cqi,13px)] tracking-wider uppercase bg-transparent hover:bg-black hover:text-[#dedf42] active:scale-95 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              >
                <span>{readMoreText}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
