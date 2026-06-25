import type { Metadata } from 'next';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Investors (EN)',
  description:
    "An AI daily-life design platform for South Korea's active seniors (55–70).",
  robots: { index: false, follow: true },
};

// English mirror of /investors. Copy is reframed for a global context, not a
// literal translation (IR scope §7). HARD RULE: no "we are raising" language.

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
          days on KakaoTalk. DailyFit layers an AI agent on top — designing a
          healthier, more engaged daily life, one conversation at a time.
        </p>
        <div className="mt-8">
          <ButtonLink href="#contact" variant="primary" size="lg">
            Talk to the founder →
          </ButtonLink>
        </div>
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="Why now"
          title="A market at an inflection point"
          lead="Active seniors are no longer subjects of care — they are the authors of their own days. The structural shift in demographics, digital fluency, and demand is happening now."
        />
      </Section>

      <Section tone="surface">
        <SectionHeader
          eyebrow="Who's building it"
          title="The team"
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-bg p-6">
            <p className="text-h3 font-semibold text-ink">Youngwoo (Michael) Suh</p>
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
          lead="Reach the founder directly — the fastest, most accurate conversation."
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
