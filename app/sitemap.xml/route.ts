import { vehicles } from '@/lib/fleet'

export function GET(request: Request) {
  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL
  const origin = productionHost ? `https://${productionHost}` : new URL(request.url).origin
  const paths = ['/', ...vehicles.map((v) => `/cars/${v.slug}`), '/privacy']
  const urls = paths
    .map(
      (path) =>
        `<url><loc>${new URL(path, origin).toString().replace(/&/g, '&amp;').replace(/</g, '&lt;')}</loc></url>`,
    )
    .join('')
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    },
  )
}
