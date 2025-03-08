/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    images: {
      domains: ['api.placeholder.com'],
    },
  }
  
  module.exports = nextConfig