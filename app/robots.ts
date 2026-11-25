import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/book' },
    ...(host ? { sitemap: `https://${host}/sitemap.xml` } : {}),
  }
}
