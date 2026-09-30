"use client";

import React from "react";

/**
 * SiteFrame — Thin continuous solid frame running along the viewport edges,
 * seamlessly connecting with the top notch navbar as in rbp-saas-template.
 * Pure solid fill without stroke lines.
 */
export default function SiteFrame() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 hidden min-[850px]:block select-none"
    >
      {/* ── Top Bar (8px height) ── */}
      <div className="absolute top-0 inset-x-0 h-2 bg-[#130d08]" />

      {/* ── Bottom Bar (8px height) ── */}
      <div className="absolute bottom-0 inset-x-0 h-2 bg-[#130d08]" />

      {/* ── Left Bar (8px width) ── */}
      <div className="absolute top-0 bottom-0 left-0 w-2 bg-[#130d08]" />

      {/* ── Right Bar (8px width) ── */}
      <div className="absolute top-0 bottom-0 right-0 w-2 bg-[#130d08]" />

      {/* ── 4 Inverted Viewport Corners (Pure Solid Fill) ── */}
      {/* Top-Left Corner */}
      <svg
        className="absolute top-2 left-2 rotate-90 text-[#130d08]"
        width="36"
        height="36"
        viewBox="0 0 50 50"
        fill="none"
      >
        <path
          d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
          fill="currentColor"
        />
      </svg>

      {/* Top-Right Corner */}
      <svg
        className="absolute top-2 right-2 rotate-180 text-[#130d08]"
        width="36"
        height="36"
        viewBox="0 0 50 50"
        fill="none"
      >
        <path
          d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
          fill="currentColor"
        />
      </svg>

      {/* Bottom-Left Corner */}
      <svg
        className="absolute bottom-2 left-2 rotate-0 text-[#130d08]"
        width="36"
        height="36"
        viewBox="0 0 50 50"
        fill="none"
      >
        <path
          d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
          fill="currentColor"
        />
      </svg>

      {/* Bottom-Right Corner */}
      <svg
        className="absolute bottom-2 right-2 rotate-270 text-[#130d08]"
        width="36"
        height="36"
        viewBox="0 0 50 50"
        fill="none"
      >
        <path
          d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
