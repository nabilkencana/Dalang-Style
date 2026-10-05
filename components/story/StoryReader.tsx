'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { WAYANG_STORIES, type WayangStoryItem } from '@/lib/wayang-stories';
import { renderEnrichedNarrative } from '@/components/story/GlossaryTooltip';
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

  // ── Audio Text-to-Speech & Gamelan BGM State ──
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
  const [isPausedTTS, setIsPausedTTS] = useState(false);
  const [bgmActive, setBgmActive] = useState(false);
  const audioEngineRef = useRef<GamelanAudioEngine | null>(null);

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

    const spokenText = `${story.title}. Wiracarita ${story.categoryLabel}. Tokoh utama: ${story.mainCharacter}. ${story.sulukOpening}. ${story.acts.map((a) => `${a.actTitle}. ${a.content}`).join(' ')}. Pitutur Luhur: ${story.pituturLuhur.javaneseQuote}. ${story.pituturLuhur.translation}. ${story.pituturLuhur.moralLesson}`;

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
    const textToCopy = `${story.title}\nKategori: ${story.categoryLabel} | Tokoh: ${story.mainCharacter}\n\n${story.sulukOpening}\n\n${story.acts.map((a) => `${a.actTitle}\n\n${a.content}`).join('\n\n')}\n\n---\nPitutur Luhur:\n"${story.pituturLuhur.javaneseQuote}"\n${story.pituturLuhur.translation}\n\n${story.pituturLuhur.moralLesson}\n\n(Dikutip dari Wayang Jawi - wayangjawi.web.id)`;

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

  return (
    <div className="relative w-full max-w-4xl mx-auto space-y-10 animate-fadeSlideUp">
      {/* ── Top Navigation Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#d9a441]/25">
        <button
          type="button"
          onClick={onBackToCatalog}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 hover:bg-[#dedf42] border border-[#d9a441]/40 text-xs font-mono font-bold text-[#f5ecd9] hover:text-black transition-all cursor-pointer shadow-md active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog Cerita</span>
        </button>

        {/* Right Audio & Reader Tools */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Audio TTS */}
          <div className="flex items-center bg-black/60 border border-[#d9a441]/30 rounded-xl p-1 text-xs">
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
                : 'bg-black/60 border-white/15 text-[#f5ecd9]/70 hover:text-white hover:bg-white/10'
            }`}
            title="Nyalakan iringan gamelan klasik pelog/slendro"
          >
            <Music className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{bgmActive ? 'Gamelan: Hidup' : 'Iringan Gamelan'}</span>
          </button>

          {/* Font Size Adjuster */}
          <div className="hidden sm:flex items-center bg-black/60 border border-white/15 rounded-xl p-1 text-[11px] font-mono">
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

      {/* ── Main Manuscript Container ── */}
      <article className="relative bg-[#120b07] border-2 border-[#d9a441]/40 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] p-6 sm:p-10 md:p-12 space-y-10 overflow-hidden">
        {/* ── Story Header: Cover Portrait & Title Dossier ── */}
        <header className="relative z-10 space-y-6 pb-8 border-b border-[#d9a441]/20">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            {/* Tokoh Visual Portrait */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-black/70 border-2 border-[#d9a441]/35 shrink-0 shadow-inner flex items-center justify-center">
              <Image
                src={story.coverImage}
                alt={story.title}
                fill
                className="object-contain p-3 drop-shadow-[0_8px_20px_rgba(217,164,65,0.3)]"
                sizes="176px"
                priority
              />
            </div>

            {/* Title & Metadata */}
            <div className="space-y-3 flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#dedf42] text-black uppercase tracking-wider">
                  {story.categoryLabel}
                </span>
                <span className="text-xs font-mono text-[#f5ecd9]/60 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#dedf42]" />
                  <span>{story.readingTime}</span>
                </span>
              </div>

              <h1 className="font-serif italic font-bold text-3xl sm:text-4xl md:text-5xl text-[#dedf42] leading-tight tracking-tight">
                {story.title}
              </h1>

              {story.javaneseTitle && (
                <p className="font-serif text-sm text-[#dedf42]/75 tracking-wider">
                  {story.javaneseTitle}
                </p>
              )}

              <p className="font-sans text-xs sm:text-sm text-[#f2c76b] font-medium leading-relaxed">
                {story.tagline}
              </p>

              {/* Tokoh Utama & Pendukung */}
              <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-xs font-mono text-[#f5ecd9]/70">
                <span className="text-[#dedf42]">Tokoh Utama:</span>
                <span className="font-bold text-[#f5ecd9]">{story.mainCharacter}</span>
                {story.supportingCharacters.length > 0 && (
                  <>
                    <span className="text-white/20">•</span>
                    <span className="text-[#f5ecd9]/60">
                      Didukung: {story.supportingCharacters.join(', ')}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Tooltip Hint Badge */}
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[11px] font-mono text-[#dedf42]/80 pt-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Arahkan kursor atau sentuh istilah bergaris bawah untuk melihat catatan glosarium Jawa</span>
          </div>
        </header>

        {/* ── Sulukan Pembuka ── */}
        <section className="relative z-10 p-5 sm:p-7 rounded-2xl bg-gradient-to-r from-[#211208] via-[#1a0e07] to-[#211208] border border-[#d9a441]/35 shadow-inner">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#dedf42] font-bold block">
              SULUKAN PEMBUKA TABIR LAKON
            </span>
            <p className="font-serif italic text-base sm:text-lg text-[#f2c76b] leading-relaxed">
              {renderEnrichedNarrative(story.sulukOpening)}
            </p>
          </div>
        </section>

        {/* ── Structured Acts (Babak I, II, III) ── */}
        <div className="relative z-10 space-y-8">
          {story.acts.map((act) => (
            <section
              key={act.actNumber}
              className="p-6 sm:p-8 rounded-2xl bg-[#0b0604]/80 border border-white/10 space-y-4 shadow-sm hover:border-[#d9a441]/30 transition-colors"
            >
              {/* Act Header */}
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <span className="w-7 h-7 rounded-full bg-[#dedf42] text-black font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {act.actNumber}
                </span>
                <h2 className="font-serif italic font-bold text-xl sm:text-2xl text-[#dedf42]">
                  {act.actTitle}
                </h2>
              </div>

              {/* Act Narrative Text */}
              <div className={`font-sans text-[#f5ecd9]/90 whitespace-pre-wrap ${fontClasses[fontSize]}`}>
                {renderEnrichedNarrative(act.content)}
              </div>
            </section>
          ))}
        </div>

        {/* ── Pitutur Luhur (Falsafah Jawa) ── */}
        <section className="relative z-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#26170d] to-[#120b06] border-2 border-[#d9a441] shadow-[0_15px_45px_rgba(217,164,65,0.2)] space-y-4 overflow-hidden">
          <div className="border-b border-[#dedf42]/30 pb-3">
            <h3 className="font-serif italic font-bold text-lg sm:text-xl uppercase tracking-wider text-[#dedf42]">
              Pitutur Luhur Pedalangan Jawa
            </h3>
          </div>

          <div className="space-y-3">
            <blockquote className="font-serif italic font-bold text-xl sm:text-2xl text-[#f2c76b] leading-snug">
              &ldquo;{renderEnrichedNarrative(story.pituturLuhur.javaneseQuote)}&rdquo;
            </blockquote>

            <p className="font-sans text-xs sm:text-sm text-[#dedf42] font-semibold">
              <strong>Artinya:</strong> {story.pituturLuhur.translation}
            </p>

            <p className="font-sans text-xs sm:text-sm text-[#f5ecd9]/85 leading-relaxed pt-2 border-t border-white/10">
              {renderEnrichedNarrative(story.pituturLuhur.moralLesson)}
            </p>
          </div>
        </section>

        {/* ── Footer Actions Bar: Copy, Print ── */}
        <footer className="relative z-10 pt-6 border-t border-[#d9a441]/25 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
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
      </article>

      {/* ── Previous & Next Story Navigation Switcher ── */}
      <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        {prevStory ? (
          <button
            type="button"
            onClick={() => onSelectStory(prevStory)}
            className="p-4 rounded-2xl bg-[#150c08] border border-[#d9a441]/25 hover:border-[#dedf42] text-left space-y-1 transition-all group cursor-pointer"
          >
            <span className="text-[10px] font-mono text-[#dedf42] flex items-center gap-1 uppercase tracking-wider">
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Kisah Sebelumnya
            </span>
            <p className="font-serif italic font-bold text-sm sm:text-base text-[#f5ecd9] group-hover:text-[#dedf42] transition-colors truncate">
              {prevStory.title}
            </p>
          </button>
        ) : (
          <div />
        )}

        {nextStory ? (
          <button
            type="button"
            onClick={() => onSelectStory(nextStory)}
            className="p-4 rounded-2xl bg-[#150c08] border border-[#d9a441]/25 hover:border-[#dedf42] text-right space-y-1 transition-all group cursor-pointer sm:ml-auto w-full"
          >
            <span className="text-[10px] font-mono text-[#dedf42] flex items-center justify-end gap-1 uppercase tracking-wider">
              Kisah Selanjutnya
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
            <p className="font-serif italic font-bold text-sm sm:text-base text-[#f5ecd9] group-hover:text-[#dedf42] transition-colors truncate">
              {nextStory.title}
            </p>
          </button>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
