// Built using Hyperiux Vault: https://vault.hyperiux.com

"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
const IMG_BASE =
  "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/stack-spread";

const IMG = {
  plane: `${IMG_BASE}/img1.png`,
  painting: `${IMG_BASE}/img2.png`,
  breaker: `${IMG_BASE}/img3.png`,
  dog: `${IMG_BASE}/img4.png`,
  footballer: `${IMG_BASE}/img5.png`,
  jacket: `${IMG_BASE}/img6.png`,
  meadow: `${IMG_BASE}/img7.png`,
  stripes: `${IMG_BASE}/img8.png`,
} as const;

// per-image rest scale, keyed by img index (1-8). default 1, drop below to shrink.
const SCALE: Partial<Record<number, number>> = {
  1: 0.88,
  2: 0.82,
  3: 0.88,
  4: 0.82,
  5: 0.82,
  6: 0.88,
  7: 0.88,
  8: 0.75,
};
const s = (i: number) => SCALE[i] ?? 1;

// array order = stack order, back (z 2) -> front (z 9)
export const DEFAULT_CARDS: StackSpreadCard[] = [
  // top-left stripes (img08) — sm row 1 left
  {
    item: { src: IMG.stripes, alt: "Colour stripes" },
    stackOffset: { x: -8, y: -10 },
    stackRotate: -18,
    target: { x: -20, y: -34, rotate: 0, scale: s(8), w: 17, h: 22 },
    targetSm: { x: -22, y: -40 },
    z: 2,
  },
  // top-right meadow (img07) — sm row 1 right
  {
    item: { src: IMG.meadow, alt: "Wildflower meadow" },
    stackOffset: { x: 14, y: -10 },
    stackRotate: 20,
    target: { x: 32, y: -30, rotate: 0, scale: s(7), w: 18, h: 32 },
    targetSm: { x: 22, y: -40 },
    z: 3,
  },
  // mid-left jacket (img06) — sm row 2 left
  {
    item: { src: IMG.jacket, alt: "Figure in a leather jacket" },
    stackOffset: { x: -16, y: 0 },
    stackRotate: -4,
    target: { x: -36, y: -2, rotate: 0, scale: s(6), w: 15, h: 32 },
    targetSm: { x: -22, y: -19 },
    z: 4,
  },
  // top-centre footballer (img05) — sm row 2 right
  {
    item: { src: IMG.footballer, alt: "Footballer mid-kick" },
    stackOffset: { x: 1, y: -10 },
    stackRotate: -2,
    target: { x: 6, y: -32, rotate: 0, scale: s(5), w: 25, h: 30 },
    targetSm: { x: 22, y: -19 },
    z: 5,
  },
  // mid-right dog (img04) — sm row 3 left
  {
    item: { src: IMG.dog, alt: "Terrier in profile" },
    stackOffset: { x: 18, y: 1 },
    stackRotate: 6,
    target: { x: 37, y: 6, rotate: 0, scale: s(4), w: 18, h: 32 },
    targetSm: { x: -22, y: 20 },
    z: 6,
  },
  // bottom-left breaker (img03) — sm row 3 right
  {
    item: { src: IMG.breaker, alt: "Breakdancer holding a pose" },
    stackOffset: { x: -6, y: 10 },
    stackRotate: 6,
    target: { x: -24, y: 34, rotate: 0, scale: s(3), w: 22, h: 25 },
    targetSm: { x: 22, y: 20 },
    z: 7,
  },
];

// 6 Authentic Lakon Wayang Story Cards (16:9 widescreen) perfectly framing the center narrative and CTA
export const WAYANG_STORY_CARDS: StackSpreadCard[] = [
  // 1. Lakon Anoman Obong (Top-Left)
  {
    item: { src: "/images/stories/anoman-obong.webp", alt: "Lakon Anoman Obong" },
    stackOffset: { x: -7, y: -8 },
    stackRotate: -12,
    target: { x: -33, y: -30, rotate: -4.5, scale: 0.98, w: 28, h: 16 },
    targetSm: { x: -24, y: -38 },
    z: 2,
  },
  // 2. Lakon Gatotkaca Gugur (Top-Center)
  {
    item: { src: "/images/stories/gatotkaca-gugur.webp", alt: "Lakon Gatotkaca Gugur" },
    stackOffset: { x: 0, y: -7 },
    stackRotate: -2,
    target: { x: 0, y: -34, rotate: 0.5, scale: 1.0, w: 29, h: 16.5 },
    targetSm: { x: 24, y: -38 },
    z: 3,
  },
  // 3. Lakon Karna Tandhing (Top-Right)
  {
    item: { src: "/images/stories/karna-tandhing.webp", alt: "Lakon Karna Tandhing" },
    stackOffset: { x: 9, y: -6 },
    stackRotate: 12,
    target: { x: 33, y: -30, rotate: 4.5, scale: 0.98, w: 28, h: 16 },
    targetSm: { x: 24, y: -16 },
    z: 4,
  },
  // 4. Lakon Dewa Ruci (Bottom-Left)
  {
    item: { src: "/images/stories/dewa-ruci.webp", alt: "Lakon Dewa Ruci" },
    stackOffset: { x: -9, y: 5 },
    stackRotate: -5,
    target: { x: -33, y: 30, rotate: -3.5, scale: 0.98, w: 28, h: 16 },
    targetSm: { x: -24, y: -16 },
    z: 5,
  },
  // 5. Lakon Sayembara Mantili (Bottom-Center)
  {
    item: { src: "/images/stories/sayembara-mantili.webp", alt: "Lakon Sayembara Mantili" },
    stackOffset: { x: 2, y: 6 },
    stackRotate: 3,
    target: { x: 0, y: 35, rotate: -0.5, scale: 1.0, w: 29, h: 16.5 },
    targetSm: { x: -24, y: 28 },
    z: 6,
  },
  // 6. Lakon Petruk Dadi Ratu (Bottom-Right)
  {
    item: { src: "/images/stories/petruk-dadi-ratu.webp", alt: "Lakon Petruk Dadi Ratu" },
    stackOffset: { x: 8, y: 7 },
    stackRotate: -3,
    target: { x: 33, y: 30, rotate: 3.5, scale: 0.98, w: 28, h: 16 },
    targetSm: { x: 24, y: 28 },
    z: 7,
  },
];

// ---------------------------------------------------------------------------
// Mechanism
// ---------------------------------------------------------------------------

const SCATTER_START = 0.05;
const SCATTER_END = 0.92;

const PARALLAX_X = 2.6;
const PARALLAX_Y = 2.2;
const PARALLAX_SPRING = { stiffness: 90, damping: 22, mass: 0.6 };
const parallaxDepth = (i: number, total: number) =>
  total <= 1 ? 1 : 0.55 + (i / (total - 1)) * 0.75;

const SUB = "Digital products, interfaces, and experiences built around people.";

const RESPONSIVE = {
  desktop: {
    scale: null as number | null,
    small: false,
    colX: null as number | null,
    card: null as { w: number; h: number } | null,
  },
  small: {
    scale: 0.72,
    small: true,
    colX: 22,
    card: { w: 40, h: 20 },
  },
};

function useResponsive() {
  const [r, setR] = useState(RESPONSIVE.desktop);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const read = () => setR(mq.matches ? RESPONSIVE.small : RESPONSIVE.desktop);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);
  return r;
}

function usePointerParallax(active: boolean, enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, PARALLAX_SPRING);
  const y = useSpring(rawY, PARALLAX_SPRING);

  useEffect(() => {
    if (!enabled) return;

    if (!active) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth) * 2 - 1);
      rawY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [active, enabled, rawX, rawY]);

  return { x, y };
}

export interface StackSpreadItem {
  src: string;
  alt?: string;
}

export interface StackSpreadTarget {
  x: number;
  y: number;
  rotate: number;
  scale?: number;
  w: number;
  h: number;
}

export interface StackSpreadCard {
  item: StackSpreadItem;
  target: StackSpreadTarget;
  targetSm?: { x: number; y: number };
  stackRotate?: number;
  stackOffset?: { x: number; y: number };
  z?: number;
}

function Card({
  card,
  progress,
  reduce,
  clusterRotation,
  scaleMul,
  isSmall,
  colX,
  fixedCard,
  stackScale,
  cardRadius,
  pointer,
  depth,
}: {
  card: StackSpreadCard;
  progress: MotionValue<number>;
  reduce: boolean | null;
  clusterRotation: boolean;
  scaleMul: number | null;
  isSmall: boolean;
  colX: number | null;
  fixedCard: { w: number; h: number } | null;
  stackScale: number;
  cardRadius: number;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  depth: number;
}) {
  const { item, target } = card;

  const flat = reduce === true;
  const stackRotate = flat ? 0 : clusterRotation ? card.stackRotate ?? 0 : 0;
  const stackOffset = card.stackOffset ?? { x: 0, y: 0 };
  const restScale = scaleMul ?? target.scale ?? 1;

  const sm = isSmall && card.targetSm ? card.targetSm : null;
  const endX = sm
    ? colX != null
      ? Math.sign(sm.x) * colX
      : sm.x
    : target.x;
  const endY = sm ? sm.y : target.y;
  const endRotate = flat || isSmall ? 0 : target.rotate;

  const xTransform = useTransform(
    [progress, pointer.x],
    ([p, px]: number[]) => {
      const tx = stackOffset.x + (endX - stackOffset.x) * p;
      const drift = depth * p;
      const dx = tx - px * PARALLAX_X * drift;
      return `calc(-50% + ${dx}vw)`;
    }
  );

  const yTransform = useTransform(
    [progress, pointer.y],
    ([p, py]: number[]) => {
      const ty = stackOffset.y + (endY - stackOffset.y) * p;
      const drift = depth * p;
      const dy = ty - py * PARALLAX_Y * drift;
      return `calc(-50% + ${dy}vh)`;
    }
  );

  const rotate = useTransform(progress, [0, 1], [stackRotate, endRotate]);
  const scale = useTransform(progress, [0, 1], [stackScale, restScale]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform pointer-events-auto"
      style={{
        width: isSmall ? "46vw" : `${fixedCard ? fixedCard.w : target.w}vw`,
        aspectRatio: "16 / 9",
        zIndex: card.z ?? 1,
        x: xTransform,
        y: yTransform,
        rotate,
        scale,
      }}
    >
      <CardFace item={item} cardRadius={cardRadius} />
    </motion.div>
  );
}

function CardFace({
  item,
  cardRadius,
}: {
  item: StackSpreadItem;
  cardRadius: number;
}) {
  return (
    <div
      className="relative h-full w-full overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.5)] bg-[#0e0805] group"
      style={{ borderRadius: `${cardRadius}px` }}
    >
      <Image
        src={item.src}
        alt={item.alt ?? ""}
        fill
        draggable={false}
        className="object-cover select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 45vw, 30vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
      {item.alt && (
        <div className="absolute bottom-2 sm:bottom-2.5 inset-x-2.5 sm:inset-x-3 pointer-events-none">
          <span className="font-serif italic font-bold text-[11px] sm:text-xs md:text-sm text-[#f5ecd9] drop-shadow-md truncate block">
            {item.alt}
          </span>
        </div>
      )}
    </div>
  );
}

export interface StackSpreadStageProps {
  id?: string;
  cards: StackSpreadCard[];
  progress?: MotionValue<number>;
  scrollLength?: number;
  bgColor?: string;
  clusterRotation?: boolean;
  stackScale?: number;
  cardRadius?: number;
  textColor?: string;
  title?: React.ReactNode;
  subtitle?: string;
  cta?: React.ReactNode;
  textFadeStart?: number;
  showScrollHint?: boolean;
  className?: string;
}

export function StackSpreadStage({
  id,
  cards,
  progress: customProgress,
  scrollLength = 250,
  bgColor = "#dedf42",
  clusterRotation = true,
  stackScale = 0.85,
  cardRadius = 6,
  textColor = "#0b0604",
  title,
  subtitle = SUB,
  cta,
  textFadeStart = 0.15,
  showScrollHint = true,
  className = "",
}: StackSpreadStageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scale: scaleMul, small: isSmall, colX, card: fixedCard } =
    useResponsive();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const internalProgress = useTransform(
    scrollYProgress,
    [0, SCATTER_START, SCATTER_END, 1],
    [0, 0, 1, 1],
  );

  const effectiveProgress = customProgress ?? internalProgress;

  const [spread, setSpread] = useState(false);
  useMotionValueEvent(effectiveProgress, "change", (p) => {
    setSpread((was) => (was ? p > 0.95 : p >= 0.98));
  });
  const parallaxEnabled = reduce !== true && !isSmall;
  const pointer = usePointerParallax(spread, parallaxEnabled);

  const noScale = reduce === true;
  const copyOpacity = useTransform(effectiveProgress, [textFadeStart, textFadeStart + 0.35], [0.15, 1]);
  const copyScale = useTransform(effectiveProgress, [textFadeStart, 0.9], [0.88, 1]);
  const hintOpacity = useTransform(effectiveProgress, [0, SCATTER_START * 2], [1, 0]);

  // When customProgress is passed, the wrapper fits 100% of its parent container (no extra scroll height)
  const isDrivenExternally = !!customProgress;

  return (
    <section
      ref={wrapRef}
      id={id}
      className={`relative w-full ${isDrivenExternally ? "h-full" : ""} ${className}`}
      style={{
        height: isDrivenExternally ? "100%" : `${scrollLength}vh`,
        backgroundColor: bgColor,
      }}
    >
      <div className={`${isDrivenExternally ? "relative h-full" : "sticky top-0 h-screen"} w-full overflow-hidden flex items-center justify-center`}>
        {/* centre text & interactive CTA */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center max-md:px-8"
          style={{
            opacity: copyOpacity,
            scale: noScale ? 1 : copyScale,
          }}
        >
          {title ? (
            typeof title === "string" ? (
              <h2
                className="w-full whitespace-pre-line text-[4.2vw] font-bold leading-tight tracking-tight max-md:text-[8.5vw]"
                style={{ color: textColor }}
              >
                {title}
              </h2>
            ) : (
              title
            )
          ) : (
            <h2
              className="w-full whitespace-pre-line text-[4.5vw] font-normal leading-none! tracking-tight max-md:text-[10vw]"
              style={{ color: textColor }}
            >
              Design
              <span className="opacity-60"> That </span>
              Responds.
            </h2>
          )}
          {subtitle && (
            <p
              className="mt-[1.2vw] w-full max-w-[50ch] text-[1.2vw] leading-relaxed tracking-tight max-md:mt-3 max-md:text-[3.8vw]"
              style={{ color: textColor, opacity: 0.85 }}
            >
              {subtitle}
            </p>
          )}
          {cta && (
            <div className="pointer-events-auto mt-[1.8vw] max-md:mt-4 z-30">
              {cta}
            </div>
          )}
        </motion.div>

        {/* scattering cards */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {cards.map((card, i) => (
            <Card
              key={i}
              card={card}
              progress={effectiveProgress}
              reduce={reduce}
              clusterRotation={clusterRotation}
              scaleMul={scaleMul}
              isSmall={isSmall}
              colX={colX}
              fixedCard={fixedCard}
              stackScale={stackScale}
              cardRadius={cardRadius}
              pointer={pointer}
              depth={parallaxEnabled ? parallaxDepth(i, cards.length) : 0}
            />
          ))}
        </div>

        {/* scroll hint */}
        {showScrollHint && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-[4vh] z-20 flex flex-col items-center gap-[0.6vh] text-[0.85vw] font-mono font-bold uppercase tracking-[0.2em] max-md:bottom-8 max-md:gap-1 max-md:text-[3vw]"
            style={{ color: textColor, opacity: hintOpacity }}
          >
            <span>Gulir untuk Menyebar</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-bounce max-md:h-[4.5vw] max-md:w-[4.5vw]"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export interface StackSpreadProps {
  id?: string;
  cards?: StackSpreadCard[];
  progress?: MotionValue<number>;
  scrollLength?: number;
  bgColor?: string;
  clusterRotation?: boolean;
  stackScale?: number;
  cardRadius?: number;
  textColor?: string;
  title?: React.ReactNode;
  subtitle?: string;
  cta?: React.ReactNode;
  textFadeStart?: number;
  showScrollHint?: boolean;
  className?: string;
}

export default function StackSpread({
  id,
  cards = DEFAULT_CARDS,
  progress,
  scrollLength = 250,
  bgColor = "#dedf42",
  clusterRotation = true,
  stackScale = 0.85,
  cardRadius = 12,
  textColor = "#0b0604",
  title,
  subtitle = SUB,
  cta,
  textFadeStart = 0.15,
  showScrollHint = true,
  className = "",
}: StackSpreadProps) {
  return (
    <StackSpreadStage
      id={id}
      cards={cards}
      progress={progress}
      scrollLength={scrollLength}
      bgColor={bgColor}
      clusterRotation={clusterRotation}
      stackScale={stackScale}
      cardRadius={cardRadius}
      textColor={textColor}
      title={title}
      subtitle={subtitle}
      cta={cta}
      textFadeStart={textFadeStart}
      showScrollHint={showScrollHint}
      className={className}
    />
  );
}
