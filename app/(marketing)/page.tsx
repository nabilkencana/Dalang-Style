import React from 'react';
import HeroWayangJawi from '@/components/HeroWayangJawi';
import StoryShadowsSection from '@/components/StoryShadowsSection';
import SectionBimaSuci from '@/components/SectionBimaSuci';
import SectionStoryAwakening from '@/components/SectionStoryAwakening';
import SectionStoryFinale from '@/components/SectionStoryFinale';
import SectionWayangGenerator from '@/components/SectionWayangGenerator';
import SectionMovementMeaning from '@/components/SectionMovementMeaning';
import SectionGalleryMuseum from '@/components/SectionGalleryMuseum';
import SectionJoinTheNight from '@/components/SectionJoinTheNight';
import TextMarquee from '@/components/ui/text-marquee';
import GsapAnimations from '@/components/GsapAnimations';
export default function LandingPage() {
  return (
    <div className="relative overflow-hidden bg-[#dedf42]">
      {/* GSAP ScrollTrigger Animations Controller */}
      <GsapAnimations />
      {/* 2. Section 1: Hero Wayang Jawi */}
      <HeroWayangJawi />

      {/* 3. Section 2: A Night Where Shadows Speak */}
      <StoryShadowsSection id="fitur" />

      {/* 4. Marquee Ticker Tape — scroll-reactive dual-row */}
      <div className="relative w-full py-4 sm:py-5 md:py-6 bg-[#dedf42] text-black overflow-hidden select-none z-20">
        <TextMarquee
          baseVelocity={-0.8}
          scrollDependent
          delay={300}
          clasname="font-sans font-black text-[4vw] sm:text-[3vw] md:text-[2.5vw] tracking-[0.15em] uppercase text-black leading-none"
        >
          WAYANG JAWI • PANGGUNG DIGITAL INTERAKTIF • SENI WARISAN NUSANTARA • DALANG AI •
        </TextMarquee>
        <TextMarquee
          baseVelocity={0.8}
          scrollDependent
          delay={300}
          clasname="font-sans font-black text-[4vw] sm:text-[3vw] md:text-[2.5vw] tracking-[0.15em] uppercase text-black/40 leading-none"
        >
          KELIR • BLENCONG • GAMELAN • KAYON • PAKELIRAN • TATAH SUNGGING •
        </TextMarquee>
      </div>

      {/* Gradient bridge: yellow → black (softens Ticker→BimaSuci) */}
      <div className="h-10 sm:h-14 md:h-20 bg-gradient-to-b from-[#3a3b0e] via-[#1a1a0a] to-black" />

      {/* 5. Section 3: Tonight Lakon - Bima Suci */}
      <SectionBimaSuci />


      {/* 6. Section 4: A Story of Inner Awakening (Tokoh Wayang Pinned Character Journey) */}
      <SectionStoryAwakening id="cara-bermain" />

      {/* 6.5. Section: Kreasi AI - Custom Wayang Generator (Fan-In Overlay 30° -> 0°) */}
      <SectionWayangGenerator id="kreasi" />
       {/* 7. Section 5: Articles & Editorial News (#berita) */}
      <SectionStoryFinale id="berita" />
      {/* 8. Section 6: Interactive Meaning Carousel (From Video 00:26 - 00:34) */}
      <SectionMovementMeaning id="makna" />

      {/* 9. Section 7: Galeri Museum Wayang */}
      <SectionGalleryMuseum />

      {/* 9. Section 7: Join the Night / The Night Wayang Jawi (From Video 00:36 - 00:41) */}
      <SectionJoinTheNight id="join" />
    </div>
  );
}
