/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@motion-magic/shared'],
  output: 'standalone',
  // Enable static optimization where possible
  reactStrictMode: true,
  // Optimize images
  images: {
    domains: ['avatars.githubusercontent.com', 'github.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // Configure webpack for optimal build
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig; 