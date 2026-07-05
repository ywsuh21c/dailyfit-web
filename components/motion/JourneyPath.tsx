'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * About-page visual — BOTH founders' journeys, drawn as two paths that meet
 * at Bain (where they met) and reconverge at DailyFit.
 *
 * Design rule (Michael 2026-07-05): both lines climb MONOTONICALLY — a career
 * chart that dips reads as a career going downhill. Time flows left→right,
 * altitude only ever rises; the two lanes touch at Bain, then rise together
 * to DailyFit. Youngwoo's labels sit BELOW his line, Hyunjin's ABOVE his, so
 * five stops per lane never collide.
 *
 * Careers (verified: Michael's context + 2026-07-05 additions):
 * 서영우 Boston University → Fudan University(석사) → Bain → PYLER → DailyFit
 * 김현진 고려대학교 → EY-Parthenon → Bain → UVA MBA → DailyFit
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
  /** which side of the dot the label stack sits on. 'below-right' hangs the
   *  stack start-anchored to the dot's lower right — used where a centered
   *  below-label would sit in the incoming curve's band (Fudan). */
  side: 'above' | 'below' | 'below-right';
};

// Youngwoo's lane (sage) — starts lower, labels below the line.
const YW_STOPS: Stop[] = [
  { x: 72, y: 288, label: 'Boston University', sub: '경영학', cls: 'curve-pt-1', side: 'below' },
  { x: 185, y: 246, label: 'Fudan University', sub: '금융학 석사', cls: 'curve-pt-1', side: 'below-right' },
  { x: 470, y: 152, label: 'PYLER', sub: 'Corporate Development', cls: 'curve-pt-2', side: 'below' },
];

// Hyunjin's lane (navy) — starts higher, labels above the line.
const HJ_STOPS: Stop[] = [
  { x: 72, y: 232, label: '고려대학교', sub: '경영학', cls: 'curve-pt-1', side: 'above' },
  { x: 185, y: 214, label: 'EY-Parthenon', sub: '컨설팅', cls: 'curve-pt-1', side: 'above' },
  { x: 470, y: 104, label: 'UVA', sub: 'MBA', cls: 'curve-pt-2', side: 'above' },
];

// English mirror — same coords/cls/side, translated subs only.
const YW_STOPS_EN: Stop[] = [
  { x: 72, y: 288, label: 'Boston University', sub: 'Business', cls: 'curve-pt-1', side: 'below' },
  { x: 185, y: 246, label: 'Fudan University', sub: 'MS in Finance', cls: 'curve-pt-1', side: 'below-right' },
  { x: 470, y: 152, label: 'PYLER', sub: 'Corporate Development', cls: 'curve-pt-2', side: 'below' },
];

const HJ_STOPS_EN: Stop[] = [
  { x: 72, y: 232, label: 'Korea University', sub: 'Business', cls: 'curve-pt-1', side: 'above' },
  { x: 185, y: 214, label: 'EY-Parthenon', sub: 'Consulting', cls: 'curve-pt-1', side: 'above' },
  { x: 470, y: 104, label: 'UVA', sub: 'MBA', cls: 'curve-pt-2', side: 'above' },
];

// Both founders' stops share one marker layer — combine once, not per render.
const ALL_STOPS: Stop[] = [...YW_STOPS, ...HJ_STOPS];
const ALL_STOPS_EN: Stop[] = [...YW_STOPS_EN, ...HJ_STOPS_EN];

// Language-specific copy for the fixed nodes/legend.
const COPY = {
  ko: {
    ariaLabel:
      '두 창업자의 여정: 서영우는 Boston University와 Fudan University, Bain, PYLER를 거치고, 김현진은 고려대학교와 EY-Parthenon, Bain, UVA MBA를 거쳐 DailyFit에서 다시 만나 함께 올라가는 모습',
    bainMet: '여기서 처음 만났습니다',
    legendYw: '서영우',
    legendHj: '김현진',
  },
  en: {
    ariaLabel:
      "The two founders' journeys: Youngwoo through Boston University, Fudan University, Bain, and PYLER; Hyunjin through Korea University, EY-Parthenon, Bain, and UVA MBA, reconverging and rising together at DailyFit",
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
    <div ref={ref} className={`mx-auto w-full max-w-[720px] ${on ? 'curve-on' : ''}`}>
      <svg
        viewBox="0 0 680 350"
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
        {/* Hyunjin: 고려대 → EY-Parthenon → Bain → UVA → DailyFit (always rising) */}
        <path
          className="curve-draw"
          d="M 72 232 C 110 226, 148 220, 185 214 C 230 207, 278 202, 320 198 C 372 192, 430 148, 470 104 C 505 66, 560 65, 610 64"
          fill="none"
          stroke={NAVY}
          strokeOpacity="0.4"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* individual stops — label stack flips per lane so nothing collides */}
        {stops.map((s) => (
          <g key={s.label} className={`curve-pt ${s.cls}`}>
            <circle cx={s.x} cy={s.y} r={5} fill="#F5F0E8" stroke={s.side === 'above' ? NAVY : SAGE} strokeOpacity={s.side === 'above' ? 0.55 : 1} strokeWidth={2} />
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

        {/* Bain — where the two lanes first touch */}
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
            Co-founders
          </text>
        </g>

        {/* legend */}
        <g aria-hidden="true">
          <circle cx={78} cy={334} r={4} fill={SAGE} />
          <text x={90} y={338} className="fill-ink-soft" style={{ fontWeight: 600, fontSize: 11.5 }}>
            {copy.legendYw}
          </text>
          <circle cx={152} cy={334} r={4} fill={NAVY} fillOpacity={0.55} />
          <text x={164} y={338} className="fill-ink-soft" style={{ fontWeight: 600, fontSize: 11.5 }}>
            {copy.legendHj}
          </text>
        </g>
      </svg>
    </div>
  );
}
