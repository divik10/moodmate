/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com'], // For social login avatars
  },
};

module.exports = nextConfig;
export {};