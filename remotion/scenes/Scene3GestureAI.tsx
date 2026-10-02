import React from 'react';
import { interpolate, OffthreadVideo, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BrowserMockup } from '../components/BrowserMockup';
import { FeatureBadge } from '../components/FeatureBadge';
import { KelirBackground } from '../components/KelirBackground';
import { KineticText } from '../components/KineticText';
import { ASSETS, COLORS, FONTS } from '../theme';

export const Scene3GestureAI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const mockupScale = interpolate(entrance, [0, 1], [0.88, 1]);
  const mockupY = interpolate(entrance, [0, 1], [40, 0]);

  // Video switch: start with duel mode, then cut or blend to solo/poros
  const activeVideo = frame > 240 ? ASSETS.gestures.poros : ASSETS.gestures.duel;

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
      <KelirBackground glowIntensity={1.2} />

      {/* Top Header */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          zIndex: 20,
          textAlign: 'center',
        }}
      >
        <KineticText
          title="Inovasi Utama: MediaPipe AI Gesture Tracking"
          subtitle="Jadilah dalang sesungguhnya — kendalikan tokoh wayang secara instan melalui gerakan tangan di depan kamera"
          highlightWords={['MediaPipe', 'Gesture', 'Dalang', 'Instan']}
          fontSize={44}
          delay={0}
        />
      </div>

      {/* Main Interactive Stage & Video Player */}
      <div
        style={{
          marginTop: 65,
          zIndex: 10,
          opacity: interpolate(entrance, [0, 1], [0, 1]),
          transform: `scale(${mockupScale}) translateY(${mockupY}px)`,
        }}
      >
        <BrowserMockup
          width={1240}
          height={680}
          url="https://dalang-style.vercel.app/tutorial"
          glow={true}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <OffthreadVideo
              src={activeVideo}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                backgroundColor: '#000',
              }}
              muted
            />

            {/* Live AI Vision Badge Overlay */}
            <div
              style={{
                position: 'absolute',
                top: 20,
                left: 20,
                padding: '8px 16px',
                borderRadius: 8,
                backgroundColor: 'rgba(11, 6, 4, 0.82)',
                border: `1px solid ${COLORS.goldHigh}`,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                  boxShadow: '0 0 10px #22c55e',
                }}
              />
              <span
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 13,
                  fontWeight: 600,
                  color: COLORS.ink,
                  letterSpacing: '0.04em',
                }}
              >
                MediaPipe Vision: 21 Hand Landmarks Active
              </span>
            </div>

            {/* Gesture Mode Indicator */}
            <div
              style={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                padding: '8px 16px',
                borderRadius: 8,
                backgroundColor: 'rgba(11, 6, 4, 0.82)',
                border: `1px solid ${COLORS.border}`,
                color: COLORS.goldHigh,
                fontFamily: FONTS.sans,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {frame > 240 ? 'Mode: Poros Gerak Satu Wayang' : 'Mode: Dual Wayang Battle'}
            </div>
          </div>
        </BrowserMockup>
      </div>

      {/* 4 Gesture Pills Floating On Left and Right */}
      <div
        style={{
          position: 'absolute',
          left: 50,
          bottom: 110,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          zIndex: 25,
        }}
      >
        <FeatureBadge
          icon="🔄"
          title="1. Poros Tubuh"
          subtitle="Rotasi & orientasi kemiringan badan"
          delay={25}
        />
        <FeatureBadge
          icon="💪"
          title="2. Sendi Lengan"
          subtitle="Gerak cempurit tangan fleksibel"
          delay={40}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          right: 50,
          bottom: 110,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          zIndex: 25,
        }}
      >
        <FeatureBadge
          icon="⚡"
          title="3. Kiprahan Dinamis"
          subtitle="Akselerasi tempo langkah laga wayang"
          delay={55}
        />
        <FeatureBadge
          icon="📐"
          title="4. Kedalaman 3D"
          subtitle="Skala kedekatan panggung kelir"
          delay={70}
        />
      </div>
    </div>
  );
};
