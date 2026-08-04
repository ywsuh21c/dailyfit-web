import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata: Metadata = pageSeo({
  path: '/en/privacy',
  title: 'Privacy Policy',
  description:
    'How DailyFit handles personal data. Courtesy English translation; the Korean version is legally binding.',
  noindex: true, // 한국어본이 법적 정본 — 번역본은 색인 제외 (기존 정책)
});

// Placeholder until the real policy lands — the privacy link 404ing is a
// compliance smell for a product that collects personal data.
// TODO(Legal Counsel): 정식 개인정보처리방침 입고 시 본문 교체 + index 허용.

export default function PrivacyPage() {
  return (
    <section className="bg-bg py-24">
      <div className="mx-auto max-w-3xl px-5">
        <p className="eyebrow-mono text-sage">Legal</p>
        <h1 className="mt-4 text-h2 text-ink">Privacy Policy</h1>
        <p className="mt-4 text-sm text-ink-soft">
          This English text is provided for convenience. The Korean version is
          the legally binding version.
        </p>
        <p className="mt-6 text-body text-ink-soft">
          We are preparing a formal privacy policy in time for our official
          launch. For inquiries regarding data processing, please write to{' '}
          <a
            href={`mailto:${site.contactEmail}`}
            className="font-semibold text-sage underline-offset-4 hover:underline"
          >
            {site.contactEmail}
          </a>
          . We do not share your data externally without your consent.
        </p>

        <div className="mt-12 border-t border-line pt-10">
          <h2 className="text-h3 text-ink">Retention of Inquiries and Consultations</h2>
          <p className="mt-4 text-body leading-[1.75] text-ink-soft">
            Customer inquiries (email, KakaoTalk consultations, and the like) and
            voice search data are used solely for the purpose of providing the
            service, and are destroyed without delay once that purpose is
            fulfilled or the period set by applicable law has passed. Voice data
            is used to deliver search results and is not provided to any third
            party without separate consent.
          </p>
        </div>
      </div>
    </section>
  );
}
