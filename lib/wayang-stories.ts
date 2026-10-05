/**
 * lib/wayang-stories.ts
 * Database naskah cerita dan lakon wayang kurasi Nusantara untuk Wayang Jawi.
 * Disusun secara mendalam, lengkap 3 babak pedalangan klasik, dan tanpa dependensi AI.
 */

export interface StoryAct {
  actNumber: number;
  actTitle: string; // e.g. "Babak I: Pathet Nem - Jejer Pasewakan"
  sceneSetting?: string; // e.g. "Keraton Alengka Diraja • Malam Hari"
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
  title: string;
  javaneseTitle?: string;
  category: 'mahabharata' | 'ramayana' | 'carangan' | 'punokawan' | 'ksatria';
  categoryLabel: string;
  mainCharacter: string;
  characterRole: string;
  supportingCharacters: string[];
  castProfiles?: CharacterProfile[];
  readingTime: string; // e.g. "6 Menit Baca"
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
  { id: 'semua', label: 'Semua Kisah', description: 'Koleksi lengkap wiracarita nusantara' },
  { id: 'mahabharata', label: 'Mahabharata', description: 'Perang suci trah Bharata & takdir dharma' },
  { id: 'ramayana', label: 'Ramayana', description: 'Kembara kesucian cinta & kepahlawanan ksatria' },
  { id: 'carangan', label: 'Lakon Carangan', description: 'Gubahan eksploratif sastra pedalangan keraton' },
  { id: 'punokawan', label: 'Punokawan', description: 'Kearifan rakyat, humor cerdas & kritik sosial' },
  { id: 'ksatria', label: 'Ksatria & Tokoh', description: 'Sorotan jiwa ksatria & tokoh legendaris' },
];

export const WAYANG_STORIES: WayangStoryItem[] = [
  {
    id: 'anoman-obong',
    slug: 'anoman-obong',
    title: 'Lakon Anoman Obong',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦲꦤꦺꦴꦩꦤ꧀ꦲꦺꦴꦧꦺꦴꦁ',
    category: 'ramayana',
    categoryLabel: 'Ramayana',
    mainCharacter: 'Anoman (Kera Putih)',
    characterRole: 'Senapati Rewanda • Putra Batara Bayu',
    supportingCharacters: ['Dewi Shinta', 'Prabu Rahwana', 'Raden Indrajit', 'Dewi Trijatha'],
    castProfiles: [
      { name: 'Anoman', role: 'Duta Kera Putih', description: 'Satria berdarah Batara Bayu yang sakti, suci, dan memiliki aji Bayubraja serta Sepiangin.' },
      { name: 'Dewi Shinta', role: 'Permaisuri Sri Rama', description: 'Lambang kesucian wanita sejati yang pantang tunduk pada tirani Dasamuka.' },
      { name: 'Prabu Rahwana', role: 'Raja Alengka', description: 'Penguasa raksasa berkepala sepuluh yang angkara murka dan diperbudak nafsu.' },
      { name: 'Raden Indrajit', role: 'Putra Mahkota Alengka', description: 'Pemanah sakti pemilik senjata Nagapasa yang licin dan tangguh.' },
    ],
    readingTime: '6 Menit Baca',
    tagline: 'Badai Api Kesucian di Jantung Kerajaan Alengka Diraja',
    synopsis:
      'Kisah kepahlawanan duta suci Anoman menembus benteng pertahanan Alengka untuk menemui Dewi Shinta, yang berujung pada aksi pembakaran istana emas dengan ekornya yang berpijar laksana kawah Candradimuka.',
    coverImage: '/images/tokoh/wayang-6.webp',
    sulukOpening:
      'Suluk • "Mlesat ing gegana lir thathit nyamber wengi, Kera Putih satria Bayu mbela sucining narendra Rama."',
    culturalSignificance:
      'Lakon Anoman Obong merupakan salah satu lakon paling populer dalam seni pertunjukan wayang kulit dan sendratari Ramayana Jawa. Menyimbolkan bahwa kebenaran dan kesucian hati tidak akan pernah hangus terbakar oleh api angkara murka.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Duta Suci Menembus Taman Soka',
        sceneSetting: 'Paseban Taman Soka • Keraton Alengka • Suasana Hening Larut Malam',
        content: `Malam merayap hening di sekeliling kraton Alengka Diraja. Kabut tipis menyelimuti dinding-dinding benteng emas yang kokoh dijaga oleh ribuan prajurit raseksa bertombak panjang. Di atas dahan pohon nagasari yang rindang di sudut Taman Soka, sesosok bayangan berbulu putih salju bergeming tanpa menimbulkan derit dahan sedikit pun. Itulah Anoman, satria kera putih putra Batara Bayu yang mengemban mandat suci dari Sri Rama Wijaya.

Di bawah temaram pelita taman, tampak Dewi Shinta yang berwajah pucat namun memancarkan keagungan sukma yang tak ternodai. Didampingi oleh Dewi Trijatha—putri Gunawan Wibisana yang setia melindunginya—sang permaisuri menolak segala bujuk rayu dan ancaman Prabu Rahwana yang saban malam memaksanya menjadi garwa padmi.

Ketika suasana kembali sunyi, Anoman melompat turun dengan sembah hormat yang teramat santun. Dari balik simpanan bajunya, ia mengeluarkan cincin mustika pusaka Sri Rama dan menyerahkannya ke hadapan Shinta. Seketika air mata haru menetes di pipi sang dewi; cincin itu pas melekat di jemarinya, membuktikan bahwa fajar keselamatan telah kian dekat dan kesetiaan mereka tak tergoyahkan oleh tirani Dasamuka.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Jerat Nagapasa & Kobaran Ekor Mayapada',
        sceneSetting: 'Alun-alun Agung Kerajaan Alengka • Dikelilingi Ribuan Raksasa',
        content: `Namun ketenangan itu segera pecah. Suara terompet kerang dan genderang perang berdentang membahana. Pasukan raseksa Alengka di bawah pimpinan Senapati Prahasta dan putra mahkota Raden Indrajit mengepung rapat seluruh penjuru Taman Soka. Pertarungan sengit tak terelakkan. Anoman dengan lincah memainkan jurus-jurus cakar kera sakti, menumbangkan puluhan prajurit raksasa.

Melihat pasukannya kocar-kacir, Raden Indrajit melepaskan panah pusaka sakti Nagapasa. Ribuan ular naga gaib meluncur dari angkasa dan melilit tubuh sang kera putih hingga tak berkutik. Anoman sengaja tidak meronta dan membiarkan dirinya ditawan, sebab ia bertekad mengukur langsung kekuatan balairung Prabu Dasamuka dari jarak dekat.

Di hadapan singgasana Alengka, Prabu Rahwana tertawa terbahak-bahak penuh keangkuhan. Tanpa mengindahkan tata krama perlakuan terhadap duta perang, Rahwana memerintahkan agar Anoman diseret ke tengah alun-alun dan dibakar hidup-hidup. Beratus-ratus gulungan kain mori berselimut minyak jarak dililitkan ke ekor panjang Anoman. Saat api disulut dan lidah kobaran merah menjilat angkasa, Anoman justru melafalkan ajian Sepiangin dan Bayubraja. Dengan sekali hentakan tenaga dalam, tali pengikat putus berantakan!

Anoman melompat tinggi ke puncak menara kraton. Ia mengibaskan ekornya yang membara merah ke atap-atap istana emas, balairung prajurit, dan lumbung senjata. Seketika seluruh kota Alengka berubah menjadi lautan api yang menyala-nyala laksana kawah Candradimuka, sementara sang kera putih tertawa membahana di atas mega!`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Kemenangan Dharma & Fajar Pengharapan',
        sceneSetting: 'Pesanggrahan Gunung Suwela • Tepi Samudra Selatan',
        content: `Kobaran api di Alengka menjadi bukti nyata bahwa kesombongan penguasa zalim akan membakar dirinya sendiri. Para raksasa lari pontang-panting berusaha menyelamatkan diri dari runtuhnya menara-menara istana yang terbakar abu. Dewi Shinta dan Taman Soka terlindungi secara ajaib berkat doa kesucian yang membentengi tempat tersebut dari jilatan api.

Setelah tugas pembuktian tuntas, Anoman memadamkan sisa bara di ekornya dan melesat membelah cakrawala malam menyeberangi Samudra Hindia menuju Gunung Suwela, tempat pesanggrahan Sri Rama dan bala laskar kera Prabu Sugriwa menanti. 

Setibanya di hadapan Sri Rama, Anoman menghaturkan tusuk konde berhias permata pemberian Dewi Shinta sebagai tanda balasan cinta dan kepastian kabar. Sorak-sorai ribuan prajurit kera mengguncang pantai, menyambut sang pahlawan putih yang telah membuka jalan bagi penegakan dharma di muka bumi.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Satya marang janji, kendel mbelani bener tanpa golek aleman.',
      translation: 'Teguh memegang sumpah suci, berani membela kebenaran sejati tanpa pamrih mengharap pujian duniawi.',
      moralLesson:
        'Ketulusan niat dan kesetiaan tanpa pamrih memiliki daya kekuatan luhur yang mampu meruntuhkan benteng kezaliman sebesar apa pun. Api kemarahan lawan justru akan menjadi bumerang yang memusnahkan keangkuhan mereka sendiri.',
    },
    featured: true,
  },
  {
    id: 'dewa-ruci',
    slug: 'dewa-ruci',
    title: 'Lakon Dewa Ruci',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦢꦺꦮꦫꦸꦕꦶ',
    category: 'mahabharata',
    categoryLabel: 'Mahabharata',
    mainCharacter: 'Raden Werkudara (Bima)',
    characterRole: 'Ksatria Jodhipati • Penegak Keadilan Pandawa',
    supportingCharacters: ['Dewa Ruci', 'Resi Durna', 'Naga Nemburnawa', 'Batara Indra'],
    castProfiles: [
      { name: 'Raden Werkudara', role: 'Pencari Hakikat Sejati', description: 'Ksatria bertubuh perkasa yang pantang ingkar janji, jujur mutlak, dan berjiwa lurus.' },
      { name: 'Dewa Ruci', role: 'Sukma Sejati Keabadian', description: 'Wujud rohani kemurnian diri yang bersemayam dalam keheningan sanubari manusia.' },
      { name: 'Resi Durna', role: 'Guru Padepokan Sokalima', description: 'Guru yang menguji muridnya dengan tugas berbahaya di luar batas akal manusia.' },
    ],
    readingTime: '7 Menit Baca',
    tagline: 'Kembara Batin Werkudara Menyelami Samudra Kesunyian',
    synopsis:
      'Perjalanan spiritual Bima mencari Air Kehidupan (Tirta Pawitra) atas titah gurunya, yang membawanya menaklukkan naga samudra hingga meraih pencerahan sejati di dalam diri Sang Dewa Ruci.',
    coverImage: '/images/tokoh/wayang-7.webp',
    sulukOpening:
      'Suluk • "Samudra sunyi tanpa tepi, manunggal sukma ing jroning raga, manggih pepadhang ing guwa garbaning Batara Kencana."',
    culturalSignificance:
      'Kisah Dewa Ruci adalah puncak sastra suluk kebatinan Jawa (Tasawuf Nusantara) yang menggambarkan tingkatan laku spiritual manusia: Syariat, Tarekat, Hakikat, dan Makrifat melalui simbolisme pengembaraan Bima.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Titah Resi Durna & Ujian Gunung Candramuka',
        sceneSetting: 'Balairung Astina & Hutan Rimba Tikbrasara',
        content: `Atas bisikan licik Sengkuni dan para Kurawa yang berniat menyingkirkan Pandawa, Resi Durna memberikan tugas yang mustahil kepada muridnya yang paling berhati lurus, Raden Werkudara. Durna menitahkan Bima untuk mencari Tirta Perwitasari (Kayu Heneng-Heneng lan Air Suci Suci Urip) yang konon tersembunyi di dalam gua angker Gunung Candramuka.

Bagi seorang satria berjiwa suci seperti Werkudara, perintah guru adalah amanah suci yang pantang disangkal dengan keraguan pikiran. Tanpa mendengarkan kekhawatiran saudara-saudaranya di Amarta, Bima melangkah tegap menerobos Hutan Tikbrasara.

Di lereng gunung yang terjal, dua raksasa penunggu rimba—Rukmuka dan Rukmakala—menyerang Bima dengan gada raksasa. Pertempuran sengit terjadi di sela tebing batu. Dengan keteguhan hati dan sabetan Kuku Pancanaka, Bima menumpas kedua raksasa tersebut. Tiba-tiba jasad raksasa itu sirna dan berubah menjadi Batara Indra dan Batara Bayu yang memberinya petunjuk: bahwa tirta suci sesungguhnya berada di dasar Samudra Minangkalbu.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Pertarungan Naga Nemburnawa di Laut Kidul',
        sceneSetting: 'Bibir Pantai Laut Selatan • Gelombang Dahsyat Tanpa Tepi',
        content: `Setibanya di pesisir Laut Kidul, deburan ombak bergulung setinggi bukit dengan pusaran air hitam yang mengerikan. Hewan-hewan laut buas berenang di sela buih gelombang. Bima memandang luasnya samudra tanpa secuil pun rasa gentar menyusup di dadanya.

Ia melompat dan menceburkan diri ke dalam samudra raya yang gelap gulita. Di kedalaman air yang dingin mencekam, seekor naga raksasa ganas bernama Nemburnawa melilit tubuh Bima dengan kekuatan belitan yang sanggup meremukkan karang baja. Nafas Bima kian sesak di dasar laut.

Dalam detik-detik puncak antara hidup dan mati, Werkudara mematikan segala indra lahiriahnya, memusatkan heninging cipta hanya kepada Sang Hyang Tunggal. Dengan kesadaran jiwa yang bulat, Bima menghunjamkan Kuku Pancanaka tepat ke leher sang naga samudra. Seketika darah naga memancar, melarutkan kegelapan lautan menjadi air yang tenang, jernih, dan berkilauan keemasan.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Menyatu dalam Guwa Garba Sukma Sejati',
        sceneSetting: 'Dasar Samudra Hening • Dimensi Alam Keabadian Suci',
        content: `Di tengah keheningan dasar laut yang bercahaya lembut, tampaklah sesosok dewa kerdil berparas persis seperti Werkudara namun memancarkan aura kesucian yang menenteramkan: itulah Sang Dewa Ruci, wujud sukma sejati dari diri Bima sendiri.

Sang Dewa Ruci tersenyum arif dan memerintahkan Bima untuk masuk ke dalam rongga telinga kirinya. Bima sempat tertegun heran, bagaimana mungkin tubuhnya yang sebesar gunung anakan sanggup masuk ke dalam telinga sosok dewa sekecil telapak tangan? Namun dengan kepatuhan batin yang tulus, Bima melangkah masuk.

Secara ajaib, di dalam ruang kecil itu Bima justru menyaksikan jagat raya yang mahaluas tanpa batas: hamparan bintang gemerlap, perputaran surya, dan rahasia empat warna nafsu manusia—hitam (amarah/kebumian), merah (angkara/hawa nafsu), kuning (kemewahan/duniawi), dan putih (kesucian hati nurani). Bima mencapai pencerahan kasampurnan jati (Manunggaling Kawula Gusti)—menyadari bahwa apa yang ia cari selama ini sesungguhnya bersemayam di dalam keheningan sanubari yang suci dan bersih dari kepalsuan.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Ngelmu iku kalakone kanthi laku, lekase lawan kas, tegese kas nyantosani.',
      translation:
        'Ilmu kebajikan sejati hanya dapat diraih melalui penghayatan laku batin yang sungguh-sungguh, dimulai dari kehendak yang teguh dan membentengi jiwa.',
      moralLesson:
        'Ketaatan, kejujuran mutlak, dan keberanian membersihkan hati dari hawa nafsu akan mengantarkan manusia menemukan hakikat jati diri serta kedamaian hakiki di hadapan Sang Pencipta alam semesta.',
    },
    featured: true,
  },
  {
    id: 'gatotkaca-gugur',
    slug: 'gatotkaca-gugur',
    title: 'Lakon Gatotkaca Gugur',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦒꦠꦺꦴꦠ꧀ꦏꦕꦒꦸꦒꦸꦂ',
    category: 'mahabharata',
    categoryLabel: 'Mahabharata',
    mainCharacter: 'Raden Gatotkaca',
    characterRole: 'Satria Pringgandani • Senapati Udara Pandawa',
    supportingCharacters: ['Adipati Karna', 'Raden Arjuna', 'Prabu Puntadewa', 'Batara Indra'],
    castProfiles: [
      { name: 'Raden Gatotkaca', role: 'Kusuma Bangsa Pringgandani', description: 'Otot kawat balung wesi, sanggup terbang tanpa sayap menembus awan badai.' },
      { name: 'Adipati Karna', role: 'Pemanah Ulung Kurawa', description: 'Pemilik senjata pamungkas Kunta Wijayadanu yang terpaksa melepaskannya di malam hari.' },
      { name: 'Prabu Kresna', role: 'Penasihat Agung Pandawa', description: 'Ahli strategi ilahi yang membaca garis takdir dan roda cakra Baratayudha.' },
    ],
    readingTime: '5 Menit Baca',
    tagline: 'Kusuma Bangsa Melayang Menembus Langit Malam Kurusetra',
    synopsis:
      'Detik-detik kepahlawanan sang satria Pringgandani yang mengorbankan jiwa raganya menghadang senjata pamungkas Kunta Wijayadanu di langit malam demi menyelamatkan pamannya, Raden Arjuna.',
    coverImage: '/images/tokoh/wayang-5.webp',
    sulukOpening:
      'Suluk • "Megatruh ing akasa, kumelap praba kencana, satria Pringgandani pasrah jiwa raga kanggo kejayaaning Pandawa."',
    culturalSignificance:
      'Gugurnya Gatotkaca merupakan salah satu babak paling mengharukan dalam wiracarita Baratayudha. Mengajarkan nilai bela negara tertinggi: rela berkorban demi masa depan dan keutuhan tanah air.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Mandat Malam di Tenda Kurusetra',
        sceneSetting: 'Pesanggrahan Randuwatangan • Padang Kurusetra Malam Hari',
        content: `Malam ke-14 perang Baratayudha berselimut kabut pekat berbau darah. Setelah gugurnya Begawan Durna dan kepedihan atas tewasnya Abimanyu, pasukan Kurawa di bawah hasutan Prabu Duryudana melancarkan serangan malam mendadak yang melanggar kode etik kesatriaan prajurit. Suasana medan perang gelap gulita dan mencekam; barisan tentara Pandawa terdesak hebat karena tak mampu melihat arah panah musuh.

Di tenda perkemahan, Prabu Puntadewa dan Prabu Kresna berunding mencari ksatria yang memiliki ketajaman pandangan batin di kegelapan malam. Raden Gatotkaca, satria Pringgandani putra Werkudara dan Dewi Arimbi, melangkah maju dengan mantap.

"Uwa Prabu Puntadewa dan Paman Kresna," ujar Gatotkaca dengan suara berwibawa laksana guntur di kejauhan, "perkenankanlah dada Pringgandani ini menjadi perisai bagi tidur para prajurit Pandawa malam ini. Izinkan ananda menyapu kezaliman Kurawa dari angkasa." Restu diberikan dengan linangan air mata haru dari para sesepuh Pandawa.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Amukan Brajamusti di Puncak Awan',
        sceneSetting: 'Langit Malam Kurusetra • Di Antara Gumpalan Petir dan Halilintar',
        content: `Melesatlah Gatotkaca mengenakan Rompi Antakusuma, Caping Basunanda, dan Kasut Pada Kacarma ke angkasa hitam. Sayap emas Praba berkilauan membelah awan malam. Dari ketinggian, sang satria meluncur laksana elang rajawali menghantam barisan bala tentara Kurawa yang dipimpin Dursasana dan para raksasa asuhan Prabu Lembusura.

Ajian Brajamusti dan Brajadenta yang bersemayam di kedua kepalan tangannya mengguncang bumi Kurusetra. Kereta-kereta perang lawan hancur berkeping-keping dan ribuan prajurit Kurawa lari kocar-kacir kehilangan nyali menghadapi amukan satria udara perkasa.

Melihat kehancuran total pasukannya, Adipati Karna yang memimpin sayap kanan Kurawa terdesak hebat. Atas desakan Duryudana yang panik, Adipati Karna terpaksa meraba sarung pusaka di pinggangnya: Senjata Kunta Wijayadanu. Pusaka anugerah Batara Indra yang hanya bisa dilepaskan satu kali seumur hidup itu ditarik. Cahaya senjata Kunta berpijar menyilaukan mata, membakar kegelapan malam laksana kilat membidik Gatotkaca yang terbang di antara mega.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Runtuhnya Raksasa Pembawa Kemenangan',
        sceneSetting: 'Cakrawala Kurusetra • Fajar Menjelang Terbit',
        content: `Gatotkaca yang mengamati dari balik awan menyadari bahwa takdir senjata Kunta tak dapat dielakkan—pusaka itu telah tertulis di Lauhul Mahfuzh untuk mengambil nyawanya. Namun dalam detik-detik terakhir sebelum senjata sakti itu menembus dadanya, sang satria mengumpulkan seluruh sisa kesaktian jiwa raganya.

Ia mengerahkan ajian Narantaka untuk membesarkan jasadnya menjadi raksasa setinggi gunung anakan. Saat senjata Kunta menembus pusarnya, Gatotkaca mengarahkan jatuhnya tubuh raksasa itu tepat menimpa kereta perang Kiai Jaladara milik Adipati Karna, menghancurkan kereta tersebut dan menewaskan beribu prajurit Kurawa di sekitarnya.

Kematian Gatotkaca bukanlah kekalahan, melainkan pengorbanan agung yang berhasil melucuti senjata paling mematikan milik musuh, demi memastikan keselamatan pamannya, Raden Arjuna, untuk memenangkan perang penegakan dharma pada hari-hari berikutnya.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Kusuma Bangsa ora bakal ilang arume sanadyan raga wus lebur dadi awu.',
      translation:
        'Pahlawan bangsa tidak akan pernah pudar keharuman namanya, walau jasad raga telah lebur menyatu dengan tanah persada.',
      moralLesson:
        'Pengorbanan diri demi kemaslahatan orang banyak dan keutuhan tanah air adalah puncak kehormatan tertinggi bagi seorang ksatria. Kematian raga bukan akhir segalanya, melainkan pintu gerbang keabadian nama baik.',
    },
    featured: true,
  },
  {
    id: 'semar-mbangun-kayangan',
    slug: 'semar-mbangun-kayangan',
    title: 'Lakon Semar Mbangun Kayangan',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦱꦼꦩꦂꦩ꧀ꦧꦔꦸꦤ꧀ꦏꦪꦔꦤ꧀',
    category: 'punokawan',
    categoryLabel: 'Punokawan',
    mainCharacter: 'Kyai Semar Badranaya',
    characterRole: 'Lurah Karangdempel • Pamong Luhur Trah Ksatria',
    supportingCharacters: ['Petruk', 'Gareng', 'Bagong', 'Raden Arjuna', 'Batara Guru'],
    readingTime: '6 Menit Baca',
    tagline: 'Tahta Batin & Kemakmuran Sejati ing Karangdempel',
    synopsis:
      'Kisah jenaka sarat falsafah ketika Semar berniat membangun Kayangan di bumi, yang sempat disalahpahami para pembesar kerajaan sebagai tindakan makar.',
    coverImage: '/images/tokoh/wayang-1.webp',
    sulukOpening:
      'Suluk • "Urip iku urup, ngelarung hawa nepsu, guyub rukun amemangun tentreming praja lumantar luhuring budi."',
    culturalSignificance:
      'Lakon Semar Mbangun Kayangan adalah lakon carangan adiluhung yang menyindir para pemimpin yang sibuk membangun kemegahan fisik istana namun menelantarkan moral dan kesejahteraan rakyat kecil.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Resah Para Satria & Sabda Ismaya',
        sceneSetting: 'Padepokan Karangdempel • Suasana Teduh di Bawah Pohon Beringin',
        content: `Negeri Amarta dan Astina sedang dilanda paceklik berkepanjangan dan ketidakharmonisan batin. Para satria Pandawa terjebak dalam kecemasan politik memikirkan tahta, pusaka keraton, dan gengsi kekuasaan, melupakan penderitaan rakyat jelata di pedusunan yang kelaparan.

Di bawah naungan pohon beringin Karangdempel yang teduh, Kyai Semar duduk termenung sembari tersenyum arif mengisap pipa tembakau. Ditemani oleh celotehan jenaka Gareng, banyolan cerdas Petruk, dan kelakar ceplas-ceplos Bagong, Semar mencanangkan niat agung: "Anak-anakku, bapa hendak membangun Kayangan."

Kabar tersebut tersebar cepat ke telinga para raja dan pembesar kahyangan. Prabu Duryudana menuduh Semar hendak berbuat makar merebut tahta dewa, sementara Raden Arjuna pun sempat bimbang dan mengutus prajurit untuk meminta pertanggungjawaban sang pamong tua.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Guyon Maton & Ujian Keikhlasan Para Dewa',
        sceneSetting: 'Gerbang Padepokan Karangdempel • Pertarungan Logika & Ketulusan',
        content: `Batara Guru mengutus Batara Narada bersama pasukan dewa dan Kurawa untuk membongkar gubuk Karangdempel. Namun ketika berhadapan dengan barikade para punokawan, segala senjata pusaka dewa luluh tak bertenaga. Bagong dengan keluguannya membantah kesombongan para dewa melalui analogi-analogi rakyat kecil yang membuat para pembesar terbungkam malu.

Ketika Raden Arjuna tiba dengan wajah gusar menuntut penjelasan, Kyai Semar bangkit berdiri dan memandang sang penengah Pandawa dengan tatapan welas asih yang teramat dalam:

"Raden Arjuna, ketahuilah bahwa Kayangan yang hendak kubangun bukanlah istana emas bertatahkan intan berlian di atas awan, melainkan Kayangan ing Sajroning Ati—ketentraman batin para pemimpin yang bersih dari keserakahan, dengki, dan nafsu menindas rakyat kecil. Tanpa kebersihan hati pemimpin, tahta megah mana pun hanyalah tumpukan batu bata tanpa sukma."`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Terbitnya Kemakmuran Nusantara',
        sceneSetting: 'Balairung Amarta • Pasewakan Ageng Penuh Berkah Rahayu',
        content: `Mendengar wejangan tajam nan penuh kasih dari sang pamong sejati, tersungkurlah Raden Arjuna bersimpuh di kaki Semar memohon ampun atas kekhilafannya. Sadarlah para satria bahwa kemakmuran sebuah negeri tidak diukur dari tingginya benteng istana, melainkan dari keadilan pemimpin yang mau mendengarkan rintihan rakyat kecil dan hidup bersahaja.

Gamelan Kebo Giro berkumandang syahdu menyambut pulihnya ketentraman di tanah Jawa. Hujan berkah turun membasahi bumi persada, menyuburkan kembali sawah ladang yang kering. Semar, Petruk, Gareng, dan Bagong menari bersama menyongsong fajar harapan baru yang penuh kedamaian lahir batin.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Memayu hayuning bawana, ambrasta dur hangkara.',
      translation: 'Melindungi dan memperindah keselamatan dunia semesta, serta memusnahkan segala angkara murka.',
      moralLesson:
        'Kebahagiaan dan kejayaan sebuah bangsa berakar dari kerendahan hati para pemimpinnya yang bersedia mengayomi rakyat jelata dengan tulus. Kemegahan sejati lahir dari batin yang suci, bukan dari takhta yang diperebutkan dengan keserakahan.',
    },
    featured: false,
  },
  {
    id: 'bisma-gugur',
    slug: 'bisma-gugur',
    title: 'Lakon Bisma Gugur',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦧꦶꦱ꧀ꦩꦒꦸꦒꦸꦂ',
    category: 'mahabharata',
    categoryLabel: 'Mahabharata',
    mainCharacter: 'Resi Bisma (Dewabrata)',
    characterRole: 'Kakek Agung Trah Kuru • Senapati Tertinggi Astina',
    supportingCharacters: ['Dewi Srikandi', 'Raden Arjuna', 'Dewi Amba', 'Prabu Puntadewa'],
    readingTime: '7 Menit Baca',
    tagline: 'Ranjang Panah Keabadian Sang Begawan Suci di Kurusetra',
    synopsis:
      'Tragedi kepahlawanan Resi Bisma yang memilih merebahkan diri di atas ranjang ribuan panah pusaka demi menuntaskan sumpah suci wadat dan membuka gerbang kemenangan bagi Pandawa.',
    coverImage: '/images/tokoh/wayang-4.webp',
    sulukOpening:
      'Suluk • "Lir gumelaring samudra agung, satria pinandhita Dewabrata sumarah ing garis pesthi, nganti surya lumingsir."',
    culturalSignificance:
      'Simbol kesucian sumpah (Bisma Pratigya) dan pengorbanan tertinggi seorang sesepuh yang rela menanggung derita raga demi mengakhiri kezaliman generasi penerusnya.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Sepuluh Hari Amukan Sang Pinandhita',
        sceneSetting: 'Tenda Pertemuan Agung Pandawa • Padang Kurusetra',
        content: `Sepuluh hari pertama perang Baratayudha menjadi neraka bagi barisan pasukan Pandawa. Di bawah komando Resi Bisma yang mengendarai kereta perang emas, puluhan ribu prajurit dan ratusan senapati berguguran laksana daun kering disapu badai. Kesaktian Dewabrata yang dianugerahi kemampuan menentukan saat kematiannya sendiri (Icchamrityu) membuat sang resi tak terkalahkan oleh senjata apa pun.

Malam itu, Pandawa Lima bersama Prabu Kresna mendatangi tenda perkemahan Bisma secara diam-diam. Sambil bersujud di hadapan sang kakek, Yudhistira menangis dan menanyakan bagaimana cara menaklukkan sang begawan agar pembantaian tidak terus berlanjut.

Bisma tersenyum lembut mengusap kepala cucu-cucunya: "Anak-anakku Pandawa, aku tidak akan pernah melepaskan senjataku di hadapan pria. Namun sumpah masa laluku dengan arwah Dewi Amba telah menanti: majukanlah seorang prajurit wanita berhati baja ke medan tempur besok pagi."`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Bayangan Dewi Amba di Ujung Busur Srikandi',
        sceneSetting: 'Tengah Medan Perang Kurusetra • Siang Hari Berkabut Debu Emas',
        content: `Keesokan paginya, Dewi Srikandi maju sebagai senapati perang Pandawa menaiki kereta perang yang dikusiri langsung oleh Raden Arjuna. Melihat seorang wanita berdiri tegak di hadapannya, Resi Bisma seketika menurunkan busur pusakanya. Di balik sosok Srikandi, sang resi melihat arwah Dewi Amba melayang tersenyum menagih janji asmara masa lampau.

Dengan bimbingan arwah Amba dan ketajaman bidikan Arjuna dari balik punggungnya, Srikandi melepaskan beratus-ratus anak panah pusaka. Panah-panah tersebut menembus zirah baja sang resi agung satu demi satu. Bisma menerima setiap tusukan panah itu dengan wajah tenang dan senyum damai yang menyejukkan.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Wafatnya Sang Begawan di Ranjang Panah',
        sceneSetting: 'Peraduan Kurusetra • Dikelilingi Tangisan Pandawa & Kurawa',
        content: `Tubuh sang begawan agung roboh perlahan, namun jasadnya tidak menyentuh tanah—ia berbaring di atas hamparan ratusan anak panah yang menancap di punggungnya, laksana peraduan pahlawan suci (Talpasyana).

Kedua kubu yang berseteru, Pandawa dan Kurawa, serentak menghentikan pertempuran dan bersimpuh menangis di sekeliling ranjang panah Bisma. Arjuna membuatkan bantal dari tiga anak panah yang menopang kepala sang kakek, dan memanah bumi memancarkan mata air sejuk untuk membasahi bibir sang resi.

Bisma menunda kematiannya hingga matahari bergeser ke utara (Uttarayana), memberikan wejangan kenegaraan terakhir (Rajadharma) kepada Puntadewa sebelum arwahnya melesat menuju keabadian swarga loka.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Setya tuhu ing prajanji, labuh labet mring nagari tanpa ngarep-arep piwales.',
      translation: 'Setia teguh pada sumpah janji, berkorban bagi keselamatan negeri tanpa mengharap pamrih balasan.',
      moralLesson:
        'Keagungan manusia sejati diukur dari keteguhan memegang sumpah kehormatan dan kerelaan berkorban demi masa depan kebenaran, kendati harus mengorbankan jiwa raganya sendiri.',
    },
    featured: false,
  },
  {
    id: 'abimanyu-ranjap',
    slug: 'abimanyu-ranjap',
    title: 'Lakon Abimanyu Ranjap',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦲꦧꦶꦩꦚꦸꦫꦚ꧀ꦗꦥ꧀',
    category: 'mahabharata',
    categoryLabel: 'Mahabharata',
    mainCharacter: 'Raden Abimanyu (Angkawijaya)',
    characterRole: 'Putra Arjuna • Ksatria Muda Plangkawati',
    supportingCharacters: ['Dewi Utari', 'Resi Durna', 'Jayadrata', 'Prabu Duryudana'],
    readingTime: '6 Menit Baca',
    tagline: 'Gugurnya Ksatria Muda di Jantung Formasi Cakrabyuha',
    synopsis:
      'Kepahlawanan tragis putra Arjuna, Raden Abimanyu, yang seorang diri menembus benteng formasi perang melingkar Cakrabyuha milik Kurawa demi membela kehormatan trah Pandawa.',
    coverImage: '/images/tokoh/wayang-9.webp',
    sulukOpening:
      'Suluk • "Kembang mayang gugur ing palagan, satria mudha Angkawijaya nembus gelar Cakrabyuha tanpa wigih."',
    culturalSignificance:
      'Salah satu lakon paling heroik sekaligus menyayat hati dalam pedalangan Jawa, menggambarkan keberanian pemuda yang pantang mundur meski dikepung ketidakadilan ribuan musuh.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Jebakan Gelar Cakrabyuha Kurawa',
        sceneSetting: 'Pusat Medan Tempur Kurusetra Hari ke-13',
        content: `Pada hari ke-13 Baratayudha, Resi Durna menyusun formasi perang mematikan berbentuk lingkaran berlapis raksasa yang dikenal sebagai Gelar Cakrabyuha. Untuk menjamin keberhasilan strategi ini, bala tentara Samsaptaka memancing Raden Arjuna dan Prabu Kresna bertempur jauh ke tapal batas selatan medan perang.

Di kubu Pandawa, tidak ada ksatria yang mengetahui rahasia menembus Cakrabyuha selain pemuda belia berusia enam belas tahun, Raden Abimanyu. Sadar bahwa kehancuran total mengancam Pandawa jika formasi itu tidak dipecahkan, Abimanyu memacu kereta perangnya membelah barisan terluar Cakrabyuha dengan sabetan pedang pusaka Kiai Pulanggeni.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Terkunci Sendirian di Lingkaran Maut',
        sceneSetting: 'Jantung Formasi Cakrabyuha • Terisolasi dari Pasukan Pandawa',
        content: `Namun tragedi tak terelakkan terjadi: Raja Jayadrata dari Sindhu yang memegang anugerah kekebalan dari Batara Siwa segera menutup rapat pintu masuk formasi, memutus bantuan Werkudara dan ksatria Pandawa lainnya di luar benteng.

Abimanyu terkunci sendirian di tengah kepungan ratusan senapati Kurawa: Durna, Karna, Salya, Dursasana, dan Jayadrata. Walau tanpa perisai dan kereta perangnya hancur berantakan, sang ksatria muda mengamuk bak singa terluka, menumbangkan putra-putra Duryudana satu per satu hingga membuat barisan Kurawa gentar.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Gugur Bermandikan Ratusan Anak Panah',
        sceneSetting: 'Palagan Kurusetra • Senja Merah Berdarah',
        content: `Melihat Abimanyu tak kunjung tumbang, para senapati Kurawa melanggar aturan perang dengan menyerangnya serentak dari segala arah. Busur panahnya dipatahkan dari belakang oleh Karna, kudanya ditombak oleh Durna, dan tubuhnya dihujani ribuan senjata hingga tertancap seperti landak (ranjap).

Dalam nafas terakhirnya, Abimanyu tetap berdiri tegak memegang roda kereta perang yang patah sebagai perisai, sebelum gada Kyai Glinggang milik Jayadrata menghantam kepalanya. Gugurnya sang satria muda menyalakan api kemarahan tak terpadamkan di dada Arjuna, yang bersumpah akan memenggal kepala Jayadrata sebelum matahari terbenam keesokan harinya.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Sing sapa wani ing bener, ora bakal mati tanpa ajining dhiri.',
      translation: 'Barang siapa berani berjuang di jalan kebenaran, tidak akan pernah mati tanpa kehormatan sejati.',
      moralLesson:
        'Keberanian menegakkan kehormatan keluarga dan bangsa tidak diukur dari usia, melainkan dari ketetapan tekad pantang mundur di hadapan rintangan yang paling mustahil sekalipun.',
    },
    featured: false,
  },
  {
    id: 'wahyu-makutharama',
    slug: 'wahyu-makutharama',
    title: 'Lakon Wahyu Makutharama',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦮꦲꦾꦸꦩꦏꦸꦛꦫꦩ',
    category: 'carangan',
    categoryLabel: 'Lakon Carangan',
    mainCharacter: 'Raden Arjuna (Janaka)',
    characterRole: 'Ksatria Madukara • Penerima Wahyu Kepemimpinan',
    supportingCharacters: ['Begawan Kesawasidi', 'Adipati Karna', 'Semar', 'Batara Guru'],
    readingTime: '6 Menit Baca',
    tagline: 'Ajaran Hasta Brata & Delapan Watak Alamiah Pemimpin Sejati',
    synopsis:
      'Pencarian wahyu mahkota kepemimpinan Sri Rama di Gunung Kutaranggeng, di mana Arjuna menerima wejangan adiluhung Hasta Brata tentang delapan sifat alam bagi seorang pemimpin luhur.',
    coverImage: '/images/tokoh/wayang-8.webp',
    sulukOpening:
      'Suluk • "Kusuma rukmi ing wukir Kutaranggeng, sabda pinandhita nuntun jiwa satria ngrasuk wolung watak jagat."',
    culturalSignificance:
      'Puncak falsafah kepemimpinan Jawa (Hasta Brata) yang mengajarkan bahwa pemimpin ideal harus meneladani delapan anasir alam semesta: Surya, Candra, Kartika, Angkasa, Bayu, Dahana, Tirta, dan Bantala.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Sayembara Gaib Wahyu Mahkota Rama',
        sceneSetting: 'Gunung Suwelagiri & Lereng Kutaranggeng',
        content: `Kahyangan Suralaya menurunkan kabar gaib bahwa pusaka mahkota kebesaran Sri Rama Wijaya (Wahyu Makutharama) akan turun kepada ksatria yang sanggup menyucikan diri di puncak Gunung Kutaranggeng. Baik kubu Pandawa yang diwakili Arjuna maupun kubu Kurawa yang diwakili Adipati Karna bergegas mendaki gunung tersebut.

Di lereng gunung, seorang pertapa suci berwajah agung bernama Begawan Kesawasidi (yang sejatinya merupakan penjelmaan Prabu Kresna) membuka padepokan untuk menguji kelayakan batin para calon penerima wahyu.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Wejangan Hasta Brata Begawan Kesawasidi',
        sceneSetting: 'Gua Pertapaan Kutaranggeng • Diterangi Cahaya Minyak Jarak',
        content: `Ketika Adipati Karna datang dengan pamrih kekuasaan politik Astina, wahyu tersebut menolak masuk. Namun saat Raden Arjuna bersimpuh dengan ketulusan hati mencari ilmu pembimbing umat, Begawan Kesawasidi membisikkan intisari ajaran Hasta Brata:

"Arjuna, seorang pemimpin sejati wajib memiliki delapan watak alam semesta:
1. Watak Surya: Memberikan daya hidup dan kehangatan bagi rakyatnya.
2. Watak Candra: Mampu memberi penerangan yang teduh dalam kegelapan.
3. Watak Kartika: Menjadi kompas pedoman moral yang tak pernah tersesat.
4. Watak Angkasa: Berwawasan luas dan berlapang dada menerima kritik.
5. Watak Bayu: Selalu hadir di mana-mana dan mengetahui keluh kesah rakyat kecil.
6. Watak Dahana: Adil dan tegas membakar segala bentuk kezaliman.
7. Watak Tirta: Bersifat menyejukkan, mengalir ke bawah mengayomi yang lemah.
8. Watak Bantala: Sabar, teguh, dan gemar beramal menampung segala berkah."`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Manunggalnya Mahkota Cahaya',
        sceneSetting: 'Puncak Kutaranggeng • Cahaya Keemasan Menyatu dalam Sukma',
        content: `Mendengar wejangan tersebut dengan heninging cipta, seberkas cahaya keemasan berbentuk mahkota melesat dari langit dan meresap ke dalam dada Raden Arjuna. Wahyu Makutharama telah menyatu dengan jiwa sang ksatria penengah Pandawa.

Dengan bekal ajaran Hasta Brata, Arjuna siap membimbing generasi penerus trah Pandawa untuk memimpin tanah Jawa menuju peradaban yang makmur, damai, dan berkeadilan sosial bagi seluruh rakyat.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Pangarsa kang utama iku ngemban watak wolung anasir jagat raya.',
      translation: 'Pemimpin yang utama adalah yang menjiwai delapan watak anasir alam semesta.',
      moralLesson:
        'Kepemimpinan bukanlah sarana untuk mencari kemewahan dan kehormatan pribadi, melainkan pengabdian suci untuk menaungi, menyejukkan, dan menegakkan keadilan bagi seluruh rakyat.',
    },
    featured: false,
  },
  {
    id: 'bale-sigala-gala',
    slug: 'bale-sigala-gala',
    title: 'Lakon Bale Sigala-gala',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦧꦭꦺꦱꦶꦒꦭꦒꦭ',
    category: 'mahabharata',
    categoryLabel: 'Mahabharata',
    mainCharacter: 'Raden Werkudara & Dewi Kunti',
    characterRole: 'Keluarga Pandawa • Penyelamat Trah Suci',
    supportingCharacters: ['Prabu Duryudana', 'Patih Sengkuni', 'Purocana', 'Garangan Putih'],
    readingTime: '6 Menit Baca',
    tagline: 'Lolos dari Kobaran Api Lilin Berkat Lindungan Garangan Putih Gaib',
    synopsis:
      'Konspirasi licik Kurawa yang membangun pesanggrahan berbahan damar dan lilin mudah terbakar di Waranawata untuk membakar hidup-hidup Pandawa dan ibundanya, Dewi Kunti.',
    coverImage: '/images/tokoh/wayang-7.webp',
    sulukOpening:
      'Suluk • "Gedhong peteng kinepung geni mulat-mulat, rinekso dening Hyang Jagadnata, Pandawa luwar saking bebaya."',
    culturalSignificance:
      'Menggambarkan bahwa rencana jahat dan konspirasi keji sebesar apa pun tidak akan sanggup memusnahkan insan-insan yang selalu berada di bawah perlindungan kebajikan dan kebersihan hati.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Pesta Palsu di Waranawata',
        sceneSetting: 'Pesanggrahan Purantara • Hutan Waranawata Malam Hari',
        content: `Atas siasat licik Patih Sengkuni, Pandawa Lima dan Dewi Kunti diundang menghadiri perayaan agung di Hutan Waranawata. Di sana dibangun sebuah pesanggrahan megah bernama Bale Purantara oleh arsitek Purocana. Tanpa disadari orang banyak, seluruh tiang, dinding, dan atap balai tersebut dilapisi damar, getah minyak, dan lilin yang sangat mudah tersulut api.

Namun sebelum berangkat, sesepuh bijak Arya Widura telah membisikkan bahasa sandi kepada Yudhistira agar senantiasa waspada terhadap bahaya api yang tersembunyi di balik keindahan kayu.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Kobaran Lautan Api di Tengah Malam',
        sceneSetting: 'Bale Purantara • Api Menjilat Angkasa Menghanguskan Istana',
        content: `Tepat tengah malam saat semua orang tertidur lelap setelah pesta pora, Purocana menyulut api di empat penjuru bangunan. Seketika balai tersebut meledak menjadi bola api raksasa yang membubung ke langit malam. Hawa panas memanggang seluruh ruangan dan jalan keluar tertutup kobaran api.

Di tengah kepanikan, Werkudara yang memiliki naluri tajam segera menggendong ibunya, Dewi Kunti, di punggungnya, memeluk Nakula dan Sadewa di kedua lengannya, sementara Puntadewa dan Arjuna berpegangan erat pada pinggang sang ksatria perkasa.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Terowongan Penyelamat Garangan Putih',
        sceneSetting: 'Bawah Tanah Waranawata Menuju Hutan Rimba Hidimba',
        content: `Saat dinding balai mulai runtuh menimpa mereka, tiba-tiba seekor hewan gaib berbulu putih salju—Garangan Putih (penjelmaan Batara Antaboga utusan Arya Widura)—muncul menggali liang terowongan rahasia di lantai tanah.

Pandawa merayap mengikuti jejak sang garangan putih menembus perut bumi hingga keluar dengan selamat di tengah rimba belantara yang aman. Sementara itu di Astina, Kurawa bersorak mengira Pandawa telah hangus menjadi abu. Dari titik balik inilah Pandawa memulai laku tapa pendewasaan yang kelak mengantarkan mereka pada kejayaan sejati.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Gusti ora sare, becik ketitik ala ketara.',
      translation: 'Tuhan tidak pernah tidur; perbuatan baik akan tampak kebajikannya dan kejahatan akan terbongkar keburukannya.',
      moralLesson:
        'Kelicikan dan konspirasi jahat pada akhirnya hanya akan mencelakai perancangnya sendiri. Ketulusan hati dan doa orang yang teraniaya akan senantiasa menemukan jalan keselamatan yang tak terduga.',
    },
    featured: false,
  },
  {
    id: 'wisanggeni-gugat',
    slug: 'wisanggeni-gugat',
    title: 'Lakon Wisanggeni Gugat',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦮꦶꦱꦁꦒꦼꦤꦶꦒꦸꦒꦠ꧀',
    category: 'ksatria',
    categoryLabel: 'Ksatria & Tokoh',
    mainCharacter: 'Raden Wisanggeni',
    characterRole: 'Putra Arjuna & Batari Dresanala • Satria Api Kahyangan',
    supportingCharacters: ['Batara Guru', 'Batara Brahma', 'Raden Arjuna', 'Batara Narada'],
    readingTime: '6 Menit Baca',
    tagline: 'Api Kejujuran Tanpa Krama Mengguncang Singgasana Jonggring Saloka',
    synopsis:
      'Kelahiran satria sakti Wisanggeni yang dibuang ke Kawah Candradimuka oleh para dewa yang korup, namun bangkit kembali menggugat keadilan tatanan Kahyangan tanpa rasa takut.',
    coverImage: '/images/tokoh/wayang-9.webp',
    sulukOpening:
      'Suluk • "Geni murub ing kawah Candradimuka, satria linuwih Wisanggeni nagih adil ing marcapada lan kahyangan."',
    culturalSignificance:
      'Tokoh Wisanggeni melambangkan suara nurani pemuda yang berani berbicara apa adanya (ngoko/tanpa basa-basi krama) demi memperjuangkan kebenaran sejati di hadapan tatanan yang menyimpang.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Terbuang di Kawah Candradimuka',
        sceneSetting: 'Puncak Kawah Candradimuka Kahyangan Jonggring Saloka',
        content: `Atas desakan Batara Kala dan kelemahan Batara Guru dalam memegang amanah, bayi yang baru dilahirkan oleh Batari Dresanala hasil pernikahannya dengan Arjuna diperintahkan untuk dibuang ke dalam lahar mendidih Kawah Candradimuka.

Namun takdir berkehendak lain: alih-alih hangus terbakar, sang bayi justru menyerap seluruh inti panas lahar kawah dan tumbuh seketika menjadi pemuda tampan yang memiliki kesaktian luar biasa berjuluk Raden Wisanggeni (Bisa Sang Geni - Racun Api).`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Menggugat Singgasana Para Dewa',
        sceneSetting: 'Balairung Kahyangan Jonggring Saloka • Para Dewa Gempar',
        content: `Wisanggeni mendobrak gerbang Sela Matangkep Kahyangan. Dengan gaya bicara lugas menggunakan bahasa ngoko (tanpa tata krama feodal) bahkan kepada Batara Guru sekalipun, Wisanggeni menuntut keadilan:

"He para dewa! Mengapa kalian yang semestinya menjadi pengayom keadilan jagat justru bersekongkol menindas bayi tak berdosa dan memisahkan seorang ibu dari anaknya? Jangan berlindung di balik kemegahan jubah dewata jika hatimu dipenuhi kepalsuan!"

Segala senjata para dewa luluh ketika berhadapan dengan api kesucian Wisanggeni yang membakar kepalsuan.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Keadilan Dipulihkan & Pengorbanan Luhur',
        sceneSetting: 'Pertemuan Haru di Kasatriyan Madukara',
        content: `Batara Guru mengakui kekhilafannya dan memulihkan hak Batari Dresanala untuk bersatu kembali dengan Raden Arjuna di Kasatriyan Madukara. Wisanggeni disambut penuh kebanggaan oleh keluarga Pandawa.

Kelak menjelang meletusnya Baratayudha, Wisanggeni merelakan dirinya muksa (kembali ke alam keabadian) bersama Raden Antasen demi menjaga keseimbangan kosmos, membuktikan bahwa keberaniannya semata-mata demi keadilan murni, bukan demi kejayaan pribadi.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Kandhakna apa anane, bener iku bener, luput iku luput tanpa wigih.',
      translation: 'Katakanlah apa adanya secara jujur; yang benar tetaplah benar dan yang salah adalah salah tanpa ragu.',
      moralLesson:
        'Kejujuran nurani tidak boleh dikalahkan oleh rasa takut pada kekuasaan atau kemapanan status. Berani menyuarakan kebenaran secara lugas adalah ciri ksatria berjiwa suci.',
    },
    featured: false,
  },
  {
    id: 'babat-alas-wanamarta',
    slug: 'babat-alas-wanamarta',
    title: 'Lakon Babat Alas Wanamarta',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦧꦧꦠ꧀ꦲꦭꦱ꧀ꦮꦤꦩꦂꦠ',
    category: 'mahabharata',
    categoryLabel: 'Mahabharata',
    mainCharacter: 'Prabu Puntadewa (Yudhistira)',
    characterRole: 'Sulung Pandawa • Raja Suci Tanpa Dusta',
    supportingCharacters: ['Werkudara', 'Arjuna', 'Nakula', 'Sadewa', 'Prabu Yudhistira Jin'],
    readingTime: '6 Menit Baca',
    tagline: 'Membangun Peradaban Luhur dari Rimba Belantara Angker',
    synopsis:
      'Perjuangan Pandawa membuka Hutan Wanamarta yang dihuni lima raja jin sakti, mengubah rimba belantara menjadi Kerajaan Amarta yang makmur dan berkeadilan.',
    coverImage: '/images/tokoh/wayang-4.webp',
    sulukOpening:
      'Suluk • "Heninging jagat sumunar ing tancep kayon, rumesep ing wardaya satria pinilih kang mbela luhuring budi."',
    culturalSignificance:
      'Mengajarkan ketabahan dalam menerima takdir pengasingan, serta kerja keras mengubah keterpurukan menjadi kejayaan peradaban yang berakar pada persatuan dan keadilan.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Tanah Pengasingan & Niat Suci Pandawa',
        sceneSetting: 'Tepi Rimba Alas Mertani • Belantara Lebat Berkabut Asap Gaib',
        content: `Setelah selamat dari tragedi pembakaran Balai Sigala-gala yang dirancang Kurawa, Pandawa Lima menghadap Prabu Drestarastra untuk menuntut hak waris takhta. Namun dengan tipu daya licik Patih Sengkuni, Pandawa justru diberi sebidang tanah hutan belantara tak berpenghuni bernama Alas Mertani (Wanamarta). Hutan itu terkenal sangat angker, dihuni ribuan siluman dan dikuasai oleh lima saudara bangsa jin sakti pimpinan Prabu Yudhistira Jin.

Alih-alih merasa sakit hati atau putus asa, Prabu Puntadewa bersama adik-adiknya menerima pemberian tersebut dengan senyuman lapang dada. Bagi Puntadewa, berkah Ilahi tidak bergantung pada kemewahan warisan, melainkan pada kesucian niat untuk membangun kedamaian bagi semua makhluk hidup.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Penyatuan Sukma Lima Saudara Jin',
        sceneSetting: 'Tengah Hutan Wanamarta • Medan Perang Gaib & Olah Batin',
        content: `Ketika Raden Werkudara mulai menebas pohon-pohon raksasa dengan Kuku Pancanaka dan Arjuna memanah kabut racun dengan busur Gandiwa, para penghuni gaib merasa terusik. Terjadilah perang tanding kedigdayaan antara lima ksatria Pandawa melawan lima raja jin sakti: Prabu Yudhistira Jin, Dhandhangwacana, Suparta, Dananjaya, dan Nakula-Sadewa jin.

Pertarungan bukan semata adu kesaktian fisik, melainkan ujian kemurnian sukma. Melihat keluhuran budi Puntadewa yang tidak menyimpan secuil pun dendam atau nafsu menguasai, para raja jin luluh dan menaruh rasa hormat yang mendalam. Mereka menyadari bahwa Pandawa adalah penjelmaan satria dharma sejati.

Kelima raja jin tersebut kemudian merelakan raganya manunggal (menyatu) ke dalam jiwa raga Pandawa Lima. Prabu Yudhistira Jin menyatu dengan Puntadewa, menganugerahkan nama dan pusaka Jamus Kalimasada; Dhandhangwacana menyatu dengan Bima; Dananjaya menyatu dengan Arjuna; dan si kembar jin menyatu dengan Nakula dan Sadewa.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Berdirinya Istana Indraprastha Amarta',
        sceneSetting: 'Balairung Keraton Indraprastha • Negeri Gemah Ripah Loh Jinawi',
        content: `Dari belantara yang semula gelap gulita dan sarat marabahaya, terbitlah keajaiban arsitektur keraton yang mahamegah: Kerajaan Amarta (Indraprastha). Tanah tandus berubah menjadi sawah ladang yang subur beririgasi jernih, pepohonan berbuah lebat sepanjang musim, dan rakyat berduyun-duyun datang mencari perlindungan di bawah naungan Prabu Puntadewa.

Prabu Puntadewa dinobatkan sebagai raja agung bergelar Prabu Darmakusuma—pemimpin suci berdarah putih yang tidak pernah berdusta seumur hidupnya. Berdirinya Amarta menjadi prasasti abadi bahwa ketulusan hati dan persaudaraan yang rukun sanggup mengubah tanah yang paling tandus menjadi surga keadilan.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Sura Dira Jayaningrat Lebur Dening Pangastuti.',
      translation:
        'Segala angkara murka, kekerasan, dan keangkuhan akan lebur oleh kelembutan budi pekerti serta kerendahan hati.',
      moralLesson:
        'Ketabahan dalam menghadapi cobaan hidup dan keikhlasan berjuang dari titik terendah akan membuahkan kemuliaan yang abadi. Tidak ada tanah yang tandus bagi manusia yang memiliki hati yang subur dengan kebajikan.',
    },
    featured: false,
  },
  {
    id: 'kumbakarna-gugur',
    slug: 'kumbakarna-gugur',
    title: 'Lakon Kumbakarna Gugur',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦏꦸꦩ꧀ꦧꦏꦂꦤꦒꦸꦒꦸꦂ',
    category: 'ramayana',
    categoryLabel: 'Ramayana',
    mainCharacter: 'Arya Kumbakarna',
    characterRole: 'Ksatria Pangleburgangsa • Satria Raksasa Berhati Emas',
    supportingCharacters: ['Prabu Rahwana', 'Gunawan Wibisana', 'Sri Rama', 'Leksmana'],
    readingTime: '6 Menit Baca',
    tagline: 'Ksatria Sejati: Membela Tanah Air, Bukan Membela Kejahatan Raja',
    synopsis:
      'Dilema kepahlawanan raksasa bijak Kumbakarna yang memilih gugur di medan perang Alengka demi membela tanah tumpah darahnya, meski mengutuk kejahatan kakaknya sendiri, Prabu Rahwana.',
    coverImage: '/images/tokoh/wayang-7.webp',
    sulukOpening:
      'Suluk • "Mbelani bumi pertiwi ngungkuli rasa wedi, getih satria dadi panuntun luhuring darma nagari."',
    culturalSignificance:
      'Dalam ajaran Serat Tripama karya KGPAA Mangkunegara IV, Kumbakarna diabadikan sebagai salah satu dari tiga teladan utama prajurit ksatria karena kesetiaannya membela kedaulatan tanah air tanpa membenarkan dosa politik penguasa.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Teguran Pedas di Balairung Istana',
        sceneSetting: 'Pangleburgangsa & Balairung Keraton Alengka',
        content: `Ketika benteng pertahanan Alengka kian terdesak oleh serbuan laskar kera Prabu Sugriwa dan kematian para senapati andalan seperti Prahasta, Prabu Dasamuka mendatangi kediaman adiknya, Arya Kumbakarna, di Pangleburgangsa. Kumbakarna dibangunkan paksa dari tapa tidurnya dengan tusukan tombak dan hidangan seribu hewan sembelihan.

Saat membuka mata dan melihat kakaknya panik, Kumbakarna menatap Rahwana dengan mata tajam penuh kejujuran:

"Kakang Prabu Dasamuka! Malapetaka ini tidak akan pernah terjadi seandainya kakang tidak menuruti nafsu bejat menculik Dewi Shinta, istri sah Sri Rama. Kembalikanlah Shinta dengan terhormat ke hadapan Sri Rama agar ribuan rakyat jelata dan prajurit Alengka tidak mati sia-sia menjadi tumbal egomu!"

Mendengar teguran keras tersebut, Rahwana murka dan mengancam akan menghukum mati Kumbakarna sebagai pengkhianat bangsa.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Sumpah Ksatria Berbusana Putih',
        sceneSetting: 'Medan Perang Suwela • Barisan Pasukan Raksasa & Laskar Kera',
        content: `Menghadapi kemarahan kakaknya, Kumbakarna tidak gentar. Sang raksasa bertubuh gunung itu mengenakan busana kain mori serba putih—lambang kesucian niat dan kerelaan menjemput ajal di medan laga.

Sebelum melangkah ke palagan pertempuran, Kumbakarna berikrar di hadapan bumi pertiwi:

"Wahai bumi Alengka tanah tumpah darahku, saksikanlah! Aku melangkah ke medan laga bukan untuk membela kejahatan Dasamuka atau menutupi dosa-dosanya, melainkan karena tanah air tempat aku dilahirkan dan meminum airnya sedang diinjak-injak oleh bala tentara asing. Adalah kewajiban setiap putra bangsa untuk membela kehormatan negerinya hingga tetes darah penghabisan!"

Di medan perang, kedatangan Kumbakarna disambut dengan rasa hormat yang mendalam oleh Sri Rama dan Gunawan Wibisana. Adik bungsunya, Wibisana, bersimpuh di kaki Kumbakarna memohon maaf karena berada di pihak Rama. Kumbakarna merangkul adiknya penuh haru dan merestui jalan kebenaran yang dipilih Wibisana.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Gugurnya Sang Pahlawan Sejati',
        sceneSetting: 'Palagan Kurusetra Alengka • Hujan Bunga Surgawi dari Kahyangan',
        content: `Pertarungan dahsyat berlangsung antara Kumbakarna melawan ribuan laskar kera. Meskipun kedua tangan dan kakinya putus tertebas senjata panah pusaka Leksmana, Kumbakarna tetap merayap maju dengan gigih menggunakan gigitan dan gelindingan badannya demi menjaga kehormatan prajurit.

Melihat penderitaan ksatria agung tersebut, Sri Rama menitikkan air mata penghormatan. Sang titisan Wisnu melepaskan panah sakti Guwawijaya tepat memenggal leher Kumbakarna agar arwahnya terbebas dari siksa raga fana. Kepala sang pahlawan melayang ke angkasa dan jatuh tepat di pangkuan Prabu Rahwana sebagai peringatan terakhir akan datangnya kehancuran total.

Langit menaburkan bunga-bunga surgawi mengiringi kepergian arwah Kumbakarna menuju swargaloka. Namanya abadi sebagai teladan prajurit sejati yang tidak pernah menjual kehormatan bangsanya demi kepentingan pribadi.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Bela nagara ora kudu mbela panguwasa kang luput, nanging ngreksa bumi wutah getih.',
      translation:
        'Membela negara bukan berarti membenarkan kesalahan penguasa yang zalim, melainkan menjaga kehormatan dan keselamatan tanah tumpah darah.',
      moralLesson:
        'Cinta tanah air yang sejati menuntut integritas moral tertinggi: berani menegur kezaliman pemimpin sembari rela mengorbankan jiwa raga demi kedaulatan martabat bangsa.',
    },
    featured: false,
  },
  {
    id: 'karna-tandhing',
    slug: 'karna-tandhing',
    title: 'Lakon Karna Tandhing',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦏꦂꦤꦠꦤ꧀ꦝꦶꦁ',
    category: 'mahabharata',
    categoryLabel: 'Mahabharata',
    mainCharacter: 'Adipati Karna Basusena',
    characterRole: 'Raja Awangga • Satria Berjiwa Dermawan Penegak Janji',
    supportingCharacters: ['Raden Arjuna', 'Dewi Kunti', 'Prabu Salya', 'Prabu Kresna'],
    readingTime: '6 Menit Baca',
    tagline: 'Perang Saudara Penegak Sumpah Ksatria di Padang Kurusetra',
    synopsis:
      'Kisah dilema mengharukan ketika Adipati Karna harus berhadapan satu lawan satu di atas kereta perang melawan adik kandungnya sendiri, Raden Arjuna, demi menunaikan janji kesetiaan kepada Duryudana.',
    coverImage: '/images/tokoh/wayang-4.webp',
    sulukOpening:
      'Suluk • "Kukusing dupa kumelun nggayuh pepadhang, hening cipta rasa karsa satria pinilih nuntun karahayon."',
    culturalSignificance:
      'Menampilkan dilema moral paling mendalam dalam filsafat Timur: benturan antara ikatan darah persaudaraan melawan kewajiban memegang janji ksatria (kesetiaan budi).',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Rahasia Tepi Sungai Gangga & Tangisan Kunti',
        sceneSetting: 'Tepi Sungai Gangga • Menjelang Senja Hari',
        content: `Malam sebelum perang penentuan hari ke-17 Baratayudha, seorang wanita bangsawan tua berkerudung sutra datang menemui Adipati Karna yang sedang bersila memuja Sang Hyang Surya di tepi Sungai Gangga. Wanita itu adalah Dewi Kunti, ibu kandung para Pandawa.

Dengan air mata bercucuran, Kunti membongkar rahasia kelam masa lalu: bahwa Karna adalah putra sulungnya dari Batara Surya yang terpaksa dihanyutkan di sungai saat masih bayi. Kunti memohon agar Karna meninggalkan kubu Kurawa dan bergabung bersama adik-adiknya, Pandawa Lima.

Karna bersimpuh mencium kaki ibunya dengan penuh takzim namun tegap menjawab:

"Ibu, terima kasih telah memelukku sebagai anakmu. Namun di saat seluruh dunia menghinaku sebagai anak kusir rendahan, hanya Prabu Duryudana yang mengangkat derajatku dan memberiku mahkota Raja Awangga. Jika kini aku berkhianat di saat ia terdesak, hancurlah martabat ksatria dalam jiwaku. Namun terimalah janjiku, ibu: engkau akan tetap memiliki lima orang putra setelah perang usai, entah aku atau Arjuna yang akan gugur di medan laga."`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Adu Panah Pusaka di Atas Kereta Perang',
        sceneSetting: 'Padang Kurusetra • Pertemuan Dua Kereta Perang Surya',
        content: `Matahari terbit merah membara di atas langit Kurusetra. Adipati Karna menaiki kereta perang Kyai Jaladara dengan kusir mertuanya sendiri, Prabu Salya. Di seberang medan laga, Raden Arjuna melaju dengan kereta perang Kyai Rata dipandu oleh Prabu Kresna.

Pertarungan dua pemanah terhebat di kolong langit pun pecah. Ribuan anak panah melesat menutupi sinar surya. Panah Nagabantala milik Karna beradu dengan Panah Sarotama milik Arjuna, menciptakan ledakan cahaya yang menggetarkan bumi Kurusetra.

Namun di tengah pertempuran, kutukan masa lalu mulai bekerja: roda kereta perang Karna terperosok ke dalam lumpur darah, dan aji kesaktian yang dipelajarinya dari Resi Parasurama mendadak sirna dari ingatannya sesuai takdir yang telah digariskan para dewa.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Pelepasan Panah Pasopati & Gugurnya Sang Surya',
        sceneSetting: 'Padang Kurusetra • Senja Hari yang Menyedihkan',
        content: `Saat Karna turun dari kereta untuk mengangkat roda yang terperosok, Prabu Kresna memberi isyarat kepada Arjuna bahwa inilah satu-satunya momen untuk mengakhiri perang suci tersebut. Dengan hati bergetar menahan tangis, Arjuna menarik busur Gandiwa dan melepaskan pusaka pamungkas: Panah Kyai Pasopati.

Anak panah bermata bulan sabit itu melesat secepat kilat dan menembus leher sang Adipati Awangga. Tubuh Karna ambruk di tanah persada dengan senyum damai tersungging di bibirnya—ia telah menunaikan baktinya kepada sahabatnya tanpa mengingkari sumpah sucinya kepada sang ibu.

Langit Kurusetra mendadak hening. Kedua belah pihak menundukkan kepala memberikan penghormatan terakhir bagi sang satria dermawan yang telah gugur dengan jiwa ksatria paripurna.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Aja rumangsa bisa, nanging bisoa rumangsa.',
      translation:
        'Janganlah merasa paling bisa atau sombong, melainkan bisalah merasakan penderitaan sesama dan mawas diri.',
      moralLesson:
        'Kesetiaan memegang janji budi adalah mahkota jiwa seorang ksatria. Ketulusan berkorban di jalan yang sunyi akan menempatkan arwah manusia di derajat kemuliaan yang abadi.',
    },
    featured: false,
  },
  {
    id: 'srikandi-meguru-manah',
    slug: 'srikandi-meguru-manah',
    title: 'Lakon Srikandi Meguru Manah',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦱꦿꦶꦏꦤ꧀ꦝꦶꦩꦼꦒꦸꦫꦸꦩꦤꦃ',
    category: 'carangan',
    categoryLabel: 'Lakon Carangan',
    mainCharacter: 'Dewi Srikandi',
    characterRole: 'Putri Cempalareja • Prajurit Wanita Ulung Nusantara',
    supportingCharacters: ['Raden Arjuna', 'Prabu Drupada', 'Dewi Larasati'],
    readingTime: '5 Menit Baca',
    tagline: 'Keteguhan Jiwa Prajurit Wanita Menuntut Ilmu Panah Sejati',
    synopsis:
      'Kisah Dewi Srikandi berguru ilmu memanah kepada Raden Arjuna di Madukara, membuktikan bahwa keteguhan tekad dan keberanian wanita mampu menyamai bahkan melampaui kehebatan prajurit pria di medan laga.',
    coverImage: '/images/tokoh/wayang-9.webp',
    sulukOpening:
      'Suluk • "Endahing sekar cempaka ing pasetran, satria putri arum gandhane, jemparing sakti ngentas sakehing rubeda."',
    culturalSignificance:
      'Simbol emansipasi dan kepemimpinan wanita dalam kebudayaan Jawa. Srikandi membuktikan bahwa martabat ksatria tidak ditentukan oleh gender, melainkan oleh keuletan belajar dan ketajaman budi pekerti.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Kehendak Suci Putri Cempalareja',
        sceneSetting: 'Keputren Kerajaan Cempalareja • Pagi Hari',
        content: `Dewi Srikandi, putri bungsu Prabu Drupada dari Kerajaan Cempalareja, menolak kebiasaan putri keraton yang hanya berdiam diri di keputren menenun kain sutra. Sejak belia, hatinya terpikat pada desingan anak panah dan derap langkah prajurit penjaga tapal batas.

Ketika mendengar kemasyhuran ilmu memanah Raden Arjuna di Kasatriyan Madukara, Srikandi memohon izin kepada ayahandanya untuk pergi berguru. Dengan busana ksatria berselempang gandewa pusaka, sang putri melangkah tegap menuju bumi Amarta tanpa mempedulikan cibiran orang-orang yang meremehkan tekad prajurit wanita.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Ujian Menembak Burung Terbang di Madukara',
        sceneSetting: 'Taman Madukara • Tempat Latihan Memanah Para Ksatria',
        content: `Setibanya di Madukara, Raden Arjuna tidak serta-merta menerima Srikandi sebagai murid. Arjuna menguji ketajaman pandangan dan kesabaran batin sang dewi dengan meletakkan sebutir buah beringin yang tergantung di ujung benang sutra di pucuk pohon tertinggi saat angin kencang berhembus.

Didampingi oleh Dewi Larasati, Srikandi menarik tali busurnya dengan heninging cipta. Ia tidak membidik dengan matanya, melainkan dengan mata batinnya yang berserah. Anak panah melesat membelah angin dan menancap tepat di tengah buah beringin tanpa memutus benang sutranya.

Arjuna tersenyum kagum dan mewariskan ajian Pasopati Manunggal kepada Srikandi, menyadari bahwa sang putri kelak ditakdirkan menjadi senapati wanita agung yang akan meruntuhkan kesaktian Resi Bisma di medan Baratayudha.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Ksatria Putri Pelindung Swatantra',
        sceneSetting: 'Alun-alun Madukara • Penobatan Prajurit Wanita Utama',
        content: `Dengan ketekunan dan kerendahan hati dalam menuntut ilmu, Dewi Srikandi lulus sebagai pemanah ulung yang disegani di seluruh pelosok tanah Jawa. Keberaniannya menginspirasi ribuan wanita nusantara untuk berani berdiri tegak membela kebenaran dan kedaulatan bangsanya.

Lakon ditutup dengan kidung penghormatan bagi seluruh prajurit wanita pejuang pertiwi yang berhati baja namun tetap anggun memegang keluhuran adat budaya.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Wanita utama iku dudu kang mung endah rupane, nanging kang landhep atine lan kukuh bektine.',
      translation:
        'Wanita utama bukanlah yang hanya elok paras wajahnya, melainkan yang tajam kepekaan hatinya dan kokoh pengabdian kebajikannya.',
      moralLesson:
        'Keberanian dan kecakapan menuntut ilmu tidak mengenal batasan gender. Siapa pun yang bersungguh-sungguh melatih diri dengan kesabaran akan mampu menjadi pelindung kebenaran bagi sesamanya.',
    },
    featured: false,
  },
  {
    id: 'petruk-dadi-ratu',
    slug: 'petruk-dadi-ratu',
    title: 'Lakon Petruk Dadi Ratu',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦥꦼꦠꦿꦸꦏ꧀ꦢꦢꦶꦫꦠꦸ',
    category: 'punokawan',
    categoryLabel: 'Punokawan',
    mainCharacter: 'Kyai Petruk Kantong Bolong',
    characterRole: 'Prabu Welgeduwelbeh • Raja Jenaka Kerajaan Lojitengara',
    supportingCharacters: ['Semar', 'Gareng', 'Bagong', 'Werkudara', 'Prabu Duryudana'],
    readingTime: '5 Menit Baca',
    tagline: 'Gelak Tawa, Pusaka Jamus Kalimasada, & Sindiran Kuasa',
    synopsis:
      'Kisah humor filosofis ketika Petruk secara tak sengaja menguasai pusaka Kalimasada dan mendirikan kerajaan tandingan untuk memberi pelajaran kepada para raja yang haus kekuasaan duniawi.',
    coverImage: '/images/tokoh/wayang-2.webp',
    sulukOpening:
      'Suluk • "Aja gumunan aja kagetan, dunya iki mung panggung sandiwara, wong cilik bisa dadi raja yen wus kersaning Hyang Widhi."',
    culturalSignificance:
      'Kritik sosial tajam khas budaya Jawa yang mengingatkan bahwa kekuasaan duniawi hanyalah titipan sementara. Ketika rakyat kecil diberi mandat, mereka seringkali lebih peka terhadap keadilan dibanding para bangsawan yang korup.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Hilangnya Pusaka Jamus Kalimasada',
        sceneSetting: 'Paseban Agung Keraton Amarta & Hutan Karangdempel',
        content: `Kerajaan Amarta geger besar karena pusaka paling keramat lambang kedaulatan negara, Jamus Kalimasada, raib dicuri oleh siluman Mustakaweni atas suruhan Kurawa. Para ksatria Pandawa kebingungan mencari jejak pusaka tersebut.

Di tengah hutan, Petruk yang cerdik berhasil merebut kembali pusaka tersebut setelah menjebak sang siluman pencuri. Namun alih-alih langsung mengembalikannya ke Amarta, Petruk yang melihat kepongahan para bangsawan kerajaan memutuskan untuk menyamar menjadi raja agung bergelar Prabu Welgeduwelbeh di Kerajaan Lojitengara.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Sidang Keraton Lojitengara yang Menggelikan',
        sceneSetting: 'Balairung Keraton Lojitengara • Suasana Sidang Penuh Kelakar',
        content: `Prabu Welgeduwelbeh duduk di atas singgasana emas dengan mahkota miring dan hidung mancungnya yang khas. Ia menggelar sayembara: barang siapa raja di tanah Jawa yang ingin meminta bantuannya harus menyembah dan menjawab teka-teki moral rakyat jelata.

Raja-raja perkasa dari Astina seperti Duryudana dan Dursasana datang menghaturkan upeti dan bersujud tanpa menyadari bahwa raja sakti yang mereka sembah sejatinya adalah punokawan Petruk. Dengan gaya diplomasi yang menggelikan namun menohok, Petruk membagikan seluruh harta upeti para raja korup tersebut kepada rakyat jelata yang kelaparan.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Teguran Semar & Kembalinya Kedaulatan Rakyat',
        sceneSetting: 'Alun-alun Lojitengara • Tancep Kayon & Tawa Bersama',
        content: `Ketika Raden Werkudara dan Arjuna datang untuk menantang tanding, Petruk dengan kesaktian Kalimasada sanggup meladeni mereka tanpa terluka. Namun saat Kyai Semar dan Bagong melangkah masuk ke balairung sembari tertawa terpingkal-pingkal, Petruk langsung turun dari singgasana dan bersujud mencium kaki ayahnya.

"Petruk, cukup leluconmu," sabda Semar sembari tersenyum arif. "Pusaka Kalimasada adalah pedoman hidup, bukan alat untuk memamerkan kesombongan tahta fana."

Petruk menyerahkan kembali pusaka tersebut kepada Puntadewa. Seluruh ksatria tertawa lega sekaligus tersadar dari kesombongan mereka, mengakhiri lakon dengan kehangatan guyub rukun penuh hikmah.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Aja gumunan, aja getunan, aja kagetan, aja aleman.',
      translation:
        'Jangan mudah terheran-heran oleh gemerlap dunia, jangan mudah menyesal, jangan mudah terkejut, dan jangan manja mencari pujian.',
      moralLesson:
        'Kekuasaan duniawi hanyalah pakaian pinjaman yang sewaktu-waktu dapat berganti. Nilai sejati seorang manusia terletak pada kejujuran dan ketulusan hatinya dalam membela sesama.',
    },
    featured: false,
  },
  {
    id: 'sayembara-mantili',
    slug: 'sayembara-mantili',
    title: 'Lakon Sayembara Mantili',
    javaneseTitle: 'ꦭꦏꦺꦴꦤ꧀ꦱꦪꦺꦩ꧀ꦧꦫꦩꦤ꧀ꦠꦶꦭꦶ',
    category: 'ramayana',
    categoryLabel: 'Ramayana',
    mainCharacter: 'Sri Rama Wijaya',
    characterRole: 'Putra Mahkota Ayodya • Titisan Batara Wisnu',
    supportingCharacters: ['Dewi Shinta', 'Prabu Janaka', 'Leksmana', 'Prabu Rahwana'],
    readingTime: '5 Menit Baca',
    tagline: 'Rentangan Busur Harpa Dewa & Pertemuan Jodoh Sejati',
    synopsis:
      'Kisah sayembara mematahkan busur raksasa Batara Siwa di Kerajaan Mantili yang diikuti para raja sejagat, dimenangkan oleh Sri Rama yang berhati hening.',
    coverImage: '/images/tokoh/wayang-8.webp',
    sulukOpening:
      'Suluk • "Kidung kencana ing tlatah Mantili, jodho sejati pinesthi dening Hyang Widhi lumantar heninging manah."',
    culturalSignificance:
      'Awal mula wiracarita agung Ramayana yang menyimbolkan bahwa jodoh sejati dan keberhasilan luhur hanya dapat diraih oleh pribadi yang memiliki kejernihan spiritual, bukan oleh kekuatan otot semata.',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Sayembara Busur Pusaka Prabu Janaka',
        sceneSetting: 'Alun-alun Keraton Mantili • Dipadati Ribuan Raja & Pangeran',
        content: `Prabu Janaka, raja agung Kerajaan Mantili, menggelar sayembara besar untuk mencarikan jodoh bagi putri tercintanya, Dewi Shinta yang terkenal akan kecantikan dan kesucian budinya. Syarat sayembara tersebut teramat berat: siapa pun yang sanggup mengangkat dan merentangkan Busur Gandewa pusaka Batara Siwa hingga melengkung, dialah yang berhak mempersunting sang dewi.

Para raja perkasa dari seantero mayapada datang berbondong-bondong, termasuk Prabu Dasamuka dari Alengka yang berbadan raksasa. Namun saat mencoba mengangkat busur tersebut, jangankan merentangkan talinya, menggeser busur dari landasannya pun para raja sombong itu tak sanggup dan jatuh tersungkur menanggung malu.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Heninging Batin Sri Rama Merentang Gandewa',
        sceneSetting: 'Panggung Utama Sayembara Mantili',
        content: `Didampingi oleh adiknya, Raden Leksmana, dan Resi Wiswamitra, melangkahlah pemuda tampan berwajah tenang dari Ayodya: Raden Rama Wijaya. Rama tidak melangkah dengan kesombongan pamer otot, melainkan menghaturkan sembah doa memohon izin kepada Sang Hyang Jagadnata.

Dengan senyuman teduh, Rama mengangkat busur raksasa tersebut seringan sehelai kapas. Saat tali busur ditarik ke belakang telinganya, suara dentuman dahsyat menggelegar laksana halilintar di siang bolong—busur pusaka Batara Siwa patah menjadi dua bagian di tangan sang titisan Wisnu!

Seluruh rakyat Mantili bersorak gegap gempita menyaksikan keajaiban tersebut, sementara Dewi Shinta tersipu malu mengalungkan rangkaian bunga cempaka ke leher Sri Rama.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Janji Suci Pernikahan Agung',
        sceneSetting: 'Balairung Keraton Mantili • Pesta Pernikahan Suci Penuh Kidung',
        content: `Pernikahan agung Sri Rama dan Dewi Shinta dilangsungkan dengan upacara adat keraton yang teramat sakral. Keduanya berikrar janji suci untuk saling setia menemani dalam suka maupun duka, dalam kemakmuran takhta istana maupun dalam pengasingan rimba belantara.

Pertemuan Rama dan Shinta menjadi perlambang abadi penyatuan antara Satria Kebajikan (Dharma) dengan Kesucian Jiwa (Shinta), fondasi utama yang mengarungi samudera wiracarita Ramayana.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Rukun agawe santosa, crah agawe bubrah, tresna sejati tuwuh saka resiking ati.',
      translation:
        'Kerukunan membawa ketenteraman, pertikaian membawa kehancuran, cinta sejati bersemi dari kesucian hati nurani.',
      moralLesson:
        'Kemenangan sejati dalam hidup tidak ditentukan oleh kesombongan fisik atau kekuatan kekuasaan, melainkan oleh kerendahan hati, kejernihan budi, dan ketulusan niat.',
    },
    featured: false,
  },
];

/**
 * Helper untuk mengambil cerita berdasarkan slug atau id
 */
export function getStoryBySlug(slug: string): WayangStoryItem | undefined {
  return WAYANG_STORIES.find((s) => s.slug === slug || s.id === slug);
}
