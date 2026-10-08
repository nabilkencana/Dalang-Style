import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['localhost', '127.0.0.1', '[::1]'],
  compress: true,
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
