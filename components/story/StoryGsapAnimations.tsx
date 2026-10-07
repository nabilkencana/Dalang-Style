'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface StoryGsapAnimationsProps {
  filterKey?: string;
}

export default function StoryGsapAnimations({ filterKey = '' }: StoryGsapAnimationsProps) {
  useGSAP(
    () => {
      // ─────────────────────────────────────────────────────────────
      // 1. HERO & DOSSIER ENTRANCE — Cinematic Timeline
      // ─────────────────────────────────────────────────────────────
      const heroTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          gsap.set(
            '[data-gsap="story-stats"] > *, [data-gsap="story-spotlight"], [data-gsap="story-search"], [data-gsap="story-cats"] > *, [data-gsap="story-tokoh-tags"] > *',
            { clearProps: 'all' }
          );
        },
      });
      // Stats ribbon items
      heroTl.fromTo(
        '[data-gsap="story-stats"] > *',
        { y: 20, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.55,
          clearProps: 'all',
        },
        '-=0.3'
      );

      // Spotlight Showcase Box
      heroTl.fromTo(
        '[data-gsap="story-spotlight"]',
        { y: 25, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', clearProps: 'all' },
        '-=0.25'
      );

      // Search & Filters Box
      heroTl.fromTo(
        '[data-gsap="story-search"]',
        { scale: 0.96, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', clearProps: 'all' },
        '-=0.35'
      );

      // Category filter pills
      heroTl.fromTo(
        '[data-gsap="story-cats"] > *',
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.45,
          clearProps: 'all',
        },
        '-=0.25'
      );

      // Tokoh quick chips
      heroTl.fromTo(
        '[data-gsap="story-tokoh-tags"] > *',
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 0.4,
          clearProps: 'all',
        },
        '-=0.2'
      );

      // ─────────────────────────────────────────────────────────────
      // 2. COUNTER BAR
      // ─────────────────────────────────────────────────────────────
      gsap.fromTo(
        '[data-gsap="story-counter"]',
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '[data-gsap="story-counter"]',
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ─────────────────────────────────────────────────────────────
      // 3. CARDS GRID — Row Batch Scroll Reveal
      // ─────────────────────────────────────────────────────────────
      ScrollTrigger.batch('[data-gsap="story-card"]', {
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
