import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    domains: ['images.pexels.com'],
    unoptimized: true,
  },
};

module.exports = nextConfig
export default nextConfig;
