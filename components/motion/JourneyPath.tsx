'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * About-page visual — the founder journey as a rising path that draws itself
 * on scroll (same `.curve-draw` / `.curve-pt` CSS as the research
 * LearningCurve). Boston University → Bain → PYLER → DailyFit; the current
 * chapter glows. Reduced-motion renders it fully drawn.
 */
const STOPS = [
  { x: 70, y: 240, label: 'Boston University', sub: '경영학', cls: 'curve-pt-1' },
  { x: 240, y: 210, label: 'Bain & Company', sub: '전략 컨설팅', cls: 'curve-pt-1' },
  { x: 410, y: 160, label: 'PYLER', sub: 'Corporate Development', cls: 'curve-pt-2' },
  { x: 570, y: 78, label: 'DailyFit', sub: 'Founder · CEO', cls: 'curve-pt-3' },
] as const;

export function JourneyPath() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`mx-auto w-full max-w-[640px] ${on ? 'curve-on' : ''}`}>
      <svg
        viewBox="0 0 640 300"
        role="img"
        aria-label="창업자 여정: Boston University에서 Bain, PYLER를 거쳐 DailyFit까지"
        className="h-auto w-full"
      >
        <defs>
          <radialGradient id="journey-glow">
            <stop offset="0%" stopColor="#8FBF9F" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#4A7C59" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* the path draws itself */}
        <path
          className="curve-draw"
          d="M 70 240 C 150 232, 180 218, 240 210 C 320 200, 360 185, 410 160 C 480 126, 520 105, 570 78"
          fill="none"
          stroke="#4A7C59"
          strokeOpacity="0.5"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="1 0"
        />

        {STOPS.map((s, i) => {
          const last = i === STOPS.length - 1;
          return (
            <g key={s.label} className={`curve-pt ${s.cls}`}>
              {last ? <circle cx={s.x} cy={s.y} r={24} fill="url(#journey-glow)" /> : null}
              <circle
                cx={s.x}
                cy={s.y}
                r={last ? 6.5 : 5}
                fill={last ? '#4A7C59' : '#F5F0E8'}
                stroke="#4A7C59"
                strokeWidth={last ? 0 : 2}
              />
              <text
                x={s.x}
                y={s.y - 20}
                textAnchor="middle"
                className={last ? 'fill-sage' : 'fill-ink'}
                style={{ font: `${last ? 800 : 700} 14px Pretendard, sans-serif` }}
              >
                {s.label}
              </text>
              <text
                x={s.x}
                y={s.y + 26}
                textAnchor="middle"
                className="fill-ink-soft"
                style={{ font: '600 11px Pretendard, sans-serif', letterSpacing: '0.06em' }}
              >
                {s.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
