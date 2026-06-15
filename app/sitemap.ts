import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { getPublishedPosts } from '@/lib/writing';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/technology',
    '/use-cases',
    '/how-we-work',
    '/writing',
    '/product',
  ];
  const staticEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));
  const writingEntries: MetadataRoute.Sitemap = getPublishedPosts().map((p) => ({
    url: `${site.url}/writing/${p.slug}`,
    lastModified: p.date ?? undefined,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));
  return [...staticEntries, ...writingEntries];
  // /investors + /en/investors intentionally excluded (noindex per plan D/IR Q24).
  // /trends redirects to /writing (Option-B IA: trends index deprecated).
}
