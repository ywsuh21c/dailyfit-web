'use client';

import { StickyScene, type SceneStep } from './StickyScene';

/**
 * Thesis scene — the loop, closing itself. Three pinned stages:
 *
 *   stage 0  the ring has a GAP; a human figure bridges it (turns the loop)
 *   stage 1  the feedback arc draws in and closes the ring; the human fades
 *   stage 2  the loop runs twice as many pulses, faster; the human returns
 *            on the outside as an approver (✓) — direction → approval
 *
 * The metaphor is literal: self-acceleration is the moment the loop no
 * longer needs a hand. Stage transitions are CSS-only (`.rs-evo[data-stage]`
 * in globals.css); the pulse orbits via a CSS rotation whose duration drops
 * per stage. Static under prefers-reduced-motion.
 */

const KO: SceneStep[] = [
  {
    kicker: 'Stage 0 · directed',
    title: '사람이 루프를 돌리던 시대',
    body: (
      <>
        여느 자동화는 결과에서 멈춥니다.
        <br />
        문제를 발견하는 것도, 고치라고 지시하는 것도 사람의 일이었습니다.
        <br />
        루프를 돌리는 손이 언제나 필요했습니다.
      </>
    ),
  },
  {
    kicker: 'Stage 1 · self-learning',
    title: '결과가 다음 실행을 바꿉니다',
    body: (
      <>
        실행의 결과가 루프를 타고 되돌아옵니다.
        <br />
        장애물의 패턴은 전략이 되고, 그 학습은 다음 반복에 스스로 적용됩니다.
        <br />
        쓸수록 빨라지는 이유입니다.
      </>
    ),
  },
  {
    kicker: 'Stage 2 · self-accelerating',
    title: (
      <>
        지시받기 전에,
        <br />
        이미 진화해 있는 Agent
      </>
    ),
    body: (
      <>
        사람의 역할은 지시에서 승인으로 옮겨갑니다.
        <br />
        개선은 Agent의 일이 되고, 속도는 반복이 만듭니다.
        <br />
        우리가 연구하는 지점이 여기입니다.
      </>
    ),
  },
];

const EN: SceneStep[] = [
  {
    kicker: 'Stage 0 · directed',
    title: 'When humans turned the loop',
    body: (
      <>
        Ordinary automation stops at the result.
        <br />
        Finding the problem — and asking for the fix — was human work.
        <br />
        The loop always needed a hand to turn it.
      </>
    ),
  },
  {
    kicker: 'Stage 1 · self-learning',
    title: 'The result changes the next run',
    body: (
      <>
        Results feed back into the loop.
        <br />
        Obstacle patterns become strategy, and that learning applies itself to
        the next repetition.
        <br />
        That is why it gets faster with use.
      </>
    ),
  },
  {
    kicker: 'Stage 2 · self-accelerating',
    title: (
      <>
        An Agent that evolves
        <br />
        before it&rsquo;s told to
      </>
    ),
    body: (
      <>
        The human role shifts from directing to approving.
        <br />
        Improvement becomes the Agent&rsquo;s job; speed comes from repetition.
        <br />
        This is the point we study.
      </>
    ),
  },
];

/* ring geometry — center (260,250), R 150, gap on the left (168°–192°) */
const NODES = [
  { deg: -60, label: 'run' },
  { deg: 30, label: 'result' },
  { deg: 120, label: 'learn' },
  { deg: 210, label: 'adapt' },
] as const;

const pt = (deg: number, r: number) => {
  const rad = (deg * Math.PI) / 180;
  return { x: 260 + r * Math.cos(rad), y: 250 + r * Math.sin(rad) };
};

function EvolutionVisual({ stage, lang }: { stage: number; lang: 'ko' | 'en' }) {
  const centerLabel =
    lang === 'en'
      ? ['a human turns the loop', 'results feed back in', 'the loop turns itself']
      : ['사람이 루프를 돌립니다', '결과가 루프로 돌아옵니다', '루프가 스스로 돕니다'];
  const approveLabel = lang === 'en' ? 'human: approve' : '사람은 승인만';

  return (
    <div className="rs-evo" data-stage={stage}>
      <svg
        viewBox="0 0 520 500"
        role="img"
        aria-label={
          lang === 'en'
            ? 'A loop diagram closing itself: first turned by a human, then closed by feedback, finally accelerating on its own while the human approves'
            : '루프 다이어그램: 처음엔 사람이 돌리고, 피드백이 루프를 닫고, 마지막엔 사람의 승인 아래 스스로 가속하는 모습'
        }
        className="h-auto w-full"
      >
        <defs>
          <radialGradient id="evo-glow">
            <stop offset="0%" stopColor="#8FBF9F" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4A7C59" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="evo-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4A7C59" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8FBF9F" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* main ring — open on the left; the gap is the whole story */}
        <path
          d="M 113.3 218.8 A 150 150 0 1 1 113.3 281.2"
          fill="none"
          stroke="url(#evo-ring)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* the closer: feedback arc that draws in on stage ≥ 1 */}
        <path
          className="rs-evo-feedback"
          d="M 113.3 281.2 A 150 150 0 0 1 113.3 218.8"
          fill="none"
          stroke="#4A7C59"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* stage 0 — the human hand that turns the loop */}
        <g className="rs-evo-layer rs-evo-s0">
          <circle cx="46" cy="234" r="9" fill="none" stroke="#1E2D40" strokeWidth="2" />
          <path d="M 32 264 C 32 250, 60 250, 60 264" fill="none" stroke="#1E2D40" strokeWidth="2" strokeLinecap="round" />
          <line x1="68" y1="250" x2="96" y2="250" stroke="#1E2D40" strokeOpacity="0.6" strokeWidth="2" strokeDasharray="3 5" strokeLinecap="round" />
          <polyline points="90,244 98,250 90,256" fill="none" stroke="#1E2D40" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* stage 2 — outer momentum ring + the approver */}
        <g className="rs-evo-layer rs-evo-s2">
          <circle
            cx="260"
            cy="250"
            r="176"
            fill="none"
            stroke="#4A7C59"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            className="rs-fly-flow"
          />
          <g>
            <circle cx="474" cy="118" r="8" fill="none" stroke="#4A7C59" strokeWidth="2" />
            <path d="M 462 144 C 462 132, 486 132, 486 144" fill="none" stroke="#4A7C59" strokeWidth="2" strokeLinecap="round" />
            <polyline points="466,158 472,164 484,150" fill="none" stroke="#4A7C59" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="474" y="184" textAnchor="middle" className="fill-sage" style={{ fontWeight: 700, fontSize: 12 }}>
              {approveLabel}
            </text>
          </g>
        </g>

        {/* nodes + labels */}
        {NODES.map((n) => {
          const p = pt(n.deg, 150);
          const lp = pt(n.deg, 187);
          const anchor = Math.cos((n.deg * Math.PI) / 180) > 0.25 ? 'start' : Math.cos((n.deg * Math.PI) / 180) < -0.25 ? 'end' : 'middle';
          return (
            <g key={n.label}>
              <circle cx={p.x} cy={p.y} r={4.5} fill="#4A7C59" />
              <text
                x={lp.x}
                y={lp.y}
                textAnchor={anchor}
                dominantBaseline="middle"
                className="fill-ink"
                style={{
                  fontWeight: 800, fontSize: 14,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  stroke: '#F4F1EC', strokeWidth: 6, paintOrder: 'stroke',
                }}
              >
                {n.label}
              </text>
            </g>
          );
        })}

        {/* orbiting pulse (speed set per stage in CSS) */}
        <g className="rs-evo-orbit">
          <circle cx="260" cy="100" r="22" fill="url(#evo-glow)" />
          <circle cx="260" cy="100" r="6" fill="#4A7C59" />
        </g>
        {/* second pulse joins at stage 2 */}
        <g className="rs-evo-layer rs-evo-s2">
          <g className="rs-evo-orbit-2">
            <circle cx="260" cy="100" r="18" fill="url(#evo-glow)" />
            <circle cx="260" cy="100" r="5" fill="#4A7C59" />
          </g>
        </g>

        {/* center label crossfade */}
        {centerLabel.map((label, i) => (
          <g key={i} className={`rs-evo-layer rs-evo-s${i}`}>
            <text
              x="260"
              y="242"
              textAnchor="middle"
              className="fill-ink-soft"
              style={{ fontWeight: 600, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' }}
            >
              the loop
            </text>
            <text x="260" y="268" textAnchor="middle" className="fill-ink" style={{ fontWeight: 700, fontSize: 15.5 }}>
              {label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function EvolutionScene({ lang = 'ko' }: { lang?: 'ko' | 'en' }) {
  const steps = lang === 'en' ? EN : KO;
  return (
    <StickyScene
      steps={steps}
      stickyBgClass="bg-surface"
      ariaLabel={lang === 'en' ? 'How self-acceleration works, in three stages' : '자기가속의 3단계'}
      visual={(active) => <EvolutionVisual stage={active} lang={lang} />}
    />
  );
}
