'use client';

import React from 'react';

export default function DancerSmokeVector({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1346 892"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full object-cover select-none pointer-events-none ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Glow Filters */}
        <filter id="heavyMist" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="16" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="softSmoke" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" />
        </filter>

        <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Ambient Blencong Spotlight Gradient */}
        <radialGradient id="blencongGlow" cx="50%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#d9a441" stopOpacity="0.22" />
          <stop offset="35%" stopColor="#a67123" stopOpacity="0.08" />
          <stop offset="70%" stopColor="#050303" stopOpacity="0" />
        </radialGradient>

        {/* Smoke Trail Linear Gradients */}
        <linearGradient id="smokeLeft" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="75%" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="smokeRight" x1="100%" y1="50%" x2="0%" y2="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="smokeCenterGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d9a441" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#d9a441" stopOpacity="0" />
        </linearGradient>

        {/* Dancer Highlights Gradients */}
        <linearGradient id="dancerHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#e5e5e5" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#666666" stopOpacity="0.05" />
        </linearGradient>

        <linearGradient id="goldRim" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f2c76b" stopOpacity="0.65" />
          <stop offset="60%" stopColor="#d9a441" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#402008" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 1. Deep Theatrical Void Background */}
      <rect width="1346" height="892" fill="#050303" />

      {/* 2. Central Warm Blencong Illumination */}
      <rect width="1346" height="892" fill="url(#blencongGlow)" />

      {/* 3. Sweeping Horizontal Motion Blur & Ethereal Smoke Trails (Left & Right) */}
      <g filter="url(#heavyMist)" opacity="0.85">
        {/* Left Side Sweeping Light Streams */}
        <path
          d="M0 240 C180 230 320 280 480 380 C360 440 220 480 0 460 Z"
          fill="url(#smokeLeft)"
        />
        <path
          d="M-50 320 C140 310 290 350 440 440 C340 500 180 530 -50 510 Z"
          fill="url(#smokeLeft)"
          opacity="0.7"
        />
        <path
          d="M0 420 C190 410 350 480 500 580 C380 640 200 660 0 630 Z"
          fill="url(#smokeLeft)"
          opacity="0.5"
        />

        {/* Right Side Sweeping Light Streams */}
        <path
          d="M1346 220 C1160 210 1020 270 850 380 C980 440 1130 480 1346 450 Z"
          fill="url(#smokeRight)"
        />
        <path
          d="M1396 310 C1200 300 1050 350 900 450 C1010 510 1170 540 1396 500 Z"
          fill="url(#smokeRight)"
          opacity="0.8"
        />
        <path
          d="M1346 410 C1150 400 980 470 820 590 C960 650 1140 670 1346 620 Z"
          fill="url(#smokeRight)"
          opacity="0.6"
        />
      </g>

      {/* Center Swirling Smoke Wisps with Dynamic Ribbons */}
      <g filter="url(#softSmoke)" opacity="0.65">
        <path
          d="M320 340 C440 260 600 240 760 300 C920 360 1060 480 1200 560 C1020 540 840 480 680 420 C540 360 420 350 320 340 Z"
          fill="url(#smokeCenterGlow)"
        />
        <path
          d="M260 480 C400 420 580 440 720 500 C860 560 980 660 1140 700 C960 660 800 600 640 560 C480 520 360 510 260 480 Z"
          fill="url(#smokeCenterGlow)"
          opacity="0.5"
        />
      </g>

      {/* 4. Main Traditional Dancer (Standing in Dynamic Sabet/Agem Pose) */}
      <g filter="url(#subtleGlow)">
        {/* Raised Right Arm holding Cempala / Keris */}
        <g stroke="url(#dancerHighlight)" strokeWidth="2.5" fill="none">
          {/* Cempala Baton / Dagger in Hand */}
          <path
            d="M350 205 L475 90 L488 102 L363 218 Z"
            fill="url(#dancerHighlight)"
            strokeWidth="1.5"
          />
          {/* Ornate Pommel & Tassel */}
          <circle cx="345" cy="210" r="8" fill="#e5e5e5" />
          <path d="M340 216 L310 245 L320 255 L348 222 Z" fill="#999999" />

          {/* Forearm & Hand gripping the cempala */}
          <path
            d="M390 185 C425 155 450 145 468 150 C480 155 470 185 440 210 C415 230 380 245 365 240 Z"
            fill="rgba(240, 240, 240, 0.45)"
          />
          {/* Kelat Bahu (Arm Band Jewelry) */}
          <path d="M420 200 C435 205 450 220 455 235" stroke="#f2c76b" strokeWidth="3" />
        </g>

        {/* Ornate Royal Headdress / Makuta (Elaborate Crown Jewels & Winged Crest) */}
        <g fill="url(#dancerHighlight)" stroke="url(#goldRim)" strokeWidth="1.2">
          {/* Base Crown Band (Jamang) */}
          <path
            d="M520 240 C550 235 590 235 625 242 C628 255 615 265 580 265 C545 265 522 255 520 240 Z"
            fill="#ffffff"
            opacity="0.8"
          />
          {/* Garuda Mungkur & Crest Wings spreading upwards */}
          <path
            d="M515 230
               C500 190 470 160 440 145
               C475 165 490 190 495 215
               C480 180 450 135 410 110
               C445 135 465 175 475 220
               Z"
            fill="#e0e0e0"
            opacity="0.75"
          />
          <path
            d="M625 235
               C645 190 685 155 725 135
               C695 160 675 190 665 218
               C710 175 750 130 805 105
               C760 135 730 180 710 225
               Z"
            fill="#e0e0e0"
            opacity="0.75"
          />
          {/* Central Tiered Crown Jewel Peaks */}
          <path
            d="M560 235 L575 140 L590 235 Z"
            fill="#ffffff"
            opacity="0.9"
          />
          <path d="M540 238 L550 165 L565 236 Z" fill="#cccccc" opacity="0.7" />
          <path d="M585 236 L600 165 L610 238 Z" fill="#cccccc" opacity="0.7" />
          {/* Floating Jewels / Sparkling Ornaments */}
          <circle cx="575" cy="130" r="5" fill="#f2c76b" />
          <circle cx="548" cy="155" r="3.5" fill="#f2c76b" />
          <circle cx="602" cy="155" r="3.5" fill="#f2c76b" />
          <circle cx="435" cy="100" r="4" fill="#ffffff" />
          <circle cx="810" cy="98" r="4" fill="#ffffff" />
        </g>

        {/* Noble Facial Silhouette in Classic Javanese Makeup */}
        <g fill="rgba(235, 235, 235, 0.65)" stroke="none">
          {/* Forehead, Nose & Lips Profile */}
          <path
            d="M560 262
               C562 275 565 290 575 305
               C582 315 588 322 585 328
               C580 335 568 335 562 342
               C558 348 565 355 572 360
               C578 365 570 375 558 375
               C545 372 538 355 535 338
               C532 315 540 280 560 262 Z"
          />
          {/* Expressive Eye & Brow */}
          <path
            d="M562 292 C572 290 582 295 588 302 C580 304 570 302 562 292 Z"
            fill="#ffffff"
          />
          <path d="M558 285 C572 280 588 285 595 295" stroke="#111111" strokeWidth="2" />
        </g>

        {/* Majestic Torso, Royal Armor (Badhong) & Flowing Sash (Sampur) */}
        <g stroke="url(#dancerHighlight)" strokeWidth="1.5" fill="none">
          {/* Broad Shoulders & Royal Kalung */}
          <path
            d="M480 340
               C520 330 610 330 650 345
               C665 385 670 435 660 480
               C630 540 590 590 540 640
               C490 600 460 540 450 460
               C445 400 460 360 480 340 Z"
            fill="rgba(20, 20, 20, 0.75)"
          />
          {/* Intricate Royal Embroidery Lines & Prada Patterns */}
          <path d="M510 370 C545 420 580 420 615 370" stroke="#f2c76b" strokeWidth="2" />
          <path d="M525 410 C550 450 575 450 600 410" stroke="#f2c76b" strokeWidth="1.5" />
          <path d="M535 450 C550 480 570 480 585 450" stroke="#f2c76b" strokeWidth="1.5" />

          {/* Left Extended Arm & Flowing Sampur */}
          <path
            d="M650 345
               C695 365 745 400 780 445
               C760 470 720 485 680 480
               C645 450 620 405 650 345 Z"
            fill="rgba(40, 40, 40, 0.5)"
          />
          {/* Flowing Silk Sash Waves billowing to the sides */}
          <path
            d="M450 480 C380 510 290 560 210 640 C320 620 420 580 480 530 Z"
            fill="rgba(180, 180, 180, 0.15)"
            stroke="url(#dancerHighlight)"
          />
          <path
            d="M650 490 C740 520 840 570 940 640 C830 620 720 580 640 530 Z"
            fill="rgba(180, 180, 180, 0.15)"
            stroke="url(#dancerHighlight)"
          />
        </g>
      </g>

      {/* 5. Kneeling Companion Dancer (Bottom Right, Gazing Upwards) */}
      <g filter="url(#subtleGlow)" opacity="0.82">
        {/* Crown & Headdress */}
        <g fill="url(#dancerHighlight)" stroke="url(#goldRim)" strokeWidth="1.2">
          <path
            d="M740 640
               C760 600 800 570 850 550
               C825 580 810 610 805 640
               Z"
            fill="#dcdcdc"
            opacity="0.8"
          />
          <circle cx="855" cy="545" r="4.5" fill="#f2c76b" />
          <circle cx="820" cy="570" r="3" fill="#ffffff" />
        </g>

        {/* Uplooking Face Profile */}
        <path
          d="M765 650
             C775 660 785 675 790 690
             C795 700 790 710 780 715
             C765 710 755 695 750 680
             Z"
          fill="rgba(220, 220, 220, 0.65)"
        />

        {/* Shoulders & Traditional Royal Adornments */}
        <path
          d="M720 700
             C750 680 820 680 860 710
             C875 745 860 790 820 830
             C760 830 710 780 720 700 Z"
          fill="rgba(18, 18, 18, 0.7)"
          stroke="url(#dancerHighlight)"
          strokeWidth="1.5"
        />
        <path d="M745 725 C775 750 810 750 835 725" stroke="#f2c76b" strokeWidth="2" />
      </g>

      {/* 6. Atmospheric Golden Dust Particles / Blencong Embers */}
      <g opacity="0.6">
        <circle cx="510" cy="220" r="1.8" fill="#f2c76b" />
        <circle cx="680" cy="180" r="2.2" fill="#f2c76b" />
        <circle cx="430" cy="310" r="1.5" fill="#ffffff" />
        <circle cx="860" cy="290" r="2.5" fill="#f2c76b" />
        <circle cx="370" cy="460" r="1.2" fill="#f2c76b" />
        <circle cx="950" cy="420" r="2.0" fill="#ffffff" />
        <circle cx="620" cy="520" r="1.6" fill="#f2c76b" />
        <circle cx="780" cy="610" r="2.4" fill="#f2c76b" />
      </g>

      {/* 7. Subtle Corner Vignettes for Extreme Text Contrast */}
      <rect width="1346" height="892" fill="url(#blencongGlow)" opacity="0.4" />
    </svg>
  );
}
