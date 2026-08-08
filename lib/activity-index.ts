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
        // Daily refresh — the catalog moves slowly and a sitemap need not be
        // realtime. Also keeps build-time cost to one request per page per day.
        next: { revalidate: 86400 },
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
