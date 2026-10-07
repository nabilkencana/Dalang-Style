import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['localhost', '127.0.0.1', '[::1]'],
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
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
