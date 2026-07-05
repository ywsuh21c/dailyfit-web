/**
 * Generic expanding-orbits graphic (generalized from the research page's
 * FrontierField): a solid core, two labeled orbits, and ripple waves
 * expanding outward. Used for domain/market/moat expansion metaphors.
 * Pure SVG + CSS (globals.css `.ripple-*`); server component.
 */
// Halo (paint-order stroke) lifts every label off the gradient/ripple art so
// text stays legible over busy backgrounds (Michael 2026-07-05: core label
// was getting swallowed by the center dot + gradient).
const HALO = { stroke: '#F7F4EC', strokeWidth: 5, paintOrder: 'stroke' } as const;
const ringLabel = { fontWeight: 700, fontSize: 12.5, letterSpacing: '0.1em', ...HALO } as const;
const coreLabel = { fontWeight: 800, fontSize: 14.5, letterSpacing: '0.01em', ...HALO } as const;
const subLabel = { fontWeight: 600, fontSize: 11.5, letterSpacing: '0.04em', ...HALO } as const;

export function OrbitRings({
  aria,
  coreTop,
  coreBottom,
  mid,
  outer,
}: {
  aria: string;
  coreTop: string;
  coreBottom?: string;
  mid: string;
  outer: string;
}) {
  return (
    <div className="mx-auto w-full max-w-[600px]">
      {/* 600-wide canvas: the EN mid label ("proprietary voice layer") runs to
          x≈590 and was hard-clipped by the old 560 viewBox. */}
      <svg viewBox="0 0 600 340" role="img" aria-label={aria} className="h-auto w-full">
        <defs>
          <radialGradient id="orbit-core">
            <stop offset="0%" stopColor="#8FBF9F" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4A7C59" stopOpacity="0.15" />
          </radialGradient>
        </defs>

        {/* expanding ripples */}
        <circle cx="280" cy="170" r="150" fill="none" stroke="#4A7C59" strokeWidth="1.5" className="ripple-ring" />
        <circle cx="280" cy="170" r="150" fill="none" stroke="#4A7C59" strokeWidth="1.5" className="ripple-ring ripple-d1" />
        <circle cx="280" cy="170" r="150" fill="none" stroke="#4A7C59" strokeWidth="1.5" className="ripple-ring ripple-d2" />

        {/* orbits — core is wide enough for its two-line label in BOTH locales
            (EN "per-user daily-life data" ≈163px needs r≥84); the old center
            dot sat right on the text, so the label carries the center now */}
        <circle cx="280" cy="170" r="84" fill="url(#orbit-core)" stroke="#4A7C59" strokeOpacity="0.5" strokeWidth="1.5" />
        <circle cx="280" cy="170" r="112" fill="none" stroke="#4A7C59" strokeOpacity="0.3" strokeWidth="1.2" />
        <circle cx="280" cy="170" r="150" fill="none" stroke="#4A7C59" strokeOpacity="0.22" strokeWidth="1.2" strokeDasharray="4 6" />

        {/* markers */}
        <circle cx="392" cy="170" r="4" fill="#4A7C59" fillOpacity="0.8" />
        <circle cx="280" cy="20" r="4" fill="none" stroke="#4A7C59" strokeWidth="2" strokeDasharray="2 2" />

        {/* labels */}
        {coreBottom ? (
          <>
            <text x="280" y="164" textAnchor="middle" className="fill-ink" style={coreLabel}>
              {coreTop}
            </text>
            <text x="280" y="186" textAnchor="middle" className="fill-ink-soft" style={subLabel}>
              {coreBottom}
            </text>
          </>
        ) : (
          <text x="280" y="174" textAnchor="middle" className="fill-ink" style={coreLabel}>
            {coreTop}
          </text>
        )}
        <g>
          {/* leader starts AT the mid-orbit marker (392,170) and runs outward,
              tracking the r=112 orbit (was tuned for the old r=100 ring) */}
          <line x1="398" y1="164" x2="424" y2="142" stroke="#4A7C59" strokeOpacity="0.35" />
          <text x="430" y="138" className="fill-ink" style={ringLabel}>
            {mid}
          </text>
        </g>
        <g>
          <line x1="286" y1="24" x2="330" y2="40" stroke="#4A7C59" strokeOpacity="0.35" />
          <text x="336" y="46" className="fill-sage" style={ringLabel}>
            {outer}
          </text>
        </g>
      </svg>
    </div>
  );
}
