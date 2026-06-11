import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  robots: { index: false, follow: true },
};

// Placeholder until the real policy lands — the privacy link 404ing is a
// compliance smell for a product that collects personal data.
// TODO(Legal Counsel): 정식 개인정보처리방침 입고 시 본문 교체 + index 허용.

export default function PrivacyPage() {
  return (
    <section className="bg-bg py-24">
      <div className="mx-auto max-w-3xl px-5">
        <p className="eyebrow-mono text-sage">Legal</p>
        <h1 className="mt-4 text-h2 text-ink">개인정보처리방침</h1>
        <p className="mt-6 text-body text-ink-soft">
          정식 출시에 맞춰 개인정보처리방침을 준비하고 있습니다. 데이터 처리에
          관한 문의는{' '}
          <a
            href={`mailto:${site.contactEmail}`}
            className="font-semibold text-sage underline-offset-4 hover:underline"
          >
            {site.contactEmail}
          </a>
          로 보내주세요. 본인 동의 없는 외부 제공은 하지 않습니다.
        </p>
      </div>
    </section>
  );
}
