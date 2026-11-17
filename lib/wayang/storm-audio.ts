import { GamelanAudioEngine } from '@/lib/wayang/audio';

export type DewaRuciAudioMood =
  | 'nightmare'
  | 'path'
  | 'astina'
  | 'forest'
  | 'storm'
  | 'climax'
  | 'abyss'
  | 'cosmos'
  | 'dawn';

/**
 * Procedural Web Audio director for the 12-scene Dewa Ruci experience.
 * Crossfades ominous battlefield rumble, twilight wind, pendopo stillness,
 * forest drafts, raging surf & rain, underwater hush, and morning calm
 * alongside dynamic-tempo Slendro gamelan.
 */
export class StormSceneAudio {
  private gamelan: GamelanAudioEngine;
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oceanFilter: BiquadFilterNode | null = null;
  private oceanGain: GainNode | null = null;
  private rainGain: GainNode | null = null;
  private windFilter: BiquadFilterNode | null = null;
  private windGain: GainNode | null = null;
  private oceanSource: AudioBufferSourceNode | null = null;
  private rainSource: AudioBufferSourceNode | null = null;
  private windSource: AudioBufferSourceNode | null = null;
  private swellLfo: OscillatorNode | null = null;
  private isStarted = false;
  private muted = false;

  constructor() {
    this.gamelan = new GamelanAudioEngine();
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      this.gamelan.init();
      this.ctx = this.gamelan.ctx;
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private createNoiseBuffer(ctx: AudioContext, seconds = 4, brownian = true): AudioBuffer {
    const len = Math.floor(ctx.sampleRate * seconds);
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      if (brownian) {
        last = (last + 0.025 * white) / 1.025;
        data[i] = last * 3.2;
      } else {
        data[i] = white * 0.45;
      }
    }
    const fadeSamples = Math.floor(ctx.sampleRate * 0.2);
    for (let i = 0; i < fadeSamples; i++) {
      const t = i / fadeSamples;
      data[i] = data[i] * t + data[len - fadeSamples + i] * (1 - t);
    }
    return buffer;
  }

  startAtmosphere() {
    const ctx = this.ensureContext();
    if (!ctx || this.isStarted) return;
    this.isStarted = true;

    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(this.muted ? 0 : 0.78, now);
    master.connect(ctx.destination);
    this.masterGain = master;

    const oceanSrc = ctx.createBufferSource();
    oceanSrc.buffer = this.createNoiseBuffer(ctx, 5, true);
    oceanSrc.loop = true;

    const oceanFilter = ctx.createBiquadFilter();
    oceanFilter.type = 'lowpass';
    oceanFilter.frequency.setValueAtTime(180, now);

    const oceanGain = ctx.createGain();
    oceanGain.gain.setValueAtTime(0.04, now);

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.14, now);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(170, now);
    lfo.connect(lfoGain);
    lfoGain.connect(oceanFilter.frequency);

    oceanSrc.connect(oceanFilter);
    oceanFilter.connect(oceanGain);
    oceanGain.connect(master);
    oceanSrc.start(now);
    lfo.start(now);
    this.oceanSource = oceanSrc;
    this.oceanFilter = oceanFilter;
    this.oceanGain = oceanGain;
    this.swellLfo = lfo;

    const windSrc = ctx.createBufferSource();
    windSrc.buffer = this.createNoiseBuffer(ctx, 5, true);
    windSrc.loop = true;

    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.setValueAtTime(460, now);
    windFilter.Q.setValueAtTime(2.4, now);

    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.04, now);

    windSrc.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(master);
    windSrc.start(now);
    this.windSource = windSrc;
    this.windFilter = windFilter;
    this.windGain = windGain;

    const rainSrc = ctx.createBufferSource();
    rainSrc.buffer = this.createNoiseBuffer(ctx, 4, false);
    rainSrc.loop = true;

    const rainFilter = ctx.createBiquadFilter();
    rainFilter.type = 'bandpass';
    rainFilter.frequency.setValueAtTime(2400, now);
    rainFilter.Q.setValueAtTime(0.7, now);

    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0.0, now);

    rainSrc.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(master);
    rainSrc.start(now);
    this.rainSource = rainSrc;
    this.rainGain = rainGain;
  }

  setMood(mood: DewaRuciAudioMood) {
    const ctx = this.ensureContext();
    if (!ctx || !this.oceanGain || !this.rainGain || !this.windGain || !this.oceanFilter || !this.windFilter) {
      return;
    }
    const now = ctx.currentTime;

    switch (mood) {
      case 'nightmare':
        this.oceanFilter.frequency.setTargetAtTime(110, now, 0.8);
        this.oceanGain.gain.setTargetAtTime(0.18, now, 0.8);
        this.windGain.gain.setTargetAtTime(0.06, now, 0.8);
        this.rainGain.gain.setTargetAtTime(0.0, now, 0.6);
        this.gamelan.tempo = 68;
        break;
      case 'path':
        this.oceanGain.gain.setTargetAtTime(0.02, now, 0.8);
        this.windFilter.frequency.setTargetAtTime(420, now, 0.8);
        this.windGain.gain.setTargetAtTime(0.16, now, 0.8);
        this.rainGain.gain.setTargetAtTime(0.0, now, 0.6);
        this.gamelan.tempo = 78;
        break;
      case 'astina':
        this.oceanGain.gain.setTargetAtTime(0.015, now, 0.8);
        this.windGain.gain.setTargetAtTime(0.03, now, 0.8);
        this.rainGain.gain.setTargetAtTime(0.0, now, 0.6);
        this.gamelan.tempo = 76;
        break;
      case 'forest':
        this.oceanGain.gain.setTargetAtTime(0.08, now, 0.8);
        this.windFilter.frequency.setTargetAtTime(540, now, 1.0);
        this.windGain.gain.setTargetAtTime(0.28, now, 0.8);
        this.rainGain.gain.setTargetAtTime(0.015, now, 0.8);
        this.gamelan.tempo = 98;
        break;
      case 'storm':
        this.oceanFilter.frequency.setTargetAtTime(360, now, 0.8);
        this.oceanGain.gain.setTargetAtTime(0.42, now, 0.6);
        this.windGain.gain.setTargetAtTime(0.16, now, 0.6);
        this.rainGain.gain.setTargetAtTime(0.085, now, 0.6);
        this.gamelan.tempo = 108;
        break;
      case 'climax':
        this.oceanFilter.frequency.setTargetAtTime(430, now, 0.5);
        this.oceanGain.gain.setTargetAtTime(0.55, now, 0.4);
        this.windGain.gain.setTargetAtTime(0.18, now, 0.4);
        this.rainGain.gain.setTargetAtTime(0.11, now, 0.4);
        this.gamelan.tempo = 132;
        break;
      case 'abyss':
        this.oceanFilter.frequency.setTargetAtTime(160, now, 1.1);
        this.oceanGain.gain.setTargetAtTime(0.14, now, 1.1);
        this.windGain.gain.setTargetAtTime(0.02, now, 1.0);
        this.rainGain.gain.setTargetAtTime(0.0, now, 0.8);
        this.gamelan.tempo = 66;
        break;
      case 'cosmos':
        this.oceanGain.gain.setTargetAtTime(0.02, now, 1.2);
        this.windGain.gain.setTargetAtTime(0.03, now, 1.2);
        this.rainGain.gain.setTargetAtTime(0.0, now, 0.8);
        this.gamelan.tempo = 62;
        break;
      case 'dawn':
        this.oceanFilter.frequency.setTargetAtTime(220, now, 1.2);
        this.oceanGain.gain.setTargetAtTime(0.05, now, 1.2);
        this.windFilter.frequency.setTargetAtTime(380, now, 1.0);
        this.windGain.gain.setTargetAtTime(0.06, now, 1.0);
        this.rainGain.gain.setTargetAtTime(0.0, now, 0.8);
        this.gamelan.tempo = 70;
        break;
    }
  }

  startGamelan() {
    this.gamelan.startBGM();
  }

  stopGamelan() {
    this.gamelan.stopBGM();
  }

  playCempala() {
    this.gamelan.playCempala();
  }

  playSoftTick() {
    if (this.muted) return;
    this.gamelan.playGamelanNote(3, 0.35, 0.14);
  }

  playKenong() {
    this.gamelan.playKenong(392, 2.2);
  }

  playGong() {
    this.gamelan.playGong();
  }

  playBlessing() {
    if (this.muted) return;
    this.gamelan.playGamelanNote(1, 1.4, 0.22);
    setTimeout(() => this.gamelan.playGamelanNote(3, 1.5, 0.24), 110);
    setTimeout(() => this.gamelan.playGamelanNote(5, 1.8, 0.26), 230);
    setTimeout(() => this.gamelan.playKenong(523.25, 2.4), 360);
  }

  playSlash() {
    const ctx = this.ensureContext();
    if (!ctx || this.muted) return;
    const now = ctx.currentTime;

    const buf = this.createNoiseBuffer(ctx, 0.3, false);
    const src = ctx.createBufferSource();
    src.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2800, now);
    filter.frequency.exponentialRampToValueAtTime(420, now + 0.24);
    filter.Q.setValueAtTime(1.8, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.55, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start(now);
    src.stop(now + 0.28);

    this.gamelan.playGamelanNote(7, 0.65, 0.28);
  }

  playSplash() {
    const ctx = this.ensureContext();
    if (!ctx || this.muted) return;
    const now = ctx.currentTime;

    const buf = this.createNoiseBuffer(ctx, 1.1, true);
    const src = ctx.createBufferSource();
    src.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.95);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.6, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start(now);
    src.stop(now + 1.05);
  }

  playThunder() {
    const ctx = this.ensureContext();
    if (!ctx || this.muted) return;
    const now = ctx.currentTime;

    const buf = this.createNoiseBuffer(ctx, 1.8, true);
    const src = ctx.createBufferSource();
    src.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(260, now);
    filter.frequency.exponentialRampToValueAtTime(75, now + 1.6);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.62, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.7);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start(now);
    src.stop(now + 1.75);
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    this.gamelan.isMuted = muted;
    if (muted) {
      this.gamelan.stopBGM();
    } else if (this.isStarted) {
      this.gamelan.startBGM();
    }
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.78, this.ctx.currentTime, 0.15);
    }
  }

  dispose() {
    this.gamelan.stopBGM();
    try {
      this.oceanSource?.stop();
      this.rainSource?.stop();
      this.windSource?.stop();
      this.swellLfo?.stop();
    } catch {}
    this.oceanSource = null;
    this.rainSource = null;
    this.windSource = null;
    this.swellLfo = null;
    this.isStarted = false;
  }
}
