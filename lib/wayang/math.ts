export const clamp = (v: number, a: number, b: number): number =>
  Math.min(b, Math.max(a, v));

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export const smoothstep = (a: number, b: number, x: number): number => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

export function wrapAngle(a: number): number {
  let angle = a;
  while (angle > Math.PI) angle -= Math.PI * 2;
  while (angle < -Math.PI) angle += Math.PI * 2;
  return angle;
}

export type AffineMatrix = [number, number, number, number, number, number];

// 2D affine as [a, b, c, d, e, f]:  x' = a*x + c*y + e,  y' = b*x + d*y + f  (y points down)
export const Affine = {
  identity: (): AffineMatrix => [1, 0, 0, 1, 0, 0],
  translate: (x: number, y: number): AffineMatrix => [1, 0, 0, 1, x, y],
  rotate(t: number): AffineMatrix {
    const c = Math.cos(t),
      s = Math.sin(t);
    return [c, s, -s, c, 0, 0];
  },
  scale: (sx: number, sy = sx): AffineMatrix => [sx, 0, 0, sy, 0, 0],
  mul(m: AffineMatrix, n: AffineMatrix): AffineMatrix {
    return [
      m[0] * n[0] + m[2] * n[1],
      m[1] * n[0] + m[3] * n[1],
      m[0] * n[2] + m[2] * n[3],
      m[1] * n[2] + m[3] * n[3],
      m[0] * n[4] + m[2] * n[5] + m[4],
      m[1] * n[4] + m[3] * n[5] + m[5],
    ];
  },
  chain(...ms: AffineMatrix[]): AffineMatrix {
    return ms.reduce((acc, m) => Affine.mul(acc, m));
  },
  apply(m: AffineMatrix, x: number, y: number): [number, number] {
    return [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];
  },
  invert(m: AffineMatrix): AffineMatrix {
    const det = m[0] * m[3] - m[1] * m[2];
    const id = 1 / det;
    return [
      m[3] * id,
      -m[1] * id,
      -m[2] * id,
      m[0] * id,
      (m[2] * m[5] - m[3] * m[4]) * id,
      (m[1] * m[4] - m[0] * m[5]) * id,
    ];
  },
};

// Damped spring integrated with semi-implicit Euler. zeta < 1 overshoots (floppy), 1 is critical.
export class Spring {
  x: number;
  v: number;
  k: number;
  zeta: number;

  constructor(x = 0, k = 100, zeta = 1) {
    this.x = x;
    this.v = 0;
    this.k = k;
    this.zeta = zeta;
  }

  step(target: number, dt: number): number {
    const c = 2 * this.zeta * Math.sqrt(this.k);
    this.v += (this.k * (target - this.x) - c * this.v) * dt;
    this.x += this.v * dt;
    return this.x;
  }

  stepAngle(target: number, dt: number): number {
    const c = 2 * this.zeta * Math.sqrt(this.k);
    this.v += (this.k * wrapAngle(target - this.x) - c * this.v) * dt;
    this.x += this.v * dt;
    return this.x;
  }

  snap(x: number) {
    this.x = x;
    this.v = 0;
  }
}

export class Spring2 {
  sx: Spring;
  sy: Spring;

  constructor(x: number, y: number, k: number, zeta: number) {
    this.sx = new Spring(x, k, zeta);
    this.sy = new Spring(y, k, zeta);
  }

  get x(): number {
    return this.sx.x;
  }
  get y(): number {
    return this.sy.x;
  }
  get vx(): number {
    return this.sx.v;
  }
  get vy(): number {
    return this.sy.v;
  }

  step(tx: number, ty: number, dt: number) {
    this.sx.step(tx, dt);
    this.sy.step(ty, dt);
  }

  snap(x: number, y: number) {
    this.sx.snap(x);
    this.sy.snap(y);
  }
}

// One Euro filter (Casiez et al.) — kills jitter at rest, stays responsive in fast moves.
export class OneEuro {
  minCutoff: number;
  beta: number;
  dCutoff: number;
  x: number | null = null;
  dx: number = 0;

  constructor(minCutoff = 1.0, beta = 0.0, dCutoff = 1.0) {
    this.minCutoff = minCutoff;
    this.beta = beta;
    this.dCutoff = dCutoff;
    this.reset();
  }

  reset() {
    this.x = null;
    this.dx = 0;
  }

  static alpha(cutoff: number, dt: number): number {
    const tau = 1 / (2 * Math.PI * cutoff);
    return 1 / (1 + tau / dt);
  }

  filter(value: number, dt: number): number {
    if (this.x === null) {
      this.x = value;
      return value;
    }
    const d = (value - this.x) / dt;
    this.dx = lerp(this.dx, d, OneEuro.alpha(this.dCutoff, dt));
    const cutoff = this.minCutoff + this.beta * Math.abs(this.dx);
    this.x = lerp(this.x, value, OneEuro.alpha(cutoff, dt));
    return this.x;
  }
}

// Cheap smooth 1D value noise for flame flicker.
export function noise1(t: number): number {
  const i = Math.floor(t);
  const f = t - i;
  const h = (n: number) => {
    const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return s - Math.floor(s);
  };
  const u = f * f * (3 - 2 * f);
  return lerp(h(i), h(i + 1), u);
}
