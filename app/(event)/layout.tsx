import Link from 'next/link';
import { BrandMark } from '@/components/brand/BrandMark';
import { Footer } from '@/components/layout/Footer';
import { site } from '@/lib/site';

// (event) — 캠페인 랜딩 전용 크롬리스 레이아웃 (2026-07-17 현진 확정).
// 글로벌 Nav의 'DailyFit 시작하기' CTA가 시니어의 첫 탭을 뺏는 문제(실기기 관찰) →
// 이벤트 랜딩은 브랜드 표시만 남기고 사이트 내비·CTA를 제거, 페이지 안의
// '신청하기' 단일 동선으로 수렴시킨다. Footer 는 유지(사업자 정보 — 광고 심사 요건).
export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-hair bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-[64px] max-w-6xl items-center px-5">
          <Link
            href="/"
            className="flex min-h-tap items-center gap-2.5"
            aria-label={`${site.name} 홈`}
          >
            <BrandMark className="h-8 w-8" />
            <span className="text-[22px] font-extrabold tracking-tight text-ink">
              {site.name}
            </span>
          </Link>
        </div>
      </header>
      <main id="main" className="min-h-[60vh]">
        {children}
      </main>
      <Footer />
    </>
  );
}
