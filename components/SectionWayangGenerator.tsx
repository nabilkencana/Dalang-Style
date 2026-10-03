'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, Compass, Sparkles, Feather, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRESET_WAYANG_CREATIONS, type WayangPreset } from '@/lib/wayang-ai';

gsap.registerPlugin(ScrollTrigger);

export interface SectionWayangGeneratorProps {
  id?: string;
}

const INSPIRATION_CHIPS = [
  { label: 'Ksatria Panah', prompt: 'Ksatria panah berhati hening budi luhur' },
  { label: 'Pamong Bijak', prompt: 'Pamong jenaka berwawasan kosmis' },
  { label: 'Satria Surya', prompt: 'Pendekar sakti otot kawat bermahkota surya emas' },
  { label: 'Putri Keraton', prompt: 'Putri keraton pembawa kedamaian batin' },
];

export default function SectionWayangGenerator({ id = 'kreasi' }: SectionWayangGeneratorProps) {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [userPrompt, setUserPrompt] = useState('');

  const activePreset: WayangPreset =
    PRESET_WAYANG_CREATIONS[activePresetIndex] || PRESET_WAYANG_CREATIONS[0];

  const handleApplyChip = (text: string) => {
    setUserPrompt(text);
  };

  const handleStartCreation = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPrompt = userPrompt.trim() || activePreset.title;
    router.push(`/kreasi?prompt=${encodeURIComponent(finalPrompt)}`);
  };

  // ── GSAP ScrollTrigger: Fan-In Overlay (Menindihi section sebelumnya dari bottom-left 30° -> 0°) ──
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!innerRef.current || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop & Tablet: Menindihi section sebelumnya dengan rotasi menyapu 30° -> 0° dari bottom-left
    mm.add('(min-width: 768px)', () => {
      gsap.set(innerRef.current, { rotation: 30, transformOrigin: 'bottom left' });

      const tween = gsap.to(innerRef.current, {
        rotation: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        },
      });

      return () => {
        if (tween.scrollTrigger) tween.scrollTrigger.kill();
      };
    });

    return () => mm.revert();
  }, []);
  return (
    <section
      ref={sectionRef}
      id={id}
      data-gsap="kreasi-section"
      className="relative min-h-screen w-full overflow-hidden select-none font-sans z-30"
    >
      {/* ── Inner Animated Flow Art Container (Menindihi section sebelumnya dengan rotasi 30° -> 0° dari bottom-left) ── */}
      <div
        ref={innerRef}
        className="flow-art-container relative w-full bg-[#dedf42] text-black shadow-[0_-35px_80px_rgba(0,0,0,0.7)] flex flex-col justify-between will-change-transform"
        style={{ transformOrigin: 'bottom left' }}
      >
        {/* ── 1. Top Cultural Connector (Jembatan dari Section 4 Tokoh Wayang) ── */}
        <div className="relative w-full border-t border-black/80 bg-[#dedf42] py-4 px-4 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between overflow-hidden">
          <div className="hidden sm:block h-[1px] flex-1 bg-black/30" />
          <div className="flex items-center gap-3 px-4 mx-auto sm:mx-0">
            <span className="text-[11px] font-mono tracking-[0.28em] text-black/75 uppercase font-semibold">
              ꦱꦁꦒꦂ ꦕꦶꦥ꧀ꦠ ꦮꦪꦁ • SANGGAR CIPTA & TATAH SUNGGING
            </span>
          </div>
          <div className="hidden sm:block h-[1px] flex-1 bg-black/30" />
        </div>

        {/* ── Background Subtle Heritage Texture ── */}
        <div className="absolute inset-0 bg-repeat opacity-[0.03] pointer-events-none z-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* ── 2. Main Atelier Canvas (Full Width) ── */}
        <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-8 sm:pt-12 pb-16 sm:pb-20">
          {/* Header Block — Editorial & Cultured */}
          <div className="max-w-4xl mb-10 sm:mb-14">
            <p className="font-mono text-xs font-bold tracking-[0.24em] text-black/75 uppercase mb-3">
              PINTU GERBANG KREASI KULTUR & AI
            </p>
            <h2 className="font-serif italic font-bold text-3xl sm:text-4xl lg:text-5xl text-[#050303] leading-[1.08] tracking-tight mb-4">
              Gubahan Karakter Anyar,{' '}
              <span className="not-italic font-normal block sm:inline">
                Terpahat dari Sukma & Imajinasi Anda.
              </span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-black/80 leading-relaxed max-w-2xl">
              Setiap tokoh wayang memuat ajaran budi pekerti luhur dan tatanan semesta. Di Sanggar Sang Empu, konsep atau watak sukma yang Anda bayangkan akan diramu menjadi nama berwibawa, filosofi mendalam, serta visual tatah sungging autentik.
            </p>
          </div>

          {/* ── Interactive Two-Column Atelier Desk ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* ── LEFT: Interactive Specimen Canvas (6 cols) ── */}
            <div className="lg:col-span-6 flex flex-col justify-between bg-[#0e0805] text-[#f5ecd9] rounded-3xl p-6 sm:p-8 border border-black/90 shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
              <div>
                {/* Specimen Header & Archetype Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dedf42]/20 pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#dedf42] uppercase block">
                      KARYA GUBAHAN SANG EMPU
                    </span>
                    <h3 className="font-serif italic text-lg sm:text-xl text-[#f5ecd9] font-bold">
                      Koleksi Tokoh Terpilih
                    </h3>
                  </div>

                  {/* Archetype Quick Selector */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    {PRESET_WAYANG_CREATIONS.map((preset, idx) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setActivePresetIndex(idx)}
                        className={`px-3.5 py-1 rounded-full text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${
                          activePresetIndex === idx
                            ? 'bg-[#dedf42] text-black font-bold shadow-md shadow-[#dedf42]/20 scale-105'
                            : 'bg-white/[0.08] text-[#f5ecd9]/80 hover:text-white hover:bg-white/15'
                        }`}
                      >
                        {preset.shortName}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Wayang Specimen Showcase Visual */}
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/60 border border-[#d9a441]/25 flex items-center justify-center mb-6 group">
                  <Image
                    key={activePreset.id}
                    src={activePreset.image}
                    alt={activePreset.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 550px"
                    priority
                  />
                </div>

                {/* Specimen Plaque */}
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-serif font-bold text-xl sm:text-2xl text-[#dedf42]">
                      {activePreset.title}
                    </h4>
                    <span className="text-xs font-mono text-[#f5ecd9]/60 uppercase">
                      Pakem {activePreset.archetype}
                    </span>
                  </div>

                  {/* Traits Badges */}
                  <div className="flex flex-wrap gap-2">
                    {activePreset.traits.map((trait, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#dedf42]/10 text-[#dedf42] border border-[#dedf42]/30"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>

                  {/* Poetic Philosophy Excerpt */}
                  {/* Poetic Philosophy Excerpt — Khas Sesuai Tokoh */}
                  <p className="font-sans text-xs sm:text-sm text-[#f5ecd9]/90 italic leading-relaxed pt-2 border-t border-white/10">
                    &ldquo;{activePreset.philosophy}&rdquo;
                  </p>
                </div>
              </div>

              {/* Bottom link to view full story */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[#f5ecd9]/50 font-sans">Ingin mengolah tokoh ini?</span>
                <button
                  type="button"
                  onClick={() => router.push(`/kreasi?prompt=${encodeURIComponent(activePreset.title)}`)}
                  className="inline-flex items-center gap-1.5 text-[#dedf42] font-semibold hover:underline cursor-pointer"
                >
                  Kembangkan Bersama Sang Empu <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ── RIGHT: Meja Gubahan & Konsultasi Interaktif (6 cols) ── */}
            <div className="lg:col-span-6 flex flex-col justify-between bg-[#0e0805] text-[#f5ecd9] rounded-3xl p-6 sm:p-8 border border-black/90 shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
              {/* TOP HALF: Header & Spacious Dummy Chat History */}
              <div className="flex-1 flex flex-col mb-4">
                {/* Header */}
                <div className="border-b border-[#dedf42]/20 pb-3 mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-[#dedf42] uppercase block mb-1">
                    MEJA GUBAHAN SANG EMPU
                  </span>
                  <h3 className="font-serif italic text-xl sm:text-2xl text-[#f5ecd9] font-bold">
                    Dialog Cipta Tokoh Bersama Sang Empu
                  </h3>
                  <p className="text-xs text-[#f5ecd9]/70 mt-1">
                    Lihat rekam dialog di bawah atau tuangkan gagasan karakter Anda untuk langsung diolah di Studio:
                  </p>
                </div>

                {/* ── Dummy Chat History Simulation (Expanded & Clearly Visible) ── */}
                <div className="flex-1 min-h-[220px] space-y-3 p-4 rounded-2xl bg-black/70 border border-white/10 font-sans text-xs shadow-inner flex flex-col justify-center">
                  {/* User message */}
                  <div className="flex gap-2.5 justify-end items-start">
                    <div className="bg-[#dedf42] text-black p-3 rounded-2xl rounded-tr-none max-w-[85%] font-medium shadow-sm">
                      <p className="text-xs leading-relaxed">
                        &ldquo;Sang Empu, buatkan ksatria panah berjiwa hening dengan mahkota surya emas dan watak pembela kebenaran.&rdquo;
                      </p>
                      <span className="text-[9px] font-mono text-black/60 block text-right mt-1">09:41 • Kisanak</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#dedf42] text-black flex items-center justify-center shrink-0 font-bold text-[10px]">
                      K
                    </div>
                  </div>

                  {/* Sang Empu response */}
                  <div className="flex gap-2.5 items-start">
                    <div className="w-6 h-6 rounded-full bg-black border border-[#dedf42]/40 text-[#dedf42] flex items-center justify-center shrink-0 font-serif font-bold text-[11px]">
                      E
                    </div>
                    <div className="bg-[#18110b] border border-[#dedf42]/20 p-3 rounded-2xl rounded-tl-none max-w-[88%] space-y-1.5 shadow-sm">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#dedf42]">
                        <span>Sang Empu Cipta Wayang</span>
                      </div>
                      <p className="text-xs leading-relaxed text-[#f5ecd9]/90">
                        &ldquo;Rahayu kisanak. Dari heninging cipta, terwujudlah <strong>Raden Dananjaya Emas</strong> — satria panah berhati telaga, pemegang Busur Gandiwa yang membimbing nurani menumpas angkara.&rdquo;
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#dedf42]/10 text-[#dedf42] border border-[#dedf42]/20">
                          Ksatria Pandawa
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#dedf42]/10 text-[#dedf42] border border-[#dedf42]/20">
                          Budi Luhur
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM HALF: Form Pushed All the Way Down to the Bottom */}
              <div className="mt-auto space-y-3 pt-2">
                {/* Inspiration Chips — Horizontal Single Row */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#dedf42]/80 uppercase tracking-wider block">
                    Pilih Gagasan Cepat:
                  </span>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {INSPIRATION_CHIPS.map((chip, cIdx) => (
                      <button
                        key={cIdx}
                        type="button"
                        onClick={() => handleApplyChip(chip.prompt)}
                        className="px-2.5 py-1 rounded-full bg-white/[0.06] hover:bg-[#dedf42] text-[#f5ecd9] hover:text-black border border-white/10 hover:border-[#dedf42] text-[11px] font-mono transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-sm active:scale-95"
                      >
                        + {chip.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Input Form — Bottom Anchored */}
                <form onSubmit={handleStartCreation} className="space-y-3">
                  <div className="space-y-1.5">
                    <label htmlFor="userPrompt" className="text-xs font-mono text-[#f5ecd9]/80 uppercase flex items-center gap-1.5">
                      <Feather className="w-3.5 h-3.5 text-[#dedf42]" />
                      Tuliskan Gagasan Tokoh Anda:
                    </label>
                    <textarea
                      id="userPrompt"
                      rows={2}
                      value={userPrompt}
                      onChange={(e) => setUserPrompt(e.target.value)}
                      placeholder="Ketik konsep tokohmu di sini (akan otomatis tersimpan & terbawa ke Studio)..."
                      className="w-full rounded-2xl bg-black/60 border border-[#dedf42]/30 px-3.5 py-2.5 text-xs text-[#f5ecd9] placeholder-[#f5ecd9]/35 focus:outline-none focus:border-[#dedf42] focus:ring-1 focus:ring-[#dedf42] transition-all resize-none font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#dedf42] hover:bg-[#eae853] active:scale-[0.99] text-black font-sans font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Mulai Gubahan di Studio Sang Empu</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Cultural Authenticity Pillars */}
                <div className="pt-4 mt-2 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <Compass className="w-4 h-4 text-[#dedf42]" />
                    <span className="text-[10px] font-mono text-[#f5ecd9]/75 uppercase">Pakem Pedalangan</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Sparkles className="w-4 h-4 text-[#dedf42]" />
                    <span className="text-[10px] font-mono text-[#f5ecd9]/75 uppercase">Filosofi Sastra</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-[#dedf42]" />
                    <span className="text-[10px] font-mono text-[#f5ecd9]/75 uppercase">Tatah Sungging</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. Bottom Theatrical Gradient Bridge (Penyambung Halus ke Section 5 Berita/Dancers) ── */}
        <div className="relative w-full h-16 sm:h-24 md:h-32 bg-gradient-to-b from-[#dedf42] via-[#1c1808] to-[#050303] pointer-events-none" />
      </div>
    </section>
  );
}
