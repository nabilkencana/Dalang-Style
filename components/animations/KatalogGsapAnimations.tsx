'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface KatalogGsapAnimationsProps {
  filterKey?: string;
}

export default function KatalogGsapAnimations({ filterKey = '' }: KatalogGsapAnimationsProps) {
  // ─────────────────────────────────────────────────────────────
  // 1. HERO — the blencong is lit once on page load, then the shadows appear.
  //    Runs only on mount so filtering never replays it.
  // ─────────────────────────────────────────────────────────────
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl.fromTo(
      '[data-gsap="katalog-header"]',
      { y: -25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.05, clearProps: 'all' }
    );

    // Lamp catches: the dark cloth brightens
    heroTl.fromTo(
      '[data-gsap="katalog-kelir-unlit"]',
      { opacity: 1 },
      { opacity: 0, duration: 1.1, ease: 'power2.inOut', clearProps: 'all' },
      '-=0.35'
    );

    // Shadows sharpen into focus on the cloth
    heroTl.fromTo(
      '[data-gsap="katalog-aksara"], [data-gsap="katalog-title"]',
      { opacity: 0, filter: 'blur(10px)' },
      { opacity: 1, filter: 'blur(0px)', duration: 0.9, stagger: 0.12, clearProps: 'opacity,filter' },
      '-=0.55'
    );

    heroTl.fromTo(
      '[data-gsap="katalog-subtitle"]',
      { opacity: 0 },
      { opacity: 1, duration: 0.6, clearProps: 'opacity' },
      '-=0.4'
    );

    heroTl.fromTo(
      '[data-gsap="katalog-search"]',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, clearProps: 'all' },
      '-=0.3'
    );
  }, []);

  useGSAP(
    () => {
      // ─────────────────────────────────────────────────────────────
      // 2. MAIN CATALOG COUNTER BAR
      // ─────────────────────────────────────────────────────────────
      gsap.fromTo(
        '[data-gsap="katalog-counter"]',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '[data-gsap="katalog-counter"]',
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ─────────────────────────────────────────────────────────────
      // 3. CARDS GRID — Row Batch Scroll Reveal with clearProps
      // ─────────────────────────────────────────────────────────────
      ScrollTrigger.batch('[data-gsap="katalog-card"]', {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 40, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              stagger: 0.08,
              duration: 0.65,
              ease: 'power3.out',
              clearProps: 'all',
            }
          ),
      });
    },
    { dependencies: [filterKey] }
  );

  return null;
}
