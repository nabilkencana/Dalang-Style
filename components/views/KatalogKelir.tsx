'use client';

import { useEffect, useRef } from 'react';

/**
 * Hero styled as a wayang kelir: a cloth screen lit from above by the blencong.
 * The title is the cast shadow; moving the mouse moves the lamp, so the shadow slides the other way.
 */
export default function KatalogKelir() {
  const kelirRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const setLamp = (xPct: number) => {
    const el = kelirRef.current;
    if (!el) return;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      el.style.setProperty('--kelir-lx', `${xPct}%`);
      el.style.setProperty('--kelir-sx', `${(50 - xPct) / 50}`);
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const rawPct = ((e.clientX - rect.left) / rect.width) * 100;
    const xPct = Math.min(80, Math.max(20, rawPct));
    setLamp(xPct);
  };

  return (
    <div
      ref={kelirRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setLamp(50)}
      className="kelir relative w-full select-none"
    >
      {/* Top cloth border (plisir) */}
      <div className="h-2 sm:h-2.5 bg-[#5a1712] border-b border-[#dedf42]/35" />

      <div className="kelir-cloth relative overflow-hidden px-5 sm:px-10 pt-9 sm:pt-12 md:pt-14 pb-10 sm:pb-14 md:pb-16 text-center shadow-[inset_0_0_50px_rgba(36,19,10,0.45)]">
        {/* Lamp not yet lit; GSAP fades this out on load */}
        <div data-gsap="katalog-kelir-unlit" className="absolute inset-0 bg-[#050303] opacity-0 pointer-events-none" />
        {/* Oil-flame flicker */}
        <div className="kelir-flicker absolute inset-0 bg-[#2a1405] pointer-events-none" />

        <p
          data-gsap="katalog-aksara"
          lang="jv"
          className="kelir-shadow relative font-serif text-base sm:text-lg md:text-xl tracking-[0.2em] opacity-75"
        >
          ꦏꦠꦭꦺꦴꦒ꧀ ꦠꦺꦴꦏꦺꦴꦃ ꦮꦪꦁ
        </p>

        <h1
          data-gsap="katalog-title"
          className="kelir-shadow relative font-playfair font-normal text-[2.45rem] leading-[0.95] sm:text-6xl md:text-7xl tracking-tight mt-2.5 sm:mt-3"
        >
          Katalog Tokoh Pewayangan
        </h1>

        <p
          data-gsap="katalog-subtitle"
          className="relative mx-auto mt-4 sm:mt-5 max-w-lg font-sans text-sm sm:text-[15px] leading-relaxed text-[#2c180c]"
        >
          Sembilan tokoh dari panggung wayang kulit Jawa: punakawan, satria Pandawa, raja, dan
          begawan. Pilih satu untuk membaca asal-usul, watak, dan pusakanya.
        </p>
      </div>

      {/* Debog: banana-trunk base */}
      <div className="h-2.5 sm:h-3 bg-gradient-to-b from-[#5d5629] via-[#4a441f] to-[#2c2811] border-t border-black/45" />
    </div>
  );
}
