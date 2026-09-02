import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import Link from 'next/link';
import { externalLinkProps, productAppUrl, site } from '@/lib/site';
import { getCatalogCount } from '@/lib/catalog-count';
import { AgentConsole } from '@/components/home/AgentConsole';
import { Reveal } from '@/components/motion/Reveal';

// English landing (/en) — mirror of the Korean root ("/"), same "Runtime &
// Daylight" art direction (hx-* stage → daylight body), translated. The Korean
// root is ALWAYS the default; this page is reached only by the language toggle.
// Audience: VC · press · AI-savvy visitors (3rd person), same as the KO home.

export const metadata: Metadata = pageSeo({
  path: '/en',
  title: 'DailyFit · AI Agents for adults 55+',
  absoluteTitle: true, // title already carries the brand
  description:
    'We build AI Agents for the 55+ generation. One conversation designs the day: discovery, reminders, and auto-apply.',
});

// Floating data motes inside the runtime stage — deterministic positions
// (no Math.random: server/client markup must match). Pure decoration.
const MOTES: Array<{ left: string; top: string; size: number; dur: string; delay: string }> = [
  { left: '6%', top: '72%', size: 3, dur: '13s', delay: '0s' },
  { left: '11%', top: '34%', size: 2, dur: '17s', delay: '1.8s' },
  { left: '19%', top: '58%', size: 2, dur: '15s', delay: '4.2s' },
  { left: '27%', top: '20%', size: 3, dur: '19s', delay: '2.6s' },
  { left: '38%', top: '80%', size: 2, dur: '14s', delay: '6.1s' },
  { left: '47%', top: '14%', size: 2, dur: '18s', delay: '0.9s' },
  { left: '56%', top: '66%', size: 3, dur: '16s', delay: '3.4s' },
  { left: '64%', top: '28%', size: 2, dur: '13.5s', delay: '5.2s' },
  { left: '73%', top: '75%', size: 2, dur: '17.5s', delay: '1.2s' },
  { left: '81%', top: '40%', size: 3, dur: '15.5s', delay: '7.4s' },
  { left: '89%', top: '62%', size: 2, dur: '14.5s', delay: '2.1s' },
  { left: '94%', top: '22%', size: 2, dur: '18.5s', delay: '4.8s' },
];

// Static, English-labeled sample of real catalog activities (the live database
// is Korean-first; this mirrors the KO home's live ticker with representative
// English examples so the marquee reads for an English audience).
const TICKER: Array<[string, string]> = [
  ['In-house', 'Hangang Cycling'],
  ['In-house', 'AI & Digital Basics'],
  ['Fitness', 'Yogalates'],
  ['Fitness', 'Morning Pilates'],
  ['Leisure', 'Hangang Wellness Week'],
  ['Learning', 'Botanical Art'],
  ['Learning', 'Dance Sport'],
  ['Social', 'Book Club'],
  ['In-house', 'ChatGPT 101'],
];

export const revalidate = 21600;

export default async function EnHomePage() {
  const { count: catalogCount } = await getCatalogCount();
  return (
    <>
      {/* ─────────────── HERO — the runtime stage ─────────────── */}
      <section className="px-3 pt-3 sm:px-5 sm:pt-4">
        <div className="hx-stage mx-auto max-w-[1400px] rounded-[24px] sm:rounded-[32px]">
          <div className="hx-stage-grid" aria-hidden="true" />
          <div className="hx-aurora hx-aurora-a" aria-hidden="true" />
          <div className="hx-aurora hx-aurora-b" aria-hidden="true" />
          <div aria-hidden="true">
            {MOTES.map((m, i) => (
              <span
                key={i}
                className="hx-mote"
                style={{
                  left: m.left,
                  top: m.top,
                  width: m.size,
                  height: m.size,
                  ['--dur' as string]: m.dur,
                  ['--delay' as string]: m.delay,
                }}
              />
            ))}
          </div>
          <div className="hx-grain" aria-hidden="true" />

          <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 pb-20 pt-16 text-center sm:px-10 sm:pb-24 sm:pt-24">
            <p className="hx-chip-live">Agent-as-a-Service</p>
            <h1 className="mt-8 text-[30px] font-extrabold leading-[1.1] tracking-[-0.04em] text-ivory min-[430px]:text-[34px] sm:text-[60px] sm:leading-[1.08] lg:text-[72px]">
              <span className="hx-glow-text">AI Agents</span>
              <br />
              for adults 55+.
            </h1>
            <p className="mt-7 max-w-[46ch] text-[18px] leading-relaxed text-ivory/70 sm:text-[21px]">
              <span className="block">Adults 55+ are learning, meeting, and enjoying life on their smartphones.</span>
              <span className="mt-2 block">We design the day for the fastest-growing generation in the world.</span>
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/en/contact"
                className="hx-glow-cta inline-flex min-h-[56px] items-center rounded-xl bg-sage px-8 text-[17px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
              >
                Talk to us
              </Link>
              <a
                href="#runtime"
                className="inline-flex min-h-[56px] items-center rounded-xl border border-ivory/25 bg-white/5 px-8 text-[17px] font-bold text-ivory transition-colors hover:border-sage-lt hover:text-sage-lt active:scale-[0.98]"
              >
                See how it works ↓
              </a>
            </div>

            {/* The runtime, visible — the product working, front and center. */}
            <div className="relative mt-16 w-full max-w-2xl sm:mt-20">
              <div className="hx-console-halo" aria-hidden="true" />
              <div className="hx-console-tilt">
                <AgentConsole lang="en" catalogCount={catalogCount} />
              </div>
            </div>
          </div>
          <div className="hx-horizon" aria-hidden="true" />
        </div>
      </section>

      {/* ─────────────────────── PROBLEM ─────────────────────── */}
      <section className="bg-bg py-28 sm:py-40">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <Reveal>
            <p className="hx-eyebrow eyebrow-mono text-sage">The problem</p>
            <h2 className="mt-6 text-[30px] font-extrabold leading-[1.18] tracking-[-0.035em] text-ink sm:text-[42px]">
              Adults 55+ have the time and the curiosity.
              <br />
              Finding what to do is the hard part.
            </h2>
            <p className="mx-auto mt-7 max-w-3xl text-body text-ink-soft">
              Places to learn, people to meet, outings to take.
              <br />
              The information is scattered across dozens of agencies and portals.
              <br />
              Hard to find, and harder to sign up for.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────────────── WHAT WE BUILD (solution) ─────────────── */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow-mono text-sage">Solution: What we built</p>
            <h2 className="mt-5 text-[34px] font-extrabold leading-[1.15] tracking-[-0.035em] text-ink sm:text-[46px]">
              One conversation
              <br />
              designs the day.
            </h2>
            <p className="mt-7 max-w-[46ch] text-body text-ink-soft">
              A multi-Agent platform that designs hobbies and daily life.
              <br />
              Speak as you normally would, and the Agents collaborate to compose the day.
            </p>
            <p className="hx-pull mt-8 text-[19px] font-semibold leading-relaxed text-ink">
              <span className="block">AI proposes.</span>
              <span className="mt-2 block">The user always decides.</span>
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="hx-window">
              <div className="hx-window-bar" aria-hidden="true">
                <span className="hx-window-dot" style={{ background: '#E5E1D8' }} />
                <span className="hx-window-dot" style={{ background: '#D9D4C9' }} />
                <span className="hx-window-dot" style={{ background: '#8FBF9F' }} />
              </div>
              <div className="flex flex-col gap-3 p-7">
                <Reveal delay={150}>
                  <div className="flex flex-col">
                    <ChatBubble who="DailyFit">How was your evening walk yesterday?</ChatBubble>
                  </div>
                </Reveal>
                <Reveal delay={420}>
                  <div className="flex flex-col">
                    <ChatBubble who="You" me>
                      My knee felt a little stiff.
                    </ChatBubble>
                  </div>
                </Reveal>
                <Reveal delay={700}>
                  <div className="flex flex-col">
                    <ChatBubble who="DailyFit">
                      Today, 15 minutes of light stretching, and this afternoon
                      there&rsquo;s a book club nearby. Shall we start there?
                    </ChatBubble>
                  </div>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── AGENT RUNTIME — orchestration pipeline ───────────── */}
      <section id="runtime" className="bg-bg pt-24 sm:pt-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <p className="hx-eyebrow eyebrow-mono text-sage">How our agent works</p>
            <h2 className="mt-6 text-[30px] font-extrabold leading-[1.18] tracking-[-0.035em] text-ink sm:text-[44px]">
              How an Agent designs the day
            </h2>
            <p className="mx-auto mt-6 max-w-6xl text-body text-ink-soft">
              It reads the intent inside a single sentence, recalls past memory, and designs the day by picking the best activities from an activity Database gathered through public and partner APIs.
            </p>
          </Reveal>
          <Reveal className="mt-14" delay={120}>
            <div className="hx-runtime-board mx-auto max-w-4xl">
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
            <div className="hx-flow-drop" aria-hidden="true" />
          </Reveal>
        </div>
      </section>

      {/* ─────────────── LIVE ACTIVITY TICKER ─────────────── */}
      <div className="hx-ticker border-y border-line bg-bg py-5" aria-label="Sample activities in the activity database">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-3 flex items-center justify-center gap-2.5">
            <span className="console-live-dot !bg-sage" aria-hidden="true" />
            <span className="eyebrow-mono text-ink-soft/70">activity database · live</span>
          </div>
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {[...TICKER, ...TICKER].map(([tag, name], i) => (
              <span className="chip" key={`${name}-${i}`} aria-hidden={i >= TICKER.length}>
                <span className="chip-tag">{tag}</span>
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ──────────────────── MEET THE AGENTS ──────────────────── */}
      <section id="agents" className="hx-agents border-b border-line py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="hx-eyebrow eyebrow-mono text-sage">Meet the agents</p>
            <h2 className="mt-6 text-[30px] font-extrabold leading-[1.18] tracking-[-0.035em] text-ink sm:text-[42px]">
              Three Agents that act on your behalf
            </h2>
            <p className="mt-6 text-body text-ink-soft">
              Discovery · Reminders · Auto-apply. Each Agent does the actual work, and the wider the scope, the higher-tier the Agent.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <AgentCard tier="Discovery" title="Discovery Agent" level={1} delay={0}>
              Learns your interests and finds activities beyond your neighborhood,
              <br />
              the ones you&rsquo;d never have discovered.
            </AgentCard>
            <AgentCard tier="Planning · Reminders" title="Reminder Agent" level={2} delay={120}>
              &ldquo;You need to sign up by 9 AM tomorrow.&rdquo;
              <br />
              It tracks the easy-to-miss deadlines and schedules for you.
            </AgentCard>
            <AgentCard tier="Auto-apply" title="Auto-apply Agent" level={3} delay={240}>
              Handles the tedious parts like sign-ups, forms, and registration on your behalf.
              <br />
              The Agent walks the complex steps; you just confirm the last one.
            </AgentCard>
          </div>
        </div>
      </section>

      {/* ────────── FINAL CTA — return to the runtime (bookend) ────────── */}
      <section className="px-3 py-20 sm:px-5 sm:py-24">
        <div className="hx-stage mx-auto max-w-[1400px] rounded-[24px] py-24 text-center sm:rounded-[32px] sm:py-32">
          <div className="hx-stage-grid" aria-hidden="true" />
          <div className="hx-aurora hx-aurora-a" aria-hidden="true" />
          <div className="hx-aurora hx-aurora-b" aria-hidden="true" />
          <div className="hx-grain" aria-hidden="true" />
          <svg
            viewBox="0 0 1200 600"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
            preserveAspectRatio="xMidYMid slice"
          >
            <circle cx="600" cy="300" r="260" fill="none" stroke="#8FBF9F" strokeWidth="1.5" className="ripple-ring" />
            <circle cx="600" cy="300" r="260" fill="none" stroke="#8FBF9F" strokeWidth="1.5" className="ripple-ring ripple-d1" />
            <circle cx="600" cy="300" r="260" fill="none" stroke="#8FBF9F" strokeWidth="1.5" className="ripple-ring ripple-d2" />
          </svg>
          <div className="relative mx-auto max-w-6xl px-5">
            <Reveal>
              <p className="eyebrow-mono text-sage-lt/80">Agent-as-a-Service</p>
              <h2 className="mx-auto mt-6 max-w-[20ch] text-[34px] font-extrabold leading-[1.16] tracking-[-0.035em] text-ivory sm:text-[46px]">
                Building the next AI for adults 55+.
              </h2>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/en/contact"
                  className="hx-glow-cta inline-flex min-h-[56px] items-center rounded-xl bg-sage px-8 text-[17px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
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
        </div>
      </section>
    </>
  );
}

/* ───────────────────────── partials ───────────────────────── */

function ChatBubble({
  who,
  me,
  children,
}: {
  who: string;
  me?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        me
          ? 'max-w-[84%] self-end rounded-2xl rounded-br-md bg-sage px-4 py-3 text-white'
          : 'max-w-[84%] self-start rounded-2xl rounded-bl-md bg-surface px-4 py-3 text-ink'
      }
    >
      <span className="block text-[11px] font-bold uppercase tracking-wider opacity-60">
        {who}
      </span>
      <span className="text-[15.5px] leading-relaxed">{children}</span>
    </div>
  );
}

function AgentCard({
  tier,
  title,
  level,
  delay,
  children,
}: {
  tier: string;
  title: string;
  level: 1 | 2 | 3;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div className={`hx-agent-card ${level === 3 ? 'hx-agent-crown' : ''}`}>
        <span className="hx-agent-num" aria-hidden="true">
          {String(level).padStart(2, '0')}
        </span>
        <span className="relative self-start rounded-md border border-sage/25 bg-sage/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-sage">
          {tier}
        </span>
        <h3 className="relative mt-5 text-[22px] font-bold text-ink">{title}</h3>
        <p className="relative mt-3 flex-1 text-[14px] leading-relaxed text-ink-soft">
          {children}
        </p>
        <div
          className="relative mt-6 flex items-center gap-2 border-t border-line pt-5"
          aria-label={`Autonomy level ${level} of 3`}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft/60">
            autonomy
          </span>
          <span className="ml-auto flex gap-1.5" aria-hidden="true">
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={`h-2 w-8 rounded-full ${
                  n <= level
                    ? 'agent-bar bg-sage shadow-[0_0_10px_rgba(74,124,89,0.45)]'
                    : 'bg-line'
                }`}
                style={n <= level ? { transitionDelay: `${300 + n * 140}ms` } : undefined}
              />
            ))}
          </span>
        </div>
      </div>
    </Reveal>
  );
}
