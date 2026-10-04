'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { Renderer, STAGE_W, STAGE_H, RenderFrame } from '@/lib/wayang/render';
import { Puppet, CHARACTERS, ViewRect, Arm, CharacterConfig } from '@/lib/wayang/rig';
import { HandTracker } from '@/lib/wayang/tracking';
import { Controller, ControllerSettings } from '@/lib/wayang/controller';
import { BackgroundMusic, BeatClock } from '@/lib/wayang/audio';
import { clamp, noise1, Affine, AffineMatrix } from '@/lib/wayang/math';

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
  [33, 0],
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

const CHARACTER_LIST = [
  {
    id: 'arjuna',
    name: 'Raden Arjuna',
    javanese: 'ꦗꦤꦏ',
    role: 'Satria Madukara · Pandawa',
    desc: 'Karakter satria halus, berwibawa, lincah, berbusana prada emas, dan berjiwa ksatria pembela kebenaran.',
    weapon: 'Busur Gandiwa & Keris Pulanggeni',
    thumb: '/assets/thumb-arjuna.png',
  },
  {
    id: 'gatotkaca',
    name: 'Raden Gatotkaca',
    javanese: 'ꦒꦠꦺꦴꦠ꧀ꦏꦕ',
    role: 'Satria Pringgadani · Otot Kawat Balung Wesi',
    desc: 'Kesatria perkasa gagah berani berkutang Antakusuma, mampu terbang melesat di angkasa dan sakti mandraguna.',
    weapon: 'Kutang Antakusuma & Aji Brajamusti',
    thumb: '/assets/thumb-gatotkaca.png',
  },
  {
    id: 'semar',
    name: 'Kyai Semar',
    javanese: 'ꦱꦼꦩꦂ',
    role: 'Lurah Karangdempel · Punakawan',
    desc: 'Sesepuh bijaksana berkharisma luhur, berbadan bulat karismatik, pamong para ksatria yang arif dan mengayomi.',
    weapon: 'Kentut Sakti & Petuah Luhur',
    thumb: '/assets/thumb-semar.png',
  },
  {
    id: 'petruk',
    name: 'Petruk (Kantong Bolong)',
    javanese: 'ꦥꦺꦠꦿꦸꦏ꧀',
    role: 'Punakawan Cerdas & Jenaka',
    desc: 'Berhidung mancung panjang, postur semampai tinggi, tangkas, cerdas berdiplomasi, dan penuh kelakar ceria.',
    weapon: 'Tombak Petruk & Kelakar Filosofis',
    thumb: '/assets/thumb-petruk.png',
  },
  {
    id: 'bagong',
    name: 'Kyai Bagong (Bawor)',
    javanese: 'ꦧꦒꦺꦴꦁ',
    role: 'Punakawan Kritis & Jujur',
    desc: 'Bertubuh bulat pendek dengan mata melotot, ceplas-ceplos, lugu, jenaka, berani bersuara jujur menyuarakan rakyat.',
    weapon: 'Sindiran Lugas & Candatawa',
    thumb: '/assets/thumb-bagong.png',
  },
] as const;

function getCharShortName(nameOrId?: string): string {
  if (!nameOrId) return '';
  const fullName = (CHARACTERS as Record<string, { name?: string }>)[nameOrId]?.name || nameOrId;
  return fullName.replace(/^(Kyai|Raden|Prabu|Sang)\s+/i, '').split(/[\s(/]+/)[0];
}

type StageCharId = (typeof CHARACTER_LIST)[number]['id'];

const vecAdd = (a: [number, number], b: [number, number]): [number, number] => [a[0] + b[0], a[1] + b[1]];

/**
 * WayangPuppetThumbnail:
 * Menggambar wayang kulit lengkap dengan kedua lengan, siku, pergelangan, jari tangan,
 * gapit bambu/sungu, dan tuding tangan sesuai inverse kinematics wayang tradisional.
 */
const WayangPuppetThumbnail = React.memo(function WayangPuppetThumbnail({
  charId,
  className = '',
  width = 150,
  height = 200,
}: {
  charId: StageCharId;
  className?: string;
  width?: number;
  height?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isMounted = true;
    const charDef: CharacterConfig = CHARACTERS[charId] || CHARACTERS.arjuna;

    const partKeys = ['body', 'upperL', 'foreL', 'handL', 'upperR', 'foreR', 'handR'];
    const loadedImgs: Record<string, HTMLImageElement> = {};
    let loadCount = 0;

    const renderWayang = () => {
      if (!canvas || !ctx || !isMounted) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = width;
      const H = height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);

      const bodyConfig = charDef.body;
      const bodyPart = charDef.parts.body;
      if (!bodyPart) {
        ctx.restore();
        return;
      }

      // Hitung skala pas agar kepala sampai ujung gapit muat estetis
      const scale = Math.min(W / (bodyPart.size[0] * 1.42), H / (bodyPart.size[1] * 1.06)) * 0.95;
      const cx = W * 0.48;
      const cy = H * 0.54;

      const B: AffineMatrix = Affine.chain(
        Affine.translate(cx, cy),
        Affine.scale(scale, scale),
        Affine.translate(-bodyConfig.anchor[0], -bodyConfig.anchor[1])
      );

      const armL = new Arm('L', charDef);
      const armR = new Arm('R', charDef);

      const restL = charDef.rest.L;
      const targetL = Affine.apply(B, ...vecAdd(armL.shoulder, restL));
      const invB = Affine.invert(B);
      if (invB) {
        const solL = armL.solve(Affine.apply(invB, targetL[0], targetL[1]));
        armL.rotU.snap(solL.rotU);
        armL.rotF.snap(solL.rotF);
        armL.rotH.snap(solL.rotF);

        const restR = charDef.rest.R;
        const targetR = Affine.apply(B, ...vecAdd(armR.shoulder, restR));
        const solR = armR.solve(Affine.apply(invB, targetR[0], targetR[1]));
        armR.rotU.snap(solR.rotU);
        armR.rotF.snap(solR.rotF);
        armR.rotH.snap(solR.rotF);
      }

      const poseL = armL.pose(B);
      const poseR = armR.pose(B);

      const drawPart = (img: HTMLImageElement | undefined, m: AffineMatrix) => {
        if (!img || !img.complete || img.naturalWidth === 0) return;
        ctx.save();
        ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
        ctx.drawImage(img, 0, 0);
        ctx.restore();
      };

      const drawStick = (topP: [number, number], botP: [number, number], widthPx: number, color: string) => {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(topP[0], topP[1]);
        ctx.lineTo(botP[0], botP[1]);
        ctx.lineWidth = Math.max(1.2, widthPx);
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.restore();
      };

      // Efek bayangan kelir lembut di belakang wayang
      ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 5;

      // 1. Lengan Belakang (Tangan Kanan R)
      drawPart(loadedImgs.upperR, poseR.upperM);
      drawPart(loadedImgs.foreR, poseR.foreM);
      drawPart(loadedImgs.handR, poseR.handM);

      // Tuding Tangan Belakang
      const gripR = poseR.grip;
      drawStick(gripR, [gripR[0] - 12 * scale, H + 12], 2.2 * scale, '#4a2a12');

      // 2. Badan Utama Wayang (Torso & Kepala)
      drawPart(loadedImgs.body, B);

      // Gapit Utama (Tongkat Badan Sungu Kerbau)
      const stickTop = Affine.apply(B, ...bodyConfig.stickTop);
      const stickFoot = Affine.apply(B, ...bodyConfig.stickFoot);
      drawStick(stickTop, [stickFoot[0], H + 25], 4.2 * scale, '#d59a35');
      drawStick(stickTop, [stickFoot[0], H + 25], 2.0 * scale, '#fae19c');

      // Tali pengikat gapit (Ties)
      bodyConfig.ties.forEach((tieY) => {
        const tiePos = Affine.apply(B, bodyConfig.stickTop[0], tieY);
        ctx.fillStyle = '#fce5b2';
        ctx.beginPath();
        ctx.arc(tiePos[0], tiePos[1], 2.5 * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Lengan Depan (Tangan Kiri L)
      drawPart(loadedImgs.upperL, poseL.upperM);
      drawPart(loadedImgs.foreL, poseL.foreM);
      drawPart(loadedImgs.handL, poseL.handM);

      // Tuding Tangan Depan
      const gripL = poseL.grip;
      drawStick(gripL, [gripL[0] + 16 * scale, H + 12], 2.2 * scale, '#361c0a');

      ctx.restore();
    };

    const onImageLoaded = () => {
      loadCount++;
      if (loadCount === partKeys.length) {
        renderWayang();
      }
    };

    partKeys.forEach((key) => {
      const partConfig = (charDef.parts as any)[key];
      if (!partConfig) {
        loadCount++;
        return;
      }
      const img = new Image();
      img.src = partConfig.src.startsWith('/') ? partConfig.src : `/${partConfig.src}`;
      img.onload = onImageLoaded;
      img.onerror = onImageLoaded;
      loadedImgs[key] = img;
    });

    return () => {
      isMounted = false;
    };
  }, [charId, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className={`wayang-thumb-canvas ${className}`}
      style={{ width, height, display: 'block' }}
      aria-label={`Pratinjau lengkap wayang ${charId} beserta kedua tangannya`}
    />
  );
});

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
  const [showCharModal, setShowCharModal] = useState(false);
  const [activeSlotTab, setActiveSlotTab] = useState<'left' | 'right'>('left');
  const [uiHidden, setUiHidden] = useState(false);
  const [toastText, setToastText] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [isPoppedOut, setIsPoppedOut] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [puppetSize, setPuppetSize] = useState(0.53);
  const [facingMode, setFacingMode] = useState<'target' | 'walk' | 'manual'>('target');
  const [controlMode, setControlMode] = useState<'camera' | 'mouse'>('mouse');
  const [errorMessage, setErrorMessage] = useState('');

  const [settings, setSettings] = useState<ControllerSettings>({
    characters: 'two',
    fingers: 'thumb-index',
    bodyHand: 'right',
    soloStyle: 'avatar',
  });

  const [leftPuppetChar, setLeftPuppetChar] = useState<StageCharId>('arjuna');
  const [rightPuppetChar, setRightPuppetChar] = useState<StageCharId>('bagong');

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
    basePuppetSize: number;
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
    basePuppetSize: 0.53,
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

  const handleLeftCharChange = useCallback((charId: StageCharId) => {
    setLeftPuppetChar(charId);
    if (wayangRef.current.puppets[0]) {
      wayangRef.current.puppets[0].setCharacter(charId);
      showToast(`Tokoh kiri diubah ke ${CHARACTERS[charId]?.name || charId}`);
    }
  }, [showToast]);

  const handleRightCharChange = useCallback((charId: StageCharId) => {
    setRightPuppetChar(charId);
    if (wayangRef.current.puppets[1]) {
      wayangRef.current.puppets[1].setCharacter(charId);
      showToast(`Tokoh kanan diubah ke ${CHARACTERS[charId]?.name || charId}`);
    }
  }, [showToast]);

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
        showToast('Pop-up blocked. Izinkan pop-up di browser untuk membuka jendela kamera.');
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

  const handleCharactersChange = useCallback((val: 'two' | 'one') => {
    setSettings((prev) => ({ ...prev, characters: val }));
    const controller = wayangRef.current.controller;
    const puppets = wayangRef.current.puppets;
    const view = wayangRef.current.view;
    if (controller) {
      controller.settings.characters = val;
    }
    if (puppets.length) {
      const aspect = view.w / Math.max(1, view.h);
      const puppetY = view.y + view.h * 0.62;
      if (val === 'one') {
        const centerX = view.x + view.w * 0.5;
        puppets[0].home = [centerX, puppetY];
        puppets[0].pos.snap(centerX, puppetY);
        showToast('Mode 1 Wayang (Solo). Angkat 2 tangan untuk mengendalikan kedua lengan!');
      } else {
        const leftX = view.x + view.w * (aspect < 0.8 ? 0.28 : 0.33);
        const rightX = view.x + view.w * (aspect < 0.8 ? 0.72 : 0.67);
        puppets[0].home = [leftX, puppetY];
        puppets[0].pos.snap(leftX, puppetY);
        if (puppets[1]) {
          puppets[1].home = [rightX, puppetY];
          puppets[1].pos.snap(rightX, puppetY);
        }
        showToast('Mode 2 Wayang (Pertunjukan Duo) Aktif');
      }
    }
    applyFacing(facingMode);
  }, [applyFacing, facingMode, showToast]);

  const handleSoloStyleChange = useCallback((val: 'avatar' | 'classic') => {
    setSettings((prev) => ({ ...prev, soloStyle: val }));
    if (wayangRef.current.controller) {
      wayangRef.current.controller.setSoloStyle(val);
    }
    try {
      localStorage.setItem('wayang_solo_style', val);
    } catch {}
    showToast(
      val === 'avatar'
        ? 'Gaya Solo: Dua Tangan Bebas (Kiri = Lengan Kiri, Kanan = Lengan Kanan)'
        : 'Gaya Solo: Dalang Klasik (Badan + Tuding)'
    );
  }, [showToast]);

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
      new Puppet({ x: 640, y: 650, facing: -1, character: leftPuppetChar }),
      new Puppet({ x: 1280, y: 650, facing: 1, character: rightPuppetChar }),
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
    wayangRef.current.basePuppetSize = puppetSize;

    applyFacing('target');

    // Load textures for all characters
    const textureLoads: Promise<void>[] = [
      renderer.loadTexture('background', 'assets/background.png'),
    ];
    for (const [charId, charDef] of Object.entries(CHARACTERS)) {
      for (const [partKey, part] of Object.entries(charDef.parts)) {
        textureLoads.push(renderer.loadTexture(`${charId}_${partKey}`, part.src));
        if (charId === 'arjuna') {
          textureLoads.push(renderer.loadTexture(partKey, part.src));
        }
      }
    }
    Promise.all(textureLoads).catch((err) => {
      console.error('Failed to load textures:', err);
    });

    const pctx = preview.getContext('2d');

    // Responsive Stage Resize Handler (Mendukung Mobile, Tablet, dan Desktop)
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.resize(Math.round(w * dpr), Math.round(h * dpr));

      const aspect = w / Math.max(1, h);
      const s = Math.max(w / STAGE_W, h / STAGE_H);
      const viewW = w / s;
      const viewH = h / s;
      const viewX = (STAGE_W - viewW) / 2;
      const viewY = (STAGE_H - viewH) / 2;

      wayangRef.current.view = {
        w: viewW,
        h: viewH,
        x: viewX,
        y: viewY,
      };

      // Skala responsif wayang agar di layar sempit / HP / Tablet kedua wayang muat rapih dan tidak terpotong
      const isNarrow = aspect < 1.45;
      const curBase = wayangRef.current.basePuppetSize || 0.53;
      const responsiveScale = isNarrow
        ? curBase * Math.max(0.60, Math.min(1.0, 0.42 + 0.40 * aspect))
        : curBase;

      const currentPuppets = wayangRef.current.puppets;
      if (currentPuppets.length > 0) {
        for (const p of currentPuppets) {
          p.baseScale = responsiveScale;
        }

        const isTwo = wayangRef.current.controller?.settings.characters !== 'one';
        const puppetY = viewY + viewH * 0.62;

        if (isTwo) {
          const leftSpacing = aspect < 0.8 ? 0.28 : 0.33;
          const rightSpacing = aspect < 0.8 ? 0.72 : 0.67;
          const leftX = viewX + viewW * leftSpacing;
          const rightX = viewX + viewW * rightSpacing;

          currentPuppets[0].home = [leftX, puppetY];
          if (currentPuppets[1]) {
            currentPuppets[1].home = [rightX, puppetY];
          }
        } else {
          const centerX = viewX + viewW * 0.5;
          currentPuppets[0].home = [centerX, puppetY];
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Camera drawer with aspect ratio preservation (anti-gepeng)
    const drawCamera = (ctx: CanvasRenderingContext2D, W: number, H: number) => {
      const s = Math.max(1, W / 480);
      ctx.save();
      ctx.translate(W, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, W, H);
      ctx.restore();
      ctx.fillStyle = 'rgba(20,10,4,0.32)';
      ctx.fillRect(0, 0, W, H);

      const isAvatar = controller.puppetCount === 1 && controller.settings.soloStyle !== 'classic';

      controller.slots.forEach((slot, i) => {
        if (!slot.active || !slot.landmarks) return;
        const P = slot.landmarks.map((l) => [(1 - l.x) * W, l.y * H]);
        const isBody = controller.puppetCount === 2 ? true : i === controller.bodySlot;

        let strokeColor = 'rgba(150,210,255,0.9)';
        if (controller.puppetCount === 2) {
          strokeColor = slot.role !== 1 ? 'rgba(242,199,107,0.9)' : 'rgba(150,210,255,0.9)';
        } else if (isAvatar) {
          const other = controller.slots.find((s, idx) => idx !== i && s.active && s.data);
          const isLeft = other ? (slot.data?.palm[0] ?? 0) <= (other.data?.palm[0] ?? 0) : true;
          strokeColor = isLeft ? 'rgba(242,199,107,0.95)' : 'rgba(150,210,255,0.95)';
        } else {
          strokeColor = isBody ? 'rgba(242,199,107,0.9)' : 'rgba(150,210,255,0.9)';
        }

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.5 * s;
        ctx.beginPath();
        for (const [a, b] of HAND_EDGES) {
          if (P[a] && P[b]) {
            ctx.moveTo(P[a][0], P[a][1]);
            ctx.lineTo(P[b][0], P[b][1]);
          }
        }
        ctx.stroke();

        const pairKey = controller.settings.fingers;
        const pair = pairKey === 'thumb-pinky' ? [4, 20] : pairKey === 'index-pinky' ? [8, 20] : [4, 8];
        ctx.fillStyle = '#ff6b4a';
        for (const t of pair) {
          if (P[t]) {
            ctx.beginPath();
            ctx.arc(P[t][0], P[t][1], 4 * s, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        if (slot.pinky && P[20]) {
          ctx.strokeStyle = '#ffe28a';
          ctx.lineWidth = 2.5 * s;
          ctx.beginPath();
          ctx.arc(P[20][0], P[20][1], 8 * s, 0, Math.PI * 2);
          ctx.stroke();
        }

        if (isBody && !isAvatar) {
          const c = [0, 5, 9, 13, 17].reduce(
            (acc, j) => [acc[0] + (P[j]?.[0] || 0) / 5, acc[1] + (P[j]?.[1] || 0) / 5],
            [0, 0]
          );
          ctx.strokeStyle = 'rgba(242,199,107,0.9)';
          ctx.lineWidth = 2 * s;
          ctx.beginPath();
          ctx.arc(c[0], c[1], 9 * s, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Draw virtual body anchor bridge between two hands in Avatar Solo Mode
      if (
        isAvatar &&
        controller.slots[0].active &&
        controller.slots[1].active &&
        controller.slots[0].landmarks &&
        controller.slots[1].landmarks
      ) {
        const P0 = controller.slots[0].landmarks.map((l) => [(1 - l.x) * W, l.y * H]);
        const P1 = controller.slots[1].landmarks.map((l) => [(1 - l.x) * W, l.y * H]);
        const mid0 = [0, 5, 9, 13, 17].reduce((acc, j) => [acc[0] + P0[j][0] / 5, acc[1] + P0[j][1] / 5], [0, 0]);
        const mid1 = [0, 5, 9, 13, 17].reduce((acc, j) => [acc[0] + P1[j][0] / 5, acc[1] + P1[j][1] / 5], [0, 0]);
        const center = [(mid0[0] + mid1[0]) * 0.5, (mid0[1] + mid1[1]) * 0.5];

        ctx.strokeStyle = 'rgba(242,199,107,0.5)';
        ctx.setLineDash([3 * s, 3 * s]);
        ctx.lineWidth = 1 * s;
        ctx.beginPath();
        ctx.moveTo(mid0[0], mid0[1]);
        ctx.lineTo(mid1[0], mid1[1]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#f2c76b';
        ctx.beginPath();
        ctx.arc(center[0], center[1], 3.5 * s, 0, Math.PI * 2);
        ctx.fill();
      }
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
    const handleFirstGesture = (e: MouseEvent | KeyboardEvent | TouchEvent) => {
      if ((e.target as HTMLElement)?.closest?.('.sound-btn') || ('key' in e && (e as KeyboardEvent).key?.toLowerCase() === 'm')) return;
      music.start().then(() => {
        if (music.started) {
          window.removeEventListener('pointerdown', handleFirstGesture as any, true);
          window.removeEventListener('keydown', handleFirstGesture as any, true);
        }
      });
    };
    window.addEventListener('pointerdown', handleFirstGesture as any, true);
    window.addEventListener('keydown', handleFirstGesture as any, true);

    // Pointer events for mouse & touch control
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
    canvas.addEventListener('pointerdown', onPointerMove);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    // Keyboard controls
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement || e.target instanceof HTMLTextAreaElement) return;
      const k = e.key.toLowerCase();
      if (k === '1') {
        handleCharactersChange('one');
      } else if (k === '2') {
        handleCharactersChange('two');
      } else if (k === 'd') {
        controller.requestDance();
        showToast('Tari Kiprah');
      } else if (k === 'f') {
        turnPuppet(0);
        showToast('Tokoh Kiri: Balik Arah Hadap');
      } else if (k === 'g') {
        turnPuppet(1);
        showToast('Tokoh Kanan: Balik Arah Hadap');
      } else if (k === 'h') {
        setUiHidden((prev) => !prev);
      } else if (k === 'm') {
        toggleMusic();
        const isMutedNow = wayangRef.current.music?.muted;
        showToast(isMutedNow ? 'Musik Gamelan Dibisukan' : 'Musik Gamelan Dinyalakan');
      } else if (k === 'c') {
        controller.recalibrate();
        showToast('Kalibrasi Kedalaman');
      } else if (k === 'p') {
        toggleCameraWindow();
      } else if (k === 'v') {
        setShowPreview((prev) => {
          const next = !prev;
          showToast(next ? 'Pratinjau Kamera Aktif' : 'Pratinjau Kamera Disembunyikan');
          return next;
        });
      }
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
          showToast(active.length === 2 ? `${j === 0 ? 'Tokoh Kiri' : 'Tokoh Kanan'} · Tari Kiprah` : 'Tari Kiprah');
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

      // Draw camera preview (Preserve Aspect Ratio - Fix Kamera Gepeng)
      const popped = !!wayangRef.current.cameraWin && !wayangRef.current.cameraWin.closed;
      if (!popped && wayangRef.current.showPreview && cameraReady() && pctx) {
        const vidW = video.videoWidth;
        const vidH = video.videoHeight;
        if (vidW > 0 && vidH > 0) {
          const streamAspect = vidW / vidH;
          const targetW = 320;
          const targetH = Math.max(120, Math.round(targetW / streamAspect));
          if (preview.width !== targetW || preview.height !== targetH) {
            preview.width = targetW;
            preview.height = targetH;
          }
        }
        drawCamera(pctx, preview.width, preview.height);
      }

      // Update HUD status
      const { source, status } = controller;
      let text = '';
      let cls = '';
      if (source === 'camera') {
        if (status.hands === 0) {
          text = controller.puppetCount === 2 ? 'Kamera aktif · angkat kedua tangan' : 'Kamera aktif · tunjukkan tangan Anda';
          cls = 'warn';
        } else {
          text =
            status.mode === 'two puppets'
              ? status.hands === 2
                ? 'Dua wayang · satu di setiap tangan'
                : 'Dua wayang · 1 tangan terdeteksi'
              : status.mode === 'avatar two hands'
              ? 'Satu wayang · tangan kiri & kanan mengendalikan kedua lengan'
              : status.mode === 'two hands (classic)' || status.mode === 'two hands'
              ? 'Satu wayang · gapit + tuding'
              : status.mode === 'one hand'
              ? 'Satu wayang · telapak + jari'
              : status.mode;
          if (status.calibrating) text += ' · kalibrasi kedalaman';
          cls = 'live';
        }
      } else if (source === 'mouse') {
        text = 'Mouse / Sentuh Layar · gulir scroll untuk kedalaman';
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
      window.removeEventListener('pointerdown', handleFirstGesture as any, true);
      window.removeEventListener('keydown', handleFirstGesture as any, true);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerdown', onPointerMove);
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

  // Switch Control Mode (Camera vs Mouse)
  const switchControlMode = useCallback(async (mode: 'camera' | 'mouse') => {
    const controller = wayangRef.current.controller;
    const tracker = wayangRef.current.tracker;
    const preview = previewRef.current;
    if (!controller) return;

    if (mode === 'mouse') {
      controller.source = 'mouse';
      setControlMode('mouse');
      showToast('Mode kontrol: Mouse / Sentuhan');
      return;
    }

    // Switch to Camera
    if (tracker && tracker.ready) {
      controller.source = 'camera';
      controller.recalibrate();
      setControlMode('camera');
      if (preview && tracker.aspect) {
        preview.height = Math.round(preview.width / tracker.aspect);
      }
      showToast('Mode kontrol: Kamera aktif');
      return;
    }

    if (tracker) {
      showToast('Menghubungkan kamera & model pelacak...');
      try {
        await tracker.start((msg) => {
          showToast(msg);
        });
        controller.source = 'camera';
        controller.recalibrate();
        setControlMode('camera');
        if (preview && tracker.aspect) {
          preview.height = Math.round(preview.width / tracker.aspect);
        }
        showToast('Kamera aktif. Arahkan tangan Anda ke kamera.');
      } catch (err: unknown) {
        console.error('Camera switch error:', err);
        const isAllowedError = (err as { name?: string })?.name === 'NotAllowedError';
        const msg = isAllowedError
          ? 'Izin kamera diblokir. Izinkan kamera di browser untuk bermain dengan kamera.'
          : `Kamera tidak tersedia (${(err as Error)?.message || err}).`;
        showToast(msg);
      }
    }
  }, [showToast]);

  // Start Camera handler
  const handleStartCamera = async () => {
    setCameraDisabled(true);
    setIntroStatus({ text: 'Memulai kamera…', isError: false });
    const tracker = wayangRef.current.tracker;
    const controller = wayangRef.current.controller;
    const preview = previewRef.current;
    if (!tracker || !controller) return;

    try {
      await tracker.start((msg) => setIntroStatus({ text: msg, isError: false }));
      controller.source = 'camera';
      controller.recalibrate();
      setControlMode('camera');
      setIntroStatus({ text: '', isError: false });
      setIntroGone(true);
      if (preview && tracker.aspect) {
        preview.height = Math.round(preview.width / tracker.aspect);
      }
    } catch (err: unknown) {
      console.error(err);
      const isAllowedError = (err as { name?: string })?.name === 'NotAllowedError';
      const msg = isAllowedError
        ? 'Izin kamera diblokir. Izinkan di bilah alamat browser, atau mainkan dengan mouse / sentuhan.'
        : `Kamera tidak tersedia (${(err as Error)?.message || err}). Anda tetap dapat bermain dengan mouse / sentuhan.`;
      setIntroStatus({ text: msg, isError: true });
      setCameraDisabled(false);
    }
  };

  const handleUseMouse = () => {
    if (wayangRef.current.controller) {
      wayangRef.current.controller.source = 'mouse';
    }
    setControlMode('mouse');
    setIntroGone(true);
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
    wayangRef.current.basePuppetSize = val;
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
    !showPreview || controlMode !== 'camera' || isPoppedOut;

  const activeCharId = activeSlotTab === 'left' ? leftPuppetChar : rightPuppetChar;
  const activeCharData = CHARACTER_LIST.find((c) => c.id === activeCharId) || CHARACTER_LIST[0];

  return (
    <div className={uiHidden ? 'ui-hidden' : ''}>
      <canvas id="stage" ref={canvasRef} aria-label="Panggung wayang kulit" />
      <video id="video" ref={videoRef} playsInline muted style={{ display: 'none' }} />

      {/* Intro Overlay */}
      <section id="intro" className={`panel intro ${introGone ? 'gone' : ''}`}>
        <p className="eyebrow">Wayang Kulit Digital</p>
        <h1 className="wayang-title">
          {settings.characters === 'two' ? (
            <>
              Dua Wayang,
              <br />
              Satu di Setiap Tangan
            </>
          ) : (
            <>
              Satu Wayang (Solo),
              <br />
              Dua Tangan Dalang
            </>
          )}
        </h1>
        <p className="lede">
          {settings.characters === 'two'
            ? 'Mainkan dua wayang kulit di atas kain kelir berlampu blencong. Kamera melacak kedua tangan Anda seperti dalang memegang gapit dan cempurit.'
            : 'Mainkan satu wayang solo secara leluasa dengan gestur dua tangan: satu tangan menggerakkan kedua lengan wayang, dan tangan lainnya mengendalikan posisi tubuh (gapit) serta kedalaman wayang.'}
        </p>

        <ul className="howto">
          {settings.characters === 'two' ? (
            <>
              <li>
                <span className="k">Tangan Kiri &amp; Kanan</span>
                <span>Setiap tangan memainkan satu tokoh: tangan kiri menggerakkan wayang kiri, tangan kanan menggerakkan wayang kanan.</span>
              </li>
              <li>
                <span className="k">Telapak Tangan</span>
                <span>Tongkat badan (gapit). Posisi wayang mengikuti telapak tangan Anda.</span>
              </li>
              <li>
                <span className="k">Jari Tangan</span>
                <span>Tangkai tangan wayang (cempurit). Rentangkan atau gerakkan jemari untuk mengayunkan kedua lengan wayang.</span>
              </li>
            </>
          ) : (
            <>
              <li>
                <span className="k">Tangan Tuding</span>
                <span>Mengatur kedua tangkai tangan &amp; lengan wayang (ibu jari &amp; telunjuk/kelingking) dengan bebas di panggung.</span>
              </li>
              <li>
                <span className="k">Tangan Gapit</span>
                <span>Menggerakkan posisi tubuh wayang (X/Y) dan mengatur kemiringan alami tubuh wayang.</span>
              </li>
              <li>
                <span className="k">Arah Hadap</span>
                <span>Gunakan tombol F / G atau menu pengaturan untuk membalik arah hadap wayang.</span>
              </li>
            </>
          )}
          <li>
            <span className="k">Maju / Mundur</span>
            <span>Mendekat ke kamera mengangkat wayang dari kain kelir, membuat bayangannya membesar dan mengabur dramatis.</span>
          </li>
        </ul>

        {/* Mode Switcher in Intro */}
        <div className="intro-mode-toggle">
          <button
            type="button"
            className={`btn small ${settings.characters === 'two' ? 'primary' : ''}`}
            style={{ flex: 1 }}
            onClick={() => handleCharactersChange('two')}
          >
            2 Wayang (Dua Tangan)
          </button>
          <button
            type="button"
            className={`btn small ${settings.characters === 'one' ? 'primary' : ''}`}
            style={{ flex: 1 }}
            onClick={() => handleCharactersChange('one')}
          >
            1 Wayang (Solo)
          </button>
        </div>

        {/* Compact Character Selection in Intro */}
        <div className="intro-char-bar">
          <div className="char-current-pill">
            <span className="char-pill-label">Tokoh:</span>
            <span className="char-pill-names">
              <strong>{getCharShortName(leftPuppetChar)}</strong>
              {settings.characters === 'two' && (
                <>
                  {' & '}<strong>{getCharShortName(rightPuppetChar)}</strong>
                </>
              )}
            </span>
          </div>
          <button
            type="button"
            id="btn-open-char-modal"
            className="btn-select-char"
            onClick={() => setShowCharModal(true)}
          >
            Ganti Tokoh...
          </button>
        </div>

        <div className="actions">
          <button
            id="start-camera"
            className="btn primary"
            disabled={cameraDisabled}
            onClick={handleStartCamera}
          >
            Mulai Kamera
          </button>
          <button id="use-mouse" className="btn" onClick={handleUseMouse}>
            Gunakan Mouse / Sentuh
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
      <div id="hud" className={`hud ${!introGone ? 'hud-hidden' : ''}`}>
        <div className={`pill ${hudStatus.cls}`} id="status">
          <span className="dot" />
          <span id="status-text">{hudStatus.text}</span>
        </div>
        <div className="keys">
          <button
            type="button"
            className="key-btn"
            onClick={() => handleCharactersChange(settings.characters === 'two' ? 'one' : 'two')}
            title="Ganti Mode 1 Wayang (Solo) / 2 Wayang (Duo) (Tekan 1 / 2)"
          >
            <kbd>{settings.characters === 'two' ? '1' : '2'}</kbd>{' '}
            {settings.characters === 'two' ? '1 wayang (solo)' : '2 wayang (duo)'}
          </button>
          <button
            type="button"
            className="key-btn"
            onClick={() => {
              wayangRef.current.controller?.requestDance();
              showToast('Tari Kiprah');
            }}
            title="Tari Kiprah (Tekan D)"
          >
            <kbd>D</kbd> tari kiprah
          </button>
          <button
            type="button"
            className="key-btn"
            onClick={() => {
              turnPuppet(0);
              showToast('Tokoh Kiri: Balik Arah Hadap');
            }}
            title="Balik Arah Tokoh Kiri (Tekan F)"
          >
            <kbd>F</kbd>
          </button>
          <button
            type="button"
            className="key-btn"
            onClick={() => {
              turnPuppet(1);
              showToast('Tokoh Kanan: Balik Arah Hadap');
            }}
            title="Balik Arah Tokoh Kanan (Tekan G)"
          >
            <kbd>G</kbd> balik hadap
          </button>
          <button
            type="button"
            className="key-btn"
            onClick={() => setShowCharModal(true)}
            title="Pilih Tokoh Wayang"
          >
            <kbd>T</kbd> pilih tokoh
          </button>
          <button
            type="button"
            className="key-btn"
            onClick={() => setUiHidden((prev) => !prev)}
            title="Sembunyikan / Tampilkan UI (Tekan H)"
          >
            <kbd>H</kbd> sembunyikan UI
          </button>
          <button
            type="button"
            className="key-btn"
            onClick={() => {
              wayangRef.current.controller?.recalibrate();
              showToast('Kalibrasi Kedalaman');
            }}
            title="Kalibrasi Kedalaman (Tekan C)"
          >
            <kbd>C</kbd> kalibrasi
          </button>
          <button
            type="button"
            className="key-btn"
            onClick={() =>
              setShowPreview((prev) => {
                const next = !prev;
                showToast(next ? 'Pratinjau Kamera Aktif' : 'Pratinjau Kamera Disembunyikan');
                return next;
              })
            }
            title="Pratinjau Kamera (Tekan V)"
          >
            <kbd>V</kbd> pratinjau kamera
          </button>
          <button
            type="button"
            className="key-btn"
            onClick={() => toggleCameraWindow()}
            title="Buka Kamera di Jendela Terpisah (Tekan P)"
          >
            <kbd>P</kbd> pisah jendela
          </button>
          <button
            type="button"
            className="key-btn"
            onClick={() => {
              toggleMusic();
              const isMutedNow = wayangRef.current.music?.muted;
              showToast(isMutedNow ? 'Musik Gamelan Dibisukan' : 'Musik Gamelan Dinyalakan');
            }}
            title="Nyalakan / Matikan Musik (Tekan M)"
          >
            <kbd>M</kbd> musik
          </button>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="top-floating-actions">
        {/* Character Selection Quick Button */}
        <button
          type="button"
          className="icon-btn"
          aria-label="Pilih Tokoh Wayang"
          title="Pilih Tokoh Wayang"
          onClick={() => setShowCharModal(true)}
        >
          <span style={{ fontSize: '15px' }}>🎭</span>
        </button>

        {/* Home Button */}
        <Link
          href="/panduan"
          className="icon-btn"
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
          aria-label={isMuted ? 'Nyalakan suara musik' : 'Bisukan musik'}
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
          aria-label="Pengaturan"
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
      </div>

      {/* Settings Panel */}
      <aside id="settings" className="panel settings" hidden={!showSettings}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2>Pengaturan</h2>
          <button
            type="button"
            className="char-modal-close"
            style={{ width: '28px', height: '28px' }}
            onClick={() => setShowSettings(false)}
          >
            ✕
          </button>
        </div>
        <Link
          href="/panduan"
          className="btn small"
          style={{ textAlign: 'center', display: 'block', textDecoration: 'none' }}
        >
          Kembali ke Panduan
        </Link>
        <label>
          Mode Pertunjukan (Jumlah Wayang)
          <select
            id="opt-characters"
            value={settings.characters}
            onChange={(e) => handleCharactersChange(e.target.value as 'two' | 'one')}
          >
            <option value="two">2 Wayang (Dua Tangan / Ganda)</option>
            <option value="one">1 Wayang (Pertunjukan Solo)</option>
          </select>
        </label>
        <button
          type="button"
          className="btn small"
          style={{ width: '100%', margin: '4px 0 8px', borderColor: 'rgba(217, 164, 65, 0.6)' }}
          onClick={() => {
            setShowSettings(false);
            setShowCharModal(true);
          }}
        >
          🎭 Ganti Tokoh Wayang...
        </button>
        <label>
          Mode Kontrol
          <select
            value={controlMode}
            onChange={(e) => switchControlMode(e.target.value as 'camera' | 'mouse')}
          >
            <option value="camera">Kamera (Pelacakan Tangan AI)</option>
            <option value="mouse">Mouse / Sentuhan Layar</option>
          </select>
        </label>
        <label>
          Jari Pengendali Tangan (Tuding)
          <select
            id="opt-fingers"
            value={settings.fingers}
            onChange={(e) =>
              handleFingersChange(e.target.value as 'thumb-index' | 'thumb-pinky' | 'index-pinky')
            }
          >
            <option value="thumb-index">Ibu Jari + Telunjuk</option>
            <option value="thumb-pinky">Ibu Jari + Kelingking (rentang lebar)</option>
            <option value="index-pinky">Telunjuk + Kelingking</option>
          </select>
        </label>
        {settings.characters === 'one' && (
          <>
            <label id="solostyle-row">
              Gaya Kontrol Solo (2 Tangan)
              <select
                id="opt-solostyle"
                value={settings.soloStyle || 'avatar'}
                onChange={(e) => handleSoloStyleChange(e.target.value as 'avatar' | 'classic')}
              >
                <option value="avatar">Dua Tangan Bebas (Kiri = Lengan Kiri, Kanan = Lengan Kanan) — Paling Alami</option>
                <option value="classic">Dalang Klasik (Tangan 1 = Badan, Tangan 2 = Lengan)</option>
              </select>
            </label>
            {settings.soloStyle === 'classic' && (
              <label id="bodyhand-row">
                Tangan Pemegang Gapit (Badan)
                <select
                  id="opt-bodyhand"
                  value={settings.bodyHand}
                  onChange={(e) => handleBodyHandChange(e.target.value as 'right' | 'left')}
                >
                  <option value="right">Tangan kanan memegang gapit</option>
                  <option value="left">Tangan kiri memegang gapit</option>
                </select>
              </label>
            )}
          </>
        )}
        <label>
          Arah Hadap Wayang
          <select
            id="opt-facing"
            value={facingMode}
            onChange={(e) => handleFacingChange(e.target.value as 'target' | 'walk' | 'manual')}
          >
            <option value="target">Saling berhadapan</option>
            <option value="walk">Menghadap arah berjalan</option>
            <option value="manual">Manual (tekan F / G)</option>
          </select>
        </label>
        <label className="row">
          <input
            type="checkbox"
            id="opt-camera"
            checked={showPreview}
            onChange={(e) => setShowPreview(e.target.checked)}
          />{' '}
          Tampilkan pratinjau kamera
        </label>
        <button
          id="opt-popout"
          className="btn small"
          type="button"
          onClick={toggleCameraWindow}
        >
          {isPoppedOut ? 'Kembalikan jendela kamera' : 'Buka kamera di jendela terpisah'}
        </button>
        <label>
          Ukuran Wayang
          <input
            type="range"
            id="opt-size"
            min="0.32"
            max="0.75"
            step="0.01"
            value={puppetSize}
            onChange={(e) => handleSizeChange(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Volume Musik &amp; Gamelan
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

      {/* Preview Box (Camera Live Feed with correct aspect ratio) */}
      <div id="preview-box" hidden={previewBoxHidden}>
        <canvas id="preview" ref={previewRef} width={320} height={180} />
        <button
          id="preview-popout"
          className="popout-btn"
          type="button"
          aria-label="Buka kamera di jendela terpisah"
          title="Buka di jendela terpisah (P)"
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

      {/* Character Selection Pop-Up Modal (Responsive Mobile, Tablet & Desktop) */}
      {showCharModal && (
        <div
          id="char-modal-backdrop"
          className="char-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowCharModal(false);
          }}
        >
          <div className="char-modal-card" role="dialog" aria-modal="true" aria-labelledby="char-modal-title">
            <header className="char-modal-header">
              <div className="char-modal-title-box">
                <span className="char-modal-eyebrow">ꦥꦶꦭꦶꦃꦠꦺꦴꦏꦺꦴꦃꦮꦪꦁ</span>
                <h2 id="char-modal-title">Pilih Tokoh Wayang</h2>
                <p>
                  {settings.characters === 'two'
                    ? 'Pilih tokoh wayang lengkap dengan kedua tangannya untuk sisi kiri dan sisi kanan panggung.'
                    : 'Pilih tokoh wayang lengkap dengan kedua tangannya untuk dimainkan.'}
                </p>
              </div>
              <button
                type="button"
                className="char-modal-close"
                aria-label="Tutup"
                onClick={() => setShowCharModal(false)}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>

            {/* Segmented Slot Selector Tabs for Mobile / Tablet */}
            {settings.characters === 'two' && (
              <div className="char-slot-segmented">
                <button
                  type="button"
                  className={`char-tab-btn ${activeSlotTab === 'left' ? 'active' : ''}`}
                  onClick={() => setActiveSlotTab('left')}
                >
                  <span className="tab-indicator left-ind">Kiri</span>
                  <span className="tab-name">{getCharShortName(leftPuppetChar)}</span>
                </button>
                <button
                  type="button"
                  className="char-tab-swap-btn"
                  title="Tukar Posisi Kiri dan Kanan"
                  onClick={() => {
                    const temp = leftPuppetChar;
                    handleLeftCharChange(rightPuppetChar);
                    handleRightCharChange(temp);
                  }}
                >
                  ⇄ Tukar
                </button>
                <button
                  type="button"
                  className={`char-tab-btn ${activeSlotTab === 'right' ? 'active' : ''}`}
                  onClick={() => setActiveSlotTab('right')}
                >
                  <span className="tab-indicator right-ind">Kanan</span>
                  <span className="tab-name">{getCharShortName(rightPuppetChar)}</span>
                </button>
              </div>
            )}

            {/* Main Stage Slots / Character Showcase */}
            <div className={`stage-slots-container ${settings.characters === 'one' ? 'single-slot' : ''}`}>
              {/* Desktop Dual View / Mobile Active Tab View */}
              {/* Slot Tokoh Sisi Kiri */}
              <div className={`stage-slot-box ${activeSlotTab === 'left' ? 'mobile-active' : 'mobile-hidden-on-small'}`}>
                <div className="slot-header">
                  <span className="slot-label">
                    {settings.characters === 'two' ? '🎭 Tokoh Sisi Kiri' : '🎭 Tokoh Wayang (Solo)'}
                  </span>
                  <span className="slot-active-badge">Aktif</span>
                </div>

                {(() => {
                  const leftInfo = CHARACTER_LIST.find((c) => c.id === leftPuppetChar) || CHARACTER_LIST[0];
                  return (
                    <div className="slot-preview-card">
                      <div className="slot-img-wrap">
                        {/* Render Wayang Lengkap Beserta Kedua Tangannya */}
                        <WayangPuppetThumbnail charId={leftInfo.id as StageCharId} width={130} height={175} />
                      </div>
                      <div className="slot-details">
                        <span className="slot-javanese">{leftInfo.javanese}</span>
                        <h4>{leftInfo.name}</h4>
                        <span className="slot-role">{leftInfo.role}</span>
                        <div className="slot-weapon-badge">
                          <span className="weapon-icon">⚔</span> {leftInfo.weapon}
                        </div>
                        <p className="slot-desc">{leftInfo.desc}</p>
                      </div>
                    </div>
                  );
                })()}

                <div className="slot-character-grid">
                  <span className="grid-heading">Pilih Karakter untuk Sisi Kiri:</span>
                  <div className="slot-buttons-group">
                    {CHARACTER_LIST.map((c) => (
                      <button
                        key={`left-${c.id}`}
                        type="button"
                        className={`slot-choice-btn ${leftPuppetChar === c.id ? 'active' : ''}`}
                        onClick={() => handleLeftCharChange(c.id as StageCharId)}
                      >
                        <span className="choice-thumb-mini">
                          <img src={c.thumb} alt={c.name} />
                        </span>
                        <span className="choice-name">{getCharShortName(c.name)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Middle Swap Button (Desktop) */}
              {settings.characters === 'two' && (
                <div className="slot-swap-divider desktop-only-swap">
                  <button
                    type="button"
                    className="btn-swap-slots"
                    title="Tukar Posisi Kiri dan Kanan"
                    onClick={() => {
                      const temp = leftPuppetChar;
                      handleLeftCharChange(rightPuppetChar);
                      handleRightCharChange(temp);
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16" />
                    </svg>
                    <span>Tukar</span>
                  </button>
                </div>
              )}

              {/* Slot Tokoh Sisi Kanan (if 2 puppets) */}
              {settings.characters === 'two' && (
                <div className={`stage-slot-box ${activeSlotTab === 'right' ? 'mobile-active' : 'mobile-hidden-on-small'}`}>
                  <div className="slot-header">
                    <span className="slot-label">🎭 Tokoh Sisi Kanan</span>
                    <span className="slot-active-badge">Aktif</span>
                  </div>

                  {(() => {
                    const rightInfo = CHARACTER_LIST.find((c) => c.id === rightPuppetChar) || CHARACTER_LIST[2];
                    return (
                      <div className="slot-preview-card">
                        <div className="slot-img-wrap">
                          {/* Render Wayang Lengkap Beserta Kedua Tangannya */}
                          <WayangPuppetThumbnail charId={rightInfo.id as StageCharId} width={130} height={175} />
                        </div>
                        <div className="slot-details">
                          <span className="slot-javanese">{rightInfo.javanese}</span>
                          <h4>{rightInfo.name}</h4>
                          <span className="slot-role">{rightInfo.role}</span>
                          <div className="slot-weapon-badge">
                            <span className="weapon-icon">⚔</span> {rightInfo.weapon}
                          </div>
                          <p className="slot-desc">{rightInfo.desc}</p>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="slot-character-grid">
                    <span className="grid-heading">Pilih Karakter untuk Sisi Kanan:</span>
                    <div className="slot-buttons-group">
                      {CHARACTER_LIST.map((c) => (
                        <button
                          key={`right-${c.id}`}
                          type="button"
                          className={`slot-choice-btn ${rightPuppetChar === c.id ? 'active' : ''}`}
                          onClick={() => handleRightCharChange(c.id as StageCharId)}
                        >
                          <span className="choice-thumb-mini">
                            <img src={c.thumb} alt={c.name} />
                          </span>
                          <span className="choice-name">{getCharShortName(c.name)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <footer className="char-modal-footer">
              <div className="selected-summary">
                <span className="sum-label">Posisi Panggung:</span>
                <span className="sum-tag">
                  Kiri: <strong>{getCharShortName(leftPuppetChar)}</strong>
                  {settings.characters === 'two' && (
                    <> &bull; Kanan: <strong>{getCharShortName(rightPuppetChar)}</strong></>
                  )}
                </span>
              </div>
              <button
                type="button"
                className="btn primary btn-modal-done"
                onClick={() => setShowCharModal(false)}
              >
                Selesai &amp; Mainkan
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
