import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'K&C Logistics - Cross Docking & Logistics Solutions',
    short_name: 'K&C Logistics',
    description: 'Professional cross docking, warehousing, and supply chain management services in Santa Ana, California.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#812530',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
        purpose: 'maskable'
      },
      {
        src: '/icon-512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'any'
      }
    ],
    categories: ['business', 'logistics', 'transportation'],
    lang: 'en-US',
    dir: 'ltr',
  }
}
