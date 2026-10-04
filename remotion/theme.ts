import { staticFile } from 'remotion';

export const COLORS = {
  background: '#0b0604',
  gold: '#d9a441',
  goldHigh: '#f2c76b',
  goldLow: 'rgba(217, 164, 65, 0.16)',
  ink: '#f4e7cd',
  inkDim: '#cdb894',
  panel: 'rgba(22, 13, 7, 0.86)',
  panelLight: 'rgba(38, 24, 14, 0.65)',
  border: 'rgba(217, 164, 65, 0.28)',
  borderBright: 'rgba(242, 199, 107, 0.6)',
  accentRed: '#8a1f18',
  white: '#ffffff',
} as const;

export const FONTS = {
  serif: "'Playfair Display', 'Cinzel', 'Cormorant Garamond', Georgia, serif",
  sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
} as const;

export const ASSETS = {
  heroImage: staticFile('images/dalang-hero-masterpiece.webp'),
  heroLoop: staticFile('videos/hero-dalang-loop.mp4'),
  bimaSuciTitle: staticFile('images/title-bima-suci-full.webp'),
  gunungan: staticFile('images/articles/wiki-gunungan.webp'),
  tokoh: [
    { name: 'Arjuna', role: 'Ksatria Penengah Pandawa', file: staticFile('images/tokoh/wayang-1.webp') },
    { name: 'Bima (Werkudara)', role: 'Pemberani & Penegak Kebenaran', file: staticFile('images/tokoh/wayang-2.webp') },
    { name: 'Gatotkaca', role: 'Otot Kawat Tulang Besi', file: staticFile('images/tokoh/wayang-3.webp') },
    { name: 'Semar', role: 'Pamong Luhur & Bijaksana', file: staticFile('images/tokoh/wayang-4.webp') },
  ],
  gestures: {
    duel: staticFile('videos/gestures/mode-dua-wayang.mp4'),
    solo: staticFile('videos/gestures/mode-satu-wayang.mp4'),
    poros: staticFile('videos/gestures/gesture-01-poros.mp4'),
    lengan: staticFile('videos/gestures/gesture-02-lengan.mp4'),
  },
  museums: [
    { title: 'Museum Wayang Jakarta', file: staticFile('images/museum/places/museum-wayang-jakarta.webp') },
    { title: 'Museum Sonobudoyo Yogyakarta', file: staticFile('images/museum/places/museum-sonobudoyo.webp') },
    { title: 'Museum Radya Pustaka Surakarta', file: staticFile('images/museum/places/museum-radya-pustaka.webp') },
  ],
} as const;
