/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'books.google.com',
        },
      ],
    },
  };
  
  module.exports = nextConfig;