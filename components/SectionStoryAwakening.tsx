'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WorksWheel, { WorksWheelItem } from '@/components/ui/works-wheel';
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
  headerBrandText: _headerBrandText = 'MALAM WAYANG JAWI',
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [controlledTurn, setControlledTurn] = useState(1);

  // ── GSAP ScrollTrigger: User diwajibkan melihat tokoh-tokohnya terlebih dahulu ──
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop / Tablet (>= 768px): 380px per character
    mm.add('(min-width: 768px)', () => {
      const count = wheelItems.length;
      const charScrollDist = (count - 1) * 380;
      const overlayDist = window.innerHeight;
      const totalPinDist = charScrollDist + overlayDist;

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${totalPinDist}`,
        pin: true,
        pinSpacing: false,
        scrub: 0.9,
        anticipatePin: 1,
        onUpdate: (self) => {
          const charRatio = charScrollDist / totalPinDist;
          const charProgress = Math.min(1, self.progress / charRatio);
          const targetTurn = 1 + charProgress * (count - 1);
          setControlledTurn(targetTurn);
        },
      });

      scrollTriggerRef.current = trigger;
      return () => {
        trigger.kill();
        scrollTriggerRef.current = null;
      };
    });

    // Mobile (< 768px): 220px per character for fast, effortless touch scroll
    mm.add('(max-width: 767px)', () => {
      const count = wheelItems.length;
      const charScrollDist = (count - 1) * 220;
      const overlayDist = window.innerHeight;
      const totalPinDist = charScrollDist + overlayDist;

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${totalPinDist}`,
        pin: true,
        pinSpacing: false,
        scrub: 0.8,
        anticipatePin: 1,
        onUpdate: (self) => {
          const charRatio = charScrollDist / totalPinDist;
          const charProgress = Math.min(1, self.progress / charRatio);
          const targetTurn = 1 + charProgress * (count - 1);
          setControlledTurn(targetTurn);
        },
      });

      scrollTriggerRef.current = trigger;
      return () => {
        trigger.kill();
        scrollTriggerRef.current = null;
      };
    });

    return () => mm.revert();
  }, [wheelItems.length]);
  const handleSelectCharacter = (index: number) => {
    if (typeof window === 'undefined') return;
    const count = wheelItems.length;
    const isMobile = window.innerWidth < 768;
    const charScrollDist = (count - 1) * (isMobile ? 220 : 380);
    const st = scrollTriggerRef.current;
    if (st) {
      const targetScroll = st.start + (index / (count - 1)) * charScrollDist;
      if (window.lenisInstance) {
        window.lenisInstance.scrollTo(targetScroll, { immediate: false });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    } else {
      setControlledTurn(index + 1);
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        data-gsap="awaken-section"
        id={id}
        className="relative min-h-screen w-full bg-[#0a0a0a] text-[#000000] overflow-hidden select-none z-10"
      >
      {/* ── UNIFIED 3D WORKSWHEEL CARD: Active on All Devices (Mobile, Tablet, Desktop) ── */}
      <div className="relative w-full h-[100dvh] min-h-[580px] max-h-[1040px] @container overflow-hidden flex items-center justify-center">
        {/* INNER STORY CARD - 100% Full Width Edge-to-Edge */}
        {/* INNER STORY CARD - 100% Full Width Edge-to-Edge Flow Art Container */}
        <div
          data-gsap="awaken-card"
          className="flow-art-container relative w-full h-full overflow-hidden bg-[#dedf42] z-20 @container flex flex-col justify-between will-change-transform"
          style={{ transformOrigin: 'bottom left' }}
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

          {/* CARD CONTENT LAYER — Perfectly spaced below mobile navbar notch */}
          <div className="absolute inset-0 flex flex-col items-center justify-between pt-20 sm:pt-22 md:pt-26 pb-3 sm:pb-6 md:pb-8 px-4 sm:px-8 md:px-12 pointer-events-none z-20">
            {/* Top Section: Category Label + Main Headline (Safely below notch) */}
            <div data-gsap="awaken-text" className="w-full flex flex-col items-center text-center pointer-events-auto">
              {/* Category Label */}
              <p className="font-sans font-bold text-black text-[clamp(8px,1.15cqi,13.5px)] tracking-[0.24em] sm:tracking-[0.28em] uppercase mb-1 select-text">
                {categoryLabel}
              </p>
              {/* Headline: 3 Lines in Playfair Display */}
              <h2 className="font-playfair text-black text-[clamp(16px,4.2cqi,41px)] font-normal leading-[1.18] tracking-[-0.02em] max-w-[530px] select-text">
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
              className="w-full flex-1 min-h-[300px] sm:min-h-[380px] md:min-h-[460px] my-auto pointer-events-auto flex items-center justify-center overflow-hidden"
            >
              <WorksWheel
                items={wheelItems}
                label={wheelLabel}
                action="Jelajahi"
                controlledTurn={controlledTurn}
                onSelectCharacter={handleSelectCharacter}
                className="bg-transparent text-black min-h-[340px] sm:min-h-[400px] md:min-h-[460px] w-full"
              />
            </div>
            {/* Bottom Section: "READ MORE →" Pill Button (100% visible on screen) */}
            <div data-gsap="awaken-cta" className="pointer-events-auto mt-auto pb-4 sm:pb-6">
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
      {/* Spacer div for Desktop (>= 768px): 380px per character to hold section before Kreasi AI overlays */}
      <div
        className="hidden md:block w-full pointer-events-none"
        style={{ height: `${(wheelItems.length - 1) * 380}px` }}
        aria-hidden="true"
      />
      {/* Spacer div for Mobile (< 768px): 220px per character to hold section before Kreasi AI overlays */}
      <div
        className="block md:hidden w-full pointer-events-none"
        style={{ height: `${(wheelItems.length - 1) * 220}px` }}
        aria-hidden="true"
      />
    </>
  );
}
