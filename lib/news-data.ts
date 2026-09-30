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
  image: '/images/articles/unesco-page.png',
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
  image: '/images/articles/kompas-page.png',
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
    image: '/images/articles/antara-kimanteb.png',
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
    image: '/images/articles/kompas-pandawa.png',
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
    image: '/images/articles/kemendikbud-page.png',
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
  image: '/images/articles/kompas-jenis.png',
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
    image: '/images/articles/kompas-punakawan.png',
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
    image: '/images/articles/tempo-kimanteb.png',
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
    image: '/images/articles/cnn-anomsuroto.png',
    excerpt: 'Dedikasi maestro pedalangan asal Klaten membawa kekayaan seni wayang kulit ke panggung internasional.',
    sourceUrl: 'https://www.cnnindonesia.com/hiburan/20231115005304-241-1024319/profil-ki-anom-suroto-maestro-dalang-masuk-timnas-amin',
    sourceName: 'CNN Indonesia',
  },
];

export const MOST_WATCHED_STORIES: NewsArticle[] = [
  {
    id: 'watched-1',
    slug: 'video-pentas-bima-suci',
    title: 'Dokumentasi Pentas Lakon Bima Suci: Tirta Prawitasari Samudera Batin',
    category: 'PENTAS DIGITAL',
    author: 'Sanggar Wayang Jawi',
    date: '12 Mei 2026',
    readTime: '1.2M Views',
    image: '/images/bima-stage-clean-v2.png',
    excerpt: 'Pergelaran dramatis tata panggung pencarian air suci kehidupan di kedalaman samudra kosmik.',
    sourceUrl: 'https://regional.kompas.com/read/2022/02/02/180653778/sejarah-dan-filosofi-gunungan-wayang-kulit-digunakan-dalam-uang-logam?page=all',
    sourceName: 'Kompas.com',
  },
  {
    id: 'watched-2',
    slug: 'video-wayang-wong-sriwedari',
    title: 'Dokumentasi Wayang Wong Sriwedari: Seabad Merawat Seni Teater Tari Keraton',
    category: 'TEATER TARI',
    author: 'Dokumentasi Budaya',
    date: '5 Mei 2026',
    readTime: '890K Views',
    image: '/images/section5-dancers-backdrop-clean.png',
    excerpt: 'Keanggunan gerak tari klasik dan tata busana megah ksatria wayang orang di panggung Sriwedari Surakarta.',
    sourceUrl: 'https://www.tempo.co/hiburan/mengenal-macam-macam-wayang-di-indonesia-2087337',
    sourceName: 'Tempo.co',
  },
  {
    id: 'watched-3',
    slug: 'video-festival-wayang-nusantara',
    title: 'Pentas Kolosal Wayang Nusantara: Harmoni Gerak Tari dan Suluk Pedalangan',
    category: 'FESTIVAL NASIONAL',
    author: 'Kanal Budaya',
    date: '28 April 2026',
    readTime: '640K Views',
    image: '/images/hero-dancers-backdrop.png',
    excerpt: 'Perpaduan megah orkestrasi gamelan slendro pelog dengan ratusan seniman tari tradisi.',
    sourceUrl: 'https://jateng.antaranews.com/foto/590937/159-dalang-cilik-tampil-dalam-pentas-dalang-bocah-nusantara-2025-di-solo',
    sourceName: 'Antara News',
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
  image: '/images/articles/cnn-kiseno.png',
  excerpt:
    'Berpulangnya Ki Seno Nugroho menyisakan duka mendalam bagi jagad pewayangan. Kepiawaiannya mengolah lakon Punakawan dengan gaya kekinian berhasil memikat jutaan anak muda untuk kembali mencintai seni tradisi wayang kulit.',
  sourceUrl: 'https://www.cnnindonesia.com/hiburan/20201104064637-241-565603/dalang-kondang-ki-seno-nugroho-meninggal-dunia',
  sourceName: 'CNN Indonesia',
};

export const MOST_READ_GRID: NewsArticle[] = [
  {
    id: 'grid-1',
    slug: 'filosofi-kyai-semar-pamong-sejati',
    title: 'Kyai Semar: Falsafah Dewa yang Memilih Menjadi Abdi dan Pamong Nurani Rakyat',
    category: 'TOKOH PUNAKAWAN',
    author: 'Puspasari Setyaningrum',
    date: '1 November 2022',
    readTime: '5 min read',
    image: '/images/tokoh/wayang-1.png',
    excerpt: 'Kearifan kepemimpinan yang melayani dari sosok Batara Ismaya di marcapada.',
    sourceUrl: 'https://yogyakarta.kompas.com/read/2022/11/01/152425178/mengenal-punakawan-tokoh-pewayangan-jawa-yang-penuh-filosofi?page=all',
    sourceName: 'Kompas.com',
  },
  {
    id: 'grid-2',
    slug: 'arjuna-dan-panah-pasopati',
    title: 'Sang Arjuna: Kesaktian Panah Pasopati dan Keteguhan Hati Ksatria Madukara',
    category: 'KSATRIA PANDAWA',
    author: 'Puspasari Setyaningrum',
    date: '17 November 2022',
    readTime: '6 min read',
    image: '/images/tokoh/wayang-4.png',
    excerpt: 'Bagaimana ajaran suci Gita menggembleng kemurnian batin Arjuna di Kurusetra.',
    sourceUrl: 'https://yogyakarta.kompas.com/read/2022/11/17/203556078/mengenal-pandawa-lima-nama-silsilah-dan-senjata?page=all',
    sourceName: 'Kompas.com',
  },
  {
    id: 'grid-3',
    slug: 'kepahlawanan-sang-gatotkaca',
    title: 'Gatotkaca Gugur: Kisah Pengorbanan Suci Ksatria Otot Kawat Balung Wesi',
    category: 'HEROISME KELIR',
    author: 'Kanya Anindita',
    date: '8 Februari 2023',
    readTime: '5 min read',
    image: '/images/tokoh/wayang-5.png',
    excerpt: 'Keteguhan memayungi angkasa malam demi kemenangan darma kebenaran.',
    sourceUrl: 'https://news.detik.com/berita/d-6558584/10-karakter-wayang-kulit-yang-terkenal',
    sourceName: 'detikNews',
  },
  {
    id: 'grid-4',
    slug: 'penyelaman-samudera-batin-bima',
    title: 'Penyelaman Samudera Batin: Hakikat Air Kehidupan Dewa Ruci',
    category: 'KAJIAN MISTIK JAWA',
    author: 'Ali Marsudi',
    date: '25 November 2024',
    readTime: '7 min read',
    image: '/images/story-ocean-battle.png',
    excerpt: 'Menembus badai samudera Minangkalbu demi menemukan kesempurnaan sejati.',
    sourceUrl: 'https://rri.co.id/surakarta/hiburan/1142699/about.html',
    sourceName: 'RRI Surakarta',
  },
];
