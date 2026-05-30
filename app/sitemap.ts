import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/technology', '/trends'];
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));
  // /investors + /en/investors intentionally excluded (noindex per plan D/IR Q24).
}
