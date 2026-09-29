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
  tagline = ['MALAM SAAT', 'BAYANGAN BERBICARA'],
  pillText = '21 JUNI',
  headline = [
    'Jauh sebelum layar menerangi hidup kita, kisah-kisah',
    'dikisahkan melalui bayangan yang menari di atas kain putih.',
    'Tangan, cahaya, dan figur kulit yang diukir menjadi',
    'pahlawan, dewa, dan legenda.',
  ],
  photoSrc = '/images/dalang-story-photo.png',
  photoAlt = 'Dalang memainkan Wayang Kulit di balik layar kelir yang bercahaya',
  poeticLines = [
    ['GEMA IRAMA GAMELAN', 'MEMENUHI UDARA.'],
    ['KERLIP LAMPU MINYAK', 'MEMANCARKAN SILUET YANG MEMUKAU.'],
    ['SANG DALANG MEMULAI.'],
  ],
}: StoryShadowsSectionProps) {
  return (
    <section
      id={id}
      className="relative w-full bg-[#0a0a0a] text-[#dedf42] overflow-hidden select-none"
    >
      {/* Main Theatrical Black Card - Full Width, no yellow wrapper */}
      <div
        className="relative w-full aspect-[1354/846] overflow-hidden bg-[#0a0a0a] @container"
      >
        {/* Solid deep pitch-black backdrop */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />

        {/* 1. TOP-LEFT TEXT: "A NIGHT WHERE \n SHADOWS SPEAK" */}
        <div
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

        {/* 2. BOTTOM-LEFT PILL BADGE: "JUN 21TH" */}
        <div
          className="absolute left-[3%] sm:left-[2.5%] bottom-[9.93%] z-10 pointer-events-auto"
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

        {/* 3. CENTER-LEFT MAIN HEADLINE */}
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
          className="absolute right-[3%] sm:right-[2.5%] bottom-[10.40%] z-10 pointer-events-auto text-left"
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
    </section>
  );
}
