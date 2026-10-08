"use client"

import * as React from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Rahwana3DFaceCanvas from "@/components/canvas/Rahwana3DFaceCanvas";
/**
 * Tiger Tear Reveal: a poster that rips in two as you scroll.
 *
 * The page starts as a plain slogan: a small tagline over one huge red word.
 * Scroll, and a crack runs out from the middle of the word, the sheet tears
 * in two along it, and the halves pull apart, the top lifting and the bottom
 * dropping, each tipping like real paper. From behind, a tiger rises into the
 * gap and opens its eyes. Once it is looking, the eyes follow your pointer and
 * blink; click and they squint at you. Scroll back up and the paper closes.
 *
 * Everything is SVG built from numbers: the fur, the stripes, the irises, the
 * torn paper. No images, no fonts to load, React is the only import.
 */

export interface TigerTearRevealProps {
  /** The big word that gets torn. */
  word?: string
  /** Small line above the word. Empty hides it. */
  tagline?: string
  /** Word colour. */
  ink?: string
  /** Paper colour, the sheet that tears. */
  paper?: string
  /** Tagline colour. */
  taglineColor?: string
  /** Iris colour. */
  eyeColor?: string
  /** Fur colour. */
  furColor?: string
  /** Font stack for the word. It is stretched to a fixed width, so any bold face fits. */
  fontFamily?: string
  /** Height of the pinned stage. A definite length, never a percentage. */
  height?: string
  /** Extra scroll distance the tear plays over, on top of `height`. */
  scrollDistance?: string
  /** 0..1. Drive the tear yourself instead of from scroll (1 = fully torn). */
  progress?: number
  /** Show the "scroll" hint before the tear starts. */
  hint?: boolean
  /** Optional custom reveal image URL displayed behind the tear. */
  revealImage?: string
  /** Character mode: 'wayang' for authentic Javanese wayang face, 'tiger' for procedural tiger. Default: 'wayang'. */
  mode?: "wayang" | "tiger"
  /** Pin the section with GSAP ScrollTrigger until the tear is fully open before continuing scroll. */
  pin?: boolean
  /** Scroll distance (in px) for the pin duration (default: 850). */
  pinDistance?: number
  /** Extra root class names. */
  className?: string
}

// #region tear
export type Pt = [number, number]

/** Seeded PRNG (mulberry32), so the tear and the fur are the same every visit. */
export function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const clamp01 = (x: number) => (x <= 0 ? 0 : x > 1 ? 1 : x)

export function smooth(a: number, b: number, x: number) {
  const t = clamp01((x - a) / (b - a))
  return t * t * (3 - 2 * t)
}

/** Overshoot ease: the eyes open a little too wide, then settle. */
export function easeOutBack(t: number) {
  const c = 1.70158
  const u = clamp01(t) - 1
  return 1 + (c + 1) * u * u * u + c * u * u
}

/** How far through the pinned scroll we are: 0 at the top, 1 when the stage lets go. */
export function scrollProgress(top: number, height: number, viewport: number) {
  const range = height - viewport
  if (range <= 0) return top <= 0 ? 1 : 0
  return clamp01(-top / range)
}

/** One scroll value drives five beats. */
export function stages(p: number) {
  return {
    crack: smooth(0.03, 0.2, p), // a crack runs out from the middle of the word
    open: smooth(0.18, 0.62, p), // the sheet tears and the halves pull apart
    rise: smooth(0.26, 0.74, p), // the tiger comes up from behind
    pop: smooth(0.58, 0.88, p), // and opens its eyes
    shake: smooth(0.16, 0.22, p) * (1 - smooth(0.26, 0.36, p)), // the jolt of the rip
  }
}

/**
 * The tear, left to right across the whole sheet: a slight rising diagonal,
 * a slow wander, fine fibres and the odd big tooth. `x` always increases.
 */
export function tearLine(seed = 11, from = -800, to = 1800, step = 9, cx = 500, cy = 318, angle = -7): Pt[] {
  const r = rng(seed)
  const slope = Math.tan((angle * Math.PI) / 180)
  const out: Pt[] = []
  for (let x = from; x <= to; x += step) {
    const fibre = (r() - 0.5) * 5
    const tooth = r() < 0.09 ? (r() - 0.5) * 26 : 0
    const wander = Math.sin(x * 0.019 + seed) * 10 + Math.sin(x * 0.053 + seed * 2) * 4
    out.push([x, cy + (x - cx) * slope + wander + fibre + tooth])
  }
  return out
}

/** Where each half goes as the tear opens. Both are still at open = 0. */
export function pieceMotion(open: number) {
  return {
    top: { dx: -14 * open, dy: -130 * open, rot: -3.2 * open },
    bottom: { dx: 14 * open, dy: 125 * open, rot: 2.6 * open },
  }
}

/** Width of the white paper core exposed along a torn edge. */
export function fibreWidths(n: number, open: number, seed = 5) {
  const r = rng(seed)
  const k = Math.min(1, open * 4)
  return Array.from({ length: n }, (_, i) => k * (2.5 + 6 * (0.5 + 0.5 * Math.sin(i * 0.37 + seed)) * (0.6 + r() * 0.8)))
}
// #endregion

// ---------------------------------------------------------------- geometry

const VIEW_W = 1000
const CX = 500
const CY = 318
const FAR = 4000 // the paper halves reach well past any screen
// the visible frame: cropped to the artwork, with room for the halves to part
const FRAME = "36 44 928 468"
const EYES: Pt[] = [
  [-138, 6],
  [138, -4],
]

const d = (pts: Pt[], close = true) =>
  "M" + pts.map(([x, y]) => x.toFixed(1) + " " + y.toFixed(1)).join("L") + (close ? "Z" : "")

/** A stripe: a quadratic spine with a width that tapers to points at both ends. */
function stripe(p0: Pt, p1: Pt, p2: Pt, w: number, n = 18) {
  const left: Pt[] = []
  const right: Pt[] = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const m = 1 - t
    const x = m * m * p0[0] + 2 * m * t * p1[0] + t * t * p2[0]
    const y = m * m * p0[1] + 2 * m * t * p1[1] + t * t * p2[1]
    const dx = 2 * m * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0])
    const dy = 2 * m * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1])
    const l = Math.hypot(dx, dy) || 1
    const h = (w / 2) * Math.pow(Math.sin(Math.PI * t), 0.6)
    left.push([x - (dy / l) * h, y + (dx / l) * h])
    right.push([x + (dy / l) * h, y - (dx / l) * h])
  }
  return d(left.concat(right.reverse()))
}

/** The face's stripes, and the body stripes running off both sides. Deterministic. */
function buildStripes() {
  const r = rng(29)
  const j = (a: number) => (r() - 0.5) * a
  const out: string[] = []
  // forehead: a fan of short stripes converging above the nose
  for (const k of [-2, -1, 0, 1, 2]) {
    out.push(stripe([k * 27 + j(8), -205], [k * 21 + j(6), -140], [k * 11, -72 + Math.abs(k) * 10], 13 - Math.abs(k) * 2))
  }
  for (const s of [-1, 1]) {
    // brow arcs over the white patches
    out.push(stripe([s * 50, -108], [s * 138, -140 + j(8)], [s * 228, -96], 13))
    out.push(stripe([s * 72, -158], [s * 150, -188 + j(8)], [s * 250, -150], 11))
    // cheek bars reaching in from the sides
    for (const y of [-160, -104, -48, 14, 76, 138]) {
      out.push(stripe([s * 350, y + j(10)], [s * 292, y + j(26)], [s * (222 + r() * 30), y + j(34)], 18 + r() * 8))
    }
    // under-eye streaks
    out.push(stripe([s * 212, 38], [s * 256, 72], [s * 330, 98], 14))
    out.push(stripe([s * 182, 74], [s * 226, 120], [s * 312, 156], 12))
    // sides of the nose
    out.push(stripe([s * 64, 22], [s * 50, 88], [s * 42, 178], 8))
    // the ruff and body beyond the face, out past the edge of any screen
    for (let k = 0; k < 16; k++) {
      const x = s * (390 + k * 70 + j(30))
      out.push(stripe([x + j(40), -330], [x + s * 30 + j(40), j(60)], [x + s * 10 + j(40), 330], 20 + r() * 14))
    }
  }
  return out.join("")
}

/** Short hairs flowing outward from the nose, in three tones. */
function buildHairs() {
  const r = rng(53)
  const tones = ["", "", ""]
  for (let i = 0; i < 2600; i++) {
    const x = (r() - 0.5) * 1900
    const y = (r() - 0.5) * 480
    const a = Math.atan2(y - 150, x) + (r() - 0.5) * 0.5
    const l = 9 + r() * 12
    const seg = "M" + x.toFixed(1) + " " + y.toFixed(1) + "l" + (Math.cos(a) * l).toFixed(1) + " " + (Math.sin(a) * l).toFixed(1)
    tones[r() < 0.45 ? 0 : r() < 0.7 ? 1 : 2] += seg
  }
  return tones
}

/** Fine radial fibres in an iris. */
function buildFibres() {
  const r = rng(71)
  let s = ""
  for (let i = 0; i < 56; i++) {
    const a = (i / 56) * Math.PI * 2 + r() * 0.08
    const r0 = 12 + r() * 4
    const r1 = 30 + r() * 5
    s += "M" + (Math.cos(a) * r0).toFixed(1) + " " + (Math.sin(a) * r0).toFixed(1) + "L" + (Math.cos(a) * r1).toFixed(1) + " " + (Math.sin(a) * r1).toFixed(1)
  }
  return s
}

// An almond eye: sharp outer corner, inner corner dipping toward the nose
// (drawn for the right eye; the left one is mirrored).
const ALMOND = "M-78 10 C-52 -40 30 -56 80 -8 C44 40 -30 50 -78 10Z"

// ---------------------------------------------------------------- the tiger

const Fur = React.memo(function Fur({ id, fur }: { id: string; fur: string }) {
  const stripes = React.useMemo(() => buildStripes(), [])
  const hairs = React.useMemo(() => buildHairs(), [])
  return (
    <g>
      <rect x={-2600} y={-420} width={5200} height={840} fill={fur} />
      <rect x={-2600} y={-420} width={5200} height={840} fill={"url(#" + id + "-shade)"} />
      <rect x={-2600} y={-420} width={5200} height={840} fill={"url(#" + id + "-vignette)"} />
      <g filter={"url(#" + id + "-soft)"} fill="#fbf6ec">
        {EYES.map(([x, y], i) => (
          <React.Fragment key={i}>
            <ellipse cx={x} cy={y - 52} rx={78} ry={22} />
            <ellipse cx={x} cy={y + 44} rx={64} ry={15} opacity={0.9} />
          </React.Fragment>
        ))}
        <ellipse cx={0} cy={188} rx={96} ry={52} opacity={0.85} />
      </g>
      <g filter={"url(#" + id + "-rough)"}>
        <path d={stripes} fill="#140b05" />
      </g>
      <path d={hairs[0]} stroke="#3b1c07" strokeWidth={1.4} opacity={0.35} strokeLinecap="round" />
      <path d={hairs[1]} stroke="#f7c46e" strokeWidth={1.2} opacity={0.35} strokeLinecap="round" />
      <path d={hairs[2]} stroke="#fff6e4" strokeWidth={1} opacity={0.22} strokeLinecap="round" />
    </g>
  )
})
interface WayangFaceProps {
  id: string
  goldColor?: string
  skinColor?: string
  eyes: React.ReactNode
}

const _WayangFace = React.memo(function WayangFace({
  id,
  goldColor = "#dedf42",
  skinColor = "#120803",
  eyes,
}: WayangFaceProps) {
  return (
    <g>
      {/* 1. Theatrical Deep Background Canvas */}
      <rect x={-2600} y={-420} width={5200} height={840} fill={skinColor} />
      <rect x={-2600} y={-420} width={5200} height={840} fill={"url(#" + id + "-shade)"} />
      <circle cx={0} cy={0} r={550} fill={"url(#" + id + "-wayang-blencong)"} opacity={0.7} />

      {/* 2. Sumping Surengpati (Curling Filigree Ear Wings) */}
      <g filter={"url(#" + id + "-soft)"} opacity={0.92}>
        {/* Left Sumping */}
        <path
          d="M-220 10 C-320 -60 -360 -20 -330 60 C-310 110 -250 120 -210 70 C-240 50 -260 20 -230 -10 Z"
          fill={"url(#" + id + "-wayang-gold)"}
        />
        <path
          d="M-230 20 C-300 -30 -330 0 -300 50 C-280 80 -240 70 -220 40 Z"
          fill="#140803"
        />
        {/* Right Sumping */}
        <path
          d="M220 10 C320 -60 360 -20 330 60 C310 110 250 120 210 70 C240 50 260 20 230 -10 Z"
          fill={"url(#" + id + "-wayang-gold)"}
        />
        <path
          d="M230 20 C300 -30 330 0 300 50 C280 80 240 70 220 40 Z"
          fill="#140803"
        />
      </g>

      {/* 3. Mahkota Kencana (Stepped Royal Wayang Crown) */}
      <g>
        {/* Crown Shadow/Base Backing */}
        <path
          d="M0 -310 C60 -240 180 -180 230 -90 L170 -60 C120 -120 40 -160 0 -220 C-40 -160 -120 -120 -170 -60 L-230 -90 C-180 -180 -60 -240 0 -310 Z"
          fill="#1a0b04"
          stroke={goldColor}
          strokeWidth={4}
        />
        {/* Spire / Makuta Pucuk Kencana */}
        <path
          d="M0 -300 C25 -260 45 -210 50 -160 L-50 -160 C-45 -210 -25 -260 0 -300 Z"
          fill={"url(#" + id + "-wayang-gold)"}
          stroke="#0c0502"
          strokeWidth={3}
        />
        {/* Crown Tier 2 - Arched Wings (Garuda Mungkur) */}
        <path
          d="M0 -220 C70 -190 140 -150 180 -80 C120 -80 70 -120 0 -130 C-70 -120 -120 -80 -180 -80 C-140 -150 -70 -190 0 -220 Z"
          fill={"url(#" + id + "-wayang-gold)"}
          stroke="#140702"
          strokeWidth={4}
        />
        {/* Crown Center Gem (Permata Manik) */}
        <circle cx={0} cy={-175} r={16} fill={"url(#" + id + "-wayang-ruby)"} stroke={goldColor} strokeWidth={2.5} />
        <circle cx={0} cy={-175} r={8} fill="#fff" opacity={0.6} />

        {/* Headband / Jamang Tatah Sungging */}
        <path
          d="M-200 -70 C-120 -115 120 -115 200 -70 L190 -45 C110 -85 -110 -85 -190 -45 Z"
          fill={"url(#" + id + "-wayang-gold)"}
          stroke="#0f0502"
          strokeWidth={3}
        />
        {/* Jamang Ruby Jewels */}
        {[-140, -90, -45, 0, 45, 90, 140].map((jx, i) => (
          <ellipse
            key={i}
            cx={jx}
            cy={-65 + Math.abs(jx) * 0.1}
            rx={8}
            ry={6}
            fill={"url(#" + id + "-wayang-ruby)"}
            stroke={goldColor}
            strokeWidth={1.5}
          />
        ))}
      </g>

      {/* 4. Facial Contours & Classical Wayang Cheeks */}
      <g>
        {/* Forehead Lotus / Cunduk Mentul */}
        <path
          d="M0 -90 C16 -60 22 -40 0 -15 C-22 -40 -16 -60 0 -90 Z"
          fill={"url(#" + id + "-wayang-gold)"}
          stroke="#120603"
          strokeWidth={2.5}
        />
        <circle cx={0} cy={-45} r={6} fill={"url(#" + id + "-wayang-ruby)"} />

        {/* Dramatic Sweeping Brows (Alis Sirung / Remeng) */}
        <path
          d="M-40 -20 C-90 -55 -160 -50 -200 -10 C-180 -25 -110 -35 -50 -12 Z"
          fill="#0c0502"
          stroke={goldColor}
          strokeWidth={2}
        />
        <path
          d="M40 -20 C90 -55 160 -50 200 -10 C180 -25 110 -35 50 -12 Z"
          fill="#0c0502"
          stroke={goldColor}
          strokeWidth={2}
        />

        {/* Nose Bridge (Irung Walang / Pangot) */}
        <path
          d="M-14 -20 L-8 65 C-20 75 -24 90 -14 96 C-4 100 4 100 14 96 C24 90 20 75 8 65 L14 -20 Z"
          fill={"url(#" + id + "-wayang-gold)"}
          stroke="#0c0401"
          strokeWidth={3}
        />
        {/* Nostril spirals */}
        <circle cx={-12} cy={86} r={5} fill="#0d0502" />
        <circle cx={12} cy={86} r={5} fill="#0d0502" />

        {/* Classical Stylized Mustache (Kumis Sunggingan) */}
        <path
          d="M0 102 C-50 95 -120 115 -170 85 C-140 115 -70 120 0 112 C70 120 140 115 170 85 C120 115 50 95 0 102 Z"
          fill="#0c0502"
          stroke={goldColor}
          strokeWidth={2.5}
        />

        {/* Noble Mouth & Golden Fangs / Smile */}
        <path
          d="M-55 125 C-30 145 30 145 55 125 C30 132 -30 132 -55 125 Z"
          fill="#801015"
          stroke={goldColor}
          strokeWidth={2}
        />
        <polygon points="-35,126 -30,135 -25,127" fill="#fff" />
        <polygon points="35,126 30,135 25,127" fill="#fff" />

        {/* Royal Chin Contour & Collar (Praba Leher) */}
        <path
          d="M0 140 C-35 155 -70 185 -100 230 C-40 215 40 215 100 230 C70 185 35 155 0 140 Z"
          fill={"url(#" + id + "-wayang-gold)"}
          stroke="#100502"
          strokeWidth={3}
        />
      </g>

      {/* 5. The Interactive Eyes Mounting */}
      {eyes}
    </g>
  )
})

function Eye({
  id,
  x,
  y,
  flip,
  look,
  blink,
  pupil,
  scale,
  fibres,
}: {
  id: string
  x: number
  y: number
  flip: boolean
  look: Pt
  blink: number
  pupil: number
  scale: number
  fibres: string
}) {
  const clip = id + (flip ? "-cl" : "-cr")
  const lx = look[0] * (flip ? -1 : 1)
  return (
    <g transform={"translate(" + x + " " + y + ") scale(" + (flip ? -scale : scale) + " " + scale + ")"}>
      <clipPath id={clip}>
        <path d={ALMOND} />
      </clipPath>
      {/* dark skin around the eye, and the tear-mark toward the nose */}
      <path d={ALMOND} fill="#0c0603" stroke="#0c0603" strokeWidth={11} strokeLinejoin="round" />
      <path d="M-80 8 C-86 20 -96 30 -98 44 C-90 34 -80 24 -70 18Z" fill="#0c0603" />
      <g clipPath={"url(#" + clip + ")"}>
        <ellipse cx={0} cy={0} rx={80} ry={52} fill="#3d1a05" />
        <g transform={"translate(" + (lx * 13).toFixed(2) + " " + (4 + look[1] * 7).toFixed(2) + ")"}>
          <circle r={38} fill={"url(#" + id + "-iris)"} />
          <path d={fibres} stroke="#6b2d05" strokeWidth={1} opacity={0.35} />
          <circle r={38} fill="none" stroke="#3a1602" strokeWidth={3} opacity={0.8} />
          <circle r={13 * pupil} fill="#050302" />
          <ellipse cx={-12} cy={-13} rx={7.5} ry={5.5} fill="#fff" opacity={0.92} />
          <circle cx={9} cy={10} r={2.6} fill="#fff" opacity={0.6} />
        </g>
        {/* the upper lid's shadow, and the lid itself when it closes */}
        <ellipse cx={0} cy={-46} rx={90} ry={34} fill={"url(#" + id + "-lid)"} />
        <g transform={"translate(0 " + (-62 + blink * 72).toFixed(2) + ")"}>
          <rect x={-90} y={-80} width={180} height={80} fill="#9c5212" />
          <path d="M-90 0 H90" stroke="#0c0603" strokeWidth={8} />
        </g>
      </g>
    </g>
  )
}

// ---------------------------------------------------------------- the paper

// Where the paper curls back over the gap: [x along the tear, half-width, depth].
const CURLS: Record<"top" | "bottom", [number, number, number][]> = {
  top: [
    [300, 44, 30],
    [575, 30, 20],
    [790, 52, 34],
  ],
  bottom: [
    [205, 50, 32],
    [470, 34, 22],
    [690, 40, 28],
  ],
}

function Half({
  id,
  side,
  line,
  open,
  children,
}: {
  id: string
  side: "top" | "bottom"
  line: Pt[]
  open: number
  children: React.ReactNode
}) {
  const up = side === "top"
  const m = pieceMotion(open)[side]
  const shape = up
    ? [[line[0][0], -FAR] as Pt, [line[line.length - 1][0], -FAR] as Pt, ...[...line].reverse()]
    : [...line, [line[line.length - 1][0], FAR] as Pt, [line[0][0], FAR] as Pt]
  const widths = fibreWidths(line.length, open, up ? 5 : 8)
  // the white paper core along the edge, on this half's side of it
  const core = line.concat(line.map(([x, y], i) => [x, y + (up ? -widths[i] : widths[i])] as Pt).reverse())
  const curls = CURLS[side].map(([cx, hw, depth]) => {
    const pts = line.filter(([x]) => Math.abs(x - cx) <= hw)
    const back = pts.map(([x, y]) => {
      const s = Math.cos(((x - cx) / hw) * (Math.PI / 2))
      return [x + (up ? 6 : -6) * s * open, y + (up ? 1 : -1) * depth * s * s * Math.min(1, open * 2.5)] as Pt
    })
    return d(pts.concat(back.reverse()))
  })
  const transform =
    "translate(" + m.dx.toFixed(2) + " " + m.dy.toFixed(2) + ") rotate(" + m.rot.toFixed(3) + " " + CX + " " + CY + ")"
  const clip = id + "-" + side
  return (
    <g transform={transform}>
      {/* the half's own shadow on the tiger */}
      {open > 0 ? (
        <path
          d={d(line, false)}
          fill="none"
          stroke="#000"
          strokeOpacity={0.55 * Math.min(1, open * 3)}
          strokeWidth={22}
          transform={"translate(0 " + (up ? 10 : -10) + ")"}
          filter={"url(#" + id + "-soft)"}
        />
      ) : null}
      <clipPath id={clip}>
        <path d={d(shape)} />
      </clipPath>
      <g clipPath={"url(#" + clip + ")"}>{children}</g>
      {open > 0 ? (
        <>
          <path d={d(core)} fill="#ffffff" />
          {curls.map((c, i) => (
            <path key={i} d={c} fill={"url(#" + id + "-curl-" + side + ")"} stroke="#fff" strokeWidth={1} />
          ))}
        </>
      ) : null}
    </g>
  )
}

// ---------------------------------------------------------------- component

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false
  )
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const h = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener("change", h)
    return () => mq.removeEventListener("change", h)
  }, [])
  return reduced
}

type Frame = { p: number; look: Pt; blink: number; squint: number }

export default function TigerTearReveal({
  word = "WAYANG",
  tagline = "PUSTAKA KISAH • SASTRA PEDALANGAN",
  ink = "#dedf42",
  paper = "#0b0604",
  taglineColor = "#cdb894",
  eyeColor = "#f0a526",
  furColor = "#d9832c",
  fontFamily = '"Anton", Impact, "Bebas Neue", "Oswald", "Arial Narrow", "Arial Black", sans-serif',
  height = "65svh",
  scrollDistance = "75svh",
  progress,
  hint = true,
  revealImage,
  mode = "wayang",
  pin = false,
  pinDistance = 850,
  className = "",
}: TigerTearRevealProps) {
  const rootRef = React.useRef<HTMLElement | null>(null)
  const stageRef = React.useRef<HTMLDivElement | null>(null)
  const reduced = usePrefersReducedMotion()
  const id = "ttr" + React.useId().replace(/[^a-zA-Z0-9]/g, "")
  const fibres = React.useMemo(() => buildFibres(), [])
  const line = React.useMemo(() => tearLine(), [])
  const [f, setF] = React.useState<Frame>({ p: progress ?? 0, look: [0, 0], blink: 0, squint: 0 })
  const pinnedProgressRef = React.useRef(0)

  React.useEffect(() => {
    if (!pin || typeof window === "undefined" || !rootRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    const st = ScrollTrigger.create({
      trigger: rootRef.current,
      start: "top top",
      end: `+=${pinDistance}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.8,
      anticipatePin: 1,
      onUpdate: (self) => {
        pinnedProgressRef.current = self.progress
        setF((prev) => ({ ...prev, p: self.progress }))
      },
    })

    ScrollTrigger.refresh()

    return () => {
      st.kill()
    }
  }, [pin, pinDistance])

  const controlled = progress !== undefined
  const cfg = React.useRef({ progress, controlled, reduced })
  cfg.current = { progress, controlled, reduced }
  const pointer = React.useRef<{ x: number; y: number } | null>(null)
  const squintAt = React.useRef(-1e9)

  React.useEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    if (!root || !stage) return
    let raf = 0
    let visible = true
    let p = cfg.current.progress ?? 0
    let look: Pt = [0, 0]
    let idle: Pt = [0, 0]
    let nextIdle = 0
    let nextBlink = performance.now() + 2500
    let last: Frame | null = null

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(tick)
    })
    io.observe(root)

    function tick(now: number) {
      raf = 0
      if (!visible) return
      const c = cfg.current
      const target = pin
        ? clamp01(pinnedProgressRef.current)
        : c.controlled
        ? clamp01(c.progress ?? 0)
        : scrollProgress(root!.getBoundingClientRect().top, root!.offsetHeight, stage!.offsetHeight)
      p = pin ? target : (c.reduced ? (target > 0.3 ? 1 : 0) : p + (target - p) * 0.16)
      if (Math.abs(target - p) < 0.0005) p = target
      // where the eyes look: the pointer if there is one, else a wandering gaze
      let want: Pt
      if (pointer.current) {
        const r = stage!.getBoundingClientRect()
        want = [
          Math.max(-1, Math.min(1, (pointer.current.x - r.left - r.width / 2) / (r.width * 0.35))),
          Math.max(-1, Math.min(1, (pointer.current.y - r.top - r.height * 0.58) / (r.height * 0.35))),
        ]
      } else {
        if (now > nextIdle && !c.reduced) {
          const g = rng(Math.floor(now))
          idle = [(g() - 0.5) * 1.4, (g() - 0.5) * 0.8]
          nextIdle = now + 1400 + g() * 1800
        }
        want = c.reduced ? [0, 0] : idle
      }
      look = [look[0] + (want[0] - look[0]) * 0.14, look[1] + (want[1] - look[1]) * 0.14]

      // blinks: a quick close and open every few seconds
      let blink = 0
      if (!c.reduced) {
        const since = now - nextBlink
        if (since > 0) blink = since < 90 ? since / 90 : since < 200 ? 1 - (since - 90) / 110 : 0
        if (since > 200) nextBlink = now + 2600 + Math.random() * 3200
      }
      const squint = c.reduced ? 0 : Math.max(0, 1 - (now - squintAt.current) / 900)

      const next: Frame = { p, look, blink, squint }
      if (
        !last ||
        Math.abs(next.p - last.p) > 1e-4 ||
        Math.abs(next.look[0] - last.look[0]) > 1e-3 ||
        Math.abs(next.look[1] - last.look[1]) > 1e-3 ||
        next.blink !== last.blink ||
        next.squint !== last.squint
      ) {
        last = next
        setF(next)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [pin])

  const s = stages(f.p)
  const pop = reduced ? s.pop : easeOutBack(s.pop)
  const eyeScale = 0.9 + 0.1 * pop
  const pupil = 1.3 - 0.5 * s.pop + 0.35 * f.squint
  // the eyes are shut until the tiger is up, then they open
  const blink = Math.max(1 - clamp01(pop), f.blink, f.squint * 0.45)
  const rise = (1 - s.rise) * 150
  const shake = reduced ? 0 : Math.sin(f.p * 900) * 6 * s.shake
  const crackReach = s.crack * 620
  const crack = line.filter(([x]) => Math.abs(x - CX) <= crackReach)
  const tiger =
    "translate(" + CX + " " + (CY + rise).toFixed(2) + ") rotate(-7) scale(" + (1.34 - 0.06 * s.rise).toFixed(4) + ")"

  const sheet = (
    <>
      <rect x={-FAR} y={-FAR} width={FAR * 2 + VIEW_W} height={FAR * 2} fill={paper} />
      {tagline ? (
        <text
          x={CX}
          y={150}
          textAnchor="middle"
          fill={taglineColor}
          style={{ font: '700 24px "Inter", "Helvetica Neue", Arial, sans-serif', letterSpacing: "0.42em" }}
        >
          {tagline}
        </text>
      ) : null}
      <text
        x={CX}
        y={404}
        textAnchor="middle"
        textLength={880}
        lengthAdjust="spacingAndGlyphs"
        fill={ink}
        style={{ fontFamily, fontSize: 250, fontWeight: 900, letterSpacing: 0 }}
      >
        {word}
      </text>
    </>
  )

  return (
    <section
      ref={rootRef}
      className={"relative w-full " + className}
      style={{
        height: pin ? height : controlled ? height : "calc(" + height + " + " + scrollDistance + ")",
        background: paper,
        overflow: "clip",
      }}
    >
      <div
        ref={stageRef}
        className="sticky top-0 w-full overflow-hidden flex items-center justify-center"
        style={{ height, cursor: s.pop > 0.9 ? "crosshair" : undefined }}
        onPointerMove={(e) => {
          const r = stageRef.current?.getBoundingClientRect()
          if (r) {
            pointer.current = {
              x: (e.clientX - r.left - r.width / 2) / (r.width / 2),
              y: (e.clientY - r.top - r.height / 2) / (r.height / 2),
            }
          }
        }}
        onPointerLeave={() => (pointer.current = null)}
        onPointerDown={() => s.pop > 0.5 && (squintAt.current = performance.now())}
      >
        {/* Layer 0: 3D Rahwana WebGL Canvas revealed behind the paper tear */}
        {mode === "wayang" && !revealImage && (
          <div
            className="absolute inset-0 z-0 pointer-events-auto flex items-center justify-center"
            style={{
              opacity: s.open > 0 ? 1 : 0,
              transition: "opacity 0.2s ease-out",
            }}
          >
            <Rahwana3DFaceCanvas
              className="w-full h-full"
              pointer={pointer}
              openProgress={s.open}
            />
          </div>
        )}

        <svg
          viewBox={FRAME}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={(tagline ? tagline + ". " : "") + word + ", torn in two."}
          className="relative z-10 w-full h-full pointer-events-none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", maxWidth: "none", display: "block" }}
        >
          <defs>
            <linearGradient id={id + "-shade"} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2a1203" stopOpacity={0.45} />
              <stop offset="0.45" stopColor="#ffd08a" stopOpacity={0.12} />
              <stop offset="1" stopColor="#2a1203" stopOpacity={0.5} />
            </linearGradient>
            <radialGradient id={id + "-vignette"} cx="0.5" cy="0.5" r="0.5" gradientTransform="translate(0.5 0.5) scale(0.25 1) translate(-0.5 -0.5)">
              <stop offset="0.5" stopColor="#1a0a02" stopOpacity={0} />
              <stop offset="1" stopColor="#1a0a02" stopOpacity={0.55} />
            </radialGradient>
            <radialGradient id={id + "-iris"}>
              <stop offset="0" stopColor="#fff0a8" />
              <stop offset="0.35" stopColor={eyeColor} />
              <stop offset="0.8" stopColor="#b8570f" />
              <stop offset="1" stopColor="#4d1f03" />
            </radialGradient>
            <linearGradient id={id + "-lid"} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#000" stopOpacity={0.75} />
              <stop offset="1" stopColor="#000" stopOpacity={0} />
            </linearGradient>
            <linearGradient id={id + "-curl-top"} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#d9d4cb" />
            </linearGradient>
            <linearGradient id={id + "-curl-bottom"} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#d9d4cb" />
            </linearGradient>
            <filter id={id + "-soft"} x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <filter id={id + "-rough"} x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="4" />
              <feDisplacementMap in="SourceGraphic" scale="9" />
            </filter>
            <filter id={id + "-glow"} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="9" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id={id + "-wayang-blencong"} cx="0.5" cy="0.4" r="0.6">
              <stop offset="0" stopColor="#dedf42" stopOpacity={0.65} />
              <stop offset="0.35" stopColor="#d9a441" stopOpacity={0.35} />
              <stop offset="0.75" stopColor="#8c6218" stopOpacity={0.1} />
              <stop offset="1" stopColor="#080302" stopOpacity={0} />
            </radialGradient>
            <linearGradient id={id + "-wayang-gold"} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff9c4" />
              <stop offset="0.3" stopColor="#dedf42" />
              <stop offset="0.7" stopColor="#d9a441" />
              <stop offset="1" stopColor="#8c5812" />
            </linearGradient>
            <radialGradient id={id + "-wayang-ruby"}>
              <stop offset="0" stopColor="#ff6b78" />
              <stop offset="0.4" stopColor="#d91a2a" />
              <stop offset="1" stopColor="#59050d" />
            </radialGradient>
          </defs>

          <g transform={"translate(" + shake.toFixed(2) + " " + (shake * 0.4).toFixed(2) + ")"}>
            {/* behind the paper: the tiger or custom artwork, rising into the gap */}
            {s.open > 0 ? (
              <g transform={tiger}>
                {revealImage ? (
                  <image
                    href={revealImage}
                    x={-500}
                    y={-280}
                    width={1000}
                    height={560}
                    preserveAspectRatio="xMidYMid slice"
                  />
                ) : mode === "wayang" ? (
                  <g />
                ) : (
                  <>
                    <Fur id={id} fur={furColor} />
                    <g filter={s.pop > 0.02 ? "url(#" + id + "-glow)" : undefined}>
                      {EYES.map(([x, y], i) => (
                        <Eye
                          key={i}
                          id={id}
                          x={x}
                          y={y}
                          flip={i === 0}
                          look={f.look}
                          blink={blink}
                          pupil={pupil}
                          scale={eyeScale}
                          fibres={fibres}
                        />
                      ))}
                    </g>
                  </>
                )}
              </g>
            ) : null}

            {/* the sheet: whole until it tears (two clipped halves leave a hairline seam),
                then in two halves that part along the tear */}
            {s.open > 0 ? (
              <>
                <Half id={id} side="top" line={line} open={s.open}>
                  {sheet}
                </Half>
                <Half id={id} side="bottom" line={line} open={s.open}>
                  {sheet}
                </Half>
              </>
            ) : (
              sheet
            )}

            {/* the crack, running out from the middle before it gives way */}
            {s.crack > 0 && s.open < 0.15 && crack.length > 1 ? (
              <path d={d(crack, false)} fill="none" stroke="#1d0f07" strokeWidth={2.4} strokeLinejoin="bevel" opacity={1 - s.open / 0.15} />
            ) : null}
          </g>
        </svg>

        {hint && !controlled ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.35em]"
            style={{ color: taglineColor, opacity: Math.max(0, 0.7 - s.crack * 3) }}
          >
            scroll
            <span className="block h-6 w-px animate-pulse motion-reduce:animate-none" style={{ background: taglineColor }} />
          </div>
        ) : null}
      </div>
    </section>
  )
}
