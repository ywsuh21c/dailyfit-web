import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { Reveal } from '@/components/motion/Reveal';
import { AccelerationLoop } from '@/components/research/AccelerationLoop';
import { LearningCurve } from '@/components/research/LearningCurve';
import { ResearchConsole } from '@/components/research/ResearchConsole';
import { FrontierField } from '@/components/research/FrontierField';
import { MethodPipeline } from '@/components/research/MethodPipeline';
import { LoopContrast } from '@/components/research/LoopContrast';
import { CadenceGlyph, GoldenGlyph, CostGlyph } from '@/components/research/QuestionGlyphs';

// Research (/en/research) — English mirror of the Korean /research page.
// Declares the core research theme (self-accelerating agentic AI) and the
// 10-to-20-year vision. Audience: AI researchers we want to recruit, VC,
// press (third person). Keep copy in sync with app/(marketing)/research.

export const metadata: Metadata = {
  title: 'Research · DailyFit',
  description:
    'Self-accelerating AI is the core research theme at DailyFit: an Agent that evolves before it is told to, studied in a live service environment.',
};

const mailto = `mailto:${site.contactEmail}`;

export default function EnResearchPage() {
  return (
    <>
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="hero-field relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="aurora aurora-1" aria-hidden="true" />
        <div className="aurora aurora-2" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-24 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:pb-32 lg:pt-32">
          <div>
            <p className="eyebrow-mono text-sage">Research at DailyFit</p>
            <h1 className="mt-6 text-[42px] font-extrabold leading-[1.12] tracking-[-0.035em] text-ink sm:text-[54px]">
              <span className="text-sage">Self-accelerating Agentic AI.</span>
              <br />
              The next problem we choose to solve.
            </h1>
            <p className="mt-8 max-w-[54ch] text-[17px] leading-relaxed text-ink-soft sm:text-[19px]">
              Science advances by hypothesis and experiment.
              <br />
              <br />
              AI is starting to run that cycle on its own.
              <br />
              <br />
              That is when progress outgrows human speed.
              <br />
              <br />
              DailyFit is bringing that moment closer.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={mailto}
                className="inline-flex min-h-[56px] items-center rounded-xl bg-sage px-8 text-[17px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
              >
                Talk to us
              </a>
              <a
                href="#frontiers"
                className="inline-flex min-h-[56px] items-center rounded-xl border border-ink/15 bg-white/50 px-8 text-[17px] font-bold text-ink transition-colors hover:border-sage hover:text-sage active:scale-[0.98]"
              >
                Research frontiers ↓
              </a>
            </div>
          </div>
          <AccelerationLoop lang="en" />
        </div>
      </section>

      {/* ─────────────── WHY WE RESEARCH ─────────────── */}
      <section className="bg-bg py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Reveal>
            <p className="eyebrow-mono text-sage">An AI-native company</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[46px]">
              A product company.
              <br />
              And an AI research company.
            </h2>
            <p className="mx-auto mt-6 max-w-[72ch] text-body text-ink-soft">
              The next era of software is the Agent that works on its own.
              <br />
              DailyFit proves that principle in a real, running service.
              <br />
              Research pushes the product, and the product proves the research.
            </p>
          </Reveal>
        </div>
        <div className="mx-auto mt-16 max-w-6xl px-5">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <PrincipleCard num="P1" tag="Production-first" title="Proven live" delay={0}>
              Validated in a live service, not on a benchmark.
            </PrincipleCard>
            <PrincipleCard num="P2" tag="ROI-gated" title="Loops pay rent" delay={80}>
              Every learning loop must prove its own cost.
            </PrincipleCard>
            <PrincipleCard num="P3" tag="User sovereignty" title="Users decide" delay={160}>
              The Agent proposes; the user always makes the call.
            </PrincipleCard>
            <PrincipleCard num="P4" tag="Safe failure" title="Reversible" delay={240}>
              Every intervention is logged and instantly reversible.
            </PrincipleCard>
          </div>
        </div>
      </section>

      {/* ─────────────── THE THESIS ─────────────── */}
      <section id="thesis" className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Reveal>
            <p className="eyebrow-mono text-sage">Core research theme</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[46px]">
              An Agent that evolves
              <br />
              before it&rsquo;s told to.
            </h2>
            <p className="mx-auto mt-6 max-w-[72ch] text-body text-ink-soft">
              The Agent repeats the same procedures every day and recognizes the
              patterns in its obstacles.
              <br />
              That learning is applied to the next repetition, by the Agent
              itself.
              <br />
              The goal is a single state.
              <br />
              Before anyone asks for an improvement, the Agent is already better.
            </p>
            <div className="mt-10">
              <LoopContrast lang="en" />
            </div>
          </Reveal>
          <Reveal className="mt-14" delay={120}>
            <LearningCurve lang="en" />
          </Reveal>
        </div>
      </section>

      {/* ─────────────── THE METHOD ─────────────── */}
      <section className="border-y border-line bg-ivory py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow-mono text-sage">The method</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[42px]">
              Acceleration is built in five stages.
            </h2>
            <p className="mx-auto mt-5 max-w-[72ch] text-body text-ink-soft">
              Not vague self-improvement: a measurable pipeline.
              <br />
              Every stage is logged, measured, and gated.
            </p>
          </Reveal>
          <Reveal className="mt-14" delay={120}>
            <MethodPipeline lang="en" />
          </Reveal>
        </div>
      </section>

      {/* ─────────────── A LIVING LAB ─────────────── */}
      <section className="bg-bg py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="eyebrow-mono text-sage">Why DailyFit is the testbed</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[42px]">
              A real service, running daily,
              <br />
              is the best laboratory.
            </h2>
            <p className="mt-6 max-w-[60ch] text-body text-ink-soft">
              The Auto-apply Agent collides with real portals, forms, and
              procedures every day.
              <br />
              Those repetitions and failures become the learning data.
              <br />
              The proving ground is not a paper benchmark.
              <br />
              It is a living service.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ResearchConsole lang="en" />
          </Reveal>
        </div>
      </section>

      {/* ─────────────── OPEN QUESTIONS ─────────────── */}
      <section className="border-y border-line bg-ivory py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow-mono text-sage">Open questions</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[42px]">
              The questions we haven&rsquo;t solved
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <QuestionCard
              tag="Learning cadence"
              title="When should an Agent learn"
              delay={0}
              glyph={<CadenceGlyph />}
              keywords={['online learning', 'scheduled consolidation', 'drift detection']}
            >
              Always-on learning, or check-ins on a fixed cycle.
              <br />
              The timing of learning is itself a design problem.
            </QuestionCard>
            <QuestionCard
              tag="The golden point"
              title="How much is too much"
              delay={120}
              glyph={<GoldenGlyph />}
              keywords={['stability vs. plasticity', 'noise overfitting', 'update frequency']}
            >
              Over-learning disturbs the flow and reinforces the wrong
              directions.
              <br />
              We assume an optimal frequency exists, and we search for it.
            </QuestionCard>
            <QuestionCard
              tag="Cost vs. value"
              title="What does acceleration cost"
              delay={240}
              glyph={<CostGlyph />}
              keywords={['token economics', 'compute-optimal loops', 'ROI gating']}
            >
              Self-acceleration that burns unlimited tokens can improve less than
              it spends.
              <br />
              ROI gates every learning loop.
            </QuestionCard>
          </div>
          <Reveal className="mt-12 text-center" delay={300}>
            <p className="text-body font-semibold text-ink">
              We&rsquo;re looking for the people who want to solve them.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────────────── RESEARCH FRONTIERS ─────────────── */}
      <section id="frontiers" className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow-mono text-sage">Research frontiers</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[46px]">
              One principle,
              <br />
              expanding into every domain.
            </h2>
            <p className="mx-auto mt-6 max-w-[72ch] text-body text-ink-soft">
              Self-acceleration is only the beginning.
              <br />
              The same principle extends beyond hobbies into jobs, beyond
              personal life into professional life.
              <br />
              And beyond finding opportunities, into creating them.
            </p>
          </Reveal>
          <Reveal className="mt-14" delay={120}>
            <FrontierField lang="en" />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <QuestionCard
              tag="Domain expansion"
              title="From hobbies to jobs"
              delay={0}
              keywords={['transfer learning', 'cross-domain memory', 'unified user model']}
            >
              The principle that designs a day applies unchanged to finding work
              opportunities.
              <br />
              From personal life to professional life, one Agent carries it all.
            </QuestionCard>
            <QuestionCard
              tag="Self-creating"
              title="From finding to creating"
              delay={120}
              keywords={['demand sensing', 'generative supply', 'agent-run programs']}
            >
              Finding opportunities is not the finish line.
              <br />
              We study the stage where the Agent creates activities and jobs on
              its own.
            </QuestionCard>
            <OpenSlotCard tag="In preparation" title="The next topics are in preparation" delay={240}>
              More research is already lined up on the long-term roadmap.
              <br />
              Each goes public once it clears validation.
            </OpenSlotCard>
          </div>
        </div>
      </section>

      {/* ─────────────────────── FINAL CTA ─────────────────────── */}
      <section className="bg-gradient-to-b from-sage to-sage-dk py-28 text-center text-white sm:py-36">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="eyebrow-mono text-white/70">Research at DailyFit</p>
            <h2 className="mx-auto mt-5 max-w-[24ch] text-[36px] font-extrabold leading-[1.18] tracking-[-0.03em] sm:text-[46px]">
              The next decade of AI, built together.
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={mailto}
                className="inline-flex min-h-[56px] items-center rounded-xl bg-white px-8 text-[17px] font-bold text-sage-dk transition-colors hover:bg-ivory active:scale-[0.98]"
              >
                Talk to us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ───────────────────────── partials ───────────────────────── */

function QuestionCard({
  tag,
  title,
  delay,
  glyph,
  keywords,
  children,
}: {
  tag: string;
  title: string;
  delay: number;
  glyph?: React.ReactNode;
  keywords?: string[];
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div className="agent-card flex h-full flex-col p-8">
        {glyph ? <div className="mb-5">{glyph}</div> : null}
        <span className="self-start rounded-md border border-sage/25 bg-sage/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-sage">
          {tag}
        </span>
        <h3 className="mt-5 text-[22px] font-bold text-ink">{title}</h3>
        <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-ink-soft">{children}</p>
        {keywords ? (
          <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
            {keywords.map((k) => (
              <span
                key={k}
                className="rounded-md bg-surface px-2 py-1 text-[11px] font-medium text-ink-soft"
              >
                {k}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

/** Research principle — compact numbered card for the principles strip. */
function PrincipleCard({
  num,
  tag,
  title,
  delay,
  children,
}: {
  num: string;
  tag: string;
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
        <div className="flex items-baseline gap-2.5">
          <span className="text-[22px] font-extrabold tracking-tight text-sage">{num}</span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft/60">
            {tag}
          </span>
        </div>
        <h3 className="mt-3 text-[17px] font-bold text-ink">{title}</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{children}</p>
      </div>
    </Reveal>
  );
}

/** The last frontier slot, left blank on purpose: the next topic belongs to whoever joins. */
function OpenSlotCard({
  tag,
  title,
  delay,
  children,
}: {
  tag: string;
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex h-full flex-col rounded-2xl border-2 border-dashed border-sage/40 bg-transparent p-8">
        <span className="self-start rounded-md border border-sage/25 bg-sage/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-sage">
          {tag}
        </span>
        <h3 className="mt-5 text-[22px] font-bold text-ink">{title}</h3>
        <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-ink-soft">{children}</p>
      </div>
    </Reveal>
  );
}
