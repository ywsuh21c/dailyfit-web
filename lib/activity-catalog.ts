/**
 * 활동 카탈로그 수집 — `my.dailyfitai.app` 활동 사이트맵의 원천.
 *
 * ── 왜 이 파일이 dailyfit-web 에 있는가 ─────────────────────────────────────
 * 청자 분리 방침(영우·현진 2026-08-05): 소비자는 `my.dailyfitai.app`, 투자자는
 * `dailyfitai.app`. 그래서 활동 상세의 **정본 주소는 my.** 다.
 *
 * 그런데 `my.` 는 Expo 정적 export 라 서버가 내용을 그려 보내지 못한다(크롤러가
 * 읽는 글자 16자 — 2026-08-05 실측). 그래서 렌더는 여기 Next.js 가 하고,
 * `my.` 는 Vercel rewrite 로 그 결과를 자기 주소에서 서빙한다. 이 파일은 그
 * 구성에서 "검색엔진에 알릴 활동 목록"을 만드는 몫을 맡는다.
 *
 * ── 게스트 세션을 쓰는 이유 ─────────────────────────────────────────────────
 * `GET /api/activities` 는 세션을 요구한다(인증 없이는 401 실측). 백엔드에 공개
 * 인덱스를 요청해 뒀지만(핸드오프 발송), 그걸 기다리는 동안 소비자 검색 유입을
 * 몇 주 미루는 게 더 비싸다. ISR 주기(1일)마다 세션 1건만 발급하므로 게스트
 * 테이블 부담은 하루 1건이다. 공개 인덱스가 배포되면 fetchAll 내부만 갈아끼운다.
 *
 * ── RATE LIMIT ──────────────────────────────────────────────────────────────
 * 40건/페이지 상한이라 전량은 ~95페이지다. 연속 호출하면 429 가 뜬다(실측: 98
 * 페이지째). 페이지 사이에 간격을 두고, 실패하면 **그때까지 모은 것을 반환**한다
 * — 빌드를 깨뜨리지 않고, 없는 활동을 지어내지도 않는다.
 * ────────────────────────────────────────────────────────────────────────────
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.dailyfitai.app';

/** 카탈로그는 천천히 움직인다 — 하루 1회 갱신. */
export const CATALOG_REVALIDATE = 86400;

const PAGE_SIZE = 40; // 서버 상한 (limit=200 을 줘도 40개만 온다)
const MAX_PAGES = 120;
const PAGE_DELAY_MS = 150; // 429 회피

export type CatalogActivity = { id: string };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** 게스트 세션 1건 발급. 실패하면 null — 호출부가 빈 목록으로 안전 폴백한다. */
async function createGuestSession(): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE}/api/guest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { session_id?: unknown };
    return typeof data.session_id === 'string' ? data.session_id : null;
  } catch {
    return null;
  }
}

let inflight: Promise<CatalogActivity[]> | null = null;
let cached: { at: number; items: CatalogActivity[] } | null = null;

async function fetchAll(): Promise<CatalogActivity[]> {
  const session = await createGuestSession();
  if (!session) return [];

  const out: CatalogActivity[] = [];
  const seen = new Set<string>();
  let cursor: string | null = null;

  for (let page = 0; page < MAX_PAGES; page++) {
    const qs = new URLSearchParams({ limit: String(PAGE_SIZE) });
    if (cursor) qs.set('cursor', cursor);

    let payload: { items?: { id?: unknown }[]; next_cursor?: unknown };
    try {
      const res = await fetch(`${API_BASE}/api/activities?${qs}`, {
        headers: { 'X-Guest-Session': session },
        next: { revalidate: CATALOG_REVALIDATE },
      });
      // 429 를 포함한 모든 실패 → 여기까지 모은 것으로 진행한다.
      if (!res.ok) break;
      payload = await res.json();
    } catch {
      break;
    }

    const items = Array.isArray(payload.items) ? payload.items : [];
    for (const raw of items) {
      if (typeof raw?.id !== 'string' || raw.id.length === 0) continue;
      if (seen.has(raw.id)) continue; // 커서 경계 중복 방어
      seen.add(raw.id);
      out.push({ id: raw.id });
    }

    cursor = typeof payload.next_cursor === 'string' ? payload.next_cursor : null;
    if (!cursor || items.length === 0) break;
    await sleep(PAGE_DELAY_MS);
  }

  return out;
}

/**
 * 전체 활동 ID 목록. 한 빌드/렌더 사이클 안에서 여러 번 호출해도 수집은 한 번만
 * 돈다. 실패 시 빈 배열 — 사이트맵은 비지만 유효하고, 없는 활동을 지어내지 않는다.
 */
export async function getCatalog(): Promise<CatalogActivity[]> {
  const now = Date.now();
  if (cached && now - cached.at < CATALOG_REVALIDATE * 1000) return cached.items;
  if (inflight) return inflight;

  inflight = fetchAll()
    .then((items) => {
      // 빈 결과는 캐시하지 않는다 — 일시적 API 장애가 하루 동안 굳으면 안 된다.
      if (items.length > 0) cached = { at: Date.now(), items };
      return items;
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}
