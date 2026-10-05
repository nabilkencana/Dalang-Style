'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Sparkles, X } from 'lucide-react';

export interface GlossaryTerm {
  term: string;
  meaning: string;
  category: 'tokoh' | 'istilah' | 'perangkat' | 'filosofi';
}

export const WAYANG_GLOSSARY: Record<string, GlossaryTerm> = {
  kelir: {
    term: 'Kelir',
    meaning: 'Layar kain putih tempat bayangan wayang dimainkan, menyimbolkan bentangan jagat raya semesta.',
    category: 'perangkat',
  },
  blencong: {
    term: 'Blencong',
    meaning: 'Lampu minyak kelapa penerang kelir dengan api berkobar, menyimbolkan surya/sang hyang pencerah kehidupan.',
    category: 'perangkat',
  },
  kayon: {
    term: 'Kayon / Gunungan',
    meaning: 'Wayang berbentuk gunungan daun/pohon hayat, penanda pembuka, pemindah babak suasana, dan penutup lakon (tancep kayon).',
    category: 'perangkat',
  },
  gunungan: {
    term: 'Gunungan',
    meaning: 'Simbol pohon hayat (Kalpataru) dan kosmos semesta; digunakan untuk menandai perubahan adegan dan badai alam.',
    category: 'perangkat',
  },
  cempala: {
    term: 'Cempala',
    meaning: 'Kayu pemukul kotak wayang di tangan dalang untuk memberi aba-aba iringan gamelan dan aksentuasi ketukan dramatis.',
    category: 'perangkat',
  },
  sulukan: {
    term: 'Sulukan',
    meaning: 'Lantunan tembang puitis sastrawi yang dinyanyikan dalang untuk membangun suasana mistik, haru, atau tegang.',
    category: 'istilah',
  },
  suluk: {
    term: 'Suluk',
    meaning: 'Vokalisasi puitis pedalangan Jawa dengan laras pelog/slendro pembawa ketenangan batin.',
    category: 'istilah',
  },
  'pathet nem': {
    term: 'Pathet Nem',
    meaning: 'Babak pembuka wayang (pukul 21.00 - 24.00), menyimbolkan masa muda manusia yang penuh gejolak dan pencarian jati diri.',
    category: 'istilah',
  },
  'pathet sanga': {
    term: 'Pathet Sanga',
    meaning: 'Babak tengah wayang (pukul 24.00 - 03.00), menyimbolkan kedewasaan, pergulatan batin, dan perang hawa nafsu.',
    category: 'istilah',
  },
  'pathet manyura': {
    term: 'Pathet Manyura',
    meaning: 'Babak penutup wayang (pukul 03.00 - 06.00), menyimbolkan kebijaksanaan paripurna, kemenangan dharma, dan keheningan fajar.',
    category: 'istilah',
  },
  dharma: {
    term: 'Dharma',
    meaning: 'Kewajiban suci, kebajikan luhur, dan kebenaran hakiki yang harus ditegakkan ksatria walau nyawa taruhannya.',
    category: 'filosofi',
  },
  gandiwa: {
    term: 'Busur Gandiwa',
    meaning: 'Busur panah pusaka sakti milik Arjuna anugerah Batara Baruna yang anak panahnya tak pernah meleset.',
    category: 'perangkat',
  },
  pancanaka: {
    term: 'Kuku Pancanaka',
    meaning: 'Kuku jempol sakti tajam berkilau milik Raden Werkudara (Bima), lambang ketegasan membelah keraguan hati.',
    category: 'perangkat',
  },
  brajamusti: {
    term: 'Aji Brajamusti',
    meaning: 'Ajian kesaktian pukulan tangan berkekuatan logam baja kosmis milik Gatotkaca.',
    category: 'istilah',
  },
  antakusuma: {
    term: 'Kutang Antakusuma',
    meaning: 'Rompi sakti pusaka dewa milik Gatotkaca agar mampu terbang melesat di angkasa tanpa sayap.',
    category: 'perangkat',
  },
  'urip iku urup': {
    term: 'Urip Iku Urup',
    meaning: 'Falsafah adiluhung Jawa: Hidup itu menyala memberi terang dan manfaat bagi sesama makhluk.',
    category: 'filosofi',
  },
  'sura dira jayaningrat': {
    term: 'Sura Dira Jayaningrat',
    meaning: 'Segala angkara murka dan kesombongan akan lebur oleh kelembutan budi pekerti serta kerendahan hati.',
    category: 'filosofi',
  },
  'memayu hayuning bawana': {
    term: 'Memayu Hayuning Bawana',
    meaning: 'Kewajiban manusia untuk merawat, memperindah, dan menjaga kelestarian kedamaian alam semesta.',
    category: 'filosofi',
  },
  baratayudha: {
    term: 'Baratayudha',
    meaning: 'Perang suci trah Bharata di padang Kurusetra antara Pandawa (Dharma) melawan Kurawa (Adharma).',
    category: 'istilah',
  },
};

interface GlossaryTooltipProps {
  termKey: string;
  children: React.ReactNode;
}

export function GlossaryTooltip({ termKey, children }: GlossaryTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement | null>(null);

  const cleanKey = termKey.toLowerCase().trim();
  const termData: GlossaryTerm | undefined =
    WAYANG_GLOSSARY[cleanKey] ||
    Object.values(WAYANG_GLOSSARY).find(
      (g) => g.term.toLowerCase() === cleanKey || cleanKey.includes(g.term.toLowerCase())
    );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!termData) {
    return <span className="text-[#f5ecd9]">{children}</span>;
  }

  const categoryLabels: Record<string, { label: string; color: string }> = {
    tokoh: { label: 'Tokoh', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    istilah: { label: 'Istilah Sastra', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    perangkat: { label: 'Perangkat', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    filosofi: { label: 'Falsafah Luhur', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  };

  const badge = categoryLabels[termData.category] || {
    label: 'Pedalangan',
    color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  };

  return (
    <span
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="underline decoration-dotted decoration-[#dedf42] underline-offset-4 text-[#f2c76b] hover:text-[#dedf42] font-semibold cursor-pointer transition-colors px-0.5 rounded hover:bg-[#dedf42]/10"
        title={`Glosarium: ${termData.term}`}
      >
        {children}
      </span>

      {isOpen && (
        <span
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3.5 bg-[#120b07] text-[#f5ecd9] border-2 border-[#d9a441]/60 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.95)] backdrop-blur-xl animate-fadeSlideUp block text-left font-sans text-xs select-none pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-[#d9a441]/60" />

          <span className="flex items-center justify-between border-b border-[#d9a441]/20 pb-2 mb-2">
            <span className="flex items-center gap-1.5 font-serif font-bold text-sm text-[#dedf42]">
              <BookOpen className="w-3.5 h-3.5 text-[#dedf42]" />
              <span>{termData.term}</span>
            </span>

            <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider border ${badge.color}`}>
              {badge.label}
            </span>
          </span>

          <span className="block text-[11px] text-[#f5ecd9]/90 leading-relaxed font-normal">
            {termData.meaning}
          </span>

          <span className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-[#f5ecd9]/50">
            <span className="text-[#dedf42]/80">
              Glosarium Pedalangan Jawa
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[#f5ecd9]/60 hover:text-white cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        </span>
      )}
    </span>
  );
}

export function renderEnrichedNarrative(text: string): React.ReactNode[] {
  if (!text) return [];

  const keys = Object.keys(WAYANG_GLOSSARY).sort((a, b) => b.length - a.length);
  const regexPattern = new RegExp(`\\b(${keys.map((k) => k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})\\b`, 'gi');

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
