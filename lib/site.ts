/**
 * Site-wide config. Nav structure is Option-B (company site) — LOCKED by
 * Michael 2026-06-11 for the full-launch homepage (HANDOFF §6 resolved).
 * Pattern: Linear/Cursor — Product / Technology / Use cases / Company ▾.
 */
export const site = {
  name: 'DailyFit',
  domain: 'dailyfitai.app',
  url: 'https://dailyfitai.app',
  contactEmail: 'dailyfitkorea@gmail.com',
  tagline: 'AI는 수단, 시니어가 정체성',
  description:
    '한국 액티브 시니어 세대를 위한 AI 에이전트 — 대화 한 번으로 하루를 설계합니다.',
} as const;

/**
 * Active activity catalog count — single source for every on-site mention
 * (home metric strip, traction, agent console). 수도권 트림(2026-06-11) 후
 * active 기준; 트림 원복 시 이 값만 갱신하면 사이트 전체가 따라온다.
 */
export const activeCatalogCount = 5207;

export type NavItem = { href: string; label: string };

// Option-B primary nav. "Product" = Home itself (Anthropic/Linear pattern).
export const primaryNav: NavItem[] = [
  { href: '/', label: 'Product' },
  { href: '/technology', label: 'Technology' },
  { href: '/use-cases', label: 'Use cases' },
];

// Company sub-nav (dropdown under "Company").
export const companyNav: NavItem[] = [
  { href: '/about', label: 'About' },
  { href: '/how-we-work', label: 'How we work' },
  { href: '/writing', label: 'Writing' },
  { href: '/investors', label: 'Investors' },
];

// Live web app (react-native-web build) — every "제품 사용해보기" CTA across the
// company site funnels here so visitors can try the product in-browser, no
// install (Anthropic→Claude "Try Claude" pattern). app. subdomain of the
// company domain. /product (senior marketing + store badges) stays the search-
// ad landing page, reached by direct URL, not from the company nav.
export const productAppUrl = 'https://app.dailyfitai.app' as const;

// Spread onto any <Link>/<a> that points at productAppUrl — opens the web app in
// a new tab so the company site stays put. Single source for the new-tab policy.
export const externalLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;

// Top-right product gateway — the ONLY senior-product entry on the company
// site (Anthropic→Claude pattern). Label avoids "Try DailyFit" because the
// company name doubles as the product name.
export const productCta = { href: productAppUrl, label: '제품 사용해보기' } as const;

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: 'Product',
    items: [
      { href: '/', label: 'Product' },
      { href: '/technology', label: 'Technology' },
      { href: '/use-cases', label: 'Use cases' },
    ],
  },
  {
    heading: 'Company',
    items: companyNav,
  },
];

export const legalNav: NavItem[] = [
  { href: '/terms', label: '이용약관' },
  { href: '/privacy', label: '개인정보처리방침' },
];

/**
 * App store install links — the ONLY ad→install exit (6/26 검색광고는 /product로
 * 착지, 여기 배지가 유일한 설치 출구). 앱은 2026-06-26 공개 → 그 전까지 빈 값이면
 * <StoreBadge>가 "곧 출시"(비클릭) 상태로 안전하게 배포된다.
 *
 * ── 6/26 플립 (한 단계) ─────────────────────────────────────────────────────
 * 아래에 실 URL을 넣거나 Vercel 환경변수(NEXT_PUBLIC_IOS_APP_URL /
 * NEXT_PUBLIC_ANDROID_APP_URL)로 설정 후 재배포. 값이 채워지면 배지가 실링크가
 * 되고, 착지 UTM을 스토어로 전달한다(Google Play는 `referrer` 파라미터 = Play
 * Install Referrer 귀속). 라이브 전 iOS App Store URL(숫자 app id)·Play 패키지
 * id를 반드시 검증할 것.
 */
export const storeLinks = {
  ios: process.env.NEXT_PUBLIC_IOS_APP_URL ?? '',
  android: process.env.NEXT_PUBLIC_ANDROID_APP_URL ?? '',
} as const;
