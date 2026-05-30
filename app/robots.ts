import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Investor pages stay out of search until indexing decision is locked.
      disallow: ['/investors', '/en/investors'],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
