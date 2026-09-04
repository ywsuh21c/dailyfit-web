import Link from 'next/link';
import type { CatalogCard } from '@/lib/catalog-sample';

/**
 * Live catalog strip — real activities with real photos, each linking to its
 * own /activity/[id] page. Renders nothing when there are no cards (we never
 * show placeholders where evidence was promised).
 *
 * Marquee: the track holds the list twice and translates by half its width,
 * so the loop is seamless. Pauses on hover; static under reduced-motion.
 * Photos use a plain <img> on purpose — they live on external CDNs that are
 * not in next.config `remotePatterns`, and turning on the image pipeline for
 * them is a separate decision (see /activity/[id]).
 *
 * 🔴 The real cards are NOT lazy. Lazy-loading inside a transform-animated,
 * overflow-hidden track is unreliable: on the 2026-09-03 Netlify preview 14 of
 * the 24 <img> tags never fetched at all (naturalWidth 0, empty currentSrc)
 * even though every URL answered 200 — the browser never considered them
 * "near the viewport" because the track is 2× wide and slid by translateX.
 * A strip whose whole point is showing real photos must not depend on that.
 * The duplicated half stays lazy and carries the SAME urls, so the browser
 * fetches each photo once either way; `fetchPriority="low"` keeps them behind
 * the hero so first paint is unaffected.
 */
export function CatalogStrip({
  cards,
  label,
  note,
}: {
  cards: CatalogCard[];
  label: string;
  note?: string;
}) {
  if (cards.length === 0) return null;
  const loop = [...cards, ...cards];
  return (
    <div className="mx-auto max-w-wrap px-5 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-hair pt-5">
        <p className="flex items-center gap-2.5 text-eyebrow uppercase text-sage">
          <span className="console-live-dot !bg-sage" aria-hidden="true" />
          {label}
        </p>
        {note && <p className="text-[13px] text-ink-soft">{note}</p>}
      </div>
      <div className="ed-strip mt-5" aria-label={label}>
        <div className="ed-strip-track">
          {loop.map((c, i) => (
            <Link
              key={`${c.id}-${i}`}
              href={c.href}
              className="ed-photo-card"
              aria-hidden={i >= cards.length}
              tabIndex={i >= cards.length ? -1 : undefined}
            >
              <span className="ed-photo">
                <img
                  src={c.photo}
                  alt=""
                  loading={i < cards.length ? undefined : 'lazy'}
                  fetchPriority="low"
                  decoding="async"
                  width={472}
                  height={354}
                />
              </span>
              <span className="line-clamp-2 text-[15px] font-bold leading-[1.35] text-ink">{c.title}</span>
              <span className="text-[13px] text-ink-soft">
                {[c.neighborhood, c.tag, c.priceLabel].filter(Boolean).join(' · ')}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
