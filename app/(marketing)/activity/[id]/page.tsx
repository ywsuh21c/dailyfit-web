import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';
import { parseFacts } from '@/lib/description-facts';
import { getPublicActivity } from '@/lib/activity';
import { categoryLabel, priceLabelOf } from '@/lib/catalog-sample';
import { site, storeLinks, productAppUrl, myIndexLive, externalLinkProps } from '@/lib/site';
import { activityEventJsonLd, breadcrumbJsonLd } from '@/lib/jsonld';
import { JsonLd } from '@/components/seo/JsonLd';
import { StoreBadge } from '@/components/product/StoreBadge';

// /activity/[id] — 링크 공유 착지 + 검색 유입의 본체(사이트맵의 99%).
// 외부 API fetch → 동적 렌더(ISR 5분). 카톡 카드 og 는 generateMetadata 가 제공.
//
// 2026-09-03 리디자인 "Editorial Daylight": 제목·사실 칩이 종이(ivory) 헤더에,
// 본문은 (사진 → 소개 표 → 장소 → DailyFit 이 함께하는 방식) 한 열, 오른쪽에 고정
// 신청 카드. 모바일은 하단 고정 CTA 바. 지키는 불변식(scripts/seo-healthcheck.mjs):
//   · Event 면 화면에 <time> 이 보인다 (헤더 칩)
//   · JSON-LD image 는 화면 <img src> 와 같은 URL (사진 블록)
//   · canonical 자기참조 (myIndexLive=false) · title 에 한글 브랜드 토큰
//   · 공급처 원문(제목·소개)은 고쳐 쓰지 않는다 — 우리 문장만 우리가 쓴다.

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
  if (!activity) return { title: `활동 · ${site.nameKo}` };
  const description =
    activity.summary ?? `${activity.neighborhood ?? ''} ${activity.is_free ? '무료' : ''} 활동`.trim();
  const ogImage = ogImageFor(activity);
  return {
    // ⚠️ `absolute` 라 루트 layout 의 title.template 을 **타지 않는다.** 즉 브랜드
    // 접미를 여기서 직접 써야 하고, layout 만 고치면 이 8,701장은 조용히 옛 표기로
    // 남는다 (2026-08-17 가드가 실제로 그렇게 잡아냈다). 한글 토큰이 가장 중요한
    // 곳이 바로 여기다 — 롱테일 검색 유입의 본체이고, 네이버·구글에 우리 이름으로
    // 걸리는 페이지 수의 99% 다.
    title: { absolute: `${activity.title} · ${site.nameKo}` },
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

/**
 * 일정 한 줄 — `2026년 1월 12일 ~ 12월 4일`. 날짜가 없으면 null(줄 자체가 사라진다).
 *
 * 왜 화면에도 넣는가: 이 페이지는 날짜가 있는 건에 schema.org `Event` 를 내보낸다.
 * 구조화 데이터는 **페이지에 실제로 보이는 내용**을 나타내야 하고, "언제 하는지"는
 * 방문자가 가장 먼저 찾는 사실이다.
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

/** 소개 표에서 «상태» 성격의 항목만 헤더 칩으로 끌어올린다. 값은 원문 그대로. */
const CHIP_LABELS = new Set(['접수상태']);

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
  const price = priceLabelOf(activity);
  const category = categoryLabel(activity.category);
  // 실사진만 — `og_image_url` 은 폴백으로 scene_key 스톡/브랜드 디폴트가 섞여 오므로
  // 여기 쓰면 "그 활동의 사진"이 아닌 분위기 이미지를 사진처럼 보여주게 된다.
  // 구조화 데이터의 `image` 와 **같은 값**을 쓴다(화면과 마크업이 갈리면 그게 곧 숨은 값이다).
  const activityPhoto = activity.hero_image_url || activity.image_url || null;
  // 설명을 (항목 · 불릿 · 남은 산문)으로 가른다. 표가 아니면 facts 가 비고 원문이 그대로 나온다.
  const summaryFacts = parseFacts(activity.summary);
  const statusChips = summaryFacts.facts.filter((f) => CHIP_LABELS.has(f.label));
  const tableFacts = summaryFacts.facts;
  const place = activity.address ?? null;

  return (
    <article className="pb-28 lg:pb-0">
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

      {/* ─── header on paper: where · what · the facts that decide ─── */}
      <header className="ed-hero">
        <div className="ed-hero-grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-wrap px-5 pb-10 pt-12 sm:px-8 lg:pb-12 lg:pt-16">
          <p className="flex flex-wrap items-center gap-x-2.5 text-eyebrow uppercase text-sage">
            {activity.neighborhood && <span>{activity.neighborhood}</span>}
            {activity.neighborhood && <span className="text-ink/30" aria-hidden="true">·</span>}
            <span>{category}</span>
          </p>
          <h1 className="mt-4 max-w-[26ch] text-[30px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[40px] lg:text-[46px]">
            {activity.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            {schedule && (
              <span className="ed-chip">
                <time dateTime={activity.start_date ?? undefined}>{schedule}</time>
              </span>
            )}
            {price && <span className="ed-chip font-bold">{price}</span>}
            {statusChips.map((f) => (
              <span key={f.label} className="ed-chip ed-chip-sage">
                {f.value}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ─── body: content column + sticky action card ─── */}
      <div className="mx-auto grid max-w-wrap gap-12 px-5 pt-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-14 lg:pt-12">
        <div className="flex flex-col gap-12">
          {/* 실사진 — 있을 때만. 없으면 이 블록 자체가 사라진다(자리표시자 안 만든다).
              next/image 를 쓰지 않는 이유: 사진 CDN 이 `remotePatterns` 에 없고, 그걸 추가하는
              건 이미지 최적화 파이프라인을 새로 켜는 별건 결정이다. 이미 CDN 위에 있는 파일이라
              plain <img> + 명시 비율로 충분하고 설정 위험이 0 이다. */}
          {activityPhoto && (
            <div
              className="relative overflow-hidden rounded-[20px] border border-hair bg-ink/5"
              style={{ aspectRatio: '16 / 9' }}
            >
              <img
                src={activityPhoto}
                alt={activity.title}
                className="h-full w-full object-cover"
                width={1200}
                height={675}
                loading="eager"
                decoding="async"
              />
            </div>
          )}

          {/* 소개 — 공급처 설명은 실제로는 «문장이 아니라 표»다. 라벨이 있으면 표로 되돌리고,
              진짜 산문이면 손대지 않는다(판정은 lib/description-facts.ts 의 parseFacts). */}
          {activity.summary && (
            <section aria-labelledby="about-heading">
              <h2 id="about-heading" className="text-[22px] font-bold tracking-[-0.02em] text-ink">
                소개
              </h2>
              {tableFacts.length > 0 ? (
                <>
                  <dl className="mt-4 grid gap-x-8 gap-y-3 border-t border-hair pt-5 sm:grid-cols-[max-content_1fr]">
                    {tableFacts.map((f) => (
                      <Fragment key={`${f.label}-${f.value}`}>
                        <dt className="text-[16px] font-semibold text-ink-soft sm:text-[17px]">{f.label}</dt>
                        <dd className="text-[18px] leading-[1.7] text-ink sm:text-[19px]">{f.value}</dd>
                      </Fragment>
                    ))}
                  </dl>
                  {summaryFacts.bullets.length > 0 && (
                    <ul className="mt-5 list-disc space-y-2 pl-5 text-[18px] leading-[1.7] text-ink sm:text-[19px]">
                      {summaryFacts.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {summaryFacts.rest && (
                    <p className="mt-5 text-[18px] leading-[1.8] text-ink sm:text-[19px]">{summaryFacts.rest}</p>
                  )}
                </>
              ) : (
                <p className="mt-4 border-t border-hair pt-5 text-[18px] leading-[1.8] text-ink sm:text-[19px]">
                  {activity.summary}
                </p>
              )}
            </section>
          )}

          {/* 장소 — 주소가 있을 때만(충전율 낮음). 지역명은 헤더가 이미 말한다. */}
          {place && (
            <section aria-labelledby="place-heading">
              <h2 id="place-heading" className="text-[22px] font-bold tracking-[-0.02em] text-ink">
                장소
              </h2>
              <p className="mt-4 border-t border-hair pt-5 text-[18px] leading-[1.7] text-ink sm:text-[19px]">
                {place}
              </p>
            </section>
          )}

          {/* DailyFit 이 함께하는 방식 — FD-014 순서(안도감 → 즐거움 → 간편함), 전부 현재형.
              「무조건」·「100%」·과거형 성공담 없음. 외부 기관 대행의 정직 분기(정보는 미리
              준비하고, 본인인증 단계는 그때 안내)는 앱 ApplyScreen 의 문장과 같은 뜻이다. */}
          <section aria-labelledby="with-heading" className="border-t border-hair pt-10">
            <h2 id="with-heading" className="text-[22px] font-bold tracking-[-0.02em] text-ink">
              이 활동, DailyFit이 이렇게 함께합니다
            </h2>
            <div className="mt-6 grid gap-3.5 sm:grid-cols-3">
              <WithCard n="01" title="신청 절차를 대신 밟습니다">
                회원가입·신청서·접수를 Agent가 진행하고, 본인인증처럼 회원만 할 수 있는 단계는 그
                순간 바로 안내합니다.
              </WithCard>
              <WithCard n="02" title="이런 활동을 계속 찾아드립니다">
                관심사를 기억해{activity.neighborhood ? ` ${activity.neighborhood} 안팎에서` : ''} 비슷한
                강좌와 모임을 매주 새로 골라 보여드립니다.
              </WithCard>
              <WithCard n="03" title="말 한마디면 됩니다">
                &ldquo;주말에 배울 만한 거 있어?&rdquo; 처럼 평소 말투로 이야기하면 됩니다.
              </WithCard>
            </div>
          </section>
        </div>

        {/* ─── the action card — sticky on desktop ─── */}
        <aside className="lg:sticky lg:top-24">
          <div className="ed-card flex flex-col gap-4 p-6 shadow-card">
            <p className="text-eyebrow uppercase text-sage">신청, 함께합니다</p>
            <dl className="flex flex-col gap-3 border-y border-hair py-4 text-[16px]">
              {price && (
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">요금</dt>
                  <dd className="font-bold text-ink">{price}</dd>
                </div>
              )}
              {schedule && (
                <div className="flex justify-between gap-4">
                  <dt className="shrink-0 text-ink-soft">일정</dt>
                  <dd className="text-right font-semibold text-ink">{schedule}</dd>
                </div>
              )}
              {activity.neighborhood && (
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">지역</dt>
                  <dd className="font-semibold text-ink">{activity.neighborhood}</dd>
                </div>
              )}
            </dl>
            {/* 웹이 1순위 출구다. 이 페이지는 검색·공유로 들어오는 착지점인데, 안드로이드는
                아직 스토어에 없고(“곧 출시” 비클릭 배지) 앱 딥링크는 미설치자에게 아무 일도
                일어나지 않는다 — 웹 링크가 없으면 여기까지 찾아온 방문자가 막힌다. 2026-08-04. */}
            <a
              href={productAppUrl}
              {...externalLinkProps}
              className="inline-flex min-h-[56px] items-center justify-center rounded-xl bg-sage px-6 text-[18px] font-extrabold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
            >
              웹에서 바로 시작하기
            </a>
            <a
              href={deepLink}
              className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-hair-strong px-6 text-[17px] font-bold text-ink transition-colors hover:border-sage hover:text-sage active:scale-[0.98]"
            >
              앱에서 보기
            </a>
            <div className="grid grid-cols-2 gap-2">
              <StoreBadge store="App Store" href={storeLinks.ios} tone="light" />
              <StoreBadge store="Google Play" href={storeLinks.android} tone="light" />
            </div>
            <p className="text-[13.5px] leading-[1.6] text-ink-soft">
              AI는 제안하고, 결정은 회원이 합니다. 결제와 본인인증은 회원 본인이 직접 진행합니다.
            </p>
          </div>
        </aside>
      </div>

      {/* ─── mobile: the same two exits, pinned to the bottom ─── */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-hair bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-wrap gap-2.5">
          <a
            href={productAppUrl}
            {...externalLinkProps}
            className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-xl bg-sage px-4 text-[17px] font-extrabold text-white active:scale-[0.98]"
          >
            웹에서 바로 시작하기
          </a>
          <a
            href={deepLink}
            className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-hair-strong px-4 text-[16px] font-bold text-ink active:scale-[0.98]"
          >
            앱에서 보기
          </a>
        </div>
      </div>
    </article>
  );
}

function WithCard({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="ed-card flex flex-col gap-2.5 p-5">
      <span className="num text-eyebrow text-sage">{n}</span>
      <p className="text-[18px] font-bold leading-[1.35] text-ink">{title}</p>
      <p className="text-[15.5px] leading-[1.7] text-ink-soft">{children}</p>
    </div>
  );
}
