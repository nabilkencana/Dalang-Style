'use client';

import React, { useState, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Wind,
  Axe,
  Target,
  Swords,
  Sparkles,
  Hammer,
  MessageSquareQuote,
  ShieldCheck,
  BookOpen,
  Zap,
  Flame,
} from 'lucide-react';
import type { TokohCharacter } from '@/lib/tokoh-data';

type TabId = 'kisah' | 'filosofi' | 'pusaka';

function getWeaponIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes('kentut') || n.includes('angin') || n.includes('rompi') || n.includes('antakusuma')) {
    return <Wind className="size-5 text-[#dedf42]" />;
  }
  if (n.includes('kapak')) {
    return <Axe className="size-5 text-[#dedf42]" />;
  }
  if (n.includes('busur') || n.includes('gandiwa') || n.includes('panah') || n.includes('pasopati') || n.includes('cundamanik')) {
    return <Target className="size-5 text-[#dedf42]" />;
  }
  if (n.includes('keris') || n.includes('pedang') || n.includes('candrasa') || n.includes('belati')) {
    return <Swords className="size-5 text-[#dedf42]" />;
  }
  if (n.includes('kuku') || n.includes('pancanaka')) {
    return <Sparkles className="size-5 text-[#dedf42]" />;
  }
  if (n.includes('gada') || n.includes('rujakpala') || n.includes('brajamusti') || n.includes('narantaka') || n.includes('palu')) {
    return <Hammer className="size-5 text-[#dedf42]" />;
  }
  if (n.includes('lidah') || n.includes('kata') || n.includes('jujur') || n.includes('silat')) {
    return <MessageSquareQuote className="size-5 text-[#dedf42]" />;
  }
  if (n.includes('jiwa') || n.includes('caping') || n.includes('batin') || n.includes('pangabaran') || n.includes('rawarontek')) {
    return <ShieldCheck className="size-5 text-[#dedf42]" />;
  }
  if (n.includes('danurweda') || n.includes('kitab') || n.includes('ilmu')) {
    return <BookOpen className="size-5 text-[#dedf42]" />;
  }
  if (n.includes('pancasona') || n.includes('bandung') || n.includes('daya') || n.includes('sakti')) {
    return <Zap className="size-5 text-[#dedf42]" />;
  }
  return <Flame className="size-5 text-[#dedf42]" />;
}

interface TokohDetailTabsProps {
  character: TokohCharacter;
}

export default function TokohDetailTabs({ character }: TokohDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('kisah');
  const reduceMotion = useReducedMotion();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const tabs: Array<{ id: TabId; label: string; count?: number }> = [
    { id: 'kisah', label: 'Kisah Singkat' },
    { id: 'filosofi', label: 'Makna & Ajaran' },
    { id: 'pusaka', label: 'Pusaka Sakti', count: character.weapons.length },
  ];

  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let nextIdx = idx;
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = tabs.length - 1;
    else return;

    e.preventDefault();
    setActiveTab(tabs[nextIdx].id);
    tabRefs.current[nextIdx]?.focus();
  };

  return (
    <section aria-label="Profil mendalam tokoh" className="w-full">
      {/* Quiet underline tab switcher matching /katalog */}
      <div
        role="tablist"
        aria-label="Bagian profil tokoh"
        className="flex flex-wrap gap-x-7 sm:gap-x-10 gap-y-3 border-b border-[#dedf42]/15"
      >
        {tabs.map((tab, idx) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              id={`tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => handleTabKeyDown(e, idx)}
              className={`relative -mb-px border-b-2 pb-3 font-sans text-sm sm:text-base transition-colors cursor-pointer focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dedf42] ${
                isActive
                  ? 'border-[#dedf42] text-[#dedf42] font-medium'
                  : 'border-transparent text-[#f4e7cd]/65 hover:text-[#f4e7cd]'
              }`}
            >
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span className={`ml-1.5 tabular-nums text-xs ${isActive ? 'text-[#dedf42]/80' : 'text-[#f4e7cd]/40'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Focused single-chapter panel */}
      <div className="pt-7 sm:pt-9 min-h-[220px]">
        <AnimatePresence mode="wait">
          {activeTab === 'kisah' && (
            <motion.div
              key="kisah"
              id="panel-kisah"
              role="tabpanel"
              aria-labelledby="tab-kisah"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start"
            >
              <div className="lg:col-span-7">
                <h2 className="font-playfair text-2xl sm:text-3xl font-normal text-[#f4e7cd] mb-4">
                  Asal-Usul & Peran di Panggung
                </h2>
                <p className="font-sans text-base sm:text-[17px] leading-[1.85] text-[#f4e7cd]/85 max-w-[60ch] text-left">
                  {character.origin}
                </p>
              </div>

              <aside className="lg:col-span-5">
                <h3 className="font-playfair text-xl sm:text-2xl font-normal text-[#dedf42] mb-3">
                  Watak yang Menonjol
                </h3>
                <ul className="divide-y divide-[#dedf42]/15 border-y border-[#dedf42]/15">
                  {character.traits.map((trait) => (
                    <li
                      key={trait}
                      className="py-3 flex items-center justify-between gap-4 font-sans text-sm sm:text-[15px] text-[#f4e7cd]/90"
                    >
                      <span>{trait}</span>
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#dedf42]/60 shrink-0" />
                    </li>
                  ))}
                </ul>
              </aside>
            </motion.div>
          )}

          {activeTab === 'filosofi' && (
            <motion.div
              key="filosofi"
              id="panel-filosofi"
              role="tabpanel"
              aria-labelledby="tab-filosofi"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start"
            >
              <div className="lg:col-span-6">
                <h2 className="font-playfair text-2xl sm:text-3xl font-normal text-[#f4e7cd] mb-4">
                  Makna Simbolis
                </h2>
                <p className="font-sans text-base sm:text-[17px] leading-[1.85] text-[#f4e7cd]/85 max-w-[56ch] text-left">
                  {character.philosophy}
                </p>
              </div>

              <div className="lg:col-span-6">
                <h2 className="font-playfair text-2xl sm:text-3xl font-normal text-[#dedf42] mb-4">
                  Pelajaran Hidup
                </h2>
                <div className="divide-y divide-[#dedf42]/15 border-y border-[#dedf42]/15">
                  {character.morals.map((moral) => (
                    <div key={moral.title} className="py-4 first:pt-3 last:pb-3">
                      <h3 className="font-playfair text-lg sm:text-xl font-normal text-[#f4e7cd]">
                        {moral.title}
                      </h3>
                      <p className="font-sans text-sm sm:text-[15px] text-[#f4e7cd]/75 leading-relaxed mt-1.5">
                        {moral.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'pusaka' && (
            <motion.div
              key="pusaka"
              id="panel-pusaka"
              role="tabpanel"
              aria-labelledby="tab-pusaka"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <div
                className={`grid grid-cols-1 gap-5 sm:gap-6 ${
                  character.weapons.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
                }`}
              >
                {character.weapons.map((weapon, idx) => (
                  <div
                    key={weapon.name}
                    className={`rounded-2xl p-6 sm:p-7 border transition-colors ${
                      idx === 0
                        ? 'border-[#dedf42]/45 bg-[#120d08]'
                        : 'border-[#dedf42]/15 bg-[#0a0704]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="size-10 rounded-full border border-[#dedf42]/30 bg-[#dedf42]/10 flex items-center justify-center shrink-0">
                        {getWeaponIcon(weapon.name)}
                      </div>
                      {idx === 0 && (
                        <span className="text-xs font-sans text-[#dedf42]/85">
                          Pusaka utama
                        </span>
                      )}
                    </div>
                    <h3 className="font-playfair text-xl sm:text-2xl font-normal text-[#f4e7cd] leading-snug">
                      {weapon.name}
                    </h3>
                    <p className="font-sans text-sm sm:text-[15px] text-[#f4e7cd]/75 leading-relaxed mt-2.5">
                      {weapon.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
