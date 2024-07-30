/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: ["firebasestorage.googleapis.com"],
  },

  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },

  transpilePackages: ["@blzlabs/wine-client-sdk"],
};

export default nextConfig;
