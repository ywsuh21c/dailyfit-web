/**
 * Open-questions card glyphs — three small living diagrams, one per question.
 * Pure SVG + CSS keyframes (globals.css `.glyph-*`); no client JS needed.
 * All motion disabled under prefers-reduced-motion.
 */

const label = { font: '600 10px Pretendard, sans-serif', letterSpacing: '0.1em' } as const;

/** Learning cadence — two rhythms: always-on stream vs. fixed check-ins. */
export function CadenceGlyph() {
  return (
    <svg viewBox="0 0 220 72" aria-hidden="true" className="h-[72px] w-full">
      {/* always-on: rapid uniform blink */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <circle
          key={`a${i}`}
          cx={26 + i * 24}
          cy={24}
          r={4}
          fill="#4A7C59"
          className="glyph-blink"
          style={{ animationDelay: `${i * 0.14}s` }}
        />
      ))}
      {/* fixed cycle: sparse, slow pulses */}
      {[0, 1, 2].map((i) => (
        <circle
          key={`b${i}`}
          cx={38 + i * 72}
          cy={52}
          r={5.5}
          fill="none"
          stroke="#4A7C59"
          strokeWidth="2"
          className="glyph-blink-slow"
          style={{ animationDelay: `${i * 0.85}s` }}
        />
      ))}
    </svg>
  );
}

/** The golden point — a dot roams a bell curve; the optimum glows at the peak. */
export function GoldenGlyph() {
  return (
    <svg viewBox="0 0 220 72" aria-hidden="true" className="h-[72px] w-full">
      {/* bell curve */}
      <path
        d="M 20 62 C 70 62, 82 14, 110 14 C 138 14, 150 62, 200 62"
        fill="none"
        stroke="#4A7C59"
        strokeOpacity="0.35"
        strokeWidth="2"
      />
      {/* the optimum, glowing at the peak */}
      <circle cx="110" cy="14" r="9" fill="#4A7C59" fillOpacity="0.18" className="glyph-pulse" />
      <circle cx="110" cy="14" r="3" fill="#4A7C59" />
      {/* the search: X/Y oscillations compose an arc roaming the curve */}
      <g transform="translate(110, 48)">
        <g className="glyph-osc-x">
          <g className="glyph-osc-y">
            <circle cx="0" cy="0" r="4.5" fill="#8FBF9F" />
          </g>
        </g>
      </g>
    </svg>
  );
}

/** Cost vs. value — two flowing lines; the crossing point is the gate. */
export function CostGlyph() {
  return (
    <svg viewBox="0 0 220 72" aria-hidden="true" className="h-[72px] w-full">
      {/* cost: climbs linearly */}
      <path d="M 20 54 L 200 26" fill="none" stroke="#1E2D40" strokeOpacity="0.3" strokeWidth="2" className="glyph-flow" />
      {/* value: rises then flattens (diminishing returns) */}
      <path d="M 20 60 C 90 44, 120 20, 200 14" fill="none" stroke="#4A7C59" strokeWidth="2.5" className="glyph-flow" />
      {/* the ROI gate — where they cross */}
      <circle cx="132" cy="30" r="10" fill="#4A7C59" fillOpacity="0.16" className="glyph-pulse" />
      <circle cx="132" cy="30" r="3.5" fill="#4A7C59" />
      <text x="20" y="68" className="fill-ink-soft" style={label} opacity="0.7">value</text>
      <text x="176" y="20" className="fill-ink-soft" style={label} opacity="0.5">cost</text>
    </svg>
  );
}
