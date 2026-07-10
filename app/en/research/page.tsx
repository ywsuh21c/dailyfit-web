import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { Principles } from '@/components/research/Principles';
import { AccelerationLoop } from '@/components/research/AccelerationLoop';
import { LearningCurve } from '@/components/research/LearningCurve';
import { ResearchConsole } from '@/components/research/ResearchConsole';
import { FrontierField } from '@/components/research/FrontierField';
import { LoopContrast } from '@/components/research/LoopContrast';
import { CadenceGlyph, GoldenGlyph, CostGlyph } from '@/components/research/QuestionGlyphs';
import { ChapterRail } from '@/components/research/story/ChapterRail';
import { Interlude } from '@/components/research/story/Interlude';
import { EvolutionScene } from '@/components/research/story/EvolutionScene';
import { MethodScene } from '@/components/research/story/MethodScene';

// Research (/en/research) — English mirror of the Korean /research page.
// Declares the core research theme (self-accelerating agentic AI) and the
// 10-to-20-year vision. Audience: AI researchers we want to recruit, VC,
// press (third person). Keep copy in sync with app/(marketing)/research.
//
// 2026-07-10 scrollytelling rebuild — Anthropic-institute essay grammar:
// full-viewport hero → word-illuminated interlude (dark) → six chapters
// (01 lab · 02 thesis [sticky scene] · 03 method [flywheel scene] ·
// 04 production · 05 questions · 06 frontier) → dark-stage CTA bookend.

export const metadata: Metadata = {
  title: 'Research · DailyFit',
  description:
    'Self-accelerating AI is the core research theme at DailyFit: an Agent that evolves before it is told to, studied in a live service environment.',
};

const CHAPTERS = [
  { id: 'lab', num: '01', label: 'Lab' },
  { id: 'thesis', num: '02', label: 'Thesis' },
  { id: 'method', num: '03', label: 'Method' },
  { id: 'production', num: '04', label: 'Production' },
  { id: 'questions', num: '05', label: 'Questions' },
  { id: 'frontiers', num: '06', label: 'Frontier' },
];

export default function EnResearchPage() {
  return (
    <>
      <ChapterRail chapters={CHAPTERS} />

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="hero-field relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="aurora aurora-1" aria-hidden="true" />
        <div className="aurora aurora-2" aria-hidden="true" />

        <div className="relative mx-auto flex min-h-[calc(100svh-72px)] max-w-6xl flex-col justify-center px-5 pb-24 pt-16 lg:pb-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div>
              <p className="eyebrow-mono text-sage">Research at DailyFit</p>
              <h1 className="mt-6 text-[42px] font-extrabold leading-[1.12] tracking-[-0.035em] text-ink sm:text-[54px]">
                <span className="text-sage">Self-accelerating Agentic AI.</span>
                <br />
                The next problem we solve.
              </h1>
              <p className="mt-8 max-w-[54ch] text-[17px] leading-relaxed text-ink-soft sm:text-[19px]">
                Science advances by hypothesis and experiment.
                <br />
                AI is starting to run that cycle on its own.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/en/contact"
                  className="inline-flex min-h-[56px] items-center rounded-xl bg-sage px-8 text-[17px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
                >
                  Talk to us
                </Link>
                <a
                  href="#frontiers"
                  className="inline-flex min-h-[56px] items-center rounded-xl border border-ink/15 bg-white/50 px-8 text-[17px] font-bold text-ink transition-colors hover:border-sage hover:text-sage active:scale-[0.98]"
                >
                  Research frontier ↓
                </a>
              </div>
            </div>
            <AccelerationLoop lang="en" />
          </div>

          {/* scroll cue */}
          <div className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2" aria-hidden="true">
            <span className="rs-cue">
              <span className="eyebrow-mono text-[11px] text-ink-soft/60">Scroll</span>
              <span className="rs-cue-line" />
            </span>
          </div>
        </div>
      </section>

      {/* ─────────── INTERLUDE — the manifesto, word by word ─────────── */}
      <Interlude
        eyebrow="Why this, why now"
        lines={[
          [{ t: 'The' }, { t: 'pace' }, { t: 'of' }, { t: 'progress' }],
          [{ t: 'is' }, { t: 'no' }, { t: 'longer' }, { t: 'set' }, { t: 'by' }, { t: 'machines.' }],
          [{ t: 'Humans', em: true }, { t: 'are' }, { t: 'the' }, { t: 'bottleneck', em: true }, { t: 'now.' }],
          [{ t: 'DailyFit' }, { t: 'studies' }, { t: 'what' }, { t: 'comes' }, { t: 'next.' }],
        ]}
      />

      {/* ─────────────── CH 01 · LAB ─────────────── */}
      <section id="lab" className="bg-bg py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Reveal className="relative">
            <span className="rs-ch-num" aria-hidden="true">01</span>
            <p className="eyebrow-mono text-sage">Chapter 01 · AI-native company</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[46px]">
              An Agent-as-a-Service company.
              <br />
              And an AI Research Lab.
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
          <Principles lang="en" />
        </div>
      </section>

      {/* ─────────────── CH 02 · THESIS (sticky scene) ─────────────── */}
      <section id="thesis" className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="relative mx-auto max-w-3xl text-center">
            <span className="rs-ch-num" aria-hidden="true">02</span>
            <p className="eyebrow-mono text-sage">Chapter 02 · Core research theme</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[46px]">
              An Agent that evolves
              <br />
              before it&rsquo;s told to.
            </h2>
            <p className="mx-auto mt-6 max-w-[72ch] text-body text-ink-soft">
              Follow the loop through the three stages where it leaves human
              hands.
            </p>
          </Reveal>

          <div className="mt-10">
            <EvolutionScene lang="en" />
          </div>

          <div className="mx-auto mt-8 max-w-3xl text-center">
            <Reveal>
              <p className="text-body text-ink-soft">
                The goal is a single state.
                <br />
                <strong className="font-bold text-ink">
                  Before anyone asks for an improvement, the Agent is already
                  better.
                </strong>
              </p>
              <div className="mt-10">
                <LoopContrast lang="en" />
              </div>
            </Reveal>
            <Reveal className="mt-14" delay={120}>
              <LearningCurve lang="en" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─────────────── CH 03 · METHOD (flywheel scene) ─────────────── */}
      <section id="method" className="border-y border-line bg-ivory py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="relative mx-auto max-w-3xl text-center">
            <span className="rs-ch-num" aria-hidden="true">03</span>
            <p className="eyebrow-mono text-sage">Chapter 03 · The method</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[42px]">
              Acceleration is built in five stages.
            </h2>
            <p className="mx-auto mt-5 max-w-[72ch] text-body text-ink-soft">
              Not vague self-improvement: a measurable pipeline.
              <br />
              Every stage is logged, measured, and gated.
            </p>
          </Reveal>
          <div className="mt-10">
            <MethodScene lang="en" />
          </div>
        </div>
      </section>

      {/* ─────────────── CH 04 · PRODUCTION ─────────────── */}
      <section id="production" className="bg-bg py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="eyebrow-mono text-sage">Chapter 04 · Proven in production</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[42px]">
              A real service, running daily,
              <br />
              is the most honest proof.
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

      {/* ─────────────── CH 05 · OPEN QUESTIONS ─────────────── */}
      <section id="questions" className="border-y border-line bg-ivory py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="relative mx-auto max-w-3xl text-center">
            <span className="rs-ch-num" aria-hidden="true">05</span>
            <p className="eyebrow-mono text-sage">Chapter 05 · Open questions</p>
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

      {/* ─────────────── CH 06 · FRONTIER ─────────────── */}
      <section id="frontiers" className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="relative mx-auto max-w-3xl text-center">
            <span className="rs-ch-num" aria-hidden="true">06</span>
            <p className="eyebrow-mono text-sage">Chapter 06 · Research frontier</p>
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
              Beyond finding opportunities, into creating them.
              <br />
              And beyond suggestions, into a conversation that deepens every
              day.
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
            <QuestionCard
              tag="Personalized conversation"
              title="From delegation to conversation"
              delay={240}
              keywords={['contextual memory', 'proactive check-in', 'conversational planning']}
            >
              The Agent remembers &ldquo;I slept badly last night,&rdquo; checks
              in first, and redesigns that day together.
              <br />
              Beyond suggestions and delegation, we study a conversational
              companion that carries every day forward.
            </QuestionCard>
            <OpenSlotCard tag="In preparation" title="The next topics are in preparation" delay={360}>
              More research is already lined up on the long-term roadmap.
              <br />
              Each goes public once it clears validation.
            </OpenSlotCard>
          </div>
        </div>
      </section>

      {/* ─────────────────────── FINAL CTA — dark stage bookend ─────────────────────── */}
      <section className="rs-stage overflow-hidden py-28 text-center sm:py-40">
        <div className="rs-stage-grid" aria-hidden="true" />
        <div className="rs-stage-glow rs-stage-glow-a" aria-hidden="true" />
        <div className="rs-stage-glow rs-stage-glow-b" aria-hidden="true" />
        <div className="rs-stage-grain" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="eyebrow-mono text-sage-lt/80">Research at DailyFit</p>
            <h2 className="mx-auto mt-5 max-w-[24ch] text-[36px] font-extrabold leading-[1.18] tracking-[-0.03em] text-ivory sm:text-[46px]">
              The next decade of AI, built together.
            </h2>
            <p className="mx-auto mt-6 max-w-[50ch] text-[17px] leading-relaxed text-ivory/70">
              We study self-learning Agents in a living service, not on a
              benchmark.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/en/contact"
                className="inline-flex min-h-[56px] items-center rounded-xl bg-white px-8 text-[17px] font-bold text-sage-dk transition-colors hover:bg-ivory active:scale-[0.98]"
              >
                Talk to us
              </Link>
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
