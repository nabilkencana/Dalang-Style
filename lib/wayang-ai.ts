export interface WayangPromptParams {
  archetype: string;
  weapon: string;
  costume: string;
  visualStyle: string;
  userNotes: string;
  aspectRatio: '1:1' | '3:4' | '16:9';
}

export interface WayangPreset {
  id: string;
  title: string;
  shortName?: string;
  role: string;
  archetype: string;
  weapon: string;
  costume: string;
  visualStyle: string;
  prompt: string;
  image: string;
  traits: string[];
  philosophy?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'empu';
  text: string;
  timestamp: string;
  characterName?: string;
  roleTitle?: string;
  imageUrl?: string;
  promptRecipe?: string;
  traits?: string[];
  weaponName?: string;
  philosophy?: string;
  reasoning?: string;
}

export const ARCHETYPES = [
  {
    id: 'ksatria',
    label: 'Ksatria Luhur',
    desc: 'Ksatria halus budi, teguh pendirian, dan mahir pusaka',
    promptToken: 'noble refined Javanese ksatria knight with elegant slender posture and calm expression',
  },
  {
    id: 'perkasa',
    label: 'Satria Perkasa',
    desc: 'Pahlawan berbadan tegap, berani membela kebenaran tanpa kompromi',
    promptToken: 'mighty towering warrior hero Werkudara archetype with powerful stance and fierce royal mustache',
  },
  {
    id: 'putri',
    label: 'Putri Keraton',
    desc: 'Bangsawan anggun berjiwa tenang pembawa kedamaian',
    promptToken: 'graceful Javanese royal princess with delicate gold tiara and ornate flowing silk',
  },
  {
    id: 'punakawan',
    label: 'Punakawan Bijak',
    desc: 'Pamong rakyat jelata berwawasan luas dan penuh humor filosofis',
    promptToken: 'wise witty Punakawan servant elder Semar archetype with friendly smiling demeanor',
  },
  {
    id: 'raseksa',
    label: 'Raseksa Sakti',
    desc: 'Sosok raksasa bertaring gagah dengan kesaktian mandraguna',
    promptToken: 'colossal fierce mythological giant king with fangs and majestic armor',
  },
  {
    id: 'batara',
    label: 'Batara Kahyangan',
    desc: 'Entitas suci para dewa yang bersemayam di puncak mahameru',
    promptToken: 'celestial divine Batara deity floating gracefully with radiant mystical aura',
  },
] as const;

export const WEAPONS = [
  {
    id: 'gandiwa',
    label: 'Busur Gandiwa',
    promptToken: 'holding a magnificent sacred golden archery bow Gandiva with glowing arrows',
  },
  {
    id: 'keris',
    label: 'Keris Luk Sembilan',
    promptToken: 'unsheathing an ornate nine-curved mystical damascene Keris dagger with golden hilt',
  },
  {
    id: 'gada',
    label: 'Gada Rujakpala',
    promptToken: 'wielding a giant decorated iron battle mace Rujakpala rested on shoulder',
  },
  {
    id: 'pancanaka',
    label: 'Kuku Pancanaka',
    promptToken: 'sharp gleaming golden thumbnail claw weapon Pancanaka ready for strike',
  },
  {
    id: 'cundrik',
    label: 'Cundrik Ratu',
    promptToken: 'carrying a slender jewel-encrusted ceremonial Kris dagger',
  },
  {
    id: 'cunduk',
    label: 'Pucuk Cunduk Pusaka',
    promptToken: 'radiating a pinnacle jewel spire emitting warm golden celestial beams',
  },
] as const;

export const COSTUMES = [
  {
    id: 'makuta',
    label: 'Mahkota Makuta Emas',
    promptToken: 'crowned with an intricate tiered golden Makuta headdress with delicate carvings',
  },
  {
    id: 'naga',
    label: 'Kelat Bahu Naga',
    promptToken: 'adorned with golden dragon shoulder armlets and ornate filigree chest harness',
  },
  {
    id: 'poleng',
    label: 'Kampuh Poleng',
    promptToken: 'wearing traditional black-and-white checkered sacred Poleng ceremonial sarong drapery',
  },
  {
    id: 'praba',
    label: 'Praba Surya Emas',
    promptToken: 'flanked by a majestic winged golden sunburst back-piece halo Praba behind shoulders',
  },
  {
    id: 'selendang',
    label: 'Selendang Kencana',
    promptToken: 'draped in shimmering gold-threaded royal Javanese batik waist sash',
  },
] as const;

export const VISUAL_STYLES = [
  {
    id: 'prada',
    label: 'Tatah Emas Prada Keraton',
    promptToken: 'authentic traditional Javanese Wayang Kulit leather puppet styling, meticulous perforated leather chiseled craftsmanship (tatah sungging), gold foil prada accents, sharp silhouette',
  },
  {
    id: 'kelir',
    label: 'Siluet Kelir Blencong',
    promptToken: 'shadow puppet cast upon translucent white cotton kelir canvas backlit by a warm flickering blencong oil flame lamp, rich atmospheric amber light spill and soft rim glow',
  },
  {
    id: 'kontemporer',
    label: 'Wayang Kulit Kontemporer',
    promptToken: 'neo-traditional contemporary Indonesian leather puppet artwork, crisp clean vector-like leather boundaries, bold natural dyes, high contrast museum exhibition aesthetic',
  },
  {
    id: 'beber',
    label: 'Wayang Beber Klasik',
    promptToken: 'ancient Javanese Wayang Beber scroll painting aesthetic with vintage parchment texture, warm natural mineral pigments, and historic manuscript patina',
  },
] as const;

export const ASPECT_RATIOS = {
  '1:1': { label: 'Persegi (1:1)', width: 1024, height: 1024 },
  '3:4': { label: 'Potret (3:4)', width: 768, height: 1024 },
  '16:9': { label: 'Lanskap (16:9)', width: 1024, height: 576 },
} as const;

/**
 * Menyusun formula prompt terstruktur berstandar kurasi seni Wayang Kulit autentik Nusantara.
 */
export function compileWayangPrompt(params: WayangPromptParams): string {
  const arc = ARCHETYPES.find((a) => a.id === params.archetype)?.promptToken || params.archetype;
  const wpn = WEAPONS.find((w) => w.id === params.weapon)?.promptToken || params.weapon;
  const cst = COSTUMES.find((c) => c.id === params.costume)?.promptToken || params.costume;
  const sty = VISUAL_STYLES.find((s) => s.id === params.visualStyle)?.promptToken || params.visualStyle;
  const userExtra = params.userNotes ? `, ${params.userNotes}` : '';

  return (
    `Traditional Indonesian Javanese Wayang Kulit flat leather shadow puppet of a ${arc}, ` +
    `${cst}, ${wpn}${userExtra}. Style: ${sty}. ` +
    `Authentic flat chiseled perforated buffalo leather craftsmanship (tatah sungging), intricate gold leaf prada accents, ` +
    `traditional horn puppet rods (cempurit), centered composition against warm aged parchment kelir screen with soft blencong oil lamp glow, ` +
    `exquisite Indonesian royal palace heirloom artifact, 8k resolution, museum heritage conservation quality, masterpiece, sharp silhouette, no modern text, no 3D anime, no real human photography`
  );
}

/**
 * Menghasilkan URL gambar wayang kulit autentik Nusantara yang selaras 100% dengan panggung pentas virtual (assets stage).
 */
export function resolveWayangImage(prompt: string, characterName?: string): string {
  const p = `${prompt} ${characterName || ''}`.toLowerCase();

  // 1. Gatotkaca (Satria Pringgadani / Garuda / Sayap / Otot Kawat)
  if (
    p.includes('gatotkaca') ||
    p.includes('garuda') ||
    p.includes('sayap') ||
    p.includes('terbang') ||
    p.includes('otot kawat') ||
    p.includes('pringgandani') ||
    p.includes('pringgadani') ||
    p.includes('antakusuma') ||
    p.includes('elang') ||
    p.includes('angkasa') ||
    p.includes('perkasa')
  ) {
    return '/assets/thumb-gatotkaca.png';
  }

  // 2. Semar (Pamong Luhur / Ismaya / Badranaya / Urip Iku Urup)
  if (
    p.includes('semar') ||
    p.includes('ismaya') ||
    p.includes('badranaya') ||
    p.includes('karangdempel') ||
    p.includes('pamong') ||
    p.includes('sesepuh') ||
    p.includes('bijak') ||
    p.includes('lurah') ||
    p.includes('urip iku urup')
  ) {
    return '/assets/thumb-semar.png';
  }

  // 3. Petruk (Kantong Bolong / Hidung Mancung / Jenaka / Cerdas)
  if (
    p.includes('petruk') ||
    p.includes('kantong') ||
    p.includes('bolong') ||
    p.includes('mancung') ||
    p.includes('jenaka') ||
    p.includes('humor') ||
    p.includes('canda') ||
    p.includes('kelakar') ||
    p.includes('lucu')
  ) {
    return '/assets/thumb-petruk.png';
  }

  // 4. Bagong (Bawor / Kritis / Ceplas-ceplos / Lugu / Bulat)
  if (
    p.includes('bagong') ||
    p.includes('bawor') ||
    p.includes('kritis') ||
    p.includes('ceplas') ||
    p.includes('bulat') ||
    p.includes('lugu') ||
    p.includes('banyumas') ||
    p.includes('jujur')
  ) {
    return '/assets/thumb-bagong.png';
  }

  // 5. Arjuna (Satria Madukara / Dananjaya / Janaka / Pemanah / Panah Gandiwa)
  if (
    p.includes('arjuna') ||
    p.includes('dananjaya') ||
    p.includes('janaka') ||
    p.includes('madukara') ||
    p.includes('panah') ||
    p.includes('gandiwa') ||
    p.includes('ksatria') ||
    p.includes('satria') ||
    p.includes('pandawa') ||
    p.includes('petir') ||
    p.includes('kilat') ||
    p.includes('halilintar') ||
    p.includes('keris') ||
    p.includes('putri') ||
    p.includes('anggun') ||
    p.includes('cundrik')
  ) {
    return '/assets/thumb-arjuna.png';
  }

  // Fallback deterministik berbasis hash string dari aset panggung pentas stage
  const stageMasterAssets = [
    '/assets/thumb-arjuna.png',
    '/assets/thumb-gatotkaca.png',
    '/assets/thumb-semar.png',
    '/assets/thumb-petruk.png',
    '/assets/thumb-bagong.png',
  ];
  let hash = 0;
  for (let i = 0; i < p.length; i++) {
    hash = (hash * 31 + p.charCodeAt(i)) >>> 0;
  }
  return stageMasterAssets[hash % stageMasterAssets.length];
}

/**
 * Menafsirkan prompt teks bebas pengguna (natural language) ke dalam nama tokoh, filosofi, dan resep visual autentik.
 */
export function interpretUserPrompt(userPrompt: string): {
  characterName: string;
  roleTitle: string;
  philosophy: string;
  weaponName: string;
  traits: string[];
  greeting: string;
  compiledPrompt: string;
  imageUrl: string;
} {
  const p = userPrompt.toLowerCase();

  // Pattern detection
  let characterName = 'Raden Arjuna Dananjaya';
  let roleTitle = 'Satria Madukara • Pandawa';
  let weaponName = 'Busur Panah Gandiwa';
  let philosophy = 'Heninging cipta, rasa, lan karsa minangka kunci nggayuh kasampurnan.';
  let traits = ['Budi Luhur', 'Panah Sakti', 'Ksatria Pinilih'];
  let descToken = 'noble refined Javanese ksatria knight with golden makuta headdress and sacred archery bow';

  if (p.includes('gatotkaca') || p.includes('garuda') || p.includes('sayap') || p.includes('terbang') || p.includes('otot kawat') || p.includes('pringgandani')) {
    characterName = 'Raden Gatotkaca';
    roleTitle = 'Satria Pringgadani • Otot Kawat Balung Wesi';
    weaponName = 'Kutang Antakusuma & Aji Brajamusti';
    philosophy = 'Keberanian membela tanah tumpah darah walau jiwa raga menjadi taruhannya.';
    traits = ['Otot Kawat', 'Balung Wesi', 'Pelindung Angkasa'];
    descToken = 'mighty flying warrior hero with golden sunburst praba backpiece and celestial armor';
  } else if (p.includes('semar') || p.includes('ismaya') || p.includes('pamong') || p.includes('bijak')) {
    characterName = 'Kyai Semar Badranaya';
    roleTitle = 'Lurah Karangdempel • Pamong Para Ksatria';
    weaponName = 'Aji Pangabaran Manik Astagina';
    philosophy = 'Urip Iku Urup — hidup yang bermakna adalah yang menjadi pelita bagi sesama manusia.';
    traits = ['Pamong Luhur', 'Urip Iku Urup', 'Rendah Hati'];
    descToken = 'wise smiling Punakawan elder puppet with traditional drapery and celestial light';
  } else if (p.includes('petruk') || p.includes('kantong') || p.includes('bolong') || p.includes('jenaka') || p.includes('humor')) {
    characterName = 'Kyai Petruk Kantong Bolong';
    roleTitle = 'Punakawan Cerdas & Tangkas';
    weaponName = 'Pusaka Gandala & Kapak Petruk';
    philosophy = 'Aja gumunan, aja getunan, aja kagetan — hadapi lika-liku dunia dengan hati lapang dan akal jernih.';
    traits = ['Cerdas', 'Humor Filosofis', 'Dermawan'];
    descToken = 'tall witty long-nosed shadow puppet with joyful gesture and royal sash';
  } else if (p.includes('bagong') || p.includes('bawor') || p.includes('kritis') || p.includes('lugu') || p.includes('jujur')) {
    characterName = 'Kyai Bagong Bawor';
    roleTitle = 'Punakawan Kritis & Berani';
    weaponName = 'Kuku Pancasona & Kata Benar';
    philosophy = 'Kebenaran tidak boleh ditutup-tutupi hanya karena takut pada kekuasaan duniawi.';
    traits = ['Kritis', 'Penyuara Jujur', 'Berani'];
    descToken = 'round stout outspoken puppet with expressive wide eyes and honest posture';
  } else if (p.includes('naga') || p.includes('perkasa') || p.includes('cakar') || p.includes('harimau')) {
    characterName = 'Raden Werkudara';
    roleTitle = 'Satria Jodhipati • Penegak Keadilan';
    weaponName = 'Kuku Pancanaka & Gada Rujakpala';
    philosophy = 'Lurus tanpa kompromi membela dharma dan menumpas segala bentuk angkara murka.';
    traits = ['Kuku Pancanaka', 'Jujur Mutlak', 'Gagah Perkasa'];
    descToken = 'towering muscular hero with checkered poleng sarong and glowing thumb claws';
  }

  const greeting =
    `Rahayu, sahabat dalang. Dari gagasan ciptamu, Sang Empu telah menatah sosok **${characterName}**, sang ${roleTitle}. ` +
    `Tokoh ini memegang pusaka **${weaponName}**, dengan falsafah adiluhung: *"${philosophy}"*. ` +
    `Klik tombol **Lihat di Canvas** di bawah untuk mementaskan tokoh ini langsung pada panggung kanvas virtual:`;

  const compiledPrompt =
    `Traditional Indonesian Javanese Wayang Kulit flat leather shadow puppet of ${characterName}, ` +
    `${descToken}, holding ${weaponName}, inspired by concept: "${userPrompt}". ` +
    `Style: authentic traditional Javanese Wayang Kulit flat leather puppet artwork, meticulous perforated leather chiseling (tatah sungging), ` +
    `intricate gold leaf prada accents, centered composition on warm aged golden kelir screen backdrop with soft blencong lamp lighting, ` +
    `royal museum artifact quality, 8k resolution, full body puppet matching stage assets`;

  const imageUrl = resolveWayangImage(userPrompt, characterName);

  return {
    characterName,
    roleTitle,
    philosophy,
    weaponName,
    traits,
    greeting,
    compiledPrompt,
    imageUrl,
  };
}

/**
 * Menghasilkan URL gambar wayang kulit autentik Nusantara.
 */
export function getWayangImageUrl(prompt: string, _width = 1024, _height = 1024, _seed?: number): string {
  return resolveWayangImage(prompt);
}

/**
 * Katalog preset master siap pakai (Inspirasi & Fallback Offline)
 */
export const PRESET_WAYANG_CREATIONS: WayangPreset[] = [
  {
    id: 'preset-1',
    title: 'Raden Dananjaya (Arjuna)',
    shortName: 'Arjuna',
    role: 'Satria Madukara • Pemanah Pinilih',
    archetype: 'ksatria',
    weapon: 'gandiwa',
    costume: 'makuta',
    visualStyle: 'prada',
    prompt:
      'Full-body authentic traditional Indonesian Wayang Kulit flat leather shadow puppet of Raden Arjuna with golden Makuta headdress and archery bow.',
    image: '/images/tokoh/wayang-4.webp',
    traits: ['Budi Luhur', 'Panah Sakti', 'Ksatria Pandawa'],
    philosophy: 'Heninging cipta, rasa, lan karsa minangka kunci nggayuh kasampurnan jati.',
  },
  {
    id: 'preset-2',
    title: 'Raden Gatotkaca',
    shortName: 'Gatotkaca',
    role: 'Satria Pringgadani • Otot Kawat',
    archetype: 'perkasa',
    weapon: 'cunduk',
    costume: 'praba',
    visualStyle: 'prada',
    prompt:
      'Full-body authentic traditional Indonesian Wayang Kulit flat leather shadow puppet of Gatotkaca with winged golden sunburst back-piece halo Praba.',
    image: '/images/tokoh/wayang-5.webp',
    traits: ['Otot Kawat', 'Balung Wesi', 'Pelindung Angkasa'],
    philosophy: 'Kasetyan marang nagari ngungkuli getih lan pati, sayap emas penjaga kedaulatan praja.',
  },
  {
    id: 'preset-3',
    title: 'Kyai Semar Badranaya',
    shortName: 'Semar',
    role: 'Lurah Karangdempel • Pamong Luhur',
    archetype: 'punakawan',
    weapon: 'cunduk',
    costume: 'selendang',
    visualStyle: 'kelir',
    prompt:
      'Full-body authentic traditional Indonesian Wayang Kulit flat leather shadow puppet of Semar.',
    image: '/images/tokoh/wayang-1.webp',
    traits: ['Pengayom', 'Urip Iku Urup', 'Sakti Rendah Hati'],
    philosophy: 'Urip Iku Urup — dadiya pepadhang kanggo sasama kanthi luhuring budi pekerti lan asih.',
  },
  {
    id: 'preset-4',
    title: 'Kyai Petruk Kantong Bolong',
    shortName: 'Petruk',
    role: 'Punakawan Cerdas & Jenaka',
    archetype: 'punakawan',
    weapon: 'cunduk',
    costume: 'selendang',
    visualStyle: 'kelir',
    prompt:
      'Full-body authentic traditional Indonesian Wayang Kulit flat leather shadow puppet of Petruk.',
    image: '/images/tokoh/wayang-2.webp',
    traits: ['Cerdas', 'Humor Filosofis', 'Dermawan'],
    philosophy: 'Aja gumunan, aja getunan, aja kagetan — gemuyu ing madyaning panandhang nuntun kabungahan.',
  },
  {
    id: 'preset-5',
    title: 'Kyai Bagong Bawor',
    shortName: 'Bagong',
    role: 'Punakawan Kritis & Jujur',
    archetype: 'punakawan',
    weapon: 'cunduk',
    costume: 'poleng',
    visualStyle: 'prada',
    prompt:
      'Full-body authentic traditional Indonesian Wayang Kulit flat leather shadow puppet of Bagong.',
    image: '/images/tokoh/wayang-3.webp',
    traits: ['Kritis', 'Penyuara Jujur', 'Berani'],
    philosophy: 'Kebenaran ora kena kawungkus goroh, tetep sumringah lan kendel mbelani wong cilik.',
  },
];
