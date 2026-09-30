'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export interface MovementSlide {
  number: number;
  headline: string;
  subtext: string;
}

export interface SectionMovementMeaningProps {
  id?: string;
  slides?: MovementSlide[];
  autoPlayInterval?: number;
  backgroundImage?: string;
}

const DEFAULT_SLIDES: MovementSlide[] = [
  {
    number: 1,
    headline: 'Setiap gerakan menyimpan makna.',
    subtext:
      'SETIAP GESTUR, SEKECIL APA PUN, MEMBAWA TUJUAN—MENGUNGKAPKAN EMOSI, NIAT, DAN FILOSOFI MELALUI GERAKAN, MENGUBAH SETIAP ADEGAN MENJADI BAHASA MELAMPAUI KATA.',
  },
  {
    number: 2,
    headline: 'Setiap jeda membawa emosi.',
    subtext:
      'DALAM SETIAP KEHENINGAN, ADA PERASAAN YANG MENGEMBANG—MEMBIARKAN CERITA BERNAPAS, MENGUAT, DAN BERGEMA MELAMPAUI YANG TERUCAP.',
  },
  {
    number: 3,
    headline: 'Setiap karakter mencerminkan sisi kemanusiaan',
    subtext:
      'SETIAP KARAKTER MENJADI CERMIN—MENGUNGKAP SERPIHAN SIAPA KITA, DIBENTUK OLEH PILIHAN YANG KITA BUAT, HASRAT YANG KITA GENGGAM, DAN PERJUANGAN YANG KITA JALANI.',
  },
];

export default function SectionMovementMeaning({
  id = 'makna',
  slides = DEFAULT_SLIDES,
  autoPlayInterval = 5000,
  backgroundImage = '/images/wayang-movement-bg.png',
}: SectionMovementMeaningProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused || autoPlayInterval <= 0) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => {
      clearInterval(timerRef.current as NodeJS.Timeout);
    };
  }, [isPaused, autoPlayInterval, slides.length]);

  const currentSlide = slides[activeIndex] || slides[0];

  return (
    <section
      id={id}
      className="relative w-full bg-[#0a0a0a] text-[#000000] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Central Card - Full Width */}
      <div data-gsap="meaning-card" className="relative w-full aspect-auto md:aspect-[1354/846] overflow-hidden bg-[#0a0a0a] @container min-h-[580px] md:min-h-0 flex items-center justify-center">
          {/* Authentic Illuminated Wayang Kulit Puppet Profile Backdrop */}
          <div className="absolute inset-0 bg-[#0a0a0a] pointer-events-none">
            <Image
              src={backgroundImage}
              alt="Illuminated Wayang Kulit Shadow Puppet"
              fill
              priority
              sizes="(max-width: 1504px) 100vw, 1354px"
              className="object-cover object-center pointer-events-none opacity-90 transition-transform duration-1000 ease-out"
            />
          </div>

          {/* Deep Vignette Mask for High Text Contrast */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,10,10,0.65)_0%,rgba(10,10,10,0.85)_60%,#0a0a0a_95%)] pointer-events-none z-10" />

          {/* CENTER CONTENT LAYER */}
          <div data-gsap="meaning-content" className="relative z-20 w-full max-w-[780px] px-6 py-12 md:py-0 flex flex-col items-center text-center pointer-events-auto">
            {/* Interactive Number Pill Selector: ( 1 ) ( 2 ) ( 3 ) */}
            <div className="mb-6 sm:mb-8 md:mb-10">
              <span className="px-4 sm:px-5 py-1 sm:py-1.5 rounded-full border border-[#dedf42] bg-[#dedf42] text-black font-sans font-bold text-[11px] sm:text-xs md:text-sm tracking-wider select-none">
                {currentSlide.number}
              </span>
            </div>

            {/* Headline with Smooth Cross-Fade Animation */}
            <div className="min-h-[90px] sm:min-h-[120px] md:min-h-[140px] flex items-center justify-center mb-4 sm:mb-6">
              <h2
                key={`hl-${activeIndex}`}
                className="font-playfair text-[#dedf42] text-[clamp(28px,4.8cqi,64px)] font-normal leading-[1.08] tracking-[-0.025em] select-text animate-fadeSlideUp"
              >
                {currentSlide.headline}
              </h2>
            </div>

            {/* Subtext Paragraph with Smooth Cross-Fade Animation */}
            <div className="min-h-[80px] sm:min-h-[95px] flex items-center justify-center max-w-[560px]">
              <p
                key={`st-${activeIndex}`}
                className="font-sans font-bold text-[#dedf42] text-[clamp(8px,1.02cqi,13px)] uppercase leading-[1.48] tracking-wider select-text animate-fadeSlideUp"
              >
                {currentSlide.subtext}
              </p>
            </div>

          </div>
        </div>
    </section>
  );
}
