'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface HeroStageBackdropProps {
  accentColor?: string;
  className?: string;
  showWayangPuppets?: boolean;
}

export default function HeroStageBackdrop({
  accentColor = '#dedf42',
  className = '',
  showWayangPuppets = true,
}: HeroStageBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number = 0;
    let destroyed = false;
    let width = 0;
    let height = 0;

    // Mouse coordinates for interactive parallax
    const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = (e.clientX - rect.left) / Math.max(1, rect.width);
      mouse.targetY = (e.clientY - rect.top) / Math.max(1, rect.height);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    // Floating blencong ember particles
    const particleCount = 35;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: -0.0004 - Math.random() * 0.0007,
      size: 0.8 + Math.random() * 2.0,
      alpha: 0.15 + Math.random() * 0.5,
      fade: 0.003 + Math.random() * 0.005,
    }));

    // Soft misty smoke ribbons
    const ribbonCount = 4;
    const ribbons = Array.from({ length: ribbonCount }, (_, i) => ({
      baseY: 0.38 + i * 0.14,
      amplitude: 20 + i * 12,
      frequency: 0.0016 + i * 0.0006,
      speed: 0.0007 + i * 0.0003,
      phase: i * 1.8,
      opacity: 0.035 + (i % 2 === 0 ? 0.025 : 0.015),
    }));

    const startTime = performance.now();

    const render = (now: number) => {
      if (destroyed) return;
      const t = (now - startTime) * 0.001;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Dynamic Blencong flame radial glow (breathing flame)
      const flicker = Math.sin(t * 7.5) * 0.04 + Math.sin(t * 13.2) * 0.02 + 1.0;
      const lampX = width * 0.5 + (mouse.x - 0.5) * 45;
      const lampY = height * 0.28 + (mouse.y - 0.5) * 35;

      const radialGrad = ctx.createRadialGradient(
        lampX,
        lampY,
        15,
        lampX,
        lampY,
        Math.max(width, height) * 0.72
      );
      radialGrad.addColorStop(0, `rgba(217, 164, 65, ${0.18 * flicker})`);
      radialGrad.addColorStop(0.3, `rgba(180, 110, 35, ${0.09 * flicker})`);
      radialGrad.addColorStop(0.65, 'rgba(40, 20, 8, 0.03)');
      radialGrad.addColorStop(1, 'rgba(5, 3, 3, 0)');

      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Ethereal flowing light ribbons (smoke simulation)
      ribbons.forEach((r) => {
        ctx.beginPath();
        const segments = 36;
        const stepX = width / segments;

        ctx.moveTo(-50, height * r.baseY);
        for (let i = 0; i <= segments; i++) {
          const px = i * stepX;
          const wave1 = Math.sin(px * r.frequency + t * r.speed * 1000 + r.phase);
          const wave2 = Math.cos(px * r.frequency * 0.6 - t * r.speed * 600);
          const py =
            height * r.baseY +
            (wave1 + wave2) * r.amplitude +
            (mouse.y - 0.5) * 20;
          ctx.lineTo(px, py);
        }
        ctx.lineTo(width + 50, height + 80);
        ctx.lineTo(-50, height + 80);
        ctx.closePath();

        const ribbonGrad = ctx.createLinearGradient(0, height * 0.2, width, height * 0.8);
        ribbonGrad.addColorStop(0, `rgba(255, 255, 255, 0)`);
        ribbonGrad.addColorStop(0.35, `rgba(217, 164, 65, ${r.opacity})`);
        ribbonGrad.addColorStop(0.65, `rgba(255, 240, 200, ${r.opacity * 1.3})`);
        ribbonGrad.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.fillStyle = ribbonGrad;
        ctx.fill();
      });

      // 3. Floating glowing ember particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.fade;
        if (p.alpha > 0.75 || p.alpha < 0.1) p.fade = -p.fade;
        if (p.y < -0.05) {
          p.y = 1.05;
          p.x = Math.random();
        }

        const px = p.x * width + (mouse.x - 0.5) * 25;
        const py = p.y * height + (mouse.y - 0.5) * 25;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242, 199, 107, ${Math.max(0, p.alpha * flicker)})`;
        ctx.shadowColor = 'rgba(217, 164, 65, 0.7)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 4. Subtle Vignette
      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        height * 0.4,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.72
      );
      vignette.addColorStop(0, 'rgba(5, 3, 3, 0)');
      vignette.addColorStop(0.7, 'rgba(5, 3, 3, 0.35)');
      vignette.addColorStop(1, 'rgba(5, 3, 3, 0.85)');

      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      destroyed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [accentColor]);

  return (
    <div className={`relative w-full h-full overflow-hidden select-none pointer-events-none ${className}`}>
      {/* 1. Dramatic Traditional Performers Base (Cleaned of text, pure characters with motion blur) */}
      <Image
        src="/images/hero-dancers-backdrop.png"
        alt="Wayang Performance Backdrop"
        fill
        priority
        sizes="(max-width: 1504px) 100vw, 1352px"
        className="object-cover object-center pointer-events-none opacity-85"
      />

      {/* 2. Interactive Ambient Canvas (Blencong Glow, Flowing Smoke Ribbons, Ember Particles) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block mix-blend-screen" />

      {/* 3. Authentic Wayang Kulit Characters (Flanking figures with golden prada glow) */}
      {showWayangPuppets && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-end justify-between px-[3%] pb-[2%]">
          {/* Left Wayang Kulit Hero (Raden Satria in dramatic sabet pose) */}
          <div className="relative w-[18%] sm:w-[20%] md:w-[22%] lg:w-[24%] h-[68%] sm:h-[75%] md:h-[82%] opacity-65 hover:opacity-85 transition-opacity duration-700 select-none animate-pulse-slow">
            <Image
              src="/images/wayang-puppet-dramatic.png"
              alt="Wayang Kulit Satria"
              fill
              className="object-contain object-bottom drop-shadow-[0_0_25px_rgba(217,164,65,0.45)] transform -scale-x-100 rotate-[4deg]"
            />
          </div>

          {/* Right Wayang Kulit Hero (Facing character creating dramatic stage confrontation) */}
          <div className="relative w-[18%] sm:w-[20%] md:w-[22%] lg:w-[24%] h-[68%] sm:h-[75%] md:h-[82%] opacity-65 hover:opacity-85 transition-opacity duration-700 select-none">
            <Image
              src="/images/wayang-puppet-dramatic.png"
              alt="Wayang Kulit Satria"
              fill
              className="object-contain object-bottom drop-shadow-[0_0_25px_rgba(217,164,65,0.45)] transform -rotate-[4deg]"
            />
          </div>
        </div>
      )}

      {/* 4. Top & Bottom Atmospheric Vignettes to Guarantee 100% High Contrast for the Center Title */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050303]/95 via-transparent to-[#050303]/75 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,3,3,0.3)_0%,#050303_88%)] pointer-events-none" />
    </div>
  );
}
