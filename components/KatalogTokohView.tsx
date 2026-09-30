'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TOKOH_CHARACTERS } from '@/lib/tokoh-data';

const CATEGORIES = [
  { id: 'ALL', label: 'Semua Tokoh', count: 9 },
  { id: 'PUNAKAWAN', label: 'Punakawan', count: 4 },
  { id: 'PANDAWA', label: 'Satria Pandawa', count: 3 },
  { id: 'KERAJAAN', label: 'Kerajaan & Begawan', count: 2 },
];

const POPULAR_TAGS = ['Semar', 'Arjuna', 'Gatotkaca', 'Bima', 'Petruk', 'Rahwana'];

export default function KatalogTokohView() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchInput, setSearchInput] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  const allCharacters = useMemo(() => Object.values(TOKOH_CHARACTERS), []);

  // Filter characters by both category and query
  const filteredCharacters = useMemo(() => {
    return allCharacters.filter((char) => {
      // 1. Category Filter
      let matchesCategory = true;
      if (selectedCategory === 'PUNAKAWAN') {
        matchesCategory = char.badge === 'PUNAKAWAN';
      } else if (selectedCategory === 'PANDAWA') {
        matchesCategory = char.badge === 'PANDAWA';
      } else if (selectedCategory === 'KERAJAAN') {
        matchesCategory = char.badge === 'ALENGKA' || char.badge === 'HASTINA';
      }

      // 2. Query Filter (checks name, role, subtitle, and character traits)
      const q = (submittedQuery || searchInput).toLowerCase().trim();
      const matchesQuery =
        !q ||
        char.name.toLowerCase().includes(q) ||
        char.role.toLowerCase().includes(q) ||
        char.subtitle.toLowerCase().includes(q) ||
        char.traits.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [allCharacters, selectedCategory, submittedQuery, searchInput]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(searchInput.trim());
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSubmittedQuery('');
  };

  const handleTagClick = (tag: string) => {
    setSearchInput(tag);
    setSubmittedQuery(tag);
    setSelectedCategory('ALL');
  };

  const handleResetAll = () => {
    setSelectedCategory('ALL');
    setSearchInput('');
    setSubmittedQuery('');
  };

  const isFiltered = selectedCategory !== 'ALL' || !!submittedQuery || !!searchInput;

  return (
    <div className="relative min-h-screen bg-[#050303] text-[#f4e7cd] overflow-x-clip selection:bg-[#dedf42] selection:text-black">
      {/* 1. Ambient Theatrical Stage Background Vignettes */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(222,223,66,0.08)_0%,_rgba(11,6,4,0.7)_50%,_#050303_100%)] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-repeat opacity-[0.03] pointer-events-none z-0 bg-[radial-gradient(#dedf42_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* 2. Top Header Navigation Bar */}
      <header className="relative z-30 w-full border-b border-[#dedf42]/15 bg-black/70 backdrop-blur-md sticky top-0">
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
              Katalog Pewayangan
            </span>
          </Link>

          {/* Header Right Balancing Spacer */}
          <div className="w-10 sm:w-28 hidden sm:block pointer-events-none" />
        </div>
      </header>

      {/* 3. Hero Header Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 md:pt-18 pb-6 sm:pb-8 text-center flex flex-col items-center">
        {/* Aksara Jawa Watermark */}
        <p className="text-[#dedf42]/60 text-lg sm:text-2xl font-serif tracking-[0.3em] mb-3 select-none">
          ꦏꦠꦭꦺꦴꦒ꧀ ꦠꦺꦴꦏꦺꦴꦃ ꦮꦪꦁ
        </p>

        {/* Main Headline */}
        <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#dedf42] tracking-tight leading-[1.05] max-w-4xl">
          Katalog Tokoh Pewayangan
        </h1>

        {/* Subtitle Description */}
        <p className="text-xs sm:text-sm md:text-base font-sans text-[#f4e7cd]/80 max-w-2xl mt-4 leading-relaxed">
          Telusuri watak filosofis, kisah heroisme, dan pusaka sakti para ksatria,
          punakawan, serta raja-raja dalam warisan agung wiracarita pewayangan Jawa.
        </p>

        {/* 4. Interactive Search Bar & Category Filter Tabs */}
        <div className="w-full max-w-3xl mt-8 sm:mt-10 flex flex-col gap-4 items-center">
          {/* Functional Search Box with Clickable Button & Form Submit */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full flex items-center"
          >
            <span className="absolute left-4.5 top-1/2 -translate-y-1/2 text-[#dedf42]/70 text-sm sm:text-base pointer-events-none">
              🔍
            </span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Cari nama tokoh, peran, atau watak (e.g. Arjuna, Semar, Bijaksana)..."
              className="w-full px-5 py-3.5 pl-12 pr-28 sm:pr-32 rounded-full border border-[#dedf42]/30 bg-black/60 text-[#f4e7cd] placeholder-[#f4e7cd]/40 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#dedf42] focus:ring-2 focus:ring-[#dedf42]/20 transition-all backdrop-blur-md shadow-inner"
            />

            {/* Clear Input Button */}
            {searchInput && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Hapus kata kunci pencarian"
                className="absolute right-24 sm:right-28 top-1/2 -translate-y-1/2 text-xs text-[#dedf42]/60 hover:text-[#dedf42] p-1.5 cursor-pointer font-bold"
              >
                ✕
              </button>
            )}

            {/* Functional Search Submit Button */}
            <button
              type="submit"
              aria-label="Cari Tokoh"
              className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 px-4 sm:px-5 py-2 rounded-full bg-[#dedf42] text-black font-sans font-bold text-xs uppercase tracking-wider hover:bg-white active:scale-95 transition-all shadow-md cursor-pointer"
            >
              Cari
            </button>
          </form>

          {/* Quick Search Tag Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] text-[#f4e7cd]/70">
            <span className="font-sans font-medium text-xs text-[#dedf42]/80 mr-1">
              Populer:
            </span>
            {POPULAR_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className="px-2.5 py-0.5 rounded-full border border-[#dedf42]/25 bg-black/40 hover:border-[#dedf42] hover:text-[#dedf42] text-[11px] font-sans transition-all cursor-pointer"
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Functional Category Filter Pills with Item Counts */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 w-full pt-1">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border text-[11px] sm:text-xs font-sans font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'border-[#dedf42] bg-[#dedf42] text-black shadow-[0_0_20px_rgba(222,223,66,0.3)] scale-105'
                      : 'border-[#dedf42]/30 text-[#f4e7cd]/75 hover:border-[#dedf42] hover:text-[#dedf42] bg-black/40'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-black/20 text-black font-bold' : 'bg-[#dedf42]/15 text-[#dedf42]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Main Catalog Grid Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Results Counter Bar & Active Filter Reset */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#dedf42]/15 mb-8 gap-3">
          <p className="text-xs sm:text-sm font-sans font-medium text-[#f4e7cd]/70">
            Menampilkan{' '}
            <span className="font-bold text-[#dedf42]">
              {filteredCharacters.length}
            </span>{' '}
            tokoh pewayangan
            {selectedCategory !== 'ALL' && (
              <span className="text-[#f4e7cd]/60">
                {' '}
                pada kategori{' '}
                <span className="text-[#dedf42] font-semibold">
                  {CATEGORIES.find((c) => c.id === selectedCategory)?.label}
                </span>
              </span>
            )}
          </p>

          {isFiltered && (
            <button
              type="button"
              onClick={handleResetAll}
              className="text-xs font-sans font-bold text-[#dedf42] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>✕ Reset Semua Filter</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredCharacters.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center">
            <span className="text-5xl mb-4">🎭</span>
            <h3 className="font-playfair text-2xl text-[#dedf42] font-normal mb-2">
              Tokoh Tidak Ditemukan
            </h3>
            <p className="text-xs sm:text-sm text-[#f4e7cd]/70 max-w-md">
              Tidak ada tokoh wayang yang cocok dengan pencarian Anda.
              Coba gunakan kata kunci lain seperti Semar, Arjuna, atau Bima.
            </p>
            <button
              type="button"
              onClick={handleResetAll}
              className="mt-6 px-6 py-2.5 rounded-full border border-[#dedf42] bg-[#dedf42] text-black text-xs font-sans font-bold uppercase tracking-wider hover:bg-white transition-all cursor-pointer shadow-md"
            >
              Tampilkan Semua Tokoh
            </button>
          </div>
        ) : (
          /* Cards Grid: Authentic Dark Theatrical Wayang Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCharacters.map((char) => (
              <Link
                key={char.slug}
                href={`/tokoh/${char.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden border border-[#dedf42]/25 bg-[#120d08] hover:border-[#dedf42] hover:shadow-[0_20px_45px_-10px_rgba(222,223,66,0.18)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#dedf42]"
              >
                {/* 16:9 Wayang Artwork Card */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                  <Image
                    src={char.image}
                    alt={char.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Lighting Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-white/10 pointer-events-none" />

                  {/* Badge Pill */}
                  <div className="absolute top-3.5 left-3.5 z-20">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#dedf42] font-sans font-bold text-[10px] tracking-widest uppercase border border-[#dedf42]/30 shadow-md">
                      {char.badge}
                    </span>
                  </div>

                  {/* Aksara Jawa Bottom Watermark */}
                  <span className="absolute bottom-2.5 right-3 text-[#dedf42]/80 font-serif text-xs tracking-widest bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm pointer-events-none">
                    {char.aksara}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                  <div>
                    {/* Role Title */}
                    <p className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#dedf42] uppercase mb-1">
                      {char.role}
                    </p>

                    {/* Character Name */}
                    <h2 className="font-playfair font-normal text-2xl sm:text-3xl text-[#f4e7cd] group-hover:text-[#dedf42] transition-colors leading-tight">
                      {char.name}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-xs font-sans text-[#f4e7cd]/65 uppercase tracking-wide mt-1 line-clamp-1">
                      {char.subtitle}
                    </p>

                    {/* Traits Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-3.5">
                      {char.traits.map((trait) => (
                        <span
                          key={trait}
                          className="px-2.5 py-0.5 rounded-full border border-[#dedf42]/20 bg-white/[0.02] text-[#f4e7cd]/80 text-[10px] font-sans"
                        >
                          ✦ {trait}
                        </span>
                      ))}
                    </div>

                    {/* Brief Origin Excerpt */}
                    <p className="text-xs font-sans text-[#f4e7cd]/75 leading-relaxed mt-4 line-clamp-3">
                      {char.origin}
                    </p>
                  </div>

                  {/* Action Link Footer */}
                  <div className="pt-5 mt-5 border-t border-[#dedf42]/15 flex items-center justify-between">
                    <span className="text-xs font-sans font-bold text-[#dedf42] tracking-wider uppercase group-hover:underline flex items-center gap-1.5">
                      <span>Buka Kisah Lengkap</span>
                      <span className="group-hover:translate-x-1.5 transition-transform duration-200">
                        →
                      </span>
                    </span>
                    <span className="text-[11px] text-[#f4e7cd]/40 font-mono">
                      0{allCharacters.findIndex((c) => c.slug === char.slug) + 1}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
