'use client';

import { useEffect, useId, useRef, useState } from 'react';
import {
  ArrowDownUp,
  Check,
  Hand,
  Keyboard,
  Mouse,
  Move,
  Orbit,
  Pointer,
  Sparkles,
  Users,
  Webcam,
  ZoomIn,
  type LucideIcon,
} from 'lucide-react';

export const TUTORIAL_DONE_KEY = 'wayang-tutorial-done';

type Mode = 'camera' | 'mouse';
type Action = 'mouse' | 'camera' | 'dance' | 'one' | 'two';
type Kind = 'present' | 'follow' | 'depth' | 'pinch' | 'two' | 'scroll' | 'dance' | 'keys';
type Path = (t: number) => [number, number, number]; // normalized x, y, scale

interface Step {
  kind: Kind;
  title: string;
  hint: string;
  path?: Path;
  ghost?: 'hand' | 'pinch' | 'pointer' | 'two';
  icon: LucideIcon;
}

const still: Path = () => [0.5, 0.52, 1];
const sweep: Path = (t) => [0.5 + 0.27 * Math.sin(t * 0.9), 0.56 + 0.07 * Math.sin(t * 1.8), 1];
const circle: Path = (t) => [
  0.5 + 0.2 * Math.cos(t * 0.8) + 0.02 * Math.cos(t * 2.4),
  0.54 + 0.15 * Math.sin(t * 0.8) + 0.015 * Math.sin(t * 1.6),
  1,
];
const breathe: Path = (t) => [0.5, 0.52, 1.05 + 0.35 * Math.sin(t * 1.4)];

const KEYS: [string, string][] = [
  ['1 / 2', 'Solo / duo'],
  ['D', 'Tari kiprah'],
  ['F / G', 'Balik arah'],
  ['C', 'Kalibrasi'],
  ['M', 'Musik'],
  ['V', 'Pratinjau kamera'],
  ['P', 'Jendela kamera'],
  ['H', 'Sembunyikan UI'],
];
const KEY_SET = ['1', '2', 'd', 'f', 'g', 'c', 'm', 'v', 'p', 'h'];
const keyHit = (k: string, hits: string[]) => k.toLowerCase().split(' / ').some((x) => hits.includes(x));

const keysStep: Step = {
  kind: 'keys',
  title: 'Pintasan panggung',
  hint: 'Coba semua tombol di bawah satu per satu',
  icon: Keyboard,
};

function buildSteps(mode: Mode, mobile: boolean): Step[] {
  if (mode === 'camera') {
    const s: Step[] = [
      { kind: 'present', title: 'Angkat tangan Anda', hint: 'Buka telapak tangan dan tempatkan tepat di tangan bayangan, tahan sebentar', path: still, ghost: 'hand', icon: Hand },
      { kind: 'follow', title: 'Ikuti tangan bayangan', hint: 'Telapak tangan = badan wayang. Tempelkan titik emas Anda pada tangan bayangan', path: sweep, ghost: 'hand', icon: Move },
      { kind: 'follow', title: 'Gambar lingkaran', hint: 'Terus ikuti tangan bayangan berputar', path: circle, ghost: 'hand', icon: Orbit },
      { kind: 'depth', title: 'Maju dan mundur', hint: mobile ? 'Dekatkan tangan ke HP, lalu jauhkan' : 'Dekatkan tangan ke kamera, lalu jauhkan — bayangan wayang ikut membesar', path: breathe, ghost: 'hand', icon: ZoomIn },
      { kind: 'pinch', title: 'Gerakkan lengan', hint: 'Jepitkan ujung ibu jari dan telunjuk, lalu buka lagi — 3 kali', path: still, ghost: 'pinch', icon: Pointer },
      { kind: 'two', title: 'Dua tangan, dua wayang', hint: 'Angkat dan buka kedua telapak tangan, tahan sebentar', ghost: 'two', icon: Users },
    ];
    return mobile ? s : [...s, keysStep];
  }
  const s: Step[] = [
    { kind: 'follow', title: mobile ? 'Ikuti dengan jari' : 'Ikuti dengan kursor', hint: mobile ? 'Geser jari di layar mengikuti tangan bayangan' : 'Gerakkan mouse mengikuti tangan bayangan', path: sweep, ghost: 'pointer', icon: Move },
    { kind: 'follow', title: 'Gambar lingkaran', hint: 'Terus ikuti tangan bayangan berputar', path: circle, ghost: 'pointer', icon: Orbit },
  ];
  if (!mobile) s.push({ kind: 'scroll', title: 'Atur kedalaman', hint: 'Gulir roda mouse ke atas atau bawah untuk mendekatkan wayang ke blencong', icon: ArrowDownUp });
  s.push({ kind: 'dance', title: 'Tari kiprah', hint: mobile ? 'Ketuk tombol Tarian' : 'Tekan tombol D di keyboard', icon: Sparkles });
  return mobile ? s : [...s, keysStep];
}

const FOLLOW_SECONDS = 4;
const MATCH_RADIUS = 0.1;
const HOLD_SECONDS = 1.5;
const GRACE_SECONDS = 0.8; // ignore input right after a step starts
const PINCH_REPS = 3;

/** Open palm = the four fingers are extended (tip clearly farther from wrist than PIP joint). */
function isOpenPalm(lm: { x: number; y: number }[] | null | undefined): boolean {
  if (!lm || lm.length < 21) return false;
  const d = (i: number, j: number) => Math.hypot(lm[i].x - lm[j].x, lm[i].y - lm[j].y);
  return [
    [8, 6],
    [12, 10],
    [16, 14],
    [20, 18],
  ].every(([tip, pip]) => d(0, tip) > d(0, pip) * 1.12);
}

type GhostVariant = 'hand' | 'pinch' | 'pointer';

/*
 * Parametric right hand (palm toward viewer), traced as ONE continuous outline so
 * fingers grow out of the palm instead of overlapping it. viewBox 0 0 200 260,
 * palm centre ≈ (100,160). Every pose uses the same command structure, so SMIL
 * can morph between poses (pinch animation).
 */
interface Digit { bx: number; by: number; a: number; len: number; w: number }
type Pose = Digit[]; // thumb, index, middle, ring, pinky

// Bases follow the knuckle arch, centred on x=100; fingers fan evenly around the middle finger.
// Lengths follow real proportions: middle > ring ≈ index > pinky.
const OPEN: Pose = [
  { bx: 63, by: 178, a: -50, len: 54, w: 25 },
  { bx: 70, by: 116, a: -9, len: 66, w: 19 },
  { bx: 90, by: 110, a: -3, len: 74, w: 20 },
  { bx: 110, by: 111, a: 3, len: 69, w: 19 },
  { bx: 129, by: 119, a: 9, len: 54, w: 16 },
];
const PINCH: Pose = [
  { bx: 63, by: 178, a: -14, len: 68, w: 25 },
  { bx: 70, by: 116, a: -44, len: 30, w: 19 },
  { bx: 90, by: 110, a: -4, len: 72, w: 20 },
  { bx: 110, by: 111, a: 2, len: 68, w: 19 },
  { bx: 129, by: 119, a: 8, len: 54, w: 16 },
];
const POINT: Pose = [
  { bx: 63, by: 178, a: -24, len: 38, w: 25 },
  { bx: 70, by: 116, a: -3, len: 86, w: 19 },
  { bx: 90, by: 112, a: 3, len: 20, w: 20 },
  { bx: 110, by: 114, a: 7, len: 18, w: 19 },
  { bx: 129, by: 121, a: 12, len: 15, w: 16 },
];

const f = (n: number) => n.toFixed(1);
const geo = (d: Digit) => {
  const r = (d.a * Math.PI) / 180;
  const u = [Math.sin(r), -Math.cos(r)];
  const n = [Math.cos(r), Math.sin(r)];
  const at = (t: number, side: number, w: number) => [d.bx + u[0] * t + n[0] * side * w, d.by + u[1] * t + n[1] * side * w];
  return { u, n, at };
};

function handPaths(pose: Pose) {
  const [thumb, ...fingers] = pose;
  let o = 'M75 254 C73 232 63 212 60 194 ';
  const digits = [thumb, ...fingers];
  digits.forEach((d, i) => {
    const { at } = geo(d);
    const hw = d.w / 2;
    const tipW = hw * 0.86;
    const L0 = at(0, -1, hw);
    const L1 = at(d.len, -1, tipW);
    const R1 = at(d.len, 1, tipW);
    const R0 = at(0, 1, hw);
    const Lm = at(d.len * 0.5, -1, hw * 1.02);
    const Rm = at(d.len * 0.5, 1, hw * 1.02);
    o += `${i === 0 ? 'C58 188 ' + f(L0[0]) + ' ' + f(L0[1] + 6) : ''} ${f(L0[0])} ${f(L0[1])} `;
    o += `Q${f(Lm[0])} ${f(Lm[1])} ${f(L1[0])} ${f(L1[1])} `;
    o += `A${f(tipW)} ${f(tipW)} 0 0 1 ${f(R1[0])} ${f(R1[1])} `;
    o += `Q${f(Rm[0])} ${f(Rm[1])} ${f(R0[0])} ${f(R0[1])} `;
    const next = digits[i + 1];
    if (next) {
      const N0 = geo(next).at(0, -1, next.w / 2);
      const cx = (R0[0] + N0[0]) / 2;
      const cy = Math.max(R0[1], N0[1]) + (i === 0 ? 10 : 7);
      o += `Q${f(cx)} ${f(cy)} `;
    }
  });
  o += 'C146 140 146 172 140 194 C137 212 127 232 125 254 Z';

  let nails = '';
  let joints = '';
  fingers.forEach((d) => {
    const { at } = geo(d);
    const nw = d.w * 0.3;
    const a1 = at(d.len - 2, -1, nw);
    const a2 = at(d.len - 2, 1, nw);
    const b1 = at(d.len - 14, -1, nw);
    const b2 = at(d.len - 14, 1, nw);
    nails += `M${f(b1[0])} ${f(b1[1])} L${f(a1[0])} ${f(a1[1])} A${f(nw)} ${f(nw)} 0 0 1 ${f(a2[0])} ${f(a2[1])} L${f(b2[0])} ${f(b2[1])} Z `;
    for (const t of [0.36, 0.68]) {
      const j1 = at(d.len * t, -1, d.w * 0.28);
      const j2 = at(d.len * t, 1, d.w * 0.28);
      joints += `M${f(j1[0])} ${f(j1[1])} L${f(j2[0])} ${f(j2[1])} `;
    }
  });
  const t = geo(thumb);
  const tn1 = t.at(thumb.len - 2, -1, 6);
  const tn2 = t.at(thumb.len - 2, 1, 6);
  const tn3 = t.at(thumb.len - 15, 1, 6);
  const tn4 = t.at(thumb.len - 15, -1, 6);
  nails += `M${f(tn4[0])} ${f(tn4[1])} L${f(tn1[0])} ${f(tn1[1])} A6 6 0 0 1 ${f(tn2[0])} ${f(tn2[1])} L${f(tn3[0])} ${f(tn3[1])} Z`;
  const tj1 = t.at(thumb.len * 0.5, -1, 7);
  const tj2 = t.at(thumb.len * 0.5, 1, 7);
  joints += `M${f(tj1[0])} ${f(tj1[1])} L${f(tj2[0])} ${f(tj2[1])}`;
  return { outline: o, nails, joints };
}

const HAND_OPEN = handPaths(OPEN);
const HAND_PINCH = handPaths(PINCH);
const HAND_POINT = handPaths(POINT);
const CREASES =
  'M68 148 C88 139 116 138 140 145 M70 166 C88 158 110 157 128 163 M100 222 C96 200 96 178 102 156 M78 200 C72 190 70 180 72 170';

function Morph({ from, to, k }: { from: string; to: string; k: 'outline' | 'nails' | 'joints' }) {
  return (
    <animate
      attributeName="d"
      dur="1.6s"
      repeatCount="indefinite"
      calcMode="spline"
      keyTimes="0;0.45;0.6;1"
      keySplines="0.45 0 0.55 1;0 0 1 1;0.45 0 0.55 1"
      values={`${from};${to};${to};${from}`}
      key={k}
    />
  );
}

function GhostHand({ variant }: { variant: GhostVariant }) {
  const uid = useId().replace(/:/g, '');
  const h = variant === 'pointer' ? HAND_POINT : HAND_OPEN;
  const pinch = variant === 'pinch';
  return (
    <svg viewBox="0 0 200 260" className={`ghost-hand ${variant}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}s`} x1="0.2" y1="0" x2="0.6" y2="1">
          <stop offset="0" className="g-skin-hi" />
          <stop offset="1" className="g-skin-lo" />
        </linearGradient>
        <radialGradient id={`${uid}p`} cx="0.52" cy="0.66" r="0.42">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${uid}c`}>
          <path d={h.outline}>{pinch && <Morph from={HAND_OPEN.outline} to={HAND_PINCH.outline} k="outline" />}</path>
        </clipPath>
      </defs>
      <path className="g-skin" d={h.outline} fill={`url(#${uid}s)`}>
        {pinch && <Morph from={HAND_OPEN.outline} to={HAND_PINCH.outline} k="outline" />}
      </path>
      <g clipPath={`url(#${uid}c)`}>
        <ellipse cx="104" cy="176" rx="60" ry="56" fill={`url(#${uid}p)`} />
        <path className="g-crease" d={CREASES} />
        <path className="g-joint" d={h.joints}>
          {pinch && <Morph from={HAND_OPEN.joints} to={HAND_PINCH.joints} k="joints" />}
        </path>
        <path className="g-nail" d={h.nails}>
          {pinch && <Morph from={HAND_OPEN.nails} to={HAND_PINCH.nails} k="nails" />}
        </path>
      </g>
      <path className="g-edge" d={h.outline}>
        {pinch && <Morph from={HAND_OPEN.outline} to={HAND_PINCH.outline} k="outline" />}
      </path>
    </svg>
  );
}

interface Props {
  onAction: (a: Action) => void | Promise<void>;
  onClose: (finished: boolean) => void;
}

export default function StageTutorial({ onAction, onClose }: Props) {
  const [mobile] = useState(
    () => window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
  );
  const [mode, setMode] = useState<Mode | null>(null);
  const [starting, setStarting] = useState(false);
  const [camError, setCamError] = useState('');
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);
  const [keysHit, setKeysHit] = useState<string[]>([]);

  const steps = mode ? buildSteps(mode, mobile) : [];
  const step = steps[i];
  const finished = mode !== null && i >= steps.length;

  const ghostRef = useRef<HTMLDivElement>(null);
  const meRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const trailRef = useRef<SVGSVGElement>(null);
  const feedbackRef = useRef<HTMLParagraphElement>(null);
  const onActionRef = useRef(onAction);
  onActionRef.current = onAction;

  const go = (n: number) => {
    setI(n);
    setDone(false);
    setKeysHit([]);
  };

  // Auto-advance once a step is completed.
  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => go(i + 1), 1100);
    return () => window.clearTimeout(t);
  }, [done, i]);

  useEffect(() => {
    if (finished) onClose(true);
  }, [finished, onClose]);

  // Per-step tracking loop: animate ghost, read user input, fill progress.
  useEffect(() => {
    if (!mode || !step) return;
    if (step.kind === 'two') onActionRef.current('two');

    let raf = 0;
    let progress = 0;
    let complete = false;
    let t0 = -1;
    let last = 0;
    const pointer = { x: -1, y: -1, at: 0 };
    let sizeBase = 0;
    const baseSamples: number[] = [];
    let grew = 0;
    let shrank = 0;
    let pinchOpen = false;
    let pinches = 0;
    const startDepth = window.wayang?.controller.mouse.depth ?? 0;

    const finish = () => {
      if (complete) return;
      complete = true;
      progress = 1;
      setDone(true);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX / window.innerWidth;
      pointer.y = e.clientY / window.innerHeight;
      pointer.at = performance.now();
    };
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (step.kind === 'dance' && k === 'd') finish();
      if (step.kind === 'keys' && KEY_SET.includes(k)) {
        setKeysHit((prev) => {
          const next = prev.includes(k) ? prev : [...prev, k];
          if (KEYS.every(([key]) => keyHit(key, next))) finish();
          return next;
        });
      }
    };
    window.addEventListener('pointermove', onPointer);
    window.addEventListener('pointerdown', onPointer);
    window.addEventListener('keydown', onKey);

    // Dotted motion trail showing the path the ghost hand will travel.
    const trail = trailRef.current;
    if (trail && step.path && step.kind === 'follow') {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const pts: string[] = [];
      for (let t = 0; t <= 7.9; t += 0.06) {
        const [x, y] = step.path(t);
        pts.push(`${(x * W).toFixed(1)},${(y * H).toFixed(1)}`);
      }
      trail.setAttribute('viewBox', `0 0 ${W} ${H}`);
      trail.querySelectorAll('polyline').forEach((pl) => pl.setAttribute('points', pts.join(' ')));
    }

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (t0 < 0) t0 = last = now;
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const t = (now - t0) / 1000;
      const ctrl = window.wayang?.controller;
      const aspect = window.wayang?.tracker.aspect || 16 / 9;
      const hands = ctrl
        ? ctrl.slots.filter((s) => s.active && s.data && now - s.lastSeen < 400)
        : [];

      const [gx, gy, gs] = step.path ? step.path(t) : [0.5, 0.52, 1];
      const ghost = ghostRef.current;
      if (ghost) {
        ghost.style.transform = `translate(${gx * 100}vw, ${gy * 100}vh) scale(${gs})`;
      }

      // User's own position, in normalized screen coords.
      let me: [number, number] | null = null;
      if (mode === 'camera' && hands[0]?.data) {
        me = [hands[0].data.palm[0] / aspect, hands[0].data.palm[1]];
      } else if (mode === 'mouse' && now - pointer.at < 600) {
        me = [pointer.x, pointer.y];
      }
      const dot = meRef.current;
      if (dot) {
        dot.style.opacity = me && step.path ? '1' : '0';
        if (me) dot.style.transform = `translate(${me[0] * 100}vw, ${me[1] * 100}vh)`;
      }
      const open = hands.filter((h) => isOpenPalm(h.landmarks));
      const fb = feedbackRef.current;
      const say = (txt: string) => {
        if (fb && fb.textContent !== txt) fb.textContent = txt;
      };

      if (!complete && t > GRACE_SECONDS) {
        const k = step.kind;
        const lose = (rate = 1.2) => Math.max(0, progress - dt * rate);
        const near = !!me && Math.hypot(me[0] - gx, (me[1] - gy) * 0.75) < MATCH_RADIUS;
        const cam = mode === 'camera';
        const h0 = hands[0]?.data;
        const palmOk = !cam || open.length > 0;

        if (cam && k !== 'scroll' && k !== 'dance' && k !== 'keys') {
          if (!hands.length) say('Tangan belum terlihat — mundur sedikit dan pastikan cahaya cukup');
          else if (k !== 'pinch' && !palmOk) say('Buka telapak tangan lebar-lebar, jari lurus');
          else say('');
        }

        if (k === 'present') {
          if (palmOk && near) progress += dt / HOLD_SECONDS;
          else progress = 0;
          if (cam && palmOk && hands.length && !near) say('Geser tangan Anda ke posisi tangan bayangan');
        } else if (k === 'follow') {
          const ok = near && palmOk;
          progress = ok ? progress + dt / FOLLOW_SECONDS : lose(0.6);
          if (!ok && me && palmOk) say('Terlalu jauh — tempelkan titik emas pada tangan bayangan');
          else if (!cam) say('');
        } else if (k === 'depth') {
          if (h0 && palmOk) {
            if (baseSamples.length < 20) {
              baseSamples.push(h0.size);
              sizeBase = baseSamples.reduce((x, y) => x + y, 0) / baseSamples.length;
              say('Tahan tangan diam sejenak…');
            } else {
              const r = h0.size / sizeBase;
              if (r > 1.28 && grew < 0.3) grew += dt;
              if (grew >= 0.3 && r < 0.85) shrank += dt;
              const g = Math.min(1, grew / 0.3);
              const sh = Math.min(1, shrank / 0.3);
              progress = g * 0.5 + sh * 0.5;
              say(g < 1 ? 'Dekatkan tangan ke kamera' : sh < 1 ? 'Sekarang jauhkan tangan' : '');
            }
          }
        } else if (k === 'pinch') {
          if (h0) {
            const ratio = Math.hypot(h0.a[0] - h0.b[0], h0.a[1] - h0.b[1]) / Math.max(1e-4, h0.size);
            if (ratio > 0.7) pinchOpen = true;
            else if (ratio < 0.3 && pinchOpen) {
              pinchOpen = false;
              pinches += 1;
            }
            progress = pinches / PINCH_REPS;
            say(`Jepit ${Math.min(pinches, PINCH_REPS)} / ${PINCH_REPS} — ${pinchOpen ? 'satukan ujung ibu jari & telunjuk' : 'buka lagi jarinya'}`);
          }
        } else if (k === 'two') {
          if (open.length >= 2) progress += dt / HOLD_SECONDS;
          else progress = lose(2);
          if (hands.length >= 2 && open.length < 2) say('Buka kedua telapak tangan');
          else if (hands.length === 1) say('Baru satu tangan — angkat tangan yang lain');
        } else if (k === 'scroll' && ctrl) {
          progress = Math.min(1, Math.abs(ctrl.mouse.depth - startDepth) / 0.35);
        }
        if (progress >= 1) finish();
      }

      const ring = ringRef.current;
      if (ring) ring.style.strokeDashoffset = String(100 - Math.min(1, progress) * 100);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, i]);

  const choose = async (m: Mode) => {
    setCamError('');
    if (m === 'mouse') {
      await onAction('mouse');
      setMode('mouse');
      return;
    }
    setStarting(true);
    await onAction('camera');
    setStarting(false);
    if (window.wayang?.controller.source === 'camera') setMode('camera');
    else setCamError('Kamera tidak dapat dinyalakan. Izinkan akses kamera di browser, atau main dengan ' + (mobile ? 'sentuhan.' : 'mouse.'));
  };

  // ── Choice screen ──
  if (!mode) {
    return (
      <div className="tut-scrim">
        <section className="tut-choice panel" role="dialog" aria-label="Pilih cara bermain">
          <p className="eyebrow">Tutorial Dalang</p>
          <h2 className="tut-heading">Bagaimana Anda ingin mendalang?</h2>
          <div className="tut-options">
            <button type="button" className="tut-option" onClick={() => choose('camera')} disabled={starting}>
              <span className="tut-option-icon"><Webcam size={26} strokeWidth={1.6} /></span>
              <strong>{starting ? 'Menyalakan kamera…' : 'Tangan & Kamera'}</strong>
              <span>AI membaca gerak tangan Anda. Diproses di perangkat, tidak direkam.</span>
            </button>
            <button type="button" className="tut-option" onClick={() => choose('mouse')} disabled={starting}>
              <span className="tut-option-icon">{mobile ? <Pointer size={26} strokeWidth={1.6} /> : <Mouse size={26} strokeWidth={1.6} />}</span>
              <strong>{mobile ? 'Sentuh Layar' : 'Mouse & Keyboard'}</strong>
              <span>{mobile ? 'Geser jari di layar untuk menggerakkan wayang.' : 'Kursor menggerakkan wayang, keyboard untuk aksi.'}</span>
            </button>
          </div>
          {camError && <p className="tut-error" role="alert">{camError}</p>}
          <button type="button" className="tutorial-skip" onClick={() => onClose(false)}>
            Lewati tutorial
          </button>
        </section>
      </div>
    );
  }

  if (finished) return null;

  const showGhost = !!step.ghost && step.ghost !== 'two';

  return (
    <div className="tut-layer" aria-live="polite">
      {step.kind === 'follow' && (
        <svg ref={trailRef} className="tut-trail" aria-hidden="true">
          <polyline className="dash" />
        </svg>
      )}
      {showGhost && (
        <div ref={ghostRef} className={`tut-ghost ${step.ghost} ${done ? 'ok' : ''}`}>
          <span className="tut-ripple" />
          <span className="tut-ripple r2" />
          <svg className="tut-ring" viewBox="0 0 40 40" aria-hidden="true">
            <circle cx="20" cy="20" r="18" pathLength={100} className="track" />
            <circle ref={ringRef} cx="20" cy="20" r="18" pathLength={100} className="fill" />
          </svg>
          <GhostHand variant={step.ghost as GhostVariant} />
        </div>
      )}
      {step.ghost === 'two' && (
        <div className={`tut-two ${done ? 'ok' : ''}`}>
          <GhostHand variant="hand" />
          <GhostHand variant="hand" />
        </div>
      )}
      <div ref={meRef} className={`tut-me ${mode}`} />

      <div className="tut-caption">
        <div className="tut-caption-head">
          <span className={`tut-step-icon ${done ? 'ok' : ''}`}>
            {done ? <Check size={22} strokeWidth={2.5} /> : <step.icon size={22} strokeWidth={1.8} />}
          </span>
          <div className="tut-caption-text">
            <p className="tut-step-num">
              Langkah {i + 1} dari {steps.length}
            </p>
            <h2 className="tut-heading">{done ? 'Bagus!' : step.title}</h2>
          </div>
        </div>
        <div className="tut-progress" aria-hidden="true">
          {steps.map((_, n) => (
            <span key={n} className={n < i || (n === i && done) ? 'on' : n === i ? 'cur' : ''} />
          ))}
        </div>
        <p className="tut-hint">{step.hint}</p>
        {step.kind === 'keys' && !done && (
          <p className="tut-step-num">
            {KEYS.filter(([k]) => keyHit(k, keysHit)).length} / {KEYS.length} tombol dicoba
          </p>
        )}
        {!done && <p ref={feedbackRef} className="tut-warn" aria-live="polite" />}

        {!showGhost && step.ghost !== 'two' && step.kind !== 'keys' && (
          <div className={`tut-bar ${done ? 'ok' : ''}`}>
            <svg viewBox="0 0 40 40" aria-hidden="true">
              <circle cx="20" cy="20" r="18" pathLength={100} className="track" />
              <circle ref={ringRef} cx="20" cy="20" r="18" pathLength={100} className="fill" />
            </svg>
            {step.kind === 'scroll' && <span className="tut-scroll-icon" />}
            {step.kind === 'dance' && (
              mobile ? (
                <button
                  type="button"
                  className="btn primary small"
                  onClick={() => {
                    onAction('dance');
                    setDone(true);
                  }}
                >
                  <Sparkles size={15} /> Tarian
                </button>
              ) : (
                <kbd className="tut-bigkey">D</kbd>
              )
            )}
          </div>
        )}
        {step.ghost === 'two' && (
          <div className="tut-bar">
            <svg viewBox="0 0 40 40" aria-hidden="true">
              <circle cx="20" cy="20" r="18" pathLength={100} className="track" />
              <circle ref={ringRef} cx="20" cy="20" r="18" pathLength={100} className="fill" />
            </svg>
          </div>
        )}

        {step.kind === 'keys' && (
          <ul className="tutorial-keys">
            {KEYS.map(([k, label]) => {
              const hit = keyHit(k, keysHit);
              return (
                <li key={k} className={hit ? 'hit' : ''}>
                  <kbd>{k}</kbd>
                  <span>{label}</span>
                </li>
              );
            })}
          </ul>
        )}

        <div className="tut-links">
          <button type="button" className="tutorial-skip" onClick={() => go(i + 1)}>
            Lewati langkah
          </button>
          <button type="button" className="tutorial-skip" onClick={() => onClose(false)}>
            Keluar tutorial
          </button>
        </div>
      </div>
    </div>
  );
}
