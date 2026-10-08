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
import TeamInteractiveSection from '@/components/views/TeamInteractiveSection';
import { SuperHoverList, type SuperHoverListItem } from '@/components/ui/super-hover-list';
import { LogoCloud, type Logo } from '@/components/ui/logo-cloud';

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

const WAYANG_ECOSYSTEM_LOGOS: Logo[] = [
  {
    name: 'UNESCO ICH',
    alt: 'UNESCO World Heritage Logo',
    category: 'Warisan Dunia',
    href: 'https://ich.unesco.org/en/RL/wayang-puppet-theatre-00063',
    icon: (
      <svg viewBox="0 0 171 159" className="size-8 sm:size-9 md:size-10 shrink-0" fill="#0069b4">
        <path d="M85.5 0L0 44.5h171L85.5 0zM12 55.5h147v12H12v-12zm7 23h16v56H19v-56zm32 0h16v56H51v-56zm32 0h16v56H83v-56zm32 0h16v56h-16v-56zm32 0h16v56h-16v-56zM0 145.5h171V159H0v-13.5z" />
      </svg>
    ),
  },
  {
    name: 'SENAWANGI',
    alt: 'SENAWANGI Wayang Indonesia Logo',
    category: 'Pedalangan Tradisi',
    href: 'https://www.youtube.com/@SENAWANGICHANNEL',
    src: '/images/logo-senawangi-clean.webp',
  },
  {
    name: 'Kemendikbudristek',
    alt: 'Kemendikbudristek RI Logo',
    category: 'Pemerintah RI',
    href: 'https://itjen.kemendikdasmen.go.id/web/?p=8640',
    src: '/images/logo-kemendikbud.svg',
  },
  {
    name: 'SMK Telkom Malang',
    alt: 'SMK Telkom Malang Moklet Official Logo',
    category: 'Almamater Kreator',
    href: 'https://smktelkom-mlg.sch.id/',
    src: '/images/logo-smk-telkom-malang.webp',
  },
  {
    name: 'Next.js 16',
    alt: 'Next.js by Vercel Logo',
    category: 'App Router',
    href: 'https://nextjs.org/',
    icon: (
      <svg viewBox="0 0 180 180" className="size-8 sm:size-9 md:size-10 shrink-0" fill="none">
        <circle cx="90" cy="90" r="90" fill="#000000" />
        <path d="M149.508 157.438L69.1417 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z" fill="url(#g-next-e1)" />
        <path d="M115 54H127V126H115V54Z" fill="url(#g-next-e2)" />
        <defs>
          <linearGradient id="g-next-e1" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="g-next-e2" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Google MediaPipe',
    alt: 'Google MediaPipe AI Logo',
    category: 'Vision AI',
    href: 'https://developers.google.com/mediapipe',
    icon: (
      <svg viewBox="0 0 24 24" className="size-8 sm:size-9 md:size-10 shrink-0">
        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.25 21.36 7.33 24 12 24z" />
        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    alt: 'Tailwind CSS Logo',
    category: 'Design System',
    href: 'https://tailwindcss.com/',
    icon: (
      <svg viewBox="0 0 24 24" className="size-8 sm:size-9 md:size-10 shrink-0 text-[#06b6d4]" fill="currentColor">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
      </svg>
    ),
  },
  {
    name: 'Three.js',
    alt: 'Three.js 3D WebGL Logo',
    category: 'WebGL 3D',
    href: 'https://threejs.org/',
    icon: (
      <svg viewBox="0 0 24 24" className="size-8 sm:size-9 md:size-10 shrink-0" fill="currentColor">
        <path d="M12 2l9 16H3l9-16zm0 4.5L6.5 16h11L12 6.5z" />
      </svg>
    ),
  },
  {
    name: 'GSAP Motion',
    alt: 'GreenSock Animation Platform Logo',
    category: 'Motion Physics',
    href: 'https://gsap.com/',
    icon: (
      <svg viewBox="0 0 24 24" className="size-8 sm:size-9 md:size-10 shrink-0 text-[#88ce02]" fill="currentColor">
        <path d="M7 2v11h3v9l7-12h-4l4-8H7z" />
      </svg>
    ),
  },
  {
    name: 'Framer Motion',
    alt: 'Framer Motion Logo',
    category: 'Motion UI',
    href: 'https://framer.com/motion',
    icon: (
      <svg viewBox="0 0 24 24" className="size-8 sm:size-9 md:size-10 shrink-0 text-[#0055ff]" fill="currentColor">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    ),
  },
  {
    name: 'Lucide Icons',
    alt: 'Lucide Icons Logo',
    category: 'Ikonografi',
    href: 'https://lucide.dev/',
    icon: (
      <svg viewBox="0 0 24 24" className="size-8 sm:size-9 md:size-10 shrink-0 text-[#f56565]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h4v4" />
        <path d="m14 10 6-6" />
        <path d="M8 20H4v-4" />
        <path d="m10 14-6 6" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    alt: 'GitHub Open Source Logo',
    category: 'Open Source',
    href: 'https://github.com/',
    icon: (
      <svg viewBox="0 0 24 24" className="size-8 sm:size-9 md:size-10 shrink-0" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
];

const ACKNOWLEDGEMENTS = [
  {
    institution: 'UNESCO ICH (Intangible Cultural Heritage)',
    detail: 'Wayang Puppet Theatre: Masterpiece of the Oral and Intangible Heritage of Humanity (Proklamasi 2003 / Inskripsi 2008).',
    category: 'Warisan Dunia',
    href: 'https://ich.unesco.org/en/RL/wayang-puppet-theatre-00063',
    image: '/images/articles/unesco-page.webp',
  },
  {
    institution: 'Sekretariat Nasional Wayang Indonesia (SENAWANGI)',
    detail: 'Rujukan tata krama pakeliran, gaya gagrag pewayangan Surakarta & Yogyakarta, serta pelestarian wayang kulit.',
    category: 'Pedalangan Tradisi',
    href: 'https://www.youtube.com/@SENAWANGICHANNEL',
    image: '/images/articles/yt-thumb-1.webp',
  },
  {
    institution: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI',
    detail: 'Arsip dan publikasi resmi mengenai nilai filosofis, sejarah gamelan, dan penetapan warisan budaya takbenda Indonesia.',
    category: 'Pemerintah & Kebijakan',
    href: 'https://itjen.kemendikdasmen.go.id/web/?p=8640',
    image: '/images/articles/kemendikbud-page.webp',
  },
  {
    institution: 'Kompas.com - Sejarah & Filosofi Gunungan Wayang Kulit',
    detail: 'Dokumentasi narasi sejarah, makna simbolik Gunungan Wayang Kulit dalam kosmologi Jawa dan uang logam Nusantara.',
    category: 'Arsip & Filosofi',
    href: 'https://regional.kompas.com/read/2022/02/02/180653778/sejarah-dan-filosofi-gunungan-wayang-kulit-digunakan-dalam-uang-logam',
    image: '/images/articles/wiki-gunungan.webp',
  },
  {
    institution: 'Kompas.com - Silsilah, Karakter & Senjata Pandawa Lima',
    detail: 'Rujukan silsilah, watak kesatria Yudhistira, Bima, Arjuna, Nakula, Sadewa, serta pusaka sakti pewayangan Jawa.',
    category: 'Wiracarita Nusantara',
    href: 'https://yogyakarta.kompas.com/read/2022/11/17/203556078/mengenal-pandawa-lima-nama-silsilah-dan-senjata?page=all',
    image: '/images/articles/kompas-pandawa.webp',
  },
  {
    institution: 'Kompas.com - Makna Filosofi Punakawan Rakyat Jelata',
    detail: 'Kajian mendalam filosofi Semar, Gareng, Petruk, dan Bagong sebagai cermin kearifan rakyat dan penyeimbang moralitas.',
    category: 'Wiracarita Nusantara',
    href: 'https://yogyakarta.kompas.com/read/2022/11/01/152425178/mengenal-punakawan-tokoh-pewayangan-jawa-yang-penuh-filosofi?page=all',
    image: '/images/articles/kompas-punakawan.webp',
  },
  {
    institution: 'Kompas.com - Klasifikasi 10 Jenis Wayang Indonesia',
    detail: 'Keanekaragaman seni pertunjukan wayang di Nusantara: Wayang Kulit Purwa, Wayang Golek, hingga Wayang Beber kuno.',
    category: 'Riset Budaya',
    href: 'https://www.kompas.com/skola/read/2024/03/13/173000269/10-jenis-jenis-wayang-dan-pengertiannya?page=all',
    image: '/images/articles/kompas-jenis.webp',
  },
  {
    institution: 'CNN Indonesia - Perjalanan Panjang Wayang Diakui UNESCO',
    detail: 'Dokumentasi sejarah diplomasi budaya dan perjalanan seni pertunjukan wayang kulit hingga diakui dunia internasional.',
    category: 'Warta Kebudayaan',
    href: 'https://www.cnnindonesia.com/gaya-hidup/20211116163914-277-721967/perjalanan-wayang-kulit-indonesia-diakui-unesco',
    image: '/images/articles/cnn-perjalanan.webp',
  },
  {
    institution: 'CNN Indonesia - Profil Ki Anom Suroto Maestro Pedalangan',
    detail: 'Dedikasi maestro pedalangan legendaris asal Klaten dalam diplomasi budaya pewayangan ke kancah mancanegara.',
    category: 'Tokoh & Maestro',
    href: 'https://www.cnnindonesia.com/hiburan/20231115005304-241-1024319/profil-ki-anom-suroto-maestro-dalang-masuk-timnas-amin',
    image: '/images/articles/cnn-anomsuroto.webp',
  },
  {
    institution: 'CNN Indonesia - Warisan & Pengaruh Ki Seno Nugroho',
    detail: 'Kiprah almarhum Ki Seno Nugroho merevolusi pakeliran Punakawan gaya kekinian yang memikat jutaan generasi milenial.',
    category: 'Tokoh & Maestro',
    href: 'https://www.cnnindonesia.com/hiburan/20201104064637-241-565603/dalang-kondang-ki-seno-nugroho-meninggal-dunia',
    image: '/images/articles/cnn-kiseno.webp',
  },
  {
    institution: 'Antara News - Berpulangnya Maestro Ki Manteb Soedarsono',
    detail: 'Catatan duka berpulangnya empu dalang pelopor sabetan kilat dan pembaharu dramaturgi pewayangan Indonesia.',
    category: 'Tokoh & Maestro',
    href: 'https://jogja.antaranews.com/berita/495682/dalang-ki-manteb-soedarsono-meninggal-dunia',
    image: '/images/articles/antara-kimanteb.webp',
  },
  {
    institution: 'Tempo.co - Rekor MURI Ki Manteb Mendalang 24 Jam Nonstop',
    detail: 'Kisah legendaris ketahanan fisik dan spiritualitas sang dalang kondang memainkan ratusan tokoh wayang kulit nonstop.',
    category: 'Pentas Kolosal',
    href: 'https://www.tempo.co/hiburan/ki-manteb-sudarsono-dalang-setan-pencetak-rekor-muri-mendalang-24-jam-nonstop-498270',
    image: '/images/articles/tempo-kimanteb.webp',
  },
  {
    institution: 'Detikcom - Pusat Informasi & Berita Wayang Nusantara',
    detail: 'Kumpulan berita, arsip pementasan, dan direktori festival wayang kulit kontemporer dari seluruh penjuru tanah air.',
    category: 'Warta Kebudayaan',
    href: 'https://www.detik.com/tag/wayang',
    image: '/images/articles/detik-wayang.webp',
  },
  {
    institution: 'Google MediaPipe - Vision AI Hand Landmark Detection',
    detail: 'Riset dan teknologi computer vision pelacakan 21 titik sendi tangan real-time untuk kendali interaktif boneka wayang.',
    category: 'Teknologi & AI',
    href: 'https://developers.google.com/mediapipe/solutions/vision/hand_landmarker',
    image: '/images/gestures/gesture-01-poros.webp',
  },
  {
    institution: 'Three.js - WebGL Interactive 3D Graphics Engine',
    detail: 'Pustaka grafis 3D terbuka untuk render model boneka wayang, pencahayaan panggung blencong, dan material kanvas digital.',
    category: 'Teknologi & AI',
    href: 'https://threejs.org/',
    image: '/images/wayang-stage-bg.webp',
  },
  {
    institution: 'YouTube - Dokumentasi Pagelaran Sabetan Ki Eko Suwaryo',
    detail: 'Dokumentasi video pentas ekspresi sabetan wayang kulit klasik dengan orkestrasi gamelan slendro pelog langsung.',
    category: 'Arsip Audio-Visual',
    href: 'https://www.youtube.com/watch?v=ftHuOUoS0Bs',
    image: '/images/articles/yt-thumb-2.webp',
  },
  {
    institution: 'YouTube - Rekaman Lakon Kresno Gugah Sanggar Cemara',
    detail: 'Rekaman pentas wayang kulit kolosal lakon Kresno Gugah bersama Bt. Tatin, Elisha, dan kru karawitan Sanggar Cemara.',
    category: 'Arsip Audio-Visual',
    href: 'https://www.youtube.com/watch?v=qwxU9hMXK8A',
    image: '/images/articles/yt-thumb-3.webp',
  },
  {
    institution: 'YouTube - Rekor MURI Pagelaran Wayang Kolosal',
    detail: 'Pentas pelestarian seni wayang kulit kolosal pemecah rekor MURI demi ketahanan warisan seni budaya Indonesia.',
    category: 'Arsip Audio-Visual',
    href: 'https://www.youtube.com/watch?v=pAL2uul0hI0',
    image: '/images/articles/antara-ki-manteb-full.webp',
  },
];

const SUPER_HOVER_ITEMS: SuperHoverListItem[] = ACKNOWLEDGEMENTS.map((item, idx) => ({
  id: idx,
  title: item.institution,
  subtitle: item.detail,
  meta: item.category,
  image: item.image,
  href: item.href,
}));
const TECH_STACK = [
  {
    name: 'Next.js 16 (App Router)',
    desc: 'Fondasi framework modern & render statis berkinerja tinggi',
    icon: (
      <svg viewBox="0 0 180 180" className="size-6 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="90" fill="#000000" />
        <path d="M149.508 157.438L69.1417 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z" fill="url(#next-g1)" />
        <path d="M115 54H127V126H115V54Z" fill="url(#next-g2)" />
        <defs>
          <linearGradient id="next-g1" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="next-g2" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Motion / React & GSAP',
    desc: 'Fisika animasi 3D, flip card, scroll reveal, dan marquee dinamis',
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="size-6 shrink-0 text-[#00d8ff]">
        <circle cx="0" cy="0" r="2.05" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: 'MediaPipe Vision AI',
    desc: 'Computer vision pelacakan gestur tangan tanpa perangkat keras khusus',
    icon: (
      <svg viewBox="0 0 24 24" className="size-6 shrink-0" fill="none">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="#00796B" strokeWidth="1.8" strokeLinejoin="round" fill="#E0F2F1" />
        <circle cx="12" cy="7" r="2" fill="#00897B" />
        <circle cx="7.5" cy="14.5" r="2" fill="#00897B" />
        <circle cx="16.5" cy="14.5" r="2" fill="#00897B" />
        <path d="M12 7l-4.5 7.5h9L12 7z" stroke="#004D40" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    desc: 'Sistem desain responsif bernuansa panggung teatrikal klasik modern',
    icon: (
      <svg viewBox="0 0 24 24" className="size-6 shrink-0 text-[#06b6d4]" fill="currentColor">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
      </svg>
    ),
  },
  {
    name: 'Playfair Display & Inter',
    desc: 'Tipografi sastra Jawa berwibawa berpadu keterbacaan modern',
    icon: (
      <svg viewBox="0 0 24 24" className="size-6 shrink-0" fill="none">
        <rect width="24" height="24" rx="5" fill="#1e1e1e" />
        <path d="M7 17L10 7h1.8l3 10h-1.6l-.7-2.5H9.5L8.7 17H7zm2.9-3.8h2.3l-1.1-4.2h-.1l-1.1 4.2z" fill="#dedf42" />
        <path d="M16.5 17V7h1.4v10h-1.4z" fill="#ffffff" opacity="0.8" />
      </svg>
    ),
  },
  {
    name: 'Lucide Icons',
    desc: 'Ikonografi tematik yang merefleksikan pusaka dan sifat kepribadian wayang',
    icon: (
      <svg viewBox="0 0 24 24" className="size-6 shrink-0 text-[#f56565]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h4v4" />
        <path d="m14 10 6-6" />
        <path d="M8 20H4v-4" />
        <path d="m10 14-6 6" />
        <rect width="8" height="8" x="8" y="8" rx="2" fill="#f56565" fillOpacity="0.15" />
      </svg>
    ),
  },
];

export default function KreditPage() {
  return (
    <div className="relative min-h-screen bg-[#dedf42] text-black overflow-x-clip selection:bg-black selection:text-[#dedf42] font-sans">
      {/* Ambient Canvas Lighting & Background Pattern */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-85"
        style={{
          background: 'radial-gradient(circle at 75% 20%, #e8e84d 0%, #dedf42 55%, #cfd033 100%)',
        }}
      />
      <div className="fixed inset-0 bg-repeat opacity-[0.04] pointer-events-none z-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Main Content with top clearance for the floating global notch navbar */}
      <main className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 space-y-16 sm:space-y-24">
        {/* Top Back Navigation Bar */}
        <div className="w-full flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-bold tracking-wider text-black/75 hover:text-black uppercase transition-colors group"
          >
            <span className="text-base group-hover:-translate-x-1 transition-transform">←</span>
            <span>Kembali ke Beranda</span>
          </Link>
          <span className="text-[11px] font-mono tracking-widest text-black/60 uppercase font-semibold">
            Wayang Jawi • SMK Telkom Malang
          </span>
        </div>

        {/* ── INTERACTIVE TEAM SECTION (Reference Image #1, #2, #3 Design) ── */}
        <TeamInteractiveSection />
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

        {/* 3.5. Ekosistem & Jejaring Mitra (Logo Cloud Infinite Slider) */}
        <section className="space-y-5 pt-2 pb-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase text-black/60">
              EKOSISTEM & JEJARING MITRA
            </p>
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-black font-normal">
              Terinspirasi Tradisi Leluhur.{' '}
              <span className="font-serif italic font-medium">Ditenagai Rekayasa Modern.</span>
            </h2>
          </div>

          <div className="mx-auto h-[1.5px] max-w-sm sm:max-w-md bg-black/20 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />

          <LogoCloud logos={WAYANG_ECOSYSTEM_LOGOS} speed={42} speedOnHover={18} gap={48} />

          <div className="mx-auto h-[1.5px] max-w-sm sm:max-w-md bg-black/20 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
        </section>
        {/* 4. Team Credits */}
        <section className="space-y-8">
          <div className="border-b border-black/20 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="text-xs font-sans font-bold tracking-[0.25em] uppercase text-black/70">
                DISIPLIN & TANGGUNG JAWAB KARYA
              </p>
              <h2 className="font-playfair text-3xl sm:text-4xl text-black font-normal mt-1">
                Fokus Pengembangan
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
                className="p-5 sm:p-6 rounded-2xl border border-black/20 bg-black/[0.03] hover:bg-black/[0.06] hover:border-black/35 hover:-translate-y-0.5 transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="size-10 rounded-xl bg-black/[0.06] border border-black/15 flex items-center justify-center shrink-0 shadow-sm p-2">
                      {tech.icon}
                    </div>
                    <h4 className="font-sans font-bold text-sm sm:text-base text-black">
                      {tech.name}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-black/80 font-sans leading-relaxed">
                    {tech.desc}
                  </p>
                </div>
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

          <SuperHoverList
            items={SUPER_HOVER_ITEMS}
            variant="cards"
            artworkSize={150}
          />
        </section>

        {/* 7. Bottom Call to Action */}
        <section className="p-8 sm:p-12 md:p-16 rounded-3xl border-2 border-black bg-black text-[#dedf42] text-center flex flex-col items-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center space-y-4">
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
