import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import { site } from '@/lib/site';
import { CopyEmail } from '@/components/ui/CopyEmail';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = pageSeo({
  path: '/en/contact',
  title: 'Contact',
  description:
    'Reach DailyFit directly. Investors, partnerships, talent, and press all get a personal reply from the founder.',
  noindex: true, // 기존 정책 유지
});

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
      <section className="ed-hero">
        <div className="ed-hero-grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 pb-20 pt-20 text-center sm:px-8 lg:pt-28">
          <p className="text-eyebrow uppercase text-sage">Talk to us</p>
          <h1 className="mt-6 text-display-sm text-ink sm:text-[48px] sm:leading-[1.1]">
            Our door is
            <br />
            always open.
          </h1>
          <p className="mx-auto mt-6 max-w-[44ch] text-body text-ink-soft">
            Whatever you want to talk about, we&rsquo;re glad to hear it.
            <br />
            Write to the address below and we read and reply personally.
          </p>
          <div className="mt-12">
            <CopyEmail email={site.contactEmail} lang="en" />
          </div>
        </div>
      </section>

      <section className="border-t border-hair bg-bg py-16 sm:py-20">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {AUDIENCES.map((a) => (
                <div key={a.tag} className="ed-card h-full p-6">
                  <p className="text-eyebrow uppercase text-sage">
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
