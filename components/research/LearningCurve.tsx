'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Thesis visual — the self-acceleration curve, drawing itself.
 *
 * Capability vs. iterations. The curve bends upward without human pushes:
 * three marked points tell the story (told to improve → learns on its own →
 * evolves ahead). Draw-on-scroll via IntersectionObserver adding `.curve-on`
 * (CSS in globals.css); prefers-reduced-motion renders it fully drawn.
 */
export function LearningCurve({ lang = 'ko' }: { lang?: 'ko' | 'en' }) {
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

  const L =
    lang === 'en'
      ? {
          aria: 'A capability curve over iterations, bending upward on its own',
          x: 'iterations',
          y: 'capability',
          p1: 'told to improve',
          p2: 'learns on its own',
          p3: 'evolves ahead',
        }
      : {
          aria: '반복 횟수에 따라 스스로 꺾여 올라가는 역량 곡선',
          x: 'iterations',
          y: 'capability',
          p1: '개선을 지시받던 단계',
          p2: '스스로 배우는 단계',
          p3: '앞서 진화하는 단계',
        };

  return (
    <div ref={ref} className={`mx-auto w-full max-w-[640px] ${on ? 'curve-on' : ''}`}>
      <svg viewBox="0 0 640 360" role="img" aria-label={L.aria} className="h-auto w-full">
        <defs>
          <linearGradient id="curve-stroke" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#4A7C59" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#4A7C59" />
          </linearGradient>
          <linearGradient id="curve-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A7C59" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#4A7C59" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="curve-glow">
            <stop offset="0%" stopColor="#8FBF9F" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#4A7C59" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* grid */}
        {[70, 140, 210].map((y) => (
          <line key={y} x1="64" y1={y} x2="600" y2={y} stroke="#1E2D40" strokeOpacity="0.07" />
        ))}
        {/* axes */}
        <line x1="64" y1="20" x2="64" y2="300" stroke="#1E2D40" strokeOpacity="0.25" />
        <line x1="64" y1="300" x2="600" y2="300" stroke="#1E2D40" strokeOpacity="0.25" />
        <text x="600" y="326" textAnchor="end" className="fill-ink-soft" style={{ font: '600 12px Pretendard, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {L.x}
        </text>
        <text x="52" y="24" textAnchor="end" className="fill-ink-soft" style={{ font: '600 12px Pretendard, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {L.y}
        </text>

        {/* area under curve */}
        <path
          d="M 64 292 C 200 288, 320 276, 420 220 C 490 180, 545 110, 584 40 L 584 300 L 64 300 Z"
          fill="url(#curve-fill)"
          opacity={on ? 1 : 0}
          style={{ transition: 'opacity 1.2s ease 1.2s' }}
        />
        {/* the curve draws itself */}
        <path
          className="curve-draw"
          d="M 64 292 C 200 288, 320 276, 420 220 C 490 180, 545 110, 584 40"
          fill="none"
          stroke="url(#curve-stroke)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* ① told to improve */}
        <g className="curve-pt curve-pt-1">
          <circle cx="180" cy="286" r="5" fill="#1E2D40" fillOpacity="0.45" />
          <line x1="180" y1="278" x2="180" y2="248" stroke="#1E2D40" strokeOpacity="0.2" />
          <text x="180" y="236" textAnchor="middle" className="fill-ink-soft" style={{ font: '600 13px Pretendard, sans-serif' }}>
            {L.p1}
          </text>
        </g>

        {/* ② learns on its own — the inflection, glowing */}
        <g className="curve-pt curve-pt-2">
          <circle cx="420" cy="220" r="22" fill="url(#curve-glow)" />
          <circle cx="420" cy="220" r="6" fill="#4A7C59" />
          <line x1="420" y1="208" x2="420" y2="168" stroke="#4A7C59" strokeOpacity="0.3" />
          <text x="420" y="156" textAnchor="middle" className="fill-ink" style={{ font: '700 14px Pretendard, sans-serif' }}>
            {L.p2}
          </text>
        </g>

        {/* ③ evolves ahead — beyond the frame */}
        <g className="curve-pt curve-pt-3">
          <circle cx="584" cy="40" r="6" fill="none" stroke="#4A7C59" strokeWidth="2" strokeDasharray="3 3" />
          <text x="574" y="26" textAnchor="end" className="fill-sage" style={{ font: '700 14px Pretendard, sans-serif' }}>
            {L.p3}
          </text>
        </g>
      </svg>
    </div>
  );
}
