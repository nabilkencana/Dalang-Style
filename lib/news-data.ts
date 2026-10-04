export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  sourceUrl: string;
  sourceName: string;
}

export const HERO_STORY: NewsArticle = {
  id: 'hero-unesco',
  slug: 'unesco-tetapkan-wayang-kulit-warisan-dunia',
  title: 'UNESCO Kukuhkan Wayang Kulit Sebagai Mahakarya Warisan Kemanusiaan Dunia',
  category: 'WARISAN DUNIA',
  author: 'Sekretariat Warisan Takbenda',
  date: '7 November 2023',
  readTime: '6 min read',
  image: '/images/articles/unesco-page.webp',
  excerpt:
    'Pengakuan resmi UNESCO meneguhkan seni pertunjukan boneka bayangan Wayang Kulit Indonesia dalam Daftar Representatif Warisan Budaya Takbenda Dunia, menyoroti perpaduan sastra, falsafah, dan musik gamelan adiluhung.',
  sourceUrl: 'https://ich.unesco.org/en/RL/wayang-puppet-theatre-00063',
  sourceName: 'UNESCO ICH Resmi',
};

export const FULL_STORY_MAIN: NewsArticle = {
  id: 'full-gunungan-kompas',
  slug: 'sejarah-dan-filosofi-gunungan-wayang-kulit',
  title: 'Sejarah dan Filosofi Gunungan Wayang Kulit, Simbol Kosmologi Jawa',
  category: 'KOMPAS.COM BUDAYA',
  author: 'Puspasari Setyaningrum',
  date: '2 Februari 2022',
  readTime: '8 min read',
  image: '/images/articles/kompas-page.webp',
  excerpt:
    'Gunungan wayang kulit memiliki sejarah dan filosofi mendalam yang melambangkan kosmologi alam semesta dan perjalanan hidup manusia, mulai dari penciptaan hingga kembali ke haribaan Sang Pencipta.',
  sourceUrl: 'https://regional.kompas.com/read/2022/02/02/180653778/sejarah-dan-filosofi-gunungan-wayang-kulit-digunakan-dalam-uang-logam?page=all',
  sourceName: 'Kompas.com',
};

export const FULL_STORY_CARDS: NewsArticle[] = [
  {
    id: 'full-card-1',
    slug: 'dalang-ki-manteb-soedarsono-meninggal-dunia',
    title: 'Dalang Ki Manteb Soedarsono Meninggal Dunia, Dunia Pedalangan Berduka',
    category: 'ANTARA NEWS JOGJA',
    author: 'Redaksi Antara',
    date: '2 Juli 2021',
    readTime: '5 min read',
    image: '/images/articles/antara-kimanteb.webp',
    excerpt: 'Kabar duka berpulangnya maestro wayang kulit ternama Ki Manteb Soedarsono sang pelopor sabetan kilat.',
    sourceUrl: 'https://jogja.antaranews.com/berita/495682/dalang-ki-manteb-soedarsono-meninggal-dunia',
    sourceName: 'Antara News',
  },
  {
    id: 'full-card-2',
    slug: 'mengenal-pandawa-lima-nama-silsilah-dan-senjata',
    title: 'Mengenal Pandawa Lima: Nama, Silsilah, dan Senjata Pusaka Sakti',
    category: 'KOMPAS.COM YOGYAKARTA',
    author: 'Puspasari Setyaningrum',
    date: '17 November 2022',
    readTime: '6 min read',
    image: '/images/articles/kompas-pandawa.webp',
    excerpt: 'Mengenal lima ksatria Pandawa mulai dari Yudhistira, Bima, Arjuna, Nakula, hingga Sadewa beserta senjata pusakanya.',
    sourceUrl: 'https://yogyakarta.kompas.com/read/2022/11/17/203556078/mengenal-pandawa-lima-nama-silsilah-dan-senjata?page=all',
    sourceName: 'Kompas.com',
  },
  {
    id: 'full-card-3',
    slug: '7-alasan-wayang-menjadi-warisan-budaya-tak-benda-unesco',
    title: '7 Alasan Wayang Menjadi Warisan Budaya Tak Benda UNESCO',
    category: 'KEMENDIKBUD RI',
    author: 'Itjen Kemendikdasmen',
    date: '7 November 2023',
    readTime: '6 min read',
    image: '/images/articles/kemendikbud-page.webp',
    excerpt: 'Mengulas mengapa UNESCO menetapkan wayang kulit Indonesia sebagai Karya Agung Warisan Budaya Lisan dan Takbenda Dunia.',
    sourceUrl: 'https://itjen.kemendikdasmen.go.id/web/?p=8640',
    sourceName: 'Kemendikbudristek',
  },
];

export const SPOTLIGHT_MAIN: NewsArticle = {
  id: 'spotlight-jenis-wayang',
  slug: '10-jenis-jenis-wayang-dan-pengertiannya',
  title: '10 Jenis-Jenis Wayang dan Pengertiannya dalam Tradisi Nusantara',
  category: 'KOMPAS.COM EDUKASI',
  author: 'Eliza Naviana Damayanti',
  date: '13 Maret 2024',
  readTime: '8 min read',
  image: '/images/articles/kompas-jenis.webp',
  excerpt:
    'Pertunjukan wayang di Nusantara memiliki keanekaragaman teknik, gaya, dan media pembuatannya. Mulai dari Wayang Kulit Purwa, Wayang Golek, hingga Wayang Beber dengan filosofi adiluhung.',
  sourceUrl: 'https://www.kompas.com/skola/read/2024/03/13/173000269/10-jenis-jenis-wayang-dan-pengertiannya?page=all',
  sourceName: 'Kompas.com',
};

export const SPOTLIGHT_SIDE_ITEMS: NewsArticle[] = [
  {
    id: 'spotlight-side-1',
    slug: 'mengenal-punakawan-tokoh-pewayangan-jawa-penuh-filosofi',
    title: 'Mengenal Punakawan, Tokoh Pewayangan Jawa yang Penuh Filosofi',
    category: 'KOMPAS.COM BUDAYA',
    author: 'Puspasari Setyaningrum',
    date: '1 November 2022',
    readTime: '5 min read',
    image: '/images/articles/kompas-punakawan.webp',
    excerpt: 'Semar, Gareng, Petruk, dan Bagong sebagai cermin kearifan rakyat jelata dan pengingat kebenaran moral.',
    sourceUrl: 'https://yogyakarta.kompas.com/read/2022/11/01/152425178/mengenal-punakawan-tokoh-pewayangan-jawa-yang-penuh-filosofi?page=all',
    sourceName: 'Kompas.com',
  },
  {
    id: 'spotlight-side-2',
    slug: 'ki-manteb-sudarsono-dalang-setan-muri',
    title: 'Ki Manteb Sudarsono: Dalang Setan Pemegang Rekor MURI Mendalang 24 Jam',
    category: 'TEMPO.CO HIBURAN',
    author: 'Redaksi Tempo',
    date: '2 Juli 2021',
    readTime: '4 min read',
    image: '/images/articles/tempo-kimanteb.webp',
    excerpt: 'Kisah legendaris ketahanan fisik dan spiritual sang dalang kondang memainkan ratusan tokoh wayang nonstop.',
    sourceUrl: 'https://www.tempo.co/hiburan/ki-manteb-sudarsono-dalang-setan-pencetak-rekor-muri-mendalang-24-jam-nonstop-498270',
    sourceName: 'Tempo.co',
  },
  {
    id: 'spotlight-side-3',
    slug: 'profil-ki-anom-suroto-maestro-dalang',
    title: 'Profil Ki Anom Suroto: Maestro Dalang yang Mendalang di Lima Benua',
    category: 'CNN INDONESIA',
    author: 'CNN Indonesia',
    date: '15 November 2023',
    readTime: '4 min read',
    image: '/images/articles/cnn-anomsuroto.webp',
    excerpt: 'Dedikasi maestro pedalangan asal Klaten membawa kekayaan seni wayang kulit ke panggung internasional.',
    sourceUrl: 'https://www.cnnindonesia.com/hiburan/20231115005304-241-1024319/profil-ki-anom-suroto-maestro-dalang-masuk-timnas-amin',
    sourceName: 'CNN Indonesia',
  },
];

export const MOST_WATCHED_STORIES: NewsArticle[] = [
  {
    id: 'watched-1',
    slug: 'video-sabetan-ki-eko-suwaryo',
    title: 'Sabetan Wayang Kulit: Kepiawaian Gerak Boneka Kulit Ki Eko Suwaryo',
    category: 'YOUTUBE • PENTAS LIVE',
    author: 'Ki Eko Suwaryo',
    date: '8 September 2026',
    readTime: '▶ Tonton di YouTube',
    image: '/images/articles/yt-thumb-1.webp',
    excerpt: 'Rekaman pentas sabetan wayang kulit penuh ekspresi dari dalang Ki Eko Suwaryo dengan orkestrasi gamelan langsung.',
    sourceUrl: 'https://www.youtube.com/watch?v=ftHuOUoS0Bs',
    sourceName: 'YouTube',
  },
  {
    id: 'watched-2',
    slug: 'video-ki-seno-lakon-kresno-gugah',
    title: 'Ki Seno Nugroho — Lakon Kresno Gugah: Pementasan Bersama Sanggar Cemara',
    category: 'YOUTUBE • SANGGAR CEMARA',
    author: 'Alm. Ki Seno Nugroho',
    date: '11 Bulan Lalu',
    readTime: '▶ Tonton di YouTube',
    image: '/images/articles/yt-thumb-2.webp',
    excerpt: 'Dokumentasi pentas lakon Kresno Gugah bersama Bt. Tatin, Elisha, dan kru Sanggar Cemara — warisan terakhir sang maestro.',
    sourceUrl: 'https://www.youtube.com/watch?v=qwxU9hMXK8A',
    sourceName: 'YouTube',
  },
  {
    id: 'watched-3',
    slug: 'video-praja-jogja-pemecahan-rekor-muri',
    title: 'Wayang Kulit Praja Jogja: Pemecahan Rekor MURI 14 Hari Spekta Budaya Nusantara',
    category: 'YOUTUBE • GUNUNGKIDUL TV',
    author: 'Gunungkidul TV',
    date: '9 November 2024',
    readTime: '▶ Tonton di YouTube',
    image: '/images/articles/yt-thumb-3.webp',
    excerpt: 'Pentas pelestarian seni wayang kulit kolosal pemecah rekor MURI demi ketahanan seni budaya Nusantara.',
    sourceUrl: 'https://www.youtube.com/watch?v=pAL2uul0hI0',
    sourceName: 'YouTube',
  },
];

export const MOST_READ_FEATURE: NewsArticle = {
  id: 'read-feature',
  slug: 'dalang-kondang-ki-seno-nugroho-berpulang',
  title: 'Mengenang Ki Seno Nugroho: Dalang Kharismatik Penggerak Generasi Muda Wayang',
  category: 'CNN INDONESIA HIBURAN',
  author: 'CNN Indonesia',
  date: '4 November 2020',
  readTime: '10 min read',
  image: '/images/articles/cnn-kiseno.webp',
  excerpt:
    'Berpulangnya Ki Seno Nugroho menyisakan duka mendalam bagi jagad pewayangan. Kepiawaiannya mengolah lakon Punakawan dengan gaya kekinian berhasil memikat jutaan anak muda untuk kembali mencintai seni tradisi wayang kulit.',
  sourceUrl: 'https://www.cnnindonesia.com/hiburan/20201104064637-241-565603/dalang-kondang-ki-seno-nugroho-meninggal-dunia',
  sourceName: 'CNN Indonesia',
};

export const MOST_READ_GRID: NewsArticle[] = [
  {
    id: 'grid-1',
    slug: 'perjalanan-wayang-kulit-diakui-unesco',
    title: 'Perjalanan Wayang Kulit Indonesia Menuju Pengakuan UNESCO sebagai Warisan Dunia',
    category: 'CNN INDONESIA',
    author: 'CNN Indonesia',
    date: '16 November 2021',
    readTime: '5 menit baca',
    image: '/images/articles/cnn-perjalanan.webp',
    excerpt: 'Kisah perjalanan panjang seni pertunjukan wayang kulit Indonesia hingga diakui UNESCO sejak tahun 2003.',
    sourceUrl: 'https://www.cnnindonesia.com/gaya-hidup/20211116163914-277-721967/perjalanan-wayang-kulit-indonesia-diakui-unesco',
    sourceName: 'CNN Indonesia',
  },
  {
    id: 'grid-2',
    slug: 'dalang-ki-manteb-antara-berita',
    title: 'Duka Jagad Pedalangan: Berpulangnya Maestro Ki Manteb Soedarsono',
    category: 'ANTARA NEWS YOGYAKARTA',
    author: 'Redaksi Antara',
    date: '2 Juli 2021',
    readTime: '4 menit baca',
    image: '/images/articles/antara-ki-manteb-full.webp',
    excerpt: 'Kepergian sang maestro sabetan kilat meninggalkan jejak budaya yang takkan terlupakan.',
    sourceUrl: 'https://jogja.antaranews.com/berita/495682/dalang-ki-manteb-soedarsono-meninggal-dunia',
    sourceName: 'Antara News',
  },
  {
    id: 'grid-3',
    slug: 'berita-wayang-terkini-detikcom',
    title: 'Kanal Warta Wayang Terkini: Kumpulan Liputan Seni Pedalangan Nusantara',
    category: 'DETIK.COM',
    author: 'Redaksi Detik',
    date: 'Terbaru 2026',
    readTime: '3 menit baca',
    image: '/images/articles/detik-wayang.webp',
    excerpt: 'Kumpulan berita dan informasi wayang terkini dari seluruh penjuru nusantara di detikcom.',
    sourceUrl: 'https://www.detik.com/tag/wayang',
    sourceName: 'Detik.com',
  },
  {
    id: 'grid-4',
    slug: 'profil-ki-anom-suroto-maestro-internasional',
    title: 'Ki Anom Suroto: Maestro Dalang yang Membawa Wayang ke Lima Benua',
    category: 'CNN INDONESIA',
    author: 'CNN Indonesia',
    date: '15 November 2023',
    readTime: '4 menit baca',
    image: '/images/articles/cnn-anomsuroto.webp',
    excerpt: 'Perjalanan luar biasa Ki Anom Suroto mengenalkan seni wayang kulit ke panggung internasional.',
    sourceUrl: 'https://www.cnnindonesia.com/hiburan/20231115005304-241-1024319/profil-ki-anom-suroto-maestro-dalang-masuk-timnas-amin',
    sourceName: 'CNN Indonesia',
  },
];
