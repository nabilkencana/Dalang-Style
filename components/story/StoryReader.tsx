'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { WAYANG_STORIES, type WayangStoryItem } from '@/lib/wayang-stories';
import { renderEnrichedNarrative, WAYANG_GLOSSARY } from '@/components/story/GlossaryTooltip';
import { GamelanAudioEngine } from '@/lib/wayang/audio';
import {
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
  Users,
  Scroll,
  ExternalLink,
  MapPin,
  Quote,
  Feather,
  Compass,
  Volume2,
  VolumeX,
  Share2,
  Award,
  HelpCircle,
  Flame,
  Moon,
  Sun,
  Radio,
  Zap,
  X,
  Search,
} from 'lucide-react';

interface StoryReaderProps {
  story: WayangStoryItem;
  onBackToCatalog: () => void;
  onSelectStory: (story: WayangStoryItem) => void;
}

/**
 * Interactive Quiz & Reflection Data for each Lakon Story
 */
const STORY_QUIZZES: Record<
  string,
  { question: string; options: string[]; correctIndex: number; explanation: string }
> = {
  'dewa-ruci': {
    question: 'Siapakah wujud sejati Sang Dewa Ruci yang ditemui Bima di dasar Samudra Minangkalbu?',
    options: [
      'Jatidiri batin suci dan hakikat sukma sejati yang bersemayam dalam diri manusia',
      'Raksasa penunggu dasar samudra yang sakti mandraguna',
      'Jelmaan Resi Durna yang menyamar untuk menguji kesetiaan Bima',
    ],
    correctIndex: 0,
    explanation:
      'Dewa Ruci melambangkan "Marifatullah" / Manunggal Sukma — hakikat kesucian batin manusia yang ditemukan setelah menaklukkan hawa nafsu (disimbolkan oleh Naga Nemburnawa).',
  },
  'semar-mbangun-kayangan': {
    question: 'Apakah makna sejati dari "Mbangun Kayangan" yang dimaksud oleh Kyai Semar?',
    options: [
      'Membangun istana megah di puncak kahyangan para dewa',
      'Membangun keluhuran budi, ketenteraman jiwa, dan keadilan moral para pemimpin rakyat',
      'Merebut takhta Batara Guru di Jonggring Saloka',
    ],
    correctIndex: 1,
    explanation:
      'Semar mengajarkan bahwa kahyangan sejati bukanlah bangunan fisik, melainkan kedamaian dan keadilan budi pekerti para kesatria pengayom rakyat.',
  },
  'arjuna-wiwaha': {
    question: 'Apa kunci utama keberhasilan Begawan Ciptaning (Arjuna) lulus dari ujian para bidadari di Goa Mintaraga?',
    options: [
      'Senjata panah Pasopati yang sakti',
      'Keteguhan tapa brata, pemusatan cipta (hening), dan kekebalan terhadap godaan duniawi',
      'Bantuan pasukan kera dari Kerajaan Kiskenda',
    ],
    correctIndex: 1,
    explanation:
      'Arjuna berhasil karena menguasai "Manembah" — mengheningkan hawa nafsu dan memusatkan batin sepenuhnya kepada Sang Maha Pencipta.',
  },
  'gatotkaca-gugur': {
    question: 'Mengapa pengorbanan Raden Gatotkaca dalam Perang Baratayuda dianggap sebagai puncak kepahlawanan?',
    options: [
      'Karena berhasil memancing senjata pusaka maut Kunta Wijayandanu milik Adipati Karna',
      'Karena Gatotkaca berhasil membunuh seluruh prajurit Korawa sendirian',
      'Karena Gatotkaca diangkat menjadi raja di Astina',
    ],
    correctIndex: 0,
    explanation:
      'Gugurnya Gatotkaca menghabiskan senjata pusaka Kunta Wijayandanu milik Karna, sehingga kelak menyelamatkan takdir Arjuna untuk memenangkan perang dharma.',
  },
  'petruk-dadi-ratu': {
    question: 'Pesan moral utama dari lakon "Petruk Dadi Ratu (Belgeduwelbeh)" adalah...',
    options: [
      'Kekuasaan tanpa kebijaksanaan batin dan kerendahan hati hanya akan menimbulkan kekacauan',
      'Siapa pun yang sakti berhak menjadi raja tirani',
      'Pusaka Jamus Kalimasada harus disembunyikan selamanya',
    ],
    correctIndex: 0,
    explanation:
      'Lakon ini merupakan kritik sosial satir Jawa bahwa kedudukan dan kekuasaan adalah amanah spiritual, bukan ajang kesombongan diri.',
  },
  'bagong-kembar': {
    question: 'Bagaimana cara Bagong sejati membuktikan kemurnian dirinya saat menghadapi Bagong tiruan?',
    options: [
      'Mengajak duel fisik menggunakan gada',
      'Kejujuran kata yang polos, keluguan nurani, dan kesetiaannya pada kebenaran',
      'Meminta pertolongan Batara Narada',
    ],
    correctIndex: 1,
    explanation:
      'Kebatilan mungkin bisa meniru rupa dan tutur kata, namun tidak akan pernah bisa meniru ketulusan nurani yang murni.',
  },
  'nala-gareng-meguru': {
    question: 'Falsafah batin apa yang dipetik Gareng dari langkah kakinya yang jinjit dan tangannya yang ceko?',
    options: [
      'Selalu berhati-hati melangkah di jalan hidup dan pantang mengambil hak milik orang lain',
      'Kelemahan fisik membuat seseorang tidak bisa berkarya',
      'Kekuasaan duniawi harus diraih dengan segala cara',
    ],
    correctIndex: 0,
    explanation:
      'Bentuk fisik Gareng adalah lambang "Mawas Diri" — hati-hati melangkah (*kaki jinjit*) dan tidak usil/mengambil hak orang (*tangan ceko*).',
  },
  'prabu-rahwana-sirna': {
    question: 'Apa yang menyebabkan runtuhnya kekuasaan Prabu Dasamuka (Rahwana) yang memiliki ajian sakti Pancasona?',
    options: [
      'Karena kehabisan pasukan raksasa Alengka',
      'Karena kesombongan, ambisi angkara murka, dan keengganan mendengarkan nasihat kebenaran',
      'Karena pusaka Guhyawijaya tertinggal di Alengka',
    ],
    correctIndex: 1,
    explanation:
      'Sebesar apa pun kesaktian dan kekayaan manusia, angkara murka dan keserakahan batin pada akhirnya akan membinasakan pemiliknya.',
  },
  'resi-drona-gugur': {
    question: 'Apakah pelajaran luhur dari tragedi gugurnya Guru Besar Resi Drona di medan Kurusetra?',
    options: [
      'Keterikatan berlebihan pada kasih sayang duniawi dan kedudukan politik dapat membutakan nurani dharma',
      'Seorang guru tidak boleh mengajarkan ilmu perang',
      'Kemenangan perang hanya ditentukan oleh tipu daya',
    ],
    correctIndex: 0,
    explanation:
      'Drona gugur karena cinta buta pada anaknya (Aswatama) dan terbelenggu sumpah pada takhta angkara, mengajarkan pentingnya menempatkan kebenaran sejati di atas segalanya.',
  },
};

/**
 * Format narrative text into structured editorial prose with drop caps,
 * dialogue highlights, and interactive glossary annotations.
 */
function FormattedNarrative({
  content,
  fontSize,
}: {
  content: string;
  fontSize: 'sm' | 'base' | 'lg';
}) {
  const paragraphs = content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const fontClasses = {
    sm: 'text-xs sm:text-sm leading-relaxed',
    base: 'text-sm sm:text-base leading-relaxed',
    lg: 'text-base sm:text-lg leading-loose',
  };

  return (
    <div className={`space-y-4 sm:space-y-5 text-[#f4e7cd]/90 ${fontClasses[fontSize]}`}>
      {paragraphs.map((p, idx) => {
        // Check if paragraph is a dialogue or quotation
        const isQuoteOrDialogue =
          p.startsWith('"') ||
          p.startsWith('“') ||
          p.startsWith('\'') ||
          p.includes(':"') ||
          p.includes(':“');

        if (isQuoteOrDialogue) {
          return (
            <div
              key={idx}
              className="my-3.5 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-white/[0.04] via-[#140e08] to-transparent border-l-4 border-[#dedf42] space-y-1.5 shadow-sm"
            >
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#dedf42] uppercase tracking-wider font-bold">
                <Quote className="w-3 h-3 text-[#dedf42]" />
                <span>Sabda / Dialog Lakon</span>
              </div>
              <blockquote className="font-serif italic text-white text-justify leading-relaxed">
                {renderEnrichedNarrative(p)}
              </blockquote>
            </div>
          );
        }

        // First paragraph has an elegant decorative drop cap
        if (idx === 0 && p.length > 20) {
          const firstLetter = p.charAt(0);
          const restText = p.slice(1);

          return (
            <p key={idx} className="text-justify leading-relaxed">
              <span className="float-left mr-3 mt-1 font-serif text-3xl sm:text-4xl font-bold text-[#dedf42] leading-none px-2.5 py-1.5 rounded-lg bg-white/[0.06] border border-white/15 select-none shadow-sm">
                {firstLetter}
              </span>
              {renderEnrichedNarrative(restText)}
            </p>
          );
        }

        // Standard narrative paragraph with glossary terms
        return (
          <p key={idx} className="text-justify leading-relaxed">
            {renderEnrichedNarrative(p)}
          </p>
        );
      })}
    </div>
  );
}

export function StoryReader({
  story,
  onBackToCatalog,
  onSelectStory,
}: StoryReaderProps) {
  const [copiedQuote, setCopiedQuote] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [showCastSheet, setShowCastSheet] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeActTab, setActiveActTab] = useState<number | 'all'>('all');
  const [scrollProgress, setScrollProgress] = useState(0);

  // ── Audio Text-to-Speech & Gamelan BGM State ──
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
  const [isPausedTTS, setIsPausedTTS] = useState(false);
  const [bgmActive, setBgmActive] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<0.75 | 1.0 | 1.25>(1.0);
  const audioEngineRef = useRef<GamelanAudioEngine | null>(null);

  // ── Interactive Quiz State ──
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Reset quiz when story changes
  useEffect(() => {
    setSelectedAnswer(null);
    setQuizSubmitted(false);
  }, [story.slug]);

  // Scroll to top immediately when story opens or changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [story.slug]);

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

  // ── Helper to start speech synthesis with explicit rate ──
  const startSpeaking = (rate: number = playbackSpeed) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Fitur Text-to-Speech tidak didukung oleh peramban ini.');
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();

    const spokenText = `${story.title}. Wiracarita ${story.categoryLabel}. Tokoh utama: ${story.mainCharacter}. ${story.characterRole}. ${story.sulukOpening}. ${story.acts.map((a) => `${a.actTitle}. ${a.content}`).join(' ')}. Pitutur Luhur: ${story.pituturLuhur.javaneseQuote}. ${story.pituturLuhur.translation}. ${story.pituturLuhur.moralLesson}`;

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = 'id-ID';
    utterance.rate = rate;
    utterance.pitch = 0.92;

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

    startSpeaking(playbackSpeed);
  };

  // ── Change narration speed dynamically in real-time ──
  const handleSetSpeed = (newSpeed: 0.75 | 1.0 | 1.25) => {
    setPlaybackSpeed(newSpeed);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && isPlayingTTS && !isPausedTTS) {
      startSpeaking(newSpeed);
    }
  };

  const handleStopTTS = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingTTS(false);
      setIsPausedTTS(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (audioEngineRef.current) {
        audioEngineRef.current.stopBGM();
      }
    };
  }, []);

  const handleShareQuote = () => {
    const quoteText = `"${story.pituturLuhur.javaneseQuote}"

Artinya: ${story.pituturLuhur.translation}
Hikmah: ${story.pituturLuhur.moralLesson}

— Mutiara Falsafah ${story.title} | Wayang Jawi`;

    navigator.clipboard.writeText(quoteText);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 3000);
  };

  // Other stories for the bottom explore grid & smart recommendation
  const currentIndex = WAYANG_STORIES.findIndex((s) => s.id === story.id);
  const prevStory = currentIndex > 0 ? WAYANG_STORIES[currentIndex - 1] : null;
  const nextStory = currentIndex < WAYANG_STORIES.length - 1 ? WAYANG_STORIES[currentIndex + 1] : null;
  const otherStories = WAYANG_STORIES.filter((s) => s.id !== story.id);
  const recommendedStories = otherStories.slice(0, 3);

  const currentQuiz = STORY_QUIZZES[story.id] || STORY_QUIZZES['dewa-ruci'];

  const visibleActs =
    activeActTab === 'all'
      ? story.acts
      : story.acts.filter((a) => a.actNumber === activeActTab);

  return (
    <div
      className={`relative w-full ${
        focusMode ? 'max-w-5xl mx-auto' : 'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16'
      } space-y-10 sm:space-y-14 animate-fadeSlideUp transition-all duration-300 pt-20 sm:pt-24 pb-24`}
    >
      {/* ── 1. Theatrical Shimmer Progress Accent Bar ── */}
      <motion.div
        key={`shimmer-${story.slug}`}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{
          scaleX: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.25, delay: 0.3, ease: 'easeOut' },
        }}
        style={{ transformOrigin: 'left' }}
        className="fixed top-0 inset-x-0 h-[2.5px] z-[95] pointer-events-none bg-gradient-to-r from-transparent via-[#dedf42] to-transparent shadow-[0_0_14px_#dedf42]"
      />

      {/* ── Top Floating Reading Progress Bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/40">
        <div
          className="h-full bg-gradient-to-r from-[#d9a441] via-[#dedf42] to-[#d9a441] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ── 2. Top Interactive Audio Storytelling & Reader Toolbar ── */}
      <motion.div
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="p-3.5 sm:p-4 rounded-2xl bg-[#080808]/95 backdrop-blur-xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.9)] flex flex-wrap items-center justify-between gap-3 sm:gap-4"
      >
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBackToCatalog}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-black hover:bg-[#dedf42] border border-white/15 text-xs font-sans font-bold text-[#f4e7cd] hover:text-black transition-all cursor-pointer shadow-md active:scale-95 uppercase tracking-wider"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Pustaka Kisah</span>
          </button>

          {/* Dynamic Waveform Visualizer when audio/narration is live */}
          {(isPlayingTTS || bgmActive) && (
            <div className="flex items-center gap-2 bg-[#dedf42]/10 border border-[#dedf42]/30 px-3 py-1.5 rounded-full">
              <div className="flex items-end gap-1 h-3.5">
                <span className="w-1 bg-[#dedf42] h-2.5 animate-bounce rounded-full" />
                <span className="w-1 bg-[#dedf42] h-3.5 animate-bounce [animation-delay:0.15s] rounded-full" />
                <span className="w-1 bg-[#dedf42] h-1.5 animate-bounce [animation-delay:0.3s] rounded-full" />
                <span className="w-1 bg-[#dedf42] h-3 animate-bounce [animation-delay:0.45s] rounded-full" />
              </div>
              <span className="text-[10px] font-mono text-[#dedf42] uppercase tracking-wider font-bold hidden sm:inline">
                {isPlayingTTS ? 'Narasi Bersuara Aktif' : 'Iringan Gamelan Aktif'}
              </span>
            </div>
          )}
        </div>

        {/* Right Audio & Reader Tools */}
        <div className="flex items-center gap-2 flex-wrap ml-auto">
          {/* Audio TTS Narration Player */}
          <div className="flex items-center bg-black border border-white/15 rounded-full p-1 text-xs">
            <button
              type="button"
              onClick={handleToggleTTS}
              className={`px-3.5 py-1.5 rounded-full flex items-center gap-2 font-sans font-bold uppercase tracking-wider text-[11px] transition-all cursor-pointer ${
                isPlayingTTS
                  ? 'bg-[#dedf42] text-black shadow-md'
                  : 'text-[#f4e7cd] hover:bg-white/10 hover:text-[#dedf42]'
              }`}
              title="Putar suara narator pewayangan membacakan naskah ini"
            >
              {isPlayingTTS && !isPausedTTS ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-black" />
                  <span>Jeda Narasi</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Dengarkan Narasi</span>
                </>
              )}
            </button>

            {isPlayingTTS && (
              <button
                type="button"
                onClick={handleStopTTS}
                className="p-1.5 text-red-400 hover:text-red-300 hover:bg-white/10 rounded-full cursor-pointer ml-1"
                title="Hentikan Narasi Suara"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Speed Selector (0.75x Perlambat, 1.0x Normal, 1.25x Percepat) */}
          <div className="flex items-center bg-black border border-white/15 rounded-full p-1 text-[10px] font-mono">
            <button
              type="button"
              onClick={() => handleSetSpeed(0.75)}
              className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                playbackSpeed === 0.75 ? 'bg-[#dedf42] text-black font-bold shadow-sm' : 'text-[#f4e7cd]/60 hover:text-white'
              }`}
              title="Perlambat suara narasi (0.75x)"
            >
              0.75x
            </button>
            <button
              type="button"
              onClick={() => handleSetSpeed(1.0)}
              className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                playbackSpeed === 1.0 ? 'bg-[#dedf42] text-black font-bold shadow-sm' : 'text-[#f4e7cd]/60 hover:text-white'
              }`}
              title="Kecepatan narasi standar normal (1.0x)"
            >
              1.0x
            </button>
            <button
              type="button"
              onClick={() => handleSetSpeed(1.25)}
              className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                playbackSpeed === 1.25 ? 'bg-[#dedf42] text-black font-bold shadow-sm' : 'text-[#f4e7cd]/60 hover:text-white'
              }`}
              title="Percepat suara narasi (1.25x)"
            >
              1.25x
            </button>
          </div>

          {/* Synthesized Gamelan BGM Toggle */}
          <button
            type="button"
            onClick={handleToggleBGM}
            className={`px-3 py-1.5 rounded-full border text-xs font-sans font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              bgmActive
                ? 'bg-[#dedf42] border-[#dedf42] text-black shadow-[0_0_15px_rgba(222,223,66,0.3)]'
                : 'bg-black border-white/15 text-[#f4e7cd]/80 hover:text-white hover:border-white/30'
            }`}
            title="Nyalakan/matikan alunan instrumen gamelan klasik pelog"
          >
            <Music className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{bgmActive ? 'Gamelan: Hidup' : 'Gamelan Latar'}</span>
          </button>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={handleToggleBookmark}
            className={`p-2 rounded-full border text-xs transition-all cursor-pointer ${
              isBookmarked
                ? 'bg-[#dedf42] text-black border-[#dedf42] shadow-md'
                : 'bg-black border-white/15 text-[#f4e7cd]/70 hover:text-[#dedf42]'
            }`}
            title={isBookmarked ? 'Hapus dari Tersimpan' : 'Simpan Lakon Ini'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-black' : ''}`} />
          </button>

          {/* Font Size Adjuster */}
          <div className="hidden sm:flex items-center bg-black border border-white/15 rounded-full p-1 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setFontSize('sm')}
              className={`px-2 py-0.5 rounded-full ${fontSize === 'sm' ? 'bg-[#dedf42] text-black font-bold' : 'text-[#f4e7cd]/60 hover:text-white cursor-pointer'}`}
              title="Perkecil ukuran font"
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => setFontSize('base')}
              className={`px-2 py-0.5 rounded-full ${fontSize === 'base' ? 'bg-[#dedf42] text-black font-bold' : 'text-[#f4e7cd]/60 hover:text-white cursor-pointer'}`}
              title="Ukuran font normal"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontSize('lg')}
              className={`px-2 py-0.5 rounded-full ${fontSize === 'lg' ? 'bg-[#dedf42] text-black font-bold' : 'text-[#f4e7cd]/60 hover:text-white cursor-pointer'}`}
              title="Perbesar ukuran font"
            >
              A+
            </button>
          </div>

          {/* Focus Mode Toggle */}
          <button
            type="button"
            onClick={() => setFocusMode(!focusMode)}
            className={`hidden sm:flex items-center p-2 rounded-full border text-xs font-mono transition-all cursor-pointer ${
              focusMode
                ? 'bg-[#dedf42] text-black border-[#dedf42]'
                : 'bg-black border-white/15 text-[#f4e7cd]/70 hover:text-white'
            }`}
            title={focusMode ? 'Kembalikan Tampilan Normal' : 'Mode Baca Fokus Layar Penuh'}
          >
            {focusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </motion.div>

      {/* ── 4. Main Single Column Manuscript Container ── */}
      <article className="relative bg-[#070504] border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.95)] p-6 sm:p-10 md:p-14 lg:p-16 space-y-10 sm:space-y-12 overflow-visible">
        {/* ── Story Header: Cover Portrait & Title Dossier (Horizontal Split) ── */}
        <header className="relative z-10 space-y-6 pb-8 border-b border-white/10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
            {/* Tokoh Visual Portrait (Square with Glow Aura) */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden bg-black border border-white/15 shrink-0 shadow-2xl flex items-center justify-center p-3">
              {/* Radial Aura */}
              <div className="absolute inset-4 rounded-full bg-[radial-gradient(circle_at_center,rgba(222,223,66,0.18)_0%,transparent_70%)] pointer-events-none" />

              <Image
                src={story.coverImage}
                alt={story.title}
                fill
                className="object-contain p-3 drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)]"
                sizes="(max-width: 768px) 160px, 192px"
                priority
              />
            </div>

            {/* Title & Metadata */}
            <div className="space-y-3.5 flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                <span className="px-3.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#dedf42] text-black uppercase tracking-wider shadow-sm">
                  {story.categoryLabel}
                </span>
                <span className="text-xs font-mono text-[#f4e7cd]/75 flex items-center gap-1 bg-black px-3 py-0.5 rounded-full border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-[#dedf42]" />
                  <span>{story.readingTime}</span>
                </span>
                <span className="text-xs font-mono text-[#f4e7cd]/75 bg-black px-3 py-0.5 rounded-full border border-white/10">
                  {story.acts.length} Babak Pedalangan
                </span>
              </div>

              <div>
                <h1 className="font-serif italic font-bold text-3xl sm:text-4xl md:text-5xl text-[#dedf42] leading-[1.08] tracking-tight">
                  {story.title}
                </h1>

                {story.javaneseTitle && (
                  <p className="font-serif text-sm text-[#dedf42]/80 tracking-widest mt-1.5 font-medium">
                    {story.javaneseTitle}
                  </p>
                )}
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#f4e7cd] font-medium leading-relaxed">
                {story.tagline}
              </p>

              {/* Tokoh Utama & Pendukung */}
              <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs font-mono text-[#f4e7cd]/80">
                <span className="px-3 py-1 rounded-xl bg-black border border-white/15">
                  <strong className="text-[#dedf42]">{story.mainCharacter}</strong> ({story.characterRole})
                </span>
                {story.supportingCharacters.length > 0 && (
                  <span className="text-[11px] text-[#f4e7cd]/70 bg-black px-2.5 py-1 rounded-xl border border-white/5">
                    Didukung: {story.supportingCharacters.join(', ')}
                  </span>
                )}
                {story.castProfiles && story.castProfiles.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowCastSheet(!showCastSheet)}
                    className="text-[#dedf42] hover:underline text-[11px] font-mono inline-flex items-center gap-1 cursor-pointer ml-1 font-semibold"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>{showCastSheet ? 'Tutup Profil Tokoh' : 'Lihat Profil Tokoh'}</span>
                  </button>
                )}
                <Link
                  href={`/tokoh/${story.tokohSlug}`}
                  className="text-[#dedf42] hover:underline text-[11px] font-mono inline-flex items-center gap-1 ml-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Galeri Tokoh</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Interactive Tooltip Hint Badge */}
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-[#dedf42] pt-3 border-t border-white/10">
            <BookOpen className="w-4 h-4 text-[#dedf42] shrink-0" />
            <span>Arahkan kursor atau sentuh istilah bergaris bawah untuk melihat catatan glosarium pedalangan Jawa</span>
          </div>
        </header>

        {/* ── Optional Cast Dossier Panel ── */}
        {showCastSheet && story.castProfiles && story.castProfiles.length > 0 && (
          <section className="p-5 sm:p-6 rounded-2xl bg-black border border-white/15 space-y-4 animate-fadeSlideUp shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="font-serif italic font-bold text-base text-[#dedf42] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#dedf42]" />
                Daftar & Profil Tokoh Lakon
              </h3>
              <button
                type="button"
                onClick={() => setShowCastSheet(false)}
                className="text-xs font-mono text-[#f4e7cd]/60 hover:text-white cursor-pointer"
              >
                Tutup
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {story.castProfiles.map((cast, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                  <div className="flex items-baseline justify-between gap-1">
                    <h4 className="font-serif text-[#dedf42] text-sm font-bold">{cast.name}</h4>
                    <span className="text-[10px] font-mono text-[#dedf42]/70">{cast.role}</span>
                  </div>
                  <p className="text-[11px] text-[#f4e7cd]/80 leading-relaxed font-sans">{cast.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Cultural Significance Highlight ── */}
        {story.culturalSignificance && (
          <section className="p-5 sm:p-6 rounded-2xl bg-black/60 border border-white/10 space-y-1.5 text-xs sm:text-sm">
            <span className="font-mono text-[10px] text-[#dedf42] uppercase tracking-widest block font-bold">
              MAKNA KULTURAL & NILAI SEJARAH
            </span>
            <p className="font-sans text-[#f4e7cd]/85 leading-relaxed text-justify">
              {story.culturalSignificance}
            </p>
          </section>
        )}

        {/* ── Sulukan Pembuka ── */}
        <section className="relative z-10 p-6 sm:p-8 rounded-2xl bg-black border border-white/15 shadow-md">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#dedf42] font-bold block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#dedf42]" />
              SULUKAN PEMBUKA TABIR LAKON
            </span>
            <p className="font-serif italic text-base sm:text-xl text-white leading-relaxed">
              {renderEnrichedNarrative(story.sulukOpening)}
            </p>
          </div>
        </section>

        {/* ── Act Quick Switcher Tabs ── */}
        <div className="flex items-center justify-center gap-2 flex-wrap border-b border-white/10 pb-4">
          <button
            type="button"
            onClick={() => setActiveActTab('all')}
            className={`px-4 py-2 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeActTab === 'all'
                ? 'bg-[#dedf42] text-black shadow-[0_0_15px_rgba(222,223,66,0.3)]'
                : 'bg-black border border-white/10 text-[#f4e7cd]/70 hover:text-white'
            }`}
          >
            Semua Babak ({story.acts.length})
          </button>
          {story.acts.map((act) => (
            <button
              key={act.actNumber}
              type="button"
              onClick={() => setActiveActTab(act.actNumber)}
              className={`px-4 py-2 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeActTab === act.actNumber
                  ? 'bg-[#dedf42] text-black shadow-[0_0_15px_rgba(222,223,66,0.3)]'
                  : 'bg-black border border-white/10 text-[#f4e7cd]/70 hover:text-white'
              }`}
            >
              Babak {act.actNumber}
            </button>
          ))}
        </div>

        {/* ── Structured Acts (Babak I, II, III) with Editorial Prose & Dialogues ── */}
        <div className="relative z-10 space-y-8">
          {visibleActs.map((act) => (
            <section
              key={act.actNumber}
              className="p-6 sm:p-8 md:p-10 rounded-2xl bg-black border border-white/10 space-y-5 shadow-lg hover:border-white/20 transition-colors"
            >
              {/* Act Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#dedf42] text-black font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                    {act.actNumber}
                  </span>
                  <h2 className="font-serif italic font-bold text-xl sm:text-2xl text-[#dedf42]">
                    {act.actTitle}
                  </h2>
                </div>

                {act.sceneSetting && (
                  <span className="text-[11px] font-mono text-[#f4e7cd]/75 bg-black px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5 self-start sm:self-auto">
                    <MapPin className="w-3.5 h-3.5 text-[#dedf42]" />
                    <span>{act.sceneSetting}</span>
                  </span>
                )}
              </div>

              {/* Act Narrative Prose with Drop-Caps & Dialogue Cards */}
              <FormattedNarrative content={act.content} fontSize={fontSize} />
            </section>
          ))}
        </div>

        {/* ── Pitutur Luhur (Falsafah Jawa) ── */}
        <section className="relative z-10 p-6 sm:p-10 rounded-2xl bg-black border border-white/15 space-y-5 overflow-hidden shadow-lg">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <h3 className="font-serif italic font-bold text-lg sm:text-xl uppercase tracking-wider text-[#dedf42]">
              Pitutur Luhur Pedalangan Jawa
            </h3>
            <span className="text-xs font-mono text-[#dedf42] font-semibold">Falsafah Batin</span>
          </div>

          <div className="space-y-4">
            <blockquote className="font-serif italic font-bold text-xl sm:text-2xl md:text-3xl text-white leading-snug">
              &ldquo;{renderEnrichedNarrative(story.pituturLuhur.javaneseQuote)}&rdquo;
            </blockquote>

            <p className="font-sans text-xs sm:text-sm md:text-base text-[#dedf42] font-semibold">
              <strong>Artinya:</strong> {story.pituturLuhur.translation}
            </p>

            <p className="font-sans text-xs sm:text-sm md:text-base text-[#f4e7cd]/90 leading-relaxed pt-3 border-t border-white/10 text-justify">
              {renderEnrichedNarrative(story.pituturLuhur.moralLesson)}
            </p>

            {/* Shareable Quote Card Trigger */}
            <div className="pt-2 flex items-center justify-end">
              <button
                type="button"
                onClick={handleShareQuote}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-[#dedf42] hover:text-black border border-white/15 text-xs font-sans font-bold text-[#dedf42] transition-all cursor-pointer"
              >
                {copiedQuote ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedQuote ? 'Kutipan Mutiara Tersalin!' : 'Salin Mutiara Falsafah Ini'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* ── 5. Interactive Quiz & Reflection (Anti-Bosan Feature) ── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#140e08] via-[#0d0905] to-[#140e08] border border-white/15 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#dedf42]" />
              <h3 className="font-serif font-bold text-lg text-[#dedf42]">
                Kuis Kilat & Refleksi Pemahaman Lakon
              </h3>
            </div>
            <span className="text-xs font-mono text-[#dedf42] uppercase tracking-wider font-bold">
              ★ Tantangan Budaya
            </span>
          </div>

          <div className="space-y-4">
            <p className="font-sans text-sm sm:text-base font-semibold text-white">
              {currentQuiz.question}
            </p>

            <div className="space-y-2.5">
              {currentQuiz.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === currentQuiz.correctIndex;
                let btnStyle = 'bg-black/70 border-white/15 hover:border-[#dedf42] text-[#f4e7cd]/90';

                if (quizSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-400 text-white font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-950/80 border-rose-400 text-white line-through';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-[#dedf42] text-black font-bold border-[#dedf42]';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (!quizSubmitted) {
                        setSelectedAnswer(idx);
                        setQuizSubmitted(true);
                      }
                    }}
                    className={`w-full p-3.5 sm:p-4 rounded-xl border text-left text-xs sm:text-sm font-sans transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    <span className="font-mono text-xs opacity-60">Pilihan {String.fromCharCode(65 + idx)}</span>
                  </button>
                );
              })}
            </div>

            {quizSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border text-xs sm:text-sm font-sans leading-relaxed ${
                  selectedAnswer === currentQuiz.correctIndex
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                    : 'bg-amber-950/60 border-amber-500/40 text-amber-200'
                }`}
              >
                <p className="font-bold mb-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#dedf42]" />
                  <span>
                    {selectedAnswer === currentQuiz.correctIndex
                      ? 'Tepat Sekali! Anda Memahami Hakikat Lakon Ini.'
                      : 'Refleksi Sastra Pedalangan:'}
                  </span>
                </p>
                <p>{currentQuiz.explanation}</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* ── Footer Actions Bar: Catalog Navigation ── */}
        <footer className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-end">
          <button
            type="button"
            onClick={onBackToCatalog}
            className="text-xs font-sans font-bold text-[#dedf42] hover:underline flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
          >
            <span>Semua Lakon</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>
      </article>

      {/* ── 6. Smart Recommendations: "Lakon Pilihan Selanjutnya Untuk Anda" ── */}
      <section className="p-6 sm:p-8 rounded-3xl bg-[#090705] border border-white/10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <p className="text-[10px] font-mono text-[#dedf42] uppercase tracking-widest font-bold">
              REKOMENDASI KISAH TERKAIT
            </p>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-bold mt-1">
              Lanjutkan Kembara Wiracarita Anda
            </h3>
          </div>
          <button
            type="button"
            onClick={onBackToCatalog}
            className="text-xs font-sans font-bold text-[#dedf42] hover:underline cursor-pointer uppercase tracking-wider"
          >
            Lihat Semua Lakon →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recommendedStories.map((rec) => (
            <button
              key={rec.id}
              type="button"
              onClick={() => {
                onSelectStory(rec);
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="p-4 rounded-2xl bg-black/60 hover:bg-[#120d08] border border-white/10 hover:border-[#dedf42] transition-all text-left space-y-3 cursor-pointer group shadow-sm"
            >
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black">
                <Image
                  src={rec.coverImage}
                  alt={rec.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 text-[9px] font-mono text-[#dedf42] bg-black/80 px-2 py-0.5 rounded border border-white/10">
                  {rec.readingTime}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-mono text-[#dedf42] uppercase">{rec.mainCharacter}</p>
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#f4e7cd] group-hover:text-[#dedf42] transition-colors leading-snug line-clamp-1">
                  {rec.title}
                </h4>
                <p className="text-[11px] text-[#f4e7cd]/65 line-clamp-2 mt-1 leading-relaxed">{rec.tagline}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── Previous & Next Story Navigation Switcher ── */}
      <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        {prevStory ? (
          <button
            type="button"
            onClick={() => onSelectStory(prevStory)}
            className="p-5 rounded-3xl bg-[#0d0906] border border-white/10 hover:border-[#dedf42] text-left space-y-1.5 transition-all group cursor-pointer shadow-md"
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
            className="p-5 rounded-3xl bg-[#0d0906] border border-white/10 hover:border-[#dedf42] text-right space-y-1.5 transition-all group cursor-pointer sm:ml-auto w-full shadow-md"
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
