import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'DailyFit terms of service. Courtesy English translation; the Korean version is legally binding.',
  robots: { index: false, follow: true },
};

// Placeholder until the real terms land — a footer legal link must never 404.
// TODO(Legal Counsel): 정식 이용약관 입고 시 본문 교체 + index 허용 검토.

export default function TermsPage() {
  return (
    <section className="bg-bg py-24">
      <div className="mx-auto max-w-3xl px-5">
        <p className="eyebrow-mono text-sage">Legal</p>
        <h1 className="mt-4 text-h2 text-ink">Terms of Service</h1>
        <p className="mt-4 text-sm text-ink-soft">
          This English text is provided for convenience. The Korean version is
          the legally binding version.
        </p>
        <p className="mt-6 text-body text-ink-soft">
          We are preparing formal terms of service in time for our official
          launch. In the meantime, if you have any questions, please reach out
          to{' '}
          <a
            href={`mailto:${site.contactEmail}`}
            className="font-semibold text-sage underline-offset-4 hover:underline"
          >
            {site.contactEmail}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
