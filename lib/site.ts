/**
 * Site-wide config. Nav structure is Option-A (senior-first) default per the
 * homepage-v2 plan; the Option-A/B fork is decided on beta data (~launch +2-4w).
 * Swapping to Option-B nav = edit `primaryNav` here only.
 */
export const site = {
  name: 'DailyFit',
  domain: 'dailyfitai.app',
  url: 'https://dailyfitai.app',
  contactEmail: 'team@dailyfitai.app',
  tagline: 'AI는 수단, 시니어가 정체성',
  description:
    'AI 기반 일상 설계 서비스 — 활동적인 한국 시니어(55–70)의 하루를 함께 만듭니다.',
} as const;

export type NavItem = { href: string; label: string };

// Option-A primary nav (top of every page). /investors intentionally excluded
// from top nav (footer + direct link only — per plan Tier-1 decision D).
export const primaryNav: NavItem[] = [
  { href: '/trends', label: '트렌드' },
  { href: '/about', label: '소개' },
  { href: '/technology', label: '기술' },
];

export const footerNav: NavItem[] = [
  { href: '/about', label: '소개' },
  { href: '/technology', label: '기술' },
  { href: '/trends', label: '트렌드' },
  { href: '/investors', label: 'Investors' },
];

export const legalNav: NavItem[] = [
  { href: '/terms', label: '이용약관' },
  { href: '/privacy', label: '개인정보처리방침' },
];
