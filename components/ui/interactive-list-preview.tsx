// Built using Hyperiux Vault: https://vault.hyperiux.com

"use client";

import React, { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import gsap from "gsap";

export interface InteractiveListItem {
  client: string;
  platform?: string;
  services: string;
  img: string;
  href?: string;
}

export interface InteractiveListPreviewProps {
  items?: InteractiveListItem[];
  /** Scale multiplier for the hover preview image. */
  imageSize?: number;
  /** Horizontal positioning of hover preview image relative to the list. */
  imagePosition?: "left" | "center" | "right";
  /** Preview image reveal / hide duration (seconds). */
  duration?: number;
  smoothness?: number;
  /** Pointer-follow smoothing; higher tracks faster. */
  lerp?: number;
  /** Background color of the list surface. */
  bgColor?: string;
  className?: string;
  activeTextColor?: string;
  inactiveTextColor?: string;
  highlightColor?: string;
}

const DEFAULT_IMAGE_Z_INDEX = 10;
const DEFAULT_IMAGE_SIZE = 1;
const DEFAULT_DURATION = 0.6;
const DEFAULT_SMOOTHNESS = 0.35;
const DEFAULT_LERP = 0.18;

const BASE_IMAGE_WIDTH_REM = 24.5;
const BASE_IMAGE_HEIGHT_REM = 15.5;
const IMAGE_OFFSET_MULTIPLIER = 16;
const IMAGE_HIDDEN_CLIP_PATH = "inset(50%)";
const IMAGE_VISIBLE_CLIP_PATH = "inset(0%)";
const IMAGE_VISIBILITY_HIDDEN = "hidden";
const IMAGE_VISIBILITY_VISIBLE = "visible";

function clampNumber(value: number, min: number, max: number, fallback: number) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(Math.max(number, min), max);
}

export default function InteractiveListPreview({
  items = [],
  imageSize = DEFAULT_IMAGE_SIZE,
  imagePosition = "left",
  duration = DEFAULT_DURATION,
  smoothness = DEFAULT_SMOOTHNESS,
  lerp = DEFAULT_LERP,
  bgColor = "transparent",
  className = "",
  activeTextColor = "#000000",
  inactiveTextColor = "#dedf42",
  highlightColor = "#dedf42",
}: InteractiveListPreviewProps) {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const highlightRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<Record<number, HTMLTableRowElement | null>>({});
  const pendingLeaveRef = useRef<Record<number, boolean>>({});
  const tweenGenerationRef = useRef<Record<number, number>>({});
  const activeIndexRef = useRef<number | null>(null);
  const zIndexRef = useRef(DEFAULT_IMAGE_Z_INDEX);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerCurrentRef = useRef({ x: 0, y: 0 });
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const reduceMotionRef = useRef(
    typeof window !== "undefined" &&
      (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false)
  );
  const safeImageSize = clampNumber(imageSize, 0.5, 2, DEFAULT_IMAGE_SIZE);
  const safeDuration = clampNumber(duration, 0.1, 2, DEFAULT_DURATION);
  const safeSmoothness = clampNumber(smoothness, 0.05, 1.5, DEFAULT_SMOOTHNESS);
  const safeLerp = clampNumber(lerp, 0.02, 1, DEFAULT_LERP);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const onChange = (event: MediaQueryListEvent) => {
      reduceMotionRef.current = event.matches;
      if (event.matches && imageContainerRef.current) {
        gsap.killTweensOf(imageContainerRef.current);
        gsap.set(imageContainerRef.current, { x: 0, y: 0 });
        pointerTargetRef.current = { x: 0, y: 0 };
        pointerCurrentRef.current = { x: 0, y: 0 };
      }
    };

    reduceMotionRef.current = mq.matches;
    if (mq.matches && imageContainerRef.current) {
      gsap.set(imageContainerRef.current, { x: 0, y: 0 });
      pointerTargetRef.current = { x: 0, y: 0 };
      pointerCurrentRef.current = { x: 0, y: 0 };
    }
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setIsCoarsePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let frameId: number;

    const tick = () => {
      const imageContainer = imageContainerRef.current;

      if (imageContainer && !reduceMotionRef.current) {
        const current = pointerCurrentRef.current;
        const target = pointerTargetRef.current;

        current.x += (target.x - current.x) * safeLerp;
        current.y += (target.y - current.y) * safeLerp;

        gsap.set(imageContainer, {
          x: current.x,
          y: current.y,
        });
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [safeLerp]);

  useEffect(() => {
    imageRefs.current.forEach((imageElement) => {
      if (!imageElement) return;

      if (reduceMotionRef.current) {
        gsap.set(imageElement, {
          clipPath: IMAGE_VISIBLE_CLIP_PATH,
          opacity: 0,
          visibility: IMAGE_VISIBILITY_HIDDEN,
        });
      } else {
        gsap.set(imageElement, {
          clipPath: IMAGE_HIDDEN_CLIP_PATH,
          visibility: IMAGE_VISIBILITY_HIDDEN,
        });
      }
    });

    if (!highlightRef.current) return;

    gsap.set(highlightRef.current, {
      opacity: 0,
      y: 0,
      height: 0,
    });
  }, []);

  const getNextTweenGeneration = (index: number) => {
    tweenGenerationRef.current[index] =
      (tweenGenerationRef.current[index] || 0) + 1;

    return tweenGenerationRef.current[index];
  };

  const setImageRef = (index: number, element: HTMLDivElement | null) => {
    imageRefs.current[index] = element;
  };

  const setRowTextColor = (index: number, color: string) => {
    const rowElement = rowRefs.current[index];

    if (!rowElement) return;

    gsap.to(rowElement.querySelectorAll("td, span, div"), {
      color,
      duration: safeSmoothness,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const moveHighlightToRow = (rowElement: HTMLTableRowElement | null) => {
    const tableElement = tableRef.current;
    const highlightElement = highlightRef.current;

    if (!tableElement || !highlightElement || !rowElement) return;

    const tableBounds = tableElement.getBoundingClientRect();
    const rowBounds = rowElement.getBoundingClientRect();

    gsap.to(highlightElement, {
      y: rowBounds.top - tableBounds.top,
      height: rowBounds.height,
      opacity: 1,
      duration: safeSmoothness,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const animateImageOut = (index: number) => {
    const imageElement = imageRefs.current[index];

    if (!imageElement) return;

    const tweenGeneration = getNextTweenGeneration(index);
    const reduceMotion = reduceMotionRef.current;

    gsap.killTweensOf(imageElement);

    gsap.to(imageElement, {
      ...(reduceMotion
        ? { opacity: 0 }
        : { clipPath: IMAGE_HIDDEN_CLIP_PATH, opacity: 0 }),
      duration: reduceMotion ? Math.min(safeSmoothness, 0.35) : safeDuration,
      ease: reduceMotion ? "power2.out" : "power3.inOut",
      onComplete: () => {
        if (tweenGenerationRef.current[index] !== tweenGeneration) return;

        gsap.set(imageElement, {
          visibility: IMAGE_VISIBILITY_HIDDEN,
        });
      },
    });
  };

  const onRowEnter = (rowElement: HTMLTableRowElement, index: number) => {
    const imageElement = imageRefs.current[index];

    if (!imageElement) return;

    const reduceMotion = reduceMotionRef.current;
    const previousIndex = activeIndexRef.current;

    pendingLeaveRef.current[index] = false;
    rowRefs.current[index] = rowElement;

    if (reduceMotion && previousIndex !== null && previousIndex !== index) {
      pendingLeaveRef.current[previousIndex] = false;
      animateImageOut(previousIndex);
    }

    zIndexRef.current += 1;

    const tweenGeneration = getNextTweenGeneration(index);

    gsap.killTweensOf(imageElement);

    if (reduceMotion) {
      gsap.set(imageElement, {
        zIndex: zIndexRef.current,
        visibility: IMAGE_VISIBILITY_VISIBLE,
        clipPath: IMAGE_VISIBLE_CLIP_PATH,
        opacity: 0,
      });

      gsap.to(imageElement, {
        opacity: 1,
        duration: Math.min(safeSmoothness, 0.35),
        ease: "power2.out",
        onComplete: () => {
          if (tweenGenerationRef.current[index] !== tweenGeneration) return;
          if (!pendingLeaveRef.current[index]) return;

          pendingLeaveRef.current[index] = false;
          animateImageOut(index);
        },
      });
    } else {
      gsap.set(imageElement, {
        zIndex: zIndexRef.current,
        visibility: IMAGE_VISIBILITY_VISIBLE,
        clipPath: IMAGE_HIDDEN_CLIP_PATH,
        opacity: 1,
      });

      gsap.to(imageElement, {
        clipPath: IMAGE_VISIBLE_CLIP_PATH,
        opacity: 1,
        duration: safeDuration,
        ease: "power2.inOut",
        onComplete: () => {
          if (tweenGenerationRef.current[index] !== tweenGeneration) return;
          if (!pendingLeaveRef.current[index]) return;

          pendingLeaveRef.current[index] = false;
          animateImageOut(index);
        },
      });
    }

    if (previousIndex !== null && previousIndex !== index) {
      setRowTextColor(previousIndex, inactiveTextColor);
    }

    activeIndexRef.current = index;

    setRowTextColor(index, activeTextColor);
    moveHighlightToRow(rowElement);
  };

  const onRowLeave = (index: number) => {
    const imageElement = imageRefs.current[index];

    if (!imageElement) return;

    if (gsap.isTweening(imageElement)) {
      pendingLeaveRef.current[index] = true;
      return;
    }

    animateImageOut(index);
  };

  const onTableLeave = () => {
    if (activeIndexRef.current !== null) {
      setRowTextColor(activeIndexRef.current, inactiveTextColor);
      activeIndexRef.current = null;
    }

    if (!highlightRef.current) return;

    gsap.to(highlightRef.current, {
      opacity: 0,
      duration: safeSmoothness,
      ease: "power2.out",
      overwrite: "auto",
    });

    pointerTargetRef.current = { x: 0, y: 0 };
  };

  const onMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (reduceMotionRef.current) return;
    if (!imageContainerRef.current) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    pointerTargetRef.current = {
      x: x * IMAGE_OFFSET_MULTIPLIER,
      y: y * IMAGE_OFFSET_MULTIPLIER,
    };
  };

  const handleRowClick = (item: InteractiveListItem) => {
    if (!item.href) return;
    if (item.href.startsWith("http://") || item.href.startsWith("https://")) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = item.href;
    }
  };

  return (
    <>
      {!isCoarsePointer && (
        <div
          style={{ backgroundColor: bgColor }}
          className={`relative w-full overflow-visible font-sans ${className}`}
          onMouseMove={onMouseMove}
        >
          {/* Active Row Highlight Bar */}
          <div
            ref={highlightRef}
            className="pointer-events-none absolute inset-x-0 top-0 z-10 rounded-lg shadow-lg"
            style={{ backgroundColor: highlightColor }}
          />

          {/* Floating Hover Preview Image Container */}
          <div
            ref={imageContainerRef}
            className="pointer-events-none absolute inset-0 z-40 overflow-visible"
          >
            {items.map((item, index) => {
              const positionClass =
                imagePosition === "center"
                  ? "left-[45%] top-1/2 -translate-y-1/2"
                  : imagePosition === "right"
                  ? "left-full ml-6 top-1/2 -translate-y-1/2"
                  : "right-full mr-6 lg:mr-8 top-1/2 -translate-y-1/2";

              return (
                <div
                  key={`${item.client}-${index}`}
                  ref={(element) => setImageRef(index, element)}
                  className={`invisible absolute ${positionClass} rounded-xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.95)] border-2 border-[#dedf42]/70 bg-black pointer-events-none`}
                  style={{
                    width: `${BASE_IMAGE_WIDTH_REM * safeImageSize}rem`,
                    height: `${BASE_IMAGE_HEIGHT_REM * safeImageSize}rem`,
                    willChange: "clip-path, opacity",
                    zIndex: DEFAULT_IMAGE_Z_INDEX,
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.client}
                    className="absolute inset-0 h-full w-full object-cover brightness-[0.95] contrast-[1.05]"
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-white/10 pointer-events-none" />
                <div className="absolute bottom-2.5 left-3 right-3 text-[10px] font-sans font-bold text-white tracking-wider uppercase bg-black/75 px-2.5 py-1 rounded backdrop-blur-sm truncate">
                  {item.platform ? `${item.platform} • ` : ""}
                  {item.client}
                </div>
              </div>
            );
          })}
        </div>

          <div
            ref={tableRef}
            className="relative w-full"
            onMouseLeave={onTableLeave}
          >
            <table className="relative z-30 w-full table-fixed border-collapse">
              <colgroup>
                <col style={{ width: "8%" }} />
                <col style={{ width: "67%" }} />
                <col style={{ width: "25%" }} />
              </colgroup>

              <tbody className="divide-y divide-[#dedf42]/20 border-y border-[#dedf42]/25">
                {items.map((item, index) => (
                  <tr
                    key={`${item.client}-${index}`}
                    onClick={() => handleRowClick(item)}
                    onMouseEnter={(event) =>
                      onRowEnter(event.currentTarget, index)
                    }
                    onMouseLeave={() => onRowLeave(index)}
                    className="cursor-pointer group transition-colors"
                  >
                    {/* Index */}
                    <td className="whitespace-nowrap px-3 py-3.5 font-mono text-xs font-bold opacity-60">
                      0{index + 1}
                    </td>

                    {/* Article Details: Platform/Category + Title */}
                    <td className="px-3 py-3.5">
                      <div className="flex flex-col">
                        {item.platform && (
                          <span className="text-[9px] font-sans font-bold tracking-[0.2em] uppercase opacity-75 mb-0.5">
                            {item.platform}
                          </span>
                        )}
                        <span className="font-playfair text-[clamp(13px,1.4cqi,18px)] font-normal tracking-[-0.01em] leading-snug line-clamp-1">
                          {item.client}
                        </span>
                      </div>
                    </td>

                    {/* Action Link / Services */}
                    <td className="whitespace-nowrap px-3 py-3.5 text-right font-sans text-xs font-bold uppercase tracking-wider">
                      <span className="inline-flex items-center gap-1 group-hover:translate-x-1.5 transition-transform duration-200">
                        <span className="hidden sm:inline">
                          {item.services || "Buka"}
                        </span>
                        <span>↗</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isCoarsePointer && (
        <div
          style={{ backgroundColor: bgColor }}
          className={`w-full font-sans text-white ${className}`}
        >
          {items.map((item, index) => (
            <div
              key={`${item.client}-${index}`}
              onClick={() => handleRowClick(item)}
              className="flex border-b border-[#dedf42]/20 py-3 cursor-pointer group active:bg-white/5"
            >
              <div className="flex w-3/5 flex-col justify-between gap-2 pr-3">
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-xs font-bold text-[#dedf42]/60">
                    0{index + 1}
                  </span>
                  {item.platform && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#dedf42]/75">
                      {item.platform}
                    </span>
                  )}
                  <h4 className="font-playfair text-sm text-[#f4e7cd] line-clamp-2 leading-snug">
                    {item.client}
                  </h4>
                </div>

                <span className="text-[10px] font-sans font-bold text-[#dedf42] uppercase tracking-wider flex items-center gap-1">
                  <span>{item.services || "Buka Berita"}</span>
                  <span>↗</span>
                </span>
              </div>

              <div className="relative aspect-[16/10] h-20 w-2/5 rounded-lg overflow-hidden border border-[#dedf42]/30 bg-black">
                <img
                  src={item.img}
                  alt={item.client}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
