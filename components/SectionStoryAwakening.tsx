'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WorksWheel, type WorksWheelItem } from '@/components/ui/works-wheel';
import { OriginButton } from '@/components/ui/origin-button';
export interface SectionStoryAwakeningProps {
  id?: string;
  headerBrandText?: string;
  categoryLabel?: string;
  headline?: string[];
  wheelItems?: WorksWheelItem[];
  wheelLabel?: string;
  readMoreText?: string;
  readMoreHref?: string;
  aksaraText?: string;
}

const DEFAULT_WHEEL_ITEMS: WorksWheelItem[] = [
  {
    title: 'Kyai Semar',
    role: 'Punakawan • Pamong Ksatria',
    description: 'Penjelmaan Batara Ismaya, penasihat bijak para ksatria berjiwa luhur dan pengayom kebenaran.',
    image: '/images/tokoh/wayang-1.png',
    href: '/tokoh/kyai-semar',
  },
  {
    title: 'Kyai Petruk',
    role: 'Punakawan • Cerdas & Jenaka',
    description: 'Karakter periang berhidung panjang, tangkas berfikir, jenaka namun berwawasan luas.',
    image: '/images/tokoh/wayang-2.png',
    href: '/tokoh/kyai-petruk',
  },
  {
    title: 'Kyai Bagong',
    role: 'Punakawan • Kritis & Jujur',
    description: 'Sosok polos bertubuh bulat yang berani menyuarakan kebenaran rakyat tanpa tedeng aling-aling.',
    image: '/images/tokoh/wayang-3.png',
    href: '/tokoh/kyai-bagong',
  },
  {
    title: 'Sang Arjuna',
    role: 'Satria Pandawa • Penengah Pandawa',
    description: 'Ksatria berbusur sakti Gandiwa, lambang keteguhan batin, kehalusan budi, dan kemahiran ilmu.',
    image: '/images/tokoh/wayang-4.png',
    href: '/tokoh/sang-arjuna',
  },
  {
    title: 'Sang Gatotkaca',
    role: 'Satria Pandawa • Ksatria Pringgandani',
    description: 'Otot kawat balung wesi, satria perkasa pelindung angkasa yang gugur dalam palagan kehormatan.',
    image: '/images/tokoh/wayang-5.png',
    href: '/tokoh/sang-gatotkaca',
  },
  {
    title: 'Nala Gareng',
    role: 'Punakawan • Bijak & Bersahaja',
    description: 'Kakak tertua punakawan bertangan ceko dan kaki pincang, lambang kehati-hatian dalam hidup.',
    image: '/images/tokoh/wayang-6.png',
    href: '/tokoh/nala-gareng',
  },
  {
    title: 'Sang Bima',
    role: 'Satria Pandawa • Werkudara Perkasa',
    description: 'Sosok jujur pantang kompromi, pemberani penjelajah samudera pencari air suci Tirta Prawitasari.',
    image: '/images/tokoh/wayang-7.png',
    href: '/tokoh/sang-bima',
  },
  {
    title: 'Prabu Rahwana',
    role: 'Prabu Alengka • Dasamuka',
    description: 'Raja sakti berkepala sepuluh berjiwa angkara, personifikasi nafsu duniawi yang tak terbendung.',
    image: '/images/tokoh/wayang-8.png',
    href: '/tokoh/prabu-rahwana',
  },
  {
    title: 'Resi Drona',
    role: 'Pujangga Hastina • Guru Besar',
    description: 'Begawan sakti ahli siasat dan senjata perang, guru agung bagi seluruh Pandawa dan Kurawa.',
    image: '/images/tokoh/wayang-9.png',
    href: '/tokoh/resi-drona',
  },
];

export default function SectionStoryAwakening({
  id = 'cara-bermain',
  headerBrandText = 'MALAM WAYANG JAWI',
  categoryLabel = 'GALERI TOKOH PEWAYANGAN',
  headline = [
    'Ragam Tokoh dan Watak Luhur',
    'Cermin Jiwa Manusia',
    'Dalam Jagad Pakeliran.',
  ],
  wheelItems = DEFAULT_WHEEL_ITEMS,
  wheelLabel = 'TOKOH WAYANG',
  readMoreText = 'BACA SELENGKAPNYA →',
  readMoreHref = '/katalog',
  aksaraText = 'ꦠꦺꦴꦏꦺꦴꦃ ꦮꦪꦁ ꦥꦸꦂꦮ ꦤꦸꦱꦤ꧀ꦠꦫ',
}: SectionStoryAwakeningProps) {
  return (
    <section
      data-gsap="awaken-section"
      id={id}
      className="relative w-full bg-[#0a0a0a] text-[#000000] overflow-hidden select-none"
    >
      <div className="relative w-full min-h-[580px] md:aspect-[1504/1128] @container overflow-hidden flex items-center justify-center py-10 md:py-0">
        {/* INNER STORY CARD - Full Width */}
        <div
          data-gsap="awaken-card"
          className="relative w-full aspect-auto md:aspect-[1126/814] overflow-hidden bg-[#dedf42] z-20 @container"
        >
          {/* Yellow Card Canvas with authentic Bima Wayang Watermark Illustration */}
          <div className="absolute inset-0 bg-[#dedf42] pointer-events-none">
            <Image
              src="/images/story-awakening-card-bg.png"
              alt="Bima Illustration Watermark Canvas"
              fill
              priority
              sizes="(max-width: 1504px) 75vw, 1126px"
              className="object-cover object-center pointer-events-none"
            />
          </div>

          {/* INNER BORDER: Inset 27px horizontal (2.40%), 17px top/bottom (2.09%) */}
          {/* Top border line */}
          <div className="absolute top-[2.09%] left-[2.40%] right-[2.40%] h-[1px] bg-black/85 pointer-events-none z-10" />
          {/* Bottom border line */}
          <div className="absolute bottom-[2.46%] left-[2.40%] right-[2.40%] h-[1px] bg-black/85 pointer-events-none z-10" />

          {/* Left border line with Aksara Jawa breakout in middle */}
          <div className="absolute top-[2.09%] bottom-[2.46%] left-[2.40%] w-[1px] flex flex-col items-center justify-between pointer-events-none z-10">
            <div className="w-[1px] flex-1 bg-black/85" />
            <div className="py-2 my-1 pointer-events-auto select-none">
              <span
                className="font-serif text-black/80 text-[clamp(7px,1.05cqi,13px)] tracking-[0.18em]"
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                }}
                aria-label="Aksara Jawa: Lakon Bima Suci Tirta Prawitasari"
              >
                {aksaraText}
              </span>
            </div>
            <div className="w-[1px] flex-1 bg-black/85" />
          </div>

          {/* Right border line with Aksara Jawa breakout in middle */}
          <div className="absolute top-[2.09%] bottom-[2.46%] right-[2.40%] w-[1px] flex flex-col items-center justify-between pointer-events-none z-10">
            <div className="w-[1px] flex-1 bg-black/85" />
            <div className="py-2 my-1 pointer-events-auto select-none">
              <span
                className="font-serif text-black/80 text-[clamp(7px,1.05cqi,13px)] tracking-[0.18em]"
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                }}
                aria-label="Aksara Jawa: Lakon Bima Suci Tirta Prawitasari"
              >
                {aksaraText}
              </span>
            </div>
            <div className="w-[1px] flex-1 bg-black/85" />
          </div>

          {/* CARD CONTENT LAYER */}
          <div className="relative md:absolute inset-0 flex flex-col items-center justify-between pt-[7.5%] pb-[7.2%] px-[7%] pointer-events-none z-20 gap-5 md:gap-0">
            {/* Top Section: Category Label + Main Headline */}
            <div data-gsap="awaken-text" className="w-full flex flex-col items-center text-center pointer-events-auto">
              {/* Category Label: "A STORY OF INNER AWAKENING" */}
              <p className="font-sans font-bold text-black text-[clamp(8px,1.15cqi,13.5px)] tracking-[0.24em] sm:tracking-[0.28em] uppercase mb-2 sm:mb-3 md:mb-3.5 select-text">
                {categoryLabel}
              </p>

              {/* Headline: 3 Lines in Playfair Display */}
              <h2 className="font-playfair text-black text-[clamp(17px,3.52cqi,41px)] font-normal leading-[1.20] tracking-[-0.02em] max-w-[530px] select-text">
                {headline.map((line, idx) => (
                  <span key={idx} data-gsap="awaken-headline-line" className="block whitespace-nowrap will-change-transform">
                    {line}
                  </span>
                ))}
              </h2>
            </div>

            {/* Middle Section: Interactive 3D WorksWheel Component */}
            <div
              data-gsap="awaken-wheel"
              className="w-full flex-1 min-h-[340px] sm:min-h-[420px] md:min-h-[480px] my-1 sm:my-2 pointer-events-auto flex items-center justify-center overflow-hidden"
            >
              <WorksWheel
                items={wheelItems}
                label={wheelLabel}
                action="Jelajahi"
                className="bg-transparent text-black min-h-[320px] sm:min-h-[400px] md:min-h-[460px] w-full"
              />
            </div>

            {/* Bottom Section: "READ MORE →" Pill Button with Origin Ripple Animation */}
            <div data-gsap="awaken-cta" className="pointer-events-auto mt-2 md:mt-0">
              <OriginButton
                href={readMoreHref}
                fillClassName="bg-black"
                activeTextClassName="text-[#dedf42]"
                className="h-auto px-6 sm:px-8 py-2 sm:py-2.5 rounded-full border-[1.5px] border-black text-black font-sans font-bold text-[clamp(8px,1.05cqi,13px)] tracking-wider uppercase bg-transparent shadow-sm"
              >
                {readMoreText}
              </OriginButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
