'use client';

import React from 'react';
import Image from 'next/image';

export function Gesture01Visual() {
  return (
    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border-2 border-black/30 shadow-lg group bg-black">
      <Image
        src="/images/gestures/gesture-01-poros.png"
        alt="Gestur 01: Pusat Poros Telapak Tangan"
        fill
        className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-[#dedf42] pointer-events-none">
        <span className="bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#dedf42]/40 font-bold uppercase tracking-wider shadow-sm">
          ✦ PUSAT POROS TELAPAK
        </span>
        <span className="text-white/80 bg-black/70 px-2 py-0.5 rounded text-[9px] font-sans">
          X / Y Tracking
        </span>
      </div>
    </div>
  );
}

export function Gesture02Visual() {
  return (
    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border-2 border-black/30 shadow-lg group bg-black">
      <Image
        src="/images/gestures/gesture-02-lengan.png"
        alt="Gestur 02: Kendali Lengan Wayang"
        fill
        className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-[#dedf42] pointer-events-none">
        <span className="bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#dedf42]/40 font-bold uppercase tracking-wider shadow-sm">
          ✦ KENDALI LENGAN
        </span>
        <span className="text-white/80 bg-black/70 px-2 py-0.5 rounded text-[9px] font-sans">
          Thumb & Index
        </span>
      </div>
    </div>
  );
}

export function Gesture03Visual() {
  return (
    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border-2 border-black/30 shadow-lg group bg-black">
      <Image
        src="/images/gestures/gesture-03-kiprahan.png"
        alt="Gestur 03: Tari Kiprahan Sakral"
        fill
        className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-[#dedf42] pointer-events-none">
        <span className="bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#dedf42]/40 font-bold uppercase tracking-wider shadow-sm">
          ✦ TARI KIPRAHAN
        </span>
        <span className="text-white/80 bg-black/70 px-2 py-0.5 rounded text-[9px] font-sans">
          Pinky Trigger
        </span>
      </div>
    </div>
  );
}

export function Gesture04Visual() {
  return (
    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border-2 border-black/30 shadow-lg group bg-black">
      <Image
        src="/images/gestures/gesture-04-kedalaman.png"
        alt="Gestur 04: Kedalaman Z-Axis (Tajam vs Baur)"
        fill
        className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-[#dedf42] pointer-events-none">
        <span className="bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#dedf42]/40 font-bold uppercase tracking-wider shadow-sm">
          ✦ Z-AXIS KEDALAMAN
        </span>
        <span className="text-white/80 bg-black/70 px-2 py-0.5 rounded text-[9px] font-sans">
          Tajam vs Baur
        </span>
      </div>
    </div>
  );
}
