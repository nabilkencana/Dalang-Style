'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

export interface TeamMember {
  id: string;
  number: string;
  name: string;
  portrait: string;
  bio: string;
  basedIn: string;
  focus: string;
  school: string;
  equipment: string;
  positionClass: string;
  heightClass: string;
  aspectRatio: string;
  zIndex: number;
  socials?: {
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
}
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'nabil',
    number: '01 / 03',
    name: 'Nabil Anwar K.',
    portrait: '/images/team/nabil-solo.webp',
    bio: 'Siswa SMK Telkom Malang arsitek interaksi cerdas, perumus kecerdasan artifisial pengenal gestur dalang, integrasi Gemini AI, dan pelopor pelestarian budaya berbasis teknologi web modern.',
    basedIn: 'Malang, ID',
    focus: 'AI Architecture & Fullstack Engineering',
    school: 'SMK Telkom Malang (RPL)',
    equipment: 'BOSCH Diagnostic Rig & Core Controller',
    positionClass: 'left-[2%] sm:left-[6%] md:left-[8%] lg:left-[10%]',
    heightClass: 'h-[80%] sm:h-[82%] lg:h-[85%]',
    aspectRatio: '342/955',
    zIndex: 10,
    socials: {
      github: 'https://github.com/nabilkencana',
      linkedin: 'https://linkedin.com/in/nabilkencana',
      instagram: 'https://instagram.com/nabilkencana',
    },
  },
  {
    id: 'steven',
    number: '02 / 03',
    name: 'Styven Dwi N.',
    portrait: '/images/team/steven-layer.webp',
    bio: 'Siswa SMK Telkom Malang yang merancang panggung teatrikal, harmoni visual palet warna Jawa, tipografi sastra Nusantara, dan kehalusan animasi interaktif 3D.',
    basedIn: 'Malang, ID',
    focus: 'Creative Direction & Motion Design',
    school: 'SMK Telkom Malang (RPL)',
    equipment: 'Optical Power Meter & Wire Tool',
    positionClass: 'left-[28%] sm:left-[30%] md:left-[31%] lg:left-[32%]',
    heightClass: 'h-[84%] sm:h-[86%] lg:h-[89%]',
    aspectRatio: '863/1834',
    zIndex: 25,
    socials: {
      github: 'https://github.com/styvendwin',
      linkedin: 'https://linkedin.com/in/styvendwi',
      instagram: 'https://instagram.com/styvendwi',
    },
  },
  {
    id: 'risky',
    number: '03 / 03',
    name: 'Risky Nabil P.',
    portrait: '/images/team/farhan-solo.webp',
    bio: 'Siswa SMK Telkom Malang pengawal keandalan sistem, optimasi performa asset web, tata kelola audio gamelan slendro pelog, dan riset dokumentasi filosofi watak tokoh pewayangan.',
    basedIn: 'Malang, ID',
    focus: 'System Architecture & Cultural Research',
    school: 'SMK Telkom Malang (RPL)',
    equipment: 'Structural Precision Mallet',
    positionClass: 'right-[2%] sm:right-[6%] md:right-[8%] lg:right-[10%]',
    heightClass: 'h-[90%] sm:h-[92%] lg:h-[95%]',
    aspectRatio: '963/1864',
    zIndex: 15,
    socials: {
      github: 'https://github.com/riskynabil',
      linkedin: 'https://linkedin.com/in/riskynabil',
      instagram: 'https://instagram.com/riskynabil',
    },
  },
];
export default function TeamInteractiveSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [mounted, setMounted] = useState(false);

  // Stage container reference for accurate cursor bounding
  const stageRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth magnetic cursor tracking
  const cursorX = useMotionValue(400);
  const cursorY = useMotionValue(200);

  // Spring physics for buttery-smooth follower response
  const smoothX = useSpring(cursorX, { damping: 25, stiffness: 280, mass: 0.5 });
  const smoothY = useSpring(cursorY, { damping: 25, stiffness: 280, mass: 0.5 });

  const updateCursorPosition = useCallback(
    (clientX: number, clientY: number) => {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const relX = clientX - rect.left;
      const relY = clientY - rect.top;
      cursorX.set(relX);
      cursorY.set(relY);
    },
    [cursorX, cursorY]
  );

  const onEnterMember = useCallback(
    (member: TeamMember, clientX?: number, clientY?: number) => {
      setHoveredId(member.id);
      if (clientX !== undefined && clientY !== undefined && stageRef.current) {
        const rect = stageRef.current.getBoundingClientRect();
        const relX = clientX - rect.left;
        const relY = clientY - rect.top;
        cursorX.set(relX);
        cursorY.set(relY);
      }
    },
    [cursorX, cursorY]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (hoveredId) {
        updateCursorPosition(e.clientX, e.clientY);
      }
    },
    [hoveredId, updateCursorPosition]
  );

  const hoveredMember = TEAM_MEMBERS.find((m) => m.id === hoveredId);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard navigation for modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedMember) return;
      if (e.key === 'Escape') {
        setSelectedMember(null);
      } else if (e.key === 'ArrowRight') {
        const currIdx = TEAM_MEMBERS.findIndex((m) => m.id === selectedMember.id);
        const nextIdx = (currIdx + 1) % TEAM_MEMBERS.length;
        setSelectedMember(TEAM_MEMBERS[nextIdx]);
      } else if (e.key === 'ArrowLeft') {
        const currIdx = TEAM_MEMBERS.findIndex((m) => m.id === selectedMember.id);
        const prevIdx = (currIdx - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length;
        setSelectedMember(TEAM_MEMBERS[prevIdx]);
      }
    },
    [selectedMember]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedMember, handleKeyDown]);

  const handleNext = () => {
    if (!selectedMember) return;
    const currIdx = TEAM_MEMBERS.findIndex((m) => m.id === selectedMember.id);
    const nextIdx = (currIdx + 1) % TEAM_MEMBERS.length;
    setSelectedMember(TEAM_MEMBERS[nextIdx]);
  };

  const handlePrev = () => {
    if (!selectedMember) return;
    const currIdx = TEAM_MEMBERS.findIndex((m) => m.id === selectedMember.id);
    const prevIdx = (currIdx - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length;
    setSelectedMember(TEAM_MEMBERS[prevIdx]);
  };

  return (
    <section className="relative w-full flex flex-col items-center select-none pt-2 pb-6">
      {/* ── 1. Top Section Header ── */}
      <div className="text-center w-full max-w-5xl xl:max-w-6xl mx-auto mb-6 sm:mb-10 px-4">
        <h1 className="font-playfair text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal tracking-tight text-black leading-[1.02] mb-4">
          Sosok di Balik Layar.
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-black/85 font-sans max-w-3xl mx-auto leading-relaxed">
          Tiga siswa SMK Telkom Malang pemrakarsa panggung digital Wayang Jawi. Arahkan kursor atau sentuh untuk berkenalan dengan para kreator.
        </p>
      </div>

      {/* ── 2. Interactive Team Stage: Independent Solo Cutout Presentation ── */}
      <div
        ref={stageRef}
        onPointerMove={handlePointerMove}
        className="relative w-full max-w-[920px] lg:max-w-[1080px] xl:max-w-[1200px] h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[860px] mx-auto flex items-end justify-center"
      >
        {/* Soft Radial Ambient Floor Shadow */}
        <div className="absolute bottom-4 inset-x-8 sm:inset-x-12 lg:inset-x-16 h-16 sm:h-24 lg:h-28 bg-black/30 blur-3xl rounded-full -z-10 pointer-events-none" />
        {/* Dynamic Magnetic Cursor Follower Pill Badge */}
        <AnimatePresence>
          {hoveredMember && (
            <motion.div
              key={hoveredMember.id + '-cursor-pill'}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              style={{
                x: smoothX,
                y: smoothY,
                translateX: '-50%',
                translateY: '-135%',
              }}
              className="pointer-events-none absolute top-0 left-0 z-50 whitespace-nowrap"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/92 text-white text-[11px] sm:text-xs font-sans font-semibold shadow-[0_12px_28px_rgba(0,0,0,0.55)] border border-white/20 backdrop-blur-md">
                <span>{hoveredMember.name}</span>
                <span className="text-[#dedf42] font-bold">Lihat Profil ↗</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Render each solo character with clean individual hover focus without shadow */}
        {TEAM_MEMBERS.map((member) => {
          const isHovered = hoveredId === member.id;
          const isOtherHovered = hoveredId !== null && !isHovered;

          return (
            <motion.div
              key={member.id}
              role="button"
              tabIndex={0}
              aria-label={`Lihat profil ${member.name}`}
              onClick={() => setSelectedMember(member)}
              onMouseEnter={(e) => onEnterMember(member, e.clientX, e.clientY)}
              onMouseOver={(e) => onEnterMember(member, e.clientX, e.clientY)}
              onMouseMove={(e) => {
                if (hoveredId !== member.id) setHoveredId(member.id);
                updateCursorPosition(e.clientX, e.clientY);
              }}
              onMouseLeave={() => setHoveredId(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedMember(member);
                }
              }}
              animate={{
                scale: isHovered ? 1.035 : 1,
                zIndex: isHovered ? 40 : member.zIndex,
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute bottom-0 ${member.positionClass} ${member.heightClass} cursor-pointer group outline-none transition-all duration-500 ease-out ${
                isOtherHovered ? 'opacity-25 grayscale-[85%]' : 'opacity-100 filter-none'
              }`}
              style={{
                aspectRatio: member.aspectRatio,
              }}
            >
              {/* Genuine Subject Silhouette Shadow - 100% traces the person's exact contours without any box artifact */}
              <div
                className={`relative w-full h-full transition-all duration-300 ${
                  isHovered
                    ? 'drop-shadow-[14px_22px_22px_rgba(0,0,0,0.52)] drop-shadow-[0_6px_12px_rgba(0,0,0,0.28)]'
                    : 'drop-shadow-[10px_16px_16px_rgba(0,0,0,0.42)] drop-shadow-[0_4px_8px_rgba(0,0,0,0.22)]'
                }`}
              >
                <Image
                  src={member.portrait}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 300px, 450px"
                  priority
                  className="object-contain object-bottom pointer-events-none"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Bottom Pedestal Divider Plinth (Anchors characters' feet to eliminate abrupt cutoff) ── */}
      <div className="w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto flex flex-col items-center gap-2 -mt-4 sm:-mt-6 relative z-30 pointer-events-auto px-4">
        <div className="w-full flex items-center justify-center gap-3">
          <div className="h-[1.5px] flex-1 bg-black/25" />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/25 bg-black/5 backdrop-blur-sm text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] text-black/80 uppercase shadow-sm">
            <span className="size-1.5 rounded-full bg-black/70" />
            <span>PANGGUNG KREASI • TIM PENGEMBANG WAYANG JAWI</span>
            <span className="size-1.5 rounded-full bg-black/70" />
          </div>
          <div className="h-[1.5px] flex-1 bg-black/25" />
        </div>
      </div>

      {/* ── 3. Profile Detail Modal Popup: Theatrical Color Palette (Matching Wayang Jawi) ── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedMember && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectedMember(null)}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-2xl select-none overflow-y-auto"
              >
                {/* Top-Right Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  className="fixed top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-10 z-[10000] flex items-center gap-2 px-4 py-2 rounded-full border border-[#dedf42]/40 bg-[#0c0908] text-[#dedf42] text-xs font-mono uppercase tracking-widest hover:bg-[#dedf42] hover:text-black transition-all shadow-2xl cursor-pointer"
                >
                  <span>Tutup</span>
                  <X className="size-3.5" />
                </button>

                {/* Modal Content Wrapper */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 my-auto py-6 sm:py-8"
                >
                  {/* Left Column: Spotlight Cutout Person with Grounded Exhibition Pedestal Base */}
                  <motion.div
                    key={selectedMember.id + '-portrait'}
                    initial={{ opacity: 0, x: -30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="relative w-full md:w-5/12 flex flex-col items-center justify-center shrink-0"
                  >
                    {/* Atmospheric Studio Spotlight Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-[#dedf42]/10 blur-3xl rounded-full -z-10 pointer-events-none" />

                    <div className="relative h-[40vh] sm:h-[50vh] md:h-[65vh] w-auto aspect-[3/4] flex items-end justify-center">
                      <Image
                        src={selectedMember.portrait}
                        alt={selectedMember.name}
                        fill
                        sizes="(max-width: 768px) 80vw, 420px"
                        priority
                        className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                      />
                    </div>

                    {/* Pembatas / Grounded Stage Pedestal Platform below image */}
                    <div className="w-full max-w-[280px] sm:max-w-[340px] flex flex-col items-center -mt-1 sm:-mt-2 z-10 pointer-events-none">
                      {/* Luminous Golden Stage Floor Rim Line */}
                      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#dedf42] to-transparent shadow-[0_0_16px_rgba(222,223,66,0.85)]" />
                      {/* Elliptical Grounded Stage Base Plate */}
                      <div className="w-5/6 h-4 bg-gradient-to-b from-[#dedf42]/20 to-black/80 blur-sm rounded-[100%] -mt-1" />
                      <div className="w-3/4 h-3 bg-black/95 blur-md rounded-full -mt-2" />
                      {/* Exhibition Plinth Badge: Clean Curatorial Role Plate */}
                      <div className="mt-2.5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#dedf42]/40 bg-[#0c0908]/95 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#dedf42] uppercase shadow-[0_4px_24px_rgba(0,0,0,0.9)] backdrop-blur-md text-center">
                        <span className="size-1.5 rounded-full bg-[#dedf42] shrink-0 animate-pulse" />
                        <span>{selectedMember.focus}</span>
                        <span className="size-1.5 rounded-full bg-[#dedf42] shrink-0 animate-pulse" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Column: Floating Profile Card Styled in Wayang Jawi Color Palette */}
                  <motion.div
                    key={selectedMember.id + '-card'}
                    initial={{ opacity: 0, y: 25, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
                    className="w-full md:w-7/12 bg-[#0c0908] sm:bg-[#0c0908]/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_0_80px_rgba(0,0,0,0.85),0_0_40px_rgba(222,223,66,0.12)] border-2 border-[#dedf42]/40 flex flex-col justify-between text-[#f4e7cd]"
                  >
                    {/* Card Header: Counter Only */}
                    <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-[#dedf42]/20">
                      <span className="font-mono text-xs tracking-widest text-[#dedf42] font-bold uppercase">
                        {selectedMember.number}
                      </span>
                      <span className="text-xs font-mono tracking-wider text-[#dedf42]/60 uppercase">
                        {selectedMember.basedIn}
                      </span>
                    </div>

                    {/* Member Name & Quote / Bio */}
                    <div className="py-6 sm:py-8 space-y-4 sm:space-y-6">
                      <div>
                        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white mb-2 leading-tight">
                          {selectedMember.name}
                        </h2>
                        <p className="font-mono text-xs sm:text-sm text-[#dedf42] tracking-wider uppercase">
                          {selectedMember.school}
                        </p>
                      </div>

                      <blockquote className="text-sm sm:text-base md:text-lg text-[#f4e7cd]/90 leading-relaxed font-sans border-l-2 border-[#dedf42]/60 pl-4 py-1 italic">
                        &ldquo;{selectedMember.bio}&rdquo;
                      </blockquote>
                    </div>

                    {/* Card Footer: Metadata Specs & Navigation Arrows */}
                    {/* Card Footer: Social Media & Navigation Arrows */}
                    <div className="pt-4 sm:pt-6 border-t border-[#dedf42]/20 flex items-center justify-between gap-4">
                      {/* Social Media Links (Enlarged without text label) */}
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        {selectedMember.socials?.github && (
                          <a
                            href={selectedMember.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`GitHub ${selectedMember.name}`}
                            className="size-10 sm:size-11 rounded-full border border-[#dedf42]/40 bg-black/60 hover:bg-[#dedf42] text-[#f4e7cd] hover:text-black transition-all flex items-center justify-center shadow-md group/soc cursor-pointer"
                          >
                            <svg viewBox="0 0 24 24" className="size-5 sm:size-[22px] shrink-0 transition-transform group-hover/soc:scale-110" fill="currentColor">
                              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                          </a>
                        )}
                        {selectedMember.socials?.linkedin && (
                          <a
                            href={selectedMember.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`LinkedIn ${selectedMember.name}`}
                            className="size-10 sm:size-11 rounded-full border border-[#dedf42]/40 bg-black/60 hover:bg-[#dedf42] text-[#f4e7cd] hover:text-black transition-all flex items-center justify-center shadow-md group/soc cursor-pointer"
                          >
                            <svg viewBox="0 0 24 24" className="size-5 sm:size-[22px] shrink-0 transition-transform group-hover/soc:scale-110" fill="currentColor">
                              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                            </svg>
                          </a>
                        )}
                        {selectedMember.socials?.instagram && (
                          <a
                            href={selectedMember.socials.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Instagram ${selectedMember.name}`}
                            className="size-10 sm:size-11 rounded-full border border-[#dedf42]/40 bg-black/60 hover:bg-[#dedf42] text-[#f4e7cd] hover:text-black transition-all flex items-center justify-center shadow-md group/soc cursor-pointer"
                          >
                            <svg viewBox="0 0 24 24" className="size-5 sm:size-[22px] shrink-0 transition-transform group-hover/soc:scale-110" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                            </svg>
                          </a>
                        )}
                      </div>

                      {/* Modal Navigation Buttons (Prev / Next Member) */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handlePrev}
                          aria-label="Profil sebelumnya"
                          className="size-10 sm:size-11 rounded-full border border-[#dedf42]/40 bg-black/60 flex items-center justify-center text-[#dedf42] hover:bg-[#dedf42] hover:text-black transition-all cursor-pointer shadow-md"
                        >
                          <ArrowLeft className="size-5" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNext}
                          aria-label="Profil berikutnya"
                          className="size-10 sm:size-11 rounded-full border border-[#dedf42]/40 bg-black/60 flex items-center justify-center text-[#dedf42] hover:bg-[#dedf42] hover:text-black transition-all cursor-pointer shadow-md"
                        >
                          <ArrowRight className="size-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
