import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Sparkles,
  ShieldCheck,
  Cpu,
  Heart,
  ExternalLink,
  Code2,
  BookOpen,
  ArrowRight,
  Globe2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kredit & Tentang Kita | Wayang Jawi',
  description:
    'Mengenal visi, kreator, tim pengembang, teknologi AI, dan para penasihat budaya di balik platform panggung digital Wayang Jawi.',
};

const TEAM_CREDITS = [
  {
    role: 'Konsep & Arsitektur Sistem',
    name: 'Tim Pengembang Wayang Jawi',
    description:
      'Perancangan alur interaktif, arsitektur panggung digital Next.js, dan integrasi pementasan teatrikal wayang kulit.',
    icon: Code2,
  },
  {
    role: 'Computer Vision & AI Tracking',
    name: 'MediaPipe Vision AI Integration',
    description:
      'Implementasi pelacakan sendi tangan dan lengan (pose tracking) secara real-time untuk kendali interaktif boneka wayang.',
    icon: Cpu,
  },
  {
    role: 'Desain Pengalaman Pengguna (UI/UX)',
    name: 'Atelier Visual Teatrikal',
    description:
      'Harmonisasi estetika panggung tradisional Jawa, tipografi Playfair Display, dan animasi motion interaktif.',
    icon: Sparkles,
  },
  {
    role: 'Kajian & Riset Pewayangan',
    name: 'Dokumentasi Naskah & Tokoh',
    description:
      'Penyusunan naskah wiracarita, filosofi simbolik gunungan, dan watak adiluhung para satria pewayangan Jawa.',
    icon: BookOpen,
  },
];

const ACKNOWLEDGEMENTS = [
  {
    institution: 'UNESCO ICH (Intangible Cultural Heritage)',
    detail: 'Wayang Puppet Theatre: Masterpiece of the Oral and Intangible Heritage of Humanity (Proklamasi 2003 / Inskripsi 2008).',
    href: 'https://ich.unesco.org/en/RL/wayang-puppet-theatre-00063',
  },
  {
    institution: 'Sekretariat Nasional Wayang Indonesia (SENAWANGI)',
    detail: 'Rujukan tata krama pakeliran, gaya gagrag pewayangan Surakarta & Yogyakarta, serta pelestarian wayang kulit.',
    href: 'https://www.youtube.com/@SENAWANGICHANNEL',
  },
  {
    institution: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI',
    detail: 'Arsip dan publikasi resmi mengenai nilai filosofis, sejarah gamelan, dan warisan budaya takbenda Indonesia.',
    href: 'https://itjen.kemendikdasmen.go.id/web/?p=8640',
  },
  {
    institution: 'Kompas.com Budaya Nusantara',
    detail: 'Dokumentasi narasi sejarah, makna simbolik Gunungan Wayang Kulit, dan kisah para tokoh wiracarita Jawa.',
    href: 'https://regional.kompas.com/read/2022/02/02/180653778/sejarah-dan-filosofi-gunungan-wayang-kulit-digunakan-dalam-uang-logam',
  },
];

const TECH_STACK = [
  { name: 'Next.js 16 (App Router)', desc: 'Fondasi framework modern & render statis berkinerja tinggi' },
  { name: 'Motion / React & GSAP', desc: 'Fisika animasi 3D, flip card, scroll reveal, dan marquee dinamis' },
  { name: 'MediaPipe Vision AI', desc: 'Computer vision pelacakan gestur tangan tanpa perangkat keras khusus' },
  { name: 'Tailwind CSS', desc: 'Sistem desain responsif bernuansa panggung teatrikal klasik modern' },
  { name: 'Playfair Display & Inter', desc: 'Tipografi sastra Jawa berwibawa berpadu keterbacaan modern' },
  { name: 'Lucide Icons', desc: 'Ikonografi tematik yang merefleksikan pusaka dan sifat kepribadian wayang' },
];

export default function KreditPage() {
  return (
    <div className="relative min-h-screen bg-[#dedf42] text-black overflow-x-clip selection:bg-black selection:text-[#dedf42] font-sans">
      {/* Ambient Canvas Lighting & Background Pattern */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-80"
        style={{
          background: 'radial-gradient(circle at 75% 20%, #e8e84d 0%, #dedf42 55%, #cfd033 100%)',
        }}
      />
      <div className="fixed inset-0 bg-repeat opacity-[0.04] pointer-events-none z-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Main Content with top clearance for the floating global notch navbar */}
      <main className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-24 space-y-16 sm:space-y-24">
        {/* Back Link */}
        <div className="max-w-4xl mx-auto flex items-center justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-bold tracking-wider text-black/80 hover:text-black uppercase transition-colors group"
          >
            <span className="text-base group-hover:-translate-x-1 transition-transform">←</span>
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
        {/* Hero Banner */}
        <section className="text-center flex flex-col items-center max-w-4xl mx-auto">
          <p className="text-black/60 text-lg sm:text-2xl font-serif tracking-[0.3em] mb-3 select-none">
            ꦠꦼꦤ꧀ꦠꦁꦏꦶꦠ • ꦏꦿꦺꦢꦶꦠ꧀
          </p>

          <span className="px-4 py-1 rounded-full border border-black/30 bg-black/5 text-[10px] sm:text-xs font-sans font-bold tracking-[0.25em] uppercase mb-4">
            KARYA INOVASI & PELESTARIAN BUDAYA
          </span>

          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-black tracking-tight leading-[1.05]">
            Tentang Wayang Jawi & Kredit Pengembang
          </h1>

          <p className="text-sm sm:text-base md:text-lg font-sans text-black/85 max-w-2xl mt-6 leading-relaxed">
            Wayang Jawi lahir dari sebuah cita-cita: menjembatani warisan adiluhung wayang kulit Nusantara yang telah berusia berabad-abad dengan teknologi kecerdasan buatan dan interaktivitas digital. Tradisi tidak boleh berhenti di masa lalu, melainkan terus hidup, berkembang, dan menginspirasi masa kini.
          </p>
        </section>

        {/* 3. Three Pillars Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-6 sm:p-8 rounded-2xl border border-black/25 bg-black/[0.04] backdrop-blur-sm flex flex-col justify-between shadow-sm">
            <div>
              <div className="size-10 rounded-full border border-black/30 bg-black text-[#dedf42] flex items-center justify-center mb-5 shadow-sm">
                <Globe2 className="size-5" />
              </div>
              <p className="text-[10px] font-sans font-bold tracking-[0.25em] text-black/60 uppercase mb-1">
                PILAR 01
              </p>
              <h3 className="font-playfair text-xl sm:text-2xl font-normal text-black mb-3">
                Warisan Dunia UNESCO
              </h3>
              <p className="text-xs sm:text-sm text-black/80 font-sans leading-relaxed">
                Mengangkat wayang kulit sebagai Mahakarya Warisan Kemanusiaan Lisan dan Takbenda Dunia ke dalam kanvas digital interaktif.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl border border-black/25 bg-black/[0.04] backdrop-blur-sm flex flex-col justify-between shadow-sm">
            <div>
              <div className="size-10 rounded-full border border-black/30 bg-black text-[#dedf42] flex items-center justify-center mb-5 shadow-sm">
                <Cpu className="size-5" />
              </div>
              <p className="text-[10px] font-sans font-bold tracking-[0.25em] text-black/60 uppercase mb-1">
                PILAR 02
              </p>
              <h3 className="font-playfair text-xl sm:text-2xl font-normal text-black mb-3">
                Computer Vision AI
              </h3>
              <p className="text-xs sm:text-sm text-black/80 font-sans leading-relaxed">
                Memungkinkan siapapun menjadi dalang secara langsung menggunakan kamera dan pelacakan sendi tangan real-time tanpa perangkat khusus.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl border border-black/25 bg-black/[0.04] backdrop-blur-sm flex flex-col justify-between shadow-sm">
            <div>
              <div className="size-10 rounded-full border border-black/30 bg-black text-[#dedf42] flex items-center justify-center mb-5 shadow-sm">
                <ShieldCheck className="size-5" />
              </div>
              <p className="text-[10px] font-sans font-bold tracking-[0.25em] text-black/60 uppercase mb-1">
                PILAR 03
              </p>
              <h3 className="font-playfair text-xl sm:text-2xl font-normal text-black mb-3">
                Wiracarita & Filosofi
              </h3>
              <p className="text-xs sm:text-sm text-black/80 font-sans leading-relaxed">
                Menyajikan ensiklopedia watak tokoh, pusaka sakti, dan ajaran moral pewayangan dalam format visual modern yang mudah dipahami.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Team Credits */}
        <section className="space-y-8">
          <div className="border-b border-black/20 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="text-xs font-sans font-bold tracking-[0.25em] uppercase text-black/70">
                PENGEMBANG & KREATOR
              </p>
              <h2 className="font-playfair text-3xl sm:text-4xl text-black font-normal mt-1">
                Kredit Tim Proyek
              </h2>
            </div>
            <p className="text-xs text-black/70 font-sans">
              Kolaborasi teknologi, seni grafis, dan pelestarian budaya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TEAM_CREDITS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-black/20 bg-black/[0.03] hover:bg-black/[0.06] transition-all flex items-start gap-4 shadow-sm"
                >
                  <div className="size-11 rounded-xl bg-black text-[#dedf42] flex items-center justify-center shrink-0 shadow-md">
                    <Icon className="size-5" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-black/60 block mb-0.5">
                      {item.role}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-black mb-1.5">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-black/80 font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Tech Stack */}
        <section className="space-y-6">
          <div className="border-b border-black/20 pb-4">
            <p className="text-xs font-sans font-bold tracking-[0.25em] uppercase text-black/70">
              ARSITEKTUR & PERANGKAT LUNAK
            </p>
            <h2 className="font-playfair text-3xl sm:text-4xl text-black font-normal mt-1">
              Teknologi Terbuka
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {TECH_STACK.map((tech, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl border border-black/20 bg-black/[0.03] flex flex-col justify-between"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="size-2 rounded-full bg-black shrink-0" />
                  <h4 className="font-sans font-bold text-sm text-black">
                    {tech.name}
                  </h4>
                </div>
                <p className="text-xs text-black/75 font-sans leading-relaxed">
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Cultural Acknowledgements */}
        <section className="space-y-6">
          <div className="border-b border-black/20 pb-4">
            <p className="text-xs font-sans font-bold tracking-[0.25em] uppercase text-black/70">
              REFERENSI & SUMBER ILMIAH
            </p>
            <h2 className="font-playfair text-3xl sm:text-4xl text-black font-normal mt-1">
              Ucapan Terima Kasih & Rujukan Budaya
            </h2>
          </div>

          <div className="space-y-3.5">
            {ACKNOWLEDGEMENTS.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 sm:p-5 rounded-xl border border-black/20 bg-black/[0.03] hover:bg-black hover:text-[#dedf42] group transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 block"
              >
                <div className="flex-1">
                  <h4 className="font-serif font-bold text-sm sm:text-base text-black group-hover:text-[#dedf42] transition-colors flex items-center gap-2">
                    <span>{item.institution}</span>
                    <ExternalLink className="size-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-xs text-black/75 group-hover:text-[#dedf42]/85 font-sans mt-1 leading-relaxed transition-colors">
                    {item.detail}
                  </p>
                </div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-black/60 group-hover:text-[#dedf42] shrink-0 flex items-center gap-1">
                  <span>Lihat Sumber</span>
                  <span>↗</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* 7. Bottom Call to Action */}
        <section className="p-8 sm:p-12 md:p-16 rounded-3xl border-2 border-black bg-black text-[#dedf42] text-center flex flex-col items-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center space-y-4">
            <span className="px-3.5 py-1 rounded-full border border-[#dedf42]/40 bg-[#dedf42]/10 text-xs font-sans font-bold tracking-widest uppercase">
              MULAI SEKARANG
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-white">
              Siap Mencoba Menjadi Dalang Digital?
            </h2>
            <p className="text-xs sm:text-sm text-[#f4e7cd]/80 font-sans leading-relaxed max-w-lg">
              Gerakkan tangan Anda di depan kamera dan saksikan boneka wayang kulit berespons langsung terhadap gestur Anda.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
              <Link
                href="/stage"
                className="px-7 py-3 rounded-full bg-[#dedf42] text-black font-sans font-bold text-xs uppercase tracking-wider hover:bg-white active:scale-95 transition-all shadow-lg flex items-center gap-2"
              >
                <span>Buka Panggung Digital</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/katalog"
                className="px-7 py-3 rounded-full border border-[#dedf42]/40 bg-black text-[#dedf42] font-sans font-bold text-xs uppercase tracking-wider hover:bg-[#dedf42] hover:text-black active:scale-95 transition-all"
              >
                Jelajahi Tokoh Wayang
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
