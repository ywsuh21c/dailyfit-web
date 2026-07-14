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

/**
 * 프로덕션 API. 환경변수(NEXT_PUBLIC_API_BASE_URL)가 우선이지만, 미설정이어도 공유 링크가
 * 죽지 않도록 운영 주소로 폴백한다.
 *
 * 왜: 2026-07-14 실측 — 배포 환경에 이 변수가 없어 getPublicActivity 가 즉시 null 을
 * 반환했고, /activity/[id] 가 통째로 404 였다(백엔드 /api/activities/{id}/public 은 200 정상).
 * 그 결과 앱에서 카톡으로 보낸 활동 링크가 (a) 미리보기 카드가 안 뜨고 (b) 받은 사람이
 * 누르면 404 를 봤다. API 주소는 앱에도 하드코딩된 공개 정보라 폴백이 안전하다.
 */
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.dailyfitai.app';

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
