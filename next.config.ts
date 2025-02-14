import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.pexels.com'],
    unoptimized: true,
  },
};

module.exports = nextConfig
export default nextConfig;
