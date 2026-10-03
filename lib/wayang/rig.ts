import { Affine, AffineMatrix, Spring, Spring2, clamp, lerp, wrapAngle } from './math';
import { KIPRAH_BEATS, TURN_BEATS, kiprahPose, danceWeight, DancePose } from './dance';

const DEFAULT_BEAT = 0.68;

const sub = (a: [number, number], b: [number, number]): [number, number] => [a[0] - b[0], a[1] - b[1]];
const add = (a: [number, number], b: [number, number]): [number, number] => [a[0] + b[0], a[1] + b[1]];
const len = (v: [number, number]): number => Math.hypot(v[0], v[1]);
const ang = (v: [number, number]): number => Math.atan2(v[1], v[0]);
const rotV = (v: [number, number], t: number): [number, number] => {
  const c = Math.cos(t),
    s = Math.sin(t);
  return [c * v[0] - s * v[1], s * v[0] + c * v[1]];
};
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

const rot180 = (p: [number, number], size: [number, number]): [number, number] => [
  size[0] - p[0],
  size[1] - p[1],
];

export interface PartConfig {
  src: string;
  size: [number, number];
  prox?: [number, number];
  dist?: [number, number];
  grip?: [number, number];
}

const LEFT: { upper: PartConfig; fore: PartConfig; hand: PartConfig } = {
  upper: { src: 'assets/upper-arm-1.png', size: [231, 89], prox: [211, 44], dist: [22, 28] },
  fore: { src: 'assets/forearm-1.png', size: [195, 109], prox: [172, 58], dist: [13, 53] },
  hand: { src: 'assets/hand-1.png', size: [108, 124], prox: [91.7, 67.5], grip: [52, 76] },
};

export const mirrorPiece = (p: PartConfig, src: string): PartConfig => {
  const out: PartConfig = { src, size: p.size };
  if (p.prox) out.prox = rot180(p.prox, p.size);
  if (p.dist) out.dist = rot180(p.dist, p.size);
  if (p.grip) out.grip = rot180(p.grip, p.size);
  return out;
};

export const PARTS: Record<string, PartConfig> = {
  body: { src: 'assets/body.png', size: [706, 1377] },
  upperL: LEFT.upper,
  foreL: LEFT.fore,
  handL: LEFT.hand,
  upperR: mirrorPiece(LEFT.upper, 'assets/upper-arm-r.png'),
  foreR: mirrorPiece(LEFT.fore, 'assets/forearm-r.png'),
  handR: mirrorPiece(LEFT.hand, 'assets/hand-r.png'),
};

export interface BodyConfig {
  anchor: [number, number];
  shoulder: { L: [number, number]; R: [number, number] };
  stickTop: [number, number];
  stickFoot: [number, number];
  ties: number[];
}

export const BODY: BodyConfig = {
  anchor: [345, 760],
  shoulder: { L: [247.5, 432.5], R: [442.5, 432.5] },
  stickTop: [346, 318],
  stickFoot: [346, 1334],
  ties: [470, 1010, 1262],
};

export const REST: Record<'L' | 'R', [number, number]> = {
  L: [-150, 250],
  R: [70, 330],
};

const SEMAR_LEFT: { upper: PartConfig; fore: PartConfig; hand: PartConfig } = {
  upper: { src: 'assets/semar/upper-arm-1.png', size: [420, 145], prox: [380, 117], dist: [63, 48] },
  fore: { src: 'assets/semar/forearm-1.png', size: [350, 221], prox: [299, 179], dist: [66, 36] },
  hand: { src: 'assets/semar/hand-1.png', size: [220, 185], prox: [196, 30], grip: [46, 81] },
};

const SEMAR_PARTS: Record<string, PartConfig> = {
  body: { src: 'assets/semar/body.png', size: [993, 1302] },
  upperL: SEMAR_LEFT.upper,
  foreL: SEMAR_LEFT.fore,
  handL: SEMAR_LEFT.hand,
  upperR: mirrorPiece(SEMAR_LEFT.upper, 'assets/semar/upper-arm-r.png'),
  foreR: mirrorPiece(SEMAR_LEFT.fore, 'assets/semar/forearm-r.png'),
  handR: mirrorPiece(SEMAR_LEFT.hand, 'assets/semar/hand-r.png'),
};

const SEMAR_BODY: BodyConfig = {
  anchor: [456, 761],
  shoulder: { L: [275, 500], R: [541, 409] },
  stickTop: [456, 250],
  stickFoot: [456, 1260],
  ties: [480, 950, 1200],
};

const PETRUK_LEFT: { upper: PartConfig; fore: PartConfig; hand: PartConfig } = {
  upper: { src: 'assets/petruk/upper-arm-1.png', size: [340, 105], prox: [305, 65], dist: [29, 31] },
  fore: { src: 'assets/petruk/forearm-1.png', size: [360, 73], prox: [328, 38], dist: [30, 35] },
  hand: { src: 'assets/petruk/hand-1.png', size: [160, 210], prox: [137, 19], grip: [81, 130] },
};

const PETRUK_PARTS: Record<string, PartConfig> = {
  body: { src: 'assets/petruk/body.png', size: [706, 1530] },
  upperL: PETRUK_LEFT.upper,
  foreL: PETRUK_LEFT.fore,
  handL: PETRUK_LEFT.hand,
  upperR: mirrorPiece(PETRUK_LEFT.upper, 'assets/petruk/upper-arm-r.png'),
  foreR: mirrorPiece(PETRUK_LEFT.fore, 'assets/petruk/forearm-r.png'),
  handR: mirrorPiece(PETRUK_LEFT.hand, 'assets/petruk/hand-r.png'),
};

const PETRUK_BODY: BodyConfig = {
  anchor: [260, 780],
  shoulder: { L: [306, 424], R: [532, 423] },
  stickTop: [260, 280],
  stickFoot: [260, 1480],
  ties: [480, 1020, 1380],
};

const BAGONG_LEFT: { upper: PartConfig; fore: PartConfig; hand: PartConfig } = {
  upper: { src: 'assets/bagong/upper-arm-1.png', size: [340, 120], prox: [316, 96], dist: [21, 58] },
  fore: { src: 'assets/bagong/forearm-1.png', size: [340, 75], prox: [317, 41], dist: [33, 42] },
  hand: { src: 'assets/bagong/hand-1.png', size: [240, 120], prox: [218, 94], grip: [22, 35] },
};

const BAGONG_PARTS: Record<string, PartConfig> = {
  body: { src: 'assets/bagong/body.png', size: [699, 1497] },
  upperL: BAGONG_LEFT.upper,
  foreL: BAGONG_LEFT.fore,
  handL: BAGONG_LEFT.hand,
  upperR: mirrorPiece(BAGONG_LEFT.upper, 'assets/bagong/upper-arm-r.png'),
  foreR: mirrorPiece(BAGONG_LEFT.fore, 'assets/bagong/forearm-r.png'),
  handR: mirrorPiece(BAGONG_LEFT.hand, 'assets/bagong/hand-r.png'),
};

const BAGONG_BODY: BodyConfig = {
  anchor: [340, 750],
  shoulder: { L: [182, 434], R: [524, 427] },
  stickTop: [340, 260],
  stickFoot: [340, 1420],
  ties: [470, 960, 1260],
};

const GATOTKACA_LEFT: { upper: PartConfig; fore: PartConfig; hand: PartConfig } = {
  upper: { src: 'assets/gatotkaca/upper-arm-1.png', size: [340, 103], prox: [309.9, 70.8], dist: [26.9, 42.0] },
  fore: { src: 'assets/gatotkaca/forearm-1.png', size: [350, 106], prox: [313.7, 36.8], dist: [29.3, 72.0] },
  hand: { src: 'assets/gatotkaca/hand-1.png', size: [240, 167], prox: [218.8, 142.8], grip: [64.2, 13.7] },
};

const GATOTKACA_RIGHT: { upper: PartConfig; fore: PartConfig; hand: PartConfig } = {
  upper: { src: 'assets/gatotkaca/upper-arm-r.png', size: [340, 83], prox: [310.7, 45.3], dist: [28.6, 49.4] },
  fore: { src: 'assets/gatotkaca/forearm-r.png', size: [350, 87], prox: [315.7, 43.5], dist: [28.8, 42.6] },
  hand: { src: 'assets/gatotkaca/hand-r.png', size: [240, 183], prox: [216.6, 157.0], grip: [51.3, 12.9] },
};

const GATOTKACA_PARTS: Record<string, PartConfig> = {
  body: { src: 'assets/gatotkaca/body.png', size: [710, 1500] },
  upperL: GATOTKACA_LEFT.upper,
  foreL: GATOTKACA_LEFT.fore,
  handL: GATOTKACA_LEFT.hand,
  upperR: GATOTKACA_RIGHT.upper,
  foreR: GATOTKACA_RIGHT.fore,
  handR: GATOTKACA_RIGHT.hand,
};

const GATOTKACA_BODY: BodyConfig = {
  anchor: [355, 780],
  shoulder: { L: [190.0, 492.9], R: [481.3, 493.1] },
  stickTop: [355, 180],
  stickFoot: [355, 1460],
  ties: [480, 980, 1320],
};

export interface CharacterConfig {
  id: string;
  name: string;
  javaneseName?: string;
  parts: Record<string, PartConfig>;
  body: BodyConfig;
  rest: Record<'L' | 'R', [number, number]>;
}

export const CHARACTERS: Record<string, CharacterConfig> = {
  arjuna: {
    id: 'arjuna',
    name: 'Arjuna',
    javaneseName: 'ꦗꦤꦏ',
    parts: PARTS,
    body: BODY,
    rest: REST,
  },
  gatotkaca: {
    id: 'gatotkaca',
    name: 'Gatotkaca',
    javaneseName: 'ꦒꦠꦺꦴꦠ꧀ꦏꦕ',
    parts: GATOTKACA_PARTS,
    body: GATOTKACA_BODY,
    rest: {
      L: [-160, 240],
      R: [90, 280],
    },
  },
  semar: {
    id: 'semar',
    name: 'Kyai Semar',
    javaneseName: 'ꦱꦼꦩꦂ',
    parts: SEMAR_PARTS,
    body: SEMAR_BODY,
    rest: {
      L: [-140, 200],
      R: [90, 260],
    },
  },
  petruk: {
    id: 'petruk',
    name: 'Petruk (Kantong Bolong)',
    javaneseName: 'ꦥꦺꦠꦿꦸꦏ꧀',
    parts: PETRUK_PARTS,
    body: PETRUK_BODY,
    rest: {
      L: [-160, 220],
      R: [100, 280],
    },
  },
  bagong: {
    id: 'bagong',
    name: 'Kyai Bagong (Bawor)',
    javaneseName: 'ꦧꦒꦺꦴꦁ',
    parts: BAGONG_PARTS,
    body: BAGONG_BODY,
    rest: {
      L: [-150, 220],
      R: [80, 270],
    },
  },
};

export interface ViewRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface RhythmInfo {
  db: number;
  pos: number;
  period: number;
}

export interface ArmSpec {
  type: 'rel' | 'abs';
  dx?: number;
  dy?: number;
  x?: number;
  y?: number;
  rodX?: number;
}

export interface PuppetInput {
  active: boolean;
  body?: { x: number; y: number };
  tilt?: number;
  depth?: number;
  arms?: { left?: ArmSpec; right?: ArmSpec };
  danceTrigger?: boolean;
  facing?: number;
}

export interface StickPoint {
  p: [number, number];
  w: number;
}

export interface RenderItemPart {
  kind: 'part';
  id: string;
  key: string;
  m: AffineMatrix;
  tilt: [number, number];
  alpha?: number;
}

export interface RenderItemStick {
  kind: 'stick';
  id: string;
  style: 'gapit' | 'rod';
  pts: StickPoint[];
  ties: [number, number][];
  alpha?: number;
}

export type RenderItem = RenderItemPart | RenderItemStick;

export class Arm {
  side: 'L' | 'R';
  char: CharacterConfig;
  upper: PartConfig;
  fore: PartConfig;
  hand: PartConfig;
  shoulder: [number, number];
  Lu: number;
  restU: number;
  Lf: number;
  restF: number;
  bend: number;
  rotU: Spring;
  rotF: Spring;
  rotH: Spring;
  target: Spring2 | null = null;
  rodX: Spring;
  rodInit: boolean = false;
  solution: { rotU: number; rotF: number } = { rotU: 0, rotF: 0 };
  initialized: boolean = false;

  constructor(side: 'L' | 'R', char: CharacterConfig = CHARACTERS.arjuna) {
    this.side = side;
    this.char = char;
    this.upper = char.parts['upper' + side] || PARTS['upper' + side];
    this.fore = char.parts['fore' + side] || PARTS['fore' + side];
    this.hand = char.parts['hand' + side] || PARTS['hand' + side];
    this.shoulder = char.body.shoulder[side] || BODY.shoulder[side];

    const u = sub(this.upper.dist!, this.upper.prox!);
    this.Lu = len(u);
    this.restU = ang(u);
    const f = add(sub(this.fore.dist!, this.fore.prox!), sub(this.hand.grip!, this.hand.prox!));
    this.Lf = len(f);
    this.restF = ang(f);
    this.bend = side === 'L' ? -1 : 1;

    this.rotU = new Spring(0, 260, 0.34);
    this.rotF = new Spring(0, 210, 0.26);
    this.rotH = new Spring(0, 110, 0.2);
    this.rodX = new Spring(0, 45, 0.75);
  }

  solve(T: [number, number]): { rotU: number; rotF: number } {
    const S = this.shoulder;
    const d = sub(T, S);
    const a = ang(d);
    const dist = clamp(len(d), Math.abs(this.Lu - this.Lf) + 40, this.Lu + this.Lf - 0.5);
    const cosA = clamp((this.Lu * this.Lu + dist * dist - this.Lf * this.Lf) / (2 * this.Lu * dist), -1, 1);
    const thU = a + this.bend * Math.acos(cosA);
    const elbow: [number, number] = [S[0] + this.Lu * Math.cos(thU), S[1] + this.Lu * Math.sin(thU)];
    const reach: [number, number] = [S[0] + dist * Math.cos(a), S[1] + dist * Math.sin(a)];
    const thF = ang(sub(reach, elbow));
    return { rotU: wrapAngle(thU - this.restU), rotF: wrapAngle(thF - this.restF) };
  }

  pose(B: AffineMatrix) {
    const upperM = Affine.chain(
      B,
      Affine.translate(...this.shoulder),
      Affine.rotate(this.rotU.x),
      Affine.translate(-this.upper.prox![0], -this.upper.prox![1])
    );
    const elbow = add(this.shoulder, rotV(sub(this.upper.dist!, this.upper.prox!), this.rotU.x));
    const foreM = Affine.chain(
      B,
      Affine.translate(...elbow),
      Affine.rotate(this.rotF.x),
      Affine.translate(-this.fore.prox![0], -this.fore.prox![1])
    );
    const wrist = add(elbow, rotV(sub(this.fore.dist!, this.fore.prox!), this.rotF.x));
    const handM = Affine.chain(
      B,
      Affine.translate(...wrist),
      Affine.rotate(this.rotH.x),
      Affine.translate(-this.hand.prox![0], -this.hand.prox![1])
    );
    const gripLocal = add(wrist, rotV(sub(this.hand.grip!, this.hand.prox!), this.rotH.x));
    return { upperM, foreM, handM, grip: Affine.apply(B, ...gripLocal) };
  }
}

export interface ActiveDanceState {
  b: number;
  start: number;
  k: number;
  turned: Set<number>;
}

export class Puppet {
  char: CharacterConfig;
  charId: string;
  baseScale: number = 0.53;
  scale: number = 0.53;
  home: [number, number];
  pos: Spring2;
  bodyTarget: [number, number];
  tilt: Spring;
  depth: Spring;
  facing: number;
  flip: { from: number; to: number; t: number };
  flipX: number;
  facingMode: 'manual' | 'walk' | 'target' = 'manual';
  faceTargetX: number | null = null;
  turnTimer: number = 0;
  walkPhase: number = 0;
  arms: { L: Arm; R: Arm };
  B: AffineMatrix;
  surfaceTilt: [number, number] = [0, 0];
  prevVel: [number, number] = [0, 0];
  dance: ActiveDanceState | null = null;
  danceStarted: boolean = false;
  danceOffset: [number, number] = [0, 0];
  danceTilt: number = 0;
  dSpring: { x: Spring; y: Spring; tilt: Spring };
  time: number = 0;
  lastBodyXY: [number, number] | null = null;
  lastBodyV: [number, number] = [0, 0];
  lastRot: number = 0;
  lastRotV: number = 0;
  prevFrame: Map<string, RenderItem> = new Map();

  constructor({
    x = 960,
    y = 650,
    facing = 1,
    character = 'arjuna',
  }: {
    x?: number;
    y?: number;
    facing?: number;
    character?: string | CharacterConfig;
  } = {}) {
    const charConfig =
      typeof character === 'string'
        ? CHARACTERS[character] || CHARACTERS.arjuna
        : character || CHARACTERS.arjuna;
    this.char = charConfig;
    this.charId = charConfig.id;
    this.home = [x, y];
    this.pos = new Spring2(x, y, 240, 0.62);
    this.bodyTarget = [x, y];
    this.tilt = new Spring(0, 60, 0.45);
    this.depth = new Spring(0, 28, 1.0);
    this.facing = facing;
    this.flip = { from: facing, to: facing, t: 1 };
    this.flipX = facing;
    this.arms = { L: new Arm('L', charConfig), R: new Arm('R', charConfig) };
    this.B = Affine.identity();
    this.dSpring = { x: new Spring(0, 620, 0.32), y: new Spring(0, 620, 0.3), tilt: new Spring(0, 520, 0.3) };
  }

  setCharacter(character: string | CharacterConfig) {
    const charConfig =
      typeof character === 'string'
        ? CHARACTERS[character] || CHARACTERS.arjuna
        : character || CHARACTERS.arjuna;
    this.char = charConfig;
    this.charId = charConfig.id;
    this.arms = { L: new Arm('L', charConfig), R: new Arm('R', charConfig) };
  }

  get dancing(): boolean {
    return this.dance !== null;
  }

  startDance(rhythm?: RhythmInfo) {
    const period = rhythm?.period ?? DEFAULT_BEAT;
    const k = period < 0.5 ? 2 : 1;
    const pos = (rhythm?.pos ?? 0) / k;
    let lead = Math.ceil(pos) - pos;
    if (lead < 0.45) lead += 1;
    this.dance = { b: -lead, start: -lead, k, turned: new Set() };
    this.danceStarted = true;
    for (const s of Object.values(this.dSpring)) s.snap(0);
  }

  turn() {
    if (this.flip.t < 1) return;
    this.flip = { from: this.facing, to: -this.facing, t: 0 };
    this.facing = -this.facing;
  }

  bodyMatrix(bob: number): AffineMatrix {
    return Affine.chain(
      Affine.translate(this.pos.x + this.danceOffset[0], this.pos.y + bob + this.danceOffset[1]),
      Affine.rotate(this.tilt.x + this.danceTilt),
      Affine.scale(this.scale * this.flipX, this.scale),
      Affine.translate(-this.char.body.anchor[0], -this.char.body.anchor[1])
    );
  }

  update(dt: number, input: PuppetInput, view: ViewRect, rhythm?: RhythmInfo) {
    if (input.danceTrigger && !this.dance) this.startDance(rhythm);
    let D: DancePose | null = null;
    let w = 0;
    if (this.dance) {
      const d = this.dance;
      d.b += (rhythm?.db ?? dt / DEFAULT_BEAT) / d.k;
      for (const tb of TURN_BEATS) {
        if (!d.turned.has(tb) && d.b >= tb) {
          d.turned.add(tb);
          this.turn();
        }
      }
      if (d.b >= KIPRAH_BEATS) {
        this.dance = null;
      } else {
        D = kiprahPose(d.b);
        w = danceWeight(d.b, d.start);
      }
    }
    const fwd = -this.facing;
    const kS = this.scale / this.baseScale;
    this.time += dt;

    const ds = this.dSpring;
    ds.x.step(D ? w * D.x : 0, dt);
    ds.y.step(D ? w * D.y : 0, dt);
    ds.tilt.step(D ? w * D.tilt : 0, dt);

    const getar = D ? w * (0.35 + 0.65 * (D.still ?? 0)) : 0;
    const t = this.time;
    const quiverY = getar * (1.6 * Math.sin(t * 2 * Math.PI * 10.5) + 0.9 * Math.sin(t * 2 * Math.PI * 6.3 + 1.7));
    const quiverT = getar * 0.009 * Math.sin(t * 2 * Math.PI * 8.1 + 0.4);
    this.danceOffset = [ds.x.x * fwd * kS, (ds.y.x + quiverY) * kS];
    this.danceTilt = (ds.tilt.x + quiverT) * fwd;

    if (input.body) {
      this.bodyTarget = [
        clamp(input.body.x, view.x + 40, view.x + view.w - 40),
        clamp(input.body.y, view.y + view.h * 0.12, view.y + view.h * 1.1),
      ];
    }
    this.pos.step(this.bodyTarget[0], this.bodyTarget[1], dt);
    const vx = this.pos.vx,
      vy = this.pos.vy;
    this.danceOffset[0] = clamp(this.danceOffset[0], view.x + 60 - this.pos.x, view.x + view.w - 60 - this.pos.x);

    const lean = clamp(-vx * 0.00018, -0.14, 0.14);
    this.tilt.stepAngle(clamp(((input.tilt ?? 0) + lean) * (1 - w), -0.5, 0.5), dt);
    this.depth.step(lerp(input.depth ?? 0, D ? D.depth : 0, w), dt);
    this.scale = this.baseScale * (1 + 0.14 * this.depth.x);

    const speed = Math.abs(vx);
    this.walkPhase += dt * speed * 0.017;
    const bob = -Math.abs(Math.sin(this.walkPhase)) * clamp(speed / 380, 0, 1) * 9;

    let wantTurn = false;
    if (this.dance) {
      // dance owns turning
    } else if (this.facingMode === 'walk') {
      wantTurn = speed > 240 && Math.sign(vx) === this.facing;
    } else if (this.facingMode === 'target' && this.faceTargetX !== null) {
      const dx = this.faceTargetX - this.pos.x;
      wantTurn = Math.abs(dx) > 60 && Math.sign(dx) === this.facing;
    }
    if (wantTurn) {
      this.turnTimer += dt;
      if (this.turnTimer > 0.2) this.turn();
    } else {
      this.turnTimer = 0;
    }
    if (this.flip.t < 1) {
      this.flip.t = Math.min(1, this.flip.t + dt / 0.42);
      this.flipX = this.flip.from * Math.cos(Math.PI * easeInOut(this.flip.t));
    } else {
      this.flipX = this.facing;
    }

    const ax = (vx - this.prevVel[0]) / Math.max(dt, 1e-3);
    this.prevVel = [vx, vy];
    this.surfaceTilt = [clamp(vx * 0.00035 + ax * 0.00002, -0.35, 0.35), clamp(vy * 0.0003, -0.25, 0.25)];

    this.B = this.bodyMatrix(bob);
    const B = this.B;
    const canSolve = Math.abs(this.flipX) > 0.25;
    const invB = canSolve ? Affine.invert(B) : null;

    const bodyXY: [number, number] = [this.pos.x + this.danceOffset[0], this.pos.y + bob + this.danceOffset[1]];
    const rot = this.tilt.x + this.danceTilt;
    let acc: [number, number] = [0, 0];
    let rotAcc = 0;
    if (this.lastBodyXY && dt > 0) {
      const v: [number, number] = [(bodyXY[0] - this.lastBodyXY[0]) / dt, (bodyXY[1] - this.lastBodyXY[1]) / dt];
      acc = [(v[0] - this.lastBodyV[0]) / dt, (v[1] - this.lastBodyV[1]) / dt];
      this.lastBodyV = v;
      const rv = (rot - this.lastRot) / dt;
      rotAcc = (rv - this.lastRotV) / dt;
      this.lastRotV = rv;
    }
    this.lastBodyXY = bodyXY;
    this.lastRot = rot;
    const mirror = Math.sign(this.flipX) || 1;
    const kick = (seg: [number, number], gain: number) => {
      const r = [B[0] * seg[0] + B[2] * seg[1], B[1] * seg[0] + B[3] * seg[1]];
      const r2 = r[0] * r[0] + r[1] * r[1] || 1;
      const alpha = clamp((r[0] * -acc[1] - r[1] * -acc[0]) / r2, -900, 900);
      return (alpha * mirror - rotAcc) * gain * dt;
    };
    const snappy = D !== null;

    const sL = Affine.apply(B, ...this.char.body.shoulder.L);
    const sR = Affine.apply(B, ...this.char.body.shoulder.R);
    const isLeft = sL[0] <= sR[0];
    const specs: Record<'L' | 'R', ArmSpec | undefined> = isLeft
      ? { L: input.arms?.left, R: input.arms?.right }
      : { R: input.arms?.left, L: input.arms?.right };

    for (const side of ['L', 'R'] as const) {
      const arm = this.arms[side];
      const shoulderW = side === 'L' ? sL : sR;
      const spec = specs[side];
      let tgt: [number, number];
      if (spec?.type === 'rel') {
        const g = (arm.Lu + arm.Lf) * this.scale * 0.82;
        tgt = [shoulderW[0] + (spec.dx ?? 0) * g, shoulderW[1] + (spec.dy ?? 0) * g];
      } else if (spec?.type === 'abs') {
        tgt = [spec.x ?? 0, spec.y ?? 0];
      } else {
        tgt = Affine.apply(B, ...add(arm.shoulder, this.char.rest[side] || REST[side]));
      }
      if (D) {
        const v = side === 'L' ? D.front : D.back;
        const g = (arm.Lu + arm.Lf) * this.scale * 0.82;
        const dtgt: [number, number] = [shoulderW[0] + fwd * v[0] * g, shoulderW[1] - v[1] * g];
        tgt = [lerp(tgt[0], dtgt[0], w), lerp(tgt[1], dtgt[1], w)];
      }

      if (!arm.initialized) {
        arm.target = new Spring2(tgt[0], tgt[1], 320, 0.5);
        arm.initialized = true;
      }
      for (const s of [arm.target!.sx, arm.target!.sy]) {
        s.k = snappy ? 560 : 320;
        s.zeta = snappy ? 0.3 : 0.5;
      }
      arm.target!.step(tgt[0], tgt[1], dt);

      if (canSolve && invB) {
        arm.solution = arm.solve(Affine.apply(invB, arm.target!.x, arm.target!.y));
      }
      arm.rotU.v += kick(rotV(sub(arm.upper.dist!, arm.upper.prox!), arm.rotU.x), 0.07);
      arm.rotF.v += kick(rotV([arm.Lf * Math.cos(arm.restF), arm.Lf * Math.sin(arm.restF)], arm.rotF.x), 0.1);
      arm.rotH.v += kick(rotV(sub(arm.hand.grip!, arm.hand.prox!), arm.rotH.x), 0.14);
      arm.rotU.stepAngle(arm.solution.rotU, dt);
      arm.rotF.stepAngle(arm.solution.rotF, dt);
      arm.rotH.stepAngle(arm.rotF.x, dt);

      rodLimit(arm.rotU, arm.solution.rotU, 0.7);
      rodLimit(arm.rotF, arm.solution.rotF, 0.9);
      rodLimit(arm.rotH, arm.rotF.x, 0.8);

      const restRod = arm.target!.x + (this.pos.x - arm.target!.x) * 0.3;
      const rodTarget = lerp(spec?.rodX ?? restRod, restRod, w);
      if (!arm.rodInit) {
        arm.rodX.snap(rodTarget);
        arm.rodInit = true;
      }
      arm.rodX.step(rodTarget, dt);
    }
  }

  frame(view: ViewRect): RenderItem[] {
    const B = this.B;
    const bottom = view.y + view.h + 90;
    const k = this.scale / this.baseScale;
    const poses = { L: this.arms.L.pose(B), R: this.arms.R.pose(B) };

    const tilt = this.surfaceTilt;
    const armItems = (side: 'L' | 'R'): RenderItemPart[] => [
      { kind: 'part', id: 'upper' + side, key: `${this.charId}_upper${side}`, m: poses[side].upperM, tilt },
      { kind: 'part', id: 'fore' + side, key: `${this.charId}_fore${side}`, m: poses[side].foreM, tilt },
      { kind: 'part', id: 'hand' + side, key: `${this.charId}_hand${side}`, m: poses[side].handM, tilt },
    ];

    const top = Affine.apply(B, ...this.char.body.stickTop);
    const foot = Affine.apply(B, ...this.char.body.stickFoot);
    const axis = sub(foot, top);
    const axisLen = len(axis);
    const dir: [number, number] = [axis[0] / axisLen, axis[1] / axisLen];
    const s = this.scale;
    const cap: [number, number] = [top[0] - dir[0] * 10 * s, top[1] - dir[1] * 10 * s];
    const handleStart: [number, number] = [foot[0] + dir[0] * 150 * s, foot[1] + dir[1] * 150 * s];
    const tEnd = dir[1] > 0.15 ? Math.max(0, (bottom - handleStart[1]) / dir[1]) : 1600;
    const end: [number, number] = [handleStart[0] + dir[0] * tEnd, handleStart[1] + dir[1] * tEnd];

    const gapit: RenderItemStick = {
      kind: 'stick',
      id: 'gapit',
      style: 'gapit',
      pts: [
        { p: cap, w: 2.5 * s },
        { p: top, w: 8 * s },
        { p: foot, w: 13 * s },
        { p: handleStart, w: 26 * s },
        { p: end, w: 30 * s },
      ],
      ties: this.char.body.ties.map((y) => [(y - this.char.body.stickTop[1] + 10) * s, 9 * s]),
    };

    const rods: RenderItemStick[] = (['L', 'R'] as const).map((side) => {
      const grip = poses[side].grip;
      const bx = this.arms[side].rodX.x;
      const ropeDir = sub([bx, bottom], grip);
      const L = len(ropeDir);
      const d: [number, number] = [ropeDir[0] / L, ropeDir[1] / L];
      return {
        kind: 'stick',
        id: 'rod' + side,
        style: 'rod',
        pts: [
          { p: [grip[0] - d[0] * 3 * k, grip[1] - d[1] * 3 * k], w: 1.6 * k },
          { p: [grip[0] + d[0] * 4 * k, grip[1] + d[1] * 4 * k], w: 3.4 * k },
          { p: [bx, bottom], w: 6.5 * k },
        ],
        ties: [[5 * k, 6 * k]],
      };
    });

    const back = this.flipX >= 0 ? 'R' : 'L';
    const front = back === 'R' ? 'L' : 'R';
    const items: RenderItem[] = [
      ...armItems(back),
      { kind: 'part', id: 'body', key: `${this.charId}_body`, m: B, tilt },
      gapit,
      ...armItems(front),
      ...rods,
    ];
    return this.withMotionBlur(items);
  }

  withMotionBlur(items: RenderItem[]): RenderItem[] {
    const out: RenderItem[] = [];
    const next = new Map<string, RenderItem>();
    for (const item of items) {
      next.set(item.id, item);
      const prev = this.prevFrame.get(item.id);
      if (prev) {
        const moved =
          item.kind === 'part' && prev.kind === 'part'
            ? partTravel(prev, item)
            : item.kind === 'stick' && prev.kind === 'stick'
            ? stickTravel(prev, item)
            : 0;
        if (moved > 8) {
          const strength = clamp((moved - 8) / 24, 0, 1);
          for (const [s, a] of [[0.33, 0.3], [0.66, 0.45]] as const) {
            if (item.kind === 'part' && prev.kind === 'part') {
              out.push({ ...lerpPart(prev, item, s), alpha: a * strength });
            } else if (item.kind === 'stick' && prev.kind === 'stick') {
              out.push({ ...lerpStick(prev, item, s), alpha: a * strength });
            }
          }
        }
      }
      out.push(item);
    }
    this.prevFrame = next;
    return out;
  }
}

function rodLimit(spring: Spring, target: number, maxDev: number) {
  const d = wrapAngle(spring.x - target);
  if (Math.abs(d) > maxDev) {
    spring.x = target + Math.sign(d) * maxDev;
    if (spring.v * Math.sign(d) > 0) spring.v *= -0.3;
  } else {
    spring.x = target + d;
  }
}

const PART_SIZE = (key: string): [number, number] => {
  if (PARTS[key]?.size) return PARTS[key].size;
  const match = key.match(/^([^_]+)_(.+)$/);
  if (match) {
    const [, charId, partKey] = match;
    return CHARACTERS[charId]?.parts[partKey]?.size ?? [100, 100];
  }
  return [100, 100];
};

function partTravel(a: RenderItemPart, b: RenderItemPart): number {
  const [w, h] = PART_SIZE(b.key);
  let max = 0;
  for (const [x, y] of [[0, 0], [w, 0], [0, h], [w, h]]) {
    const p = Affine.apply(a.m, x, y),
      q = Affine.apply(b.m, x, y);
    max = Math.max(max, Math.hypot(p[0] - q[0], p[1] - q[1]));
  }
  return max;
}

function stickTravel(a: RenderItemStick, b: RenderItemStick): number {
  const n = Math.min(a.pts.length, b.pts.length);
  let max = 0;
  for (let i = 0; i < Math.min(n, 3); i++) {
    max = Math.max(max, Math.hypot(a.pts[i].p[0] - b.pts[i].p[0], a.pts[i].p[1] - b.pts[i].p[1]));
  }
  return max;
}

const lerpPart = (a: RenderItemPart, b: RenderItemPart, s: number): RenderItemPart => ({
  ...b,
  m: b.m.map((v, i) => a.m[i] + (v - a.m[i]) * s) as AffineMatrix,
});

const lerpStick = (a: RenderItemStick, b: RenderItemStick, s: number): RenderItemStick => ({
  ...b,
  pts: b.pts.map((pt, i) => {
    const q = a.pts[i] ?? pt;
    return {
      p: [q.p[0] + (pt.p[0] - q.p[0]) * s, q.p[1] + (pt.p[1] - q.p[1]) * s],
      w: q.w + (pt.w - q.w) * s,
    };
  }),
});
