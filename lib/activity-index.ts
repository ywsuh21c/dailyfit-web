/**
 * Public activity index — the ID list that feeds /activity-sitemap.xml.
 *
 * ── WHY THIS MATTERS MORE THAN ANY OTHER SEO WORK ───────────────────────────
 * The company site has ~10 indexable pages. The catalog has thousands of real,
 * currently-active programs, each one an answer to a search nobody else on the
 * Korean web answers well ("○○구 무료 프로그램", "○○ 문화센터 강좌 신청").
 * `/activity/[id]` already renders those server-side — it is the only large
 * organic-traffic engine we own. It is invisible today for one reason: search
 * engines have no way to DISCOVER the URLs. This file closes that gap.
 *
 * ── THE SWAP SEAM ───────────────────────────────────────────────────────────
 * The sitemap reads IDs ONLY through `listPublicActivityIds()` below.
 *
 * 2026-08-08 실측: public-index 가 배포되어 이제 10,282건을 반환한다. 미배포
 * 시절의 "빈 목록 반환" 폴백은 안전망으로 그대로 둔다 — 어떤 실패에서도 없는
 * 활동을 지어내지 않는다. Contract as shipped (handoff 2026-08-04):
 *     GET /api/activities/public-index?cursor=&limit=1000
 *     → { items: [{ id, updated_at }], next_cursor: string | null }
 *   · active(미만료) 활동만
 *   · 인증 불필요, 개인정보 없음 (id + 갱신시각뿐)
 *   · 커서 페이지네이션 (수천 건이라 단일 응답 불가)
 * ────────────────────────────────────────────────────────────────────────────
 */

export type ActivityIndexEntry = {
  id: string;
  /** ISO date, when known — feeds <lastmod>. */
  updatedAt?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.dailyfitai.app';

/** Hard ceiling so a runaway cursor can never hang a build. */
const MAX_PAGES = 20;
const PAGE_SIZE = 1000;

/**
 * How long the ID list is cached — and therefore how stale /sitemap.xml gets.
 *
 * This is the sitemap's refresh cadence: Next derives the route's revalidate
 * from the fetch below, which is why the sitemap was observed to be exactly one
 * day behind while this was 86400 (2026-08-13: sitemap activity count equalled
 * the previous day's active count, to the URL).
 *
 * Deliberately the ONLY place this number lives. Do not also declare
 * `export const revalidate` in app/sitemap.ts — two knobs for one cadence drift
 * apart silently, and the fetch-derived path is the one proven in production.
 */
const SITEMAP_REVALIDATE_SECONDS = 21600; // 6h

export async function listPublicActivityIds(): Promise<ActivityIndexEntry[]> {
  if (!API_BASE) return [];

  const out: ActivityIndexEntry[] = [];
  let cursor: string | null = null;

  for (let page = 0; page < MAX_PAGES; page++) {
    const qs = new URLSearchParams({ limit: String(PAGE_SIZE) });
    if (cursor) qs.set('cursor', cursor);

    let payload: {
      items?: { id?: unknown; updated_at?: unknown }[];
      next_cursor?: unknown;
    };
    try {
      const res = await fetch(`${API_BASE}/api/activities/public-index?${qs}`, {
        // 6-hourly refresh. It was daily until 2026-08-13, and that cadence was
        // the one knob behind a real problem: the sitemap regenerates on this
        // schedule while activities expire continuously, so everything that
        // expired since the last regen keeps being advertised to Google as a
        // live page. Measured 2026-08-12: sitemap 9,629 vs 9,307 actually
        // active — 322 stale (3.3%), and sampled stale URLs really did 404.
        //
        // Six hours caps that window at a quarter of a day. Cost is the only
        // reason not to go lower: each regeneration is ~10 paginated requests
        // (PAGE_SIZE 1000 over ~9,300 activities), so this is 40 requests a day
        // instead of 10 — less than a single visitor browsing. Hourly would be
        // 240/day to shave a lag the catalog's own daily rhythm hides anyway.
        next: { revalidate: SITEMAP_REVALIDATE_SECONDS },
      });
      // 404 = endpoint not shipped yet (today's state). Any other failure is
      // treated the same way: return what we have, never invent entries.
      if (!res.ok) return out;
      payload = await res.json();
    } catch {
      return out;
    }

    const items = Array.isArray(payload.items) ? payload.items : [];
    for (const item of items) {
      if (typeof item?.id !== 'string' || item.id.length === 0) continue;
      out.push({
        id: item.id,
        updatedAt: typeof item.updated_at === 'string' ? item.updated_at : undefined,
      });
    }

    cursor = typeof payload.next_cursor === 'string' ? payload.next_cursor : null;
    if (!cursor || items.length === 0) break;
  }

  return out;
}
