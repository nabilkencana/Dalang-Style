'use client';

import React, { useRef, useEffect, useState } from 'react';

export interface MarqueeTickerProps {
  items?: string[];
  separator?: string;
  variant?: 'tape' | 'header';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  /** How far the text travels (in pixels) over a full scroll pass */
  scrollRange?: number;
}

const DEFAULT_ITEMS = [
  'KISAH YANG HIDUP SETELAH MATAHARI TERBENAM',
  '21 JUNI 2026',
  '20.00 WIB - SELESAI',
  'YASINTHA CAMPUS',
  'HALAMAN ACARA',
  'WAYANG JAWI',
  'INDONESIA',
];

export default function MarqueeTicker({
  items = DEFAULT_ITEMS,
  separator = '•',
  variant = 'tape',
  size = 'xl',
  className = '',
  scrollRange = 2000,
}: MarqueeTickerProps) {
  const sequence = [...items, ...items, ...items, ...items];
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!el) { ticking = false; return; }
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight;

        // Progress: 0 when element enters bottom of viewport, 1 when it exits the top
        // Start position: text at +100vw (off-screen right)
        // End position: text scrolled well to the left
        const total = viewH + rect.height;
        const traveled = viewH - rect.top;
        const progress = Math.max(0, Math.min(1, traveled / total));

        // Start from right side of viewport, move left as user scrolls
        const startOffset = window.innerWidth;
        const x = startOffset - progress * (startOffset + scrollRange);
        setTranslateX(x);
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial position
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollRange]);

  if (variant === 'header') {
    return (
      <div
        className={`w-full h-8 sm:h-9 bg-[#e3e638] border-b border-black/15 text-black overflow-hidden flex items-center select-none z-30 ${className}`}
        aria-hidden="true"
      >
        <div className="animate-marquee duration-[35s] items-center">
          {sequence.map((item, idx) => (
            <div key={idx} className="flex items-center shrink-0">
              <span className="font-sans font-bold text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-black">
                {item}
              </span>
              <span className="mx-4 sm:mx-6 text-black/60 text-xs select-none">
                {separator}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const sizeStyles = {
    sm: {
      container: 'py-3 sm:py-4',
      text: 'text-xs sm:text-sm md:text-base tracking-[0.20em]',
      separator: 'text-xs sm:text-sm mx-4 sm:mx-6',
    },
    md: {
      container: 'py-4 sm:py-5',
      text: 'text-sm sm:text-base md:text-lg tracking-[0.22em]',
      separator: 'text-sm sm:text-base mx-5 sm:mx-7',
    },
    lg: {
      container: 'py-5 sm:py-6 md:py-7',
      text: 'text-base sm:text-lg md:text-xl lg:text-2xl tracking-[0.20em]',
      separator: 'text-base sm:text-lg md:text-xl mx-5 sm:mx-8 md:mx-10',
    },
    xl: {
      container: 'py-3 sm:py-4 md:py-5',
      text: 'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-[0.18em]',
      separator: 'text-base sm:text-lg md:text-xl lg:text-2xl mx-5 sm:mx-8 md:mx-12',
    },
  }[size];

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${sizeStyles.container} bg-[#e3e638] text-black overflow-hidden flex items-center select-none z-20 ${className}`}
      aria-label="Event Ticker Tape"
    >
      <div
        className="flex items-center w-max will-change-transform"
        style={{ transform: `translateX(${translateX}px)` }}
      >
        {sequence.map((item, idx) => (
          <div key={idx} className="flex items-center shrink-0">
            <span className={`font-sans font-black ${sizeStyles.text} uppercase text-black`}>
              {item}
            </span>
            <span className={`${sizeStyles.separator} text-black select-none font-black`}>
              {separator}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
