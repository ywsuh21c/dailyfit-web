import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'About',
  description: `${site.name} · AI is the instrument, seniors are the identity. A team building AI Agents for active seniors.`,
};

export default function EnAboutPage() {
  return (
    <>
      <section className="hero-field relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="aurora aurora-1" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-24 lg:pt-28">
          <p className="eyebrow-mono text-sage">About DailyFit</p>
          <h1 className="mt-5 max-w-3xl text-h1">AI is the instrument. Seniors are the identity.</h1>
          <p className="mt-6 max-w-prose text-body text-ink-soft">
            DailyFit builds AI Agents for the active senior generation.
            <br />
            A team of Agents that designs hobbies and daily life.
            <br />
            We see seniors as one of the most compelling segments anywhere,
            <br />
            and we begin the story with a more vibrant day, not with technology.
          </p>
        </div>
      </section>

      <Section tone="surface">
        <SectionHeader
          eyebrow="Mission"
          title="So everyone becomes the author of their own day"
          lead="DailyFit is not a care app, not a monitoring tool, and not a medical service. It is a tool for self-determination, vitality, and structure, so seniors design their own day."
        />
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="How we operate"
          title="We run the company with Agents too"
          lead={
            <>
              The product is an Agent that designs a senior's day; the company is an organization run by a team of AI Agents.
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
        {/* TODO(Michael): founder photos + Hyunjin full-bio publication consent */}
        <Reveal className="mt-12">
          <JourneyPath lang="en" />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <FounderCard
            name="Youngwoo Michael Suh"
            role="Co-founder · CEO"
            bio="Boston University → Bain → PYLER → DailyFit. Runs the AI Agent team directly and designs the senior's day as AaaS."
          />
          <FounderCard
            name="Hyunjin Jake Kim"
            role="Co-founder · Head of Strategy"
            bio="Korea University → Bain → UVA MBA → DailyFit. Leads strategy and global expansion, designing the senior's day alongside the team."
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
