import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { OrgOrbit } from '@/components/motion/OrgOrbit';

export const metadata: Metadata = pageSeo({
  path: '/en/how-we-work',
  title: 'How we work',
  description: 'AI-Native. How DailyFit works as a team of Agents.',
});

// /en/how-we-work — English mirror of app/(marketing)/how-we-work.
// Recruiting layer, intentionally lean (hero + principles + agent-org +
// soft talent CTA). No fake job listings. Audience: global talent, third
// person. Keep copy in sync with the Korean source.

export default function EnHowWeWorkPage() {
  return (
    <>
      {/* hero */}
      <section className="hero-field relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-20 lg:pt-24">
          <p className="eyebrow-mono text-sage">How we work</p>
          <h1 className="mt-5 max-w-[20ch] text-[38px] font-extrabold leading-[1.18] tracking-[-0.03em] text-ink sm:text-[48px]">
            AI-Native.
          </h1>
          <p className="mt-6 max-w-[64ch] text-body text-ink-soft">
            Here is how we actually work.
          </p>
        </div>
      </section>

      {/* operating principles */}
      <section className="bg-bg py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="max-w-[54ch]">
            <p className="eyebrow-mono text-sage">Operating principles</p>
            <h2 className="mt-4 text-[30px] font-extrabold tracking-[-0.03em] text-ink sm:text-[36px]">
              The four principles we hold to
            </h2>
            <p className="mt-4 text-body text-ink-soft">
              How a small team achieves the speed and rigor of a large organization at the same time.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            <PrincipleCard k="01 · AI-native" title="Humans decide, Agents execute" delay={0}>
              Role-based AI Agents carry out the execution of strategy, research, product, and design.
              <br />
              Humans set the direction and make the final call.
            </PrincipleCard>
            <PrincipleCard k="02 · Transparency" title="Radically Transparent" delay={100}>
              We make our decisions and our failures public.
              <br />
              What we decided and why, and where we got it wrong, is kept on the record.
            </PrincipleCard>
            <PrincipleCard k="03 · Compounding" title="Every decision an asset" delay={200}>
              Meeting notes, decisions, and lessons accumulate as context for the Agents. Today&apos;s
              judgment makes tomorrow&apos;s faster and more accurate.
            </PrincipleCard>
            <PrincipleCard k="04 · Speed" title="Small but fast" delay={300}>
              Our decision-making is extremely efficient.
              <br />
              No reporting for the sake of reporting: we let the work speak.
            </PrincipleCard>
          </div>
        </div>
      </section>

      {/* how we actually work */}
      <section className="border-y border-line bg-surface py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow-mono text-sage">How we actually work</p>
            <h2 className="mt-4 text-[30px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[36px]">
              Humans set the direction,
              <br />
              Agents execute.
            </h2>
            <p className="mt-6 max-w-[46ch] text-body text-ink-soft">
              DailyFit is a company that runs a team of AI Agents directly.
              <br />
              It is why a team of two delivers the speed and rigor of a large organization at once.
            </p>
            <p className="mt-4 max-w-[46ch] text-body font-semibold text-ink">
              This is not a demo device. It is how we actually work.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <OrgOrbit lang="en" />
          </Reveal>
        </div>
        <div className="mx-auto mt-14 grid max-w-6xl gap-3.5 px-5 md:grid-cols-3">
          <Reveal delay={0}>
            <WorkItem title="Agents share the execution">
              Role-based Agents handle the execution of strategy, research, product, and design in parallel.
            </WorkItem>
          </Reveal>
          <Reveal delay={100}>
            <WorkItem title="Humans own judgment and direction">
              Meeting customers, forming hypotheses, and
              <br />
              making the final decision are the humans&apos; part.
            </WorkItem>
          </Reveal>
          <Reveal delay={200}>
            <WorkItem title="Every output on the record">
              Decisions, failures, and lessons stay in documents and become the next Agent&apos;s context.
            </WorkItem>
          </Reveal>
        </div>
      </section>

      {/* talent — soft CTA only (no open positions yet) */}
      <section className="bg-bg py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <Reveal>
            <p className="eyebrow-mono text-sage">Work with us</p>
            <h2 className="mx-auto mt-4 max-w-[24ch] text-[30px] font-extrabold tracking-[-0.03em] text-ink sm:text-[36px]">
              We have no formal openings yet.
            </h2>
            <p className="mx-auto mt-5 max-w-[50ch] text-body text-ink-soft">
              Still, if this way of working draws you in,
              <br />
              if you want to experience a company that works alongside Agents first, reach out in advance.
              <br />
              Our next hire starts here.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href="/en/contact"
                className="inline-flex min-h-[56px] items-center rounded-xl bg-sage px-8 text-[17px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
              >
                Say hello first
              </Link>
              <Link
                href="/en/writing"
                className="inline-flex min-h-[56px] items-center rounded-xl border border-ink/15 px-8 text-[17px] font-bold text-ink transition-colors hover:border-sage hover:text-sage active:scale-[0.98]"
              >
                Read our writing
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function PrincipleCard({
  k,
  title,
  delay,
  children,
}: {
  k: string;
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div className="h-full rounded-2xl border border-line border-t-[3px] border-t-sage bg-white p-8">
        <p className="eyebrow-mono text-sage">{k}</p>
        <h3 className="mt-4 text-[21px] font-bold text-ink">{title}</h3>
        <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">{children}</p>
      </div>
    </Reveal>
  );
}

function WorkItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line border-l-[3px] border-l-sage bg-white px-6 py-5">
      <p className="text-base font-bold text-ink">{title}</p>
      <p className="mt-1 text-[14.5px] text-ink-soft">{children}</p>
    </div>
  );
}
