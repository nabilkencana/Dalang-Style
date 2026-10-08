'use client';

// Inspired by Super Hover by Daniel Petho (https://super-hover.danielpetho.com) — MIT licensed.
// Themed & harmonized for Wayang Jawi (Classical Javanese Digital Theatre).
import * as React from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createSuperHover } from '@/components/ui/super-hover-list-utils/super-hover';

export interface SuperHoverListItem {
  /** Stable key; falls back to the row index. @default undefined */
  id?: string | number;
  /** Primary cell, e.g. institution or publication title. */
  title: string;
  /** Secondary cell, e.g. descriptive archival summary. @default undefined */
  subtitle?: string;
  /** Trailing cell, e.g. category or year. @default undefined */
  meta?: string;
  /** Image revealed while the row is active (any URL or static asset). @default undefined */
  image?: string;
  /** External resource URL when clicked. @default undefined */
  href?: string;
}

export interface SuperHoverListProps {
  /** Rows to render in the index. */
  items: SuperHoverListItem[];
  /**
   * Layout presentation:
   * - `cards`: Classic Wayang Jawi interactive cards on canvas.
   * - `ledger`: Compact dark archive ledger with column headers.
   * @default "cards"
   */
  variant?: 'cards' | 'ledger';
  /**
   * `super` keeps the active row in sync while scrolling under a still cursor;
   * `native` uses the browser's `:hover` (only updates when the pointer moves).
   * @default "super"
   */
  mode?: 'super' | 'native';
  /**
   * Auto-scroll the list and walk the active row down it. Pauses while hovered.
   * @default false
   */
  autoplay?: boolean;
  /** Auto-scroll speed in pixels per frame when `autoplay` is on. @default 0.35 */
  speed?: number;
  /** Edge length of the revealed artwork in pixels. @default 140 */
  artworkSize?: number;
  /** Height of the scrollable container (used for ledger variant). @default undefined */
  height?: string | number;
  /** Extra classes for the outer container. @default undefined */
  className?: string;
}

/** Fraction down the viewport the autoplay "playhead" sits at. */
const AUTOPLAY_ANCHOR = 0.42;

export function SuperHoverList({
  items,
  variant = 'cards',
  mode = 'super',
  autoplay = false,
  speed = 0.35,
  artworkSize = 140,
  height,
  className,
}: SuperHoverListProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const rowRefs = React.useRef<(HTMLDivElement | HTMLAnchorElement | null)[]>([]);
  const hoveringRef = React.useRef(false);
  const autoActiveRef = React.useRef<HTMLElement | null>(null);

  // Double the rows for a seamless autoplay loop; render once otherwise.
  const rows = React.useMemo(
    () => (autoplay ? [...items, ...items] : items),
    [items, autoplay]
  );

  // Flip the artwork below its row when revealing it above would clip the viewport/container.
  const placeArtwork = React.useCallback(
    (row: HTMLElement | null) => {
      const root = rootRef.current;
      if (!row || !root || !root.contains(row)) return;
      const rootRect = root.getBoundingClientRect();
      const rowRect = row.getBoundingClientRect();
      // If inside viewport or scroll container, check if top would clip
      const topBoundary = Math.max(0, rootRect.top);
      const wouldClipTop = rowRect.top - artworkSize - 30 < topBoundary;
      row.toggleAttribute('data-artwork-below', wouldClipTop);
    },
    [artworkSize]
  );

  // Super Hover controller + artwork placement on dispatched events.
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || mode !== 'super') return;

    const ctrl = createSuperHover({ root });
    const onActive = (e: Event) => {
      const target = e.target;
      if (target instanceof Element) {
        placeArtwork(target.closest<HTMLElement>('[data-super-hover]'));
      }
    };

    root.addEventListener('superhoverenter', onActive);
    root.addEventListener('superhovermove', onActive);

    return () => {
      root.removeEventListener('superhoverenter', onActive);
      root.removeEventListener('superhovermove', onActive);
      ctrl.destroy();
    };
  }, [mode, placeArtwork]);

  // Native mode: place artwork on plain mouseover.
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || mode !== 'native') return;

    const onOver = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        placeArtwork(e.target.closest<HTMLElement>('[data-super-hover]'));
      }
    };

    root.addEventListener('mouseover', onOver);
    return () => root.removeEventListener('mouseover', onOver);
  }, [mode, placeArtwork]);

  // Autoplay: scroll the list and keep the row nearest the playhead active.
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || !autoplay) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let raf = 0;
    const setAutoActive = (row: HTMLElement | null) => {
      if (autoActiveRef.current === row) return;
      autoActiveRef.current?.removeAttribute('data-autoplay-active');
      autoActiveRef.current = row;
      if (row) {
        row.setAttribute('data-autoplay-active', '');
        placeArtwork(row);
      }
    };

    const frame = () => {
      if (!hoveringRef.current) {
        const first = rowRefs.current[0];
        const mid = rowRefs.current[items.length];
        const period = first && mid ? mid.offsetTop - first.offsetTop : 0;
        if (period > 0 && root.scrollTop >= period) root.scrollTop -= period;
        root.scrollTop += speed;

        const box = root.getBoundingClientRect();
        const anchor = box.top + box.height * AUTOPLAY_ANCHOR;
        let best: HTMLElement | null = null;
        let bestDist = Infinity;
        for (const row of rowRefs.current) {
          if (!row) continue;
          const rect = row.getBoundingClientRect();
          if (rect.bottom < box.top || rect.top > box.bottom) continue;
          const dist = Math.abs(rect.top + rect.height / 2 - anchor);
          if (dist < bestDist) {
            bestDist = dist;
            best = row;
          }
        }
        setAutoActive(best);
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      setAutoActive(null);
    };
  }, [autoplay, speed, placeArtwork, items.length]);

  // ═════════════════════════════════════════════════════════════════════════
  // VARIANT 1: "cards" — Restored Classic Wayang Jawi Card Layout with Animation
  // ═════════════════════════════════════════════════════════════════════════
  if (variant === 'cards') {
    return (
      <div
        ref={rootRef}
        onPointerEnter={() => {
          hoveringRef.current = true;
          autoActiveRef.current?.removeAttribute('data-autoplay-active');
          autoActiveRef.current = null;
        }}
        onPointerLeave={() => {
          hoveringRef.current = false;
        }}
        className={cn('space-y-3.5', className)}
      >
        {rows.map((item, i) => (
          <a
            key={item.id != null ? `${item.id}-${i}` : i}
            data-super-hover
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group relative p-4 sm:p-5 rounded-xl border border-black/20 bg-black/[0.03] transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 block outline-none',
              // Native hover styling
              'hover:bg-black hover:text-[#dedf42] hover:border-black hover:shadow-xl hover:-translate-y-0.5',
              // Super Hover active styling
              '[&[data-super-hover-active]]:bg-black [&[data-super-hover-active]]:text-[#dedf42] [&[data-super-hover-active]]:border-black [&[data-super-hover-active]]:shadow-xl [&[data-super-hover-active]]:-translate-y-0.5',
              // Artwork reveal when hovered or super-hover-active
              '[&:hover_.sh-art]:opacity-100 [&:hover_.sh-art]:scale-100',
              '[&[data-super-hover-active]_.sh-art]:opacity-100 [&[data-super-hover-active]_.sh-art]:scale-100',
              // Dynamic flip logic: flips below if top would clip
              '[&[data-artwork-below]_.sh-art]:top-[calc(100%+0.75rem)] [&[data-artwork-below]_.sh-art]:bottom-auto'
            )}
          >
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                {/* Category Badge */}
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-black/10 group-hover:bg-[#dedf42]/20 group-hover:text-[#dedf42] group-[[data-super-hover-active]]:bg-[#dedf42]/20 group-[[data-super-hover-active]]:text-[#dedf42] text-black/70 transition-colors">
                  {item.meta ?? 'Rujukan Budaya'}
                </span>

                {/* Institution Title */}
                <h4 className="font-serif font-bold text-sm sm:text-base text-black group-hover:text-[#dedf42] group-[[data-super-hover-active]]:text-[#dedf42] transition-colors flex items-center gap-2">
                  <span>{item.title}</span>
                  <ExternalLink className="size-3.5 opacity-60 group-hover:opacity-100 group-[[data-super-hover-active]]:opacity-100 transition-opacity" />
                </h4>
              </div>

              {/* Detail Paragraph */}
              {item.subtitle && (
                <p className="text-xs text-black/75 group-hover:text-[#dedf42]/85 group-[[data-super-hover-active]]:text-[#dedf42]/85 font-sans leading-relaxed transition-colors">
                  {item.subtitle}
                </p>
              )}
            </div>

            {/* Action Callout Button */}
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-black/60 group-hover:text-[#dedf42] group-[[data-super-hover-active]]:text-[#dedf42] shrink-0 flex items-center gap-1 transition-colors">
              <span>Lihat Sumber</span>
              <span>↗</span>
            </span>

            {/* Floating Super Hover Artwork Preview */}
            {item.image && (
              <div
                aria-hidden
                className="sh-art pointer-events-none absolute bottom-[calc(100%+0.75rem)] left-1/2 z-50 -translate-x-1/2 opacity-0 scale-95 transition-all duration-200 ease-out"
              >
                <div
                  className="rounded-2xl border-2 border-black bg-black p-1.5 shadow-[0_20px_45px_rgba(0,0,0,0.5)] flex flex-col items-center"
                  style={{ width: artworkSize * 1.5 }}
                >
                  <div
                    className="w-full aspect-[16/10] rounded-xl bg-cover bg-center overflow-hidden border border-[#dedf42]/30"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="w-full pt-1.5 px-1 flex items-center justify-between text-[9px] font-mono tracking-wider text-[#dedf42] uppercase">
                    <span className="truncate max-w-[140px] font-bold text-white">{item.title}</span>
                    <span className="shrink-0 flex items-center gap-0.5 text-[8px] bg-[#dedf42]/20 text-[#dedf42] px-1 py-0.5 rounded font-bold">
                      <span>BUKA</span>
                      <span>↗</span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </a>
        ))}
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════════════════
  // VARIANT 2: "ledger" — Compact Dark Archive Ledger
  // ═════════════════════════════════════════════════════════════════════════
  return (
    <div
      style={height ? { height } : undefined}
      className={cn(
        'relative w-full rounded-2xl sm:rounded-3xl border-2 border-black/80 bg-[#0c0908] text-[#f4e7cd] shadow-[0_20px_50px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col',
        className
      )}
    >
      <div className="z-10 w-full px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 border-b border-[#dedf42]/20 bg-[#140e0b] flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-widest text-[#dedf42] uppercase select-none">
        <div className="flex items-center gap-3">
          <span className="size-2 rounded-full bg-[#dedf42] animate-pulse" />
          <span className="font-bold">KATALOG RUJUKAN & SUMBER KAJIAN</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[#dedf42]/60">
          <span>ARAHKAN KURSOR UNTUK PRATINJAU</span>
          <span>•</span>
          <span className="text-[#dedf42] font-semibold">KLIK UNTUK MEMBUKA</span>
        </div>
      </div>

      <div
        ref={rootRef}
        onPointerEnter={() => {
          hoveringRef.current = true;
          autoActiveRef.current?.removeAttribute('data-autoplay-active');
          autoActiveRef.current = null;
        }}
        onPointerLeave={() => {
          hoveringRef.current = false;
        }}
        className="relative flex-1 cursor-pointer [scrollbar-width:thin] [scrollbar-color:#dedf42_#140e0b] overflow-x-hidden overflow-y-auto overscroll-contain px-3 sm:px-6 md:px-8 py-3 sm:py-4 select-none"
      >
        <div className="w-full flex flex-col divide-y divide-[#dedf42]/10">
          {rows.map((item, i) => {
            const rowNumber = String((i % items.length) + 1).padStart(3, '0');
            return (
              <a
                key={item.id != null ? `${item.id}-${i}` : i}
                data-super-hover
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'group relative grid grid-cols-[2.5rem_minmax(0,1fr)_auto] sm:grid-cols-[3rem_minmax(0,40%)_minmax(0,1fr)_auto] items-center gap-x-3 sm:gap-x-4 py-3 sm:py-3.5 px-2.5 sm:px-4 rounded-xl transition-all duration-200 outline-none',
                  'hover:bg-[#1a1410] hover:text-[#dedf42] hover:shadow-lg',
                  '[&[data-super-hover-active]]:bg-[#1a1410] [&[data-super-hover-active]]:text-[#dedf42] [&[data-super-hover-active]]:shadow-lg',
                  '[&:hover_.sh-art]:opacity-100 [&:hover_.sh-art]:scale-100',
                  '[&[data-super-hover-active]_.sh-art]:opacity-100 [&[data-super-hover-active]_.sh-art]:scale-100',
                  '[&[data-artwork-below]_.sh-art]:top-[calc(100%+0.75rem)] [&[data-artwork-below]_.sh-art]:bottom-auto'
                )}
              >
                <div className="font-mono text-xs tabular-nums text-[#dedf42]/60 group-hover:text-[#dedf42] group-[[data-super-hover-active]]:text-[#dedf42] transition-colors">
                  {rowNumber}
                </div>

                <div className="min-w-0 pr-2">
                  <div className="font-serif font-bold text-sm sm:text-base text-white group-hover:text-[#dedf42] group-[[data-super-hover-active]]:text-[#dedf42] transition-colors truncate flex items-center gap-2">
                    <span className="truncate">{item.title}</span>
                    {item.href && (
                      <ExternalLink className="size-3.5 shrink-0 opacity-0 group-hover:opacity-100 group-[[data-super-hover-active]]:opacity-100 transition-opacity" />
                    )}
                  </div>
                  {item.subtitle && (
                    <div className="sm:hidden text-[11px] text-[#f4e7cd]/65 font-sans truncate mt-0.5 group-hover:text-[#f4e7cd]/90">
                      {item.subtitle}
                    </div>
                  )}
                </div>

                <div className="hidden sm:block min-w-0 font-sans text-xs text-[#f4e7cd]/75 group-hover:text-[#f4e7cd]/95 transition-colors line-clamp-1 pr-4">
                  {item.subtitle ?? '—'}
                </div>

                <div className="flex items-center justify-end shrink-0">
                  <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full border border-[#dedf42]/25 bg-black/40 text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider text-[#dedf42] uppercase group-hover:border-[#dedf42]/60 group-hover:bg-[#dedf42]/15 transition-all">
                    {item.meta ?? 'RUJUKAN'}
                  </span>
                </div>

                {item.image && (
                  <div
                    aria-hidden
                    className="sh-art pointer-events-none absolute bottom-[calc(100%+0.75rem)] left-1/2 z-40 -translate-x-1/2 opacity-0 scale-95 transition-all duration-200 ease-out"
                  >
                    <div
                      className="rounded-2xl border-2 border-[#dedf42] shadow-[0_20px_45px_rgba(0,0,0,0.85)] overflow-hidden bg-black/95 p-1.5 flex flex-col items-center"
                      style={{ width: artworkSize * 1.5 }}
                    >
                      <div
                        className="w-full aspect-[16/10] rounded-xl bg-cover bg-center overflow-hidden border border-[#dedf42]/30"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="w-full pt-1.5 px-1 flex items-center justify-between text-[9px] font-mono tracking-wider text-[#dedf42] uppercase">
                        <span className="truncate max-w-[140px] font-bold">{item.title}</span>
                        <span className="shrink-0 flex items-center gap-0.5 text-[8px] bg-[#dedf42]/20 px-1 py-0.5 rounded">
                          <span>BUKA</span>
                          <span>↗</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SuperHoverList;
