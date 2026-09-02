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
  tagline: 'AI는 수단, 5060이 정체성',
  description:
    '데일리핏(DailyFit)은 55세 이상 어른들을 위한 AI Agent입니다. 대화 한 번으로 하루를 설계합니다.',
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
/**
 * Play 공개 스토어 URL. 패키지 id 는 `kr.dailyfit.app` 고정.
 * 값이 아니라 **게시 여부**가 변수이므로 URL 자체는 상수로 둔다.
 */
export const androidPlayUrl =
  'https://play.google.com/store/apps/details?id=kr.dailyfit.app' as const;

/**
 * 🚀 **안드로이드 출시 스위치 — 사이트 전체가 이 한 값에서 파생된다.**
 *
 * ── 왜 한 곳이어야 하는가 (2026-09-02) ──────────────────────────────────────
 * 이날까지 이 스위치는 **다섯 곳에 흩어져 있었다**:
 *   1. `app/get/page.tsx` 의 로컬 `ANDROID_APP_LIVE` (버튼 목적지·라벨·개인정보 고지)
 *   2. 여기 `storeLinks.android` (StoreBadge "곧 출시" 여부)
 *   3. `lib/jsonld.ts` 의 `SAME_AS` (엔티티 선언에 Play 프로필)
 *   4. `lib/jsonld.ts` 의 `mobileAppJsonLd().operatingSystem` ('iOS' 하드코딩)
 *   5. `app/llms.txt` 의 "(Android는 미출시)" 문장
 * 출시일에 하나만 켜고 넷을 놓치면 사이트가 몇 주 동안 사실과 다른 말을 한다.
 * 손으로 유지하는 목록은 반드시 샌다 — 그래서 **파생**으로 바꿨다.
 *
 * ── 🔴 켜기 전 반드시 실측할 것 ─────────────────────────────────────────────
 * 조건은 "제출했다"가 아니라 **공개 Play URL 이 200 을 주는 것**이다. 비공개
 * 트랙(내부·비공개 테스트)은 테스터 전용 옵트인 링크로만 열리고 공개 URL 은
 * 그대로 404 라, 승인 전에 켜면 사고가 재발한다.
 *
 *   curl -sS -o /dev/null -w '%{http_code}\n' \
 *     'https://play.google.com/store/apps/details?id=kr.dailyfit.app'
 *
 * 8/8 에 #42 가 이 확인 없이 true 로 머지됐고(Play 프로덕션 승인은 7/30 거절 상태),
 * **9일간** 안드로이드 사용자 전원이 404 에 부딪혔다. 아무도 몰랐다.
 * 이제는 `scripts/seo-healthcheck.mjs` 의 "안드 출시 스위치 ↔ Play 공개 URL"
 * 불변식이 **양방향으로** 실측한다 — 켰는데 404 면 실패, 200 인데 껐으면 경고.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const androidAppLive = false;

export const storeLinks = {
  // iOS 정본 하드코딩(2026-08-04): env 미설정으로 사이트 전체 스토어 링크가 빈 값이던
  // 실사고(초대 랜딩 iOS 자동 이동이 웹앱 폴백으로 샘). 스토어 URL 은 비밀이 아닌
  // 공개 고정값이라 코드가 단일 진실이 맞다 — env 는 오버라이드 용도로만 남긴다.
  ios: process.env.NEXT_PUBLIC_IOS_APP_URL || 'https://apps.apple.com/app/id6773802603',
  // 안드는 `androidAppLive` 에서 파생 — 게시 전까지 빈 값이 정직하고, StoreBadge 가
  // "곧 출시"(비클릭)로 안전하게 렌더된다. env 는 종전대로 오버라이드로 남긴다
  // (`?? ` 이므로 env 를 빈 문자열로 두면 강제로 끌 수도 있다).
  android: process.env.NEXT_PUBLIC_ANDROID_APP_URL ?? (androidAppLive ? androidPlayUrl : ''),
} as const;

/**
 * **안드 출시 여부를 묻는 «유일한» 술어.** 소비자(버튼·JSON-LD·llms.txt)는 반드시
 * 이 값을 읽는다 — `androidAppLive` 를 직접 읽으면 안 된다.
 *
 * 왜 한 겹 더 두는가: `androidAppLive` 는 **저작 의도**이고 `storeLinks.android` 는
 * **해석된 값**이다(env `NEXT_PUBLIC_ANDROID_APP_URL` 오버라이드가 그 사이에 낀다).
 * 둘이 갈리는 순간 화면과 마크업이 서로 다른 말을 한다 — 실제로 이 PR 의 뮤테이션
 * 테스트에서 그 갈림이 재현됐다: env 로 켰더니 JSON-LD·llms.txt·스토어 배지는
 * "출시됨"이 됐는데 `/get` 버튼만 "사전신청"으로 남았다. 노출을 결정하는 술어는
 * 게이트 «그 값»이어야 하고, 소비자가 재파생하면 반드시 갈린다.
 */
export const androidStoreLive: boolean = Boolean(storeLinks.android);
