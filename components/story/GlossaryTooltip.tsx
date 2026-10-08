'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  BookOpen,
  Sparkles,
  X,
  User,
  Shield,
  MapPin,
  Swords,
  Scroll,
  ExternalLink,
  Flame,
  Layers,
} from 'lucide-react';

export type GlossaryCategory =
  | 'tokoh'
  | 'istilah'
  | 'perangkat'
  | 'filosofi'
  | 'tempat'
  | 'senjata'
  | 'peristiwa';

export interface GlossaryTerm {
  term: string;
  meaning: string;
  category: GlossaryCategory;
  image?: string;
  role?: string;
  quote?: string;
  link?: string;
}

/**
 * Kamus Komprehensif Glosarium Pedalangan Jawa, Tokoh Wayang, Pusaka, dan Filosofi
 */
export const WAYANG_GLOSSARY: Record<string, GlossaryTerm> = {
  // ══════════════════════════════════════════════════════════════════
  // 1. TOKOH WAYANG UTAMA & TOKOH WIRACARITA (DILENGKAPI FOTO ASSETS)
  // ══════════════════════════════════════════════════════════════════
  'sang bima': {
    term: 'Sang Bima (Werkudara)',
    meaning: 'Putra kedua Pandawa (titisan Batara Bayu) bertubuh perkasa, berhati lurus pantang ingkar janji, bersenjatakan Kuku Pancanaka dan Gada Rujakpala. Penyelam samudra batin pencari hakikat suci Dewa Ruci.',
    category: 'tokoh',
    image: '/images/stories/dewa-ruci.webp',
    role: 'Satria Pandawa • Penegak Keadilan Jodhipati',
    link: '/tokoh/sang-bima',
    quote: '"Kebenaran tidak butuh kata-kata manis. Kebenaran hanya butuh keteguhan langkah yang pantang surut."',
  },
  werkudara: {
    term: 'Raden Werkudara',
    meaning: 'Nama kesatriaan Sang Bima yang berarti "perut serigala" (mampu menampung segala cobaan dan tak pernah gentar). Ksatria jujur berdarah perkasa yang pantang berbahasa feodal kepada siapa pun.',
    category: 'tokoh',
    image: '/images/stories/dewa-ruci.webp',
    role: 'Satria Pandawa • Satria Jodhipati',
    link: '/tokoh/sang-bima',
  },
  'raden werkudara': {
    term: 'Raden Werkudara',
    meaning: 'Nama kesatriaan Sang Bima yang berarti "perut serigala" (mampu menampung segala cobaan dan tak pernah gentar). Ksatria jujur berdarah perkasa yang pantang berbahasa feodal kepada siapa pun.',
    category: 'tokoh',
    image: '/images/stories/dewa-ruci.webp',
    role: 'Satria Pandawa • Satria Jodhipati',
    link: '/tokoh/sang-bima',
  },
  bima: {
    term: 'Sang Bima',
    meaning: 'Ksatria perkasa Pandawa penegak keadilan yang menjelajahi Samudra Minangkalbu demi meraih kesempurnaan rohani Manunggaling Kawula Gusti.',
    category: 'tokoh',
    image: '/images/stories/dewa-ruci.webp',
    role: 'Satria Pandawa • Penegak Keadilan Jodhipati',
    link: '/tokoh/sang-bima',
  },
  bratasena: {
    term: 'Raden Bratasena',
    meaning: 'Nama muda Sang Bima ketika menjalani masa penggemblengan dan berguru kepada Begawan Durna di Padepokan Sokalima.',
    category: 'tokoh',
    image: '/images/stories/dewa-ruci.webp',
    role: 'Ksatria Muda Pandawa',
    link: '/tokoh/sang-bima',
  },

  'kyai semar': {
    term: 'Kyai Semar Badranaya',
    meaning: 'Penjelmaan Batara Ismaya yang turun ke dunia fana sebagai abdi pamong pengayom ksatria berbudi luhur. Simbol kearifan nurani rakyat kecil dan kepemimpinan yang melayani.',
    category: 'tokoh',
    image: '/images/stories/semar-mbangun-kayangan.webp',
    role: 'Punakawan • Pamong Para Ksatria',
    link: '/tokoh/kyai-semar',
    quote: '"Urip iku urup — Hidup itu menyala, jadilah pelita yang menerangi jalan sesama."',
  },
  semar: {
    term: 'Kyai Semar Badranaya',
    meaning: 'Penjelmaan Batara Ismaya yang turun ke dunia fana sebagai abdi pamong pengayom para ksatria. Simbol kearifan nurani rakyat kecil dan kepemimpinan yang melayani.',
    category: 'tokoh',
    image: '/images/stories/semar-mbangun-kayangan.webp',
    role: 'Punakawan • Pamong Para Ksatria',
    link: '/tokoh/kyai-semar',
  },
  'semar badranaya': {
    term: 'Kyai Semar Badranaya',
    meaning: 'Nama agung Sang Semar (Badra = rembulan/kebajikan, Naya = wajah/budi pekerti), wujud dewa berparas bersahaja penuntun moral para pemimpin.',
    category: 'tokoh',
    image: '/images/stories/semar-mbangun-kayangan.webp',
    role: 'Punakawan • Pamong Para Ksatria',
    link: '/tokoh/kyai-semar',
  },
  'batara ismaya': {
    term: 'Sang Hyang Ismaya',
    meaning: 'Dewa tertua putra Sang Hyang Tunggal yang memilih turun ke marcapada menjadi Semar demi membimbing kesatria berhati suci di muka bumi.',
    category: 'tokoh',
    image: '/images/stories/semar-mbangun-kayangan.webp',
    role: 'Dewa Agung Pengasuh Jagad',
    link: '/tokoh/kyai-semar',
  },
  ismaya: {
    term: 'Sang Hyang Ismaya',
    meaning: 'Dewa tertua putra Sang Hyang Tunggal yang memilih turun ke marcapada menjadi Semar demi membimbing kesatria berhati suci di muka bumi.',
    category: 'tokoh',
    image: '/images/stories/semar-mbangun-kayangan.webp',
    role: 'Dewa Agung Pengasuh Jagad',
    link: '/tokoh/kyai-semar',
  },

  'sang arjuna': {
    term: 'Sang Arjuna (Permadi)',
    meaning: 'Penengah Pandawa Lima titisan Batara Indra. Ksatria berparas rupawan, pemanah ulung tanpa tanding pemilik busur Gandiwa dan panah Pasopati, serta pertapa berjiwa hening di Gunung Indrakila.',
    category: 'tokoh',
    image: '/images/stories/wahyu-makutharama.webp',
    role: 'Satria Pandawa • Penengah Pandawa',
    link: '/tokoh/sang-arjuna',
    quote: '"Fokuskan anak panahmu pada kemurnian niat dan ketenangan jiwamu di dalam."',
  },
  arjuna: {
    term: 'Sang Arjuna',
    meaning: 'Ksatria penengah Pandawa penegak kebenaran dan pemanah ulung pemilik pusaka Pasopati dari Madukara.',
    category: 'tokoh',
    image: '/images/stories/wahyu-makutharama.webp',
    role: 'Satria Pandawa • Penengah Pandawa',
    link: '/tokoh/sang-arjuna',
  },
  permadi: {
    term: 'Raden Permadi',
    meaning: 'Nama muda Raden Arjuna saat menuntut ilmu dan memikat jagad raya dengan ketampanan serta kehalusan budi pekertinya.',
    category: 'tokoh',
    image: '/images/stories/wahyu-makutharama.webp',
    role: 'Ksatria Madukara',
    link: '/tokoh/sang-arjuna',
  },
  'begawan ciptaning': {
    term: 'Begawan Ciptaning',
    meaning: 'Gelar pertapaan Raden Arjuna di Gua Mintaraga Gunung Indrakila ketika memusatkan cipta batin menaklukkan tujuh bidadari kahyangan.',
    category: 'tokoh',
    image: '/images/stories/wahyu-makutharama.webp',
    role: 'Pertapa Hening Indrakila',
    link: '/tokoh/sang-arjuna',
  },
  ciptaning: {
    term: 'Begawan Ciptaning',
    meaning: 'Gelar pertapaan Raden Arjuna saat mengheningkan cipta menguasai hawa nafsu di Gunung Indrakila.',
    category: 'tokoh',
    image: '/images/stories/wahyu-makutharama.webp',
    role: 'Pertapa Hening Indrakila',
    link: '/tokoh/sang-arjuna',
  },

  'sang gatotkaca': {
    term: 'Sang Gatotkaca (Raden Tetuka)',
    meaning: 'Putra perkasa Bima dan Dewi Arimbi berotot kawat balung wesi. Ksatria dirgantara yang mampu terbang di angkasa tanpa sayap berkat Rompi Antakusuma dan berjiwa patriotik membela bangsa.',
    category: 'tokoh',
    image: '/images/stories/gatotkaca-gugur.webp',
    role: 'Satria Pandawa • Ksatria Pringgandani',
    link: '/tokoh/sang-gatotkaca',
    quote: '"Bila tubuhku harus runtuh dari cakrawala demi tegaknya kedaulatan bangsaku, maka tiada sejengkal tanah pun yang kusesali."',
  },
  gatotkaca: {
    term: 'Sang Gatotkaca',
    meaning: 'Ksatria dirgantara berjuluk "Otot Kawat Balung Wesi" pelindung angkasa Kurusetra dari Pringgandani.',
    category: 'tokoh',
    image: '/images/stories/gatotkaca-gugur.webp',
    role: 'Satria Pandawa • Ksatria Pringgandani',
    link: '/tokoh/sang-gatotkaca',
  },
  'raden gatotkaca': {
    term: 'Raden Gatotkaca',
    meaning: 'Ksatria dirgantara berjuluk "Otot Kawat Balung Wesi" pelindung angkasa Kurusetra dari Pringgandani.',
    category: 'tokoh',
    image: '/images/stories/gatotkaca-gugur.webp',
    role: 'Satria Pandawa • Ksatria Pringgandani',
    link: '/tokoh/sang-gatotkaca',
  },
  tetuka: {
    term: 'Raden Tetuka (Jabang Tetuka)',
    meaning: 'Nama masa bayi Gatotkaca yang dicelupkan ke kawah Candradimuka dan ditempa aneka senjata pusaka dewa hingga tubuhnya menjadi baja sakti.',
    category: 'tokoh',
    image: '/images/stories/gatotkaca-gugur.webp',
    role: 'Bayi Sakti Kawah Candradimuka',
    link: '/tokoh/sang-gatotkaca',
  },

  'kyai petruk': {
    term: 'Kyai Petruk (Kantong Bolong)',
    meaning: 'Putra kedua Semar bertubuh jangkung dan berhidung panjang. Sosok cerdas, jenaka, tangkas berbicara, serta dermawan membagikan rezeki kepada sesama (kantong bolong).',
    category: 'tokoh',
    image: '/images/stories/petruk-dadi-ratu.webp',
    role: 'Punakawan • Cerdas & Jenaka',
    link: '/tokoh/kyai-petruk',
    quote: '"Aja gumunan, aja getunan, aja kagetan menghadapi liku-liku dunia."',
  },
  petruk: {
    term: 'Kyai Petruk',
    meaning: 'Punakawan bertubuh jangkung berhidung mancung yang cerdas, humoris, tangkas bersilat lidah, dan selalu membela rakyat kecil.',
    category: 'tokoh',
    image: '/images/stories/petruk-dadi-ratu.webp',
    role: 'Punakawan • Cerdas & Jenaka',
    link: '/tokoh/kyai-petruk',
  },
  'prabu welgeduwelbeh': {
    term: 'Prabu Welgeduwelbeh',
    meaning: 'Gelar raja Petruk saat memegang pusaka Jamus Kalimasada dan mendirikan Keraton Ngrancang Kencana untuk menyindir kepongahan para bangsawan istana.',
    category: 'tokoh',
    image: '/images/stories/petruk-dadi-ratu.webp',
    role: 'Raja Ngrancang Kencana (Petruk)',
    link: '/tokoh/kyai-petruk',
  },

  'kyai bagong': {
    term: 'Kyai Bagong (Bawor)',
    meaning: 'Putra bungsu Semar yang tercipta dari bayangan Semar atas kehendak Sang Hyang Tunggal. Berwujud bulat tambun dengan kejujuran lugu tanpa basa-basi, anti kemunafikan, dan berani mengkritik kebatilan.',
    category: 'tokoh',
    image: '/images/bagong-kembar-babak-1-full.webp',
    role: 'Punakawan • Kritis & Jujur',
    link: '/tokoh/kyai-bagong',
    quote: '"Sing bener dibenerke, sing salah disalahke tanpa pandang bulu siapa yang bicara."',
  },
  bagong: {
    term: 'Kyai Bagong',
    meaning: 'Punakawan bungsu bayangan Semar yang lugu, jenaka, ceplas-ceplos, anti suap, dan selalu menyuarakan kebenaran nurani rakyat.',
    category: 'tokoh',
    image: '/images/bagong-kembar-babak-1-full.webp',
    role: 'Punakawan • Kritis & Jujur',
    link: '/tokoh/kyai-bagong',
  },
  bawor: {
    term: 'Bagong Bawor',
    meaning: 'Julukan khas Bagong di tlatah Banyumas yang melambangkan watak kesatria blak-blakan tanpa tedeng aling-aling.',
    category: 'tokoh',
    image: '/images/bagong-kembar-babak-1-full.webp',
    role: 'Punakawan • Kritis & Jujur',
    link: '/tokoh/kyai-bagong',
  },

  'nala gareng': {
    term: 'Nala Gareng (Cakruk)',
    meaning: 'Putra sulung Semar berwujud serba simbolik: mata juling (tak ingin melihat keburukan), tangan ceko (pantang mengambil hak orang), dan kaki jinjit pincang (selalu waspada dan mawas diri dalam melangkah).',
    category: 'tokoh',
    image: '/images/nala-gareng-babak-1-full.webp',
    role: 'Punakawan • Bijak & Bersahaja',
    link: '/tokoh/nala-gareng',
    quote: '"Melangkah pincang bukan alasan berhenti, melainkan pengingat suci agar kita senantiasa mawas diri."',
  },
  gareng: {
    term: 'Nala Gareng',
    meaning: 'Punakawan sulung yang bijak, sabar, mawas diri, dan menjadi penengah penyejuk saat saudara-saudaranya berselisih paham.',
    category: 'tokoh',
    image: '/images/nala-gareng-babak-1-full.webp',
    role: 'Punakawan • Bijak & Bersahaja',
    link: '/tokoh/nala-gareng',
  },
  'bambang sukodadi': {
    term: 'Bambang Sukodadi',
    meaning: 'Nama satria tampan Nala Gareng sebelum bertarung dengan Petruk dan disadarkan oleh wejangan luhur Kyai Semar.',
    category: 'tokoh',
    image: '/images/nala-gareng-babak-1-full.webp',
    role: 'Satria Gandamekar (Masa Muda Gareng)',
    link: '/tokoh/nala-gareng',
  },

  'prabu rahwana': {
    term: 'Prabu Rahwana (Dasamuka)',
    meaning: 'Raja raksasa penguasa Alengka Diraja berkepala sepuluh (Dasamuka) pemilik kesaktian Aji Pancasona dan Rawarontek. Perlambang sepuluh hawa nafsu angkara murka dan arogansi kekuasaan.',
    category: 'tokoh',
    image: '/images/rahwana-babak-1-full.webp',
    role: 'Prabu Alengka • Raja Dasamuka',
    link: '/tokoh/prabu-rahwana',
    quote: '"Kekuasaan tanpa kendali moral laksana api yang memangsa rumah dan diri pemiliknya sendiri."',
  },
  rahwana: {
    term: 'Prabu Rahwana',
    meaning: 'Raja raksasa Alengka berkepala sepuluh yang berambisi menguasai jagad raya dan menculik Dewi Shinta.',
    category: 'tokoh',
    image: '/images/rahwana-babak-1-full.webp',
    role: 'Prabu Alengka • Raja Dasamuka',
    link: '/tokoh/prabu-rahwana',
  },
  dasamuka: {
    term: 'Prabu Dasamuka',
    meaning: 'Sebutan bagi Rahwana yang berarti "sepuluh wajah", mencerminkan sepuluh dorongan hawa nafsu duniawi yang tak terkendali.',
    category: 'tokoh',
    image: '/images/rahwana-babak-1-full.webp',
    role: 'Raja Angkara Alengka',
    link: '/tokoh/prabu-rahwana',
  },
  'prabu dasamuka': {
    term: 'Prabu Dasamuka',
    meaning: 'Sebutan bagi Rahwana yang berarti "sepuluh wajah", mencerminkan sepuluh dorongan hawa nafsu duniawi yang tak terkendali.',
    category: 'tokoh',
    image: '/images/rahwana-babak-1-full.webp',
    role: 'Raja Angkara Alengka',
    link: '/tokoh/prabu-rahwana',
  },

  'resi drona': {
    term: 'Resi Drona (Begawan Durna)',
    meaning: 'Guru besar ilmu perang dan senjata bagi seratus Kurawa dan lima Pandawa di Padepokan Sokalima. Ahli strategi ulung yang gugur di medan Kurusetra setelah terbelenggu kasih buta pada anaknya, Aswatama.',
    category: 'tokoh',
    image: '/images/resi-drona-babak-1-full.webp',
    role: 'Pujangga Hastina • Guru Besar Sokalima',
    link: '/tokoh/resi-drona',
    quote: '"Ilmu yang paling sulit diajarkan adalah keberanian membedakan mana kesetiaan sejati dan mana belenggu kekuasaan."',
  },
  'resi durna': {
    term: 'Resi Durna (Begawan Drona)',
    meaning: 'Guru besar ilmu perang dan senjata bagi seratus Kurawa dan lima Pandawa di Padepokan Sokalima. Ahli strategi ulung yang menguji tekad Werkudara mencari Tirta Perwitasari.',
    category: 'tokoh',
    image: '/images/resi-drona-babak-1-full.webp',
    role: 'Guru Besar Padepokan Sokalima',
    link: '/tokoh/resi-drona',
  },
  'begawan drona': {
    term: 'Begawan Drona',
    meaning: 'Panglima tertinggi senapati Kurawa pada hari ke-15 Baratayudha bersenjatakan panah pusaka Cundamanik.',
    category: 'tokoh',
    image: '/images/resi-drona-babak-1-full.webp',
    role: 'Guru Besar Sokalima',
    link: '/tokoh/resi-drona',
  },
  'begawan durna': {
    term: 'Begawan Durna',
    meaning: 'Panglima tertinggi senapati Kurawa pada hari ke-15 Baratayudha bersenjatakan panah pusaka Cundamanik.',
    category: 'tokoh',
    image: '/images/resi-drona-babak-1-full.webp',
    role: 'Guru Besar Sokalima',
    link: '/tokoh/resi-drona',
  },
  durna: {
    term: 'Resi Durna',
    meaning: 'Guru agung Pandawa dan Kurawa pemegang ajian Danurweda di Sokalima.',
    category: 'tokoh',
    image: '/images/resi-drona-babak-1-full.webp',
    role: 'Guru Besar Padepokan Sokalima',
    link: '/tokoh/resi-drona',
  },
  drona: {
    term: 'Resi Drona',
    meaning: 'Guru agung Pandawa dan Kurawa pemegang ajian Danurweda di Sokalima.',
    category: 'tokoh',
    image: '/images/resi-drona-babak-1-full.webp',
    role: 'Guru Besar Padepokan Sokalima',
    link: '/tokoh/resi-drona',
  },

  'dewa ruci': {
    term: 'Sang Dewa Ruci',
    meaning: 'Wujud rohani kemurnian sukma sejati berparas mini serupa Werkudara yang bersemayam di dasar Samudra Minangkalbu, lambang pencerahan Manunggaling Kawula Gusti.',
    category: 'tokoh',
    image: '/images/stories/dewa-ruci.webp',
    role: 'Sukma Sejati Keabadian Batin',
  },
  'sang dewa ruci': {
    term: 'Sang Dewa Ruci',
    meaning: 'Wujud rohani kemurnian sukma sejati berparas mini serupa Werkudara yang bersemayam di dasar Samudra Minangkalbu, lambang pencerahan Manunggaling Kawula Gusti.',
    category: 'tokoh',
    image: '/images/stories/dewa-ruci.webp',
    role: 'Sukma Sejati Keabadian Batin',
  },

  sengkuni: {
    term: 'Patih Sengkuni (Harya Suman)',
    meaning: 'Patih licik kerajaan Astina paman dari para Kurawa yang mahir menyusun intrik, fitnah, dan tipu muslihat untuk melenyapkan Pandawa.',
    category: 'tokoh',
    image: '/images/stories/bale-sigala-gala.webp',
    role: 'Patih Astinapura • Perancang Siasat Licik',
  },
  'patih sengkuni': {
    term: 'Patih Sengkuni (Harya Suman)',
    meaning: 'Patih licik kerajaan Astina paman dari para Kurawa yang mahir menyusun intrik, fitnah, dan tipu muslihat untuk melenyapkan Pandawa.',
    category: 'tokoh',
    image: '/images/stories/bale-sigala-gala.webp',
    role: 'Patih Astinapura • Perancang Siasat Licik',
  },

  kurawa: {
    term: 'Para Kurawa (Korawa)',
    meaning: 'Seratus bersaudara putra Prabu Drestarasta di Astina yang dipimpin Duryudana; simbol ketamakan, kedengkian, dan sifat Adharma.',
    category: 'tokoh',
    image: '/images/stories/bale-sigala-gala.webp',
    role: 'Keluarga Trah Kuru Astinapura',
  },
  korawa: {
    term: 'Para Kurawa (Korawa)',
    meaning: 'Seratus bersaudara putra Prabu Drestarasta di Astina yang dipimpin Duryudana; simbol ketamakan, kedengkian, dan sifat Adharma.',
    category: 'tokoh',
    image: '/images/stories/bale-sigala-gala.webp',
    role: 'Keluarga Trah Kuru Astinapura',
  },

  pandawa: {
    term: 'Para Pandawa Lima',
    meaning: 'Lima kesatria putra Prabu Pandu Dewanata (Puntadewa, Bima, Arjuna, Nakula, Sadewa) penegak keadilan, kebenaran sejati, dan Dharma di muka bumi.',
    category: 'tokoh',
    image: '/images/stories/babat-alas-wanamarta.webp',
    role: 'Lima Ksatria Dharma Kerajaan Amarta',
  },
  'pandawa lima': {
    term: 'Para Pandawa Lima',
    meaning: 'Lima kesatria putra Prabu Pandu Dewanata (Puntadewa, Bima, Arjuna, Nakula, Sadewa) penegak keadilan, kebenaran sejati, dan Dharma di muka bumi.',
    category: 'tokoh',
    image: '/images/stories/babat-alas-wanamarta.webp',
    role: 'Lima Ksatria Dharma Kerajaan Amarta',
  },

  puntadewa: {
    term: 'Prabu Puntadewa (Yudhistira)',
    meaning: 'Sulung Pandawa berdarah putih yang berhati suci, jujur, pantang berbohong, pemaaf, dan pemilik pusaka Jamus Kalimasada.',
    category: 'tokoh',
    image: '/images/stories/babat-alas-wanamarta.webp',
    role: 'Raja Amarta • Ksatria Berdarah Putih',
  },
  'prabu puntadewa': {
    term: 'Prabu Puntadewa (Yudhistira)',
    meaning: 'Sulung Pandawa berdarah putih yang berhati suci, jujur, pantang berbohong, pemaaf, dan pemilik pusaka Jamus Kalimasada.',
    category: 'tokoh',
    image: '/images/stories/babat-alas-wanamarta.webp',
    role: 'Raja Amarta • Ksatria Berdarah Putih',
  },
  yudhistira: {
    term: 'Prabu Yudhistira',
    meaning: 'Raja agung Amarta putra sulung Dewi Kunti yang berjiwa sabar tanpa tanding dan menjunjung tinggi sumpah kebajikan.',
    category: 'tokoh',
    image: '/images/stories/babat-alas-wanamarta.webp',
    role: 'Raja Amarta • Ksatria Berdarah Putih',
  },

  'adipati karna': {
    term: 'Adipati Karna (Suryaputra)',
    meaning: 'Putra sulung Dewi Kunti dengan Batara Surya, ksatria pemanah tangguh yang memilih membalas budi Kurawa hingga gugur oleh panah Pasopati Arjuna.',
    category: 'tokoh',
    image: '/images/stories/karna-tandhing.webp',
    role: 'Raja Awangga • Ksatria Pembela Janji Budi',
  },
  karna: {
    term: 'Adipati Karna',
    meaning: 'Raja Awangga pemilik pusaka mematikan Kunta Wijayadanu dan kereta perang Jaladara.',
    category: 'tokoh',
    image: '/images/stories/karna-tandhing.webp',
    role: 'Raja Awangga • Senapati Agung Kurawa',
  },

  'prabu kresna': {
    term: 'Prabu Kresna (Batara Kresna)',
    meaning: 'Raja Dwarawati titisan Batara Wisnu, juru taktik agung pemegang bunga Wijayakusuma dan senjata Cakra Baskara, penasihat utama Pandawa.',
    category: 'tokoh',
    image: '/images/stories/wahyu-makutharama.webp',
    role: 'Raja Dwarawati • Titisan Batara Wisnu',
  },
  kresna: {
    term: 'Prabu Kresna',
    meaning: 'Penasihat spiritual dan diplomat ulung pemelihara keseimbangan kosmis jagad raya pewayangan.',
    category: 'tokoh',
    image: '/images/stories/wahyu-makutharama.webp',
    role: 'Raja Dwarawati • Titisan Batara Wisnu',
  },

  anoman: {
    term: 'Raden Anoman (Senggana)',
    meaning: 'Ksatria kera putih berdarah suci putra Batara Bayu yang sakti mandraguna, mampu melompati samudra dan membakar kota Alengka (Anoman Obong).',
    category: 'tokoh',
    image: '/images/stories/anoman-obong.webp',
    role: 'Senapati Rewanda • Ksatria Wanara Suci',
  },
  hanuman: {
    term: 'Raden Anoman (Hanuman)',
    meaning: 'Ksatria wanara putih perkasa pembela kebenaran Sri Rama dalam menumpas angkara murka Rahwana.',
    category: 'tokoh',
    image: '/images/stories/anoman-obong.webp',
    role: 'Senapati Rewanda • Ksatria Wanara Suci',
  },

  kumbakarna: {
    term: 'Raden Kumbakarna',
    meaning: 'Adik Rahwana bertubuh raksasa gunung yang gemar tidur bertapa, berhati jujur dan gugur di medan perang demi membela tanah air Alengka.',
    category: 'tokoh',
    image: '/images/stories/kumbakarna-gugur.webp',
    role: 'Satria Panglebur Gangsa • Patriot Alengka',
  },

  'sri rama': {
    term: 'Prabu Sri Rama Wijaya',
    meaning: 'Raja Ayodya titisan Batara Wisnu, kesatria pemegang Panah Guwawijaya pembela dharma dan pembebas kesucian Dewi Shinta.',
    category: 'tokoh',
    image: '/images/stories/sayembara-mantili.webp',
    role: 'Raja Ayodya • Titisan Batara Wisnu',
  },
  'sri rama wijaya': {
    term: 'Prabu Sri Rama Wijaya',
    meaning: 'Raja Ayodya titisan Batara Wisnu, kesatria pemegang Panah Guwawijaya pembela dharma dan pembebas kesucian Dewi Shinta.',
    category: 'tokoh',
    image: '/images/stories/sayembara-mantili.webp',
    role: 'Raja Ayodya • Titisan Batara Wisnu',
  },
  rama: {
    term: 'Sri Rama Wijaya',
    meaning: 'Ksatria utama wiracarita Ramayana penegak keadilan dan kebenaran suci.',
    category: 'tokoh',
    image: '/images/stories/sayembara-mantili.webp',
    role: 'Raja Ayodya • Titisan Batara Wisnu',
  },

  'dewi shinta': {
    term: 'Dewi Shinta',
    meaning: 'Putri Prabu Janaka dari Mantili, permaisuri Sri Rama yang menjadi lambang kesucian budi, keteguhan cinta, dan kesetiaan mutlak.',
    category: 'tokoh',
    image: '/images/stories/sayembara-mantili.webp',
    role: 'Putri Kerajaan Mantili • Permaisuri Rama',
  },
  'dewi sinta': {
    term: 'Dewi Shinta (Sinta)',
    meaning: 'Putri Mantili permaisuri Sri Rama lambang kesucian nurani dan ketabahan batin.',
    category: 'tokoh',
    image: '/images/stories/sayembara-mantili.webp',
    role: 'Putri Kerajaan Mantili • Permaisuri Rama',
  },
  shinta: {
    term: 'Dewi Shinta',
    meaning: 'Lambang kesucian hati dan keteguhan cinta sejati dalam wiracarita Ramayana.',
    category: 'tokoh',
    image: '/images/stories/sayembara-mantili.webp',
    role: 'Permaisuri Sri Rama',
  },

  'gunawan wibisana': {
    term: 'Gunawan Wibisana',
    meaning: 'Adik bungsu Rahwana yang berbudi luhur, memilih bergabung dengan barisan Sri Rama demi menjunjung kebenaran hakiki di atas ikatan keluarga yang sesat.',
    category: 'tokoh',
    image: '/images/stories/kumbakarna-gugur.webp',
    role: 'Brahmana Alengka • Pembela Dharma',
  },
  wibisana: {
    term: 'Gunawan Wibisana',
    meaning: 'Adik Rahwana yang memilih jalan kebenaran dharma dan membimbing siasat penumpasan Rahwana.',
    category: 'tokoh',
    image: '/images/stories/kumbakarna-gugur.webp',
    role: 'Brahmana Alengka • Pembela Dharma',
  },

  bisma: {
    term: 'Resi Bisma (Dewabrata)',
    meaning: 'Tetua agung trah Kuru pemegang sumpah wadat (tidak menikah seumur hidup), ksatria berjiwa suci yang gugur di atas ranjang panah Kurusetra.',
    category: 'tokoh',
    image: '/images/stories/bisma-gugur.webp',
    role: 'Tetua Agung Trah Kuru • Satria Sumpah Suci',
  },
  'resi bisma': {
    term: 'Resi Bisma (Dewabrata)',
    meaning: 'Tetua agung trah Kuru pemegang sumpah wadat (tidak menikah seumur hidup), ksatria berjiwa suci yang gugur di atas ranjang panah Kurusetra.',
    category: 'tokoh',
    image: '/images/stories/bisma-gugur.webp',
    role: 'Tetua Agung Trah Kuru • Satria Sumpah Suci',
  },

  abimanyu: {
    term: 'Raden Abimanyu (Angkawijaya)',
    meaning: 'Putra terkasih Arjuna dan Dewi Subadra, ksatria muda perkasa pemegang wahyu Cakraningrat yang gugur menerobos formasi Cakrabyuha.',
    category: 'tokoh',
    image: '/images/stories/abimanyu-ranjap.webp',
    role: 'Satria Plangkawati • Putra Arjuna',
  },
  'raden abimanyu': {
    term: 'Raden Abimanyu (Angkawijaya)',
    meaning: 'Putra terkasih Arjuna dan Dewi Subadra, ksatria muda perkasa pemegang wahyu Cakraningrat yang gugur menerobos formasi Cakrabyuha.',
    category: 'tokoh',
    image: '/images/stories/abimanyu-ranjap.webp',
    role: 'Satria Plangkawati • Putra Arjuna',
  },

  srikandi: {
    term: 'Dewi Srikandi',
    meaning: 'Putri Prabu Drupada dari Cempalareja, prajurit wanita perkasa dan pemanah ulung yang menumbangkan Resi Bisma di medan Baratayudha.',
    category: 'tokoh',
    image: '/images/stories/srikandi-meguru-manah.webp',
    role: 'Prajurit Wanita Perkasa • Istri Arjuna',
  },
  'dewi srikandi': {
    term: 'Dewi Srikandi',
    meaning: 'Putri Prabu Drupada dari Cempalareja, prajurit wanita perkasa dan pemanah ulung yang menumbangkan Resi Bisma di medan Baratayudha.',
    category: 'tokoh',
    image: '/images/stories/srikandi-meguru-manah.webp',
    role: 'Prajurit Wanita Perkasa • Istri Arjuna',
  },

  'batara guru': {
    term: 'Sang Hyang Manikmaya (Batara Guru)',
    meaning: 'Raja agung para dewa di Kahyangan Jonggring Saloka bertangan empat penunggang Lembu Andini.',
    category: 'tokoh',
    image: '/images/stories/semar-mbangun-kayangan.webp',
    role: 'Raja Kahyangan Jonggring Saloka',
  },
  manikmaya: {
    term: 'Sang Hyang Manikmaya',
    meaning: 'Nama dewa penguasa semesta Kahyangan Suralaya (Batara Guru).',
    category: 'tokoh',
    image: '/images/stories/semar-mbangun-kayangan.webp',
    role: 'Raja Kahyangan Jonggring Saloka',
  },
  'batara narada': {
    term: 'Batara Narada (Kanwekawarna)',
    meaning: 'Patih dan penasihat agung para dewa di Kahyangan Jonggring Saloka yang bertubuh bulat jenaka dan berilmu tinggi.',
    category: 'tokoh',
    image: '/images/stories/semar-mbangun-kayangan.webp',
    role: 'Patih Kahyangan Jonggring Saloka',
  },
  narada: {
    term: 'Batara Narada',
    meaning: 'Penasihat utama Batara Guru penyampai sabda dewa ke bumi.',
    category: 'tokoh',
    image: '/images/stories/semar-mbangun-kayangan.webp',
    role: 'Patih Kahyangan Jonggring Saloka',
  },

  'batara bayu': {
    term: 'Batara Bayu (Sang Hyang Bayu)',
    meaning: 'Dewa penguasa kekuatan angin kosmis, ayah spiritual Werkudara dan Anoman.',
    category: 'tokoh',
    image: '/images/stories/dewa-ruci.webp',
    role: 'Dewa Angin & Kekuatan Batin',
  },
  'batara indra': {
    term: 'Batara Indra (Sang Hyang Indra)',
    meaning: 'Dewa petir, perang, dan keindahan penguasa Kahyangan Kaindran, ayah rohani Arjuna.',
    category: 'tokoh',
    image: '/images/stories/wahyu-makutharama.webp',
    role: 'Raja Kahyangan Kaindran',
  },

  'dewi kunti': {
    term: 'Dewi Kunti (Kuntinalibrata)',
    meaning: 'Ibunda para Pandawa yang penuh ketabahan, welas asih, dan pembimbing budi pekerti putra-putranya.',
    category: 'tokoh',
    image: '/images/stories/babat-alas-wanamarta.webp',
    role: 'Ibunda Pandawa Lima',
  },
  'dewi arimbi': {
    term: 'Dewi Arimbi (Hidimbi)',
    meaning: 'Ratu Pringgandani berhati mulia istri Werkudara, ibunda dari Sang Gatotkaca.',
    category: 'tokoh',
    image: '/images/stories/gatotkaca-gugur.webp',
    role: 'Ratu Pringgandani • Ibunda Gatotkaca',
  },
  'dewi supraba': {
    term: 'Dewi Supraba',
    meaning: 'Bidadari tercantik kahyangan yang memikat Prabu Niwatakawaca demi membuka rahasia kelemahannya untuk Arjuna.',
    category: 'tokoh',
    image: '/images/arjuna-wiwaha-babak-1-full.webp',
    role: 'Bidadari Utama Kahyangan Kaindran',
  },
  'dewi tilottama': {
    term: 'Dewi Tilottama',
    meaning: 'Bidadari penari kahyangan penguji keteguhan tapa brata Begawan Ciptaning di Gunung Indrakila.',
    category: 'tokoh',
    image: '/images/arjuna-wiwaha-babak-1-full.webp',
    role: 'Bidadari Kahyangan Kaindran',
  },
  niwatakawaca: {
    term: 'Prabu Niwatakawaca',
    meaning: 'Raja raksasa sakti Manimantaka yang tewas oleh bidikan panah Pasopati Arjuna tepat di langit-langit mulutnya.',
    category: 'tokoh',
    image: '/images/arjuna-wiwaha-babak-3-full.webp',
    role: 'Raja Raksasa Manimantaka',
  },
  'prabu niwatakawaca': {
    term: 'Prabu Niwatakawaca',
    meaning: 'Raja raksasa sakti Manimantaka yang tewas oleh bidikan panah Pasopati Arjuna tepat di langit-langit mulutnya.',
    category: 'tokoh',
    image: '/images/arjuna-wiwaha-babak-3-full.webp',
    role: 'Raja Raksasa Manimantaka',
  },

  'naga nemburnawa': {
    term: 'Naga Nemburnawa',
    meaning: 'Naga raksasa ganas penunggu Laut Selatan yang dilumpuhkan Kuku Pancanaka Bima; perlambang nafsu liar batin yang harus ditundukkan.',
    category: 'tokoh',
    image: '/images/bima-suci-babak-2-full.webp',
    role: 'Naga Purba Samudra Kidul',
  },
  nemburnawa: {
    term: 'Naga Nemburnawa',
    meaning: 'Naga purba dasar samudra perlambang amukan hawa nafsu yang dikalahkan Werkudara.',
    category: 'tokoh',
    image: '/images/bima-suci-babak-2-full.webp',
    role: 'Naga Purba Samudra Kidul',
  },

  rukmuka: {
    term: 'Raksasa Rukmuka',
    meaning: 'Raksasa penunggu Gunung Candramuka jelmaan Batara Indra penguji tekad keteguhan hati Bima.',
    category: 'tokoh',
    image: '/images/bima-suci-babak-1-exact.webp',
    role: 'Jelmaan Dewata Penguji Hutan Tikbrasara',
  },
  rukmakala: {
    term: 'Raksasa Rukmakala',
    meaning: 'Raksasa penunggu Gunung Candramuka jelmaan Batara Bayu penguji tekad keteguhan hati Bima.',
    category: 'tokoh',
    image: '/images/bima-suci-babak-1-exact.webp',
    role: 'Jelmaan Dewata Penguji Hutan Tikbrasara',
  },

  drestajumena: {
    term: 'Raden Drestajumena',
    meaning: 'Senapati agung Pandawa putra Prabu Drupada yang ditakdirkan mengakhiri riwayat Begawan Drona di Kurusetra.',
    category: 'tokoh',
    image: '/images/resi-drona-babak-3-full.webp',
    role: 'Senapati Agung Pandawa',
  },
  aswatama: {
    term: 'Raden Aswatama',
    meaning: 'Putra tunggal Resi Drona pembawa permata sakti di dahinya yang kabar palsu kematiannya meruntuhkan tekad sang ayah.',
    category: 'tokoh',
    image: '/images/resi-drona-babak-2-full.webp',
    role: 'Ksatria Hastina • Putra Resi Drona',
  },
  mustakaweni: {
    term: 'Mustakaweni',
    meaning: 'Putri siluman sakti yang mencuri pusaka Jamus Kalimasada sebelum direbut kembali oleh Petruk.',
    category: 'tokoh',
    image: '/images/petruk-dadi-ratu-babak-1-full.webp',
    role: 'Siluman Sakti Pencuri Pusaka',
  },

  // ══════════════════════════════════════════════════════════════════
  // 2. SENJATA & PUSAKA SAKTI (PERANGKAT / SENJATA)
  // ══════════════════════════════════════════════════════════════════
  pancanaka: {
    term: 'Kuku Pancanaka',
    meaning: 'Kuku jempol sakti tajam berkilau milik Raden Werkudara (Bima), lambang ketegasan membelah keraguan dan memusnahkan lima hawa nafsu.',
    category: 'senjata',
  },
  'kuku pancanaka': {
    term: 'Kuku Pancanaka',
    meaning: 'Kuku jempol sakti tajam berkilau milik Raden Werkudara (Bima), lambang ketegasan membelah keraguan dan memusnahkan lima hawa nafsu.',
    category: 'senjata',
  },
  'gada rujakpala': {
    term: 'Gada Rujakpala',
    meaning: 'Gada pusaka penghancur keangkaramurkaan milik Werkudara yang sanggup meremukkan musuh-musuh keadilan.',
    category: 'senjata',
  },
  rujakpala: {
    term: 'Gada Rujakpala',
    meaning: 'Gada pusaka milik Werkudara penumpas kezaliman.',
    category: 'senjata',
  },
  'aji bandung bandawasa': {
    term: 'Aji Bandung Bandawasa',
    meaning: 'Ajian kesaktian tenaga dalam luar biasa setara seribu gajah perkasa penopang bumi milik Werkudara.',
    category: 'senjata',
  },
  'jamus kalimasada': {
    term: 'Serat Jamus Kalimasada',
    meaning: 'Pusaka suci utama negara Amarta berwujud kitab kalimat kebajikan luhur (simbol kalimat syahadat) penjamin kedamaian negara.',
    category: 'senjata',
  },
  'jimat kalimasada': {
    term: 'Jimat Jamus Kalimasada',
    meaning: 'Pusaka suci utama negara Amarta berwujud kitab kalimat kebajikan luhur penjamin kedamaian negara.',
    category: 'senjata',
  },
  kalimasada: {
    term: 'Jamus Kalimasada',
    meaning: 'Pusaka suci kedaulatan Pandawa peninggalan leluhur Amarta pembawa berkah keselamatan hidup.',
    category: 'senjata',
  },
  pasopati: {
    term: 'Panah Pasopati',
    meaning: 'Panah pusaka pamungkas anugerah Batara Guru kepada Arjuna yang melesat bagai kilat dan tak pernah meleset dari sasaran.',
    category: 'senjata',
  },
  'panah pasopati': {
    term: 'Panah Pasopati',
    meaning: 'Panah pusaka pamungkas anugerah Batara Guru kepada Arjuna yang melesat bagai kilat dan tak pernah meleset dari sasaran.',
    category: 'senjata',
  },
  gandiwa: {
    term: 'Busur Gandiwa',
    meaning: 'Busur panah pusaka sakti anugerah Batara Baruna milik Arjuna yang tak pernah patah dan mampu menembakkan ribuan anak panah cahaya.',
    category: 'senjata',
  },
  'busur gandiwa': {
    term: 'Busur Sakti Gandiwa',
    meaning: 'Busur pusaka agung anugerah Dewa Baruna kepunyaan Raden Arjuna.',
    category: 'senjata',
  },
  pulanggeni: {
    term: 'Keris Pulanggeni',
    meaning: 'Keris pusaka lambang keharuman budi pekerti milik Arjuna yang mampu meredam kemarahan dan hawa jahat.',
    category: 'senjata',
  },
  'keris pulanggeni': {
    term: 'Keris Pulanggeni',
    meaning: 'Keris pusaka lambang keharuman budi pekerti milik Arjuna yang mampu meredam kemarahan dan hawa jahat.',
    category: 'senjata',
  },
  antakusuma: {
    term: 'Rompi Antakusuma',
    meaning: 'Rompi sakti pusaka dewa milik Gatotkaca yang memungkinkannya terbang melesat di angkasa tanpa sayap.',
    category: 'senjata',
  },
  'rompi antakusuma': {
    term: 'Rompi Antakusuma',
    meaning: 'Rompi sakti pusaka dewa milik Gatotkaca yang memungkinkannya terbang melesat di angkasa tanpa sayap.',
    category: 'senjata',
  },
  'kutang antakusuma': {
    term: 'Kutang Antakusuma',
    meaning: 'Busana pusaka dewata anugerah Batara Guru untuk Raden Gatotkaca.',
    category: 'senjata',
  },
  brajamusti: {
    term: 'Aji Brajamusti',
    meaning: 'Ajian kesaktian pukulan tangan berkekuatan logam baja kosmis milik Gatotkaca.',
    category: 'senjata',
  },
  'aji brajamusti': {
    term: 'Aji Brajamusti',
    meaning: 'Ajian kesaktian pukulan tangan berkekuatan logam baja kosmis milik Gatotkaca.',
    category: 'senjata',
  },
  narantaka: {
    term: 'Aji Narantaka',
    meaning: 'Ajian pamungkas Gatotkaca yang mampu melipatgandakan bobot pukulan hingga sanggup meremukkan gunung cadas.',
    category: 'senjata',
  },
  'aji narantaka': {
    term: 'Aji Narantaka',
    meaning: 'Ajian pamungkas Gatotkaca penakluk musuh angkara murka.',
    category: 'senjata',
  },
  'kunta wijayadanu': {
    term: 'Pusaka Kunta Wijayadanu',
    meaning: 'Senjata panah maut milik Adipati Karna anugerah Batara Narada yang takdirnya memenggal tali nyawa saat dilepaskan.',
    category: 'senjata',
  },
  'kunta wijayandanu': {
    term: 'Pusaka Kunta Wijayandanu',
    meaning: 'Senjata panah maut milik Adipati Karna anugerah Batara Narada yang takdirnya memenggal tali nyawa saat dilepaskan.',
    category: 'senjata',
  },
  kunta: {
    term: 'Pusaka Kunta',
    meaning: 'Panah pusaka pemungut nyawa kepunyaan Adipati Karna.',
    category: 'senjata',
  },
  'panah guwawijaya': {
    term: 'Panah Guwawijaya',
    meaning: 'Panah sakti milik Sri Rama Wijaya pemusnah angkara murka yang melumpuhkan Prabu Rahwana.',
    category: 'senjata',
  },
  guhyawijaya: {
    term: 'Panah Guhyawijaya',
    meaning: 'Panah pusaka anugerah dewata milik Sri Rama Wijaya.',
    category: 'senjata',
  },
  pancasona: {
    term: 'Aji Pancasona',
    meaning: 'Ajian kesaktian mistis kuno milik Rahwana yang membuatnya bangkit hidup kembali seketika saat jasadnya menyentuh tanah bumi.',
    category: 'senjata',
  },
  'aji pancasona': {
    term: 'Aji Pancasona',
    meaning: 'Ajian kesaktian mistis kuno milik Rahwana yang membuatnya bangkit hidup kembali seketika saat jasadnya menyentuh tanah bumi.',
    category: 'senjata',
  },
  rawarontek: {
    term: 'Aji Rawarontek',
    meaning: 'Ilmu kebal tingkat tinggi penangkal segala macam senjata tajam, racun, dan sihir gaib.',
    category: 'senjata',
  },
  'aji rawarontek': {
    term: 'Aji Rawarontek',
    meaning: 'Ilmu kebal tingkat tinggi penangkal segala macam senjata tajam dan serangan fisik.',
    category: 'senjata',
  },
  candrasa: {
    term: 'Pedang Candrasa',
    meaning: 'Pedang lengkung pusaka berkilau perak milik Prabu Dasamuka penumpas bala tentara lawan.',
    category: 'senjata',
  },
  cundamanik: {
    term: 'Panah Cundamanik',
    meaning: 'Panah pusaka berujung intan berkilau milik Resi Drona penakluk senjata musuh.',
    category: 'senjata',
  },
  danurweda: {
    term: 'Aji Danurweda',
    meaning: 'Kitab ilmu perang, taktik barisan tempur, dan kemahiran memanah tingkat dewa warisan para rsi.',
    category: 'senjata',
  },
  'aji danurweda': {
    term: 'Aji Danurweda',
    meaning: 'Kitab ilmu perang, taktik barisan tempur, dan kemahiran memanah tingkat dewa warisan para rsi.',
    category: 'senjata',
  },
  pangabaran: {
    term: 'Aji Pangabaran',
    meaning: 'Ajian sakti Semar penunduk hawa nafsu angkara yang meluruhkan niat jahat musuh seketika.',
    category: 'senjata',
  },
  'aji pangabaran': {
    term: 'Aji Pangabaran',
    meaning: 'Ajian sakti Semar penunduk hawa nafsu angkara yang meluruhkan niat jahat musuh seketika.',
    category: 'senjata',
  },

  // ══════════════════════════════════════════════════════════════════
  // 3. TEMPAT, KERAJAAN & ALAM SPIRITUAL (TEMPAT)
  // ══════════════════════════════════════════════════════════════════
  'samudra minangkalbu': {
    term: 'Samudra Minangkalbu',
    meaning: 'Samudra batin yang paling dalam (lubuk sanubari terdalam manusia), tempat manusia menyelami dan menemukan hakikat suci jati dirinya.',
    category: 'tempat',
  },
  minangkalbu: {
    term: 'Minangkalbu',
    meaning: 'Kedalaman kalbu batin tempat perjumpaan sukma raga dengan Sang Hyang Maha Suci.',
    category: 'tempat',
  },
  'gunung candramuka': {
    term: 'Gunung Candramuka',
    meaning: 'Gunung sunyi tempat gua angker berada, simbol ujian pertama bagi manusia untuk memurnikan niat batin dari keraguan.',
    category: 'tempat',
  },
  candramuka: {
    term: 'Gunung Candramuka',
    meaning: 'Gua angker di puncak gunung tempat Werkudara diuji menaklukkan hawa nafsu duniawi.',
    category: 'tempat',
  },
  'gunung indrakila': {
    term: 'Gunung Indrakila',
    meaning: 'Gunung suci tempat Raden Arjuna mengheningkan cipta dan bertapa brata melawan godaan para bidadari.',
    category: 'tempat',
  },
  indrakila: {
    term: 'Gunung Indrakila',
    meaning: 'Puncak gunung pertapaan Begawan Ciptaning (Arjuna).',
    category: 'tempat',
  },
  'gua mintaraga': {
    term: 'Gua Mintaraga',
    meaning: 'Gua hening di puncak Indrakila tempat bertapa Begawan Ciptaning (Arjuna).',
    category: 'tempat',
  },
  'goa mintaraga': {
    term: 'Gua Mintaraga',
    meaning: 'Gua hening di puncak Indrakila tempat bertapa Begawan Ciptaning (Arjuna).',
    category: 'tempat',
  },
  'gunung somawana': {
    term: 'Gunung Somawana',
    meaning: 'Gunung batu purba yang diangkat Anoman untuk menindih dan melumpuhkan Aji Pancasona milik Rahwana.',
    category: 'tempat',
  },
  somawana: {
    term: 'Gunung Somawana',
    meaning: 'Gunung purba penindih keangkuhan Rahwana Dasamuka.',
    category: 'tempat',
  },
  tikbrasara: {
    term: 'Hutan Tikbrasara',
    meaning: 'Hutan belantara lebat berbahaya penuh rintangan mistis menuju puncak Candramuka.',
    category: 'tempat',
  },
  'hutan tikbrasara': {
    term: 'Hutan Tikbrasara',
    meaning: 'Hutan belantara lebat berbahaya penuh rintangan mistis menuju puncak Candramuka.',
    category: 'tempat',
  },
  krendhawahana: {
    term: 'Hutan Krendhawahana',
    meaning: 'Hutan angker tempat bersemayamnya para siluman penjaga rahasia pewayangan.',
    category: 'tempat',
  },
  astina: {
    term: 'Kerajaan Astina (Hastinapura)',
    meaning: 'Ibu kota kerajaan megah trah Kuru, pusat perebutan kekuasaan antara Pandawa dan Kurawa.',
    category: 'tempat',
  },
  astinapura: {
    term: 'Kerajaan Astinapura',
    meaning: 'Ibu kota kerajaan megah trah Kuru, pusat perebutan kekuasaan antara Pandawa dan Kurawa.',
    category: 'tempat',
  },
  hastina: {
    term: 'Kerajaan Hastinapura',
    meaning: 'Ibu kota kerajaan megah trah Kuru warisan para leluhur Bharata.',
    category: 'tempat',
  },
  amarta: {
    term: 'Kerajaan Amarta (Indraprastha)',
    meaning: 'Kerajaan makmur, adil, dan tenteram yang didirikan Pandawa setelah membabat hutan belantara Wanamarta.',
    category: 'tempat',
  },
  madukara: {
    term: 'Kadipaten Madukara',
    meaning: 'Kadipaten asri dan tenteram kepunyaan Raden Arjuna, tempat para kesatria berguru budi pekerti.',
    category: 'tempat',
  },
  pringgandani: {
    term: 'Kerajaan Pringgandani',
    meaning: 'Kerajaan para ksatria dan bangsa perkasa tempat bertahtanya Raden Gatotkaca.',
    category: 'tempat',
  },
  jodhipati: {
    term: 'Kadipaten Jodhipati',
    meaning: 'Kadipaten kokoh kediaman Raden Werkudara (Bima), lambang ketegasan hukum dan keadilan tanpa kompromi.',
    category: 'tempat',
  },
  alengka: {
    term: 'Kerajaan Alengka Diraja',
    meaning: 'Kerajaan megah berbenteng emas milik bangsa raksasa yang dipimpin Prabu Rahwana.',
    category: 'tempat',
  },
  sokalima: {
    term: 'Padepokan Sokalima',
    meaning: 'Pusat perguruan agung ilmu perang, memanah, dan sastra senjata di bawah asuhan Resi Drona.',
    category: 'tempat',
  },
  'karang kabadan': {
    term: 'Dusun Karang Kabadan',
    meaning: 'Dusun pedesaan sunyi kediaman Ki Lurah Semar dan anak-anaknya (Punakawan), simbol kehidupan rakyat jelata.',
    category: 'tempat',
  },
  karangklesem: {
    term: 'Dusun Karang Klesem',
    meaning: 'Padepokan asri kediaman Ki Lurah Semar.',
    category: 'tempat',
  },
  'jonggring saloka': {
    term: 'Kahyangan Jonggring Saloka',
    meaning: 'Puncak kahyangan semesta istana para dewa tempat bertahtanya Batara Guru dan Batara Narada.',
    category: 'tempat',
  },
  suralaya: {
    term: 'Kahyangan Suralaya',
    meaning: 'Alam kediaman para dewata pengatur keseimbangan jagad semesta.',
    category: 'tempat',
  },
  swargaloka: {
    term: 'Swargaloka',
    meaning: 'Alam kelanggengan suci surga tempat peristirahatan para pahlawan dan sukma ksatria berbudi luhur.',
    category: 'tempat',
  },
  kurusetra: {
    term: 'Padang Kurusetra',
    meaning: 'Medan laga suci terhampar tempat berkecamuknya perang akbar Bharatayuddha antara Pandawa dan Kurawa.',
    category: 'tempat',
  },
  'kawah candradimuka': {
    term: 'Kawah Candradimuka',
    meaning: 'Kawah lahar gaib para dewa tempat menempa bayi Gatotkaca hingga memiliki raga baja perkasa.',
    category: 'tempat',
  },
  'ngrancang kencana': {
    term: 'Keraton Ngrancang Kencana',
    meaning: 'Kerajaan megah yang didirikan Petruk saat dinobatkan menjadi Prabu Welgeduwelbeh.',
    category: 'tempat',
  },

  // ══════════════════════════════════════════════════════════════════
  // 4. FALSAFAH & NILAI SPIRITUAL LUHUR (FILOSOFI)
  // ══════════════════════════════════════════════════════════════════
  dharma: {
    term: 'Dharma (Darma)',
    meaning: 'Kewajiban suci, kebajikan luhur, dan kebenaran hakiki yang harus ditegakkan ksatria walau nyawa taruhannya.',
    category: 'filosofi',
  },
  darma: {
    term: 'Darma',
    meaning: 'Kewajiban suci dan kebajikan luhur penuntun langkah ksatria sejati.',
    category: 'filosofi',
  },
  adharma: {
    term: 'Adharma',
    meaning: 'Sifat angkara murka, kezaliman, keserakahan, dan pengingkaran terhadap kebenaran moral kebajikan.',
    category: 'filosofi',
  },
  'tirta perwitasari': {
    term: 'Tirta Perwitasari (Air Suci Urip)',
    meaning: 'Air Kehidupan Sejati (Maha Tirta), lambang hakikat kehidupan rohani dan ilmu kasampurnan tertinggi yang dicari Bima.',
    category: 'filosofi',
  },
  'tirta pawitra': {
    term: 'Tirta Pawitra',
    meaning: 'Air suci pencerahan rohani yang membasuh kekeruhan batin manusia.',
    category: 'filosofi',
  },
  'tirta suci': {
    term: 'Tirta Suci',
    meaning: 'Air suci kehidupan sejati pembuka tabir kesadaran batin.',
    category: 'filosofi',
  },
  'guwa garba': {
    term: 'Guwa Garba',
    meaning: 'Rongga rahim batin spiritual (keheningan sanubari), tempat pertemuan sukma raga dengan Sang Pencipta.',
    category: 'filosofi',
  },
  'manunggaling kawula gusti': {
    term: 'Manunggaling Kawula Gusti',
    meaning: 'Puncak pencerahan spiritual tasawuf kebatinan Jawa: bersatunya kesadaran diri hamba dengan kehendak Sang Maha Pencipta.',
    category: 'filosofi',
  },
  'manunggal sukma': {
    term: 'Manunggal Sukma',
    meaning: 'Penyatuan batiniah manusia dengan hakikat sukma sejati Ilahi.',
    category: 'filosofi',
  },
  'urip iku urup': {
    term: 'Urip Iku Urup',
    meaning: 'Falsafah adiluhung Jawa: Hidup itu menyala memberi terang, kehangatan, dan manfaat bagi sesama makhluk.',
    category: 'filosofi',
  },
  'sura dira jayaningrat': {
    term: 'Sura Dira Jayaningrat Lebur Dening Pangastuti',
    meaning: 'Segala angkara murka dan kesombongan akan lebur oleh kelembutan budi pekerti serta kerendahan hati.',
    category: 'filosofi',
  },
  'suradira jayaningrat': {
    term: 'Suradira Jayaningrat Lebur Dening Pangastuti',
    meaning: 'Segala angkara murka dan kesombongan akan lebur oleh kelembutan budi pekerti serta ketenangan batin.',
    category: 'filosofi',
  },
  'memayu hayuning bawana': {
    term: 'Memayu Hayuning Bawana',
    meaning: 'Kewajiban luhur manusia untuk merawat, memperindah, dan menjaga kelestarian kedamaian alam semesta.',
    category: 'filosofi',
  },
  'ngelmu iku kalakone kanthi laku': {
    term: 'Ngelmu Iku Kalakone Kanthi Laku',
    meaning: 'Ilmu kebajikan sejati hanya dapat diraih melalui penghayatan perbuatan nyata dan laku batin yang sungguh-sungguh.',
    category: 'filosofi',
  },
  'aja dumeh': {
    term: 'Aja Dumeh',
    meaning: 'Ajaran mawas diri: jangan sombong dan sewenang-wenang saat memegang kekuasaan atau kelebihan.',
    category: 'filosofi',
  },
  'aja gumunan': {
    term: 'Aja Gumunan',
    meaning: 'Nasihat kearifan: jangan mudah terheran-heran atau silau oleh gemerlap fana duniawi.',
    category: 'filosofi',
  },
  'otot kawat balung wesi': {
    term: 'Otot Kawat Balung Wesi',
    meaning: 'Ungkapan perlambang ketangguhan fisik dan ketahanan mental baja yang tak tergoyahkan oleh rintangan hidup.',
    category: 'filosofi',
  },
  'kusuma bangsa': {
    term: 'Kusuma Bangsa',
    meaning: 'Gelar kehormatan bagi pahlawan yang gugur mengorbankan jiwa raga demi kedaulatan tanah air.',
    category: 'filosofi',
  },
  'mawas diri': {
    term: 'Mawas Diri',
    meaning: 'Sikap mengoreksi kekurangan diri sendiri sebelum menghakimi orang lain.',
    category: 'filosofi',
  },

  // ══════════════════════════════════════════════════════════════════
  // 5. PERANGKAT & ISTILAH PEDALANGAN (PERANGKAT / ISTILAH)
  // ══════════════════════════════════════════════════════════════════
  'pathet nem': {
    term: 'Pathet Nem',
    meaning: 'Babak pembuka wayang (pukul 21.00 - 24.00), menyimbolkan masa muda manusia yang penuh gejolak, idealisme, dan pencarian jati diri.',
    category: 'istilah',
  },
  'pathet sanga': {
    term: 'Pathet Sanga',
    meaning: 'Babak tengah wayang (pukul 24.00 - 03.00), menyimbolkan kedewasaan, pergulatan batin, ujian kebijaksanaan, dan perang hawa nafsu.',
    category: 'istilah',
  },
  'pathet manyura': {
    term: 'Pathet Manyura',
    meaning: 'Babak penutup wayang (pukul 03.00 - 06.00), menyimbolkan kebijaksanaan paripurna, kemenangan dharma, dan keheningan fajar.',
    category: 'istilah',
  },
  sulukan: {
    term: 'Sulukan',
    meaning: 'Lantunan tembang puitis sastrawi yang dilantunkan dalang untuk membangun suasana mistik, haru, atau tegang.',
    category: 'istilah',
  },
  suluk: {
    term: 'Suluk',
    meaning: 'Vokalisasi puitis pedalangan Jawa dengan laras pelog/slendro pembawa ketenangan batin.',
    category: 'istilah',
  },
  kelir: {
    term: 'Kelir',
    meaning: 'Layar kain putih tempat bayangan wayang dimainkan, menyimbolkan bentangan jagat raya kosmos semesta.',
    category: 'perangkat',
  },
  blencong: {
    term: 'Blencong',
    meaning: 'Lampu minyak kelapa penerang kelir dengan lidah api berkobar, menyimbolkan surya penerang kehidupan.',
    category: 'perangkat',
  },
  kayon: {
    term: 'Kayon / Gunungan',
    meaning: 'Wayang berbentuk gunungan pohon hayat (Kalpataru), penanda awal lakon, pemindah babak suasana, dan penutup pagelaran (tancep kayon).',
    category: 'perangkat',
  },
  gunungan: {
    term: 'Gunungan Wayang',
    meaning: 'Simbol pohon hayat (Kalpataru) dan kosmos semesta; digunakan menandai perubahan adegan dan badai alam.',
    category: 'perangkat',
  },
  cempala: {
    term: 'Cempala',
    meaning: 'Kayu pemukul kotak wayang di tangan dalang untuk memberi aba-aba iringan gamelan dan aksentuasi ketukan dramatis.',
    category: 'perangkat',
  },
  baratayudha: {
    term: 'Perang Baratayudha (Bharatayuddha)',
    meaning: 'Perang suci trah Bharata di padang Kurusetra antara Pandawa (Dharma) melawan Kurawa (Adharma).',
    category: 'peristiwa',
  },
  bharatayuddha: {
    term: 'Perang Bharatayuddha',
    meaning: 'Perang suci trah Bharata di padang Kurusetra antara Pandawa melawan Kurawa.',
    category: 'peristiwa',
  },
  'tapa brata': {
    term: 'Tapa Brata',
    meaning: 'Laku hening pemusatan pikiran dan pengekangan hawa nafsu jasmani demi memperoleh kebersihan batin dan petunjuk Ilahi.',
    category: 'istilah',
  },
  marcapada: {
    term: 'Marcapada',
    meaning: 'Dunia fana tempat kehidupan manusia berlangsung dengan segala dinamika ujian kebaikan dan keburukannya.',
    category: 'istilah',
  },
  punakawan: {
    term: 'Punakawan',
    meaning: 'Empat abdi pamong ksatria (Semar, Gareng, Petruk, Bagong) yang melambangkan nurani rakyat, kearifan lokal, dan humor filosofis.',
    category: 'istilah',
  },
  ksatria: {
    term: 'Satria / Ksatria',
    meaning: 'Pejuang penegak keadilan yang berjiwa luhur, berani berkorban, dan memegang teguh sumpah dharma.',
    category: 'istilah',
  },
  satria: {
    term: 'Satria',
    meaning: 'Pejuang penegak keadilan yang berjiwa luhur, berani berkorban, dan memegang teguh sumpah dharma.',
    category: 'istilah',
  },
  pamong: {
    term: 'Pamong',
    meaning: 'Sosok pembimbing, pengayom, dan penasihat spiritual yang senantiasa menuntun para pemimpin ke jalan kebenaran.',
    category: 'istilah',
  },
  raseksa: {
    term: 'Raseksa (Raksasa)',
    meaning: 'Makhluk bertubuh besar perkasa yang melambangkan dorongan hawa nafsu jasmaniah duniawi.',
    category: 'istilah',
  },
  raksasa: {
    term: 'Raksasa',
    meaning: 'Makhluk bertubuh besar perkasa yang melambangkan dorongan hawa nafsu jasmaniah duniawi.',
    category: 'istilah',
  },
  bidadari: {
    term: 'Bidadari Kahyangan',
    meaning: 'Makhluk kahyangan berparas jelita berjiwa lembut penari di istana dewa Kaindran.',
    category: 'istilah',
  },
  'krama inggil': {
    term: 'Krama Inggil',
    meaning: 'Tingkatan bahasa Jawa paling halus yang mencerminkan penghormatan mendalam dan kerendahan hati.',
    category: 'istilah',
  },
  paceklik: {
    term: 'Paceklik',
    meaning: 'Masa krisis kemarau panjang atau kelaparan yang menguji ketahanan moral dan kepedulian sosial pemimpin.',
    category: 'istilah',
  },
  paseban: {
    term: 'Paseban Agung',
    meaning: 'Balai penghadapan di alun-alun keraton tempat raja menerima laporan punggawa dan rakyat jelata.',
    category: 'tempat',
  },
  hestitama: {
    term: 'Gajah Hestitama',
    meaning: 'Gajah perang perkasa milik Prabu Indrajanu yang kematiannya digunakan sebagai siasat pematah konsentrasi Resi Drona.',
    category: 'istilah',
  },
  momongmuka: {
    term: 'Babi Hutan Momongmuka',
    meaning: 'Siluman babi hutan raksasa yang menguji ketajaman panah Begawan Ciptaning di lereng Indrakila.',
    category: 'istilah',
  },
};

interface GlossaryTooltipProps {
  termKey: string;
  children: React.ReactNode;
}

import { createPortal } from 'react-dom';

export function GlossaryTooltip({ termKey, children }: GlossaryTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<{
    top: number;
    left: number;
    width: number;
    placement: 'top' | 'bottom';
    arrowLeft: number;
  } | null>(null);

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cleanKey = termKey.toLowerCase().trim();
  const termData: GlossaryTerm | undefined =
    WAYANG_GLOSSARY[cleanKey] ||
    Object.values(WAYANG_GLOSSARY).find(
      (g) => g.term.toLowerCase() === cleanKey || cleanKey.includes(g.term.toLowerCase())
    );

  const isTokoh = Boolean(termData?.category === 'tokoh' || termData?.image);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const width = Math.min(340, vw - 24);
    const height = tooltipRef.current?.offsetHeight || (isTokoh ? 240 : 180);

    const spaceAbove = rect.top;
    const spaceBelow = vh - rect.bottom;

    let placement: 'top' | 'bottom' = 'top';
    let top = 0;

    // Check if there is comfortable space above (at least height + 16px)
    if (spaceAbove >= height + 16) {
      placement = 'top';
      top = rect.top - height - 10;
    } else if (spaceBelow >= height + 16) {
      placement = 'bottom';
      top = rect.bottom + 10;
    } else {
      // If tight in both directions, pick the side with more space and clamp firmly
      if (spaceAbove >= spaceBelow) {
        placement = 'top';
        top = Math.max(12, rect.top - height - 10);
      } else {
        placement = 'bottom';
        top = Math.min(vh - height - 12, rect.bottom + 10);
      }
    }

    // Absolute viewport boundary safety clamp
    top = Math.max(12, Math.min(vh - height - 12, top));

    // Horizontal centering over the trigger word
    const triggerCenter = rect.left + rect.width / 2;
    let left = triggerCenter - width / 2;

    // Absolute horizontal viewport clamp
    left = Math.max(12, Math.min(vw - width - 12, left));

    // Calculate pointer arrow relative to tooltip container
    const arrowLeft = Math.max(20, Math.min(width - 20, triggerCenter - left));

    setPos({
      top,
      left,
      width,
      placement,
      arrowLeft,
    });
  }, [isTokoh]);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    updatePosition();
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const anim = requestAnimationFrame(() => {
        updatePosition();
      });

      function handleClickOutside(e: MouseEvent) {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(e.target as Node) &&
          tooltipRef.current &&
          !tooltipRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', updatePosition, { passive: true });
      window.addEventListener('resize', updatePosition);

      return () => {
        cancelAnimationFrame(anim);
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isOpen, updatePosition]);

  if (!termData) {
    return <span className="text-[#f5ecd9]">{children}</span>;
  }

  const categoryMeta: Record<
    GlossaryCategory,
    { label: string; color: string; icon: React.ReactNode }
  > = {
    tokoh: {
      label: 'Tokoh Wayang',
      color: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      icon: <User className="w-3.5 h-3.5 text-amber-400" />,
    },
    senjata: {
      label: 'Senjata Pusaka',
      color: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
      icon: <Swords className="w-3.5 h-3.5 text-orange-400" />,
    },
    tempat: {
      label: 'Tempat / Kerajaan',
      color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      icon: <MapPin className="w-3.5 h-3.5 text-cyan-400" />,
    },
    istilah: {
      label: 'Istilah Pedalangan',
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      icon: <BookOpen className="w-3.5 h-3.5 text-emerald-400" />,
    },
    perangkat: {
      label: 'Perangkat Wayang',
      color: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      icon: <Layers className="w-3.5 h-3.5 text-blue-400" />,
    },
    filosofi: {
      label: 'Falsafah Luhur',
      color: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      icon: <Sparkles className="w-3.5 h-3.5 text-purple-400" />,
    },
    peristiwa: {
      label: 'Peristiwa Lakon',
      color: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      icon: <Scroll className="w-3.5 h-3.5 text-rose-400" />,
    },
  };

  const badge = categoryMeta[termData.category] || categoryMeta.istilah;

  const tooltipPortal =
    isOpen && mounted && pos && typeof document !== 'undefined'
      ? createPortal(
          <div
            ref={tooltipRef}
            style={{
              position: 'fixed',
              top: `${pos.top}px`,
              left: `${pos.left}px`,
              width: `${pos.width}px`,
              zIndex: 99999,
            }}
            className="p-3.5 sm:p-4 bg-[#0e0a07]/95 text-[#f5ecd9] border border-[#dedf42]/60 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.98),0_0_24px_rgba(222,223,66,0.18)] backdrop-blur-2xl block text-left font-sans text-xs select-none pointer-events-auto transition-all animate-fadeSlideUp"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Arrow Pointer positioned relative to trigger word */}
            {pos.placement === 'bottom' ? (
              <div
                style={{ left: `${pos.arrowLeft}px` }}
                className="absolute -top-2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-[#dedf42]/70"
              />
            ) : (
              <div
                style={{ left: `${pos.arrowLeft}px` }}
                className="absolute -bottom-2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-[#dedf42]/70"
              />
            )}

            {/* Tokoh Character Avatar Dossier Header */}
            {isTokoh && termData.image ? (
              <div className="flex items-center gap-3 border-b border-white/10 pb-2.5 mb-2.5">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-xl overflow-hidden border border-[#dedf42]/50 shadow-[0_0_12px_rgba(222,223,66,0.25)] bg-[#181109]">
                  <Image
                    src={termData.image}
                    alt={termData.term}
                    fill
                    className="object-cover object-top"
                    sizes="64px"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider border ${badge.color}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#dedf42] leading-tight truncate">
                    {termData.term}
                  </h4>
                  {termData.role && (
                    <p className="text-[10px] font-mono text-[#f5ecd9]/75 truncate mt-0.5">
                      {termData.role}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              /* Standard Header for terms without avatar */
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-2.5">
                <div className="flex items-center gap-1.5 font-serif font-bold text-sm text-[#dedf42]">
                  {badge.icon}
                  <span>{termData.term}</span>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider border ${badge.color}`}
                >
                  {badge.label}
                </span>
              </div>
            )}

            {/* Meaning / Lore Text */}
            <p className="text-[12px] text-[#f5ecd9]/90 leading-relaxed font-normal">
              {termData.meaning}
            </p>

            {/* Character Quote (if available) */}
            {termData.quote && (
              <div className="mt-2.5 p-2 rounded-lg bg-[#dedf42]/10 border-l-2 border-[#dedf42] text-[11px] font-serif italic text-amber-200/90 leading-snug">
                {termData.quote}
              </div>
            )}

            {/* Footer with Actions */}
            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#f5ecd9]/60">
              <span className="text-[#dedf42]/90 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#dedf42]" />
                {isTokoh ? 'Pustaka Tokoh Wayang' : 'Glosarium Pewayangan'}
              </span>

              <div className="flex items-center gap-2">
                {termData.link && (
                  <Link
                    href={termData.link}
                    className="text-[#dedf42] hover:text-white flex items-center gap-1 font-bold underline transition-colors"
                  >
                    Profil Tokoh
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="text-[#f5ecd9]/60 hover:text-white cursor-pointer p-0.5 rounded ml-1"
                  aria-label="Tutup keterangan"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => {
          e.stopPropagation();
          if (!isOpen) {
            handleMouseEnter();
          } else {
            setIsOpen(false);
          }
        }}
        className={`inline underline decoration-dotted underline-offset-4 cursor-pointer transition-all px-1 py-0.5 rounded font-medium text-left font-inherit ${
          isTokoh
            ? 'decoration-[#dedf42] text-[#f8d777] hover:text-[#dedf42] hover:bg-[#dedf42]/15 font-semibold drop-shadow-[0_1px_3px_rgba(222,223,66,0.2)]'
            : 'decoration-[#dedf42]/80 text-[#f2c76b] hover:text-[#dedf42] hover:bg-[#dedf42]/10'
        }`}
      >
        {children}
      </button>
      {tooltipPortal}
    </>
  );
}

export function renderEnrichedNarrative(text: string): React.ReactNode[] {
  if (!text) return [];

  const keys = Object.keys(WAYANG_GLOSSARY).sort((a, b) => b.length - a.length);
  const regexPattern = new RegExp(
    `\\b(${keys.map((k) => k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})\\b`,
    'gi'
  );

  const parts = text.split(regexPattern);

  return parts.map((part, index) => {
    const lower = part.toLowerCase();
    if (WAYANG_GLOSSARY[lower]) {
      return (
        <GlossaryTooltip key={`gloss-${index}-${lower}`} termKey={lower}>
          {part}
        </GlossaryTooltip>
      );
    }
    return <React.Fragment key={`text-${index}`}>{part}</React.Fragment>;
  });
}
