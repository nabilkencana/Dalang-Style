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
} from 'lucide-react';
import {
  interpretUserPrompt,
  getWayangImageUrl,
  type ChatMessage,
  type WayangPreset,
} from '@/lib/wayang-ai';

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
  const [spotlight, setSpotlight] = useState<SpotlightCharacter | null>(null);
  const [generatedCreations, setGeneratedCreations] = useState<WayangPreset[]>([]);
  const [copiedPhilosophy, setCopiedPhilosophy] = useState(false);

  const chatScrollContainerRef = useRef<HTMLDivElement | null>(null);

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
  }, [messages, isTyping]);
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
      setIsTyping(true);

      // Interpret concept via API (uses Gemini AI if API key is set, or local fallback)
      let interpretation = interpretUserPrompt(prompt);
      let generatedImageUrl = getWayangImageUrl(interpretation.compiledPrompt, 1024, 1024);

      try {
        const res = await fetch('/api/kreasi-wayang', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.characterName) {
            interpretation = {
              characterName: data.characterName,
              roleTitle: data.roleTitle,
              philosophy: data.philosophy,
              weaponName: data.weaponName,
              traits: Array.isArray(data.traits) ? data.traits : ['Luhur Budi', 'Waspada'],
              greeting: data.greeting || `Karakter **${data.characterName}** berhasil ditatah oleh Sang Empu AI.`,
              compiledPrompt: data.compiledPrompt || prompt,
            };
            if (data.imageUrl) {
              generatedImageUrl = data.imageUrl;
            }
          }
        }
      } catch {
        // Fallback to local interpretation
      }

      // Preload image in background
      const testImg = new window.Image();
      testImg.src = generatedImageUrl;
      const finalizeBotResponse = (finalUrl: string) => {
        const empuMsg: ChatMessage = {
          id: `empu-${Date.now()}`,
          sender: 'empu',
          text: interpretation.greeting,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          characterName: interpretation.characterName,
          roleTitle: interpretation.roleTitle,
          imageUrl: finalUrl,
          weaponName: interpretation.weaponName,
          philosophy: interpretation.philosophy,
          traits: interpretation.traits,
          promptRecipe: interpretation.compiledPrompt,
        };

        setMessages((prev) => [...prev, empuMsg]);
        setIsTyping(false);
        // Update spotlight canvas with newly created character
        const newSpotlight: SpotlightCharacter = {
          name: interpretation.characterName,
          role: interpretation.roleTitle,
          imageUrl: finalUrl,
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
            image: finalUrl,
            traits: interpretation.traits || [],
          },
          ...prev,
        ]);
      };

      // Deliver bot response immediately without waiting for image network delay
      finalizeBotResponse(generatedImageUrl);
    },
    [inputText, isTyping]
  );

  // Apply generated creation to spotlight
  const handleApplyPreset = useCallback((preset: WayangPreset) => {
    setSpotlight({
      name: preset.title,
      role: preset.role,
      imageUrl: preset.image,
      weapon: preset.weapon || 'Pusaka Sakti',
      philosophy: 'Mahakarya tatahan Sang Empu AI.',
      traits: preset.traits,
      promptRecipe: preset.prompt,
    });
  }, []);

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
                        {/* Text Content */}
                        <div className="whitespace-pre-wrap">{msg.text}</div>

                        {/* If message generated a character image */}
                        {msg.imageUrl && (
                          <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-col gap-2.5">
                            <div className="relative aspect-square w-full max-w-[280px] rounded-xl overflow-hidden bg-black/80 border border-[#d9a441]/30 mx-auto group">
                              <Image
                                src={msg.imageUrl}
                                alt={msg.characterName || 'Wayang'}
                                fill
                                unoptimized
                                className="object-contain p-2"
                                sizes="280px"
                              />
                            </div>

                            {msg.characterName && (
                              <div className="flex items-center justify-between text-xs pt-1">
                                <span className="font-serif font-bold text-[#f2c76b]">
                                  {msg.characterName}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSpotlight({
                                      name: msg.characterName || '',
                                      role: msg.roleTitle || '',
                                      imageUrl: msg.imageUrl || '',
                                      weapon: msg.weaponName || '',
                                      philosophy: msg.philosophy || '',
                                      traits: msg.traits || [],
                                      promptRecipe: msg.promptRecipe || '',
                                    })
                                  }
                                  className="text-[11px] font-mono text-[#dedf42] hover:underline flex items-center gap-1"
                                >
                                  <span>Lihat di Kanvas</span> &rarr;
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

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3 items-center text-xs text-[#dedf42] font-mono animate-pulse">
                    <div className="w-8 h-8 rounded-full bg-black border border-[#dedf42]/40 flex items-center justify-center">
                      <Flame className="w-4 h-4 text-[#dedf42]" />
                    </div>
                    <div className="bg-[#1e130c] border border-[#d9a441]/25 px-4 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dedf42] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dedf42] animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dedf42] animate-bounce [animation-delay:0.4s]" />
                      <span className="ml-1 text-[#f5ecd9]/70">Sang Empu sedang menatah kulit...</span>
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
            <div className="lg:col-span-5 bg-[#150c08] border border-[#d9a441]/30 rounded-2xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between h-[720px] overflow-y-auto [scrollbar-width:thin]">
              <div className="flex items-center justify-between border-b border-[#d9a441]/20 pb-3">
                <div className="flex items-center gap-2 text-[#f2c76b]">
                  <Flame className="w-4 h-4 text-[#dedf42]" />
                  <span className="font-mono text-xs uppercase tracking-wider">Spotlight Kanvas Tokoh</span>
                </div>
              </div>

              {spotlight ? (
                <div className="flex-1 flex flex-col justify-between py-2 space-y-4">
                  {/* Large Image Viewport */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/85 border border-[#d9a441]/35 flex items-center justify-center shadow-inner group">
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
                        Karya Sang Empu AI
                      </span>
                      <a
                        href={spotlight.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#f5ecd9]"
                        title="Buka Gambar Resolusi Penuh"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
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
                        className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-black/70 hover:bg-[#d9a441] border border-[#d9a441]/40 text-xs font-mono text-[#f5ecd9] hover:text-black transition-all"
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

        {/* ── Community Inspiration Section ── */}
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
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/60 border border-white/5 mb-4 flex items-center justify-center">
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
                    className="w-full py-2.5 px-3.5 rounded-xl bg-black hover:bg-[#dedf42] text-[#dedf42] hover:text-black border border-[#dedf42]/40 text-xs font-mono font-semibold transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    Lihat di Kanvas
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
