'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Petruk3DCanvasProps {
  className?: string;
}

export default function Petruk3DCanvas({ className = '' }: Petruk3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Lazy-load: only initialize Three.js and download 3D model when near viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Fallback if IntersectionObserver is not available
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
    let petrukModel: THREE.Group | null = null;
    let contactShadowMesh: THREE.Mesh | null = null;
    let initialY = 0;
    const clock = new THREE.Clock();

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    // 3. Renderer with pure transparent background
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);

    // 4. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaee, 2.8);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.radius = 3;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdce8ff, 1.4);
    fillLight.position.set(-4, 3, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xdedf42, 2.0);
    rimLight.position.set(0, -3, 3);
    scene.add(rimLight);

    // 5. OrbitControls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 1.7;

    // 6. GLTF Loader
    const loader = new GLTFLoader();
    loader.load(
      '/models/petruk.glb',
      (gltf) => {
        if (isDisposed) return;
        const model = gltf.scene;

        // Compute bounding box and center geometry
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Center model at origin
        model.position.x = -center.x;
        model.position.y = -center.y;
        model.position.z = -center.z;

        // Fit camera to model size
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        cameraZ *= 1.25; // enlarged presence
        initialY = model.position.y;
        petrukModel = model;

        // Enable shadow casting and receiving on model meshes
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // 1. Soft ambient contact shadow disk
        const shadowCanvas = document.createElement('canvas');
        shadowCanvas.width = 256;
        shadowCanvas.height = 256;
        const ctx = shadowCanvas.getContext('2d');
        if (ctx) {
          const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
          grad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
          grad.addColorStop(0.3, 'rgba(0, 0, 0, 0.25)');
          grad.addColorStop(0.65, 'rgba(0, 0, 0, 0.08)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, 256, 256);
        }
        const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
        const shadowDiskGeo = new THREE.PlaneGeometry(size.x * 1.6, size.z * 1.6);
        const shadowDiskMat = new THREE.MeshBasicMaterial({
          map: shadowTexture,
          transparent: true,
          opacity: 0.85,
          depthWrite: false,
        });
        const shadowMesh = new THREE.Mesh(shadowDiskGeo, shadowDiskMat);
        shadowMesh.rotation.x = -Math.PI / 2;
        shadowMesh.position.y = -size.y / 2 - 0.02;
        scene.add(shadowMesh);
        contactShadowMesh = shadowMesh;

        // 2. ShadowMaterial plane for real-time directional shadow
        const shadowReceiverGeo = new THREE.PlaneGeometry(size.x * 4, size.z * 4);
        const shadowReceiverMat = new THREE.ShadowMaterial({ opacity: 0.32 });
        const shadowReceiver = new THREE.Mesh(shadowReceiverGeo, shadowReceiverMat);
        shadowReceiver.rotation.x = -Math.PI / 2;
        shadowReceiver.position.y = -size.y / 2 - 0.025;
        shadowReceiver.receiveShadow = true;
        scene.add(shadowReceiver);
        controls.minDistance = cameraZ * 0.6;
        controls.maxDistance = cameraZ * 2.0;

        camera.position.set(0, 0, cameraZ);
        camera.lookAt(0, 0, 0);
        controls.target.set(0, 0, 0);
        controls.update();

        scene.add(model);
        setIsLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0 && !isDisposed) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (err) => {
        console.error('Error loading Petruk 3D model:', err);
        if (!isDisposed) setIsLoading(false);
      }
    );

    // 7. Render Loop with Idle Floating / Breathing Animation
    const animate = () => {
      if (isDisposed) return;
      animId = requestAnimationFrame(animate);

      const t = clock.getElapsedTime();
      if (petrukModel) {
        // Smooth vertical floating bob
        petrukModel.position.y = initialY + Math.sin(t * 1.6) * 0.08;
        // Subtle rhythmic breathing tilt
        petrukModel.rotation.z = Math.sin(t * 1.2) * 0.025;
      }
      if (contactShadowMesh) {
        // Contact shadow subtly scales inversely with breathing movement
        const s = 1 - Math.sin(t * 1.6) * 0.04;
        contactShadowMesh.scale.set(s, s, s);
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 8. Responsive ResizeObserver
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

    // 9. Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      ro.disconnect();
      controls.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
    >
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-black z-20">
          <div className="w-8 h-8 rounded-full border-2 border-black/20 border-t-black animate-spin mb-2" />
          <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-black/80">
            Memuat Wayang 3D {loadProgress > 0 ? `(${loadProgress}%)` : ''}
          </span>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
