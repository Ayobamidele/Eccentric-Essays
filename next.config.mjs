/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
   // Turbopack is now enabled by default in Next.js 16
  // Root directory configuration
  distDir: '.next',
  experimental: {
    // Empty experimental section - Turbopack is enabled by default
  },
}

export default nextConfig
