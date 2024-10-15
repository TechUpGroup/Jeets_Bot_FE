/** @type {import('next').NextConfig} */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const domainImages = process.env.NEXT_PUBLIC_IMAGE_DOMAINS
  ? process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(',').map((domain) => ({
      protocol: 'https',
      hostname: domain.trim(),
      pathname: '/**',
    }))
  : [];

const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      ...domainImages,
    ],
  },
  webpack: (config, context) => {
    if (config.plugins) {
      config.plugins.push(
        new context.webpack.IgnorePlugin({
          resourceRegExp: /^(lokijs|pino-pretty|encoding)$/,
        }),
      );
    }
    return config;
  },
};

export default nextConfig;
