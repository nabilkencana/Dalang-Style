'use client';

import React from 'react';

export interface BimaDancerVectorProps {
  className?: string;
  glowColor?: string;
}

export default function BimaDancerVector({
  className = '',
  glowColor = '#dedf42',
}: BimaDancerVectorProps) {
  return (
    <svg
      viewBox="0 0 1504 1128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full object-cover select-none pointer-events-none ${className}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Checkered Kain Poleng Pattern */}
        <pattern id="kainPoleng" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="12" height="12" fill="#050505" />
          <rect x="12" width="12" height="12" fill="#ededed" />
          <rect y="12" width="12" height="12" fill="#ededed" />
          <rect x="12" y="12" width="12" height="12" fill="#050505" />
          <line x1="0" y1="0" x2="24" y2="0" stroke="#444444" strokeWidth="0.6" />
          <line x1="0" y1="12" x2="24" y2="12" stroke="#444444" strokeWidth="0.6" />
          <line x1="0" y1="0" x2="0" y2="24" stroke="#444444" strokeWidth="0.6" />
          <line x1="12" y1="0" x2="12" y2="24" stroke="#444444" strokeWidth="0.6" />
        </pattern>

        {/* Diagonal Checkered Pattern for Angkin Waistband */}
        <pattern id="kainPolengDiagonal" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="10" height="10" fill="#000000" />
          <rect x="10" width="10" height="10" fill="#f0f0f0" />
          <rect y="10" width="10" height="10" fill="#f0f0f0" />
          <rect x="10" y="10" width="10" height="10" fill="#000000" />
        </pattern>

        {/* Stage Footlight Glow Filters */}
        <filter id="footlightBloom" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="16" result="blur1" />
          <feGaussianBlur stdDeviation="6" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="theatricalGlow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Chiaroscuro Gradients */}
        <linearGradient id="bodyChiaroscuro" x1="20%" y1="10%" x2="80%" y2="90%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="35%" stopColor="#cfcfcf" stopOpacity="0.6" />
          <stop offset="65%" stopColor="#4a4a4a" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#080808" stopOpacity="0.1" />
        </linearGradient>

        <linearGradient id="backArmShade" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#999999" stopOpacity="0.5" />
          <stop offset="85%" stopColor="#111111" stopOpacity="0.1" />
        </linearGradient>

        <linearGradient id="crownLustre" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#cccccc" stopOpacity="0.7" />
          <stop offset="80%" stopColor="#555555" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.05" />
        </linearGradient>

        <radialGradient id="footlightCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#e8e8e8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 1. Deep Theatrical Atmosphere & Audience Vignette */}
      <rect width="1504" height="1128" fill="#000000" />

      {/* Ambient Theater Spot Cone behind Dancer */}
      <radialGradient id="ambientSpot" cx="50%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.07" />
        <stop offset="40%" stopColor="#d9a441" stopOpacity="0.03" />
        <stop offset="75%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
      <rect width="1504" height="1128" fill="url(#ambientSpot)" />

      {/* Low-Key Audience Dark Shapes */}
      <g opacity="0.12" fill="#141414">
        {/* Tiered Seated Audience Silhouettes */}
        <ellipse cx="180" cy="340" rx="46" ry="40" />
        <ellipse cx="280" cy="360" rx="50" ry="44" />
        <ellipse cx="120" cy="400" rx="48" ry="42" />
        <ellipse cx="360" cy="410" rx="52" ry="46" />
        <ellipse cx="220" cy="450" rx="55" ry="48" />

        <ellipse cx="880" cy="350" rx="52" ry="46" />
        <ellipse cx="1020" cy="380" rx="56" ry="50" />
        <ellipse cx="1180" cy="390" rx="54" ry="48" />
        <ellipse cx="1340" cy="370" rx="50" ry="44" />
        <ellipse cx="940" cy="430" rx="58" ry="52" />
        <ellipse cx="1100" cy="450" rx="60" ry="54" />
        <ellipse cx="1280" cy="440" rx="56" ry="50" />
      </g>

      {/* 2. Character: High-Contrast Theatrical Silhouette of Raden Werkudara / Bima */}
      <g filter="url(#theatricalGlow)">
        {/* Left Bent Leg (Kuda-kuda Kokoh dengan Kain Poleng) */}
        <g>
          {/* Main Thigh with Poleng Motif */}
          <path
            d="M510 700
               C480 770 440 850 405 930
               C465 955 560 930 635 885
               C620 810 580 750 540 700 Z"
            fill="url(#kainPoleng)"
            stroke="#1c1c1c"
            strokeWidth="2"
          />
          {/* Chiaroscuro Shadow Overlay for Depth */}
          <path
            d="M510 700 C480 770 440 850 405 930 C465 955 560 930 635 885 C620 810 580 750 540 700 Z"
            fill="url(#bodyChiaroscuro)"
            opacity="0.38"
          />
          {/* Lower Leg & Muscular Calf */}
          <path
            d="M405 930
               C390 965 385 1005 395 1035
               C410 1045 440 1045 455 1030
               C458 1000 450 965 440 930 Z"
            fill="url(#bodyChiaroscuro)"
            stroke="#222"
            strokeWidth="1.5"
          />
          {/* Binggel / Silver Ankle Bracelet */}
          <path d="M400 1005 C420 1012 445 1008 452 998" stroke="#ffffff" strokeWidth="3" />
        </g>

        {/* Right Extended Lunging Leg */}
        <g>
          <path
            d="M625 695
               C695 740 790 785 890 830
               C875 865 810 870 735 835
               C665 790 630 740 625 695 Z"
            fill="url(#kainPoleng)"
            stroke="#1c1c1c"
            strokeWidth="2"
          />
          {/* Extended Right Calf stepping into the footlight glow */}
          <path
            d="M890 830
               C955 860 1025 905 1080 950
               C1065 972 1015 982 965 960
               C920 920 890 875 890 830 Z"
            fill="url(#bodyChiaroscuro)"
            stroke="#222"
            strokeWidth="1.5"
          />
          {/* Ankle Ring */}
          <path d="M1025 935 C1045 942 1065 935 1072 925" stroke="#ffffff" strokeWidth="3" />
        </g>

        {/* Muscular Torso & Broad Shoulders (Dada Bidang Kesatria) */}
        <g>
          <path
            d="M500 420
               C535 395 595 405 640 435
               C665 490 675 580 655 650
               C610 690 535 695 480 660
               C465 570 470 490 500 420 Z"
            fill="url(#bodyChiaroscuro)"
            stroke="#333"
            strokeWidth="2"
          />
          {/* Spine & Muscular Rib Contours */}
          <path d="M570 420 C585 495 580 580 550 655" stroke="rgba(255,255,255,0.45)" strokeWidth="3.5" />
          <path d="M525 465 C555 490 590 480 625 455" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" />
          <path d="M515 530 C550 555 590 545 625 515" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" />
        </g>

        {/* Powerful Left Arm cocked back (Kelat Bahu & Kuku Pancanaka) */}
        <g>
          {/* Shoulder & Bicep */}
          <path
            d="M500 420
               C445 400 385 440 345 485
               C360 515 390 540 415 525
               C445 485 475 455 500 420 Z"
            fill="url(#backArmShade)"
            stroke="#333"
            strokeWidth="2"
          />
          {/* Forearm bent forward holding waist */}
          <path
            d="M345 485
               C350 535 360 600 390 645
               C418 640 430 610 415 560
               C400 530 375 505 345 485 Z"
            fill="url(#backArmShade)"
            stroke="#333"
            strokeWidth="2"
          />
          {/* Kelat Bahu Dragon Armband */}
          <path d="M410 455 C430 465 445 495 435 515" stroke="#ffffff" strokeWidth="4.5" />
          {/* Gelang Wristband */}
          <path d="M365 610 C382 618 402 612 408 600" stroke="#ffffff" strokeWidth="4" />
          {/* Kuku Pancanaka (The Signature Thumb Claw of Bima) */}
          <path d="M390 645 C405 675 398 690 380 685 C372 670 378 655 390 645 Z" fill="#ffffff" />
        </g>

        {/* Dynamic Right Arm reaching forward */}
        <g>
          <path
            d="M640 435
               C695 455 755 500 790 555
               C775 575 745 585 715 565
               C680 520 655 480 640 435 Z"
            fill="url(#bodyChiaroscuro)"
            stroke="#333"
            strokeWidth="2"
          />
          <path d="M705 490 C720 505 735 530 730 550" stroke="#ffffff" strokeWidth="4.5" />
        </g>

        {/* Flowing White Silk Sash (Sampur) & Angkin Waistband */}
        <g>
          {/* Angkin Waistband (Diagonal Checkerboard) */}
          <path
            d="M485 640 C530 630 600 635 650 648 L645 680 C595 670 525 665 480 670 Z"
            fill="url(#kainPolengDiagonal)"
            stroke="#333"
            strokeWidth="1"
          />
          {/* Canthik Waist Knot */}
          <ellipse cx="545" cy="650" rx="32" ry="22" fill="#ffffff" stroke="#e0e0e0" />
          {/* Left Cascading Sash Ribbon */}
          <path
            d="M530 660
               C475 700 425 765 410 830
               C435 850 480 810 530 740
               C560 695 550 670 530 660 Z"
            fill="url(#sashWhite)"
            stroke="#ffffff"
            strokeWidth="1.2"
          />
          {/* Right Flowing Sash Ribbon */}
          <path
            d="M560 660
               C625 710 690 775 715 845
               C690 860 645 815 590 740
               C570 700 565 670 560 660 Z"
            fill="url(#sashWhite)"
            stroke="#ffffff"
            strokeWidth="1.2"
          />
          {/* Sash Drapery Folds */}
          <path d="M520 675 C480 735 450 800 435 865" stroke="#777777" strokeWidth="2" />
          <path d="M555 675 C595 735 635 800 660 865" stroke="#777777" strokeWidth="2" />
        </g>

        {/* Majestic Crown & Face: Gelung Supit Urang + Fierce Mask Profile */}
        <g>
          {/* Gelung Supit Urang (Curling Lobster-Claw Crest of Bima) */}
          <path
            d="M635 255
               C610 190 650 135 710 120
               C770 105 810 145 795 200
               C775 250 720 265 670 252
               C715 230 745 200 740 170
               C735 140 700 132 668 152
               C635 172 618 215 635 255 Z"
            fill="url(#crownLustre)"
            stroke="#ffffff"
            strokeWidth="2.5"
          />

          {/* Jamang (Crown Diadem with Tiered Teeth & Jewels) */}
          <path
            d="M565 270
               C600 250 655 250 700 268
               C705 290 695 315 650 320
               C605 320 570 300 565 270 Z"
            fill="#ffffff"
            stroke="#222"
            strokeWidth="1.8"
          />
          {/* Crown Peaks */}
          <path d="M580 265 L590 238 L602 265" stroke="#ffffff" strokeWidth="3" />
          <path d="M615 258 L628 225 L640 258" stroke="#ffffff" strokeWidth="3.5" />
          <path d="M652 260 L665 232 L678 262" stroke="#ffffff" strokeWidth="3" />

          {/* Sumping (Curved Ear Wing Ornaments) */}
          <path
            d="M555 305
               C530 288 515 300 510 322
               C520 338 545 332 555 322 Z"
            fill="#ffffff"
          />

          {/* Mask / Classical Face Profile */}
          <path
            d="M575 290
               C620 280 660 300 682 332
               C698 365 685 410 652 435
               C612 445 570 435 550 400
               C538 362 550 315 575 290 Z"
            fill="#eeeeee"
            stroke="#111"
            strokeWidth="2.2"
          />
          {/* Kumis Bapang (Bold Warrior Mustache) */}
          <path
            d="M585 368
               C620 355 665 360 690 380
               C700 395 672 410 640 398
               C608 392 590 382 585 368 Z"
            fill="#050505"
          />
          {/* Fangs / Taring Gagah */}
          <path d="M652 400 L668 420 L662 395 Z" fill="#ffffff" stroke="#111" strokeWidth="1.2" />
          <path d="M635 402 L645 418 L642 398 Z" fill="#ffffff" stroke="#111" strokeWidth="1.2" />
          {/* Fierce Eye (Telengan) */}
          <ellipse cx="625" cy="328" rx="15" ry="11" fill="#ffffff" stroke="#000" strokeWidth="2.8" />
          <circle cx="628" cy="328" r="6" fill="#000000" />
          <path d="M608 314 C628 310 648 316 655 322" stroke="#000000" strokeWidth="4" />
        </g>
      </g>

      {/* 3. Luminous Stage Footlights & Floor Glare on the Bottom Right */}
      <g filter="url(#footlightBloom)">
        {/* Footlight 1 */}
        <circle cx="890" cy="855" r="26" fill="url(#footlightCore)" />
        <circle cx="890" cy="855" r="13" fill="#ffffff" />

        {/* Footlight 2 */}
        <circle cx="975" cy="860" r="30" fill="url(#footlightCore)" />
        <circle cx="975" cy="860" r="15" fill="#ffffff" />

        {/* Footlight 3 */}
        <circle cx="1065" cy="870" r="34" fill="url(#footlightCore)" />
        <circle cx="1065" cy="870" r="17" fill="#ffffff" />

        {/* Footlight 4 */}
        <circle cx="1160" cy="880" r="38" fill="url(#footlightCore)" />
        <circle cx="1160" cy="880" r="19" fill="#ffffff" />

        {/* Footlight 5 */}
        <circle cx="1265" cy="890" r="42" fill="url(#footlightCore)" />
        <circle cx="1265" cy="890" r="21" fill="#ffffff" />

        {/* Footlight 6 */}
        <circle cx="1380" cy="902" r="45" fill="url(#footlightCore)" />
        <circle cx="1380" cy="902" r="23" fill="#ffffff" />
      </g>

      {/* Glossy Floor Reflections */}
      <ellipse cx="1140" cy="940" rx="380" ry="22" fill="rgba(255,255,255,0.09)" />
      <ellipse cx="600" cy="960" rx="260" ry="18" fill="rgba(255,255,255,0.05)" />
    </svg>
  );
}
