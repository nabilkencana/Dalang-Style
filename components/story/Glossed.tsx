'use client';

import React from 'react';

const GLOSSARY: Record<string, string> = {
  'Sangkan Paraning Dumadi': 'Asal-usul dan tujuan akhir hidup manusia.',
  'Kayu Gung Susuhing Angin': '"Kayu besar sarang angin", kiasan untuk raga dan napas manusia.',
  'Mustika Manik Candrama': 'Cincin pemberian dewa agar Bima selamat di dalam air.',
  'Tirta Perwitasari': '"Air suci kehidupan", kiasan untuk kesadaran sejati.',
  Minangkalbu: '"Menanyai hati", samudra yang melambangkan lubuk batin.',
  'Guwa Garba': '"Rongga rahim", ruang batin di dalam tubuh Dewa Ruci.',
  'Manunggaling Kawula Gusti': 'Bersatunya manusia (kawula) dengan Tuhan (Gusti) dalam kesadaran.',
  'Kuku Pancanaka': 'Kuku sakti di ibu jari Bima, lambang tekad yang tajam.',
  Baratayudha: 'Perang besar antara Pandawa dan Kurawa.',
  Werkudara: 'Nama lain Bima: "perut serigala".',
  'Sejatining Urip': 'Hakikat hidup yang sebenarnya.',
  'mati sajeroning urip': '"Mati di dalam hidup": ego padam walau raga masih hidup.',
  Minangkara: 'Gelung rambut seperti udang, tanda Bima telah rendah hati.',
  Nemburnawa: 'Naga laut, lambang nafsu yang membelit dari sembilan lubang tubuh.',
};

const GLOSSARY_RE = new RegExp(
  `(${Object.keys(GLOSSARY)
    .sort((a, b) => b.length - a.length)
    .join('|')})`,
  'g'
);

// Bungkus istilah Jawa dengan tooltip yang bisa diketuk (mobile) atau di-hover.
export function Glossed({ text }: { text: string }) {
  return (
    <>
      {text.split(GLOSSARY_RE).map((part, i) =>
        GLOSSARY[part] ? (
          <span
            key={i}
            tabIndex={0}
            onClick={(e) => e.stopPropagation()}
            className="group/term pointer-events-auto relative cursor-help underline decoration-dotted decoration-[#dedf42]/70 underline-offset-2 outline-none"
          >
            {part}
            <span
              role="tooltip"
              className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1.5 w-56 -translate-x-1/2 rounded-lg border border-[#dedf42]/50 bg-[#0c0805] px-3 py-2 text-left font-sans text-[11.5px] not-italic font-normal leading-snug text-[#f4e7cd] opacity-0 shadow-xl transition-opacity group-hover/term:opacity-100 group-focus/term:opacity-100"
            >
              <strong className="block text-[#dedf42]">{part}</strong>
              {GLOSSARY[part]}
            </span>
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}
