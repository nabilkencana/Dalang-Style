import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from '../theme';

interface KelirBackgroundProps {
  glowIntensity?: number;
  showGunungan?: boolean;
}

export const KelirBackground: React.FC<KelirBackgroundProps> = ({
  glowIntensity = 1,
  showGunungan = false,
}) => {
  const frame = useCurrentFrame();

  const pulse = interpolate(
    Math.sin(frame * 0.05),
    [-1, 1],
    [0.75 * glowIntensity, 1.15 * glowIntensity]
  );

  const particles = [
    { x: 180, y: 220, size: 4, speed: 0.8 },
    { x: 420, y: 760, size: 6, speed: 1.2 },
    { x: 880, y: 340, size: 5, speed: 0.6 },
    { x: 1320, y: 180, size: 4, speed: 1.0 },
    { x: 1650, y: 640, size: 7, speed: 0.9 },
    { x: 1040, y: 820, size: 5, speed: 1.4 },
    { x: 620, y: 140, size: 3, speed: 0.7 },
    { x: 1490, y: 430, size: 6, speed: 1.1 },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: COLORS.background,
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {/* Ambient Kelir Radial Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 70% 65% at 50% 45%, rgba(217, 164, 65, ${0.18 * pulse}) 0%, rgba(138, 31, 24, ${0.12 * pulse}) 45%, rgba(11, 6, 4, 0.95) 85%, #0b0604 100%)`,
        }}
      />

      {/* Subtle Pattern Grid or Border Aura */}
      <div
        style={{
          position: 'absolute',
          inset: 40,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 24,
          pointerEvents: 'none',
          opacity: 0.45,
        }}
      />

      {/* Floating Gold Particles */}
      {particles.map((p, i) => {
        const floatY = (p.y - frame * p.speed) % 1180;
        const opacity = interpolate(
          floatY,
          [0, 100, 980, 1080],
          [0, 0.65, 0.65, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: p.x,
              top: floatY < 0 ? floatY + 1080 : floatY,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: COLORS.goldHigh,
              boxShadow: `0 0 12px ${COLORS.gold}`,
              opacity,
              pointerEvents: 'none',
            }}
          />
        );
      })}
    </div>
  );
};
