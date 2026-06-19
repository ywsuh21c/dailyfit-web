/**
 * Activity content source — DailyFit API (B3 GET /api/activities/{id}/public).
 *
 * ── THE SWAP SEAM ───────────────────────────────────────────────────────────
 * The share landing (/activity/[id]) reads a public activity ONLY through
 * getPublicActivity below. Today it calls the FastAPI backend server-side
 * (generateMetadata + page render run on the server → no CORS needed). If the
 * source changes, reimplement ONLY this function; the route keeps working.
 *
 * Honesty rule: returns null on any failure (no backend URL, 404, network) →
 * the route renders notFound(). We never fabricate an activity.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type PublicActivity = {
  id: string;
  title: string;
  summary: string | null;
  neighborhood: string | null;
  is_free: boolean;
  price: number | null;
  scene_key: string | null;
  og_image_url: string | null;
  share_url: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export async function getPublicActivity(id: string): Promise<PublicActivity | null> {
  if (!API_BASE) return null;
  try {
    const res = await fetch(
      `${API_BASE}/api/activities/${encodeURIComponent(id)}/public`,
      // ISR: cache 5분 — 카톡/슬랙 og 스크레이퍼 재요청에도 빠르게 응답.
      { next: { revalidate: 300 } },
    );
    if (!res.ok) return null;
    return (await res.json()) as PublicActivity;
  } catch {
    return null;
  }
}
