import React from 'react';
import HeroWayangJawi from '@/components/HeroWayangJawi';
import StoryShadowsSection from '@/components/StoryShadowsSection';
import SectionBimaSuci from '@/components/SectionBimaSuci';
import SectionStoryAwakening from '@/components/SectionStoryAwakening';
import SectionStoryFinale from '@/components/SectionStoryFinale';
import SectionMovementMeaning from '@/components/SectionMovementMeaning';
import SectionJoinTheNight from '@/components/SectionJoinTheNight';
import MarqueeTicker from '@/components/MarqueeTicker';

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden bg-[#dedf42]">
      {/* 2. Section 1: Hero Wayang Jawi */}
      <HeroWayangJawi />

      {/* 3. Section 2: A Night Where Shadows Speak */}
      <StoryShadowsSection id="fitur" />

      {/* 4. Marquee Ticker Tape */}
      <MarqueeTicker variant="tape" size="xl" />

      {/* Gradient bridge: yellow → black (softens Ticker→BimaSuci) */}
      <div className="h-10 sm:h-14 md:h-20 bg-gradient-to-b from-[#3a3b0e] via-[#1a1a0a] to-black" />

      {/* 5. Section 3: Tonight Lakon - Bima Suci */}
      <SectionBimaSuci />

      {/* Gradient bridge: black → yellow (softens BimaSuci→StoryAwakening) */}
      <div className="h-12 sm:h-16 md:h-24 bg-gradient-to-b from-black via-[#1a1a0a] to-[#3a3b0e]" />

      {/* 6. Section 4: A Story of Inner Awakening */}
      <SectionStoryAwakening id="cara-bermain" />

      {/* 7. Section 5: A Night to Remember / A Story to Carry */}
      <SectionStoryFinale id="filosofi" />

      {/* 8. Section 6: Interactive Meaning Carousel (From Video 00:26 - 00:34) */}
      <SectionMovementMeaning id="makna" />

      {/* 9. Section 7: Join the Night / The Night Wayang Jawi (From Video 00:36 - 00:41) */}
      <SectionJoinTheNight id="join" />
    </div>
  );
}
