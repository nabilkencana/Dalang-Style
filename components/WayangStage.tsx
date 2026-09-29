'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { Renderer, STAGE_W, STAGE_H, RenderFrame } from '@/lib/wayang/render';
import { Puppet, PARTS, ViewRect } from '@/lib/wayang/rig';
import { HandTracker } from '@/lib/wayang/tracking';
import { Controller, ControllerSettings } from '@/lib/wayang/controller';
import { BackgroundMusic, BeatClock } from '@/lib/wayang/audio';
import { clamp, noise1 } from '@/lib/wayang/math';

const HAND_EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [5, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [9, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  [13, 17],
  [17, 18],
  [18, 19],
  [19, 20],
  [0, 17],
];

interface WayangGlobal {
  puppets: Puppet[];
  controller: Controller;
  tracker: HandTracker;
  renderer: Renderer;
  music?: BackgroundMusic;
  beatClock?: BeatClock;
  drawCamera?: (ctx: CanvasRenderingContext2D, W: number, H: number) => void;
  cameraReady?: () => boolean;
  attachCameraWindow?: (win: Window | null) => void;
  cameraWindow?: () => Window | null;
  lastFrame?: RenderFrame;
}

declare global {
  interface Window {
    wayang?: WayangGlobal;
  }
}

export default function WayangStage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const previewRef = useRef<HTMLCanvasElement | null>(null);

  // UI state
  const [introGone, setIntroGone] = useState(false);
  const [introStatus, setIntroStatus] = useState<{ text: string; isError: boolean }>({
    text: '',
    isError: false,
  });
  const [cameraDisabled, setCameraDisabled] = useState(false);
  const [hudStatus, setHudStatus] = useState({ text: 'Demo', cls: '' });
  const [showSettings, setShowSettings] = useState(false);
  const [uiHidden, setUiHidden] = useState(false);
  const [toastText, setToastText] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [isPoppedOut, setIsPoppedOut] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [puppetSize, setPuppetSize] = useState(0.53);
  const [facingMode, setFacingMode] = useState<'target' | 'walk' | 'manual'>('target');
  const [errorMessage, setErrorMessage] = useState('');

  const [settings, setSettings] = useState<ControllerSettings>({
    characters: 'two',
    fingers: 'thumb-index',
    bodyHand: 'right',
  });

  // Mutable refs for state accessed inside animation frame loop
  const wayangRef = useRef<{
    renderer: Renderer | null;
    puppets: Puppet[];
    tracker: HandTracker | null;
    controller: Controller | null;
    music: BackgroundMusic | null;
    beatClock: BeatClock | null;
    view: ViewRect;
    facingMode: 'target' | 'walk' | 'manual';
    cameraWin: Window | null;
    showPreview: boolean;
    toastTimer: NodeJS.Timeout | number | null;
  }>({
    renderer: null,
    puppets: [],
    tracker: null,
    controller: null,
    music: null,
    beatClock: null,
    view: { x: 0, y: 0, w: STAGE_W, h: STAGE_H },
    facingMode: 'target',
    cameraWin: null,
    showPreview: true,
    toastTimer: null,
  });

  const showToast = useCallback((text: string) => {
    setToastText(text);
    setToastVisible(true);
    clearTimeout(wayangRef.current.toastTimer as NodeJS.Timeout);
    wayangRef.current.toastTimer = setTimeout(() => {
      setToastVisible(false);
    }, 2600);
  }, []);

  const applyFacing = useCallback((mode: 'target' | 'walk' | 'manual') => {
    const { puppets } = wayangRef.current;
    if (!puppets.length) return;
    for (const p of puppets) {
      p.facingMode = mode;
      if (mode === 'target') {
        p.facing = p.home[0] < STAGE_W / 2 ? -1 : 1;
        p.flip = { from: p.facing, to: p.facing, t: 1 };
        p.flipX = p.facing;
      }
    }
  }, []);

  const turnPuppet = useCallback((i: number) => {
    const { controller, puppets } = wayangRef.current;
    if (!controller || i >= controller.puppetCount || !puppets[i]) return;
    if (wayangRef.current.facingMode !== 'manual') {
      wayangRef.current.facingMode = 'manual';
      setFacingMode('manual');
      applyFacing('manual');
    }
    puppets[i].turn();
  }, [applyFacing]);

  const toggleCameraWindow = useCallback(() => {
    const { cameraWin, tracker } = wayangRef.current;
    const isClosed = !cameraWin || cameraWin.closed;
    if (!isClosed) {
      cameraWin.close();
      wayangRef.current.cameraWin = null;
      setIsPoppedOut(false);
    } else {
      const w = Math.round(Math.min(960, window.screen.availWidth * 0.6));
      const aspect = tracker?.aspect || 16 / 9;
      const newWin = window.open(
        '/camera',
        'wayang-camera',
        `popup,width=${w},height=${Math.round(w / aspect)}`
      );
      if (!newWin) {
        showToast('Pop-up blocked. Allow pop-ups for this site to open the camera window.');
      } else {
        wayangRef.current.cameraWin = newWin;
        setIsPoppedOut(true);
      }
    }
  }, [showToast]);

  const toggleMusic = useCallback(() => {
    const { music } = wayangRef.current;
    if (!music) return;
    const nextMuted = !music.muted;
    music.setMuted(nextMuted);
    if (!nextMuted) music.start();
    setIsMuted(nextMuted);
  }, []);

  // Main lifecycle effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const preview = previewRef.current;
    if (!canvas || !video || !preview) return;

    let destroyed = false;
    let animId: number = 0;

    let renderer: Renderer;
    try {
      renderer = new Renderer(canvas);
      wayangRef.current.renderer = renderer;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(msg);
      return;
    }

    const puppets = [
      new Puppet({ x: 640, facing: -1 }),
      new Puppet({ x: 1280, facing: 1 }),
    ];
    const tracker = new HandTracker(video);
    const controller = new Controller(tracker);
    const music = new BackgroundMusic('assets/backsound.mp3');
    const beatClock = new BeatClock(music.el);
    beatClock.load('assets/backsound-beats.json').catch(() => {});

    wayangRef.current.puppets = puppets;
    wayangRef.current.tracker = tracker;
    wayangRef.current.controller = controller;
    wayangRef.current.music = music;
    wayangRef.current.beatClock = beatClock;

    applyFacing('target');

    // Load textures
    Promise.all([
      renderer.loadTexture('background', 'assets/background.png'),
      ...Object.entries(PARTS).map(([key, part]) => renderer.loadTexture(key, part.src)),
    ]).catch((err) => {
      console.error('Failed to load textures:', err);
    });

    const pctx = preview.getContext('2d');

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.resize(Math.round(w * dpr), Math.round(h * dpr));
      const s = Math.max(w / STAGE_W, h / STAGE_H);
      wayangRef.current.view = {
        w: w / s,
        h: h / s,
        x: (STAGE_W - w / s) / 2,
        y: (STAGE_H - h / s) / 2,
      };
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const drawCamera = (ctx: CanvasRenderingContext2D, W: number, H: number) => {
      const s = Math.max(1, W / 480);
      ctx.save();
      ctx.translate(W, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, W, H);
      ctx.restore();
      ctx.fillStyle = 'rgba(20,10,4,0.35)';
      ctx.fillRect(0, 0, W, H);

      controller.slots.forEach((slot, i) => {
        if (!slot.active || !slot.landmarks) return;
        const P = slot.landmarks.map((l) => [(1 - l.x) * W, l.y * H]);
        const isBody = controller.puppetCount === 2 ? true : i === controller.bodySlot;
        const gold = controller.puppetCount === 2 ? slot.role !== 1 : isBody;

        ctx.strokeStyle = gold ? 'rgba(242,199,107,0.9)' : 'rgba(150,210,255,0.9)';
        ctx.lineWidth = 1.5 * s;
        ctx.beginPath();
        for (const [a, b] of HAND_EDGES) {
          ctx.moveTo(P[a][0], P[a][1]);
          ctx.lineTo(P[b][0], P[b][1]);
        }
        ctx.stroke();

        const pairKey = controller.settings.fingers;
        const pair = pairKey === 'thumb-pinky' ? [4, 20] : pairKey === 'index-pinky' ? [8, 20] : [4, 8];
        ctx.fillStyle = '#ff6b4a';
        for (const t of pair) {
          ctx.beginPath();
          ctx.arc(P[t][0], P[t][1], 4 * s, 0, Math.PI * 2);
          ctx.fill();
        }

        if (slot.pinky) {
          ctx.strokeStyle = '#ffe28a';
          ctx.lineWidth = 2.5 * s;
          ctx.beginPath();
          ctx.arc(P[20][0], P[20][1], 8 * s, 0, Math.PI * 2);
          ctx.stroke();
        }

        if (isBody) {
          const c = [0, 5, 9, 13, 17].reduce(
            (acc, j) => [acc[0] + P[j][0] / 5, acc[1] + P[j][1] / 5],
            [0, 0]
          );
          ctx.strokeStyle = gold ? '#f2c76b' : '#96d2ff';
          ctx.lineWidth = 2 * s;
          ctx.beginPath();
          ctx.arc(c[0], c[1], 9 * s, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
    };

    const cameraReady = () => controller.source === 'camera' && video.readyState >= 2;

    window.wayang = {
      puppets,
      controller,
      tracker,
      renderer,
      music,
      beatClock,
      drawCamera,
      cameraReady,
      attachCameraWindow(win) {
        wayangRef.current.cameraWin = win;
        setIsPoppedOut(!!win && !win.closed);
      },
      cameraWindow: () => wayangRef.current.cameraWin,
    };

    // User interaction starts background sound
    const handleFirstGesture = (e: MouseEvent | KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest?.('.sound-btn') || ('key' in e && e.key?.toLowerCase() === 'm')) return;
      music.start().then(() => {
        if (music.started) {
          window.removeEventListener('pointerdown', handleFirstGesture, true);
          window.removeEventListener('keydown', handleFirstGesture, true);
        }
      });
    };
    window.addEventListener('pointerdown', handleFirstGesture, true);
    window.addEventListener('keydown', handleFirstGesture, true);

    // Pointer events for mouse control
    const onPointerMove = (e: PointerEvent) => {
      const v = wayangRef.current.view;
      controller.mouse.x = v.x + (e.clientX / window.innerWidth) * v.w;
      controller.mouse.y = v.y + (e.clientY / window.innerHeight) * v.h;
      controller.mouse.seen = true;
    };
    const onWheel = (e: WheelEvent) => {
      controller.mouse.depth = clamp(controller.mouse.depth - e.deltaY * 0.0015, -0.3, 1);
      e.preventDefault();
    };

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    // Keyboard controls
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;
      const k = e.key.toLowerCase();
      if (k === 'f') turnPuppet(0);
      else if (k === 'g') turnPuppet(1);
      else if (k === 'h') setUiHidden((prev) => !prev);
      else if (k === 'm') toggleMusic();
      else if (k === 'd') controller.requestDance();
      else if (k === 'c') controller.recalibrate();
      else if (k === 'p') toggleCameraWindow();
      else if (k === 'v') setShowPreview((prev) => !prev);
    };
    window.addEventListener('keydown', onKeyDown);

    // Main animation loop
    let last = performance.now() / 1000;
    const PHYS_DT = 1 / 120;
    let lastHudText = '';

    const tick = (nowMs: number) => {
      if (destroyed) return;
      const t = nowMs / 1000;
      const dt = clamp(t - last, 0, 1 / 15);
      last = t;

      const currentView = wayangRef.current.view;
      const inputs = controller.update(t, currentView);
      const active = puppets.slice(0, controller.puppetCount);

      if (active.length === 2) {
        active[0].faceTargetX = active[1].pos.x;
        active[1].faceTargetX = active[0].pos.x;
      }

      const beat = beatClock.tick(dt);
      const steps = Math.max(1, Math.ceil(dt / PHYS_DT));
      const rhythm = { db: beat.db / steps, pos: beat.pos, period: beat.period };

      for (let i = 0; i < steps; i++) {
        active.forEach((p, j) =>
          p.update(
            dt / steps,
            i === 0
              ? inputs[j] ?? { active: false }
              : { ...(inputs[j] ?? { active: false }), danceTrigger: false },
            currentView,
            rhythm
          )
        );
      }

      active.forEach((p, j) => {
        if (p.danceStarted) {
          p.danceStarted = false;
          showToast(active.length === 2 ? `${j === 0 ? 'Left' : 'Right'} puppet · Kiprahan` : 'Kiprahan');
        }
      });

      const layers = active
        .map((p) => {
          const depth = Math.max(0, p.depth.x);
          return {
            depth: p.depth.x,
            items: p.frame(currentView),
            shadow: {
              scale: 1.03 + 0.2 * depth,
              dy: 8 + 34 * depth,
              blur: 3 + 30 * clamp(p.depth.x + 0.08, 0, 1.2),
              strength: 0.8 - 0.22 * clamp(depth, 0, 1),
            },
          };
        })
        .sort((a, b) => a.depth - b.depth);

      const flicker =
        1 + 0.03 * Math.sin(t * 7.3) + 0.02 * Math.sin(t * 13.7 + 1.1) + (noise1(t * 6.5) - 0.5) * 0.07;
      const sway = (noise1(t * 1.2 + 10) - 0.5) * 26;

      const frame: RenderFrame = {
        view: currentView,
        layers,
        time: t,
        lamp: [STAGE_W / 2 + sway, -560, 1300],
        eye: [STAGE_W / 2, STAGE_H * 0.55, 2300],
        lampColor: [1.0, 0.8, 0.56],
        intensity: 1.08 * flicker,
        flicker,
        hot: [STAGE_W / 2 + sway * 0.7, 440],
      };

      renderer.render(frame);

      // Draw camera preview
      const popped = !!wayangRef.current.cameraWin && !wayangRef.current.cameraWin.closed;
      if (!popped && wayangRef.current.showPreview && cameraReady() && pctx) {
        drawCamera(pctx, preview.width, preview.height);
      }

      // Update HUD
      const { source, status } = controller;
      let text = '';
      let cls = '';
      if (source === 'camera') {
        if (status.hands === 0) {
          text = controller.puppetCount === 2 ? 'Camera on · raise both hands' : 'Camera on · show your hand';
          cls = 'warn';
        } else {
          text =
            status.mode === 'two puppets'
              ? status.hands === 2
                ? 'Two puppets · one per hand'
                : 'Two puppets · 1 hand seen'
              : status.mode === 'two hands'
              ? 'One puppet · gapit + tuding'
              : status.mode === 'one hand'
              ? 'One puppet · palm + fingers'
              : status.mode;
          if (status.calibrating) text += ' · calibrating depth';
          cls = 'live';
        }
      } else if (source === 'mouse') {
        text = 'Mouse · scroll for depth';
      } else {
        text = 'Demo';
      }

      if (text !== lastHudText) {
        lastHudText = text;
        setHudStatus({ text, cls });
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      destroyed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointerdown', handleFirstGesture, true);
      window.removeEventListener('keydown', handleFirstGesture, true);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('wheel', onWheel);

      tracker.stop();
      music.destroy();
      renderer.destroy();
    };
  }, [applyFacing, showToast, toggleCameraWindow, toggleMusic, turnPuppet]);

  // Keep ref sync with showPreview
  useEffect(() => {
    wayangRef.current.showPreview = showPreview;
  }, [showPreview]);

  // Start Camera handler
  const handleStartCamera = async () => {
    setCameraDisabled(true);
    setIntroStatus({ text: 'Starting camera…', isError: false });
    const tracker = wayangRef.current.tracker;
    const controller = wayangRef.current.controller;
    const preview = previewRef.current;
    if (!tracker || !controller) return;

    try {
      await tracker.start((msg) => setIntroStatus({ text: msg, isError: false }));
      controller.source = 'camera';
      controller.recalibrate();
      setIntroStatus({ text: '', isError: false });
      setIntroGone(true);
      if (preview) {
        preview.height = Math.round(preview.width / tracker.aspect);
      }
    } catch (err: unknown) {
      console.error(err);
      const isAllowedError = (err as { name?: string })?.name === 'NotAllowedError';
      const msg = isAllowedError
        ? 'Camera permission was blocked. Allow it in the address bar, or play with the mouse.'
        : `Camera unavailable (${(err as Error)?.message || err}). You can still play with the mouse.`;
      setIntroStatus({ text: msg, isError: true });
      setCameraDisabled(false);
    }
  };

  const handleUseMouse = () => {
    if (wayangRef.current.controller) {
      wayangRef.current.controller.source = 'mouse';
    }
    setIntroGone(true);
  };

  const handleCharactersChange = (val: 'two' | 'one') => {
    setSettings((prev) => ({ ...prev, characters: val }));
    if (wayangRef.current.controller) {
      wayangRef.current.controller.settings.characters = val;
    }
    applyFacing(facingMode);
  };

  const handleFingersChange = (val: 'thumb-index' | 'thumb-pinky' | 'index-pinky') => {
    setSettings((prev) => ({ ...prev, fingers: val }));
    if (wayangRef.current.controller) {
      wayangRef.current.controller.settings.fingers = val;
    }
  };

  const handleBodyHandChange = (val: 'right' | 'left') => {
    setSettings((prev) => ({ ...prev, bodyHand: val }));
    if (wayangRef.current.controller) {
      wayangRef.current.controller.settings.bodyHand = val;
    }
  };

  const handleFacingChange = (val: 'target' | 'walk' | 'manual') => {
    setFacingMode(val);
    wayangRef.current.facingMode = val;
    applyFacing(val);
  };

  const handleSizeChange = (val: number) => {
    setPuppetSize(val);
    for (const p of wayangRef.current.puppets) {
      p.baseScale = val;
    }
  };

  const handleVolumeChange = (val: number) => {
    setVolume(val);
    const music = wayangRef.current.music;
    if (music) {
      music.setVolume(val);
      if (music.muted && val > 0) {
        music.setMuted(false);
        setIsMuted(false);
      }
    }
  };

  const previewBoxHidden =
    !showPreview || wayangRef.current.controller?.source !== 'camera' || isPoppedOut;

  return (
    <div className={uiHidden ? 'ui-hidden' : ''}>
      <canvas id="stage" ref={canvasRef} aria-label="Wayang kulit stage" />
      <video id="video" ref={videoRef} playsInline muted style={{ display: 'none' }} />

      {/* Intro Overlay */}
      <section id="intro" className={`panel intro ${introGone ? 'gone' : ''}`}>
        <p className="eyebrow">Wayang Kulit</p>
        <h1 className="wayang-title">
          Two puppets,
          <br />
          one in each hand
        </h1>
        <p className="lede">
          Play two leather shadow puppets on the lamp-lit kelir. Your webcam tracks both hands, just as a dalang holds the sticks.
        </p>
        <ul className="howto">
          <li>
            <span className="k">Left &amp; right hand</span>
            <span>Each hand holds one character: the left hand plays the left puppet, the right hand the right one.</span>
          </li>
          <li>
            <span className="k">Palm</span>
            <span>The body stick (gapit). The puppet follows it.</span>
          </li>
          <li>
            <span className="k">Thumb &amp; index</span>
            <span>That puppet&apos;s two arm rods (tuding). Spread, raise or pinch them.</span>
          </li>
          <li>
            <span className="k">Tilt hand</span>
            <span>The puppet leans with you.</span>
          </li>
          <li>
            <span className="k">Closer to camera</span>
            <span>Lifts that puppet off the screen, so its shadow grows and softens.</span>
          </li>
          <li>
            <span className="k">Little finger</span>
            <span>Show only your pinky: that puppet performs its kiprahan, a signature dance on the gamelan beat.</span>
          </li>
        </ul>
        <div className="actions">
          <button
            id="start-camera"
            className="btn primary"
            disabled={cameraDisabled}
            onClick={handleStartCamera}
          >
            Start camera
          </button>
          <button id="use-mouse" className="btn" onClick={handleUseMouse}>
            Use mouse
          </button>
        </div>
        <p
          id="intro-status"
          className={`status-line ${introStatus.isError ? 'err' : ''}`}
          role="status"
        >
          {introStatus.text}
        </p>
      </section>

      {/* HUD status pill & keys */}
      <div id="hud" className="hud">
        <div className={`pill ${hudStatus.cls}`} id="status">
          <span className="dot" />
          <span id="status-text">{hudStatus.text}</span>
        </div>
        <p className="keys">
          <kbd>D</kbd> dance <kbd>F</kbd>
          <kbd>G</kbd> turn left / right puppet <kbd>H</kbd> hide <kbd>C</kbd> recalibrate depth{' '}
          <kbd>V</kbd> camera <kbd>P</kbd> pop out camera <kbd>M</kbd> music
        </p>
      </div>
      {/* Home Button */}
      <Link
        href="/"
        className="icon-btn"
        style={{ right: '108px' }}
        aria-label="Kembali ke Beranda"
        title="Kembali ke Beranda"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </Link>

      {/* Sound Toggle */}
      <button
        id="sound-toggle"
        className="icon-btn sound-btn"
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        aria-pressed={isMuted}
        onClick={toggleMusic}
      >
        <svg className="on" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            fill="currentColor"
            d="M4 9v6h4l5 4V5L8 9H4Zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4Zm-2.5-8.8v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6Z"
          />
        </svg>
        <svg className="off" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            fill="currentColor"
            d="M4 9v6h4l5 4V5L8 9H4Zm12.6 3 2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4-2.7-2.7Z"
            transform="translate(2 0)"
          />
        </svg>
      </button>

      {/* Settings Toggle */}
      <button
        id="settings-toggle"
        className="icon-btn"
        aria-label="Settings"
        aria-expanded={showSettings}
        onClick={() => setShowSettings((prev) => !prev)}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            fill="currentColor"
            d="M19.4 13a7.6 7.6 0 0 0 0-2l2.1-1.6-2-3.5-2.5 1a7.3 7.3 0 0 0-1.7-1L15 3h-4l-.4 2.7a7.3 7.3 0 0 0-1.7 1l-2.5-1-2 3.5L6.6 11a7.6 7.6 0 0 0 0 2l-2.1 1.6 2 3.5 2.5-1a7.3 7.3 0 0 0 1.7 1L11 21h4l.4-2.7a7.3 7.3 0 0 0 1.7-1l2.5 1 2-3.5ZM13 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"
            transform="translate(-1 0)"
          />
        </svg>
      </button>

      {/* Settings Panel */}
      <aside id="settings" className="panel settings" hidden={!showSettings}>
        <h2>Settings</h2>
        <Link
          href="/"
          className="btn small"
          style={{ textAlign: 'center', display: 'block', textDecoration: 'none' }}
        >
          Kembali ke Beranda
        </Link>
        <label>
          Characters
          <select
            id="opt-characters"
            value={settings.characters}
            onChange={(e) => handleCharactersChange(e.target.value as 'two' | 'one')}
          >
            <option value="two">Two puppets, one per hand</option>
            <option value="one">One puppet</option>
          </select>
        </label>
        <label>
          Arm-rod fingers
          <select
            id="opt-fingers"
            value={settings.fingers}
            onChange={(e) =>
              handleFingersChange(e.target.value as 'thumb-index' | 'thumb-pinky' | 'index-pinky')
            }
          >
            <option value="thumb-index">Thumb + index</option>
            <option value="thumb-pinky">Thumb + pinky (arms spread wider)</option>
            <option value="index-pinky">Index + pinky</option>
          </select>
        </label>
        {settings.characters === 'one' && (
          <label id="bodyhand-row">
            Body hand (one puppet, two hands)
            <select
              id="opt-bodyhand"
              value={settings.bodyHand}
              onChange={(e) => handleBodyHandChange(e.target.value as 'right' | 'left')}
            >
              <option value="right">Right hand holds the gapit</option>
              <option value="left">Left hand holds the gapit</option>
            </select>
          </label>
        )}
        <label>
          Facing
          <select
            id="opt-facing"
            value={facingMode}
            onChange={(e) => handleFacingChange(e.target.value as 'target' | 'walk' | 'manual')}
          >
            <option value="target">Face each other</option>
            <option value="walk">Face the way they walk</option>
            <option value="manual">Manual (F / G to turn)</option>
          </select>
        </label>
        <label className="row">
          <input
            type="checkbox"
            id="opt-camera"
            checked={showPreview}
            onChange={(e) => setShowPreview(e.target.checked)}
          />{' '}
          Show camera preview
        </label>
        <button
          id="opt-popout"
          className="btn small"
          type="button"
          onClick={toggleCameraWindow}
        >
          {isPoppedOut ? 'Bring camera back' : 'Open camera in new window'}
        </button>
        <label>
          Puppet size
          <input
            type="range"
            id="opt-size"
            min="0.36"
            max="0.72"
            step="0.01"
            value={puppetSize}
            onChange={(e) => handleSizeChange(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Music volume
          <input
            type="range"
            id="opt-volume"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          />
        </label>
      </aside>

      {/* Preview Box */}
      <div id="preview-box" hidden={previewBoxHidden}>
        <canvas id="preview" ref={previewRef} width={320} height={180} />
        <button
          id="preview-popout"
          className="popout-btn"
          type="button"
          aria-label="Open camera in a new window"
          title="Open in a new window (P)"
          onClick={toggleCameraWindow}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              fill="currentColor"
              d="M14 3h7v7h-2V6.4l-8.3 8.3-1.4-1.4L17.6 5H14V3ZM5 5h6v2H5v12h12v-6h2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
            />
          </svg>
        </button>
      </div>

      {/* Toast Notification */}
      <div id="toast" className={`toast ${toastVisible ? 'show' : ''}`} role="status" aria-live="polite">
        {toastText}
      </div>

      {/* Error Panel */}
      {errorMessage && (
        <div id="error" className="panel error">
          <p>
            <strong>Error:</strong> {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
}
