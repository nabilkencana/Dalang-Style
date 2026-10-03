import { OneEuro, clamp } from './math';
import { DetectionOutput, HandTracker, Landmark } from './tracking';
import { ArmSpec, PuppetInput, ViewRect } from './rig';

const WRIST = 0,
  THUMB_MCP = 2,
  THUMB_TIP = 4,
  INDEX_MCP = 5,
  INDEX_TIP = 8,
  MIDDLE_MCP = 9,
  RING_MCP = 13,
  PINKY_MCP = 17,
  PINKY_TIP = 20;

export interface FingerPairIndices {
  a: number;
  aBase: number;
  b: number;
  bBase: number;
}

export const FINGER_PAIRS: Record<string, FingerPairIndices> = {
  'thumb-index': { a: THUMB_TIP, aBase: THUMB_MCP, b: INDEX_TIP, bBase: INDEX_MCP },
  'thumb-pinky': { a: THUMB_TIP, aBase: THUMB_MCP, b: PINKY_TIP, bBase: PINKY_MCP },
  'index-pinky': { a: INDEX_TIP, aBase: INDEX_MCP, b: PINKY_TIP, bBase: PINKY_MCP },
};

const LOST_MS = 320;
const PINKY_HOLD_MS = 600;
const PINKY_REARM_MS = 400;

export interface SlotFilterData {
  palm: [number, number];
  a: [number, number];
  b: [number, number];
  size: number;
  roll: number;
  yaw: number;
}

export interface Slot {
  active: boolean;
  lastSeen: number;
  lastTs: number;
  rawPalm: [number, number] | null;
  f: {
    px: OneEuro;
    py: OneEuro;
    ax: OneEuro;
    ay: OneEuro;
    bx: OneEuro;
    by: OneEuro;
    size: OneEuro;
    roll: OneEuro;
    yaw: OneEuro;
  };
  leftIsA: boolean;
  role: number | null;
  data: SlotFilterData | null;
  landmarks: Landmark[] | null;
  pinky: boolean;
  pinkyOn: number;
  pinkyOff: number;
  pinkyArmed: boolean;
  danceTrigger: boolean;
}

function makeSlot(): Slot {
  const pos = () => new OneEuro(1.6, 9, 1.0);
  return {
    active: false,
    lastSeen: 0,
    lastTs: 0,
    rawPalm: null,
    f: {
      px: pos(),
      py: pos(),
      ax: pos(),
      ay: pos(),
      bx: pos(),
      by: pos(),
      size: new OneEuro(0.7, 1.5),
      roll: new OneEuro(1.2, 2.5),
      yaw: new OneEuro(1.2, 2.5),
    },
    leftIsA: true,
    role: null,
    data: null,
    landmarks: null,
    pinky: false,
    pinkyOn: 0,
    pinkyOff: 0,
    pinkyArmed: true,
    danceTrigger: false,
  };
}

function resetSlot(s: Slot) {
  s.active = false;
  s.data = null;
  s.rawPalm = null;
  s.role = null;
  s.pinky = false;
  s.pinkyOn = 0;
  s.pinkyOff = 0;
  s.pinkyArmed = true;
  s.danceTrigger = false;
  for (const f of Object.values(s.f)) f.reset();
}

interface AnalyzedHand {
  pinkySign: boolean;
  palm: [number, number];
  size: number;
  roll: number;
  yaw: number;
  a: [number, number];
  b: [number, number];
  aBase: [number, number];
  bBase: [number, number];
}

function analyze(lms: Landmark[], aspect: number, pair: FingerPairIndices): AnalyzedHand {
  const P: [number, number][] = lms.map((l) => [(1 - l.x) * aspect, l.y]);
  const avg = (...ids: number[]): [number, number] => [
    ids.reduce((s, i) => s + P[i][0], 0) / ids.length,
    ids.reduce((s, i) => s + P[i][1], 0) / ids.length,
  ];
  const d = (i: number, j: number) => Math.hypot(P[i][0] - P[j][0], P[i][1] - P[j][1]);
  const reach = (mcp: number, pip: number, tip: number) => ({
    tipPip: d(WRIST, tip) / d(WRIST, pip),
    tipMcp: d(WRIST, tip) / d(WRIST, mcp),
  });
  const index = reach(5, 6, 8),
    middle = reach(9, 10, 12),
    ring = reach(13, 14, 16),
    pinky = reach(17, 18, 20);

  const pinkySign =
    pinky.tipPip > 1.12 &&
    pinky.tipMcp > 1.4 &&
    index.tipPip < 1.02 &&
    middle.tipPip < 1.02 &&
    ring.tipPip < 1.12;

  const palmTwist = lms[5] && lms[17] ? (lms[5].z - lms[17].z) * 4 : 0;

  return {
    pinkySign,
    palm: avg(WRIST, INDEX_MCP, MIDDLE_MCP, RING_MCP, PINKY_MCP),
    size: Math.max(d(WRIST, MIDDLE_MCP), d(INDEX_MCP, PINKY_MCP) * 1.3),
    roll: Math.atan2(P[MIDDLE_MCP][0] - P[WRIST][0], -(P[MIDDLE_MCP][1] - P[WRIST][1])),
    yaw: palmTwist,
    a: P[pair.a],
    b: P[pair.b],
    aBase: P[pair.aBase],
    bBase: P[pair.bBase],
  };
}

export type SoloStyle = 'avatar' | 'classic';

export interface ControllerSettings {
  fingers: 'thumb-index' | 'thumb-pinky' | 'index-pinky';
  bodyHand: 'right' | 'left';
  characters: 'two' | 'one';
  soloStyle?: SoloStyle;
}
export interface ControllerStatus {
  hands: number;
  mode: string;
  calibrating: boolean;
}

export class Controller {
  tracker: HandTracker;
  source: 'demo' | 'mouse' | 'camera' = 'demo';
  settings: ControllerSettings = {
    fingers: 'thumb-index',
    bodyHand: 'right',
    characters: 'two',
    soloStyle: 'avatar',
  };
  slots: [Slot, Slot] = [makeSlot(), makeSlot()];
  bodySlot: number = -1;
  calibs: Record<string, { base: number | null; samples: number[] }> = {};
  mouse = { x: 960, y: 640, depth: 0, seen: false };
  status: ControllerStatus = { hands: 0, mode: 'demo', calibrating: false };
  prevCount: number = 0;
  home: [[number, number], [number, number]] = [
    [640, 650],
    [1280, 650],
  ];
  pendingDance: [boolean, boolean] = [false, false];

  constructor(tracker: HandTracker) {
    this.tracker = tracker;
  }

  requestDance(i: number | null = null) {
    for (let j = 0; j < this.puppetCount; j++) {
      if (i === null || i === j) this.pendingDance[j] = true;
    }
  }

  get puppetCount(): number {
    return this.settings.characters === 'two' ? 2 : 1;
  }
  setSoloStyle(style: SoloStyle) {
    this.settings.soloStyle = style;
  }

  recalibrate() {
    this.calibs = {};
  }

  toStage(nx: number, ny: number, view: ViewRect): [number, number] {
    const u = (nx - 0.12) / 0.76;
    const v = (ny - 0.1) / 0.8;
    return [view.x + view.w * (0.06 + 0.88 * u), view.y + view.h * (0.26 + 0.62 * v)];
  }

  ingest(det: DetectionOutput) {
    const { result, ts } = det;
    const aspect = this.tracker.aspect;
    const pair = FINGER_PAIRS[this.settings.fingers];
    const hands = result.landmarks.map((lm) => ({ lm, h: analyze(lm, aspect, pair) }));

    const used = new Set<number>();
    const assign = new Map<number, number>();
    const dist = (s: Slot, h: AnalyzedHand) =>
      s.rawPalm ? Math.hypot(s.rawPalm[0] - h.palm[0], s.rawPalm[1] - h.palm[1]) : 1e9;
    const pairs: { hi: number; si: number; d: number }[] = [];
    hands.forEach((hd, hi) =>
      this.slots.forEach((s, si) => pairs.push({ hi, si, d: s.active ? dist(s, hd.h) : 1e6 + si }))
    );
    pairs.sort((p, q) => p.d - q.d);
    for (const p of pairs) {
      if (assign.has(p.hi) || used.has(p.si)) continue;
      assign.set(p.hi, p.si);
      used.add(p.si);
    }

    for (const [hi, si] of assign) {
      const s = this.slots[si];
      const { h, lm } = hands[hi];
      const dt = s.active ? clamp((ts - s.lastTs) / 1000, 1 / 240, 0.2) : 1 / 30;

      // Auto-dance trigger from pinky gesture is disabled to prevent accidental interruptions while playing.
      // Dance is triggered on demand via the Tari Kiprah button or pressing 'D'.
      s.pinky = false;
      s.active = true;
      s.lastSeen = ts;
      s.lastTs = ts;
      s.rawPalm = h.palm;
      s.landmarks = lm;
      const f = s.f;

      s.leftIsA = h.a[0] <= h.b[0];

      s.data = {
        palm: [f.px.filter(h.palm[0], dt), f.py.filter(h.palm[1], dt)],
        a: [f.ax.filter(h.a[0], dt), f.ay.filter(h.a[1], dt)],
        b: [f.bx.filter(h.b[0], dt), f.by.filter(h.b[1], dt)],
        size: f.size.filter(h.size, dt),
        roll: f.roll.filter(h.roll, dt),
        yaw: f.yaw.filter(h.yaw, dt),
      };
    }
    for (const s of this.slots) {
      if (s.active && ts - s.lastSeen > LOST_MS) resetSlot(s);
    }
  }

  activeSlots(now: number): { s: Slot; i: number }[] {
    return this.slots
      .map((s, i) => ({ s, i }))
      .filter(({ s }) => s.active && s.data && now - s.lastSeen <= LOST_MS);
  }

  depthFor(key: string, size: number): number {
    let c = this.calibs[key];
    if (!c) c = this.calibs[key] = { base: null, samples: [] };
    if (c.base === null) {
      c.samples.push(size);
      if (c.samples.length >= 20) {
        const sorted = [...c.samples].sort((a, b) => a - b);
        c.base = sorted[sorted.length >> 1];
      }
      this.status.calibrating = true;
      return 0;
    }
    return clamp((size / c.base - 1) * 1.7, -0.35, 1.0);
  }

  handInput(slot: Slot, view: ViewRect, calibKey: string): PuppetInput {
    const d = slot.data!;
    const aspect = this.tracker.aspect;
    const [x, y] = this.toStage(d.palm[0] / aspect, d.palm[1], view);
    const rel = (tip: [number, number]): ArmSpec => ({
      type: 'rel',
      dx: (tip[0] - d.palm[0]) / d.size,
      dy: (tip[1] - d.palm[1]) / d.size,
      rodX: this.toStage(tip[0] / aspect, tip[1], view)[0],
    });
    const A = rel(d.a),
      B = rel(d.b);
    const leftIsA = d.a[0] <= d.b[0];
    const danceTrigger = slot.danceTrigger;
    slot.danceTrigger = false;
    return {
      active: true,
      body: { x, y },
      tilt: clamp(d.roll * 0.65, -0.45, 0.45),
      depth: this.depthFor(calibKey, d.size),
      arms: { left: leftIsA ? A : B, right: leftIsA ? B : A },
      danceTrigger,
    };
  }

  twoPuppetInput(active: { s: Slot; i: number }[], view: ViewRect): PuppetInput[] {
    const fresh =
      active.length === 2 &&
      (this.prevCount < 2 ||
        active[0].s.role === active[1].s.role ||
        active.some((a) => a.s.role === null));
    if (fresh) {
      const [p, q] = active;
      const pLeft = p.s.data!.palm[0] < q.s.data!.palm[0];
      p.s.role = pLeft ? 0 : 1;
      q.s.role = pLeft ? 1 : 0;
    } else if (active.length === 1 && active[0].s.role === null) {
      const s = active[0].s;
      s.role = s.data!.palm[0] / this.tracker.aspect < 0.5 ? 0 : 1;
    }
    this.status.mode = active.length ? 'two puppets' : 'no hands';
    const out: PuppetInput[] = [{ active: false }, { active: false }];
    for (const { s } of active) {
      if (s.role !== null) {
        out[s.role] = this.handInput(s, view, `p${s.role}`);
      }
    }
    return out;
  }

  onePuppetInput(active: { s: Slot; i: number }[], view: ViewRect): PuppetInput[] {
    if (!active.length) {
      this.bodySlot = -1;
      this.status.mode = 'no hands';
      return [{ active: false }];
    }
    if (active.length === 1) {
      this.bodySlot = active[0].i;
      this.status.mode = 'one hand';
      return [this.handInput(this.slots[this.bodySlot], view, 'one')];
    }

    // ── TWO HANDS SOLO MODE ──
    const aspect = this.tracker.aspect;

    if (this.settings.soloStyle === 'classic') {
      // Classic Dalang Mode: Hand 1 = Body (Gapit), Hand 2 = Both Arms (Tuding via fingers)
      if (!active.some((a) => a.i === this.bodySlot) || this.prevCount < 2) {
        const [p, q] = active;
        const pRight = p.s.data!.palm[0] > q.s.data!.palm[0];
        const wantRight = this.settings.bodyHand === 'right';
        this.bodySlot = pRight === wantRight ? p.i : q.i;
      }
      this.status.mode = 'two hands (classic)';
      const input = this.handInput(this.slots[this.bodySlot], view, 'one');
      const other = active.find((a) => a.i !== this.bodySlot);
      if (other) {
        const rod = other.s;
        const abs = (tip: [number, number]): ArmSpec => {
          const [x, y] = this.toStage(tip[0] / aspect, tip[1], view);
          return { type: 'abs', x, y, rodX: x };
        };
        const A = abs(rod.data!.a),
          B = abs(rod.data!.b);
        const leftIsA = rod.data!.a[0] <= rod.data!.b[0];
        input.arms = { left: leftIsA ? A : B, right: leftIsA ? B : A };
        input.danceTrigger = input.danceTrigger || rod.danceTrigger;
        rod.danceTrigger = false;
      }
      return [input];
    }

    // ── AVATAR TWO HANDS MODE (DEFAULT & PALING ENAK) ──
    // Tangan Kiri = Lengan Kiri Wayang, Tangan Kanan = Lengan Kanan Wayang
    // Titik Tengah = Posisi Badan, Sudut Kemiringan = Dynamic Body Tilt, Rata-rata Ukuran = Depth
    this.status.mode = 'avatar two hands';
    const [p, q] = active;
    const isPLeft = p.s.data!.palm[0] <= q.s.data!.palm[0];
    const leftSlot = isPLeft ? p.s : q.s;
    const rightSlot = isPLeft ? q.s : p.s;
    const leftData = leftSlot.data!;
    const rightData = rightSlot.data!;

    // 1. Posisi badan mengikuti titik tengah (midpoint) kedua tangan dengan offset ergonomis
    const midNormX = (leftData.palm[0] + rightData.palm[0]) * 0.5;
    const midNormY = (leftData.palm[1] + rightData.palm[1]) * 0.5;
    const [bodyStageX, bodyStageY] = this.toStage(midNormX / aspect, Math.min(midNormY + 0.08, 0.85), view);
    // 2. Kemiringan dinamis tubuh dari sudut antara kedua tangan
    const dNormX = rightData.palm[0] - leftData.palm[0];
    const dNormY = rightData.palm[1] - leftData.palm[1];
    const angle = Math.atan2(dNormY, Math.max(dNormX, 0.04));
    const tilt = clamp(angle * 0.45, -0.45, 0.45);

    // 3. Kedalaman tubuh (Z-depth) dari rata-rata ukuran telapak tangan
    const avgSize = (leftData.size + rightData.size) * 0.5;
    const depth = this.depthFor('solo_avatar', avgSize);

    // 4. Pemetaan lengan: masing-masing tangan mengendalikan lengan wayang yang bersesuaian secara absolut
    const absArm = (tip: [number, number]): ArmSpec => {
      const [x, y] = this.toStage(tip[0] / aspect, tip[1], view);
      return { type: 'abs', x, y, rodX: x };
    };

    const leftArm = absArm(leftData.b);
    const rightArm = absArm(rightData.b);

    const danceTrigger = leftSlot.danceTrigger || rightSlot.danceTrigger;
    leftSlot.danceTrigger = false;
    rightSlot.danceTrigger = false;

    return [
      {
        active: true,
        body: { x: bodyStageX, y: bodyStageY },
        tilt,
        depth,
        arms: { left: leftArm, right: rightArm },
        danceTrigger,
      },
    ];
  }

  cameraInput(now: number, view: ViewRect): PuppetInput[] {
    const active = this.activeSlots(now);
    this.status.hands = active.length;
    this.status.calibrating = false;
    const out =
      this.puppetCount === 2
        ? this.twoPuppetInput(active, view)
        : this.onePuppetInput(active, view);
    this.prevCount = active.length;
    return out;
  }

  demoInput(t: number, view: ViewRect): PuppetInput[] {
    const cx = view.x + view.w / 2;
    const drift = Math.sin(t * 0.13) * view.w * 0.08;
    const gap = view.w * (0.36 + 0.14 * Math.sin(t * 0.42));
    const floor = view.y + view.h * 0.6;
    const talk = (phase: number, amp: number): { left: ArmSpec; right: ArmSpec } => ({
      left: {
        type: 'rel',
        dx: -0.95 + Math.sin(t * 1.7 + phase) * 0.35 * amp,
        dy: -0.25 + Math.sin(t * 1.1 + phase) * 0.8 * amp,
      },
      right: {
        type: 'rel',
        dx: 0.55 + Math.sin(t * 1.3 + phase) * 0.3,
        dy: 0.45 + Math.sin(t * 0.9 + phase) * 0.55,
      },
    });
    const turn = Math.sin(t * 0.5);
    const inputs: PuppetInput[] = [
      {
        active: true,
        body: { x: cx + drift - gap / 2, y: floor + Math.sin(t * 0.9) * 18 },
        tilt: Math.sin(t * 0.55) * 0.06,
        depth: Math.max(0, Math.sin(t * 0.21 - 1.2)) * 0.6,
        arms: mirrorArms(talk(0, turn > 0 ? 1 : 0.35)),
      },
      {
        active: true,
        body: { x: cx + drift + gap / 2, y: floor + Math.sin(t * 0.8 + 2) * 18 },
        tilt: Math.sin(t * 0.47 + 1) * 0.06,
        depth: Math.max(0, Math.sin(t * 0.19 + 1.5)) * 0.6,
        arms: talk(2, turn < 0 ? 1 : 0.35),
      },
    ];
    return inputs.slice(0, this.puppetCount);
  }

  idleInput(t: number, i: number): PuppetInput {
    return {
      active: true,
      body: { x: this.home[i][0], y: this.home[i][1] + Math.sin(t * 0.8 + i) * 6 },
      tilt: 0,
      depth: 0,
      arms: {
        left: {
          type: 'rel',
          dx: -0.7 + Math.sin(t * 0.9 + i) * 0.15,
          dy: 0.55 + Math.sin(t * 0.6) * 0.2,
        },
        right: {
          type: 'rel',
          dx: 0.35 + Math.sin(t * 0.8 + 1 + i) * 0.12,
          dy: 0.85 + Math.sin(t * 0.5) * 0.1,
        },
      },
    };
  }

  mouseInput(t: number): PuppetInput[] {
    const idle = this.idleInput(t, 0);
    const first: PuppetInput = this.mouse.seen
      ? { ...idle, body: { x: this.mouse.x, y: this.mouse.y }, depth: this.mouse.depth }
      : { active: false };
    return this.puppetCount === 2 ? [first, this.idleInput(t, 1)] : [first];
  }

  update(t: number, view: ViewRect): PuppetInput[] {
    this.home = [
      [view.x + view.w * 0.3, view.y + view.h * 0.6],
      [view.x + view.w * 0.7, view.y + view.h * 0.6],
    ];
    let inputs: PuppetInput[];
    if (this.source === 'camera') {
      const det = this.tracker.detect();
      if (det) this.ingest(det);
      inputs = this.cameraInput(performance.now(), view);
    } else if (this.source === 'mouse') {
      this.status.mode = 'mouse';
      inputs = this.mouseInput(t);
    } else {
      this.status.mode = 'demo';
      inputs = this.demoInput(t, view);
    }
    inputs.forEach((inp, i) => {
      if (this.pendingDance[i]) inp.danceTrigger = true;
    });
    this.pendingDance = [false, false];
    return inputs;
  }
}

function mirrorArms(arms: { left: ArmSpec; right: ArmSpec }): { left: ArmSpec; right: ArmSpec } {
  const m = (s: ArmSpec): ArmSpec => ({ ...s, dx: -(s.dx ?? 0) });
  return { left: m(arms.right), right: m(arms.left) };
}
