import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicActivity } from '@/lib/activity';
import { site, storeLinks } from '@/lib/site';
import { absoluteUrl } from '@/lib/seo';
import { activityEventJsonLd, breadcrumbJsonLd } from '@/lib/jsonld';
import { JsonLd } from '@/components/seo/JsonLd';
import { StoreBadge } from '@/components/product/StoreBadge';

// /activity/[id] — 링크 공유 착지 페이지 (앱 미설치자도 브라우저로 열림).
// 외부 API fetch → 동적 렌더(ISR 5분). 카톡 카드 og 는 generateMetadata 가 제공.

// 카톡 미리보기 카드용 이미지.
//
// 백엔드는 og_image_url 로 `${site}/og/scene/{scene_key}.png` 를 주는데, 그 씬별 OG 에셋은
// 아직 웹에 없다(2026-07-14 실측: /og/scene/dance.png → 404). 죽은 이미지를 og:image 로
// 내보내면 카카오가 이미지를 못 받아 카드에 그림이 안 뜬다 → 실존하는 브랜드 OG 로 폴백해
// 최소한 DailyFit 카드가 보이게 한다. 씬별 에셋이 추가되면 og_image_url 이 자동으로 쓰인다.
const BRAND_OG = `${site.url}/opengraph-image.png`;
const OG_SCENE_ASSETS_READY = false; // 씬별 OG 에셋 배포 시 true (그 전엔 브랜드 OG 폴백)

function ogImageFor(activity: { og_image_url: string | null }): string {
  if (OG_SCENE_ASSETS_READY && activity.og_image_url) return activity.og_image_url;
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
    // 공유 링크와 검색 결과가 같은 URL 을 가리키게 고정 — 카톡/앱이 붙이는
    // 쿼리스트링(utm 등)이 별개 페이지로 색인되는 것을 막는다.
    alternates: { canonical: `/activity/${id}` },
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

export default async function ActivityLandingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activity = await getPublicActivity(id);
  if (!activity) notFound();

  const deepLink = `dailyfit://activity/${activity.id}`;

  return (
    <article>
      {/* 화면에 실제로 보이는 사실만 마크업한다 — 숨은 값 없음. */}
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
          <h2 className="text-[24px] font-bold sm:text-[30px]">앱에서 이 활동을 신청하세요</h2>
          <p className="mt-4 text-[18px] leading-[1.7] text-ivory/80">
            말만 하면 DailyFit이 딱 맞는 활동을 찾아 신청까지 도와드려요.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={deepLink}
              className="inline-flex min-h-tap items-center rounded-xl bg-sage px-7 text-[17px] font-bold text-ivory transition-colors hover:bg-sage-dk active:scale-[0.98]"
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
