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
    headline: 'Every movement holds meaning.',
    subtext:
      'EVERY GESTURE, NO MATTER HOW SUBTLE, CARRIES A PURPOSE—EXPRESSING EMOTION, INTENTION, AND PHILOSOPHY THROUGH MOVEMENT, TURNING EACH SCENE INTO A LANGUAGE BEYOND WORDS.',
  },
  {
    number: 2,
    headline: 'Every pause carries emotion.',
    subtext:
      'IN EVERY SILENCE, THERE IS A FEELING UNFOLDING—ALLOWING THE STORY TO BREATHE, DEEPEN, AND RESONATE BEYOND WHAT IS SPOKEN.',
  },
  {
    number: 3,
    headline: 'Every character reflects a piece of humanity',
    subtext:
      'EACH CHARACTER BECOMES A MIRROR—REVEALING FRAGMENTS OF WHO WE ARE, SHAPED BY THE CHOICES WE MAKE, THE DESIRES WE HOLD, AND THE STRUGGLES WE ENDURE.',
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
      className="relative w-full bg-[#dedf42] text-[#000000] overflow-hidden select-none py-2 sm:py-3 md:py-4 edge-fade-top edge-fade-bottom"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Outer Full-Width Canvas Container matching Section 1 & Section 2 */}
      <div
        className="w-full px-3 sm:px-6 md:px-10 lg:px-12 xl:px-16 flex items-center justify-center"
        style={{
          background:
            'radial-gradient(circle at 75% 20%, #e8e84d 0%, #dedf42 55%, #cfd033 100%)',
        }}
      >
        {/* Main Central Card (Aspect 1354 x 846 = 1.60) - Full Width */}
        <div className="relative w-full aspect-auto md:aspect-[1354/846] rounded-none overflow-hidden bg-[#0a0a0a] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.75),0_0_60px_rgba(0,0,0,0.35)] border border-black/20 @container z-10 min-h-[580px] md:min-h-0 flex items-center justify-center">
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
          <div className="relative z-20 w-full max-w-[780px] px-6 py-12 md:py-0 flex flex-col items-center text-center pointer-events-auto">
            {/* Interactive Number Pill Selector: ( 1 ) ( 2 ) ( 3 ) */}
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10">
              {slides.map((s, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={s.number}
                    onClick={() => setActiveIndex(idx)}
                    className={`px-4 sm:px-5 py-1 sm:py-1.5 rounded-full border text-[11px] sm:text-xs md:text-sm font-sans font-bold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'border-[#dedf42] bg-[#dedf42] text-black scale-105 shadow-[0_0_20px_rgba(222,223,66,0.4)]'
                        : 'border-[#dedf42]/50 text-[#dedf42]/70 hover:border-[#dedf42] hover:text-[#dedf42] bg-black/40'
                    }`}
                    title={`Slide ${s.number}`}
                  >
                    <span>{s.number}</span>
                  </button>
                );
              })}
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

            {/* Interactive Progress Indicator Dots */}
            <div className="flex items-center gap-2 mt-8 sm:mt-10">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    idx === activeIndex
                      ? 'w-8 bg-[#dedf42]'
                      : 'w-2 bg-[#dedf42]/30 hover:bg-[#dedf42]/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
