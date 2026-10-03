'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { WorksWheelItem } from '@/components/ui/works-wheel';

export interface MobileTokohSectionProps {
  items: WorksWheelItem[];
  categoryLabel?: string;
  readMoreText?: string;
  readMoreHref?: string;
}

export default function MobileTokohSection({
  items,
  categoryLabel = 'GALERI TOKOH PEWAYANGAN',
  readMoreText = 'JELAJAHI KATALOG LENGKAP →',
  readMoreHref = '/katalog',
}: MobileTokohSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.85));
    setActiveIndex(Math.min(Math.max(0, index), items.length - 1));
  };

  const scrollToIndex = (idx: number) => {
    if (!scrollContainerRef.current) return;
    const cardWidth = scrollContainerRef.current.clientWidth * 0.85;
    scrollContainerRef.current.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth',
    });
    setActiveIndex(idx);
  };

  return (
    <div className="w-full bg-[#dedf42] text-black py-8 px-4 flex flex-col justify-between select-none">
      {/* ── Top Header ── */}
      <div className="text-center max-w-sm mx-auto mb-6">
        <p className="font-mono text-[10px] font-bold tracking-[0.22em] text-black/75 uppercase mb-2">
          {categoryLabel}
        </p>
        <h2 className="font-serif italic font-bold text-2xl text-[#050303] leading-tight mb-2">
          Ragam Watak Luhur Cermin Jiwa Manusia
        </h2>
        <p className="font-sans text-xs text-black/75 leading-relaxed">
          Geser kartu untuk menyingkap watak ksatria, pusaka sakti, dan filosofi kebijaksanaan para tokoh:
        </p>
      </div>

      {/* ── Horizontal Touch-Snap Carousel ── */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x"
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="w-[82vw] max-w-[310px] snap-center shrink-0 bg-[#0e0805] text-[#f5ecd9] rounded-3xl p-5 border border-black/90 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between"
          >
            <div>
              {/* Role pill & Index */}
              <div className="flex items-center justify-between gap-2 mb-3 border-b border-[#dedf42]/20 pb-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#dedf42]/10 text-[#dedf42] border border-[#dedf42]/30 uppercase tracking-wider">
                  {item.role}
                </span>
                <span className="text-[10px] font-mono text-[#f5ecd9]/50">
                  0{idx + 1} / 0{items.length}
                </span>
              </div>

              {/* Wayang Puppet Artwork Showcase */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-black/60 border border-[#d9a441]/25 flex items-center justify-center p-3 mb-4 group">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-2 drop-shadow-[0_8px_20px_rgba(222,223,66,0.3)] transition-transform duration-300"
                  sizes="(max-width: 640px) 280px, 320px"
                  priority={idx === 0}
                />
              </div>

              {/* Title & Description */}
              <h3 className="font-serif italic font-bold text-2xl text-[#dedf42] mb-1.5">
                {item.title}
              </h3>
              <p className="font-sans text-xs text-[#f5ecd9]/80 leading-relaxed mb-4">
                {item.description}
              </p>
            </div>

            {/* Action Link */}
            <Link
              href={item.href || '/katalog'}
              className="w-full py-3 px-4 rounded-2xl bg-[#dedf42] active:bg-[#e6e556] text-black font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>Telusuri Kisah Tokoh</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>

      {/* ── Carousel Pagination Indicators & Arrows ── */}
      <div className="flex items-center justify-between px-6 pt-3 mb-6">
        <button
          type="button"
          onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
          aria-label="Karakter Sebelumnya"
          className="w-8 h-8 rounded-full bg-black/80 text-[#dedf42] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center active:scale-95 transition-all shadow-md"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Buka Tokoh ${i + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeIndex === i ? 'w-6 bg-black' : 'w-1.5 bg-black/30'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollToIndex(Math.min(items.length - 1, activeIndex + 1))}
          disabled={activeIndex === items.length - 1}
          aria-label="Karakter Berikutnya"
          className="w-8 h-8 rounded-full bg-black/80 text-[#dedf42] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center active:scale-95 transition-all shadow-md"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ── Bottom Catalog Button ── */}
      <div className="text-center pt-2 border-t border-black/20">
        <Link
          href={readMoreHref}
          className="inline-flex items-center justify-center gap-2 py-3 px-8 rounded-full border-2 border-black bg-black text-[#dedf42] font-sans font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all"
        >
          <span>{readMoreText}</span>
        </Link>
      </div>
    </div>
  );
}
