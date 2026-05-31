import type { NextConfig } from 'next'

const CURRENT_YEAR_PATH = '/2025'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 640, 768, 828, 1080, 1440],
    imageSizes: [16, 32, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  async rewrites() {
    return [{ source: CURRENT_YEAR_PATH, destination: '/' }]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive, noimageindex' },
        ],
      },
    ]
  },
}

export default nextConfig
