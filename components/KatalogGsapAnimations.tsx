'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface KatalogGsapAnimationsProps {
  filterKey?: string;
}

export default function KatalogGsapAnimations({ filterKey = '' }: KatalogGsapAnimationsProps) {
  useGSAP(
    () => {
      // ─────────────────────────────────────────────────────────────
      // 1. HERO ENTRANCE — Cinematic Load Timeline
      // ─────────────────────────────────────────────────────────────
      const heroTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          gsap.set(
            '[data-gsap="katalog-header"], [data-gsap="katalog-aksara"], [data-gsap="katalog-title"], [data-gsap="katalog-subtitle"], [data-gsap="katalog-search"], [data-gsap="katalog-tags"] > *, [data-gsap="katalog-cats"] > *',
            { clearProps: 'all' }
          );
        },
      });

      // Top navigation bar
      heroTl.fromTo(
        '[data-gsap="katalog-header"]',
        { y: -25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.05, clearProps: 'all' }
      );

      // Aksara Jawa watermark
      heroTl.fromTo(
        '[data-gsap="katalog-aksara"]',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)', clearProps: 'all' },
        '-=0.4'
      );

      // Main Title: "Katalog Tokoh Pewayangan"
      heroTl.fromTo(
        '[data-gsap="katalog-title"]',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', clearProps: 'all' },
        '-=0.4'
      );

      // Subtitle description
      heroTl.fromTo(
        '[data-gsap="katalog-subtitle"]',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, clearProps: 'all' },
        '-=0.5'
      );

      // Search Box
      heroTl.fromTo(
        '[data-gsap="katalog-search"]',
        { scale: 0.95, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'all' },
        '-=0.4'
      );

      // Category filter pills
      heroTl.fromTo(
        '[data-gsap="katalog-cats"] > *',
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.5,
          clearProps: 'all',
        },
        '-=0.3'
      );

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
