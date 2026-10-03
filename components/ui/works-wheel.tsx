"use client";

// A portfolio index built as a wheel you turn.
//
// At rest the work sits in a ring around a title, each card tangent to the
// circle. The first notch of scroll blows the ring open into a vertical drum:
// the card at the front lies flat and full size, the ones above and below
// rotate away into hard perspective and run off the top and bottom of the
// frame. Keep turning and the drum carries the next piece round to the front.
//
// The whole thing is one number - `turn` - read by a single rAF pass that writes
// transforms straight to the DOM. 0 is the ring, 1 is the drum with item 0 at
// the front, and every whole number after that is one more item turned past.
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { OriginButton } from "@/components/ui/origin-button";
import { cn } from "@/lib/utils";
export interface WorksWheelItem {
  /** Project name. Shown beside the front card and in the index. */
  title: string;
  /** Character role or category (e.g. Satria Pandawa, Punakawan) */
  role?: string;
  /** Philosophical description of the character */
  description?: string;
  /** Cover art. Any src an <img> takes. */
  image: string;
  /** Where the card links to. Omit for a wheel that only browses. */
  href?: string;
}

export interface WorksWheelProps extends Omit<
  React.ComponentPropsWithoutRef<"section">,
  "children"
> {
  items: WorksWheelItem[];
  /** Sits in the middle of the ring. @default undefined */
  label?: string;
  /** Label on the card's hover affordance. Omit to drop it. @default undefined */
  action?: string;
  /** Whether the wheel starts as a flat ring (0) or open drum (1). @default 'drum' */
  initialMode?: "ring" | "drum";
  /** Controlled turn value from parent ScrollTrigger (1 to items.length) */
  controlledTurn?: number;
  /** Callback when active index changes */
  onActiveChange?: (index: number) => void;
  /** Callback when an index item is clicked */
  onSelectCharacter?: (index: number) => void;
}

/* Geometry. The card is measured against the stage; everything else is measured
   against the card, so a narrow stage - where the card is capped by width, not
   height - scales the whole wheel down with it instead of leaving a small card
   swinging on a huge drum. The three that matter are tuned together: STEP
   against DRUM sets how hard the neighbours rotate away, and DRUM against LENS
   decides whether they land inside the frame or run off it. */
const CARD_H = 0.58; // front card height (enlarged significantly for bold, majestic wayang presentation)
const CARD_MAX_W = 0.62; // ... proportional width (~640px-680px on desktop)
const CARD_RATIO = 1.78; // card width / height (matches 1024x572 wayang cards)
const STEP = 46; // degrees between cards on drum (rotates neighbours away faster into depth)
const DRUM = 2.45; // drum radius (pushes top/bottom neighbours further back in Z-space)
const LENS = 2.4; // perspective distance
const RING_R = 1.18; // ring radius
/* The drum alone hangs the work on a plumb line. It isn't one: the strip curves
   away round an arc whose centre sits off to the LEFT, so the piece at the front
   is at the arc's near point - dead centre - and its neighbours have already
   swung back left as well as up and down. BOW is that arc's radius; nothing else
   makes the difference between a stack of cards and a wheel seen side on. */
const BOW = 1.65;
const TITLE = 0.124; // ring label and front-card title
const INDEX = 0.04; // the index down the right-hand side
/** Items either side of the front still worth drawing. Past this a card is
    edge-on, and further round it would stack up on the vanishing point. */
const CULL = 1.6;

/** How much of a dragged pixel counts as one item. */
const DRAG_UNITS = 420;
/** Fraction of the remaining distance closed each frame. Tuned to 0.08 for buttery cinematic glide. */
const EASE = 0.08;
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Stage = { w: number; h: number };

const rad = (deg: number) => (deg * Math.PI) / 180;

/** How far left the arc has carried something that has turned `drumDeg` off the
    front. Zero at the front, so the piece being read stays centred. */
const bowAt = (drumDeg: number, bow: number) =>
  -bow * (1 - Math.cos(rad(drumDeg)));

/** Both states in one chain: the ring terms fall away as `m` reaches the drum,
    and the drum terms are still zero while the ring is up. The bow is applied
    first, in the wheel's own plane, so it slides the card sideways rather than
    turning with it - and perspective still shrinks it with distance. */
function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number,
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export function WorksWheel({
  items,
  label = "TOKOH WAYANG",
  action = "Jelajahi",
  initialMode = "drum",
  controlledTurn,
  onActiveChange,
  onSelectCharacter,
  className,
  ...props
}: WorksWheelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dragStartY = React.useRef<number | null>(null);
  const hasDragged = React.useRef(false);
  // everything else is written to the DOM, so turning the wheel is not a render.
  const startVal = 1;
  const turn = React.useRef(startVal);
  const target = React.useRef(startVal);
  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });

  const count = items.length;
  const last = Math.max(count - 1, 0);

  // Read after mount, not during render: the server has no matchMedia, and
  // branching on it inline is a hydration mismatch. Reduced motion drops the
  // easing, so the wheel lands where it is put instead of gliding there.
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * RING_R;
    // Shrink the ring's cards until the circle reads as a closed loop rather
    // than beads on a wire, however many pieces the wheel is given.
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1;
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: cardH * TITLE,
      index: cardH * INDEX,
    };
  }, [stage, count]);

  // One pass per frame: ease toward the target, then write every transform.
  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = Math.max(1, turn.current);
      const m = 1;
      const pos = t - 1;

      // Organic living blencong light breathing animation
      const now = performance.now();
      const flameTime = now * 0.0018;

      // The drum is pulled back so its front face lands on the picture plane.
      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }
      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(
            d * (360 / count),
            drumDeg,
            ringR,
            drumR,
            bow,
            m,
          );
          // Culled by distance, not by angle: at a full turn the far side comes
          // back round to face us, and everything past the neighbours lands on
          // the vanishing point in a heap.
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));

          // 1. Realistic 3D Depth Illumination: dim cards rotating away
          const absD = Math.abs(d);
          const brightness = m > 0 ? Math.max(0.40, 1 - absD * 0.32) : 1;
          const contrast = m > 0 ? Math.max(0.88, 1 - absD * 0.06) : 1;
          card.style.filter = `brightness(${brightness}) contrast(${contrast})`;

          // Dynamic Blencong flame micro-breathing (subtle organic flame flicker)
          const flickerX = Math.sin(flameTime * 1.5 + i * 1.2) * 3.5;
          const flickerY = Math.cos(flameTime * 1.2 + i * 1.2) * 2.5;
          const flickerAlpha = Math.sin(flameTime * 2.0 + i) * 0.03;

          // 2. Translucent Box Shadow tilted deeply to bottom-left (-X, +Y) with zero blur & flame breathing
          const shadowLayer = card.querySelector(".card-shadow-layer") as HTMLElement | null;
          if (shadowLayer) {
            // Tilted deeply to bottom-left (-32px, +30px) proportional to enlarged card
            const shadowX = -32 + Math.round(flickerX * 0.7) - Math.round(d * 5);
            const shadowY = 30 + Math.round(flickerY * 0.7) + Math.round(d * 12);
            const shadowAlpha = (Math.max(0.12, 0.34 - absD * 0.12 + flickerAlpha) * m).toFixed(2);
            shadowLayer.style.boxShadow = `${shadowX}px ${shadowY}px 0px 0px rgba(0, 0, 0, ${shadowAlpha})`;
          }

          // 3. Floating 3D Back-Shadow Card — Decoupled in 3D space (-28px Z) for genuine parallax
          const backShadow = card.querySelector(".card-back-shadow") as HTMLElement | null;
          if (backShadow) {
            const backShadowOpacity = Math.max(0, 0.38 - absD * 0.15 + flickerAlpha) * m;
            backShadow.style.opacity = String(backShadowOpacity);
            // Deep in Z-space (-28px) with rotation stretch and perspective skewing
            const bsX = -32 + flickerX - d * 7;
            const bsY = 30 + flickerY + d * 14;
            const bsSkew = d * -2.5;
            backShadow.style.transform = `translateZ(-28px) translateX(${bsX}px) translateY(${bsY}px) skewX(${bsSkew}deg)`;
          }
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);
      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  const to = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 1, last + 1);
    },
    [last],
  );
  // When controlled externally by ScrollTrigger, update target smoothly & auto-snap when stopped
  React.useEffect(() => {
    if (controlledTurn !== undefined && Number.isFinite(controlledTurn)) {
      to(controlledTurn);

      // Auto-snap to nearest whole integer character when user stops scrolling
      window.clearTimeout(settling.current);
      settling.current = window.setTimeout(() => {
        to(Math.round(target.current));
      }, 180);
    }
  }, [controlledTurn, to]);
  React.useEffect(() => {
    onActiveChange?.(active);
  }, [active, onActiveChange]);



  const drag = React.useRef<number | null>(null);
  const settling = React.useRef(0);

  return (
    <section
      aria-label={label}
      className={cn(
        "bg-background text-foreground relative h-full min-h-[26rem] w-full overflow-hidden select-none",
        className,
      )}
      {...props}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className="focus-visible:outline-foreground absolute inset-0 cursor-grab touch-pan-x outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 active:cursor-grabbing"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          drag.current = event.clientY;
          dragStartY.current = event.clientY;
          hasDragged.current = false;
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return;
          const delta = Math.abs(event.clientY - (dragStartY.current ?? event.clientY));
          if (delta > 6) {
            hasDragged.current = true;
            try {
              if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.setPointerCapture(event.pointerId);
              }
            } catch {}
          }
          to(target.current + (drag.current - event.clientY) / DRAG_UNITS);
          drag.current = event.clientY;
        }}
        onPointerUp={(event) => {
          try {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          } catch {}
          drag.current = null;
          dragStartY.current = null;
          to(Math.round(target.current));
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") to(Math.round(target.current) + 1);
          else if (event.key === "ArrowUp") to(Math.round(target.current) - 1);
          else return;
          event.preventDefault();
        }}
      >
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            return (
              <React.Fragment key={item.title}>
                <Link
                  id={`works-wheel-${i}`}
                  role="option"
                  aria-selected={i === active}
                  href={item.href || '#'}
                  ref={(node) => {
                    cardRefs.current[i] = node as unknown as HTMLElement;
                  }}
                  onClick={(e) => {
                    if (hasDragged.current) {
                      e.preventDefault();
                      return;
                    }
                    if (i !== active) {
                      e.preventDefault();
                      to(i + 1);
                      return;
                    }
                    if (item.href) {
                      e.preventDefault();
                      router.push(item.href);
                    }
                  }}
                  className="group absolute [backface-visibility:hidden] [transform-style:preserve-3d] cursor-pointer"
                  style={{
                    width: metrics.cardW,
                    height: metrics.cardH,
                    marginLeft: -metrics.cardW / 2,
                    marginTop: -metrics.cardH / 2,
                  }}
                >
                  {/* Dynamic Floating 3D Back-Shadow Card — exact unblurred box decoupled in 3D space */}
                  <div
                    aria-hidden="true"
                    className="card-back-shadow pointer-events-none absolute inset-0 size-full rounded-xl bg-black/30 border border-black/30 -z-10 will-change-transform"
                    style={{ transform: "translateZ(-28px) translateX(-32px) translateY(30px)" }}
                  />
                  {/* Main Card Face with Dynamic 3D Box Shadow */}
                  <span className="card-shadow-layer relative block size-full overflow-hidden rounded-xl border-[2px] border-black/90 bg-[#120d08] transition-shadow duration-75">
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      className="size-full object-cover"
                    />

                    {/* Subtle Top-to-Bottom Light Sheen Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10 pointer-events-none" />


                  </span>
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Ring title and front-card title trade places across the transition */}
      {/* Enhanced Active Character Description Panel on Left — Smooth AnimatePresence Crossfade */}
      <div
        ref={titleRef}
        className="pointer-events-none absolute top-1/2 left-[1%] sm:left-[2%] md:left-[2%] -translate-y-1/2 tracking-tight opacity-100 max-w-[260px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[360px] z-30"
      >
        <div className="pointer-events-auto bg-[#dedf42]/95 backdrop-blur-md p-4 sm:p-5 md:p-6 rounded-2xl border-2 border-black/35 shadow-2xl select-text min-h-[220px] flex flex-col justify-between overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={items[active]?.title || active}
              initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(3px)" }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col justify-between"
            >
              <div>
                {items[active]?.role && (
                  <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.24em] text-black/75 uppercase block mb-1.5">
                    {items[active]?.role}
                  </span>
                )}
                <h3 className="font-playfair text-xl sm:text-3xl md:text-4xl font-bold text-black uppercase leading-tight">
                  {items[active]?.title}
                </h3>
                {items[active]?.description && (
                  <p className="text-xs sm:text-sm font-sans font-medium text-black/85 leading-relaxed mt-2.5 select-text">
                    {items[active]?.description}
                  </p>
                )}
              </div>

              {items[active]?.href && (
                <div className="mt-4">
                  <OriginButton
                    href={items[active].href!}
                    fillClassName="bg-[#dedf42]"
                    activeTextClassName="text-black"
                    className="h-auto px-5 sm:px-6 py-2 sm:py-2.5 rounded-full border-2 border-black/80 bg-black text-[#dedf42] font-sans font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md inline-flex items-center gap-2 group cursor-pointer"
                  >
                    <span>Detail Tokoh</span>
                    <span className="transition-transform group-hover:translate-x-1 text-sm sm:text-base">→</span>
                  </OriginButton>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <ol
        className="text-current opacity-75 absolute top-[7.5%] right-[2.5%] text-right leading-[1.75] z-30 pointer-events-auto"
        style={{ fontSize: metrics.index }}
      >
        {items.map((item, i) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => {
                to(i + 1);
                onSelectCharacter?.(i);
              }}
              className={cn(
                i === active && "font-bold opacity-100 underline underline-offset-2",
              )}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default WorksWheel;
