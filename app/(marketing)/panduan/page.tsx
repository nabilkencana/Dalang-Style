'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Gesture01Visual,
  Gesture02Visual,
  Gesture03Visual,
  Gesture04Visual,
  ModeDuaWayangVisual,
  ModeSatuWayangVisual,
} from '@/components/GestureVisuals';
import PanduanGsapAnimations from '@/components/PanduanGsapAnimations';

export default function PanduanPage() {
  const handleScrollToGestur = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('gestur-utama');
    if (!target) return;
    if (typeof window !== 'undefined' && window.lenisInstance) {
      window.lenisInstance.scrollTo(target, {
        offset: -80,
        duration: 1.25,
        easing: (t: number) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#dedf42] text-[#050303] selection:bg-black selection:text-[#dedf42] overflow-x-hidden pt-28 pb-20">
      {/* GSAP ScrollTrigger Animations Controller for Panduan */}
      <PanduanGsapAnimations />
      {/* ── Background Watermark Canvas (Same as Section 4 SectionStoryAwakening) ── */}
      <div className="fixed inset-0 bg-[#dedf42] pointer-events-none -z-10">
        <Image
          src="/images/story-awakening-card-bg.png"
          alt="Bima Illustration Watermark Canvas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70 pointer-events-none"
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/10 pointer-events-none" />
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* ── Breadcrumb & Aksara Jawa ── */}
        <div data-gsap="panduan-breadcrumb" className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-black/20">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase text-black/70">
            <Link href="/" className="hover:text-black hover:underline transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <span className="text-black">Panduan Gestur Dalang</span>
          </div>

          <p className="font-serif text-black/75 text-sm sm:text-base tracking-[0.2em]" aria-label="Aksara Jawa: Panduan Mendalang Wayang Jawi">
            ꦥꦤ꧀ꦢꦸꦮꦤ꧀ ꦩꦼꦤ꧀ꦢꦭꦁ ꦮꦪꦁ ꦗꦮꦶ
          </p>
        </div>

        {/* ── Hero Title Section ── */}
        <div className="pt-10 pb-14 text-center max-w-4xl mx-auto">
          <span data-gsap="panduan-kicker" className="inline-block px-4 py-1.5 rounded-full bg-black text-[#dedf42] text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-sm">
            <span className="hidden md:inline">TUTORIAL & PANDUAN PANGGUNG</span>
            <span className="md:hidden inline">PANDUAN MENDALANG • PONSEL & AI</span>
          </span>
          <h1 data-gsap="panduan-title" className="font-serif italic font-bold text-4xl sm:text-6xl lg:text-7xl text-[#050303] leading-[1.02] tracking-tight">
            <span className="hidden md:inline">Seni Mendalang di Ujung Jemari Anda</span>
            <span className="md:hidden inline">Hidupkan Lakon dari Genggaman Ponsel</span>
          </h1>
          <p data-gsap="panduan-subtitle" className="mt-5 text-base sm:text-lg lg:text-xl font-sans text-black/80 leading-relaxed font-normal max-w-2xl mx-auto">
            <span className="hidden md:inline">
              Pelajari bagaimana kecerdasan buatan membaca gerak tangan, jemari cempurit, dan gestur sakral Anda untuk menghidupkan boneka wayang kulit di Panggung Virtual Wayang Jawi.
            </span>
            <span className="md:hidden inline">
              Arahkan kamera depan ponsel ke tangan Anda. Kecerdasan buatan Wayang Jawi membaca liukan jemari menjadi tarian wayang kulit yang adiluhung secara langsung.
            </span>
          </p>

          <div data-gsap="panduan-cta" className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/stage"
              className="px-6 sm:px-8 py-3 rounded-full bg-black text-[#dedf42] font-sans font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-800 active:scale-95 transition-[background-color,transform,box-shadow] duration-200 shadow-lg flex items-center gap-2"
            >
              <span className="hidden md:inline">Masuk ke Panggung Sekarang</span>
              <span className="md:hidden inline">Buka Panggung HP Sekarang</span>
              <span className="text-base">&rarr;</span>
            </Link>
            <a
              href="#gestur-utama"
              onClick={handleScrollToGestur}
              className="px-6 sm:px-7 py-3 rounded-full border border-black/40 text-black font-sans font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-black/10 active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <span className="hidden md:inline">Pelajari 4 Gestur Inti &darr;</span>
              <span className="md:hidden inline">Pelajari 4 Gestur Tangan &darr;</span>
            </a>
          </div>
        </div>

        {/* ── 4 GESTUR UTAMA TANGAN (CARDS) ── */}
        <section id="gestur-utama" className="py-8 scroll-mt-24">
          <div data-gsap="panduan-gestur-header" className="flex items-center gap-3 mb-8">
            <h2 className="font-serif italic font-bold text-2xl sm:text-3xl lg:text-4xl text-[#050303]">
              <span className="hidden md:inline">Empat Gestur Inti Pelacakan Tangan</span>
              <span className="md:hidden inline">4 Gestur Tangan di Depan Kamera HP</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Gestur 1: Poros Tubuh / Posisi Wayang */}
            <div data-gsap="panduan-gestur-card" className="bg-black/5 border-2 border-black/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:bg-black/10 transition-all gap-5">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-mono font-bold tracking-widest text-black/60 uppercase">
                    GESTUR 01 • POROS BADAN
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black text-[#dedf42] text-[11px] font-mono font-bold">
                    TELAPAK TANGAN
                  </span>
                </div>

                {/* Visual Illustration */}
                <div className="mb-5">
                  <Gesture01Visual />
                </div>

                <h3 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#050303] mb-3">
                  <span className="hidden md:inline">Gerak Batang Gapit Utama</span>
                  <span className="md:hidden inline">Telapak Tangan: Kendali Badan Wayang</span>
                </h3>
                <p className="text-black/80 text-sm sm:text-base leading-relaxed font-sans font-normal mb-5">
                  <span className="hidden md:inline">
                    Posisi pusat telapak tangan Anda (*palm center*) langsung memandu koordinat tubuh wayang di atas kain kelir.
                  </span>
                  <span className="md:hidden inline">
                    Pusat telapak tangan Anda mengarahkan posisi badan wayang melangkah di atas kelir panggung.
                  </span>
                </p>
                <div className="space-y-2 text-xs sm:text-sm font-sans text-black/85">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-black">•</span>
                    <span><strong>Geser Kiri/Kanan:</strong> Wayang melangkah melintasi layar panggung.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-black">•</span>
                    <span><strong>Angkat/Turunkan:</strong> Wayang melompat atau menunduk dalam sikap sembah takzim.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-black">•</span>
                    <span><strong>Miringkan Telapak:</strong> Condongkan badan wayang saat terbang atau bertarung.</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-black/20 text-[11px] font-mono text-black/60 uppercase tracking-wider">
                <span className="hidden md:inline">Titik Deteksi AI: Wrist & Sendi Telapak (0, 5, 9, 13, 17)</span>
                <span className="md:hidden inline">Sensor HP: Deteksi 21 titik sendi tangan secara instan</span>
              </div>
            </div>
            {/* Gestur 2: Kendali Lengan Wayang */}
            <div data-gsap="panduan-gestur-card" className="bg-black/5 border-2 border-black/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:bg-black/10 transition-all gap-5">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-mono font-bold tracking-widest text-black/60 uppercase">
                    GESTUR 02 • CEMPURIT LENGAN
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black text-[#dedf42] text-[11px] font-mono font-bold">
                    IBU JARI + TELUNJUK
                  </span>
                </div>

                {/* Visual Illustration */}
                <div className="mb-5">
                  <Gesture02Visual />
                </div>

                <h3 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#050303] mb-3">
                  <span className="hidden md:inline">Gerak Tangan & Siku Wayang</span>
                  <span className="md:hidden inline">Ibu Jari & Telunjuk: Tuding Lengan Wayang</span>
                </h3>
                <p className="text-black/80 text-sm sm:text-base leading-relaxed font-sans font-normal mb-5">
                  <span className="hidden md:inline">
                    Ujung jari jemari Anda menggantikan batang tangkai cempurit tanduk kerbau yang biasa dipegang dalang tradisional.
                  </span>
                  <span className="md:hidden inline">
                    Jemari Anda menggantikan bilah tangkai cempurit kerbau untuk menggerakkan kedua tangan wayang.
                  </span>
                </p>
                <div className="space-y-2 text-xs sm:text-sm font-sans text-black/85">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-black">•</span>
                    <span><strong>Ibu Jari (Thumb):</strong> Menggerakkan lengan dan tangan bagian kanan wayang.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-black">•</span>
                    <span><strong>Jari Telunjuk (Index):</strong> Menggerakkan lengan dan tangan bagian kiri wayang.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-black">•</span>
                    <span><strong>Rentangkan Jemari:</strong> Membuka tangan wayang dalam pose ksatria siaga (*solah ksatria*).</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-black/20 text-[11px] font-mono text-black/60 uppercase tracking-wider">
                <span className="hidden md:inline">Opsi Ekstra: Mode Thumb-Pinky untuk rentangan tangan lebih lebar</span>
                <span className="md:hidden inline">Sensitivitas Gerak: Presisi tinggi membaca liukan jari cempurit</span>
              </div>
            </div>
            {/* Gestur 3: Tarian Sakral Kiprahan */}
            <div data-gsap="panduan-gestur-card" className="bg-black/5 border-2 border-black/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:bg-black/10 transition-all gap-5">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-mono font-bold tracking-widest text-black/60 uppercase">
                    GESTUR 03 • TARIAN SAKRAL
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black text-[#dedf42] text-[11px] font-mono font-bold">
                    PINKY SIGN (KELINGKING)
                  </span>
                </div>

                {/* Visual Illustration */}
                <div className="mb-5">
                  <Gesture03Visual />
                </div>

                <h3 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#050303] mb-3">
                  <span className="hidden md:inline">Pemicu Tari Kiprahan Otomatis</span>
                  <span className="md:hidden inline">Kelingking: Pemicu Tari Sakral Kiprahan</span>
                </h3>
                <p className="text-black/80 text-sm sm:text-base leading-relaxed font-sans font-normal mb-5">
                  <span className="hidden md:inline">
                    Acungkan jari kelingking Anda tegak ke atas, sementara jari telunjuk, tengah, dan manis terlipat di telapak tangan.
                  </span>
                  <span className="md:hidden inline">
                    Tegakkan jari kelingking ke atas untuk memicu tarian gerak tubuh rancak secara otomatis.
                  </span>
                </p>
                <div className="space-y-2 text-xs sm:text-sm font-sans text-black/85">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-black">•</span>
                    <span><strong>Kunci Pose Kelingking:</strong> Sensor AI langsung mendeteksi pose sakral penari keraton.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-black">•</span>
                    <span><strong>Gerak Tari Rancak:</strong> Boneka wayang menari dengan gerak tubuh berirama dinamis.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-black">•</span>
                    <span><strong>Selaras Tabuhan Gendang:</strong> Gerakan terkalibrasi selaras dengan tabuhan gendang gamelan.</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-black/20 text-[11px] font-mono text-black/60 uppercase tracking-wider">
                <span className="hidden md:inline">Pintasan Keyboard Alternatif: Tekan tombol [ D ]</span>
                <span className="md:hidden inline">Di Layar HP: Acungkan kelingking atau ketuk tombol Tari di panggung</span>
              </div>
            </div>
            {/* Gestur 4: Jarak Kedalaman & Bayangan Kelir */}
            <div data-gsap="panduan-gestur-card" className="bg-black/5 border-2 border-black/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:bg-black/10 transition-all gap-5">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-mono font-bold tracking-widest text-black/60 uppercase">
                    GESTUR 04 • KEDALAMAN (Z-AXIS)
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black text-[#dedf42] text-[11px] font-mono font-bold">
                    JARAK KE KAMERA
                  </span>
                </div>

                {/* Visual Illustration */}
                <div className="mb-5">
                  <Gesture04Visual />
                </div>

                <h3 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#050303] mb-3">
                  <span className="hidden md:inline">Efek Bayangan Tajam vs Baur</span>
                  <span className="md:hidden inline">Jarak ke Layar: Efek Bayangan Kelir Blencong</span>
                </h3>
                <p className="text-black/80 text-sm sm:text-base leading-relaxed font-sans font-normal mb-5">
                  <span className="hidden md:inline">
                    Dalam seni wayang kulit asli, jarak boneka terhadap lampu blencong dan kain kelir menentukan ketajaman bayangan.
                  </span>
                  <span className="md:hidden inline">
                    Maju-mundurkan tangan Anda di depan kamera HP untuk mengatur ketajaman bayangan siluet wayang.
                  </span>
                </p>
                <div className="space-y-2 text-xs sm:text-sm font-sans text-black/85">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-black">•</span>
                    <span><strong>Dekatkan ke Kamera:</strong> Wayang menempel di kelir; bayangan tajam, pekat, dan tegas.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-black">•</span>
                    <span><strong>Jauhkan dari Kamera:</strong> Wayang menjauh; bayangan membesar, baur (*blur*), dan lembut.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-black">•</span>
                    <span><strong>Nyala Api Blencong:</strong> Lampu minyak kelapa digital bergetar realistis dengan efek nyala api alami.</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-black/20 text-[11px] font-mono text-black/60 uppercase tracking-wider">
                <span className="hidden md:inline">Kontrol Mouse Alternatif: Gunakan Scroll Wheel untuk zoom kedalaman</span>
                <span className="md:hidden inline">Rekomendasi HP: Jaga jarak tangan 40–70 cm dari kamera depan</span>
              </div>
            </div>
          </div>
        </section>
        {/* ── DUA MODE PERTUNJUKAN ── */}
        <section data-gsap="panduan-mode-section" className="py-12 border-t border-black/20">
          <div data-gsap="panduan-mode-header" className="flex items-center gap-3 mb-6">
            <span className="w-3 h-3 rounded-full bg-black shrink-0" />
            <h2 className="font-serif italic font-bold text-2xl sm:text-3xl lg:text-4xl text-[#050303]">
              <span className="hidden md:inline">Dua Mode Karakter Panggung</span>
              <span className="md:hidden inline">2 Pilihan Mode Main di Layar Ponsel</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mode 1: Dua Wayang (Dua Tangan) */}
            <div data-gsap="panduan-mode-card" className="bg-black/5 border-2 border-black/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:bg-black/10 transition-all gap-4">
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-xs font-mono font-bold tracking-widest text-black/60 uppercase">
                    MODE STANDAR (DEFAULT)
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black text-[#dedf42] text-[11px] font-mono font-bold">
                    2 TANGAN = 2 WAYANG
                  </span>
                </div>

                {/* Mode Dua Wayang Video on Hover */}
                <div className="mb-4">
                  <ModeDuaWayangVisual />
                </div>

                <h3 className="font-serif italic font-bold text-xl sm:text-2xl text-black mb-2">
                  <span className="hidden md:inline">Dua Wayang (Dua Tangan)</span>
                  <span className="md:hidden inline">Mode Duo (2 Tangan = 2 Tokoh)</span>
                </h3>
                <p className="text-black/80 text-sm leading-relaxed mb-4">
                  <span className="hidden md:inline">
                    Sangat ideal untuk adegan dialog, perdebatan batin, atau pertempuran dua satria:
                  </span>
                  <span className="md:hidden inline">
                    Sangat pas untuk adegan dialog, wejangan batin, atau laga dua ksatria berhadapan:
                  </span>
                </p>
                <ul className="text-xs sm:text-sm space-y-2 text-black/85">
                  <li>• <strong>Tangan Kiri Dalang:</strong> Mengendalikan wayang sisi kiri panggung.</li>
                  <li>• <strong>Tangan Kanan Dalang:</strong> Mengendalikan wayang sisi kanan panggung.</li>
                  <li>• <strong>Otomatis Berhadapan:</strong> Kedua tokoh otomatis menatap satu sama lain saat saling mendekat.</li>
                  <li className="hidden md:list-item">• <strong>Pintasan Cepat:</strong> Tekan tombol <kbd className="px-1.5 py-0.5 rounded bg-black text-[#dedf42] font-mono text-xs">2</kbd> di keyboard untuk beralih instan.</li>
                  <li className="md:hidden list-item">• <strong>Ganti Cepat:</strong> Ketuk tombol mode di pojok panggung HP kapan saja.</li>
                </ul>
              </div>
            </div>
            {/* Mode 2: Satu Wayang Penuh (Dua Tangan) */}
            <div data-gsap="panduan-mode-card" className="bg-black/5 border-2 border-black/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:bg-black/10 transition-all gap-4">
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-xs font-mono font-bold tracking-widest text-black/60 uppercase">
                    MODE LANJUTAN (SOLO MASTERY)
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black text-[#dedf42] text-[11px] font-mono font-bold">
                    2 TANGAN = 1 WAYANG
                  </span>
                </div>

                {/* Mode Satu Wayang Penuh Video on Hover */}
                <div className="mb-4">
                  <ModeSatuWayangVisual />
                </div>

                <h3 className="font-serif italic font-bold text-xl sm:text-2xl text-black mb-2">
                  <span className="hidden md:inline">Satu Wayang (Solo Dua Tangan)</span>
                  <span className="md:hidden inline">Mode Solo (2 Tangan = 1 Tokoh Bebas)</span>
                </h3>
                <p className="text-black/80 text-sm leading-relaxed mb-4">
                  <span className="hidden md:inline">
                    Dua tangan dalang mengendalikan satu wayang dengan kebebasan gerak penuh dan artikulatif:
                  </span>
                  <span className="md:hidden inline">
                    Kendalikan satu tokoh wayang dengan kebebasan gerak penuh menggunakan kedua tangan Anda:
                  </span>
                </p>
                <ul className="text-xs sm:text-sm space-y-2 text-black/85">
                  <li>• <strong>Tangan Kiri Dalang:</strong> Mengendalikan lengan kiri wayang (Tuding Kiwa) secara bebas dan luas.</li>
                  <li>• <strong>Tangan Kanan Dalang:</strong> Mengendalikan lengan kanan wayang (Tuding Tengen) secara bebas dan luas.</li>
                  <li>• <strong>Gerak Badan Otomatis:</strong> Poros tubuh wayang luwes melangkah mengikuti titik tengah (midpoint) kedua tangan Anda.</li>
                  <li>• <strong>Kemiringan Dinamis:</strong> Tubuh wayang otomatis condong saat satu tangan diangkat tinggi (pose silat/serang).</li>
                  <li className="hidden md:list-item">• <strong>Fallback Cerdas:</strong> Menurunkan 1 tangan otomatis mengalihkan kendali tubuh & kedua lengan ke tangan aktif.</li>
                  <li className="hidden md:list-item">• <strong>Pintasan Cepat:</strong> Tekan tombol <kbd className="px-1.5 py-0.5 rounded bg-black text-[#dedf42] font-mono text-xs">1</kbd> di keyboard untuk beralih instan.</li>
                  <li className="md:hidden list-item">• <strong>Ganti Cepat:</strong> Ketuk tombol mode di layar panggung untuk beralih instan.</li>
                  <li className="hidden md:list-item">• Tersedia juga pilihan gaya <em>Dalang Klasik (Badan + Tuding)</em> di menu Pengaturan.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── TABEL HOTKEYS KEYBOARD ── */}
        <section data-gsap="panduan-hotkey-section" className="py-12 border-t border-black/20">
          <div data-gsap="panduan-hotkey-header">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-3 h-3 rounded-full bg-black shrink-0" />
              <h2 className="font-serif italic font-bold text-2xl sm:text-3xl lg:text-4xl text-[#050303]">
                <span className="hidden md:inline">Pintasan Keyboard Dalang (Hotkeys)</span>
                <span className="md:hidden inline">Pusat Kendali Sentuh di Layar Ponsel</span>
              </h2>
            </div>
            <p className="text-black/70 text-sm mb-8 font-sans">
              <span className="hidden md:inline">
                Gunakan tombol-tombol pintasan berikut di keyboard saat berada di panggung untuk aksi kilat tanpa harus membuka menu:
              </span>
              <span className="md:hidden inline">
                Di panggung ponsel, Anda tidak butuh keyboard fisik. Cukup ketuk ikon-ikon aksi cepat di layar panggung untuk kontrol instan:
              </span>
            </p>
          </div>

          {/* ── DESKTOP: Tabel Hotkeys Keyboard ── */}
          <div className="hidden md:grid grid-cols-2 sm:grid-cols-5 gap-3.5 sm:gap-4">
            {[
              { key: '1', label: 'Mode Solo (1 Wayang)', desc: 'Kiri = Lengan Kiri, Kanan = Lengan Kanan' },
              { key: '2', label: 'Mode Duo (2 Wayang)', desc: '1 Tangan = 1 Tokoh berhadapan' },
              { key: 'F', label: 'Balik Wayang Kiri', desc: 'Membalik arah hadap tokoh kiri' },
              { key: 'G', label: 'Balik Wayang Kanan', desc: 'Membalik arah hadap tokoh kanan' },
              { key: 'D', label: 'Tari Kiprahan', desc: 'Memicu tarian gerak sakral instan' },
              { key: 'M', label: 'Musik Gamelan', desc: 'Putar / bisukan tabuhan BGM' },
              { key: 'H', label: 'Clean Mode', desc: 'Sembunyikan / munculkan UI panggung' },
              { key: 'C', label: 'Kalibrasi Ulang', desc: 'Reset titik nol sensor tangan & AI' },
              { key: 'P', label: 'Pop-out Kamera', desc: 'Buka jendela preview terpisah' },
              { key: 'V', label: 'Toggle Preview', desc: 'Tampilkan / sembunyikan kamera' },
            ].map((hk) => (
              <div
                key={hk.key}
                data-gsap="panduan-hotkey-card"
                className="bg-black text-[#dedf42] rounded-xl p-4 flex flex-col justify-between shadow-md hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="w-8 h-8 rounded-lg bg-[#dedf42] text-black font-mono font-bold text-base flex items-center justify-center shadow">
                    {hk.key}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-[#dedf42]/70 uppercase">KEY</span>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-white">{hk.label}</h4>
                  <p className="text-white/60 text-xs mt-1 leading-snug">{hk.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── MOBILE: Kartu Kendali Sentuh Layar HP ── */}
          <div className="grid md:hidden grid-cols-2 gap-3.5">
            {[
              { icon: '1 / 2', label: 'Ganti Mode Tokoh', desc: 'Beralih instan antara mode 1 Wayang (Solo) atau 2 Wayang (Duo).' },
              { icon: '⇄', label: 'Balik Hadap Tokoh', desc: 'Ketuk untuk memutar arah hadap tokoh menghadap lawan atau berpaling.' },
              { icon: '✦', label: 'Tarian Kiprahan', desc: 'Memicu tarian sakral kiprahan langsung tanpa gestur kelingking.' },
              { icon: '♫', label: 'Musik Gamelan', desc: 'Putar atau heningkan gending gamelan Slendro pengiring panggung.' },
              { icon: '⛶', label: 'Fokus Kelir Penuh', desc: 'Sembunyikan seluruh tombol UI untuk tangkapan layar / video bersih.' },
              { icon: '⟳', label: 'Kalibrasi Sensor', desc: 'Setel ulang posisi nol sensor tangan bila gerak terasa melenceng.' },
            ].map((action, idx) => (
              <div
                key={idx}
                data-gsap="panduan-touch-card"
                className="bg-black text-[#dedf42] rounded-xl p-3.5 flex flex-col justify-between shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="w-8 h-8 rounded-lg bg-[#dedf42] text-black font-mono font-bold text-xs flex items-center justify-center shadow">
                    {action.icon}
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-[#dedf42]/70 uppercase">SENTUH</span>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs text-white">{action.label}</h4>
                  <p className="text-white/60 text-[11px] mt-1 leading-snug">{action.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TIPS OPTIMALISASI RUANGAN & KAMERA ── */}
        <section className="py-12 border-t border-black/20">
          <div data-gsap="panduan-tips-box" className="bg-[#140e0a] text-[#dedf42] rounded-3xl p-8 sm:p-10 shadow-2xl border border-black/50">
            <span className="text-xs font-mono font-bold tracking-widest text-[#dedf42]/70 uppercase block mb-2">
              TIPS & REKOMENDASI PERFORMA
            </span>
            <h3 className="font-serif italic font-bold text-2xl sm:text-3xl text-white mb-6">
              <span className="hidden md:inline">Optimalisasi Kamera untuk Respon Gerak Terbaik</span>
              <span className="md:hidden inline">Tips Menata Ponsel untuk Respon Gerak Terbaik</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-[#f4e7cd]/80 font-sans">
              <div data-gsap="panduan-tips-col" className="border-l-2 border-[#dedf42]/40 pl-4">
                <h4 className="font-bold text-[#dedf42] mb-1">
                  <span className="hidden md:inline">Pencahayaan Depan</span>
                  <span className="md:hidden inline">Cahaya Depan Jelas</span>
                </h4>
                <p className="leading-relaxed">
                  <span className="hidden md:inline">
                    Pastikan tangan Anda tersinari dari arah depan atau samping. Hindari cahaya lampu yang terlalu terang persis di belakang tubuh (*backlight*).
                  </span>
                  <span className="md:hidden inline">
                    Pastikan ruangan terang dan cahaya menyinari tangan dari arah depan ponsel. Hindari membelakangi jendela atau lampu terang (*backlight*).
                  </span>
                </p>
              </div>
              <div data-gsap="panduan-tips-col" className="border-l-2 border-[#dedf42]/40 pl-4">
                <h4 className="font-bold text-[#dedf42] mb-1">
                  <span className="hidden md:inline">Jarak Ideal Webcam</span>
                  <span className="md:hidden inline">Sandaran HP Stabil</span>
                </h4>
                <p className="leading-relaxed">
                  <span className="hidden md:inline">
                    Duduk dengan jarak sekitar 60 cm hingga 1 meter dari kamera agar seluruh telapak dan pergelangan tangan tertangkap penuh dalam frame.
                  </span>
                  <span className="md:hidden inline">
                    Sandarkan ponsel di meja atau dudukan (*stand*) setinggi dada. Jaga jarak tangan sekitar 40–70 cm agar seluruh jemari tertangkap frame kamera depan.
                  </span>
                </p>
              </div>
              <div data-gsap="panduan-tips-col" className="border-l-2 border-[#dedf42]/40 pl-4">
                <h4 className="font-bold text-[#dedf42] mb-1">
                  <span className="hidden md:inline">Akselerasi GPU</span>
                  <span className="md:hidden inline">Performa Halus 60 FPS</span>
                </h4>
                <p className="leading-relaxed">
                  <span className="hidden md:inline">
                    Sistem AI MediaPipe otomatis menggunakan akselerasi WebGL/GPU pada peramban Anda untuk latensi super rendah di 60 FPS.
                  </span>
                  <span className="md:hidden inline">
                    AI MediaPipe mendeteksi tangan langsung di peramban ponsel Anda tanpa perlu unduh aplikasi tambahan, ringan dan hemat baterai.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CALL TO ACTION ── */}
        <div data-gsap="panduan-final-cta" className="pt-10 pb-8 text-center border-t border-black/20">
          <h3 className="font-serif italic font-bold text-3xl sm:text-4xl text-[#050303] mb-4">
            <span className="hidden md:inline">Sudah Memahami Ilmunya? Waktunya Naik ke Panggung.</span>
            <span className="md:hidden inline">Ilmu Sudah di Genggaman. Waktunya Naik ke Panggung.</span>
          </h3>
          <p className="text-black/75 text-sm sm:text-base max-w-xl mx-auto mb-8 font-sans">
            <span className="hidden md:inline">
              Nyalakan kamera Anda, biarkan lampu kelir menyala, dan mulailah melakonkan kisah-kisah adiluhung Nusantara.
            </span>
            <span className="md:hidden inline">
              Buka panggung di ponsel Anda, biarkan api blencong menyala, dan mulailah melakonkan kisah adiluhung pewayangan.
            </span>
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/stage"
              className="px-8 py-3.5 rounded-full bg-black text-[#dedf42] font-sans font-bold text-sm uppercase tracking-wider hover:bg-neutral-800 active:scale-95 transition-all shadow-xl flex items-center gap-2"
            >
              <span className="hidden md:inline">Mulai Mendalang di Panggung</span>
              <span className="md:hidden inline">Mulai Mendalang di HP</span>
              <span className="text-base">&rarr;</span>
            </Link>
            <Link
              href="/"
              className="px-7 py-3.5 rounded-full border border-black/40 text-black font-sans font-bold text-sm uppercase tracking-wider hover:bg-black/10 transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
