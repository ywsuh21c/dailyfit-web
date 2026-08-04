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
    '액티브 시니어 세대를 위한 AI Agent. 대화 한 번으로 하루를 설계합니다.',
} as const;

/**
 * Active activity catalog count — FALLBACK only. The home page reads the live
 * number from `getCatalogCount()` (lib/catalog-count.ts → backend
 * `GET /api/activities/count`); this literal is used only when that endpoint is
 * unreachable (env unset / not deployed / fetch fails) so the page never breaks.
 * Keep it roughly current (hand-verified against prod 2026-08-04:
 * GET /api/activities/count → {"active":3377,"as_of":"2026-08-04"}). 직전 값
 * 5,207 은 1,830 건 부풀려진 상태였다 — 폴백은 엔드포인트가 한 번만 흔들려도
 * 그대로 "발표된 수치"가 되고, 이제는 /llms.txt(AI 가 인용하는 파일)에도 실린다.
 */
export const activeCatalogCount = 3377;

export type NavItem = { href: string; label: string };

// Option-B primary nav. "Product" = Home itself (Anthropic/Linear pattern).
export const primaryNav: NavItem[] = [
  { href: '/', label: 'Product' },
  { href: '/technology', label: 'Technology' },
  { href: '/research', label: 'Research' },
  // Use cases — HELD 2026-07-01 (Michael): 실제 인터뷰 확보 전까지 숨김. 인터뷰
  // 후 이 줄 + footerNav + app/(marketing)/_use-cases 폴더명 복구로 되살린다.
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
// install (Anthropic→Claude "Try Claude" pattern). my. subdomain of the
// company domain (2026-07-03: renamed from app. — was redundant with the
// homepage's own "dailyfitai.app", and "my." reads as "your day, designed").
// /product (senior marketing + store badges) stays the search-ad landing
// page, reached by direct URL, not from the company nav.
export const productAppUrl = 'https://my.dailyfitai.app' as const;

// Spread onto any <Link>/<a> that points at productAppUrl — opens the web app in
// a new tab so the company site stays put. Single source for the new-tab policy.
export const externalLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;

// Top-right product gateway — the ONLY senior-product entry on the company
// site (Anthropic→Claude pattern). Label carries the brand name per Michael
// 2026-07-01 ("DailyFit 시작하기" — friendlier + brand-forward).
export const productCta = { href: productAppUrl, label: 'DailyFit 시작하기' } as const;

// Footer columns — grouped by intent so the sections read clearly (Michael
// 2026-07-01): Product = what it is, Company = who we are. Contact lives in its
// own column in Footer.tsx. "How we work" stays in the nav Company dropdown.
export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: 'DailyFit',
    items: [
      { href: '/', label: 'Product' },
      { href: '/technology', label: 'Technology' },
      { href: '/research', label: 'Research' },
    ],
  },
  {
    heading: 'Company',
    items: [
      { href: '/about', label: 'About' },
      { href: '/writing', label: 'Writing' },
      { href: '/investors', label: 'Investors' },
    ],
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
  // iOS 정본 하드코딩(2026-08-04): env 미설정으로 사이트 전체 스토어 링크가 빈 값이던
  // 실사고(초대 랜딩 iOS 자동 이동이 웹앱 폴백으로 샘). 스토어 URL 은 비밀이 아닌
  // 공개 고정값이라 코드가 단일 진실이 맞다 — env 는 오버라이드 용도로만 남긴다.
  ios: process.env.NEXT_PUBLIC_IOS_APP_URL || 'https://apps.apple.com/app/id6773802603',
  // 안드는 Play 미게시(kr.dailyfit.app 404 실측 2026-08-04) — 게시 전까지 빈 값이 정직.
  android: process.env.NEXT_PUBLIC_ANDROID_APP_URL ?? '',
} as const;
