export interface LancaranBeat {
  note: number;
  saron: boolean;
  kempul: boolean;
  kenong: boolean;
  gong: boolean;
}

export class GamelanAudioEngine {
  ctx: AudioContext | null = null;
  isMuted: boolean = false;
  bgmPlaying: boolean = false;
  bgmInterval: NodeJS.Timeout | number | null = null;
  tempo: number = 110;
  step: number = 0;
  // Laras Slendro (Hz)
  slendro: Record<number, number> = {
    1: 261.63,
    2: 293.66,
    3: 329.63,
    5: 392.0,
    6: 440.0,
    7: 523.25,
  };

  // 16 Ketukan Lancaran
  lancaranMelody: LancaranBeat[] = [
    { note: 2, saron: true, kempul: false, kenong: false, gong: false },
    { note: 3, saron: true, kempul: false, kenong: false, gong: false },
    { note: 2, saron: true, kempul: false, kenong: false, gong: false },
    { note: 1, saron: true, kempul: false, kenong: true, gong: false },
    { note: 3, saron: true, kempul: false, kenong: false, gong: false },
    { note: 5, saron: true, kempul: true, kenong: false, gong: false },
    { note: 3, saron: true, kempul: false, kenong: false, gong: false },
    { note: 2, saron: true, kempul: false, kenong: true, gong: false },
    { note: 5, saron: true, kempul: false, kenong: false, gong: false },
    { note: 6, saron: true, kempul: true, kenong: false, gong: false },
    { note: 5, saron: true, kempul: false, kenong: false, gong: false },
    { note: 3, saron: true, kempul: false, kenong: true, gong: false },
    { note: 2, saron: true, kempul: false, kenong: false, gong: false },
    { note: 1, saron: true, kempul: true, kenong: false, gong: false },
    { note: 2, saron: true, kempul: false, kenong: false, gong: false },
    { note: 1, saron: true, kempul: false, kenong: true, gong: true },
  ];
  init() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playCempala() {
    this.init();
    if (this.isMuted || !this.ctx) return;
    const t = this.ctx.currentTime;

    // Transien ketukan kayu
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.05);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(1200, t);
    noiseFilter.Q.setValueAtTime(4.0, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.7, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noise.start(t);

    // Resonansi badan kotak
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(240, t);
    osc.frequency.exponentialRampToValueAtTime(70, t + 0.12);
    oscGain.gain.setValueAtTime(0.9, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.13);
  }

  playGamelanNote(noteKey: number, duration = 1.2, volume = 0.35) {
    this.init();
    if (this.isMuted || !this.ctx) return;
    const freq = this.slendro[noteKey] || 330;
    const t = this.ctx.currentTime;

    const carrier = this.ctx.createOscillator();
    const carrierGain = this.ctx.createGain();
    const modulator = this.ctx.createOscillator();
    const modGain = this.ctx.createGain();

    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(freq, t);
    modulator.type = 'triangle';
    modulator.frequency.setValueAtTime(freq * 2.76, t);

    modGain.gain.setValueAtTime(freq * 0.9, t);
    modGain.gain.exponentialRampToValueAtTime(1, t + duration * 0.4);
    modulator.connect(carrier.frequency);

    carrierGain.gain.setValueAtTime(0.001, t);
    carrierGain.gain.linearRampToValueAtTime(volume, t + 0.008);
    carrierGain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 4.5, t);

    carrier.connect(filter);
    filter.connect(carrierGain);
    carrierGain.connect(this.ctx.destination);

    carrier.start(t);
    modulator.start(t);
    carrier.stop(t + duration);
    modulator.stop(t + duration);
  }

  playKenong(freq = 440, duration = 2.0) {
    this.init();
    if (this.isMuted || !this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.4, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + duration);
  }

  playGong() {
    this.init();
    if (this.isMuted || !this.ctx) return;
    const t = this.ctx.currentTime;

    const sub = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(65, t);
    sub.frequency.linearRampToValueAtTime(58, t + 4.0);

    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(2.2, t);
    lfoGain.gain.setValueAtTime(4.0, t);
    lfo.connect(sub.frequency);

    subGain.gain.setValueAtTime(0.001, t);
    subGain.gain.linearRampToValueAtTime(0.8, t + 0.05);
    subGain.gain.exponentialRampToValueAtTime(0.0001, t + 5.5);

    sub.connect(subGain);
    subGain.connect(this.ctx.destination);
    lfo.start(t);
    sub.start(t);
    lfo.stop(t + 5.5);
    sub.stop(t + 5.5);
  }

  toggleBGM(): boolean {
    this.init();
    if (this.bgmPlaying) {
      this.stopBGM();
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }

  startBGM() {
    if (this.bgmPlaying) return;
    this.init();
    this.bgmPlaying = true;
    this.step = 0;

    const intervalMs = (60 / this.tempo) * 1000;
    this.bgmInterval = setInterval(() => {
      const beat = this.lancaranMelody[this.step];
      if (beat.saron) this.playGamelanNote(beat.note, 1.4, 0.25);
      if (beat.kempul) this.playKenong(330, 1.8);
      if (beat.kenong && !beat.gong) this.playKenong(440, 2.2);
      if (beat.gong) {
        this.playGong();
        this.playCempala();
      }
      this.step = (this.step + 1) % this.lancaranMelody.length;
    }, intervalMs);
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const gamelanAudio = typeof window !== 'undefined' ? new GamelanAudioEngine() : null;

export class BackgroundMusic {
  el: HTMLAudioElement | null = null;
  muted: boolean = false;
  started: boolean = false;
  volume: number = 0.6;
  synthFallback: GamelanAudioEngine | null = null;

  constructor(src: string) {
    if (typeof window !== 'undefined') {
      this.el = new Audio(src);
      this.el.loop = true;
      this.el.preload = 'auto';
      this.el.volume = 0.6;
      this.volume = this.el.volume;
      this.synthFallback = gamelanAudio;
    }
  }

  async start() {
    this.started = true;
    if (!this.el) return;
    try {
      await this.el.play();
    } catch {
      // Audio file might not exist or autoplay blocked; fall back to Web Audio Gamelan synthesizer
      this.synthFallback?.startBGM();
    }
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (this.el) {
      this.el.muted = muted;
    }
    if (this.synthFallback) {
      this.synthFallback.isMuted = muted;
    }
    if (muted) {
      this.synthFallback?.stopBGM();
    } else if (this.started) {
      if (this.el && !this.el.paused) {
        // audio element is playing
      } else {
        this.synthFallback?.startBGM();
      }
    }
  }

  setVolume(volume: number) {
    this.volume = volume;
    if (this.el) {
      this.el.volume = volume;
    }
  }

  destroy() {
    if (this.el) {
      this.el.pause();
      this.el.src = '';
    }
    this.synthFallback?.stopBGM();
  }
}

export interface BeatTick {
  db: number;
  pos: number;
  period: number;
}

export class BeatClock {
  audioEl: HTMLAudioElement | null;
  period: number;
  pos: number;
  beats: number[] | null;

  constructor(audioEl: HTMLAudioElement | null) {
    this.audioEl = audioEl;
    this.period = 60 / 110;
    this.pos = 0;
    this.beats = null;
  }

  async load(src: string) {
    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      this.beats = (await res.json()) as number[];
    } catch {
      this.beats = null;
    }
  }

  tick(dt: number): BeatTick {
    if (this.beats && this.beats.length > 1 && this.audioEl && this.audioEl.currentTime) {
      const t = this.audioEl.currentTime;
      let i = 0;
      while (i < this.beats.length - 1 && this.beats[i + 1] <= t) i++;
      const next = this.beats[Math.min(i + 1, this.beats.length - 1)];
      const cur = this.beats[i];
      this.period = Math.max(0.2, next - cur || this.period);
      this.pos = i + (t - cur) / this.period;
    } else {
      this.pos += dt / this.period;
    }
    return { db: dt / this.period, pos: this.pos, period: this.period };
  }
}
