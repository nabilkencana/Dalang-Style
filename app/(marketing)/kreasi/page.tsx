'use client';

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Send,
  Download,
  Copy,
  Wand2,
  Check,
  Flame,
  ArrowRight,
  ExternalLink,
  Bot,
  User,
  Trash2,
  Swords,
  Scroll,
  Maximize2,
  X,
  Volume2,
  RotateCcw,
  Sparkles,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  interpretUserPrompt,
  getWayangImageUrl,
  resolveWayangImage,
  type ChatMessage,
  type WayangPreset,
} from '@/lib/wayang-ai';
import { GamelanAudioEngine } from '@/lib/wayang/audio';
import { ThinkingTool } from '@/components/ui/thinking-tool';
import { ImageGeneration } from '@/components/ui/ai-chat-image-generation-1';

const QUICK_INSPIRATIONS = [
  { label: '🦅 Ksatria Garuda Emas', prompt: 'Ksatria sakti bertubuh tegap dengan sayap garuda emas dan busur panah bercahaya' },
  { label: '🐉 Pendekar Sisik Naga', prompt: 'Pendekar gagah berzirah naga emas memegang tombak trisula sakti' },
  { label: '🐯 Ksatria Cakar Harimau', prompt: 'Ksatria rimba perkasa dengan cakar harimau emas dan kain batik kampuh' },
  { label: '⚡ Pemanah Kilat Mahameru', prompt: 'Ksatria pemanah muda bermahkota makuta dengan aura sambaran petir' },
  { label: '🌸 Putri Rembulan Cundrik', prompt: 'Putri keraton nan anggun bermahkota permata memegang keris cundrik pusaka' },
  { label: '🪔 Pamong Semar Bijak', prompt: 'Punakawan tua bijaksana bersenyum tulus dengan ajaran urip iku urup' },
];

interface SpotlightCharacter {
  name: string;
  role: string;
  imageUrl: string;
  weapon: string;
  philosophy: string;
  traits: string[];
  promptRecipe: string;
}

function KreasiWayangContent() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'empu',
      text:
        'Rahayu, sugeng rawuh di Studio Cipta Wayang. Saya adalah **Sang Empu AI**. Ketikkan konsep tokoh wayang apa pun yang ada di imajinasimu — mulai dari watak, pusaka, hingga ornamen mahkotanya. Sang Empu akan menatah wujud dan mengurai filosofinya untukmu.',
      timestamp: 'Baru saja',
    },
  ]);

  const searchParams = useSearchParams();
  const initialPromptParam = searchParams.get('prompt') || '';

  const [inputText, setInputText] = useState(initialPromptParam);
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingStep, setThinkingStep] = useState('Menimbang watak sukma & kasta satria...');
  const [thinkingStageIndex, setThinkingStageIndex] = useState(1);
  const [spotlight, setSpotlight] = useState<SpotlightCharacter | null>(null);
  const [generatedCreations, setGeneratedCreations] = useState<WayangPreset[]>([]);
  const [copiedPhilosophy, setCopiedPhilosophy] = useState(false);

  // ── Canvas Modal & Interactive Stage State ──
  const [isCanvasModalOpen, setIsCanvasModalOpen] = useState(false);
  const [canvasFlipped, setCanvasFlipped] = useState(false);
  const [canvasZoom, setCanvasZoom] = useState(1);
  const [canvasBlencong, setCanvasBlencong] = useState(true);
  const [audioFeedback, setAudioFeedback] = useState('');

  const chatScrollContainerRef = useRef<HTMLDivElement | null>(null);
  const spotlightSectionRef = useRef<HTMLDivElement | null>(null);
  const audioEngineRef = useRef<GamelanAudioEngine | null>(null);

  const getAudio = () => {
    if (!audioEngineRef.current) {
      audioEngineRef.current = new GamelanAudioEngine();
    }
    return audioEngineRef.current;
  };

  const playSoundEffect = (type: 'cempala' | 'gong' | 'kenong') => {
    try {
      const audio = getAudio();
      if (type === 'cempala') {
        audio.playCempala();
        setAudioFeedback('Ketukan Cempala');
      } else if (type === 'gong') {
        audio.playGong();
        setAudioFeedback('Gong Ageng');
      } else if (type === 'kenong') {
        audio.playKenong(440);
        setAudioFeedback('Suara Kenong');
      }
      setTimeout(() => setAudioFeedback(''), 1500);
    } catch {}
  };

  // Open Canvas Modal
  const openCanvasModal = useCallback((char?: SpotlightCharacter | null) => {
    if (char) {
      setSpotlight(char);
    }
    setCanvasFlipped(false);
    setCanvasZoom(1);
    setIsCanvasModalOpen(true);
    playSoundEffect('cempala');
  }, []);

  // Auto-scroll ONLY the chat box internally — NEVER jump or scroll the browser window
  const scrollToBottom = () => {
    if (chatScrollContainerRef.current) {
      chatScrollContainerRef.current.scrollTo({
        top: chatScrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, thinkingStep]);

  const handleSendMessage = useCallback(
    async (textToSend?: string) => {
      const prompt = (textToSend ?? inputText).trim();
      if (!prompt || isTyping) return;

      const userMsgId = `user-${Date.now()}`;
      const newUserMsg: ChatMessage = {
        id: userMsgId,
        sender: 'user',
        text: prompt,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, newUserMsg]);
      if (!textToSend) setInputText('');
      
      // Start thinking animation
      setIsTyping(true);
      setThinkingStageIndex(1);
      setThinkingStep(`Sang Empu sedang menimbang watak sukma dan kasta ksatria dari konsep "${prompt}"...`);

      // Stage progression timers for live visual feedback
      const stage2Timer = setTimeout(() => {
        setThinkingStageIndex(2);
        setThinkingStep('Memilih pusaka sakti dan meramu falsafah batin yang adiluhung...');
      }, 750);

      const stage3Timer = setTimeout(() => {
        setThinkingStageIndex(3);
        setThinkingStep('Menatah sungging wujud wayang kulit beraksen emas prada di atas kain kelir...');
      }, 1500);

      // Minimum duration ~2.2s so the user visibly sees the thinking shimmer animation and progression
      const minThinkingDelay = new Promise((resolve) => setTimeout(resolve, 2200));

      // Interpret concept via API or local fallback
      let interpretation = interpretUserPrompt(prompt);
      let generatedImageUrl = resolveWayangImage(prompt, interpretation.characterName);

      try {
        const [apiRes] = await Promise.all([
          fetch('/api/kreasi-wayang', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
          }).catch(() => null),
          minThinkingDelay,
        ]);

        if (apiRes && apiRes.ok) {
          const data = await apiRes.json();
          if (data && data.characterName) {
            interpretation = {
              characterName: data.characterName,
              roleTitle: data.roleTitle,
              philosophy: data.philosophy,
              weaponName: data.weaponName,
              traits: Array.isArray(data.traits) ? data.traits : ['Luhur Budi', 'Waspada'],
              greeting: data.greeting || `Karakter **${data.characterName}** berhasil ditatah oleh Sang Empu AI.`,
              compiledPrompt: data.compiledPrompt || prompt,
              imageUrl: resolveWayangImage(data.compiledPrompt || prompt, data.characterName),
            };
            generatedImageUrl = interpretation.imageUrl;
          }
        }
      } catch {
        await minThinkingDelay;
      } finally {
        clearTimeout(stage2Timer);
        clearTimeout(stage3Timer);
      }

      const reasoningText = `Menafsirkan konsep ksatria "${interpretation.characterName}": Menimbang watak "${interpretation.roleTitle}", memilih pusaka ${interpretation.weaponName}, meramu falsafah batin "${interpretation.philosophy}", serta menatah ornamen tatah sungging emas prada beresolusi tinggi di atas kain kelir.`;

      const empuMsg: ChatMessage = {
        id: `empu-${Date.now()}`,
        sender: 'empu',
        text: interpretation.greeting,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        characterName: interpretation.characterName,
        roleTitle: interpretation.roleTitle,
        imageUrl: generatedImageUrl,
        weaponName: interpretation.weaponName,
        philosophy: interpretation.philosophy,
        traits: interpretation.traits,
        promptRecipe: interpretation.compiledPrompt,
        reasoning: reasoningText,
      };

      setMessages((prev) => [...prev, empuMsg]);
      setIsTyping(false);

      // Update spotlight canvas with newly created character
      const newSpotlight: SpotlightCharacter = {
        name: interpretation.characterName,
        role: interpretation.roleTitle,
        imageUrl: generatedImageUrl,
        weapon: interpretation.weaponName || 'Pusaka Sakti',
        philosophy: interpretation.philosophy,
        traits: interpretation.traits,
        promptRecipe: interpretation.compiledPrompt,
      };
      setSpotlight(newSpotlight);

      // Record in purely AI-generated creations history
      setGeneratedCreations((prev) => [
        {
          id: `gen-${Date.now()}`,
          title: interpretation.characterName,
          role: interpretation.roleTitle,
          archetype: 'AI Generation',
          weapon: interpretation.weaponName || '',
          costume: '',
          visualStyle: 'AI Cipta',
          prompt: interpretation.compiledPrompt,
          image: generatedImageUrl,
          traits: interpretation.traits || [],
        },
        ...prev,
      ]);

      // Play soft gong chime for creation completion
      playSoundEffect('gong');
    },
    [inputText, isTyping]
  );

  // Apply generated creation to spotlight & open canvas
  const handleApplyPreset = useCallback((preset: WayangPreset) => {
    const char: SpotlightCharacter = {
      name: preset.title,
      role: preset.role,
      imageUrl: preset.image,
      weapon: preset.weapon || 'Pusaka Sakti',
      philosophy: 'Mahakarya tatahan Sang Empu AI.',
      traits: preset.traits,
      promptRecipe: preset.prompt,
    };
    setSpotlight(char);
    openCanvasModal(char);
  }, [openCanvasModal]);

  // Clear chat history
  const handleClearChat = useCallback(() => {
    setMessages([
      {
        id: 'msg-welcome',
        sender: 'empu',
        text:
          'Rahayu. Riwayat obrolan telah dibersihkan. Silakan ketikkan konsep tokoh baru yang ingin Anda tatah bersama Sang Empu AI.',
        timestamp: 'Baru saja',
      },
    ]);
  }, []);

  return (
    <div
      className="relative min-h-screen text-black overflow-x-hidden pt-28 pb-20 selection:bg-black selection:text-[#dedf42] font-sans"
      style={{
        background: 'radial-gradient(circle at 75% 20%, #e8e84d 0%, #dedf42 55%, #cfd033 100%)',
      }}
    >
      {/* ── Background Dot Matrix Pattern ── */}
      <div className="fixed inset-0 bg-repeat opacity-[0.04] pointer-events-none z-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-10">
        {/* ── Header Title ── */}
        <header className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="font-serif italic font-bold text-4xl sm:text-5xl lg:text-6xl text-[#050303] leading-[1.05] tracking-tight mb-4">
            Dialog Kreasi <span className="not-italic font-normal">Sang Empu</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-black/80 leading-relaxed">
            Ketikkan gagasan karaktermu secara bebas. Sang Empu kecerdasan buatan akan meracik nama ksatria berwibawa, filosofi batin, dan menatah visual wayang kulit flat leather resolusi tinggi.
          </p>
        </header>

        {/* ── MAIN STUDIO CONTAINER (High-Contrast Dark Kelir Stage) ── */}
        <div className="bg-[#0b0604]/96 text-[#f5ecd9] border-2 border-black rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.45)] p-5 sm:p-7 lg:p-9 backdrop-blur-2xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* ── LEFT PANEL: Chat Stream & Prompt Interface (7 cols) — Matched Height h-[720px] ── */}
            <div className="lg:col-span-7 flex flex-col h-[720px] bg-[#150c08] border border-[#d9a441]/30 rounded-2xl overflow-hidden shadow-inner">
              {/* Chat Header Bar */}
              <div className="p-4 bg-black/75 border-b border-[#d9a441]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#dedf42] text-black flex items-center justify-center shadow-[0_0_15px_rgba(222,223,66,0.3)]">
                    <Flame className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-sm sm:text-base text-[#f5ecd9]">
                      Sang Empu Cipta Wayang
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClearChat}
                  title="Bersihkan Percakapan"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#f5ecd9]/60 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Messages History — Internal scroll only */}
              <div ref={chatScrollContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3 items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                          isUser
                            ? 'bg-[#d9a441] text-black shadow-md'
                            : 'bg-black border border-[#dedf42]/40 text-[#dedf42]'
                        }`}
                      >
                        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>

                      {/* Bubble Container */}
                      <div
                        className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                          isUser
                            ? 'bg-[#d9a441] text-black font-medium rounded-tr-none'
                            : 'bg-[#1e130c] border border-[#d9a441]/25 text-[#f5ecd9] rounded-tl-none'
                        }`}
                      >
                        {/* Thinking Thought Component above message text if generated by Sang Empu */}
                        {!isUser && msg.imageUrl && (
                          <div className="mb-3 pb-2.5 border-b border-white/10">
                            <ThinkingTool
                              state="thought"
                              thoughtLabel="Nalar & Tatahan Sang Empu"
                              content={
                                msg.reasoning ||
                                `Sang Empu telah menimbang watak sukma "${msg.characterName || 'Tokoh Wayang'}", memilih pusaka sakti ${msg.weaponName || 'Pusaka Keraton'}, meramu falsafah batin "${msg.philosophy || 'Urip Iku Urup'}", serta menatah figur wayang kulit autentik Nusantara beraksen emas prada.`
                              }
                              defaultOpen={false}
                              className="text-xs"
                            />
                          </div>
                        )}

                        {/* Text Content */}
                        <div className="whitespace-pre-wrap">{msg.text}</div>

                        {/* If message generated a character image */}
                        {msg.imageUrl && (
                          <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-col gap-2.5">
                            <ImageGeneration
                              duration={2800}
                              startingText="Sang Empu menyiapkan kelir & bilah tatah..."
                              generatingText="Menatah wujud wayang kulit beraksen emas prada..."
                              completedText="Wayang kulit berhasil ditatah sempurna."
                              className="max-w-[280px] mx-auto"
                            >
                              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/85 border border-[#d9a441]/30 mx-auto group">
                                <Image
                                  src={msg.imageUrl}
                                  alt={msg.characterName || 'Wayang'}
                                  fill
                                  unoptimized
                                  className="object-contain p-2"
                                  sizes="280px"
                                />
                              </div>
                            </ImageGeneration>

                            {msg.characterName && (
                              <div className="flex items-center justify-between text-xs pt-1">
                                <span className="font-serif font-bold text-[#f2c76b]">
                                  {msg.characterName}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const charData: SpotlightCharacter = {
                                      name: msg.characterName || '',
                                      role: msg.roleTitle || '',
                                      imageUrl: msg.imageUrl || '',
                                      weapon: msg.weaponName || '',
                                      philosophy: msg.philosophy || '',
                                      traits: msg.traits || [],
                                      promptRecipe: msg.promptRecipe || '',
                                    };
                                    openCanvasModal(charData);
                                  }}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#dedf42] hover:bg-[#eae853] text-black text-[11px] font-mono font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                                >
                                  <Maximize2 className="w-3 h-3" />
                                  <span>Lihat di Canvas</span>
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        <span className={`block text-[10px] font-mono mt-1.5 ${isUser ? 'text-black/60 text-right' : 'text-[#f5ecd9]/40'}`}>
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Typing / Thinking Shimmer Indicator */}
                {isTyping && (
                  <div className="flex gap-3 items-start text-xs animate-fadeIn">
                    <div className="w-8 h-8 rounded-full bg-black border border-[#dedf42]/40 text-[#dedf42] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(222,223,66,0.3)]">
                      <Flame className="w-4 h-4 text-[#dedf42] animate-pulse" />
                    </div>
                    <div className="bg-[#1e130c] border border-[#d9a441]/35 p-4 rounded-2xl rounded-tl-none max-w-[85%] space-y-3 shadow-lg w-full">
                      <ThinkingTool
                        state="thinking"
                        thinkingLabel="Sang Empu Sedang Menalar & Menatah..."
                        content={thinkingStep}
                        defaultOpen={true}
                      />
                      <div className="flex items-center gap-2 pt-2 text-[11px] text-[#dedf42] font-mono border-t border-white/10">
                        <span className="w-2 h-2 rounded-full bg-[#dedf42] animate-ping" />
                        <span className="text-[#f5ecd9]/90 font-sans">
                          Tahap {thinkingStageIndex}/3: {thinkingStep}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Inspiration Chips */}
              <div className="p-2.5 bg-black/60 border-t border-[#d9a441]/15 overflow-x-auto flex gap-2 no-scrollbar">
                <span className="text-[10px] font-mono text-[#dedf42]/70 shrink-0 self-center uppercase px-1">
                  Inspirasi Cepat:
                </span>
                {QUICK_INSPIRATIONS.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(chip.prompt)}
                    className="whitespace-nowrap px-3 py-1 rounded-full bg-[#1e130c] hover:bg-[#d9a441] text-[#f5ecd9] hover:text-black border border-[#d9a441]/25 text-xs font-sans transition-all shrink-0"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div className="p-3.5 bg-black border-t border-[#d9a441]/30">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-2.5 items-center"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ceritakan wayang impianmu (cth: ksatria naga berkuku emas memegang panah halilintar)..."
                    disabled={isTyping}
                    className="flex-1 bg-[#150c08] border border-white/20 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#f5ecd9] placeholder-[#f5ecd9]/40 focus:outline-none focus:border-[#dedf42]"
                  />

                  <button
                    type="submit"
                    disabled={!inputText.trim() || isTyping}
                    className="p-3 rounded-xl bg-[#dedf42] hover:bg-[#c9ca35] text-black transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0 shadow-md"
                    title="Kirim Pesan"
                  >
                    <Send className="w-4 h-4 text-black" />
                  </button>
                </form>
              </div>
            </div>

            {/* ── RIGHT PANEL: Spotlight Canvas of Active Character (5 cols) — Matched Height h-[720px] ── */}
            <div
              ref={spotlightSectionRef}
              className="lg:col-span-5 bg-[#150c08] border border-[#d9a441]/30 rounded-2xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between h-[720px] overflow-y-auto [scrollbar-width:thin]"
            >
              <div className="flex items-center justify-between border-b border-[#d9a441]/20 pb-3">
                <div className="flex items-center gap-2 text-[#f2c76b]">
                  <Flame className="w-4 h-4 text-[#dedf42]" />
                  <span className="font-mono text-xs uppercase tracking-wider">Spotlight Kanvas Tokoh</span>
                </div>
                {spotlight && (
                  <button
                    type="button"
                    onClick={() => openCanvasModal(spotlight)}
                    className="text-[11px] font-mono text-[#dedf42] hover:underline flex items-center gap-1"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Perbesar</span>
                  </button>
                )}
              </div>

              {spotlight ? (
                <div className="flex-1 flex flex-col justify-between py-2 space-y-4">
                  {/* Large Image Viewport */}
                  <div
                    onClick={() => openCanvasModal(spotlight)}
                    className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/85 border border-[#d9a441]/35 flex items-center justify-center shadow-inner group cursor-pointer"
                  >
                    <Image
                      src={spotlight.imageUrl}
                      alt={spotlight.name}
                      fill
                      unoptimized
                      className="object-contain p-4 drop-shadow-[0_12px_30px_rgba(217,164,65,0.45)] transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 500px"
                      priority
                    />

                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
                      <span className="font-serif text-xs text-[#f2c76b] italic">
                        Klik untuk Buka di Canvas
                      </span>
                      <div className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#f5ecd9]">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Character Details Dossier */}
                  <div className="space-y-3 pt-1">
                    <div>
                      <h3 className="font-serif italic font-bold text-2xl text-[#f5ecd9]">{spotlight.name}</h3>
                      <p className="text-xs font-sans text-[#dedf42]">{spotlight.role}</p>
                    </div>

                    {/* Traits tags */}
                    {spotlight.traits && spotlight.traits.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {spotlight.traits.map((t, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#d9a441]/10 text-[#f2c76b] border border-[#d9a441]/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Weapon & Philosophy */}
                    <div className="bg-black/50 border border-white/10 rounded-xl p-3.5 space-y-2 text-xs">
                      <div className="flex items-start gap-2 text-[#f5ecd9]/85">
                        <Swords className="w-3.5 h-3.5 text-[#dedf42] shrink-0 mt-0.5" />
                        <span><strong>Pusaka:</strong> {spotlight.weapon}</span>
                      </div>

                      <div className="flex items-start gap-2 text-[#f5ecd9]/75 leading-relaxed">
                        <Scroll className="w-3.5 h-3.5 text-[#dedf42] shrink-0 mt-0.5" />
                        <span><strong>Filosofi:</strong> {spotlight.philosophy}</span>
                      </div>
                    </div>

                    {/* Interactive Canvas Button */}
                    <button
                      type="button"
                      onClick={() => openCanvasModal(spotlight)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#dedf42] hover:bg-[#eae853] text-black font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-98"
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span>Uji di Kanvas Pentas</span>
                    </button>

                    {/* Actions Bar */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <a
                        href={spotlight.imageUrl}
                        download={`${spotlight.name.toLowerCase().replace(/\s+/g, '-')}.png`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-black/70 hover:bg-[#d9a441] border border-[#d9a441]/40 text-xs font-mono text-[#f5ecd9] hover:text-black transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Unduh PNG
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(`Tokoh: ${spotlight.name} (${spotlight.role})\nPusaka: ${spotlight.weapon}\nFilosofi: ${spotlight.philosophy}`);
                          setCopiedPhilosophy(true);
                          setTimeout(() => setCopiedPhilosophy(false), 2000);
                        }}
                        className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-black/70 hover:bg-[#d9a441] border border-[#d9a441]/40 text-xs font-mono text-[#f5ecd9] hover:text-black transition-all cursor-pointer"
                      >
                        {copiedPhilosophy ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedPhilosophy ? 'Tersalin' : 'Salin Kisah'}
                      </button>
                    </div>

                    {/* Direct Link to Stage */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-[#f5ecd9]/50 font-sans">Siap mementaskan tokoh ini?</span>
                      <Link
                        href="/stage"
                        className="inline-flex items-center gap-1.5 text-[#dedf42] font-semibold hover:underline"
                      >
                        Bawa ke Panggung Virtual <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                /* Empty Canvas State — Pure and waiting for AI generation */
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-[#d9a441]/25 rounded-2xl bg-black/35 text-[#f5ecd9] my-4">
                  <div className="w-14 h-14 rounded-full bg-[#dedf42]/10 border border-[#dedf42]/30 flex items-center justify-center mb-3 text-[#dedf42] shadow-[0_0_20px_rgba(222,223,66,0.15)]">
                    <Wand2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif italic text-lg sm:text-xl font-bold text-[#dedf42] mb-1.5">
                    Menanti Gubahan Cipta Sang Empu
                  </h3>
                  <p className="text-xs text-[#f5ecd9]/70 max-w-xs leading-relaxed mb-4">
                    Ketikkan konsep tokoh wayang impianmu pada obrolan di samping, atau pilih inspirasi cepat untuk melahirkan tokoh wayang AI perdana.
                  </p>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono text-[#dedf42]/80 bg-black/60 border border-[#dedf42]/20 uppercase tracking-widest">
                    Karya AI Murni • Tanpa Tokoh Bawaan
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── AI Generated History Section (Only contains actual AI generations) ── */}
        <section className="pt-8 border-t-2 border-black/20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="px-3 py-1 rounded-full bg-black text-[#dedf42] text-[11px] font-mono font-bold tracking-widest uppercase mb-2 inline-block shadow-sm">
                GALERI GUBAHAN AI
              </span>
              <h2 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#050303]">
                Karakter Hasil Tatahan AI
              </h2>
            </div>
            <p className="text-xs text-black/75 max-w-sm">
              Seluruh tokoh wayang baru yang telah Anda gubah bersama Sang Empu AI akan otomatis tercatat dan tersimpan di galeri ini.
            </p>
          </div>

          {generatedCreations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {generatedCreations.map((creation) => (
                <div
                  key={creation.id}
                  className="bg-black/95 text-[#f5ecd9] border border-black rounded-2xl p-5 flex flex-col justify-between shadow-xl hover:border-[#dedf42]/60 transition-all group"
                >
                  <div>
                    <div
                      onClick={() => handleApplyPreset(creation)}
                      className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/60 border border-white/5 mb-4 flex items-center justify-center cursor-pointer"
                    >
                      <Image
                        src={creation.image}
                        alt={creation.title}
                        fill
                        unoptimized
                        className="object-contain p-3 group-hover:scale-105 transition-transform"
                        sizes="(max-width: 768px) 100vw, 260px"
                      />
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {creation.traits.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#dedf42]/10 text-[#dedf42] border border-[#dedf42]/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-serif font-bold text-lg text-[#f5ecd9] mb-1">{creation.title}</h3>
                    <p className="text-xs text-[#f5ecd9]/60 font-sans mb-4">{creation.role}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset(creation)}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-black hover:bg-[#dedf42] text-[#dedf42] hover:text-black border border-[#dedf42]/40 text-xs font-mono font-semibold transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    Lihat di Canvas
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-14 px-6 rounded-2xl bg-black/10 border-2 border-dashed border-black/25 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-black text-[#dedf42] flex items-center justify-center mb-3 shadow-md">
                <Scroll className="w-5 h-5" />
              </div>
              <h3 className="font-serif italic font-bold text-lg text-[#050303] mb-1">
                Belum Ada Tokoh yang Digubah
              </h3>
              <p className="text-xs text-black/70 max-w-md leading-relaxed">
                Mulai berbincang dengan Sang Empu AI di atas untuk menatah tokoh wayang impianmu. Karya asli AI akan langsung muncul di galeri ini secara murni tanpa tokoh bawaan.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* ── 🌟 INTERACTIVE KANVAS STUDIO PENTAS MODAL ── */}
      {isCanvasModalOpen && spotlight && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl animate-fadeSlideUp"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCanvasModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-5xl bg-[#0e0805] text-[#f5ecd9] border-2 border-[#d9a441]/50 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header Bar */}
            <div className="p-4 sm:p-5 bg-black/80 border-b border-[#d9a441]/25 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#dedf42] text-black flex items-center justify-center shadow-[0_0_15px_rgba(222,223,66,0.4)]">
                  <Flame className="w-5 h-5 text-black" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#dedf42] uppercase block">
                    PANGGUNG KANVAS VIRTUAL SANG EMPU
                  </span>
                  <h3 className="font-serif italic text-lg sm:text-xl font-bold text-[#f5ecd9]">
                    {spotlight.name}
                  </h3>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-2">
                {audioFeedback && (
                  <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-[#dedf42]/20 text-[#dedf42] text-[11px] font-mono animate-pulse">
                    🎵 {audioFeedback}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setIsCanvasModalOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#f5ecd9] transition-all cursor-pointer"
                  title="Tutup Kanvas"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Split Virtual Canvas & Details */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
              {/* ── LEFT: Virtual Kelir Canvas (7 cols) ── */}
              <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[440px] flex flex-col items-center justify-center p-6 overflow-hidden border-b lg:border-b-0 lg:border-r border-[#d9a441]/20 select-none">
                {/* Authentic Kelir Stage Backdrop with Blencong Radial Light */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    canvasBlencong ? 'opacity-100' : 'opacity-40'
                  }`}
                  style={{
                    background:
                      'radial-gradient(circle at 50% 45%, rgba(120, 75, 25, 0.7) 0%, rgba(45, 22, 8, 0.9) 50%, #080402 100%)',
                  }}
                />

                {/* Blencong Flame Flare Animation */}
                {canvasBlencong && (
                  <div className="absolute top-8 w-40 h-40 bg-[#ffb732] rounded-full blur-[80px] opacity-25 animate-pulse pointer-events-none" />
                )}

                {/* Cloth Fabric Grain Texture */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.5px,transparent_0.5px)] opacity-[0.05] [background-size:16px_16px] pointer-events-none" />

                {/* The Character Wayang Puppet on Canvas */}
                <div
                  className="relative w-full h-full max-h-[460px] flex items-center justify-center z-10 transition-all duration-300"
                  style={{
                    transform: `scale(${canvasZoom}) scaleX(${canvasFlipped ? -1 : 1})`,
                  }}
                >
                  <div className="relative w-[320px] h-[380px] sm:w-[380px] sm:h-[440px]">
                    <Image
                      src={spotlight.imageUrl}
                      alt={spotlight.name}
                      fill
                      unoptimized
                      className="object-contain drop-shadow-[0_15px_35px_rgba(222,223,66,0.35)]"
                      sizes="(max-width: 768px) 100vw, 440px"
                      priority
                    />
                  </div>
                </div>

                {/* Interactive Stage Controls Floating Bar */}
                <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between gap-2 p-2 rounded-2xl bg-black/80 backdrop-blur-md border border-[#d9a441]/30">
                  <div className="flex items-center gap-1.5">
                    {/* Flip Direction */}
                    <button
                      type="button"
                      onClick={() => {
                        setCanvasFlipped((prev) => !prev);
                        playSoundEffect('cempala');
                      }}
                      className="p-2 rounded-xl bg-white/10 hover:bg-[#dedf42] hover:text-black text-[#f5ecd9] text-xs font-mono transition-all flex items-center gap-1 cursor-pointer"
                      title="Balik Arah Hadap Wayang"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Balik Hadap</span>
                    </button>

                    {/* Blencong Glow Toggle */}
                    <button
                      type="button"
                      onClick={() => setCanvasBlencong((prev) => !prev)}
                      className={`p-2 rounded-xl text-xs font-mono transition-all flex items-center gap-1 cursor-pointer ${
                        canvasBlencong
                          ? 'bg-[#dedf42] text-black font-bold'
                          : 'bg-white/10 text-[#f5ecd9] hover:bg-white/20'
                      }`}
                      title="Nyalakan / Matikan Efek Api Blencong"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Blencong</span>
                    </button>
                  </div>

                  {/* Audio triggers */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => playSoundEffect('gong')}
                      className="p-2 rounded-xl bg-white/10 hover:bg-[#dedf42] hover:text-black text-[#f5ecd9] text-xs font-mono transition-all flex items-center gap-1 cursor-pointer"
                      title="Pukul Gong Ageng"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Gong</span>
                    </button>

                    {/* Zoom in / out */}
                    <button
                      type="button"
                      onClick={() => setCanvasZoom((prev) => Math.max(0.75, prev - 0.25))}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#f5ecd9] text-xs transition-all cursor-pointer"
                      title="Perkecil"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCanvasZoom((prev) => Math.min(1.75, prev + 0.25))}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#f5ecd9] text-xs transition-all cursor-pointer"
                      title="Perbesar"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* ── RIGHT: Character Dossier & Actions (5 cols) ── */}
              <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-5 bg-[#140b07]">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#dedf42] uppercase block">
                      HASIL TATAHAN ADILUHUNG
                    </span>
                    <h2 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#f5ecd9] mt-0.5">
                      {spotlight.name}
                    </h2>
                    <p className="text-xs font-sans text-[#dedf42] mt-0.5">{spotlight.role}</p>
                  </div>

                  {/* Sifat & Watak */}
                  {spotlight.traits && spotlight.traits.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono text-[#f5ecd9]/60 uppercase tracking-wider block">
                        Watak & Karakter:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {spotlight.traits.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-full text-xs font-mono bg-[#dedf42]/10 text-[#dedf42] border border-[#dedf42]/30"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pusaka */}
                  <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-[#dedf42]">
                      <Swords className="w-4 h-4" />
                      <span className="font-mono text-xs font-bold uppercase">Pusaka / Senjata Sakti</span>
                    </div>
                    <p className="text-xs text-[#f5ecd9]/90 leading-relaxed pl-6 font-medium">
                      {spotlight.weapon}
                    </p>
                  </div>

                  {/* Filosofi Luhur */}
                  <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-[#dedf42]">
                      <Scroll className="w-4 h-4" />
                      <span className="font-mono text-xs font-bold uppercase">Falsafah Batin & Ajaran</span>
                    </div>
                    <p className="text-xs text-[#f5ecd9]/80 italic leading-relaxed pl-6">
                      &ldquo;{spotlight.philosophy}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Primary CTA Action Buttons */}
                <div className="space-y-2.5 pt-2 border-t border-white/10">
                  <Link
                    href="/stage"
                    className="w-full py-3.5 px-5 rounded-2xl bg-[#dedf42] hover:bg-[#eae853] text-black font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98"
                  >
                    <span>Pentaskan di Panggung Dalang AI</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={spotlight.imageUrl}
                      download={`${spotlight.name.toLowerCase().replace(/\s+/g, '-')}.png`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-black hover:bg-[#d9a441] border border-[#d9a441]/40 text-xs font-mono text-[#f5ecd9] hover:text-black transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Unduh PNG
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(`Tokoh: ${spotlight.name} (${spotlight.role})\nPusaka: ${spotlight.weapon}\nFilosofi: ${spotlight.philosophy}`);
                        setCopiedPhilosophy(true);
                        setTimeout(() => setCopiedPhilosophy(false), 2000);
                      }}
                      className="py-2.5 px-3 rounded-xl bg-black hover:bg-[#d9a441] border border-[#d9a441]/40 text-xs font-mono text-[#f5ecd9] hover:text-black transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {copiedPhilosophy ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedPhilosophy ? 'Tersalin' : 'Salin Kisah'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function KreasiWayangChatbotPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#dedf42]" />}>
      <KreasiWayangContent />
    </Suspense>
  );
}
