import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../theme';

interface KineticTextProps {
  title: string;
  subtitle?: string;
  delay?: number;
  highlightWords?: string[];
  align?: 'left' | 'center' | 'right';
  fontSize?: number;
}

export const KineticText: React.FC<KineticTextProps> = ({
  title,
  subtitle,
  delay = 0,
  highlightWords = [],
  align = 'center',
  fontSize = 62,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);
  const titleBlur = interpolate(titleProgress, [0, 1], [10, 0]);

  const subtitleProgress = spring({
    frame: frame - (delay + 12),
    fps,
    config: { damping: 15, stiffness: 85 },
  });
  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);
  const subtitleY = interpolate(subtitleProgress, [0, 1], [30, 0]);

  const words = title.split(' ');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
        textAlign: align,
      }}
    >
      <h1
        style={{
          margin: 0,
          fontFamily: FONTS.serif,
          fontSize,
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: '0.03em',
          color: COLORS.ink,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          filter: `blur(${titleBlur}px)`,
          textShadow: `0 4px 24px rgba(0, 0, 0, 0.8), 0 0 30px ${COLORS.goldLow}`,
        }}
      >
        {words.map((word, idx) => {
          const isHighlight = highlightWords.some(
            (hw) => hw.toLowerCase() === word.replace(/[^\w]/g, '').toLowerCase()
          );

          return (
            <span
              key={idx}
              style={{
                display: 'inline-block',
                marginRight: '0.28em',
                color: isHighlight ? COLORS.goldHigh : COLORS.ink,
                textShadow: isHighlight
                  ? `0 0 20px rgba(242, 199, 107, 0.45)`
                  : undefined,
              }}
            >
              {word}
            </span>
          );
        })}
      </h1>

      {subtitle && (
        <p
          style={{
            margin: '16px 0 0 0',
            fontFamily: FONTS.sans,
            fontSize: Math.round(fontSize * 0.38),
            fontWeight: 400,
            lineHeight: 1.5,
            color: COLORS.inkDim,
            maxWidth: 820,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            letterSpacing: '0.02em',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
