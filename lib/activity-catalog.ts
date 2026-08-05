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
const RETRY_LIMIT = 4; // 429·5xx 재시도 횟수
const RETRY_BACKOFF_MS = 1500; // 선형 백오프: 1.5s → 3s → 4.5s → 6s

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

    // 429(Too Many Requests)는 "천천히 하라"는 뜻이지 "끝"이 아니다. 여기서
    // 그냥 멈추면 카탈로그가 통째로 잘린다 — Netlify 빌드에서 실제로 4,365건
    // 중 2,318건만 담겼다(2026-08-05). 백오프 후 재시도한다.
    let payload: { items?: { id?: unknown }[]; next_cursor?: unknown } | null = null;
    for (let attempt = 0; attempt < RETRY_LIMIT; attempt++) {
      try {
        const res = await fetch(`${API_BASE}/api/activities?${qs}`, {
          headers: { 'X-Guest-Session': session },
          next: { revalidate: CATALOG_REVALIDATE },
        });
        if (res.ok) {
          payload = await res.json();
          break;
        }
        // 429·5xx 는 일시적일 수 있으니 기다렸다 다시. 그 외(4xx)는 재시도 무의미.
        if (res.status !== 429 && res.status < 500) break;
      } catch {
        // 네트워크 오류도 일시적일 수 있다 — 같은 백오프를 탄다.
      }
      await sleep(RETRY_BACKOFF_MS * (attempt + 1));
    }
    // 재시도까지 실패 → 여기까지 모은 것으로 진행한다(지어내지 않는다).
    if (!payload) break;

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
