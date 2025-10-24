/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Это правильное название опции!
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'books.google.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // для тестовых изображений
      },
    ],
  },
};

module.exports = nextConfig;