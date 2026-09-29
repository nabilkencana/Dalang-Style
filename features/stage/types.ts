export interface TokohWayang {
  id: string;
  name: string;
  javaneseName: string;
  role: 'satria' | 'raksasa' | 'punokawan' | 'dewa';
  description: string;
  filosofi: string;
  facing: number;
}

export interface StagePerformanceMetrics {
  fps: number;
  handsDetected: number;
  audioActive: boolean;
  activeMotif?: string;
}

export type StageControlMode = 'camera' | 'mouse' | 'demo';
export type PuppetFacingMode = 'target' | 'walk' | 'manual';
