/**
 * Defense-in-depth, drawn: nested boundaries around the personal-data core.
 *
 * The layer names are deliberately generic — naming our real topology on a
 * public page would hand an attacker a map (Michael 2026-07-04, the same reason
 * the tech-stack section was removed). Labels come in as props so the KO and EN
 * pages share one drawing instead of two 60-line copies of the same SVG.
 */
export function DefenseLayers({
  layers,
  coreTitle,
  aria,
}: {
  layers: [string, string, string];
  coreTitle: string;
  aria: string;
}) {
  return (
    <div className="mx-auto w-full max-w-[420px]">
      <svg viewBox="0 0 420 340" role="img" aria-label={aria} className="h-auto w-full">
        {layers.map((label, i) => {
          const inset = i * 44;
          return (
            <g key={label}>
              <rect
                x={16 + inset}
                y={16 + inset}
                width={388 - inset * 2}
                height={308 - inset * 2}
                rx={20 - i * 4}
                fill="#4A7C59"
                fillOpacity={0.04 + i * 0.03}
                stroke="#4A7C59"
                strokeOpacity={0.35}
                strokeWidth="1.5"
                strokeDasharray={i === 0 ? '6 8' : undefined}
              />
              <text
                x={32 + inset}
                y={40 + inset}
                className="fill-sage"
                style={{ fontWeight: 600, fontSize: 11.5, letterSpacing: '0.1em' }}
              >
                {label}
              </text>
            </g>
          );
        })}
        <g>
          <rect x={128} y={148} width={164} height={64} rx={12} fill="#1E2D40" />
          <text
            x={210}
            y={175}
            textAnchor="middle"
            className="fill-ivory"
            style={{ fontWeight: 700, fontSize: 13.5 }}
          >
            {coreTitle}
          </text>
          <text
            x={210}
            y={196}
            textAnchor="middle"
            className="fill-sage-lt"
            style={{ fontWeight: 600, fontSize: 10, letterSpacing: '0.06em' }}
          >
            ISOLATED · ENCRYPTED
          </text>
        </g>
      </svg>
    </div>
  );
}
