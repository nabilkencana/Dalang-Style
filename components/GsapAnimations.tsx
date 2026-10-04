'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function GsapAnimations() {
  useGSAP(() => {
    // ─────────────────────────────────────────────────────────────
    // 1. HERO SECTION — Cinematic Entrance on Page Load
    // ─────────────────────────────────────────────────────────────
    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Top nav bar slides down
    heroTl.from('[data-gsap="hero-nav"]', {
      y: -50,
      opacity: 0,
      duration: 1.0,
      delay: 0.2,
      clearProps: 'transform,opacity',
    });

    // Hero tagline with spinning leaf blooms in
    heroTl.from(
      '[data-gsap="hero-tagline"]',
      {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
      },
      '-=0.7'
    );


    // Bottom action bar (CTA button & secondary link) pops up
    heroTl.from(
      '[data-gsap="hero-bottom"]',
      {
        y: 35,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      },
      '-=0.6'
    );
    // Hero background subtle parallax on scroll
    gsap.to('[data-gsap="hero-bg"]', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: 'section:first-of-type',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // ─────────────────────────────────────────────────────────────
    // 2. SECTION 2: A NIGHT WHERE SHADOWS SPEAK (#fitur)
    // ─────────────────────────────────────────────────────────────

    // Outer card scale-in on scroll
    gsap.from('[data-gsap="story-card"]', {
      scale: 0.93,
      opacity: 0.35,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#fitur',
        start: 'top 85%',
        end: 'top 35%',
        scrub: 1,
      },
    });

    // Top-left tagline slide-in
    gsap.from('[data-gsap="story-tagline"]', {
      x: -60,
      opacity: 0,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#fitur',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });


    // Center Dalang Photo — Smooth Appear (fade + subtle float up)
    gsap.from('[data-gsap="story-photo"]', {
      opacity: 0,
      y: 30,
      scale: 1.04,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#fitur',
        start: 'top 72%',
        toggleActions: 'play none none reverse',
      },
    });

    // Bottom-right Poetic Stanzas — Staggered Fade Up
    gsap.from('[data-gsap="story-stanza"]', {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: '#fitur',
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    // ─────────────────────────────────────────────────────────────
    // 3. SECTION 3: TONIGHT LAKON — BIMA SUCI (#lakon)
    // ─────────────────────────────────────────────────────────────

    // Card zoom entrance
    gsap.from('[data-gsap="bima-card"]', {
      scale: 0.91,
      opacity: 0.3,
      duration: 1.3,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#lakon',
        start: 'top 85%',
        end: 'top 35%',
        scrub: 1,
      },
    });

    // Yellow video frame draw
    gsap.from('[data-gsap="bima-frame"]', {
      clipPath: 'inset(6% 6% 6% 6%)',
      duration: 1.2,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: '#lakon',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    // Label "LAKON MALAM INI" bounce down
    gsap.from('[data-gsap="bima-label"]', {
      y: -35,
      opacity: 0,
      scale: 0.85,
      duration: 0.85,
      ease: 'back.out(1.8)',
      scrollTrigger: {
        trigger: '#lakon',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    // ─────────────────────────────────────────────────────────────
    // 4. SECTION 4: STORY AWAKENING (#cara-bermain)
    // ─────────────────────────────────────────────────────────────

    // Poster card entrance
    gsap.from('[data-gsap="awaken-card"]', {
      scale: 0.95,
      opacity: 0.7,
      duration: 1.0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#cara-bermain',
        start: 'top 90%',
        end: 'top 50%',
        scrub: 1,
      },
    });

    // 3-Line Headline — Upward Reveal
    gsap.from('[data-gsap="awaken-headline-line"]', {
      y: 40,
      opacity: 0,
      duration: 1.0,
      ease: 'power3.out',
      stagger: 0.14,
      scrollTrigger: {
        trigger: '#cara-bermain',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    // Story text blocks fade up
    gsap.from('[data-gsap="awaken-text"]', {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.18,
      scrollTrigger: {
        trigger: '#cara-bermain',
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });

    // WorksWheel 3D wheel entrance
    gsap.from('[data-gsap="awaken-wheel"]', {
      scale: 0.92,
      opacity: 0,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#cara-bermain',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
    // Read More CTA pill button
    gsap.from('[data-gsap="awaken-cta"]', {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(2)',
      scrollTrigger: {
        trigger: '#cara-bermain',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    // ─────────────────────────────────────────────────────────────
    // 5. SECTION 5: STORY FINALE (#berita)
    // ─────────────────────────────────────────────────────────────

    // Dark theatrical card entrance
    gsap.from('[data-gsap="finale-card"]', {
      scale: 0.93,
      opacity: 0.35,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#berita',
        start: 'top 85%',
        end: 'top 40%',
        scrub: 1,
      },
    });

    // 2-Line Headline — Upward Reveal
    gsap.from('[data-gsap="finale-headline-line"]', {
      y: 45,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: '#berita',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Middle uppercase stanzas
    gsap.from('[data-gsap="finale-stanza"]', {
      y: 35,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#berita',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
    // ─────────────────────────────────────────────────────────────
    // 6. SECTION 6: MOVEMENT & MEANING (#makna)
    // ─────────────────────────────────────────────────────────────

    // Card entrance
    gsap.from('[data-gsap="meaning-card"]', {
      scale: 0.93,
      opacity: 0.35,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#makna',
        start: 'top 85%',
        end: 'top 40%',
        scrub: 1,
      },
    });

    // Carousel content block
    gsap.from('[data-gsap="meaning-content"]', {
      y: 50,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#makna',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    // ─────────────────────────────────────────────────────────────
    // 7. SECTION 7: JOIN THE NIGHT (#join)
    // ─────────────────────────────────────────────────────────────

    // Big Headline — Upward Reveal
    gsap.from('[data-gsap="join-title-line"]', {
      y: 50,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#join',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });


    // Tagline text slide-in from right
    gsap.from('[data-gsap="join-tagline"]', {
      x: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#join',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });


    // Giant bottom brand headline — Upward Reveal
    gsap.from('[data-gsap="join-brand-line"]', {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#join',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });


    // Refresh ScrollTrigger when web fonts are ready to ensure perfect coordinate calculation
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }
  });

  return null;
}
