import React from 'react';
import { COLORS, FONTS } from '../theme';

interface BrowserMockupProps {
  children?: React.ReactNode;
  url?: string;
  width?: number;
  height?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  scale?: number;
  translateY?: number;
  translateX?: number;
  glow?: boolean;
}

export const BrowserMockup: React.FC<BrowserMockupProps> = ({
  children,
  url = 'https://dalang-style.vercel.app',
  width = 1200,
  height = 700,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  scale = 1,
  translateY = 0,
  translateX = 0,
  glow = true,
}) => {
  return (
    <div
      style={{
        width,
        height,
        transform: `perspective(1200px) translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
        transformStyle: 'preserve-3d',
        borderRadius: 18,
        backgroundColor: COLORS.panel,
        border: `1px solid ${COLORS.border}`,
        boxShadow: glow
          ? `0 28px 80px rgba(0, 0, 0, 0.8), 0 0 40px ${COLORS.goldLow}`
          : '0 28px 80px rgba(0, 0, 0, 0.8)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Browser Header Bar */}
      <div
        style={{
          height: 44,
          backgroundColor: '#140c07',
          borderBottom: `1px solid ${COLORS.border}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 12,
        }}
      >
        {/* Window controls */}
        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          <div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#27c93f' }} />
        </div>

        {/* Address Bar */}
        <div
          style={{
            flex: 1,
            maxWidth: 480,
            margin: '0 auto',
            height: 26,
            borderRadius: 7,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: `1px solid rgba(217, 164, 65, 0.2)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 12px',
            fontSize: 12,
            fontFamily: FONTS.sans,
            color: COLORS.inkDim,
            letterSpacing: '0.02em',
          }}
        >
          <span style={{ color: COLORS.gold, marginRight: 6 }}>🔒</span>
          {url}
        </div>

        <div style={{ width: 50 }} />
      </div>

      {/* Browser Content Area */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          backgroundColor: '#070403',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
};
