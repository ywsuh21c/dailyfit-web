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
  // ── 백엔드 v0.61.0 이 이미 주고 있던 필드들 (2026-08-09 실측으로 발견) ──────
  // 이 타입이 선언하지 않아 **응답에 실려 오는데도 버려지고 있었다.** 백엔드가 이걸
  // 추가한 이유가 정확히 "웹이 schema.org Event 를 내보내려면 startDate 가 필수인데
  // 계약에 일정이 아예 없어서 웹은 격 낮춘 WebPage 만 내보내고 있었다" 였다
  // (share.py public_detail docstring, 현진 웹 색인 요청 2). 즉 소비만 안 하고 있었다.
  //
  // ⚠️ 전부 nullable 이고 **백엔드는 없는 값을 채우지 않는다**(지어내지 않는 규칙).
  // 소비자는 null 을 정상으로 보고 값이 있는 건에만 Event 를 씌워야 한다.
  // 실측 충전율(2026-08-09, 사이트맵 무작위 n=60): start_date 26.7% · address 1.7%.
  /** 실사진 — 상세면이 카드와 같은 사진을 쓰게 하는 필드(백엔드 og 폴백보다 우선). */
  image_url?: string | null;
  hero_image_url?: string | null;
  /** 시작일 `YYYY-MM-DD`. 백엔드가 형식 불량·역전 구간(시작>종료)을 이미 걸러 null 로 준다. */
  start_date?: string | null;
  /** 종료일 `YYYY-MM-DD`. 시작만 있고 종료가 없는 건이 정상적으로 존재한다. */
  end_date?: string | null;
  /** 원문 주소(`location.address_text`). 충전율이 낮아 "없음"이 기본값이다. */
  address?: string | null;
  category?: string | null;
  group?: string | null;
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
