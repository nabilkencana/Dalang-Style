'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface HeroWayangJawiProps {
  brand?: {
    line1?: string;
    line2?: string;
  };
  headerTagline?: string;
  navLinks?: Array<{ label: string; href: string }>;
  ticketText?: string;
  ticketHref?: string;
  aksaraText?: string;
  title?: {
    line1?: string;
    line2?: string;
    line3?: string;
  };
  cardTagline?: string;
  date?: string;
  venue?: string;
  venueHref?: string;
  cardBackground?: string;
}

export default function HeroWayangJawi({
  brand = { line1: 'Wayang', line2: 'Jawi' },
  headerTagline = 'ANCESTRAL STORIES,\nREIMAGINED AFTER\nDARK. NOT EVERYTHING\nOLD IS MEANT TO STAY IN\nTHE PAST.',
  navLinks = [
    { label: 'OVERVIEW', href: '#overview' },
    { label: 'ACTOR', href: '#actor' },
    { label: 'STORY', href: '#story' },
  ],
  ticketText = 'BOOK THE TICKET',
  ticketHref = '/stage',
  aksaraText = 'ꦠꦼꦂꦱꦶꦤꦺꦴꦮꦂꦠ ꦮꦪꦁ ꦗꦮꦶ ꦏꦭ ꦮꦼꦔꦶ',
  title = { line1: 'The Night', line2: 'Wayang', line3: 'Jawi' },
  cardTagline = 'ANCESTRAL STORIES, REIMAGINED AFTER\nDARK. NOT EVERYTHING OLD IS MEANT TO\nSTAY IN THE PAST.',
  date = 'JUN 21TH 2026',
  venue = 'YASINTHA CAMPUS',
  venueHref = '/stage',
  cardBackground = '/images/wayang-stage-bg.webp',
}: HeroWayangJawiProps) {
  return (
    <section className="relative w-full bg-[#dedf42] text-[#000000] overflow-hidden select-none">
      {/* 1. Outer Chartreuse Yellow Canvas Container - Full Width */}
      <div
        className="w-full px-3 sm:px-6 md:px-10 lg:px-12 xl:px-16 pt-5 sm:pt-8 md:pt-10 pb-2 sm:pb-3 md:pb-4 flex flex-col justify-between"
        style={{
          background: 'radial-gradient(circle at 75% 20%, #e8e84d 0%, #dedf42 55%, #cfd033 100%)',
        }}
      >
        <header className="w-full flex items-center justify-between gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-10">
          {/* Brand Logo - Pure Code Typography */}
          <Link href="/" className="inline-block shrink-0 group focus:outline-none">
            <div className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[0.84] text-[#000000] tracking-[-0.03em] flex flex-col">
              <span className="transition-transform group-hover:scale-[1.01] origin-left">
                {brand.line1}
              </span>
              <span className="transition-transform group-hover:scale-[1.01] origin-left">
                <span className="italic font-normal">{brand.line2?.charAt(0)}</span>
                {brand.line2?.slice(1)}
              </span>
            </div>
          </Link>

          {/* Thin Horizontal Divider Line */}
          <div className="flex-1 h-[1.5px] bg-[#000000] hidden sm:block mx-3 md:mx-6 lg:mx-8" />

          {/* Right Header Text Block - Pure Code Typography */}
          <div className="text-[10px] sm:text-xs md:text-sm font-bold tracking-tight text-[#000000] uppercase text-right leading-[1.3] font-sans shrink-0 whitespace-pre-line">
            {headerTagline}
          </div>
        </header>

        {/* 2. Main Inner Hero Card - Full Width with Refined Shadow */}
        <div className="relative w-full aspect-[1346/892] rounded-none overflow-hidden bg-[#050303] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.75),0_0_60px_rgba(0,0,0,0.35)] border border-black/20">
          <Image
            src={cardBackground}
            alt="Wayang Kulit Background Scene"
            fill
            priority
            sizes="(max-width: 1504px) 100vw, 1346px"
            className="object-cover object-center pointer-events-none brightness-[0.78] contrast-[1.08]"
          />

          {/* Soft Atmospheric Vignette (keeps characters clearly visible while ensuring text contrast) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,3,3,0.12)_0%,rgba(5,3,3,0.42)_65%,rgba(5,3,3,0.78)_100%)] pointer-events-none" />
          {/* Center Stage Title & Aksara Jawa - 100% PURE CODE */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none px-4 pt-4 sm:pt-6 md:pt-8">
            {/* Aksara Jawa Calligraphy */}
            {aksaraText && (
              <p
                className="text-[#dedf42] text-[11px] sm:text-xs md:text-sm lg:text-base tracking-[0.25em] font-serif mb-1 sm:mb-2 md:mb-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] select-text pointer-events-auto"
                aria-label="Aksara Jawa Subtitle"
              >
                {aksaraText}
              </p>
            )}

            {/* Main Headline Title */}
            <h1 className="font-serif font-bold text-[#dedf42] text-5xl sm:text-7xl md:text-8xl lg:text-[108px] xl:text-[118px] leading-[0.85] tracking-[-0.03em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.98)] select-text pointer-events-auto">
              {title.line1 && <span className="block">{title.line1}</span>}
              {title.line2 && <span className="block">{title.line2}</span>}
              {title.line3 && <span className="block">{title.line3}</span>}
            </h1>
          </div>

          {/* Interactive Overlay Sub-Bars - 100% PURE CODE */}
          <div className="absolute inset-0 flex flex-col justify-between px-[2.6%] pt-[3.4%] pb-[8.2%] pointer-events-none z-20">
            {/* Top Sub-Bar Inside Card */}
            <div className="flex items-center justify-between w-full pointer-events-auto">
              {/* Navigation Links */}
              <nav className="flex items-center gap-1.5 text-[10px] sm:text-xs md:text-[13px] font-bold tracking-wider text-[#dedf42] uppercase font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {navLinks.map((link, idx) => (
                  <React.Fragment key={link.label}>
                    <a
                      href={link.href}
                      className="hover:brightness-125 transition-all focus:outline-none focus:underline"
                    >
                      {link.label}
                    </a>
                    {idx < navLinks.length - 1 && <span className="opacity-80">,</span>}
                  </React.Fragment>
                ))}
              </nav>

              {/* Book Ticket CTA */}
              <Link
                href={ticketHref}
                className="text-[10px] sm:text-xs md:text-[13px] font-bold tracking-wider text-[#dedf42] uppercase underline underline-offset-4 hover:brightness-125 active:translate-y-0.5 transition-all font-sans focus:outline-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
              >
                {ticketText}
              </Link>
            </div>

            {/* Bottom Sub-Bar Inside Card */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 w-full pointer-events-auto">
              {/* Bottom Tagline Paragraph */}
              <p className="text-[9px] sm:text-[11px] md:text-xs lg:text-[12.5px] font-bold tracking-wider text-[#dedf42] uppercase leading-[1.3] font-sans max-w-xs md:max-w-md whitespace-pre-line select-text drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {cardTagline}
              </p>

              {/* Bottom Pill Badges */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Date Pill */}
                <span className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-[#dedf42]/90 text-[9px] sm:text-xs md:text-[13px] font-bold tracking-wider text-[#dedf42] uppercase whitespace-nowrap bg-black/50 backdrop-blur-md shadow-sm">
                  {date}
                </span>

                {/* Venue Link Pill */}
                <Link
                  href={venueHref}
                  className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-[#dedf42]/90 text-[9px] sm:text-xs md:text-[13px] font-bold tracking-wider text-[#dedf42] uppercase whitespace-nowrap bg-black/50 backdrop-blur-md hover:bg-[#dedf42] hover:text-[#050303] active:scale-95 transition-all flex items-center gap-1.5 group shadow-sm focus:outline-none focus:ring-2 focus:ring-[#dedf42]"
                >
                  <span>{venue}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
