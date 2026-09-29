const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const easeOut = (t: number) => 1 - (1 - clamp01(t)) ** 2;
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const mixV = (a: [number, number], b: [number, number], t: number): [number, number] => [
  mix(a[0], b[0], t),
  mix(a[1], b[1], t),
];
const arc = (r: number, a: number): [number, number] => [r * Math.cos(a), r * Math.sin(a)];

const REST_F: [number, number] = [0.45, -0.55];
const REST_B: [number, number] = [-0.25, -0.95];
const SEMBAH_F: [number, number] = [0.55, 0.45];
const SEMBAH_B: [number, number] = [1.15, 0.45];
const ULAP_F: [number, number] = [0.3, 0.85];
const HIP_B: [number, number] = [-0.15, -0.75];
const SPREAD_F: [number, number] = [1.0, 0.45];
const SPREAD_B: [number, number] = [-0.95, -0.25];
const OUT_F: [number, number] = [1.05, 0.08];
const OUT_B: [number, number] = [-1.0, 0.05];

const SNAP = 0.17;

export interface DancePose {
  motif: string;
  x: number;
  y: number;
  tilt: number;
  depth: number;
  front: [number, number];
  back: [number, number];
  still?: number;
}

interface RawKeyframe {
  b: number;
  snap: number;
  motif?: string;
  x?: number;
  y?: number;
  tilt?: number;
  depth?: number;
  front?: [number, number];
  back?: [number, number];
}

const K = (b: number, pose: Partial<DancePose>, snap = SNAP): RawKeyframe => ({
  b,
  snap,
  ...pose,
});

const RAW_KEYS: RawKeyframe[] = [
  K(-0.01, { motif: 'sembahan', x: 0, y: 8, tilt: 0.04, depth: 0, front: REST_F, back: REST_B }),
  K(0, { y: 12, tilt: 0.1, front: [0.5, 0.05], back: [0.55, -0.25] }),
  K(0.33, { y: 16, tilt: 0.18, front: SEMBAH_F, back: SEMBAH_B }),
  K(1, { y: 22, tilt: 0.26 }),
  K(1.33, { y: 14, tilt: 0.14 }),
  K(1.66, { y: 18, tilt: 0.2 }, 0.1),

  K(2, { motif: 'ulap-ulap', y: -10, tilt: -0.06, front: ULAP_F, back: HIP_B }),
  K(2.33, { x: 26, tilt: 0.05 }),
  K(2.66, { x: 0, tilt: -0.09 }),
  K(3, { x: 34, y: -16, tilt: 0.07 }),
  K(3.33, { x: 20, tilt: -0.03 }, 0.1),
  K(3.66, { y: -8, tilt: 0.02 }, 0.1),

  K(4, { motif: 'kiprah', x: 10, y: -24, tilt: 0.14, front: SPREAD_F, back: SPREAD_B }),
  K(4.25, { y: 4, tilt: 0.06 }, 0.1),
  K(5, { x: 0, y: -20, tilt: -0.12, front: [0.7, 0.95], back: [-0.7, -0.6] }),
  K(5.25, { y: 4 }, 0.1),
  K(6, { x: 32, y: -22, tilt: 0.18, front: [1.1, -0.1], back: [-0.6, 0.8] }),
  K(6.25, { y: 6 }, 0.1),
  K(6.66, { front: [0.9, 0.6], back: [-0.95, -0.2] }),
  K(7, { x: 12, y: -24, tilt: -0.13, front: [0.4, 1.0], back: [-1.0, 0.3] }),
  K(7.25, { y: 6, tilt: -0.04 }, 0.1),
  K(7.6, { tilt: 0.07 }),

  K(8, { motif: 'ombak banyu', x: 30, y: -22, tilt: -0.07, front: [0.95, 0.7], back: [-0.9, -0.5] }),
  K(8.5, { x: 45, y: 18, tilt: 0.11, front: [0.95, -0.2], back: [-0.9, 0.45] }),
  K(9, { x: 60, y: -22, tilt: -0.07, front: [0.95, 0.7], back: [-0.9, -0.5] }),
  K(9.5, { x: 75, y: 18, tilt: 0.11, front: [0.95, -0.2], back: [-0.9, 0.45] }),
  K(10, { x: 90, y: -22, tilt: -0.07, front: [0.95, 0.7], back: [-0.9, -0.5] }),
  K(10.5, { x: 100, y: 18, tilt: 0.11, front: [0.95, -0.2], back: [-0.9, 0.45] }),
  K(11, { x: 110, y: -18, tilt: -0.05, front: [0.95, 0.6], back: [-0.9, -0.4] }),
  K(11.5, { x: 115, y: 10, tilt: 0.08, front: [0.95, 0.1], back: [-0.9, 0.2] }),

  K(12, { motif: 'srisig', x: 135, y: -8, tilt: 0.13, front: OUT_F, back: OUT_B }, 0.1),
  K(12.33, { x: 157, y: 0 }, 0.1),
  K(12.66, { x: 179, y: -8 }, 0.1),
  K(13, { x: 201, y: 0 }, 0.1),
  K(13.33, { x: 223, y: -8 }, 0.1),
  K(13.66, { x: 240, y: 0 }, 0.1),

  K(14, { motif: 'besut', x: 0, y: -52, tilt: 0.02, depth: 0.9, front: arc(0.95, Math.PI / 2), back: arc(0.9, -Math.PI / 2) }, 0.22),
  K(14.5, { front: arc(0.95, 0), back: arc(0.9, Math.PI) }),
  K(15.5, { front: arc(0.95, -Math.PI / 2), back: arc(0.9, Math.PI / 2) }),
  K(16.33, { front: arc(0.95, Math.PI), back: arc(0.9, 0) }),
  K(16.66, { y: -4, tilt: 0.04, depth: 0.2, front: arc(0.95, Math.PI / 2), back: arc(0.9, -Math.PI / 2) }, 0.18),

  K(17, { motif: 'sabetan', x: -12, y: 0, tilt: -0.12, depth: 0, front: arc(1.1, 2.5), back: SPREAD_B }),
  K(17.33, { x: 80, tilt: 0.22, front: arc(1.15, -0.4) }, 0.08),

  K(18.33, { motif: 'tancep', x: 72, y: 34, tilt: 0.03, front: REST_F, back: REST_B }, 0.1),
  K(18.5, { y: 20 }, 0.1),
  K(18.8, { x: 0, y: 8, tilt: 0 }, 0.5),
];

interface ResolvedKeyframe extends DancePose {
  b: number;
  snap: number;
}

const KEYS: ResolvedKeyframe[] = [];
for (let i = 0; i < RAW_KEYS.length; i++) {
  const prev: ResolvedKeyframe = i > 0 ? KEYS[i - 1] : {
    motif: 'sembahan',
    x: 0,
    y: 0,
    tilt: 0,
    depth: 0,
    front: REST_F,
    back: REST_B,
    b: 0,
    snap: SNAP,
  };
  KEYS.push({
    b: RAW_KEYS[i].b,
    snap: RAW_KEYS[i].snap,
    motif: RAW_KEYS[i].motif ?? prev.motif,
    x: RAW_KEYS[i].x ?? prev.x,
    y: RAW_KEYS[i].y ?? prev.y,
    tilt: RAW_KEYS[i].tilt ?? prev.tilt,
    depth: RAW_KEYS[i].depth ?? prev.depth,
    front: RAW_KEYS[i].front ?? prev.front,
    back: RAW_KEYS[i].back ?? prev.back,
  });
}

export const KIPRAH_BEATS = 19.5;
export const TURN_BEATS = [15, 16];

export function kiprahPose(b: number): DancePose {
  let i = 0;
  while (i + 1 < KEYS.length && KEYS[i + 1].b <= b) i++;
  const key = KEYS[i];
  const prev = KEYS[Math.max(0, i - 1)];
  const u = i === 0 ? 1 : (b - key.b) / key.snap;
  const t = easeOut(u);
  const since = Math.max(0, b - key.b - key.snap);
  return {
    motif: key.motif,
    x: mix(prev.x, key.x, t),
    y: mix(prev.y, key.y, t),
    tilt: mix(prev.tilt, key.tilt, t),
    depth: mix(prev.depth, key.depth, t),
    front: mixV(prev.front, key.front, t),
    back: mixV(prev.back, key.back, t),
    still: u < 1 ? 0 : 1 - Math.exp(-since * 5),
  };
}

export function danceWeight(b: number, start: number): number {
  const ramp = (t: number) => {
    t = clamp01(t);
    return t * t * (3 - 2 * t);
  };
  return ramp((b - start) / 0.5) * (1 - ramp((b - (KIPRAH_BEATS - 0.7)) / 0.7));
}
