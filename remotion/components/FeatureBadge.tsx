import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../theme';

interface FeatureBadgeProps {
  icon?: string;
  title: string;
  subtitle?: string;
  delay?: number;
}

export const FeatureBadge: React.FC<FeatureBadgeProps> = ({
  icon = '✨',
  title,
  subtitle,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.85, 1]);
  const y = interpolate(progress, [0, 1], [24, 0]);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 14,
        padding: '12px 22px',
        borderRadius: 14,
        backgroundColor: COLORS.panel,
        border: `1px solid ${COLORS.border}`,
        boxShadow: `0 12px 36px rgba(0, 0, 0, 0.6), 0 0 24px ${COLORS.goldLow}`,
        backdropFilter: 'blur(12px)',
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          backgroundColor: 'rgba(217, 164, 65, 0.14)',
          border: `1px solid ${COLORS.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          boxShadow: `0 0 15px ${COLORS.goldLow}`,
        }}
      >
        {icon}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontFamily: FONTS.serif,
            fontSize: 18,
            fontWeight: 700,
            color: COLORS.ink,
            letterSpacing: '0.02em',
          }}
        >
          {title}
        </span>
        {subtitle && (
          <span
            style={{
              fontFamily: FONTS.sans,
              fontSize: 13,
              color: COLORS.inkDim,
              marginTop: 2,
            }}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
