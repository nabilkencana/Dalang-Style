'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  HERO_STORY,
  FULL_STORY_MAIN,
  FULL_STORY_CARDS,
  SPOTLIGHT_MAIN,
  SPOTLIGHT_SIDE_ITEMS,
  MOST_WATCHED_STORIES,
  MOST_READ_FEATURE,
  MOST_READ_GRID,
} from '@/lib/news-data';

const SUB_NAV_CATEGORIES = [
  'Utama',
  'Warisan UNESCO',
  'Seni Pentas',
  'Lakon Bima Suci',
  'Maestro Dalang',
  'Filosofi Gunungan',
  'Punakawan',
  'Sains & Budaya',
  'Opini',
];

export default function NewsEditorialView() {
  const [activeCategory, setActiveCategory] = useState('Utama');
  const [showFullSpotlight, setShowFullSpotlight] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050303] text-[#f4e7cd] overflow-x-clip selection:bg-[#dedf42] selection:text-black font-sans">
      {/* 1. Ambient Background Vignettes */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(222,223,66,0.06)_0%,_rgba(11,6,4,0.7)_50%,_#050303_100%)] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-repeat opacity-[0.025] pointer-events-none z-0 bg-[radial-gradient(#dedf42_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Minimal floating back bar */}
      <div className="sticky top-0 z-30 w-full bg-black/85 backdrop-blur-md border-b border-[#dedf42]/15 px-4 sm:px-8 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#f4e7cd]/70 hover:text-[#dedf42] transition-colors text-xs font-bold uppercase tracking-wider font-sans group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          <span>Beranda</span>
        </Link>
        <div className="flex items-center gap-1">
          {['W', 'A', 'Y', 'A', 'N', 'G'].map((letter, i) => (
            <span
              key={i}
              className="w-5 h-5 sm:w-6 sm:h-6 bg-[#b91c1c] text-white font-bold flex items-center justify-center rounded-xs text-[10px] sm:text-xs tracking-wider font-sans"
            >
              {letter}
            </span>
          ))}
          <span className="font-serif italic text-[#dedf42] text-xs ml-2 hidden sm:inline">Warta</span>
        </div>
        <Link
          href="/stage"
          className="px-3 py-1.5 rounded-sm bg-[#b91c1c] hover:bg-red-700 text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all shadow-sm"
        >
          Panggung Digital
        </Link>
      </div>

      {/* 3. Main Editorial Content Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
        {/* ========================================================================= */}
        {/* SECTION 1: HERO BREAKING STORY (Queen's Life Reference Layout) */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#dedf42]/20 pb-12">
          {/* Left: Big Feature Image (Clickable Link to Official Article) */}
          <a
            href={HERO_STORY.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="lg:col-span-7 relative aspect-[16/10] rounded-xl overflow-hidden border border-[#dedf42]/30 bg-black group shadow-xl block cursor-pointer"
          >
            <Image
              src={HERO_STORY.image}
              alt={HERO_STORY.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Byline Float Badge */}
            <div className="absolute bottom-4 left-4 p-3 rounded bg-black/85 backdrop-blur-md border border-white/10 text-xs text-[#f4e7cd]/80">
              <p className="font-bold text-white text-xs">{HERO_STORY.author}</p>
              <p className="text-[10px] text-[#dedf42]">{HERO_STORY.sourceName} • {HERO_STORY.date}</p>
            </div>
          </a>

          {/* Right: Breaking Story Headline & Excerpt */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#b91c1c] animate-pulse" />
              <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#dedf42] uppercase">
                {HERO_STORY.category}
              </span>
            </div>

            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-[1.1] tracking-tight">
              {HERO_STORY.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#f4e7cd]/85 leading-relaxed font-sans">
              {HERO_STORY.excerpt}
            </p>

            <div className="pt-2 flex items-center gap-4">
              <a
                href={HERO_STORY.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#dedf42] text-black font-sans font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md"
              >
                <span>Baca Selengkapnya</span>
                <span>↗</span>
              </a>
              <span className="text-xs text-[#f4e7cd]/50 font-mono">
                {HERO_STORY.readTime}
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: FULL STORY (Ukraine War Reference Layout with 3 Sub-Cards) */}
        {/* ========================================================================= */}
        <section className="space-y-6 border-b border-[#dedf42]/20 pb-12">
          {/* Section Header with Highlight Underline */}
          <div className="flex items-center justify-between">
            <div className="relative">
              <h2 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
                Full <span className="text-[#dedf42]">Story</span>
              </h2>
              <div className="h-0.5 w-16 bg-[#dedf42] mt-1" />
            </div>
            <Link
              href="/katalog"
              className="text-xs font-sans font-bold text-[#dedf42] hover:underline uppercase"
            >
              Lihat Semua →
            </Link>
          </div>

          {/* Full Story Main Card (Clickable to Official Article) */}
          <a
            href={FULL_STORY_MAIN.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#120d08] p-6 sm:p-8 rounded-xl border border-[#dedf42]/25 group hover:border-[#dedf42] transition-all cursor-pointer block"
          >
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-3 text-xs text-[#f4e7cd]/60">
                <span className="font-bold text-[#dedf42]">{FULL_STORY_MAIN.author}</span>
                <span>•</span>
                <span>{FULL_STORY_MAIN.date}</span>
                <span>•</span>
                <span className="text-[10px] text-[#dedf42] bg-[#dedf42]/10 px-2 py-0.5 rounded border border-[#dedf42]/20">
                  {FULL_STORY_MAIN.category}
                </span>
              </div>

              <h3 className="font-playfair text-2xl sm:text-3xl lg:text-4xl text-white group-hover:text-[#dedf42] transition-colors font-normal leading-tight">
                {FULL_STORY_MAIN.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#f4e7cd]/80 leading-relaxed font-sans">
                {FULL_STORY_MAIN.excerpt}
              </p>

              <div className="pt-2">
                <span className="text-xs font-sans font-bold text-[#dedf42] uppercase tracking-wider group-hover:underline inline-flex items-center gap-1.5">
                  <span>Buka Berita Resmi</span>
                  <span>↗</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[16/10] rounded-lg overflow-hidden border border-[#dedf42]/20 bg-black">
              <Image
                src={FULL_STORY_MAIN.image}
                alt={FULL_STORY_MAIN.title}
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </a>

          {/* 3-Column Sub-Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {FULL_STORY_CARDS.map((card) => (
              <a
                key={card.id}
                href={card.sourceUrl}
                target={card.sourceUrl?.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="group flex flex-col space-y-3 bg-[#0a0a0a] p-4 rounded-xl border border-[#dedf42]/15 hover:border-[#dedf42] transition-all"
              >
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-black">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 text-[9px] font-sans font-bold text-white bg-black/80 px-2 py-0.5 rounded border border-white/10 uppercase">
                    {card.category}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-[#f4e7cd]/60">
                  <span className="font-bold text-[#dedf42]">{card.author}</span>
                  <span>•</span>
                  <span>{card.date}</span>
                </div>

                <h4 className="font-playfair text-base sm:text-lg text-white group-hover:text-[#dedf42] transition-colors leading-snug line-clamp-2">
                  {card.title}
                </h4>

                <p className="text-xs text-[#f4e7cd]/70 line-clamp-2 font-sans leading-relaxed">
                  {card.excerpt}
                </p>

                <span className="text-[11px] font-sans font-bold text-[#dedf42] tracking-wider uppercase pt-1 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Telusuri</span>
                  <span>→</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: IN-DEPTH SPOTLIGHT (Biden Gun Laws Reference Layout) */}
        {/* ========================================================================= */}
        <section className="border-b border-[#dedf42]/20 pb-12 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Big Highlighted Feature */}
            <div className="lg:col-span-8 space-y-5">
              <div>
                <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#dedf42] uppercase block mb-1">
                  SOROTAN KHUSUS
                </span>
                <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
                  <span className="underline decoration-[#dedf42] decoration-4 underline-offset-4">
                    Kosmologi Gunungan:
                  </span>{' '}
                  Makna Pohon Hayat dan Falsafah Jagad Pewayangan.
                </h2>
              </div>

              {/* Large Spotlight Image with Link */}
              <a
                href={SPOTLIGHT_MAIN.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-[16/9] rounded-xl overflow-hidden border border-[#dedf42]/30 bg-black shadow-xl block group cursor-pointer"
              >
                <Image
                  src={SPOTLIGHT_MAIN.image}
                  alt={SPOTLIGHT_MAIN.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-4 left-4 p-3 rounded bg-black/85 backdrop-blur-md border border-white/10 text-xs text-[#f4e7cd]/80">
                  <p className="font-bold text-white">{SPOTLIGHT_MAIN.author}</p>
                  <p className="text-[10px] text-[#dedf42]">{SPOTLIGHT_MAIN.sourceName} • {SPOTLIGHT_MAIN.date}</p>
                </div>
              </a>
              {/* Spotlight Text Excerpt */}
              <div className="space-y-3 text-xs sm:text-sm text-[#f4e7cd]/85 font-sans leading-relaxed">
                <p>
                  <strong>SURAKARTA — </strong>
                  {SPOTLIGHT_MAIN.excerpt}
                </p>
                {showFullSpotlight && (
                  <p className="animate-fadeSlideUp">
                    Dalam setiap pergelaran wayang kulit purwa, gunungan tidak hanya berfungsi sebagai tanda pergantian pathet (waktu pementasan), melainkan juga melambangkan makrokosmos dan mikrokosmos. Gambar pohon beringin dengan sulur lebat, gapura bersenjata dua raksasa Cingkarabala dan Balaupata, serta lambang api di baliknya merupakan pengingat sakral bahwa setiap insan manusia pada akhirnya akan kembali menghadap Sang Hyang Murbeng Dumadi.
                  </p>
                )}
              </div>

              {/* Show More Button (Matching Reference) */}
              <button
                type="button"
                onClick={() => setShowFullSpotlight(!showFullSpotlight)}
                className="px-5 py-2 rounded-sm bg-[#120d08] hover:bg-black border border-[#dedf42]/40 text-[#dedf42] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
              >
                {showFullSpotlight ? 'Tutup Ulasan ▲' : 'Tampilkan Selengkapnya ▼'}
              </button>
            </div>

            {/* Right Column: 3 Side News Briefs with Thumbnails (Matching Reference) */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="font-sans font-bold text-xs tracking-widest text-[#dedf42] uppercase border-b border-[#dedf42]/20 pb-2">
                Warta Terkait
              </h3>

              <div className="space-y-4">
                {SPOTLIGHT_SIDE_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-3 rounded-lg border border-[#dedf42]/10 bg-[#0a0a0a] hover:border-[#dedf42]/40 transition-all cursor-pointer block"
                  >
                    <div className="relative w-24 h-20 rounded overflow-hidden shrink-0 bg-black">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="96px"
                        className="object-cover object-center group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="flex-1 space-y-1">
                      <span className="text-[9px] font-sans font-bold text-[#dedf42] uppercase block">
                        {item.category}
                      </span>
                      <h4 className="font-playfair text-xs sm:text-sm text-white group-hover:text-[#dedf42] transition-colors leading-snug line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-[#f4e7cd]/50">{item.date}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: MOST WATCHED / VIDEO PERFORMANCES (Matching Reference) */}
        {/* ========================================================================= */}
        <section className="space-y-6 border-b border-[#dedf42]/20 pb-12">
          {/* Section Header */}
          <div className="relative">
            <h2 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
              Most <span className="text-[#dedf42]">Watched</span>
            </h2>
            <div className="h-0.5 w-16 bg-[#dedf42] mt-1" />
          </div>

          {/* 3 Video Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOST_WATCHED_STORIES.map((item) => (
              <a
                key={item.id}
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col space-y-3 bg-[#0a0a0a] p-4 rounded-xl border border-[#dedf42]/15 hover:border-[#dedf42] transition-all cursor-pointer block"
              >
                {/* Thumbnail with Play Icon Badge */}
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-black">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#dedf42] text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <span className="text-sm ml-0.5">▶</span>
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 text-[10px] font-mono text-white bg-black/80 px-2 py-0.5 rounded">
                    {item.readTime}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-[#f4e7cd]/60">
                  <span className="font-bold text-[#dedf42]">{item.sourceName}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>

                <h4 className="font-playfair text-base text-white group-hover:text-[#dedf42] transition-colors leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs text-[#f4e7cd]/70 font-sans leading-relaxed line-clamp-2">
                  {item.excerpt}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: MOST SEE / READ (Matching Reference with Left Big + Right 4 Grid) */}
        {/* ========================================================================= */}
        <section className="space-y-6 border-b border-[#dedf42]/20 pb-12">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div className="relative">
              <h2 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
                Most <span className="text-[#dedf42]">See</span>
              </h2>
              <div className="h-0.5 w-16 bg-[#dedf42] mt-1" />
            </div>
            <Link
              href="/katalog"
              className="text-xs font-sans font-bold text-[#dedf42] hover:underline uppercase"
            >
              Lihat Katalog Karakter →
            </Link>
          </div>

          {/* Grid Layout: Left Big Feature + Right 4-Grid Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Big Feature Card */}
            <a
              href={MOST_READ_FEATURE.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lg:col-span-5 space-y-4 bg-[#120d08] p-6 rounded-xl border border-[#dedf42]/25 group hover:border-[#dedf42] transition-all cursor-pointer block"
            >
              <div className="relative aspect-[16/11] rounded-lg overflow-hidden border border-[#dedf42]/20 bg-black">
                <Image
                  src={MOST_READ_FEATURE.image}
                  alt={MOST_READ_FEATURE.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-[#f4e7cd]/60">
                <span className="font-bold text-[#dedf42]">{MOST_READ_FEATURE.author}</span>
                <span>•</span>
                <span>{MOST_READ_FEATURE.date}</span>
              </div>

              <h3 className="font-playfair text-2xl text-white group-hover:text-[#dedf42] transition-colors font-normal leading-tight">
                {MOST_READ_FEATURE.title}
              </h3>

              <p className="text-xs text-[#f4e7cd]/80 leading-relaxed font-sans">
                {MOST_READ_FEATURE.excerpt}
              </p>

              <span className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[#dedf42] uppercase tracking-wider group-hover:underline pt-1">
                <span>Buka Artikel Resmi</span>
                <span>↗</span>
              </span>
            </a>

            {/* Right 4-Grid Cards (2x2) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOST_READ_GRID.map((item) => (
                <a
                  key={item.id}
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col p-4 rounded-xl border border-[#dedf42]/15 bg-[#0a0a0a] hover:border-[#dedf42] transition-all space-y-2.5 cursor-pointer block"
                >
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-black">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <span className="text-[9px] font-sans font-bold text-[#dedf42] uppercase">
                    {item.category} • {item.readTime}
                  </span>

                  <h4 className="font-playfair text-sm text-white group-hover:text-[#dedf42] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h4>

                  <p className="text-[11px] text-[#f4e7cd]/65 line-clamp-2 font-sans">
                    {item.excerpt}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
        {/* ========================================================================= */}
        {/* SECTION 6: FIND US HERE & NEWSLETTER (Matching Reference Bottom Layout) */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-[#dedf42]/20 pb-12">
          {/* Left: Find us here */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-sans font-black text-xl text-white uppercase tracking-tight">
              Find <span className="text-[#dedf42]">us here</span>
            </h3>
            <div className="flex items-center gap-4 text-lg">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-[#dedf42] hover:text-black transition-all"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-[#dedf42] hover:text-black transition-all"
                aria-label="Instagram"
              >
                ig
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-[#dedf42] hover:text-black transition-all"
                aria-label="Twitter"
              >
                𝕏
              </a>
            </div>
          </div>

          {/* Middle: News Daily Newsletter Subscription */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-sans font-bold text-sm text-white uppercase tracking-wider">
              Nawala Warta Budaya
            </h4>
            <p className="text-xs text-[#f4e7cd]/70 leading-relaxed font-sans">
              Dapatkan liputan seni pewayangan terbaru langsung di surel Anda setiap minggu.
            </p>
            {subscribed ? (
              <p className="text-xs text-[#dedf42] font-bold">
                ✓ Terima kasih! Anda telah terdaftar.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Ketik surel Anda..."
                  className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#dedf42]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#dedf42] text-black font-bold text-xs uppercase hover:bg-white transition-all cursor-pointer"
                >
                  Kirim
                </button>
              </form>
            )}
          </div>

          {/* Right: Contact & Editorial Email */}
          <div className="md:col-span-4 space-y-2 text-xs text-[#f4e7cd]/70 md:text-right font-sans">
            <p>
              Hubungi redaksi di{' '}
              <a href="mailto:redaksi@wayangjawi.id" className="text-[#dedf42] font-bold hover:underline">
                redaksi@wayangjawi.id
              </a>
            </p>
            <p>Layanan Pembaca / SMS: +62 812-WAYANG-ID</p>
            <p className="text-[10px] text-[#f4e7cd]/50">
              Wayang Jawi • Dikelola demi pelestarian seni budaya adiluhung Nusantara.
            </p>
          </div>
        </section>
      </main>

    </div>
  );
}
