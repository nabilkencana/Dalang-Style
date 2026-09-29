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
  headerBrandText = 'MALAM WAYANG JAWI',
  categoryLabel = 'KISAH KEBANGKITAN BATIN',
  headline = [
    'Saat dunia hening dan malam',
    'semakin larut, sebuah perjalanan',
    'yang berbeda dimulai.',
  ],
  block1 = {
    lines: [
      'BIMA, YANG TERKUAT DI ANTARA',
      'PANDAWA, DIKENAL AKAN',
      'KEKUATANNYA, KEBERANIANNYA,',
      'TEKADNYA YANG TAK TERGOYAHKAN.',
      'NAMUN DI MALAM INI, KEKUATAN',
      'SAJA TIDAKLAH CUKUP.',
    ],
    imageSrc: '/images/story-bima-portrait.png',
    imageAlt: 'Potret topeng dan kostum Wayang Wong Bima',
  },
  block2 = {
    lines: [
      'DITUNTUN OLEH PANGGILAN MISTERIUS,',
      'BIMA DIUTUS UNTUK MENCARI TIRTA',
      'PRAWITASARI—AIR SUCI',
      'KEHIDUPAN. NAMUN INI BUKANLAH',
      'PENCARIAN BIASA. IA MEMBAWANYA',
      'MELAMPAUI KERAJAAN DAN MEDAN',
      'PERTEMPURAN... MENUJU KEDALAMAN',
      'SAMUDERA YANG LUAS TAK TERDUGA.',
    ],
    imageSrc: '/images/story-ocean-battle.png',
    imageAlt: 'Bima menghadapi kekuatan gaib di kedalaman samudera',
  },
  readMoreText = 'BACA SELENGKAPNYA →',
  readMoreHref = '/stage',
  aksaraText = 'ꦭꦏꦺꦴꦤ꧀ ꦧꦶꦩ ꦱꦸꦕꦶ ꦠꦶꦂꦠ ꦥꦿꦮꦶꦠꦱꦫꦶ',
}: SectionStoryAwakeningProps) {
  return (
    <section
      id={id}
      className="relative w-full bg-[#0a0a0a] text-[#000000] overflow-hidden select-none"
    >
      <div className="relative w-full min-h-[580px] md:aspect-[1504/1128] @container overflow-hidden flex items-center justify-center py-10 md:py-0">
        {/* INNER STORY CARD - Full Width */}
        <div
          className="relative w-full aspect-auto md:aspect-[1126/814] overflow-hidden bg-[#dedf42] z-20 @container"
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
