'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface SectionStoryFinaleProps {
  id?: string;
  headline?: {
    line1: string;
    line2: string;
  };
  paragraphStanzas?: string[][];
  listItems?: Array<{
    type: 'sparkle' | 'heart' | 'mask';
    text: string;
  }>;
  brand?: {
    line1: string;
    line2: string;
  };
  tagline?: string;
  backdropImage?: string;
}

export default function SectionStoryFinale({
  id = 'filosofi',
  headline = {
    line1: 'Malam yang Tak Terlupakan',
    line2: 'Kisah untuk Dibawa Pulang',
  },
  paragraphStanzas = [
    [
      'SAAT MALAM SEMAKIN LARUT, BATAS',
      'ANTARA MASA LALU DAN MASA KINI MELEBUR.',
      'ORANG-ORANG ASING DUDUK BERDAMPINGAN,',
      'TERHUBUNG OLEH KEHENINGAN BERSAMA,',
      'KEKAGUMAN BERSAMA.',
    ],
    ['DAN KETIKA ADEGAN TERAKHIR BERAKHIR,', 'SESUATU TETAP TINGGAL DALAM DIRIMU.'],
  ],
  listItems = [
    { type: 'sparkle', text: 'Rasa takjub.' },
    { type: 'heart', text: 'Sebuah perenungan sunyi.' },
    {
      type: 'mask',
      text: 'Sebuah kisah yang membekas lama setelah lampu padam.',
    },
  ],
  brand = { line1: 'Wayang', line2: 'Jawi' },
  tagline = 'KISAH-KISAH LELUHUR,\nDIHIDUPKAN KEMBALI\nSETELAH GELAP. TIDAK SEMUA\nYANG LAMA HARUS TETAP\nDI MASA LALU.',
  backdropImage = '/images/section5-dancers-backdrop-clean.png',
}: SectionStoryFinaleProps) {
  return (
    <section
      id={id}
      className="relative w-full bg-[#050303] text-[#000000] overflow-hidden select-none"
    >
      {/* Main Theatrical Dark Card - Full Width */}
      <div className="relative w-full aspect-auto md:aspect-[1354/846] overflow-hidden bg-[#050303] @container min-h-[640px] md:min-h-0">
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
            <div className="pointer-events-auto bg-black/60 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none">
              <h2 className="font-playfair text-[#dedf42] text-[clamp(28px,4.5cqi,62px)] font-normal leading-[1.0] md:leading-[0.98] tracking-[-0.025em] select-text">
                <span className="block">{headline.line1}</span>
                <span className="block">{headline.line2}</span>
              </h2>
            </div>

            {/* Middle Uppercase Paragraph */}
            <div className="pointer-events-auto max-w-[360px] space-y-3 sm:space-y-4 font-sans font-bold text-[#dedf42] text-[clamp(8px,0.92cqi,12.5px)] uppercase leading-[1.38] tracking-wider select-text bg-black/60 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none">
              {paragraphStanzas.map((stanza, sIdx) => (
                <p key={sIdx}>
                  {stanza.map((line, lIdx) => (
                    <span key={lIdx} className="block whitespace-nowrap">
                      {line}
                    </span>
                  ))}
                </p>
              ))}
            </div>

            {/* Bottom 3 List Rows with Horizontal Yellow Divider Lines */}
            <div className="pointer-events-auto w-full max-w-[560px] lg:max-w-[620px] bg-black/60 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none">
              <div className="border-t border-[#dedf42]/80 divide-y divide-[#dedf42]/80 border-b border-[#dedf42]/80">
                {listItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 sm:gap-4 min-h-[44px] sm:min-h-[48px] py-2 sm:py-2.5 group transition-colors hover:bg-[#dedf42]/5 px-2 rounded-sm"
                  >
                    {/* List Icon SVG */}
                    <div className="w-5 h-5 shrink-0 flex items-center justify-center text-[#dedf42]">
                      {item.type === 'sparkle' && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" />
                          <path d="M19 15L19.9 18.1L23 19L19.9 19.9L19 23L18.1 19.9L15 19L18.1 18.1L19 15Z" />
                        </svg>
                      )}
                      {item.type === 'heart' && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      )}
                      {item.type === 'mask' && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3 8c.83 0 1.5.67 1.5 1.5S9.83 13 9 13s-1.5-.67-1.5-1.5S8.17 10 9 10zm6 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-3 7.5c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
                        </svg>
                      )}
                    </div>

                    {/* List Item Text */}
                    <span className="font-playfair text-[#dedf42] text-[clamp(12px,1.3cqi,18px)] font-normal tracking-[-0.01em] leading-snug select-text">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
