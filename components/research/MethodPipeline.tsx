/**
 * The Method — the self-acceleration loop drawn as a FLYWHEEL.
 * Five stages on a ring (observe → hypothesize → intervene → measure →
 * consolidate), dashes flowing clockwise: momentum, not a checklist.
 * Compact stage cards below carry the detail. Server component; the flow
 * animation reuses `.glyph-flow` (globals.css), off under reduced-motion.
 */

type Step = { num: string; tag: string; title: string; body: string };

const KO: Step[] = [
  { num: '01', tag: 'observe', title: '관찰', body: '모든 실행을 구조화된 트레이스로 기록합니다.' },
  { num: '02', tag: 'hypothesize', title: '가설', body: '실패 패턴에서 개선 가설을 Agent가 스스로 세웁니다.' },
  { num: '03', tag: 'intervene', title: '개입', body: '가드레일 안에서 전략을 바꿔 실행합니다.' },
  { num: '04', tag: 'measure', title: '측정', body: '이전 실행 대비 성능 델타를 계량합니다.' },
  { num: '05', tag: 'consolidate', title: '축적', body: '검증된 학습만 장기 메모리에 저장합니다.' },
];

const EN: Step[] = [
  { num: '01', tag: 'observe', title: 'Observe', body: 'Every run is logged as a structured trace.' },
  { num: '02', tag: 'hypothesize', title: 'Hypothesize', body: 'The Agent forms improvement hypotheses from failure patterns.' },
  { num: '03', tag: 'intervene', title: 'Intervene', body: 'Strategies change, inside guardrails.' },
  { num: '04', tag: 'measure', title: 'Measure', body: 'Performance deltas are quantified against prior runs.' },
  { num: '05', tag: 'consolidate', title: 'Consolidate', body: 'Only validated learning is written to long-term memory.' },
];

const CX = 260;
const CY = 240;
const R = 168;

const pt = (deg: number, r: number = R) => {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
};

export function MethodPipeline({ lang = 'ko' }: { lang?: 'ko' | 'en' }) {
  const steps = lang === 'en' ? EN : KO;
  const center = lang === 'en' ? ['the flywheel', 'faster every turn'] : ['the flywheel', '한 바퀴마다 빨라집니다'];

  return (
    <div>
      {/* ── flywheel ── */}
      <div className="mx-auto w-full max-w-[520px]">
        <svg
          viewBox="0 0 520 480"
          role="img"
          aria-label={
            lang === 'en'
              ? 'The method as a flywheel: observe, hypothesize, intervene, measure, consolidate, flowing back into observe'
              : '플라이휠로 그린 방법론: 관찰, 가설, 개입, 측정, 축적이 다시 관찰로 이어지는 순환'
          }
          className="h-auto w-full"
        >
          <defs>
            <linearGradient id="fly-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4A7C59" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8FBF9F" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* momentum: flowing dashes, clockwise */}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="url(#fly-ring)" strokeWidth="2" />
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="#4A7C59"
            strokeOpacity="0.55"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="glyph-flow"
            style={{ strokeDasharray: '7 17' }}
          />
          {/* inner momentum ring */}
          <circle
            cx={CX}
            cy={CY}
            r={R - 26}
            fill="none"
            stroke="#4A7C59"
            strokeOpacity="0.16"
            strokeWidth="1.5"
            className="glyph-flow"
            style={{ strokeDasharray: '3 13' }}
          />

          {/* stage nodes: 5 around the ring, starting top */}
          {steps.map((s, i) => {
            const deg = -90 + i * 72;
            const p = pt(deg);
            const lp = pt(deg, R + 40);
            const anchor = Math.abs(Math.cos((deg * Math.PI) / 180)) < 0.3 ? 'middle' : Math.cos((deg * Math.PI) / 180) > 0 ? 'start' : 'end';
            return (
              <g key={s.num}>
                <circle cx={p.x} cy={p.y} r={17} fill="#F5F0E8" stroke="#4A7C59" strokeOpacity="0.5" strokeWidth="1.5" />
                <text x={p.x} y={p.y + 1} textAnchor="middle" dominantBaseline="middle" className="fill-sage" style={{ font: '800 12px Pretendard, sans-serif' }}>
                  {s.num}
                </text>
                <text x={lp.x} y={lp.y - 6} textAnchor={anchor} className="fill-ink" style={{ font: '700 15px Pretendard, sans-serif' }}>
                  {s.title}
                </text>
                <text x={lp.x} y={lp.y + 12} textAnchor={anchor} className="fill-ink-soft" style={{ font: '600 10.5px Pretendard, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {s.tag}
                </text>
              </g>
            );
          })}

          {/* hub */}
          <circle cx={CX} cy={CY} r={58} fill="#4A7C59" fillOpacity="0.06" />
          <text x={CX} y={CY - 6} textAnchor="middle" className="fill-sage" style={{ font: '600 11px Pretendard, sans-serif', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            {center[0]}
          </text>
          <text x={CX} y={CY + 14} textAnchor="middle" className="fill-ink" style={{ font: '700 13.5px Pretendard, sans-serif' }}>
            {center[1]}
          </text>
        </svg>
      </div>

      {/* ── stage detail cards ── */}
      <ol className="mt-12 grid gap-5 md:grid-cols-5">
        {steps.map((s) => (
          <li key={s.num} className="rounded-2xl border border-line bg-white p-6">
            <div className="flex items-baseline gap-2.5">
              <span className="text-[26px] font-extrabold tracking-tight text-sage">{s.num}</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft/60">
                {s.tag}
              </span>
            </div>
            <h3 className="mt-3 text-[18px] font-bold text-ink">{s.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
