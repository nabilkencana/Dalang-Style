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
  sourceUrl?: string;
  sourceName?: string;
}

export const HERO_STORY: NewsArticle = {
  id: 'hero-unesco',
  slug: 'unesco-tetapkan-wayang-kulit-warisan-dunia',
  title: 'UNESCO Kukuhkan Wayang Kulit Sebagai Mahakarya Warisan Kemanusiaan Dunia',
  category: 'WARISAN DUNIA',
  author: 'Redaksi Kebudayaan',
  date: '7 November 2023',
  readTime: '6 min read',
  image: '/images/articles/unesco-page.png',
  excerpt:
    'Pengakuan resmi UNESCO meneguhkan seni pertunjukan boneka bayangan Wayang Kulit Indonesia dalam Daftar Representatif Warisan Budaya Takbenda Dunia, menyoroti perpaduan sastra, falsafah, dan musik gamelan adiluhung.',
  sourceUrl: 'https://ich.unesco.org/en/RL/wayang-puppet-theatre-00063',
  sourceName: 'UNESCO ICH',
};

export const FULL_STORY_MAIN: NewsArticle = {
  id: 'full-digital-revival',
  slug: 'revitalisasi-wayang-kulit-panggung-digital',
  title: 'Revitalisasi Seni Pedalangan: Menjaga Nafas Wayang Kulit di Era Layar Digital',
  category: 'SENI & TEKNOLOGI',
  author: 'Puspasari Setyaningrum',
  date: '14 Mei 2026',
  readTime: '7 min read',
  image: '/images/bima-stage-clean-v2.png',
  excerpt:
    'Eksplorasi teknologi interaktif dan kecerdasan buatan membuka babak baru pelestarian seni wayang. Tanpa meninggalkan pakem klasik, inovasi digital menjembatani generasi muda dengan falsafah adiluhung Nusantara.',
  sourceUrl: 'https://itjen.kemendikdasmen.go.id/web/?p=8640',
  sourceName: 'Kemendikbudristek',
};

export const FULL_STORY_CARDS: NewsArticle[] = [
  {
    id: 'full-card-1',
    slug: 'jejak-maestro-ki-manteb-sudarsono',
    title: 'Jejak Abadi Ki Manteb Sudarsono: Pelopor Sabetan Kilat dan Revolusi Pakeliran',
    category: 'MAESTRO DALANG',
    author: 'Bambang Murti',
    date: '10 Mei 2026',
    readTime: '5 min read',
    image: '/images/articles/kompas-page.png',
    excerpt: 'Mengenang karya agung sang maestro wayang yang memodernisasi tata artistik pementasan.',
    sourceUrl: 'https://regional.kompas.com/read/2022/02/02/180653778/sejarah-dan-filosofi-gunungan-wayang-kulit-digunakan-dalam-uang-logam?page=all',
    sourceName: 'Kompas.com',
  },
  {
    id: 'full-card-2',
    slug: 'filosofi-lakon-bima-suci',
    title: 'Lakon Bima Suci: Tirta Prawitasari dan Penyelaman Batin Menuju Jati Diri',
    category: 'FILOSOFI LAKON',
    author: 'Kuntowijoyo Santoso',
    date: '8 Mei 2026',
    readTime: '6 min read',
    image: '/images/story-ocean-battle.png',
    excerpt: 'Menelisik ajaran Manunggaling Kawula Gusti dalam perjalanan spiritual Werkudara.',
    sourceUrl: '/tokoh/sang-bima',
    sourceName: 'Wayang Jawi',
  },
  {
    id: 'full-card-3',
    slug: 'wayang-wong-sriwedari-merawat-tradisi',
    title: 'Wayang Wong Sriwedari: Seabad Lebih Merawat Seni Teater Tari Klasik di Surakarta',
    category: 'TEATER TARI',
    author: 'Sri Kusumaningrum',
    date: '5 Mei 2026',
    readTime: '4 min read',
    image: '/images/section5-dancers-backdrop-clean.png',
    excerpt: 'Konsistensi para penari menjaga warisan tari keraton di tengah arus modernisasi perkotaan.',
    sourceUrl: '/katalog',
    sourceName: 'Indonesia.travel',
  },
];

export const SPOTLIGHT_MAIN: NewsArticle = {
  id: 'spotlight-gunungan',
  slug: 'sejarah-dan-makna-filosofis-gunungan-wayang',
  title: 'Sejarah dan Filosofi Gunungan: Simbol Kosmologi Kehidupan dan Alam Semesta Jawa',
  category: 'SIMBOLISME BUDAYA',
  author: 'Puspasari Setyaningrum',
  date: '2 Mei 2026',
  readTime: '8 min read',
  image: '/images/wayang-puppet-dramatic.png',
  excerpt:
    'Gunungan atau Kayon bukan sekadar pembuka dan penutup babak pementasan. Di setiap goresan ornamen pohon hayat, api, binatang, dan gapura tersimpan ajaran kosmologi tentang penciptaan, harmoni alam, dan akhir perjalanan raga manusia.',
  sourceUrl: 'https://regional.kompas.com/read/2022/02/02/180653778/sejarah-dan-filosofi-gunungan-wayang-kulit-digunakan-dalam-uang-logam?page=all',
  sourceName: 'Kompas.com',
};

export const SPOTLIGHT_SIDE_ITEMS: NewsArticle[] = [
  {
    id: 'spotlight-side-1',
    slug: 'gamelan-pengiring-sakral-pakeliran',
    title: 'Harmoni Gamelan: Laras Pelog dan Slendro Mengiringi Jiwa Pementasan',
    category: 'MUSIK TRADISI',
    author: 'Drs. Rahardjo',
    date: '1 Mei 2026',
    readTime: '4 min read',
    image: '/images/hero-bg-preview.png',
    excerpt: 'Dinamika gending gender, kendang, dan gong yang mengendalikan emosi penonton.',
  },
  {
    id: 'spotlight-side-2',
    slug: 'punakawan-satir-politik-rakyat-kecil',
    title: 'Punakawan: Cermin Kritik Sosial Tanpa Tendeng Aling-Aling Kaum Jelata',
    category: 'KRITIK SOSIAL',
    author: 'Ki Anom Suroto',
    date: '28 April 2026',
    readTime: '5 min read',
    image: '/images/tokoh/wayang-1.png',
    excerpt: 'Bagaimana Semar, Gareng, Petruk, dan Bagong menyuarakan kejujuran di hadapan raja.',
    sourceUrl: '/tokoh/kyai-semar',
  },
  {
    id: 'spotlight-side-3',
    slug: 'generasi-muda-dan-dalang-cilik',
    title: 'Geliat Dalang Cilik Nusantara: Regenerasi Penjaga Warisan Leluhur',
    category: 'REGENERASI',
    author: 'Tim Redaksi',
    date: '25 April 2026',
    readTime: '4 min read',
    image: '/images/dalang-story-photo.png',
    excerpt: 'Antusiasme ribuan anak muda mendalami tata cara menyabet dan menuturkan suluk.',
  },
];

export const MOST_WATCHED_STORIES: NewsArticle[] = [
  {
    id: 'watched-1',
    slug: 'pagelaran-semalam-suntuk-bharatayuddha',
    title: 'Pagelaran Semalam Suntuk: Lakon Bharatayuddha Jayabinangun',
    category: 'PENTAS LENGKAP',
    author: 'Ki Manteb Sudarsono',
    date: '9 Mei 2026',
    readTime: '1.2M Views',
    image: '/images/hero-dancers-backdrop.png',
    excerpt: 'Klimaks pertempuran agung di Padang Kurusetra dengan iringan gamelan bergemuruh.',
  },
  {
    id: 'watched-2',
    slug: 'petruk-dadi-ratu-satir-kepemimpinan',
    title: 'Pentas Satir Petruk Dadi Ratu: Pengingat Amanah Kekuasaan',
    category: 'LAKON POPULER',
    author: 'Ki Enthus Susmono',
    date: '9 Mei 2026',
    readTime: '890K Views',
    image: '/images/tokoh/wayang-2.png',
    excerpt: 'Humor cerdas penuh filosofi moral tentang godaan tahta dan pentingnya kerendahan hati.',
  },
  {
    id: 'watched-3',
    slug: 'diplomasi-wayang-panggung-unesco-paris',
    title: 'Diplomasi Wayang: Pentas Budaya Indonesia Memukau Paris',
    category: 'INTERNASIONAL',
    author: 'Delegasi Tetap RI',
    date: '19 Mei 2026',
    readTime: '640K Views',
    image: '/images/articles/unesco-page.png',
    excerpt: 'Sambutan luar biasa publik internasional menyaksikan keajaiban bayang-bayang kelir.',
  },
];

export const MOST_READ_FEATURE: NewsArticle = {
  id: 'read-feature',
  slug: 'membedah-watak-tokoh-pewayangan',
  title: 'Membedah Filosofi Karakter Pewayangan: Dari Satria Berbudi Hingga Nafsu Angkara',
  category: 'KAJIAN UTAMA',
  author: 'Prof. Dr. Edi Sedyawati',
  date: '19 April 2026',
  readTime: '10 min read',
  image: '/images/tokoh/wayang-7.png',
  excerpt:
    'Setiap karakter wayang merupakan personifikasi dari pergulatan batin manusia. Satria Pandawa melambangkan kebajikan dan pengendalian diri, sementara Kurawa dan Rahwana mencerminkan keserakahan duniawi. Memahami wayang adalah memahami cermin jiwa kita sendiri.',
  sourceUrl: '/katalog',
};

export const MOST_READ_GRID: NewsArticle[] = [
  {
    id: 'grid-1',
    slug: 'filosofi-semar-pamong-sejati',
    title: 'Kyai Semar: Titah Dewa yang Memilih Menjadi Abdi Rakyat Jelata',
    category: 'TOKOH',
    author: 'Redaksi',
    date: '23 April 2026',
    readTime: '5 min read',
    image: '/images/tokoh/wayang-1.png',
    excerpt: 'Kearifan kepemimpinan yang melayani dari sosok Batara Ismaya.',
    sourceUrl: '/tokoh/kyai-semar',
  },
  {
    id: 'grid-2',
    slug: 'arjuna-dan-panah-pasopati',
    title: 'Sang Arjuna: Kesaktian Busur Gandiwa dan Pengendalian Diri Ksatria',
    category: 'PANDAWA',
    author: 'Redaksi',
    date: '18 April 2026',
    readTime: '6 min read',
    image: '/images/tokoh/wayang-4.png',
    excerpt: 'Bagaimana ajaran Bhagawad Gita menggembleng keteguhan batin Arjuna.',
    sourceUrl: '/tokoh/sang-arjuna',
  },
  {
    id: 'grid-3',
    slug: 'gatotkaca-dan-panah-kunta',
    title: 'Gatotkaca Gugur: Kisah Pengorbanan Suci Ksatria Pringgandani',
    category: 'HEROISME',
    author: 'Redaksi',
    date: '11 April 2026',
    readTime: '5 min read',
    image: '/images/tokoh/wayang-5.png',
    excerpt: 'Keteguhan memayungi angkasa malam demi kemenangan darma kebenaran.',
    sourceUrl: '/tokoh/sang-gatotkaca',
  },
  {
    id: 'grid-4',
    slug: 'dilema-moral-resi-drona',
    title: 'Tragedi Resi Drona: Ketika Kesetiaan Sumpah Membelenggu Kebijaksanaan',
    category: 'REFLEKSI',
    author: 'Redaksi',
    date: '15 April 2026',
    readTime: '7 min read',
    image: '/images/tokoh/wayang-9.png',
    excerpt: 'Kisah pilu sang guru agung yang terjebak dalam pusaran perang saudara.',
    sourceUrl: '/tokoh/resi-drona',
  },
];
