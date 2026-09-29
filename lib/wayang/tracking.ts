import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';

const MP_VERSION = '1.0.1';
const MP_BASE = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MP_VERSION}`;
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';
export interface Landmark {
  x: number;
  y: number;
  z: number;
}

export interface HandLandmarkerResult {
  landmarks: Landmark[][];
  worldLandmarks?: Landmark[][];
  handednesses?: unknown[];
}

export interface DetectionOutput {
  result: HandLandmarkerResult;
  ts: number;
}

interface HandLandmarkerInstance {
  detectForVideo: (video: HTMLVideoElement, timestamp: number) => HandLandmarkerResult;
  close?: () => void;
}

export class HandTracker {
  video: HTMLVideoElement;
  landmarker: HandLandmarkerInstance | null = null;
  ready: boolean = false;
  lastVideoTime: number = -1;
  lastTs: number = 0;
  delegate: 'GPU' | 'CPU' | null = null;
  stream: MediaStream | null = null;

  constructor(video: HTMLVideoElement) {
    this.video = video;
  }

  async start(onStatus: (msg: string) => void = () => {}) {
    onStatus('Requesting camera…');
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
        width: { ideal: 1280 },
        height: { ideal: 720 },
        frameRate: { ideal: 60 },
      },
      audio: false,
    });
    this.stream = stream;
    this.video.srcObject = stream;
    await this.video.play();

    onStatus('Loading hand-tracking model…');
    const fileset = await FilesetResolver.forVisionTasks(`${MP_BASE}/wasm`);
    const options = (delegate: 'GPU' | 'CPU') => ({
      baseOptions: { modelAssetPath: MODEL_URL, delegate },
      runningMode: 'VIDEO' as const,
      numHands: 2,
      minHandDetectionConfidence: 0.55,
      minHandPresenceConfidence: 0.55,
      minTrackingConfidence: 0.5,
    });

    try {
      this.landmarker = await HandLandmarker.createFromOptions(fileset, options('GPU'));
      this.delegate = 'GPU';
    } catch (err) {
      console.warn('GPU delegate unavailable, falling back to CPU', err);
      this.landmarker = await HandLandmarker.createFromOptions(fileset, options('CPU'));
      this.delegate = 'CPU';
    }
    this.ready = true;
  }

  stop() {
    this.ready = false;
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    if (this.video) {
      this.video.srcObject = null;
    }
    if (this.landmarker?.close) {
      try {
        this.landmarker.close();
      } catch {
        // ignore close errors
      }
      this.landmarker = null;
    }
  }

  get aspect(): number {
    return this.video.videoWidth / Math.max(1, this.video.videoHeight) || 16 / 9;
  }

  detect(): DetectionOutput | null {
    if (!this.ready || !this.landmarker || this.video.readyState < 2) return null;
    if (this.video.currentTime === this.lastVideoTime) return null;
    this.lastVideoTime = this.video.currentTime;
    const ts = Math.max(performance.now(), this.lastTs + 1);
    this.lastTs = ts;
    const result = this.landmarker.detectForVideo(this.video, ts);
    return { result, ts };
  }
}
