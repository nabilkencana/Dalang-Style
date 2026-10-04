<div align="center">

  <img src="public/images/wayang-gunungan-logo.png" alt="Wayang Jawi Logo" width="110" />

  # 🎭 WAYANG JAWI
  ### Panggung Wayang Kulit Digital Interaktif & Studio Cipta Budaya Berbasis AI

  **Karya Inovasi Teknologi Kebudayaan — Tema: *LUMINE* (Illuminating Indonesian Heritage through Interactive Technology)**

  [![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![MediaPipe](https://img.shields.io/badge/MediaPipe-Vision_AI-FF6F00?style=for-the-badge&logo=google)](https://developers.google.com/mediapipe)
  [![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/)
  [![Remotion](https://img.shields.io/badge/Remotion-Video_in_React-0B84F3?style=for-the-badge&logo=remotion)](https://www.remotion.dev/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
  <p align="center">
    <em>"Menghidupkan seni wayang kulit lewat panggung digital interaktif, pelacakan gestur dalang AI berbasis kamera, dan dialog kreasi sastra nusantara."</em>
  </p>

</div>

---

## 📖 1. Latar Belakang & Kesesuaian Tema (*LUMINE*)

Seni pertunjukan **Wayang Kulit** telah diakui oleh UNESCO sebagai *Masterpiece of Oral and Intangible Heritage of Humanity* sejak tahun 2003. Namun, di era digital kontemporer, kesenian adiluhung ini menghadapi tantangan pelestarian yang nyata:
- **Kurangnya Aksesibilitas Instrumen**: Sulit dan mahalnya instrumen fisik wayang kulit, kelir layar kain, dan lampu blencong bagi generasi muda yang ingin belajar mendalang.
- **Kompleksitas Teknik Mendalang**: Keterampilan motorik manipulasi gapit dan cempurit memerlukan bertahun-tahun latihan di sanggar tradisional.
- **Kesenjangan Bahasa & Narasi**: Sastra pakeliran klasik sering kali berjarak dengan preferensi komunikasi generasi digital.

### 🌟 Solusi Inovatif: *Wayang Jawi*
Menjawab tema kompetisi **LUMINE** (*menyinari dan menerangi khazanah bangsa lewat teknologi*), **Wayang Jawi** hadir mentransformasikan layar peramban web menjadi panggung kelir virtual interaktif yang inklusif, modern, dan edukatif:
1. **Menyinari Budaya (*Cultural Illumination*)**: Menghadirkan kembali filosofi karakter, lakon moral (*Bima Suci*), dan 16 museum wayang nusantara dalam balutan desain editorial kelas dunia.
2. **Kecerdasan Buatan Tanpa Hambatan (*Zero-Hardware AI Vision*)**: Cukup menggunakan webcam laptop biasa, pengguna dapat langsung mendalang dua tokoh wayang secara real-time dengan gestur tangan alami.
3. **Generasi & Kolaborasi Kreatif (*Empu AI Atelier*)**: Memberikan ruang bagi publik untuk meramu konsep karakter wayang baru yang tetap berakar pada pakem etika dan estetika pewayangan.

---

## ✨ 2. Fitur-Fitur Utama (*Key Capabilities*)

### 🕹️ 1. Panggung Virtual Dalang AI (`/stage`)
- **Dual-Hand Computer Vision Tracking**: Menggunakan model `@mediapipe/tasks-vision` untuk mendeteksi 21 titik sendi tangan kiri dan kanan secara simultan pada 60 FPS.
- **Kinematika Rigging Organik**:
  - *Telapak Tangan*: Mengendalikan batang tubuh wayang (*cempurit/gapit*).
  - *Ibu Jari & Telunjuk*: Menggerakkan sendi siku dan pergelangan tangan wayang (*tuding*).
  - *Kemiringan Tangan*: Menentukan sudut kemiringan tokoh.
  - *Jarak ke Kamera (Z-Depth)*: Memperbesar bayangan wayang pada kelir seperti mendekatkan wayang ke lampu blencong asli.
  - *Jari Kelingking*: Memicu gerakan tarian khas wayang (*Kiprahan*).
- **Fallback Mouse & Touch Control**: Dilengkapi mode simulasi tetikus dan simulasi demo otomatis bagi perangkat tanpa kamera.
- **Efek Blencong Audio-Visual**: Suara tabuhan gamelan slendro dinamis dan tata cahaya api blencong yang bernapas mengikuti alur gerak.

### 📜 2. Panduan Mendalang Interaktif (`/panduan`)
- Dokumentasi visual gestur tangan lengkap dengan *hover video previews*.
- Filosofi kendali wayang, tata cara memegang gapit, serta panduan tata panggung kelir.

### 🏛️ 3. Panggung Teatrikal & Lakon Bima Suci (`/#lakon`)
- Rekaman pementasan otentik Lakon Bima Suci (Pencarian Tirta Perwitasari dan pertemuan dengan Dewa Ruci).
- Bingkai teatrikal berbingkai emas dengan integrasi resmi YouTube player dan kontrol suara dinamis.

### 🎡 4. Roda Putar Karakter 3D (*Works Wheel Tokoh*) (`/#cara-bermain`)
- Eksplorasi watak tokoh pewayangan (Kyai Semar, Petruk, Bagong, Arjuna, Werkudara, Gatotkaca).
- Visual interaktif 3D wheel dengan metadata watak luhur dan filosofi kepemimpinan Jawa.

### 🤖 5. Studio Gubahan Sang Empu AI (`/kreasi`)
- **Asisten Dialog Sastra**: Mengurai gagasan watak ksatria dalam bahasa sehari-hari menjadi nama berwibawa, pusaka sakti, dan nilai filosofis mendalam.
- **Kanvas Spotlight Generatif**: Menampilkan visualisasi wayang hasil olahan AI secara murni tanpa tokoh bawaan.
- **Persistensi Prompt Antar-Halaman**: Konsep yang diketikkan di beranda landing page otomatis tersimpan dan terisi ke kolom studio kreasi tanpa data hilang.

### 📰 6. Warta Budaya & Liputan UNESCO (`/berita`)
- Majalah editorial digital berisi liputan resmi UNESCO ICH, sejarah kosmologi gunungan, dan ulasan pelestarian warisan budaya.

### 🎬 7. Video Motion Showcase Terintegrasi (*Remotion*)
- Komposisi video grafis motion terprogram berbasis React (`remotion/`) yang dapat di-preview secara langsung via browser dan di-render menjadi file video MP4 berkualitas siaran.

---

## 🏗️ 3. Arsitektur Teknis & Struktur Folder (*Clean Code*)

Aplikasi dibangun dengan arsitektur modular yang memisahkan logika presentasi (*UI Components*), manajemen state (*Hooks*), pemrosesan computer vision (*Engine Rigging*), dan aset video (*Remotion*):

```text
dalang-style/
├── app/                              # Next.js 16 App Router Directory
│   ├── (marketing)/                  # Marketing Route Group (Editorial Layout)
│   │   ├── layout.tsx                # Marketing shared layout with Navbar & Footer
│   │   ├── page.tsx                  # Landing Page (Hero, Lakon, Wheel, Sanggar)
│   │   ├── kreasi/page.tsx           # Studio Dialog Sang Empu AI
│   │   ├── panduan/page.tsx          # Panduan Gestur & Pengendalian Dalang
│   │   ├── berita/page.tsx           # Warta & Catatan Kebudayaan
│   │   ├── katalog/page.tsx          # Katalog Tokoh Wayang Lengkap
│   │   └── kredit/page.tsx           # Tim Pengembang & Sumber Lisensi
│   ├── (stage)/                      # Fullscreen Virtual Stage Route Group
│   │   ├── layout.tsx                # Dark stage shell layout
│   │   └── stage/page.tsx            # Halaman Panggung Virtual Dalang AI
│   ├── api/                          # Next.js Serverless API Route Handlers
│   │   └── kreasi-wayang/route.ts    # AI Wayang Synthesis API (Gemini/Fallback)
│   ├── globals.css                   # Tailwind CSS v4 Global Styling & Themes
│   ├── wayang.css                    # Custom Stage Canvas & Lighting Keyframes
│   └── layout.tsx                    # Root Layout with Font & Metadata Definitions
├── components/                       # Reusable UI & Section Components
│   ├── ui/                           # Primitives & Interactive Micro-Components
│   │   ├── navbar-menu.tsx           # Accessible Floating Dropdown Navigation
│   │   ├── works-wheel.tsx           # 3D Rotating Character Wheel
│   │   ├── interactive-list-preview.tsx # Editorial List Preview with Hover Media
│   │   ├── flip-card.tsx             # 3D Dalang Flip Card with Spring Physics
│   │   └── text-marquee.tsx          # Smooth Infinite Running Ticker Tape
│   ├── HeroWayangJawi.tsx            # Cinematic Video Hero Showcase
│   ├── Navbar.tsx                    # Dynamic Island / Notch Responsive Bar
│   ├── SectionBimaSuci.tsx           # Lakon Bima Suci Theater Frame
│   ├── SectionStoryAwakening.tsx     # Editorial Galeri Tokoh Section
│   ├── SectionWayangGenerator.tsx    # Sanggar Cipta Sang Empu Showcase
│   ├── SectionStoryFinale.tsx        # Theatrical Dancers & UNESCO News Section
│   ├── WayangLogo.tsx                # Official Gunungan / Kayon SVG Emblem
│   ├── WayangStage.tsx               # Canvas 2D Puppet Physics & Control Hub
│   └── GsapAnimations.tsx            # Centralized GSAP ScrollTrigger Controller
├── lib/                              # Business Logic, Rigging, & Utilities
│   ├── wayang/                       # Wayang Digital Engine
│   │   ├── rig.ts                    # Hierarchical Skeletal Joint Transformation
│   │   ├── tracking.ts               # MediaPipe Landmarks to Puppet Mapper
│   │   ├── render.ts                 # 60fps Double-Buffered Canvas 2D Pipeline
│   │   ├── audio.ts                  # Web Audio API Slendro Gamelan Synthesizer
│   │   ├── controller.ts             # Input Controller Strategy (Camera/Mouse)
│   │   └── math.ts                   # Vector, Angle, and Smoothing Utilities
│   ├── wayang-ai.ts                  # Sastra & Archetype Prompt Synthesizer
│   ├── news-data.ts                  # Curated Articles & Cultural Editorial Data
│   └── utils.ts                      # Tailwind Merge & ClassName Utilities
├── remotion/                         # Remotion Video in React Framework
│   ├── Root.tsx                      # Remotion Composition & Scene Registry
│   ├── DalangShowcase.tsx            # 30-second 60fps Motion Graphics Storyboard
│   └── scenes/                       # Programmatic Video Scenes (Intro, UI, AI)
├── public/                           # Optimized Static Assets (Images, Icons)
│   └── images/                       # Compressed WebP/PNG Cultural Artifacts
├── eslint.config.mjs                 # Flat ESLint Configuration (Zero Errors)
├── next.config.ts                    # Next.js 16 Configuration
└── tsconfig.json                     # Strict TypeScript Compiler Options
```

---

## 🎨 4. Desain Sistem & Identitas Visual

| Elemen | Spesifikasi | Filosofi |
| :--- | :--- | :--- |
| **Warna Utama** | `Chartreuse Gold (#dedf42)` | Cahaya pendar blencong modern, energi intelektual, dan pembaharuan tradisi. |
| **Warna Aksen** | `Prada Gold (#d9a441)` | Kemegahan tatah sungging prada keraton Jawa klasik. |
| **Warna Dasar** | `Obsidian Black (#050303 - #0e0704)` | Keheningan malam pakeliran dan kontras bayangan kelir. |
| **Tipografi Judul** | `Playfair Display` & `Cormorant Garamond` | Anggun, berwibawa, dan bernuansa sastra klasik nusantara. |
| **Tipografi Tubuh** | `Inter` | Bersih, terbaca sempurna di segala resolusi gawai, dan modern. |
| **Aksara Jawa** | *Unicode Hanacaraka* | Penegas orisinalitas akar kebudayaan Jawa. |

---

## 🚀 5. Panduan Instalasi & Menjalankan Lokal

### Prasyarat:
- **Node.js**: Versi `18.18.0` atau yang lebih baru (disarankan Node.js 20 LTS).
- **Package Manager**: `npm`, `pnpm`, atau `bun`.
- **Peramban Web**: Google Chrome, Microsoft Edge, atau Safari dengan izin akses webcam (untuk Panggung Virtual).

### Langkah Instalasi:

1. **Clone Repository GitHub**:
   ```bash
   git clone https://github.com/nabilkencana/dalang-style.git
   cd dalang-style
   ```

2. **Instal Dependensi**:
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variable (Opsional)**:
   Buat file `.env.local` di root direktori jika ingin mengaktifkan integrasi Google Gemini API secara langsung:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(Catatan: Aplikasi tetap berfungsi 100% penuh secara offline/fallback cerdas tanpa API key).*

4. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Buka peramban di [http://localhost:3000](http://localhost:3000).

5. **Verifikasi Kualitas Kode (Clean Code Check)**:
   ```bash
   # Type checking TypeScript tanpa error
   npx tsc --noEmit

   # Linting ESLint (0 errors)
   npm run lint

   # Production Build
   npm run build
   ```

6. **Preview & Render Video Remotion (Opsional)**:
   ```bash
   # Buka Remotion Studio interaktif
   npm run video:preview

   # Render video MP4 motion graphics
   npm run video:render
   ```

---

## 📱 6. Matriks Responsivitas Antar-Perangkat

Aplikasi telah diuji dan dioptimalkan secara ketat pada 3 breakpoint utama:
- 📱 **Mobile (375px - 430px)**:
  - Menu berubah menjadi *App Drawer* responsif dengan navigasi sentuh ergonomis.
  - Panggung virtual mendukung penyesuaian skala otomatis satu tangan dan mode tetikus/sentuh.
  - Bebas *horizontal scroll overflow*.
- 📟 **Tablet (768px - 850px)**:
  - Transisi mulus antara mode sentuh dan tata letak grid dua kolom seimbang.
  - Kartu studio kreasi sejajar rapi.
- 💻 **Desktop (1024px - 1568px+)**:
  - *Dynamic Notch Navigation* yang menyempit (*compact*) saat digulir ke bawah dan melebar saat digulir ke atas.
  - Animasi halus *GSAP ScrollTrigger* dan visual kedalaman 3D.

---

## 🏆 7. Kepatuhan Kriteria Penilaian

| Kriteria Penilaian | Bobot | Bukti Implementasi pada Proyek |
| :--- | :---: | :--- |
| **Fungsionalitas & Kesesuaian Tema** | **30%** | Solusi sejalan dengan tema **LUMINE** (pelestarian budaya berbasis teknologi). Seluruh fitur panggung gestur AI, studio gubahan, 3D wheel, dan galeri berjalan lancar tanpa error konsol. |
| **Kualitas & Kerapian Kode (Clean Code)** | **30%** | Struktur folder terisolasi rapi, penamaan berkas & variabel semantik seragam, strict TypeScript (0 error `tsc`), ESLint lulus 0 error, dan README komprehensif. |
| **UI/UX & Responsivitas** | **15%** | Palet warna teatrikal emas-hitam konsisten, tipografi pewayangan berkelas, responsif di Mobile, Tablet, dan Desktop tanpa overflow horizontal. |
| **Video Demo Penjelasan** | **25%** | Naskah presentasi terstruktur (maksimal 7 menit) mencakup masalah, solusi, demonstrasi fitur, arsitektur, dan penutup telah disiapkan di bawah. |

---

## 🎙️ 8. Panduan Naskah Video Demo (Maksimal 7 Menit)

Gunakan struktur panduan berikut saat merekam video presentasi karya:

- **Menit 00:00 - 01:15 (Latar Belakang & Urgensi Masalah)**:
  - Pembukaan salam dan pengenalan tim.
  - Paparan fakta: Wayang kulit adalah mahakarya UNESCO yang mulai asing bagi generasi muda karena kendala aksesibilitas instrumen fisik dan rumitnya teknik mendalang.
  - Pengenalan gagasan utama **Wayang Jawi** sebagai perwujudan tema *LUMINE*.
- **Menit 01:15 - 03:00 (Live Demo 1: Panggung Virtual Dalang AI)**:
  - Membuka halaman `/stage`.
  - Menunjukkan kemampuan deteksi tangan via webcam (kiri memegang tokoh kiri, kanan memegang tokoh kanan).
  - Memperagakan gerak gapit, tuding, kedalaman bayangan blencong, dan tarian kiprahan.
  - Menunjukkan fleksibilitas mode fallback (kontrol kursor/touch).
- **Menit 03:00 - 04:30 (Live Demo 2: Studio Cipta Sang Empu AI)**:
  - Membuka halaman beranda dan studio `/kreasi`.
  - Mengetikkan gagasan watak kustom (contoh: *"Ksatria panah berjiwa hening bermahkota surya"*).
  - Menunjukkan hasil analisis AI: perumusan nama berwibawa, filosofi batin, dan visual wayang kulit resolusi tinggi yang murni dihasilkan AI.
- **Menit 04:30 - 05:45 (Arsitektur & Kerapian Rekayasa Kode)**:
  - Menjelaskan arsitektur Next.js 16 App Router, MediaPipe Hands Vision, dan pipeline Canvas 2D 60 FPS.
  - Menunjukkan kepatuhan *clean code*: modularitas komponen, penamaan semantik, TypeScript strict, dan pengujian Playwright.
- **Menit 05:45 - 07:00 (Dampak Kebudayaan & Penutup)**:
  - Merangkum bagaimana *Wayang Jawi* mendemokratisasi seni mendalang ke sekolah, museum, dan komunitas global.
  - Kalimat penutup: *"Menghidupkan seni tradisi leluhur di atas layar masa depan."*

---

## 📄 9. Lisensi (*License*)

Proyek ini didistribusikan di bawah lisensi resmi **MIT License**. Kode sumber terbuka secara bebas untuk keperluan pembelajaran, pelestarian kebudayaan, penelitian, maupun pengembangan lebih lanjut. Lihat berkas [LICENSE](LICENSE) untuk ketentuan hukum lengkap.

---

<div align="center">
  <p>Dibuat dengan segenap cinta untuk Kebudayaan Nusantara 🇮🇩</p>
  <p><strong>© 2026 nabilkencana &amp; Wayang Jawi Contributors. Lisensi MIT.</strong></p>
</div>
