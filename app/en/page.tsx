import type { Metadata } from 'next';
import { externalLinkProps, productAppUrl, site } from '@/lib/site';
import { AgentConsole } from '@/components/home/AgentConsole';
import { Reveal } from '@/components/motion/Reveal';

// English landing (/en). Mirror of the frozen Korean root ("/"), translated.
// The Korean root is ALWAYS the default; this page is reached only by the
// explicit language toggle. No locale-based redirect anywhere.

export const metadata: Metadata = {
  title: 'DailyFit · AI Agents for active seniors',
  description:
    'We build AI agents for the active senior generation. One conversation designs the day: discovery, reminders, and auto-apply.',
};

const mailto = `mailto:${site.contactEmail}`;

// Static, English-labeled sample of real catalog activities (the live database
// is Korean-first; this page renders representative examples in English).
const TICKER: Array<[string, string]> = [
  ['In-house', 'Senior Running Club'],
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

export default function EnHomePage() {
  return (
    <>
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="hero-field relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="aurora aurora-1" aria-hidden="true" />
        <div className="aurora aurora-2" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-28 pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-40 lg:pt-36">
          <div>
            <p className="eyebrow-mono text-sage">Agent-as-a-Service</p>
            <h1 className="mt-6 text-[42px] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink sm:text-[60px]">
              <span className="text-sage">AI Agents</span>
              <br />
              for active seniors.
            </h1>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={mailto}
                className="inline-flex min-h-[56px] items-center rounded-xl bg-sage px-8 text-[17px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
              >
                Talk to us
              </a>
              <a
                href="#runtime"
                className="inline-flex min-h-[56px] items-center rounded-xl border border-ink/15 bg-white/50 px-8 text-[17px] font-bold text-ink transition-colors hover:border-sage hover:text-sage active:scale-[0.98]"
              >
                See how it works ↓
              </a>
            </div>
          </div>
          <p className="max-w-[38ch] text-[19px] leading-relaxed text-ink-soft sm:text-[22px]">
            Smartphone-native and growing faster than any generation before.
            Active seniors are learning, meeting, and exploring. We design their
            day.
          </p>
        </div>
      </section>

      {/* ─────────────────────── PROBLEM ─────────────────────── */}
      <section className="bg-bg py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Reveal>
            <p className="eyebrow-mono text-sage">The problem</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[46px]">
              The time and curiosity are there.
              <br />
              Finding what to do isn&rsquo;t.
            </h2>
            <p className="mx-auto mt-6 max-w-[52ch] text-body text-ink-soft">
              Classes, people to meet, places to go. The information is
              scattered across dozens of agencies and portals. Hard to find, and
              harder to sign up for.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────── WHAT WE BUILD (solution) ─────────────── */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow-mono text-sage">Solution: What we built</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[42px]">
              One conversation
              <br />
              designs the day.
            </h2>
            <p className="mt-6 max-w-[46ch] text-body text-ink-soft">
              A multi-agent platform for hobbies and daily life.
              <br />
              Just talk as you normally would, and the agents collaborate to
              compose your day.
            </p>
            <p className="mt-4 text-body font-semibold text-ink">
              AI proposes. You always decide.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-line bg-white p-7 shadow-[0_30px_70px_-40px_rgba(30,45,64,0.35)]">
              <div className="flex flex-col gap-3">
                <ChatBubble who="DailyFit">How was your evening walk?</ChatBubble>
                <ChatBubble who="You" me>
                  My knee was a little stiff.
                </ChatBubble>
                <ChatBubble who="DailyFit">
                  Then a light 15-minute stretch this morning, and a book club
                  nearby this afternoon. Shall we start there?
                </ChatBubble>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── AGENT RUNTIME — infographic section ───────────── */}
      <section id="runtime" className="bg-bg py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal className="text-center">
            <p className="eyebrow-mono text-sage">How our agent works</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[44px]">
              How an Agent designs your day
            </h2>
            <p className="mx-auto mt-5 max-w-4xl text-body text-ink-soft">
              It reads your words as intent, recalls what it knows, and picks from
              an activity database built on public and partner APIs, to complete
              your day.
            </p>
          </Reveal>
          <Reveal className="mx-auto mt-12 max-w-2xl" delay={120}>
            <AgentConsole lang="en" />
          </Reveal>
        </div>
      </section>

      {/* ─────────────── LIVE ACTIVITY TICKER ─────────────── */}
      <div className="border-y border-line bg-bg py-5" aria-label="Examples from the activity database">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="console-live-dot !bg-sage" aria-hidden="true" />
            <span className="eyebrow-mono text-ink-soft/70">Activity database · live</span>
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
      <section id="agents" className="border-y border-line bg-ivory py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow-mono text-sage">Meet the agents</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[42px]">
              Three Agents that design your day
            </h2>
            <p className="mt-5 text-body text-ink-soft">
              Discovery · reminders · auto-apply. The wider the scope, the
              higher-tier the Agent.
              <br />
              The launch app ships with the top-tier Agent built in.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <AgentCard tier="Discovery" title="Discovery Agent" level={1} delay={0}>
              Learns your interests and finds activities beyond your neighborhood,
              the ones you&rsquo;d never have found.
            </AgentCard>
            <AgentCard tier="Planning · Reminders" title="Reminder Agent" level={2} delay={120}>
              &ldquo;You need to sign up by 9am tomorrow&rdquo;
              <br />
              It tracks the easy-to-miss deadlines and schedules for you.
            </AgentCard>
            <AgentCard tier="Auto-apply" title="Auto-apply Agent" level={3} delay={240}>
              Handles the tedious parts: sign-ups, forms, registration. The Agent
              walks the steps; you just confirm the last one.
            </AgentCard>
          </div>
        </div>
      </section>

      {/* ─────────────────────── FINAL CTA ─────────────────────── */}
      <section className="bg-gradient-to-b from-sage to-sage-dk py-28 text-center text-white sm:py-36">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="eyebrow-mono text-white/70">Agent-as-a-Service</p>
            <h2 className="mx-auto mt-5 max-w-[20ch] text-[36px] font-extrabold leading-[1.18] tracking-[-0.03em] sm:text-[46px]">
              Building the next AI for active seniors.
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={mailto}
                className="inline-flex min-h-[56px] items-center rounded-xl bg-white px-8 text-[17px] font-bold text-sage-dk transition-colors hover:bg-ivory active:scale-[0.98]"
              >
                Talk to us
              </a>
              <a
                href={productAppUrl}
                {...externalLinkProps}
                className="inline-flex min-h-[56px] items-center rounded-xl border border-white/40 px-8 text-[17px] font-bold text-white transition-colors hover:border-white hover:bg-white/10 active:scale-[0.98]"
              >
                Start DailyFit →
              </a>
            </div>
          </Reveal>
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
      <div className="agent-card flex h-full flex-col p-8">
        <span className="self-start rounded-md border border-sage/25 bg-sage/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-sage">
          {tier}
        </span>
        <h3 className="mt-5 text-[22px] font-bold text-ink">{title}</h3>
        <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-ink-soft">{children}</p>
        <div
          className="mt-6 flex items-center gap-2 border-t border-line pt-5"
          aria-label={`autonomy level ${level} of 3`}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft/60">
            autonomy
          </span>
          <span className="ml-auto flex gap-1.5" aria-hidden="true">
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={`h-1.5 w-7 rounded-full ${n <= level ? 'bg-sage' : 'bg-line'}`}
              />
            ))}
          </span>
        </div>
      </div>
    </Reveal>
  );
}
