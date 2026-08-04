import { site, storeLinks } from '@/lib/site';
import { absoluteUrl } from '@/lib/seo';
import type { FaqItem } from '@/lib/help';

/**
 * schema.org structured data (JSON-LD).
 *
 * ── WHY ─────────────────────────────────────────────────────────────────────
 * "DailyFit" is a CROWDED name: US fitness apps on the App Store, an unrelated
 * dailyfitai.com (gym-management SaaS), and Korean 데일리핏 gyms/shops that own
 * the Naver SERP. Without an explicit entity declaration, a search engine has no
 * way to tell which DailyFit dailyfitai.app is. Organization + sameAs is how we
 * claim the entity — and it is also what AI answer engines read to attribute a
 * fact to us rather than to a namesake.
 *
 * ── HONESTY RULE (repo-wide) ────────────────────────────────────────────────
 * Never emit a claim we cannot back: no aggregateRating (we ship no fake
 * reviews), no foundingDate we haven't verified, no SearchAction until the site
 * actually has a search URL. Structured data that lies is a manual-action risk.
 * ────────────────────────────────────────────────────────────────────────────
 */

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

/** Verified public profiles — each one checked to return 200 (2026-08-04). */
const SAME_AS = [
  'https://www.instagram.com/dailyfitkorea/',
  storeLinks.ios,
].filter(Boolean);

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    // Disambiguation aliases — the strings people actually type.
    alternateName: ['데일리핏', 'DailyFit Korea', '데일리핏 AI'],
    url: site.url,
    logo: `${site.url}/brand/dailyfit-logo.png`,
    image: `${site.url}/opengraph-image.png`,
    email: site.contactEmail,
    description: site.description,
    areaServed: { '@type': 'Country', name: 'South Korea' },
    sameAs: SAME_AS,
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.name,
    inLanguage: 'ko-KR',
    description: site.description,
    publisher: { '@id': ORG_ID },
    // No SearchAction: dailyfitai.app has no public search URL yet. Added with
    // the V3 /s route, not before — a SearchAction pointing nowhere is a lie.
  };
}

/** The app itself, for /product (the seniors-facing page ads land on). */
export function mobileAppJsonLd() {
  const offers = {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
  };
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: site.name,
    applicationCategory: 'LifestyleApplication',
    // Android intentionally absent — not published on Play yet (2026-08-04).
    operatingSystem: 'iOS',
    url: absoluteUrl('/product'),
    installUrl: storeLinks.ios || undefined,
    publisher: { '@id': ORG_ID },
    description:
      '대화 한 번으로 하루를 설계하는 AI Agent. 주변 프로그램을 찾아 알려주고, 신청까지 대신 해 드립니다.',
    inLanguage: 'ko-KR',
    offers,
    // No aggregateRating — we do not publish ratings we haven't earned publicly.
  };
}

/** FAQPage — the single most quotable format for AI answer engines. */
export function faqJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.name,
      item: absoluteUrl(step.path),
    })),
  };
}

export function blogPostingJsonLd(post: {
  title: string;
  summary: string;
  author: string;
  date: string | null;
  path: string;
  locale?: 'ko' | 'en';
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@id': ORG_ID },
    url: absoluteUrl(post.path),
    mainEntityOfPage: absoluteUrl(post.path),
    inLanguage: post.locale === 'en' ? 'en-US' : 'ko-KR',
    // datePublished omitted for drafts — never fabricate a publish date.
    ...(post.date ? { datePublished: post.date } : {}),
  };
}
