import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import { Section, SectionHeader } from '@/components/ui/Section';
import { AgentConsole } from '@/components/home/AgentConsole';
import { FlowLine } from '@/components/motion/FlowLine';
import { OrbitRings } from '@/components/motion/OrbitRings';
import { OrgTree } from '@/components/motion/OrgTree';

// Company-site Technology page (EN) — English mirror of the Korean
// app/(marketing)/technology/page.tsx. VC/press audience, 3rd-person voice.
// Market framing is global (Korean is the beachhead, not the ceiling).
// No em-dash (—) in visible copy — use periods / colons / middots.
// Keep in sync with the Korean source.

export const metadata: Metadata = pageSeo({
  path: '/en/technology',
  title: 'Technology',
  description:
    'An AI Agent that accumulates the daily life of the 55+ generation in that generation’s own voice. The technical problems DailyFit solves and the system architecture behind them.',
});

export default function EnTechnologyPage() {
  return (
    <>
      {/* 1. The technical problem */}
      <Section tone="light" className="pt-24">
        <p className="text-base font-semibold text-sage">About our technology</p>
        <h1 className="mt-3 max-w-3xl text-h1">
          The daily life of adults 55+ only becomes meaningful when it accumulates in their own voice.
        </h1>
        <div className="mt-6 max-w-prose space-y-4 text-body text-ink-soft">
          <p>
            General-purpose LLMs struggle to read how this generation expresses their day.
            <br />
            The slow speech, the dialect, the context carried over from yesterday.
            <br />
            We accumulate, every day, the way they actually speak and the everyday context they live in.
          </p>
          <ul className="space-y-2">
            <li>· Everyday context: &ldquo;My knee hurt yesterday&rdquo; changes today’s suggestion.</li>
            <li>· A generation’s way of speaking: not a translation, but understanding the words it actually uses.</li>
            <li>· Data that accumulates: the more it is used, the more of this generation’s expression patterns build into an asset.</li>
          </ul>
          <p className="text-ink-soft/80">
            We start with Korean speakers aged 55+.
            <br />
            The same structure extends to the languages and generations of global markets.
          </p>
        </div>
      </Section>

      {/* 2. How the agent works — real chat demo + the go/no-go principle */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="How it works"
          title="One ordinary conversation is all it takes"
          lead="Start a relaxed conversation in the app, and you get suggestions tailored to your day, delivered as cards."
        />
        <div className="mx-auto mt-8 max-w-2xl">
          <AgentConsole lang="en" />
        </div>
        {/* Why the human holds go/no-go — the Overview repeats the one-liner;
            here we state the reasoning behind it. */}
        <div className="mx-auto mt-12 max-w-prose rounded-2xl border border-line border-l-[3px] border-l-sage bg-white p-8">
          <p className="text-h3 font-semibold text-ink">
            The final call always belongs to the user.
          </p>
          <p className="mt-4 text-body text-ink-soft">
            The deeper an Agent gets involved, as it does when applying on someone’s behalf, the more directly the outcome touches the user’s actual day. That is why, even in areas we could technically automate, we designed the go/no-go call right before execution to always stay with the user.
          </p>
        </div>
      </Section>

      {/* 3. Data & privacy */}
      <Section tone="light">
        <SectionHeader eyebrow="Data · Privacy" title="The data belongs to the user" />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <PrincipleCard
            title="Least privilege"
            body={
              <>
                Only the information we need,
                <br />
                only at the moment we need it.
              </>
            }
          />
          <PrincipleCard
            title="Explicit consent"
            body={
              <>
                We tell you first what we use,
                <br />
                and act only within the scope you allow.
              </>
            }
          />
          <PrincipleCard
            title="Privacy-law compliance"
            body="Stored and encrypted safely, to the standard of the Personal Information Protection Act (PIPA)."
          />
        </div>
      </Section>

      {/* 3b. Security architecture — assurance without disclosure.
          Copy stays at principles altitude on purpose: naming concrete
          tools/vendors would hand attackers a map. Every claim below is true
          of the live system. */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="Security architecture"
          title="Personal data sits under several layers of defense"
          lead={
            <>
              We handle the details of our security architecture with care.
              <br />
              What we share openly are the principles we hold ourselves to.
            </>
          }
        />
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <DefenseLayers />
          <div className="grid gap-4 sm:grid-cols-2">
            <SecurityCard title="Least-privilege principle">
              Every system account holds only the minimum permissions it needs. Data access is separated by role.
            </SecurityCard>
            <SecurityCard title="End-to-end encryption">
              Personal data is encrypted both in transit and at rest.
            </SecurityCard>
            <SecurityCard title="Sensitive-data isolation">
              Sensitive data is handled only inside a separated boundary, and the surface exposed to the outside is minimized.
            </SecurityCard>
            <SecurityCard title="Always-on audit and response">
              Sensitive operations are logged and reviewed. We assume attack and place defenses first.
            </SecurityCard>
          </div>
        </div>
        <p className="mt-8 max-w-prose text-body text-ink-soft/80">
          All of these safeguards operate on top of the Personal Information Protection Act (PIPA) standard.
        </p>
      </Section>

      {/* 4. System architecture — real layer stack */}
      <Section tone="light">
        <SectionHeader
          eyebrow="System architecture"
          title="From a single spoken sentence to a day’s plan"
          lead="A user’s words pass through four layers and turn into a designed day. Every one of them runs in the live service, every day."
        />
        <div className="mt-8 flex flex-col">
          <LayerRow tag="Layer 1 · User Channel">
            Real-time speech-to-text (STT) · text · Kakao login
          </LayerRow>
          <FlowLine vertical />
          <LayerRow tag="Layer 2 · Agents">
            Discovery · reminder · application-relay Agent orchestration
          </LayerRow>
          <FlowLine vertical />
          <LayerRow tag="Layer 3 · Data">
            Profile · per-user memory · search and matching
          </LayerRow>
          <FlowLine vertical />
          <LayerRow tag="Layer 4 · External">
            Activity database (public OpenAPI · scrapers · self-supplied)
          </LayerRow>
        </div>
      </Section>

      {/* 5. Defensibility — data moat */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="Defensibility"
          title="DailyFit's Moat"
          lead="The more it is used, the more deeply it understands each user. That depth of understanding is our moat."
        />
        <div className="mt-10">
          <OrbitRings
            aria="Data moat: per-user daily-life data at the center, with voice data and personalization layers stacked around it"
            coreTop="per-user daily-life data"
            coreBottom="accumulates every day"
            mid="proprietary voice layer"
            outer="Data Flywheel"
          />
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <MoatItem title="Raw Conversation Insight">
            The raw, unfiltered &lsquo;everyday conversation&rsquo; of adults 55+.
            <br />
            Our biggest moat.
          </MoatItem>
          <MoatItem title="Increasing Personalization">
            Tastes, history, and movement patterns build up per user.
            <br />
            The more it is used, the better the fit, and a general-purpose model cannot replicate this layer.
          </MoatItem>
          <MoatItem title="Data Flywheel">
            The more data accumulates, the smarter the Agent gets, and the more it is used, the more data accumulates. The gap widens over time.
          </MoatItem>
        </div>
      </Section>

      {/* 6. Hive meta narrative — the company itself, drawn */}
      <Section tone="light">
        <SectionHeader
          eyebrow="Radically Transparent"
          title="The company itself is an AI Agent team"
          lead={
            <>
              In the product, AI Agents help design a member’s day,
              <br />
              and in operations, an AI Agent team helps run the company.
            </>
          }
        />
        <p className="mt-6 max-w-prose text-body text-ink-soft">
          Strategy · Finance · Product · Technology.
          <br />An AI Agent team documents each Division in ADRs and operates it together.
        </p>
        <div className="mt-12">
          <OrgTree lang="en" />
        </div>
      </Section>
    </>
  );
}

function LayerRow({ tag, children }: { tag: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-line bg-white px-6 py-4 sm:flex-row sm:items-center sm:gap-6">
      <span className="text-base font-bold text-sage sm:min-w-[220px]">{tag}</span>
      <span className="text-body text-ink-soft">{children}</span>
    </div>
  );
}

function PrincipleCard({ title, body }: { title: string; body: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-6">
      <p className="text-h3 font-semibold text-ink">{title}</p>
      <p className="mt-2 text-body text-ink-soft">{body}</p>
    </div>
  );
}

function SecurityCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-white p-6">
      <p className="text-[17px] font-bold text-ink">{title}</p>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{children}</p>
    </div>
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
      <svg viewBox="0 0 420 340" role="img" aria-label="Layered defense: a personal-data core sitting inside network, application, and encryption boundaries" className="h-auto w-full">
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
        {/* the PII core */}
        <g>
          <rect x={128} y={148} width={164} height={64} rx={12} fill="#1E2D40" />
          <text x={210} y={175} textAnchor="middle" className="fill-ivory" style={{ fontWeight: 700, fontSize: 13.5 }}>
            Personal-data core
          </text>
          <text x={210} y={196} textAnchor="middle" className="fill-sage-lt" style={{ fontWeight: 600, fontSize: 10, letterSpacing: '0.06em' }}>
            ISOLATED · ENCRYPTED
          </text>
        </g>
      </svg>
    </div>
  );
}

function MoatItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line border-t-[3px] border-t-sage bg-white p-6">
      <p className="text-h3 font-semibold text-ink">{title}</p>
      <p className="mt-2 text-body text-ink-soft">{children}</p>
    </div>
  );
}
