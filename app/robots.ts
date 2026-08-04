import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

/**
 * robots.txt.
 *
 * ── AI CRAWLERS ARE EXPLICITLY WELCOME (decision 2026-08-04) ────────────────
 * A wildcard `Allow: /` already permits them, but naming them is deliberate:
 * we WANT to be cited by AI answer engines, and an explicit allow is the record
 * of that choice so nobody later blocks them "just to be safe". We publish
 * nothing here we would withhold from a person — company story, product
 * explanation, public program listings.
 *   · GPTBot / OAI-SearchBot → ChatGPT      · Google-Extended → Gemini / AI Overviews
 *   · PerplexityBot          → Perplexity   · ClaudeBot       → Claude
 * To reverse: move a bot into its own rule with `disallow: '/'`.
 *
 * Yeti (Naver) and Daumoa (Kakao) are named too — Korean institutions search
 * Naver first, and that is the surface where we currently return zero results.
 * ────────────────────────────────────────────────────────────────────────────
 */

// Investor pages stay out of search until the indexing decision is locked.
const PRIVATE_PATHS = ['/investors', '/en/investors'];

const NAMED_BOTS = [
  'Googlebot',
  'Google-Extended',
  'Bingbot',
  'Yeti', // Naver
  'Daumoa', // Kakao / Daum
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'ClaudeBot',
  'Claude-SearchBot',
  'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE_PATHS },
      { userAgent: NAMED_BOTS, allow: '/', disallow: PRIVATE_PATHS },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
