'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import BlurText from '@/components/ui/blur-text';
import { cn } from '@/lib/utils';
export interface MovementSlide {
  number: number;
  headline: string;
  subtext: string;
  speaker?: string;
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
    speaker: 'Semar',
  },
  {
    number: 2,
    headline: 'Setiap jeda membawa emosi.',
    subtext:
      'DALAM SETIAP KEHENINGAN, ADA PERASAAN YANG MENGEMBANG—MEMBIARKAN CERITA BERNAPAS, MENGUAT, DAN BERGEMA MELAMPAUI YANG TERUCAP.',
    speaker: 'Arjuna',
  },
  {
    number: 3,
    headline: 'Setiap karakter mencerminkan sisi kemanusiaan',
    subtext:
      'SETIAP KARAKTER MENJADI CERMIN—MENGUNGKAP SERPIHAN SIAPA KITA, DIBENTUK OLEH PILIHAN YANG KITA BUAT, HASRAT YANG KITA GENGGAM, DAN PERJUANGAN YANG KITA JALANI.',
    speaker: 'Bima',
  },
];

export default function SectionMovementMeaning({
  id = 'makna',
  slides = DEFAULT_SLIDES,
  autoPlayInterval = 4500,
  backgroundImage = '/images/wayang-movement-bg.png',
}: SectionMovementMeaningProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);

  const handleNextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
    setCycleKey((k) => k + 1);
  }, [slides.length]);

  // Auto-advance synchronized precisely with the CSS progress animation duration
  useEffect(() => {
    if (autoPlayInterval <= 0) return;
    const timer = setInterval(() => {
      handleNextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlayInterval, handleNextSlide, cycleKey]);

  const handleSelectSlide = (idx: number) => {
    setActiveIndex(idx);
    setCycleKey((k) => k + 1);
  };


  const currentSlide = slides[activeIndex] || slides[0];

  return (
    <section
      id={id}
      className="relative w-full bg-[#0a0a0a] text-[#000000] overflow-hidden select-none"
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
          <div data-gsap="meaning-content" className="relative z-20 w-full max-w-[880px] sm:max-w-[920px] md:max-w-[960px] px-6 sm:px-10 md:px-12 py-12 md:py-4 flex flex-col items-center text-center pointer-events-auto">
            {/* Nomor Makna Pill Button (Di Atas) */}
            {/* Nomor Makna Pill Button (Di Atas — Diperbesar Sesuai Feedback) */}
            <div className="mb-6 sm:mb-8 md:mb-10 pointer-events-auto select-none">
              <motion.button
                key={currentSlide.number}
                initial={{ scale: 0.9, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                type="button"
                onClick={handleNextSlide}
                className="px-7 sm:px-9 py-2 sm:py-2.5 min-w-[56px] sm:min-w-[68px] rounded-full border-2 border-[#dedf42] bg-[#dedf42] text-black font-sans font-extrabold text-base sm:text-lg md:text-xl tracking-wider select-none transition-all cursor-pointer shadow-lg hover:shadow-[#dedf42]/25"
                title="Klik untuk berpindah ke makna berikutnya"
              >
                {currentSlide.number}
              </motion.button>
            </div>
            {/* Headline with BlurText Animation */}
            <div className="min-h-[95px] sm:min-h-[125px] md:min-h-[150px] flex items-center justify-center mb-4 sm:mb-6 w-full max-w-[880px]">
              <BlurText
                key={`hl-${activeIndex}`}
                text={currentSlide.headline}
                delay={80}
                animateBy="words"
                direction="top"
                stepDuration={0.35}
                className="font-playfair text-[#dedf42] text-[clamp(30px,5.2cqi,68px)] font-normal leading-[1.10] tracking-[-0.025em] select-text justify-center text-center w-full"
              />
            </div>

            {/* Subtext Paragraph with BlurText Animation */}
            <div className="min-h-[80px] sm:min-h-[95px] flex items-center justify-center max-w-[720px] sm:max-w-[760px] w-full">
              <BlurText
                key={`st-${activeIndex}`}
                text={currentSlide.subtext}
                delay={30}
                animateBy="words"
                direction="bottom"
                stepDuration={0.28}
                className="font-sans font-bold text-[#dedf42] text-[clamp(9px,1.15cqi,14px)] uppercase leading-[1.55] tracking-wider select-text justify-center text-center w-full"
              />
            </div>
            {/* 3. Speaker Attribution: Diperbesar Sesuai Feedback */}
            {currentSlide.speaker && (
              <motion.div
                key={`speaker-${activeIndex}`}
                initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                className="mt-6 sm:mt-8 select-text pointer-events-auto"
              >
                <p className="font-serif italic text-[#dedf42] text-xl sm:text-2xl md:text-3xl font-normal tracking-wide">
                  — {currentSlide.speaker}
                </p>
              </motion.div>
            )}

            {/* 4. Animated Pagination Indicator: Berpindah Di Bawah Teks */}
            <div
              className="mt-8 sm:mt-10 flex items-center gap-2.5 sm:gap-3 pointer-events-auto select-none"
              role="tablist"
              aria-label="Indikator Makna Wayang"
            >
              {slides.map((slide, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={slide.number}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Makna ${slide.number}${isActive ? ' (Sedang Aktif)' : ''}`}
                    onClick={() => handleSelectSlide(idx)}
                    style={{
                      width: isActive ? '60px' : '12px',
                      transition: 'width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease, background-color 0.3s ease',
                    }}
                    className={cn(
                      'relative h-3 rounded-full overflow-hidden cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/80',
                      isActive
                        ? 'bg-white/30 shadow-sm'
                        : 'bg-white/40 hover:bg-white/80 hover:scale-125'
                    )}
                    title={`Pindah ke Makna ${slide.number}`}
                  >
                    {/* Animated Progress Fill Bar inside Active Pill */}
                    {isActive && (
                      <div
                        key={`fill-${activeIndex}-${cycleKey}`}
                        className="h-full bg-white rounded-full origin-left"
                        style={{
                          animation: `meaningProgressFill ${autoPlayInterval}ms linear forwards`,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* 4. Large Background Watermark: Minimalis & Beranimasi (Hanya Nama Tokoh) */}
            {currentSlide.speaker && (
              <motion.div
                key={`watermark-${activeIndex}`}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -z-10 overflow-hidden"
                aria-hidden="true"
              >
                <span className="font-serif italic font-bold text-[#dedf42]/[0.05] text-[clamp(64px,14vw,180px)] tracking-[0.25em] uppercase whitespace-nowrap leading-none select-none">
                  {currentSlide.speaker}
                </span>
              </motion.div>
            )}
          </div>
        </div>
    </section>
  );
}
