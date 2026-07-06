import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { CopyEmail } from '@/components/ui/CopyEmail';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'DailyFit에 직접 연락하세요. 투자·파트너십·채용·언론 문의 모두 창업자가 직접 읽고 답합니다.',
};

// /contact — every "Talk to us" CTA on the site lands here (2026-07-04).
// Replaces bare mailto: links, which silently no-op on machines without a
// mail client. One page, one action: the email address, copyable.

const AUDIENCES = [
  { tag: 'Investors', body: '투자와 IR 관련 문의' },
  { tag: 'Partnerships', body: '제휴·공급·B2B 협업 제안' },
  { tag: 'Talent', body: 'Agent와 함께 일하는 회사가 궁금한 분' },
  { tag: 'Press', body: '언론·인터뷰·콘텐츠 요청' },
] as const;

export default function ContactPage() {
  return (
    <>
      <section className="hero-field relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="aurora aurora-1" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 pb-20 pt-24 text-center lg:pt-28">
          <p className="eyebrow-mono text-sage">Talk to us</p>
          <h1 className="mt-5 text-[36px] font-extrabold leading-[1.15] tracking-[-0.03em] text-ink sm:text-[48px]">
            저희의 문은
            <br />
            언제나 열려 있습니다.
          </h1>
          <p className="mx-auto mt-6 max-w-[44ch] text-body text-ink-soft">
            어떤 이야기든 환영합니다.
            <br />
            아래 주소로 보내주시면 저희가 직접 읽고 답합니다.
          </p>
          <div className="mt-12">
            <CopyEmail email={site.contactEmail} />
          </div>
          <p className="mt-8 text-caption text-ink-soft/70">
            Prefer English? Write to us at the same address. The founders read
            every email.
          </p>
        </div>
      </section>

      <section className="bg-bg py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {AUDIENCES.map((a) => (
                <div key={a.tag} className="rounded-xl border border-line bg-white p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sage">
                    {a.tag}
                  </p>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-ink">{a.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
