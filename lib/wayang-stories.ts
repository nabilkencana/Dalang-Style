/**
 * lib/wayang-stories.ts
 * Database naskah cerita dan lakon wayang kurasi Nusantara untuk Wayang Jawi.
 * Disesuaikan 1-ke-1 secara presisi dengan 9 Tokoh Wayang utama di Jagad Pakeliran.
 */

export interface StoryAct {
  actNumber: number;
  actTitle: string;
  sceneSetting?: string;
  content: string;
}

export interface CharacterProfile {
  name: string;
  role: string;
  description: string;
}

export interface WayangStoryItem {
  id: string;
  slug: string;
  tokohSlug: string; // Link directly to tokoh detail /tokoh/[slug]
  title: string;
  javaneseTitle?: string;
  category: 'mahabharata' | 'ramayana' | 'punokawan' | 'carangan' | 'ksatria';
  categoryLabel: string;
  mainCharacter: string;
  characterRole: string;
  supportingCharacters: string[];
  castProfiles?: CharacterProfile[];
  readingTime: string;
  tagline: string;
  synopsis: string;
  coverImage: string;
  sulukOpening: string;
  acts: StoryAct[];
  pituturLuhur: {
    javaneseQuote: string;
    translation: string;
    moralLesson: string;
  };
  culturalSignificance?: string;
  featured?: boolean;
}

export interface StoryCategoryOption {
  id: string;
  label: string;
  description: string;
}

export const STORY_CATEGORIES: StoryCategoryOption[] = [
  { id: 'semua', label: 'Semua Kisah', description: '9 Koleksi lakon lengkap tokoh wayang' },
  { id: 'mahabharata', label: 'Mahabharata', description: 'Perang suci trah Pandawa & takdir dharma' },
  { id: 'punokawan', label: 'Punakawan', description: 'Kearifan rakyat, humor cerdas & kritik sosial' },
  { id: 'ramayana', label: 'Ramayana', description: 'Kembara kesucian cinta & angkara Dasamuka' },
];

export const WAYANG_STORIES: WayangStoryItem[] = [
  // 1. SANG BIMA (Werkudara) — wayang-7.webp
  {
    id: 'dewa-ruci',
    slug: 'dewa-ruci',
    tokohSlug: 'sang-bima',
    title: 'Lakon Dewa Ruci (Bima Suci)',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦢꦺꦮꦫꦸꦕꦶ',
    category: 'mahabharata',
    categoryLabel: 'Mahabharata',
    mainCharacter: 'Sang Bima (Werkudara)',
    characterRole: 'Satria Pandawa • Penegak Keadilan Jodhipati',
    supportingCharacters: ['Dewa Ruci', 'Resi Durna', 'Naga Nemburnawa', 'Batara Bayu'],
    castProfiles: [
      { name: 'Sang Bima', role: 'Pencari Hakikat Sejati', description: 'Ksatria bertubuh perkasa berhati lurus pantang ingkar janji dan penjelajah samudra batin.' },
      { name: 'Dewa Ruci', role: 'Sukma Sejati Keabadian', description: 'Wujud rohani kemurnian diri yang bersemayam dalam keheningan sanubari manusia.' },
      { name: 'Resi Durna', role: 'Guru Padepokan Sokalima', description: 'Guru yang menguji muridnya dengan tugas berbahaya di luar batas akal manusia.' },
    ],
    readingTime: '7 Menit Baca',
    tagline: 'Kembara Batin Werkudara Menyelami Samudra Kesunyian',
    synopsis:
      'Perjalanan spiritual Bima mencari Air Kehidupan (Tirta Pawitra) atas titah gurunya, yang membawanya menaklukkan naga samudra hingga meraih pencerahan sejati di dalam diri Sang Dewa Ruci.',
    coverImage: '/images/stories/dewa-ruci.webp',
    sulukOpening:
      'Suluk • "Samudra sunyi tanpa tepi, manunggal sukma ing jroning raga, manggih pepadhang ing guwa garbaning Batara Kencana."',
    culturalSignificance:
      'Kisah Dewa Ruci adalah puncak sastra suluk kebatinan Jawa (Tasawuf Nusantara) yang menggambarkan tingkatan laku spiritual manusia: Syariat, Tarekat, Hakikat, dan Makrifat melalui simbolisme pengembaraan Bima.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Titah Resi Durna & Ujian Gunung Candramuka',
        sceneSetting: 'Balairung Astina & Hutan Rimba Tikbrasara',
        content: `Atas bisikan licik Sengkuni dan para Kurawa yang berniat menyingkirkan Pandawa, Resi Durna memberikan tugas yang mustahil kepada muridnya yang paling berhati lurus, Raden Werkudara. Durna menitahkan Bima untuk mencari Tirta Perwitasari (Air Suci Urip) yang konon tersembunyi di dalam gua angker Gunung Candramuka.

Bagi seorang satria berjiwa suci seperti Werkudara, perintah guru adalah amanah suci yang pantang disangkal dengan keraguan pikiran. Tanpa mendengarkan kekhawatiran saudara-saudaranya di Amarta, Bima melangkah tegap menerobos Hutan Tikbrasara.

Di lereng gunung yang terjal, dua raksasa penunggu rimba—Rukmuka dan Rukmakala—menyerang Bima dengan gada raksasa. Pertempuran sengit terjadi di sela tebing batu. Dengan keteguhan hati dan sabetan Kuku Pancanaka, Bima menumpas kedua raksasa tersebut. Tiba-tiba jasad raksasa itu sirna dan berubah menjadi Batara Indra dan Batara Bayu yang memberinya petunjuk: bahwa tirta suci sesungguhnya berada di dasar Samudra Minangkalbu.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Pertarungan Naga Nemburnawa di Laut Kidul',
        sceneSetting: 'Bibir Pantai Laut Selatan • Gelombang Dahsyat Tanpa Tepi',
        content: `Setibanya di pesisir Laut Kidul, deburan ombak bergulung setinggi bukit dengan pusaran air hitam yang mengerikan. Bima memandang luasnya samudra tanpa secuil pun rasa gentar menyusup di dadanya.

Ia melompat dan menceburkan diri ke dalam samudra raya yang gelap gulita. Di kedalaman air yang dingin mencekam, seekor naga raksasa ganas bernama Nemburnawa melilit tubuh Bima dengan kekuatan belitan yang sanggup meremukkan karang baja. Nafas Bima kian sesak di dasar laut.

Dalam detik-detik puncak antara hidup dan mati, Werkudara mematikan segala indra lahiriahnya, memusatkan heninging cipta hanya kepada Sang Hyang Tunggal. Dengan kesadaran jiwa yang bulat, Bima menghunjamkan Kuku Pancanaka tepat ke leher sang naga samudra. Seketika darah naga memancar, melarutkan kegelapan lautan menjadi air yang tenang, jernih, dan berkilauan keemasan.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Menyatu dalam Guwa Garba Sukma Sejati',
        sceneSetting: 'Dasar Samudra Hening • Dimensi Alam Keabadian Suci',
        content: `Di tengah keheningan dasar laut yang bercahaya lembut, tampaklah sesosok dewa kerdil berparas persis seperti Werkudara namun memancarkan aura kesucian yang menenteramkan: itulah Sang Dewa Ruci, wujud sukma sejati dari diri Bima sendiri.

Sang Dewa Ruci tersenyum arif dan memerintahkan Bima untuk masuk ke dalam rongga telinga kirinya. Bima sempat tertegun heran, bagaimana mungkin tubuhnya yang sebesar gunung anakan sanggup masuk ke dalam telinga sosok dewa sekecil telapak tangan? Namun dengan kepatuhan batin yang tulus, Bima melangkah masuk.

Secara ajaib, di dalam ruang kecil itu Bima justru menyaksikan jagat raya yang mahaluas tanpa batas: hamparan bintang gemerlap, perputaran surya, dan rahasia empat warna nafsu manusia—hitam (amarah/kebumian), merah (angkara/hawa nafsu), kuning (kemewahan/duniawi), dan putih (kesucian hati nurani). Bima mencapai pencerahan kasampurnan jati (Manunggaling Kawula Gusti).`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Ngelmu iku kalakone kanthi laku, lekase lawan kas, tegese kas nyantosani.',
      translation:
        'Ilmu kebajikan sejati hanya dapat diraih melalui penghayatan laku batin yang sungguh-sungguh, dimulai dari kehendak yang teguh dan membentengi jiwa.',
      moralLesson:
        'Ketaatan, kejujuran mutlak, dan keberanian membersihkan hati dari hawa nafsu akan mengantarkan manusia menemukan hakikat jati diri serta kedamaian hakiki.',
    },
    featured: true,
  },

  // 2. KYAI SEMAR — wayang-1.webp
  {
    id: 'semar-mbangun-kayangan',
    slug: 'semar-mbangun-kayangan',
    tokohSlug: 'kyai-semar',
    title: 'Lakon Semar Mbangun Kayangan',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦱꦼꦩꦂꦩ꧀ꦧꦔꦸꦤ꧀ꦏꦪꦔꦤ꧀',
    category: 'punokawan',
    categoryLabel: 'Punakawan',
    mainCharacter: 'Kyai Semar',
    characterRole: 'Punakawan • Pamong Para Ksatria',
    supportingCharacters: ['Petruk', 'Gareng', 'Bagong', 'Batara Guru'],
    castProfiles: [
      { name: 'Kyai Semar', role: 'Penjelmaan Batara Ismaya', description: 'Pamong agung berhati tulus pembimbing para satria menegakkan keadilan rakyat.' },
      { name: 'Batara Guru', role: 'Raja Jonggring Saloka', description: 'Penguasa kayangan yang diuji kesadaran moralnya oleh Sang Semar.' },
    ],
    readingTime: '6 Menit Baca',
    tagline: 'Kritik Luhur Pamong Rakyat untuk Membangun Jiwa Pemimpin Bangsa',
    synopsis:
      'Kisah Kyai Semar yang berniat "membangun kayangan" bukan dengan istana megah berbatu permata, melainkan membangun budi pekerti, moralitas, dan ketenteraman batin para pemimpin di muka bumi.',
    coverImage: '/images/stories/semar-mbangun-kayangan.webp',
    sulukOpening:
      'Suluk • "Kuncung putih rupa Semar Badranaya, tangis rakyat dadi sumpahing praja, mbangun kayangan jroning wardaya."',
    culturalSignificance:
      'Lakon Carangan adiluhung yang menyindir para penguasa yang kerap membangun proyek fisik megah namun melupakan kemakmuran dan akhlak rakyat kecil.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Keresahan Dusun Karang Kabadan',
        sceneSetting: 'Dusun Karangklesem • Suasana Paceklik dan Kegalauan Semar',
        content: `Di padepokan Karang Kabadan, Semar duduk termenung memandang sawah ladang yang kering kerontang. Korupsi merajalela di kerajaan, para satria sibuk berebut kuasa, dan rakyat kecil menderita kelaparan. 

Semar mengumpulkan ketiga anaknya: Gareng, Petruk, dan Bagong. Ia mengumumkan rencananya untuk "membangun kayangan". Gareng dan Petruk sempat bingung, mengira Semar ingin membangun gedung bertingkat di atas awan, namun Bagong mengerti bahwa maksud ayahnya adalah membangun kembali fondasi moral bangsa yang telah runtuh.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Geger Jonggring Saloka',
        sceneSetting: 'Kahyang Suralaya • Balairung Batara Guru',
        content: `Kabar rencana Semar terdengar hingga ke Kahyangan Jonggring Saloka. Batara Guru dan Batara Narada merasa tersinggung dan cemas, mengira Semar hendak mengudeta takhta para dewa.

Para dewa mengirim pasukan dewata bersenjata lengkap untuk menggagalkan niat Semar. Namun ketika berhadapan dengan Semar, sang penjelmaan Batara Ismaya mengeluarkan Aji Pangabaran. Tubuh tambun Semar membesar memenuhi angkasa, memancarkan sinar putih menyilaukan yang melumpuhkan kesombongan dewa-dewa kayangan.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Pencerahan Takhta Para Satria',
        sceneSetting: 'Balairung Amarta • Penyatuan Batin Satria dan Pamong',
        content: `Batara Guru akhirnya bersujud memohon ampun kepada kakaknya, Sang Ismaya. Semar menegaskan bahwa kayangan sejati bukanlah istana emas di langit, melainkan hati nurani para pemimpin yang jujur, bersih, dan berpihak kepada rakyat jelata.

Para Pandawa berikrar kembali memurnikan niat mereka sebagai pelayan rakyat, dan fajar kedamaian pun kembali menyinari bumi Nusantara.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Urip iku urup, dudu mung golek arta lan pangkat nanging migunani marang sesama.',
      translation: 'Hidup itu menyala, bukan semata mencari harta dan jabatan, melainkan berguna memberi terang bagi sesama.',
      moralLesson: 'Kemakmuran sejati suatu bangsa berakar dari kemuliaan budi dan keadilan para pemimpinnya.',
    },
    featured: false,
  },

  // 3. SANG ARJUNA — wayang-4.webp
  {
    id: 'arjuna-wiwaha',
    slug: 'arjuna-wiwaha',
    tokohSlug: 'sang-arjuna',
    title: 'Lakon Arjuna Wiwaha (Begawan Ciptaning)',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦲꦂꦗꦸꦤꦮꦶꦮꦲ',
    category: 'mahabharata',
    categoryLabel: 'Mahabharata',
    mainCharacter: 'Sang Arjuna (Permadi)',
    characterRole: 'Satria Pandawa • Penengah Pandawa',
    supportingCharacters: ['Dewi Supraba', 'Prabu Niwatakawaca', 'Batara Guru'],
    castProfiles: [
      { name: 'Sang Arjuna', role: 'Begawan Ciptaning', description: 'Ksatria berbusur Gandiwa yang mampu menaklukkan segala godaan hawa nafsu.' },
      { name: 'Prabu Niwatakawaca', role: 'Raja Raksasa Manimantaka', description: 'Raja angkara yang ingin menguasai kahyangan dan meminang paksa bidadari.' },
    ],
    readingTime: '6 Menit Baca',
    tagline: 'Keteguhan Batin Sang Pemanah Ulung Menghadapi Godaan Duniawi',
    synopsis:
      'Kisah tapa brata Arjuna di Gunung Indrakila dengan gelar Begawan Ciptaning, menghadapi godaan tujuh bidadari hingga diutus dewa menumpas raja raksasa Niwatakawaca.',
    coverImage: '/images/stories/wahyu-makutharama.webp',
    sulukOpening:
      'Suluk • "Heninging cipta ing pucuking arga, manah Pasopati nyamber angkara, jayaning satria Madukara."',
    culturalSignificance:
      'Karya agung kakawin era Mpu Kanwa (abad ke-11) yang mengajarkan pentingnya fokus pengendalian diri (tapa) demi mencapai kemenangan lahir dan batin.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Godaan Tujuh Bidadari Indrakila',
        sceneSetting: 'Gua Mintaraga • Puncak Gunung Indrakila',
        content: `Di dalam keheningan Gua Mintaraga, Raden Arjuna bertapa brata dengan gelar Begawan Ciptaning. Pandangan matanya tertuju pada satu titik kesadaran, mematikan hawa nafsu duniawi demi memperoleh pusaka sakti untuk membela keadilan.

Para dewa menguji keteguhan batinnya dengan mengirimkan tujuh bidadari tercantik kahyangan yang dipimpin Dewi Supraba dan Dewi Tilottama. Mereka menari, membujuk, dan merayu sang begawan. Namun napas Arjuna tetap teratur dan hening laksana telaga kaca; tiada secuil pun nafsu bergolak di dadanya.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Anugerah Panah Sakti Pasopati',
        sceneSetting: 'Lereng Gunung Indrakila • Pertarungan Babi Hutan Siluman',
        content: `Batara Guru turun menyamar sebagai pemburu liar (Kiraswara) bersamaan dengan munculnya babi hutan siluman Momongmuka yang mengamuk. Arjuna dan Kiraswara melepaskan anak panah secara bersamaan dan menewaskan babi hutan tersebut.

Perselisihan mengenai panah siapa yang pertama menancap berakhir ketika Kiraswara menampakkan wujud aslinya sebagai Sang Hyang Manikmaya. Batara Guru memuji keteguhan jiwa Arjuna dan menganugerahkan panah pusaka sakti: Pasopati.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Runtuhnya Prabu Niwatakawaca',
        sceneSetting: 'Kerajaan Manimantaka • Palagan Pemanah Sejati',
        content: `Arjuna diutus memimpin perang melawan Prabu Niwatakawaca yang hendak menghancurkan Kahyangan Kaindran. Melalui siasat Dewi Supraba yang berhasil memancing raksasa itu tertawa terbahak-bahak hingga membuka lidahnya yang menjadi titik kelemahannya, Arjuna membidikkan Panah Pasopati tepat ke langit-langit mulut sang raksasa.

Kemenangan Arjuna mengantarkannya dinobatkan sebagai raja sementara di kahyangan bergelar Prabu Karitin dan memperisteri Dewi Supraba.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Suradira jayaningrat lebur dening pangastuti.',
      translation: 'Segala kesaktian dan angkara murka akan lebur oleh kelembutan budi pekerti serta ketenangan batin.',
      moralLesson: 'Ketahanan mengendalikan hawa nafsu dan kesombongan adalah kunci utama meraih kesuksesan sejati.',
    },
    featured: false,
  },

  // 4. SANG GATOTKACA — wayang-5.webp
  {
    id: 'gatotkaca-gugur',
    slug: 'gatotkaca-gugur',
    tokohSlug: 'sang-gatotkaca',
    title: 'Lakon Gatotkaca Gugur (Kusuma Bangsa)',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦒꦠꦺꦴꦠ꧀ꦏꦕꦒꦸꦒꦸꦂ',
    category: 'mahabharata',
    categoryLabel: 'Mahabharata',
    mainCharacter: 'Sang Gatotkaca',
    characterRole: 'Satria Pandawa • Ksatria Pringgandani',
    supportingCharacters: ['Adipati Karna', 'Raden Arjuna', 'Prabu Kresna'],
    castProfiles: [
      { name: 'Sang Gatotkaca', role: 'Satria Dirgantara Perkasa', description: 'Otot kawat balung wesi, pahlawan angkasa pelindung barisan Pandawa.' },
      { name: 'Adipati Karna', role: 'Pemanah Ulung Kurawa', description: 'Pemilik senjata pamungkas Kunta Wijayadanu yang terpaksa melepaskannya di malam hari.' },
    ],
    readingTime: '5 Menit Baca',
    tagline: 'Pengorbanan Suci Kusuma Bangsa Melayang di Langit Malam Kurusetra',
    synopsis:
      'Detik-detik kepahlawanan sang satria Pringgandani yang mengorbankan jiwa raganya menghadang panah maut Kunta Wijayadanu demi menyelamatkan pamannya, Arjuna.',
    coverImage: '/images/stories/gatotkaca-gugur.webp',
    sulukOpening:
      'Suluk • "Megatruh ing akasa, kumelap praba kencana, satria Pringgandani pasrah jiwa raga kanggo kejayaaning bangsa."',
    culturalSignificance:
      'Babak paling mengharukan dalam Bharatayuddha yang melambangkan nilai patriotisme tertinggi: kerelaan berkorban demi masa depan tanah air.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Mandat Perang Malam Hari',
        sceneSetting: 'Tenda Pesanggrahan Pandawa • Padang Kurusetra',
        content: `Malam ke-14 Bharatayuddha diliputi kegelapan pekat. Kurawa melancarkan serangan malam terlarang yang membantai barisan prajurit Pandawa yang tertidur.

Prabu Kresna meminta Gatotkaca yang memiliki pandangan batin tajam di malam hari untuk naik ke angkasa. Gatotkaca menerima mandat suci itu dengan ikhlas demi melindungi keselamatan saudara-saudaranya.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Amukan Brajamusti di Puncak Awan',
        sceneSetting: 'Langit Malam Kurusetra • Petir Menyambar di Angkasa',
        content: `Melesatlah Gatotkaca mengenakan Rompi Antakusuma. Pukulan ajian Brajamusti dari atas awan memporak-porandakan ribuan prajurit Kurawa. 

Melihat kekalahan telak pasukannya, Adipati Karna terpaksa menarik senjata pamungkas Kunta Wijayadanu yang disimpan khusus untuk membunuh Arjuna. Kilatan cahaya Kunta melesat membakar langit malam memburu Gatotkaca.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Runtuhnya Kereta Jaladara',
        sceneSetting: 'Cakrawala Fajar Kurusetra',
        content: `Gatotkaca menyadari takdirnya telah tiba. Sebelum pusaka Kunta merenggut nyawanya, ia membesarkan tubuhnya menjadi raksasa setinggi bukit dan menjatuhkan jasadnya tepat menimpa kereta perang Adipati Karna.

Gugurnya Gatotkaca menyelamatkan Arjuna dan memastikan kemenangan Pandawa dalam menegakkan dharma.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Gugur ing madyaning rana minangka kusuma bangsa, patembayatan suci tan bakal sirna.',
      translation: 'Gugur di medan laga sebagai bunga bangsa, pengorbanan suci tak akan pernah lekang oleh masa.',
      moralLesson: 'Ksatria sejati mendahulukan keselamatan bangsanya di atas keselamatan jiwa raganya sendiri.',
    },
    featured: false,
  },

  // 5. KYAI PETRUK — wayang-2.webp
  {
    id: 'petruk-dadi-ratu',
    slug: 'petruk-dadi-ratu',
    tokohSlug: 'kyai-petruk',
    title: 'Lakon Petruk Dadi Ratu (Belgeduwelbeh)',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦥꦺꦠꦿꦸꦏ꧀ꦢꦢꦶꦫꦠꦸ',
    category: 'punokawan',
    categoryLabel: 'Punakawan',
    mainCharacter: 'Kyai Petruk',
    characterRole: 'Punakawan • Cerdas & Jenaka',
    supportingCharacters: ['Kyai Semar', 'Gareng', 'Bagong', 'Prabu Puntadewa'],
    castProfiles: [
      { name: 'Kyai Petruk', role: 'Prabu Welgeduwelbeh', description: 'Punakawan bertubuh jangkung yang secara tak sengaja memegang pusaka Jamus Kalimasada dan menjadi raja.' },
      { name: 'Kyai Bagong', role: 'Pamong Penyadaran', description: 'Adik bungsu yang berani membongkar kepalsuan tahta sang kakak.' },
    ],
    readingTime: '5 Menit Baca',
    tagline: 'Satire Cerdas Mengenai Kekuasaan, Godaan Tahta, dan Hakikat Wong Cilik',
    synopsis:
      'Kisah jenaka penuh pitutur ketika Petruk menemukan pusaka Jamus Kalimasada yang hilang, mendirikan kerajaan Ngrancang Kencana, dan menguji para bangsawan yang kerap memandang remeh rakyat jelata.',
    coverImage: '/images/stories/petruk-dadi-ratu.webp',
    sulukOpening:
      'Suluk • "Petruk Kantong Bolong madeg narendra, ngguyu lakune jagad kang kebak sandiwara, bali marang jatining abdi."',
    culturalSignificance:
      'Kritik sosial tajam dalam tradisi pedalangan Jawa mengenai sifat kekuasaan yang kerap membuat manusia lupa diri jika tidak dilandasi kerendahan hati.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Hilangnya Pusaka Jamus Kalimasada',
        sceneSetting: 'Kerajaan Amarta & Hutan Krendhawahana',
        content: `Pusaka lambang kedaulatan negara Amarta, Jimat Kalimasada, raib dicuri oleh siluman Mustakaweni. Para satria Pandawa kalang kabut mencari pusaka tersebut.

Di tengah hutan, Petruk yang sedang mencari kayu bakar berhasil merebut kembali pusaka tersebut. Merasakan energi sakti yang merasuk ke dalam tubuhnya, Petruk tergiur untuk mencicipi bagaimana rasanya menjadi penguasa yang dihormati dan ditakuti.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Takhta Megah Prabu Welgeduwelbeh',
        sceneSetting: 'Keraton Ngrancang Kencana • Balairung Istana Baru',
        content: `Dengan kesaktian Kalimasada, Petruk menyulap dirinya menjadi raja perkasa bergelar Prabu Welgeduwelbeh dan mendirikan kerajaan megah Ngrancang Kencana.

Para raja tetangga dan patih istana takluk di hadapannya. Prabu Welgeduwelbeh memanfaatkan tahtanya untuk menyindir kebiasaan para bangsawan yang suka disanjung, doyan upeti, dan lamban menolong rakyat miskin.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Teguran Semar & Kesadaran Jati Diri',
        sceneSetting: 'Alun-Alun Keraton Ngrancang Kencana',
        content: `Semar dan Bagong datang menyusup ke istana. Bagong menantang Prabu Welgeduwelbeh adu kesaktian dan membongkar identitas aslinya.

Melihat sang ayah (Semar) menangis melihat tingkahnya yang mulai terlena oleh kemewahan istana, Petruk tersadar seketika. Ia melepas mahkotanya, bersujud di kaki Semar, dan mengembalikan Jamus Kalimasada kepada Pandawa.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Aja dumeh kuwasa banjur kemingsun, elinga yen pangkat iku mung sampiran urip.',
      translation: 'Jangan mentang-mentang berkuasa lantas sombong, ingatlah bahwa jabatan hanyalah titipan sementara.',
      moralLesson: 'Kekuasaan adalah amanah melayani, bukan alat menimbun kehormatan pribadi.',
    },
    featured: false,
  },

  // 6. KYAI BAGONG — wayang-3.webp
  {
    id: 'bagong-kembar',
    slug: 'bagong-kembar',
    tokohSlug: 'kyai-bagong',
    title: 'Lakon Bagong Kembar (Bawor Sejati)',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦧꦒꦺꦴꦁꦏꦼꦩ꧀ꦧꦂ',
    category: 'punokawan',
    categoryLabel: 'Punakawan',
    mainCharacter: 'Kyai Bagong',
    characterRole: 'Punakawan • Kritis & Jujur',
    supportingCharacters: ['Kyai Semar', 'Petruk', 'Gareng', 'Sang Arjuna'],
    castProfiles: [
      { name: 'Kyai Bagong', role: 'Penyuara Kebenaran Lugu', description: 'Putra bungsu Semar ciptaan bayangan yang jujur tanpa kompromi dan anti kemunafikan.' },
      { name: 'Bagong Palsu', role: 'Siluman Penyamar', description: 'Jelmaan makhluk halus yang mencoba memecah belah kerukunan keluarga Punakawan.' },
    ],
    readingTime: '5 Menit Baca',
    tagline: 'Kejujuran Lugu yang Membongkar Kepalsuan dan Fitnah di Istana',
    synopsis:
      'Kisah kekacauan di padepokan ketika muncul sosok Bagong tiruan yang persis rupa dan suaranya, hingga Sang Semar menguji kemurnian hati nurani untuk menemukan Bagong yang sejati.',
    coverImage: '/images/stories/babat-alas-wanamarta.webp',
    sulukOpening:
      'Suluk • "Bayangan sukma mijil saking hening, Bagong Bawor blak-kotang tanpa tanding, mecah gorohing jagad."',
    culturalSignificance:
      'Mengajarkan bahwa kebenaran sejati tidak bisa dipalsukan oleh rupa lahiriah, melainkan dinilai dari kemurnian budi pekerti dan kejujuran kata.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Geger Dua Bagong di Paseban',
        sceneSetting: 'Paseban Kadipaten Madukara',
        content: `Suasana di Kadipaten Madukara mendadak gempar ketika dua sosok Bagong yang sama persis masuk ke balairung dan saling menuding bahwa lawannya adalah siluman palsu.

Raden Arjuna dan para prajurit bingung membedakan keduanya karena wajah bulat, mata melotot, dan nada suara keduanya sama persis. Keduanya bahkan sama-sama hafal silsilah keluarga Semar.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Ujian Urat Malu & Ketamakan Harta',
        sceneSetting: 'Halaman Balai Karang Kabadan',
        content: `Petruk dan Gareng menguji kedua Bagong dengan menyodorkan sekarung koin emas permata. Bagong pertama langsung memeluk sekarung emas dengan mata berbinar-binar penuh ketamakan.

Sedangkan Bagong kedua justru menendang karung emas itu dan memaki Petruk karena bersikap bodoh menyodorkan suap di tengah rakyat yang sedang kesusahan.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Sabda Kyai Semar',
        sceneSetting: 'Pelataran Semar Badranaya',
        content: `Kyai Semar tersenyum melihat kejadian itu. Semar menegaskan bahwa Bagong sejati tercipta dari bayangannya sendiri, yang pantang silau oleh gemerlap emas dan tidak takut berkata jujur meskipun pahit.

Bagong palsu seketika terbakar menjadi abu, membuktikan bahwa kepalsuan akan selalu lebur di hadapan kemurnian watak sejati.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Sing bener dibenerke, sing salah disalahke, aja wedi nyuarakake becik.',
      translation: 'Yang benar dibenarkan, yang salah disalahkan, jangan pernah takut menyuarakan kebenaran.',
      moralLesson: 'Kejujuran nurani adalah perisai terkuat yang tak dapat dipalsukan oleh tipu muslihat apa pun.',
    },
    featured: false,
  },

  // 7. NALA GARENG — wayang-6.webp
  {
    id: 'nala-gareng-meguru',
    slug: 'nala-gareng-meguru',
    tokohSlug: 'nala-gareng',
    title: 'Lakon Nala Gareng Meguru (Bambang Sukodadi)',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦤꦭꦒꦫꦺꦁꦩꦼꦒꦸꦫꦸ',
    category: 'punokawan',
    categoryLabel: 'Punakawan',
    mainCharacter: 'Nala Gareng',
    characterRole: 'Punakawan • Bijak & Bersahaja',
    supportingCharacters: ['Kyai Semar', 'Petruk', 'Begawan Sukasrana'],
    castProfiles: [
      { name: 'Nala Gareng', role: 'Punakawan Tertua', description: 'Simbol kehati-hatian dalam melangkah, mawas diri, dan penengah persaudaraan yang sabar.' },
      { name: 'Kyai Semar', role: 'Guru Kehidupan', description: 'Ayah angkat yang membimbing Gareng memahami makna simbolik di balik kekurangan ragawi.' },
    ],
    readingTime: '5 Menit Baca',
    tagline: 'Falsafah Mawas Diri, Kehati-hatian Melangkah, dan Kedamaian Persaudaraan',
    synopsis:
      'Kisah asal-usul Nala Gareng (Bambang Sukodadi) yang menuntut ilmu kebatinan sejati hingga memahami makna mendalam dari kaki berjingkit, tangan ceko, dan mata julingnya sebagai perisai hawa nafsu.',
    coverImage: '/images/stories/srikandi-meguru-manah.webp',
    sulukOpening:
      'Suluk • "Mlaku jingkit eling ing pambudi, tangan ceko emoh njupuk darbine liyan, mawas diri sajroning urip."',
    culturalSignificance:
      'Mengajarkan filosofi Jawa adiluhung mengenai makna simbolis raga Gareng sebagai tuntunan moral manusia dalam meniti jalan kehidupan.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Pertarungan Masa Muda Bambang Sukodadi',
        sceneSetting: 'Pertapaan Gandamekar',
        content: `Dahulu kala, Nala Gareng adalah seorang ksatria muda berparas tampan bernama Bambang Sukodadi. Karena merasa dirinya paling sakti, ia bertarung mati-matian melawan ksatria muda lain bernama Bambang Pecruk Panyukro (Petruk).

Pertarungan sengit tanpa ujung itu membuat raga keduanya remuk redam: wajah tampan mereka berubah menjadi lucu dan cacat, hingga Semar datang melerai dan mengangkat keduanya menjadi anak asuh.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Wejangan Makna Raga dari Semar',
        sceneSetting: 'Gubuk Teduh Dusun Karang Klesem',
        content: `Gareng sempat bersedih melihat kakinya yang kini pincang berjingkit dan tangannya yang melengkung bengkok. 

Semar membelai kepala anak sulungnya dan memberi wejangan: "Kaki pincangmu adalah pengingat agar engkau selalu berhati-hati melangkah di dunia. Tangan bengkokmu adalah benteng agar engkau pantang mengambil hak orang lain. Dan mata julingmu adalah penolak agar engkau tidak sudi memandang keburukan orang lain."`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Kematangan Jiwa Sang Penengah',
        sceneSetting: 'Paseban Agung Keraton Amarta',
        content: `Sejak saat itu, Nala Gareng menjelma menjadi sosok punakawan yang paling bijaksana, sabar, dan selalu menjadi penengah yang menyejukkan ketika adik-adiknya (Petruk dan Bagong) berselisih paham.

Gareng membuktikan bahwa kemuliaan seseorang tidak diukur dari ketampanan raga, melainkan dari kebersihan budi pekerti dan kehati-hatian menjaga kehormatan diri.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Mlaku jingkit dudu alesan mandeg, mawas diri iku dalaning slamet.',
      translation: 'Berjalan pincang bukan alasan berhenti melangkah, mawas diri adalah jalan keselamatan hidup.',
      moralLesson: 'Keterbatasan fisik bukanlah aib, melainkan pengingat suci agar manusia tidak sombong.',
    },
    featured: false,
  },

  // 8. PRABU RAHWANA — wayang-8.webp
  {
    id: 'prabu-rahwana-sirna',
    slug: 'prabu-rahwana-sirna',
    tokohSlug: 'prabu-rahwana',
    title: 'Lakon Sirnaning Dasamuka (Bedhahan Alengka)',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦱꦶꦂꦤꦤꦶꦁꦢꦱꦩꦸꦏ',
    category: 'ramayana',
    categoryLabel: 'Ramayana',
    mainCharacter: 'Prabu Rahwana (Dasamuka)',
    characterRole: 'Prabu Alengka • Raja Dasamuka',
    supportingCharacters: ['Sri Rama Wijaya', 'Anoman', 'Gunawan Wibisana', 'Kumbakarna'],
    castProfiles: [
      { name: 'Prabu Rahwana', role: 'Raja Raksasa Dasamuka', description: 'Penguasa Alengka pemilik Aji Pancasona yang diperbudak sepuluh nafsu angkara murka.' },
      { name: 'Sri Rama Wijaya', role: 'Titisan Batara Wisnu', description: 'Satria penegak kebenaran bersenjatakan Panah Guwawijaya pembebas kesucian Shinta.' },
    ],
    readingTime: '6 Menit Baca',
    tagline: 'Runtuhnya Keangkuhan Penguasa Tirani di Hadapan Ketulusan Dharma',
    synopsis:
      'Puncak perang suci wiracarita Ramayana di mana Prabu Rahwana dengan kesaktian Aji Pancasona akhirnya tumbang di bawah Gunung Somawana oleh bidikan Panah Guwawijaya Sri Rama.',
    coverImage: '/images/stories/kumbakarna-gugur.webp',
    sulukOpening:
      'Suluk • "Alengka kobong lebur sirna, aji Pancasona katindhih redi Somawana, angkara murka sirna dening panah Wijaya."',
    culturalSignificance:
      'Simbolisasi puncak hancurnya ego dan hawa nafsu manusia (sepuluh kepala Dasamuka) ketika berhadapan dengan kesucian jiwa dan kehendak Ilahi.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Runtuhnya Benteng Alengka Diraja',
        sceneSetting: 'Alun-Alun Istana Alengka • Dikelilingi Kobaran Api',
        content: `Setelah gugurnya Senapati Indrajit dan satria perkasa Kumbakarna, bala tentara kera Sri Rama berhasil menjebol gerbang benteng emas Alengka. 

Prabu Dasamuka yang murka mengenakan busana perang kebesaran bermahkotakan sepuluh kepala. Ia menaiki kereta kencana dan bersumpah akan menenggelamkan seluruh laskar Ayodya ke dasar samudra.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Kedahsyatan Aji Pancasona',
        sceneSetting: 'Palagan Samudra Hindia • Suara Guntur Menggelegar',
        content: `Pertarungan antara Sri Rama dan Rahwana mengguncang bumi dan langit. Berkali-kali panah sakti Rama memenggal kepala Rahwana, namun berkat Aji Pancasona, setiap kali jasadnya menyentuh tanah bumi, kepala dan tubuhnya menyatu kembali seketika.

Melihat hal itu, Gunawan Wibisana memberi petunjuk kepada Sri Rama bahwa Rahwana hanya dapat dilumpuhkan jika jasadnya ditindih gunung batu sebelum sempat menyentuh tanah.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Himpitan Gunung Somawana',
        sceneSetting: 'Cakrawala Senja Alengka • Kemenangan Kesucian Shinta',
        content: `Rama melepaskan panah pusaka pamungkas Guwawijaya yang menembus dada Rahwana dan membuatnya terpental ke angkasa. Sebelum tubuh sang raja raksasa menyentuh bumi, Anoman mencabut Gunung Somawana dan menghimpit tubuh Rahwana di bawah bongkahan gunung purba tersebut.

Rahwana tak berdaya menanggung beban gunung keangkuhannya sendiri, menandai sirnanya tirani angkara murka dan bersinarnya kembali fajar kesucian Dewi Shinta.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Sing sapa nandur ngundhuh, angkara murka bakal sirna dening budi pekerti kang luhur.',
      translation: 'Siapa yang menanam akan menuai, segala kezaliman pasti akan binasa oleh budi pekerti yang luhur.',
      moralLesson: 'Kekuasaan dan kesaktian tanpa kendali moral laksana api yang membinasakan pemiliknya sendiri.',
    },
    featured: false,
  },

  // 9. RESI DRONA — wayang-9.webp
  {
    id: 'resi-drona-gugur',
    slug: 'resi-drona-gugur',
    tokohSlug: 'resi-drona',
    title: 'Lakon Drona Gugur (Tragedi Sokalima)',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦢꦿꦺꦴꦤꦒꦸꦒꦸꦂ',
    category: 'mahabharata',
    categoryLabel: 'Mahabharata',
    mainCharacter: 'Resi Drona (Begawan Durna)',
    characterRole: 'Pujangga Hastina • Guru Besar Sokalima',
    supportingCharacters: ['Raden Drestajumena', 'Prabu Puntadewa', 'Aswatama', 'Prabu Kresna'],
    castProfiles: [
      { name: 'Resi Drona', role: 'Guru Agung Senapati Kurawa', description: 'Guru sakti para ksatria Pandawa dan Kurawa yang terikat sumpah membela takhta Hastina.' },
      { name: 'Raden Drestajumena', role: 'Senapati Agung Pandawa', description: 'Putra Prabu Drupada yang ditakdirkan dewata mengakhiri riwayat Begawan Drona.' },
    ],
    readingTime: '6 Menit Baca',
    tagline: 'Dilema Moral Sang Guru Agung di Balik Kabut Tragedi Perang Suci',
    synopsis:
      'Kisah gugurnya Begawan Drona pada hari ke-15 Bharatayuddha setelah kehilangan semangat bertarung akibat kabar kematian "Hestitama", hingga pasrah menjemput takdir di tangan Drestajumena.',
    coverImage: '/images/stories/bisma-gugur.webp',
    sulukOpening:
      'Suluk • "Sokalima layu kabur kanginan, panah Cundamanik pedhot ing tawang, guru agung pasrah ing astane Hyang Widdhi."',
    culturalSignificance:
      'Tragedi kemanusiaan paling mendalam mengenai keterikatan orang tua pada anak (kasih sayang buta) dan dilema moral antara kewajiban profesi serta kebenaran dharma.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Kedahsyatan Senapati Agung Sokalima',
        sceneSetting: 'Tenda Kurusetra • Fajar Hari ke-15 Perang',
        content: `Setelah gugurnya Bisma, Begawan Drona diangkat menjadi panglima tertinggi bala tentara Kurawa. Dengan pusaka panah Cundamanik dan ajian Danurweda, sang guru tua menyapu bersih sayap pertahanan prajurit Pandawa.

Tiada seorang pun ksatria Pandawa yang sanggup membendung kepiawaian guru mereka sendiri dalam meracik strategi perang.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Siasat Gajah Hestitama',
        sceneSetting: 'Tengah Medan Tempur Kurusetra • Debu Mengaburkan Pandangan',
        content: `Prabu Kresna merancang siasat untuk mematahkan konsentrasi batin sang guru. Bima membunuh gajah perang perkasa milik Prabu Indrajanu yang bernama Hestitama.

Seluruh laskar bersorak: "Aswatama gugur!". Mendengar nama putranya disebut tewas, Drona gemetar dan mendekati Prabu Puntadewa yang dikenal tidak pernah berbohong. Puntadewa menjawab dengan suara pelan: "Hestitama (gajah) kang pejah", namun kata "gajah" tersamarkan oleh tabuhan genderang perang Kresna.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Kelepasan Sukma Sang Resi',
        sceneSetting: 'Medan Laga Kurusetra • Senja Hari ke-15',
        content: `Drona meletakkan senjatanya dan duduk bermeditasi di atas keretanya untuk melepaskan sukmanya ke alam kelanggengan.

Dalam keadaan hening tanpa perlawanan, Raden Drestajumena melompat dan memenggal leher sang Begawan, menuntaskan takdir kelahiran mereka. Sukma Sang Resi Drona melesat menuju swargaloka diiringi taburan bunga para dewa.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Tresna marang anak aja nganti nglalekake bebener, darmaning guru iku suci tanpa pamrih.',
      translation: 'Kasih sayang kepada anak jangan sampai membutakan kebenaran, kewajiban seorang guru adalah suci tanpa pamrih.',
      moralLesson: 'Ilmu dan keahlian tertinggi harus disertai kejernihan batin dalam membedakan kesetiaan sejati dari belenggu keduniawian.',
    },
    featured: false,
  },
];

/**
 * Helper untuk mengambil cerita berdasarkan slug atau id
 */
export function getStoryBySlug(slug: string): WayangStoryItem | undefined {
  if (!slug) return undefined;
  const s = slug.toLowerCase();
  return WAYANG_STORIES.find(
    (item) =>
      item.slug.toLowerCase() === s ||
      item.id.toLowerCase() === s ||
      item.tokohSlug.toLowerCase() === s ||
      item.mainCharacter.toLowerCase().includes(s)
  );
}
