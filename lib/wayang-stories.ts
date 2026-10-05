/**
 * lib/wayang-stories.ts
 * Database naskah cerita dan lakon wayang kurasi Nusantara untuk Wayang Jawi.
 * Disusun secara terstruktur tanpa dependensi AI, mudah ditambah dan dikelola.
 */

export interface StoryAct {
  actNumber: number;
  actTitle: string; // e.g. "Babak I: Pathet Nem - Jejer Pasewakan"
  content: string;
}

export interface WayangStoryItem {
  id: string;
  slug: string;
  title: string;
  javaneseTitle?: string;
  category: 'mahabharata' | 'ramayana' | 'carangan' | 'punokawan' | 'ksatria';
  categoryLabel: string;
  mainCharacter: string;
  supportingCharacters: string[];
  readingTime: string; // e.g. "5 Menit Baca"
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
    supportingCharacters: ['Dewi Shinta', 'Prabu Rahwana', 'Raden Indrajit', 'Trijatha'],
    readingTime: '4 Menit Baca',
    tagline: 'Badai Api Kesucian di Jantung Kerajaan Alengka',
    synopsis:
      'Kisah kepahlawanan duta suci Anoman menembus benteng pertahanan Alengka untuk menemui Dewi Shinta, yang berujung pada aksi pembakaran istana emas dengan ekornya yang berpijar.',
    coverImage: '/images/tokoh/wayang-6.webp',
    sulukOpening:
      'ꦱꦸꦭꦸꦏ꧀ • "Mlesat ing gegana lir thathit nyamber wengi, Kera Putih satria Bayu mbela sucining narendra Rama."',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Duta Suci Menembus Taman Soka',
        content: `Malam merayap hening di sekeliling kraton Alengka Diraja. Di atas dahan pohon nagasari yang rindang di Taman Soka, sesosok bayangan berbulu putih salju bergeming mengamati sekeliling. Itulah Anoman, putra Batara Bayu yang diutus Sri Rama untuk memastikan keadaan Dewi Shinta.

Melihat Dewi Shinta yang anggun meratapi kepedihan tawanannya bersama Dewi Trijatha, Anoman melompat turun dengan santun. Sang kera putih menghaturkan sembah bekti seraya menyerahkan cincin mustika pusaka Rama. Haru membuncah di dada sang dewi; keyakinan akan runtuhnya kezaliman Prabu Dasamuka kembali berkobar laksana lentera di pekatnya malam.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Jerat Nagapasa & Kobaran Ekor Mayapada',
        content: `Ketenangan di taman keputren tak berlangsung lama. Pasukan raseksa Alengka di bawah komando Raden Indrajit mengepung seluruh penjuru taman. Menggunakan senjata pusaka Nagapasa, Anoman sengaja membiarkan dirinya tertawan demi bisa berhadapan langsung dengan sang raja angkara, Prabu Dasamuka di balairung agung.

Rahwana yang murka memerintahkan para prajurit raseksa untuk membakar sang kera putih hidup-hidup di tengah alun-alun. Gulungan kain sutra berlumur minyak jarak dililitkan pada ekor Anoman. Saat lidah api disulut dan berkobar ke angkasa, Anoman justru melafalkan ajian Sepiangin. Dengan lincah ia melompat dari atap ke atap istana emas, mengibaskan ekornya yang membara hingga seluruh sudut Alengka berubah menjadi lautan api!`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Kemenangan Dharma & Fajar Pengharapan',
        content: `Kobaran api di Alengka menjadi saksi abadi bahwa kezaliman penguasa yang tamak akan lebur terbakar oleh kesucian niat ksatria pembela kebenaran. Anoman yang tak terluka sedikit pun melesat menyeberangi samudra luas kembali menuju pesanggrahan Maliawan, membawa kabar gembira bagi Sri Rama bahwa fajar pembebasan telah kian dekat.

Lakon ditutup dengan gending kemenangan yang berkumandang menyambut terbitnya mentari pagi, menandai awal dari keruntuhan bala tentara angkara murka di tanah Alengka.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Satya marang janji, kendel mbelani bener tanpa golek aleman.',
      translation: 'Teguh memegang sumpah suci, berani membela kebenaran sejati tanpa pamrih mengharap pujian duniawi.',
      moralLesson:
        'Ketulusan hati, kesetiaan, dan keberanian tanpa pamrih memiliki kekuatan mahadasyat yang sanggup meruntuhkan kezaliman sebesar apa pun.',
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
    supportingCharacters: ['Dewa Ruci', 'Resi Durna', 'Naga Nemburnawa'],
    readingTime: '5 Menit Baca',
    tagline: 'Kembara Batin Werkudara Menyelami Samudra Kesunyian',
    synopsis:
      'Perjalanan spiritual Bima mencari Air Kehidupan (Tirta Pawitra) atas titah gurunya, yang membawanya menaklukkan naga samudra hingga meraih pencerahan sejati di dalam diri Sang Dewa Ruci.',
    coverImage: '/images/tokoh/wayang-7.webp',
    sulukOpening:
      'ꦱꦸꦭꦸꦏ꧀ • "Samudra sunyi tanpa tepi, manunggal sukma ing jroning raga, manggih pepadhang ing guwa garbaning Batara Kencana."',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Titah Resi Durna & Gunung Candramuka',
        content: `Atas siasat licik para Kurawa, Resi Durna memerintahkan Raden Werkudara untuk mencari Tirta Perwitasari — air suci kehidupan abadi yang konon berada di gua Gunung Candramuka. Bagi seorang ksatria lurus hati seperti Bima, titah sang guru adalah kewajiban dharma mutlak yang pantang disangkal.

Langkah kaki Bima yang perkasa mengguncang hutan belantara. Di lereng gunung, dua raksasa penjelmaan batara, Rukmuka dan Rukmakala, menghadang jalannya. Dengan Kuku Pancanaka, Bima menumpas rintangan lahiriah tersebut, menyadari bahwa air suci yang dicari sejatinya berada di kedalaman yang lebih agung: Samudra Minangkalbu.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Pertarungan Naga Nemburnawa di Laut Kidul',
        content: `Setibanya di pesisir Laut Kidul, ombak bergulung setinggi bukit dan pusaran air gelap tampak mengerikan. Tanpa ragu sedikit pun akan keselamatan raganya, Werkudara menceburkan diri ke dasar samudra raya.

Di kedalaman laut yang pekat, seekor naga raksasa ganas bernama Nemburnawa melilit tubuh Bima dengan cengkeraman mematikan. Dalam situasi kritis antara hidup dan mati, Bima memusatkan heninging cipta dan menancapkan Kuku Pancanaka tepat di leher sang naga. Seketika samudra menjadi tenang dan cahaya keemasan terpancar menyinari kedalaman air.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Menyatu dalam Guwa Garba Sukma Sejati',
        content: `Di tengah keheningan dasar samudra, tampaklah sosok mungil bercahaya lembut: Sang Dewa Ruci, wujud sukma sejati Werkudara sendiri. Sang Dewa memerintahkan Bima untuk masuk ke dalam rongga telinga kirinya.

Secara ajaib, di dalam ruang kecil itu Bima justru menyaksikan jagat raya yang mahaluas tanpa batas: perputaran bintang, hakikat empat cahaya nafsu manusia (hitam, merah, kuning, putih), dan sumber ketenangan abadi. Bima mencapai kasampurnan sejati — memahami bahwa Tuhan yang dicari sesungguhnya bersemayam di dalam kesucian sanubari manusia yang tulus.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Ngelmu iku kalakone kanthi laku, lekase lawan kas, tegese kas nyantosani.',
      translation:
        'Ilmu kebajikan sejati hanya dapat diraih melalui penghayatan laku batin yang sungguh-sungguh, dimulai dari kehendak yang teguh dan membentengi jiwa.',
      moralLesson:
        'Ketaatan, kejujuran mutlak, dan keberanian membersihkan hati dari hawa nafsu akan mengantarkan manusia menemukan jati diri serta kedamaian hakiki bersama Sang Pencipta.',
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
    supportingCharacters: ['Adipati Karna', 'Raden Arjuna', 'Prabu Puntadewa'],
    readingTime: '4 Menit Baca',
    tagline: 'Kusuma Bangsa Melayang Menembus Langit Malam Kurusetra',
    synopsis:
      'Detik-detik kepahlawanan sang satria Pringgandani yang mengorbankan jiwa raganya menghadang senjata pamungkas Kunta Wijayadanu di langit malam demi menyelamatkan pamannya, Raden Arjuna.',
    coverImage: '/images/tokoh/wayang-5.webp',
    sulukOpening:
      'ꦱꦸꦭꦸꦏ꧀ • "Megatruh ing akasa, kumelap praba kencana, satria Pringgandani pasrah jiwa raga kanggo kejayaaning Pandawa."',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Mandat Malam di Tenda Kurusetra',
        content: `Malam ke-14 perang Baratayudha berselimut kabut darah. Pasukan Kurawa melancarkan serangan malam di luar etika perang prajurit. Suasana mencekam menuntut hadirnya ksatria yang memiliki ketajaman pandangan di kegelapan gulita.

Raden Gatotkaca melangkah maju ke hadapan Prabu Puntadewa dan pamannya, Raden Arjuna. Dengan suara mantap laksana guruh, ia memohon restu: "Paman, biarlah dada Pringgandani ini menjadi perisai bagi seluruh prajurit Pandawa malam ini."`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Amukan Brajamusti di Puncak Awan',
        content: `Melesatlah Gatotkaca berbalut Rompi Antakusuma ke angkasa hitam. Dari balik gumpalan awan mendung, ia menghujam laksana halilintar menumpas barisan prajurit Kurawa. Ajian Brajamusti dan Brajadenta menggetarkan bumi Kurusetra hingga para raseksa kocar-kacir kehilangan nyali.

Melihat kehancuran pasukannya, Adipati Karna yang terdesak terpaksa mengeluarkan senjata pusaka terhebatnya: Panah Kunta Wijayadanu. Pusaka anugerah Batara Indra yang hanya dapat digunakan sekali seumur hidup itu dilepaskan, melesat menyilaukan menuju langit malam membidik Gatotkaca.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Runtuhnya Raksasa Pembawa Kemenangan',
        content: `Gatotkaca menyadari bahwa takdir Kunta tak terelakkan. Dalam detik-detik terakhir sebelum senjata menembus dadanya, sang satria mengerahkan sisa kesaktiannya membesarkan tubuhnya menjadi raksasa setinggi gunung, lalu menjatuhkan jasadnya tepat menimpa kereta perang Adipati Karna dan meluluhlantakkan ribuan bala tentara Kurawa.

Kematian Gatotkaca bukanlah kekalahan, melainkan pengorbanan agung yang melucuti senjata paling mematikan lawan demi menjamin keselamatan Raden Arjuna pada hari penentuan esok lusa.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Kusuma Bangsa ora bakal ilang arume sanadyan raga wus lebur dadi awu.',
      translation:
        'Pahlawan bangsa tidak akan pernah pudar keharuman namanya, walau jasad raga telah lebur menyatu dengan tanah persada.',
      moralLesson:
        'Pengorbanan tulus demi kemaslahatan bersama dan kedaulatan tanah air adalah derajat kehormatan tertinggi bagi seorang ksatria.',
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
    supportingCharacters: ['Petruk', 'Gareng', 'Bagong', 'Raden Arjuna', 'Batara Guru'],
    readingTime: '5 Menit Baca',
    tagline: 'Tahta Batin & Kemakmuran Sejati ing Karangdempel',
    synopsis:
      'Kisah jenaka sarat falsafah ketika Semar berniat membangun Kayangan di bumi, yang sempat disalahpahami para pembesar kerajaan sebagai tindakan makar.',
    coverImage: '/images/tokoh/wayang-1.webp',
    sulukOpening:
      'ꦱꦸꦭꦸꦏ꧀ • "Urip iku urup, ngelarung hawa nepsu, guyub rukun amemangun tentreming praja lumantar luhuring budi."',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Resah Para Satria & Sabda Ismaya',
        content: `Negeri Amarta sedang dilanda pagebluk dan perselisihan batin. Para satria Pandawa terjebak dalam kecemasan memikirkan takhta dan pusaka, melupakan penderitaan rakyat jelata di pedesaan.

Di bawah naungan pohon beringin Karangdempel, Kyai Semar duduk termenung sembari tersenyum arif. Ditemani canda ceplas-ceplos Petruk dan Bagong, Semar mencanangkan niat suci: "Aku hendak membangun Kayangan." Niat ini menimbulkan kepanikan di kalangan para raja dan pembesar dewa yang mengira Semar hendak menggulingkan takhta kahyangan.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Guyon Maton & Ujian Keikhlasan',
        content: `Batara Guru mengutus bala tentara kahyangan untuk menghentikan niat Semar. Namun berkat kelakar jenaka dan kecerdasan Bagong serta Petruk, segala senjata pusaka dewa luluh tak berdaya menghadapi ketulusan hati para punokawan.

Saat Raden Arjuna datang meminta penjelasan, Semar menatapnya dengan tatapan penuh welas asih: "Raden, Kayangan yang kumaksud bukanlah istana emas bertatahkan intan di atas awan, melainkan Kayangan ing Sajroning Ati — ketentraman batin manusia yang bersih dari keserakahan dan dengki."`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Terbitnya Kemakmuran Nusantara',
        content: `Mendengar wejangan sang pamong luhur, tersungkurlah para ksatria bersimpuh memohon ampun. Sadarlah para pemimpin bahwa kemakmuran sebuah negeri tidak diukur dari megahnya benteng kraton, melainkan dari keadilan pemimpin yang mau mendengar suara rakyat kecil.

Gamelan Kebo Giro berkumandang menyambut pulihnya ketentraman di tanah Jawa. Semar, Petruk, Gareng, dan Bagong menari bersama menyongsong fajar harapan baru yang penuh berkah.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Memayu hayuning bawana, ambrasta dur hangkara.',
      translation: 'Melindungi dan memperindah keselamatan dunia semesta, serta memusnahkan segala angkara murka.',
      moralLesson:
        'Kebahagiaan dan kejayaan sebuah bangsa berakar dari kerendahan hati para pemimpinnya yang bersedia mengayomi rakyat jelata dengan tulus.',
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
    supportingCharacters: ['Werkudara', 'Arjuna', 'Nakula', 'Sadewa', 'Prabu Yudhistira Jin'],
    readingTime: '4 Menit Baca',
    tagline: 'Membangun Peradaban Luhur dari Rimba Belantara Angker',
    synopsis:
      'Perjuangan Pandawa membuka Hutan Wanamarta yang dihuni lima raja jin sakti, mengubah rimba belantara menjadi Kerajaan Amarta yang makmur dan berkeadilan.',
    coverImage: '/images/tokoh/wayang-4.webp',
    sulukOpening:
      'ꦱꦸꦭꦸꦏ꧀ • "Heninging jagat sumunar ing tancep kayon, rumesep ing wardaya satria pinilih kang mbela luhuring budi."',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Tanah Pengasingan & Niat Suci Pandawa',
        content: `Setelah selamat dari tragedi pembakaran Balai Sigala-gala, Pandawa Lima diberi sebidang tanah hutan belantara tak berpenghuni bernama Alas Mertani (Wanamarta) oleh Kerajaan Astina. Hutan itu terkenal sangat angker dan dikuasai oleh lima saudara bangsa jin sakti pimpinan Prabu Yudhistira Jin.

Alih-alih berkecil hati, Puntadewa bersama adik-adiknya menerima takdir tersebut dengan lapang dada, bertekad mengubah hutan belantara menjadi negeri yang damai dan sejahtera bagi semua makhluk.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Penyatuan Sukma Lima Saudara Jin',
        content: `Ketika Werkudara dan Arjuna mulai membuka hutan, para penguasa gaib menyerang untuk mempertahankan wilayahnya. Terjadilah perang tanding kesaktian yang dahsyat antara Pandawa melawan lima raja jin.

Namun dengan keluhuran budi Puntadewa dan kesaktian Minangkalbu, para raja jin luluh. Mereka menyadari bahwa Pandawa adalah titisan kebenaran sejati. Kelima raja jin tersebut kemudian merelakan raganya manunggal (menyatu) ke dalam tubuh Pandawa Lima, memberikan kesaktian dan warisan kebijaksanaan alam gaib.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Berdirinya Istana Indraprastha Amarta',
        content: `Dari hutan yang semula gelap gulita, berdirilah Kerajaan Amarta (Indraprastha) yang megah, hijau, dan makmur. Prabu Puntadewa dinobatkan sebagai raja agung berhati suci yang tidak pernah berbohong seumur hidupnya.

Kemakmuran Amarta menjadi teladan abadi bahwa dengan persatuan, kesabaran, dan niat luhur, tanah yang paling tandus sekalipun dapat diubah menjadi surga kedamaian.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Sura Dira Jayaningrat Lebur Dening Pangastuti.',
      translation:
        'Segala angkara murka, kekerasan, dan keangkuhan akan lebur oleh kelembutan budi pekerti serta kerendahan hati.',
      moralLesson:
        'Ketabahan dalam menghadapi cobaan hidup dan keikhlasan berjuang dari titik terendah akan membuahkan kemuliaan yang abadi.',
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
    supportingCharacters: ['Prabu Rahwana', 'Gunawan Wibisana', 'Sri Rama', 'Leksmana'],
    readingTime: '5 Menit Baca',
    tagline: 'Ksatria Sejati: Membela Tanah Air, Bukan Membela Kejahatan Raja',
    synopsis:
      'Dilema kepahlawanan raksasa bijak Kumbakarna yang memilih gugur di medan perang Alengka demi membela tanah tumpah darahnya, meski mengutuk kejahatan kakaknya sendiri, Prabu Rahwana.',
    coverImage: '/images/tokoh/wayang-7.webp',
    sulukOpening:
      'ꦱꦸꦭꦸꦏ꧀ • "Mbelani bumi pertiwi ngungkuli rasa wedi, getih satria dadi panuntun luhuring darma nagari."',
    acts: [
      {
        actNumber: 1,
        actTitle: 'Babak I: Pathet Nem — Teguran Pedas di Balairung Istana',
        content: `Ketika benteng Alengka kian terdesak oleh serbuan laskar kera Sri Rama, Prabu Dasamuka membangunkan adiknya, Kumbakarna, dari tidur panjangnya di Pangleburgangsa untuk memimpin peperangan.

Kumbakarna menatap kakaknya dengan mata berbinar kejujuran: "Kakang Prabu, peperangan ini terjadi karena nafsu angkara murkamu yang menculik istri orang lain. Kembalikanlah Dewi Shinta kepada Sri Rama agar rakyat Alengka tidak binasa sia-sia!" Namun Rahwana yang dibutakan kesombongan menolak mentah-mentah nasihat adiknya.`,
      },
      {
        actNumber: 2,
        actTitle: 'Babak II: Pathet Sanga — Sumpah Ksatria di Medan Suci',
        content: `Menghadapi kemarahan Rahwana, Kumbakarna mengenakan pakaian serba putih perlambang kesucian niat. Sang satria raksasa berikrar di hadapan bumi pertiwi: "Aku melangkah ke medan laga bukan untuk membela kejahatan Dasamuka, melainkan karena tanah airku Alengka sedang diinjak-injak oleh bangsa asing!"

Di medan perang, Kumbakarna bertarung dengan wibawa luar biasa. Bahkan Sri Rama dan Leksmana menaruh rasa hormat yang teramat tinggi kepada jiwa patriotisme sang raksasa berbudi luhur tersebut.`,
      },
      {
        actNumber: 3,
        actTitle: 'Babak III: Pathet Manyura — Gugurnya Sang Pahlawan Sejati',
        content: `Dengan panah Guwawijaya yang dilepaskan Sri Rama, gugurlah Arya Kumbakarna dengan tenang dan terhormat. Langit menaburkan bunga-bunga surgawi mengiringi arwah sang pahlawan sejati yang telah menunaikan sumpah baktinya pada tanah air.

Kumbakarna diabadikan dalam sastra Kakawin Ramayana sebagai teladan utama jiwa ksatria (Tripama) yang tidak pernah menjual kehormatan bangsanya demi kepentingan pribadi.`,
      },
    ],
    pituturLuhur: {
      javaneseQuote: 'Bela nagara ora kudu mbela panguwasa kang luput, nanging ngreksa bumi wutah getih.',
      translation:
        'Membela negara bukan berarti membenarkan pemimpin yang zalim, melainkan menjaga kehormatan dan keselamatan tanah tumpah darah.',
      moralLesson:
        'Cinta tanah air yang sejati menuntut integritas moral tertinggi: berani menegur kesalahan penguasa sembari rela mengorbankan jiwa demi martabat bangsa.',
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
