import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { OrgOrbit } from '@/components/motion/OrgOrbit';
import { Spread, SpreadTitle } from '@/components/ui/Editorial';

export const metadata: Metadata = pageSeo({
  path: '/en/how-we-work',
  title: 'How we work',
  description: 'AI-Native. How DailyFit works as a team of Agents.',
});

// /en/how-we-work — English mirror of app/(marketing)/how-we-work.
// Recruiting layer, intentionally lean (hero + principles + agent-org + soft
// talent CTA). No fake job listings. Audience: global talent, third person.
// Keep structure and copy in sync with the Korean source.

const PRINCIPLES = [
  {
    k: 'AI-native',
    title: 'Humans decide, Agents execute',
    body: 'Role-based AI Agents carry out the execution of strategy, research, product, and design. Humans set the direction and make the final call.',
  },
  {
    k: 'Transparency',
    title: 'Radically Transparent',
    body: 'We make our decisions and our failures public. What we decided and why, and where we got it wrong, is kept on the record.',
  },
  {
    k: 'Compounding',
    title: 'Every decision an asset',
    body: "Meeting notes, decisions, and lessons accumulate as context for the Agents. Today's judgment makes tomorrow's faster and more accurate.",
  },
  {
    k: 'Speed',
    title: 'Small but fast',
    body: 'Our decision-making is extremely efficient. No reporting for the sake of reporting: we let the work speak.',
  },
];

const WORK = [
  {
    title: 'Agents share the execution',
    body: 'Role-based Agents handle the execution of strategy, research, product, and design in parallel.',
  },
  {
    title: 'Humans own judgment and direction',
    body: 'Meeting customers, forming hypotheses, and making the final decision are the humans’ part.',
  },
  {
    title: 'Every output on the record',
    body: 'Decisions, failures, and lessons stay in documents and become the next Agent’s context.',
  },
];

export default function EnHowWeWorkPage() {
  return (
    <>
      <section className="ed-hero">
        <div className="ed-hero-grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-wrap px-5 pb-16 pt-16 sm:px-8 lg:pb-20 lg:pt-24">
          <p className="text-eyebrow uppercase text-sage">How we work</p>
          <h1 className="mt-6 text-display-sm text-ink sm:text-[52px] sm:leading-[1.08] lg:text-display">
            AI-Native.
          </h1>
          <p className="mt-7 max-w-[44rem] text-[19px] leading-[1.7] text-ink-soft sm:text-lead">
            Here is how we actually work.
          </p>
        </div>
      </section>

      <section className="border-t border-hair bg-bg py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="01" label="Operating principles">
            <Reveal>
              <SpreadTitle>The four principles we hold to</SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                How a small team achieves the speed and rigor of a large organization at the same
                time.
              </p>
            </Reveal>
            <ol className="mt-10 flex flex-col divide-y divide-hair border-y border-hair">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={p.k} delay={i * 70}>
                  <li className="grid gap-2 py-7 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-8">
                    <div className="flex items-baseline gap-3 sm:flex-col sm:gap-1.5">
                      <span className="num text-eyebrow text-sage">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-soft">
                        {p.k}
                      </span>
                    </div>
                    <div>
                      <p className="text-[22px] font-bold leading-[1.35] text-ink">{p.title}</p>
                      <p className="mt-3 max-w-[42rem] text-[16.5px] leading-[1.75] text-ink-soft">
                        {p.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </Spread>
        </div>
      </section>

      <section className="ed-paper border-t border-hair py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="02" label="How we actually work">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:items-center lg:gap-14">
              <Reveal>
                <SpreadTitle>
                  Humans set the direction,
                  <br />
                  Agents execute.
                </SpreadTitle>
                <p className="mt-7 max-w-[36rem] text-body text-ink-soft">
                  DailyFit is a company that runs a team of AI Agents directly. It is why one person
                  with a team of Agents delivers the speed and rigor of a large organization at once.
                </p>
                <p className="mt-5 max-w-[36rem] text-body font-semibold text-ink">
                  This is not a demo device. It is how we actually work.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <OrgOrbit lang="en" />
              </Reveal>
            </div>
            <div className="mt-12 grid gap-3.5 md:grid-cols-3">
              {WORK.map((w, i) => (
                <Reveal key={w.title} delay={i * 80}>
                  <div className="ed-card h-full border-l-[3px] border-l-sage p-6">
                    <p className="text-[17px] font-bold text-ink">{w.title}</p>
                    <p className="mt-2 text-[15px] leading-[1.7] text-ink-soft">{w.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Spread>
        </div>
      </section>

      <section className="border-t border-hair bg-bg py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="03" label="Work with us">
            <Reveal>
              <SpreadTitle>We have no formal openings yet.</SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                Still, if this way of working draws you in, if you want to experience a company that
                works alongside Agents first, reach out in advance. Our next hire starts here.
              </p>
              <div className="mt-9 flex flex-wrap gap-3.5">
                <Link
                  href="/en/contact"
                  className="inline-flex min-h-[56px] items-center rounded-xl bg-sage px-7 text-[17px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
                >
                  Say hello first
                </Link>
                <Link
                  href="/en/writing"
                  className="inline-flex min-h-[56px] items-center rounded-xl border border-hair-strong px-7 text-[17px] font-bold text-ink transition-colors hover:border-sage hover:text-sage active:scale-[0.98]"
                >
                  Read our writing
                </Link>
              </div>
            </Reveal>
          </Spread>
        </div>
      </section>
    </>
  );
}
