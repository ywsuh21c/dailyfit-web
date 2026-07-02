import type { Metadata } from 'next';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { activeCatalogCount, site } from '@/lib/site';
import { CountUp } from '@/components/motion/CountUp';
import { OrbitRings } from '@/components/motion/OrbitRings';

export const metadata: Metadata = {
  title: 'Investors (EN)',
  description:
    "An AI daily-life design platform for South Korea's active seniors (55–70).",
  robots: { index: false, follow: true },
};

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

export default function InvestorsEnPage() {
  return (
    <>
      <Section tone="dark" className="pt-24">
        <p className="text-base font-semibold text-ivory/70">DailyFit · Investors</p>
        <h1 className="mt-3 max-w-3xl text-h1">
          Asia&apos;s fastest-growing digital-native cohort is already online.
        </h1>
        <p className="mt-6 max-w-prose text-body text-ivory/85">
          South Korea&apos;s 15M-strong active seniors (55–70) already run their
          days on KakaoTalk. DailyFit layers an AI Agent on top, designing a
          healthier, more engaged daily life, one conversation at a time.
        </p>
        <div className="mt-8">
          <ButtonLink href="#contact" variant="primary" size="lg">
            Talk to the founder →
          </ButtonLink>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <StatCard suffix="M" label="Korean active seniors (55–70)">
            <CountUp to={15} duration={1100} />
          </StatCard>
          <StatCard suffix="" label="live activities in the database">
            <CountUp to={activeCatalogCount} />
          </StatCard>
          <StatCard suffix="" label="Agent autonomy tiers">
            <CountUp to={3} duration={900} />
          </StatCard>
        </div>
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="Why now"
          title="A market at an inflection point"
          lead="Active seniors are no longer subjects of care. They are the authors of their own days. The structural shift in demographics, digital fluency, and demand is happening now."
        />
        <div className="mt-12">
          <OrbitRings
            aria="Market expansion: from the 15M Korean beachhead to East Asia and the global senior market"
            coreTop="Korea · 15M"
            coreBottom="beachhead"
            mid="East Asia"
            outer="global senior market"
          />
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader
          eyebrow="Who's building it"
          title="The team"
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-bg p-6">
            <p className="text-h3 font-semibold text-ink">Youngwoo Suh</p>
            <p className="mt-1 text-base text-sage">Co-founder · CEO</p>
            <p className="mt-3 text-body text-ink-soft">
              Boston University → Bain → PYLER (Corporate Development
              Lead) → DailyFit.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-bg p-6">
            <p className="text-h3 font-semibold text-ink">Hyunjin Kim</p>
            <p className="mt-1 text-base text-sage">Co-founder</p>
            <p className="mt-3 text-body text-ink-soft">
              Product & engineering partner.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="dark" id="contact">
        <SectionHeader
          invert
          eyebrow="Get in touch"
          title="Let's talk"
          lead="Reach the founder directly. The fastest, most accurate conversation."
        />
        <div className="mt-8">
          <ButtonLink
            href={`mailto:${site.contactEmail}`}
            variant="primary"
            size="lg"
            external
          >
            Email the founder
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
