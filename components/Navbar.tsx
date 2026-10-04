"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, MenuItem, ProductItem, HoveredLink } from "@/components/ui/navbar-menu";
import StaggeredMenu, { StaggeredMenuItem, StaggeredMenuSocialItem } from "@/components/ui/StaggeredMenu";

import WayangLogo from "@/components/WayangLogo";
import { cn } from "@/lib/utils";
const springConfig = {
  type: "spring" as const,
  stiffness: 220,
  damping: 26,
  mass: 0.65,
};
const STAGGERED_MENU_ITEMS: StaggeredMenuItem[] = [
  { label: 'Lakon Bima Suci', link: '/#lakon' },
  { label: 'Tokoh Wayang', link: '/#cara-bermain' },
  { label: 'Galeri Museum', link: '/#galeri' },
  { label: 'Warta Budaya', link: '/#berita' },
  { label: 'Sang Empu AI', link: '/#kreasi', badge: 'BARU', highlight: true },
  { label: 'Mainkan Wayang', link: '/panduan' },
];

const STAGGERED_SOCIAL_ITEMS: StaggeredMenuSocialItem[] = [
  { label: 'Panggung Wayang', link: '/stage' },
  { label: 'Kamera AI', link: '/camera' },
  { label: 'Kredit & Refleksi', link: '/kredit' },
];

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [isCompact, setIsCompact] = useState(false);

  // Smooth scroll tracking with hysteresis to prevent jitter
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY.current;

    // Scrolling down past 110px threshold -> compact (narrows notch, logo & button slide into center)
    if (latest > 110 && diff > 8 && !isCompact) {
      setIsCompact(true);
      lastScrollY.current = latest;
    } else if ((diff < -8 || latest < 50) && isCompact) {
      // Scrolling up or returning to top -> expand (logo & button slide outward to sides)
      setIsCompact(false);
      lastScrollY.current = latest;
    }

    if (Math.abs(diff) > 15 || latest < 50) {
      lastScrollY.current = latest;
    }
  });

  return (
      <motion.header
      data-gsap="hero-nav"
      animate={{
        maxWidth: isCompact ? 540 : 1040,
      }}
      transition={springConfig}
      className={cn(
        // Centered notch via inset-x-0 mx-auto with strict 1040px desktop cap
        "fixed z-50 top-2 inset-x-0 mx-auto w-full max-w-[1040px] pointer-events-auto",
        "max-[850px]:top-0 max-[850px]:inset-x-0 max-[850px]:!w-full max-[850px]:!max-w-none max-[850px]:z-[80]",
        className
      )}
    >
      {/* ── Left Inverted Fillet Ear (Permanently attached to notch, slides inward smoothly) ── */}
      <svg
        className="absolute top-0 -left-[49px] rotate-180 text-[#130d08] pointer-events-none hidden min-[850px]:block"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
          fill="currentColor"
        />
      </svg>

      {/* ── Right Inverted Fillet Ear (Permanently attached to notch, slides inward smoothly) ── */}
      <svg
        className="absolute top-0 -right-[49px] rotate-90 text-[#130d08] pointer-events-none hidden min-[850px]:block"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
          fill="currentColor"
        />
      </svg>

      {/* ── Main Notch Bar (Always rounded-b-[2.5rem], always h-20 80px height) ── */}
      <Menu
        setActive={setActive}
        className="rounded-b-[2.5rem] max-[850px]:rounded-none max-[850px]:rounded-b-3xl bg-[#130d08] text-[#f4e7cd] border-none shadow-[0_20px_60px_-15px_rgba(0,0,0,0.95)] flex items-center justify-between px-5 sm:px-7 h-20 max-[850px]:h-[72px]"
      >
        {/* ── Left Slot: Brand Dot + Name 
            When scrolling down: slides right (+45px into center) and dissolves (width: 0)
            When scrolling up: slides back left (45px -> 0) and expands (width: 210px) ── */}
        <motion.div
          animate={{
            width: isCompact ? 0 : 210,
            opacity: isCompact ? 0 : 1,
            x: isCompact ? 45 : 0,
          }}
          transition={springConfig}
          className="flex items-center overflow-hidden shrink-0 pointer-events-auto max-[850px]:!w-auto max-[850px]:!opacity-100 max-[850px]:!transform-none"
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0 focus:outline-none ml-1 sm:ml-2 whitespace-nowrap"
          >
            <WayangLogo size={32} />
            <span className="text-xl sm:text-[22px] font-serif italic font-bold text-[#dedf42] tracking-tight group-hover:brightness-125 transition-all whitespace-nowrap">
              Wayang Jawi
            </span>
          </Link>
        </motion.div>

        {/* ── Center Slot: Dropdown Navigation (Desktop only, stable, centered) ── */}
        <div className="hidden min-[850px]:flex items-center justify-center space-x-1 sm:space-x-2 md:space-x-3.5 shrink-0 mx-auto">
          {/* 1. Lakon */}
          <MenuItem
            setActive={setActive}
            active={active}
            item="Lakon"
            title={
              <span className="flex items-center gap-1.5 text-xs sm:text-sm font-medium tracking-wide">
                <span>Lakon</span>
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#dedf42]/70 transition-transform duration-200 group-hover:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            }
          >
            <div className="flex flex-col space-y-3.5 text-sm min-w-[220px]">
              <span className="text-[10px] font-mono tracking-widest text-[#dedf42]/70 uppercase">
                Pentas & Kisah
              </span>
              <HoveredLink href="/#lakon" onClick={() => setActive(null)}>
                <span className="font-semibold text-white block">Sejarah Wayang Kulit</span>
                <span className="text-[11px] text-[#cdb894] block">Sejarah Wayang Kulit</span>
              </HoveredLink>
              <HoveredLink href="/#fitur" onClick={() => setActive(null)}>
                <span className="font-semibold text-white block">Kisah Bayangan</span>
                <span className="text-[11px] text-[#cdb894] block">Malam Saat Bayangan Berbicara</span>
              </HoveredLink>
              <HoveredLink href="/#makna" onClick={() => setActive(null)}>
                <span className="font-semibold text-white block">Gerak & Simbolisme</span>
                <span className="text-[11px] text-[#cdb894] block">Filosofi Gerak Pewayangan</span>
              </HoveredLink>
              <HoveredLink href="/#berita" onClick={() => setActive(null)}>
                <span className="font-semibold text-white block">Warta & Artikel</span>
                <span className="text-[11px] text-[#cdb894] block">Sorotan & Kabar Terkini</span>
              </HoveredLink>
              <div className="pt-2 border-t border-[#dedf42]/20">
                <Link
                  href="/panduan"
                  className="text-[#dedf42] text-xs font-semibold hover:underline block"
                >
                  Panduan Gestur Dalang &rarr;
                </Link>
              </div>
            </div>
          </MenuItem>

          {/* 2. Tokoh (ProductItems with images) */}
          <MenuItem
            setActive={setActive}
            active={active}
            item="Tokoh"
            title={
              <span className="flex items-center gap-1.5 text-xs sm:text-sm font-medium tracking-wide">
                <span>Tokoh</span>
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#dedf42]/70 transition-transform duration-200 group-hover:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            }
          >
            <div className="text-sm grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-1 min-w-[320px] sm:min-w-[500px]">
              <ProductItem
                title="Kyai Semar"
                href="/tokoh/kyai-semar"
                src="/images/tokoh/wayang-1.webp"
                description="Pamong ksatria berjiwa luhur, pengayom kebenaran."
                onClick={() => setActive(null)}
              />
              <ProductItem
                title="Sang Arjuna"
                href="/tokoh/sang-arjuna"
                src="/images/tokoh/wayang-4.webp"
                description="Penengah Pandawa, ahli panah nan sakti rupawan."
                onClick={() => setActive(null)}
              />
              <ProductItem
                title="Raden Werkudara"
                href="/tokoh/sang-bima"
                src="/images/tokoh/wayang-7.webp"
                description="Ksatria perkasa berjiwa suci, pemilik Kuku Pancanaka."
                onClick={() => setActive(null)}
              />
              <ProductItem
                title="Gatotkaca"
                href="/tokoh/sang-gatotkaca"
                src="/images/tokoh/wayang-5.webp"
                description="Otot kawat balung wesi, ksatria gagah Pringgandani."
                onClick={() => setActive(null)}
              />
              <div className="col-span-1 sm:col-span-2 pt-2.5 border-t border-[#dedf42]/20 flex justify-between items-center text-xs">
                <Link
                  href="/#cara-bermain"
                  className="text-[#cdb894] hover:text-[#dedf42] transition-colors"
                >
                  Putar 3D Wheel Tokoh &rarr;
                </Link>
                <Link
                  href="/katalog"
                  className="text-[#dedf42] font-semibold hover:underline"
                >
                  Katalog Lengkap Tokoh &rarr;
                </Link>
              </div>
            </div>
          </MenuItem>

          {/* 3. Museum */}
          <MenuItem
            setActive={setActive}
            active={active}
            item="Museum"
            title={
              <span className="flex items-center gap-1.5 text-xs sm:text-sm font-medium tracking-wide">
                <span>Museum</span>
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#dedf42]/70 transition-transform duration-200 group-hover:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            }
          >
            <div className="flex flex-col space-y-3.5 text-sm min-w-[260px]">
              <span className="text-[10px] font-mono tracking-widest text-[#dedf42]/70 uppercase">
                16 Museum Nusantara
              </span>
              <HoveredLink
                href="/#galeri"
                onClick={() => {
                  setActive(null);
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(
                      new CustomEvent('open-museum-modal', {
                        detail: { title: 'Museum Wayang Jakarta' },
                      })
                    );
                  }
                }}
              >
                <span className="font-semibold text-white block">Museum Wayang Kota Tua</span>
                <span className="text-[11px] text-[#cdb894] block">Jakarta Barat</span>
              </HoveredLink>
              <HoveredLink
                href="/#galeri"
                onClick={() => {
                  setActive(null);
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(
                      new CustomEvent('open-museum-modal', {
                        detail: { title: 'Museum Wayang Sendang Mas' },
                      })
                    );
                  }
                }}
              >
                <span className="font-semibold text-white block">Museum Wayang Sendang Mas</span>
                <span className="text-[11px] text-[#cdb894] block">Banyumas, Jawa Tengah</span>
              </HoveredLink>
              <HoveredLink
                href="/#galeri"
                onClick={() => {
                  setActive(null);
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(
                      new CustomEvent('open-museum-modal', {
                        detail: { title: 'Museum Radya Pustaka' },
                      })
                    );
                  }
                }}
              >
                <span className="font-semibold text-white block">Museum Radya Pustaka & Keraton</span>
                <span className="text-[11px] text-[#cdb894] block">Surakarta, Jawa Tengah</span>
              </HoveredLink>
              <HoveredLink
                href="/#galeri"
                onClick={() => {
                  setActive(null);
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(
                      new CustomEvent('open-museum-modal', {
                        detail: { title: 'Museum Sonobudoyo' },
                      })
                    );
                  }
                }}
              >
                <span className="font-semibold text-white block">Museum Sonobudoyo & Kekayon</span>
                <span className="text-[11px] text-[#cdb894] block">D.I. Yogyakarta</span>
              </HoveredLink>
              <div className="pt-2 border-t border-[#dedf42]/20">
                <Link
                  href="/#galeri"
                  onClick={() => setActive(null)}
                  className="text-[#dedf42] text-xs font-semibold hover:underline block"
                >
                  Jelajahi Formasi 3D Semua Museum &rarr;
                </Link>
              </div>
            </div>
          </MenuItem>

          {/* 4. Kreasi AI */}
          <MenuItem
            setActive={setActive}
            active={active}
            item="Kreasi AI"
            title={
              <span className="flex items-center gap-1.5 text-xs sm:text-sm font-medium tracking-wide">
                <span>Kreasi AI</span>
                <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-[#dedf42] text-black rounded-full leading-none">
                  BARU
                </span>
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#dedf42]/70 transition-transform duration-200 group-hover:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            }
          >
            <div className="flex flex-col space-y-3.5 text-sm min-w-[260px]">
              <span className="text-[10px] font-mono tracking-widest text-[#dedf42]/70 uppercase">
                Studio Kreasi Tokoh
              </span>
              <HoveredLink href="/#kreasi" onClick={() => setActive(null)}>
                <span className="font-semibold text-white block">Generator Tokoh AI</span>
                <span className="text-[11px] text-[#cdb894] block">Kreasikan wayang baru lewat prompt</span>
              </HoveredLink>
              <HoveredLink href="/kreasi" onClick={() => setActive(null)}>
                <span className="font-semibold text-white block">Dialog Sang Empu</span>
                <span className="text-[11px] text-[#cdb894] block">Konsultasi filosofi & karakter</span>
              </HoveredLink>
              <div className="pt-2 border-t border-[#dedf42]/20">
                <Link
                  href="/kreasi"
                  onClick={() => setActive(null)}
                  className="text-[#dedf42] text-xs font-semibold hover:underline block"
                >
                  Buka Studio Sang Empu &rarr;
                </Link>
              </div>
            </div>
          </MenuItem>

        </div>

        {/* ── Right Slot: Katalog link + Signature Split CTA Button
            When scrolling down: slides left (-45px into center) and dissolves (width: 0)
            When scrolling up: slides back right (-45px -> 0) and expands (width: 240px) ── */}
        <motion.div
          animate={{
            width: isCompact ? 0 : 190,
            opacity: isCompact ? 0 : 1,
            x: isCompact ? -45 : 0,
          }}
          transition={springConfig}
          className="hidden min-[850px]:flex items-center justify-end gap-3.5 shrink-0 overflow-hidden pointer-events-auto mr-1 sm:mr-2"
        >

          {/* Exact Split Button from rbp-saas-template [ Mainkan Wayang | ↘ ] */}
          <Link
            href="/panduan"
            className="group relative inline-flex items-center active:scale-95 transition-transform shrink-0"
          >
            {/* Left black capsule */}
            <span className="relative z-10 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-black text-[#dedf42] text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors group-hover:bg-[#1a140e] shadow-lg whitespace-nowrap">
              Mainkan Wayang
            </span>
            {/* Right lime-chartreuse square with arrow that rotates on hover */}
            <span className="relative -left-px z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#dedf42] text-black flex items-center justify-center transition-colors group-hover:bg-[#e6e74e] shadow-lg shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-45"
                aria-hidden="true"
              >
                <path d="m7 7 10 10" />
                <path d="M17 7v10H7" />
              </svg>
            </span>
          </Link>
        </motion.div>

        {/* Mobile StaggeredMenu Trigger & Panel — React Bits GSAP Animation (Mobile Only) */}
        <div className="min-[850px]:hidden flex items-center shrink-0 mr-1 sm:mr-2">
          <StaggeredMenu
            items={STAGGERED_MENU_ITEMS}
            socialItems={STAGGERED_SOCIAL_ITEMS}
            colors={['#3d2814', '#1f130a', '#0b0604']}
            accentColor="#dedf42"
            panelBackground="#0d0805"
            textColor="#f4e7cd"
            displaySocials={true}
            displayItemNumbering={true}
            isFixed={true}
          />
        </div>
      </Menu>
    </motion.header>
  );
}
