/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Remove webpack config as it's causing issues
  trailingSlash: true,
}

module.exports = nextConfig 