'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Template({ children }: { children: React.ReactNode }) {
  // Smoothly reset scroll position to top and refresh GSAP ScrollTrigger on page navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // If navigating without a hash anchor, scroll smoothly/immediately to top
      if (!window.location.hash) {
        if (window.lenisInstance) {
          window.lenisInstance.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      }
      // Recalibrate GSAP ScrollTrigger so pins & triggers on the new route are exact
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {/* Theatrical Shimmer Progress Accent Bar (indicates smooth page arrival) */}
      <motion.div
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{
          scaleX: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.25, delay: 0.3, ease: 'easeOut' },
        }}
        style={{ transformOrigin: 'left' }}
        className="fixed top-0 inset-x-0 h-[2px] z-[90] pointer-events-none bg-gradient-to-r from-transparent via-[#dedf42] to-transparent shadow-[0_0_12px_#dedf42]"
      />

      {/* Main Page Transition — clean opacity so position: fixed pins stay relative to viewport */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.35,
          ease: 'easeOut',
        }}
        className="w-full min-h-full"
      >
        {children}
      </motion.div>
    </>
  );
}
