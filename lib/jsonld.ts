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

/**
 * 사람들이 실제로 타이핑하는 표기들. Organization·WebSite 두 노드가 **같은 목록**을
 * 쓰게 단일 상수로 둔다 — 두 곳에 손으로 적어두면 한쪽만 바뀌어 별칭이 갈린다.
 */
const BRAND_ALIASES = ['데일리핏', 'DailyFit Korea', '데일리핏 AI'];

/**
 * Verified public profiles — each one checked to return 200 (2026-08-04).
 *
 * `sameAs` 는 "이 엔티티가 다른 곳에서 어떤 이름으로 존재하는가"의 선언이다. 스토어
 * 페이지가 여기 실려야 검색엔진·AI 답변엔진이 **웹사이트의 데일리핏 = 스토어의
 * 데일리핏** 을 같은 것으로 묶는다. 동명 업체(헬스장·샐러드·건기식)가 SERP 를
 * 점령한 상태에서 이 연결이 브랜드 패널의 근거가 된다.
 *
 * 안드는 `storeLinks.android` 에서 온다 — 미게시면 빈 문자열이라 `filter(Boolean)`
 * 이 자동으로 뺀다. **없는 프로필을 sameAs 에 적으면 404 를 가리키는 거짓 선언**이
 * 되므로, 이 파생이 곧 정직성 가드다. 출시일에 여기 손댈 일은 없다.
 */
const SAME_AS = [
  'https://www.instagram.com/dailyfitkorea/',
  storeLinks.ios,
  storeLinks.android,
].filter(Boolean);

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    // Disambiguation aliases — the strings people actually type.
    alternateName: BRAND_ALIASES,
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
    // Organization 과 **같은 별칭**을 WebSite 에도 싣는다. 사이트링크·브랜드 패널은
    // WebSite 노드를 읽는 경로가 따로 있어서, 한쪽에만 있으면 "데일리핏 = 이 사이트"
    // 라는 연결이 절반만 선언된다. 별칭 목록은 한 곳에서 온다(BRAND_ALIASES).
    alternateName: BRAND_ALIASES,
    inLanguage: 'ko-KR',
    description: site.description,
    publisher: { '@id': ORG_ID },
    // No SearchAction: dailyfitai.app has no public search URL yet. Added with
    // the V3 /s route, not before — a SearchAction pointing nowhere is a lie.
  };
}

/**
 * The app itself, for /product (the seniors-facing page ads land on).
 *
 * `name` 은 **한글 브랜드를 앞에 세운다** — 이 노드가 "데일리핏 앱" 류 질의의 엔티티
 * 근거이고, AI 답변엔진이 앱 이름을 인용할 때 읽는 값이다. 화면 워드마크(`site.name`,
 * 영문)와 다른 이유는 `lib/site.ts` 의 `nameKo` 주석과 같다: 화면은 영문이 맞고,
 * 검색은 한국인이 실제로 타이핑하는 문자열이 필요하다.
 *
 * `operatingSystem` 과 `installUrl` 은 **게시된 스토어에서만 파생**한다. 안드가
 * 미게시면 'iOS' 하나, 게시되면 'iOS, Android' 로 자동 확장된다 —
 * 출시일에 이 파일을 여는 일이 없어야 한다(`androidAppLive` 한 곳만 켠다).
 */
export function mobileAppJsonLd() {
  const offers = {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
  };
  // 게시된 스토어만 나열한다. 없는 스토어를 적으면 404 를 가리키는 거짓 선언이고,
  // 구조화 데이터의 거짓말은 리치결과가 아니라 수동조치 대상이다.
  const platforms = [storeLinks.ios ? 'iOS' : '', storeLinks.android ? 'Android' : '']
    .filter(Boolean)
    .join(', ');
  const installUrls = [storeLinks.ios, storeLinks.android].filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: `${site.nameKo}(${site.name})`,
    alternateName: BRAND_ALIASES,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: platforms,
    url: absoluteUrl('/product'),
    // 단수 URL 이 기대되는 소비자를 위해 첫 값을 그대로 두고, 전체 목록은 배열로도
    // 싣는다(schema.org 는 값이 하나든 여럿이든 같은 속성을 허용한다).
    installUrl: installUrls.length > 1 ? installUrls : installUrls[0] || undefined,
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

/**
 * 활동 상세(/activity/[id]).
 *
 * ── 2026-08-09: 예고된 승격을 실행했다 ──────────────────────────────────────
 * 직전 버전은 "일정·장소가 공개 API 에 없어서 의도적으로 WebPage" 였고, 주석에
 * "그 필드가 들어오면 이 함수만 Event 로 승격하면 된다"고 적혀 있었다.
 * 그 필드는 **이미 들어와 있었다** — 백엔드 v0.61.0(`share.py public_detail`,
 * 현진 웹 색인 요청 2)이 `start_date`·`end_date`·`address`·`category` 를 추가했고,
 * 그 docstring 이 추가 이유로 바로 이 함수를 지목한다. 웹의 `PublicActivity` 타입이
 * 그 필드를 선언하지 않아 응답에 실려 오는데도 버려지고 있었을 뿐이다.
 *
 * 승격 규칙 — **날짜가 있는 건에만 Event, 없으면 종전 WebPage 그대로.**
 *   · `startDate` 는 Event 의 필수 속성이다. 없는데 Event 를 선언하면 리치결과가
 *     아니라 수동조치 대상이 된다. 그래서 데이터 유무가 스키마를 결정한다.
 *   · 실측 충전율(2026-08-09, 사이트맵 무작위 n=60): `start_date` **26.7%**.
 *     즉 약 4건 중 1건이 Event 로, 나머지는 WebPage 로 나간다(WebPage 쪽도 실사진이
 *     있으면 `image` 가 붙는다 — 화면이 그 사진을 띄우게 된 뒤에 활성화했다).
 *   · 날짜 형식 불량·역전 구간(시작>종료)은 **백엔드가 이미 걸러 null 로** 준다
 *     (`share.py _schedule_dates`). 여기서 두 번 검증하지 않는다 — 날짜로 인정하는
 *     기준이 두 곳에서 갈리는 게 더 위험하다.
 *   · 과거 행사 경고를 걱정하지 않는 근거: 공개면에 나오는 활동은 이미
 *     `is_publicly_visible`(browse.py)이 `is_past_deadline` 을 제외한 것이다.
 *     즉 사이트맵에 실린 활동은 구조적으로 마감 전이다.
 *   · `organizer` 는 **넣지 않는다.** 백엔드가 명시적으로 빼 뒀다 — `portal_name` 은
 *     '어디로 접수하나'이고 실제 주최기관이 아니라서, organizer 로 내보내면 틀린
 *     구조화 데이터가 된다. 수집 단계에서 기관명을 따로 저장해야 풀리는 문제다.
 *   · `eventAttendanceMode` 도 넣지 않는다 — 오프라인인지 온라인인지 DB 가 모른다.
 * ────────────────────────────────────────────────────────────────────────────
 */
export function activityEventJsonLd(activity: {
  id: string;
  title: string;
  summary: string | null;
  neighborhood: string | null;
  is_free: boolean;
  price: number | null;
  start_date?: string | null;
  end_date?: string | null;
  address?: string | null;
  image_url?: string | null;
  hero_image_url?: string | null;
}) {
  const url = absoluteUrl(`/activity/${activity.id}`);

  /** 값이 있는 것만 담는 Offer. 무료는 price '0' 이 정확한 표현이다. */
  const offers =
    activity.is_free || activity.price != null
      ? {
          offers: {
            '@type': 'Offer',
            price: activity.is_free ? '0' : String(activity.price),
            priceCurrency: 'KRW',
            url,
          },
        }
      : {};

  const description = activity.summary ? { description: activity.summary } : {};

  // `image` — 2026-08-09 활성화. 직전 버전은 일부러 비워 뒀고 이유는 "상세면이 실사진을
  // 렌더하지 않아 숨은 값이 된다" 였다. 같은 날 상세면이 실사진을 띄우게 했으므로
  // (`activity/[id]/page.tsx` 의 실사진 블록) 이제 화면과 마크업이 **같은 값**이다.
  //
  // ⚠️ **실사진 두 필드만** 쓴다. `og_image_url` 은 폴백으로 scene_key 스톡·브랜드
  // 디폴트가 섞여 오므로, 그걸 여기 실으면 "그 행사의 사진"이 아닌 분위기 이미지를
  // 행사 사진으로 선언하게 된다 — 카톡 카드(og)와 판단이 다른 이유다.
  // 화면 쪽과 이 순서(hero → image)가 **반드시 같아야** 한다. 갈리면 숨은 값이 된다.
  // 실측 2026-08-09: 실사진 보유 28.3% · 표본 12/12 URL 이 200 + image/* 응답.
  const realPhoto = activity.hero_image_url || activity.image_url;
  const image = realPhoto ? { image: [realPhoto] } : {};

  // ── 날짜가 없으면 종전 WebPage (동작 불변) ────────────────────────────────
  if (!activity.start_date) {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: activity.title,
      url,
      inLanguage: 'ko-KR',
      isPartOf: { '@id': WEBSITE_ID },
      publisher: { '@id': ORG_ID },
      ...description,
      // 지역은 화면에 표시되는 그 값 그대로 — 좌표·주소를 추측하지 않는다.
      ...(activity.neighborhood
        ? { contentLocation: { '@type': 'Place', name: activity.neighborhood } }
        : {}),
      ...offers,
      ...image,
    };
  }

  // ── 날짜가 있으면 Event ───────────────────────────────────────────────────
  // location 은 Event 필수. 주소가 없을 때 좌표·번지를 지어내지 않고, 대신 우리가
  // 실제로 아는 사실(도시/구 단위 `neighborhood`, 충전율 100%)만 담는다.
  // addressCountry 'KR' 은 카탈로그가 전부 국내라 관측된 사실이다.
  const place = activity.address
    ? {
        '@type': 'Place',
        name: activity.address,
        address: {
          '@type': 'PostalAddress',
          streetAddress: activity.address,
          ...(activity.neighborhood ? { addressLocality: activity.neighborhood } : {}),
          addressCountry: 'KR',
        },
      }
    : {
        '@type': 'Place',
        // 주소가 없으면 지역명이 곧 우리가 아는 장소의 전부다.
        name: activity.neighborhood ?? '대한민국',
        address: {
          '@type': 'PostalAddress',
          ...(activity.neighborhood ? { addressLocality: activity.neighborhood } : {}),
          addressCountry: 'KR',
        },
      };

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: activity.title,
    url,
    inLanguage: 'ko-KR',
    startDate: activity.start_date,
    ...(activity.end_date ? { endDate: activity.end_date } : {}),
    eventStatus: 'https://schema.org/EventScheduled',
    location: place,
    isAccessibleForFree: activity.is_free,
    ...description,
    ...offers,
    ...image,
    // 발행 주체는 우리(카탈로그 제공자)다 — 주최기관(organizer)이 아니다. 둘을 섞지 않는다.
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
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
