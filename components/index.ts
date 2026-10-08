// ── Central Clean Architecture Barrel Export ──────────────────────────────
// Re-exports components from their respective domain modules for clean,
// structured, and maintainable imports across the Wayang Jawi platform.

// 1. Layout & Shell Components
export { default as Navbar } from './layout/Navbar';
export { default as SiteFrame } from './layout/SiteFrame';
export { default as SmoothScroll } from './layout/SmoothScroll';
export { default as WayangLogo } from './layout/WayangLogo';

// 2. Landing Page Feature Sections
export { default as HeroWayangJawi } from './sections/HeroWayangJawi';
export { default as StoryShadowsSection } from './sections/StoryShadowsSection';
export { default as SectionBimaSuci } from './sections/SectionBimaSuci';
export { default as SectionStoryAwakening } from './sections/SectionStoryAwakening';
export { default as SectionWayangGenerator } from './sections/SectionWayangGenerator';
export { default as SectionStoryFinale } from './sections/SectionStoryFinale';
export { default as SectionMovementMeaning } from './sections/SectionMovementMeaning';
export { default as SectionGalleryMuseum } from './sections/SectionGalleryMuseum';
export { default as SectionFAQ } from './sections/SectionFAQ';
export { default as SectionJoinTheNight } from './sections/SectionJoinTheNight';

// 3. 3D WebGL / Three.js Canvases
export { default as Petruk3DCanvas } from './canvas/Petruk3DCanvas';
export { default as Rahwana3DFaceCanvas } from './canvas/Rahwana3DFaceCanvas';

// 4. GSAP Animation Controllers
export { default as GsapAnimations } from './animations/GsapAnimations';
export { default as PanduanGsapAnimations } from './animations/PanduanGsapAnimations';
export { default as BeritaGsapAnimations } from './animations/BeritaGsapAnimations';
export { default as KatalogGsapAnimations } from './animations/KatalogGsapAnimations';
export { default as ScrollReveal } from './animations/ScrollReveal';
export { default as StrokeText } from './animations/StrokeText';

// 5. Dedicated Full-Page Feature Views
export { default as TeamInteractiveSection } from './views/TeamInteractiveSection';
export { default as KatalogTokohView } from './views/KatalogTokohView';
export { default as NewsEditorialView } from './views/NewsEditorialView';

// 6. Interactive Stage & Gesture AI
export { default as WayangStage } from './stage/WayangStage';
export * from './stage/GestureVisuals';
