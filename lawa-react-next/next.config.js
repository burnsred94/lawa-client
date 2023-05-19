/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  pageExtensions: ['tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lawa.by',
        port: '',
        pathname: '/manager/uploads/**',
      },
    ],
  },
}

