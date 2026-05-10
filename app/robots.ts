import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: [
      'https://magematch.com/sitemap.xml',
      'https://magematch.com/feed.xml',
    ],
    host: 'https://magematch.com',
  };
}