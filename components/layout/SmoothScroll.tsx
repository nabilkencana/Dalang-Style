'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    lenisInstance?: Lenis | null;
  }
}
/**
 * SmoothScroll
 * Initialises Lenis inertia scroll globally and syncs it with GSAP ScrollTrigger
 * so existing data-gsap animations and scroll-triggered effects stay accurate.
 */
export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,          // smooth, cinematic inertia glide
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
      infinite: false,
    });
    lenisRef.current = lenis;
    if (typeof window !== 'undefined') {
      window.lenisInstance = lenis;
    }

    // Keep GSAP ScrollTrigger in sync with Lenis virtual scroll position
    lenis.on('scroll', () => ScrollTrigger.update());

    // Drive Lenis from the GSAP ticker so both use the same rAF
    const ticker = gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Intercept internal hash links (both #section and /#section) for cinematic inertia glide
    const handleAnchorClick = (e: globalThis.MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      let targetSelector = '';
      if (href.startsWith('#') && href.length > 1) {
        targetSelector = href;
      } else if (href.startsWith('/#') && (window.location.pathname === '/' || window.location.pathname === '')) {
        targetSelector = href.substring(1);
      }

      if (targetSelector) {
        try {
          const target = document.querySelector(targetSelector);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target as HTMLElement, {
              offset: -80,
              duration: 1.2,
              easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
            });
          }
        } catch {
          // Ignore invalid selector queries if any
        }
      }
    };

    // Auto-scroll to hash target smoothly on initial page load if hash exists
    if (typeof window !== 'undefined' && window.location.hash) {
      setTimeout(() => {
        try {
          const target = document.querySelector(window.location.hash);
          if (target) {
            lenis.scrollTo(target as HTMLElement, {
              offset: -80,
              duration: 1.3,
              easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
            });
          }
        } catch {
          // Ignore invalid hash
        }
      }, 180);
    }
    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      if (typeof window !== 'undefined') {
        window.lenisInstance = null;
      }
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return null;
}
