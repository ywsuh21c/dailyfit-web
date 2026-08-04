/**
 * Locale plumbing for the KO ↔ EN mirror. Korean is the unprefixed default
 * ("/…"); English lives under "/en/…". The nav, footer, and language toggle
 * all localize their hrefs through here so a visitor who switches language on
 * any section lands on the same section in the other language.
 */
export type Locale = 'ko' | 'en';

/**
 * Prefix an internal route for `locale`. External URLs, mailto, and #anchors
 * pass through untouched; KO returns the route unchanged.
 */
export function localizeHref(href: string, locale: Locale): string {
  if (locale === 'ko') return href;
  if (!href.startsWith('/')) return href; // external, mailto:, #anchor
  if (href === '/') return '/en';
  return `/en${href}`;
}

/** Strip any locale prefix back to the canonical Korean path. */
export function toKoPath(pathname: string): string {
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3);
  return pathname;
}

/** Detect the locale a path belongs to. */
export function localeOf(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ko';
}

// Company-site routes that exist in BOTH locales. The language toggle maps a
// path to its twin only when a twin exists — otherwise it falls back to the
// locale home so the switch never lands on a 404 (e.g. /product is KO-only).
export const MIRRORED = new Set([
  '/',
  '/technology',
  '/research',
  '/about',
  '/how-we-work',
  '/writing',
  '/investors',
  '/contact',
  '/privacy',
  '/terms',
]);

export function hasTwin(koPath: string): boolean {
  return MIRRORED.has(koPath) || koPath.startsWith('/writing/'); // blog slugs
}

/** The twin path in the other locale, for the language switch button. */
export function switchLocalePath(pathname: string, to: Locale): string {
  const ko = toKoPath(pathname);
  if (!hasTwin(ko)) return to === 'en' ? '/en' : '/';
  return localizeHref(ko, to);
}
