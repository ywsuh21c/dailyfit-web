import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { hasTwin, localeOf, localizeHref, toKoPath } from '@/lib/i18n';

/**
 * Search visibility plumbing — canonical URLs, KO↔EN hreflang, and search-engine
 * ownership verification. One place, so no page can silently drift.
 *
 * ── WHY THIS EXISTS (2026-08-04 실측) ───────────────────────────────────────
 * The site had ZERO of this: no canonical, no hreflang, no verification, and no
 * search console anywhere. Naver "데일리핏" returned 0 hits for dailyfitai.app;
 * Bing likewise. Institutions who read the deck searched the brand and found
 * nothing. That is an INDEXING failure, not a ranking one — and every fix below
 * is a precondition for AI answer engines too (ChatGPT reads Bing's index,
 * Gemini/AI Overviews read Google's), so this file serves both surfaces.
 * ────────────────────────────────────────────────────────────────────────────
 */

/**
 * Search-engine ownership verification tokens.
 *
 * These are PUBLIC, non-secret strings that a console hands you once. Code is
 * the single source of truth (same reasoning as `storeLinks` in lib/site.ts);
 * env vars stay available purely as an override for preview deploys.
 *
 * ── HOW TO FILL (Michael/현진, one time) ────────────────────────────────────
 *  google : search.google.com/search-console → URL 접두어로 https://dailyfitai.app
 *           추가 → "HTML 태그" 방식 → content="..." 값만 아래에 붙여넣기
 *  naver  : searchadvisor.naver.com → 사이트 등록 → HTML 태그 → content 값
 *  bing   : bing.com/webmasters → (구글 서치콘솔에서 가져오기 가능하면 그쪽이 빠름)
 * 채워지면 <head>에 meta 태그가 자동으로 나가고, 콘솔에서 "확인" 누르면 끝.
 * 빈 값이면 태그 자체가 렌더되지 않는다(빈 meta 를 내보내지 않음).
 */
export const verificationTokens = {
  // 발급 2026-08-04, URL 접두어 속성 https://dailyfitai.app (현진).
  google:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
    'GIvRcy78ObtiCgtJuCpqpXy7DbiHHRWnlSatok0muS8',
  // 발급 2026-08-04, 네이버 서치어드바이저 웹마스터도구 (현진).
  naver:
    process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION ??
    '278d8660d41d0639a7d9ecc466cd009fec6dca2a',
  bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? '',
} as const;

/** Next `metadata.verification`, with empty tokens omitted entirely. */
export function verificationMetadata(): Metadata['verification'] {
  const other: Record<string, string> = {};
  if (verificationTokens.naver) other['naver-site-verification'] = verificationTokens.naver;
  if (verificationTokens.bing) other['msvalidate.01'] = verificationTokens.bing;
  const v: NonNullable<Metadata['verification']> = {};
  if (verificationTokens.google) v.google = verificationTokens.google;
  if (Object.keys(other).length > 0) v.other = other;
  return Object.keys(v).length > 0 ? v : undefined;
}

/** Absolute URL for a routed path ("/about" → "https://dailyfitai.app/about"). */
export function absoluteUrl(path: string): string {
  return path === '/' ? site.url : `${site.url}${path}`;
}

/**
 * hreflang map for a routed path. Only emitted for routes that genuinely exist
 * in both locales (lib/i18n MIRRORED) — pointing hreflang at a 404 is worse
 * than omitting it. x-default = Korean, since KO is the unprefixed default.
 */
function languagesFor(path: string): Record<string, string> | undefined {
  const ko = toKoPath(path);
  if (!hasTwin(ko)) return undefined;
  return {
    'ko-KR': localizeHref(ko, 'ko'),
    'en-US': localizeHref(ko, 'en'),
    'x-default': localizeHref(ko, 'ko'),
  };
}

export type PageSeo = {
  /** The routed path exactly as it appears in the URL, e.g. '/about' or '/en/about'. */
  path: string;
  title: string;
  description: string;
  /**
   * Use `title` verbatim instead of the root `%s · DailyFit` template. For
   * titles that already carry the brand — otherwise the tab reads
   * "Technology · DailyFit · DailyFit" (real bug, live 2026-08-04).
   */
  absoluteTitle?: boolean;
  /** Keep out of the index (still followed) — legal/utility pages. */
  noindex?: boolean;
  /** Override the OG type (default 'website'). */
  ogType?: 'website' | 'article';
};

/**
 * Build a page's Metadata with canonical + hreflang + OG wired consistently.
 * Replaces hand-written `export const metadata` objects so every page gets the
 * same treatment and none can be forgotten.
 */
export function pageSeo({
  path,
  title,
  description,
  absoluteTitle,
  noindex,
  ogType = 'website',
}: PageSeo): Metadata {
  const locale = localeOf(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      languages: languagesFor(path),
    },
    openGraph: {
      type: ogType,
      locale: locale === 'en' ? 'en_US' : 'ko_KR',
      siteName: site.name,
      url: absoluteUrl(path),
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
