import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata: Metadata = pageSeo({
  path: '/terms',
  title: '이용약관',
  description: 'DailyFit 서비스 이용약관.',
  noindex: true, // 기존 정책 유지 (2026-08-04 감사에서 변경하지 않음)
});

// Placeholder until the real terms land — a footer legal link must never 404.
// TODO(Legal Counsel): 정식 이용약관 입고 시 본문 교체 + index 허용 검토.

export default function TermsPage() {
  return (
    <section className="bg-bg pb-24">
      <div className="ed-hero mb-14">
        <div className="ed-hero-grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 pb-12 pt-16 sm:px-8">
          <p className="text-eyebrow uppercase text-sage">Legal</p>
          <h1 className="mt-5 text-[32px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[40px]">이용약관</h1>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <p className="text-body text-ink-soft">
          정식 출시에 맞춰 이용약관을 준비하고 있습니다. 그 전에 궁금한 점이
          있다면{' '}
          <a
            href={`mailto:${site.contactEmail}`}
            className="font-semibold text-sage underline-offset-4 hover:underline"
          >
            {site.contactEmail}
          </a>
          로 문의해 주세요.
        </p>
      </div>
    </section>
  );
}
