'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { TOKOH_CHARACTERS } from '@/lib/tokoh-data';
import { InteractiveTiltCard } from '@/components/ui/3d-card';
import KatalogKelir from '@/components/views/KatalogKelir';
import KatalogGsapAnimations from '@/components/animations/KatalogGsapAnimations';

const CATEGORIES = [
  { id: 'ALL', label: 'Semua Tokoh', count: 9 },
  { id: 'PUNAKAWAN', label: 'Punakawan', count: 4 },
  { id: 'PANDAWA', label: 'Satria Pandawa', count: 3 },
  { id: 'KERAJAAN', label: 'Kerajaan & Begawan', count: 2 },
];

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

  const handleResetAll = () => {
    setSelectedCategory('ALL');
    setSearchInput('');
    setSubmittedQuery('');
  };

  const isFiltered = selectedCategory !== 'ALL' || !!submittedQuery || !!searchInput;

  return (
    <div className="relative min-h-screen bg-[#050303] text-[#f4e7cd] overflow-x-clip selection:bg-[#dedf42] selection:text-black">
      {/* GSAP ScrollTrigger Animations for Katalog */}
      <KatalogGsapAnimations filterKey={`${selectedCategory}-${submittedQuery}`} />

      {/* 1. Ambient Theatrical Stage Background Vignettes */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(222,223,66,0.08)_0%,_rgba(11,6,4,0.7)_50%,_#050303_100%)] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-repeat opacity-[0.03] pointer-events-none z-0 bg-[radial-gradient(#dedf42_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* 2. Top Header Navigation Bar */}
      <header data-gsap="katalog-header" className="relative z-30 w-full border-b border-[#dedf42]/15 bg-black/70 backdrop-blur-md sticky top-0">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 h-16 sm:h-20 flex items-center justify-between gap-4">
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

      {/* 3. Hero: the kelir, followed by quiet browse controls */}
      <section className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-10 pt-4 sm:pt-5 pb-2">
        <KatalogKelir />

        <div
          data-gsap="katalog-search"
          className="mt-6 sm:mt-8 flex flex-col-reverse gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div
            data-gsap="katalog-cats"
            role="group"
            aria-label="Golongan tokoh"
            className="flex flex-wrap gap-x-6 gap-y-3"
          >
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`border-b-2 pb-1.5 font-sans text-sm sm:text-[15px] transition-colors cursor-pointer rounded-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dedf42] ${
                    isActive
                      ? 'border-[#dedf42] text-[#dedf42]'
                      : 'border-transparent text-[#f4e7cd]/70 hover:text-[#f4e7cd]'
                  }`}
                >
                  {cat.label}
                  <span className={`ml-1.5 tabular-nums ${isActive ? 'text-[#dedf42]/70' : 'text-[#f4e7cd]/40'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          <form role="search" onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
            <label htmlFor="cari-tokoh" className="sr-only">
              Cari tokoh
            </label>
            <Search
              aria-hidden="true"
              className="absolute left-0 top-1/2 size-4 -translate-y-1/2 text-[#dedf42]/70 pointer-events-none"
            />
            <input
              id="cari-tokoh"
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Cari nama, watak, atau peran"
              className="w-full appearance-none border-b border-[#dedf42]/35 bg-transparent py-2 pl-7 pr-8 font-sans text-sm sm:text-[15px] text-[#f4e7cd] placeholder:text-[#f4e7cd]/40 transition-colors focus:border-[#dedf42] focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
            />
            {searchInput && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Hapus pencarian"
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-[#f4e7cd]/50 hover:text-[#dedf42] cursor-pointer focus:outline-none focus-visible:text-[#dedf42]"
              >
                <X className="size-4" />
              </button>
            )}
          </form>
        </div>
      </section>

      {/* 5. Main Catalog Grid Section - Full Width */}
      <main className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-10 pt-5 pb-12 sm:pt-6">
        <div data-gsap="katalog-counter" className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#dedf42]/15 mb-6 gap-3">
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
          /* Cards Grid: name-only 3D tilt cards */
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
            {filteredCharacters.map((char) => (
              <div key={char.slug} data-gsap="katalog-card">
                <InteractiveTiltCard
                  title={char.name}
                  imageUrl={char.image}
                  href={`/tokoh/${char.slug}`}
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
