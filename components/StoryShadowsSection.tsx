'use client';

import React from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
export interface StoryShadowsSectionProps {
  id?: string;
  tagline?: string[];
  pillText?: string;
  headline?: string;
  photoSrc?: string;
  photoAlt?: string;
  poeticLines?: Array<string[]>;
}

export default function StoryShadowsSection({
  id = 'fitur',
  tagline = ['KETIKA KELIR', 'BERTUTUR KATA'],
  headline = 'Jauh sebelum cahaya layar mengisi peradaban, leluhur bertutur lewat tarian siluet di selembar kelir. Tangan sang dalang, percik blencong, dan tatahan kulit menjelma cermin jagad ksatria, dewa, dan sukma manusia.',
  photoSrc = '/images/dalang-story-photo.png',
  photoAlt = 'Dalang memainkan Wayang Kulit di balik layar kelir yang bercahaya',
  poeticLines = [
    ['TABUHAN SLENDRO BERDENGUNG,', 'MENYAPA HENING MALAM.'],
    ['API BLENCONG MENYALA,', 'MENETAS BAYANG DARI GELAP.'],
    ['KAYON BERGERAK,', 'JAGAD PAKELIRAN DIBUKA.'],
  ],
}: StoryShadowsSectionProps) {
  return (
    <section
      id={id}
      className="relative w-full bg-[#0a0a0a] text-[#dedf42] overflow-hidden select-none"
    >
      {/* Main Theatrical Black Card - Full Width, no yellow wrapper */}
      <div
        data-gsap="story-card"
        className="relative w-full aspect-[1354/846] overflow-hidden bg-[#0a0a0a] @container"
      >
        {/* Solid deep pitch-black backdrop */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />

        {/* 1. TOP-LEFT TEXT: "A NIGHT WHERE \n SHADOWS SPEAK" */}
        <div
          data-gsap="story-tagline"
          className="absolute left-[3%] sm:left-[2.5%] top-[13.71%] z-10 pointer-events-auto"
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

        {/* 3. CENTER-LEFT MAIN HEADLINE with ScrollReveal word-by-word animation */}
        <div
          className="absolute left-[20%] top-[13.95%] z-10 pointer-events-auto"
          style={{ width: '76%' }}
        >
          <ScrollReveal
            baseOpacity={0.03}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
            rotationEnd="bottom center"
            wordAnimationEnd="bottom center"
            textClassName="font-playfair text-[#dedf42] text-[clamp(8px,3.18cqi,43px)] font-normal leading-[1.22] tracking-[-0.015em] select-text"
          >
            {headline}
          </ScrollReveal>
        </div>

        {/* 4. CENTER DALANG PERFORMANCE PHOTO */}
        <div
          data-gsap="story-photo"
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
          className="absolute right-[3%] sm:right-[2.5%] bottom-[10.40%] z-10 pointer-events-auto text-left"
          style={{ width: 'clamp(100px, 22cqi, 300px)' }}
        >
          <div className="font-sans font-semibold text-[#dedf42] text-[clamp(7px,1.15cqi,14px)] uppercase tracking-wider leading-[1.48] space-y-[clamp(6px,2cqi,24px)] select-text">
            {poeticLines.map((stanza, sIdx) => (
              <p key={sIdx} data-gsap="story-stanza">
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
    </section>
  );
}
