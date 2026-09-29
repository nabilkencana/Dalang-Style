'use client';

import React from 'react';

export interface SectionConnectorProps {
  variant: 'yellow-to-dark' | 'dark-to-yellow' | 'dark-to-dark' | 'yellow-to-yellow';
  label?: string;
  sublabel?: string;
  aksara?: string;
  className?: string;
}

export default function SectionConnector({
  variant,
  label,
  sublabel,
  aksara,
  className = '',
}: SectionConnectorProps) {
  if (variant === 'yellow-to-dark') {
    return (
      <div
        className={`relative w-full h-16 sm:h-24 md:h-32 flex flex-col items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}
        style={{
          background: 'linear-gradient(180deg, #dedf42 0%, #7d801d 35%, #242205 70%, #000000 100%)',
        }}
      >
        {/* Subtle atmospheric glow in center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(222,223,66,0.18)_0%,transparent_70%)] pointer-events-none" />

        {/* Delicate decorative bridge */}
        {(label || aksara) && (
          <div className="relative z-10 flex items-center gap-3 sm:gap-5 px-4 opacity-80">
            <div className="h-[1px] w-12 sm:w-20 md:w-32 bg-gradient-to-r from-transparent to-[#dedf42]/60" />
            <div className="flex items-center gap-2 text-[#dedf42] text-[10px] sm:text-xs font-serif tracking-[0.25em] uppercase">
              {aksara && <span className="font-serif text-[#f2c76b]">{aksara}</span>}
              {aksara && (label || sublabel) && <span className="opacity-40">·</span>}
              {label && (
                <span className="font-sans font-bold text-[8.5px] sm:text-[10px] tracking-[0.28em] text-[#dedf42]">
                  {label}
                </span>
              )}
              {sublabel && <span className="opacity-40">·</span>}
              {sublabel && <span className="font-serif text-[#f2c76b]">{sublabel}</span>}
            </div>
            <div className="h-[1px] w-12 sm:w-20 md:w-32 bg-gradient-to-l from-transparent to-[#dedf42]/60" />
          </div>
        )}
      </div>
    );
  }

  if (variant === 'dark-to-yellow') {
    return (
      <div
        className={`relative w-full h-16 sm:h-24 md:h-32 flex flex-col items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}
        style={{
          background: 'linear-gradient(180deg, #000000 0%, #1c1803 30%, #696b16 70%, #dedf42 100%)',
        }}
      >
        {/* Subtle ambient light */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(222,223,66,0.15)_0%,transparent_70%)] pointer-events-none" />

        {(label || aksara) && (
          <div className="relative z-10 flex items-center gap-3 sm:gap-5 px-4 opacity-80">
            <div className="h-[1px] w-12 sm:w-20 md:w-32 bg-gradient-to-r from-transparent to-[#dedf42]/60" />
            <div className="flex items-center gap-2 text-[#dedf42] text-[10px] sm:text-xs font-serif tracking-[0.25em] uppercase">
              {aksara && <span className="font-serif text-[#f2c76b]">{aksara}</span>}
              {aksara && (label || sublabel) && <span className="opacity-40">·</span>}
              {label && (
                <span className="font-sans font-bold text-[8.5px] sm:text-[10px] tracking-[0.28em] text-[#dedf42]">
                  {label}
                </span>
              )}
              {sublabel && <span className="opacity-40">·</span>}
              {sublabel && <span className="font-serif text-[#f2c76b]">{sublabel}</span>}
            </div>
            <div className="h-[1px] w-12 sm:w-20 md:w-32 bg-gradient-to-l from-transparent to-[#dedf42]/60" />
          </div>
        )}
      </div>
    );
  }

  if (variant === 'dark-to-dark') {
    return (
      <div
        className={`relative w-full h-12 sm:h-16 md:h-20 flex flex-col items-center justify-center bg-[#000000] overflow-hidden pointer-events-none select-none ${className}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(222,223,66,0.06)_0%,transparent_65%)] pointer-events-none" />
        <div className="relative z-10 flex items-center gap-3 sm:gap-5 px-4 opacity-60">
          <div className="h-[1px] w-16 sm:w-28 md:w-44 bg-gradient-to-r from-transparent via-[#dedf42]/35 to-transparent" />
          {aksara && <span className="font-serif text-[#f2c76b]/70 text-xs sm:text-sm tracking-[0.3em]">{aksara}</span>}
          {label && (
            <span className="font-sans font-bold text-[8.5px] sm:text-[10px] tracking-[0.3em] text-[#dedf42]/80 uppercase">
              {label}
            </span>
          )}
          <div className="h-[1px] w-16 sm:w-28 md:w-44 bg-gradient-to-l from-transparent via-[#dedf42]/35 to-transparent" />
        </div>
      </div>
    );
  }

  // yellow-to-yellow
  return (
    <div
      className={`relative w-full h-8 sm:h-12 md:h-16 flex items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        background: 'radial-gradient(circle at 75% 20%, #e8e84d 0%, #dedf42 55%, #cfd033 100%)',
      }}
    >
      <div className="relative z-10 flex items-center gap-3 sm:gap-5 px-4 opacity-50">
        <div className="h-[1px] w-16 sm:w-28 md:w-40 bg-gradient-to-r from-transparent to-black/35" />
        {aksara && <span className="font-serif text-black/70 text-xs tracking-[0.25em]">{aksara}</span>}
        {label && (
          <span className="font-sans font-bold text-[8.5px] sm:text-[9.5px] tracking-[0.28em] text-black/70 uppercase">
            {label}
          </span>
        )}
        <div className="h-[1px] w-16 sm:w-28 md:w-40 bg-gradient-to-l from-transparent to-black/35" />
      </div>
    </div>
  );
}
