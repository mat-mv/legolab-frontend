import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.pexels.com','legolab-karlsruhe.de'],
    unoptimized: true,
  },
};

module.exports = nextConfig
export default nextConfig;
