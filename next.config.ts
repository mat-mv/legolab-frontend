import type { NextConfig } from "next";

// Sicherstellen, dass NODE_ENV nur "development" oder "production" ist
const NODE_ENV = process.env.NODE_ENV === "production" ? "production" : "development";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    NODE_ENV,
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "legolab-karlsruhe.de",
        pathname: "/**",
      },
    ],
  },

  // Optional: experimentelle Features nur aktivieren, falls App-Routing genutzt wird
  experimental: {
    // appDir: true,
  },

  webpack(config) {
    // Absichern, dass kein undefined filter-Aufruf passiert
    if (!config.module.rules) config.module.rules = [];
    return config;
  },
};

export default nextConfig;
