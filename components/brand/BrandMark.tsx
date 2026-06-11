/**
 * DailyFit logo mark — Direction E "the bound page" (LOCKED 2026-05-26).
 * Master SVG inlined per HARD RULE §8; source of truth:
 * `4. Reference/Critical Docs/brand-assets/logo/`.
 *
 * `idPrefix` must be unique per render location (SVG defs ids are global
 * in the DOM — nav + footer both render this).
 */
export function BrandMark({
  idPrefix,
  className,
}: {
  idPrefix: string;
  className?: string;
}) {
  const pg = `${idPrefix}-pg`;
  const bk = `${idPrefix}-bk`;
  const hd = `${idPrefix}-hd`;
  const sh = `${idPrefix}-sh`;
  const bsh = `${idPrefix}-bsh`;
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={pg} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FCF8EF" />
          <stop offset="1" stopColor="#EBE3D2" />
        </linearGradient>
        <linearGradient id={bk} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EEE6D4" />
          <stop offset="1" stopColor="#DDD2BB" />
        </linearGradient>
        <linearGradient id={hd} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5A906A" />
          <stop offset="1" stopColor="#3E6A4A" />
        </linearGradient>
        <filter id={sh} x="-30%" y="-10%" width="160%" height="140%">
          <feDropShadow
            dx="0"
            dy="1.8"
            stdDeviation="2"
            floodColor="#1E2D40"
            floodOpacity="0.22"
          />
        </filter>
        <filter id={bsh} x="-30%" y="-10%" width="160%" height="140%">
          <feDropShadow
            dx="0.6"
            dy="0.8"
            stdDeviation="0.9"
            floodColor="#1E2D40"
            floodOpacity="0.14"
          />
        </filter>
      </defs>
      <g transform="rotate(2.5 54 48)">
        <rect x="26" y="8" width="56" height="76" rx="4" fill={`url(#${bk})`} filter={`url(#${bsh})`} />
      </g>
      <rect x="14" y="14" width="60" height="80" rx="5" fill={`url(#${pg})`} filter={`url(#${sh})`} />
      <path d="M 19 14 H 69 A 5 5 0 0 1 74 19 V 27 H 14 V 19 A 5 5 0 0 1 19 14 Z" fill={`url(#${hd})`} />
      <rect x="14" y="27" width="60" height="1.2" fill="#1E2D40" opacity="0.07" />
      <rect x="19.5" y="18.5" width="22" height="4.5" rx="1.5" fill="#F5F0E8" opacity="0.96" />
      <rect x="19.5" y="36" width="8" height="8" rx="2" fill={`url(#${hd})`} />
      <path
        d="M 21.4 40.2 L 23.3 42.1 L 25.8 37.9"
        stroke="#F5F0E8"
        strokeWidth="1.7"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="32" y1="40" x2="62" y2="40" stroke="#4A7C59" strokeWidth="2.8" strokeLinecap="round" opacity="0.45" />
      <rect x="19.5" y="54" width="8" height="8" rx="2" fill="none" stroke="#4A7C59" strokeWidth="1.6" />
      <line x1="32" y1="58" x2="60" y2="58" stroke="#4A7C59" strokeWidth="2.8" strokeLinecap="round" />
      <rect x="19.5" y="72" width="8" height="8" rx="2" fill="none" stroke="#4A7C59" strokeWidth="1.6" />
      <line x1="32" y1="76" x2="56" y2="76" stroke="#4A7C59" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}
