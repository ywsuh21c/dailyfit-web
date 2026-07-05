import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { CopyEmail } from '@/components/ui/CopyEmail';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Contact (EN)',
  description:
    'Reach DailyFit directly. Investors, partnerships, talent, and press all get a personal reply from the founders.',
  robots: { index: false, follow: true },
};

// English mirror of /contact. Same one-page, one-action design: the email
// address, copyable. mailto stays a secondary affordance because it no-ops on
// machines without a mail client.

const AUDIENCES = [
  { tag: 'Investors', body: 'Investment and IR inquiries.' },
  { tag: 'Partnerships', body: 'Partnership, supply, and B2B collaboration proposals.' },
  { tag: 'Talent', body: 'Curious what it is like to work alongside an Agent.' },
  { tag: 'Press', body: 'Press, interview, and content requests.' },
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
            Our door is
            <br />
            always open.
          </h1>
          <p className="mx-auto mt-6 max-w-[44ch] text-body text-ink-soft">
            Whatever you want to talk about, we&rsquo;re glad to hear it. Write to the address below and we read and reply personally.
          </p>
          <div className="mt-12">
            <CopyEmail email={site.contactEmail} lang="en" />
          </div>
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
