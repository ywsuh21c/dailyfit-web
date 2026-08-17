/**
 * Site-wide config. Nav structure is Option-B (company site) — LOCKED by
 * Michael 2026-06-11 for the full-launch homepage (HANDOFF §6 resolved).
 * Pattern: Linear/Cursor — Product / Technology / Use cases / Company ▾.
 */
export const site = {
  name: 'DailyFit',
  /**
   * 한글 브랜드 표기 — **검색엔진에 읽히는 이름**이다. `name` 과 구분하는 이유:
   * `name` 은 화면 워드마크(Nav/Footer 로고)라 영문 그대로 두어야 하고, 검색은
   * 한국인이 실제로 타이핑하는 문자열이 title 에 있어야 잡힌다.
   *
   * ── 왜 필요한가 (2026-08-17 실측) ─────────────────────────────────────────
   * 이날까지 dailyfitai.app 의 어떤 페이지 title/description 에도 "데일리핏"
   * 이라는 한글 문자열이 **0회** 였다. 홈은 `DailyFit · AI는 수단…`, 활동 상세
   * 8,701장은 전부 `{제목} · DailyFit`. JSON-LD `alternateName` 에는 있었지만
   * 그건 엔티티 힌트지 랭킹 토큰이 아니다.
   *
   * 네이버(Yeti)는 어휘 매칭 비중이 높아 한글 토큰이 없으면 "데일리핏" 질의에
   * 구조적으로 안 잡힌다. 구글도 음차 이해는 하지만, 동명 업체(헬스장·샐러드·
   * 건기식)가 SERP 를 점령한 상태에서 정확 토큰 없이 이기기 어렵다.
   * ──────────────────────────────────────────────────────────────────────────
   */
  nameKo: '데일리핏',
  /**
   * 브랜드 앵커 페이지(홈)용 표기. 한글·영문을 함께 실어 "데일리핏"과 "DailyFit"
   * 두 질의를 모두 받는다. 활동 상세처럼 제목이 이미 긴 페이지에는 쓰지 않는다
   * (한국어 SERP 는 대략 35자에서 잘려 브랜드가 통째로 사라진다) — 거기는
   * `nameKo` 만 접미로 붙인다.
   */
  brandTitle: '데일리핏(DailyFit)',
  domain: 'dailyfitai.app',
  url: 'https://dailyfitai.app',
  contactEmail: 'dailyfitkorea@gmail.com',
  tagline: 'AI는 수단, 시니어가 정체성',
  description:
    '데일리핏(DailyFit)은 액티브 시니어 세대를 위한 AI Agent입니다. 대화 한 번으로 하루를 설계합니다.',
} as const;

/**
 * Active activity catalog count — FALLBACK only. The home page reads the live
 * number from `getCatalogCount()` (lib/catalog-count.ts → backend
 * `GET /api/activities/count`); this literal is used only when that endpoint is
 * unreachable (env unset / not deployed / fetch fails) so the page never breaks.
 * Keep it roughly current (hand-verified against prod 2026-08-08:
 * GET /api/activities/count → {"active":10282,"as_of":"2026-08-08"} — 백화점
 * 문화센터 4사 공개(8/5)로 3,377 에서 뛴 값). 직전 값
 * 5,207 은 1,830 건 부풀려진 상태였다 — 폴백은 엔드포인트가 한 번만 흔들려도
 * 그대로 "발표된 수치"가 되고, 이제는 /llms.txt(AI 가 인용하는 파일)에도 실린다.
 */
export const activeCatalogCount = 10282;

export type NavItem = {
  href: string;
  label: string;
  /**
   * KO 전용 라우트 — EN 렌더에서 제외한다. Footer/Nav 는 href 를 localizeHref
   * 로 변환하는데, EN 트윈이 없는 라우트(/product)를 그냥 두면 /en/product
   * 라는 404 링크가 생긴다.
   */
  koOnly?: boolean;
};

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

// ── my. 색인 이관 스위치 (2026-08-06) ───────────────────────────────────────
// 8/5 청자 분리 방침은 활동 상세의 정본 주소를 my. 로 옮기는 것이고, 그 설계는
// **my. 쪽 vercel rewrite 가 살아 있다**는 전제 위에 서 있다 (my./activity/{id}
// → 여기로 rewrite). 그런데 8/6 실측에서 그 전제가 깨져 있었다:
//   · https://my.dailyfitai.app/activity/{id}  → 404
//   · https://my.dailyfitai.app/robots.txt     → 404
//   · https://my.dailyfitai.app/sitemap.xml    → 404
// (rewrite 를 담은 5파일은 main 에만 있고, 라이브 my. 는 그 파일들이 없는
//  feat/v3-web-airbnb 에서 배포된 판이다.)
//
// 그 결과가 최악의 조합이다 — 서버렌더된 활동 상세 11,240 장이 전부 "정본은
// my. 에 있다"고 선언하는데, 그 my. 주소가 404 다. 색인이 통째로 막힌다.
// 방침을 뒤집는 게 아니라, **전제가 살아날 때까지 색인을 살려두는 임시 원복**이다.
//
// my. rewrite 가 라이브로 확인되면 이 값을 true 로 되돌리면 8/5 방침이 그대로
// 복구된다 (canonical → my., my-sitemap 재활성). 되돌리기 = 이 한 줄.
export const myIndexLive = false;

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
      // /product 로 가는 푸터 링크는 2026-08-05 제거했다 — 청자 분리 방침
      // (영우·현진 확정): **소비자는 my.dailyfitai.app, 투자자는 이 사이트.**
      // 이 사이트가 소비자 페이지로 트래픽을 흘리면 두 청자가 다시 섞인다.
      // /product 라우트 자체는 검색광고 착지로 계속 살아 있고(광고는 색인과
      // 무관), 소비자 검색 노출은 my. 쪽에서 해결한다.
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
