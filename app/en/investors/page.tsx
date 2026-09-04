import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import { ButtonLink } from '@/components/ui/Button';
import { getCatalogCount, formatAsOf } from '@/lib/catalog-count';
import { CountUp } from '@/components/motion/CountUp';
import { OrbitRings } from '@/components/motion/OrbitRings';
import { Reveal } from '@/components/motion/Reveal';
import { SpreadTitle } from '@/components/ui/Editorial';
import { SpreadSection } from '@/components/ui/SpreadSection';
import { StatFigure } from '@/components/ui/StatFigure';

export const metadata: Metadata = pageSeo({
  path: '/en/investors',
  title: 'Investors',
  description:
    'An AI daily-life design platform for adults 55–70. What we build, why now, and who is building it.',
  noindex: true,
});

// /en/investors — English mirror of app/(marketing)/investors.
// 🔴 HARD RULE [[feedback_no_fundraise_disclosure_on_web]]: no "we are raising"
// language anywhere — founder-direct contact only.
// Population canon = 13.0M (MOIS resident registration, June 2026). 15M was
// retired as unverified: never restore it.
// 2026-09-03: Editorial Daylight — numbered spreads; the catalog stat reads the
// LIVE count (was a bundled constant that quietly aged).

export const revalidate = 21600;

const EVIDENCE = [
  {
    stat: '96.5% vs 65.6%',
    claim: "Digital access in this generation is already near-universal. The 30-point capability gap is the Agent's opportunity.",
    source: 'MSIT · NIA Digital Divide Survey 2024',
  },
  {
    stat: '10.51M',
    claim: 'Koreans aged 65+, 20.3% of the population, projected to reach 30.9% by 2036.',
    source: 'Statistics Korea, 2025 older-population statistics · projections',
  },
  {
    stat: '88.2%',
    claim: 'Most Koreans 65+ never built leisure habits earlier in life. Not a lack of desire, a lack of an on-ramp.',
    source: 'Seoul 50 Plus Foundation, 50+ Report',
  },
];

const MODEL = [
  {
    tag: 'Credit',
    title: 'Pay per successful action',
    body: 'Discovery and suggestions are free. Credits are deducted only when an application succeeds, priced by difficulty.',
  },
  {
    tag: 'Why not subscription',
    title: 'Why not a subscription',
    body: 'The public numbers of an earlier subscription service aimed at the same generation, 9,900 won a month and roughly 10% paid conversion, suggest the ceiling. Performance-based pricing is built to clear it.',
  },
  {
    tag: 'Fun-driven',
    title: 'Fun-driven participation',
    body: 'Members earn points like a game, through sign-ups, streaks, and invitations, and spend them on delegation. Voluntary play builds the habit before payment.',
  },
];

export default async function InvestorsEnPage() {
  const { count: catalogCount, asOf } = await getCatalogCount();

  return (
    <>
      <section className="ed-hero">
        <div className="ed-hero-grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-wrap px-5 pb-16 pt-16 sm:px-8 lg:pb-20 lg:pt-24">
          <p className="text-eyebrow uppercase text-sage">DailyFit · Investors</p>
          <h1 className="mt-6 max-w-[20ch] text-display-sm text-ink sm:text-[48px] sm:leading-[1.1] lg:text-[56px]">
            Korea&apos;s fastest-growing cohort already runs its day online.
          </h1>
          <p className="mt-7 max-w-[44rem] text-[19px] leading-[1.7] text-ink-soft">
            South Korea&apos;s 13M people aged 55–70 already run their days on KakaoTalk. DailyFit
            layers an AI Agent on top, designing a longer, healthier daily life full of fun and
            meaning, one conversation at a time.
          </p>
          <div className="mt-9">
            <ButtonLink href="#contact" variant="primary" size="lg">
              Talk to the founder →
            </ButtonLink>
          </div>

          <dl className="mt-14 grid gap-x-6 gap-y-8 border-t border-hair-strong pt-8 sm:grid-cols-3">
            <StatFigure size="lg" suffix="M" label="Koreans aged 55–70">
              <CountUp to={13} duration={1100} />
            </StatFigure>
            <StatFigure size="lg" suffix="" label={`programs & activities in our live DB · as of ${formatAsOf(asOf)}`}>
              <CountUp to={catalogCount} />
            </StatFigure>
            <StatFigure size="lg" suffix="" label="Agent autonomy tiers">
              <CountUp to={3} duration={900} />
            </StatFigure>
          </dl>
          <p className="mt-4 text-[12.5px] text-ink-soft/70">
            Population source: MOIS Resident Registration statistics, June 2026 (ages 55–70:
            13,014,756)
          </p>
        </div>
      </section>

      <SpreadSection n="01" label="Why now">
        <Reveal>
          <SpreadTitle>A market at an inflection point</SpreadTitle>
          <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
            Koreans aged 55–70 are no longer subjects of care; they are the authors of their own
            days. Three forces cross at once: digital fluency, demographic shift, and the demand
            to design their own day.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {EVIDENCE.map((e, i) => (
            <Reveal key={e.stat} delay={i * 80}>
              <div className="ed-card flex h-full flex-col p-7">
                <p className="num text-[26px] font-extrabold tracking-[-0.02em] text-sage">
                  {e.stat}
                </p>
                <p className="mt-3 flex-1 text-[15.5px] leading-[1.7] text-ink-soft">{e.claim}</p>
                <p className="mt-5 border-t border-hair pt-4 text-[12px] text-ink-soft/70">
                  {e.source}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12">
          <OrbitRings
            aria="Market expansion: from Korea's 13M first market to East Asia and the global 55+ market"
            coreTop="Korea · 13M"
            coreBottom="first market"
            mid="East Asia"
            outer="global 55+ market"
          />
        </Reveal>
      </SpreadSection>

      <SpreadSection n="02" label="The evidence" tone="paper">
        <Reveal>
          <SpreadTitle>Demand, verified in interviews</SpreadTitle>
          <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
            In-depth beta interviews validated demand qualitatively. The strongest signal: search
            is free, but wallets open for delegation.
          </p>
          <blockquote className="mt-9 max-w-[44rem] border-l-[3px] border-sage pl-6 text-[21px] font-medium leading-[1.65] text-ink">
            &ldquo;I won&apos;t pay for search, there are free substitutes. Delegation is the
            differentiator. If it really works, I&apos;d pay 5,000 to 20,000 won per application.
            Once it hooks me, I couldn&apos;t leave, like YouTube.&rdquo;
          </blockquote>
          <p className="mt-4 text-[13.5px] text-ink-soft">
            Beta interview participant, male, 60s · June 2026, in person
          </p>
          <p className="mt-7 max-w-[40rem] text-[14px] text-ink-soft/80">
            We are at the qualitative stage. Quantitative conversion metrics will be measured and
            shared with the paid launch.
          </p>
        </Reveal>
      </SpreadSection>

      <SpreadSection n="03" label="Business model">
        <Reveal>
          <SpreadTitle>Search is free. We charge for delegation.</SpreadTitle>
          <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
            A credit model for Agent as a Service: pay only when delegation succeeds. It matches
            how this generation actually spends.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {MODEL.map((m, i) => (
            <Reveal key={m.tag} delay={i * 80}>
              <div className="ed-card h-full p-7">
                <span className="text-eyebrow uppercase text-sage">{m.tag}</span>
                <p className="mt-4 text-[19px] font-bold text-ink">{m.title}</p>
                <p className="mt-3 text-[16px] leading-[1.7] text-ink-soft">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-[12.5px] text-ink-soft/70">
          Subscription benchmark figures are from public press coverage.
        </p>
      </SpreadSection>

      <SpreadSection n="04" label="Get in touch" tone="paper" id="contact">
        <Reveal>
          <SpreadTitle>Let&apos;s talk</SpreadTitle>
          <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
            Reach the founder directly. The fastest, most accurate conversation.
          </p>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <ButtonLink href="/en/contact" variant="primary" size="lg">
              Talk to us →
            </ButtonLink>
            <ButtonLink href="/investors" variant="ghost" size="lg">
              한국어 →
            </ButtonLink>
          </div>
        </Reveal>
      </SpreadSection>
    </>
  );
}

