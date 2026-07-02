/**
 * Generic expanding-orbits graphic (generalized from the research page's
 * FrontierField): a solid core, two labeled orbits, and ripple waves
 * expanding outward. Used for domain/market/moat expansion metaphors.
 * Pure SVG + CSS (globals.css `.ripple-*`); server component.
 */
const ringLabel = { font: '600 12.5px Pretendard, sans-serif', letterSpacing: '0.1em' } as const;
const subLabel = { font: '600 10.5px Pretendard, sans-serif', letterSpacing: '0.08em' } as const;

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
    <div className="mx-auto w-full max-w-[560px]">
      <svg viewBox="0 0 560 340" role="img" aria-label={aria} className="h-auto w-full">
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

        {/* orbits */}
        <circle cx="280" cy="170" r="52" fill="url(#orbit-core)" stroke="#4A7C59" strokeOpacity="0.5" strokeWidth="1.5" />
        <circle cx="280" cy="170" r="100" fill="none" stroke="#4A7C59" strokeOpacity="0.3" strokeWidth="1.2" />
        <circle cx="280" cy="170" r="150" fill="none" stroke="#4A7C59" strokeOpacity="0.22" strokeWidth="1.2" strokeDasharray="4 6" />

        {/* center + markers */}
        <circle cx="280" cy="170" r="5" fill="#4A7C59" />
        <circle cx="380" cy="170" r="4" fill="#4A7C59" fillOpacity="0.8" />
        <circle cx="280" cy="20" r="4" fill="none" stroke="#4A7C59" strokeWidth="2" strokeDasharray="2 2" />

        {/* labels */}
        {coreBottom ? (
          <>
            <text x="280" y="166" textAnchor="middle" className="fill-ink" style={ringLabel}>
              {coreTop}
            </text>
            <text x="280" y="184" textAnchor="middle" className="fill-ink-soft" style={subLabel}>
              {coreBottom}
            </text>
          </>
        ) : (
          <text x="280" y="174" textAnchor="middle" className="fill-ink" style={ringLabel}>
            {coreTop}
          </text>
        )}
        <g>
          <line x1="386" y1="164" x2="420" y2="140" stroke="#4A7C59" strokeOpacity="0.35" />
          <text x="426" y="136" className="fill-ink" style={ringLabel}>
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
