'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * About-page visual — the founder's journey, drawn as one path rising to DailyFit.
 *
 * Design rule (Michael 2026-07-05): the line climbs MONOTONICALLY — a career
 * chart that dips reads as a career going downhill. Time flows left→right,
 * altitude only ever rises. Labels sit BELOW the line so the stops never
 * collide with the curve.
 *
 * 2026-09-02: 두 번째 레인(김현진)을 걷어냈다 — 1인 체제(2026-08-20)라
 * 소개 페이지에서 전부 뺀다는 영우 확정. 남은 것은 «지우고 남은 반쪽»이 아니라
 * 한 사람의 여정으로 다시 읽히도록, Bain 의 부제("여기서 처음 만났습니다")와
 * 정상 노드의 "Co-founders" 도 함께 고쳤고 2인용 범례는 통째로 없앴다.
 *
 * Careers (verified: Michael's context + 2026-07-05 additions):
 * 서영우 Boston University → Fudan University(석사) → Bain → PYLER → DailyFit
 */

const SAGE = '#4A7C59';

type Lang = 'ko' | 'en';

type Stop = {
  x: number;
  y: number;
  label: string;
  sub: string;
  cls: string;
  /** which side of the dot the label stack sits on. 'below-right' hangs the
   *  stack start-anchored to the dot's lower right — used where a centered
   *  below-label would sit in the incoming curve's band (Fudan). */
  side: 'above' | 'below' | 'below-right';
};

// The founder's lane (sage) — labels below the line.
const YW_STOPS: Stop[] = [
  { x: 72, y: 288, label: 'Boston University', sub: '경영학', cls: 'curve-pt-1', side: 'below' },
  { x: 185, y: 246, label: 'Fudan University', sub: '금융학 석사', cls: 'curve-pt-1', side: 'below-right' },
  { x: 470, y: 152, label: 'PYLER', sub: 'Corporate Development', cls: 'curve-pt-2', side: 'below' },
];

// English mirror — same coords/cls/side, translated subs only.
const YW_STOPS_EN: Stop[] = [
  { x: 72, y: 288, label: 'Boston University', sub: 'Business', cls: 'curve-pt-1', side: 'below' },
  { x: 185, y: 246, label: 'Fudan University', sub: 'MS in Finance', cls: 'curve-pt-1', side: 'below-right' },
  { x: 470, y: 152, label: 'PYLER', sub: 'Corporate Development', cls: 'curve-pt-2', side: 'below' },
];

const ALL_STOPS: Stop[] = YW_STOPS;
const ALL_STOPS_EN: Stop[] = YW_STOPS_EN;

// Language-specific copy for the fixed nodes/legend.
const COPY = {
  ko: {
    ariaLabel:
      '창업자의 여정: 서영우가 Boston University와 Fudan University, Bain, PYLER를 거쳐 DailyFit으로 올라가는 모습',
    bainMet: '컨설팅',
  },
  en: {
    ariaLabel:
      "The founder's journey: Youngwoo through Boston University, Fudan University, Bain, and PYLER, rising to DailyFit",
    bainMet: 'Consulting',
  },
} as const;

export function JourneyPath({ lang = 'ko' }: { lang?: Lang }) {
  const stops = lang === 'en' ? ALL_STOPS_EN : ALL_STOPS;
  const copy = lang === 'en' ? COPY.en : COPY.ko;
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
    <div ref={ref} className={`mx-auto w-full max-w-[720px] ${on ? 'curve-on' : ''}`}>
      <svg
        viewBox="0 0 680 336"
        role="img"
        aria-label={copy.ariaLabel}
        className="h-auto w-full"
      >
        <defs>
          <radialGradient id="journey-glow">
            <stop offset="0%" stopColor="#8FBF9F" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#4A7C59" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Youngwoo: BU → Fudan → Bain → PYLER → DailyFit (always rising) */}
        <path
          className="curve-draw"
          d="M 72 288 C 112 274, 148 258, 185 246 C 232 232, 278 214, 320 198 C 370 179, 424 166, 470 152 C 518 138, 570 100, 610 64"
          fill="none"
          stroke={SAGE}
          strokeOpacity="0.55"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* individual stops — labels hang below the line */}
        {stops.map((s) => (
          <g key={s.label} className={`curve-pt ${s.cls}`}>
            <circle cx={s.x} cy={s.y} r={5} fill="#F5F0E8" stroke={SAGE} strokeWidth={2} />
            <text
              x={s.side === 'below-right' ? s.x + 14 : s.x}
              y={s.side === 'above' ? s.y - 30 : s.y + 24}
              textAnchor={s.side === 'below-right' ? 'start' : 'middle'}
              className="fill-ink"
              style={{ fontWeight: 700, fontSize: 14 }}
            >
              {s.label}
            </text>
            <text
              x={s.side === 'below-right' ? s.x + 14 : s.x}
              y={s.side === 'above' ? s.y - 14 : s.y + 40}
              textAnchor={s.side === 'below-right' ? 'start' : 'middle'}
              className="fill-ink-soft"
              style={{ fontWeight: 600, fontSize: 11, letterSpacing: '0.06em' }}
            >
              {s.sub}
            </text>
          </g>
        ))}

        {/* Bain */}
        <g className="curve-pt curve-pt-1">
          <circle cx={320} cy={198} r={6} fill="#F5F0E8" stroke={SAGE} strokeWidth={2.5} />
          <text x={320} y={172} textAnchor="middle" className="fill-ink" style={{ fontWeight: 700, fontSize: 14 }}>
            Bain &amp; Company
          </text>
          <text x={320} y={231} textAnchor="middle" className="fill-ink-soft" style={{ fontWeight: 600, fontSize: 11, letterSpacing: '0.06em' }}>
            {copy.bainMet}
          </text>
        </g>

        {/* DailyFit — the shared summit */}
        <g className="curve-pt curve-pt-3">
          <circle cx={610} cy={64} r={24} fill="url(#journey-glow)" />
          <circle cx={610} cy={64} r={6.5} fill={SAGE} />
          <text x={610} y={38} textAnchor="middle" className="fill-sage" style={{ fontWeight: 800, fontSize: 15 }}>
            DailyFit
          </text>
          <text x={610} y={96} textAnchor="middle" className="fill-ink-soft" style={{ fontWeight: 600, fontSize: 11, letterSpacing: '0.06em' }}>
            Founder &amp; CEO
          </text>
        </g>
      </svg>
    </div>
  );
}
