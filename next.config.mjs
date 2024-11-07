/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: ["firebasestorage.googleapis.com", "lh3.googleusercontent.com"],
  },

  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },

  transpilePackages: ["@blzlabs/wine-client-sdk"],
};

export default nextConfig;
