'use client';

import React, { useCallback, useLayoutEffect, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { gsap } from 'gsap';
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export interface StaggeredMenuItem {
  label: string;
  ariaLabel?: string;
  link: string;
  badge?: string;
  highlight?: boolean;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed?: boolean;
  standalone?: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  panelBackground?: string;
  textColor?: string;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#3d2814', '#1f130a', '#0b0604'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl,
  menuButtonColor = '#dedf42',
  openMenuButtonColor = '#dedf42',
  changeMenuColorOnOpen = true,
  accentColor = '#dedf42',
  panelBackground = '#0d0805',
  textColor = '#f4e7cd',
  isFixed = true,
  standalone = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const [textLines] = useState<string[]>(['MENU', 'TUTUP']);
  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);

  const textInnerRef = useRef<HTMLSpanElement | null>(null);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);

  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, x: 0, opacity: 1 });
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, x: 0, opacity: 1 });
      }

      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });

      gsap.set(textInner, { yPercent: 0 });

      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position, mounted]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
    ) as HTMLElement[];
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];

    const offscreen = position === 'left' ? -100 : 100;
    const layerStates = layers.map((el) => ({ el, start: offscreen }));
    const panelStart = offscreen;

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as unknown as string]: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start, x: 0 },
        { xPercent: 0, x: 0, duration: 0.5, ease: 'power4.out' },
        i * 0.07
      );
    });
    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart, x: 0 },
      { xPercent: 0, x: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.9,
          ease: 'power4.out',
          stagger: { each: 0.08, from: 'start' },
        },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.55,
            ease: 'power2.out',
            ['--sm-num-opacity' as unknown as string]: 1,
            stagger: { each: 0.07, from: 'start' },
          },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle) {
        tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            },
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === 'left' ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      x: 0,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const numberEls = Array.from(
          panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
        ) as HTMLElement[];
        if (numberEls.length) {
          gsap.set(numberEls, { ['--sm-num-opacity' as unknown as string]: 0 });
        }

        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
        const socialLinks = Array.from(
          panel.querySelectorAll('.sm-socials-link')
        ) as HTMLElement[];
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(h, { rotate: 45, duration: 0.45 }, 0)
        .to(v, { rotate: -45, duration: 0.45 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.inOut' } })
        .to(h, { rotate: 0, duration: 0.32 }, 0)
        .to(v, { rotate: 90, duration: 0.32 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: opening ? -50 : 0,
      duration: 0.35,
      ease: 'power3.out',
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
      animateText(false);
    }
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

  useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  // The Toggle Button (rendered inline where StaggeredMenu is placed)
  // The Toggle Button — Pure Minimalist Text "MENU +" (No background box/pill)
  const toggleButtonElement = (
    <button
      ref={toggleBtnRef}
      className="sm-toggle pointer-events-auto relative inline-flex items-center justify-center gap-2 py-2 px-1 bg-transparent border-0 text-[#dedf42] font-mono text-xs font-bold tracking-widest uppercase cursor-pointer hover:opacity-85 active:scale-95 transition-opacity shadow-none outline-none focus:outline-none z-[80]"
      aria-label={open ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
      aria-expanded={open}
      aria-controls="staggered-menu-panel"
      onClick={toggleMenu}
      type="button"
    >
      {/* Slot-machine vertical ticker text: MENU <-> TUTUP */}
      <span
        className="sm-toggle-textWrap relative inline-flex items-center justify-center h-3.5 overflow-hidden whitespace-nowrap leading-none select-none min-w-[36px] text-center"
        aria-hidden="true"
      >
        <span ref={textInnerRef} className="sm-toggle-textInner flex flex-col leading-none">
          <span className="sm-toggle-line flex items-center justify-center h-3.5 leading-none text-[#dedf42] pt-[1.5px]">
            MENU
          </span>
          <span className="sm-toggle-line flex items-center justify-center h-3.5 leading-none text-[#dedf42] pt-[1.5px]">
            TUTUP
          </span>
        </span>
      </span>

      {/* Rotating + to X Icon */}
      <span
        ref={iconRef}
        className="sm-icon relative size-3.5 shrink-0 inline-flex items-center justify-center [will-change:transform]"
        aria-hidden="true"
      >
        <span
          ref={plusHRef}
          className="sm-icon-line absolute w-3.5 h-[2px] bg-[#dedf42] rounded-full [will-change:transform]"
          style={{ transformOrigin: '50% 50%' }}
        />
        <span
          ref={plusVRef}
          className="sm-icon-line sm-icon-line-v absolute w-3.5 h-[2px] bg-[#dedf42] rounded-full [will-change:transform]"
          style={{ transformOrigin: '50% 50%' }}
        />
      </span>
    </button>
  );

  // The Staggered Overlay (Prelayers + Main Panel)
  const overlayElement = (
    <div
      className={`sm-scope ${
        isFixed
          ? 'fixed inset-0 pointer-events-none z-[60] overflow-hidden'
          : 'relative w-full h-full'
      }`}
    >
      <div
        className={
          (className ? className + ' ' : '') +
          'staggered-menu-wrapper pointer-events-none relative w-full h-full'
        }
        style={
          {
            ['--sm-accent' as unknown as string]: accentColor,
            ['--sm-panel-bg' as unknown as string]: panelBackground,
            ['--sm-text-color' as unknown as string]: textColor,
          } as React.CSSProperties
        }
        data-position={position}
        data-open={open || undefined}
      >
        {/* Underlay Prelayers (staggered cascade sweeping in from right) */}
        <div
          ref={preLayersRef}
          className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5]"
          aria-hidden="true"
        >
          {(() => {
            const raw =
              colors && colors.length ? colors.slice(0, 4) : ['#3d2814', '#1f130a', '#0b0604'];
            const arr = [...raw];
            if (arr.length >= 3) {
              const mid = Math.floor(arr.length / 2);
              arr.splice(mid, 1);
            }
            return arr.map((c, i) => (
              <div
                key={i}
                className="sm-prelayer absolute top-0 right-0 h-full w-full"
                style={{ background: c }}
              />
            ));
          })()}
        </div>

        {/* Standalone Header (only rendered if standalone={true}) */}
        {standalone && (
          <header
            className="staggered-menu-header absolute top-0 left-0 w-full flex items-center justify-between px-5 py-4 bg-transparent pointer-events-none z-30"
            aria-label="Mobile navigation header"
          >
            <div className="sm-logo flex items-center select-none pointer-events-auto" aria-label="Logo">
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="sm-logo-img block h-8 w-auto object-contain"
                  draggable={false}
                />
              )}
            </div>
            {toggleButtonElement}
          </header>
        )}

        {/* Main Sliding Panel */}
        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className={`staggered-menu-panel absolute top-0 right-0 h-full flex flex-col px-6 pt-24 pb-8 overflow-y-auto z-10 backdrop-blur-2xl border-l border-[#dedf42]/20 shadow-[0_0_80px_rgba(0,0,0,0.95)] ${
            open ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
          aria-hidden={!open}
          inert={!open ? true : undefined}
        >
          <div className="sm-panel-inner flex-1 flex flex-col justify-between gap-6">
            {/* Staggered Navigation Items */}
            <ul
              className="sm-panel-list list-none m-0 p-0 flex flex-col gap-3"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items && items.length ? (
                items.map((it, idx) => (
                  <li
                    className="sm-panel-itemWrap relative overflow-hidden leading-tight"
                    key={it.label + idx}
                  >
                    <Link
                      className="sm-panel-item group relative font-serif italic text-[clamp(1.75rem,7.5vw,2.75rem)] font-normal cursor-pointer leading-tight tracking-tight uppercase transition-colors duration-200 inline-flex items-center gap-3 no-underline pr-8"
                      href={it.link}
                      aria-label={it.ariaLabel || it.label}
                      data-index={idx + 1}
                      tabIndex={open ? 0 : -1}
                      onClick={closeMenu}
                    >
                      <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform text-[#f4e7cd] group-hover:text-[#dedf42] transition-colors">
                        {it.label}
                      </span>
                      {it.badge && (
                        <span className="not-italic text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#dedf42] text-black tracking-widest uppercase shrink-0 shadow-sm">
                          {it.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))
              ) : (
                <li
                  className="sm-panel-itemWrap relative overflow-hidden leading-tight"
                  aria-hidden="true"
                >
                  <span className="sm-panel-item text-[#f4e7cd]">No items</span>
                </li>
              )}
            </ul>

            {/* Social / Cultural Quick Links at bottom */}
            {displaySocials && socialItems && socialItems.length > 0 && (
              <div
                className="sm-socials mt-auto pt-6 border-t border-[#dedf42]/20 flex flex-col gap-2.5"
                aria-label="Social links"
              >
                <h3 className="sm-socials-title m-0 text-xs font-mono font-bold tracking-[0.24em] text-[#dedf42] uppercase">
                  PANGGUNG & AKSES CEPAT
                </h3>
                <ul
                  className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-3 flex-wrap"
                  role="list"
                >
                  {socialItems.map((s, i) => (
                    <li key={s.label + i} className="sm-socials-item">
                      <Link
                        href={s.link}
                        tabIndex={open ? 0 : -1}
                        onClick={closeMenu}
                        className="sm-socials-link text-xs font-mono font-semibold text-[#f4e7cd]/80 hover:text-[#dedf42] transition-colors uppercase tracking-wider py-1 inline-block"
                      >
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
.sm-icon { position: relative; width: 14px; height: 14px; display: inline-flex; align-items: center; justify-content: center; }
.sm-icon-line { position: absolute; width: 14px; height: 2px; background: #dedf42; border-radius: 2px; }
.sm-toggle { position: relative; display: inline-flex; align-items: center; }
.sm-toggle-textWrap { position: relative; display: inline-block; overflow: hidden; white-space: nowrap; }
.sm-toggle-textInner { display: flex; flex-direction: column; }
.sm-toggle-line { display: block; }
.sm-scope .staggered-menu-panel { position: absolute; top: 0; right: 0; width: 100%; height: 100%; background: var(--sm-panel-bg, #0d0805); display: flex; flex-direction: column; z-index: 10; }
.sm-scope [data-position='left'] .staggered-menu-panel { right: auto; left: 0; }
.sm-scope .sm-prelayers { position: absolute; top: 0; right: 0; bottom: 0; width: 100%; pointer-events: none; z-index: 5; }
.sm-scope [data-position='left'] .sm-prelayers { right: auto; left: 0; }
.sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; transform: translateX(0); }
.sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; }
.sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; }
.sm-scope .sm-panel-item { position: relative; }
.sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; }
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); position: absolute; top: 0.15em; right: 0; font-family: monospace; font-size: 13px; font-weight: 700; color: var(--sm-accent, #dedf42); letter-spacing: 0.1em; pointer-events: none; user-select: none; opacity: var(--sm-num-opacity, 0); }
      `}</style>
    </div>
  );

  if (standalone) {
    return overlayElement;
  }

  // When used inside a navbar:
  // 1. Toggle button renders right inside the navbar's slot.
  // 2. Sliding layers & panel render via createPortal to document.body (when mounted).
  return (
    <>
      {toggleButtonElement}
      {mounted && createPortal(overlayElement, document.body)}
    </>
  );
};

export default StaggeredMenu;
