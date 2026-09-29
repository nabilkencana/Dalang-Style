'use client';

import React, { useEffect, useRef, useCallback } from 'react';

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
  lakonSubtitle = 'LAKON MALAM INI',
  accentColor = '#dedf42',
  className = '',
}: SectionBimaSuciProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const isVisibleRef = useRef(false);

  // Send control commands to YouTube iframe via postMessage
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

  const playWithSoundAndCaptions = useCallback(() => {
    sendYtCommand('playVideo');
    sendYtCommand('unMute');
    sendYtCommand('setVolume', [100]);
    // Explicitly activate native YouTube closed captions track
    sendYtCommand('loadModule', ['captions']);
    sendYtCommand('setOption', ['captions', 'track', { languageCode: 'en' }]);
  }, [sendYtCommand]);

  const pauseVideo = useCallback(() => {
    sendYtCommand('pauseVideo');
  }, [sendYtCommand]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || backgroundType !== 'youtube') return;

    // IntersectionObserver to auto-play with sound when entering, pause when leaving
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            isVisibleRef.current = true;
            playWithSoundAndCaptions();
          } else if (!entry.isIntersecting) {
            isVisibleRef.current = false;
            pauseVideo();
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75],
      }
    );

    observer.observe(section);

    // Browser audio policy: user gesture required to un-mute
    const handleFirstGesture = () => {
      if (isVisibleRef.current) {
        sendYtCommand('unMute');
        sendYtCommand('setVolume', [100]);
        sendYtCommand('loadModule', ['captions']);
        sendYtCommand('setOption', ['captions', 'track', { languageCode: 'en' }]);
      }
    };

    window.addEventListener('click', handleFirstGesture, { passive: true });
    window.addEventListener('keydown', handleFirstGesture, { passive: true });
    window.addEventListener('scroll', handleFirstGesture, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
    };
  }, [backgroundType, pauseVideo, playWithSoundAndCaptions, sendYtCommand]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative w-full bg-[#000000] text-[#f4e7cd] overflow-hidden select-none py-2 sm:py-3 md:py-4 ${className}`}
    >
      {/* 1504 x 1128 Canvas Ratio Container matching Reference (4:3) */}
      <div
        className="relative w-full overflow-hidden bg-[#000000] shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
        style={{ aspectRatio: '1504 / 1128' }}
      >
        {/* Yellow Frame Box - The video is fitted cleanly inside */}
        <div
          className="absolute inset-[13.65%_6.25%_13.74%_6.25%] overflow-hidden z-10"
          style={{
            border: `1.5px solid ${accentColor}`,
          }}
        >
          {/* 1. Video strictly contained inside the yellow box with native subtitles enabled */}
          {backgroundType === 'youtube' && youtubeVideoId ? (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              <iframe
                ref={iframeRef}
                src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&playsinline=1&cc_load_policy=1&cc_lang_pref=en&hl=en`}
                title="Lakon Malam Ini - Latar Video YouTube"
                className="absolute bottom-0 left-1/2 w-[118%] sm:w-[112%] h-[118%] sm:h-[112%] -translate-x-1/2 object-cover pointer-events-none opacity-95 filter contrast-[1.1] brightness-[0.92]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 brightness-[0.88]"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
          )}

          {/* Atmospheric Contrast Overlays inside yellow box */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/40 pointer-events-none z-10" />
        </div>

        {/* Top Center Label: TONIGHT LAKON (centered on top yellow border line) */}
        <div className="absolute top-[13.65%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#000000] px-3 sm:px-6 md:px-8 z-30 pointer-events-auto">
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
