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
  /**
   * 구글 소유확인 토큰 — **배열이다.** 구글은 한 사이트에 여러 소유확인 태그를 동시에
   * 허용하고, Next 의 `metadata.verification.google` 도 배열을 받아 meta 를 여러 개 낸다.
   *
   * ── 왜 두 개인가 (2026-09-02 실측) ───────────────────────────────────────
   * 첫 값은 8/4 에 배선된 것인데, **어느 계정 것인지 특정되지 않는다.**
   * 영우의 두 계정(`ywsuh21c` · `michaelsuh21c`) 모두 서치콘솔 속성이 **0개**이고,
   * Site Verification API 로 대조한 `michaelsuh21c` 의 META 토큰은 `Et8TFKjo…` 라
   * 첫 값과 **다르다**. 즉 태그는 살아 있는데 **우리 손에 콘솔이 없다** —
   * 8/8·8/17·8/19 세 세션이 「사이트맵 제출」을 3주간 못 닫은 진짜 이유다.
   *
   * 그래서 첫 값을 **지우지 않고**(지우면 그 계정의 소유확인이 깨진다) 우리 계정
   * 토큰을 덧붙인다. 되돌리기 = 두 번째 원소 한 줄 제거.
   *
   * env 오버라이드는 종전대로 단일 값이며, 주면 배열 전체를 대체한다(프리뷰용).
   */
  google: (process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? [process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION]
    : [
        // 발급 2026-08-04, URL 접두어 속성 https://dailyfitai.app (현진이 배선, 계정 미상).
        'GIvRcy78ObtiCgtJuCpqpXy7DbiHHRWnlSatok0muS8',
        // 발급 2026-09-02, michaelsuh21c@gmail.com (Site Verification API).
        'Et8TFKjojzctaBlyFYGh1m3VeiqygkQjwgg9Vgr0fY8',
      ]) as readonly string[],
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
  if (verificationTokens.google.length > 0) v.google = [...verificationTokens.google];
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
   * Use `title` verbatim instead of the root `%s · 데일리핏` template (`%s · DailyFit`
   * under /en). For
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
