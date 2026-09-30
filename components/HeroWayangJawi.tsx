'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface HeroWayangJawiProps {
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
  navLinks = [
    { label: 'CERITA', href: '#fitur' },
    { label: 'LAKON', href: '#lakon' },
    { label: 'TOKOH', href: '#cara-bermain' },
    { label: 'MUSEUM', href: '#galeri' },
    { label: 'WARTA', href: '#filosofi' },
  ],
  ticketText = 'MAINKAN WAYANG',
  ticketHref = '/stage',
  aksaraText = 'ꦠꦼꦂꦱꦶꦤꦺꦴꦮꦂꦠ ꦮꦪꦁ ꦗꦮꦶ ꦏꦭ ꦮꦼꦔꦶ',
  title = { line1: 'Malam', line2: 'Wayang', line3: 'Jawi' },
  cardTagline = 'KISAH LELUHUR, DIHIDUPKAN KEMBALI SETELAH\nGELAP. TAK SEMUA YANG LAMA HARUS\nTETAP TINGGAL DI MASA LALU.',
  venue = 'JELAJAHI PANGGUNG',
  venueHref = '/stage',
  cardBackground = '/images/wayang-stage-bg.png',
}: HeroWayangJawiProps) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#050303] text-[#dedf42] overflow-hidden select-none">
      {/* Full-bleed Background Image */}
      <Image
        data-gsap="hero-bg"
        src={cardBackground}
        alt="Wayang Kulit Background Scene"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center pointer-events-none brightness-[0.55] contrast-[1.15]"
      />

      {/* Atmospheric Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/50 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,3,3,0.05)_0%,rgba(5,3,3,0.35)_60%,rgba(5,3,3,0.75)_100%)] pointer-events-none" />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-5 sm:py-7 md:py-9">
        {/* Top Bar: Nav Left + Ticket Right */}
        {/* Top Bar: Nav Left + Action Button Right */}
        <header data-gsap="hero-nav" className="w-full flex items-center justify-between gap-4">
          <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm font-bold tracking-wider text-[#dedf42] uppercase font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {navLinks.map((link, idx) => (
              <React.Fragment key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:brightness-125 transition-all focus:outline-none focus:underline py-1"
                >
                  {link.label}
                </a>
                {idx < navLinks.length - 1 && <span className="opacity-40">,</span>}
              </React.Fragment>
            ))}
          </nav>

          <Link
            href={ticketHref}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#dedf42]/70 bg-[#dedf42]/10 hover:bg-[#dedf42] hover:text-black text-[#dedf42] font-bold text-[11px] sm:text-xs md:text-sm tracking-wider uppercase transition-all duration-300 shadow-md active:scale-95 flex items-center gap-1.5 group cursor-pointer backdrop-blur-sm shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          >
            <span>{ticketText}</span>
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </header>

        {/* Center: Title Block — Left-Aligned */}
        <div className="flex-1 flex flex-col items-center justify-center text-center py-8 sm:py-12 md:py-16">
          {/* Aksara Jawa */}
          {aksaraText && (
            <p
              data-gsap="hero-aksara"
              className="text-[#dedf42]/80 text-[10px] sm:text-xs md:text-sm lg:text-base tracking-[0.20em] font-serif mb-3 sm:mb-4 md:mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
              aria-label="Aksara Jawa Subtitle"
            >
              {aksaraText}
            </p>
          )}

          {/* Main Headline — Centered */}
          <h1 className="font-serif font-bold text-[#dedf42] text-7xl sm:text-8xl md:text-9xl lg:text-[130px] xl:text-[160px] leading-[0.98] tracking-[-0.03em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.98)]">
            {title.line1 && (
              <span data-gsap="hero-title-line" className="block will-change-transform">
                {title.line1}
              </span>
            )}
            {title.line2 && (
              <span data-gsap="hero-title-line" className="block will-change-transform">
                {title.line2}
              </span>
            )}
            {title.line3 && (
              <span data-gsap="hero-title-line" className="block will-change-transform">
                {title.line3}
              </span>
            )}
          </h1>
        </div>

        {/* Bottom Bar: Tagline Left + Pills Right */}
        <div data-gsap="hero-bottom" className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 w-full">
          <p className="text-[9px] sm:text-[11px] md:text-xs lg:text-[13px] font-bold tracking-wider text-[#dedf42]/70 uppercase leading-[1.35] font-sans max-w-xs md:max-w-sm whitespace-pre-line drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {cardTagline}
          </p>

          <div className="flex items-center">
            <Link
              href={venueHref}
              className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full border border-[#dedf42]/70 text-[10px] sm:text-xs md:text-sm font-bold tracking-wider text-[#dedf42] uppercase whitespace-nowrap bg-black/40 backdrop-blur-md hover:bg-[#dedf42] hover:text-[#050303] active:scale-95 transition-all flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-[#dedf42] shadow-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] cursor-pointer"
            >
              <span>{venue}</span>
              <span className="transition-transform group-hover:translate-x-1 text-sm sm:text-base leading-none">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
