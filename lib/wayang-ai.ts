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
  role: string;
  archetype: string;
  weapon: string;
  costume: string;
  visualStyle: string;
  prompt: string;
  image: string;
  traits: string[];
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
 * Menyusun formula prompt terstruktur berstandar kurasi seni Wayang Kulit.
 */
export function compileWayangPrompt(params: WayangPromptParams): string {
  const arc = ARCHETYPES.find((a) => a.id === params.archetype)?.promptToken || params.archetype;
  const wpn = WEAPONS.find((w) => w.id === params.weapon)?.promptToken || params.weapon;
  const cst = COSTUMES.find((c) => c.id === params.costume)?.promptToken || params.costume;
  const sty = VISUAL_STYLES.find((s) => s.id === params.visualStyle)?.promptToken || params.visualStyle;
  const userExtra = params.userNotes ? `, ${params.userNotes}` : '';

  return (
    `Full-body authentic traditional Indonesian Wayang Kulit flat leather shadow puppet of a ${arc}, ` +
    `${cst}, ${wpn}${userExtra}. Style: ${sty}. ` +
    `Masterpiece heritage artifact, fine perforated leather chiseling (tatah sungging), gilded gold leaf, ` +
    `isolated clean composition, cinematic lighting, 8k resolution, museum conservation quality, no modern watermarks`
  );
}

/**
 * Menafsirkan prompt teks bebas pengguna (natural language) ke dalam nama tokoh, filosofi, dan resep visual.
 */
export function interpretUserPrompt(userPrompt: string): {
  characterName: string;
  roleTitle: string;
  philosophy: string;
  weaponName: string;
  traits: string[];
  greeting: string;
  compiledPrompt: string;
} {
  const p = userPrompt.toLowerCase();

  // Pattern detection
  let characterName = 'Raden Kencana Wasesa';
  let roleTitle = 'Ksatria Penjaga Nurani Bangsa';
  let weaponName = 'Keris Kyai Jalak Sembilan';
  let philosophy = 'Keteguhan memegang kebenaran walau badai godaan duniawi menerpa.';
  let traits = ['Berbudi Luhur', 'Tatah Emas Prada', 'Penegak Keadilan'];
  let descToken = 'noble refined Javanese ksatria knight with golden headdress and damascene kris';

  if (p.includes('garuda') || p.includes('elang') || p.includes('sayap') || p.includes('terbang')) {
    characterName = 'Raden Garudayana';
    roleTitle = 'Ksatria Sayap Emas Samudra';
    weaponName = 'Busur Panah Brajamusti';
    philosophy = 'Ketinggian pandangan nurani yang mampu melintasi batas langit tanpa keangkuhan.';
    traits = ['Sayap Emas', 'Penguasa Angkasa', 'Budi Luhur'];
    descToken = 'mythical Javanese warrior knight with magnificent golden winged backpiece Praba and divine archery bow';
  } else if (p.includes('naga') || p.includes('ular') || p.includes('sisik')) {
    characterName = 'Arya Nagapuspa';
    roleTitle = 'Penjaga Telaga Suci Kahyangan';
    weaponName = 'Tombak Trisula Nagabanda';
    philosophy = 'Kedalaman batin yang mengendalikan nafsu angkara murka hingga menjadi berkah.';
    traits = ['Kelat Bahu Naga', 'Ketahanan Jiwa', 'Sakti Mandraguna'];
    descToken = 'regal warrior hero adorned in golden dragon kelat bahu armor holding an ornate dragon spear';
  } else if (p.includes('singa') || p.includes('harimau') || p.includes('cakar') || p.includes('macan')) {
    characterName = 'Raden Singo Lodaya';
    roleTitle = 'Ksatria Rimba Purwacarita';
    weaponName = 'Cakar Kencana Wulung';
    philosophy = 'Keberanian tanpa pamrih untuk membela yang lemah dan menjaga kelestarian alam.';
    traits = ['Kuku Sakti', 'Keberanian Mutlak', 'Pemberantas Angkara'];
    descToken = 'powerful fierce hero with golden tiger claw weapons and striped royal batik kampuh drapery';
  } else if (p.includes('petir') || p.includes('kilat') || p.includes('halilintar') || p.includes('listrik')) {
    characterName = 'Bambang Bajrakilat';
    roleTitle = 'Penakluk Guntur Mahameru';
    weaponName = 'Gada Geledek Petir';
    philosophy = 'Ketegasan mengambil keputusan di saat genting demi kemaslahatan bersama.';
    traits = ['Cahaya Petir', 'Keputusan Cepat', 'Tatap Tegas'];
    descToken = 'electric aura warrior prince holding a crackling golden lightning bolt mace';
  } else if (p.includes('putri') || p.includes('dewi') || p.includes('anggun') || p.includes('cantik') || p.includes('wanita')) {
    characterName = 'Dewi Retno Kumalasari';
    roleTitle = 'Putri Penyejuk Jagad';
    weaponName = 'Cundrik Pusaka Ratu';
    philosophy = 'Kelembutan tutur kata dan ketulusan hati yang mampu meluluhkan kekerasan amarah.';
    traits = ['Anggun Bijak', 'Selendang Kencana', 'Pengayom Damai'];
    descToken = 'graceful royal Javanese princess with tiered golden crown and glowing silk batik sash';
  } else if (p.includes('punakawan') || p.includes('lucu') || p.includes('jenaka') || p.includes('humor')) {
    characterName = 'Kyai Sabdo Rahayu';
    roleTitle = 'Pamong Nurani Rakyat Jelata';
    weaponName = 'Cunduk Manik Astagina';
    philosophy = 'Urip Iku Urup — hidup yang bermakna adalah yang menjadi pelita bagi sesama.';
    traits = ['Pamong Luhur', 'Humor Filosofis', 'Rendah Hati'];
    descToken = 'wise witty smiling Punakawan elder puppet with traditional kain and divine forehead jewel';
  } else if (p.includes('raksasa') || p.includes('raseksa') || p.includes('taring') || p.includes('gagah') || p.includes('besar')) {
    characterName = 'Prabu Kaladurgala';
    roleTitle = 'Maharaja Raksasa Berjiwa Luhur';
    weaponName = 'Gada Wesi Kuning';
    philosophy = 'Kekuatan fisik sebesar apa pun harus tunduk pada bimbingan budi pekerti yang mulia.';
    traits = ['Taring Emas', 'Kekuatan Raksasa', 'Tunduk Kebaikan'];
    descToken = 'colossal majestic giant king with golden fangs and richly carved leather armor';
  }

  const greeting =
    `Rahayu, sahabat dalang. Dari kehendak ciptamu, Sang Empu telah menatah sosok **${characterName}**, sang ${roleTitle}. ` +
    `Tokoh ini memegang pusaka **${weaponName}**, yang membawa wejangan filosofis: *"${philosophy}"*. ` +
    `Perhatikan tatah sungging dan kilau prada emasnya di atas kain kelir berikut:`;

  const compiledPrompt =
    `Full-body authentic traditional Indonesian Wayang Kulit flat leather shadow puppet of ${characterName}, ` +
    `${descToken}, holding ${weaponName}, inspired by user concept: "${userPrompt}". ` +
    `Style: authentic traditional Javanese Wayang Kulit leather puppet styling, meticulous perforated leather chiseled craftsmanship (tatah sungging), ` +
    `gold foil prada accents, sharp crisp silhouette, illuminated by warm blencong oil flame lamp glow, ` +
    `masterpiece heritage artifact, isolated clean composition, 8k resolution, museum conservation quality, no modern text`;

  return {
    characterName,
    roleTitle,
    philosophy,
    weaponName,
    traits,
    greeting,
    compiledPrompt,
  };
}

/**
 * Menghasilkan URL gambar keyless dari Pollinations AI Flux engine.
 */
export function getWayangImageUrl(prompt: string, width = 1024, height = 1024, seed?: number): string {
  const finalSeed = seed ?? Math.floor(Date.now() % 1000000);
  const encoded = encodeURIComponent(prompt);
  return `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&seed=${finalSeed}&nologo=true`;
}

/**
 * Katalog preset master siap pakai (Inspirasi & Fallback Offline)
 */
export const PRESET_WAYANG_CREATIONS: WayangPreset[] = [
  {
    id: 'preset-1',
    title: 'Raden Dananjaya Emas',
    role: 'Ksatria Pemanah Pinilih',
    archetype: 'ksatria',
    weapon: 'gandiwa',
    costume: 'makuta',
    visualStyle: 'prada',
    prompt:
      'Full-body authentic traditional Indonesian Wayang Kulit flat leather shadow puppet of a noble refined Javanese ksatria knight with elegant slender posture and calm expression, crowned with an intricate tiered golden Makuta headdress with delicate carvings, holding a magnificent sacred golden archery bow Gandiva with glowing arrows. Style: authentic traditional Javanese Wayang Kulit leather puppet styling, meticulous perforated leather chiseled craftsmanship (tatah sungging), gold foil prada accents, sharp silhouette. Masterpiece heritage artifact, 8k resolution.',
    image: '/images/tokoh/wayang-4.png',
    traits: ['Budi Luhur', 'Panah Sakti', 'Ksatria Pandawa'],
  },
  {
    id: 'preset-2',
    title: 'Werkudara Samudra',
    role: 'Satria Gagah Perkasa',
    archetype: 'perkasa',
    weapon: 'pancanaka',
    costume: 'poleng',
    visualStyle: 'prada',
    prompt:
      'Full-body authentic traditional Indonesian Wayang Kulit flat leather shadow puppet of a mighty towering warrior hero Werkudara archetype with powerful stance and fierce royal mustache, wearing traditional black-and-white checkered sacred Poleng ceremonial sarong drapery, sharp gleaming golden thumbnail claw weapon Pancanaka ready for strike. Style: authentic traditional Javanese Wayang Kulit leather puppet styling, gold foil prada accents. Masterpiece heritage artifact.',
    image: '/images/tokoh/wayang-7.png',
    traits: ['Kuku Pancanaka', 'Pencari Hakikat', 'Jujur Mutlak'],
  },
  {
    id: 'preset-3',
    title: 'Sang Pamong Ismaya',
    role: 'Pamong Luhur Rakyat',
    archetype: 'punakawan',
    weapon: 'cunduk',
    costume: 'selendang',
    visualStyle: 'kelir',
    prompt:
      'Full-body authentic traditional Indonesian Wayang Kulit flat leather shadow puppet of a wise witty Punakawan servant elder Semar archetype with friendly smiling demeanor, draped in shimmering gold-threaded royal Javanese batik waist sash, radiating a pinnacle jewel spire emitting warm golden celestial beams. Style: shadow puppet cast upon translucent white cotton kelir canvas backlit by a warm flickering blencong oil flame lamp.',
    image: '/images/tokoh/wayang-1.png',
    traits: ['Pengayom', 'Urip Iku Urup', 'Sakti Rendah Hati'],
  },
  {
    id: 'preset-4',
    title: 'Ksatria Pringgandani',
    role: 'Satria Penjaga Angkasa',
    archetype: 'perkasa',
    weapon: 'cunduk',
    costume: 'praba',
    visualStyle: 'prada',
    prompt:
      'Full-body authentic traditional Indonesian Wayang Kulit flat leather shadow puppet of a mighty warrior hero with winged golden sunburst back-piece halo Praba behind shoulders, flying posture, muscular leather silhouette, tatah sungging gilding. Masterpiece heritage artifact, 8k resolution.',
    image: '/images/tokoh/wayang-5.png',
    traits: ['Otot Kawat', 'Balung Wesi', 'Pelindung Angkasa'],
  },
];
