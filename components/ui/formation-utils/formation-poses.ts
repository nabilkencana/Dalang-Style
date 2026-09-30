// ── Types ─────────────────────────────────────────────────────────────────────

export type FormationMode = "flat" | "tilt" | "ring" | "gallery" | "fan";

export const MODES: { id: FormationMode; label: string }[] = [
  { id: "flat", label: "Flat" },
  { id: "tilt", label: "Tilt" },
  { id: "ring", label: "Ring" },
  { id: "fan",  label: "Gallery" },
];

export interface Work {
  image: string;
  title: string;
  location?: string;
  description?: string;
  highlights?: string[];
  year?: string;
}

export interface Pose {
  o:  number; // opacity
  rx: number; // rotateX deg
  ry: number; // rotateY deg
  rz: number; // rotateZ deg
  s:  number; // scale
  x:  number; // translateX px
  y:  number; // translateY px
  z:  number; // translateZ px
}

export interface FlatRingGeometry {
  rx: number;
  ry: number;
  cy: number;
  angles: number[];
}

export interface FmLayout {
  W:         number;
  H:         number;
  n:         number;
  mobile:    boolean;
  portrait:  boolean;
  cardW:     number;
  cardH:     number;
  flatScale: number;
  flatRing:  FlatRingGeometry;
}

// ── Constants ─────────────────────────────────────────────────────────────────

export const HOVER_EASE     = 0.10;
export const HOVER_ZOOM     = 0.05;
export const MORPH_DUR      = 700;
export const MORPH_STAGGER  = 200;
export const PARALLAX_MAX   = 7;
export const PERSP          = 900;
export const SPRING         = 0.13;
export const SWAP_BAND      = 130;
export const SWAP_FLOOR     = 0.32;
export const SWAP_SPEED_REF = 3;

const DEG2RAD = Math.PI / 180;
const TWO_PI  = 2 * Math.PI;

// ── Math & Interpolation Helpers ──────────────────────────────────────────────

export const clamp = (v: number, lo: number, hi: number): number =>
  Math.min(hi, Math.max(lo, v));

export const easeInOut = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function copyPose(out: Pose, src: Pose): void {
  out.o  = src.o;  out.rx = src.rx; out.ry = src.ry; out.rz = src.rz;
  out.s  = src.s;  out.x  = src.x;  out.y  = src.y;  out.z  = src.z;
}

export function lerpPose(out: Pose, a: Pose, b: Pose, t: number): void {
  const u = 1 - t;
  out.o  = a.o  * u + b.o  * t;
  out.rx = a.rx * u + b.rx * t;
  out.ry = a.ry * u + b.ry * t;
  out.rz = a.rz * u + b.rz * t;
  out.s  = a.s  * u + b.s  * t;
  out.x  = a.x  * u + b.x  * t;
  out.y  = a.y  * u + b.y  * t;
  out.z  = a.z  * u + b.z  * t;
}

export const poseTransform = (p: Pose): string =>
  `translate3d(${p.x}px,${p.y}px,${p.z}px) rotateX(${p.rx}deg) rotateY(${p.ry}deg) rotateZ(${p.rz}deg) scale(${p.s})`;

export const focusScore = (p: Pose): number =>
  Math.abs(p.x) * 0.8 + Math.abs(p.y) * 0.4 + (1 - p.o) * 500 - p.z * 0.05;

// ── Flat Ring Geometry Calculator (~180k iterations) ──────────────────────────

function buildFlatRing(
  W: number,
  H: number,
  portrait: boolean,
  cardW: number,
  cardH: number,
  flatScale: number,
  n: number,
): FlatRingGeometry {
  const cy = portrait ? 0.015 * H : 0.045 * H;
  const c  = cardW * flatScale;
  const f  = cardH * flatScale;
  const d  = Math.min(0.3 * W, 0.38 * H);

  let rx: number;
  let ry: number;

  if (portrait) {
    const t = Math.min(W / 2 - 0.5 * c - 0.12 * f - 22, H / 2 - 0.5 * f - cy - 22);
    rx = t;
    ry = t;
  } else {
    rx = Math.min(d, W / 2 - 0.6 * cardW);
    ry = Math.min(d, H / 2 - 0.6 * cardH);
  }

  rx = Math.max(rx, 40);
  ry = Math.max(ry, 40);

  const step = TWO_PI / 1440;
  const m = new Float64Array(1440);
  const g = new Float64Array(1440);
  const _ = new Float64Array(1440);

  for (let t = 0; t < 1440; t++) {
    const e = t * step;
    const nA = (t + 1) * step;
    const a = Math.cos(e) * rx;
    const s = Math.sin(e) * ry;
    const o = Math.cos(nA) * rx;
    const l = Math.sin(nA) * ry;
    m[t] = e;
    g[t] = Math.hypot(o - a, l - s);
    _[t] = c * Math.abs(Math.sin(e)) + f * Math.abs(Math.cos(e));
  }

  const v = (tVal: number) => {
    let e = 0;
    for (let r = 0; r < 1440; r++) e += g[r] / Math.max(1, _[r] + tVal);
    return e;
  };

  let y = -0.85 * Math.min(c, f);
  let x = 4000;
  for (let t = 0; t < 70; t++) {
    const mid = (y + x) / 2;
    if (v(mid) > n) y = mid;
    else x = mid;
  }

  const b = (y + x) / 2;
  const w: number[] = [];
  let T = 0;
  let k = 0;

  for (let t = 0; t < 1440 && w.length < n; t++) {
    const r = g[t] / Math.max(1, _[t] + b);
    while (T + r >= k && w.length < n) {
      const e = r > 0 ? (k - T) / r : 0;
      w.push(m[t] + e * step);
      k += 1;
    }
    T += r;
  }

  while (w.length < n) {
    w.push((w.length / n) * TWO_PI);
  }

  return { rx, ry, cy, angles: w };
}

// ── Layout Calculator ─────────────────────────────────────────────────────────

export function getLayout(W: number, H: number, n: number): FmLayout {
  const r = Math.min(W, H);
  const mobile = r < 640;
  const portrait = H > W;
  const cardW = mobile ? clamp(0.27 * r, 80, 118) : clamp(0.155 * r, 128, 196);
  const cardH = Math.round(1.34 * cardW);
  const flatScale = mobile ? 0.42 : 0.62;

  const flatRing = buildFlatRing(W, H, portrait, cardW, cardH, flatScale, n);

  return {
    W,
    H,
    n,
    mobile,
    portrait,
    cardW,
    cardH,
    flatScale,
    flatRing,
  };
}

// ── Pose Calculator ───────────────────────────────────────────────────────────

export function poseFor(
  mode: FormationMode,
  index: number,
  L: FmLayout,
  browse: number,
): Pose {
  const { n, W, H, mobile, portrait, flatScale, flatRing } = L;

  if (mode === "flat") {
    const t = ((index + 0.004 * browse) % n + n) % n;
    const s = Math.floor(t);
    const l = flatRing.angles[s] ?? 0;
    let u = (flatRing.angles[(s + 1) % n] ?? 0) - l;
    if (u < 0) u += TWO_PI;
    const h = l + u * (t - s);

    return {
      x: Math.cos(h) * flatRing.rx,
      y: Math.sin(h) * flatRing.ry + flatRing.cy,
      z: 0,
      rx: 0,
      ry: 0,
      rz: 7 * Math.sin(3.1 * index + 1.2),
      s: flatScale,
      o: 1,
    };
  }

  if (mode === "tilt") {
    const u = L.cardW * (mobile ? 1.12 : 1.5);
    const total = n * u;
    const h = (((index - Math.floor(n / 2)) * u + browse + total / 2) % total + total) % total - total / 2;
    const c = W * (mobile ? 1.5 : 1.2);
    const f = Math.min(Math.abs(h), 0.98 * c);

    return {
      x: h,
      y: -(0.05 * H) + (c - Math.sqrt(c * c - f * f)),
      z: 0,
      rx: 0,
      ry: 0,
      rz: (Math.asin(clamp(h / c, -1, 1)) / DEG2RAD) * 0.65,
      s: mobile ? 0.92 : 1.18,
      o: clamp((0.5 - Math.abs(h) / W) / 0.13, 0, 1),
    };
  }

  if (mode === "ring") {
    const l = (index / n) * TWO_PI + 0.0016 * browse;
    const u = 0.38 * Math.min(W, H);
    const h = Math.sin(l) * u * (portrait ? 1.04 : 1.46);
    const c = Math.cos(l) * u;
    const f = 63 * DEG2RAD;
    const d = c * Math.sin(f);
    const p = -21 * DEG2RAD;

    return {
      x: h * Math.cos(p) - d * Math.sin(p),
      y: h * Math.sin(p) + d * Math.cos(p),
      z: c * Math.cos(f),
      rx: 0,
      ry: 0,
      rz: (h / u) * (mobile ? 3 : 6),
      s: (mobile ? 0.36 : 0.6) + ((c / u + 1) / 2) * (mobile ? 0.19 : 0.42),
      o: 1,
    };
  }

  // Gallery / Fan mode (4th mode)
  const o = (index / n) * TWO_PI + 0.0042 * browse;
  const l = Math.cos(o);

  return {
    x: Math.sin(o) * W * (mobile ? 0.46 : 0.43),
    y: l * H * (mobile ? 0.16 : 0.14),
    z: l * (mobile ? 95 : 150),
    rx: 0,
    ry: 0,
    rz: 0,
    s: (mobile ? 0.72 : 1.42) * ((mobile ? 0.5 : 0.66) + ((l + 1) / 2) * (mobile ? 0.5 : 0.34)),
    o: 1,
  };
}
