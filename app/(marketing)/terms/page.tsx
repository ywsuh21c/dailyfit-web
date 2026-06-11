import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: '이용약관',
  robots: { index: false, follow: true },
};

// Placeholder until the real terms land — a footer legal link must never 404.
// TODO(Legal Counsel): 정식 이용약관 입고 시 본문 교체 + index 허용 검토.

export default function TermsPage() {
  return (
    <section className="bg-bg py-24">
      <div className="mx-auto max-w-3xl px-5">
        <p className="eyebrow-mono text-sage">Legal</p>
        <h1 className="mt-4 text-h2 text-ink">이용약관</h1>
        <p className="mt-6 text-body text-ink-soft">
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
