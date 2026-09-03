import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import { getCatalogCount } from '@/lib/catalog-count';
import { AgentConsole } from '@/components/home/AgentConsole';
import { OrbitRings } from '@/components/motion/OrbitRings';
import { OrgTree } from '@/components/motion/OrgTree';
import { Reveal } from '@/components/motion/Reveal';
import { Spread, SpreadTitle } from '@/components/ui/Editorial';

// Technology (/en/technology) — English mirror of app/(marketing)/technology.
// VC/press audience, 3rd-person voice. Market framing is global (Korea is the
// beachhead, not the ceiling). No em-dash in visible copy: periods / colons /
// middots. Structure and copy stay in sync with the Korean source.

export const metadata: Metadata = pageSeo({
  path: '/en/technology',
  title: 'Technology',
  description:
    'An AI Agent that accumulates the daily life of the 55+ generation in that generation’s own voice. The technical problems DailyFit solves and the system architecture behind them.',
});

const LAYERS = [
  { tag: 'Layer 1', name: 'User Channel', body: 'Real-time speech-to-text (STT) · text · Kakao login' },
  { tag: 'Layer 2', name: 'Agents', body: 'Discovery · reminder · application-relay Agent orchestration' },
  { tag: 'Layer 3', name: 'Data', body: 'Profile · per-user memory · search and matching' },
  { tag: 'Layer 4', name: 'External', body: 'Activity database (public OpenAPI · scrapers · self-supplied)' },
];

const SECURITY = [
  {
    title: 'Least-privilege principle',
    body: 'Every system account holds only the minimum permissions it needs. Data access is separated by role.',
  },
  { title: 'End-to-end encryption', body: 'Personal data is encrypted both in transit and at rest.' },
  {
    title: 'Sensitive-data isolation',
    body: 'Sensitive data is handled only inside a separated boundary, and the surface exposed to the outside is minimized.',
  },
  {
    title: 'Always-on audit and response',
    body: 'Sensitive operations are logged and reviewed. We assume attack and place defenses first.',
  },
];

// 콘솔 안의 활동 수도 라이브 카운트에서 온다 — 홈·investors 와 같은 창(6h).
export const revalidate = 21600;

export default async function EnTechnologyPage() {
  const { count: catalogCount } = await getCatalogCount();

  return (
    <>
      <section className="ed-hero">
        <div className="ed-hero-grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-wrap px-5 pb-16 pt-16 sm:px-8 lg:pb-20 lg:pt-24">
          <p className="text-eyebrow uppercase text-sage">About our technology</p>
          <h1 className="mt-6 max-w-[22ch] text-display-sm text-ink sm:text-[48px] sm:leading-[1.1] lg:text-[56px]">
            The daily life of adults 55+ only becomes meaningful when it accumulates in their own
            voice.
          </h1>
          <div className="mt-8 grid max-w-[62rem] gap-8 lg:grid-cols-2">
            <p className="text-body text-ink-soft">
              General-purpose LLMs struggle to read how this generation expresses their day. The slow
              speech, the dialect, the context carried over from yesterday. We accumulate, every day,
              the way they actually speak and the everyday context they live in.
              <br />
              <br />
              We start with Korean speakers aged 55+. The same structure extends to the languages and
              generations of global markets.
            </p>
            <ul className="flex flex-col divide-y divide-hair border-y border-hair">
              <li className="py-4 text-[17px] leading-[1.7] text-ink">
                <strong className="font-bold">Everyday context</strong> · &ldquo;My knee hurt
                yesterday&rdquo; changes today&rsquo;s suggestion.
              </li>
              <li className="py-4 text-[17px] leading-[1.7] text-ink">
                <strong className="font-bold">A generation&rsquo;s way of speaking</strong> · not a
                translation, but understanding the words it actually uses.
              </li>
              <li className="py-4 text-[17px] leading-[1.7] text-ink">
                <strong className="font-bold">Data that accumulates</strong> · the more it is used,
                the more of this generation&rsquo;s expression patterns build into an asset.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-hair bg-bg py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="01" label="How it works">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
              <Reveal>
                <SpreadTitle>One ordinary conversation is all it takes</SpreadTitle>
                <p className="mt-7 text-body text-ink-soft">
                  Start a relaxed conversation in the app, and you get suggestions tailored to your
                  day, delivered as cards.
                </p>
                <div className="mt-9 border-l-[3px] border-sage pl-6">
                  <p className="text-[21px] font-semibold leading-[1.5] text-ink">
                    The final call always belongs to the user.
                  </p>
                  <p className="mt-4 text-body text-ink-soft">
                    The deeper an Agent gets involved, as it does when applying on someone&rsquo;s
                    behalf, the more directly the outcome touches the user&rsquo;s actual day. That is
                    why, even in areas we could technically automate, we designed the go/no-go call
                    right before execution to always stay with the user.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <AgentConsole lang="en" catalogCount={catalogCount} />
              </Reveal>
            </div>
          </Spread>
        </div>
      </section>

      <section className="ed-paper border-t border-hair py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="02" label="System architecture">
            <Reveal>
              <SpreadTitle>From a single spoken sentence to a day&rsquo;s plan</SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                A user&rsquo;s words pass through four layers and turn into a designed day. Every one
                of them runs in the live service, every day.
              </p>
            </Reveal>
            <ol className="mt-10 flex flex-col divide-y divide-hair border-y border-hair">
              {LAYERS.map((l, i) => (
                <Reveal key={l.tag} delay={i * 80}>
                  <li className="grid gap-1 py-6 sm:grid-cols-[110px_200px_minmax(0,1fr)] sm:items-baseline sm:gap-6">
                    <span className="num text-eyebrow text-sage">{l.tag}</span>
                    <span className="text-[19px] font-bold text-ink">{l.name}</span>
                    <span className="text-[16.5px] leading-[1.7] text-ink-soft">{l.body}</span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </Spread>
        </div>
      </section>

      <section className="border-t border-hair bg-bg py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="03" label="Data · Privacy">
            <Reveal>
              <SpreadTitle>The data belongs to the user</SpreadTitle>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <PrincipleCard
                title="Least privilege"
                body="Only the information we need, only at the moment we need it."
                delay={0}
              />
              <PrincipleCard
                title="Explicit consent"
                body="We tell you first what we use, and act only within the scope you allow."
                delay={80}
              />
              <PrincipleCard
                title="Privacy-law compliance"
                body="Stored and encrypted safely, to the standard of the Personal Information Protection Act (PIPA)."
                delay={160}
              />
            </div>
          </Spread>
        </div>
      </section>

      <section className="ed-paper border-t border-hair py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="04" label="Security architecture">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center lg:gap-14">
              <div>
                <Reveal>
                  <SpreadTitle>Personal data sits under several layers of defense</SpreadTitle>
                  <p className="mt-7 max-w-[36rem] text-body text-ink-soft">
                    We handle the details of our security architecture with care. What we share
                    openly are the principles we hold ourselves to.
                  </p>
                </Reveal>
                <div className="mt-9 grid gap-3.5 sm:grid-cols-2">
                  {SECURITY.map((s, i) => (
                    <Reveal key={s.title} delay={i * 70}>
                      <div className="ed-card h-full p-6">
                        <p className="text-[17px] font-bold text-ink">{s.title}</p>
                        <p className="mt-2 text-[15px] leading-[1.7] text-ink-soft">{s.body}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
                <p className="mt-8 max-w-[36rem] text-[16px] text-ink-soft">
                  All of these safeguards operate on top of the Personal Information Protection Act
                  (PIPA) standard.
                </p>
              </div>
              <Reveal delay={120}>
                <DefenseLayers />
              </Reveal>
            </div>
          </Spread>
        </div>
      </section>

      <section className="border-t border-hair bg-bg py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="05" label="Defensibility">
            <Reveal>
              <SpreadTitle>DailyFit&rsquo;s Moat</SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                The more it is used, the more deeply it understands each user. That depth of
                understanding is our moat.
              </p>
            </Reveal>
            <Reveal className="mt-12">
              <OrbitRings
                aria="Data moat: per-user daily-life data at the center, with voice data and personalization layers stacked around it"
                coreTop="per-user daily-life data"
                coreBottom="accumulates every day"
                mid="proprietary voice layer"
                outer="Data Flywheel"
              />
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <MoatItem title="Raw Conversation Insight" delay={0}>
                The raw, unfiltered &lsquo;everyday conversation&rsquo; of adults 55+. Our biggest
                moat.
              </MoatItem>
              <MoatItem title="Increasing Personalization" delay={80}>
                Tastes, history, and movement patterns build up per user. The more it is used, the
                better the fit, and a general-purpose model cannot replicate this layer.
              </MoatItem>
              <MoatItem title="Data Flywheel" delay={160}>
                The more data accumulates, the smarter the Agent gets, and the more it is used, the
                more data accumulates. The gap widens over time.
              </MoatItem>
            </div>
          </Spread>
        </div>
      </section>

      <section className="ed-paper border-t border-hair py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="06" label="Radically Transparent">
            <Reveal>
              <SpreadTitle>The company itself is an AI Agent team</SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                In the product, AI Agents help design a member&rsquo;s day, and in operations, an AI
                Agent team helps run the company. Strategy · Finance · Product · Technology. An AI
                Agent team documents each Division in ADRs and operates it together.
              </p>
            </Reveal>
            <div className="mt-12">
              <OrgTree lang="en" />
            </div>
          </Spread>
        </div>
      </section>
    </>
  );
}

function PrincipleCard({ title, body, delay }: { title: string; body: string; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="ed-card h-full p-7">
        <p className="text-[20px] font-bold text-ink">{title}</p>
        <p className="mt-3 text-[16px] leading-[1.7] text-ink-soft">{body}</p>
      </div>
    </Reveal>
  );
}

function MoatItem({
  title,
  delay,
  children,
}: {
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div className="ed-card h-full border-t-[3px] border-t-sage p-7">
        <p className="text-[19px] font-bold text-ink">{title}</p>
        <p className="mt-3 text-[16px] leading-[1.7] text-ink-soft">{children}</p>
      </div>
    </Reveal>
  );
}

/**
 * Defense-in-depth, drawn: nested boundaries around the PII core. Labels are
 * deliberately generic layers, not our real topology.
 */
function DefenseLayers() {
  const layers = ['Network · access control', 'Application boundary', 'Data encryption'];
  return (
    <div className="mx-auto w-full max-w-[420px]">
      <svg
        viewBox="0 0 420 340"
        role="img"
        aria-label="Layered defense: a personal-data core sitting inside network, application, and encryption boundaries"
        className="h-auto w-full"
      >
        {layers.map((label, i) => {
          const inset = i * 44;
          return (
            <g key={label}>
              <rect
                x={16 + inset}
                y={16 + inset}
                width={388 - inset * 2}
                height={308 - inset * 2}
                rx={20 - i * 4}
                fill="#4A7C59"
                fillOpacity={0.04 + i * 0.03}
                stroke="#4A7C59"
                strokeOpacity={0.35}
                strokeWidth="1.5"
                strokeDasharray={i === 0 ? '6 8' : undefined}
              />
              <text
                x={32 + inset}
                y={40 + inset}
                className="fill-sage"
                style={{ fontWeight: 600, fontSize: 11.5, letterSpacing: '0.1em' }}
              >
                {label}
              </text>
            </g>
          );
        })}
        <g>
          <rect x={128} y={148} width={164} height={64} rx={12} fill="#1E2D40" />
          <text
            x={210}
            y={175}
            textAnchor="middle"
            className="fill-ivory"
            style={{ fontWeight: 700, fontSize: 13.5 }}
          >
            Personal-data core
          </text>
          <text
            x={210}
            y={196}
            textAnchor="middle"
            className="fill-sage-lt"
            style={{ fontWeight: 600, fontSize: 10, letterSpacing: '0.06em' }}
          >
            ISOLATED · ENCRYPTED
          </text>
        </g>
      </svg>
    </div>
  );
}
