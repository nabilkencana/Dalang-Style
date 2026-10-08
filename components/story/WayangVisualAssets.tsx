'use client';

import React from 'react';

/**
 * Traditional Javanese Gunungan (Kayon) SVG Vector Motif
 * Intricate carved gate (gapura) and swirling kalpataru tree motifs inspired by classical pakeliran art.
 */
export function GununganOrnateMotif({
  className = 'w-64 h-80',
  color = '#d9a441',
  secondaryColor = '#8c5921',
  glow = true,
}: {
  className?: string;
  color?: string;
  secondaryColor?: string;
  glow?: boolean;
}) {
  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      {glow && (
        <div
          className="absolute inset-2 rounded-full opacity-35 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${color} 0%, rgba(217,164,65,0.15) 50%, transparent 75%)` }}
        />
      )}
      <svg
        viewBox="0 0 400 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_12px_32px_rgba(0,0,0,0.9)]"
      >
        {/* Outer Gunungan Body Silhouette */}
        <path
          d="M200 12 L245 95 C285 175 345 270 365 375 C372 415 368 460 348 495 C336 515 315 528 290 535 L110 535 C85 528 64 515 52 495 C32 460 28 415 35 375 C55 270 115 175 155 95 Z"
          fill="url(#gununganBgGrad)"
          stroke={color}
          strokeWidth="7"
          strokeLinejoin="round"
        />

        {/* Inner Inset Contour */}
        <path
          d="M200 38 L238 110 C272 182 326 268 344 362 C350 398 346 438 328 470 C318 488 300 500 278 506 L122 506 C100 500 82 488 72 470 C54 438 50 398 56 362 C74 268 128 182 162 110 Z"
          stroke={secondaryColor}
          strokeWidth="3"
          strokeDasharray="6 4"
          fill="none"
        />

        {/* Central Axis Tree of Life / Axis Trunk */}
        <path d="M200 40 L200 375" stroke={color} strokeWidth="5.5" strokeLinecap="round" />

        {/* Ornate Swirls - Upper Tier */}
        <path
          d="M200 115 C175 115 150 135 155 162 C160 190 190 180 195 155 C198 140 185 130 175 138"
          stroke={color}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M200 115 C225 115 250 135 245 162 C240 190 210 180 205 155 C202 140 215 130 225 138"
          stroke={color}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Ornate Swirls - Mid Tier Large Spirals (Mirroring Reference) */}
        <path
          d="M200 180 C155 180 110 215 118 262 C126 310 180 290 186 248 C190 220 162 205 145 222 C132 235 145 258 160 252"
          stroke={color}
          strokeWidth="4.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M200 180 C245 180 290 215 282 262 C274 310 220 290 214 248 C210 220 238 205 255 222 C268 235 255 258 240 252"
          stroke={color}
          strokeWidth="4.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Ornate Swirls - Lower Outer Curls */}
        <path
          d="M200 260 C140 260 85 305 98 368 C110 430 185 400 188 340 C190 295 145 280 125 305"
          stroke={color}
          strokeWidth="4.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M200 260 C260 260 315 305 302 368 C290 430 215 400 212 340 C210 295 255 280 275 305"
          stroke={color}
          strokeWidth="4.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Sacred Portal Gate / Gapura Rumah (At Bottom Center) */}
        <rect
          x="148"
          y="385"
          width="104"
          height="145"
          rx="10"
          fill="#060302"
          stroke={color}
          strokeWidth="5"
        />
        
        {/* Gapura Arch Canopy Roof */}
        <path
          d="M136 395 C136 375 200 365 200 365 C200 365 264 375 264 395 Z"
          fill="#1c0f05"
          stroke={color}
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Gapura Inner Sacred Gateway Portal */}
        <path
          d="M168 530 L168 450 C168 425 200 412 200 412 C200 412 232 425 232 450 L232 530 Z"
          fill="url(#gapuraDoorGrad)"
          stroke={secondaryColor}
          strokeWidth="3.5"
        />

        {/* Gapura Door Steps (Tiered Javanese Umbul Steps) */}
        <line x1="162" y1="475" x2="238" y2="475" stroke={color} strokeWidth="3" />
        <line x1="156" y1="495" x2="244" y2="495" stroke={color} strokeWidth="3" />
        <line x1="150" y1="515" x2="250" y2="515" stroke={color} strokeWidth="3.5" />

        {/* Crown Pinnacle Flame / Api Suci Puncak Kayon */}
        <path
          d="M200 6 C188 20 188 34 200 44 C212 34 212 20 200 6 Z"
          fill={color}
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="gununganBgGrad" x1="200" y1="0" x2="200" y2="560" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2c1607" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#190d04" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#080402" stopOpacity="0.98" />
          </linearGradient>
          <linearGradient id="gapuraDoorGrad" x1="200" y1="412" x2="200" y2="530" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#45240c" />
            <stop offset="100%" stopColor="#0b0603" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/**
 * Traditional Javanese Megamendung Cloud Silhouette Vector
 */
export function MegamendungCloud({
  className = 'w-48 h-20',
  color = '#d9a441',
  opacity = 0.6,
}: {
  className?: string;
  color?: string;
  opacity?: number;
}) {
  return (
    <svg
      viewBox="0 0 320 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none ${className}`}
      style={{ opacity }}
    >
      {/* Layered Cloud Swirls */}
      <path
        d="M20 95 C20 70 45 60 70 65 C85 40 120 30 150 45 C175 20 220 15 255 40 C285 45 305 70 295 95 C305 115 285 135 255 130 L60 130 C30 135 15 115 20 95 Z"
        fill="url(#cloudGrad)"
        stroke={color}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Inner Cloud Swirl Ridges */}
      <path
        d="M60 95 C75 80 110 80 130 95 C150 75 195 75 220 95 C240 85 270 95 275 115"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M95 115 C115 105 145 105 165 115 C185 105 215 105 235 115"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <defs>
        <linearGradient id="cloudGrad" x1="160" y1="20" x2="160" y2="135" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2e190a" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#0d0703" stopOpacity="0.9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Traditional Javanese Corner Floral Filigree Ornament
 */
export function WayangCornerOrnament({
  className = 'w-12 h-12',
  color = '#dedf42',
  flip = false,
}: {
  className?: string;
  color?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none ${className} ${flip ? 'scale-x-[-1]' : ''}`}
    >
      <path
        d="M5 5 L65 5 C80 5 95 20 95 35 C95 50 80 65 65 65 C50 65 50 45 60 35 C70 25 80 35 75 45"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M5 5 L5 65 C5 80 20 95 35 95 C50 95 65 80 65 65 C65 50 45 50 35 60 C25 70 35 80 45 75"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="20" cy="20" r="4.5" fill={color} />
      <path d="M5 5 L40 40" stroke={color} strokeWidth="2.5" strokeDasharray="4 3" />
    </svg>
  );
}

/**
 * Traditional Javanese Ornamental Flourish Divider for Chapters / Acts
 */
export function WayangFlourishDivider({
  className = 'w-full max-w-xs h-8',
  color = '#dedf42',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-3 select-none pointer-events-none ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#dedf42]/40 to-[#dedf42]/80" />
      <svg viewBox="0 0 80 30" fill="none" className="w-12 h-6 text-[#dedf42]">
        <path
          d="M40 2 L46 12 C52 14 58 18 54 24 C50 28 44 26 44 22 C44 18 48 16 49 18"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M40 2 L34 12 C28 14 22 18 26 24 C30 28 36 26 36 22 C36 18 32 16 31 18"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="40" cy="14" r="2.5" fill={color} />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#dedf42]/40 to-[#dedf42]/80" />
    </div>
  );
}
