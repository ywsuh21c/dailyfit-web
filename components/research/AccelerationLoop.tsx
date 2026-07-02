'use client';

import { useEffect, useRef } from 'react';

/**
 * Research hero centerpiece — the self-accelerating loop, visible.
 *
 * A pulse orbits the scientific cycle (hypothesize → experiment → iterate →
 * theorize) and gets visibly FASTER each lap: self-acceleration itself, drawn.
 * After MAX_LAPS the loop resets and builds up again.
 *
 * Implementation notes (matches AgentConsole idiom):
 * - requestAnimationFrame writes straight to SVG attributes via refs — zero
 *   React re-renders at 60fps.
 * - Runs only while on screen (IntersectionObserver).
 * - prefers-reduced-motion: no rAF; renders as a static diagram.
 * - Node labels stay English mono (science vocabulary, same on both locales —
 *   matches the site's English eyebrow convention). Caption follows `lang`.
 */

const CX = 210;
const CY = 210;
const R = 158;
const MAX_LAPS = 6; // laps per build-up before the loop resets
const BASE_SPEED = 0.055; // deg/ms — lap 1 ≈ 6.5s
const LAP_ACCEL = 1.3; // speed multiplier applied each lap
const TRAIL_N = 7;

const NODES = [
  { angle: -90, label: 'hypothesize' },
  { angle: 0, label: 'experiment' },
  { angle: 90, label: 'iterate' },
  { angle: 180, label: 'theorize' },
] as const;

const pt = (deg: number, r: number = R) => {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
};

// Label anchor: push outward from the ring, biased by which side we're on.
const labelPos = (deg: number) => pt(deg, R + 34);

export function AccelerationLoop({ lang = 'ko' }: { lang?: 'ko' | 'en' }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const trailRefs = useRef<Array<SVGCircleElement | null>>([]);
  const haloRefs = useRef<Array<SVGCircleElement | null>>([]);
  const dashRef = useRef<SVGCircleElement>(null);
  const cycleTextRef = useRef<SVGTextElement>(null);
  const speedTextRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = rootRef.current;
    if (!el) return;

    let raf = 0;
    let last = 0;
    let angle = -90; // start on "hypothesize"
    let travelled = 0; // degrees within current lap
    let lap = 0;
    let running = false;

    const frame = (now: number) => {
      if (!running) return;
      const dt = last === 0 ? 16 : Math.min(48, now - last);
      last = now;

      const mult = Math.pow(LAP_ACCEL, lap);
      const step = BASE_SPEED * mult * dt;
      angle += step;
      travelled += step;
      if (travelled >= 360) {
        travelled -= 360;
        lap += 1;
        if (lap >= MAX_LAPS) lap = 0; // reset: build up again
      }

      // pulse + glow
      const p = pt(angle);
      pulseRef.current?.setAttribute('cx', String(p.x));
      pulseRef.current?.setAttribute('cy', String(p.y));
      glowRef.current?.setAttribute('cx', String(p.x));
      glowRef.current?.setAttribute('cy', String(p.y));

      // comet trail — spacing grows with speed so the tail stretches
      const gap = 5 + 4.5 * (mult / Math.pow(LAP_ACCEL, MAX_LAPS - 1)) * 10;
      trailRefs.current.forEach((dot, i) => {
        if (!dot) return;
        const tp = pt(angle - (i + 1) * (gap / TRAIL_N) * 2.4);
        dot.setAttribute('cx', String(tp.x));
        dot.setAttribute('cy', String(tp.y));
      });

      // node halos flare as the pulse passes
      haloRefs.current.forEach((halo, i) => {
        if (!halo) return;
        const node = NODES[i];
        if (!node) return;
        let d = Math.abs(((angle - node.angle) % 360) + 360) % 360;
        if (d > 180) d = 360 - d;
        const glow = Math.max(0, 1 - d / 32);
        halo.setAttribute('opacity', String(0.12 + glow * 0.55));
        halo.setAttribute('r', String(9 + glow * 7));
      });

      // slow counter-rotating dashed ring for depth
      dashRef.current?.setAttribute('transform', `rotate(${-angle * 0.12} ${CX} ${CY})`);

      // live counters
      if (cycleTextRef.current) cycleTextRef.current.textContent = `cycle ${lap + 1}`;
      if (speedTextRef.current) speedTextRef.current.textContent = `speed ×${mult.toFixed(1)}`;

      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !running) {
        running = true;
        last = 0;
        raf = requestAnimationFrame(frame);
      } else if (!entry?.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const start = pt(-90);
  const caption =
    lang === 'en'
      ? 'Self-acceleration · an Agent that learns and improves on its own'
      : 'Self-acceleration · 스스로 배우고, 스스로 나아지는 Agent';

  return (
    <div ref={rootRef} className="mx-auto w-full max-w-[440px]">
      <svg
        viewBox="0 0 420 420"
        role="img"
        aria-label={
          lang === 'en'
            ? 'The self-accelerating loop: a pulse orbits hypothesize, experiment, iterate, theorize, faster on every lap'
            : '자기가속 루프: 펄스가 가설·실험·반복·이론화를 돌며 바퀴마다 빨라지는 모습'
        }
        className="h-auto w-full"
      >
        <defs>
          <radialGradient id="loop-pulse-glow">
            <stop offset="0%" stopColor="#8FBF9F" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4A7C59" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="loop-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4A7C59" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8FBF9F" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* depth: slow counter-rotating dashed ring */}
        <circle
          ref={dashRef}
          cx={CX}
          cy={CY}
          r={R + 18}
          fill="none"
          stroke="#4A7C59"
          strokeOpacity="0.14"
          strokeWidth="1"
          strokeDasharray="2 10"
        />

        {/* main orbit */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="url(#loop-ring)" strokeWidth="1.5" />

        {/* nodes + labels */}
        {NODES.map((n, i) => {
          const p = pt(n.angle);
          const lp = labelPos(n.angle);
          return (
            <g key={n.label}>
              <circle
                ref={(node) => {
                  haloRefs.current[i] = node;
                }}
                cx={p.x}
                cy={p.y}
                r={9}
                fill="#4A7C59"
                opacity={0.12}
              />
              <circle cx={p.x} cy={p.y} r={4} fill="#4A7C59" />
              <text
                x={lp.x}
                y={lp.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-ink-soft"
                style={{
                  font: '600 11.5px Pretendard, sans-serif',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                {n.label}
              </text>
            </g>
          );
        })}

        {/* comet trail */}
        {Array.from({ length: TRAIL_N }, (_, i) => (
          <circle
            key={i}
            ref={(node) => {
              trailRefs.current[i] = node;
            }}
            cx={start.x}
            cy={start.y}
            r={Math.max(1, 5 - i * 0.6)}
            fill="#4A7C59"
            opacity={Math.max(0.06, 0.5 - i * 0.07)}
          />
        ))}

        {/* the pulse */}
        <circle ref={glowRef} cx={start.x} cy={start.y} r={26} fill="url(#loop-pulse-glow)" />
        <circle ref={pulseRef} cx={start.x} cy={start.y} r={6.5} fill="#4A7C59" />

        {/* live center counters */}
        <text
          ref={cycleTextRef}
          x={CX}
          y={CY - 8}
          textAnchor="middle"
          className="fill-ink"
          style={{ font: '800 30px Pretendard, sans-serif', letterSpacing: '-0.02em' }}
        >
          cycle 1
        </text>
        <text
          ref={speedTextRef}
          x={CX}
          y={CY + 22}
          textAnchor="middle"
          className="fill-sage"
          style={{
            font: '600 13px Pretendard, sans-serif',
            letterSpacing: '0.14em',
          }}
        >
          speed ×1.0
        </text>
      </svg>
      <p className="eyebrow-mono mt-4 text-center text-ink-soft/70">{caption}</p>
    </div>
  );
}
