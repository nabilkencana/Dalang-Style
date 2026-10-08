'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface Rahwana3DFaceCanvasProps {
  className?: string;
  pointer?: React.MutableRefObject<{ x: number; y: number } | null>;
  openProgress?: number;
}

export default function Rahwana3DFaceCanvas({
  className = '',
  pointer,
  openProgress = 0,
}: Rahwana3DFaceCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const openProgressRef = useRef(openProgress);

  useEffect(() => {
    openProgressRef.current = openProgress;
  }, [openProgress]);

  // Lazy-load: only initialize Three.js and load 3D model when near viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    let animId = 0;
    let isDisposed = false;
    let rahwanaModel: THREE.Group | null = null;
    let initialY = 0;
    let targetCameraZ = 5;
    const baseRotY = -Math.PI / 2;
    const clock = new THREE.Clock();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera with focused portrait framing
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    // 3. High performance WebGL Renderer with pure transparency
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);

    // 4. Dramatic Theatrical Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    // Warm golden blencong key light
    const keyLight = new THREE.DirectionalLight(0xfff3d6, 3.4);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    // Cool fill light for dramatic contrast
    const fillLight = new THREE.DirectionalLight(0x8fa8ff, 1.6);
    fillLight.position.set(-4, 2, -2);
    scene.add(fillLight);

    // Golden upward rim bounce matching #dedf42
    const rimLight = new THREE.DirectionalLight(0xdedf42, 2.4);
    rimLight.position.set(0, -3, 3);
    scene.add(rimLight);

    // 5. GLTF Loader
    const loader = new GLTFLoader();
    loader.load(
      '/models/rahwana_face.glb',
      (gltf) => {
        if (isDisposed) return;
        const model = gltf.scene;

        // Compute bounding box and center geometry
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Center model so the eyes align directly in the center of the tear gap
        // Lower the model so Rahwana's piercing eyes and brow align in the center of the tear gap
        model.position.x = -center.x;
        initialY = -center.y - size.y * 0.22;
        model.position.y = initialY;
        model.position.z = -center.z;

        // Fit camera tightly to the face portrait
        const maxDim = Math.max(size.x, size.y);
        const fov = camera.fov * (Math.PI / 180);
        let baseCameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        baseCameraZ *= 1.08;
        targetCameraZ = baseCameraZ;

        camera.position.set(0, 0, baseCameraZ * 2.4);
        camera.lookAt(0, 0, 0);
        model.rotation.y = baseRotY;
        rahwanaModel = model;
        scene.add(model);
        setIsLoading(false);
      },
      undefined,
      (err) => {
        console.error('Error loading Rahwana 3D model:', err);
        if (!isDisposed) setIsLoading(false);
      }
    );

    // 6. Interactive Render Loop
    const animate = () => {
      if (isDisposed) return;
      animId = requestAnimationFrame(animate);

      if (rahwanaModel) {
        const t = clock.getElapsedTime();

        // 1. Position stays rock-solid vertically: no automatic bobbing
        rahwanaModel.position.y = initialY;

        // 2. Jumpscare surge animation from far to near as the paper tears open
        const rawP = Math.min(1, Math.max(0, openProgressRef.current));
        const surge = Math.pow(rawP, 1.25);

        // Camera Z rushes forward from far to close-up
        const desiredZ = THREE.MathUtils.lerp(targetCameraZ * 2.4, targetCameraZ, surge);
        camera.position.z += (desiredZ - camera.position.z) * 0.2;

        // Model scale rushes from 0.45 to 1.0
        const desiredScale = THREE.MathUtils.lerp(0.45, 1.0, surge);
        rahwanaModel.scale.set(desiredScale, desiredScale, desiredScale);

        // Blencong lighting exposure flares up into full brilliance
        renderer.toneMappingExposure = THREE.MathUtils.lerp(0.65, 1.35, surge);

        // 3. Interactive pointer-based head tilt
        if (pointer?.current && surge > 0.2) {
          const targetRotY = baseRotY + pointer.current.x * 0.28;
          const targetRotX = -pointer.current.y * 0.16;
          rahwanaModel.rotation.y += (targetRotY - rahwanaModel.rotation.y) * 0.08;
          rahwanaModel.rotation.x += (targetRotX - rahwanaModel.rotation.x) * 0.08;
        } else {
          rahwanaModel.rotation.y = baseRotY + Math.sin(t * 0.8) * 0.02;
          rahwanaModel.rotation.x = Math.sin(t * 0.5) * 0.01;
        }
      }
      renderer.render(scene, camera);
    };
    animate();

    // 7. Responsive ResizeObserver
    const ro = new ResizeObserver((entries) => {
      if (isDisposed) return;
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h, false);
        }
      }
    });
    ro.observe(container);

    // 8. Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      ro.disconnect();
      renderer.dispose();
      scene.clear();
    };
  }, [isVisible, pointer]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none ${className}`}
    >
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-[#dedf42] z-10">
          <div className="w-8 h-8 rounded-full border-2 border-[#dedf42]/20 border-t-[#dedf42] animate-spin mb-2" />
          <span className="text-[11px] font-mono font-bold tracking-wider uppercase">
            Memuat Wayang 3D...
          </span>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
