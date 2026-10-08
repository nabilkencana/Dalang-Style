'use client';

import React from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/animations/ScrollReveal';
import FlipCard from '@/components/ui/flip-card';
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
  photoSrc = '/images/dalang-story-photo.webp',
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
      {/* ── MOBILE VIEW: Editorial Vertical Flow (< 768px) ── */}
      <div className="block md:hidden w-full px-5 py-14 space-y-8 bg-[#0a0a0a]">
        {/* Top Tagline & Headline */}
        <div data-gsap="story-tagline" className="space-y-3">
          <p className="font-mono text-xs font-bold text-[#dedf42] uppercase tracking-[0.24em]">
            {tagline.join(' • ')}
          </p>
          <div className="text-left">
            <ScrollReveal
              baseOpacity={0.42}
              enableBlur={true}
              baseRotation={0}
              blurStrength={8}
              rotationEnd="bottom center"
              wordAnimationEnd="bottom center"
              textClassName="font-playfair text-[#dedf42] text-lg sm:text-xl font-normal leading-relaxed tracking-tight select-text"
            >
              {headline}
            </ScrollReveal>
          </div>
        </div>

        {/* Center: Interactive 3D Dalang Flip Card */}
        <div data-gsap="story-photo" className="w-full flex justify-center py-2">
          <div className="w-full max-w-[360px] aspect-[441/388] rounded-xl overflow-hidden shadow-2xl border border-white/15">
            <FlipCard
              width="100%"
              height="100%"
              radius={8}
              background="#0a0a0a"
              color="#dedf42"
              tilt
              tiltMax={10}
              glare
              glareOpacity={0.2}
              shadow
              className="w-full h-full"
              ariaLabel="Foto pertunjukan Sang Dalang (ketuk untuk melihat filosofi pakeliran)"
              front={
                <div className="relative w-full h-full bg-[#0a0a0a] overflow-hidden">
                  <Image
                    src={photoSrc}
                    alt={photoAlt}
                    fill
                    sizes="100vw"
                    className="object-cover object-center pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                  <div className="absolute bottom-3 right-3 pointer-events-none">
                    <span className="text-[10px] font-sans text-[#f4e7cd]/90 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/15 flex items-center gap-1.5 shadow-lg">
                      <span>Ketuk untuk membalik</span>
                      <span className="text-[#dedf42]">↺</span>
                    </span>
                  </div>
                </div>
              }
              back={
                <div className="relative w-full h-full p-5 flex flex-col justify-between bg-gradient-to-br from-[#1a140b] via-[#0d0905] to-[#040202] text-[#f4e7cd] select-text shadow-2xl">
                  <div>
                    <div className="flex items-center justify-between text-[#dedf42]/80 text-[10px] font-sans font-bold tracking-[0.22em] uppercase mb-1.5">
                      <span>FILOSOFI PAKELIRAN</span>
                      <span className="font-serif tracking-widest text-[#dedf42]">ꦥꦏꦼꦭꦶꦫꦤ꧀</span>
                    </div>
                    <h3 className="font-playfair text-[#dedf42] text-xl font-normal tracking-tight leading-snug">
                      Sang Dalang & Jagad Kelir
                    </h3>
                  </div>
                  <p className="text-xs text-[#f4e7cd]/90 leading-relaxed font-sans font-normal my-2">
                    Di balik selembar kelir putih, Sang Dalang bertindak sebagai cermin semesta — menyatukan cipta, sukma bayangan, dan nyala api blencong untuk menyingkap hakikat watak manusia.
                  </p>
                  <div className="pt-2.5 border-t border-[#dedf42]/20 flex items-center justify-between text-[10px] font-sans text-[#dedf42]">
                    <span className="font-semibold uppercase tracking-wider">✦ Cipta • Rasa • Karsa</span>
                    <span className="text-[#f4e7cd]/70">Ketuk balik ↻</span>
                  </div>
                </div>
              }
            />
          </div>
        </div>

        {/* Bottom: Poetic Stanzas */}
        <div className="border-t border-[#dedf42]/20 pt-6 space-y-4">
          {poeticLines.map((stanza, sIdx) => (
            <p key={sIdx} data-gsap="story-stanza" className="font-sans font-semibold text-[#dedf42]/90 text-xs uppercase tracking-wider leading-relaxed">
              {stanza.join(' ')}
            </p>
          ))}
        </div>
      </div>

      {/* ── DESKTOP & TABLET VIEW: Exact Theatrical Reference Ratio (>= 768px) ── */}
      <div
        data-gsap="story-card"
        className="hidden md:block relative w-full aspect-[1354/846] overflow-hidden bg-[#0a0a0a] @container"
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
            baseOpacity={0.42}
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

        {/* 4. CENTER DALANG PERFORMANCE 3D FLIP CARD */}
        <div
          data-gsap="story-photo"
          className="absolute left-[24%] top-[47.5%] z-20 pointer-events-auto"
          style={{ width: '35.5%', height: '46.5%' }}
        >
          <FlipCard
            width="100%"
            height="100%"
            radius={2}
            background="#0a0a0a"
            color="#dedf42"
            tilt
            tiltMax={12}
            glare
            glareOpacity={0.2}
            hoverScale={1.02}
            shadow
            shadowColor="#000000"
            shadowOpacity={0.6}
            className="w-full h-full"
            ariaLabel="Foto pertunjukan Sang Dalang (ketuk untuk melihat filosofi pakeliran)"
            front={
              <div className="relative w-full h-full bg-[#0a0a0a] rounded-[2px] overflow-hidden">
                <Image
                  src={photoSrc}
                  alt={photoAlt}
                  fill
                  sizes="(max-width: 1504px) 35vw, 429px"
                  className="object-cover object-center pointer-events-none"
                />
                {/* Subtle theatrical vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15 pointer-events-none" />
                {/* Flip hint at bottom right (Sang Dalang badge removed) */}
                <div className="absolute bottom-2.5 right-2.5 pointer-events-none">
                  <span className="text-[9px] sm:text-[10px] font-sans text-[#f4e7cd]/80 bg-black/75 backdrop-blur-sm px-2.5 py-1 rounded-[3px] border border-white/10 flex items-center gap-1.5 shadow-md">
                    <span>Ketuk untuk membalik</span>
                    <span className="text-[#dedf42]">↺</span>
                  </span>
                </div>
              </div>
            }
            back={
              <div className="relative w-full h-full p-4 sm:p-6 md:p-7 flex flex-col justify-between bg-gradient-to-br from-[#1a140b] via-[#0d0905] to-[#040202] rounded-[2px] text-[#f4e7cd] select-text shadow-2xl">
                {/* Top Aksara & Kicker */}
                <div>
                  <div className="flex items-center justify-between text-[#dedf42]/70 text-[9px] sm:text-[10.5px] font-sans font-bold tracking-[0.22em] uppercase mb-1.5 sm:mb-2">
                    <span>FILOSOFI PAKELIRAN</span>
                    <span className="font-serif tracking-widest text-[#dedf42]">ꦥꦏꦼꦭꦶꦫꦤ꧀</span>
                  </div>
                  <h3 className="font-playfair text-[#dedf42] text-base sm:text-xl md:text-2xl font-normal tracking-tight leading-snug">
                    Sang Dalang & Jagad Kelir
                  </h3>
                </div>

                {/* Philosophical Narrative */}
                <p className="text-[9.5px] sm:text-xs md:text-[13px] text-[#f4e7cd]/85 leading-relaxed font-sans font-normal my-1 sm:my-2">
                  Di balik selembar kelir putih, Sang Dalang bertindak sebagai cermin semesta — menyatukan cipta, sukma bayangan, dan nyala api blencong untuk menyingkap hakikat watak manusia.
                </p>

                {/* Footer Cultural Notes */}
                <div className="pt-2.5 sm:pt-3 border-t border-[#dedf42]/20 flex items-center justify-between text-[8.5px] sm:text-[10px] font-sans text-[#dedf42]/85">
                  <span className="font-semibold uppercase tracking-wider">✦ Cipta • Rasa • Karsa</span>
                  <span className="text-[#f4e7cd]/60">Ketuk balik ↻</span>
                </div>
              </div>
            }
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
