'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import type { Work } from '@/components/ui/formation-utils/formation-poses';
import Formation from '@/components/ui/formation';

// ── 16 Foto Real Tempat/Gedung Museum di Indonesia (Tanpa Duplikasi) ──────────
const MUSEUM_PLACES: Work[] = [
  {
    image: '/images/museum/places/museum-wayang-jakarta.jpg',
    title: 'Museum Wayang Jakarta',
    location: 'Kawasan Kota Tua, Jakarta Barat',
    year: 'Diresmikan 13 Agustus 1975',
    description:
      'Berdiri megah di atas lahan bekas gereja tua Belanda (De Oude Hollandsche Kerk) era Batavia tahun 1640. Museum ini menyimpan lebih dari 4.000 koleksi wayang dari seluruh penjuru Nusantara hingga mancanegara seperti Tiongkok, Kamboja, dan Suriname.',
    highlights: ['Wayang Kulit Purwa Klasik', 'Gedung Kolonial Batavia', 'Koleksi Wayang Si Unyil'],
  },
  {
    image: '/images/museum/places/museum-wayang-banyumas.jpg',
    title: 'Museum Wayang Sendang Mas',
    location: 'Kecamatan Banyumas, Kabupaten Banyumas, Jawa Tengah',
    year: 'Didirikan 21 Desember 1983',
    description:
      'Pusat pelestarian seni wayang kebanggaan masyarakat Banyumas yang berlokasi di kompleks eks-Kawedanan Banyumas. Museum ini mengabadikan kekhasan Wayang Kulit Gagrag Banyumasan dengan ikon punakawan Bawor yang berwatak kesatria, lugas, dan apa adanya.',
    highlights: ['Wayang Gagrag Banyumasan', 'Ikon Punakawan Bawor', 'Gamelan Slendro Pusaka'],
  },
  {
    image: '/images/museum/places/museum-gubug-wayang-gerbang.jpg',
    title: 'Museum Gubug Wayang',
    location: 'Jl. R.A. Kartini, Kota Mojokerto, Jawa Timur',
    year: 'Diresmikan 15 Agustus 2015',
    description:
      'Pusat edukasi seni budaya terkemuka di Jawa Timur yang menempati gedung bertingkat di jantung kota Mojokerto. Memamerkan ribuan wayang kulit, wayang golek, topeng Panji, kostum wayang orang, hingga artefak pusaka bernilai sejarah tinggi.',
    highlights: ['Koleksi Topeng Panji', 'Wayang Golek Menak', 'Wayang Sasak Lombok'],
  },
  {
    image: '/images/museum/places/museum-radya-pustaka.jpg',
    title: 'Museum Radya Pustaka',
    location: 'Kompleks Taman Sriwedari, Kota Surakarta, Jawa Tengah',
    year: 'Didirikan 28 Oktober 1890',
    description:
      'Museum tertua di Indonesia yang didirikan pada masa pemerintahan Sri Susuhunan Pakubuwana IX oleh K.R.A. Sosrodiningrat IV. Memiliki paviliun pewayangan istimewa yang memajang pusaka wayang purwa keraton, patung Canthik Rajamala, dan naskah kuno manuskrip pewayangan.',
    highlights: ['Museum Tertua di Indonesia', 'Canthik Kapal Rajamala', 'Wayang Madya Pakubuwana'],
  },
  {
    image: '/images/museum/places/museum-sonobudoyo.jpg',
    title: 'Museum Sonobudoyo',
    location: 'Alun-Alun Utara, Kota Yogyakarta, D.I. Yogyakarta',
    year: 'Diresmikan 6 November 1935',
    description:
      'Museum kebudayaan Jawa terlengkap kedua di Indonesia setelah Museum Nasional. Gedung berasitektur klasik Jawa ini menyimpan ratusan kotak wayang bersejarah peninggalan Keraton Yogyakarta serta rutin menggelar pergelaran wayang kulit kelir semalam suntuk.',
    highlights: ['Wayang Kulit Kanjeng Kyai Pradapa', 'Arsitektur Joglo Keraton', 'Pertunjukan Kelir Malam'],
  },
  {
    image: '/images/museum/places/museum-kraton-jogja.jpg',
    title: 'Museum Keraton Yogyakarta',
    location: 'Kedaton Sri Sultan Hamengku Buwono, D.I. Yogyakarta',
    year: 'Didirikan sejak 1755',
    description:
      'Terletak di dalam kompleks kedaton kesultanan Ngayogyakarta Hadiningrat, museum ini memamerkan koleksi wayang kulit kagungan dalem yang disakralkan, busana kebesaran dalang, serta perlengkapan gamelan pusaka Kyai Gunturmadu.',
    highlights: ['Wayang Kagungan Dalem', 'Busana Tari Wayang Wong', 'Kompleks Istana Sultan'],
  },
  {
    image: '/images/museum/places/museum-mangkunegaran-pendopo.jpg',
    title: 'Museum Pura Mangkunegaran',
    location: 'Jl. Ronggowarsito, Kota Surakarta, Jawa Tengah',
    year: 'Didirikan sejak 1757',
    description:
      'Berada di dalam istana Kadipaten Mangkunegaran dengan Pendopo Ageng tanpa paku terluas di Nusantara. Menyimpan koleksi wayang kulit gaya Mangkunegaran dengan tatahan emas prada murni serta naskah wayang gubahan K.G.P.A.A. Mangkunegara IV.',
    highlights: ['Pendopo Ageng Terbesar', 'Wayang Kulit Bersepuh Prada Emas', 'Naskah Wayang Serat Tripama'],
  },
  {
    image: '/images/museum/places/museum-keraton-solo.jpg',
    title: 'Museum Keraton Surakarta',
    location: 'Kori Kamandungan, Baluwarti, Kota Surakarta, Jawa Tengah',
    year: 'Didirikan sejak 1745',
    description:
      'Menampilkan kekayaan pusaka Kasunanan Surakarta Hadiningrat melalui ruang pameran Sasana Sewaka di balik gerbang monumental Kori Kamandungan dan Menara Sanggabuana. Mengoleksi wayang Kyai Kadung peninggalan Pakubuwana IV dan kereta kencana Garuda Kencana.',
    highlights: ['Menara Bersejarah Sanggabuana', 'Kereta Kencana Pusaka', 'Wayang Kulit Kyai Kadung'],
  },
  {
    image: '/images/museum/places/museum-sri-baduga.jpg',
    title: 'Museum Sri Baduga',
    location: 'Jl. BKR No. 185, Tegallega, Kota Bandung, Jawa Barat',
    year: 'Diresmikan 5 Juni 1980',
    description:
      'Museum berarsitektur rumah panggung tradisional Sunda (Suhunan Jolongpong) yang menjadi pusat pelestarian kebudayaan tanah Pasundan. Menyimpan ratusan koleksi tokoh Wayang Golek Purwa legendaris seperti karakter Cepot, Dawala, Semar, dan tokoh ksatria Ramayana.',
    highlights: ['Arsitektur Panggung Sunda', 'Koleksi Wayang Golek Si Cepot', 'Naskah Lalakon Sunda'],
  },
  {
    image: '/images/museum/places/museum-nasional.jpg',
    title: 'Museum Nasional Indonesia',
    location: 'Jl. Medan Merdeka Barat No. 12, Jakarta Pusat',
    year: 'Didirikan 24 April 1778',
    description:
      'Dikenal luas sebagai Museum Gajah dan merupakan museum pertama dan terbesar di Asia Tenggara. Sayap etnografinya menyimpan mahakarya wayang kulit Nusantara tertua, wayang beber gelaran dari Pacitan abad ke-17, serta arca Prajnaparamita bernilai adi luhung.',
    highlights: ['Museum Tertua Asia Tenggara', 'Koleksi Wayang Beber Abad 17', 'Gedung Arsitektur Gajah'],
  },
  {
    image: '/images/museum/places/museum-indonesia-gedung.jpg',
    title: 'Museum Indonesia',
    location: 'Gedung Museum Indonesia, Cipayung, Jakarta Timur',
    year: 'Diresmikan 20 April 1980',
    description:
      'Gedung megah bertingkat tiga yang memadukan keagungan arsitektur tradisional Bali (Kori Agung). Menyimpan diorama akbar pewayangan Bharatayuddha, Pohon Hayat Kalpataru setinggi 8 meter, serta galeri busana pertunjukan wayang wong keraton Nusantara.',
    highlights: ['Arsitektur Megah Kori Agung', 'Diorama Akbar Bharatayuddha', 'Galeri Etnografi Wayang'],
  },
  {
    image: '/images/museum/places/museum-benteng-vredeburg.jpg',
    title: 'Museum Benteng Vredeburg',
    location: 'Titik Nol Kilometer, Jl. Margo Mulyo, Kota Yogyakarta',
    year: 'Dibangun sejak 1760',
    description:
      'Benteng peninggalan kolonial Belanda di ujung Jalan Malioboro yang dikelilingi parit bersejarah. Kini difungsikan sebagai museum perjuangan dan kebudayaan yang aktif memfasilitasi festival seni wayang kulit serta pameran pelestarian pusaka kelir Jawa.',
    highlights: ['Benteng Kolonial Berparit', 'Titik Nol Kilometer Malioboro', 'Pentas Seni Budaya Tradisi'],
  },
  {
    image: '/images/museum/places/museum-sejarah-jakarta.jpg',
    title: 'Museum Fatahillah (Sejarah Jakarta)',
    location: 'Taman Fatahillah No. 1, Kota Tua Jakarta Barat',
    year: 'Diresmikan 30 Maret 1974',
    description:
      'Bekas gedung Stadhuis (Balaikota Batavia) yang dibangun tahun 1707–1710 menyerupai Istana Dam di Amsterdam. Menjadi saksi sejarah pertemuan akulturasi budaya masyarakat Betawi, Jawa, Tionghoa, dan Eropa dalam seni pertunjukan wayang pesisiran.',
    highlights: ['Eks Balaikota Batavia 1710', 'Meriam Legendaris Si Jagur', 'Pusat Sejarah Kota Tua'],
  },
  {
    image: '/images/museum/places/museum-bali-denpasar.jpg',
    title: 'Museum Bali',
    location: 'Jl. Mayor Wisnu No. 1, Dangin Puri, Denpasar Timur, Bali',
    year: 'Didirikan 8 Desember 1931',
    description:
      'Museum negeri tertua di Bali yang dirancang dengan konsep arsitektur puri keraton dan bale agung khas Bali. Menyimpan koleksi sakral Wayang Kulit Bali (Wayang Parwa) yang dipentaskan pada upacara keagamaan dengan karakter khas wayang bertaring dan wayang dewa.',
    highlights: ['Kompleks Puri & Kori Agung Bali', 'Wayang Parwa Sakral', 'Koleksi Topeng Barong & Rangda'],
  },
  {
    image: '/images/museum/places/museum-puri-lukisan.jpg',
    title: 'Museum Puri Lukisan',
    location: 'Jl. Raya Ubud, Kecamatan Ubud, Kabupaten Gianyar, Bali',
    year: 'Didirikan tahun 1956',
    description:
      'Museum seni tertua di Bali yang didirikan oleh Tjokorda Gde Agung Sukawati bersama pelukis Belanda Rudolf Bonnet. Dikelilingi taman teratai yang asri, museum ini memamerkan lukisan klasik Wayang Kamasan gaya Klungkung yang menggunakan pewarna alami tradisi Bali.',
    highlights: ['Museum Seni Tertua di Bali', 'Lukisan Klasik Wayang Kamasan', 'Taman Teratai Asri Ubud'],
  },
  {
    image: '/images/museum/places/museum-mpu-tantular.jpg',
    title: 'Museum Negeri Mpu Tantular',
    location: 'Jl. Raya Buduran, Kabupaten Sidoarjo, Jawa Timur',
    year: 'Didirikan 23 Mei 1972',
    description:
      'Museum kebudayaan Jawa Timur yang dinamai dari pujangga agung Majapahit pencetus semboyan "Bhinneka Tunggal Ika". Memamerkan koleksi langka Wayang Krucil berukir kayu pipih khas Jawa Timuran, wayang golek Menak, serta prasasti peninggalan kerajaan Majapahit.',
    highlights: ['Nama Pencetus Bhinneka Tunggal Ika', 'Wayang Krucil Khas Jawa Timur', 'Pusaka Era Majapahit'],
  },
];

export default function SectionGalleryMuseum() {
  const [selectedMuseum, setSelectedMuseum] = useState<Work | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Smooth Close Animation
  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedMuseum(null);
        setIsClosing(false);
      },
    });

    tl.to(
      [leftRef.current, rightRef.current],
      {
        opacity: 0,
        y: 15,
        duration: 0.2,
        ease: 'power2.in',
      },
      0
    );

    tl.to(
      imageRef.current,
      {
        opacity: 0,
        scale: 0.92,
        filter: 'blur(10px)',
        duration: 0.25,
        ease: 'power2.in',
      },
      0
    );

    tl.to(
      closeBtnRef.current,
      {
        opacity: 0,
        y: -8,
        duration: 0.15,
        ease: 'power2.in',
      },
      0
    );

    tl.to(
      modalRef.current,
      {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.inOut',
      },
      0.05
    );
  }, [isClosing]);

  // Listen to open-museum-modal events from Navbar
  useEffect(() => {
    const handleOpenModal = (e: Event) => {
      const customEvent = e as CustomEvent<{ title?: string }>;
      const title = customEvent.detail?.title;
      if (!title) return;
      const found = MUSEUM_PLACES.find((m) =>
        m.title.toLowerCase().includes(title.toLowerCase())
      );
      if (found) {
        setSelectedMuseum(found);
      }
    };

    window.addEventListener('open-museum-modal', handleOpenModal);
    return () => {
      window.removeEventListener('open-museum-modal', handleOpenModal);
    };
  }, []);
  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    if (selectedMuseum) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedMuseum, handleClose]);

  // Smooth Entrance Animation
  useEffect(() => {
    if (!selectedMuseum) return;

    // Set initial offscreen / pre-animated values
    gsap.set(modalRef.current, { opacity: 0 });
    gsap.set(imageRef.current, { opacity: 0, scale: 0.88, y: 30, filter: 'blur(16px)' });
    gsap.set(leftRef.current, { opacity: 0, x: -40 });
    gsap.set(rightRef.current, { opacity: 0, x: 40 });
    gsap.set(closeBtnRef.current, { opacity: 0, y: -12 });

    const tl = gsap.timeline();

    tl.to(modalRef.current, {
      opacity: 1,
      duration: 0.35,
      ease: 'power2.out',
    });

    tl.to(
      imageRef.current,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.65,
        ease: 'power3.out',
      },
      '-=0.15'
    );

    tl.to(
      leftRef.current,
      {
        opacity: 1,
        x: 0,
        duration: 0.55,
        ease: 'power3.out',
      },
      '-=0.45'
    );

    tl.to(
      rightRef.current,
      {
        opacity: 1,
        x: 0,
        duration: 0.55,
        ease: 'power3.out',
      },
      '-=0.5'
    );

    tl.to(
      closeBtnRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      },
      '-=0.3'
    );

    return () => {
      tl.kill();
    };
  }, [selectedMuseum]);

  return (
    <section
      id="galeri"
      aria-label="Galeri Museum Wayang Indonesia"
      className="relative w-full bg-[#0a0a0a] overflow-hidden flex flex-col justify-center"
      style={{
        height: 'clamp(820px, 96vh, 1180px)',
        minHeight: '820px',
      }}
    >
      {/* ── Formation 3D Carousel: 16 Museum Berbeda se-Indonesia ── */}
      <div className="absolute inset-0">
        <Formation
          works={MUSEUM_PLACES}
          onCardClick={(museum) => setSelectedMuseum(museum)}
        />
      </div>

      {/* ── Centered Title Overlay: Galeri Museum Wayang ── */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 45 }}
      >
        <h2
          className="font-serif italic font-black text-[#dedf42] text-center leading-[0.88] tracking-[-0.02em] select-none"
          style={{
            fontSize: 'clamp(34px, 8.5vw, 136px)',
            textShadow:
              '0 0 50px rgba(0,0,0,0.95), 0 0 100px rgba(0,0,0,0.85), 0 4px 20px rgba(0,0,0,0.9)',
          }}
        >
          Galeri Museum
          <br />
          Wayang
        </h2>
      </div>

      {/* ── POP-UP DETAIL MUSEUM (MINIMALIST GALLERY LAYOUT WITH GSAP) ── */}
      {selectedMuseum && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={selectedMuseum.title}
          onClick={handleClose}
          className="fixed inset-0 z-[5000] flex items-center justify-center p-6 md:p-12 lg:p-16 bg-[#050505]/95 backdrop-blur-xl select-none overflow-y-auto"
        >
          {/* Minimal Top Close Button */}
          <button
            ref={closeBtnRef}
            type="button"
            onClick={handleClose}
            aria-label="Tutup pop up"
            className="fixed top-6 right-6 lg:top-10 lg:right-12 z-50 text-white/70 hover:text-[#dedf42] text-xs font-mono tracking-widest uppercase transition-all flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 hover:border-[#dedf42]/50 bg-black/60 backdrop-blur-md shadow-xl"
          >
            <span>TUTUP</span>
            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Polosan 3-Column Layout: Kiri (Nama & Lokasi) — Tengah (Foto Museum) — Kanan (Deskripsi Singkat) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 lg:gap-14 my-auto py-8"
          >
            {/* ── KOLOM KIRI: Identitas & Lokasi Museum ── */}
            <div
              ref={leftRef}
              className="w-full md:w-1/3 flex flex-col md:items-end text-center md:text-right order-2 md:order-1"
            >
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#dedf42]/70 uppercase mb-2">
                MUSEUM WAYANG
              </span>
              <h3 className="font-serif italic font-bold text-3xl sm:text-4xl lg:text-5xl text-[#dedf42] leading-[1.02] tracking-tight">
                {selectedMuseum.title}
              </h3>
              {selectedMuseum.location && (
                <div className="mt-3.5 flex md:justify-end justify-center">
                  <div className="inline-flex items-start gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-white/85 text-xs sm:text-[13px] font-sans leading-snug max-w-xs text-left">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-3.5 text-[#dedf42] shrink-0 mt-0.5"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{selectedMuseum.location}</span>
                  </div>
                </div>
              )}
              {selectedMuseum.year && (
                <p className="mt-2 text-white/45 text-xs font-mono tracking-wider">
                  {selectedMuseum.year}
                </p>
              )}
            </div>

            {/* ── KOLOM TENGAH: Foto Gedung Museum (Sesuai Referensi) ── */}
            <div
              ref={imageRef}
              className="relative shrink-0 w-[260px] sm:w-[320px] md:w-[330px] lg:w-[380px] aspect-[3/4] overflow-hidden rounded-md shadow-[0_0_60px_rgba(222,223,66,0.08),0_25px_80px_rgba(0,0,0,0.95)] border border-white/20 order-1 md:order-2 group"
            >
              <Image
                src={selectedMuseum.image}
                alt={selectedMuseum.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 320px, 380px"
                priority
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/15" />
            </div>

            {/* ── KOLOM KANAN: Deskripsi Singkat & Sorotan ── */}
            <div
              ref={rightRef}
              className="w-full md:w-1/3 flex flex-col md:items-start text-center md:text-left order-3"
            >
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#dedf42]/70 uppercase mb-2">
                TENTANG TEMPAT
              </span>
              <p className="text-[#dedbc8] text-sm sm:text-base leading-relaxed font-sans font-light">
                {selectedMuseum.description}
              </p>

              {selectedMuseum.highlights && selectedMuseum.highlights.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5 md:justify-start justify-center">
                  {selectedMuseum.highlights.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-sans bg-white/5 border border-white/15 text-white/80 hover:border-[#dedf42]/40 hover:text-[#dedf42] transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${selectedMuseum.title} ${selectedMuseum.location || ''}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-xs font-sans tracking-wider uppercase text-[#dedf42] hover:text-white transition-colors group"
              >
                <span className="border-b border-[#dedf42]/40 group-hover:border-white pb-0.5">Buka di Google Maps</span>
                <svg className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
