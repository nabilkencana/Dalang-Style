'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScroll
 * Initialises Lenis inertia scroll globally and syncs it with GSAP ScrollTrigger
 * so existing data-gsap animations and scroll-triggered effects stay accurate.
 */
export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,          // higher = slower / smoother glide
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
      smoothWheel: true,
      wheelMultiplier: 0.85,  // dampen wheel sensitivity a little
      touchMultiplier: 1.8,
    });

    lenisRef.current = lenis;

    // Keep GSAP ScrollTrigger in sync with Lenis virtual scroll position
    lenis.on('scroll', () => ScrollTrigger.update());

    // Drive Lenis from the GSAP ticker so both use the same rAF
    const ticker = gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return null;
}
