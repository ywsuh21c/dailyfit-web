import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import Link from 'next/link';
import { site } from '@/lib/site';
import { Reveal } from '@/components/motion/Reveal';
import { JourneyPath } from '@/components/motion/JourneyPath';
import { Spread, SpreadTitle } from '@/components/ui/Editorial';

// About (/en/about) — English mirror of app/(marketing)/about. Same structure,
// same numbered spreads; keep copy in sync when either side changes.
// Market is global, with Korea as the beachhead. Solo-founder structure
// (2026-08-20): every founder fact derives from lib/site.ts.

export const metadata: Metadata = pageSeo({
  path: '/en/about',
  title: 'About',
  description: `${site.name} · AI is the instrument, the 55+ generation is the identity. A team building AI Agents for adults 55+.`,
});

export default function EnAboutPage() {
  return (
    <>
      <section className="ed-hero">
        <div className="ed-hero-grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-wrap px-5 pb-16 pt-16 sm:px-8 lg:pb-20 lg:pt-24">
          <p className="text-eyebrow uppercase text-sage">About DailyFit</p>
          <h1 className="mt-6 max-w-[20ch] text-display-sm text-ink sm:text-[52px] sm:leading-[1.08] lg:text-[60px]">
            AI is the instrument. The 55+ generation is the identity.
          </h1>
          <p className="mt-7 max-w-[44rem] text-[19px] leading-[1.7] text-ink-soft sm:text-lead">
            DailyFit builds AI Agents for the 55+ generation. A team of Agents that designs hobbies
            and daily life. We see this generation as one of the most compelling segments anywhere.
            So before technology, we talk about a more vibrant day.
          </p>
        </div>
      </section>

      <section className="border-t border-hair bg-bg py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="01" label="Mission">
            <Reveal>
              <SpreadTitle>So everyone becomes the author of their own day</SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                DailyFit is not a care app, not a monitoring tool, and not a medical service. It is a
                tool for self-determination, vitality, and structure, so people design their own day.
              </p>
            </Reveal>
          </Spread>
        </div>
      </section>

      <section className="ed-paper border-t border-hair py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="02" label="How it started">
            <Reveal>
              <SpreadTitle>It started with our parents&rsquo; day</SpreadTitle>
              <div className="mt-7 max-w-[40rem] space-y-5 text-body text-ink-soft">
                <p>
                  In early 2025, founder Youngwoo&rsquo;s mother retired from the job she had held for
                  more than thirty years. The 9 AM commute disappeared overnight, and with it the
                  schedule that had held her days together. Golf and travel are wonderful, but they
                  cannot fill every day. Each day began with the same blank question: what do I do
                  today?
                </p>
                <blockquote className="border-l-[3px] border-sage pl-6 text-[21px] font-semibold leading-[1.6] text-ink">
                  &ldquo;You use an &lsquo;agent&rsquo; at work every day...
                  <br />
                  build me one that plans my day for me!&rdquo;
                </blockquote>
                <p>
                  She had watched her son use AI Agents at work. Yet no Agent existed to look after
                  her own day. The programs she did find were so complicated to sign up for that she
                  gave up halfway. Her friends, and their friends, told the same story. That one
                  sentence became the starting point of DailyFit.
                </p>
              </div>
            </Reveal>

            <Reveal className="mt-14">
              <JourneyPath lang="en" />
            </Reveal>

            <Reveal className="mt-12">
              <div className="ed-card max-w-[34rem] p-7">
                <p className="text-[22px] font-bold text-ink">{site.founder.name}</p>
                <p className="mt-1 text-base font-semibold text-sage">{site.founder.role}</p>
                <p className="mt-4 text-body text-ink-soft">
                  Boston University → Fudan University → Bain → PYLER → DailyFit. Runs the AI Agent
                  team directly and designs the day of adults 55+ as AaaS.
                </p>
              </div>
            </Reveal>
          </Spread>
        </div>
      </section>

      <section className="border-t border-hair bg-bg py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="03" label="How we operate">
            <Reveal>
              <SpreadTitle>We run the company with Agents too</SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                The product is an Agent that designs a member&rsquo;s day; the company is an
                organization run by a team of AI Agents. We are open about how we work.
              </p>
              <div className="mt-9 flex flex-wrap gap-3.5">
                <Link
                  href="/en/how-we-work"
                  className="inline-flex min-h-[56px] items-center rounded-xl border border-hair-strong px-7 text-[17px] font-bold text-ink transition-colors hover:border-sage hover:text-sage active:scale-[0.98]"
                >
                  How we work →
                </Link>
                <Link
                  href="/en/contact"
                  className="inline-flex min-h-[56px] items-center rounded-xl bg-sage px-7 text-[17px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
                >
                  Talk to us
                </Link>
              </div>
              <p className="mt-8 max-w-[40rem] text-body text-ink-soft">
                If you have any questions, write to us at{' '}
                <Link
                  href={`mailto:${site.contactEmail}`}
                  className="font-semibold text-sage underline-offset-4 hover:underline"
                >
                  {site.contactEmail}
                </Link>
                . We read and answer every message ourselves.
              </p>
            </Reveal>
          </Spread>
        </div>
      </section>
    </>
  );
}
