import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['localhost', '127.0.0.1', '[::1]'],
  compress: true,
  async redirects() {
    return [
      { source: '/panduan', destination: '/stage?tutorial=1', permanent: false },
      { source: '/tutorial', destination: '/stage?tutorial=1', permanent: false },
    ];
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "three", "framer-motion"],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.pollinations.ai",
      },
      {
        protocol: "https",
        hostname: "pollinations.ai",
      },
    ],
  },
};

export default nextConfig;
