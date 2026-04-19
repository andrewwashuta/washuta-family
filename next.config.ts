import type { NextConfig } from 'next'

const CURRENT_YEAR_PATH = '/2025'

const nextConfig: NextConfig = {
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
