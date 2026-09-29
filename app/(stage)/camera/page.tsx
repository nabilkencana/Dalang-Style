'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CameraPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [statusMessage, setStatusMessage] = useState('Waiting for camera preview...');
  const [statusHidden, setStatusHidden] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number = 0;
    let destroyed = false;

    const openerWayang = () => {
      if (typeof window === 'undefined') return undefined;
      return (window.opener as Window | null)?.wayang;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(window.innerWidth * dpr));
      canvas.height = Math.max(1, Math.round(window.innerHeight * dpr));
    };

    const draw = () => {
      if (destroyed) return;
      const wayang = openerWayang();
      if (!wayang) {
        setStatusMessage('Main Wayang window is not available.');
        setStatusHidden(false);
        animId = requestAnimationFrame(draw);
        return;
      }

      wayang.attachCameraWindow?.(window);
      if (wayang.cameraReady?.()) {
        setStatusHidden(true);
        wayang.drawCamera?.(ctx, canvas.width, canvas.height);
      } else {
        setStatusMessage('Start the camera from the main window.');
        setStatusHidden(false);
      }
      animId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    const onBeforeUnload = () => {
      openerWayang()?.attachCameraWindow?.(null);
    };
    window.addEventListener('beforeunload', onBeforeUnload);

    resize();
    animId = requestAnimationFrame(draw);

    return () => {
      destroyed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('beforeunload', onBeforeUnload);
      openerWayang()?.attachCameraWindow?.(null);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#090503] m-0 p-0">
      <canvas ref={canvasRef} className="block w-screen h-screen" />
      {!statusHidden && (
        <div className="fixed inset-0 grid place-items-center text-[#f4e7cd] text-sm font-sans bg-[#090503] pointer-events-none">
          {statusMessage}
        </div>
      )}
    </div>
  );
}
