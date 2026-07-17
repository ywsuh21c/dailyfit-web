'use client';

import { StickyScene, type SceneStep } from './StickyScene';

/**
 * Method scene — the flywheel, one stage at a time.
 *
 * The five-stage loop (observe → hypothesize → intervene → measure →
 * consolidate) stays pinned while each narrative step scrolls past and
 * lights its node; the ring's flowing dashes get faster with every stage —
 * the flywheel gaining momentum as the reader descends. Replaces the static
 * MethodPipeline diagram on the research pages.
 */

type Stage = { num: string; tag: string; node: string; title: string; body: React.ReactNode };

const KO: Stage[] = [
  {
    num: '01',
    tag: 'observe',
    node: '관찰',
    title: '모든 실행을 기록합니다',
    body: (
      <>
        모든 실행이 구조화된 트레이스로 남습니다.
        <br />
        무엇을 시도했고, 어디서 막혔는지가 전부 데이터가 됩니다.
      </>
    ),
  },
  {
    num: '02',
    tag: 'hypothesize',
    node: '가설',
    title: 'Agent가 스스로 가설을 세웁니다',
    body: (
      <>
        실패 패턴에서 개선 가설이 만들어집니다.
        <br />
        &ldquo;다음엔 이렇게 하면 통과한다&rdquo;는 문장을 사람이 아니라
        Agent가 씁니다.
      </>
    ),
  },
  {
    num: '03',
    tag: 'intervene',
    node: '개입',
    title: '가드레일 안에서 전략을 바꿉니다',
    body: (
      <>
        바뀐 전략은 허용된 범위 안에서만 실행됩니다.
        <br />
        범위 밖의 개입은 애초에 실행되지 않습니다.
      </>
    ),
  },
  {
    num: '04',
    tag: 'measure',
    node: '측정',
    title: '나아졌는지 숫자로 확인합니다',
    body: (
      <>
        이전 실행 대비 성능 델타를 계량합니다.
        <br />
        나아졌다는 느낌이 아니라, 측정된 차이만 인정합니다.
      </>
    ),
  },
  {
    num: '05',
    tag: 'consolidate',
    node: '축적',
    title: '검증된 학습만 남깁니다',
    body: (
      <>
        게이트를 통과한 학습만 장기 메모리에 저장됩니다.
        <br />
        다음 반복은 더 높은 지점에서 시작합니다.
      </>
    ),
  },
];

const EN: Stage[] = [
  {
    num: '01',
    tag: 'observe',
    node: 'Observe',
    title: 'Every run is recorded',
    body: (
      <>
        Every run leaves a structured trace.
        <br />
        What was tried, and where it got stuck — all of it becomes data.
      </>
    ),
  },
  {
    num: '02',
    tag: 'hypothesize',
    node: 'Hypothesize',
    title: 'The Agent writes its own hypotheses',
    body: (
      <>
        Improvement hypotheses come from failure patterns.
        <br />
        &ldquo;Next time, this gets through&rdquo; — written by the Agent, not
        a human.
      </>
    ),
  },
  {
    num: '03',
    tag: 'intervene',
    node: 'Intervene',
    title: 'Strategy changes, inside guardrails',
    body: (
      <>
        The changed strategy runs only within an allowed range.
        <br />
        Interventions outside it never execute in the first place.
      </>
    ),
  },
  {
    num: '04',
    tag: 'measure',
    node: 'Measure',
    title: 'Better is a number, not a feeling',
    body: (
      <>
        Performance deltas are quantified against prior runs.
        <br />
        Only a measured difference counts.
      </>
    ),
  },
  {
    num: '05',
    tag: 'consolidate',
    node: 'Consolidate',
    title: 'Only validated learning survives',
    body: (
      <>
        Learning that clears the gate is written to long-term memory.
        <br />
        The next repetition starts from higher ground.
      </>
    ),
  },
];

const CX = 260;
const CY = 240;
const R = 168;

const pt = (deg: number, r: number = R) => {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
};

function FlywheelVisual({ active, lang }: { active: number; lang: 'ko' | 'en' }) {
  const stages = lang === 'en' ? EN : KO;
  const hubTop = 'the flywheel';
  const hubBottom = lang === 'en' ? 'faster every turn' : '반복할수록 빨라집니다';

  return (
    <div className="rs-fly" data-stage={active}>
      <svg
        viewBox="-70 0 660 480"
        role="img"
        aria-label={
          lang === 'en'
            ? 'The method as a flywheel: observe, hypothesize, intervene, measure, consolidate — each stage lighting up in turn'
            : '플라이휠로 그린 방법론: 관찰, 가설, 개입, 측정, 축적이 차례로 켜지는 모습'
        }
        className="h-auto w-full"
      >
        <defs>
          <linearGradient id="rs-fly-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4A7C59" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8FBF9F" stopOpacity="0.25" />
          </linearGradient>
          <radialGradient id="rs-fly-glow">
            <stop offset="0%" stopColor="#8FBF9F" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#4A7C59" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={CX} cy={CY} r={R} fill="none" stroke="url(#rs-fly-ring)" strokeWidth="2" />
        {/* momentum dashes — duration drops per stage (CSS) */}
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke="#4A7C59"
          strokeOpacity="0.55"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="rs-fly-flow"
        />
        <circle
          cx={CX}
          cy={CY}
          r={R - 26}
          fill="none"
          stroke="#4A7C59"
          strokeOpacity="0.16"
          strokeWidth="1.5"
          className="rs-fly-flow"
          style={{ strokeDasharray: '3 13' }}
        />

        {stages.map((s, i) => {
          const deg = -90 + i * 72;
          const p = pt(deg);
          const lp = pt(deg, R + 40);
          const cos = Math.cos((deg * Math.PI) / 180);
          const anchor = Math.abs(cos) < 0.3 ? 'middle' : cos > 0 ? 'start' : 'end';
          const on = i === active;
          return (
            <g key={s.num} className={`rs-fly-node ${on ? 'on' : ''}`}>
              <circle className="rs-fly-halo" cx={p.x} cy={p.y} r={34} fill="url(#rs-fly-glow)" />
              <circle
                cx={p.x}
                cy={p.y}
                r={on ? 20 : 16}
                fill={on ? '#4A7C59' : '#F5F0E8'}
                stroke="#4A7C59"
                strokeOpacity={on ? 1 : 0.5}
                strokeWidth="1.5"
              />
              <text
                x={p.x}
                y={p.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={on ? '#FFFFFF' : '#4A7C59'}
                style={{ fontWeight: 800, fontSize: 12 }}
              >
                {s.num}
              </text>
              <text
                x={lp.x}
                y={lp.y - 6}
                textAnchor={anchor}
                fill={on ? '#1A1A1A' : '#4A4A6A'}
                opacity={on ? 1 : 0.7}
                style={{ fontWeight: 700, fontSize: 15 }}
              >
                {s.node}
              </text>
              <text
                x={lp.x}
                y={lp.y + 12}
                textAnchor={anchor}
                className="fill-ink-soft"
                opacity={on ? 1 : 0.6}
                style={{ fontWeight: 600, fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase' }}
              >
                {s.tag}
              </text>
            </g>
          );
        })}

        {/* hub — mirrors the active stage */}
        <circle cx={CX} cy={CY} r={60} fill="#4A7C59" fillOpacity="0.06" />
        <text
          x={CX}
          y={CY - 8}
          textAnchor="middle"
          className="fill-sage"
          style={{ fontWeight: 600, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' }}
        >
          {hubTop}
        </text>
        <text x={CX} y={CY + 14} textAnchor="middle" className="fill-ink" style={{ fontWeight: 700, fontSize: 13.5 }}>
          {hubBottom}
        </text>
      </svg>
    </div>
  );
}

export function MethodScene({ lang = 'ko' }: { lang?: 'ko' | 'en' }) {
  const stages = lang === 'en' ? EN : KO;
  const steps: SceneStep[] = stages.map((s) => ({
    kicker: `Step ${s.num} · ${s.tag}`,
    title: s.title,
    body: s.body,
  }));
  return (
    <StickyScene
      steps={steps}
      stickyBgClass="bg-ivory"
      ariaLabel={lang === 'en' ? 'The five-stage method' : '다섯 단계의 방법론'}
      visual={(active) => <FlywheelVisual active={active} lang={lang} />}
    />
  );
}
