import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import Link from 'next/link';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { site } from '@/lib/site';
import { Reveal } from '@/components/motion/Reveal';
import { JourneyPath } from '@/components/motion/JourneyPath';

// About (/en/about) — English mirror of the Korean /about page.
// Option-B tone: the "AI Agent founder" narrative (swapped from a senior-care
// founder tone). Not exclusionary of seniors; keeps a respectful third person.
// Market is global, with Korea as the beachhead. Keep copy in sync with
// app/(marketing)/about.

export const metadata: Metadata = pageSeo({
  path: '/en/about',
  title: 'About',
  description: `${site.name} · AI is the instrument, the 55+ generation is the identity. A team building AI Agents for adults 55+.`,
});

export default function EnAboutPage() {
  return (
    <>
      <section className="hero-field relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="aurora aurora-1" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-24 lg:pt-28">
          <p className="eyebrow-mono text-sage">About DailyFit</p>
          <h1 className="mt-5 max-w-3xl text-h1">AI is the instrument. The 55+ generation is the identity.</h1>
          <p className="mt-6 max-w-prose text-body text-ink-soft">
            DailyFit builds AI Agents for the 55+ generation.
            <br />
            A team of Agents that designs hobbies and daily life.
            <br />
            We see this generation as one of the most compelling segments anywhere.
            <br />
            So before technology, we talk about a more vibrant day.
          </p>
        </div>
      </section>

      <Section tone="surface">
        <SectionHeader
          eyebrow="Mission"
          title="So everyone becomes the author of their own day"
          lead="DailyFit is not a care app, not a monitoring tool, and not a medical service. It is a tool for self-determination, vitality, and structure, so people design their own day."
        />
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="How we operate"
          title="We run the company with Agents too"
          lead={
            <>
              The product is an Agent that designs a member's day; the company is an organization run by a team of AI Agents.
              <br />
              We are open about how we work.
            </>
          }
        />
        <div className="mt-8">
          <ButtonLink href="/en/how-we-work" variant="ghost" size="lg">
            How we work →
          </ButtonLink>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader eyebrow="Team" title="It started with our parents' day" />
        {/* Founding backstory — web condensation of the origin narrative
            (mother's retirement → "a service that plans my day" → DailyFit). */}
        <Reveal>
          <div className="mt-8 max-w-prose space-y-4 text-body text-ink-soft">
            <p>
              In early 2025, founder Youngwoo&rsquo;s mother retired from the
              job she had held for more than thirty years. The 9 AM commute
              disappeared overnight, and with it the schedule that had held
              her days together.
              <br />
              Golf and travel are wonderful, but they cannot fill every day.
              <br />
              Each day began with the same blank question: what do I do today?
            </p>
            <p className="border-l-[3px] border-sage pl-5 text-[19px] font-semibold leading-relaxed text-ink">
              &ldquo;You use an &lsquo;agent&rsquo; at work every day...
              <br />
              build me one that plans my day for me!&rdquo;
            </p>
            <p>
              She had watched her son use AI Agents at work. Yet no Agent
              existed to look after her own day. The programs she did find were
              so complicated to sign up for that she gave up halfway. Her
              friends, and their friends, told the same story. That one
              sentence became the starting point of DailyFit.
            </p>
          </div>
        </Reveal>
        <Reveal className="mt-12">
          <JourneyPath lang="en" />
        </Reveal>
        {/* Founder card — solo-founder structure (2026-08-20). One card, so a
            two-column grid would leave it half-width; constrain to prose width. */}
        <div className="mt-12 max-w-xl">
          <FounderCard
            name={site.founder.name}
            role={site.founder.role}
            bio="Boston University → Fudan University → Bain → PYLER → DailyFit. Runs the AI Agent team directly and designs the day of adults 55+ as AaaS."
          />
        </div>
        <p className="mt-8 max-w-prose text-body text-ink-soft">
          If you have any questions, write to us at{' '}
          <Link href={`mailto:${site.contactEmail}`} className="font-semibold text-sage underline-offset-4 hover:underline">
            {site.contactEmail}
          </Link>
          . We read and answer every message ourselves.
        </p>
      </Section>
    </>
  );
}

function FounderCard({
  name,
  role,
  bio,
}: {
  name: string;
  role: string;
  bio: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-white p-6">
      <p className="text-h3 font-semibold text-ink">{name}</p>
      <p className="mt-1 text-base font-semibold text-sage">{role}</p>
      <p className="mt-3 text-body text-ink-soft">{bio}</p>
    </div>
  );
}
