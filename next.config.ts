import type { NextConfig } from 'next'

const CURRENT_YEAR_PATH = '/2025'

const nextConfig: NextConfig = {
  images: {
    // AVIF first (≈20-30% smaller than WebP) with WebP fallback.
    formats: ['image/avif', 'image/webp'],
    // 75 (Next's default) for thumbnails/carousel; 90 for the fullscreen expand.
    qualities: [75, 90],
    // Source photos top out at 1440px on the long edge, so there is no point
    // generating larger candidates. Trimming the default ladders keeps the
    // optimizer from emitting (and caching) variants we never request.
    deviceSizes: [320, 420, 640, 768, 828, 1080, 1440],
    imageSizes: [16, 32, 64, 96, 128, 256],
    // Optimized variants are immutable for a given source — cache them hard.
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
