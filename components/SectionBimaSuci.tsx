'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface SectionBimaSuciProps {
  id?: string;
  youtubeVideoId?: string;
  backgroundType?: 'youtube' | 'image';
  backgroundImage?: string;
  lakonSubtitle?: string;
  accentColor?: string;
  className?: string;
}


export default function SectionBimaSuci({
  id = 'lakon',
  youtubeVideoId = 'sQyQ31bysTQ',
  backgroundType = 'youtube',
  backgroundImage = '/images/bima-stage-clean-v2.png',
  lakonSubtitle = 'LAKON BIMA SUCI',
  accentColor = '#dedf42',
  className = '',
}: SectionBimaSuciProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const isVisibleRef = useRef(false);
  const hasUnmutedRef = useRef(false);
  const hasActivatedCaptionsRef = useRef(false);
  const sendYtCommand = useCallback((func: string, args: unknown[] = []) => {
    if (!iframeRef.current?.contentWindow) return;
    try {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      );
    } catch {
      // ignore cross-origin postMessage errors if any
    }
  }, []);

  const activateEnglishCaptions = useCallback(() => {
    sendYtCommand('loadModule', ['captions']);
    setTimeout(() => {
      sendYtCommand('setOption', ['captions', 'track', { languageCode: 'en' }]);
    }, 300);
  }, [sendYtCommand]);

  const playWithSoundAndCaptions = useCallback(() => {
    sendYtCommand('playVideo');
    sendYtCommand('unMute');
    sendYtCommand('setVolume', [100]);
    activateEnglishCaptions();
  }, [activateEnglishCaptions, sendYtCommand]);

  const pauseVideo = useCallback(() => {
    sendYtCommand('pauseVideo');
  }, [sendYtCommand]);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || backgroundType !== 'youtube') return;

    let wasIntersecting = false;

    // IntersectionObserver triggers strictly once on crossing threshold
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isNowIntersecting = entry.isIntersecting && entry.intersectionRatio >= 0.25;
          if (isNowIntersecting && !wasIntersecting) {
            wasIntersecting = true;
            isVisibleRef.current = true;
            playWithSoundAndCaptions();
          } else if (!entry.isIntersecting && wasIntersecting) {
            wasIntersecting = false;
            isVisibleRef.current = false;
            pauseVideo();
          }
        });
      },
      {
        threshold: [0.25],
      }
    );

    observer.observe(section);

    // Handshake to YouTube player until ready
    let attempts = 0;
    const handshakeInterval = setInterval(() => {
      if (hasActivatedCaptionsRef.current || attempts > 20) {
        clearInterval(handshakeInterval);
        return;
      }
      attempts++;
      sendYtCommand('listening');
    }, 400);

    const handleYtMessage = (e: MessageEvent) => {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (data && (data.event === 'onReady' || data.event === 'initialDelivery')) {
          if (!hasActivatedCaptionsRef.current) {
            hasActivatedCaptionsRef.current = true;
            clearInterval(handshakeInterval);
            activateEnglishCaptions();
          }
        }
      } catch {}
    };

    window.addEventListener('message', handleYtMessage);

    // Backup timer in case event was already sent before listener attached
    const initTimer = setTimeout(() => {
      if (!hasActivatedCaptionsRef.current) {
        hasActivatedCaptionsRef.current = true;
        clearInterval(handshakeInterval);
        activateEnglishCaptions();
      }
    }, 2000);

    // Browser audio policy: user gesture required to un-mute
    const handleFirstGesture = () => {
      if (hasUnmutedRef.current) return;
      hasUnmutedRef.current = true;
      if (isVisibleRef.current) {
        sendYtCommand('unMute');
        sendYtCommand('setVolume', [100]);
        activateEnglishCaptions();
      }
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture, { passive: true });
    window.addEventListener('keydown', handleFirstGesture, { passive: true });

    return () => {
      observer.disconnect();
      clearInterval(handshakeInterval);
      clearTimeout(initTimer);
      window.removeEventListener('message', handleYtMessage);
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, [backgroundType, pauseVideo, playWithSoundAndCaptions, activateEnglishCaptions, sendYtCommand]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative w-full bg-[#000000] text-[#f4e7cd] overflow-hidden select-none py-2 sm:py-3 md:py-4 ${className}`}
    >
      {/* Theatrical Canvas Container — Cinematic on Mobile & Theatrical on Desktop */}
      <div
        data-gsap="bima-card"
        className="relative w-full overflow-hidden bg-[#000000] shadow-[0_25px_80px_rgba(0,0,0,0.95)] aspect-video sm:aspect-[1504/1128]"
      >
        {/* Yellow Frame Box - Expanded to fill screen boldly */}
        <div
          data-gsap="bima-frame"
          className="absolute inset-[5%_2%_5%_2%] sm:inset-[8%_4%_8%_4%] md:inset-[10%_5%_10%_5%] overflow-hidden z-10"
          style={{
            border: `1.5px solid ${accentColor}`,
          }}
        >
          {/* 1. Video strictly contained inside the yellow box — BOLD & EXPANDED */}
          {backgroundType === 'youtube' && youtubeVideoId ? (
            <div className="absolute inset-0 overflow-hidden pointer-events-auto z-0 bg-black flex items-center justify-center">
              <iframe
                ref={iframeRef}
                src={`https://www.youtube.com/embed/${youtubeVideoId}?si=PRutH_g9LIdRt4ZU&enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=1&cc_load_policy=1&cc_lang_pref=en&hl=en`}
                title="Lakon Bima Suci - Latar Video YouTube"
                className="w-full h-full object-cover pointer-events-auto filter contrast-[1.05] brightness-[0.96]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 brightness-[0.88]"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
          )}
        </div>

        {/* Top Center Label: TONIGHT LAKON (centered on top yellow border line) */}
        <div data-gsap="bima-label" className="absolute top-[13.65%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#000000] px-3 sm:px-6 md:px-8 z-30 pointer-events-auto">
          <span
            className="font-sans font-bold text-[clamp(9px,1.1cqi,15px)] tracking-[0.22em] sm:tracking-[0.28em] uppercase whitespace-nowrap select-text"
            style={{ color: accentColor }}
          >
            {lakonSubtitle}
          </span>
        </div>
      </div>
    </section>
  );
}
