'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as THREE from 'three';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  ArrowLeft,
  Sparkles,
  Swords,
  ChevronDown,
  ChevronRight,
  Lightbulb,
  Hand,
} from 'lucide-react';
import { StormSceneAudio, type DewaRuciAudioMood } from '@/lib/wayang/storm-audio';
import { Glossed } from '@/components/story/Glossed';

// ─────────────────────────────────────────────────────────────────────────────
// GLSL SHADERS
// ─────────────────────────────────────────────────────────────────────────────

const COMMON_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Sendi lunak ala wayang: tiap tulang memutar piksel di sekitar ruasnya dengan bobot
// yang memudar halus, jadi lengan/badan bisa ditekuk tanpa memotong gambar.
// Koordinat dalam piksel tekstur (y ke bawah).
const RIG_GLSL = /* glsl */ `
  uniform vec2 uRigSize;
  uniform float uRigPad;
  uniform vec4 uBoneSeg[3];
  uniform vec4 uBonePivot[3];
  uniform float uBoneAng[3];

  float rigCapsule(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
  }

  vec2 rigPose(vec2 uv) {
    vec2 q = vec2(uv.x, 1.0 - uv.y) * uRigSize;
    for (int i = 0; i < 3; i++) {
      if (abs(uBoneAng[i]) < 0.0001) continue;
      float d = rigCapsule(q, uBoneSeg[i].xy, uBoneSeg[i].zw);
      float w = 1.0 - smoothstep(uBonePivot[i].z, uBonePivot[i].z + uBonePivot[i].w, d);
      float th = -uBoneAng[i] * w;
      float c = cos(th);
      float s = sin(th);
      vec2 dd = q - uBonePivot[i].xy;
      q = vec2(dd.x * c - dd.y * s, dd.x * s + dd.y * c) + uBonePivot[i].xy;
    }
    return vec2(q.x / uRigSize.x, 1.0 - q.y / uRigSize.y);
  }
`;

const SCENE_BG_FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uTexA;
  uniform sampler2D uTexB;
  uniform float uBgMix;
  uniform float uTime;
  uniform float uZoom;
  uniform float uPanX;
  uniform float uNightmare;
  uniform float uAstina;
  uniform float uForest;
  uniform float uCaveCleared;
  uniform float uStorm;
  uniform float uVictory;
  uniform float uAbyss;
  uniform float uCosmos;
  uniform float uDawn;
  uniform float uVignetteTight;
  uniform vec3 uNafsuTint;
  uniform float uLightning;
  uniform float uReduced;
  uniform vec4 uPickArea;
  uniform float uPick;
  uniform float uFocusDim;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    float motion = 1.0 - uReduced;
    vec2 uv = vUv;

    // Storm ocean swells
    if (uStorm > 0.01) {
      float waveMask = smoothstep(0.70, 0.03, uv.y);
      float skyMask  = smoothstep(0.45, 0.96, uv.y);
      float calm = 1.0 - 0.72 * uVictory;
      float wx = (sin(uv.y * 11.0 + uTime * 1.35) * 0.009 + sin(uv.y * 23.0 - uTime * 2.15) * 0.0035) * waveMask * calm;
      float wy = (cos(uv.x * 7.0 - uTime * 1.15) * 0.011 + sin(uv.x * 15.0 + uTime * 1.8) * 0.003) * waveMask * calm;
      uv += vec2(wx, wy) * uStorm * motion;
      uv.x += sin(uTime * 0.22) * 0.007 * skyMask * uStorm * motion;
    }

    if (uAbyss > 0.01) {
      uv.x += sin(uv.y * 9.0 + uTime * 0.75) * 0.0045 * uAbyss * motion;
      uv.y += cos(uv.x * 8.0 - uTime * 0.65) * 0.0035 * uAbyss * motion;
    }

    if (uCosmos > 0.01) {
      vec2 d = uv - 0.5;
      float r = length(d);
      float ang = sin(uTime * 0.35 - r * 3.0) * 0.04 * uCosmos * motion;
      float ca = cos(ang);
      float sa = sin(ang);
      uv = vec2(d.x * ca - d.y * sa, d.x * sa + d.y * ca) + 0.5;
    }

    float z = max(1.0, uZoom);
    uv = (uv - 0.5) / z + 0.5 + vec2(uPanX, 0.0);
    uv = clamp(uv, 0.002, 0.998);

    vec4 colA = texture2D(uTexA, uv);
    vec4 colB = texture2D(uTexB, uv);
    vec3 col = mix(colA.rgb, colB.rgb, uBgMix);

    if (uNightmare > 0.01) {
      float emberPulse = 0.65 + 0.35 * sin(uTime * 2.1);
      float lowGlow = smoothstep(0.65, 0.05, vUv.y);
      col += vec3(0.24, 0.04, 0.02) * emberPulse * lowGlow * uNightmare * motion;
    }

    if (uAstina > 0.01) {
      float lampPulse = 1.0 + (sin(uTime * 3.5) * 0.035 + sin(uTime * 7.8) * 0.02) * motion;
      float leftLamp = smoothstep(0.30, 0.02, distance(vUv, vec2(0.18, 0.72)));
      float rightLamp = smoothstep(0.30, 0.02, distance(vUv, vec2(0.82, 0.72)));
      col *= mix(1.0, lampPulse, uAstina);
      col += vec3(0.25, 0.17, 0.04) * (leftLamp + rightLamp) * (0.5 + 0.5 * sin(uTime * 4.2)) * uAstina * motion;
    }

    if (uForest > 0.01) {
      float mistBand = sin(vUv.x * 6.0 - uTime * 0.45) * 0.5 + 0.5;
      float lowerCave = smoothstep(0.55, 0.08, vUv.y);
      col += vec3(0.08, 0.06, 0.02) * mistBand * lowerCave * uForest * motion;
    }

    if (uStorm > 0.01) {
      float stormGlow = uLightning * smoothstep(0.25, 0.95, vUv.y) * (1.0 - uVictory);
      col += vec3(0.95, 0.88, 0.58) * stormGlow * 0.55 * uStorm;

      float rainVis = uStorm * (1.0 - uVictory) * motion;
      if (rainVis > 0.01) {
        vec2 rUv = vUv;
        rUv.x += rUv.y * 0.24;
        rUv.y += uTime * 1.85;
        float colIdx = floor(rUv.x * 95.0);
        float colSeed = hash(vec2(colIdx, 7.0));
        float drop = fract(rUv.y * (1.6 + colSeed * 1.4) + colSeed * 10.0);
        float streak = smoothstep(0.92, 1.0, drop) * step(0.62, fract(colSeed * 31.7));
        float xLine = smoothstep(0.35, 0.0, abs(fract(rUv.x * 95.0) - 0.5));
        col += vec3(0.95, 0.87, 0.65) * streak * xLine * 0.28 * rainVis;
      }

      vec3 goldenCalm = vec3(1.08, 0.97, 0.72);
      col = mix(col, col * goldenCalm + vec3(0.06, 0.04, 0.0), uVictory * 0.65 * uStorm);
    }

    if (uAbyss > 0.01) {
      float shaft = sin(vUv.x * 12.0 + uTime * 0.55) * 0.5 + 0.5;
      float topCone = smoothstep(0.20, 0.95, vUv.y) * smoothstep(0.45, 0.05, abs(vUv.x - 0.5));
      col += vec3(0.22, 0.16, 0.04) * shaft * topCone * uAbyss * motion;
    }

    if (uCosmos > 0.01) {
      col = mix(col, col * uNafsuTint + uNafsuTint * 0.05, uCosmos * 0.65);
    }

    if (uDawn > 0.01) {
      float ray = smoothstep(0.85, 0.05, distance(vUv, vec2(0.72, 0.82)));
      col += vec3(0.18, 0.13, 0.03) * ray * (0.8 + 0.2 * sin(uTime * 1.1)) * uDawn * motion;
    }

    float emberWeight = max(uNightmare * 0.7, max(uAstina * 0.45, max(uAbyss * 0.7, max(uCosmos, max(uDawn * 0.7, uCaveCleared * uForest)))));
    if (emberWeight > 0.02 && motion > 0.5) {
      vec2 eUv = vUv;
      eUv.y -= uTime * 0.06;
      eUv.x += sin(uTime * 0.9 + vUv.y * 5.0) * 0.015;
      vec2 grid = floor(eUv * vec2(26.0, 16.0));
      vec2 f = fract(eUv * vec2(26.0, 16.0));
      float rnd = hash(grid);
      if (rnd > 0.86) {
        vec2 center = vec2(fract(rnd * 17.3), fract(rnd * 41.9)) * 0.6 + 0.2;
        float dotSpark = smoothstep(0.14, 0.01, distance(f, center));
        float twinkle = 0.5 + 0.5 * sin(uTime * 3.0 + rnd * 20.0);
        col += vec3(1.0, 0.86, 0.42) * dotSpark * twinkle * emberWeight * 0.55;
      }
    }

    float distCenter = distance(vUv, vec2(0.5, 0.5));
    float vigEdge = smoothstep(0.45 - uVignetteTight * 0.18, 0.88 - uVignetteTight * 0.22, distCenter);
    col = mix(col, vec3(0.02, 0.012, 0.008), vigEdge * (0.42 + uVignetteTight * 0.42));

    col *= 1.0 - 0.55 * uFocusDim;

    // Sorot (hover) pada zona latar yang bisa diketuk.
    if (uPick > 0.01) {
      vec2 pd = (uv - uPickArea.xy) / max(uPickArea.zw, vec2(0.001));
      float pr = length(pd);
      float inside = 1.0 - smoothstep(0.75, 1.0, pr);
      float ring = smoothstep(0.88, 0.96, pr) * (1.0 - smoothstep(0.96, 1.04, pr));
      col = mix(col, col * 1.32 + vec3(0.12, 0.09, 0.02), inside * uPick);
      col += vec3(1.0, 0.86, 0.38) * ring * 0.45 * uPick;
    }

    gl_FragColor = vec4(col, 1.0);
  }
`;

const CHAR_BIMA_FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uTex;
  uniform float uTime;
  uniform float uAlpha;
  uniform float uFlipX;
  uniform float uSlash;
  uniform float uWalkFreq;
  uniform float uWalkTime;
  uniform float uWalkAmp;
  uniform float uDarken;
  uniform float uClawGlow;
  uniform float uLightning;
  uniform float uMistFade;
  uniform float uReduced;
  varying vec2 vUv;
  ${RIG_GLSL}

  void main() {
    vec2 vUv0 = (vUv - 0.5) * (1.0 + 2.0 * uRigPad) + 0.5;
    if (uAlpha < 0.01) discard;
    float motion = 1.0 - uReduced;

    float upperMask = smoothstep(0.08, 0.85, vUv0.y);
    float legMask   = smoothstep(0.45, 0.02, vUv0.y);
    float breath = sin(uTime * 1.85) * 0.008 * upperMask * motion;
    float sway = cos(uTime * 1.15) * 0.005 * upperMask * motion;

    // Smooth C1 sinusoidal stride rise-and-fall (no sharp abs(sin) cusp bounce)
    float stepWave = 0.5 - 0.5 * cos(2.0 * uWalkTime * uWalkFreq);
    float strideBob = stepWave * 0.011 * uWalkAmp * motion * step(0.1, uWalkFreq);
    float strideSwing = sin(uWalkTime * uWalkFreq) * 0.010 * legMask * uWalkAmp * motion * step(0.1, uWalkFreq);

    vec2 baseUv = vUv0;
    baseUv.y -= breath + strideBob;
    baseUv.x -= sway + strideSwing;
    baseUv.x -= uSlash * 0.04 * upperMask * (uFlipX > 0.5 ? -1.0 : 1.0);

    vec2 uv = uFlipX > 0.5 ? vec2(1.0 - baseUv.x, baseUv.y) : baseUv;
    uv = rigPose(uv);

    float clothZone = smoothstep(0.58, 0.12, uv.x) * smoothstep(0.14, 0.38, uv.y) * smoothstep(0.66, 0.36, uv.y);
    uv.x -= sin(uTime * 5.2 + uv.y * 16.0) * 0.009 * clothZone * motion;

    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) discard;
    vec4 tex = texture2D(uTex, uv);
    if (tex.a < 0.02) discard;

    vec3 col = tex.rgb;
    float clawDist = distance(uv, vec2(0.80, 0.39));
    float clawPulse = 0.55 + 0.45 * sin(uTime * 4.5);
    col += vec3(1.0, 0.88, 0.35) * smoothstep(0.18, 0.01, clawDist) * (uClawGlow * 0.32 * clawPulse + uSlash * 0.9);
    col += vec3(0.95, 0.85, 0.55) * uLightning * 0.22;
    col *= (1.0 - clamp(uDarken, 0.0, 0.85));

    float footFade = mix(1.0, smoothstep(0.01, 0.10, vUv0.y), uMistFade);
    gl_FragColor = vec4(col, tex.a * footFade * uAlpha);
  }
`;

const CHAR_SIMPLE_FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uTex;
  uniform float uTime;
  uniform float uAlpha;
  uniform float uFlipX;
  uniform float uHover;
  uniform float uHalo;
  uniform float uFlash;
  uniform float uMistFade;
  uniform float uReduced;
  uniform float uPick;
  varying vec2 vUv;
  ${RIG_GLSL}

  void main() {
    vec2 vUv0 = (vUv - 0.5) * (1.0 + 2.0 * uRigPad) + 0.5;
    if (uAlpha < 0.01) discard;
    float motion = 1.0 - uReduced;

    float upperMask = smoothstep(0.08, 0.85, vUv0.y);
    float breath = sin(uTime * 1.9 + 1.2) * 0.009 * upperMask * motion;
    vec2 baseUv = vUv0;
    baseUv.y -= breath;

    float robeMask = smoothstep(0.55, 0.05, baseUv.y);
    baseUv.x += sin(uTime * 3.1 + baseUv.y * 12.0) * 0.006 * robeMask * uHover * motion;

    vec2 uv = uFlipX > 0.5 ? vec2(1.0 - baseUv.x, baseUv.y) : baseUv;
    uv = rigPose(uv);
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) discard;
    vec4 tex = texture2D(uTex, uv);

    float aura = 0.0;
    if (uHalo > 0.01) {
      float d = length((vUv0 - vec2(0.5, 0.52)) * vec2(1.1, 0.85));
      float pulse = 0.78 + 0.22 * sin(uTime * 2.4);
      float edgeSoft = smoothstep(0.0, 0.24, vUv0.x) * smoothstep(1.0, 0.76, vUv0.x) *
                       smoothstep(0.0, 0.14, vUv0.y) * smoothstep(1.0, 0.86, vUv0.y);
      aura = smoothstep(0.46, 0.14, d) * edgeSoft * 0.55 * pulse * uHalo;
    }

    if (tex.a < 0.02 && aura < 0.01) discard;

    vec3 glowCol = vec3(0.95, 0.84, 0.36);
    vec3 col = mix(glowCol, tex.rgb, tex.a);
    col = mix(col, vec3(1.0, 0.94, 0.65), uFlash * 0.65);

    // Sorot (hover): tokoh yang bisa diketuk menyala keemasan dengan tepi bercahaya.
    float pickRim = 0.0;
    if (uPick > 0.01) {
      vec2 px = vec2(0.006, 0.004);
      float edgeA = texture2D(uTex, uv + vec2(px.x, 0.0)).a + texture2D(uTex, uv - vec2(px.x, 0.0)).a +
                    texture2D(uTex, uv + vec2(0.0, px.y)).a + texture2D(uTex, uv - vec2(0.0, px.y)).a;
      pickRim = clamp(edgeA * 0.25 - tex.a, 0.0, 1.0) + (1.0 - smoothstep(0.0, 0.9, tex.a)) * tex.a;
      col = mix(col, col * 1.18 + vec3(0.10, 0.08, 0.02), uPick);
      col = mix(col, vec3(1.0, 0.9, 0.45), pickRim * uPick);
    }

    float outAlpha = max(max(tex.a, aura), pickRim * uPick);
    float footFade = mix(1.0, smoothstep(0.01, 0.10, vUv0.y), uMistFade);
    gl_FragColor = vec4(col, outAlpha * footFade * uAlpha);
  }
`;

const CHAR_NAGA_FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uTex;
  uniform float uTime;
  uniform float uAlpha;
  uniform float uHit;
  uniform float uLightning;
  uniform float uReduced;
  varying vec2 vUv;
  ${RIG_GLSL}

  void main() {
    vec2 vUv0 = (vUv - 0.5) * (1.0 + 2.0 * uRigPad) + 0.5;
    if (uAlpha < 0.01) discard;
    float motion = 1.0 - uReduced;

    float bodyWaveWeight = smoothstep(0.06, 0.90, vUv0.x);
    float headBob = sin(uTime * 2.0) * 0.012 * (1.0 - bodyWaveWeight) * motion;
    float slitherY = sin(vUv0.x * 10.5 - uTime * 2.8) * (0.011 + 0.022 * bodyWaveWeight) * motion;
    float slitherX = cos(vUv0.y * 8.0 - uTime * 2.2) * (0.006 + 0.014 * bodyWaveWeight) * motion;
    float hitRipple = sin(vUv0.x * 26.0 + uTime * 25.0) * 0.018 * uHit;

    vec2 uv = rigPose(vUv0) + vec2(slitherX + hitRipple, slitherY + headBob);
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) discard;

    vec4 tex = texture2D(uTex, uv);
    if (tex.a < 0.02) discard;

    vec3 col = tex.rgb;
    float eyeDist = distance(uv, vec2(0.11, 0.79));
    float eyePulse = 0.65 + 0.35 * sin(uTime * 3.8);
    col += vec3(1.0, 0.72, 0.15) * smoothstep(0.055, 0.005, eyeDist) * eyePulse * 0.95;
    col += vec3(0.95, 0.85, 0.55) * uLightning * 0.22;
    col = mix(col, vec3(1.0, 0.94, 0.65), uHit * 0.75);

    float waterBlend = smoothstep(0.0, 0.12, vUv0.y);
    gl_FragColor = vec4(col, tex.a * waterBlend * uAlpha);
  }
`;

interface RigBone {
  pivot: [number, number];
  a: [number, number];
  b: [number, number];
  radius: number;
  falloff: number;
}

interface RigDef {
  size: [number, number];
  pad: number;
  bones: RigBone[];
}

// Ruang kosong di sekeliling tekstur agar lengan yang berayun tidak terpotong tepi mesh.
const RIG_PAD = 0.14;
const RIG_PAD_K = 1 + 2 * RIG_PAD;

// Tulang: [0] badan, [1] lengan bawah + Kuku Pancanaka, [2] kepala
const BIMA_RIG: RigDef = {
  size: [388, 571],
  pad: RIG_PAD,
  bones: [
    { pivot: [215, 320], a: [215, 250], b: [215, 80], radius: 95, falloff: 50 },
    { pivot: [300, 282], a: [318, 302], b: [362, 392], radius: 24, falloff: 14 },
    { pivot: [228, 150], a: [225, 120], b: [210, 30], radius: 55, falloff: 35 },
  ],
};

// Tulang: [0] badan + gada, [1] kepala
const RAKSASA_RIG: RigDef = {
  size: [640, 572],
  pad: RIG_PAD,
  bones: [
    { pivot: [300, 320], a: [300, 250], b: [180, 120], radius: 150, falloff: 90 },
    { pivot: [300, 190], a: [290, 160], b: [240, 90], radius: 60, falloff: 40 },
  ],
};

// Tulang: [0] leher + kepala, [1] rahang bawah, [2] ekor
const NAGA_RIG: RigDef = {
  size: [937, 572],
  pad: RIG_PAD,
  bones: [
    { pivot: [200, 330], a: [160, 250], b: [90, 120], radius: 95, falloff: 55 },
    { pivot: [85, 145], a: [60, 175], b: [25, 200], radius: 40, falloff: 18 },
    { pivot: [790, 330], a: [790, 250], b: [880, 90], radius: 70, falloff: 60 },
  ],
};

const NO_RIG: RigDef = { size: [1, 1], pad: 0, bones: [] };

// Layar HP (tegak) terlalu sempit untuk dua tokoh ukuran penuh: tokoh dikecilkan,
// diletakkan di tepi kiri/kanan, dan kakinya berhenti di atas panel pilihan.
const MOB_DUO_H = 0.74;
const MOB_FEET_Y = -0.49;
const MOB_DUO_Y = MOB_FEET_Y + MOB_DUO_H / 2;

const rigUniforms = (rig: RigDef): Record<string, THREE.IUniform> => ({
  uRigSize: { value: new THREE.Vector2(...rig.size) },
  uRigPad: { value: rig.pad },
  uBoneSeg: {
    value: [0, 1, 2].map((i) => {
      const b = rig.bones[i];
      return b ? new THREE.Vector4(b.a[0], b.a[1], b.b[0], b.b[1]) : new THREE.Vector4(0, 0, 1, 1);
    }),
  },
  uBonePivot: {
    value: [0, 1, 2].map((i) => {
      const b = rig.bones[i];
      return b ? new THREE.Vector4(b.pivot[0], b.pivot[1], b.radius, b.falloff) : new THREE.Vector4(0, 0, 1, 1);
    }),
  },
  uBoneAng: { value: [0, 0, 0] },
});

// Suara narator dari browser (Web Speech API). Diam saja bila tak tersedia.
const speakLine = (text: string, onEnd?: () => void) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return;
  }
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'id-ID';
  u.rate = 0.95;
  u.pitch = 0.85;
  const voice = synth.getVoices().find((v) => v.lang.toLowerCase().startsWith('id'));
  if (voice) u.voice = voice;
  if (onEnd) u.onend = () => onEnd();
  synth.speak(u);
};

const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
};

// ─────────────────────────────────────────────────────────────────────────────
// WAYANG POTONGAN: tokoh tersusun dari bagian terpisah yang berputar pada sendinya
// Angka dalam piksel kanvas gambar asli (y ke bawah). Sumber: docs/aset-wayang-potongan.md
// ─────────────────────────────────────────────────────────────────────────────

interface PuppetPartDef {
  file: string;
  /** Kotak bagian di kanvas asli */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Titik putar (sendi) di kanvas asli; null = tidak berputar */
  pivot: [number, number] | null;
  parent: string | null;
  z: number;
}

interface PuppetDef {
  size: [number, number];
  parts: Record<string, PuppetPartDef>;
}

const PARTS_DIR = '/images/stories/dewa-ruci/parts';

const BIMA_PUPPET: PuppetDef = {
  size: [388, 571],
  parts: {
    badan: { file: 'bima-badan.png', x: 10.59, y: 114.61, w: 352.32, h: 454.34, pivot: [215, 320], parent: null, z: 0 },
    'lengan-kiri-atas': { file: 'bima-lengan-kiri-atas.png', x: 51.84, y: 139.7, w: 102.57, h: 112.61, pivot: [112, 168], parent: 'badan', z: 1 },
    'lengan-kiri-bawah': { file: 'bima-lengan-kiri-bawah.png', x: 50.73, y: 232.24, w: 59.65, h: 122.09, pivot: [84, 248], parent: 'lengan-kiri-atas', z: 2 },
    'lengan-kanan-atas': { file: 'bima-lengan-kanan-atas.png', x: 236.93, y: 158.65, w: 75.82, h: 102.57, pivot: [262, 176], parent: 'badan', z: 3 },
    'lengan-kanan-bawah': { file: 'bima-lengan-kanan-bawah.png', x: 254.21, y: 236.14, w: 125.43, h: 175.05, pivot: [290, 252], parent: 'lengan-kanan-atas', z: 4 },
    kepala: { file: 'bima-kepala.png', x: 132.92, y: 9.36, w: 124.95, h: 187.74, pivot: [228, 150], parent: 'badan', z: 5 },
  },
};

const NAGA_PUPPET: PuppetDef = {
  size: [937, 572],
  parts: {
    badan: { file: 'naga-badan.png', x: 0, y: 0, w: 937, h: 572, pivot: null, parent: null, z: 0 },
    kepala: { file: 'naga-kepala.png', x: 8.15, y: 5.81, w: 368.7, h: 417.61, pivot: [200, 300], parent: 'badan', z: 1 },
  },
};

const PUPPET_FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uTex;
  uniform float uAlpha;
  uniform float uFlash;
  uniform float uLightning;
  uniform float uDarken;
  uniform float uPick;
  varying vec2 vUv;
  void main() {
    vec4 tex = texture2D(uTex, vUv);
    if (tex.a < 0.02 || uAlpha < 0.01) discard;
    vec3 col = tex.rgb;
    col += vec3(0.95, 0.85, 0.55) * uLightning * 0.22;
    col = mix(col, vec3(1.0, 0.94, 0.65), uFlash * 0.7);
    col = mix(col, col * 1.18 + vec3(0.10, 0.08, 0.02), uPick);
    col = mix(col, vec3(1.0, 0.9, 0.45), (1.0 - smoothstep(0.35, 0.95, tex.a)) * uPick);
    col *= (1.0 - clamp(uDarken, 0.0, 0.85));
    gl_FragColor = vec4(col, tex.a * uAlpha);
  }
`;

interface PuppetHandle {
  root: THREE.Group;
  joints: Record<string, THREE.Group>;
  uniforms: Record<string, THREE.IUniform>;
  dispose: () => void;
}

/**
 * Menyusun wayang potongan sebagai hierarki grup Three.js.
 * Koordinat lokal: kanvas asli dinormalisasi ke kotak 1×1 berpusat di (0,0), y ke atas,
 * sehingga wayang bisa ditempel di dalam mesh lama (yang sudah punya skala/posisi/flip).
 */
function buildPuppet(def: PuppetDef, loadTex: (url: string) => THREE.Texture, renderOrder: number): PuppetHandle {
  const [W, H] = def.size;
  const toLocal = (px: number, py: number) => new THREE.Vector2(px / W - 0.5, 0.5 - py / H);
  const uniforms: Record<string, THREE.IUniform> = {
    uAlpha: { value: 1 },
    uFlash: { value: 0 },
    uLightning: { value: 0 },
    uDarken: { value: 0 },
    uPick: { value: 0 },
  };
  const root = new THREE.Group();
  const joints: Record<string, THREE.Group> = {};
  const disposables: Array<{ dispose: () => void }> = [];
  const names = Object.keys(def.parts).sort((a, b) => def.parts[a].z - def.parts[b].z);

  for (const name of names) {
    const part = def.parts[name];
    const joint = new THREE.Group();
    const pivot = part.pivot ?? [part.x + part.w / 2, part.y + part.h / 2];
    const pivotLocal = toLocal(pivot[0], pivot[1]);
    const parent = part.parent ? joints[part.parent] : null;
    const parentPivot = part.parent && def.parts[part.parent].pivot
      ? toLocal(...(def.parts[part.parent].pivot as [number, number]))
      : null;
    if (parent && parentPivot) {
      joint.position.set(pivotLocal.x - parentPivot.x, pivotLocal.y - parentPivot.y, 0);
      parent.add(joint);
    } else {
      joint.position.set(pivotLocal.x, pivotLocal.y, 0);
      root.add(joint);
    }
    joints[name] = joint;

    const tex = loadTex(`${PARTS_DIR}/${part.file}`);
    const geo = new THREE.PlaneGeometry(part.w / W, part.h / H);
    const mat = new THREE.ShaderMaterial({
      uniforms: { ...uniforms, uTex: { value: tex } },
      vertexShader: COMMON_VERT,
      fragmentShader: PUPPET_FRAG,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });
    // uniform bersama: semua bagian berbagi objek uniform yang sama
    for (const key of Object.keys(uniforms)) mat.uniforms[key] = uniforms[key];
    const mesh = new THREE.Mesh(geo, mat);
    const center = toLocal(part.x + part.w / 2, part.y + part.h / 2);
    mesh.position.set(center.x - pivotLocal.x, center.y - pivotLocal.y, 0);
    mesh.renderOrder = renderOrder + part.z;
    joint.add(mesh);
    disposables.push(geo, mat, tex);
  }

  return { root, joints, uniforms, dispose: () => disposables.forEach((d) => d.dispose()) };
}

const smoothEnv = (x: number, a: number, b: number) => {
  const k = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1);
  return k * k * (3 - 2 * k);
};

// ─────────────────────────────────────────────────────────────────────────────
// DIALOGUE SCRIPT & STORY DATA
// ─────────────────────────────────────────────────────────────────────────────

type SceneId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type AttitudeChoice = 'patuh' | 'waspada' | null;
type AnomanChoice = 'hormat' | 'teguh' | null;
type SeaChoice = 'hening' | 'terjang' | null;
type WaterGuess = 'laut' | 'diri' | null;

interface BubbleLine {
  speaker: string;
  side: 'left' | 'right' | 'center';
  text: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// OBJEK TIMBUL: potongan objek dari lukisan latar yang "terangkat" saat harus diketuk.
// box = [x, y, w, h] dalam piksel gambar latar 1024×572 (lihat public/images/stories/dewa-ruci/pop/).
// ─────────────────────────────────────────────────────────────────────────────

const POP_DIR = '/images/stories/dewa-ruci/pop';
const POP_BG_SIZE: [number, number] = [1024, 572];
const POP_OBJECTS = {
  padepokan: { file: 'padepokan.png', box: [684, 132, 128, 88] },
  gua: { file: 'gua.png', box: [431, 139, 321, 334] },
  ombak: { file: 'ombak.png', box: [610, 167, 342, 332] },
  pintu: { file: 'pintu.png', box: [393, 261, 241, 155] },
  'bima-pamitan': { file: 'bima-pamitan.png', box: [615, 24, 227, 483] },
  'bima-drona': { file: 'bima-drona.png', box: [571, 46, 284, 455] },
} as const;
type PopObjectId = keyof typeof POP_OBJECTS;

// Objek timbul: diterangi keemasan, tepi bercahaya (rim) dan bayangan jatuh di belakangnya.
const POP_FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uTex;
  uniform float uLift;
  uniform float uShadow;
  varying vec2 vUv;
  void main() {
    vec4 tex = texture2D(uTex, vUv);
    // Tepi emas tebal: ambil alpha di 8 arah sejauh ~1.4% ukuran objek.
    float around = 0.0;
    for (int i = 0; i < 8; i++) {
      float ang = float(i) * 0.785398;
      around = max(around, texture2D(uTex, vUv + vec2(cos(ang), sin(ang)) * 0.014).a);
    }
    float rim = clamp(around - tex.a, 0.0, 1.0);
    if (uShadow > 0.5) {
      // lapisan bayangan: siluet gelap lembut
      if (tex.a < 0.02) discard;
      gl_FragColor = vec4(0.0, 0.0, 0.0, max(tex.a, around * 0.6) * 0.75 * uLift);
      return;
    }
    if (tex.a < 0.02 && rim < 0.02) discard;
    vec3 col = tex.rgb * (1.0 + 0.45 * uLift) + vec3(0.09, 0.07, 0.02) * uLift;
    col = mix(col, vec3(1.0, 0.86, 0.36), rim * min(1.0, uLift * 1.3));
    gl_FragColor = vec4(col, max(tex.a, rim * uLift));
  }
`;

interface PopHandle {
  group: THREE.Group;
  card: THREE.Mesh;
  shadow: THREE.Mesh;
  uniforms: Record<string, THREE.IUniform>;
  shadowUniforms: Record<string, THREE.IUniform>;
  /** Pusat & ukuran objek dalam koordinat gambar latar (0..1) */
  u: number;
  v: number;
  w: number;
  h: number;
  dispose: () => void;
}

interface SimpleSpriteHandle {
  mesh: THREE.Mesh;
  uniforms: Record<string, THREE.IUniform>;
  geo: THREE.PlaneGeometry;
  mat: THREE.ShaderMaterial;
}

const PROLOG_INTRO = [
  {
    id: 'siapa',
    tab: '1. Siapa Bima?',
    title: 'Ksatria Lugas yang Merasa Hampa',
    body: 'Werkudara (Bima) bukan pemikir rumit. Tubuhnya besar, bicaranya blak-blakan tanpa bahasa istana, dan ia tak pernah tunduk pada siapa pun—kecuali ibu dan gurunya. Namun jauh di dalam hati, ia resah: untuk apa sebenarnya hidupku ini?',
  },
  {
    id: 'konflik',
    tab: '2. Mengapa Dijebak?',
    title: 'Mimpi Buruk Astina & Dilema Sang Guru',
    body: 'Di Kerajaan Astina, Prabu Duryudana terus bermimpi dibunuh Bima dalam perang saudara kelak. Didorong bisikan Patih Sangkuni, Duryudana memaksa Resi Drona—guru perang Pandawa sekaligus Kurawa—menyingkirkan Bima lewat perintah maut.',
  },
  {
    id: 'tujuan',
    tab: '3. Apa yang Dicari?',
    title: 'Sangkan Paraning Dumadi',
    body: 'Ilmu ini bukan kesaktian bertarung, melainkan pengetahuan tentang dari mana manusia berasal dan ke mana tujuannya pulang. Drona menyuruh Bima mencarinya lewat "air suci" yang tersembunyi.',
  },
] as const;

// Satu pertanyaan yang memandu penonton sepanjang lakon.
const CORE_QUESTION = 'Di mana sebenarnya "air suci" yang dicari Bima?';

// Petunjuk yang terkumpul di sepanjang perjalanan, menjawab CORE_QUESTION.
const CLUES = [
  { scene: 'Gua Candramuka', text: 'Kayu sakti yang dicari ternyata raga dan napas Bima sendiri.' },
  { scene: 'Jalan Selatan', text: 'Guru hanya menunjuk jalan; langkah dan tekad tetap milik Bima.' },
  { scene: 'Laut Kidul', text: 'Makin panik melawan, makin terbelit. Saat tenang, belitan putus.' },
] as const;


const NAFSU_COLORS = [
  {
    id: 'hitam',
    label: 'Hitam · Aluamah',
    swatch: 'bg-[#1c1917] border-[#78716c]',
    meaning: 'Nafsu ragawi: lapar, haus, lelah, dan kenyamanan. Menjaga hidup, tapi menumpulkan batin bila diperturutkan.',
  },
  {
    id: 'merah',
    label: 'Merah · Amarah',
    swatch: 'bg-[#7f1d1d] border-[#ef4444]',
    meaning: 'Gejolak emosi dan harga diri. Liar bila meledak, namun menjadi keberanian membela kebenaran saat dikendalikan.',
  },
  {
    id: 'kuning',
    label: 'Kuning · Supiah',
    swatch: 'bg-[#a16207] border-[#dedf42]',
    meaning: 'Hasrat keindahan, pujian, dan kesenangan dunia. Penggerak karya manusia asal tak membuat silau oleh kemewahan.',
  },
  {
    id: 'putih',
    label: 'Putih · Mutmainah',
    swatch: 'bg-[#f4e7cd] border-white',
    meaning: 'Ketenangan nurani, keikhlasan, dan welas asih—kompas yang menyatukan jiwa dengan Pencipta (Manunggaling Kawula Gusti).',
  },
] as const;

interface PlakatKayonButtonProps {
  numeral: string;
  quote: string;
  stance: string;
  selected?: boolean;
  reminding?: boolean;
  onClick: () => void;
}

function PlakatKayonButton({
  numeral,
  quote,
  stance,
  selected = false,
  reminding = false,
  onClick,
}: PlakatKayonButtonProps) {
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement | null>(null);
  const sheenRef = useRef<HTMLSpanElement | null>(null);
  const diamondRef = useRef<HTMLSpanElement | null>(null);

  const handleClick = () => {
    if (!reduceMotion) {
      if (frameRef.current) {
        frameRef.current.getAnimations().forEach((a) => a.cancel());
        frameRef.current.animate(
          [
            { transform: 'skewX(-11deg) scale(1)' },
            { transform: 'skewX(-11deg) scale(0.965)', offset: 0.2 },
            { transform: 'skewX(-11deg) scale(1.03)', offset: 0.58 },
            { transform: 'skewX(-11deg) scale(1)' },
          ],
          { duration: 400, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
        );
      }
      if (sheenRef.current) {
        sheenRef.current.getAnimations().forEach((a) => a.cancel());
        sheenRef.current.animate(
          [
            { transform: 'translateX(-110%)', opacity: 0 },
            { transform: 'translateX(-10%)', opacity: 1, offset: 0.35 },
            { transform: 'translateX(120%)', opacity: 0 },
          ],
          { duration: 440, easing: 'ease-out' }
        );
      }
      if (diamondRef.current) {
        diamondRef.current.getAnimations().forEach((a) => a.cancel());
        diamondRef.current.animate(
          [
            { transform: 'rotate(45deg) scale(1)' },
            { transform: 'rotate(45deg) scale(1.26)', offset: 0.45 },
            { transform: 'rotate(45deg) scale(1)' },
          ],
          { duration: 400, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
        );
      }
    }
    onClick();
  };

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={handleClick}
      className="group pointer-events-auto relative w-full px-2.5 sm:px-3 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dedf42] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050303] rounded-sm"
    >
      <div
        ref={frameRef}
        className={`relative flex items-stretch overflow-hidden skew-x-[-11deg] border transition-all duration-300 ease-out ${
          selected
            ? 'border-[#f7e29c] bg-gradient-to-r from-[#d9a441] via-[#dedf42] to-[#d9a441] shadow-[0_10px_28px_rgba(217,164,65,0.42)]'
            : reminding
              ? 'border-[#dedf42] bg-gradient-to-r from-[#281808]/98 via-[#3a220c]/95 to-[#1f1207]/98 backdrop-blur-md shadow-[0_0_32px_rgba(222,223,66,0.48)]'
              : 'border-[#d9a441]/55 bg-gradient-to-r from-[#160d06]/95 via-[#241509]/92 to-[#120a04]/95 backdrop-blur-md shadow-[0_10px_26px_rgba(0,0,0,0.88)] group-hover:border-[#dedf42] group-hover:shadow-[0_12px_30px_rgba(217,164,65,0.26)]'
        }`}
      >
        <span
          aria-hidden="true"
          className={`w-1.5 shrink-0 transition-colors duration-300 ${
            selected
              ? 'bg-[#1c0f07]'
              : reminding
                ? 'bg-[#dedf42]'
                : 'bg-[#d9a441] group-hover:bg-[#dedf42]'
          }`}
        />

        {!selected && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#fff0b3]/14 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out motion-reduce:hidden"
          />
        )}

        <span
          ref={sheenRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/55 to-transparent -translate-x-full opacity-0 motion-reduce:hidden"
        />

        <div className="relative z-10 flex w-full items-center justify-between gap-3 skew-x-[11deg] px-3.5 sm:px-4.5 py-2 sm:py-2.5">
          <div className="flex items-center gap-3 min-w-0">
            <span
              ref={diamondRef}
              className={`relative flex size-6 shrink-0 items-center justify-center rotate-45 border transition-all duration-300 motion-reduce:transition-none ${
                selected
                  ? 'border-[#1c0f07] bg-[#1c0f07] text-[#dedf42]'
                  : reminding
                    ? 'border-[#dedf42] bg-[#dedf42]/30 text-[#fcf8ec]'
                    : 'border-[#d9a441]/80 bg-[#d9a441]/12 text-[#e8c668] group-hover:border-[#dedf42] group-hover:bg-[#dedf42] group-hover:text-[#1c0f07] group-hover:rotate-[135deg]'
              }`}
            >
              <span className="-rotate-45 group-hover:-rotate-[135deg] transition-transform duration-300 motion-reduce:transition-none font-serif text-[11px] font-bold leading-none">
                {numeral}
              </span>
            </span>

            <span
              className={`font-serif italic font-medium text-[13px] sm:text-[15px] leading-snug ${
                selected
                  ? 'text-[#1c0f07] font-semibold'
                  : 'text-[#fcf8ec] group-hover:text-white'
              }`}
            >
              {quote}
            </span>
          </div>

          <span className="flex items-center gap-1.5 shrink-0">
            <span
              className={`hidden sm:inline-block font-sans text-[10px] font-bold uppercase tracking-[0.16em] transition-colors ${
                selected
                  ? 'text-[#1c0f07]/85'
                  : 'text-[#d9a441]/90 group-hover:text-[#dedf42]'
              }`}
            >
              {stance}
            </span>
            <ChevronRight
              className={`size-4 transition-transform duration-200 group-hover:translate-x-0.5 ${
                selected
                  ? 'text-[#1c0f07]'
                  : 'text-[#d9a441] group-hover:text-[#dedf42]'
              }`}
            />
          </span>
        </div>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface HotspotProps {
  id: string;
  label: string;
  hint: string;
  onActivate: () => void;
  registerRef: (id: string, el: HTMLElement | null) => void;
  disabled?: boolean;
  size?: 'md' | 'lg';
}

/**
 * Titik sentuh di atas objek cerita (pintu, gua, raksasa, telinga, dsb).
 * Posisinya diperbarui setiap frame oleh render loop agar menempel pada objek kanvas.
 */
function Hotspot({ id, label, hint, onActivate, registerRef, disabled = false }: HotspotProps) {
  // Penanda "ketuk di sini": tangan memantul + label, di atas objek yang sedang timbul.
  return (
    <motion.button
      type="button"
      ref={(el) => registerRef(id, el)}
      onClick={disabled ? undefined : onActivate}
      disabled={disabled}
      aria-label={`${label}: ${hint}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: disabled ? 0 : 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{ left: '50%', top: '50%' }}
      className="group pointer-events-auto fixed z-[25] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 cursor-pointer focus:outline-none"
    >
      <span className="hotspot-tap relative flex size-12 sm:size-14 items-center justify-center rounded-full border-2 border-[#dedf42] bg-[#120a05]/80 text-[#dedf42] shadow-[0_0_24px_rgba(222,223,66,0.55)] backdrop-blur-sm transition-colors group-hover:bg-[#dedf42] group-hover:text-[#1c0f07] group-focus-visible:bg-[#dedf42] group-focus-visible:text-[#1c0f07]">
        <span className="absolute inset-0 rounded-full border-2 border-[#dedf42]/70 animate-ping motion-reduce:animate-none" />
        <Hand className="relative size-5 sm:size-6 -rotate-12" />
      </span>
      <span className="pointer-events-none whitespace-nowrap max-w-[78vw] overflow-hidden text-ellipsis text-center rounded-full border border-[#dedf42] bg-[#dedf42] px-3.5 py-1 font-sans text-[11px] sm:text-xs font-bold text-[#1c0f07] shadow-[0_6px_18px_rgba(0,0,0,0.6)]">
        {label}
      </span>
    </motion.button>
  );
}

export default function DewaRuciLivingStage() {
  const reduceMotion = useReducedMotion();
  const canvasHostRef = useRef<HTMLDivElement | null>(null);
  const curtainRef = useRef<HTMLDivElement | null>(null);
  // Titik sentuh di atas objek kanvas: posisi layar (dalam %) ditulis render loop tiap frame.
  const hotspotElsRef = useRef<Record<string, HTMLElement | null>>({});
  // Objek yang bisa diketuk saat ini (diisi saat render) dan status sorot kursor (diisi render loop).
  const activeHotspotIdRef = useRef<string | null>(null);
  const activeHotspotActionRef = useRef<(() => void) | null>(null);
  const pointerPxRef = useRef<{ x: number; y: number } | null>(null);
  const hoveringObjectRef = useRef(false);
  const audioRef = useRef<StormSceneAudio | null>(null);

  // Story progression
  const [started, setStarted] = useState(false);
  const [prologStep, setPrologStep] = useState(0);
  const [muted, setMuted] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [activeScene, setActiveScene] = useState<SceneId>(1);
  const [unlockedScene, setUnlockedScene] = useState<SceneId>(3);
  const [localProgress, setLocalProgress] = useState(0);
  // Per-scene dialogue turns & choices
  const [dreamTurn, setDreamTurn] = useState(0);
  const [walkStepDone, setWalkStepDone] = useState(false);
  const [astina1Turn, setAstina1Turn] = useState(0);
  const [attitude, setAttitude] = useState<AttitudeChoice>(null);
  const [enteredCave, setEnteredCave] = useState(false);
  const [caveAngerTried, setCaveAngerTried] = useState(false);
  const [caveCleared, setCaveCleared] = useState(false);
  const [caveCalmStarted, setCaveCalmStarted] = useState(false);
  const caveTimersRef = useRef<number[]>([]);
  const [dewaTurn, setDewaTurn] = useState(0);
  const [astina2Turn, setAstina2Turn] = useState(0);
  const [pamitanTurn, setPamitanTurn] = useState(0);
  const [anomanTurn, setAnomanTurn] = useState(0);
  const [anomanChoice, setAnomanChoice] = useState<AnomanChoice>(null);
  const [jumpedIntoSea, setJumpedIntoSea] = useState(false);
  const [seaChoice, setSeaChoice] = useState<SeaChoice>(null);
  const [nagaHits, setNagaHits] = useState(0);
  const [dewaRuciTurn, setDewaRuciTurn] = useState(0);
  const [enteredGuwa, setEnteredGuwa] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>('putih');
  const [waterGuess, setWaterGuess] = useState<WaterGuess>(null);
  const [cluesOpen, setCluesOpen] = useState(false);
  const [clueToast, setClueToast] = useState<number | null>(null);
  const clueToastTimerRef = useRef<number | null>(null);
  const [finalePhase, setFinalePhase] = useState<'shore' | 'amarta'>('shore');
  const [slashFx, setSlashFx] = useState<{ id: number; x: number; y: number } | null>(null);
  const [meaningOpenScene, setMeaningOpenScene] = useState<number | null>(null);
  const showMeaning = meaningOpenScene === activeScene;
  const [webglReady, setWebglReady] = useState(true);
  const [choiceReminderActive, setChoiceReminderActive] = useState(false);
  const kayonGroupRef = useRef<HTMLDivElement | null>(null);
  const lastReminderAtRef = useRef(0);
  const [pendingSeaChoice, setPendingSeaChoice] = useState<SeaChoice>(null);
  const pendingSceneScrollRef = useRef<number | null>(null);
  const pendingSeaTimerRef = useRef<number | null>(null);
  const reminderTimerRef = useRef<number | null>(null);

  const TOTAL_NAGA_HITS = 3;

  const simRef = useRef({
    localProg: 0,
    scrollVelocity: 0,
    stridePhase: 0,
    pointerX: 0,
    pointerY: 0,
    slash: 0,
    hitFlash: 0,
    angerBounce: 0,
    angerT: -1,
    calmT: -1,
    nagaHitT: -1,
    shake: 0,
    victory: 0,
    diveProg: 0,
    caveEntryProg: 0,
    caveEnterActive: false,
    caveStartP: 0,
    caveEnterElapsed: 0,
    caveWalkAmp: 0,
    pathWalkProg: 0,
    pathEnterActive: false,
    pathStartP: 0,
    pathEnterElapsed: 0,
    bgOffsetX: 0,
    bgOffsetY: 0,
    bgScale: 1,
    zoom: 1.0,
    panX: 0.0,
    vignetteTight: 0.0,
    lightning: 0,
    nextThunderAt: 3.5,
    nightmare: 1,
    astina: 0,
    forest: 0,
    caveCleared: 0,
    storm: 0,
    abyss: 0,
    cosmos: 0,
    dawn: 0,
    aDuryudana: 1,
    aSangkuni: 1,
    sangkuniLean: 0,
    aBimaJalan: 0,
    aDurna: 0,
    durnaShock: 0,
    aBimaStand: 0,
    bimaFlipX: 1,
    aRaksasa: 0,
    aDewaBayu: 0,
    aAnoman: 0,
    aBimaTerjun: 0,
    aNaga: 0,
    aBimaDuduk: 0,
    aDewaRuci: 0,
    bgIndex: 0,
    // Kelir: adegan yang sedang dirender kanvas, dan tirai 0 (terbuka) → 1 (tertutup)
    stageScene: 1 as SceneId,
    curtain: 0,
    curtainClosing: false,
    pick: 0,
    focusDim: 0,
    bgMix: 1,
    tintR: 1.0,
    tintG: 0.96,
    tintB: 0.88,
  });

  const liveRef = useRef({
    activeScene: 1 as SceneId,
    unlockedScene: 3 as SceneId,
    localProgress: 0,
    started: false,
    dreamTurn: 0,
    walkStepDone: false,
    attitude: null as AttitudeChoice,
    enteredCave: false,
    caveCleared: false,
    anomanChoice: null as AnomanChoice,
    jumpedIntoSea: false,
    pendingSeaChoice: null as SeaChoice,
    seaChoice: null as SeaChoice,
    nagaHits: 0,
    enteredGuwa: false,
    finalePhase: 'shore' as 'shore' | 'amarta',
    selectedColor: 'putih',
    waterGuess: null as WaterGuess,
    reduceMotion: Boolean(reduceMotion),
  });

  useEffect(() => {
    liveRef.current = {
      activeScene,
      unlockedScene,
      localProgress,
      started,
      dreamTurn,
      walkStepDone,
      attitude,
      enteredCave,
      caveCleared,
      anomanChoice,
      jumpedIntoSea,
      pendingSeaChoice,
      seaChoice,
      nagaHits,
      enteredGuwa,
      finalePhase,
      selectedColor,
      waterGuess,
      reduceMotion: Boolean(reduceMotion),
    };
  }, [
    activeScene,
    unlockedScene,
    localProgress,
    started,
    dreamTurn,
    walkStepDone,
    attitude,
    enteredCave,
    caveCleared,
    anomanChoice,
    jumpedIntoSea,
    pendingSeaChoice,
    seaChoice,
    nagaHits,
    enteredGuwa,
    finalePhase,
    selectedColor,
    waterGuess,
    reduceMotion,
  ]);

  useEffect(() => {
    return () => {
      if (reminderTimerRef.current) {
        window.clearTimeout(reminderTimerRef.current);
      }
      if (pendingSceneScrollRef.current) {
        window.clearTimeout(pendingSceneScrollRef.current);
      }
      if (pendingSeaTimerRef.current) {
        window.clearTimeout(pendingSeaTimerRef.current);
      }
      if (clueToastTimerRef.current) {
        window.clearTimeout(clueToastTimerRef.current);
      }
      caveTimersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const revealClue = useCallback((idx: number) => {
    setClueToast(idx);
    if (clueToastTimerRef.current) window.clearTimeout(clueToastTimerRef.current);
    clueToastTimerRef.current = window.setTimeout(() => {
      setClueToast(null);
      clueToastTimerRef.current = null;
    }, 4200);
  }, []);

  useEffect(() => {
    setChoiceReminderActive(false);
    if (reminderTimerRef.current) {
      window.clearTimeout(reminderTimerRef.current);
      reminderTimerRef.current = null;
    }
  }, [activeScene, attitude, anomanChoice, seaChoice]);

  const triggerChoiceReminder = useCallback(() => {
    const st = liveRef.current;
    const hasUnanswered =
      (st.activeScene === 3 && !st.attitude) ||
      (st.activeScene === 8 && !st.anomanChoice) ||
      (st.activeScene === 11 && !st.waterGuess) ||
      (st.activeScene === 10 && st.nagaHits < TOTAL_NAGA_HITS && !st.seaChoice && !st.pendingSeaChoice);
    if (!st.started || !hasUnanswered) return;

    const now = Date.now();
    if (now - lastReminderAtRef.current < 600) return;
    lastReminderAtRef.current = now;

    setChoiceReminderActive(true);
    audioRef.current?.playSoftTick();

    if (kayonGroupRef.current && !st.reduceMotion) {
      kayonGroupRef.current.getAnimations().forEach((anim) => anim.cancel());
      kayonGroupRef.current.animate(
        [
          { transform: 'translateX(0px) scale(1)' },
          { transform: 'translateX(-7px) scale(1.045)', offset: 0.16 },
          { transform: 'translateX(7px) scale(1.045)', offset: 0.32 },
          { transform: 'translateX(-5px) scale(1.03)', offset: 0.48 },
          { transform: 'translateX(5px) scale(1.025)', offset: 0.64 },
          { transform: 'translateX(-2px) scale(1.01)', offset: 0.82 },
          { transform: 'translateX(0px) scale(1)' },
        ],
        { duration: 540, easing: 'ease-out' }
      );
    }

    if (reminderTimerRef.current) {
      window.clearTimeout(reminderTimerRef.current);
    }
    reminderTimerRef.current = window.setTimeout(() => {
      setChoiceReminderActive(false);
      reminderTimerRef.current = null;
    }, 2400);
  }, []);


  // ── 1. Unified Multi-Scene WebGL2 Stage ──
  useEffect(() => {
    const host = canvasHostRef.current;
    if (!host) return;
    const markFallback = () => queueMicrotask(() => setWebglReady(false));

    if (typeof window === 'undefined' || !window.WebGL2RenderingContext) {
      markFallback();
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.className = 'block w-full h-full';
    host.appendChild(canvas);

    let gl: WebGL2RenderingContext | null = null;
    try {
      gl = canvas.getContext('webgl2', {
        alpha: false,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      gl = null;
    }

    if (!gl || gl.isContextLost()) {
      markFallback();
      if (host.contains(canvas)) host.removeChild(canvas);
      return;
    }

    try {
      const vh = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT);
      const fh = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
      if (!vh || !fh || typeof vh.precision !== 'number') {
        markFallback();
        if (host.contains(canvas)) host.removeChild(canvas);
        return;
      }
    } catch {
      markFallback();
      if (host.contains(canvas)) host.removeChild(canvas);
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        context: gl,
        alpha: false,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      markFallback();
      if (host.contains(canvas)) host.removeChild(canvas);
      return;
    }

    const w0 = host.clientWidth || window.innerWidth;
    const h0 = host.clientHeight || window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w0, h0, false);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050303);

    const aspect0 = w0 / Math.max(1, h0);
    const camera = new THREE.OrthographicCamera(-aspect0, aspect0, 1, -1, 0.1, 20);
    camera.position.set(0, 0, 8);

    const texLoader = new THREE.TextureLoader();
    const loadTex = (url: string) => {
      const tex = texLoader.load(url);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const bgTextures = [
      loadTex('/images/stories/dewa-ruci/bg-mimpi-duryudana.webp'), // 0
      loadTex('/images/stories/dewa-ruci/bg-padepokan-jalan.webp'), // 1
      loadTex('/images/stories/dewa-ruci/bg-astina.webp'), // 2
      loadTex('/images/stories/dewa-ruci/bg-candramuka.webp'), // 3
      loadTex('/images/stories/dewa-ruci/scene-pamitan-amarta.webp'), // 4
      loadTex('/images/stories/dewa-ruci/bg-tebing-laut-burung.webp'), // 5
      loadTex('/images/stories/dewa-ruci/bg-laut-kidul.webp'), // 6
      loadTex('/images/stories/dewa-ruci/bg-dasar-samudra.webp'), // 7
      loadTex('/images/stories/dewa-ruci/bg-cahaya-jagat.webp'), // 8
      loadTex('/images/stories/dewa-ruci/scene-drona-ditolong.webp'), // 9
      loadTex('/images/stories/dewa-ruci/bg-amarta-pagi.webp'), // 10
    ];

    const texDuryudana = loadTex('/images/stories/dewa-ruci/char-duryudana.png');
    const texSangkuni = loadTex('/images/stories/dewa-ruci/char-sangkuni.png');
    const texBimaJalan = loadTex('/images/stories/dewa-ruci/char-bima-jalan.png');
    const texDurna = loadTex('/images/stories/dewa-ruci/char-durna.png');
    const texBima = loadTex('/images/stories/dewa-ruci/char-bima.png');
    const texRaksasa = loadTex('/images/stories/dewa-ruci/char-raksasa.png');
    const texDewaBayu = loadTex('/images/stories/dewa-ruci/char-dewa-bayu-indra.png');
    const texAnoman = loadTex('/images/stories/dewa-ruci/char-anoman.png');
    const texBimaTerjun = loadTex('/images/stories/dewa-ruci/char-bima-terjun.png');
    const texNaga = loadTex('/images/stories/dewa-ruci/char-naga.png');
    const texBimaDuduk = loadTex('/images/stories/dewa-ruci/char-bima-duduk.png');
    const texDewaRuci = loadTex('/images/stories/dewa-ruci/char-dewa-ruci.png');

    const reducedFlag = reduceMotion ? 1.0 : 0.0;

    const bgUniforms = {
      uTexA: { value: bgTextures[0] },
      uTexB: { value: bgTextures[0] },
      uBgMix: { value: 1 },
      uTime: { value: 0 },
      uZoom: { value: 1 },
      uPanX: { value: 0 },
      uNightmare: { value: 1 },
      uAstina: { value: 0 },
      uForest: { value: 0 },
      uCaveCleared: { value: 0 },
      uStorm: { value: 0 },
      uVictory: { value: 0 },
      uAbyss: { value: 0 },
      uCosmos: { value: 0 },
      uDawn: { value: 0 },
      uVignetteTight: { value: 0 },
      uPickArea: { value: new THREE.Vector4(0.5, 0.5, 0.1, 0.1) },
      uPick: { value: 0 },
      uFocusDim: { value: 0 },
      uNafsuTint: { value: new THREE.Vector3(1.0, 0.96, 0.88) },
      uLightning: { value: 0 },
      uReduced: { value: reducedFlag },
    };
    const bgGeo = new THREE.PlaneGeometry(1, 1);
    const bgMat = new THREE.ShaderMaterial({
      uniforms: bgUniforms,
      vertexShader: COMMON_VERT,
      fragmentShader: SCENE_BG_FRAG,
      depthWrite: false,
    });
    const bgMesh = new THREE.Mesh(bgGeo, bgMat);
    bgMesh.position.z = 0;
    scene.add(bgMesh);

    const makeSimpleSprite = (
      tex: THREE.Texture,
      z: number,
      opts: { hover?: number; halo?: number; mist?: number; flipX?: number; rig?: RigDef } = {}
    ): SimpleSpriteHandle => {
      const uniforms: Record<string, THREE.IUniform> = {
        uTex: { value: tex },
        uTime: { value: 0 },
        uAlpha: { value: 0 },
        uFlipX: { value: opts.flipX ?? 0 },
        uHover: { value: opts.hover ?? 0.5 },
        uHalo: { value: opts.halo ?? 0 },
        uFlash: { value: 0 },
        uMistFade: { value: opts.mist ?? 1 },
        uReduced: { value: reducedFlag },
        ...rigUniforms(opts.rig ?? NO_RIG),
        uPick: { value: 0 },
      };
      const geo = new THREE.PlaneGeometry(1, 1);
      const mat = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: COMMON_VERT,
        fragmentShader: CHAR_SIMPLE_FRAG,
        transparent: true,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.z = z;
      mesh.visible = false;
      scene.add(mesh);
      return { mesh, uniforms, geo, mat };
    };

    const sprDuryudana = makeSimpleSprite(texDuryudana, 1.1, { hover: 0.25 });
    const sprSangkuni = makeSimpleSprite(texSangkuni, 1.2, { hover: 0.4 });
    const sprDurna = makeSimpleSprite(texDurna, 1.1, { hover: 0.45 });
    const sprRaksasa1 = makeSimpleSprite(texRaksasa, 1.3, { hover: 0.35, rig: RAKSASA_RIG });
    const sprRaksasa2 = makeSimpleSprite(texRaksasa, 1.25, { hover: 0.35, rig: RAKSASA_RIG });
    const sprDewaBayu = makeSimpleSprite(texDewaBayu, 1.4, { hover: 0.85, halo: 1.0, mist: 0 });
    const sprAnoman = makeSimpleSprite(texAnoman, 1.3, { hover: 0.65 });
    const sprBimaTerjun = makeSimpleSprite(texBimaTerjun, 2.2, { hover: 1.0, mist: 0 });
    const sprBimaDuduk = makeSimpleSprite(texBimaDuduk, 2.1, { hover: 0.2 });
    const sprDewaRuci = makeSimpleSprite(texDewaRuci, 1.6, { hover: 1.0, halo: 1.0, mist: 0 });

    const bimaStandUniforms: Record<string, THREE.IUniform> = {
      uTex: { value: texBima },
      uTime: { value: 0 },
      uAlpha: { value: 0 },
      uFlipX: { value: 1 },
      uSlash: { value: 0 },
      uWalkFreq: { value: 0 },
      uWalkTime: { value: 0 },
      uWalkAmp: { value: 0 },
      uDarken: { value: 0 },
      uClawGlow: { value: 0.25 },
      uLightning: { value: 0 },
      uMistFade: { value: 1 },
      uReduced: { value: reducedFlag },
      ...rigUniforms(BIMA_RIG),
    };
    const bimaStandGeo = new THREE.PlaneGeometry(1, 1);
    const bimaStandMat = new THREE.ShaderMaterial({
      uniforms: bimaStandUniforms,
      vertexShader: COMMON_VERT,
      fragmentShader: CHAR_BIMA_FRAG,
      transparent: true,
      depthWrite: false,
    });
    const bimaStandMesh = new THREE.Mesh(bimaStandGeo, bimaStandMat);
    bimaStandMesh.position.z = 2.0;
    bimaStandMesh.visible = false;
    scene.add(bimaStandMesh);

    const bimaJalanUniforms = {
      uTex: { value: texBimaJalan },
      uTime: { value: 0 },
      uAlpha: { value: 0 },
      uFlipX: { value: 0 },
      uSlash: { value: 0 },
      uWalkFreq: { value: 3.4 },
      uWalkTime: { value: 0 },
      uWalkAmp: { value: 0 },
      uDarken: { value: 0 },
      uClawGlow: { value: 0.15 },
      uLightning: { value: 0 },
      uMistFade: { value: 1 },
      uReduced: { value: reducedFlag },
      ...rigUniforms(NO_RIG),
    };
    const bimaJalanGeo = new THREE.PlaneGeometry(1, 1);
    const bimaJalanMat = new THREE.ShaderMaterial({
      uniforms: bimaJalanUniforms,
      vertexShader: COMMON_VERT,
      fragmentShader: CHAR_BIMA_FRAG,
      transparent: true,
      depthWrite: false,
    });
    const bimaJalanMesh = new THREE.Mesh(bimaJalanGeo, bimaJalanMat);
    bimaJalanMesh.position.z = 2.05;
    bimaJalanMesh.visible = false;
    scene.add(bimaJalanMesh);

    const nagaUniforms: Record<string, THREE.IUniform> = {
      uTex: { value: texNaga },
      uTime: { value: 0 },
      uAlpha: { value: 0 },
      uHit: { value: 0 },
      uLightning: { value: 0 },
      uReduced: { value: reducedFlag },
      ...rigUniforms(NAGA_RIG),
    };
    const nagaGeo = new THREE.PlaneGeometry(1, 1);
    const nagaMat = new THREE.ShaderMaterial({
      uniforms: nagaUniforms,
      vertexShader: COMMON_VERT,
      fragmentShader: CHAR_NAGA_FRAG,
      transparent: true,
      depthWrite: false,
    });
    const nagaMesh = new THREE.Mesh(nagaGeo, nagaMat);
    nagaMesh.position.z = 1.4;
    nagaMesh.visible = false;
    scene.add(nagaMesh);

    // Wayang potongan menggantikan gambar utuh Bima & Naga. Ditempel sebagai "boneka" di
    // posisi/skala mesh lama (yang ikut bergerak seperti biasa), lalu bagiannya diputar per sendi.
    const bimaPuppet = buildPuppet(BIMA_PUPPET, loadTex, 40);
    const nagaPuppet = buildPuppet(NAGA_PUPPET, loadTex, 20);
    const bimaRig = new THREE.Group();
    const nagaRig = new THREE.Group();
    bimaRig.add(bimaPuppet.root);
    nagaRig.add(nagaPuppet.root);
    bimaRig.position.z = 2.0;
    nagaRig.position.z = 1.4;
    scene.add(bimaRig, nagaRig);

    // Objek timbul: dibuat sekali, dipasang di atas latar, tampil hanya saat menunggu diketuk.
    const pops = {} as Record<PopObjectId, PopHandle>;
    (Object.keys(POP_OBJECTS) as PopObjectId[]).forEach((id) => {
      const def = POP_OBJECTS[id];
      const [bx, by, bw, bh] = def.box;
      const tex = loadTex(`${POP_DIR}/${def.file}`);
      const geo = new THREE.PlaneGeometry(1, 1);
      const uniforms: Record<string, THREE.IUniform> = { uTex: { value: tex }, uLift: { value: 0 }, uShadow: { value: 0 } };
      const shadowUniforms: Record<string, THREE.IUniform> = { uTex: { value: tex }, uLift: { value: 0 }, uShadow: { value: 1 } };
      const mk = (u: Record<string, THREE.IUniform>) =>
        new THREE.ShaderMaterial({ uniforms: u, vertexShader: COMMON_VERT, fragmentShader: POP_FRAG, transparent: true, depthWrite: false, depthTest: false });
      const mat = mk(uniforms);
      const shadowMat = mk(shadowUniforms);
      const card = new THREE.Mesh(geo, mat);
      const shadow = new THREE.Mesh(geo, shadowMat);
      card.renderOrder = 12;
      shadow.renderOrder = 11;
      const group = new THREE.Group();
      group.add(shadow, card);
      group.visible = false;
      group.position.z = 0.5;
      scene.add(group);
      pops[id] = {
        group,
        card,
        shadow,
        uniforms,
        shadowUniforms,
        u: (bx + bw / 2) / POP_BG_SIZE[0],
        v: (by + bh / 2) / POP_BG_SIZE[1],
        w: bw / POP_BG_SIZE[0],
        h: bh / POP_BG_SIZE[1],
        dispose: () => {
          geo.dispose();
          mat.dispose();
          shadowMat.dispose();
          tex.dispose();
        },
      };
    });
    // Aset potongan dibuat dari gambar ber-padding: ukuran mesh lama sudah dikali RIG_PAD_K,
    // jadi boneka dikecilkan kembali agar pas 1:1 dengan gambar asli.
    const PUPPET_IN_RIG = 1 / RIG_PAD_K;

    const baseDims = {
      isMobile: false,
      bimaStandW: 1,
      bimaStandH: 1,
      bimaJalanW: 1,
      bimaJalanH: 1,
      raksasaW: 1,
      bgW: 4.15,
      bgH: 2.32,
      raksasaH: 1,
    };

    let currentAspect = aspect0;
    // Tokoh yang bisa diketuk diperbesar tiap frame dari skala dasarnya; versi layout menandai kapan skala dasar berubah.
    const charBaseScale = new Map<THREE.Object3D, { scale: THREE.Vector3; layoutVersion: number }>();
    let layoutVersion = 0;
    const layoutScene = (w: number, h: number) => {
      layoutVersion += 1;
      const asp = w / Math.max(1, h);
      currentAspect = asp;
      camera.left = -asp;
      camera.right = asp;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();

      const bgAsp = 1024 / 572;
      let bgW = asp * 2 * 1.16;
      let bgH = bgW / bgAsp;
      if (bgH < 2.32) {
        bgH = 2.32;
        bgW = bgH * bgAsp;
      }
      bgMesh.scale.set(bgW, bgH, 1);
      baseDims.bgW = bgW;
      baseDims.bgH = bgH;

      const mob = asp < 1.05;
      baseDims.isMobile = mob;

      const setSz = (mesh: THREE.Mesh, height: number, imgW: number, imgH: number) => {
        mesh.scale.set(height * (imgW / imgH), height, 1);
      };

      setSz(sprDuryudana.mesh, mob ? MOB_DUO_H : 1.32, 281, 572);
      setSz(sprSangkuni.mesh, mob ? MOB_DUO_H * 0.96 : 1.26, 331, 547);
      setSz(sprDurna.mesh, mob ? MOB_DUO_H : 1.30, 435, 562);
      setSz(sprDewaBayu.mesh, mob ? MOB_DUO_H : 1.30, 377, 566);
      setSz(sprAnoman.mesh, mob ? MOB_DUO_H : 1.32, 408, 547);
      setSz(sprBimaTerjun.mesh, mob ? 0.65 : 0.92, 771, 568);
      setSz(sprBimaDuduk.mesh, mob ? 0.8 : 1.32, 499, 571);
      setSz(sprDewaRuci.mesh, mob ? 0.62 : 0.78, 208, 505);
      setSz(nagaMesh, (mob ? 0.88 : 1.30) * RIG_PAD_K, 937, 572);

      baseDims.bimaStandH = mob ? 0.96 : 1.34;
      baseDims.bimaStandW = baseDims.bimaStandH * (388 / 571);
      bimaStandMesh.scale.set(baseDims.bimaStandW * RIG_PAD_K, baseDims.bimaStandH * RIG_PAD_K, 1);

      baseDims.bimaJalanH = mob ? 0.96 : 1.30;
      baseDims.bimaJalanW = baseDims.bimaJalanH * (369 / 570);
      bimaJalanMesh.scale.set(baseDims.bimaJalanW, baseDims.bimaJalanH, 1);

      baseDims.raksasaH = mob ? MOB_DUO_H : 1.36;
      baseDims.raksasaW = baseDims.raksasaH * (640 / 572);
      sprRaksasa1.mesh.scale.set(baseDims.raksasaW * RIG_PAD_K, baseDims.raksasaH * RIG_PAD_K, 1);
      sprRaksasa2.mesh.scale.set(baseDims.raksasaW * 0.84 * RIG_PAD_K, baseDims.raksasaH * 0.84 * RIG_PAD_K, 1);
    };
    layoutScene(w0, h0);

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          renderer.setSize(width, height, false);
          layoutScene(width, height);
        }
      }
    });
    ro.observe(host);

    let animId = 0;
    let disposed = false;
    const alphaCanvasCache = new Map<THREE.Texture, CanvasRenderingContext2D>();
    let snapNextFrame = false;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      if (disposed) return;
      animId = requestAnimationFrame(renderLoop);

      const dt = Math.min(0.05, clock.getDelta());
      const t = clock.getElapsedTime();
      const sim = simRef.current;
      const st = liveRef.current;
      const mob = baseDims.isMobile;

      // Kelir: tutup dulu, ganti adegan saat gelap penuh, lalu buka lagi (tanpa gambar bertumpuk).
      if (st.activeScene !== sim.stageScene && !sim.curtainClosing) sim.curtainClosing = true;
      const curtainSpeed = reduceMotion ? 8 : 3.2;
      if (sim.curtainClosing) {
        sim.curtain = Math.min(1, sim.curtain + dt * curtainSpeed);
        if (sim.curtain >= 1) {
          sim.stageScene = st.activeScene;
          sim.curtainClosing = false;
          snapNextFrame = true;
        }
      } else {
        sim.curtain = Math.max(0, sim.curtain - dt * curtainSpeed * 0.8);
      }
      if (curtainRef.current) {
        curtainRef.current.style.opacity = String(sim.curtain);
        curtainRef.current.style.visibility = sim.curtain > 0.001 ? 'visible' : 'hidden';
      }
      const sc = sim.stageScene;
      const mobL = -(currentAspect - 0.21);
      const mobR = currentAspect - 0.21;
      const snap = snapNextFrame;
      snapNextFrame = false;
      const ease = (rate: number) => (snap ? 1 : Math.min(1, dt * rate));

      // Scroll physics & continuous walking stride phase
      sim.scrollVelocity *= 0.88;
      const scrollSpeed = Math.abs(sim.scrollVelocity);
      const caveStrideRate =
        sc === 2 ? (st.walkStepDone ? 0.78 : 0.40) : sc === 4 ? (st.enteredCave ? 0.78 : 0.42) : 0.0;
      sim.stridePhase += (scrollSpeed * 0.011 + dt * caveStrideRate);

      let targetBg = 0;
      if (sc === 1) targetBg = 0;
      else if (sc === 2) targetBg = 1;
      else if (sc === 3 || sc === 6) targetBg = 2;
      else if (sc === 4 || sc === 5) targetBg = 3;
      else if (sc === 7) targetBg = 4;
      else if (sc === 8) targetBg = 1;
      else if (sc === 9) targetBg = 5;
      else if (sc === 10) targetBg = 6;
      else if (sc === 11) targetBg = st.enteredGuwa ? 8 : 7;
      else targetBg = st.finalePhase === 'amarta' ? 10 : 9;

      if (targetBg !== sim.bgIndex) {
        bgUniforms.uTexA.value = bgTextures[sim.bgIndex];
        bgUniforms.uTexB.value = bgTextures[targetBg];
        sim.bgIndex = targetBg;
        sim.bgMix = snap ? 1 : 0;
      }
      sim.bgMix = Math.min(1, sim.bgMix + dt * 1.6);

      // Saat kelir tertutup penuh, semua nilai langsung lompat ke target adegan baru.
      const lr = ease(3.4);
      sim.localProg += (st.localProgress - sim.localProg) * lr;
      sim.nightmare += ((sc === 1 ? 1 : 0) - sim.nightmare) * lr;
      sim.astina += ((sc === 3 || sc === 6 ? 1 : 0) - sim.astina) * lr;
      sim.forest += ((sc === 4 || sc === 5 || sc === 8 ? 1 : 0) - sim.forest) * lr;
      sim.caveCleared += ((st.caveCleared ? 1 : 0) - sim.caveCleared) * lr;
      sim.storm += ((sc === 9 || sc === 10 ? 1 : 0) - sim.storm) * lr;
      sim.victory += (((sc === 10 && st.nagaHits >= TOTAL_NAGA_HITS) || sc >= 11 ? 1 : 0) - sim.victory) * ease(1.8);
      sim.abyss += ((sc === 11 && !st.enteredGuwa ? 1 : 0) - sim.abyss) * lr;
      sim.cosmos += ((sc === 11 && st.enteredGuwa ? 1 : 0) - sim.cosmos) * lr;
      sim.dawn += ((sc === 12 && st.finalePhase === 'amarta' ? 1 : 0) - sim.dawn) * lr;

      // Dynamic camera zoom, pan & tightening vignette
      const targetZoom =
        sc === 1
          ? 1.02 + st.dreamTurn * 0.05
          : sc === 2
            ? 1.0 + sim.pathWalkProg * 0.12
            : sc === 4
              ? 1.0 + sim.caveEntryProg * 0.18
            : sc === 5
              ? 1.12
              : sc === 7
                ? 1.05
                : sc === 11 && st.enteredGuwa
                  ? 1.08
                  : 1.0;
      const targetPanX = sc === 7 ? (st.localProgress - 0.5) * 0.06 : 0;
      const targetVignette =
        sc === 1
          ? 0.45
          : sc === 5 && !st.caveCleared
            ? 0.4
            : sc === 10 && st.nagaHits < TOTAL_NAGA_HITS
              ? 0.55 - st.nagaHits * 0.14
              : 0.0;

      sim.zoom += (targetZoom - sim.zoom) * ease((sc === 2 || sc === 4 ? 1.8 : 2.2));
      sim.panX += (targetPanX - sim.panX) * lr;
      sim.vignetteTight += (targetVignette - sim.vignetteTight) * lr;

      const targetTint =
        st.selectedColor === 'hitam'
          ? [0.62, 0.60, 0.66]
          : st.selectedColor === 'merah'
            ? [1.28, 0.68, 0.62]
            : st.selectedColor === 'kuning'
              ? [1.18, 1.05, 0.58]
              : [1.06, 1.02, 0.95];
      sim.tintR += (targetTint[0] - sim.tintR) * lr;
      sim.tintG += (targetTint[1] - sim.tintG) * lr;
      sim.tintB += (targetTint[2] - sim.tintB) * lr;

      // Sprite visibility
      const showDuryudana = sc === 1;
      const showSangkuni = sc === 1;
      const showBimaJalan = sc === 2 || sc === 4;
      const showDurna = sc === 3 || sc === 6;
      const showBimaStand =
        sc === 3 ||
        sc === 5 ||
        sc === 6 ||
        sc === 8 ||
        (sc === 9 && !st.jumpedIntoSea) ||
        sc === 10 ||
        (sc === 12 && st.finalePhase === 'amarta');
      const showRaksasa = sc === 5 && !st.caveCleared;
      const showDewaBayu = sc === 5 && st.caveCleared;
      const showAnoman = sc === 8;
      const showBimaTerjun = sc === 9 && st.jumpedIntoSea;
      const showNaga = sc === 10 && st.nagaHits < TOTAL_NAGA_HITS;
      const showBimaDuduk = sc === 11;
      const showDewaRuci = sc === 11 && !st.enteredGuwa;

      sim.aDuryudana += ((showDuryudana ? 1 : 0) - sim.aDuryudana) * lr;
      sim.aSangkuni += ((showSangkuni ? 1 : 0) - sim.aSangkuni) * lr;
      sim.sangkuniLean += ((st.dreamTurn >= 1 || st.localProgress > 0.4 ? 1 : 0) - sim.sangkuniLean) * lr;
      sim.aBimaJalan += ((showBimaJalan ? 1 : 0) - sim.aBimaJalan) * lr;
      sim.aDurna += ((showDurna ? 1 : 0) - sim.aDurna) * lr;
      sim.durnaShock += ((sc === 6 ? 1 : 0) - sim.durnaShock) * lr;
      sim.aBimaStand += ((showBimaStand ? 1 : 0) - sim.aBimaStand) * lr;
      sim.bimaFlipX += ((sc === 3 || sc === 6 ? 1 : 0) - sim.bimaFlipX) * ease(4.5);
      sim.aRaksasa += ((showRaksasa ? 1 : 0) - sim.aRaksasa) * ease(5.0);
      sim.aDewaBayu += ((showDewaBayu ? 1 : 0) - sim.aDewaBayu) * lr;
      sim.aAnoman += ((showAnoman ? 1 : 0) - sim.aAnoman) * lr;
      sim.aBimaTerjun += ((showBimaTerjun ? 1 : 0) - sim.aBimaTerjun) * ease(6.0);
      sim.aNaga += ((showNaga ? 1 : 0) - sim.aNaga) * lr;
      sim.aBimaDuduk += ((showBimaDuduk ? 1 : 0) - sim.aBimaDuduk) * lr;
      sim.aDewaRuci += ((showDewaRuci ? 1 : 0) - sim.aDewaRuci) * lr;

      if (sc === 9 && st.jumpedIntoSea) {
        sim.diveProg = Math.min(1, sim.diveProg + dt * 0.72);
      } else {
        sim.diveProg = 0;
      }

      sim.slash = Math.max(0, sim.slash - dt * 3.6);
      sim.hitFlash = Math.max(0, sim.hitFlash - dt * 4.2);
      sim.angerBounce = Math.max(0, sim.angerBounce - dt * 2.4);
      if (sim.angerT >= 0) sim.angerT = sim.angerT > 1.8 ? -1 : sim.angerT + dt;
      if (sim.calmT >= 0) sim.calmT = sc !== 5 ? -1 : sim.calmT + dt;
      if (sim.nagaHitT >= 0) sim.nagaHitT = sim.nagaHitT > 1.2 ? -1 : sim.nagaHitT + dt;
      sim.shake = Math.max(0, sim.shake - dt * 4.5);

      if (!reduceMotion && sim.storm > 0.5 && st.nagaHits < TOTAL_NAGA_HITS && t > sim.nextThunderAt) {
        sim.lightning = 1.0;
        sim.nextThunderAt = t + 5.2 + Math.random() * 4.5;
        if (st.started && sc === 10) {
          audioRef.current?.playThunder();
        }
      }
      sim.lightning = Math.max(0, sim.lightning - dt * 3.4);

      const px = reduceMotion ? 0 : sim.pointerX;
      const py = reduceMotion ? 0 : sim.pointerY;

      const swayX = reduceMotion ? 0 : Math.sin(t * 0.65) * 0.018 * sim.storm * (1.0 - sim.victory * 0.7);
      const swayY = reduceMotion ? 0 : Math.cos(t * 0.9) * 0.012 * sim.storm * (1.0 - sim.victory * 0.7);
      const shakeX = sim.shake > 0.01 ? (Math.random() - 0.5) * 0.07 * sim.shake : 0;
      const shakeY = sim.shake > 0.01 ? (Math.random() - 0.5) * 0.07 * sim.shake : 0;

      camera.position.x = px * 0.036 + swayX + shakeX;
      camera.position.y = py * 0.02 + swayY + shakeY - sim.diveProg * 0.12;

      // Adegan berupa satu lukisan utuh (pamitan, pantai): di HP lukisan dikecilkan dan
      // digeser ke arah tokohnya, agar tidak hanya terlihat sepotong badan.
      const paintingScene = sc === 7 || (sc === 12 && st.finalePhase === 'shore');
      const targetBgScale = mob ? (sc === 9 ? 1.18 : paintingScene ? 0.62 : 1.0) : 1.0;
      const bgFocusX = sc === 7 ? 0.6 : paintingScene ? 0.72 : 0.5;
      const bgPanLimit = Math.max(0, (baseDims.bgW * targetBgScale) / 2 - currentAspect);
      const targetBgOffsetX =
        sc === 9 && mob
          ? 0.46
          : mob
            ? THREE.MathUtils.clamp((0.5 - bgFocusX) * baseDims.bgW * targetBgScale, -bgPanLimit, bgPanLimit)
            : 0.0;
      const targetBgOffsetY = sc === 9 ? (mob ? -0.32 : -0.13) : 0.0;
      sim.bgScale += (targetBgScale - sim.bgScale) * ease(4.5);
      sim.bgOffsetX += (targetBgOffsetX - sim.bgOffsetX) * ease(4.5);
      sim.bgOffsetY += (targetBgOffsetY - sim.bgOffsetY) * ease(4.5);
      bgMesh.scale.set(baseDims.bgW * sim.bgScale, baseDims.bgH * sim.bgScale, 1);
      bgMesh.position.x = sim.bgOffsetX - px * 0.025;
      bgMesh.position.y = sim.bgOffsetY - py * 0.018;

      // ── Physical Character Motions driven by Scroll & Scene context ──

      // 1. Duryudana (shivers back in fear) & Sangkuni (predatory creeping arc)
      const duryudanaShiver = Math.sin(t * 14.0) * 0.005 * sim.nightmare * (reduceMotion ? 0 : 1);
      sprDuryudana.mesh.position.x = (mob ? mobL : -currentAspect * 0.40) - px * 0.012;
      sprDuryudana.mesh.position.y = (mob ? MOB_DUO_Y : -0.18) - sim.localProg * 0.03 + duryudanaShiver;

      const sangkuniCreep = (sim.sangkuniLean * (mob ? 0.05 : 0.24) + sim.localProg * (mob ? 0.02 : 0.08));
      sprSangkuni.mesh.position.x = (mob ? mobR : currentAspect * 0.42) - sangkuniCreep + px * 0.015;
      sprSangkuni.mesh.position.y = (mob ? MOB_DUO_Y - 0.01 : -0.20) + Math.sin(t * 2.2) * 0.008;

      // 2. Bima Walking (Scene 2 hill path & Scene 4 cave mouth)
      if (sc === 2) {
        if (st.walkStepDone) {
          if (!sim.pathEnterActive) {
            sim.pathEnterActive = true;
            sim.pathStartP = sim.pathWalkProg;
            sim.pathEnterElapsed = 0;
          }
          const enterDuration = st.reduceMotion ? 0.45 : 1.75;
          sim.pathEnterElapsed = Math.min(enterDuration, sim.pathEnterElapsed + dt);
          const tEnter = sim.pathEnterElapsed / enterDuration;
          const easeEnter = tEnter * tEnter * tEnter * (tEnter * (tEnter * 6 - 15) + 10);
          sim.pathWalkProg = THREE.MathUtils.lerp(sim.pathStartP, 1.0, easeEnter);

          const ampIn = Math.min(1, tEnter / 0.2);
          const ampOut = tEnter > 0.76 ? Math.max(0.1, 1.0 - (tEnter - 0.76) / 0.24) : 1.0;
          const targetAmp = st.reduceMotion ? 0.0 : ampIn * ampOut;
          sim.caveWalkAmp += (targetAmp - sim.caveWalkAmp) * ease(7.5);

          const targetLean = st.reduceMotion ? 0.0 : -0.028 * ampIn * ampOut;
          bimaJalanMesh.rotation.z += (targetLean - bimaJalanMesh.rotation.z) * ease(5.0);
        } else {
          sim.pathEnterActive = false;
          sim.pathEnterElapsed = 0;
          const targetIdleP = THREE.MathUtils.clamp(st.localProgress * 0.42, 0.08, 0.34);
          sim.pathWalkProg += (targetIdleP - sim.pathWalkProg) * ease(3.5);
          const targetAmp = scrollSpeed > 0.35 && !st.reduceMotion ? 0.72 : 0.0;
          sim.caveWalkAmp += (targetAmp - sim.caveWalkAmp) * ease(4.5);
          bimaJalanMesh.rotation.z += (0.0 - bimaJalanMesh.rotation.z) * ease(5.0);
        }

        const p = sim.pathWalkProg;
        const walkScale = THREE.MathUtils.lerp(1.0, 0.42, p);
        bimaJalanMesh.scale.set(baseDims.bimaJalanW * walkScale, baseDims.bimaJalanH * walkScale, 1);
        bimaJalanMesh.position.x = THREE.MathUtils.lerp(mob ? -currentAspect * 0.28 : -currentAspect * 0.32, currentAspect * 0.08, p);
        bimaJalanMesh.position.y = THREE.MathUtils.lerp(mob ? -0.28 : -0.30, 0.02, p);

        const fadeT = Math.max(0, (p - 0.65) / 0.35);
        const pathFade = 1.0 - fadeT * fadeT * (3.0 - 2.0 * fadeT);
        bimaJalanUniforms.uAlpha.value = sim.aBimaJalan * pathFade;
        bimaJalanUniforms.uWalkAmp.value = sim.caveWalkAmp;
        bimaJalanUniforms.uDarken.value = 0.0;
      } else if (sc === 4) {
        if (st.enteredCave) {
          if (!sim.caveEnterActive) {
            sim.caveEnterActive = true;
            sim.caveStartP = sim.caveEntryProg;
            sim.caveEnterElapsed = 0;
          }
          const enterDuration = st.reduceMotion ? 0.45 : 1.95;
          sim.caveEnterElapsed = Math.min(enterDuration, sim.caveEnterElapsed + dt);
          const tEnter = sim.caveEnterElapsed / enterDuration;
          const easeEnter = tEnter * tEnter * tEnter * (tEnter * (tEnter * 6 - 15) + 10);
          sim.caveEntryProg = THREE.MathUtils.lerp(sim.caveStartP, 1.0, easeEnter);

          const ampIn = Math.min(1, tEnter / 0.2);
          const ampOut = tEnter > 0.76 ? Math.max(0.1, 1.0 - (tEnter - 0.76) / 0.24) : 1.0;
          const targetAmp = st.reduceMotion ? 0.0 : ampIn * ampOut;
          sim.caveWalkAmp += (targetAmp - sim.caveWalkAmp) * ease(7.5);

          const targetLean = st.reduceMotion ? 0.0 : -0.032 * ampIn * ampOut;
          bimaJalanMesh.rotation.z += (targetLean - bimaJalanMesh.rotation.z) * ease(5.0);
        } else {
          sim.caveEnterActive = false;
          sim.caveEnterElapsed = 0;
          const targetIdleP = THREE.MathUtils.clamp(st.localProgress * 0.36, 0.1, 0.28);
          sim.caveEntryProg += (targetIdleP - sim.caveEntryProg) * ease(3.5);
          const targetAmp = scrollSpeed > 0.35 && !st.reduceMotion ? 0.75 : 0.0;
          sim.caveWalkAmp += (targetAmp - sim.caveWalkAmp) * ease(4.5);
          bimaJalanMesh.rotation.z += (0.0 - bimaJalanMesh.rotation.z) * ease(5.0);
        }

        const p = sim.caveEntryProg;
        const caveScale = THREE.MathUtils.lerp(0.96, 0.34, p);
        bimaJalanMesh.scale.set(baseDims.bimaJalanW * caveScale, baseDims.bimaJalanH * caveScale, 1);
        bimaJalanMesh.position.x = THREE.MathUtils.lerp(mob ? -currentAspect * 0.28 : -currentAspect * 0.34, currentAspect * 0.18, p);
        bimaJalanMesh.position.y = THREE.MathUtils.lerp(mob ? -0.32 : -0.30, -0.07, p);

        const fadeT = Math.max(0, (p - 0.6) / 0.4);
        const caveFade = 1.0 - fadeT * fadeT * (3.0 - 2.0 * fadeT);
        const shadowT = Math.max(0, (p - 0.4) / 0.6);
        const caveDarken = shadowT * shadowT * (3.0 - 2.0 * shadowT) * 0.72;

        bimaJalanUniforms.uAlpha.value = sim.aBimaJalan * caveFade;
        bimaJalanUniforms.uWalkAmp.value = sim.caveWalkAmp;
        bimaJalanUniforms.uDarken.value = caveDarken;
      } else {
        sim.pathEnterActive = false;
        sim.pathEnterElapsed = 0;
        sim.caveEnterActive = false;
        sim.caveEnterElapsed = 0;
        bimaJalanMesh.rotation.z = 0.0;
        bimaJalanUniforms.uAlpha.value = sim.aBimaJalan;
        bimaJalanUniforms.uDarken.value = 0.0;
      }
      bimaJalanUniforms.uWalkTime.value = sim.stridePhase;

      // 3. Durna (raises staff, leans with authority in Scene 3, startled recoil in Scene 6)
      sprDurna.mesh.position.x =
        (mob ? mobL : -currentAspect * 0.44) - sim.durnaShock * (mob ? 0.03 : 0.08) - px * 0.012;
      sprDurna.mesh.position.y = mob ? MOB_DUO_Y : -0.18;
      sprDurna.mesh.rotation.z = Math.sin(t * 1.2) * 0.015 + (sc === 3 ? 0.02 : -sim.durnaShock * 0.04);

      // 4. Bima Standing (Scene 3, 5, 6, 8, 9-pre, 10, 12-Amarta)
      let bimaX = -currentAspect * 0.46;
      let bimaY = mob ? -0.26 : -0.24;
      let bimaScale = 1.0;
      let bimaLean = 0.0;

      const bimaDuoScale = MOB_DUO_H / 0.96;
      if (sc === 3 || sc === 6) {
        bimaX = mob ? mobR : currentAspect * 0.44;
        bimaY = mob ? MOB_DUO_Y : -0.18;
        if (mob) bimaScale = bimaDuoScale;
      } else if (sc === 5) {
        bimaX = mob ? mobL : -currentAspect * 0.46;
        bimaY = mob ? MOB_DUO_Y : -0.24;
        if (mob) bimaScale = bimaDuoScale;
        bimaLean = (Math.sin(t * 1.5) * 0.02 + 0.02) * (1.0 - sim.aDewaBayu);
      } else if (sc === 8) {
        bimaX = mob ? mobL : -currentAspect * 0.42;
        bimaY = mob ? MOB_DUO_Y : -0.22;
        if (mob) bimaScale = bimaDuoScale;
      } else if (sc === 9) {
        const effBgW = baseDims.bgW * sim.bgScale;
        const effBgH = baseDims.bgH * sim.bgScale;
        const cliffTopY = (0.5 - 0.352) * effBgH + sim.bgOffsetY;
        bimaScale = mob ? 0.36 : 0.45;
        const spriteHalfH = 0.5 * baseDims.bimaStandH * bimaScale;
        bimaX = sim.bgOffsetX - 0.138 * effBgW;
        bimaY = cliffTopY + spriteHalfH - 0.020;
        bimaLean = reduceMotion ? 0.02 : Math.sin(t * 1.15) * 0.015 + 0.02;
      } else if (sc === 10) {
        bimaX = mob ? mobL + 0.04 : -currentAspect * 0.50;
        bimaY = mob ? MOB_FEET_Y + 0.4 : -0.26;
        if (mob) bimaScale = 0.84;
        bimaLean = Math.sin(t * 2.2) * 0.035;
      } else if (sc === 12) {
        bimaX = mob ? 0.0 : -currentAspect * 0.42;
        bimaY = mob ? -0.18 : -0.22;
        bimaScale = 0.96;
      }

      bimaStandMesh.scale.set(baseDims.bimaStandW * bimaScale * RIG_PAD_K, baseDims.bimaStandH * bimaScale * RIG_PAD_K, 1);
      bimaStandMesh.position.x = bimaX + sim.slash * (mob ? 0.24 : 0.34) - px * 0.014;
      bimaStandMesh.position.y = bimaY + (sc === 9 || reduceMotion ? 0 : Math.sin(t * 1.1) * 0.008);
      bimaStandMesh.rotation.z = bimaLean;

      // 5. Twin Raksasa Rukmuka & Rukmakala — koreografi bersendi (Scene 5)
      //    Amarah: Bima menebas, Rukmuka roboh, Rukmakala melangkahinya, Rukmuka bangkit lagi.
      //    Hening: Bima menarik napas, lalu membenturkan kepala keduanya.
      const motionK = reduceMotion ? 0 : 1;
      const aT = sim.angerT;
      const cT = sim.calmT;
      const angerWind = aT >= 0 ? smoothEnv(aT, 0, 0.22) * (1 - smoothEnv(aT, 0.22, 0.32)) : 0;
      const angerHit = aT >= 0 ? smoothEnv(aT, 0.22, 0.34) * (1 - smoothEnv(aT, 0.6, 1.0)) : 0;
      const r1Down = aT >= 0 ? smoothEnv(aT, 0.3, 0.55) * (1 - smoothEnv(aT, 1.15, 1.6)) : 0;
      const r2Step = aT >= 0 ? smoothEnv(aT, 0.55, 0.9) * (1 - smoothEnv(aT, 1.2, 1.7)) : 0;
      const calmBreath = cT >= 0 ? smoothEnv(cT, 0, 0.5) * (1 - smoothEnv(cT, 1.25, 1.4)) : 0;
      const calmStrike = cT >= 0 ? smoothEnv(cT, 1.25, 1.42) * (1 - smoothEnv(cT, 1.9, 2.4)) : 0;
      const clash = cT >= 0 ? smoothEnv(cT, 1.35, 1.7) : 0;

      const raksasaHeave = Math.sin(t * 2.6 + sim.localProg * 3.5) * 0.03 * motionK;
      const clubWind = Math.sin(t * 2.1) * 0.1 * motionK * (1 - clash);
      const r1BaseX = mob ? mobR - 0.04 : currentAspect * 0.34;
      const r2BaseX = mob ? mobR + 0.1 : currentAspect * 0.56;
      const meetX = (r1BaseX + r2BaseX) * 0.5;
      sprRaksasa1.mesh.position.x = THREE.MathUtils.lerp(r1BaseX + r1Down * 0.22, meetX - 0.1, clash) + px * 0.018;
      sprRaksasa1.mesh.position.y = (mob ? MOB_DUO_Y : -0.18) - r1Down * 0.1 + raksasaHeave;
      sprRaksasa1.mesh.rotation.z = -raksasaHeave * 0.6 - r1Down * 0.5 - clash * 0.12;
      (sprRaksasa1.uniforms.uBoneAng.value as number[])[0] = -0.1 + clubWind + r1Down * 0.45 + clash * 0.3;
      (sprRaksasa1.uniforms.uBoneAng.value as number[])[1] = Math.sin(t * 1.7) * 0.06 * motionK + clash * 0.35;

      sprRaksasa2.mesh.position.x = THREE.MathUtils.lerp(r2BaseX - r2Step * 0.3, meetX + 0.08, clash) + px * 0.012;
      sprRaksasa2.mesh.position.y = (mob ? MOB_DUO_Y + 0.08 : -0.08) - raksasaHeave * 0.6 + r2Step * 0.04;
      sprRaksasa2.mesh.rotation.z = raksasaHeave * 0.5 + r2Step * 0.12 + clash * 0.1;
      (sprRaksasa2.uniforms.uBoneAng.value as number[])[0] = -0.12 - clubWind * 0.8 - r2Step * 0.35 + clash * 0.3;
      (sprRaksasa2.uniforms.uBoneAng.value as number[])[1] = Math.sin(t * 1.5 + 1.0) * 0.06 * motionK + clash * 0.35;

      // Sendi Bima: [0] badan, [1] lengan Kuku Pancanaka, [2] kepala
      const bimaBones = bimaStandUniforms.uBoneAng.value as number[];
      const idleK = sc === 5 ? motionK : 0;
      bimaBones[0] =
        Math.sin(t * 1.6) * 0.025 * idleK - angerWind * 0.1 + angerHit * 0.2 - calmBreath * 0.07 + calmStrike * 0.22;
      bimaBones[1] =
        Math.sin(t * 2.2) * 0.06 * idleK +
        angerWind * 0.25 -
        angerHit * 0.3 +
        calmBreath * 0.18 -
        calmStrike * 0.32;
      bimaBones[2] = Math.sin(t * 1.1 + 1.0) * 0.035 * idleK + calmBreath * 0.14 - angerHit * 0.05;
      if (sc === 5) {
        bimaStandMesh.position.x += angerHit * 0.12 + calmStrike * 0.1 - sim.slash * (mob ? 0.24 : 0.34);
      }

      // 6. Dewa Indra & Bayu (Scene 5 after cleared)
      sprDewaBayu.mesh.position.x = (mob ? mobR : currentAspect * 0.36) + px * 0.015;
      sprDewaBayu.mesh.position.y = (mob ? MOB_DUO_Y + 0.04 : -0.10) + (reduceMotion ? 0 : Math.sin(t * 1.3) * 0.03);

      // 7. Resi Anoman (Scene 8: fur & tail waving in wind)
      sprAnoman.mesh.position.x = (mob ? mobR : currentAspect * 0.40) + px * 0.015;
      sprAnoman.mesh.position.y = (mob ? MOB_DUO_Y : -0.22) + Math.sin(t * 1.6) * 0.008;
      sprAnoman.mesh.rotation.z = Math.sin(t * 1.4) * 0.015;

      // 8. Bima Diving (Scene 9 parabolic plunge off cliff)
      const dp = sim.diveProg;
      const diveStartX = sim.bgOffsetX - 0.12 * (baseDims.bgW * sim.bgScale);
      const diveStartY = (0.5 - 0.352) * (baseDims.bgH * sim.bgScale) + sim.bgOffsetY + 0.22;
      sprBimaTerjun.mesh.position.x = THREE.MathUtils.lerp(diveStartX, sim.bgOffsetX + currentAspect * 0.36, dp);
      sprBimaTerjun.mesh.position.y = diveStartY + Math.sin(dp * Math.PI) * 0.24 - dp * dp * 1.25;
      sprBimaTerjun.mesh.rotation.z = -dp * 0.45;

      // 9. Naga Nemburnawa (Scene 10) — bersendi: leher menyambar, rahang mengatup, ekor mengibas.
      //    Serangan berkala ±3 detik; saat ditebas kepalanya terpental dan mengaum.
      const nagaMotion = reduceMotion ? 0 : 1;
      const strikeCycle = (t % 3.2) / 3.2;
      const strikeWind = smoothEnv(strikeCycle, 0.55, 0.78) * (1 - smoothEnv(strikeCycle, 0.78, 0.84));
      const strikeHit = smoothEnv(strikeCycle, 0.78, 0.86) * (1 - smoothEnv(strikeCycle, 0.9, 1.0));
      const hT = sim.nagaHitT;
      const recoil = hT >= 0 ? smoothEnv(hT, 0, 0.12) * (1 - smoothEnv(hT, 0.35, 1.1)) : 0;
      const nagaActive = st.nagaHits < TOTAL_NAGA_HITS ? nagaMotion * (1 - recoil) : 0;
      const attack = strikeHit * nagaActive;
      const nagaBones = nagaUniforms.uBoneAng.value as number[];
      // [0] leher: miring ke belakang saat ancang-ancang, menukik saat menyambar, terpental saat kena
      nagaBones[0] =
        Math.sin(t * 1.3) * 0.05 * nagaMotion - strikeWind * 0.16 * nagaActive + attack * 0.24 - recoil * 0.3;
      // [1] rahang: bernapas pelan, menganga saat menyambar dan saat mengaum kesakitan
      nagaBones[1] = (0.06 + Math.sin(t * 2.6) * 0.06) * nagaMotion + attack * 0.28 + recoil * 0.34;
      // [2] ekor: mengibas, menyentak saat kena
      nagaBones[2] = Math.sin(t * 1.9 + 0.6) * 0.14 * nagaMotion + recoil * 0.3;

      // Di HP kepala naga ada di tepi kiri gambar; geser ke kanan agar kepala tetap terlihat saat menyambar.
      const nagaTargetX = mob ? 0.3 : currentAspect * 0.38;
      const nagaEntry = (1.0 - sim.aNaga) * 0.9;
      const nagaLunge = sim.aNaga > 0.6 ? Math.sin(t * 1.55 + sim.localProg * 3.0) * 0.03 * nagaMotion : 0;
      nagaMesh.position.x =
        nagaTargetX + nagaEntry - nagaLunge - attack * (mob ? 0.08 : 0.14) + recoil * 0.2 + px * 0.02;
      nagaMesh.position.y = (mob ? 0.04 : -0.10) + strikeWind * 0.03 * nagaActive;

      if (sc === 10) {
        // Bima menegang saat disambar, lalu menebas dengan Kuku Pancanaka saat user menyerang.
        bimaBones[0] = Math.sin(t * 2.2) * 0.02 * nagaMotion - attack * 0.12 + recoil * 0.18;
        bimaBones[1] = Math.sin(t * 2.0) * 0.05 * nagaMotion + attack * 0.15 - recoil * 0.32;
        bimaBones[2] = -attack * 0.08 + recoil * 0.05;
        bimaStandMesh.position.x += -attack * 0.05 + recoil * 0.1 - sim.slash * (mob ? 0.24 : 0.34);
      }

      // 10. Bima Duduk & Dewa Ruci (Scene 11)
      sprBimaDuduk.mesh.position.x = (mob ? mobL + 0.06 : -currentAspect * 0.38) - px * 0.012;
      sprBimaDuduk.mesh.position.y = mob ? MOB_FEET_Y + 0.4 : -0.24;

      const hoverY = reduceMotion ? 0 : Math.sin(t * 1.4) * 0.042;
      sprDewaRuci.mesh.position.x = (mob ? mobR + 0.04 : currentAspect * 0.34) + px * 0.018;
      sprDewaRuci.mesh.position.y = (mob ? 0.12 : 0.02) + hoverY;

      // Push uniforms
      bgUniforms.uBgMix.value = sim.bgMix;
      bgUniforms.uTime.value = t;
      bgUniforms.uZoom.value = sim.zoom;
      bgUniforms.uPanX.value = sim.panX;
      bgUniforms.uNightmare.value = sim.nightmare;
      bgUniforms.uAstina.value = sim.astina;
      bgUniforms.uForest.value = sim.forest;
      bgUniforms.uCaveCleared.value = sim.caveCleared;
      bgUniforms.uStorm.value = sim.storm;
      bgUniforms.uVictory.value = sim.victory;
      bgUniforms.uAbyss.value = sim.abyss;
      bgUniforms.uCosmos.value = sim.cosmos;
      bgUniforms.uDawn.value = sim.dawn;
      bgUniforms.uVignetteTight.value = sim.vignetteTight;
      bgUniforms.uNafsuTint.value.set(sim.tintR, sim.tintG, sim.tintB);
      bgUniforms.uLightning.value = sim.lightning;

      const syncSimple = (spr: SimpleSpriteHandle, alpha: number, flash = 0) => {
        spr.uniforms.uTime.value = t;
        spr.uniforms.uAlpha.value = alpha;
        spr.uniforms.uFlash.value = flash;
        spr.mesh.visible = alpha > 0.01;
      };
      syncSimple(sprDuryudana, sim.aDuryudana);
      syncSimple(sprSangkuni, sim.aSangkuni);
      syncSimple(sprDurna, sim.aDurna);
      syncSimple(sprRaksasa1, sim.aRaksasa, sim.angerBounce * 0.3);
      syncSimple(sprRaksasa2, sim.aRaksasa * 0.72, sim.angerBounce * 0.2);
      syncSimple(sprDewaBayu, sim.aDewaBayu);
      syncSimple(sprAnoman, sim.aAnoman);
      syncSimple(sprBimaTerjun, sim.aBimaTerjun * (1.0 - Math.max(0, (dp - 0.78) / 0.22)));
      syncSimple(sprBimaDuduk, sim.aBimaDuduk);
      syncSimple(sprDewaRuci, sim.aDewaRuci);

      bimaStandUniforms.uTime.value = t;
      bimaStandUniforms.uAlpha.value = sim.aBimaStand;
      bimaStandUniforms.uFlipX.value = sim.bimaFlipX > 0.5 ? 1.0 : 0.0;
      bimaStandUniforms.uSlash.value = sim.slash;
      bimaStandUniforms.uClawGlow.value = sc === 5 || sc === 10 ? 1.0 : 0.22;
      bimaStandUniforms.uLightning.value = sim.lightning * sim.storm;
      bimaStandMesh.visible = sim.aBimaStand > 0.01;

      bimaJalanUniforms.uTime.value = t;
      bimaJalanMesh.visible = bimaJalanUniforms.uAlpha.value > 0.01;

      nagaUniforms.uTime.value = t;
      nagaUniforms.uAlpha.value = sim.aNaga;
      nagaUniforms.uHit.value = sim.hitFlash;
      nagaUniforms.uLightning.value = sim.lightning * sim.storm;
      nagaMesh.visible = sim.aNaga > 0.01;

      // ── Wayang potongan: ikuti transform mesh lama, lalu gerakkan sendi ──
      const syncRig = (rig: THREE.Group, mesh: THREE.Mesh, flip: boolean) => {
        rig.visible = mesh.visible;
        rig.position.set(mesh.position.x, mesh.position.y, mesh.position.z);
        rig.rotation.z = mesh.rotation.z;
        rig.scale.set(mesh.scale.x * PUPPET_IN_RIG * (flip ? -1 : 1), mesh.scale.y * PUPPET_IN_RIG, 1);
        mesh.visible = false;
      };
      syncRig(bimaRig, bimaStandMesh, sim.bimaFlipX > 0.5);
      syncRig(nagaRig, nagaMesh, false);

      bimaPuppet.uniforms.uAlpha.value = sim.aBimaStand;
      bimaPuppet.uniforms.uLightning.value = sim.lightning * sim.storm;
      bimaPuppet.uniforms.uFlash.value = sim.slash * 0.35;
      nagaPuppet.uniforms.uAlpha.value = sim.aNaga;
      nagaPuppet.uniforms.uFlash.value = sim.hitFlash;
      nagaPuppet.uniforms.uLightning.value = sim.lightning * sim.storm;

      // Sudut sendi Bima (radian, positif = berlawanan jarum jam di layar).
      // Pose aksi diambil dari nilai tulang lama: [0] badan, [1] lengan cakar, [2] kepala.
      const bj = bimaPuppet.joints;
      const bb = bimaStandUniforms.uBoneAng.value as number[];
      const breathe = reduceMotion ? 0 : Math.sin(t * 1.8);
      const strike = Math.max(0, -bb[1]) * 2.6; // 0..~1 saat menebas
      const windup = Math.max(0, bb[1]) * 2.6;
      bj.badan.rotation.z = -bb[0] * 0.5;
      bj.kepala.rotation.z = bb[2] * 1.4 + breathe * 0.012;
      bj['lengan-kanan-atas'].rotation.z = 0.08 * breathe + windup * 0.35 + strike * 1.55;
      bj['lengan-kanan-bawah'].rotation.z = windup * 0.5 + strike * 0.55;
      bj['lengan-kiri-atas'].rotation.z = -0.05 * breathe - strike * 0.35 + windup * 0.2;
      bj['lengan-kiri-bawah'].rotation.z = -strike * 0.45;

      const nb = nagaUniforms.uBoneAng.value as number[];
      nagaPuppet.joints.kepala.rotation.z = -nb[0] * 1.3;

      // ── Titik sentuh: proyeksikan titik dunia ke layar, tulis langsung ke elemen DOM ──
      const toScreen = (wx: number, wy: number) => {
        const v = new THREE.Vector3(wx, wy, 0).project(camera);
        return [(v.x * 0.5 + 0.5) * 100, (0.5 - v.y * 0.5) * 100] as const;
      };
      // Titik pada latar memakai koordinat gambar latar (0..1), mengikuti zoom/geser latar.
      const onBg = (u: number, v: number) => {
        const z = Math.max(1, sim.zoom);
        const effW = baseDims.bgW * sim.bgScale * z;
        const effH = baseDims.bgH * sim.bgScale * z;
        return toScreen(bgMesh.position.x + (u - 0.5 - sim.panX) * effW, bgMesh.position.y + (0.5 - v) * effH);
      };
      // Titik pada tokoh memakai koordinat gambar tokoh (0..1).
      const onMesh = (m: THREE.Object3D, u: number, v: number, padK = 1) =>
        toScreen(m.position.x + (u - 0.5) * (m.scale.x / padK), m.position.y + (0.5 - v) * (m.scale.y / padK));
      // ── Objek yang harus diketuk: "timbul" dari lukisan ──
      // pop  = potongan dari lukisan latar (gua, padepokan, ombak, ...) yang diangkat keluar.
      // char = tokoh yang sudah berupa gambar sendiri (raksasa, dewa, Dewa Ruci, Bima) — diangkat di tempat.
      type PickDef =
        | { kind: 'pop'; pop: PopObjectId }
        | { kind: 'char'; obj: THREE.Object3D; uniforms: Record<string, THREE.IUniform>; padK: number; base: () => THREE.Vector3; flipX?: () => boolean }
        | { kind: 'zone'; u: number; v: number; ru: number; rv: number };
      const pickDefs: Record<string, PickDef> = {
        mimpi: { kind: 'zone', u: 0.5, v: 0.5, ru: 0.32, rv: 0.36 },
        padepokan: { kind: 'pop', pop: 'padepokan' },
        balairung: { kind: 'pop', pop: 'pintu' },
        pamitan: { kind: 'pop', pop: 'bima-pamitan' },
        gua: { kind: 'pop', pop: 'gua' },
        raksasa: { kind: 'char', obj: sprRaksasa1.mesh, uniforms: sprRaksasa1.uniforms, padK: RIG_PAD_K, base: () => sprRaksasa1.mesh.scale.clone() },
        dewa: { kind: 'char', obj: sprDewaBayu.mesh, uniforms: sprDewaBayu.uniforms, padK: 1, base: () => sprDewaBayu.mesh.scale.clone() },
        ombak: { kind: 'pop', pop: 'ombak' },
        telinga: { kind: 'char', obj: sprDewaRuci.mesh, uniforms: sprDewaRuci.uniforms, padK: 1, base: () => sprDewaRuci.mesh.scale.clone() },
        jagat: { kind: 'zone', u: 0.5, v: 0.4, ru: 0.22, rv: 0.3 },
        amarta: { kind: 'pop', pop: 'bima-drona' },
      };
      const activeId = activeHotspotIdRef.current;
      const pick = activeId ? pickDefs[activeId] : undefined;

      // Posisi objek timbul mengikuti latar (zoom & geser) persis di tempat aslinya pada lukisan.
      const z = Math.max(1, sim.zoom);
      const bgEffW = baseDims.bgW * sim.bgScale * z;
      const bgEffH = baseDims.bgH * sim.bgScale * z;
      const bgToWorld = (u: number, v: number) =>
        new THREE.Vector2(bgMesh.position.x + (u - 0.5 - sim.panX) * bgEffW, bgMesh.position.y + (0.5 - v) * bgEffH);

      let hovering = false;
      const mouse = pointerPxRef.current;
      let world: THREE.Vector3 | null = null;
      if (pick && mouse) {
        const rect = renderer.domElement.getBoundingClientRect();
        world = new THREE.Vector3(((mouse.x - rect.left) / rect.width) * 2 - 1, -((mouse.y - rect.top) / rect.height) * 2 + 1, 0).unproject(camera);
      }
      // Uji sentuh memakai bentuk asli objek (alpha gambar), bukan kotak/lingkaran.
      const alphaAt = (tex: THREE.Texture, u: number, v: number) => {
        const img = tex.image as HTMLImageElement | undefined;
        if (!img || !img.width || u < 0 || u > 1 || v < 0 || v > 1) return 0;
        let c = alphaCanvasCache.get(tex);
        if (!c) {
          const cv = document.createElement('canvas');
          cv.width = img.width;
          cv.height = img.height;
          const ctx = cv.getContext('2d', { willReadFrequently: true });
          if (!ctx) return 0;
          ctx.drawImage(img, 0, 0);
          c = ctx;
          alphaCanvasCache.set(tex, c);
        }
        return c.getImageData(Math.floor(u * (img.width - 1)), Math.floor(v * (img.height - 1)), 1, 1).data[3];
      };

      // Animasi menunggu ketukan: objek "bernapas" naik-turun; saat disorot terangkat penuh.
      const waitBreath = reduceMotion ? 0.5 : 0.5 + 0.5 * Math.sin(t * 2.6);
      const waitLift = 0.42 + 0.33 * waitBreath;

      (Object.keys(pops) as PopObjectId[]).forEach((id) => {
        const h = pops[id];
        const active = pick?.kind === 'pop' && pick.pop === id;
        if (!active) {
          h.group.visible = false;
          return;
        }
        const center = bgToWorld(h.u, h.v);
        const w = h.w * bgEffW;
        const hh = h.h * bgEffH;
        if (world) {
          const lu = (world.x - (center.x - w / 2)) / w;
          const lv = 1 - (world.y - (center.y - hh / 2)) / hh;
          hovering = alphaAt(h.uniforms.uTex.value as THREE.Texture, lu, lv) > 60;
        }
        sim.pick += ((hovering ? 1 : waitLift) - sim.pick) * Math.min(1, dt * 10);
        const lift = sim.pick;
        const s = 1 + 0.16 * lift;
        h.group.visible = true;
        h.card.scale.set(w * s, hh * s, 1);
        h.card.position.set(center.x, center.y + hh * 0.07 * lift, 0);
        h.shadow.scale.set(w * s * 1.03, hh * s * 1.03, 1);
        h.shadow.position.set(center.x + w * 0.035 * lift, center.y - hh * 0.04 * lift, 0);
        h.uniforms.uLift.value = lift;
        h.shadowUniforms.uLift.value = lift;
      });

      // Tokoh: diangkat di tempat (membesar, naik sedikit) dan diberi tepi emas.
      // Skala dasar tokoh hanya di-set saat layout; simpan sekali agar pembesaran tidak menumpuk tiap frame.
      for (const d of Object.values(pickDefs)) {
        if (d.kind !== 'char') continue;
        d.uniforms.uPick.value = 0;
        const base = charBaseScale.get(d.obj);
        if (base && base.layoutVersion === layoutVersion) d.obj.scale.copy(base.scale);
        else charBaseScale.set(d.obj, { scale: d.obj.scale.clone(), layoutVersion });
      }
      if (pick?.kind === 'char') {
        const m = pick.obj;
        if (world) {
          const w = Math.abs(m.scale.x) / pick.padK;
          const h = m.scale.y / pick.padK;
          const lu = (world.x - m.position.x) / w + 0.5;
          const lv = 0.5 - (world.y - m.position.y) / h;
          hovering = alphaAt(pick.uniforms.uTex.value as THREE.Texture, lu, lv) > 60;
        }
        sim.pick += ((hovering ? 1 : waitLift) - sim.pick) * Math.min(1, dt * 10);
        const s = 1 + 0.12 * sim.pick;
        m.scale.x *= s;
        m.scale.y *= s;
        m.position.y += (m.scale.y / pick.padK) * 0.05 * sim.pick;
        pick.uniforms.uPick.value = sim.pick;
      } else if (pick?.kind === 'zone') {
        if (world) {
          const u = (world.x - bgMesh.position.x) / bgEffW + 0.5 + sim.panX;
          const v = 0.5 - (world.y - bgMesh.position.y) / bgEffH;
          hovering = Math.hypot((u - pick.u) / pick.ru, (v - pick.v) / pick.rv) < 1;
        }
        sim.pick += ((hovering ? 1 : waitLift * 0.5) - sim.pick) * Math.min(1, dt * 10);
      } else if (!pick) {
        sim.pick += (0 - sim.pick) * Math.min(1, dt * 10);
      }

      // Latar meredup saat ada objek yang harus diketuk, supaya objeknya tampak "keluar" dari lukisan.
      sim.focusDim += ((pick && pick.kind !== 'zone' ? 1 : 0) - sim.focusDim) * Math.min(1, dt * 4);
      bgUniforms.uFocusDim.value = sim.focusDim;
      bgUniforms.uPick.value = pick?.kind === 'zone' ? sim.pick : 0;
      if (pick?.kind === 'zone') {
        (bgUniforms.uPickArea.value as THREE.Vector4).set(pick.u, 1 - pick.v, pick.ru, pick.rv);
      }

      hoveringObjectRef.current = hovering;
      renderer.domElement.style.cursor = hovering ? 'pointer' : '';

      // Penanda tangan diletakkan di tengah objek timbul (objeknya sendiri yang menjadi tombol).
      // Objek kecil (padepokan, pintu): penanda di bawahnya agar objek tidak tertutup.
      const popCenter = (id: PopObjectId) =>
        pops[id].h < 0.3 ? onBg(pops[id].u, pops[id].v + pops[id].h * 0.62 + 0.06) : onBg(pops[id].u, pops[id].v);
      const anchors: Record<string, readonly [number, number]> = {
        mimpi: onBg(0.5, 0.5),
        padepokan: popCenter('padepokan'),
        dewa: onMesh(sprDewaBayu.mesh, 0.5, 0.45),
        balairung: popCenter('pintu'),
        pamitan: popCenter('bima-pamitan'),
        gua: popCenter('gua'),
        raksasa: onMesh(sprRaksasa1.mesh, 0.45, 0.4, RIG_PAD_K),
        ombak: popCenter('ombak'),
        telinga: onMesh(sprDewaRuci.mesh, 0.5, 0.45),
        jagat: toScreen(currentAspect * 0.15, 0.2),
        amarta: popCenter('bima-drona'),
      };
      for (const [key, [x, y]] of Object.entries(anchors)) {
        const el = hotspotElsRef.current[key];
        if (el) {
          // Di layar sempit objek bisa jatuh di luar layar; tahan titik sentuh di area yang terlihat
          // (di bawah balon dialog, di atas teks narasi).
          el.style.left = `${THREE.MathUtils.clamp(x, mob ? 30 : 14, mob ? 70 : 86)}%`;
          el.style.top = `${THREE.MathUtils.clamp(y, 30, 70)}%`;
        }
      }

      renderer.render(scene, camera);
    };
    renderLoop();

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      ro.disconnect();
      [
        bgGeo,
        bimaStandGeo,
        bimaJalanGeo,
        nagaGeo,
        sprDuryudana.geo,
        sprSangkuni.geo,
        sprDurna.geo,
        sprRaksasa1.geo,
        sprRaksasa2.geo,
        sprDewaBayu.geo,
        sprAnoman.geo,
        sprBimaTerjun.geo,
        sprBimaDuduk.geo,
        sprDewaRuci.geo,
      ].forEach((g) => g.dispose());
      [
        bgMat,
        bimaStandMat,
        bimaJalanMat,
        nagaMat,
        sprDuryudana.mat,
        sprSangkuni.mat,
        sprDurna.mat,
        sprRaksasa1.mat,
        sprRaksasa2.mat,
        sprDewaBayu.mat,
        sprAnoman.mat,
        sprBimaTerjun.mat,
        sprBimaDuduk.mat,
        sprDewaRuci.mat,
      ].forEach((m) => m.dispose());
      [
        ...bgTextures,
        texDuryudana,
        texSangkuni,
        texBimaJalan,
        texDurna,
        texBima,
        texRaksasa,
        texDewaBayu,
        texAnoman,
        texBimaTerjun,
        texNaga,
        texBimaDuduk,
        texDewaRuci,
      ].forEach((tx) => tx.dispose());
      bimaPuppet.dispose();
      nagaPuppet.dispose();
      Object.values(pops).forEach((h) => h.dispose());
      scene.clear();
      try {
        renderer.dispose();
      } catch {}
      if (host.contains(canvas)) host.removeChild(canvas);
    };
  }, [reduceMotion]);

  // ── 2. Audio Mood Coordinator ──
  useEffect(() => {
    audioRef.current = new StormSceneAudio();
    return () => {
      audioRef.current?.dispose();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!started || !audioRef.current) return;
    let mood: DewaRuciAudioMood = 'nightmare';
    if (activeScene === 1) mood = 'nightmare';
    else if (activeScene === 2 || activeScene === 8) mood = 'path';
    else if (activeScene === 3 || activeScene === 6 || activeScene === 7) mood = 'astina';
    else if (activeScene === 4 || activeScene === 5) mood = activeScene === 5 && caveCleared ? 'path' : 'forest';
    else if (activeScene === 9) mood = 'storm';
    else if (activeScene === 10) mood = nagaHits >= TOTAL_NAGA_HITS ? 'abyss' : 'climax';
    else if (activeScene === 11) mood = enteredGuwa ? 'cosmos' : 'abyss';
    else mood = 'dawn';
    audioRef.current.setMood(mood);
  }, [started, activeScene, caveCleared, nagaHits, enteredGuwa]);

  // ── 3. Panggung terkunci: selama pentas halaman tidak bisa di-scroll, cerita maju lewat tombol. ──
  useEffect(() => {
    if (!started) return;
    const lenis = window.lenisInstance;
    lenis?.stop();
    window.scrollTo(0, 0);
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [started]);

  // Pentas bertahap: adegan hanya berganti lewat tombol/aksi, tidak lewat scroll.
  const goToScene = useCallback((sceneNum: SceneId) => {
    setUnlockedScene((u) => Math.max(u, sceneNum) as SceneId);
    setActiveScene(sceneNum);
    setLocalProgress(0);
  }, []);

  const handleStartShow = () => {
    setStarted(true);
    if (audioRef.current) {
      audioRef.current.startAtmosphere();
      audioRef.current.playCempala();
      audioRef.current.setMood('nightmare');
      if (!muted) audioRef.current.startGamelan();
    }
  };

  const handleToggleMute = () => {
    const next = !muted;
    setMuted(next);
    audioRef.current?.setMuted(next);
  };

  // Combat & Choices
  const queueCave = (ms: number, fn: () => void) => {
    caveTimersRef.current.push(window.setTimeout(fn, reduceMotion ? Math.min(ms, 200) : ms));
  };

  // Amarah: tebasan kena, Rukmuka roboh, Rukmakala melangkahinya, Rukmuka bangkit lagi.
  const handleAngerStrikeCave = () => {
    simRef.current.angerT = 0;
    setCaveAngerTried(true);
    queueCave(240, () => {
      simRef.current.shake = 0.7;
      simRef.current.angerBounce = 1.0;
      audioRef.current?.playSlash();
    });
    queueCave(900, () => audioRef.current?.playKenong());
  };

  // Hening: tarik napas dulu, baru benturkan kepala kedua raksasa.
  const handleCalmStrikeCave = () => {
    if (caveCalmStarted) return;
    setCaveCalmStarted(true);
    simRef.current.calmT = 0;
    audioRef.current?.playSoftTick();
    queueCave(1350, () => {
      simRef.current.shake = 0.85;
      setSlashFx({ id: Date.now(), x: window.innerWidth * 0.64, y: window.innerHeight * 0.42 });
      audioRef.current?.playSlash();
    });
    queueCave(1900, () => {
      setCaveCleared(true);
      setUnlockedScene((u) => Math.max(u, 8) as SceneId);
      audioRef.current?.playBlessing();
      revealClue(0);
    });
  };

  const handleWalkToAstina = () => {
    if (walkStepDone) return;
    setWalkStepDone(true);
    audioRef.current?.playSoftTick();
    if (pendingSceneScrollRef.current) window.clearTimeout(pendingSceneScrollRef.current);
    pendingSceneScrollRef.current = window.setTimeout(() => {
      pendingSceneScrollRef.current = null;
      goToScene(3);
    }, reduceMotion ? 500 : 1850);
  };

  const handleEnterCave = () => {
    if (enteredCave) return;
    setEnteredCave(true);
    setUnlockedScene((u) => Math.max(u, 5) as SceneId);
    audioRef.current?.playCempala();
    if (pendingSceneScrollRef.current) window.clearTimeout(pendingSceneScrollRef.current);
    pendingSceneScrollRef.current = window.setTimeout(() => {
      pendingSceneScrollRef.current = null;
      goToScene(5);
    }, reduceMotion ? 550 : 2050);
  };

  const handleEnterGuwa = () => {
    setEnteredGuwa(true);
    setUnlockedScene((u) => Math.max(u, 12) as SceneId);
    audioRef.current?.playBlessing();
  };

  const handleGoAmarta = () => {
    setFinalePhase('amarta');
    audioRef.current?.playBlessing();
  };

  const handleCliffJump = () => {
    setJumpedIntoSea(true);
    setUnlockedScene((u) => Math.max(u, 10) as SceneId);
    audioRef.current?.playSplash();
    setTimeout(() => goToScene(10), 1350);
  };

  const handleSlashNaga = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (nagaHits >= TOTAL_NAGA_HITS) return;
    simRef.current.slash = 1.0;
    simRef.current.hitFlash = 1.0;
    simRef.current.shake = 1.0;
    simRef.current.nagaHitT = 0;

    const x = e ? e.clientX : window.innerWidth * 0.62;
    const y = e ? e.clientY : window.innerHeight * 0.45;
    setSlashFx({ id: Date.now(), x, y });

    const next = nagaHits + 1;
    setNagaHits(next);
    audioRef.current?.playSlash();

    if (next >= TOTAL_NAGA_HITS) {
      setUnlockedScene((u) => Math.max(u, 11) as SceneId);
      revealClue(2);
      setTimeout(() => {
        audioRef.current?.playGong();
        setTimeout(() => goToScene(11), 1100);
      }, 150);
    }
  };

  const handleReplay = () => {
    setUnlockedScene(3);
    setDreamTurn(0);
    setWalkStepDone(false);
    simRef.current.pathWalkProg = 0;
    simRef.current.pathEnterActive = false;
    simRef.current.pathEnterElapsed = 0;
    setAstina1Turn(0);
    setAttitude(null);
    setEnteredCave(false);
    simRef.current.caveEntryProg = 0;
    simRef.current.caveEnterActive = false;
    simRef.current.caveEnterElapsed = 0;
    simRef.current.caveWalkAmp = 0;
    setCaveAngerTried(false);
    setCaveCleared(false);
    setCaveCalmStarted(false);
    caveTimersRef.current.forEach((id) => window.clearTimeout(id));
    caveTimersRef.current = [];
    simRef.current.angerT = -1;
    simRef.current.calmT = -1;
    setDewaTurn(0);
    setAstina2Turn(0);
    setPamitanTurn(0);
    setAnomanTurn(0);
    setAnomanChoice(null);
    setJumpedIntoSea(false);
    setSeaChoice(null);
    if (pendingSceneScrollRef.current) {
      window.clearTimeout(pendingSceneScrollRef.current);
      pendingSceneScrollRef.current = null;
    }
    if (pendingSeaTimerRef.current) {
      window.clearTimeout(pendingSeaTimerRef.current);
      pendingSeaTimerRef.current = null;
    }
    setPendingSeaChoice(null);
    setNagaHits(0);
    setDewaRuciTurn(0);
    setEnteredGuwa(false);
    setSelectedColor('putih');
    setWaterGuess(null);
    setCluesOpen(false);
    setClueToast(null);
    setFinalePhase('shore');
    setAutoPlay(false);
    setActiveScene(1);
    setLocalProgress(0);
    audioRef.current?.playCempala();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerPxRef.current = { x: e.clientX, y: e.clientY };
    if (e.pointerType !== 'mouse') return;
    simRef.current.pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
    simRef.current.pointerY = -(e.clientY / window.innerHeight - 0.5) * 2;
  };

  const activeNafsu = NAFSU_COLORS.find((c) => c.id === selectedColor) || NAFSU_COLORS[3];
  const nafsuRecap: Record<string, string> = {
    hitam: 'Di tepi tebing, takut kehilangan nyawa hampir membuat Bima pulang. Kamu memilih tetap terjun.',
    merah: caveAngerTried
      ? 'Di gua kamu sempat memukul dengan amarah, dan raksasa justru bangkit lagi. Itulah Merah yang liar.'
      : 'Di gua kamu langsung menahan amarah, dan raksasa pun runtuh. Itulah Merah yang terkendali.',
    kuning:
      anomanChoice === 'teguh'
        ? 'Anoman menilai Drona dari luarnya. Kamu tidak ikut silau oleh penilaian luar itu.'
        : 'Anoman menawarkan jalan yang terlihat lebih aman. Kamu tetap memegang tekadmu sendiri.',
    putih:
      seaChoice === 'hening'
        ? 'Saat dibelit naga, kamu memilih hening. Ketenangan itulah yang memutus belitan.'
        : 'Saat dibelit naga, kamu memilih menerjang, tetapi belitan baru putus ketika Bima berhenti meronta.',
  };
  const prologCard = PROLOG_INTRO[prologStep];

  const playerTitle =
    attitude === 'patuh' && seaChoice === 'hening'
      ? 'Satria Suci Hening Cipta'
      : attitude === 'waspada' && seaChoice === 'terjang'
        ? 'Satria Tangguh Pantang Gentar'
        : attitude === 'patuh'
          ? 'Satria Amanah Tanpa Ragu'
          : 'Satria Bijak Penjaga Nurani';

  // Dialogue script per scene
  const dreamLines: BubbleLine[] = [
    {
      speaker: 'Prabu Duryudana',
      side: 'left',
      text: 'Tiga malam berturut-turut aku bermimpi perang Baratayudha! Dursasana dicabik-cabik Werkudara hingga tak bisa dikenali...',
    },
    {
      speaker: 'Patih Sangkuni',
      side: 'right',
      text: 'Paduka tak perlu mengotori tangan sendiri. Resi Drona berutang budi pada takhta Astina—biar ia menjerumuskan Bima lewat syarat berguru yang mustahil.',
    },
  ];

  const astina1Lines: BubbleLine[] = [
    {
      speaker: 'Sang Bima',
      side: 'right',
      text: 'Guru Drona, aku tak butuh ajian perang. Ajari aku Sangkan Paraning Dumadi—dari mana hidupku berasal, dan untuk apa sebenarnya aku ada.',
    },
    {
      speaker: 'Resi Drona',
      side: 'left',
      text: 'Bila engkau sungguh siap, buktikan dulu. Carilah Kayu Gung Susuhing Angin—kayu besar yang menjadi sarang angin—di Gua Sigrangga, puncak Gunung Candramuka.',
    },
  ];

  const dewaLines: BubbleLine[] = [
    {
      speaker: 'Batara Indra & Bayu',
      side: 'right',
      text: 'Terima kasih telah membebaskan kami dari kutukan, Werkudara. Ketahuilah: Kayu Gung Susuhing Angin bukanlah pohon—melainkan raga dan napasmu sendiri.',
    },
    {
      speaker: 'Sang Bima',
      side: 'left',
      text: 'Jadi guruku hanya memberiku teka-teki? Mengapa harus lewat pertarungan raksasa ini?',
    },
    {
      speaker: 'Batara Bayu',
      side: 'right',
      text: 'Rukmuka dan Rukmakala adalah godaan kenikmatan perut dan harta. Kenakan cincin Mustika Manik Candrama ini agar selamat di air, lalu pulanglah melapor kepada Drona.',
    },
  ];

  const astina2Lines: BubbleLine[] = [
    {
      speaker: 'Sang Bima',
      side: 'right',
      text: 'Guru, kayu itu tak ada di Candramuka—hanya dua dewa yang membuka maknanya. Sekarang aku siap menerima ajaran Sejatining Urip!',
    },
    {
      speaker: 'Resi Drona (terkejut)',
      side: 'left',
      text: '(Gila, ia selamat!) Ehm... engkau baru lulus syarat pertama, Bima. Ilmu itu baru lengkap bila kau temukan air suci Tirta Perwitasari di dasar Samudra Minangkalbu!',
    },
  ];

  const pamitanLines: BubbleLine[] = [
    {
      speaker: 'Dewi Kunti & Adik-Adik Pandawa',
      side: 'left',
      text: 'Jangan pergi, Kakang Bima! Itu pasti jebakan Sangkuni—tak seorang pun pernah selamat mencebur ke Laut Kidul!',
    },
    {
      speaker: 'Sang Bima',
      side: 'right',
      text: 'Ibu, Puntadewa, Adik-adikku—jika niatku bengkok, biarlah aku dimangsa ombak. Tapi kalau niatku suci mencari kebenaran, doakan aku kembali.',
    },
  ];

  const anomanLines: BubbleLine[] = [
    {
      speaker: 'Resi Anoman',
      side: 'right',
      text: 'Hentikan langkahmu, Adikku! Drona itu guru perang yang terikat harta Astina—bukan guru kebatinan! Mengapa masih kau turuti perintah mautnya?',
    },
    {
      speaker: 'Sang Bima',
      side: 'left',
      text: 'Kakang Anoman terlalu cepat menilai dari luar! Guru yang menunjuk jalan saja tak boleh direndahkan—kebenaran ini tetap kujemput dengan kakiku sendiri.',
    },
  ];

  const dewaRuciLines: BubbleLine[] = [
    {
      speaker: 'Sang Dewa Ruci',
      side: 'right',
      text: 'Werkudara, kau sudah naik gunung dan turun ke dasar laut. Menurutmu, di mana air suci itu sebenarnya?',
    },
    waterGuess === 'diri'
      ? {
          speaker: 'Sang Dewa Ruci',
          side: 'right',
          text: 'Benar. Tirta Perwitasari tidak ada di gunung atau laut. Ia bersemayam di dalam dirimu sendiri.',
        }
      : {
          speaker: 'Sang Dewa Ruci',
          side: 'right',
          text: 'Kau masih mencarinya di luar. Tirta Perwitasari tidak ada di gunung atau laut. Ia bersemayam di dalam dirimu sendiri.',
        },
    {
      speaker: 'Sang Bima (bersimpuh)',
      side: 'left',
      text: 'Ampun, Guru Sejati... bagaimana raga sebesar diriku sanggup masuk ke dalam tubuh-Mu yang sekecil telapak tangan?',
    },
    {
      speaker: 'Sang Dewa Ruci',
      side: 'right',
      text: 'Bumi, langit, dan samudra pun muat di dalam batin yang jernih. Masuklah ke dalam diriku melalui telinga kiriku.',
    },
  ];

  // Dialog maju per beat: hanya lewat tombol Lanjut / ketuk balon / Spasi.
  const curDreamTurn = dreamTurn;
  const curAstina1Turn = astina1Turn;
  const curDewaTurn = dewaTurn;
  const curAstina2Turn = astina2Turn;
  const curPamitanTurn = pamitanTurn;
  const curAnomanTurn = anomanTurn;
  // Aksi dan pilihan adegan baru muncul setelah semua baris dialognya selesai.
  const dialogueDone =
    activeScene === 1
      ? curDreamTurn >= dreamLines.length - 1
      : activeScene === 3
        ? curAstina1Turn >= astina1Lines.length - 1
        : activeScene === 6
          ? curAstina2Turn >= astina2Lines.length - 1
          : activeScene === 7
            ? curPamitanTurn >= pamitanLines.length - 1
            : activeScene === 8
              ? curAnomanTurn >= anomanLines.length - 1
              : true;
  // Tunggu tebakan penonton dulu; setelah itu dialog maju lewat ketukan.
  const curDewaRuciTurn = waterGuess ? Math.min(Math.max(1, dewaRuciTurn), dewaRuciLines.length - 1) : 0;

  const narrationByScene: Record<SceneId, string> = {
    1: 'Duryudana takut kalah perang. Sangkuni menyusun jebakan: memakai rasa hormat Bima kepada gurunya.',
    2: 'Bima berjalan sendirian menuju gurunya, membawa satu pertanyaan: untuk apa aku hidup?',
    3: 'Drona memberi syarat mustahil: mencari Kayu Gung Susuhing Angin di gunung angker yang dihuni raksasa.',
    4: 'Bima tiba di puncak Gunung Candramuka. Tak ada kayu, hanya gua gelap berkabut.',
    5: caveCleared
      ? 'Raksasa itu ternyata dewa yang dikutuk. Pelajaran pertama: yang dicari bukan di luar, tetapi raga dan napas sendiri.'
      : 'Dua raksasa saling menghidupkan kembali. Dipukul dengan amarah, mereka bangkit lagi. Coba cara lain.',
    6: 'Kaget Bima pulang selamat, Drona memberi ujian yang lebih mematikan: menyelam ke dasar samudra.',
    7: 'Ibu dan adik-adiknya menangis memohon. Bima tetap berangkat, hanya meminta doa restu.',
    8: 'Di tengah jalan, Resi Anoman mencoba menghentikan Bima dan menguji keyakinannya.',
    9: jumpedIntoSea
      ? 'Bima terjun menembus ombak. Berkat cincin Mustika Manik Candrama, ia tidak tenggelam.'
      : 'Di tepi tebing, Bima yang perkasa pun merasa takut. Ia tak bisa berenang.',
    10:
      nagaHits < TOTAL_NAGA_HITS
        ? 'Naga Nemburnawa membelit Bima. Makin panik ia meronta, makin erat belitannya.'
        : 'Naga sirna. Bima berhenti melawan dan berserah: mati sajeroning urip, egonya padam.',
    11: enteredGuwa
      ? 'Di dalam diri Dewa Ruci, Bima melihat empat cahaya nafsu. Bukan untuk dibuang, tetapi dikendalikan.'
      : 'Di dasar laut, Bima bertemu Dewa Ruci: dewa mungil yang wajahnya serupa dirinya sendiri.',
    12: 'Bima kembali ke pantai, lalu menolong Drona, guru yang menjebaknya, tanpa dendam.',
  };
  const narration = narrationByScene[activeScene];
  const cluesFound = [caveCleared, Boolean(anomanChoice), nagaHits >= TOTAL_NAGA_HITS];
  const cluesCount = cluesFound.filter(Boolean).length;

  let currentBubble: { line: BubbleLine; hasNext: boolean; onNext: () => void } | null = null;
  if (activeScene === 1) {
    currentBubble = {
      line: dreamLines[curDreamTurn],
      hasNext: curDreamTurn < dreamLines.length - 1,
      onNext: () => {
        setDreamTurn((t) => t + 1);
        audioRef.current?.playSoftTick();
      },
    };
  } else if (activeScene === 2) {
    currentBubble = {
      line: {
        speaker: 'Batin Sang Bima',
        side: 'left',
        text: 'Adik-adikku sibuk mengasah panah dan ilmu perang. Aku tak butuh semua itu—aku hanya ingin tahu untuk apa sebenarnya napasku ini berhembus.',
      },
      hasNext: false,
      onNext: () => {},
    };
  } else if (activeScene === 3) {
    currentBubble = {
      line: astina1Lines[curAstina1Turn],
      hasNext: curAstina1Turn < astina1Lines.length - 1,
      onNext: () => {
        setAstina1Turn((t) => t + 1);
        audioRef.current?.playSoftTick();
      },
    };
  } else if (activeScene === 4) {
    currentBubble = {
      line: {
        speaker: 'Sang Bima',
        side: 'left',
        text: 'Tak ada kayu apa pun di puncak tandus ini... Hanya ada mulut gua gelap yang menganga di balik kabut.',
      },
      hasNext: false,
      onNext: () => {},
    };
  } else if (activeScene === 5) {
    currentBubble = !caveCleared
      ? {
          line: {
            speaker: 'Ditya Rukmuka & Rukmakala',
            side: 'right',
            text: caveCalmStarted
              ? 'Kenapa kau diam saja?! Ayo, pukul kami!'
              : caveAngerTried
                ? 'Hahahaha! Selama kau menyerang dengan amarah, kami berdua akan terus saling menghidupkan kembali!'
                : 'Berani-beraninya manusia menginjak gua kami! Jadilah santapan kami malam ini!',
          },
          hasNext: false,
          onNext: () => {},
        }
      : {
          line: dewaLines[curDewaTurn],
          hasNext: curDewaTurn < dewaLines.length - 1,
          onNext: () => {
            setDewaTurn((t) => t + 1);
            audioRef.current?.playSoftTick();
          },
        };
  } else if (activeScene === 6) {
    currentBubble = {
      line: astina2Lines[curAstina2Turn],
      hasNext: curAstina2Turn < astina2Lines.length - 1,
      onNext: () => {
        setAstina2Turn((t) => t + 1);
        audioRef.current?.playSoftTick();
      },
    };
  } else if (activeScene === 7) {
    currentBubble = {
      line: pamitanLines[curPamitanTurn],
      hasNext: curPamitanTurn < pamitanLines.length - 1,
      onNext: () => {
        setPamitanTurn((t) => t + 1);
        audioRef.current?.playSoftTick();
      },
    };
  } else if (activeScene === 8) {
    currentBubble = {
      line: anomanLines[curAnomanTurn],
      hasNext: curAnomanTurn < anomanLines.length - 1,
      onNext: () => {
        setAnomanTurn((t) => t + 1);
        audioRef.current?.playSoftTick();
      },
    };
  } else if (activeScene === 9) {
    currentBubble = {
      line: {
        speaker: jumpedIntoSea ? 'Sang Bima' : 'Batin Sang Bima (di ujung tebing)',
        side: 'left',
        text: jumpedIntoSea
          ? 'Hidup dan mati ada di tangan Sang Pencipta! Aku terjun!'
          : 'Ombak ini menggunung... Aku bahkan tak pandai berenang. Haruskah aku pulang? Tapi lihat dua burung gagak itu terbang tenang di tengah badai...',
      },
      hasNext: false,
      onNext: () => {},
    };
  } else if (activeScene === 10) {
    currentBubble = {
      line: {
        speaker: nagaHits >= TOTAL_NAGA_HITS ? 'Sang Bima' : 'Batin Sang Bima (terbelit naga)',
        side: 'left',
        text:
          nagaHits >= TOTAL_NAGA_HITS
            ? 'Lilitan ini putus... Aku terlalu lelah untuk melawan arus. Aku berserah sepenuhnya pada kehendak Yang Maha Hidup.'
            : 'Napasku kian sesak! Makin aku meronta panik, makin erat ular laut raksasa ini meremukkan tulangku!',
      },
      hasNext: false,
      onNext: () => {},
    };
  } else if (activeScene === 11) {
    currentBubble = !enteredGuwa
      ? {
          line: dewaRuciLines[curDewaRuciTurn],
          hasNext: Boolean(waterGuess) && curDewaRuciTurn < dewaRuciLines.length - 1,
          onNext: () => {
            setDewaRuciTurn((t) => t + 1);
            audioRef.current?.playSoftTick();
          },
        }
      : {
          line: {
            speaker: 'Sang Dewa Ruci (di dalam Guwa Garba)',
            side: 'right',
            text: 'Inilah jagat batinmu sendiri, Werkudara. Empat cahaya ini bukan musuh untuk dimusnahkan—kendalikan semuanya agar menyatu selaras dengan Sang Hidup (Manunggaling Kawula Gusti). Namun ingat: setelah mengerti, kau tetap harus pulang ke dunia nyata!',
          },
          hasNext: false,
          onNext: () => {},
        };
  } else if (activeScene === 12 && finalePhase === 'shore') {
    currentBubble = {
      line: {
        speaker: 'Sang Bima (mengangkat Resi Drona)',
        side: 'left',
        text: 'Jangan mencebur, Guru! Air suci itu bukan benda di dasar laut—melainkan kesadaran jernih yang kutemukan berkat jalan yang Guru tunjukkan.',
      },
      hasNext: false,
      onNext: () => {},
    };
  }
  // Adegan gua dimainkan seperti video: tiap baris dibacakan, dialog dewa maju sendiri.
  const caveLineKey = activeScene === 5 && started && currentBubble ? currentBubble.line.text : null;
  useEffect(() => {
    if (!caveLineKey) return;
    if (muted) {
      stopSpeech();
    } else {
      speakLine(caveLineKey.replace(/[“”"]/g, ''));
    }
    if (!caveCleared || dewaTurn >= dewaLines.length - 1) return;
    const id = window.setTimeout(
      () => setDewaTurn((n) => Math.min(n + 1, dewaLines.length - 1)),
      Math.max(4200, caveLineKey.length * 62)
    );
    return () => window.clearTimeout(id);
  }, [caveLineKey, caveCleared, dewaTurn, dewaLines.length, muted]);

  useEffect(() => {
    if (activeScene !== 5) stopSpeech();
  }, [activeScene]);

  useEffect(() => stopSpeech, []);

  // ── Titik sentuh: perpindahan adegan dilakukan dengan mengetuk objek di panggung ──
  const registerHotspot = (id: string, el: HTMLElement | null) => {
    hotspotElsRef.current[id] = el;
  };
  type HotspotDef = { id: string; label: string; hint: string; onActivate: () => void; size?: 'md' | 'lg' };
  const hotspotFor = (): HotspotDef | null => {
    if (activeScene === 1 && dialogueDone)
      return { id: 'mimpi', label: 'Ketuk mimpi untuk terbangun', hint: 'pindah ke kisah Bima', onActivate: () => goToScene(2) };
    if (activeScene === 2 && !walkStepDone)
      return { id: 'padepokan', label: 'Ketuk padepokan', hint: 'Bima melangkah ke Astina', onActivate: handleWalkToAstina };
    if (activeScene === 4 && !enteredCave)
      return { id: 'gua', label: 'Ketuk mulut gua', hint: 'masuk ke Gua Sigrangga', onActivate: handleEnterCave, size: 'lg' };
    if (activeScene === 5 && !caveCleared && !caveCalmStarted && !caveAngerTried)
      return { id: 'raksasa', label: 'Ketuk raksasa untuk memukul', hint: 'serang dengan amarah', onActivate: handleAngerStrikeCave, size: 'lg' };
    if (activeScene === 5 && caveCleared && curDewaTurn >= dewaLines.length - 1)
      return { id: 'dewa', label: 'Terima cincin dari Batara Bayu', hint: 'pulang melapor ke Drona', onActivate: () => goToScene(6) };
    if (activeScene === 6 && dialogueDone)
      return { id: 'balairung', label: 'Ketuk pintu balairung', hint: 'pulang berpamitan ke Amarta', onActivate: () => goToScene(7) };
    if (activeScene === 7 && dialogueDone)
      return { id: 'pamitan', label: 'Ketuk Bima untuk berangkat', hint: 'berjalan ke samudra selatan', onActivate: () => goToScene(8) };
    if (activeScene === 9 && !jumpedIntoSea)
      return { id: 'ombak', label: 'Ketuk ombak untuk terjun', hint: 'Bima terjun ke samudra', onActivate: handleCliffJump, size: 'lg' };
    if (activeScene === 11 && !enteredGuwa && curDewaRuciTurn >= dewaRuciLines.length - 1)
      return { id: 'telinga', label: 'Ketuk telinga kiri Dewa Ruci', hint: 'masuk ke Guwa Garba', onActivate: handleEnterGuwa };
    if (activeScene === 11 && enteredGuwa)
      return { id: 'jagat', label: 'Ketuk cahaya untuk keluar', hint: 'kembali ke dunia nyata', onActivate: () => goToScene(12) };
    if (activeScene === 12 && finalePhase === 'shore')
      return { id: 'amarta', label: 'Ketuk arah Amarta', hint: 'pulang mengabdi', onActivate: handleGoAmarta };
    return null;
  };
  const hotspot = started ? hotspotFor() : null;
  activeHotspotIdRef.current = hotspot?.id ?? null;
  activeHotspotActionRef.current = hotspot?.onActivate ?? null;

  // Klik langsung pada objek di kanvas (bukan hanya titik bulatnya) menjalankan aksi adegan.
  // Di layar sentuh tidak ada "hover", jadi posisi ketukan dipakai untuk uji sentuh pada frame berikutnya.
  const handleStagePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerPxRef.current = { x: e.clientX, y: e.clientY };
    if (!activeHotspotActionRef.current) return;
    if (e.pointerType === 'mouse') {
      if (hoveringObjectRef.current) activeHotspotActionRef.current();
      return;
    }
    const action = activeHotspotActionRef.current;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (hoveringObjectRef.current && activeHotspotActionRef.current === action) action();
      })
    );
  };

  // ── Navigasi per langkah: scroll/swipe/Spasi/tombol Lanjut memakai jalur yang sama ──
  // Maju: baris dialog berikutnya. Pilihan dan perpindahan adegan tidak bisa dilewati dengan scroll.
  const prevTurn: (() => void) | null =
    activeScene === 1 && curDreamTurn > 0
      ? () => setDreamTurn((t) => t - 1)
      : activeScene === 3 && curAstina1Turn > 0 && !attitude
        ? () => setAstina1Turn((t) => t - 1)
        : activeScene === 6 && curAstina2Turn > 0
          ? () => setAstina2Turn((t) => t - 1)
          : activeScene === 7 && curPamitanTurn > 0
            ? () => setPamitanTurn((t) => t - 1)
            : activeScene === 8 && curAnomanTurn > 0 && !anomanChoice
              ? () => setAnomanTurn((t) => t - 1)
              : activeScene === 5 && caveCleared && curDewaTurn > 0
                ? () => setDewaTurn((t) => t - 1)
                : null;

  const advanceRef = useRef<(() => void) | null>(null);
  // Scroll/Spasi hanya menjalankan dialog; perpindahan adegan selalu lewat ketukan objek.
  advanceRef.current = currentBubble?.hasNext ? currentBubble.onNext : null;
  const prevRef = useRef<(() => void) | null>(null);
  // Bila cerita menunggu ketukan objek, scroll/Spasi membuat titik sentuhnya "memanggil".
  const nudgeHotspotRef = useRef<() => boolean>(() => false);
  nudgeHotspotRef.current = () => {
    if (!hotspot) return false;
    const el = hotspotElsRef.current[hotspot.id];
    if (el && !reduceMotion) {
      el.animate(
        [
          { transform: 'translate(-50%, -50%) scale(1)' },
          { transform: 'translate(-50%, -50%) scale(1.35)', offset: 0.35 },
          { transform: 'translate(-50%, -50%) scale(1)' },
        ],
        { duration: 520, easing: 'ease-out' }
      );
    }
    audioRef.current?.playSoftTick();
    return true;
  };
  prevRef.current = prevTurn;

  useEffect(() => {
    if (!started) return;
    // Satu "ketukan" scroll = satu langkah. Jeda kunci mencegah inersia trackpad melompati banyak baris.
    const STEP_LOCK_MS = 650;
    let lockedUntil = 0;
    const step = (dir: 1 | -1) => {
      const now = Date.now();
      if (now < lockedUntil) return;
      lockedUntil = now + STEP_LOCK_MS;
      if (dir === 1) {
        if (advanceRef.current) advanceRef.current();
        else if (!nudgeHotspotRef.current()) triggerChoiceReminder();
      } else {
        prevRef.current?.();
      }
    };

    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON' || tag === 'A') return;
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        step(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        step(-1);
      }
    };

    // Satu gerakan roda/trackpad = satu langkah. Setelah melangkah, sisa event dari gerakan yang
    // sama (termasuk inersia trackpad) diabaikan sampai roda diam sejenak.
    let wheelAcc = 0;
    let wheelSpent = false;
    let wheelIdle = 0;
    const onWheel = (e: WheelEvent) => {
      window.clearTimeout(wheelIdle);
      wheelIdle = window.setTimeout(() => {
        wheelAcc = 0;
        wheelSpent = false;
      }, 220);
      if (wheelSpent) return;
      wheelAcc += e.deltaY;
      if (Math.abs(wheelAcc) < 40) return;
      wheelSpent = true;
      step(wheelAcc > 0 ? 1 : -1);
    };

    // Swipe ke atas di HP = maju, swipe ke bawah = mundur (seperti scroll).
    let touchY = 0;
    let touchX = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0;
      touchX = e.touches[0]?.clientX ?? 0;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      if (!t) return;
      const dy = touchY - t.clientY;
      if (Math.abs(dy) < 45 || Math.abs(dy) < Math.abs(touchX - t.clientX)) return;
      step(dy > 0 ? 1 : -1);
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.clearTimeout(wheelIdle);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [started, triggerChoiceReminder]);

  // Putar Otomatis: menekan "Lanjut" sendiri tiap beberapa detik; berhenti di pilihan dan aksi.
  const bubbleKey = currentBubble ? `${activeScene}:${currentBubble.line.text}` : null;
  // Di titik pilihan/aksi tidak ada "Lanjut", jadi timer tidak dipasang dan pentas menunggu user.
  const bubbleLen = currentBubble?.line.text.length ?? 80;
  const canAutoAdvance = Boolean(currentBubble?.hasNext);
  useEffect(() => {
    if (!autoPlay || !started || !canAutoAdvance) return;
    const id = window.setTimeout(() => advanceRef.current?.(), Math.max(3200, bubbleLen * 55));
    return () => window.clearTimeout(id);
  }, [autoPlay, started, canAutoAdvance, bubbleKey, bubbleLen]);


  const kayonChoiceConfig: {
    prompt: string;
    reminderPrompt: string;
    options: Array<{
      numeral: string;
      quote: string;
      stance: string;
      selected: boolean;
      onClick: () => void;
    }>;
  } | null =
    activeScene === 3 && dialogueDone
      ? {
          prompt: !attitude ? 'Sikap Bima' : 'Sikap Bima Terpilih',
          reminderPrompt: 'Pilih sikap Bima dulu untuk lanjut',
          options: [
            {
              numeral: 'I',
              quote: '“Sabda guru pantang kubantah—aku berangkat!”',
              stance: 'Patuh',
              selected: attitude === 'patuh',
              onClick: () => {
                setChoiceReminderActive(false);
                setAttitude('patuh');
                setUnlockedScene((u) => Math.max(u, 4) as SceneId);
                audioRef.current?.playKenong();
                if (pendingSceneScrollRef.current) window.clearTimeout(pendingSceneScrollRef.current);
                pendingSceneScrollRef.current = window.setTimeout(() => {
                  pendingSceneScrollRef.current = null;
                  goToScene(4);
                }, 420);
              },
            },
            {
              numeral: 'II',
              quote: '“Meski Sangkuni menebar muslihat, aku tetap pergi.”',
              stance: 'Waspada',
              selected: attitude === 'waspada',
              onClick: () => {
                setChoiceReminderActive(false);
                setAttitude('waspada');
                setUnlockedScene((u) => Math.max(u, 4) as SceneId);
                audioRef.current?.playKenong();
                if (pendingSceneScrollRef.current) window.clearTimeout(pendingSceneScrollRef.current);
                pendingSceneScrollRef.current = window.setTimeout(() => {
                  pendingSceneScrollRef.current = null;
                  goToScene(4);
                }, 420);
              },
            },
          ],
        }
      : activeScene === 8 && dialogueDone
        ? {
            prompt: !anomanChoice ? 'Jawaban kepada Resi Anoman' : 'Jawaban Terpilih',
            reminderPrompt: 'Pilih jawaban untuk Resi Anoman dulu',
            options: [
              {
                numeral: 'I',
                quote: '“Guru hanya penunjuk jalan—tekadku milikku sendiri.”',
                stance: 'Hormat',
                selected: anomanChoice === 'hormat',
                onClick: () => {
                  setChoiceReminderActive(false);
                  setAnomanChoice('hormat');
                  revealClue(1);
                  setUnlockedScene((u) => Math.max(u, 9) as SceneId);
                  audioRef.current?.playKenong();
                  if (pendingSceneScrollRef.current) window.clearTimeout(pendingSceneScrollRef.current);
                  pendingSceneScrollRef.current = window.setTimeout(() => {
                    pendingSceneScrollRef.current = null;
                    goToScene(9);
                  }, 420);
                },
              },
              {
                numeral: 'II',
                quote: '“Jangan memandang guru dari luarnya saja, Kakang.”',
                stance: 'Teguh',
                selected: anomanChoice === 'teguh',
                onClick: () => {
                  setChoiceReminderActive(false);
                  setAnomanChoice('teguh');
                  revealClue(1);
                  setUnlockedScene((u) => Math.max(u, 9) as SceneId);
                  audioRef.current?.playKenong();
                  if (pendingSceneScrollRef.current) window.clearTimeout(pendingSceneScrollRef.current);
                  pendingSceneScrollRef.current = window.setTimeout(() => {
                    pendingSceneScrollRef.current = null;
                    goToScene(9);
                  }, 420);
                },
              },
            ],
          }
        : activeScene === 11 && !enteredGuwa && !waterGuess
          ? {
              prompt: 'Jawab Dewa Ruci',
              reminderPrompt: 'Jawab dulu pertanyaan Dewa Ruci',
              options: (
                [
                  ['I', '“Di dasar samudra ini, tersembunyi di suatu tempat.”', 'Di luar', 'laut'],
                  ['II', '“Mungkin... ia ada di dalam diriku sendiri.”', 'Di dalam', 'diri'],
                ] as const
              ).map(([numeral, quote, stance, guess]) => ({
                numeral,
                quote,
                stance,
                selected: false,
                onClick: () => {
                  setChoiceReminderActive(false);
                  setWaterGuess(guess);
                  setDewaRuciTurn(1);
                  audioRef.current?.playKenong();
                },
              })),
            }
        : activeScene === 10 && nagaHits < TOTAL_NAGA_HITS && !seaChoice
          ? {
              prompt: `Laku Batin · Patahkan Belitan (${nagaHits}/${TOTAL_NAGA_HITS})`,
              reminderPrompt: 'Pilih laku batin dulu untuk melanjutkan',
              options: [
                {
                  numeral: 'I',
                  quote: '“Matikan panik, pusatkan kesadaran tunggal.”',
                  stance: 'Hening',
                  selected: pendingSeaChoice === 'hening',
                  onClick: () => {
                    setChoiceReminderActive(false);
                    setPendingSeaChoice('hening');
                    audioRef.current?.playKenong();
                    if (pendingSeaTimerRef.current) window.clearTimeout(pendingSeaTimerRef.current);
                    pendingSeaTimerRef.current = window.setTimeout(() => {
                      pendingSeaTimerRef.current = null;
                      setSeaChoice('hening');
                      setPendingSeaChoice(null);
                    }, 420);
                  },
                },
                {
                  numeral: 'II',
                  quote: '“Genggam tekad baja, robek sisik naga!”',
                  stance: 'Terjang',
                  selected: pendingSeaChoice === 'terjang',
                  onClick: () => {
                    setChoiceReminderActive(false);
                    setPendingSeaChoice('terjang');
                    audioRef.current?.playKenong();
                    if (pendingSeaTimerRef.current) window.clearTimeout(pendingSeaTimerRef.current);
                    pendingSeaTimerRef.current = window.setTimeout(() => {
                      pendingSeaTimerRef.current = null;
                      setSeaChoice('terjang');
                      setPendingSeaChoice(null);
                    }, 420);
                  },
                },
              ],
            }
          : null;


  const fallbackBgUrl =
    activeScene === 1
      ? '/images/stories/dewa-ruci/bg-mimpi-duryudana.webp'
      : activeScene === 2 || activeScene === 8
        ? '/images/stories/dewa-ruci/bg-padepokan-jalan.webp'
        : activeScene === 3 || activeScene === 6
          ? '/images/stories/dewa-ruci/bg-astina.webp'
          : activeScene === 4 || activeScene === 5
            ? '/images/stories/dewa-ruci/bg-candramuka.webp'
            : activeScene === 7
              ? '/images/stories/dewa-ruci/scene-pamitan-amarta.webp'
              : activeScene === 9
                ? '/images/stories/dewa-ruci/bg-tebing-laut-burung.webp'
                : activeScene === 10
                  ? '/images/stories/dewa-ruci/bg-laut-kidul.webp'
                  : activeScene === 11
                    ? enteredGuwa
                      ? '/images/stories/dewa-ruci/bg-cahaya-jagat.webp'
                      : '/images/stories/dewa-ruci/bg-dasar-samudra.webp'
                    : finalePhase === 'amarta'
                      ? '/images/stories/dewa-ruci/bg-amarta-pagi.webp'
                      : '/images/stories/dewa-ruci/scene-drona-ditolong.webp';

  return (
    <div
      onPointerMove={handlePointerMove}
      className="relative min-h-screen bg-[#050303] text-[#f4e7cd] selection:bg-[#dedf42] selection:text-black"
    >
      {/* ── Fixed Sticky Multi-Scene WebGL2 Stage ── */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-[#050303]">
        <div ref={canvasHostRef} onPointerDown={handleStagePointerDown} className="w-full h-full" />

        {/* Kelir: tirai gelap dengan gunungan, menutup saat pergantian adegan */}
        <div
          ref={curtainRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-[#050303]"
          style={{ opacity: 0, visibility: 'hidden' }}
        >
          <Image
            src="/images/gunungan-emas-bersih.webp"
            alt=""
            width={353}
            height={503}
            priority
            className="h-[38vh] max-h-[340px] w-auto opacity-80 drop-shadow-[0_0_40px_rgba(222,223,66,0.35)]"
          />
        </div>

        {!webglReady && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-80 transition-all duration-700"
            style={{ backgroundImage: `url('${fallbackBgUrl}')` }}
          />
        )}

        <AnimatePresence>
          {slashFx && (
            <motion.svg
              key={slashFx.id}
              initial={{ opacity: 0.95, scale: 0.6, rotate: -22 }}
              animate={{ opacity: 0, scale: 1.45, rotate: -8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.42, ease: 'easeOut' }}
              viewBox="0 0 240 240"
              style={{ left: slashFx.x - 120, top: slashFx.y - 120 }}
              className="pointer-events-none fixed z-30 w-60 h-60 drop-shadow-[0_0_24px_rgba(222,223,66,0.9)]"
            >
              <path d="M28 196 Q 115 88 214 34 Q 138 114 42 212 Z" fill="#dedf42" />
              <path d="M52 212 Q 136 112 222 62 Q 150 132 66 222 Z" fill="#fff6d1" opacity="0.85" />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>

      {/* ── Titik sentuh objek cerita (pengganti tombol perpindahan adegan) ── */}
      <AnimatePresence>
        {hotspot && (
          <Hotspot
            key={`${activeScene}-${hotspot.id}`}
            id={hotspot.id}
            label={hotspot.label}
            hint={hotspot.hint}
            size={hotspot.size}
            onActivate={hotspot.onActivate}
            registerRef={registerHotspot}
          />
        )}
      </AnimatePresence>

      {/* ── Direct Target Reticle: Naga Weak Spot (Scene 10) ── */}
      <AnimatePresence>
        {started && activeScene === 10 && seaChoice && nagaHits < TOTAL_NAGA_HITS && (
          <motion.button
            type="button"
            aria-label="Serang titik lemah Naga Nemburnawa"
            onClick={handleSlashNaga}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            // Titik lemah di kepala naga (posisinya beda di HP karena naga digeser ke belakang Bima)
            style={{ left: 'var(--naga-x, 63%)', top: 'var(--naga-y, 44%)' }}
            className="pointer-events-auto fixed z-20 -translate-x-1/2 -translate-y-1/2 group cursor-crosshair focus:outline-none max-sm:[--naga-x:30%] max-sm:[--naga-y:33%]"
          >
            <span className="absolute inset-0 rounded-full border-2 border-[#dedf42] animate-ping opacity-60" />
            <span className="relative flex size-16 sm:size-20 items-center justify-center rounded-full border-2 border-[#dedf42] bg-[#dedf42]/15 backdrop-blur-[2px] shadow-[0_0_28px_rgba(222,223,66,0.55)] group-hover:scale-110 transition-transform">
              <Swords className="size-6 sm:size-7 text-[#dedf42]" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Progres pentas: 12 babak, yang sudah dilewati menyala ── */}
      {started && (
        <div
          role="progressbar"
          aria-label="Progres pentas"
          aria-valuemin={1}
          aria-valuemax={12}
          aria-valuenow={activeScene}
          className="fixed top-[122px] sm:top-[86px] inset-x-0 z-30 mx-auto flex max-w-md gap-1 px-4 pointer-events-none"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                i + 1 < activeScene ? 'bg-[#dedf42]/70' : i + 1 === activeScene ? 'bg-[#dedf42]' : 'bg-white/15'
              }`}
            />
          ))}
        </div>
      )}

      {/* ── Top Floating HUD (Cleaned: No stage stepper pill bar!) ── */}
      <div className="fixed top-[84px] sm:top-26 inset-x-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2">
          <Link
            href="/kreasi"
            aria-label="Kembali ke Pustaka Kisah"
            className="inline-flex items-center gap-2 rounded-full border border-[#dedf42]/30 bg-black/70 backdrop-blur-md p-2 sm:px-3.5 sm:py-2 font-sans text-xs sm:text-sm text-[#f4e7cd] hover:border-[#dedf42] hover:text-[#dedf42] transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Pustaka Kisah</span>
          </Link>

        </div>

        {started && (
          <div className="pointer-events-auto flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setCluesOpen((v) => !v)}
                aria-expanded={cluesOpen}
                aria-label={`Petunjuk ${cluesCount} dari ${CLUES.length}`}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 sm:px-3.5 font-sans text-xs font-medium backdrop-blur-md transition-colors cursor-pointer ${
                  cluesOpen || clueToast !== null
                    ? 'border-[#dedf42] bg-[#dedf42] text-[#1c0f07]'
                    : 'border-[#dedf42]/30 bg-black/70 text-[#f4e7cd] hover:border-[#dedf42]'
                }`}
              >
                <Lightbulb className="size-3.5" />
                <span>
                  <span className="hidden sm:inline">Petunjuk </span>
                  {cluesCount}/{CLUES.length}
                </span>
              </button>

              <AnimatePresence>
                {(cluesOpen || clueToast !== null) && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute right-0 top-full mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-xl border border-[#dedf42]/40 bg-[#0c0805]/95 p-4 text-left shadow-2xl backdrop-blur-md"
                  >
                    {clueToast !== null && !cluesOpen ? (
                      <>
                        <p className="font-sans text-[10.5px] font-semibold uppercase tracking-wider text-[#dedf42]">
                          Petunjuk baru · {CLUES[clueToast].scene}
                        </p>
                        <p className="mt-1 font-sans text-sm text-[#f4e7cd] leading-relaxed">{CLUES[clueToast].text}</p>
                      </>
                    ) : (
                      <>
                        <p className="font-playfair italic text-base text-[#dedf42]">{CORE_QUESTION}</p>
                        <ol className="mt-2.5 space-y-2">
                          {CLUES.map((clue, i) => (
                            <li key={clue.scene} className="flex gap-2 font-sans text-xs leading-relaxed">
                              <span className="mt-0.5 shrink-0 font-semibold text-[#dedf42]">{i + 1}.</span>
                              {cluesFound[i] ? (
                                <span className="text-[#f4e7cd]">{clue.text}</span>
                              ) : (
                                <span className="text-[#f4e7cd]/40 italic">Belum ditemukan · {clue.scene}</span>
                              )}
                            </li>
                          ))}
                        </ol>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => setAutoPlay((v) => !v)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 font-sans text-xs font-medium backdrop-blur-md transition-colors cursor-pointer ${
                autoPlay
                  ? 'border-[#dedf42] bg-[#dedf42] text-[#1c0f07]'
                  : 'border-[#dedf42]/30 bg-black/70 text-[#f4e7cd] hover:border-[#dedf42]'
              }`}
            >
              {autoPlay ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              <span className="hidden sm:inline">{autoPlay ? 'Jeda' : 'Putar Otomatis'}</span>
            </button>

            <button
              type="button"
              onClick={handleToggleMute}
              aria-label={muted ? 'Nyalakan suara' : 'Bisukan suara'}
              className="inline-flex items-center justify-center rounded-full border border-[#dedf42]/30 bg-black/70 backdrop-blur-md p-2 text-[#dedf42] hover:border-[#dedf42] transition-colors cursor-pointer"
            >
              {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </button>
          </div>
        )}
      </div>

      {/* ── Beat 0: Prolog Penjelas Awal ── */}
      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#050303]/85 backdrop-blur-[5px] px-5 py-20 text-center overflow-y-auto"
          >
            <div className="max-w-xl w-full">
              <p lang="jv" className="font-serif text-base sm:text-xl tracking-[0.2em] text-[#dedf42]/80">
                ꦭꦏꦺꦴꦤ꧀ꦢꦺꦮꦫꦸꦕꦶ
              </p>
              <h1 className="mt-1.5 font-playfair font-normal text-3xl sm:text-5xl text-[#f4e7cd] tracking-tight">
                Lakon Dewa Ruci
              </h1>
              <p className="mt-2 font-sans text-xs sm:text-sm text-[#f4e7cd]/70">
                Pahami latar masalahnya sejenak sebelum layar panggung dibuka:
              </p>

              <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
                {PROLOG_INTRO.map((card, idx) => {
                  const isActive = prologStep === idx;
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => setPrologStep(idx)}
                      className={`px-3.5 py-1.5 rounded-full border font-sans text-xs transition-colors cursor-pointer ${
                        isActive
                          ? 'border-[#dedf42] bg-[#dedf42] text-[#1c0f07] font-semibold'
                          : 'border-[#dedf42]/30 bg-black/50 text-[#f4e7cd]/75 hover:border-[#dedf42]'
                      }`}
                    >
                      {card.tab}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 rounded-2xl border border-[#dedf42]/35 bg-[#0c0805]/90 p-5 sm:p-6 text-left shadow-2xl min-h-[160px] flex flex-col justify-between">
                <div>
                  <h2 className="font-playfair font-normal text-xl sm:text-2xl text-[#dedf42]">
                    {prologCard.title}
                  </h2>
                  <p className="mt-2 font-sans text-sm sm:text-[15px] text-[#f4e7cd]/90 leading-relaxed">
                    {prologCard.body}
                  </p>
                </div>

                {prologStep < PROLOG_INTRO.length - 1 && (
                  <button
                    type="button"
                    onClick={() => setPrologStep((s) => s + 1)}
                    className="mt-3 inline-flex items-center gap-1 self-end font-sans text-xs font-semibold text-[#dedf42] hover:underline cursor-pointer"
                  >
                    <span>Lanjut latar berikutnya</span>
                    <ChevronRight className="size-3.5" />
                  </button>
                )}
              </div>

              <p className="mt-5 font-playfair italic text-lg sm:text-xl text-[#dedf42]">{CORE_QUESTION}</p>
              <p className="mt-1 font-sans text-xs text-[#f4e7cd]/65">
                Simpan pertanyaan ini. Kumpulkan petunjuknya sepanjang cerita.
              </p>

              <button
                type="button"
                onClick={handleStartShow}
                className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-[#dedf42] px-7 py-3.5 font-sans text-sm sm:text-base font-semibold text-[#1c0f07] shadow-[0_12px_35px_rgba(222,223,66,0.35)] hover:bg-[#f4e7cd] transition-colors cursor-pointer"
              >
                <span>Ketuk Cempala &amp; Buka Adegan 1</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FIXED DIALOGUE BUBBLE OVERLAY (Appears in place, DOES NOT scroll off!) ── */}
      {/* ── FIXED AUTHENTIC COMIC SPEECH BALLOON OVERLAY (Scroll-driven, genuine tail & lozenge shape) ── */}
      {started && currentBubble && (
        <div
          className={`fixed inset-x-0 z-20 max-w-5xl mx-auto px-4 sm:px-8 pointer-events-none ${
            activeScene === 9 ? 'top-[142px] sm:top-32' : 'top-[136px] sm:top-32'
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeScene}-${currentBubble.line.speaker}-${currentBubble.line.text.slice(0, 18)}`}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              onClick={currentBubble.hasNext ? currentBubble.onNext : undefined}
              className={`pointer-events-auto relative max-w-sm sm:max-w-md rounded-[26px] border-2 border-[#dedf42]/70 bg-[#120a05]/95 backdrop-blur-md px-5 py-3.5 sm:px-6 sm:py-4 shadow-[0_20px_50px_rgba(0,0,0,0.95)] ${
                activeScene === 9
                  ? 'mx-auto sm:ml-[42%] sm:mr-auto'
                  : currentBubble.line.side === 'left'
                    ? 'mr-auto'
                    : currentBubble.line.side === 'right'
                      ? 'ml-auto'
                      : 'mx-auto'
              } ${currentBubble.hasNext ? 'cursor-pointer' : ''}`}
            >
              {/* Comic Speaker Tag + Scroll Indicator */}
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#dedf42] text-[#1c0f07] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider shadow-sm">
                  {currentBubble.line.speaker}
                </span>
                {currentBubble.hasNext && (
                  <span className="text-[10px] font-sans text-[#dedf42]/80 italic flex items-center gap-1">
                    <span>scroll untuk lanjut</span>
                    <ChevronDown className="size-3 animate-bounce" />
                  </span>
                )}
              </div>

              <p className="font-sans text-xs sm:text-sm md:text-[14.5px] text-[#fcf8ec] leading-relaxed">
                “<Glossed text={currentBubble.line.text} />”
              </p>

              {/* Authentic Speech Balloon Tail or Thought Bubbles */}
              {currentBubble.line.speaker.includes('Batin') ? (
                <div
                  className={`absolute -bottom-4 flex flex-col items-center gap-1 ${
                    activeScene === 9
                      ? 'left-8'
                      : currentBubble.line.side === 'right'
                        ? 'right-10'
                        : 'left-10'
                  }`}
                >
                  <span className="size-2 rounded-full border-2 border-[#dedf42]/70 bg-[#120a05]" />
                  <span className="size-1.5 rounded-full border border-[#dedf42]/60 bg-[#120a05]" />
                </div>
              ) : currentBubble.line.side === 'left' ? (
                <div className="absolute -bottom-3 left-10 w-5 h-3 overflow-hidden pointer-events-none">
                  <div className="w-4 h-4 bg-[#120a05] border-r-2 border-b-2 border-[#dedf42]/70 rotate-45 -translate-y-2 translate-x-0.5" />
                </div>
              ) : currentBubble.line.side === 'right' ? (
                <div className="absolute -bottom-3 right-10 w-5 h-3 overflow-hidden pointer-events-none">
                  <div className="w-4 h-4 bg-[#120a05] border-r-2 border-b-2 border-[#dedf42]/70 rotate-45 -translate-y-2 translate-x-0.5" />
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ── FIXED NARRATOR TEXT OVERLAY (NO CARD / NO BACKGROUND COLOR — Pure glowing typography!) ── */}
      {started && !(activeScene === 12 && finalePhase === 'amarta') && (
        <div
          className={
            kayonChoiceConfig
              ? 'fixed bottom-0 inset-x-0 z-20 pointer-events-none bg-gradient-to-t from-[#050303]/92 via-[#050303]/55 to-transparent pt-6 pb-3.5 sm:pb-5 px-4 sm:px-6 text-center'
              : 'fixed bottom-6 sm:bottom-8 inset-x-0 z-20 max-w-2xl mx-auto px-7 sm:px-6 pointer-events-none text-center'
          }
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`narrator-scene-${activeScene}-${activeScene === 5 ? (caveCleared ? 'cleared' : 'combat') : ''}-${activeScene === 11 ? (enteredGuwa ? 'guwa' : 'pre') : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={kayonChoiceConfig ? 'w-full max-w-2xl mx-auto flex flex-col items-center' : 'w-full flex flex-col items-center'}
            >
              {kayonChoiceConfig && (
                <div
                  ref={kayonGroupRef}
                  className="flex flex-col items-center gap-2 w-full max-w-xl mx-auto mb-3 will-change-transform"
                >
                  <div
                    role="status"
                    aria-live="polite"
                    className="flex items-center justify-center gap-3 w-full max-w-xl mx-auto"
                  >
                    <span
                      className={`h-px flex-1 bg-gradient-to-r from-transparent transition-colors duration-300 ${
                        choiceReminderActive ? 'to-[#dedf42]' : 'to-[#d9a441]/55'
                      }`}
                    />
                    <span
                      className={`inline-flex items-center gap-2 font-sans text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.18em] transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] ${
                        choiceReminderActive ? 'text-[#dedf42]' : 'text-[#e8c668]'
                      }`}
                    >
                      <span
                        className={`size-1.5 rotate-45 transition-all duration-300 ${
                          choiceReminderActive
                            ? 'bg-[#dedf42] scale-125 shadow-[0_0_8px_#dedf42]'
                            : 'bg-[#d9a441]'
                        }`}
                        aria-hidden="true"
                      />
                      <span>
                        {choiceReminderActive
                          ? kayonChoiceConfig.reminderPrompt
                          : kayonChoiceConfig.prompt}
                      </span>
                      <span
                        className={`size-1.5 rotate-45 transition-all duration-300 ${
                          choiceReminderActive
                            ? 'bg-[#dedf42] scale-125 shadow-[0_0_8px_#dedf42]'
                            : 'bg-[#d9a441]'
                        }`}
                        aria-hidden="true"
                      />
                    </span>
                    <span
                      className={`h-px flex-1 bg-gradient-to-l from-transparent transition-colors duration-300 ${
                        choiceReminderActive ? 'to-[#dedf42]' : 'to-[#d9a441]/55'
                      }`}
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    {kayonChoiceConfig.options.map((opt) => (
                      <PlakatKayonButton
                        key={opt.numeral}
                        numeral={opt.numeral}
                        quote={opt.quote}
                        stance={opt.stance}
                        selected={opt.selected}
                        reminding={choiceReminderActive}
                        onClick={opt.onClick}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Scene Label + Optional Makna button */}
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="font-sans text-[11px] font-bold text-[#dedf42] uppercase tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.98)]">
                  {activeScene === 1 && 'Adegan 1 · Awal Mula di Istana Astina'}
                  {activeScene === 2 && 'Adegan 2 · Langkah Senja Menuju Guru'}
                  {activeScene === 3 && 'Adegan 3 · Perintah Guru & Jebakan'}
                  {activeScene === 4 && 'Adegan 4 · Memasuki Gua Candramuka'}
                  {activeScene === 5 &&
                    (caveCleared
                      ? 'Adegan 5 · Rahasia Kayu Gung Susuhing Angin'
                      : 'Adegan 5 · Dua Raksasa Penunggu Gua')}
                  {activeScene === 6 && 'Adegan 6 · Syarat Kedua: Samudra Minangkalbu'}
                  {activeScene === 7 && 'Adegan 7 · Perpisahan di Kerajaan Amarta'}
                  {activeScene === 8 && 'Adegan 8 · Dihadang Resi Anoman'}
                  {activeScene === 9 && 'Adegan 9 · Bibir Tebing Laut Kidul'}
                  {activeScene === 10 &&
                    (nagaHits >= TOTAL_NAGA_HITS
                      ? 'Adegan 10 · Belitan Terputus, Bima Berserah'
                      : 'Adegan 10 · Pertarungan Naga Nemburnawa')}
                  {activeScene === 11 &&
                    (!enteredGuwa
                      ? 'Adegan 11 · Pertemuan Sang Dewa Ruci'
                      : 'Adegan 11 · Jagat Batin & 4 Warna Nafsu')}
                  {activeScene === 12 && 'Adegan 12 · Kembali ke Realitas'}
                </span>

                {(activeScene === 3 || activeScene === 5 || activeScene === 6 || activeScene === 8 || activeScene === 10) && (
                  <button
                    type="button"
                    onClick={() => setMeaningOpenScene(showMeaning ? null : activeScene)}
                    className="pointer-events-auto inline-flex items-center gap-1 font-sans text-[11px] text-[#dedf42] hover:brightness-125 transition-all cursor-pointer drop-shadow-[0_2px_8px_rgba(0,0,0,0.98)]"
                  >
                    <Lightbulb className="size-3" />
                    <span className="underline decoration-dotted underline-offset-2">
                      {showMeaning ? 'Tutup makna' : 'Makna nyata'}
                    </span>
                  </button>
                )}
              </div>

              {/* Pure Text Narration — No background card */}
              <p className="font-sans text-xs sm:text-sm text-[#f4e7cd] leading-relaxed max-w-xl drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
                <Glossed text={narration} />
              </p>

              {/* Collapsible Makna Note */}
              <AnimatePresence>
                {showMeaning && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 font-sans text-xs text-[#dedf42] leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,1)] italic max-w-lg"
                  >
                    {activeScene === 3 &&
                      'Ujian pertama pencari kebenaran sering datang berupa tugas mustahil yang disisipi niat buruk orang lain di sekitarnya.'}
                    {activeScene === 5 &&
                      'Rukmuka adalah nafsu kemewahan makan dan Rukmakala adalah kilau harta. Amarah justru membuat keduanya berlipat ganda; hanya hening cipta yang meruntuhkannya.'}
                    {activeScene === 6 &&
                      'Minangkalbu artinya menanyai lubuk hatimu sendiri. Kebenaran sejati tak bisa diwakilkan orang lain—setiap orang harus menempuhnya sendiri.'}
                    {activeScene === 8 &&
                      'Anoman adalah suara nurani yang memperingatkan bahaya. Namun tekad tulus yang tidak mencela guru justru mendapat restu untuk melangkah.'}
                    {activeScene === 10 &&
                      'Nemburnawa adalah 9 lubang hawa nafsu (mata, telinga, hidung, mulut, kemaluan). Dilawan dengan panik membuat belitannya kian mencekik.'}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Interactive buttons anchored at the bottom */}
              {!kayonChoiceConfig && (
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                {currentBubble?.hasNext && (
                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => advanceRef.current?.()}
                      className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[#dedf42] px-6 py-2.5 font-sans text-sm font-semibold text-[#1c0f07] shadow-[0_0_24px_rgba(222,223,66,0.35)] hover:bg-[#f4e7cd] active:scale-95 transition-all cursor-pointer"
                    >
                      <span>Lanjut</span>
                      <ChevronDown className="size-4" />
                    </button>
                    <span className="font-sans text-[10.5px] text-[#f4e7cd]/60 drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
                      <span className="[@media(hover:hover)]:hidden">atau geser ke atas</span>
                      <span className="hidden [@media(hover:hover)]:inline">atau scroll ke bawah</span>
                    </span>
                  </div>
                )}
                {hotspot && (
                  <div className="flex flex-col items-center gap-1">
                    <span className="inline-flex items-center gap-1.5 font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#dedf42] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] animate-pulse motion-reduce:animate-none">
                      <Sparkles className="size-3.5" />
                      <span>{hotspot.label} di panggung</span>
                    </span>
                    <button
                      type="button"
                      onClick={hotspot.onActivate}
                      className="pointer-events-auto font-sans text-[10.5px] text-[#f4e7cd]/55 underline decoration-dotted underline-offset-2 hover:text-[#dedf42] cursor-pointer"
                    >
                      atau lanjutkan tanpa mengetuk
                    </button>
                  </div>
                )}

                {activeScene === 5 && !caveCleared && !caveCalmStarted && (
                  <>
                    <button
                      type="button"
                      onClick={handleCalmStrikeCave}
                      className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-[#dedf42] bg-[#dedf42]/25 backdrop-blur-md px-5 py-2 font-sans text-xs sm:text-sm font-semibold text-[#dedf42] hover:bg-[#dedf42] hover:text-[#1c0f07] transition-all cursor-pointer shadow-[0_0_20px_rgba(222,223,66,0.35)]"
                    >
                      <Sparkles className="size-3.5" />
                      <span>Tenangkan Napas &amp; Benturkan Keduanya</span>
                    </button>
                  </>
                )}

                {activeScene === 10 && nagaHits < TOTAL_NAGA_HITS && seaChoice && (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[10.5px] font-sans font-semibold text-[#dedf42] uppercase tracking-wider animate-pulse flex items-center justify-center gap-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                      <Swords className="size-3" />
                      <span>Patahkan belitan naga ({nagaHits}/{TOTAL_NAGA_HITS})</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        {Array.from({ length: TOTAL_NAGA_HITS }, (_, i) => (
                          <span
                            key={i}
                            className={`h-2 w-8 rounded-full transition-colors ${
                              i < nagaHits ? 'bg-[#dedf42]' : 'bg-white/15'
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={handleSlashNaga}
                        className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[#dedf42] px-5 py-2 font-sans text-xs sm:text-sm font-semibold text-[#1c0f07] shadow-[0_0_24px_rgba(222,223,66,0.4)] hover:bg-[#f4e7cd] active:scale-95 transition-all cursor-pointer"
                      >
                        <Swords className="size-4" />
                        <span>Tebas Kuku Pancanaka ({nagaHits}/{TOTAL_NAGA_HITS})</span>
                      </button>
                    </div>
                  </div>
                )}

                {activeScene === 11 && !enteredGuwa && waterGuess && curDewaRuciTurn < dewaRuciLines.length - 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setDewaRuciTurn(curDewaRuciTurn + 1);
                      audioRef.current?.playSoftTick();
                    }}
                    className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-[#dedf42]/50 bg-[#dedf42]/20 backdrop-blur-md px-4 py-1.5 font-sans text-xs font-semibold text-[#dedf42] hover:bg-[#dedf42] hover:text-[#1c0f07] transition-all cursor-pointer"
                  >
                    <span>Dengarkan Lanjutannya</span>
                    <ChevronRight className="size-3.5" />
                  </button>
                )}

                {activeScene === 11 && enteredGuwa && (
                  <div className="flex flex-col items-center gap-3 w-full max-w-xl">
                    <span className="font-sans text-[10.5px] font-semibold uppercase tracking-wider text-[#dedf42] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                      Ketuk tiap warna: nafsu mana yang muncul dalam pilihanmu?
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
                      {NAFSU_COLORS.map((item) => {
                        const isSelected = selectedColor === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setSelectedColor(item.id);
                              audioRef.current?.playKenong();
                            }}
                            className={`pointer-events-auto flex items-center gap-2 rounded-xl border px-3 py-1.5 text-left font-sans text-xs transition-all cursor-pointer backdrop-blur-md ${
                              isSelected
                                ? 'border-[#dedf42] bg-[#dedf42]/20 text-[#dedf42] font-semibold'
                                : 'border-white/15 bg-black/50 text-[#f4e7cd]/80 hover:border-[#dedf42]/50'
                            }`}
                          >
                            <span className={`size-3 rounded-full border shrink-0 ${item.swatch}`} />
                            <span className="truncate">{item.label.split(' · ')[0]}</span>
                          </button>
                        );
                      })}
                    </div>
                    <p className="font-sans text-xs text-[#f4e7cd]/90 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                      <strong className="text-[#dedf42]">{activeNafsu.label}:</strong> {activeNafsu.meaning}
                    </p>
                    <p className="rounded-lg border border-[#dedf42]/30 bg-black/55 px-3 py-2 font-sans text-xs text-[#f4e7cd] leading-relaxed backdrop-blur-md">
                      <span className="font-semibold text-[#dedf42]">Dalam perjalananmu: </span>
                      {nafsuRecap[activeNafsu.id]}
                    </p>
                  </div>
                )}

              </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ── Scene 12 Amarta Finale Panel (Tucked neatly in bottom-right corner) ── */}
      {started && activeScene === 12 && finalePhase === 'amarta' && (
        <div className="fixed bottom-6 right-4 sm:right-8 z-30 pointer-events-auto max-w-lg w-full rounded-2xl border border-[#dedf42]/40 bg-[#0b0804]/90 backdrop-blur-md p-6 sm:p-7 shadow-2xl">
          <span className="inline-block rounded-full border border-[#dedf42]/45 bg-[#dedf42]/12 px-3 py-1 font-sans text-xs font-medium text-[#dedf42]">
            Tanceb Kayon · Jejak Laku: {playerTitle}
          </span>
          <h2 className="mt-3 font-playfair font-normal text-2xl sm:text-3xl text-[#f4e7cd]">
            Hidup Baru di Kerajaan Amarta
          </h2>
          <p className="mt-2 font-sans text-xs sm:text-sm text-[#f4e7cd]/85 leading-relaxed">
            Pencerahan sejati tidak menjauhkan Bima dari tugas duniawinya. Ia pulang ke Amarta untuk melindungi saudara dan melayani rakyat dengan jiwa yang tenang, rendah hati, dan jujur.
          </p>

          <div className="mt-3.5 rounded-xl border border-white/10 bg-black/40 p-3.5">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#dedf42]/85">
              {CORE_QUESTION}
            </p>
            <p className="mt-1 font-sans text-sm text-[#f4e7cd] leading-relaxed">
              Di dalam diri sendiri. Bukan benda yang ditemukan, melainkan kesadaran yang jernih saat amarah, takut, dan
              keinginan bisa dikendalikan.
              {waterGuess && (
                <span className="block mt-1 text-xs text-[#f4e7cd]/70">
                  {waterGuess === 'diri'
                    ? 'Kamu sudah menebaknya sebelum Dewa Ruci menjawab.'
                    : 'Awalnya kamu menebak "di luar", sama seperti Bima.'}
                </span>
              )}
            </p>
          </div>

          <blockquote className="mt-3.5 border-l-2 border-[#dedf42]/60 pl-3 font-playfair italic text-sm sm:text-base text-[#dedf42]">
            “Ngelmu iku kalakone kanthi laku, lekase lawan kas, tegese kas nyantosani.”
            <span className="mt-1 block font-sans not-italic text-xs text-[#f4e7cd]/70">
              Ilmu baru menjadi nyata bila dijalani, dimulai dengan kemauan, dan kemauan itulah yang menguatkan.
            </span>
          </blockquote>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleReplay}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#dedf42]/40 px-4 py-2 font-sans text-xs sm:text-sm text-[#f4e7cd] hover:border-[#dedf42] hover:text-[#dedf42] transition-colors cursor-pointer"
            >
              <RotateCcw className="size-3.5" />
              <span>Mainkan Ulang</span>
            </button>
            <Link
              href="/tokoh/sang-bima"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#dedf42] px-4.5 py-2 font-sans text-xs sm:text-sm font-semibold text-[#1c0f07] hover:bg-[#f4e7cd] transition-colors"
            >
              <span>Profil Sang Bima</span>
            </Link>
            <Link
              href="/kreasi?slug=dewa-ruci"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 font-sans text-xs sm:text-sm text-[#f4e7cd]/80 hover:border-[#dedf42] hover:text-[#dedf42] transition-colors"
            >
              <span>Naskah Lengkap</span>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
