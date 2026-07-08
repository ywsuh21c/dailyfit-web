import type { Metadata } from 'next';
import { site, storeLinks } from '@/lib/site';
import { StoreBadge } from '@/components/product/StoreBadge';

// /i/[code] — 친구 초대 링크 착지 페이지 (앱 미설치자도 브라우저로 열림).
// 카톡 공유 시 미리보기 카드(og)는 generateMetadata 가 제공 → 링크가 죽지 않고 카드로 뜬다.
// invite.tsx·together.tsx("같이가요") 둘 다 이 라우트(INVITE_BASE=https://dailyfitai.app/i/)로 착지.
// {code} 는 초대자 식별값(referral) — PII 조회 없이 일반 초대 카피로 렌더(무해).

const INVITE_TITLE = '친구가 DailyFit에 초대했어요';
const INVITE_DESC =
  '말 한마디로 하루를 설계하는 액티브 시니어 AI. 친구 초대로 함께 시작해요.';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  return {
    title: `${INVITE_TITLE} · DailyFit`,
    description: INVITE_DESC,
    openGraph: {
      type: 'website',
      title: INVITE_TITLE,
      description: INVITE_DESC,
      url: `${site.url}/i/${code}`,
      siteName: site.name,
      images: [{ url: '/og-get.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: INVITE_TITLE, description: INVITE_DESC },
  };
}

// 설치 귀속(best-effort) — 초대 코드를 Play Install Referrer 로 실어 보낸다. 값이
// 비어있으면(env 미설정) StoreBadge 가 "곧 출시" 비클릭 상태로 안전하게 렌더.
function withReferrer(href: string, code: string): string {
  if (!href) return href;
  try {
    const url = new URL(href);
    url.searchParams.set('referrer', `invite_${code}`);
    return url.toString();
  } catch {
    return href;
  }
}

export default async function InviteLandingPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const deepLink = `dailyfit://invite/${code}`;

  return (
    <article>
      <header className="hero-field relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 pb-12 pt-20 text-center lg:pt-24">
          <p className="eyebrow-mono text-sage">DailyFit 초대</p>
          <h1 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[44px]">
            {INVITE_TITLE}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[19px] leading-[1.7] text-ink-soft">
            {INVITE_DESC}
          </p>
        </div>
      </header>

      {/* 앱 설치·열기 CTA (navy 섹션 — activity/[id] 와 동일 StoreBadge 재사용) */}
      <section className="bg-navy py-14 text-ivory sm:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-[24px] font-bold sm:text-[30px]">앱을 설치하고 함께 시작해요</h2>
          <p className="mt-4 text-[18px] leading-[1.7] text-ivory/80">
            말만 하면 DailyFit이 딱 맞는 활동을 찾아 신청까지 도와드려요.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={deepLink}
              className="inline-flex min-h-tap items-center rounded-xl bg-sage px-7 text-[17px] font-bold text-ivory transition-colors hover:bg-sage-dk active:scale-[0.98]"
            >
              앱에서 열기
            </a>
            <StoreBadge store="App Store" href={storeLinks.ios} />
            <StoreBadge store="Google Play" href={withReferrer(storeLinks.android, code)} />
          </div>
        </div>
      </section>
    </article>
  );
}
