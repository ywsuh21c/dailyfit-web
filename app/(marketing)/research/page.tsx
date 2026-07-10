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

// Research (/research) — 핵심 리서치 주제 self-accelerating agentic AI 선언 +
// 10~20년 비전. 청자: 채용 대상 AI 리서처 · VC · 언론(3인칭). 기능 나열이
// 아니라 장기 의도의 선언(탤런트 마그넷). 소스: Michael 2026-07-02 노트
// (A16Z "Building Self-Accelerating AI" 청취 후 창업 함의).
//
// 2026-07-10 스크롤텔링 개편: Anthropic institute 에세이 문법 —
// 풀뷰포트 히어로 → 워드 일루미네이션 인터루드(다크) → 챕터 6개
// (01 선언 · 02 논지[스티키 씬] · 03 방법[플라이휠 씬] · 04 실전 ·
// 05 질문 · 06 확장) → 다크 스테이지 CTA 북엔드. 챕터 레일 + 진행 바.
// 영어 미러: app/en/research/page.tsx — 카피 수정 시 양쪽 동기화.

export const metadata: Metadata = {
  title: 'Research',
  description:
    'DailyFit의 핵심 리서치 주제, self-accelerating AI. 지시받기 전에 스스로 진화하는 Agent를 실제 서비스 환경에서 연구합니다.',
};

const CHAPTERS = [
  { id: 'lab', num: '01', label: '선언' },
  { id: 'thesis', num: '02', label: '논지' },
  { id: 'method', num: '03', label: '방법' },
  { id: 'production', num: '04', label: '실전' },
  { id: 'questions', num: '05', label: '질문' },
  { id: 'frontiers', num: '06', label: '확장' },
];

export default function ResearchPage() {
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
                우리가 풀 다음 문제.
              </h1>
              <p className="mt-8 max-w-[54ch] text-[17px] leading-relaxed text-ink-soft sm:text-[19px]">
                과학은 가설과 실험의 반복으로 전진합니다.
                <br />
                이제 AI가 그 사이클을 스스로 돌리기 시작했습니다.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[56px] items-center rounded-xl bg-sage px-8 text-[17px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
                >
                  Talk to us
                </Link>
                <a
                  href="#frontiers"
                  className="inline-flex min-h-[56px] items-center rounded-xl border border-ink/15 bg-white/50 px-8 text-[17px] font-bold text-ink transition-colors hover:border-sage hover:text-sage active:scale-[0.98]"
                >
                  Research Frontier ↓
                </a>
              </div>
            </div>
            <AccelerationLoop />
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

      {/* ─────────── INTERLUDE — 선언문, 단어 단위 점등 ─────────── */}
      <Interlude
        eyebrow="Why this, why now"
        lines={[
          [{ t: '진보의' }, { t: '속도를' }, { t: '정하는' }, { t: '것은' }],
          [{ t: '더' }, { t: '이상' }, { t: '기계가' }, { t: '아닙니다.' }],
          [{ t: '이제는' }, { t: '인간이', em: true }, { t: 'Bottleneck입니다.', em: true }],
          [{ t: 'DailyFit은' }, { t: '그' }, { t: '다음을' }, { t: '연구합니다.' }],
        ]}
      />

      {/* ─────────────── CH 01 · 선언 ─────────────── */}
      <section id="lab" className="bg-bg py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Reveal className="relative">
            <span className="rs-ch-num" aria-hidden="true">01</span>
            <p className="eyebrow-mono text-sage">Chapter 01 · AI-native company</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[46px]">
              Agent-as-a-Service 회사이자,
              <br />
              AI Research Lab입니다.
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
          <Principles />
        </div>
      </section>

      {/* ─────────────── CH 02 · 논지 (스티키 씬) ─────────────── */}
      <section id="thesis" className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="relative mx-auto max-w-3xl text-center">
            <span className="rs-ch-num" aria-hidden="true">02</span>
            <p className="eyebrow-mono text-sage">Chapter 02 · Core research theme</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[46px]">
              지시받기 전에,
              <br />
              이미 진화해 있는 Agent.
            </h2>
            <p className="mx-auto mt-6 max-w-[72ch] text-body text-ink-soft">
              루프가 사람의 손을 떠나는 순간을, 세 단계로 따라가 봅니다.
            </p>
          </Reveal>

          <div className="mt-10">
            <EvolutionScene />
          </div>

          <div className="mx-auto mt-8 max-w-3xl text-center">
            <Reveal>
              <p className="text-body text-ink-soft">
                목표는 하나입니다.
                <br />
                <strong className="font-bold text-ink">
                  사람이 개선을 지시하기 전에, Agent가 이미 더 나아져 있는 것.
                </strong>
              </p>
              <div className="mt-10">
                <LoopContrast />
              </div>
            </Reveal>
            <Reveal className="mt-14" delay={120}>
              <LearningCurve />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─────────────── CH 03 · 방법 (플라이휠 씬) ─────────────── */}
      <section id="method" className="border-y border-line bg-ivory py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="relative mx-auto max-w-3xl text-center">
            <span className="rs-ch-num" aria-hidden="true">03</span>
            <p className="eyebrow-mono text-sage">Chapter 03 · The method</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[42px]">
              가속은 다섯 단계로 만들어집니다.
            </h2>
            <p className="mx-auto mt-5 max-w-[72ch] text-body text-ink-soft">
              막연한 자기개선이 아니라, 계량 가능한 파이프라인입니다.
              <br />
              모든 단계가 기록되고, 측정되고, 게이트를 통과해야 합니다.
            </p>
          </Reveal>
          <div className="mt-10">
            <MethodScene />
          </div>
        </div>
      </section>

      {/* ─────────────── CH 04 · 실전 검증 ─────────────── */}
      <section id="production" className="bg-bg py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="eyebrow-mono text-sage">Chapter 04 · Proven in production</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[42px]">
              매일 돌아가는 실전이
              <br />
              가장 정직한 검증입니다.
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

      {/* ─────────────── CH 05 · 질문 ─────────────── */}
      <section id="questions" className="border-y border-line bg-ivory py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="relative mx-auto max-w-3xl text-center">
            <span className="rs-ch-num" aria-hidden="true">05</span>
            <p className="eyebrow-mono text-sage">Chapter 05 · Open questions</p>
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
              최적의 빈도가 존재한다고 가정하고,
              <br />
              그 지점이 어디인지를 찾습니다.
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

      {/* ─────────────── CH 06 · 확장 ─────────────── */}
      <section id="frontiers" className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="relative mx-auto max-w-3xl text-center">
            <span className="rs-ch-num" aria-hidden="true">06</span>
            <p className="eyebrow-mono text-sage">Chapter 06 · Research frontier</p>
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
              기회를 찾아주는 것을 넘어, 만들어내는 단계로 나아갑니다.
              <br />
              그리고 제안을 넘어, 매일의 대화로 깊어집니다.
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
              개인의 삶부터 직업의 삶까지,
              <br />
              같은 Agent가 지원합니다.
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
            <QuestionCard
              tag="Personalized conversation"
              title="대행에서 대화까지"
              delay={240}
              keywords={['contextual memory', 'proactive check-in', 'conversational planning']}
            >
              &ldquo;어제 잠을 설쳤어&rdquo; 한마디를 기억해 먼저 안부를 묻고,
              <br />
              그날의 하루를 함께 다시 설계합니다.
              <br />
              제안과 대행을 넘어, 매일을 잇는 대화형 동반자를 연구합니다.
            </QuestionCard>
            <OpenSlotCard tag="In preparation" title="다음 주제들을 준비하고 있습니다" delay={360}>
              장기 로드맵 위에 다음 리서치들이 이미 줄 서 있습니다.
            </OpenSlotCard>
          </div>
        </div>
      </section>

      {/* ─────────────────────── FINAL CTA — 다크 스테이지 북엔드 ─────────────────────── */}
      <section className="rs-stage overflow-hidden py-28 text-center sm:py-40">
        <div className="rs-stage-grid" aria-hidden="true" />
        <div className="rs-stage-glow rs-stage-glow-a" aria-hidden="true" />
        <div className="rs-stage-glow rs-stage-glow-b" aria-hidden="true" />
        <div className="rs-stage-grain" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="eyebrow-mono text-sage-lt/80">Research at DailyFit</p>
            <h2 className="mx-auto mt-5 max-w-[20ch] text-[36px] font-extrabold leading-[1.18] tracking-[-0.03em] text-ivory sm:text-[46px]">
              다음 10년의 AI를 함께 만들 사람.
            </h2>
            <p className="mx-auto mt-6 max-w-[50ch] text-[17px] leading-relaxed text-ivory/70">
              스스로 배우는 Agent를, 벤치마크가 아니라 실제 서비스에서 연구합니다.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
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
