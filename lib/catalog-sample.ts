/**
 * Live catalog sample — real activities, with real photos, for the home page
 * strip (and anywhere else the site wants to show "what is actually in the
 * database right now").
 *
 * ── WHY THIS REPLACES lib/activities.ts (2026-09-03) ────────────────────────
 * The old ticker ran four `POST /api/process` searches per ISR window. That
 * endpoint is the LLM-backed intent → search pipeline — expensive, slow, and it
 * returned titles only, so the home page could show words but never the
 * activity itself. The backend has since shipped two unauthenticated,
 * PII-free endpoints for exactly this kind of consumer:
 *   · GET /api/activities/public-index  → (id, updated_at) pages, 1,000/page
 *   · GET /api/activities/{id}/public   → title · photo · district · price · dates
 * So we sample ids from the public index and read each card from the public
 * detail. No LLM call, no session, and every card links to its own
 * `/activity/[id]` page — 9,000+ detail pages gain internal links from the home.
 *
 * ── HONESTY RULES ───────────────────────────────────────────────────────────
 * · Only real rows. On any failure the sample is simply shorter, down to an
 *   empty array — the caller hides the strip. We never invent a card.
 * · Only cards WITH a real photo (`hero_image_url` / `image_url`). The og
 *   fallback (`og_image_url`) can be stock art keyed by scene; that is not
 *   "the activity's photo" and is not used here.
 * · Titles are the supplier's own words and are never rewritten. Rows whose
 *   title carries a word we don't put in front of users (영우 2026-09-02:
 *   시니어/어르신/노인) are SKIPPED, not renamed — same rule as the old ticker.
 * · jobs/welfare categories are off-brand for the company-site strip and are
 *   skipped the same way the old ticker did.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type CatalogCard = {
  id: string;
  title: string;
  /** 구 단위 지역명 (충전율 100%). */
  neighborhood: string | null;
  /** Real photo URL — always present on a returned card. */
  photo: string;
  /** Short category label in the product's own vocabulary. */
  tag: string;
  /** '무료' · '20,000원' · null(요금 미상 — 화면에서는 아무 말도 하지 않는다). */
  priceLabel: string | null;
  href: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.dailyfitai.app';

/** 6h — same cadence as the home page ISR window. */
export const SAMPLE_REVALIDATE = 21600;

const ALLOWED_CATEGORIES = new Set(['activity', 'education', 'social']);
const BANNED_WORDS = ['시니어', '어르신', '노인'];
const MAX_TITLE_LEN = 44;
/** How many public rows we are willing to read to fill the sample. */
const CANDIDATE_LIMIT = 36;
const CONCURRENCY = 4;

type PublicRow = {
  id: string;
  title: string;
  neighborhood: string | null;
  is_free: boolean;
  price: number | null;
  category: string | null;
  image_url?: string | null;
  hero_image_url?: string | null;
};

/** 카테고리 → 제품 어휘 라벨. 활동 상세·홈 스트립이 같은 낱말을 쓴다. */
export function categoryLabel(category: string | null | undefined): string {
  if (category === 'education') return '배움';
  if (category === 'social') return '모임';
  return '여가';
}

export function priceLabelOf(row: { is_free: boolean; price: number | null }): string | null {
  if (row.is_free) return '무료';
  if (row.price != null && row.price > 0) return `${row.price.toLocaleString('ko-KR')}원`;
  return null;
}

/** Trim supplier noise that only makes sense inside their own portal. */
function cleanTitle(raw: string): string {
  return raw
    .replace(/^\[[^\]]{1,14}\]\s*/, '') // leading "[10/11]" / "[성인]" tags
    .replace(/\s*[｜|]\s*강좌번호.*$/, '') // "｜강좌번호 : 5"
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchIds(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE}/api/activities/public-index?limit=1000`, {
      next: { revalidate: SAMPLE_REVALIDATE },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { items?: { id?: unknown }[] };
    return (data.items ?? [])
      .map((i) => i.id)
      .filter((id): id is string => typeof id === 'string' && id.length > 0);
  } catch {
    return [];
  }
}

async function fetchRow(id: string): Promise<PublicRow | null> {
  try {
    const res = await fetch(`${API_BASE}/api/activities/${encodeURIComponent(id)}/public`, {
      next: { revalidate: SAMPLE_REVALIDATE },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;
    return (await res.json()) as PublicRow;
  } catch {
    return null;
  }
}

/**
 * Pick `n` ids spread across the index page rather than the first `n`: the
 * index is id-ordered, so neighbours tend to share a supplier and a district.
 * Deterministic (no Math.random) so server and revalidation runs agree.
 */
function spread<T>(items: T[], n: number): T[] {
  if (items.length <= n) return items;
  const step = items.length / n;
  return Array.from({ length: n }, (_, i) => items[Math.floor(i * step)]);
}

function toCard(row: PublicRow): CatalogCard | null {
  const photo = row.hero_image_url || row.image_url;
  if (!photo) return null;
  if (!ALLOWED_CATEGORIES.has(row.category ?? '')) return null;
  const title = cleanTitle(row.title ?? '');
  if (title.length < 2 || title.length > MAX_TITLE_LEN) return null;
  if (BANNED_WORDS.some((w) => title.includes(w))) return null;
  return {
    id: row.id,
    title,
    neighborhood: row.neighborhood ?? null,
    photo,
    tag: categoryLabel(row.category),
    priceLabel: priceLabelOf(row),
    href: `/activity/${row.id}`,
  };
}

// Module memo so a dev server does not re-fetch 36 rows on every request.
let memo: { at: number; cards: CatalogCard[] } | null = null;

/**
 * Up to `limit` real activity cards with photos. Never throws. May return
 * fewer than `limit` (or none) when the API is unreachable — callers hide
 * the strip in that case instead of showing placeholders.
 */
export async function getCatalogSample(limit = 12): Promise<CatalogCard[]> {
  if (memo && Date.now() - memo.at < SAMPLE_REVALIDATE * 1000 && memo.cards.length >= limit) {
    return memo.cards.slice(0, limit);
  }

  const ids = spread(await fetchIds(), CANDIDATE_LIMIT);
  const cards: CatalogCard[] = [];
  const seenTitles = new Set<string>();

  for (let i = 0; i < ids.length && cards.length < limit; i += CONCURRENCY) {
    const rows = await Promise.all(ids.slice(i, i + CONCURRENCY).map(fetchRow));
    for (const row of rows) {
      if (!row) continue;
      const card = toCard(row);
      if (!card || seenTitles.has(card.title)) continue;
      seenTitles.add(card.title);
      cards.push(card);
      if (cards.length >= limit) break;
    }
  }

  if (cards.length > 0) memo = { at: Date.now(), cards };
  return cards;
}
