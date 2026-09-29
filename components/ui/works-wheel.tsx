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
}

/* Geometry. The card is measured against the stage; everything else is measured
   against the card, so a narrow stage - where the card is capped by width, not
   height - scales the whole wheel down with it instead of leaving a small card
   swinging on a huge drum. The three that matter are tuned together: STEP
   against DRUM sets how hard the neighbours rotate away, and DRUM against LENS
   decides whether they land inside the frame or run off it. */
const CARD_H = 0.50; // front card height, of the stage
const CARD_MAX_W = 0.54; // ... but never wider than this much of the stage
const CARD_RATIO = 1.78; // card width / height (matches 1024x572 wayang cards)
const STEP = 36; // degrees between cards on the drum
const DRUM = 2.15; // drum radius, in card heights
const LENS = 2.4; // perspective distance (punchier 3D depth)
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

/** How much of a wheel-notch or a dragged pixel counts as one item. */
const WHEEL_UNITS = 900;
const DRAG_UNITS = 420;
/** Quiet time after the last wheel event before the wheel settles on an item. */
const SETTLE = 140;
/** Fraction of the remaining distance closed each frame. 1 = no smoothing. */
const EASE = 0.12;

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

      // The drum is pulled back so its front face lands on the picture plane.
      // That set-back has to arrive with the drum, or the ring would sit at the
      // far side of the perspective and render at half its size.
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

          // 2. Dynamic 3D Cast Shadow behind each card (angle-dependent elevation)
          const shadowLayer = card.querySelector(".card-shadow-layer") as HTMLElement | null;
          if (shadowLayer) {
            const shadowY = d < -0.1 ? 32 : d > 0.1 ? -14 : 26;
            const shadowBlur = Math.round(lerp(24, 60, Math.max(0, 1 - absD * 0.5)));
            const shadowSpread = Math.round(lerp(-4, -14, Math.max(0, 1 - absD * 0.5)));
            const shadowAlpha = (Math.max(0.25, 0.82 - absD * 0.28) * m).toFixed(2);
            shadowLayer.style.boxShadow = `0 ${shadowY}px ${shadowBlur}px ${shadowSpread}px rgba(0, 0, 0, ${shadowAlpha}), 0 10px 24px -6px rgba(0, 0, 0, ${(Number(shadowAlpha) * 0.6).toFixed(2)})`;
          }

          // 3. Floating 3D Back-Shadow Plane (creates visible depth separation into 3D space)
          const backShadow = card.querySelector(".card-back-shadow") as HTMLElement | null;
          if (backShadow) {
            const backShadowOpacity = Math.max(0, 1 - absD * 0.40) * m;
            backShadow.style.opacity = String(backShadowOpacity);
            backShadow.style.transform = `translateZ(-28px) translateY(${d * 18}px) scale(${Math.max(0.72, 1 - absD * 0.14)})`;
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

  // Native listener, because the wheel has to be cancellable - and it only
  // cancels while it still has somewhere to go, so the page scrolls on at
  // either end instead of trapping the reader.
  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      const next = target.current + event.deltaY / WHEEL_UNITS;
      if (next > 1 && next < last + 1) event.preventDefault();
      to(next);
      window.clearTimeout(settling.current);
      settling.current = window.setTimeout(
        () => to(Math.round(target.current)),
        SETTLE,
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(settling.current);
    };
  }, [to, last]);

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
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return;
          if (dragStartY.current !== null && Math.abs(event.clientY - dragStartY.current) > 6) {
            hasDragged.current = true;
          }
          to(target.current + (drag.current - event.clientY) / DRAG_UNITS);
          drag.current = event.clientY;
        }}
        onPointerUp={() => {
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
            const Tag = (item.href ? "a" : "div") as "a";
            return (
              <React.Fragment key={item.title}>
                <Tag
                  id={`works-wheel-${i}`}
                  role="option"
                  aria-selected={i === active}
                  href={item.href}
                  ref={(node: HTMLElement | null) => {
                    cardRefs.current[i] = node;
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
                  {/* Floating 3D Back-Shadow Plane — casts genuine shadow behind the card into 3D space */}
                  <div
                    aria-hidden="true"
                    className="card-back-shadow pointer-events-none absolute -inset-3 rounded-2xl bg-black/80 blur-xl -z-10 transition-opacity duration-75"
                    style={{ transform: "translateZ(-28px)" }}
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

                    {/* Character Role Tag inside front card */}
                    {item.role && (
                      <span className="absolute top-2.5 left-3 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[#dedf42] text-[9px] sm:text-[10px] font-sans font-bold tracking-wider uppercase border border-white/15 pointer-events-none">
                        {item.role}
                      </span>
                    )}

                    {action && item.href ? (
                      <span className="bg-black/80 text-[#dedf42] pointer-events-none absolute right-3 bottom-3 flex translate-y-1 items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] font-bold opacity-0 backdrop-blur-sm transition group-hover:translate-y-0 group-hover:opacity-100 border border-[#dedf42]/40 shadow-sm">
                        <svg
                          viewBox="0 0 12 12"
                          className="size-2.5"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 9 9 3M4 3h5v5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {action}
                      </span>
                    ) : null}
                  </span>
                </Tag>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Ring title and front-card title trade places across the transition */}
      {/* Enhanced Active Character Description Panel on Left */}
      <div
        ref={titleRef}
        className="pointer-events-none absolute top-1/2 left-[1%] sm:left-[2%] md:left-[2.5%] -translate-y-1/2 tracking-tight opacity-100 max-w-[185px] sm:max-w-[210px] md:max-w-[230px] z-30"
      >
        <div className="pointer-events-auto bg-[#dedf42]/95 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-black/25 shadow-lg select-text">
          {items[active]?.role && (
            <span className="text-[9px] sm:text-[10px] font-sans font-bold tracking-[0.22em] text-black/70 uppercase block mb-1">
              {items[active]?.role}
            </span>
          )}
          <h3 className="font-playfair text-lg sm:text-2xl md:text-3xl font-bold text-black uppercase leading-tight">
            {items[active]?.title}
          </h3>
          {items[active]?.description && (
            <p className="text-[10px] sm:text-[11.5px] font-sans font-medium text-black/80 leading-relaxed mt-2 select-text">
              {items[active]?.description}
            </p>
          )}
          {items[active]?.href && (
            <Link
              href={items[active].href!}
              className="inline-flex items-center gap-1.5 mt-3 px-3.5 py-1.5 rounded-full border border-black/80 bg-black text-[#dedf42] text-[10px] sm:text-xs font-sans font-bold tracking-wider uppercase hover:bg-black/85 active:scale-95 transition-all shadow-sm group"
            >
              <span>Detail Tokoh</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          )}
        </div>
      </div>
      {/* Right Index List */}
      <ol
        className="text-current opacity-75 absolute top-[7.5%] right-[2.5%] text-right leading-[1.75] z-30 pointer-events-auto"
        style={{ fontSize: metrics.index }}
      >
        {items.map((item, i) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => to(i + 1)}
              className={cn(
                "focus-visible:outline-current cursor-pointer transition-all outline-none focus-visible:outline-1 hover:opacity-100",
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
