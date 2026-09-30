'use client';

import { useEffect } from 'react';

/**
 * ScrollReveal
 * Adds entrance animations to every section / card / heading on every page
 * using a single IntersectionObserver. Elements opt-in automatically by
 * element type; no data-attribute required in JSX.
 *
 * Animation classes are defined in globals.css under `[data-reveal]`.
 */

const REVEAL_SELECTOR = [
  // Section-level containers
  'section',
  // Article / news cards
  'article',
  // Generic cards that are direct children of grid/flex parents
  '.group',
  // Headings at every level
  'h1:not([data-gsap])',
  'h2:not([data-gsap])',
  'h3:not([data-gsap])',
  'h4:not([data-gsap])',
  // Body paragraphs
  'p:not([data-gsap])',
  // Images (lazy-loaded, so good to reveal on intersection)
  'figure',
  // CTA links / buttons at the top level of a section
  '.cta-reveal',
].join(', ');

// Skip elements already animated by GSAP (they have data-gsap attributes)
function shouldSkip(el: Element): boolean {
  if (el.hasAttribute('data-gsap')) return true;
  if (el.closest('[data-gsap]')) return true;
  // Skip elements inside the hero section to avoid double-animation
  if (el.closest('section:first-of-type')) return true;
  return false;
}

export default function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR))
      .filter((el) => !shouldSkip(el));

    // Mark elements before observer fires so they start invisible
    els.forEach((el) => {
      el.dataset.reveal = 'pending';
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.dataset.reveal = 'visible';
            io.unobserve(el); // fire once
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
