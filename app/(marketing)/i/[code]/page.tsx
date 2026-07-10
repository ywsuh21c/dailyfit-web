import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { site, storeLinks } from '@/lib/site';
import { StoreBadge } from '@/components/product/StoreBadge';
import { CopyCodeButton } from '@/components/invite/CopyCodeButton';

// /i/[code] — 친구 초대 링크 착지 페이지 (2026-07-10).
// 앱의 '친구 초대'가 공유하는 https://dailyfitai.app/i/{code} 의 실체.
// ⚠️ 이 페이지가 없던 동안 카톡 미리보기 없음 + 클릭 404 → 앱에서 링크가 제거되는
//    일이 반복됐음. 앱 invite.tsx(LINK_BASE)와 이 라우트는 한 쌍 — 경로를 바꾸면
//    반드시 앱 공유 메시지도 함께 바꿀 것.
// 패턴은 /activity/[id] 랜딩과 동형: generateMetadata(OG) + StoreBadge.
// 신규 설치는 가입 온보딩의 '추천 코드 입력'이 실동작 경로 — 코드가 주인공.

const REFERRAL_REWARD = 1000; // 앱 invite.tsx REFERRAL_REWARD 미러(양쪽 각 1,000P)

// 코드 검증 — 영문/숫자 3~20자만 유효(메타 태그 오염·장난 URL 방지).
function sanitizeCode(raw: string): string | null {
  const code = decodeURIComponent(raw).trim().toUpperCase();
  return /^[A-Z0-9]{3,20}$/.test(code) ? code : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code: raw } = await params;
  const code = sanitizeCode(raw);
  const title = 'DailyFit 초대장이 도착했어요';
  const description = code
    ? `추천 코드 ${code} 를 넣고 가입하면 두 분 모두 ${REFERRAL_REWARD.toLocaleString('ko-KR')} 포인트를 받아요.`
    : `가입하고 나에게 맞는 활동을 찾아보세요.`;
  return {
    title,
    description,
    robots: { index: false }, // 개인 초대 링크 — 검색 인덱싱 불필요
    openGraph: {
      type: 'website',
      title,
      description,
      url: `${site.url}/i/${code ?? ''}`,
      siteName: site.name,
      // 사이트 공용 브랜드 OG(1200×630) — 카톡 미리보기 큰 카드 규격.
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function InviteLandingPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code: raw } = await params;
  const code = sanitizeCode(raw);
  if (!code) notFound();

  return (
    <article>
      {/* 히어로 — 초대장 톤 */}
      <header className="hero-field relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 pb-12 pt-20 text-center lg:pt-24">
          <Image
            src="/brand/mascot.png"
            alt=""
            width={96}
            height={96}
            className="mx-auto rounded-full"
            priority
          />
          <p className="eyebrow-mono mt-6 text-sage">DailyFit 초대장</p>
          <h1 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[44px]">
            친구가 DailyFit으로
            <br />
            초대했어요
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[19px] leading-relaxed text-ink-soft">
            대화 한 번으로 우리 동네 활동을 찾고, 신청까지 대신 해드리는 앱이에요.
            <br />
            가입할 때 아래 추천 코드를 넣으면{' '}
            <strong className="text-sage">
              두 분 모두 {REFERRAL_REWARD.toLocaleString('ko-KR')} 포인트
            </strong>
            를 받아요.
          </p>
        </div>
      </header>

      {/* 추천 코드 카드 */}
      <section className="mx-auto max-w-3xl px-5 py-10">
        <div className="rounded-2xl border border-sage/25 bg-white p-8 text-center shadow-sm">
          <p className="text-[15px] font-semibold text-ink-soft">내 추천 코드</p>
          <p className="mt-3 text-[40px] font-extrabold tracking-[0.18em] text-ink">{code}</p>
          <div className="mt-5">
            <CopyCodeButton code={code} />
          </div>
        </div>

        {/* 받는 방법 3단계 */}
        <ol className="mx-auto mt-10 max-w-xl space-y-4">
          {[
            '아래 버튼으로 DailyFit 앱을 설치해요',
            '가입할 때 ‘추천 코드 입력’에 위 코드를 넣어요',
            `가입이 끝나면 두 분 모두 ${REFERRAL_REWARD.toLocaleString('ko-KR')} 포인트를 받아요`,
          ].map((step, i) => (
            <li key={step} className="flex items-start gap-4 text-[18px] leading-relaxed text-ink">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage/10 text-[15px] font-extrabold text-sage">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        {/* 설치 CTA */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <StoreBadge store="App Store" href={storeLinks.ios} />
          <StoreBadge store="Google Play" href={storeLinks.android} />
        </div>
      </section>
    </article>
  );
}
