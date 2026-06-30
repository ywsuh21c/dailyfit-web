import { activeCatalogCount } from '@/lib/site';

/**
 * Live activity-catalog count — the "활성 활동 카탈로그" number on the home page.
 *
 * ── SINGLE SOURCE OF TRUTH ──────────────────────────────────────────────────
 * Canonical source = backend `GET /api/activities/count` → `{ active, as_of }`
 * (the count of currently-active programs in the prod catalog, plus the date it
 * was computed). The website reads the number ONLY through `getCatalogCount()`.
 *
 * Build-time, not request-time: fetched once per build / per `revalidate`
 * window so the homepage ships a real, dated number instead of a stale literal.
 *
 * Safe-fallback rule: if NEXT_PUBLIC_API_BASE_URL is unset OR the fetch fails /
 * is malformed (e.g. the endpoint is not deployed yet), fall back to the
 * bundled `activeCatalogCount` (lib/site.ts) + `FALLBACK_AS_OF` so the page
 * always renders a sane, dated number and NEVER breaks. The moment the endpoint
 * is live, the site auto-upgrades to the real count with no code change.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type CatalogCount = {
  /** Number of currently-active activities in the prod catalog. */
  count: number;
  /** ISO date (YYYY-MM-DD) the count was computed — shown as "기준". */
  asOf: string;
};

/** Last date the bundled fallback count was hand-verified against prod. */
const FALLBACK_AS_OF = '2026-06-29';

const FALLBACK: CatalogCount = {
  count: activeCatalogCount,
  asOf: FALLBACK_AS_OF,
};

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Returns the active catalog count + as-of date. Reads the canonical
 * `GET /api/activities/count` when NEXT_PUBLIC_API_BASE_URL is set; otherwise
 * (or on any error / malformed payload) returns the bundled fallback.
 *
 * Cached for 1 day (`next: { revalidate: 86400 }`) — the catalog moves slowly,
 * so a daily ISR refresh keeps the number fresh without per-request API load.
 */
export async function getCatalogCount(): Promise<CatalogCount> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) return FALLBACK;

  try {
    const res = await fetch(`${base}/api/activities/count`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return FALLBACK;

    const data = (await res.json()) as Partial<{ active: number; as_of: string }>;
    if (typeof data.active !== 'number' || !Number.isFinite(data.active) || data.active <= 0) {
      return FALLBACK; // missing/invalid count → safe fallback
    }

    return {
      count: Math.round(data.active),
      asOf: typeof data.as_of === 'string' && ISO_DATE.test(data.as_of) ? data.as_of : FALLBACK_AS_OF,
    };
  } catch {
    return FALLBACK; // network/parse failure → never break the page
  }
}

/** Formats an ISO date (YYYY-MM-DD) as `YYYY.MM.DD` for the "기준" caption. */
export function formatAsOf(iso: string): string {
  return ISO_DATE.test(iso) ? iso.replace(/-/g, '.') : iso;
}
