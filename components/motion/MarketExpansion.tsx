import { Fragment } from 'react';

/**
 * Market-expansion progression — a flat, editorial three-stage flow
 * (Korea beachhead → East Asia → global senior market). Replaces the animated
 * OrbitRings on the investors page (Michael 2026-07-06: the orbit's gradient
 * core + white halos + ripple animation read as too flashy against the clean
 * text layout, and "비치헤드" was jargon). Pure markup, no animation; server
 * component. `lang` swaps the copy. The current beachhead stage carries a light
 * sage tint so "where we are now" reads at a glance.
 */
type Stage = { tag: string; region: string; label: string; current?: boolean };

const STAGES_KO: Stage[] = [
  { tag: '현재', region: '한국', label: '1,500만 명 · 첫 시장', current: true },
  { tag: '다음', region: '동아시아', label: '확장 시장' },
  { tag: '장기', region: '글로벌', label: '시니어 시장' },
];

const STAGES_EN: Stage[] = [
  { tag: 'Now', region: 'Korea', label: '15M · first market', current: true },
  { tag: 'Next', region: 'East Asia', label: 'expansion market' },
  { tag: 'Long-term', region: 'Global', label: 'senior market' },
];

export function MarketExpansion({ lang = 'ko' }: { lang?: 'ko' | 'en' }) {
  const stages = lang === 'en' ? STAGES_EN : STAGES_KO;
  const aria =
    lang === 'en'
      ? 'Market expansion: from Korea (15M, first market) to East Asia and the global senior market'
      : '시장 확장: 한국(1,500만, 첫 시장)에서 동아시아, 글로벌 시니어 시장으로';

  return (
    <div
      role="img"
      aria-label={aria}
      className="flex w-full flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-0"
    >
      {stages.map((s, i) => (
        <Fragment key={s.region}>
          <div
            className={`flex-1 rounded-xl border p-6 ${
              s.current ? 'border-sage/40 bg-sage/[0.06]' : 'border-line bg-white'
            }`}
          >
            <p className="eyebrow-mono text-sage">{s.tag}</p>
            <p className="mt-2 text-h3 font-bold text-ink">{s.region}</p>
            <p className="mt-1 text-[15px] text-ink-soft">{s.label}</p>
          </div>
          {i < stages.length - 1 && (
            <div
              className="flex items-center justify-center py-1 text-ink-soft/35 sm:px-3 sm:py-0"
              aria-hidden="true"
            >
              <span className="hidden text-2xl leading-none sm:inline">→</span>
              <span className="text-2xl leading-none sm:hidden">↓</span>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
