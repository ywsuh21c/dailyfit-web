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

// Research (/research) — 핵심 리서치 주제 self-accelerating agentic AI 선언 +
// 10~20년 비전. 청자: 채용 대상 AI 리서처 · VC · 언론(3인칭). 기능 나열이
// 아니라 장기 의도의 선언(탤런트 마그넷). 소스: Michael 2026-07-02 노트
// (A16Z "Building Self-Accelerating AI" 청취 후 창업 함의).
// 영어 미러: app/en/research/page.tsx — 카피 수정 시 양쪽 동기화.

export const metadata: Metadata = {
  title: 'Research',
  description:
    'DailyFit의 핵심 리서치 주제, self-accelerating AI. 지시받기 전에 스스로 진화하는 Agent를 실제 서비스 환경에서 연구합니다.',
};

const mailto = `mailto:${site.contactEmail}`;

export default function ResearchPage() {
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
              우리가 풀고자 하는 Next Problem입니다.
            </h1>
            <p className="mt-8 max-w-[54ch] text-[17px] leading-relaxed text-ink-soft sm:text-[19px]">
              과학은 가설과 실험의 반복으로 전진합니다.
              <br />
              <br />
              이제 AI가 그 사이클을 스스로 돌리기 시작했습니다.
              <br />
              <br />
              진보가 사람의 속도를 넘어서는 순간입니다.
              <br />
              <br />
              DailyFit은 그 순간을 앞당기고 있습니다.
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
                리서치 프런티어 ↓
              </a>
            </div>
          </div>
          <AccelerationLoop />
        </div>
      </section>

      {/* ─────────────── WHY WE RESEARCH (선언) ─────────────── */}
      <section className="bg-bg py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Reveal>
            <p className="eyebrow-mono text-sage">An AI-native company</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[46px]">
              제품 회사이자,
              <br />
              AI 리서치 회사입니다.
            </h2>
            <p className="mx-auto mt-6 max-w-[72ch] text-body text-ink-soft">
              다음 시대의 소프트웨어는 스스로 일하는 Agent입니다.
              <br />
              DailyFit은 그 원리를 실제 서비스에서 검증합니다.
              <br />
              리서치가 제품을 밀고, 제품이 리서치를 증명합니다.
            </p>
          </Reveal>
        </div>
        <div className="mx-auto mt-16 max-w-6xl px-5">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <PrincipleCard num="P1" tag="Production-first" title="실전 우선" delay={0}>
              벤치마크가 아니라 라이브 서비스에서 검증합니다.
            </PrincipleCard>
            <PrincipleCard num="P2" tag="ROI-gated" title="비용 게이트" delay={80}>
              모든 학습 루프는 자신의 비용을 스스로 증명해야 합니다.
            </PrincipleCard>
            <PrincipleCard num="P3" tag="User sovereignty" title="사용자 결정권" delay={160}>
              Agent는 제안하고, 결정은 언제나 사용자가 합니다.
            </PrincipleCard>
            <PrincipleCard num="P4" tag="Safe failure" title="안전한 실패" delay={240}>
              모든 개입은 기록되고, 즉시 되돌릴 수 있습니다.
            </PrincipleCard>
          </div>
        </div>
      </section>

      {/* ─────────────── THE THESIS (핵심 리서치 주제) ─────────────── */}
      <section id="thesis" className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Reveal>
            <p className="eyebrow-mono text-sage">Core research theme</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[46px]">
              지시받기 전에,
              <br />
              이미 진화해 있는 Agent.
            </h2>
            <p className="mx-auto mt-6 max-w-[72ch] text-body text-ink-soft">
              Agent는 매일 같은 절차를 반복하며 장애물의 패턴을 인식합니다.
              <br />
              그 학습은 다음 반복에 스스로 적용됩니다.
              <br />
              목표는 하나입니다.
              <br />
              사람이 개선을 지시하기 전에, Agent가 이미 더 나아져 있는 것.
            </p>
            <div className="mt-10">
              <LoopContrast />
            </div>
          </Reveal>
          <Reveal className="mt-14" delay={120}>
            <LearningCurve />
          </Reveal>
        </div>
      </section>

      {/* ─────────────── THE METHOD (파이프라인) ─────────────── */}
      <section className="border-y border-line bg-ivory py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow-mono text-sage">The method</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[42px]">
              가속은 다섯 단계로 만들어집니다.
            </h2>
            <p className="mx-auto mt-5 max-w-[72ch] text-body text-ink-soft">
              막연한 자기개선이 아니라, 계량 가능한 파이프라인입니다.
              <br />
              모든 단계가 기록되고, 측정되고, 게이트를 통과해야 합니다.
            </p>
          </Reveal>
          <Reveal className="mt-14" delay={120}>
            <MethodPipeline />
          </Reveal>
        </div>
      </section>

      {/* ─────────────── A LIVING LAB (제품 = 실험장) ─────────────── */}
      <section className="bg-bg py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="eyebrow-mono text-sage">Why DailyFit is the testbed</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[42px]">
              매일 돌아가는 실전이
              <br />
              가장 좋은 실험실입니다.
            </h2>
            <p className="mt-6 max-w-[60ch] text-body text-ink-soft">
              신청대행 Agent는 매일 실제 포털과 양식, 절차에 부딪힙니다.
              <br />
              그 반복과 실패가 곧 학습 데이터가 됩니다.
              <br />
              검증 무대는 논문 속 벤치마크가 아닙니다.
              <br />
              살아있는 서비스입니다.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ResearchConsole />
          </Reveal>
        </div>
      </section>

      {/* ─────────────── OPEN QUESTIONS ─────────────── */}
      <section className="border-y border-line bg-ivory py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow-mono text-sage">Open questions</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[42px]">
              우리가 아직 풀지 못한 질문들
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <QuestionCard
              tag="Learning cadence"
              title="Agent는 언제 배워야 하는가"
              delay={0}
              glyph={<CadenceGlyph />}
              keywords={['online learning', 'scheduled consolidation', 'drift detection']}
            >
              상시 학습인가, 정해진 주기의 체크인인가.
              <br />
              학습의 타이밍 자체가 설계의 대상입니다.
            </QuestionCard>
            <QuestionCard
              tag="The golden point"
              title="얼마나 배워야 하는가"
              delay={120}
              glyph={<GoldenGlyph />}
              keywords={['stability vs. plasticity', 'noise overfitting', 'update frequency']}
            >
              과한 학습은 흐름을 교란하고 잘못된 방향을 강화합니다.
              <br />
              최적의 빈도가 존재한다고 가정하고, 그 지점을 찾습니다.
            </QuestionCard>
            <QuestionCard
              tag="Cost vs. value"
              title="가속의 값은 얼마인가"
              delay={240}
              glyph={<CostGlyph />}
              keywords={['token economics', 'compute-optimal loops', 'ROI gating']}
            >
              무한한 토큰을 태우는 자기가속은 개선 가치가 비용을 넘지 못할 수
              있습니다.
              <br />
              ROI가 모든 학습 루프의 게이트입니다.
            </QuestionCard>
          </div>
          <Reveal className="mt-12 text-center" delay={300}>
            <p className="text-body font-semibold text-ink">
              이 질문들을 함께 풀 사람을 찾고 있습니다.
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
              하나의 원리가,
              <br />
              모든 영역으로 확장됩니다.
            </h2>
            <p className="mx-auto mt-6 max-w-[72ch] text-body text-ink-soft">
              Self-acceleration은 시작일 뿐입니다.
              <br />
              같은 원리가 취미를 넘어 일자리로, 개인의 삶을 넘어 직업의 삶으로
              확장됩니다.
              <br />
              그리고 기회를 찾아주는 것을 넘어, 만들어내는 단계로 나아갑니다.
            </p>
          </Reveal>
          <Reveal className="mt-14" delay={120}>
            <FrontierField />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <QuestionCard
              tag="Domain expansion"
              title="취미에서 일자리까지"
              delay={0}
              keywords={['transfer learning', 'cross-domain memory', 'unified user model']}
            >
              하루를 설계하던 원리가 일자리 기회를 찾는 데 그대로 적용됩니다.
              <br />
              개인의 삶부터 직업의 삶까지, 같은 Agent가 받칩니다.
            </QuestionCard>
            <QuestionCard
              tag="Self-creating"
              title="찾아주기에서 창출까지"
              delay={120}
              keywords={['demand sensing', 'generative supply', 'agent-run programs']}
            >
              기회를 찾아주는 데서 멈추지 않습니다.
              <br />
              활동과 일자리를 Agent가 스스로 만들어내는 단계를 연구합니다.
            </QuestionCard>
            <OpenSlotCard tag="In preparation" title="다음 주제들을 준비하고 있습니다" delay={240}>
              장기 로드맵 위에 다음 리서치들이 이미 줄 서 있습니다.
              <br />
              공개는 검증을 마친 순서대로입니다.
            </OpenSlotCard>
          </div>
        </div>
      </section>

      {/* ─────────────────────── FINAL CTA ─────────────────────── */}
      <section className="bg-gradient-to-b from-sage to-sage-dk py-28 text-center text-white sm:py-36">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="eyebrow-mono text-white/70">Research at DailyFit</p>
            <h2 className="mx-auto mt-5 max-w-[20ch] text-[36px] font-extrabold leading-[1.18] tracking-[-0.03em] sm:text-[46px]">
              다음 10년의 AI를 함께 만들 사람.
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

/** Frontier 마지막 칸 — 비워둔 자리(대시 보더). 다음 주제는 합류하는 사람의 것. */
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
