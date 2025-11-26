/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the experimental.turbo section entirely as it's causing warnings
  // turbo is automatically enabled with next dev --turbo, no config needed
  
  // Disable source maps in development to avoid parsing errors
  productionBrowserSourceMaps: false,
  
  // Ensure we're only using App Router
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // Add images configuration if you're using next/image
  images: {
    domains: [],
  },
}

module.exports = nextConfig