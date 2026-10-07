'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotionValue } from 'motion/react';
import StackSpread, { WAYANG_STORY_CARDS, type StackSpreadCard } from '@/components/ui/stack-spread';

gsap.registerPlugin(ScrollTrigger);

export interface SectionWayangGeneratorProps {
  id?: string;
  cards?: StackSpreadCard[];
  bgColor?: string;
  textColor?: string;
}

export default function SectionWayangGenerator({
  id = 'kreasi',
  cards = WAYANG_STORY_CARDS,
  bgColor = '#dedf42',
  textColor = '#050303',
}: SectionWayangGeneratorProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const motionProgress = useMotionValue(0);

  // ── GSAP ScrollTrigger: Fan-In Overlay Sweep (30° -> 0°) + Card Scatter Pin ──
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!sectionRef.current || !innerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop & Tablet (>= 768px):
    mm.add('(min-width: 768px)', () => {
      // 1. Fan-In Overlay: Rotates in from 30° at bottom-left over SectionStoryAwakening
      gsap.fromTo(
        innerRef.current,
        { rotation: 30, transformOrigin: 'bottom left' },
        {
          rotation: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        }
      );

      // 2. Pin & Card Scatter: Pins firmly at top top while scrolling drives card scatter
      const pinTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=1200',
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        anticipatePin: 1,
        onUpdate: (self) => {
          motionProgress.set(self.progress);
        },
      });

      return () => {
        pinTrigger.kill();
      };
    });

    // Mobile (< 768px):
    mm.add('(max-width: 767px)', () => {
      // 1. Mobile Fan-In Overlay (18° -> 0°)
      gsap.fromTo(
        innerRef.current,
        { rotation: 18, transformOrigin: 'bottom left' },
        {
          rotation: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        }
      );

      // 2. Mobile Pin & Card Scatter
      const pinTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=800',
        pin: true,
        pinSpacing: true,
        scrub: 0.7,
        anticipatePin: 1,
        onUpdate: (self) => {
          motionProgress.set(self.progress);
        },
      });

      return () => {
        pinTrigger.kill();
      };
    });

    return () => mm.revert();
  }, [motionProgress]);

  return (
    <section
      ref={sectionRef}
      id={id}
      data-gsap="kreasi-section"
      className="relative w-full h-screen select-none font-sans z-30"
    >
      {/* ── Inner Animated Flow Art Container with 30° -> 0° Fan-In Rotation ── */}
      <div
        ref={innerRef}
        className="flow-art-container relative w-full h-full bg-[#dedf42] text-black shadow-[0_-35px_80px_rgba(0,0,0,0.7)] flex flex-col justify-between will-change-transform overflow-hidden"
        style={{ transformOrigin: 'bottom left' }}
      >
        {/* Top Cultural Kicker Bar */}
        <div className="relative w-full border-t border-b border-black/15 bg-[#dedf42] py-3.5 px-4 sm:px-8 md:px-12 flex items-center justify-between z-20 shrink-0">
          <div className="hidden sm:block h-[1px] flex-1 bg-black/20" />
          <div className="flex items-center gap-3 px-4 mx-auto sm:mx-0">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.28em] text-black/80 uppercase font-bold">
              ꦥꦸꦱ꧀ꦠꦏꦭꦏꦺꦴꦤ꧀ • PUSTAKA KISAH & SASTRA PEDALANGAN
            </span>
          </div>
          <div className="hidden sm:block h-[1px] flex-1 bg-black/20" />
        </div>

        {/* Main Kinetic Scroll Spread Stage (Driven by GSAP pin progress) */}
        <div className="relative flex-1 w-full h-full overflow-hidden">
          <StackSpread
            id="stack-spread-stage"
            cards={cards}
            progress={motionProgress}
            bgColor={bgColor}
            textColor={textColor}
            clusterRotation={true}
            stackScale={0.82}
            cardRadius={14}
            textFadeStart={0.12}
            showScrollHint={true}
            title={
              <div className="flex flex-col items-center">
                <h2 className="w-full whitespace-pre-line font-serif italic text-[clamp(28px,4.5vw,56px)] font-bold leading-[1.08] tracking-tight text-black max-md:text-[8.5vw]">
                  Koleksi Lakon Agung
                </h2>
              </div>
            }
            subtitle="Nikmati kisah-kisah epik pewayangan yang dikurasi secara sastrawi dan interaktif. Lengkap dengan kidung sulukan, babak pedalangan, glosarium istilah Jawa, dan pitutur luhur penuntun batin."
            cta={
              <Link
                href="/kreasi"
                className="inline-flex items-center gap-2.5 px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-black hover:bg-[#1a1208] text-[#dedf42] font-sans font-bold text-[clamp(11px,1.05vw,13.5px)] tracking-wider uppercase shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer border border-black/80"
              >
                <BookOpen className="w-4 h-4 text-[#dedf42] transition-transform duration-200 group-hover:rotate-6" />
                <span>Jelajahi Semua Kisah Wayang</span>
                <ArrowRight className="w-4 h-4 text-[#dedf42] transition-transform duration-200 group-hover:translate-x-1.5" />
              </Link>
            }
          />
        </div>

        {/* ── Soft Theatrical Gradient Transition Bridge to Section 5 (#berita) ── */}
        <div className="absolute bottom-0 inset-x-0 h-24 sm:h-32 md:h-40 bg-gradient-to-b from-transparent via-[#2d2907]/60 to-[#050303] pointer-events-none z-30" />
      </div>
    </section>
  );
}
