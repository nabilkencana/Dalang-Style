'use client';

import React, { useState, useEffect } from 'react';
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
  const [deviceTab, setDeviceTab] = useState<'mobile' | 'desktop'>('desktop');

  // Auto-detect device type on mount and on screen resize
  useEffect(() => {
    const handleDeviceDetect = () => {
      if (typeof window !== 'undefined') {
        const isMobileScreen = window.innerWidth < 768;
        setDeviceTab(isMobileScreen ? 'mobile' : 'desktop');
      }
    };

    handleDeviceDetect();
    window.addEventListener('resize', handleDeviceDetect);
    return () => window.removeEventListener('resize', handleDeviceDetect);
  }, []);

  const handleScrollToGestur = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('gestur-utama');
    if (!target) return;
    if (typeof window !== 'undefined' && (window as unknown as { lenisInstance?: { scrollTo: (t: HTMLElement, opt: object) => void } }).lenisInstance) {
      (window as unknown as { lenisInstance: { scrollTo: (t: HTMLElement, opt: object) => void } }).lenisInstance.scrollTo(target, {
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
      {/* ── Background Watermark Canvas ── */}
      <div className="fixed inset-0 bg-[#dedf42] pointer-events-none -z-10">
        <Image
          src="/images/story-awakening-card-bg.webp"
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
        <div className="pt-10 pb-8 text-center max-w-4xl mx-auto">
          <span data-gsap="panduan-kicker" className="inline-block px-4 py-1.5 rounded-full bg-black text-[#dedf42] text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-sm">
            TUTORIAL & PANDUAN PANGGUNG DALANG
          </span>
          <h1 data-gsap="panduan-title" className="font-serif italic font-bold text-4xl sm:text-6xl lg:text-7xl text-[#050303] leading-[1.02] tracking-tight">
            Seni Mendalang di Ujung Jemari Anda
          </h1>
          <p data-gsap="panduan-subtitle" className="mt-5 text-base sm:text-lg lg:text-xl font-sans text-black/80 leading-relaxed font-normal max-w-2xl mx-auto">
            Pelajari bagaimana kecerdasan buatan dan antarmuka panggung membaca gerak tangan, jemari cempurit, serta sentuhan layar untuk menghidupkan boneka wayang kulit di Panggung Virtual Wayang Jawi.
          </p>

          <div data-gsap="panduan-cta" className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/stage"
              className="px-6 sm:px-8 py-3 rounded-full bg-black text-[#dedf42] font-sans font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-800 active:scale-95 transition-[background-color,transform,box-shadow] duration-200 shadow-lg flex items-center gap-2"
            >
              <span>Buka Panggung Wayang</span>
              <span className="text-base">&rarr;</span>
            </Link>
            <a
              href="#gestur-utama"
              onClick={handleScrollToGestur}
              className="px-6 sm:px-7 py-3 rounded-full border border-black/40 text-black font-sans font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-black/10 active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <span>Pelajari 4 Gestur Inti &darr;</span>
            </a>
          </div>
        </div>

        {/* ── 4 GESTUR UTAMA TANGAN (CARDS) ── */}
        <section id="gestur-utama" className="py-8 scroll-mt-24">
          <div data-gsap="panduan-gestur-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            <h2 className="font-serif italic font-bold text-2xl sm:text-3xl lg:text-4xl text-[#050303]">
              {deviceTab === 'mobile'
                ? 'Empat Gestur Tangan di Depan Kamera Ponsel'
                : 'Empat Gestur Inti Pelacakan AI Tangan (Webcam)'}
            </h2>
            <span className="text-xs font-mono font-bold tracking-widest text-black/60 uppercase">
              {deviceTab === 'mobile' ? 'MODE PONSEL / TABLET' : 'MODE DESKTOP / PC'}
            </span>
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
                  {deviceTab === 'mobile'
                    ? 'Telapak Tangan & Sentuhan Kelir: Posisi Badan'
                    : 'Gerak Batang Gapit Utama & Kursor Mouse'}
                </h3>
                <p className="text-black/80 text-sm sm:text-base leading-relaxed font-sans font-normal mb-5">
                  {deviceTab === 'mobile'
                    ? 'Pusat telapak tangan Anda di depan kamera depan atau sentuhan langsung jari di layar HP memandu koordinat tubuh wayang di atas kelir panggung.'
                    : 'Posisi titik tengah telapak tangan (*palm center*) atau drag kursor mouse langsung memandu koordinat posisi tubuh wayang di atas kain kelir.'}
                </p>
                <div className="space-y-2 text-xs sm:text-sm font-sans text-black/85">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-black">•</span>
                    <span><strong>Geser Kiri/Kanan:</strong> Wayang melangkah melintasi layar panggung {deviceTab === 'mobile' ? 'ponsel' : 'lebar'}.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-black">•</span>
                    <span><strong>Angkat/Turunkan:</strong> Wayang melompat terbang atau menunduk dalam sikap sembah takzim.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-black">•</span>
                    <span>
                      {deviceTab === 'mobile'
                        ? 'Sentuh & Drag: Anda juga dapat menyentuh dan menggeser langsung wayang di layar kelir HP.'
                        : 'Miringkan Telapak: Condongkan badan wayang secara dinamis saat adegan terbang atau perang tanding.'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-black/20 text-[11px] font-mono text-black/60 uppercase tracking-wider">
                {deviceTab === 'mobile'
                  ? 'Sensor Ponsel: Deteksi 21 titik sendi kamera potret tanpa distorsi (anti-gepeng)'
                  : 'Sensor Webcam: Deteksi 21 titik sendi telapak tangan & pergelangan'}
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
                  {deviceTab === 'mobile'
                    ? 'Ibu Jari & Telunjuk: Tuding Lengan di HP'
                    : 'Gerak Tangkai Cempurit & Siku Wayang'}
                </h3>
                <p className="text-black/80 text-sm sm:text-base leading-relaxed font-sans font-normal mb-5">
                  {deviceTab === 'mobile'
                    ? 'Jemari Anda menggantikan bilah cempurit tanduk kerbau. Kamera depan HP membaca sudut jemari untuk mengartikulasikan lengan wayang secara presisi.'
                    : 'Ujung jari jemari Anda menggantikan batang tangkai cempurit tanduk kerbau yang biasa dipegang dalang profesional di balik layar kelir.'}
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
                {deviceTab === 'mobile'
                  ? 'Kamera Depan HP: Jarak nyaman tangan 40–70 cm dari layar ponsel'
                  : 'Sensitivitas Lengan: Dapat disetel di menu Pengaturan (Split / Klasik)'}
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
                    {deviceTab === 'mobile' ? 'KELINGKING / TOMBOL D' : 'PINKY SIGN / TOMBOL [D]'}
                  </span>
                </div>

                {/* Visual Illustration */}
                <div className="mb-5">
                  <Gesture03Visual />
                </div>

                <h3 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#050303] mb-3">
                  {deviceTab === 'mobile'
                    ? 'Kelingking & Tombol [D]: Tari Kiprah di HP'
                    : 'Pemicu Tari Kiprahan Sakral Otomatis'}
                </h3>
                <p className="text-black/80 text-sm sm:text-base leading-relaxed font-sans font-normal mb-5">
                  {deviceTab === 'mobile'
                    ? 'Tegakkan jari kelingking ke atas di depan kamera HP atau ketuk tombol [D] Tari Kiprah di bar bawah panggung HP untuk memicu tarian dinamis.'
                    : 'Acungkan jari kelingking Anda tegak ke atas atau tekan tombol keyboard [D] untuk memicu gerakan tari dinamis penari keraton secara seketika.'}
                </p>
                <div className="space-y-2 text-xs sm:text-sm font-sans text-black/85">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-black">•</span>
                    <span><strong>Pose Kelingking:</strong> Sensor AI mendeteksi pose jari sakral penari keraton Jawa.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-black">•</span>
                    <span><strong>Gerak Tubuh Berirama:</strong> Boneka wayang bergoyang luwes mengikuti pola tari kiprah klasik.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-black">•</span>
                    <span>
                      {deviceTab === 'mobile'
                        ? 'Tombol Cepat HP: Tombol [D] di HUD bawah ponsel langsung mengaktifkan tari kiprah.'
                        : 'Selaras Gamelan: Gerakan diselaraskan dengan tabuhan kendang pengiring.'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-black/20 text-[11px] font-mono text-black/60 uppercase tracking-wider">
                {deviceTab === 'mobile'
                  ? 'Aksi Cepat HP: Ketuk tombol [D] di bar kontrol bawah panggung ponsel'
                  : 'Pintasan Keyboard: Tekan tombol [ D ] di keyboard'}
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
                    {deviceTab === 'mobile' ? 'JARAK KE LAYAR HP' : 'JARAK WEBCAM / MOUSE WHEEL'}
                  </span>
                </div>

                {/* Visual Illustration */}
                <div className="mb-5">
                  <Gesture04Visual />
                </div>

                <h3 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#050303] mb-3">
                  {deviceTab === 'mobile'
                    ? 'Jarak Tangan ke HP: Bayangan Api Blencong'
                    : 'Efek Kedalaman & Bayangan Kelir Blencong'}
                </h3>
                <p className="text-black/80 text-sm sm:text-base leading-relaxed font-sans font-normal mb-5">
                  {deviceTab === 'mobile'
                    ? 'Maju-mundurkan tangan Anda di hadapan kamera HP untuk mengatur ketajaman bayangan siluet wayang di layar kelir virtual.'
                    : 'Dalam pakeliran wayang kulit asli, jarak boneka terhadap api blencong menentukan ketajaman siluet bayangan di kain kelir.'}
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
                    <span>
                      {deviceTab === 'mobile'
                        ? 'Api Blencong Digital: Nyala api minyak kelapa berkedip hidup di latar belakang panggung HP.'
                        : 'Scroll Wheel Mouse: Putar roda mouse untuk mengatur kedalaman secara manual.'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-black/20 text-[11px] font-mono text-black/60 uppercase tracking-wider">
                {deviceTab === 'mobile'
                  ? 'Responsif Layar Ponsel: Skala wayang menyesuaikan proporsi layar HP secara otomatis'
                  : 'Kontrol Desktop: Kombinasi AI tracking dan scroll wheel mouse'}
              </div>
            </div>
          </div>
        </section>

        {/* ── DUA MODE PERTUNJUKAN ── */}
        <section data-gsap="panduan-mode-section" className="py-12 border-t border-black/20">
          <div data-gsap="panduan-mode-header" className="flex items-center gap-3 mb-6">
            <span className="w-3 h-3 rounded-full bg-black shrink-0" />
            <h2 className="font-serif italic font-bold text-2xl sm:text-3xl lg:text-4xl text-[#050303]">
              Dua Mode Karakter Panggung Wayang
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
                  Mode Duo (2 Tangan = 2 Tokoh Berhadapan)
                </h3>
                <p className="text-black/80 text-sm leading-relaxed mb-4">
                  Sangat ideal untuk adegan dialog sakral, wejangan batin, atau pertempuran dua satria:
                </p>
                <ul className="text-xs sm:text-sm space-y-2 text-black/85">
                  <li>• <strong>Tangan Kiri Dalang:</strong> Mengendalikan tokoh di sisi kiri panggung kelir.</li>
                  <li>• <strong>Tangan Kanan Dalang:</strong> Mengendalikan tokoh di sisi kanan panggung kelir.</li>
                  <li>• <strong>Otomatis Berhadapan:</strong> Kedua tokoh otomatis menatap satu sama lain saat saling mendekat.</li>
                  {deviceTab === 'desktop' ? (
                    <li>• <strong>Pintasan Keyboard:</strong> Tekan tombol <kbd className="px-1.5 py-0.5 rounded bg-black text-[#dedf42] font-mono text-xs">2</kbd> di keyboard untuk beralih instan.</li>
                  ) : (
                    <li>• <strong>Tombol Sentuh HP:</strong> Ketuk tombol <span className="font-mono font-bold bg-black text-[#dedf42] px-1.5 py-0.5 rounded text-xs">1 / 2</span> di bar bawah layar untuk beralih mode.</li>
                  )}
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
                  Mode Solo (2 Tangan = 1 Tokoh Bebas Artikulatif)
                </h3>
                <p className="text-black/80 text-sm leading-relaxed mb-4">
                  Kendalikan satu tokoh wayang dengan kebebasan artikulasi gerak penuh menggunakan kedua tangan Anda:
                </p>
                <ul className="text-xs sm:text-sm space-y-2 text-black/85">
                  <li>• <strong>Tangan Kiri Dalang:</strong> Mengendalikan lengan kiri wayang (Tuding Kiwa) secara bebas dan luas.</li>
                  <li>• <strong>Tangan Kanan Dalang:</strong> Mengendalikan lengan kanan wayang (Tuding Tengen) secara bebas dan luas.</li>
                  <li>• <strong>Gerak Badan Otomatis:</strong> Poros tubuh wayang luwes melangkah mengikuti titik tengah (midpoint) kedua tangan Anda.</li>
                  <li>• <strong>Kemiringan Dinamis:</strong> Tubuh wayang otomatis condong saat satu tangan diangkat tinggi (pose silat/serang).</li>
                  {deviceTab === 'desktop' ? (
                    <li>• <strong>Pintasan Keyboard:</strong> Tekan tombol <kbd className="px-1.5 py-0.5 rounded bg-black text-[#dedf42] font-mono text-xs">1</kbd> di keyboard untuk beralih instan.</li>
                  ) : (
                    <li>• <strong>Tombol Sentuh HP:</strong> Ketuk tombol mode di layar ponsel untuk mengaktifkan kendali solo.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── KENDALI PANGGUNG: MOBILE TOUCH HUD VS DESKTOP HOTKEYS (PERFECTLY ALIGNED) ── */}
        <section data-gsap="panduan-hotkey-section" className="py-12 border-t border-black/20">
          <div data-gsap="panduan-hotkey-header">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-3 h-3 rounded-full bg-black shrink-0" />
              <h2 className="font-serif italic font-bold text-2xl sm:text-3xl lg:text-4xl text-[#050303]">
                {deviceTab === 'mobile'
                  ? 'Pusat Kendali & Tombol HUD di Panggung Ponsel'
                  : 'Pintasan Keyboard & Kontrol Panggung Desktop'}
              </h2>
            </div>
            <p className="text-black/70 text-sm mb-8 font-sans">
              {deviceTab === 'mobile'
                ? 'Semua tombol dan fitur berikut tersedia langsung di panggung ponsel (HUD bawah, pojok atas, dan panel pengaturan):'
                : 'Gunakan tombol-tombol pintasan berikut di keyboard saat berada di panggung untuk kendali instan:'}
            </p>
          </div>

          {deviceTab === 'mobile' ? (
            /* ── MOBILE: Kartu Kendali Sentuh Layar HP (Sesuaikan 100% dengan sesi mobile stage) ── */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
              {[
                {
                  badge: '1 / 2',
                  tag: 'HUD BAWAH',
                  label: 'Mode 1 / 2 Wayang',
                  desc: 'Beralih instan antara mode Solo (2 tangan = 1 wayang artikulatif) atau Duo (2 tangan = 2 wayang).',
                },
                {
                  badge: 'D',
                  tag: 'HUD BAWAH',
                  label: 'Tari Kiprah',
                  desc: 'Tombol tap cepat untuk memicu tarian sakral kiprahan rancak seketika tanpa perlu gestur kelingking.',
                },
                {
                  badge: 'F / G',
                  tag: 'HUD BAWAH',
                  label: 'Balik Arah Hadap',
                  desc: 'Tombol F untuk membalik arah hadap tokoh kiri, dan tombol G untuk membalik arah hadap tokoh kanan.',
                },
                {
                  badge: '🎭',
                  tag: 'POJOK ATAS',
                  label: 'Lemari Tokoh Wayang',
                  desc: 'Membuka modal pemilihan tokoh Slot Kiri & Kanan dengan pratinjau wayang berengsel lengkap dengan kedua tangan.',
                },
                {
                  badge: '🔊',
                  tag: 'POJOK ATAS',
                  label: 'Musik Gamelan',
                  desc: 'Putar atau bisukan tabuhan gending gamelan Slendro Manyura pengiring panggung pewayangan.',
                },
                {
                  badge: '⚙',
                  tag: 'POJOK ATAS',
                  label: 'Menu Pengaturan',
                  desc: 'Buka panel pengaturan bergulir (scrollable) untuk ukuran wayang, jari tuding, arah hadap, dan volume.',
                },
                {
                  badge: 'C',
                  tag: 'HUD BAWAH',
                  label: 'Kalibrasi Sensor AI',
                  desc: 'Setel ulang kalibrasi titik nol sensor tangan bila gerakan wayang terasa melenceng dari frame kamera.',
                },
                {
                  badge: 'H',
                  tag: 'HUD BAWAH',
                  label: 'Sembunyikan UI',
                  desc: 'Sembunyikan seluruh tombol antarmuka untuk menikmati panggung bersih atau perekaman video pertunjukan.',
                },
                {
                  badge: 'V',
                  tag: 'HUD BAWAH',
                  label: 'Pratinjau Kamera',
                  desc: 'Tampilkan atau sembunyikan kotak pratinjau kamera depan potret anti-gepeng di sudut panggung.',
                },
                {
                  badge: '👆',
                  tag: 'LAYAR KELIR',
                  label: 'Sentuhan Langsung',
                  desc: 'Geser langsung tubuh wayang di atas kain kelir HP dengan sentuhan jari tanpa memerlukan kamera depan.',
                },
              ].map((action, idx) => (
                <div
                  key={idx}
                  data-gsap="panduan-touch-card"
                  className="h-full flex flex-col justify-between p-4 rounded-xl bg-black text-[#dedf42] border border-black/20 shadow-md hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#dedf42]/15">
                    <span className="w-10 h-8 rounded-lg bg-[#dedf42] text-black font-mono font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-sm">
                      {action.badge}
                    </span>
                    <span className="text-[9px] font-mono tracking-widest text-[#dedf42]/90 uppercase px-2 py-0.5 rounded-full bg-white/10">
                      {action.tag}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-start">
                    <h4 className="font-sans font-bold text-sm sm:text-base text-white mb-1.5 leading-snug">
                      {action.label}
                    </h4>
                    <p className="text-white/70 text-xs sm:text-[13px] leading-relaxed">
                      {action.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ── DESKTOP: Tabel Hotkeys Keyboard & Mouse (Sesuaikan 100% dengan sesi desktop stage) ── */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-stretch">
              {[
                { key: '1', label: 'Mode Solo (1 Tokoh)', tag: 'HOTKEY', desc: 'Dua tangan bebas (Kiri = Lengan Kiri, Kanan = Lengan Kanan).' },
                { key: '2', label: 'Mode Duo (2 Tokoh)', tag: 'HOTKEY', desc: '1 Tangan = 1 Tokoh panggung berhadapan.' },
                { key: 'F', label: 'Balik Tokoh Kiri', tag: 'HOTKEY', desc: 'Membalik arah hadap tokoh sisi kiri panggung.' },
                { key: 'G', label: 'Balik Tokoh Kanan', tag: 'HOTKEY', desc: 'Membalik arah hadap tokoh sisi kanan panggung.' },
                { key: 'D', label: 'Tari Kiprahan', tag: 'HOTKEY', desc: 'Memicu gerakan tarian sakral kiprahan secara instan.' },
                { key: 'M', label: 'Musik Gamelan', tag: 'HOTKEY', desc: 'Putar atau bisukan tabuhan musik latar gamelan.' },
                { key: 'H', label: 'Clean Mode (UI)', tag: 'HOTKEY', desc: 'Sembunyikan / munculkan tombol antarmuka panggung.' },
                { key: 'C', label: 'Kalibrasi Ulang', tag: 'HOTKEY', desc: 'Reset titik nol sensor tangan & AI pelacakan.' },
                { key: 'P', label: 'Pisah Jendela Kamera', tag: 'HOTKEY', desc: 'Buka pratinjau kamera di jendela pop-out terpisah.' },
                { key: 'V', label: 'Pratinjau Kamera', tag: 'HOTKEY', desc: 'Tampilkan / sembunyikan kotak kamera di panggung.' },
              ].map((hk) => (
                <div
                  key={hk.key}
                  data-gsap="panduan-hotkey-card"
                  className="h-full flex flex-col justify-between p-4 rounded-xl bg-black text-[#dedf42] border border-black/20 shadow-md hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#dedf42]/15">
                    <span className="w-8 h-8 rounded-lg bg-[#dedf42] text-black font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                      {hk.key}
                    </span>
                    <span className="text-[9px] font-mono tracking-widest text-[#dedf42]/90 uppercase px-2 py-0.5 rounded-full bg-white/10">
                      {hk.tag}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-start">
                    <h4 className="font-sans font-bold text-sm text-white mb-1.5 leading-snug">
                      {hk.label}
                    </h4>
                    <p className="text-white/70 text-xs leading-relaxed">
                      {hk.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── TIPS OPTIMALISASI RUANGAN & KAMERA ── */}
        <section className="py-12 border-t border-black/20">
          <div data-gsap="panduan-tips-box" className="bg-[#140e0a] text-[#dedf42] rounded-3xl p-8 sm:p-10 shadow-2xl border border-black/50">
            <span className="text-xs font-mono font-bold tracking-widest text-[#dedf42]/70 uppercase block mb-2">
              TIPS & REKOMENDASI PERFORMA ({deviceTab === 'mobile' ? 'PONSEL' : 'DESKTOP'})
            </span>
            <h3 className="font-serif italic font-bold text-2xl sm:text-3xl text-white mb-6">
              {deviceTab === 'mobile'
                ? 'Tips Menata Ponsel untuk Respon Gerak Terbaik'
                : 'Optimalisasi Ruangan & Webcam untuk Respon Gerak Terbaik'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-[#f4e7cd]/80 font-sans">
              <div data-gsap="panduan-tips-col" className="border-l-2 border-[#dedf42]/40 pl-4">
                <h4 className="font-bold text-[#dedf42] mb-1">
                  {deviceTab === 'mobile' ? 'Cahaya Depan Terang' : 'Pencahayaan Depan'}
                </h4>
                <p className="leading-relaxed">
                  {deviceTab === 'mobile'
                    ? 'Pastikan ruangan terang dan cahaya menyinari tangan dari arah depan ponsel. Hindari membelakangi jendela atau lampu terang (backlight).'
                    : 'Pastikan tangan Anda tersinari dari arah depan atau samping. Hindari cahaya lampu yang terlalu terang persis di belakang tubuh (backlight).'}
                </p>
              </div>
              <div data-gsap="panduan-tips-col" className="border-l-2 border-[#dedf42]/40 pl-4">
                <h4 className="font-bold text-[#dedf42] mb-1">
                  {deviceTab === 'mobile' ? 'Sandaran HP Stabil (40–70 cm)' : 'Jarak Ideal Webcam (60–100 cm)'}
                </h4>
                <p className="leading-relaxed">
                  {deviceTab === 'mobile'
                    ? 'Sandarkan ponsel di meja atau dudukan (stand) setinggi dada. Jaga jarak tangan sekitar 40–70 cm agar seluruh jemari tertangkap frame kamera depan.'
                    : 'Duduk dengan jarak sekitar 60 cm hingga 1 meter dari kamera agar seluruh telapak dan pergelangan tangan tertangkap penuh dalam frame 16:9.'}
                </p>
              </div>
              <div data-gsap="panduan-tips-col" className="border-l-2 border-[#dedf42]/40 pl-4">
                <h4 className="font-bold text-[#dedf42] mb-1">
                  {deviceTab === 'mobile' ? 'Performa Halus 60 FPS di HP' : 'Akselerasi GPU & WebGL'}
                </h4>
                <p className="leading-relaxed">
                  {deviceTab === 'mobile'
                    ? 'AI MediaPipe mendeteksi tangan langsung di peramban ponsel tanpa aplikasi tambahan, sangat ringan, responsif, dan hemat baterai.'
                    : 'Sistem AI MediaPipe otomatis memanfaatkan akselerasi WebGL/GPU kartu grafis untuk latensi super rendah di 60 FPS.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CALL TO ACTION ── */}
        <div data-gsap="panduan-final-cta" className="pt-10 pb-8 text-center border-t border-black/20">
          <h3 className="font-serif italic font-bold text-3xl sm:text-4xl text-[#050303] mb-4">
            Ilmu Sudah di Genggaman. Waktunya Naik ke Panggung.
          </h3>
          <p className="text-black/75 text-sm sm:text-base max-w-xl mx-auto mb-8 font-sans">
            Buka panggung di perangkat Anda, biarkan nyala api blencong bersinar, dan mulailah melakonkan kisah adiluhung pewayangan Nusantara.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/stage"
              className="px-8 py-3.5 rounded-full bg-black text-[#dedf42] font-sans font-bold text-sm uppercase tracking-wider hover:bg-neutral-800 active:scale-95 transition-all shadow-xl flex items-center gap-2"
            >
              <span>Mulai Mendalang di Panggung</span>
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


