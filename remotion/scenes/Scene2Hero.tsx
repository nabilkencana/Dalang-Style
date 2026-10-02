import React from 'react';
import { interpolate, OffthreadVideo, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BrowserMockup } from '../components/BrowserMockup';
import { FeatureBadge } from '../components/FeatureBadge';
import { KelirBackground } from '../components/KelirBackground';
import { KineticText } from '../components/KineticText';
import { ASSETS } from '../theme';

export const Scene2Hero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for 3D browser tilt
  const entrySpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 70 },
  });

  // Camera zoom towards the end
  const zoomProgress = interpolate(
    frame,
    [0, 240, 360],
    [0, 0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const rotateX = interpolate(entrySpring, [0, 1], [18, 6]) - zoomProgress * 6;
  const rotateY = interpolate(entrySpring, [0, 1], [-24, -8]) + zoomProgress * 8;
  const rotateZ = interpolate(entrySpring, [0, 1], [6, 2]) - zoomProgress * 2;
  const scale = interpolate(entrySpring, [0, 1], [0.82, 0.98]) + zoomProgress * 0.18;
  const translateY = interpolate(entrySpring, [0, 1], [80, 20]) - zoomProgress * 20;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <KelirBackground glowIntensity={1.1} />

      {/* Header Title Section */}
      <div
        style={{
          position: 'absolute',
          top: 50,
          zIndex: 20,
          textAlign: 'center',
        }}
      >
        <KineticText
          title="Digitalisasi Wayang dengan Desain Sinematik"
          subtitle="Arsitektur web modern yang memadukan estetika nusantara dan performa mutakhir"
          highlightWords={['Sinematik', 'Arsitektur', 'Nusantara']}
          fontSize={46}
          delay={0}
        />
      </div>

      {/* 3D Browser Mockup Canvas */}
      <div style={{ marginTop: 80, zIndex: 10 }}>
        <BrowserMockup
          width={1320}
          height={740}
          rotateX={rotateX}
          rotateY={rotateY}
          rotateZ={rotateZ}
          scale={scale}
          translateY={translateY}
          url="https://dalang-style.vercel.app/lakon"
        >
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <OffthreadVideo
              src={ASSETS.heroLoop}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              muted
            />
          </div>
        </BrowserMockup>
      </div>

      {/* Floating Tech Badges */}
      <div
        style={{
          position: 'absolute',
          left: 70,
          bottom: 120,
          zIndex: 25,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <FeatureBadge
          icon="⚡"
          title="Next.js 16 & React 19"
          subtitle="App Router, Server Components & React Compiler"
          delay={35}
        />
        <FeatureBadge
          icon="🎨"
          title="Tailwind CSS v4"
          subtitle="Modern styling engine berpadu wayang design tokens"
          delay={50}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          right: 70,
          bottom: 120,
          zIndex: 25,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <FeatureBadge
          icon="📜"
          title="GSAP 3.15 + Lenis"
          subtitle="Ultra-smooth scroll & cinematic timeline orchestration"
          delay={65}
        />
        <FeatureBadge
          icon="✨"
          title="60 FPS Visual Purity"
          subtitle="Zero-compromise visual fidelity di semua resolusi"
          delay={80}
        />
      </div>
    </div>
  );
};
