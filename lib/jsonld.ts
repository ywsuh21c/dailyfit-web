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
 *     즉 오늘은 약 4건 중 1건이 Event 로, 나머지 약 73%는 종전 WebPage 와
 *     **글자 단위로 동일한** 출력이 나간다. 회귀 위험이 그만큼 좁다.
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

  // ⚠️ `image` 는 **일부러 넣지 않는다.** 실사진 필드(`hero_image_url`·`image_url`)가
  // 계약에 있고 Event 리치결과에 이미지가 권장되지만, 이 페이지는 아직 히어로에 실사진을
  // 띄우지 않는다(브랜드 톤 블록). 이 파일의 규칙은 "화면에 실제로 보이는 사실만
  // 마크업한다 — 숨은 값 없음" 이고, 안 보이는 사진을 구조화 데이터에만 싣는 건 그 규칙
  // 위반이다. 순서는 반대여야 한다 — 상세면이 실사진을 렌더하게 만든 다음 여기에 붙인다.
  // (충전율 실측 2026-08-09: 실사진 보유 28.3%. 별건 후속으로 남김.)

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
