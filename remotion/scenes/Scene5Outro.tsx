import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { KelirBackground } from '../components/KelirBackground';
import { COLORS, FONTS } from '../theme';

export const Scene5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const scale = interpolate(entrance, [0, 1], [0.85, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Fade to black at the end (last 25 frames)
  const fadeOut = interpolate(
    frame,
    [330, 360],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

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
      <KelirBackground glowIntensity={1.4} />

      {/* Main Content Container */}
      <div
        style={{
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        {/* Competition Pill */}
        <div
          style={{
            padding: '8px 24px',
            borderRadius: 30,
            backgroundColor: 'rgba(217, 164, 65, 0.12)',
            border: `1px solid ${COLORS.borderBright}`,
            color: COLORS.goldHigh,
            fontFamily: FONTS.sans,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            marginBottom: 24,
            boxShadow: `0 0 24px ${COLORS.goldLow}`,
          }}
        >
          Karya Inovasi Lomba Web Development 2026
        </div>

        {/* Big Finale Logo */}
        <h1
          style={{
            margin: 0,
            fontFamily: FONTS.serif,
            fontSize: 98,
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: COLORS.ink,
            textTransform: 'uppercase',
            textShadow: `0 0 45px rgba(242, 199, 107, 0.7), 0 10px 40px rgba(0, 0, 0, 0.9)`,
          }}
        >
          DALANG<span style={{ color: COLORS.gold }}>-STYLE</span>
        </h1>

        <p
          style={{
            margin: '20px 0 0 0',
            fontFamily: FONTS.serif,
            fontSize: 32,
            fontStyle: 'italic',
            color: COLORS.goldHigh,
            letterSpacing: '0.03em',
            textShadow: '0 4px 18px rgba(0, 0, 0, 0.8)',
          }}
        >
          "Menghidupkan Tradisi di Layar Masa Depan"
        </p>

        {/* Live URL Pill */}
        <div
          style={{
            marginTop: 48,
            padding: '16px 36px',
            borderRadius: 16,
            backgroundColor: COLORS.panel,
            border: `1px solid ${COLORS.border}`,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            boxShadow: `0 14px 40px rgba(0, 0, 0, 0.8), 0 0 30px ${COLORS.goldLow}`,
          }}
        >
          <span style={{ fontSize: 22 }}>🌐</span>
          <span
            style={{
              fontFamily: FONTS.sans,
              fontSize: 20,
              fontWeight: 600,
              color: COLORS.ink,
              letterSpacing: '0.06em',
            }}
          >
            dalang-style.vercel.app
          </span>
        </div>

        {/* Tech Stack Footer */}
        <div
          style={{
            marginTop: 36,
            display: 'flex',
            gap: 20,
            alignItems: 'center',
            fontFamily: FONTS.sans,
            fontSize: 13,
            color: COLORS.inkDim,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <span>Next.js 16</span>
          <span style={{ color: COLORS.gold }}>•</span>
          <span>MediaPipe AI Vision</span>
          <span style={{ color: COLORS.gold }}>•</span>
          <span>GSAP 3.15 & Lenis</span>
          <span style={{ color: COLORS.gold }}>•</span>
          <span>Tailwind CSS v4</span>
        </div>
      </div>

      {/* Fade to black overlay */}
      {fadeOut > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#000000',
            opacity: fadeOut,
            zIndex: 100,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};
