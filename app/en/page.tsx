import Link from 'next/link';
import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import { externalLinkProps, productAppUrl } from '@/lib/site';
import { getCatalogCount, formatAsOf } from '@/lib/catalog-count';
import { getCatalogSample } from '@/lib/catalog-sample';
import { getRegionFacets } from '@/lib/catalog-facets';
import { getPublishedPosts } from '@/lib/writing';
import { AgentConsole } from '@/components/home/AgentConsole';
import { CatalogStrip } from '@/components/home/CatalogStrip';
import { DeviceShot } from '@/components/home/DeviceShot';
import { AgentTierCard } from '@/components/home/AgentTierCard';
import { ShotStep } from '@/components/home/ShotStep';
import { Reveal } from '@/components/motion/Reveal';
import { Eyebrow, SpreadTitle } from '@/components/ui/Editorial';
import { SpreadSection } from '@/components/ui/SpreadSection';

// English landing (/en) — mirror of the Korean root ("/"), same "Editorial
// Daylight" art direction, translated. The Korean root is ALWAYS the default;
// this page is reached only by the language toggle. Audience: VC · press ·
// AI-savvy visitors (3rd person), same as the KO home.
//
// 🔴 The catalog strip shows the SAME real rows as the Korean home, with their
// Korean titles intact. The previous version carried a hand-written English
// list ("Hangang Cycling", "Book Club") — invented labels for programs whose
// real names are Korean. Naming a real institution's course in words it does
// not use is the same failure we removed from the Korean ticker, so the strip
// is labelled in English and the programs keep their own names.

export const metadata: Metadata = pageSeo({
  path: '/en',
  title: 'DailyFit · AI Agents for adults 55+',
  absoluteTitle: true, // title already carries the brand
  description:
    'We build AI Agents for the 55+ generation. One conversation designs the day: discovery, reminders, and applying on your behalf.',
});

export const revalidate = 21600;

export default async function EnHomePage() {
  const [{ count: catalogCount, asOf }, cards, facets] = await Promise.all([
    getCatalogCount(),
    getCatalogSample(12),
    getRegionFacets(),
  ]);
  const posts = getPublishedPosts('en').slice(0, 3);

  return (
    <>
      {/* ─────────────── HERO ─────────────── */}
      <section className="ed-hero">
        <div className="ed-hero-grid" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-wrap gap-12 px-5 pb-16 pt-16 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-16 lg:pb-20 lg:pt-24">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 text-eyebrow uppercase text-sage">
              <span className="inline-block h-2 w-2 rounded-full bg-sage" aria-hidden="true" />
              Agent-as-a-Service · Seoul
            </p>
            <h1 className="mt-7 text-display-sm text-ink sm:text-[52px] sm:leading-[1.06] lg:text-display">
              <span className="text-sage">AI Agents</span>
              <br />
              for adults 55+.
            </h1>
            <p className="mt-7 max-w-[36rem] text-[19px] leading-[1.65] text-ink-soft sm:text-lead">
              Adults 55+ are learning, meeting, and enjoying life on their smartphones. We design the
              day for the fastest-growing generation in the world, and our Agents act on their behalf.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <Link
                href="/en/contact"
                className="inline-flex min-h-[56px] items-center rounded-xl bg-sage px-7 text-[17px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
              >
                Talk to us
              </Link>
              <a
                href="#runtime"
                className="inline-flex min-h-[56px] items-center rounded-xl border border-hair-strong bg-white/50 px-7 text-[17px] font-bold text-ink transition-colors hover:border-sage hover:text-sage active:scale-[0.98]"
              >
                See how it works ↓
              </a>
            </div>

            <dl className="mt-12 grid max-w-[40rem] grid-cols-2 gap-x-6 gap-y-6 border-t border-hair-strong pt-6 sm:grid-cols-3">
              <div>
                <dd className="num text-[30px] font-extrabold leading-none tracking-[-0.03em] text-ink">
                  {catalogCount.toLocaleString('en-US')}
                </dd>
                <dt className="mt-2 text-[13px] text-ink-soft">
                  live activities · as of {formatAsOf(asOf)}
                </dt>
              </div>
              {facets && (
                <div>
                  <dd className="num text-[30px] font-extrabold leading-none tracking-[-0.03em] text-ink">
                    {facets.districts}
                  </dd>
                  {/* Label derives from the data — the first pass said "Seoul and around
                      it" while live facets covered 18 provinces (Seoul + Gyeonggi + Incheon
                      is only 58 of the 162). */}
                  <dt className="mt-2 text-[13px] text-ink-soft">
                    districts across {facets.cityCount} provinces nationwide
                  </dt>
                </div>
              )}
              <div>
                <dd className="num text-[30px] font-extrabold leading-none tracking-[-0.03em] text-ink">
                  3
                </dd>
                <dt className="mt-2 text-[13px] text-ink-soft">
                  Agent tiers · discovery, reminders, auto-apply
                </dt>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-5">
            <AgentConsole lang="en" catalogCount={catalogCount} />
          </div>
        </div>
      </section>

      {/* ─────────────── LIVE CATALOG ─────────────── */}
      <section className="ed-paper pb-20 sm:pb-24">
        <CatalogStrip
          cards={cards}
          label="Activity database · real programs, live right now"
          note="Photos and titles come from the providers, in Korean · refreshed every 6 hours"
        />
      </section>

      {/* ─────────────── 01 · THE PROBLEM ─────────────── */}
      <SpreadSection n="01" label="The problem" className="py-24 sm:py-32">
        <Reveal>
          <SpreadTitle>
            Adults 55+ have the time and the curiosity.
            <br />
            Finding what to do is the hard part.
          </SpreadTitle>
          <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
            Places to learn, people to meet, outings to take. The information is scattered across
            dozens of agencies and portals. Hard to find, and harder to sign up for.
          </p>
        </Reveal>
      </SpreadSection>

      {/* ─────────────── 02 · WHAT WE BUILT ─────────────── */}
      <SpreadSection n="02" label="What we built" tone="paper" className="py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:gap-16">
          <Reveal>
            <SpreadTitle>
              One conversation
              <br />
              designs the day.
            </SpreadTitle>
            <p className="mt-7 max-w-[34rem] text-body text-ink-soft">
              A multi-Agent platform that designs hobbies and daily life. Speak as you normally
              would, and the Agents collaborate to compose the day, then walk the tedious
              application steps on the member&rsquo;s behalf.
            </p>
            <p className="mt-8 max-w-[34rem] border-t border-hair-strong pt-6 text-[19px] font-semibold leading-relaxed text-ink">
              AI proposes.
              <br />
              The user always decides.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex items-end justify-center gap-5 lg:justify-end">
              <DeviceShot
                src="/app/05-voice-search.webp"
                alt="Searching for an activity by voice in the DailyFit app"
                className="w-[44%] max-w-[200px]"
              />
              <DeviceShot
                src="/app/04-top3-recommend.webp"
                alt="Three matching activities recommended in the DailyFit app"
                className="w-[50%] max-w-[224px] -translate-y-6"
              />
            </div>
            <p className="mt-5 text-center text-[13px] text-ink-soft lg:text-right">
              Real app screens · September 2026 build
            </p>
          </Reveal>
        </div>
      </SpreadSection>

      {/* ─────────────── 03 · HOW THE AGENT WORKS ─────────────── */}
      <SpreadSection n="03" label="How the agent works" id="runtime" className="py-24 sm:py-32">
        <Reveal>
          <SpreadTitle>How an Agent designs the day</SpreadTitle>
          <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
            It reads the intent inside a single sentence, recalls past memory, and designs the day
            by picking the best activities from an activity database gathered through public and
            partner APIs.
          </p>
        </Reveal>
        <Reveal className="mt-12" delay={120}>
          <div className="hx-runtime-board">
            <div className="hx-stage-grid" aria-hidden="true" />
            <div className="hx-grain" aria-hidden="true" />
            <div className="hx-flow relative" aria-hidden="true">
              <span className="hx-flow-node hx-flow-node-user">&gt;</span>
              <span className="hx-flow-edge" />
              <span className="hx-flow-node">intent</span>
              <span className="hx-flow-edge" />
              <span className="hx-flow-node">memory</span>
              <span className="hx-flow-edge" />
              <span className="hx-flow-node">search</span>
              <span className="hx-flow-edge" />
              <span className="hx-flow-node hx-flow-node-done">✓ plan</span>
            </div>
          </div>
        </Reveal>
      </SpreadSection>

      {/* ─────────────── 04 · MEET THE AGENTS ─────────────── */}
      <SpreadSection n="04" label="Meet the agents" tone="paper" id="agents" className="py-24 sm:py-32">
        <Reveal>
          <SpreadTitle>Three Agents that act on your behalf</SpreadTitle>
          <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
            Discovery · Reminders · Auto-apply. Each Agent does the actual work, and the wider the
            scope, the higher-tier the Agent.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <AgentTierCard tier="Discovery" title="Discovery Agent" level={1} delay={0} autonomyLabel={`Autonomy level 1 of 3`}>
            Learns your interests and finds activities beyond your neighborhood, the ones you
            would never have discovered.
          </AgentTierCard>
          <AgentTierCard tier="Reminders" title="Reminder Agent" level={2} delay={100} autonomyLabel={`Autonomy level 2 of 3`}>
            &ldquo;You need to sign up by 9 AM tomorrow.&rdquo; It tracks the easy-to-miss
            deadlines and schedules for you.
          </AgentTierCard>
          <AgentTierCard tier="Auto-apply" title="Auto-apply Agent" level={3} delay={200} autonomyLabel={`Autonomy level 3 of 3`}>
            Handles the tedious parts like sign-ups, forms, and registration on your behalf. The
            Agent walks the complex steps; you just confirm the last one.
          </AgentTierCard>
        </div>
      </SpreadSection>

      {/* ─────────────── 05 · AUTO-APPLY, AS SHIPPED ─────────────── */}
      <SpreadSection n="05" label="Auto-apply, in the app" className="py-24 sm:py-32">
        <Reveal>
          <SpreadTitle>How applying on someone&rsquo;s behalf actually works</SpreadTitle>
          <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
            It starts from the activity the member picked: the Agent handles login, the form, and
            the submission. Steps only the member can take, such as payment and identity
            verification, are handed back at that moment.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-6">
          <ShotStep
            n="1"
            src="/app/01-delegate-button.webp"
            alt="An activity page with the 'my Agent applies for me' button"
            delay={0}
          >
            One tap on &ldquo;my Agent applies for me&rdquo; starts the delegation.
          </ShotStep>
          <ShotStep
            n="2"
            src="/app/02-openrun-reserved.webp"
            alt="A first-come course with the delegated application scheduled"
            delay={100}
          >
            For first-come courses, the Agent applies the moment registration opens.
          </ShotStep>
          <ShotStep
            n="3"
            src="/app/08-portal-payment.webp"
            alt="The portal payment step handed back to the member"
            delay={200}
          >
            The Agent goes from login to the form; payment and identity checks stay with the
            member.
          </ShotStep>
        </div>
        <p className="mt-8 text-[13px] text-ink-soft">Real app screens · September 2026 build</p>
      </SpreadSection>

      {/* ─────────────── 06 · WRITING ─────────────── */}
      {posts.length > 0 && (
        <SpreadSection n="06" label="Writing" tone="paper" className="py-24 sm:py-32">
          <Reveal>
            <SpreadTitle>We write as we build.</SpreadTitle>
            <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
              How we run a company as a team of AI Agents, our hypothesis about the 55+ market,
              and the things that did not work out. We leave the thinking, not just the
              conclusion.
            </p>
          </Reveal>
          <div className="mt-10 divide-y divide-hair border-y border-hair">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link
                  href={`/en/writing/${p.slug}`}
                  className="group grid gap-2 py-6 sm:grid-cols-[150px_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
                >
                  <span className="text-eyebrow uppercase text-sage">{p.category}</span>
                  <span className="text-[21px] font-bold leading-[1.3] tracking-[-0.02em] text-ink transition-colors group-hover:text-sage">
                    {p.title}
                  </span>
                  <span className="num text-[14px] text-ink-soft">
                    {p.date?.replace(/-/g, '.')}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Link
            href="/en/writing"
            className="mt-8 inline-flex min-h-tap items-center font-bold text-sage underline-offset-4 hover:underline"
          >
            Read all →
          </Link>
        </SpreadSection>
      )}

      {/* ─────────────── CLOSING STAGE ─────────────── */}
      <section className="ed-stage py-24 text-center sm:py-32">
        <div className="hx-stage-grid" aria-hidden="true" />
        <div className="hx-grain" aria-hidden="true" />
        <div className="relative mx-auto max-w-wrap px-5 sm:px-8">
          <Reveal>
            <Eyebrow invert>Agent-as-a-Service</Eyebrow>
            <h2 className="mx-auto mt-6 max-w-[20ch] text-[34px] font-extrabold leading-[1.16] tracking-[-0.035em] text-ivory sm:text-[46px]">
              Building the next AI for adults 55+.
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/en/contact"
                className="inline-flex min-h-[56px] items-center rounded-xl bg-sage px-8 text-[17px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
              >
                Talk to us
              </Link>
              <Link
                href={productAppUrl}
                {...externalLinkProps}
                className="inline-flex min-h-[56px] items-center rounded-xl border border-ivory/25 bg-white/5 px-8 text-[17px] font-bold text-ivory transition-colors hover:border-sage-lt hover:text-sage-lt active:scale-[0.98]"
              >
                Try DailyFit →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

