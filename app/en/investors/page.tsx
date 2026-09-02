import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { activeCatalogCount } from '@/lib/site';
import { CountUp } from '@/components/motion/CountUp';
import { OrbitRings } from '@/components/motion/OrbitRings';

export const metadata: Metadata = pageSeo({
  path: '/en/investors',
  title: 'Investors',
  description:
    "An AI daily-life design platform for South Koreans aged 55–70.",
  noindex: true,
});

// English mirror of /investors. Copy is reframed for a global context, not a
// literal translation (IR scope §7). HARD RULE: no "we are raising" language.

function StatCard({
  suffix,
  label,
  children,
}: {
  suffix: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-ivory/15 bg-white/5 p-6 text-center">
      <p className="text-[34px] font-extrabold tracking-tight text-sage-lt">
        {children}
        <span className="ml-1 text-[20px] font-bold text-ivory">{suffix}</span>
      </p>
      <p className="mt-1 text-[13.5px] font-semibold text-ivory/70">{label}</p>
    </div>
  );
}

function EvidenceCard({
  stat,
  claim,
  source,
}: {
  stat: string;
  claim: string;
  source: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-line bg-surface p-6">
      <p className="text-[26px] font-extrabold tracking-tight text-sage">{stat}</p>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">{claim}</p>
      <p className="mt-4 text-[12px] text-ink-soft/70">{source}</p>
    </div>
  );
}

function ModelCard({
  tag,
  title,
  children,
}: {
  tag: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line bg-bg p-6">
      <span className="eyebrow-mono text-sage">{tag}</span>
      <p className="mt-3 text-h3 font-semibold text-ink">{title}</p>
      <p className="mt-2 text-body text-ink-soft">{children}</p>
    </div>
  );
}

export default function InvestorsEnPage() {
  return (
    <>
      <Section tone="dark" className="pt-24">
        <p className="text-base font-semibold text-ivory/70">DailyFit · Investors</p>
        <h1 className="mt-3 max-w-3xl text-h1">
          Korea&apos;s fastest-growing cohort already runs its day online.
        </h1>
        <p className="mt-6 max-w-prose text-body text-ivory/85">
          South Korea&apos;s 13M people aged 55–70 already run their
          days on KakaoTalk. DailyFit layers an AI Agent on top, designing a
          longer, healthier daily life full of fun and meaning, one
          conversation at a time.
        </p>
        <div className="mt-8">
          <ButtonLink href="#contact" variant="primary" size="lg">
            Talk to the founder →
          </ButtonLink>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <StatCard suffix="M" label="Koreans aged 55–70">
            <CountUp to={13} duration={1100} />
          </StatCard>
          <StatCard suffix="" label="programs & activities in our live DB">
            <CountUp to={activeCatalogCount} />
          </StatCard>
          <StatCard suffix="" label="Agent autonomy tiers">
            <CountUp to={3} duration={900} />
          </StatCard>
        </div>
        <p className="mt-3 text-[12.5px] text-ivory/60">
          Population source: MOIS Resident Registration statistics, June 2026
          (ages 55–70: 13,014,756)
        </p>
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="Why now"
          title="A market at an inflection point"
          lead={
            <>
              They are no longer subjects of care; they are the authors
              of their own days. Three forces cross at once.
              <br />
              <br />
              <strong className="text-ink">Digital fluency</strong>
              <br />
              <strong className="text-ink">Demographic shift</strong>
              <br />
              <strong className="text-ink">Demand to design their own day</strong>
            </>
          }
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <EvidenceCard
            stat="96.5% vs 65.6%"
            claim="Digital access in this generation is already near-universal. The 30-point capability gap is the Agent's opportunity."
            source="MSIT · NIA Digital Divide Survey 2024"
          />
          <EvidenceCard
            stat="10.51M"
            claim="Koreans aged 65+, 20.3% of the population, projected to reach 30.9% by 2036."
            source="Statistics Korea, 2025 older-population statistics · projections"
          />
          <EvidenceCard
            stat="88.2%"
            claim="Most Koreans 65+ never built leisure habits earlier in life. Not a lack of desire, a lack of an on-ramp."
            source="Seoul 50 Plus Foundation, 50+ Report"
          />
        </div>
        <div className="mt-12">
          <OrbitRings
            aria="Market expansion: from Korea's 13M first market to East Asia and the global 55+ market"
            coreTop="Korea · 13M"
            coreBottom="first market"
            mid="East Asia"
            outer="global 55+ market"
          />
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader
          eyebrow="The evidence"
          title="Demand, verified in interviews"
          lead="In-depth beta interviews validated demand qualitatively. The strongest signal: search is free, but wallets open for delegation."
        />
        <blockquote className="mt-8 max-w-prose border-l-[3px] border-sage pl-5 text-[19px] font-medium leading-relaxed text-ink">
          &ldquo;I won&apos;t pay for search, there are free substitutes.
          Delegation is the differentiator. If it really works, I&apos;d pay
          5,000 to 20,000 won per application. Once it hooks me, I
          couldn&apos;t leave, like YouTube.&rdquo;
        </blockquote>
        <p className="mt-3 text-[13.5px] text-ink-soft">
          Beta interview participant, male, 60s · June 2026, in person
        </p>
        <p className="mt-6 max-w-prose text-[13.5px] text-ink-soft/80">
          We are at the qualitative stage. Quantitative conversion metrics
          will be measured and shared with the paid launch.
        </p>
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="Business model"
          title="Search is free. We charge for delegation."
          lead="A credit model for Agent as a Service: pay only when delegation succeeds. It matches how this generation actually spends."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <ModelCard tag="Credit" title="Pay per successful action">
            Discovery and suggestions are free. Credits are deducted only when
            an application succeeds, priced by difficulty.
          </ModelCard>
          <ModelCard tag="Why not subscription" title="Why not a subscription">
            A prior subscription service for this generation&apos;s public numbers, 9,900
            won a month with roughly 10% paid conversion, suggest the ceiling.
            Performance-based pricing is built to clear it.
          </ModelCard>
          <ModelCard tag="Fun-driven" title="Fun-driven participation">
            Members earn points like a game, through sign-ups, streaks, and
            invitations, and spend them on delegation. Voluntary play builds
            the habit before payment.
          </ModelCard>
        </div>
        <p className="mt-4 text-[12.5px] text-ink-soft/70">
          Subscription benchmark figures are from public press coverage.
        </p>
      </Section>

      <Section tone="dark" id="contact">
        <SectionHeader
          invert
          eyebrow="Get in touch"
          title="Let's talk"
          lead="Reach the founder directly. The fastest, most accurate conversation."
        />
        <div className="mt-8">
          <ButtonLink href="/en/contact" variant="primary" size="lg">
            Talk to us →
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
