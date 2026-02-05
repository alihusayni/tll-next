import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        inlineCss: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.tuanlelaw.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'tuanlelaw.s3.us-east-1.amazonaws.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    compress: true,
    poweredByHeader: false,
};

export default nextConfig;
