'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { WAYANG_STORIES, type WayangStoryItem } from '@/lib/wayang-stories';
import { renderEnrichedNarrative, WAYANG_GLOSSARY } from '@/components/story/GlossaryTooltip';
import { GamelanAudioEngine } from '@/lib/wayang/audio';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Check,
  Printer,
  ChevronLeft,
  ChevronRight,
  Music,
  User,
  Bookmark,
  Sparkles,
  Maximize2,
  Minimize2,
  Share2,
  ListOrdered,
  Users,
} from 'lucide-react';

interface StoryReaderProps {
  story: WayangStoryItem;
  onBackToCatalog: () => void;
  onSelectStory: (story: WayangStoryItem) => void;
}

export function StoryReader({
  story,
  onBackToCatalog,
  onSelectStory,
}: StoryReaderProps) {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [showGlossarySheet, setShowGlossarySheet] = useState(false);
  const [showCastSheet, setShowCastSheet] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeActTab, setActiveActTab] = useState<number | 'all'>('all');
  const [scrollProgress, setScrollProgress] = useState(0);

  // ── Audio Text-to-Speech & Gamelan BGM State ──
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
  const [isPausedTTS, setIsPausedTTS] = useState(false);
  const [bgmActive, setBgmActive] = useState(false);
  const audioEngineRef = useRef<GamelanAudioEngine | null>(null);

  // Check bookmarks
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wayang_story_bookmarks');
      if (saved) {
        const list = JSON.parse(saved) as string[];
        setIsBookmarked(list.includes(story.slug));
      }
    } catch {
      // ignore
    }
  }, [story.slug]);

  const handleToggleBookmark = () => {
    try {
      const saved = localStorage.getItem('wayang_story_bookmarks');
      let list: string[] = saved ? JSON.parse(saved) : [];
      if (list.includes(story.slug)) {
        list = list.filter((s) => s !== story.slug);
        setIsBookmarked(false);
      } else {
        list.push(story.slug);
        setIsBookmarked(true);
      }
      localStorage.setItem('wayang_story_bookmarks', JSON.stringify(list));
    } catch {
      // ignore
    }
  };

  // Scroll Progress Listener
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getAudioEngine = () => {
    if (!audioEngineRef.current) {
      audioEngineRef.current = new GamelanAudioEngine();
    }
    return audioEngineRef.current;
  };

  const handleToggleBGM = () => {
    const audio = getAudioEngine();
    const isNowPlaying = audio.toggleBGM();
    setBgmActive(isNowPlaying);
  };

  const handleToggleTTS = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Fitur Text-to-Speech tidak didukung oleh peramban ini.');
      return;
    }

    const synth = window.speechSynthesis;

    if (isPlayingTTS) {
      if (isPausedTTS) {
        synth.resume();
        setIsPausedTTS(false);
      } else {
        synth.pause();
        setIsPausedTTS(true);
      }
      return;
    }

    synth.cancel();

    const spokenText = `${story.title}. Wiracarita ${story.categoryLabel}. Tokoh utama: ${story.mainCharacter}. ${story.characterRole}. ${story.sulukOpening}. ${story.acts.map((a) => `${a.actTitle}. ${a.content}`).join(' ')}. Pitutur Luhur: ${story.pituturLuhur.javaneseQuote}. ${story.pituturLuhur.translation}. ${story.pituturLuhur.moralLesson}`;

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = 'id-ID';
    utterance.rate = 0.95;
    utterance.pitch = 0.9;

    const voices = synth.getVoices();
    const idVoice = voices.find((v) => v.lang.startsWith('id') || v.lang.includes('ID'));
    if (idVoice) utterance.voice = idVoice;

    utterance.onstart = () => {
      setIsPlayingTTS(true);
      setIsPausedTTS(false);
    };

    utterance.onend = () => {
      setIsPlayingTTS(false);
      setIsPausedTTS(false);
    };

    utterance.onerror = () => {
      setIsPlayingTTS(false);
      setIsPausedTTS(false);
    };

    synth.speak(utterance);
  };

  const handleStopTTS = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingTTS(false);
    setIsPausedTTS(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (audioEngineRef.current) {
        audioEngineRef.current.stopBGM();
      }
    };
  }, [story.id]);

  const handleCopyStory = () => {
    const textToCopy = `${story.title}\nKategori: ${story.categoryLabel} | Tokoh: ${story.mainCharacter} (${story.characterRole})\n\n${story.sulukOpening}\n\n${story.acts.map((a) => `${a.actTitle}\n${a.sceneSetting ? `[${a.sceneSetting}]\n` : ''}\n${a.content}`).join('\n\n')}\n\n---\nPitutur Luhur:\n"${story.pituturLuhur.javaneseQuote}"\n${story.pituturLuhur.translation}\n\n${story.pituturLuhur.moralLesson}\n\n(Dikutip dari Wayang Jawi - wayangjawi.web.id)`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentIndex = WAYANG_STORIES.findIndex((s) => s.id === story.id);
  const prevStory = currentIndex > 0 ? WAYANG_STORIES[currentIndex - 1] : null;
  const nextStory = currentIndex < WAYANG_STORIES.length - 1 ? WAYANG_STORIES[currentIndex + 1] : null;

  const fontClasses = {
    sm: 'text-xs sm:text-sm leading-relaxed',
    base: 'text-sm sm:text-base leading-relaxed',
    lg: 'text-base sm:text-lg leading-loose',
  };

  const visibleActs =
    activeActTab === 'all'
      ? story.acts
      : story.acts.filter((a) => a.actNumber === activeActTab);

  return (
    <div className={`relative w-full ${focusMode ? 'max-w-4xl' : 'max-w-5xl'} mx-auto space-y-10 sm:space-y-12 animate-fadeSlideUp transition-all duration-300`}>
      {/* ── Top Floating Reading Progress Bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/40">
        <div
          className="h-full bg-gradient-to-r from-[#d9a441] via-[#dedf42] to-[#d9a441] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ── Top Sticky Reader Control Bar ── */}
      <div className="sticky top-20 z-40 p-4 rounded-2xl bg-[#120b07]/95 backdrop-blur-xl border border-[#d9a441]/30 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToCatalog}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/70 hover:bg-[#dedf42] border border-[#d9a441]/40 text-xs font-mono font-bold text-[#f5ecd9] hover:text-black transition-all cursor-pointer shadow-md active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Pustaka</span>
        </button>

        {/* Right Audio & Reader Tools */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Audio TTS */}
          <div className="flex items-center bg-black/70 border border-[#d9a441]/30 rounded-xl p-1 text-xs">
            <button
              type="button"
              onClick={handleToggleTTS}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-mono font-semibold transition-all cursor-pointer ${
                isPlayingTTS
                  ? 'bg-[#dedf42] text-black shadow-md'
                  : 'text-[#f5ecd9] hover:bg-white/10 hover:text-[#dedf42]'
              }`}
              title="Dengarkan pembacaan naskah lakon via suara audio"
            >
              {isPlayingTTS && !isPausedTTS ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Jeda Narasi</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Dengarkan Narasi</span>
                </>
              )}
            </button>

            {isPlayingTTS && (
              <button
                type="button"
                onClick={handleStopTTS}
                className="p-1.5 text-red-400 hover:text-red-300 hover:bg-white/10 rounded-lg cursor-pointer ml-1"
                title="Hentikan Narasi"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Synthesized Gamelan BGM */}
          <button
            type="button"
            onClick={handleToggleBGM}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              bgmActive
                ? 'bg-[#d9a441]/20 border-[#dedf42] text-[#dedf42] shadow-[0_0_12px_rgba(222,223,66,0.25)]'
                : 'bg-black/70 border-white/15 text-[#f5ecd9]/70 hover:text-white hover:bg-white/10'
            }`}
            title="Nyalakan iringan gamelan klasik pelog/slendro"
          >
            <Music className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{bgmActive ? 'Gamelan: Hidup' : 'Iringan Gamelan'}</span>
          </button>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={handleToggleBookmark}
            className={`p-2 rounded-xl border text-xs transition-all cursor-pointer ${
              isBookmarked
                ? 'bg-[#dedf42] text-black border-[#dedf42] shadow-md'
                : 'bg-black/70 border-white/15 text-[#f5ecd9]/70 hover:text-[#dedf42]'
            }`}
            title={isBookmarked ? 'Hapus dari Tersimpan' : 'Simpan Lakon Ini'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-black' : ''}`} />
          </button>

          {/* Focus Mode Toggle */}
          <button
            type="button"
            onClick={() => setFocusMode(!focusMode)}
            className={`hidden sm:flex items-center gap-1 p-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
              focusMode
                ? 'bg-[#dedf42] text-black border-[#dedf42]'
                : 'bg-black/70 border-white/15 text-[#f5ecd9]/70 hover:text-white'
            }`}
            title={focusMode ? 'Matikan Mode Fokus' : 'Aktifkan Mode Fokus'}
          >
            {focusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Font Size Adjuster */}
          <div className="hidden sm:flex items-center bg-black/70 border border-white/15 rounded-xl p-1 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setFontSize('sm')}
              className={`px-2 py-1 rounded-lg ${fontSize === 'sm' ? 'bg-[#dedf42] text-black font-bold' : 'text-[#f5ecd9]/60 hover:text-white cursor-pointer'}`}
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => setFontSize('base')}
              className={`px-2 py-1 rounded-lg ${fontSize === 'base' ? 'bg-[#dedf42] text-black font-bold' : 'text-[#f5ecd9]/60 hover:text-white cursor-pointer'}`}
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontSize('lg')}
              className={`px-2 py-1 rounded-lg ${fontSize === 'lg' ? 'bg-[#dedf42] text-black font-bold' : 'text-[#f5ecd9]/60 hover:text-white cursor-pointer'}`}
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Manuscript Container (Full-Bleed Reading Experience) ── */}
      <article className="relative bg-[#120b07] border-2 border-[#d9a441]/40 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] p-6 sm:p-10 md:p-14 space-y-12 overflow-hidden">
        {/* ── Story Header: Cover Portrait & Title Dossier ── */}
        <header className="relative z-10 space-y-6 pb-8 border-b border-[#d9a441]/20">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
            {/* Tokoh Visual Portrait */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden bg-black/70 border-2 border-[#d9a441]/40 shrink-0 shadow-inner flex items-center justify-center p-3">
              <Image
                src={story.coverImage}
                alt={story.title}
                fill
                className="object-contain p-3 drop-shadow-[0_10px_25px_rgba(217,164,65,0.4)]"
                sizes="(max-width: 768px) 160px, 192px"
                priority
              />
            </div>

            {/* Title & Metadata */}
            <div className="space-y-3.5 flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                <span className="px-3.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#dedf42] text-black uppercase tracking-wider">
                  {story.categoryLabel}
                </span>
                <span className="text-xs font-mono text-[#f5ecd9]/60 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#dedf42]" />
                  <span>{story.readingTime}</span>
                </span>
                <span className="text-xs font-mono text-[#f5ecd9]/60 bg-black/60 px-2.5 py-0.5 rounded-full border border-white/10">
                  {story.acts.length} Babak Pedalangan
                </span>
              </div>

              <div>
                <h1 className="font-serif italic font-bold text-3xl sm:text-4xl md:text-5xl text-[#dedf42] leading-[1.1] tracking-tight">
                  {story.title}
                </h1>

                {story.javaneseTitle && (
                  <p className="font-serif text-sm text-[#dedf42]/75 tracking-wider mt-1">
                    {story.javaneseTitle}
                  </p>
                )}
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#f2c76b] font-medium leading-relaxed">
                {story.tagline}
              </p>

              {/* Tokoh Utama & Pendukung */}
              <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs font-mono text-[#f5ecd9]/80">
                <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10">
                  <strong className="text-[#dedf42]">{story.mainCharacter}</strong> ({story.characterRole})
                </span>
                {story.supportingCharacters.length > 0 && (
                  <span className="text-[11px] text-[#f5ecd9]/60">
                    Didukung: {story.supportingCharacters.join(', ')}
                  </span>
                )}
                {story.castProfiles && story.castProfiles.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowCastSheet(!showCastSheet)}
                    className="text-[#dedf42] hover:underline text-[11px] font-mono inline-flex items-center gap-1 cursor-pointer ml-1"
                  >
                    <Users className="w-3 h-3" />
                    <span>{showCastSheet ? 'Tutup Profil Tokoh' : 'Lihat Profil Tokoh'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Tooltip Hint Badge */}
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-[#dedf42]/80 pt-2 border-t border-white/10">
            <BookOpen className="w-4 h-4 text-[#dedf42]" />
            <span>Arahkan kursor atau sentuh istilah bergaris bawah untuk melihat catatan glosarium pedalangan Jawa</span>
          </div>
        </header>

        {/* ── Optional Cast Dossier Panel ── */}
        {showCastSheet && story.castProfiles && story.castProfiles.length > 0 && (
          <section className="p-5 sm:p-6 rounded-2xl bg-black/60 border border-[#d9a441]/30 space-y-4 animate-fadeSlideUp">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="font-serif italic font-bold text-base text-[#dedf42] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#dedf42]" />
                Daftar & Profil Tokoh Lakon
              </h3>
              <button
                type="button"
                onClick={() => setShowCastSheet(false)}
                className="text-xs font-mono text-[#f5ecd9]/60 hover:text-white cursor-pointer"
              >
                Tutup
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {story.castProfiles.map((cast, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-serif text-[#dedf42] text-sm font-bold">{cast.name}</h4>
                    <span className="text-[10px] font-mono text-[#f2c76b]/70">{cast.role}</span>
                  </div>
                  <p className="text-[11px] text-[#f5ecd9]/70 leading-relaxed font-sans">{cast.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Cultural Significance Highlight if available ── */}
        {story.culturalSignificance && (
          <section className="p-5 sm:p-6 rounded-2xl bg-black/50 border border-white/10 space-y-1.5 text-xs sm:text-sm">
            <span className="font-mono text-[10px] text-[#dedf42] uppercase tracking-widest block font-bold">
              MAKNA KULTURAL & NILAI SEJARAH
            </span>
            <p className="font-sans text-[#f5ecd9]/80 leading-relaxed">
              {story.culturalSignificance}
            </p>
          </section>
        )}

        {/* ── Sulukan Pembuka ── */}
        <section className="relative z-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#211208] via-[#1a0e07] to-[#211208] border border-[#d9a441]/40 shadow-inner">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#dedf42] font-bold block">
              SULUKAN PEMBUKA TABIR LAKON
            </span>
            <p className="font-serif italic text-base sm:text-xl text-[#f2c76b] leading-relaxed">
              {renderEnrichedNarrative(story.sulukOpening)}
            </p>
          </div>
        </section>

        {/* ── Act Quick Switcher Tabs ── */}
        <div className="flex items-center justify-center gap-2 flex-wrap border-b border-white/10 pb-4">
          <button
            type="button"
            onClick={() => setActiveActTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeActTab === 'all'
                ? 'bg-[#dedf42] text-black font-bold shadow-md'
                : 'bg-black/60 border border-white/10 text-[#f5ecd9]/70 hover:text-white'
            }`}
          >
            Semua Babak ({story.acts.length})
          </button>
          {story.acts.map((act) => (
            <button
              key={act.actNumber}
              type="button"
              onClick={() => setActiveActTab(act.actNumber)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                activeActTab === act.actNumber
                  ? 'bg-[#dedf42] text-black font-bold shadow-md'
                  : 'bg-black/60 border border-white/10 text-[#f5ecd9]/70 hover:text-white'
              }`}
            >
              Babak {act.actNumber}
            </button>
          ))}
        </div>

        {/* ── Structured Acts (Babak I, II, III) ── */}
        <div className="relative z-10 space-y-10">
          {visibleActs.map((act) => (
            <section
              key={act.actNumber}
              className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#0b0604]/90 border border-white/10 space-y-5 shadow-sm hover:border-[#d9a441]/40 transition-colors"
            >
              {/* Act Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#dedf42] text-black font-mono font-bold text-sm flex items-center justify-center shrink-0">
                    {act.actNumber}
                  </span>
                  <h2 className="font-serif italic font-bold text-xl sm:text-2xl text-[#dedf42]">
                    {act.actTitle}
                  </h2>
                </div>

                {act.sceneSetting && (
                  <span className="text-[11px] font-mono text-[#f5ecd9]/50 bg-black/60 px-3 py-1 rounded-full border border-white/5">
                    {act.sceneSetting}
                  </span>
                )}
              </div>

              {/* Act Narrative Text with Complete Formatting */}
              <div className={`font-sans text-[#f5ecd9]/90 whitespace-pre-wrap ${fontClasses[fontSize]}`}>
                {renderEnrichedNarrative(act.content)}
              </div>
            </section>
          ))}
        </div>

        {/* ── Pitutur Luhur (Falsafah Jawa) ── */}
        <section className="relative z-10 p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#26170d] to-[#120b06] border-2 border-[#d9a441] shadow-[0_15px_45px_rgba(217,164,65,0.2)] space-y-5 overflow-hidden">
          <div className="border-b border-[#dedf42]/30 pb-3 flex items-center justify-between">
            <h3 className="font-serif italic font-bold text-lg sm:text-xl uppercase tracking-wider text-[#dedf42]">
              Pitutur Luhur Pedalangan Jawa
            </h3>
            <span className="text-xs font-mono text-[#f2c76b]">Falsafah Batin</span>
          </div>

          <div className="space-y-4">
            <blockquote className="font-serif italic font-bold text-xl sm:text-2xl md:text-3xl text-[#f2c76b] leading-snug">
              &ldquo;{renderEnrichedNarrative(story.pituturLuhur.javaneseQuote)}&rdquo;
            </blockquote>

            <p className="font-sans text-xs sm:text-sm md:text-base text-[#dedf42] font-semibold">
              <strong>Artinya:</strong> {story.pituturLuhur.translation}
            </p>

            <p className="font-sans text-xs sm:text-sm md:text-base text-[#f5ecd9]/90 leading-relaxed pt-3 border-t border-white/10">
              {renderEnrichedNarrative(story.pituturLuhur.moralLesson)}
            </p>
          </div>
        </section>

        {/* ── Footer Actions Bar: Copy, Print, Glossary Trigger ── */}
        <footer className="relative z-10 pt-6 border-t border-[#d9a441]/25 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleCopyStory}
              className="px-4 py-2.5 rounded-xl bg-black/60 hover:bg-[#d9a441] border border-[#d9a441]/40 text-xs font-mono text-[#f5ecd9] hover:text-black transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Teks Tersalin' : 'Salin Naskah Cerita'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-black/60 hover:bg-white/15 border border-white/20 text-xs font-mono text-[#f5ecd9] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Cetak atau simpan sebagai PDF"
            >
              <Printer className="w-3.5 h-3.5 text-[#dedf42]" />
              <span>Cetak / PDF</span>
            </button>

            <button
              type="button"
              onClick={() => setShowGlossarySheet(!showGlossarySheet)}
              className="px-4 py-2.5 rounded-xl bg-black/60 hover:bg-white/15 border border-white/20 text-xs font-mono text-[#dedf42] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{showGlossarySheet ? 'Tutup Pustaka Istilah' : 'Buka Glosarium Jawa Lengkap'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onBackToCatalog}
            className="text-xs font-mono text-[#dedf42] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Semua Lakon</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </footer>

        {/* ── Optional Full Glossary Sheet (Bottom Drawer) ── */}
        {showGlossarySheet && (
          <div className="p-6 rounded-3xl bg-[#0e0704] border border-[#d9a441]/30 space-y-4 animate-fadeSlideUp">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="font-serif italic font-bold text-lg text-[#dedf42]">
                Pustaka Istilah & Falsafah Pedalangan Jawa
              </h4>
              <span className="text-xs font-mono text-[#f5ecd9]/50">
                {Object.keys(WAYANG_GLOSSARY).length} Istilah
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2">
              {Object.values(WAYANG_GLOSSARY).map((g, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="font-serif text-[#dedf42] text-sm">{g.term}</strong>
                    <span className="text-[9px] font-mono uppercase text-[#f5ecd9]/50 px-2 py-0.5 rounded bg-white/5">
                      {g.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#f5ecd9]/80 leading-relaxed font-sans">{g.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* ── Previous & Next Story Navigation Switcher ── */}
      <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        {prevStory ? (
          <button
            type="button"
            onClick={() => onSelectStory(prevStory)}
            className="p-5 rounded-3xl bg-[#150c08] border border-[#d9a441]/25 hover:border-[#dedf42] text-left space-y-1.5 transition-all group cursor-pointer shadow-md"
          >
            <span className="text-[10px] font-mono text-[#dedf42] flex items-center gap-1 uppercase tracking-wider">
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Kisah Sebelumnya
            </span>
            <p className="font-serif italic font-bold text-base sm:text-lg text-[#f5ecd9] group-hover:text-[#dedf42] transition-colors truncate">
              {prevStory.title}
            </p>
            <p className="text-xs font-sans text-[#f5ecd9]/60 line-clamp-1">{prevStory.tagline}</p>
          </button>
        ) : (
          <div />
        )}

        {nextStory ? (
          <button
            type="button"
            onClick={() => onSelectStory(nextStory)}
            className="p-5 rounded-3xl bg-[#150c08] border border-[#d9a441]/25 hover:border-[#dedf42] text-right space-y-1.5 transition-all group cursor-pointer sm:ml-auto w-full shadow-md"
          >
            <span className="text-[10px] font-mono text-[#dedf42] flex items-center justify-end gap-1 uppercase tracking-wider">
              Kisah Selanjutnya
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
            <p className="font-serif italic font-bold text-base sm:text-lg text-[#f5ecd9] group-hover:text-[#dedf42] transition-colors truncate">
              {nextStory.title}
            </p>
            <p className="text-xs font-sans text-[#f5ecd9]/60 line-clamp-1">{nextStory.tagline}</p>
          </button>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
