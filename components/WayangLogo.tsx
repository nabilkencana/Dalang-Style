"use client";

import React from "react";

export interface WayangLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

/**
 * WayangLogo — Official custom vector emblem for Wayang Jawi.
 * Featuring the sacred Gunungan (Kayon / Tree of Life) silhouette
 * with inlaid Kori Agung portal and Kalpataru branches in gold (#dedf42).
 */
export default function WayangLogo({
  className = "",
  size = 28,
  showText = false,
}: WayangLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* ── Sacred Gunungan / Kayon Vector Emblem ── */}
      <div
        className="relative shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 duration-300 drop-shadow-[0_2px_8px_rgba(222,223,66,0.35)]"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Subtle Outer Golden Ring Glow */}
          <circle
            cx="16"
            cy="16"
            r="15"
            stroke="#dedf42"
            strokeWidth="0.8"
            strokeOpacity="0.3"
            strokeDasharray="1.5 2"
          />

          {/* Gunungan Sacred Mountain & Tree of Life Silhouette */}
          <path
            d="M16 2.2 C17.2 5 19 8 22 11.5 C25 15 27 18.5 25.5 22.5 C24 26 21 27.5 16 27.5 C11 27.5 8 26 6.5 22.5 C5 18.5 7 15 10 11.5 C13 8 14.8 5 16 2.2 Z"
            fill="#dedf42"
          />

          {/* Base Pedestal (Lapik Padma) */}
          <path
            d="M10.5 29 H21.5 C20.5 28 19.5 27.5 16 27.5 C12.5 27.5 11.5 28 10.5 29 Z"
            fill="#dedf42"
          />

          {/* Kori Agung / Gapura Portal at base (Dark negative space) */}
          <path
            d="M14 27.5 V22 C14 20.8 14.8 20 16 20 C17.2 20 18 20.8 18 22 V27.5 H14 Z"
            fill="#130d08"
          />

          {/* Central Tree of Life Axis Trunk */}
          <line
            x1="16"
            y1="20"
            x2="16"
            y2="7.5"
            stroke="#130d08"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Lower Wings / Symmetrical Branches */}
          <path
            d="M11.5 18.5 C13.5 16.5 15 15.5 16 15.5 C17 15.5 18.5 16.5 20.5 18.5"
            stroke="#130d08"
            strokeWidth="1.1"
            strokeLinecap="round"
            fill="none"
          />

          {/* Middle Leaves / Branches */}
          <path
            d="M12.5 13.5 C14 12 15 11.5 16 11.5 C17 11.5 18 12 19.5 13.5"
            stroke="#130d08"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />

          {/* Upper Crown Branch */}
          <path
            d="M13.8 9.5 C14.8 8.5 15.5 8 16 8 C16.5 8 17.2 8.5 18.2 9.5"
            stroke="#130d08"
            strokeWidth="0.9"
            strokeLinecap="round"
            fill="none"
          />

          {/* Pinnacle Jewel (Pucuk Cunduk) */}
          <circle cx="16" cy="5" r="0.75" fill="#130d08" />
        </svg>
      </div>

      {showText && (
        <span className="text-xl sm:text-[22px] font-serif italic font-bold text-[#dedf42] tracking-tight group-hover:brightness-125 transition-all whitespace-nowrap">
          Wayang Jawi
        </span>
      )}
    </div>
  );
}
