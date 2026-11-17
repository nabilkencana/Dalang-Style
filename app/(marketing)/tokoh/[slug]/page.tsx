import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import {
  TOKOH_CHARACTERS,
  getAllTokohSlugs,
  getTokohBySlug,
} from '@/lib/tokoh-data';
import { getStoryBySlug } from '@/lib/wayang-stories';
import { InteractiveTiltCard } from '@/components/ui/3d-card';
import TokohDetailTabs from '@/components/views/TokohDetailTabs';

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

function parseCharacterQuote(raw: string) {
  const cleaned = raw.replace(/^["“]|["”]$/g, '').trim();
  const dashIndex = cleaned.indexOf(' — ');
  if (dashIndex === -1) {
    return { javanese: null, meaning: cleaned };
  }
  return {
    javanese: cleaned.slice(0, dashIndex).trim(),
    meaning: cleaned.slice(dashIndex + 3).trim(),
  };
}

export default async function TokohDetailPage({ params }: TokohPageProps) {
  const { slug } = await params;
  const character = getTokohBySlug(slug);

  if (!character) {
    notFound();
  }

  const allCharacters = Object.values(TOKOH_CHARACTERS);
  const currentIdx = allCharacters.findIndex((c) => c.slug === character.slug);
  const nextCharacter =
    allCharacters[(currentIdx + 1) % allCharacters.length];

  // Rotate from current character so each profile suggests 4 fresh neighbors
  const suggestedCharacters = Array.from({ length: 4 }, (_, offset) => {
    return allCharacters[(currentIdx + 1 + offset) % allCharacters.length];
  }).filter((c) => c.slug !== character.slug);

  const relatedStory = getStoryBySlug(character.slug);
  const groupLabel = character.role.split('•')[0].trim();
  const { javanese: quoteJavanese, meaning: quoteMeaning } = parseCharacterQuote(character.quote);

  return (
    <div className="relative min-h-screen bg-[#050303] text-[#f4e7cd] selection:bg-[#dedf42] selection:text-black">
      {/* Subtle warm stage backdrop */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_rgba(222,223,66,0.06)_0%,_rgba(11,6,4,0.55)_50%,_#050303_100%)]" />

      <main className="relative z-10 w-full px-4 sm:px-6 md:px-5 lg:px-5 pt-24 sm:pt-28 pb-20 sm:pb-24">
        {/* 1. Quiet breadcrumb strip (clears global floating Navbar) */}
        <nav
          aria-label="Navigasi katalog tokoh"
          className="flex flex-wrap items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-[#dedf42]/15"
        >
          <Link
            href="/katalog"
            className="group inline-flex items-center gap-2 font-sans text-sm text-[#dedf42] hover:text-[#f4e7cd] transition-colors focus:outline-none focus-visible:underline"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>Kembali ke Katalog</span>
          </Link>

          <Link
            href={`/tokoh/${nextCharacter.slug}`}
            className="group inline-flex items-center gap-2 font-sans text-sm text-[#f4e7cd]/70 hover:text-[#dedf42] transition-colors focus:outline-none focus-visible:underline"
          >
            <span>Berikutnya: {nextCharacter.name}</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </nav>

        {/* 2. Opening Hero: Clear Focal Portrait + Identity */}
        <section className="pt-7 sm:pt-9 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-6 flex items-center">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-[#dedf42]/30 bg-[#120d08] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)]">
              <Image
                src={character.image}
                alt={character.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center items-start lg:pl-4">
            <span className="font-sans text-sm sm:text-base font-medium text-[#dedf42]/85">
              {groupLabel}
            </span>

            <p
              lang="jv"
              aria-label={`Aksara Jawa untuk ${character.name}`}
              className="mt-2.5 font-serif text-xl sm:text-2xl lg:text-[1.85rem] tracking-[0.2em] text-[#dedf42]/75"
            >
              {character.aksara}
            </p>

            <h1 className="mt-1.5 font-playfair font-normal text-5xl sm:text-6xl lg:text-[4.25rem] xl:text-[5rem] text-[#dedf42] tracking-tight leading-[1.0]">
              {character.name}
            </h1>

            <p className="mt-3.5 font-sans text-base sm:text-lg lg:text-xl text-[#f4e7cd]/85 leading-relaxed max-w-2xl">
              {character.subtitle}
            </p>

            {relatedStory && (
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  href={`/kreasi?slug=${encodeURIComponent(relatedStory.slug)}`}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#dedf42] px-6 py-3.5 font-sans text-sm sm:text-base font-semibold text-[#1c0f07] shadow-[0_12px_30px_-6px_rgba(222,223,66,0.3)] transition-colors hover:bg-[#f4e7cd] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dedf42]"
                >
                  <BookOpen className="size-4.5 shrink-0" />
                  <span>Baca {relatedStory.title.replace(/\s*\([^)]*\)/, '')}</span>
                  <ArrowRight className="size-4.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* 3. Standout Visual Anchor: Lit Kelir Quote Band */}
        <section aria-label="Pitutur utama tokoh" className="mt-10 sm:mt-14">
          <div className="relative w-full overflow-hidden rounded-lg shadow-[0_24px_55px_-12px_rgba(0,0,0,0.85)]">
            <div className="h-1.5 bg-[#5a1712] border-b border-[#dedf42]/35" />

            <div className="kelir-cloth relative px-6 sm:px-10 lg:px-12 py-8 sm:py-11">
              <blockquote className="relative w-full">
                {quoteJavanese ? (
                  <>
                    <p className="kelir-shadow font-playfair italic font-normal text-2xl sm:text-3xl md:text-[2.25rem] leading-[1.25] tracking-tight">
                      “{quoteJavanese}”
                    </p>
                    <p className="mt-3 font-sans text-sm sm:text-base text-[#2c180c] leading-relaxed max-w-2xl">
                      {quoteMeaning}
                    </p>
                  </>
                ) : (
                  <p className="kelir-shadow font-playfair italic font-normal text-xl sm:text-2xl md:text-3xl leading-[1.35] max-w-3xl">
                    “{quoteMeaning}”
                  </p>
                )}
              </blockquote>
            </div>

            <div className="h-2 bg-gradient-to-b from-[#5d5629] via-[#4a441f] to-[#2c2811] border-t border-black/45" />
          </div>
        </section>

        {/* 4. Guided Single-Chapter Dossier (tabs prevent text overload) */}
        <div className="mt-10 sm:mt-14">
          <TokohDetailTabs character={character} />
        </div>

        {/* 5. Explore Other Characters (unified 3D portrait cards from /katalog) */}
        <section className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t border-[#dedf42]/15">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-7 sm:mb-8">
            <h2 className="font-playfair font-normal text-2xl sm:text-3xl text-[#f4e7cd] tracking-tight">
              Kenali Tokoh Lainnya
            </h2>

            <Link
              href="/katalog"
              className="group inline-flex items-center gap-1.5 font-sans text-sm text-[#dedf42] hover:text-[#f4e7cd] transition-colors focus:outline-none focus-visible:underline"
            >
              <span>Lihat semua 9 tokoh</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {suggestedCharacters.map((other) => (
              <InteractiveTiltCard
                key={other.slug}
                title={other.name}
                imageUrl={other.image}
                href={`/tokoh/${other.slug}`}
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
