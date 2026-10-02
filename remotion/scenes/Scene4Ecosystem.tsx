import React from 'react';
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { KelirBackground } from '../components/KelirBackground';
import { KineticText } from '../components/KineticText';
import { ASSETS, COLORS, FONTS } from '../theme';

export const Scene4Ecosystem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isMuseumPhase = frame > 180;

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
      <KelirBackground glowIntensity={1.15} />

      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 45,
          zIndex: 20,
          textAlign: 'center',
        }}
      >
        <KineticText
          title={
            isMuseumPhase
              ? 'Jelajah Museum Wayang & Kisah Bima Suci'
              : 'Ensiklopedia Tokoh & Filosofi Karakter'
          }
          subtitle={
            isMuseumPhase
              ? 'Arsip digital museum sejarah pewayangan nusantara terhubung dalam satu kanvas'
              : 'Profil mendalam watak, pusaka, serta lakon setiap ksatria dan punakawan'
          }
          highlightWords={['Museum', 'Bima', 'Suci', 'Ensiklopedia', 'Filosofi', 'Punakawan']}
          fontSize={44}
          delay={0}
        />
      </div>

      {/* Phase 1: Tokoh Cards Grid */}
      {!isMuseumPhase && (
        <div
          style={{
            marginTop: 70,
            display: 'flex',
            gap: 28,
            zIndex: 10,
            perspective: 1000,
          }}
        >
          {ASSETS.tokoh.map((tokoh, idx) => {
            const cardSpring = spring({
              frame: frame - idx * 10,
              fps,
              config: { damping: 14, stiffness: 85 },
            });

            const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);
            const cardY = interpolate(cardSpring, [0, 1], [60, 0]);
            const cardRot = interpolate(cardSpring, [0, 1], [(idx - 1.5) * 6, 0]);

            return (
              <div
                key={tokoh.name}
                style={{
                  width: 250,
                  height: 480,
                  borderRadius: 18,
                  backgroundColor: COLORS.panel,
                  border: `1px solid ${COLORS.border}`,
                  boxShadow: `0 16px 40px rgba(0, 0, 0, 0.7), 0 0 24px ${COLORS.goldLow}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '24px 18px',
                  opacity: cardOpacity,
                  transform: `translateY(${cardY}px) rotateY(${cardRot}deg)`,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {/* Glow behind puppet */}
                <div
                  style={{
                    position: 'absolute',
                    top: 60,
                    width: 140,
                    height: 140,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(217, 164, 65, 0.35) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                />

                <div
                  style={{
                    height: 280,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <Img
                    src={tokoh.file}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 8px 18px rgba(0, 0, 0, 0.7))',
                    }}
                  />
                </div>

                <div
                  style={{
                    marginTop: 'auto',
                    textAlign: 'center',
                    zIndex: 2,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: FONTS.serif,
                      fontSize: 22,
                      fontWeight: 700,
                      color: COLORS.goldHigh,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {tokoh.name}
                  </h3>
                  <p
                    style={{
                      margin: '6px 0 0 0',
                      fontFamily: FONTS.sans,
                      fontSize: 13,
                      color: COLORS.inkDim,
                      lineHeight: 1.4,
                    }}
                  >
                    {tokoh.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Phase 2: Museum Gallery Cards */}
      {isMuseumPhase && (
        <div
          style={{
            marginTop: 70,
            display: 'flex',
            gap: 32,
            zIndex: 10,
          }}
        >
          {ASSETS.museums.map((mus, idx) => {
            const musSpring = spring({
              frame: frame - 180 - idx * 12,
              fps,
              config: { damping: 15, stiffness: 85 },
            });

            const opacity = interpolate(musSpring, [0, 1], [0, 1]);
            const y = interpolate(musSpring, [0, 1], [50, 0]);
            const scale = interpolate(musSpring, [0, 1], [0.9, 1]);

            return (
              <div
                key={mus.title}
                style={{
                  width: 360,
                  height: 480,
                  borderRadius: 18,
                  backgroundColor: COLORS.panel,
                  border: `1px solid ${COLORS.border}`,
                  boxShadow: `0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px ${COLORS.goldLow}`,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity,
                  transform: `translateY(${y}px) scale(${scale})`,
                }}
              >
                <div style={{ height: 320, width: '100%', overflow: 'hidden' }}>
                  <Img
                    src={mus.file}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.9) contrast(1.1)',
                    }}
                  />
                </div>
                <div
                  style={{
                    padding: '24px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: FONTS.sans,
                      color: COLORS.gold,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      marginBottom: 4,
                    }}
                  >
                    Koleksi Heritage
                  </span>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: FONTS.serif,
                      fontSize: 20,
                      fontWeight: 700,
                      color: COLORS.ink,
                    }}
                  >
                    {mus.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
