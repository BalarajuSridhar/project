// frontend/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      // Disable turbopack if it's causing issues
      // rules: {}
    }
  },
  // Disable source maps in development to avoid the parsing errors
  productionBrowserSourceMaps: false,
  // Ensure we're only using App Router
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
}

module.exports = nextConfig