import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicActivity } from '@/lib/activity';
import { site, storeLinks, productAppUrl, myIndexLive, externalLinkProps } from '@/lib/site';
import { absoluteUrl } from '@/lib/seo';
import { activityEventJsonLd, breadcrumbJsonLd } from '@/lib/jsonld';
import { JsonLd } from '@/components/seo/JsonLd';
import { StoreBadge } from '@/components/product/StoreBadge';

// /activity/[id] — 링크 공유 착지 페이지 (앱 미설치자도 브라우저로 열림).
// 외부 API fetch → 동적 렌더(ISR 5분). 카톡 카드 og 는 generateMetadata 가 제공.

// 카톡 미리보기 카드용 이미지.
//
// 2026-07-14: 백엔드가 og_image_url 로 `${site.url}/og/scene/{scene_key}.png` 를 줬는데 그
// 씬별 에셋이 웹에 없어(404) 카드 그림이 통째로 안 떴다 → 스위치를 꺼 브랜드 OG 로 폴백.
//
// 🔴 영우 E-01(2026-08-05): "카카오에서 링크만 공유했을때 뜨는 링크 + 메시지는 지금 너무
//    무미건조함 … 썸네일도 안 뜸 (사진이 없음)."
//    전제가 바뀌었다. 2026-08-05 실측(공개 활동 56건):
//      · `/og/scene/*.png` 형태 = **0건** (스위치를 켠 이유 자체가 사라짐)
//      · `cdn.jsdelivr.net/.../dailyfit-activity-photos/...` 실사진 = 27건 → **200 OK**
//      · `https://dailyfitai.app/og/default.png` = 29건 → **여전히 404**
//    그래서 스위치를 그냥 켜면 절반이 죽은 이미지가 된다(끄게 만든 그 사고 재발). 켜고 끄는
//    깃발 대신 **URL 이 실물인지**로 가른다 — 우리 도메인의 `/og/*` 는 아직 자리표시자이므로
//    브랜드 OG 로 폴백하고, 외부 CDN 실사진은 그대로 내보낸다. 나중에 `/og/*` 에셋이 실제로
//    배포되면 이 예외만 지우면 된다.
const BRAND_OG = `${site.url}/opengraph-image.png`;

/** 아직 실물이 없는 자리표시자 경로(우리 도메인의 /og/…). 실측으로만 늘린다. */
const OG_PLACEHOLDER_RE = /^https?:\/\/(?:www\.)?dailyfitai\.app\/og\//i;

function ogImageFor(activity: { og_image_url: string | null }): string {
  const url = activity.og_image_url;
  if (url && !OG_PLACEHOLDER_RE.test(url)) return url;
  return BRAND_OG;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const activity = await getPublicActivity(id);
  if (!activity) return { title: '활동 · DailyFit' };
  const description =
    activity.summary ?? `${activity.neighborhood ?? ''} ${activity.is_free ? '무료' : ''} 활동`.trim();
  const ogImage = ogImageFor(activity);
  return {
    title: { absolute: `${activity.title} · DailyFit` },
    description,
    // ── canonical 은 my. 를 가리킨다 (2026-08-05 청자 분리 방침) ──────────
    // 활동 상세는 소비자 화면이고, 소비자 도메인은 my.dailyfitai.app 이다.
    // 그런데 my. 는 Expo 정적 export 라 내용을 서버가 그려 보내지 못한다(크롤러가
    // 읽는 글자 16자). 그래서 **렌더는 여기서, 색인은 my. 로** 나눈다:
    //   · my.dailyfitai.app/activity/{id} → vercel rewrite → 이 페이지
    //   · 이 페이지의 canonical → my. 주소
    // 그 결과 검색결과에 뜨는 주소는 항상 my. 다.
    //
    // 301 리다이렉트를 쓰지 않는 이유: rewrite 목적지가 이 URL 이라 리다이렉트를
    // 걸면 무한 루프가 된다. 또 이미 카톡으로 나간 dailyfitai.app 공유 링크가
    // 깨지면 안 된다 — 그 링크는 계속 열리고, 색인만 my. 로 모인다.
    //
    // ⚠️ 위 설계는 my. rewrite 가 살아 있을 때만 성립한다. 8/6 실측에서 그 전제가
    //    깨져 있어(my./activity/{id} = 404) `myIndexLive` 스위치로 가른다 —
    //    꺼져 있으면 자기참조 canonical 로 돌아가 색인을 살려둔다. lib/site.ts 참고.
    alternates: {
      canonical: myIndexLive ? `${productAppUrl}/activity/${id}` : `/activity/${id}`,
    },
    openGraph: {
      type: 'website',
      title: activity.title,
      description,
      url: activity.share_url,
      siteName: site.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: activity.title,
      description,
      images: [ogImage],
    },
  };
}

function priceLabel(activity: { is_free: boolean; price: number | null }): string {
  if (activity.is_free) return '무료';
  if (activity.price != null) return `${activity.price.toLocaleString('ko-KR')}원`;
  return '문의';
}

/**
 * 일정 한 줄 — `2026년 1월 12일 ~ 12월 4일`. 날짜가 없으면 null(줄 자체가 사라진다).
 *
 * 왜 화면에도 넣는가: 이 페이지는 이제 날짜가 있는 건에 schema.org `Event` 를
 * 내보낸다. 구조화 데이터는 **페이지에 실제로 보이는 내용**을 나타내야 하고, 지금은
 * 날짜가 소개문(`summary`) 안 "교육기간: …" 텍스트에만 묻혀 있어서 그 대응이 암묵적이다.
 * 명시적으로 보여주면 그 요건이 분명해지고, 무엇보다 "언제 하는지"는 방문자가 가장
 * 먼저 찾는 사실이다.
 *
 * 지어내지 않는다: 백엔드가 형식 불량·역전 구간을 이미 null 로 걸러 보내므로 여기서는
 * 파싱만 하고, `Date` 로 못 읽히면 그 값은 버린다(잘못된 날짜를 그리지 않는다).
 */
function scheduleLabel(start?: string | null, end?: string | null): string | null {
  const fmt = (iso: string, withYear: boolean) => {
    const d = new Date(`${iso}T00:00:00+09:00`);
    if (Number.isNaN(d.getTime())) return null;
    return new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Asia/Seoul',
      ...(withYear ? { year: 'numeric' as const } : {}),
      month: 'long',
      day: 'numeric',
    }).format(d);
  };
  if (!start) return null;
  const startLabel = fmt(start, true);
  if (!startLabel) return null;
  if (!end || end === start) return startLabel;
  // 같은 해면 종료일에서 연도를 뺀다 — "2026년 1월 12일 ~ 12월 4일".
  const sameYear = start.slice(0, 4) === end.slice(0, 4);
  const endLabel = fmt(end, !sameYear);
  return endLabel ? `${startLabel} ~ ${endLabel}` : startLabel;
}

export default async function ActivityLandingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activity = await getPublicActivity(id);
  if (!activity) notFound();

  const deepLink = `dailyfit://activity/${activity.id}`;
  const schedule = scheduleLabel(activity.start_date, activity.end_date);

  return (
    <article>
      {/* 화면에 실제로 보이는 사실만 마크업한다 — 숨은 값 없음.
          날짜가 있으면 Event, 없으면 종전 WebPage (lib/jsonld.ts 승격 규칙). */}
      <JsonLd data={activityEventJsonLd(activity)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'DailyFit', path: '/' },
          { name: '활동', path: '/product' },
          { name: activity.title, path: `/activity/${activity.id}` },
        ])}
      />

      {/* 활동 헤더 — 브랜드 히어로(D2 OG 자산 준비 전엔 외부 이미지 대신 톤 블록) */}
      <header className="hero-field relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 pb-12 pt-20 lg:pt-24">
          <p className="eyebrow-mono text-sage">DailyFit 활동</p>
          <h1 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[44px]">
            {activity.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-[18px]">
            {schedule && (
              <span className="font-semibold text-ink">
                <time dateTime={activity.start_date ?? undefined}>{schedule}</time>
              </span>
            )}
            {activity.neighborhood && (
              <span className="text-ink-soft">{activity.neighborhood}</span>
            )}
            <span
              className={
                activity.is_free
                  ? 'rounded-full bg-sage/15 px-3 py-1 font-bold text-sage'
                  : 'font-bold text-ink'
              }
            >
              {priceLabel(activity)}
            </span>
          </div>
        </div>
      </header>

      {/* 소개 */}
      {activity.summary && (
        <div className="bg-bg py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-5">
            <p className="text-[20px] leading-[1.8] text-ink">{activity.summary}</p>
          </div>
        </div>
      )}

      {/* 앱으로 유도 CTA (navy 섹션 — StoreBadge 재사용) */}
      <section className="bg-navy py-14 text-ivory sm:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-[24px] font-bold sm:text-[30px]">이 활동, 신청까지 대신 해 드려요</h2>
          <p className="mt-4 text-[18px] leading-[1.7] text-ivory/80">
            설치하지 않아도 웹에서 바로 쓰실 수 있어요. 말만 하시면 딱 맞는 활동을 찾아
            신청까지 도와드립니다.
          </p>
          {/* 웹이 1순위 출구다. 이 페이지는 검색·공유로 들어오는 착지점인데,
              안드로이드는 아직 스토어에 없고(“곧 출시” 비클릭 배지) 앱 딥링크는
              미설치자에게 아무 일도 일어나지 않는다 — 웹 링크가 없으면 여기까지
              찾아온 방문자가 막힌다. 2026-08-04. */}
          <div className="mt-8 flex justify-center">
            <a
              href={productAppUrl}
              {...externalLinkProps}
              className="inline-flex min-h-tap items-center rounded-xl bg-sage px-9 py-4 text-[18px] font-extrabold text-ivory transition-colors hover:bg-sage-dk active:scale-[0.98]"
            >
              웹에서 바로 시작하기
            </a>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={deepLink}
              className="inline-flex min-h-tap items-center rounded-xl border border-ivory/35 px-7 text-[17px] font-bold text-ivory transition-colors hover:bg-white/10 active:scale-[0.98]"
            >
              앱에서 보기
            </a>
            <StoreBadge store="App Store" href={storeLinks.ios} />
            <StoreBadge store="Google Play" href={storeLinks.android} />
          </div>
        </div>
      </section>
    </article>
  );
}
