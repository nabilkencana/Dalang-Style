"use client";

import React from "react";
import Image from "next/image";

export interface WayangLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

/**
 * WayangLogo — Official Gunungan (Kayon / Tree of Life) Logo for Wayang Jawi.
 * Handcrafted vector-art logo featuring sacred filigree, Kalpataru branches,
 * and golden prada highlights (#dedf42).
 */
export default function WayangLogo({
  className = "",
  size = 28,
  showText = false,
}: WayangLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* ── Sacred Gunungan / Kayon Official Logo Emblem ── */}
      <div
        className="relative shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 duration-300 drop-shadow-[0_2px_8px_rgba(222,223,66,0.35)]"
        style={{ width: size, height: size }}
      >
        <Image
          src="/images/wayang-gunungan-logo.png"
          alt="Wayang Jawi Gunungan Logo"
          width={size * 2}
          height={size * 2}
          priority
          className="w-full h-full object-contain pointer-events-none"
        />
      </div>

      {showText && (
        <span className="font-serif italic font-bold text-xl sm:text-[22px] tracking-tight text-[#dedf42] group-hover:brightness-125 transition-all whitespace-nowrap">
          Wayang Jawi
        </span>
      )}
    </div>
  );
}
