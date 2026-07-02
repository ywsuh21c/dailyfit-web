/**
 * How-we-work visual — the operating model as an orbit: humans at the center
 * (direction + final call), four division Agents orbiting (execution).
 * Flowing dashes on the orbit ring; halos pulse. Pure SVG + CSS; server
 * component; motion off under reduced-motion.
 */
const CX = 250;
const CY = 220;
const R = 148;

const AGENTS = [
  { deg: -90, label: 'Strategy' },
  { deg: 0, label: 'Product' },
  { deg: 90, label: 'Technology' },
  { deg: 180, label: 'Finance' },
] as const;

const pt = (deg: number, r: number = R) => {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
};

export function OrgOrbit() {
  return (
    <div className="mx-auto w-full max-w-[500px]">
      <svg
        viewBox="0 0 500 440"
        role="img"
        aria-label="운영 구조: 중심의 사람이 방향과 판단을, 궤도의 네 Agent(전략·제품·기술·재무)가 실행을 맡는 모습"
        className="h-auto w-full"
      >
        <defs>
          <radialGradient id="org-core">
            <stop offset="0%" stopColor="#8FBF9F" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4A7C59" stopOpacity="0.06" />
          </radialGradient>
        </defs>

        {/* orbit with flowing execution */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#4A7C59" strokeOpacity="0.25" strokeWidth="1.5" />
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke="#4A7C59"
          strokeOpacity="0.5"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="glyph-flow"
          style={{ strokeDasharray: '5 14' }}
        />

        {/* spokes: direction flows out, results flow back */}
        {AGENTS.map((a) => {
          const p = pt(a.deg, R - 26);
          const q = pt(a.deg, 64);
          return (
            <line
              key={`spoke-${a.label}`}
              x1={q.x}
              y1={q.y}
              x2={p.x}
              y2={p.y}
              stroke="#4A7C59"
              strokeOpacity="0.18"
              strokeWidth="1.2"
              strokeDasharray="2 5"
            />
          );
        })}

        {/* human core */}
        <circle cx={CX} cy={CY} r={58} fill="url(#org-core)" stroke="#4A7C59" strokeOpacity="0.45" strokeWidth="1.5" />
        <text x={CX} y={CY - 8} textAnchor="middle" className="fill-ink" style={{ font: '800 15px Pretendard, sans-serif' }}>
          사람
        </text>
        <text x={CX} y={CY + 12} textAnchor="middle" className="fill-ink-soft" style={{ font: '600 11px Pretendard, sans-serif', letterSpacing: '0.06em' }}>
          방향 · 최종 판단
        </text>

        {/* agent nodes */}
        {AGENTS.map((a) => {
          const p = pt(a.deg);
          const lp = pt(a.deg, R + 34);
          return (
            <g key={a.label}>
              <circle cx={p.x} cy={p.y} r={12} fill="#4A7C59" fillOpacity="0.14" className="glyph-pulse" />
              <circle cx={p.x} cy={p.y} r={5} fill="#4A7C59" />
              <text
                x={lp.x}
                y={lp.y - 2}
                textAnchor="middle"
                className="fill-ink"
                style={{ font: '700 13px Pretendard, sans-serif' }}
              >
                {a.label}
              </text>
              <text
                x={lp.x}
                y={lp.y + 14}
                textAnchor="middle"
                className="fill-ink-soft"
                style={{ font: '600 10px Pretendard, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}
              >
                agent
              </text>
            </g>
          );
        })}

        <text x={CX} y={430} textAnchor="middle" className="fill-ink-soft" style={{ font: '600 11.5px Pretendard, sans-serif', letterSpacing: '0.12em' }}>
          실행은 Agent가 · 판단은 사람이
        </text>
      </svg>
    </div>
  );
}
