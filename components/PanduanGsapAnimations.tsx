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
    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Breadcrumb bar slides down
    heroTl.from('[data-gsap="panduan-breadcrumb"]', {
      y: -25,
      opacity: 0,
      duration: 0.8,
      delay: 0.15,
    });

    // Kicker pill pops in
    heroTl.from(
      '[data-gsap="panduan-kicker"]',
      {
        scale: 0.85,
        opacity: 0,
        duration: 0.7,
        ease: 'back.out(1.8)',
      },
      '-=0.5'
    );

    // Main Title "Seni Mendalang di Ujung Jemari Anda"
    heroTl.from(
      '[data-gsap="panduan-title"]',
      {
        y: 40,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
      },
      '-=0.5'
    );

    // Subtitle paragraph
    heroTl.from(
      '[data-gsap="panduan-subtitle"]',
      {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.6'
    );

    // Hero action buttons
    heroTl.from(
      '[data-gsap="panduan-cta"] > *',
      {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
      },
      '-=0.5'
    );

    // ─────────────────────────────────────────────────────────────
    // 2. 4 GESTUR INTI SECTION — Staggered Card Reveals
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

    gsap.from('[data-gsap="panduan-gestur-card"]', {
      y: 50,
      opacity: 0,
      stagger: 0.16,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#gestur-utama',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    // ─────────────────────────────────────────────────────────────
    // 3. DUA MODE PANGGUNG — Theatrical Slide-Up
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

    gsap.from('[data-gsap="panduan-mode-card"]', {
      y: 45,
      opacity: 0,
      stagger: 0.18,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-gsap="panduan-mode-section"]',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
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

    gsap.from('[data-gsap="panduan-hotkey-card"]', {
      scale: 0.9,
      y: 20,
      opacity: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: '[data-gsap="panduan-hotkey-section"]',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    // ─────────────────────────────────────────────────────────────
    // 5. TIPS & OPTIMALISASI KAMERA
    // ─────────────────────────────────────────────────────────────
    gsap.from('[data-gsap="panduan-tips-box"]', {
      scale: 0.96,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-gsap="panduan-tips-box"]',
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('[data-gsap="panduan-tips-col"]', {
      y: 25,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '[data-gsap="panduan-tips-box"]',
        start: 'top 78%',
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
