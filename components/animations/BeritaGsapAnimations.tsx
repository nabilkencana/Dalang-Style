'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function BeritaGsapAnimations() {
  useGSAP(() => {
    // ─────────────────────────────────────────────────────────────
    // 1. HERO BREAKING STORY — Page Load Timeline
    // ─────────────────────────────────────────────────────────────
    const heroTl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        gsap.set(
          '[data-gsap="berita-header"], [data-gsap="berita-hero-image"], [data-gsap="berita-hero-text"]',
          { clearProps: 'all' }
        );
      },
    });

    // Top minimal header
    heroTl.fromTo(
      '[data-gsap="berita-header"]',
      { y: -25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.05, clearProps: 'all' }
    );

    // Hero big feature image
    heroTl.fromTo(
      '[data-gsap="berita-hero-image"]',
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.85, ease: 'power3.out', clearProps: 'all' },
      '-=0.4'
    );

    // Hero right headline & content
    heroTl.fromTo(
      '[data-gsap="berita-hero-text"]',
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', clearProps: 'all' },
      '-=0.6'
    );

    // ─────────────────────────────────────────────────────────────
    // 2. SECTION 2: BERITA LENGKAP
    // ─────────────────────────────────────────────────────────────
    gsap.fromTo(
      '[data-gsap="berita-sec2-header"]',
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '[data-gsap="berita-sec2-header"]',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      '[data-gsap="berita-main-card"]',
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '[data-gsap="berita-main-card"]',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    ScrollTrigger.batch('[data-gsap="berita-sub-card"]', {
      start: 'top 88%',
      once: true,
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'all',
          }
        ),
    });

    // ─────────────────────────────────────────────────────────────
    // 3. SECTION 3: SOROTAN KHUSUS (SPOTLIGHT)
    // ─────────────────────────────────────────────────────────────
    gsap.fromTo(
      '[data-gsap="berita-spotlight-main"]',
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '[data-gsap="berita-spotlight-main"]',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    ScrollTrigger.batch('[data-gsap="berita-side-item"]', {
      start: 'top 88%',
      once: true,
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { x: 25, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'all',
          }
        ),
    });

    // ─────────────────────────────────────────────────────────────
    // 4. SECTION 4: PALING DITONTON (VIDEO CARDS)
    // ─────────────────────────────────────────────────────────────
    gsap.fromTo(
      '[data-gsap="berita-sec4-header"]',
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '[data-gsap="berita-sec4-header"]',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );

    ScrollTrigger.batch('[data-gsap="berita-video-card"]', {
      start: 'top 88%',
      once: true,
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { scale: 0.94, y: 25, opacity: 0 },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.65,
            ease: 'power2.out',
            clearProps: 'all',
          }
        ),
    });

    // ─────────────────────────────────────────────────────────────
    // 5. SECTION 5: PALING DILIHAT (MOST READ)
    // ─────────────────────────────────────────────────────────────
    gsap.fromTo(
      '[data-gsap="berita-sec5-header"]',
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '[data-gsap="berita-sec5-header"]',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      '[data-gsap="berita-read-feature"]',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '[data-gsap="berita-read-feature"]',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    ScrollTrigger.batch('[data-gsap="berita-grid-card"]', {
      start: 'top 88%',
      once: true,
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'all',
          }
        ),
    });
  });

  return null;
}
