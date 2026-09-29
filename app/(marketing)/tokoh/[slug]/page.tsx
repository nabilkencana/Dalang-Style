import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  TOKOH_CHARACTERS,
  getAllTokohSlugs,
  getTokohBySlug,
} from '@/lib/tokoh-data';

interface TokohPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllTokohSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: TokohPageProps): Promise<Metadata> {
  const { slug } = await params;
  const character = getTokohBySlug(slug);

  if (!character) {
    return {
      title: 'Tokoh Tidak Ditemukan | Wayang Jawi',
    };
  }

  return {
    title: `${character.name} — ${character.role} | Wayang Jawi`,
    description: `${character.subtitle}. ${character.philosophy.slice(0, 150)}...`,
  };
}

export default async function TokohDetailPage({ params }: TokohPageProps) {
  const { slug } = await params;
  const character = getTokohBySlug(slug);

  if (!character) {
    notFound();
  }

  // Get other characters for the exploration carousel/grid
  const otherCharacters = Object.values(TOKOH_CHARACTERS).filter(
    (c) => c.slug !== slug
  );

  return (
    <div className="relative min-h-screen bg-[#050303] text-[#f4e7cd] overflow-x-clip selection:bg-[#dedf42] selection:text-black">
      {/* 1. Ambient Theatrical Stage Background Vignettes */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(222,223,66,0.08)_0%,_rgba(11,6,4,0.7)_50%,_#050303_100%)] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-repeat opacity-[0.03] pointer-events-none z-0 bg-[radial-gradient(#dedf42_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* 2. Top Header Navigation Bar */}
      <header className="relative z-30 w-full border-b border-[#dedf42]/15 bg-black/60 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Back to Home Link */}
          <Link
            href="/#cara-bermain"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-bold tracking-wider text-[#dedf42] uppercase hover:brightness-125 transition-all group focus:outline-none focus:underline"
          >
            <span className="text-base sm:text-lg group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            <span>Kembali ke Beranda</span>
          </Link>

          {/* Central Brand */}
          <Link href="/" className="group focus:outline-none text-center">
            <span className="font-serif font-bold text-xl sm:text-2xl text-[#dedf42] tracking-tight group-hover:brightness-125 transition-all block leading-tight">
              Wayang Jawi
            </span>
            <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-[#dedf42]/60 uppercase block">
              Galeri Tokoh
            </span>
          </Link>

          {/* Header Right Balancing Spacer */}
          <div className="w-10 sm:w-28 hidden sm:block pointer-events-none" />
        </div>
      </header>

      {/* 3. Main Character Profile Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Visual Showcase Card (Sticky on Scroll) */}
          <div className="lg:col-span-6 flex flex-col items-center lg:sticky lg:top-24 self-start h-fit z-20">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border-2 border-[#dedf42]/40 bg-[#120d08] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(222,223,66,0.12)] group">
              <Image
                src={character.image}
                alt={character.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />

              {/* Card Sheen & Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/10 pointer-events-none" />

              {/* Floating Badge on Card */}
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#dedf42] font-sans font-bold text-xs tracking-widest uppercase border border-[#dedf42]/30 shadow-md">
                  {character.badge}
                </span>
              </div>
            </div>

            {/* Quick Character Traits Pills */}
            <div className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-5">
              {character.traits.map((trait) => (
                <span
                  key={trait}
                  className="px-3.5 py-1 rounded-full border border-[#dedf42]/25 bg-white/[0.03] text-[#f4e7cd]/90 text-[11px] sm:text-xs font-sans font-medium tracking-wide shadow-sm"
                >
                  ✦ {trait}
                </span>
              ))}
            </div>

            {/* Cultural Proverb Quote Card */}
            <div className="w-full mt-6 p-5 sm:p-6 rounded-xl border border-[#dedf42]/20 bg-gradient-to-b from-[#18110b]/90 to-[#0d0806]/90 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute -right-4 -bottom-6 font-serif text-8xl text-[#dedf42]/5 select-none pointer-events-none">
                “
              </div>
              <p className="text-[10px] sm:text-xs font-sans font-bold tracking-[0.2em] text-[#dedf42] uppercase mb-2">
                Filosofi & Nasihat Luhur
              </p>
              <blockquote className="font-playfair italic text-sm sm:text-base text-[#f4e7cd] leading-relaxed relative z-10">
                {character.quote}
              </blockquote>
            </div>
          </div>

          {/* Right Column: In-Depth Narrative & Cultural Context */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Aksara Jawa Watermark & Role */}
            <div className="flex flex-col mb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-0.5 rounded-full border border-[#dedf42]/40 bg-[#dedf42]/10 text-[#dedf42] text-[10px] sm:text-xs font-sans font-bold tracking-widest uppercase">
                  {character.role}
                </span>
              </div>

              {/* Aksara Script */}
              <p
                className="text-[#dedf42]/70 text-base sm:text-xl font-serif tracking-[0.25em] mt-3"
                aria-label={character.name}
              >
                {character.aksara}
              </p>

              {/* Character Name */}
              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-normal text-[#dedf42] tracking-tight leading-[1.05] mt-1">
                {character.name}
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm font-sans font-semibold tracking-wide text-[#f4e7cd]/70 uppercase mt-2">
                {character.subtitle}
              </p>
            </div>

            {/* Asal-Usul & Mitologi */}
            <div className="space-y-4 text-xs sm:text-sm text-[#f4e7cd]/85 leading-relaxed font-sans border-t border-[#dedf42]/15 pt-5">
              <h2 className="font-serif text-lg sm:text-xl font-semibold text-[#dedf42] tracking-wide">
                Asal-Usul & Kisah Pewayangan
              </h2>
              <p className="text-justify leading-relaxed">{character.origin}</p>
            </div>

            {/* Makna Filosofis */}
            <div className="space-y-3 text-xs sm:text-sm text-[#f4e7cd]/85 leading-relaxed font-sans border-t border-[#dedf42]/15 pt-5 mt-5">
              <h2 className="font-serif text-lg sm:text-xl font-semibold text-[#dedf42] tracking-wide">
                Simbolisme & Makna Hidup
              </h2>
              <p className="text-justify leading-relaxed">
                {character.philosophy}
              </p>
            </div>

            {/* Ajaran Moral Cards */}
            <div className="border-t border-[#dedf42]/15 pt-5 mt-5">
              <h2 className="font-serif text-lg sm:text-xl font-semibold text-[#dedf42] tracking-wide mb-3">
                Ajaran Luhur
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {character.morals.map((moral, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg border border-[#dedf42]/15 bg-black/40"
                  >
                    <h3 className="font-sans font-bold text-xs text-[#dedf42] uppercase tracking-wider mb-1">
                      {moral.title}
                    </h3>
                    <p className="text-[11px] text-[#f4e7cd]/75 leading-relaxed font-sans">
                      {moral.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Senjata & Kesaktian */}
            <div className="border-t border-[#dedf42]/15 pt-5 mt-5">
              <h2 className="font-serif text-lg sm:text-xl font-semibold text-[#dedf42] tracking-wide mb-3">
                Pusaka & Ajian Sakti
              </h2>
              <div className="space-y-2.5">
                {character.weapons.map((w, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-lg border border-[#dedf42]/10 bg-white/[0.02]"
                  >
                    <span className="text-[#dedf42] text-sm mt-0.5">⚔</span>
                    <div className="flex-1">
                      <p className="font-sans font-bold text-xs text-[#dedf42] tracking-wider uppercase">
                        {w.name}
                      </p>
                      <p className="text-[11px] text-[#f4e7cd]/70 leading-relaxed font-sans mt-0.5">
                        {w.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Explore Other Characters Section */}
        <section className="mt-16 sm:mt-24 pt-10 sm:pt-14 border-t border-[#dedf42]/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[10px] sm:text-xs font-sans font-bold tracking-[0.25em] text-[#dedf42] uppercase mb-1">
                Koleksi Karakter
              </p>
              <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-[#f4e7cd] font-normal tracking-tight">
                Jelajahi Tokoh Lainnya
              </h2>
            </div>

            <Link
              href="/#cara-bermain"
              className="text-xs font-sans font-bold text-[#dedf42] uppercase tracking-wider hover:underline"
            >
              Lihat di Roda 3D →
            </Link>
          </div>

          {/* Other Characters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {otherCharacters.map((other) => (
              <Link
                key={other.slug}
                href={`/tokoh/${other.slug}`}
                className="group flex flex-col rounded-xl overflow-hidden border border-[#dedf42]/20 bg-[#120d08] hover:border-[#dedf42] hover:shadow-[0_12px_30px_rgba(222,223,66,0.15)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#dedf42]"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/60">
                  <Image
                    src={other.image}
                    alt={other.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-2 left-2 text-[9px] font-sans font-bold text-[#dedf42] uppercase tracking-wider bg-black/80 px-2 py-0.5 rounded-full border border-white/10">
                    {other.badge}
                  </span>
                </div>

                <div className="p-3 sm:p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-playfair font-normal text-sm sm:text-base text-[#f4e7cd] group-hover:text-[#dedf42] transition-colors leading-snug">
                      {other.name}
                    </h3>
                    <p className="text-[10px] font-sans text-[#f4e7cd]/60 uppercase tracking-wider mt-0.5 line-clamp-1">
                      {other.role}
                    </p>
                  </div>

                  <span className="text-[10px] font-sans font-bold text-[#dedf42] tracking-wider uppercase mt-3 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Telusuri</span>
                    <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
