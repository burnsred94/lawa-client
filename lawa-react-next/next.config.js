/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '178.172.236.218',
        port: '32771',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
