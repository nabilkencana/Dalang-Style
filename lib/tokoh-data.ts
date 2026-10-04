export interface TokohCharacter {
  slug: string;
  name: string;
  role: string;
  subtitle: string;
  aksara: string;
  image: string;
  badge: string;
  origin: string;
  philosophy: string;
  quote: string;
  traits: string[];
  weapons: {
    name: string;
    description: string;
  }[];
  morals: {
    title: string;
    description: string;
  }[];
}

export const TOKOH_CHARACTERS: Record<string, TokohCharacter> = {
  'kyai-semar': {
    slug: 'kyai-semar',
    name: 'Kyai Semar',
    role: 'Punakawan • Pamong Para Ksatria',
    subtitle: 'Semar Badranaya — Tokoh Pamong Sejati',
    aksara: 'ꦏꦾꦲꦶ ꦱꦼꦩꦂ',
    image: '/images/tokoh/wayang-1.webp',
    badge: 'PUNAKAWAN',
    origin:
      'Penjelmaan Batara Ismaya yang turun ke marcapada (dunia manusia) sebagai abdi sekaligus pamong pengayom para ksatria berbudi luhur. Semar digambarkan bertubuh tambun, berkuncung putih, memiliki mata berair (menangis untuk kesusahan rakyat) namun bibir tersenyum (melambangkan ketabahan dan kegembiraan batin).',
    philosophy:
      'Semar melambangkan kearifan sejati rakyat kecil dan kepemimpinan yang melayani (servant leadership). Tangan kanannya menunjuk ke langit (ingat kepada Sang Maha Pencipta), sementara tangan kirinya terlipat di belakang (rendah hati dan tidak memamerkan kekuasaan).',
    quote:
      '"Urip iku urup — Hidup itu menyala, jadilah pelita yang menerangi jalan sesama dalam kegelapan."',
    traits: ['Bijaksana', 'Pengayom', 'Tulus', 'Sakti Tanpa Tanding'],
    weapons: [
      {
        name: 'Kentut Sakti Semar',
        description: 'Senjata pamungkas yang mampu melumpuhkan kesombongan para dewa dan raksasa paling angkara.',
      },
      {
        name: 'Aji Pangabaran',
        description: 'Ajian sakti penunduk nafsu angkara murka yang meluruhkan niat jahat musuh.',
      },
    ],
    morals: [
      {
        title: 'Kerendahan Hati di Atas Tahta',
        description: 'Meskipun sejatinya adalah dewa tertua, Semar memilih hidup bersahaja sebagai abdi ksatria.',
      },
      {
        title: 'Mendengar Suara Nurani Rakyat',
        description: 'Semar selalu menjadi pembela pertama ketika para penguasa mulai lalai akan nasib rakyat jelata.',
      },
    ],
  },
  'kyai-petruk': {
    slug: 'kyai-petruk',
    name: 'Kyai Petruk',
    role: 'Punakawan • Cerdas & Jenaka',
    subtitle: 'Petruk Kantong Bolong — Simbol Ketangkasan Berpikir',
    aksara: 'ꦏꦾꦲꦶ ꦥꦺꦠꦿꦸꦏ꧀',
    image: '/images/tokoh/wayang-2.webp',
    badge: 'PUNAKAWAN',
    origin:
      'Putra kedua Semar berhidung panjang menjulang dan bertubuh jangkung. Petruk adalah sosok yang cerdas, tangkas berbicara, dan pandai mencairkan suasana tegang dengan lelucon filosofis yang menyentil kebenaran.',
    philosophy:
      'Petruk dijuluki "Kantong Bolong" (kantong berlubang), simbol dari manusia yang tidak serakah menimbun harta duniawi. Apa pun rezeki yang diterimanya senantiasa dibagikan kembali kepada sesama yang membutuhkan.',
    quote:
      '"Aja gumunan, aja getunan, aja kagetan — Jangan mudah terheran-heran, jangan mudah menyesal, dan jangan mudah terkejut menghadapi liku-liku dunia."',
    traits: ['Cerdas', 'Diplomatis', 'Humoris', 'Dermawan'],
    weapons: [
      {
        name: 'Kapak Petruk',
        description: 'Pusaka pemotong kebohongan dan simbol keteguhan dalam membuka jalan baru.',
      },
      {
        name: 'Kelincahan Bersilat Lidah',
        description: 'Kemampuan diplomasi ulung yang mampu mematahkan tipu muslihat para patih licik.',
      },
    ],
    morals: [
      {
        title: 'Kritik yang Menyejukkan',
        description: 'Menyampaikan kebenaran pahit kepada para penguasa melalui canda tawa yang bermakna luhur.',
      },
      {
        title: 'Kepemimpinan yang Ingat Asal',
        description: 'Kisah "Petruk Dadi Ratu" mengingatkan bahwa pemimpin yang lupa akar rakyatnya akan runtuh seketika.',
      },
    ],
  },
  'kyai-bagong': {
    slug: 'kyai-bagong',
    name: 'Kyai Bagong',
    role: 'Punakawan • Kritis & Jujur',
    subtitle: 'Bagong Bawor — Penyuara Kebenaran Tanpa Takut',
    aksara: 'ꦏꦾꦲꦶ ꦧꦒꦺꦴꦁ',
    image: '/images/tokoh/wayang-3.webp',
    badge: 'PUNAKAWAN',
    origin:
      'Putra bungsu Semar yang tercipta dari bayangan Semar sendiri atas kehendak Sang Hyang Tunggal. Berwujud bulat pendek dengan mata melotot dan bibir tebal terbuka lebar, Bagong berbicara dengan nada suara berat bergemuruh.',
    philosophy:
      'Bagong adalah simbol kejujuran lugu tanpa basa-basi (blak-blakan). Ia tidak mempan disuap, tidak gentar menghadapi ancaman raja maupun dewa, dan selalu menyuarakan kenyataan apa adanya tanpa kepalsuan politik.',
    quote:
      '"Sing bener dibenerke, sing luput dielingke — Yang benar harus dibenarkan, yang keliru harus diingatkan, tanpa pandang bulu siapa yang bicara."',
    traits: ['Jujur', 'Berani', 'Spontan', 'Kritis'],
    weapons: [
      {
        name: 'Kejujuran Mutlak',
        description: 'Kekuatan kata-kata jujur yang meruntuhkan topeng kemunafikan para bangsawan.',
      },
      {
        name: 'Ketahanan Jiwa Semar',
        description: 'Daya tahan gaib warisan bayangan Sang Hyang Ismaya yang tak goyah oleh senjata tajam.',
      },
    ],
    morals: [
      {
        title: 'Anti Kemunafikan',
        description: 'Menolak kepalsuan tata krama istana yang kerap digunakan untuk menutupi kebobrokan moral.',
      },
      {
        title: 'Keberanian Berpihak pada Keadilan',
        description: 'Selalu berdiri di garis depan membela ksatria yang memperjuangkan dharma sejati.',
      },
    ],
  },
  'sang-arjuna': {
    slug: 'sang-arjuna',
    name: 'Sang Arjuna',
    role: 'Satria Pandawa • Penengah Pandawa',
    subtitle: 'Permadi — Ksatria Tampan Berhati Baja',
    aksara: 'ꦱꦁ ꦲꦂꦗꦸꦤ',
    image: '/images/tokoh/wayang-4.webp',
    badge: 'PANDAWA',
    origin:
      'Anak ketiga Prabu Pandu Dewanata dan Dewi Kunti (penengah Pandawa Lima), merupakan titisan Batara Indra sang dewa petir dan keindahan. Menguasai kadipaten Madukara dengan ketampanan yang memikat seluruh jagad dan kemahiran memanah tanpa tanding.',
    philosophy:
      'Arjuna melambangkan fokus pikiran manusia (manas) yang telah terlatih melalui tapa brata. Dalam perang Bharatayuddha, ia menerima wejangan suci Gita dari Prabu Kresna mengenai hakikat kewajiban ksatria tanpa terikat buah perbuatan.',
    quote:
      '"Fokuskan anak panahmu bukan pada sasaran di luar sana, melainkan pada kemurnian niat dan ketenangan jiwamu di dalam."',
    traits: ['Fokus', 'Ksatria Sejati', 'Halus Budi', 'Pertapa Ulung'],
    weapons: [
      {
        name: 'Busur Sakti Gandiwa',
        description: 'Busur pusaka anugerah Dewa Baruna yang tak pernah patah dan mampu menembakkan ribuan panah cahaya.',
      },
      {
        name: 'Panah Pasopati',
        description: 'Senjata pamungkas dari Batara Guru yang melesat bagai kilat dan tak pernah meleset dari sasaran.',
      },
      {
        name: 'Keris Pulanggeni',
        description: 'Keris pusaka melambangkan keharuman budi pekerti yang mampu meredam amarah musuh.',
      },
    ],
    morals: [
      {
        title: 'Keseimbangan Jiwa dan Raga',
        description: 'Kekuatan fisik harus selalu dibarengi dengan kehalusan budi pekerti dan ketenangan batin.',
      },
      {
        title: 'Ketaatan Menjalankan Kewajiban',
        description: 'Melaksanakan darma ksatria demi keadilan tanpa mengedepankan pamrih pribadi.',
      },
    ],
  },
  'sang-gatotkaca': {
    slug: 'sang-gatotkaca',
    name: 'Sang Gatotkaca',
    role: 'Satria Pandawa • Ksatria Pringgandani',
    subtitle: 'Raden Tetuka — Otot Kawat Balung Wesi',
    aksara: 'ꦱꦁ ꦒꦠꦺꦴꦠ꧀ꦏꦕ',
    image: '/images/tokoh/wayang-5.webp',
    badge: 'PANDAWA',
    origin:
      'Putra perkasa Sang Werkudara (Bima) dengan Dewi Arimbi (bangsawan bangsa raseksa). Sejak bayi dicelup ke dalam kawah Candradimuka dan ditempa dengan berbagai pusaka para dewa, menjadikannya ksatria sakti bertubuh sekuat baja yang mampu terbang di angkasa tanpa sayap.',
    philosophy:
      'Gatotkaca adalah personifikasi ksatria udara yang teguh menjaga kedaulatan tanah air. Ia rela mengorbankan nyawanya demi melindungi keselamatan pamannya (Arjuna) dalam perang Bharatayuddha.',
    quote:
      '"Bila tubuhku harus runtuh dari cakrawala demi tegaknya kedaulatan bangsaku, maka tiada sejengkal tanah pun yang kusesali."',
    traits: ['Perkasa', 'Setia Kawan', 'Patriotik', 'Berbakti'],
    weapons: [
      {
        name: 'Rompi Antakusuma',
        description: 'Busana sakti anugerah dewa yang memungkinkannya terbang melayang di udara tanpa sayap.',
      },
      {
        name: 'Caping Basunanda',
        description: 'Pusaka penangkal panas dan hujan yang melindungi tubuh dari segala cuaca dan sihir musuh.',
      },
      {
        name: 'Aji Brajamusti & Narantaka',
        description: 'Kekuatan pukulan tangan sakti yang mampu meremukkan gunung batu dalam sekali hantam.',
      },
    ],
    morals: [
      {
        title: 'Bakti Tanpa Batas pada Ibu dan Bangsa',
        description: 'Gatotkaca membuktikan bahwa garis keturunan bukan pembatas kemuliaan budi seorang ksatria.',
      },
      {
        title: 'Keberanian di Medan Tugas',
        description: 'Tetap tegak mengawal angkasa malam meskipun mengetahui panah maut Kunta Wijayandanu mengintainya.',
      },
    ],
  },
  'nala-gareng': {
    slug: 'nala-gareng',
    name: 'Nala Gareng',
    role: 'Punakawan • Bijak & Bersahaja',
    subtitle: 'Gareng Cakruk — Lambang Kehati-hatian Melangkah',
    aksara: 'ꦤꦭ ꦒꦫꦺꦁ',
    image: '/images/tokoh/wayang-6.webp',
    badge: 'PUNAKAWAN',
    origin:
      'Anak sulung Semar (putra angkat) yang memiliki tubuh serba simbolik: mata juling, tangan bengkok/ceko, dan kaki berjingkit pincang. Dahulu bernama Bambang Sukodadi, seorang ksatria tampan yang bertarung melawan Petruk karena kesombongan, hingga wajah dan raga mereka berubah saling menyadarkan.',
    philosophy:
      'Mata juling bermakna tidak mau memandang hal-hal tercela; tangan bengkok bermakna pantang mengambil hak milik orang lain; dan kaki pincang bermakna selalu berhati-hati, penuh perhitungan, dan waspada dalam melangkah meniti kehidupan.',
    quote:
      '"Mlaku pincang dudu alesan mandeg — Melangkah pincang bukan alasan untuk berhenti, melainkan pengingat agar kita senantiasa mawas diri."',
    traits: ['Waspada', 'Hati-hati', 'Sabar', 'Mawas Diri'],
    weapons: [
      {
        name: 'Kewaspadaan Batin',
        description: 'Kepekaan intuisi spiritual yang mampu mendeteksi marabahaya sebelum terjadi.',
      },
      {
        name: 'Kesabaran Membimbing',
        description: 'Tutur kata lembut yang mendamaikan perselisihan antarsaudara dengan kepala dingin.',
      },
    ],
    morals: [
      {
        title: 'Mawas Diri Sebelum Bertindak',
        description: 'Keterbatasan fisik bukanlah aib, melainkan pengingat suci agar tidak terjebak kesombongan.',
      },
      {
        title: 'Menjaga Persaudaraan',
        description: 'Sebagai anak tertua, Gareng senantiasa menjadi penengah yang sabar di antara adik-adiknya.',
      },
    ],
  },
  'sang-bima': {
    slug: 'sang-bima',
    name: 'Sang Bima',
    role: 'Satria Pandawa • Werkudara Perkasa',
    subtitle: 'Bratasena — Ksatria Jujur Pencari Tirta Suci',
    aksara: 'ꦱꦁ ꦧꦶꦩ',
    image: '/images/tokoh/wayang-7.webp',
    badge: 'PANDAWA',
    origin:
      'Putra kedua Pandu dan Kunti, titisan Batara Bayu sang dewa angin. Bertubuh raksasa tegap dengan kuku jempol sakti Pancanaka. Bima tidak pernah menggunakan bahasa krama inggil yang feodal kepada siapa pun kecuali kepada Sang Hyang Dewa Ruci dan ibundanya, lambang kejujuran nurani yang tak kenal kepalsuan.',
    philosophy:
      'Bima adalah ksatria pencari kebenaran sejati. Dalam lakon Bima Suci, ia diperintahkan mencari Tirta Prawitasari hingga menyelami samudra terdalam, di mana ia bertemu Dewa Ruci (hakikat jati dirinya) dan meraih kesempurnaan rohani (Manunggaling Kawula Gusti).',
    quote:
      '"Kebenaran tidak butuh kata-kata manis yang berbunga. Kebenaran hanya butuh keteguhan langkah yang tak pernah surut."',
    traits: ['Jujur Mutlak', 'Berani', 'Kokoh', 'Pencari Hakikat'],
    weapons: [
      {
        name: 'Kuku Pancanaka',
        description: 'Kuku jempol tangan kanan dan kiri yang tajam laksana belati baja pusaka para dewa.',
      },
      {
        name: 'Gada Rujakpala',
        description: 'Gada pusaka penghancur keangkaramurkaan dan pelindung kaum tertindas.',
      },
      {
        name: 'Aji Bandung Bandawasa',
        description: 'Kekuatan fisik luar biasa laksana seribu gajah perkasa penopang bumi.',
      },
    ],
    morals: [
      {
        title: 'Kejujuran Tanpa Kompromi',
        description: 'Bima pantang berbohong, pantang menjilat, dan pantang ingkar janji seberat apa pun resikonya.',
      },
      {
        title: 'Tekad Mencari Jati Diri',
        description: 'Tidak pernah gentar menghadapi badai samudra kehidupan demi mencapai pemahaman batin tertinggi.',
      },
    ],
  },
  'prabu-rahwana': {
    slug: 'prabu-rahwana',
    name: 'Prabu Rahwana',
    role: 'Prabu Alengka • Dasamuka',
    subtitle: 'Rahwana — Raja Angkara Berkepala Sepuluh',
    aksara: 'ꦥꦿꦧꦸ ꦫꦃꦮꦤ',
    image: '/images/tokoh/wayang-8.webp',
    badge: 'ALENGKA',
    origin:
      'Raja raksasa sakti penguasa kerajaan Alengka Diraja. Memiliki sepuluh kepala (Dasamuka) yang menggambarkan sepuluh hawa nafsu duniawi yang rakus dan tak terkendali. Rahwana memiliki kesaktian luar biasa berkat Aji Pancasona dan Rawarontek yang membuatnya tak bisa mati jika jasadnya masih menyentuh bumi.',
    philosophy:
      'Rahwana adalah cermin peringatan bagi setiap manusia tentang bahaya egoisme, arogansi kekuasaan, dan cinta yang posesif memaksakan kehendak. Obsesinya pada Dewi Sinta membawa kehancuran total bagi kerajaan megahnya.',
    quote:
      '"Kekuasaan tanpa kendali moral laksana api unggun yang membesar hingga memangsa rumah dan diri pemiliknya sendiri."',
    traits: ['Sakti Mandraguna', 'Ambisius', 'Angkara', 'Cinta Posesif'],
    weapons: [
      {
        name: 'Aji Pancasona',
        description: 'Kesaktian mistis kuno yang merekatkan kembali jasadnya seketika saat menyentuh bumi.',
      },
      {
        name: 'Pedang Candrasa',
        description: 'Pedang lengkung pusaka berkilau perak penumpas bala tentara musuh.',
      },
      {
        name: 'Aji Rawarontek',
        description: 'Ilmu kebal tingkat tinggi penangkal segala macam senjata tajam dan sihir gaib.',
      },
    ],
    morals: [
      {
        title: 'Peringatan Bahaya Angkara Murka',
        description: 'Kekuatan sebesar apa pun akan binasa jika digunakan untuk menindas kebenaran dan kesucian.',
      },
      {
        title: 'Cinta yang Berbuah Petaka',
        description: 'Memaksakan cinta dan kehendak bukanlah tanda ketulusan, melainkan bentuk keegoisan yang menghancurkan.',
      },
    ],
  },
  'resi-drona': {
    slug: 'resi-drona',
    name: 'Resi Drona',
    role: 'Pujangga Hastina • Guru Besar',
    subtitle: 'Begawan Drona — Guru Sakti Padepokan Sokalima',
    aksara: 'ꦉꦱꦶ ꦢꦿꦺꦴꦤ',
    image: '/images/tokoh/wayang-9.webp',
    badge: 'HASTINA',
    origin:
      'Brahmana sakti pendiri padepokan Sokalima yang menjadi guru agung ilmu memanah, senjata, dan strategi perang bagi seratus Kurawa dan lima Pandawa. Memiliki ikatan batin yang sangat dalam kepada putranya, Aswatama, dan murid kesayangannya, Arjuna.',
    philosophy:
      'Drona adalah sosok tragis yang melambangkan seorang cendekiawan cerdas yang terbelenggu oleh hutang budi dan politik kekuasaan. Meski hatinya condong pada Pandawa, sumpahnya membela tahta Hastinapura memaksanya memimpin Kurawa di padang Kurusetra.',
    quote:
      '"Ilmu yang paling sulit diajarkan bukanlah cara membidik sasaran dengan tepat, melainkan keberanian membedakan mana kesetiaan sejati dan mana belenggu kekuasaan."',
    traits: ['Ahli Senjata', 'Pujangga', 'Penyayang Anak', 'Terikat Sumpah'],
    weapons: [
      {
        name: 'Pusaka Cundamanik',
        description: 'Panah pusaka berujung intan berkilau anugerah dewa penakluk senjata musuh.',
      },
      {
        name: 'Aji Danurweda',
        description: 'Kitab ilmu perang dan memanah suci tingkat dewa yang diajarkan kepada murid-murid terkasihnya.',
      },
    ],
    morals: [
      {
        title: 'Tanggung Jawab Seorang Pendidik',
        description: 'Drona mendidik murid-muridnya dengan keahlian puncak, melahirkan ksatria-ksatria terhebat sepanjang masa.',
      },
      {
        title: 'Bahaya Keterikatan Duniawi',
        description: 'Kecintaannya yang berlebihan pada sang anak dan utang budi pada istana membutakan mata batinnya dari kebenaran hakiki.',
      },
    ],
  },
};

const SLUG_ALIASES: Record<string, string> = {
  'raden-werkudara': 'sang-bima',
  'werkudara': 'sang-bima',
  'bima': 'sang-bima',
  'gatotkaca': 'sang-gatotkaca',
  'semar': 'kyai-semar',
  'petruk': 'kyai-petruk',
  'bagong': 'kyai-bagong',
  'arjuna': 'sang-arjuna',
  'gareng': 'nala-gareng',
  'rahwana': 'prabu-rahwana',
  'drona': 'resi-drona',
};

export function getAllTokohSlugs(): string[] {
  const canonical = Object.keys(TOKOH_CHARACTERS);
  const aliases = Object.keys(SLUG_ALIASES);
  return Array.from(new Set([...canonical, ...aliases]));
}

export function getTokohBySlug(slug: string): TokohCharacter | undefined {
  if (!slug) return undefined;
  const key = slug.toLowerCase();
  const targetSlug = SLUG_ALIASES[key] || key;
  return TOKOH_CHARACTERS[targetSlug] || TOKOH_CHARACTERS[slug];
}
