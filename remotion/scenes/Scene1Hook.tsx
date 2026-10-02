import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { KelirBackground } from '../components/KelirBackground';
import { KineticText } from '../components/KineticText';
import { COLORS, FONTS } from '../theme';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gunungan silhouette animation
  const gununganProgress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 60 },
  });
  const gununganScale = interpolate(gununganProgress, [0, 1], [0.85, 1.05]);
  const gununganOpacity = interpolate(
    frame,
    [0, 45, 180, 240],
    [0, 0.42, 0.42, 0.15],
    { extrapolateRight: 'clamp' }
  );

  // Logo Reveal Animation (frame 190+)
  const logoSpring = spring({
    frame: frame - 190,
    fps,
    config: { damping: 13, stiffness: 85 },
  });
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);
  const logoScale = interpolate(logoSpring, [0, 1], [0.88, 1]);
  const logoGlow = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [20, 45]
  );

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <KelirBackground glowIntensity={1.3} />

      {/* Vector Gunungan / Kayon Sacred Tree Silhouette */}
      <div
        style={{
          position: 'absolute',
          bottom: -40,
          opacity: gununganOpacity,
          transform: `scale(${gununganScale})`,
          filter: 'drop-shadow(0 0 45px rgba(217, 164, 65, 0.4))',
          pointerEvents: 'none',
        }}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: 720,
            height: 720,
          }}
        >
          {/* Subtle Outer Golden Ring Glow */}
          <circle
            cx="16"
            cy="16"
            r="15"
            stroke="rgba(217, 164, 65, 0.25)"
            strokeWidth="0.5"
            strokeDasharray="1.5 1.5"
          />

          {/* Gunungan Sacred Mountain & Tree of Life Silhouette */}
          <path
            d="M16 2.2 C17.2 5 19 8 22 11.5 C25 15 27 18.5 25.5 22.5 C24 26 21 27.5 16 27.5 C11 27.5 8 26 6.5 22.5 C5 18.5 7 15 10 11.5 C13 8 14.8 5 16 2.2 Z"
            fill={COLORS.gold}
            fillOpacity="0.22"
            stroke={COLORS.goldHigh}
            strokeWidth="0.4"
          />

          {/* Base Pedestal (Lapik Padma) */}
          <path
            d="M10.5 29 H21.5 C20.5 28 19.5 27.5 16 27.5 C12.5 27.5 11.5 28 10.5 29 Z"
            fill={COLORS.gold}
            fillOpacity="0.22"
            stroke={COLORS.goldHigh}
            strokeWidth="0.4"
          />

          {/* Kori Agung / Gapura Portal */}
          <path
            d="M14 27.5 V22 C14 20.8 14.8 20 16 20 C17.2 20 18 20.8 18 22 V27.5 H14 Z"
            fill="#0b0604"
          />

          {/* Central Tree of Life Axis Trunk */}
          <line
            x1="16"
            y1="20"
            x2="16"
            y2="7.5"
            stroke="#0b0604"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Lower Wings / Symmetrical Branches */}
          <path
            d="M11.5 18.5 C13.5 16.5 15 15.5 16 15.5 C17 15.5 18.5 16.5 20.5 18.5"
            stroke="#0b0604"
            strokeWidth="1.1"
            strokeLinecap="round"
            fill="none"
          />

          {/* Middle Leaves / Branches */}
          <path
            d="M12.5 13.5 C14 12 15 11.5 16 11.5 C17 11.5 18 12 19.5 13.5"
            stroke="#0b0604"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />

          {/* Upper Crown Branch */}
          <path
            d="M13.8 9.5 C14.8 8.5 15.5 8 16 8 C16.5 8 17.2 8.5 18.2 9.5"
            stroke="#0b0604"
            strokeWidth="0.9"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Text Phase 1 & 2 */}
      {frame < 195 && (
        <div style={{ position: 'relative', zIndex: 10, padding: '0 80px' }}>
          {frame < 120 ? (
            <KineticText
              title="Warisan Adiluhung Nusantara"
              subtitle="Kisah pewayangan ribuan tahun yang sarat nilai filosofis mendalam..."
              highlightWords={['Adiluhung', 'Nusantara']}
              fontSize={68}
            />
          ) : (
            <KineticText
              title="Kini Lahir Kembali di Era Digital"
              subtitle="Menyatukan seni klasik wayang kulit dengan inovasi komputasi interaktif"
              highlightWords={['Digital', 'Inovasi', 'Interaktif']}
              fontSize={68}
            />
          )}
        </div>
      )}

      {/* Text Phase 3: Grand Title Reveal */}
      {frame >= 185 && (
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          {/* Tagline Badge */}
          <div
            style={{
              padding: '6px 20px',
              borderRadius: 30,
              backgroundColor: 'rgba(217, 164, 65, 0.12)',
              border: `1px solid ${COLORS.border}`,
              color: COLORS.goldHigh,
              fontFamily: FONTS.sans,
              fontSize: 14,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            Lomba Web Development 2026
          </div>

          {/* Main Title */}
          <h1
            style={{
              margin: 0,
              fontFamily: FONTS.serif,
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: COLORS.ink,
              textTransform: 'uppercase',
              textShadow: `0 0 ${logoGlow}px rgba(242, 199, 107, 0.65), 0 8px 30px rgba(0, 0, 0, 0.9)`,
            }}
          >
            DALANG<span style={{ color: COLORS.gold }}>-STYLE</span>
          </h1>

          <p
            style={{
              margin: '18px 0 0 0',
              fontFamily: FONTS.sans,
              fontSize: 22,
              color: COLORS.inkDim,
              letterSpacing: '0.04em',
              maxWidth: 720,
              textAlign: 'center',
            }}
          >
            Harmonisasi Budaya Klasik & Web Interaction Engine Masa Depan
          </p>
        </div>
      )}
    </div>
  );
};
