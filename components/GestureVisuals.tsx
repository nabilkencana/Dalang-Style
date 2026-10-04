'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface GestureMediaHoverCardProps {
  imageSrc: string;
  imageAlt: string;
  videoSrc: string;
  badgeTitle: string;
  badgeSubtitle: string;
}

export function GestureMediaHoverCard({
  imageSrc,
  imageAlt,
  videoSrc,
  badgeTitle,
  badgeSubtitle,
}: GestureMediaHoverCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startVideo = useCallback(() => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const stopVideo = useCallback(() => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  const toggleMedia = useCallback(() => {
    if (isHovered) {
      stopVideo();
    } else {
      startVideo();
    }
  }, [isHovered, startVideo, stopVideo]);

  return (
    <div
      role="button"
      tabIndex={0}
      className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border-2 border-black/30 shadow-lg group bg-black select-none cursor-pointer"
      onMouseEnter={startVideo}
      onMouseLeave={stopVideo}
      onClick={toggleMedia}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleMedia();
        }
      }}
      aria-label={`${badgeTitle}: arahkan kursor untuk memutar video gerak AI`}
    >
      {/* 1. Underlying Video Player */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* 2. Top Photo Layer with Silky Crossfade Transition */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-out pointer-events-none ${
          isHovered ? 'opacity-0 z-0' : 'opacity-100 z-10'
        }`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover object-center"
        />
      </div>

      {/* 3. Subtle Ambient Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none z-20" />

      {/* 4. Minimalist Top Hover Indicator (No red dots) */}
      <div className="absolute top-2.5 right-3 z-30 flex items-center pointer-events-none">
        <span
          className={`px-2 py-0.5 rounded text-[9px] font-sans font-medium uppercase tracking-wider transition-all duration-200 backdrop-blur-sm ${
            isHovered
              ? 'bg-[#dedf42] text-black font-bold'
              : 'bg-black/60 text-white/70 border border-white/10'
          }`}
        >
          {isHovered ? 'Video Gerak' : 'Hover Video'}
        </span>
      </div>

      {/* 5. Minimalist Bottom Content Badge (No red dots) */}
      <div className="absolute bottom-2 left-2.5 right-2.5 z-30 flex items-center justify-between text-[9px] font-mono pointer-events-none">
        <span className="bg-black/75 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10 text-[#dedf42] uppercase tracking-wider font-semibold">
          {badgeTitle}
        </span>
        <span className="text-white/70 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[8.5px] font-sans">
          {badgeSubtitle}
        </span>
      </div>
    </div>
  );
}

export function Gesture01Visual() {
  return (
    <GestureMediaHoverCard
      imageSrc="/images/gestures/gesture-01-poros.webp"
      imageAlt="Gestur 01: Pusat Poros Telapak Tangan"
      videoSrc="/videos/gestures/gesture-01-poros.mp4"
      badgeTitle="PUSAT POROS TELAPAK"
      badgeSubtitle="X / Y Movement • 60 FPS"
    />
  );
}

export function Gesture02Visual() {
  return (
    <GestureMediaHoverCard
      imageSrc="/images/gestures/gesture-02-lengan.webp"
      imageAlt="Gestur 02: Kendali Lengan Wayang"
      videoSrc="/videos/gestures/gesture-02-lengan.mp4"
      badgeTitle="KENDALI LENGAN"
      badgeSubtitle="Titik (4, 8) • Cempurit"
    />
  );
}

export function Gesture03Visual() {
  return (
    <GestureMediaHoverCard
      imageSrc="/images/gestures/gesture-03-kiprahan.webp"
      imageAlt="Gestur 03: Tari Kiprahan Sakral"
      videoSrc="/videos/gestures/gesture-03-kiprahan.mp4"
      badgeTitle="TARI KIPRAHAN"
      badgeSubtitle="Kelingking #20 • Auto-Dance"
    />
  );
}

export function Gesture04Visual() {
  return (
    <GestureMediaHoverCard
      imageSrc="/images/gestures/gesture-04-kedalaman.webp"
      imageAlt="Gestur 04: Kedalaman Z-Axis (Tajam vs Baur)"
      videoSrc="/videos/gestures/gesture-04-kedalaman.mp4"
      badgeTitle="Z-AXIS KEDALAMAN"
      badgeSubtitle="Tajam vs Baur • Blencong"
    />
  );
}

export function ModeDuaWayangVisual() {
  return (
    <GestureMediaHoverCard
      imageSrc="/images/gestures/mode-dua-wayang.webp"
      imageAlt="Mode Standar: Dua Wayang Dua Tangan"
      videoSrc="/videos/gestures/mode-dua-wayang.mp4"
      badgeTitle="MODE DUA WAYANG"
      badgeSubtitle="Laga & Dialog • 2 Tangan"
    />
  );
}

export function ModeSatuWayangVisual() {
  return (
    <GestureMediaHoverCard
      imageSrc="/images/gestures/mode-satu-wayang.webp"
      imageAlt="Mode Lanjutan: Satu Wayang Penuh Dua Tangan"
      videoSrc="/videos/gestures/mode-satu-wayang.mp4"
      badgeTitle="KENDALI SATU WAYANG PENUH"
      badgeSubtitle="Artikulasi Penuh • Solo Mastery"
    />
  );
}
