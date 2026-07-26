/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'content.airhex.com',
        port: '',
        pathname: '/content/logos/**',
      },
    ],
  },
};

export default nextConfig;