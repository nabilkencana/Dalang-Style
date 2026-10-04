'use client';

import React from 'react';
import Image from 'next/image';

export interface StoryShadowsSectionProps {
  id?: string;
  tagline?: string[];
  pillText?: string;
  headline?: string[];
  photoSrc?: string;
  photoAlt?: string;
  poeticLines?: Array<string[]>;
}

export default function StoryShadowsSection({
  id = 'fitur',
  tagline = ['A NIGHT WHERE', 'SHADOWS SPEAK'],
  pillText = 'JUN 21TH',
  headline = [
    'Long before screens lit up our lives, stories were',
    'told through shadows dancing on a white cloth.',
    'Hands, light, and leather carved figures became',
    'heroes, gods, and legends.',
  ],
  photoSrc = '/images/dalang-story-photo.webp',
  photoAlt = 'Dalang performing Wayang Kulit behind the illuminated kelir screen',
  poeticLines = [
    ['THE RHYTHMIC ECHO OF', 'GAMELAN FILLS THE AIR.'],
    ['THE FLICKER OF OIL LAMPS', 'CASTS HYPNOTIC SILHOUETTES.'],
    ['THE DALANG BEGINS.'],
  ],
}: StoryShadowsSectionProps) {
  return (
    <section
      id={id}
      className="relative w-full bg-[#dedf42] text-[#000000] overflow-hidden select-none edge-fade-top edge-fade-bottom"
    >
      {/* Outer Full-Width Canvas Container matching Section 1 Hero */}
      <div
        className="relative w-full px-3 sm:px-6 md:px-10 lg:px-12 xl:px-16 pt-2 sm:pt-3 md:pt-4 pb-2 sm:pb-3 md:pb-4 flex flex-col items-center justify-center"
        style={{
          background: 'radial-gradient(circle at 75% 20%, #e8e84d 0%, #dedf42 55%, #cfd033 100%)',
        }}
      >
        {/* Subtle authentic dalang watermark background texture */}
        <div className="absolute inset-0 pointer-events-none opacity-30 md:opacity-40">
          <Image
            src="/images/story-section-backdrop.webp"
            alt="Wayang Jawi Background Canvas"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center pointer-events-none"
          />
        </div>


        {/* Main Inner Theatrical Black Card (Aspect 1354 x 846 = 1.60) - Full Width */}
        <div
          className="relative w-full aspect-[1354/846] rounded-none overflow-hidden bg-[#0a0a0a] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.75),0_0_60px_rgba(0,0,0,0.35)] border border-black/20 @container z-10"
        >
          {/* Solid deep pitch-black backdrop */}
          <div className="absolute inset-0 bg-[#0a0a0a]" />

          {/* 1. TOP-LEFT TEXT: "A NIGHT WHERE \n SHADOWS SPEAK" */}
          <div
            className="absolute left-[1.70%] top-[13.71%] z-10 pointer-events-auto"
            style={{ width: 'clamp(55px, 9.16cqi, 124px)' }}
          >
            <p className="font-sans font-bold text-[#dedf42] text-[clamp(6px,1.03cqi,14px)] uppercase leading-[1.25] tracking-wider select-text">
              {tagline.map((line, idx) => (
                <span key={idx} className="block whitespace-nowrap">
                  {line}
                </span>
              ))}
            </p>
          </div>

          {/* 2. BOTTOM-LEFT PILL BADGE: "JUN 21TH" */}
          <div
            className="absolute left-[1.70%] bottom-[9.93%] z-10 pointer-events-auto"
            style={{
              width: 'clamp(52px, 9.16cqi, 124px)',
              height: 'clamp(18px, 2.81cqi, 38px)',
            }}
          >
            <div className="w-full h-full rounded-full border border-[#dedf42] flex items-center justify-center bg-black/40 hover:bg-[#dedf42] hover:text-black transition-all cursor-pointer group shadow-sm px-1">
              <span className="font-sans font-bold text-[#dedf42] group-hover:text-black text-[clamp(6px,0.96cqi,13px)] tracking-wider uppercase whitespace-nowrap transition-colors">
                {pillText}
              </span>
            </div>
          </div>

          {/* 3. CENTER-LEFT MAIN HEADLINE: "Long before screens lit up our lives..." */}
          <div
            className="absolute left-[26.00%] top-[13.95%] z-10 pointer-events-auto"
            style={{ width: '58.49%' }}
          >
            <h2 className="font-playfair text-[#dedf42] text-[clamp(8px,3.18cqi,43px)] font-normal leading-[1.18] tracking-[-0.015em] select-text">
              {headline.map((line, idx) => (
                <span key={idx} className="block whitespace-nowrap">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          {/* 4. CENTER DALANG PERFORMANCE PHOTO */}
          <div
            className="absolute left-[26.00%] top-[46.34%] z-10 overflow-hidden shadow-2xl"
            style={{ width: '31.68%', height: '44.21%' }}
          >
            <Image
              src={photoSrc}
              alt={photoAlt}
              fill
              sizes="(max-width: 1504px) 35vw, 429px"
              className="object-cover object-center pointer-events-none"
            />
          </div>

          {/* 5. BOTTOM-RIGHT POETIC STANZAS */}
          <div
            className="absolute right-[2.22%] bottom-[10.40%] z-10 pointer-events-auto text-left"
            style={{ width: 'clamp(68px, 16.91cqi, 229px)' }}
          >
            <div className="font-sans font-bold text-[#dedf42] text-[clamp(5.5px,1.00cqi,13.5px)] uppercase tracking-wider leading-[1.38] space-y-[clamp(4px,1.6cqi,22px)] select-text">
              {poeticLines.map((stanza, sIdx) => (
                <p key={sIdx}>
                  {stanza.map((line, lIdx) => (
                    <span key={lIdx} className="block whitespace-nowrap">
                      {line}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
