'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * About-page visual — BOTH founders' journeys, drawn as two paths that first
 * cross at Bain (where they met) and reconverge at DailyFit (Michael
 * 2026-07-04: the story is the two careers building up to this company, not
 * one founder's line). Same `.curve-draw` / `.curve-pt` CSS as the research
 * LearningCurve; reduced-motion renders it fully drawn.
 *
 * Careers (verified sources: D.DAY application draft · business cards):
 * 서영우 Boston University → Bain → PYLER → DailyFit
 * 김현진 고려대학교 → Bain → UVA MBA → DailyFit
 */

const SAGE = '#4A7C59';
const NAVY = '#1E2D40';

type Lang = 'ko' | 'en';

type Stop = {
  x: number;
  y: number;
  label: string;
  sub: string;
  cls: string;
};

// Youngwoo's path (sage) — bottom-left start.
const YW_STOPS: Stop[] = [
  { x: 74, y: 240, label: 'Boston University', sub: '경영학', cls: 'curve-pt-1' },
  { x: 412, y: 152, label: 'PYLER', sub: 'Corporate Development', cls: 'curve-pt-2' },
];

// Hyunjin's path (navy) — top-left start.
const HJ_STOPS: Stop[] = [
  { x: 74, y: 118, label: '고려대학교', sub: '경영학', cls: 'curve-pt-1' },
  { x: 412, y: 226, label: 'UVA', sub: 'MBA', cls: 'curve-pt-2' },
];

// English mirror — same coords/cls, translated label+sub only.
const YW_STOPS_EN: Stop[] = [
  { x: 74, y: 240, label: 'Boston University', sub: 'Business', cls: 'curve-pt-1' },
  { x: 412, y: 152, label: 'PYLER', sub: 'Corporate Development', cls: 'curve-pt-2' },
];

const HJ_STOPS_EN: Stop[] = [
  { x: 74, y: 118, label: 'Korea University', sub: 'Business', cls: 'curve-pt-1' },
  { x: 412, y: 226, label: 'UVA', sub: 'MBA', cls: 'curve-pt-2' },
];

// Both founders' stops share one marker layer — combine once, not per render.
const ALL_STOPS: Stop[] = [...YW_STOPS, ...HJ_STOPS];
const ALL_STOPS_EN: Stop[] = [...YW_STOPS_EN, ...HJ_STOPS_EN];

// Language-specific copy for the fixed nodes/legend.
const COPY = {
  ko: {
    ariaLabel:
      '두 창업자의 여정: 서영우는 Boston University와 Bain, PYLER를 거치고, 김현진은 고려대학교와 Bain, UVA MBA를 거쳐 DailyFit에서 다시 만난 모습',
    bainMet: '여기서 처음 만났습니다',
    legendYw: '서영우',
    legendHj: '김현진',
  },
  en: {
    ariaLabel:
      "The two founders' journeys: Youngwoo through Boston University, Bain, and PYLER; Hyunjin through Korea University, Bain, and UVA MBA, reconverging at DailyFit",
    bainMet: 'Where they first met',
    legendYw: 'Youngwoo',
    legendHj: 'Hyunjin',
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
    <div ref={ref} className={`mx-auto w-full max-w-[680px] ${on ? 'curve-on' : ''}`}>
      <svg
        viewBox="0 0 660 320"
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

        {/* Youngwoo: BU → Bain → PYLER → DailyFit */}
        <path
          className="curve-draw"
          d="M 74 240 C 140 230, 190 200, 248 184 C 320 165, 360 162, 412 152 C 478 139, 528 112, 576 84"
          fill="none"
          stroke={SAGE}
          strokeOpacity="0.55"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="1 0"
        />
        {/* Hyunjin: 고려대 → Bain → UVA → DailyFit */}
        <path
          className="curve-draw"
          d="M 74 118 C 140 128, 192 166, 248 184 C 316 206, 362 228, 412 226 C 476 223, 530 130, 576 84"
          fill="none"
          stroke={NAVY}
          strokeOpacity="0.4"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="1 0"
        />

        {/* individual stops */}
        {stops.map((s) => (
          <g key={s.label} className={`curve-pt ${s.cls}`}>
            <circle cx={s.x} cy={s.y} r={5} fill="#F5F0E8" stroke={SAGE} strokeWidth={2} />
            <text
              x={s.x}
              y={s.y - 18}
              textAnchor="middle"
              className="fill-ink"
              style={{ fontWeight: 700, fontSize: 14 }}
            >
              {s.label}
            </text>
            <text
              x={s.x}
              y={s.y + 24}
              textAnchor="middle"
              className="fill-ink-soft"
              style={{ fontWeight: 600, fontSize: 11, letterSpacing: '0.06em' }}
            >
              {s.sub}
            </text>
          </g>
        ))}

        {/* Bain — where the two paths first cross */}
        <g className="curve-pt curve-pt-1">
          <circle cx={248} cy={184} r={6} fill="#F5F0E8" stroke={SAGE} strokeWidth={2.5} />
          <text x={248} y={158} textAnchor="middle" className="fill-ink" style={{ fontWeight: 700, fontSize: 14 }}>
            Bain &amp; Company
          </text>
          <text x={248} y={212} textAnchor="middle" className="fill-ink-soft" style={{ fontWeight: 600, fontSize: 11, letterSpacing: '0.06em' }}>
            {copy.bainMet}
          </text>
        </g>

        {/* DailyFit — where they reconverge */}
        <g className="curve-pt curve-pt-3">
          <circle cx={576} cy={84} r={24} fill="url(#journey-glow)" />
          <circle cx={576} cy={84} r={6.5} fill={SAGE} />
          <text x={576} y={58} textAnchor="middle" className="fill-sage" style={{ fontWeight: 800, fontSize: 15 }}>
            DailyFit
          </text>
          <text x={576} y={116} textAnchor="middle" className="fill-ink-soft" style={{ fontWeight: 600, fontSize: 11, letterSpacing: '0.06em' }}>
            Co-founders
          </text>
        </g>

        {/* legend */}
        <g aria-hidden="true">
          <circle cx={78} cy={296} r={4} fill={SAGE} />
          <text x={90} y={300} className="fill-ink-soft" style={{ fontWeight: 600, fontSize: 11.5 }}>
            {copy.legendYw}
          </text>
          <circle cx={152} cy={296} r={4} fill={NAVY} fillOpacity={0.55} />
          <text x={164} y={300} className="fill-ink-soft" style={{ fontWeight: 600, fontSize: 11.5 }}>
            {copy.legendHj}
          </text>
        </g>
      </svg>
    </div>
  );
}
