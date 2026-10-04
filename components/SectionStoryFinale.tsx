'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import InteractiveListPreview, {
  type InteractiveListItem,
} from '@/components/ui/interactive-list-preview';
import { OriginButton } from '@/components/ui/origin-button';

export interface SectionStoryFinaleProps {
  id?: string;
  categoryLabel?: string;
  headline?: {
    line1: string;
    line2: string;
  };
  paragraphStanzas?: string[][];
  articles?: InteractiveListItem[];
  brand?: {
    line1: string;
    line2: string;
  };
  tagline?: string;
  backdropImage?: string;
}

const DEFAULT_PREVIEW_ARTICLES: InteractiveListItem[] = [
  {
    client: 'Wayang Puppet Theatre: Masterpiece of Oral and Intangible Heritage',
    platform: 'UNESCO ICH OFFICIAL',
    services: 'Buka Berita',
    img: '/images/articles/unesco-page.webp',
    href: 'https://ich.unesco.org/en/RL/wayang-puppet-theatre-00063',
  },
  {
    client: 'Sejarah & Filosofi Gunungan Wayang Kulit, Simbol Kosmologi Jawa',
    platform: 'KOMPAS.COM BUDAYA',
    services: 'Buka Berita',
    img: '/images/articles/kompas-page.webp',
    href: 'https://regional.kompas.com/read/2022/02/02/180653778/sejarah-dan-filosofi-gunungan-wayang-kulit-digunakan-dalam-uang-logam?page=all',
  },
  {
    client: '7 Alasan Wayang Menjadi Warisan Budaya Tak Benda UNESCO',
    platform: 'KEMENDIKBUD RI',
    services: 'Buka Berita',
    img: '/images/articles/kemendikbud-page.webp',
    href: 'https://itjen.kemendikdasmen.go.id/web/?p=8640',
  },
];

export default function SectionStoryFinale({
  id = 'berita',
  categoryLabel = 'ARTIKEL & WARTA TERKINI',
  headline = {
    line1: 'Warta Budaya &',
    line2: 'Sorotan Terkini',
  },
  paragraphStanzas = [
    [
      'LIPUTAN RESMI UNESCO, KABAR DEWANTARA, DAN CATATAN',
      'MENDALAM SEPUTAR PELESTARIAN WAYANG KULIT NUSANTARA.',
    ],
  ],
  articles = DEFAULT_PREVIEW_ARTICLES,
  brand = { line1: 'Wayang', line2: 'Jawi' },
  tagline = 'KISAH-KISAH LELUHUR,\nDIHIDUPKAN KEMBALI\nSETELAH GELAP. TIDAK SEMUA\nYANG LAMA HARUS TETAP\nDI MASA LALU.',
  backdropImage = '/images/section5-dancers-backdrop-clean.webp',
}: SectionStoryFinaleProps) {
  return (
    <section
      id={id}
      className="relative w-full bg-[#050303] text-[#000000] overflow-hidden select-none"
    >
      {/* Main Theatrical Dark Card - Full Width */}
      <div data-gsap="finale-card" className="relative w-full aspect-auto md:aspect-[1354/846] overflow-hidden bg-[#050303] @container min-h-[640px] md:min-h-0">
          {/* Authentic Stage Backdrop Image (Two Dancers & Ethereal Smoke) */}
          <div className="absolute inset-0 bg-[#050303] pointer-events-none">
            <Image
              src={backdropImage}
              alt="Wayang Jawi Theatrical Dancers and Stage Smoke"
              fill
              priority
              sizes="(max-width: 1504px) 100vw, 1354px"
              className="object-cover object-left md:object-center pointer-events-none"
            />
          </div>

          {/* Vignette Depth Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/40 pointer-events-none z-10" />

          {/* RIGHT SIDE PURE CODE CONTENT LAYER */}
          <div className="relative md:absolute inset-0 flex flex-col justify-between py-8 md:py-0 md:pt-[13.2%] md:pb-[9.5%] px-6 md:px-0 md:pl-[56.1%] md:pr-[6.0%] pointer-events-none z-20 gap-6 md:gap-0">
            {/* Top Headline: "A Night to Remember \n A Story to Carry" */}
            {/* Top Headline: Editorial Articles & Blog Section */}
            {/* Top Headline: Editorial Articles & Blog Section (Centered & Enlarged) */}
            <div data-gsap="finale-headline" className="pointer-events-auto bg-black/60 md:bg-transparent p-3 md:p-0 rounded-lg md:rounded-none text-center flex flex-col items-center w-full">
              <p className="text-xs sm:text-sm font-sans font-bold tracking-[0.28em] text-[#dedf42]/70 uppercase mb-2 sm:mb-3 select-text text-center">
                {categoryLabel}
              </p>
              <h2 className="font-playfair text-[#dedf42] text-[clamp(32px,5.2cqi,72px)] font-normal leading-[1.02] tracking-[-0.03em] select-text text-center">
                <span data-gsap="finale-headline-line" className="block will-change-transform">{headline.line1}</span>
                <span data-gsap="finale-headline-line" className="block will-change-transform">{headline.line2}</span>
              </h2>
            </div>

            {/* Middle Uppercase Paragraph */}
            <div data-gsap="finale-stanza" className="pointer-events-auto max-w-[460px] mx-auto text-center font-sans font-semibold text-[#dedf42]/80 text-[clamp(8.5px,0.95cqi,12px)] uppercase leading-[1.5] tracking-[0.16em] select-text bg-black/60 md:bg-transparent p-3 md:p-0 rounded-lg md:rounded-none">
              {paragraphStanzas.map((stanza, sIdx) => (
                <p key={sIdx} className="space-y-1">
                  {stanza.map((line, lIdx) => (
                    <span key={lIdx} className="block whitespace-nowrap">
                      {line}
                    </span>
                  ))}
                </p>
              ))}
            </div>

            {/* Bottom 3 List Rows with Horizontal Yellow Divider Lines */}
            {/* Bottom 3 Featured Article Entries with Horizontal Yellow Divider Lines */}
            {/* Interactive List Preview for Articles & News */}
            <div className="pointer-events-auto w-full max-w-[580px] lg:max-w-[640px] bg-black/60 md:bg-transparent p-2 sm:p-3 md:p-0 rounded-lg md:rounded-none">
              <InteractiveListPreview
                items={articles}
                bgColor="transparent"
                imageSize={1.1}
                imagePosition="left"
                highlightColor="rgba(222, 223, 66, 0.18)"
                activeTextColor="#dedf42"
                inactiveTextColor="#dedf42"
                className="w-full text-[#dedf42]"
              />

              {/* Subtle Bottom Archive Line */}
              <div className="pt-4 mt-2 flex flex-wrap items-center justify-between gap-3 text-[#dedf42]/70 text-[10px] sm:text-xs font-sans tracking-wider select-text">
                <span className="font-medium">Arsip Artikel & Publikasi</span>
                <OriginButton
                  href="/berita"
                  fillClassName="bg-[#dedf42]"
                  activeTextClassName="text-black font-bold"
                  className="h-auto px-6 sm:px-7 py-2.5 sm:py-3 rounded-full border border-[#dedf42] bg-[#dedf42]/15 text-[#dedf42] text-xs sm:text-sm font-sans font-bold tracking-wider uppercase shadow-lg group cursor-pointer"
                >
                  <span>Lihat Semua Artikel</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
                </OriginButton>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
