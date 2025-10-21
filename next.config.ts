import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.tuanlelaw.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
