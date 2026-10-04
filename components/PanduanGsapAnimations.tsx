'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PanduanGsapAnimations() {
  useGSAP(() => {
    // ─────────────────────────────────────────────────────────────
    // 1. HERO SECTION — Cinematic Entrance on Page Load
    // ─────────────────────────────────────────────────────────────
    const heroTl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        gsap.set(
          '[data-gsap="panduan-breadcrumb"], [data-gsap="panduan-kicker"], [data-gsap="panduan-title"], [data-gsap="panduan-subtitle"], [data-gsap="panduan-cta"] > *',
          { clearProps: 'all' }
        );
      },
    });

    // Breadcrumb bar slides down
    heroTl.fromTo(
      '[data-gsap="panduan-breadcrumb"]',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.05, clearProps: 'all' }
    );

    // Kicker pill pops in
    heroTl.fromTo(
      '[data-gsap="panduan-kicker"]',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)', clearProps: 'all' },
      '-=0.4'
    );

    // Main Title "Seni Mendalang di Ujung Jemari Anda"
    heroTl.fromTo(
      '[data-gsap="panduan-title"]',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', clearProps: 'all' },
      '-=0.4'
    );

    // Subtitle paragraph
    heroTl.fromTo(
      '[data-gsap="panduan-subtitle"]',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, clearProps: 'all' },
      '-=0.5'
    );

    // Hero action buttons
    heroTl.fromTo(
      '[data-gsap="panduan-cta"] > *',
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.5,
        clearProps: 'all',
      },
      '-=0.4'
    );

    // ─────────────────────────────────────────────────────────────
    // 2. 4 GESTUR INTI SECTION — Individual Card Reveals
    // ─────────────────────────────────────────────────────────────
    gsap.from('[data-gsap="panduan-gestur-header"]', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#gestur-utama',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    const gesturCards = gsap.utils.toArray<HTMLElement>('[data-gsap="panduan-gestur-card"]');
    gesturCards.forEach((card) => {
      gsap.from(card, {
        y: 35,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    // ─────────────────────────────────────────────────────────────
    // 3. DUA MODE PANGGUNG — Individual Card Reveals
    // ─────────────────────────────────────────────────────────────
    gsap.from('[data-gsap="panduan-mode-header"]', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '[data-gsap="panduan-mode-section"]',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    const modeCards = gsap.utils.toArray<HTMLElement>('[data-gsap="panduan-mode-card"]');
    modeCards.forEach((card) => {
      gsap.from(card, {
        y: 35,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    // ─────────────────────────────────────────────────────────────
    // 4. PINTASAN KEYBOARD (HOTKEYS) — Pop Grid Stagger
    // ─────────────────────────────────────────────────────────────
    gsap.from('[data-gsap="panduan-hotkey-header"]', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '[data-gsap="panduan-hotkey-section"]',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Desktop: Hotkey Keyboard Cards Stagger
    gsap.from('[data-gsap="panduan-hotkey-card"]', {
      scale: 0.92,
      y: 15,
      opacity: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: '[data-gsap="panduan-hotkey-section"]',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Mobile: Touch Control Cards Stagger
    gsap.from('[data-gsap="panduan-touch-card"]', {
      scale: 0.94,
      y: 15,
      opacity: 0,
      stagger: 0.06,
      duration: 0.55,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '[data-gsap="panduan-hotkey-section"]',
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
    // ─────────────────────────────────────────────────────────────
    // 5. TIPS & OPTIMALISASI KAMERA
    // ─────────────────────────────────────────────────────────────
    gsap.from('[data-gsap="panduan-tips-box"]', {
      scale: 0.96,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '[data-gsap="panduan-tips-box"]',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('[data-gsap="panduan-tips-col"]', {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '[data-gsap="panduan-tips-box"]',
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    });

    // ─────────────────────────────────────────────────────────────
    // 6. FINAL CALL TO ACTION
    // ─────────────────────────────────────────────────────────────
    gsap.from('[data-gsap="panduan-final-cta"] > *', {
      y: 25,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '[data-gsap="panduan-final-cta"]',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  return null;
}
