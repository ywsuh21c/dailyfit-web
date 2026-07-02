/**
 * Frontiers visual — one principle rippling outward across domains.
 *
 * Concentric orbits: hobbies (today, solid core) → jobs (next) → creation
 * (frontier). Ripple waves expand continuously from the center: the expansion
 * itself, drawn. Pure SVG + CSS (globals.css `.ripple-*`); no client JS.
 */
const ringLabel = { font: '600 12.5px Pretendard, sans-serif', letterSpacing: '0.1em' } as const;

export function FrontierField({ lang = 'ko' }: { lang?: 'ko' | 'en' }) {
  const L =
    lang === 'en'
      ? {
          aria: 'One principle expanding outward: from finding hobbies today, to jobs, to creating opportunities',
          coreTop: 'finding hobbies',
          coreBottom: 'today',
          mid: 'jobs & work',
          outer: 'creating opportunities',
        }
      : {
          aria: '하나의 원리가 확장되는 모습: 오늘의 취미 찾아주기에서 일자리, 기회 창출까지',
          coreTop: '취미 찾아주기',
          coreBottom: '오늘의 DailyFit',
          mid: '일자리 찾아주기',
          outer: '기회를 만들어내기',
        };

  return (
    <div className="mx-auto w-full max-w-[560px]">
      <svg viewBox="0 0 560 340" role="img" aria-label={L.aria} className="h-auto w-full">
        <defs>
          <radialGradient id="frontier-core">
            <stop offset="0%" stopColor="#8FBF9F" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4A7C59" stopOpacity="0.15" />
          </radialGradient>
        </defs>

        {/* expanding ripples — the principle spreading */}
        <circle cx="280" cy="170" r="150" fill="none" stroke="#4A7C59" strokeWidth="1.5" className="ripple-ring" />
        <circle cx="280" cy="170" r="150" fill="none" stroke="#4A7C59" strokeWidth="1.5" className="ripple-ring ripple-d1" />
        <circle cx="280" cy="170" r="150" fill="none" stroke="#4A7C59" strokeWidth="1.5" className="ripple-ring ripple-d2" />

        {/* domain orbits */}
        <circle cx="280" cy="170" r="52" fill="url(#frontier-core)" stroke="#4A7C59" strokeOpacity="0.5" strokeWidth="1.5" />
        <circle cx="280" cy="170" r="100" fill="none" stroke="#4A7C59" strokeOpacity="0.3" strokeWidth="1.2" strokeDasharray="1 0" />
        <circle cx="280" cy="170" r="150" fill="none" stroke="#4A7C59" strokeOpacity="0.22" strokeWidth="1.2" strokeDasharray="4 6" />

        {/* center: the principle */}
        <circle cx="280" cy="170" r="5" fill="#4A7C59" />

        {/* orbit markers */}
        <circle cx="380" cy="170" r="4" fill="#4A7C59" fillOpacity="0.8" />
        <circle cx="280" cy="20" r="4" fill="none" stroke="#4A7C59" strokeWidth="2" strokeDasharray="2 2" />

        {/* labels — core inside (two lines), others pinned to their orbit */}
        <text x="280" y="166" textAnchor="middle" className="fill-ink" style={ringLabel}>
          {L.coreTop}
        </text>
        <text x="280" y="184" textAnchor="middle" className="fill-ink-soft" style={{ font: '600 10.5px Pretendard, sans-serif', letterSpacing: '0.08em' }}>
          {L.coreBottom}
        </text>
        <g>
          <line x1="386" y1="164" x2="420" y2="140" stroke="#4A7C59" strokeOpacity="0.35" />
          <text x="426" y="136" className="fill-ink" style={ringLabel}>
            {L.mid}
          </text>
        </g>
        <g>
          <line x1="286" y1="24" x2="330" y2="40" stroke="#4A7C59" strokeOpacity="0.35" />
          <text x="336" y="46" className="fill-sage" style={ringLabel}>
            {L.outer}
          </text>
        </g>
      </svg>
    </div>
  );
}
