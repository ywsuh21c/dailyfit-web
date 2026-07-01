/**
 * Live activity graph — the homepage ticker ("활동 그래프 — live").
 *
 * ── SINGLE SOURCE OF TRUTH ──────────────────────────────────────────────────
 * Reads REAL, currently-active activities from the production catalog
 * (`api.dailyfitai.app`) instead of a hardcoded list, so the graph always
 * reflects the true catalog and never drifts into misleading placeholder names
 * (Michael 2026-07-01: "실제 활동들이 들어갈 수 있도록"). No manual editing —
 * the graph maintains itself.
 *
 * Flow: POST /api/guest → session → a few broad POST /api/process searches →
 * keep leisure/learning/social categories (jobs/welfare excluded — off-brand
 * for this graph) → clean + dedupe titles → self-supply first (our
 * differentiators lead). Cached at the page level via ISR (revalidate 6h).
 *
 * Safe-fallback rule: on ANY failure (API down at build/revalidate, malformed
 * payload, too few results) fall back to FALLBACK — a small set of confirmed
 * real activities — so the graph is never empty and never breaks the page.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type ActivityChip = { tag: string; name: string };

// Confirmed-real activities (verified against the live catalog 2026-07-01).
// Used when the live fetch is unavailable — never fabricated placeholders.
const FALLBACK: ActivityChip[] = [
  { tag: '자체 운영', name: '시니어 러닝클럽' },
  { tag: '자체 운영', name: '한강 자전거 라이딩' },
  { tag: '자체 운영', name: 'AI·디지털 첫걸음 교실' },
  { tag: '여가', name: '요가라테스' },
  { tag: '여가', name: '굿모닝 필라테스' },
  { tag: '여가', name: '한강 웰니스 위크' },
  { tag: '배움', name: '보태니컬 아트' },
  { tag: '배움', name: '댄스스포츠' },
  { tag: '모임', name: '독서토론회' },
  { tag: '자체 운영', name: 'ChatGPT 한 시간 입문' },
];

// Broad queries spanning the leisure / learning / social space so the sampled
// graph is varied. Self-supply anchors surface first regardless of query.
const QUERIES = [
  '운동하고 싶어요',
  '새로운 걸 배우고 싶어요',
  '사람들과 어울리고 싶어요',
  '나들이 가고 싶어요',
];

const ALLOWED_CATEGORIES = new Set(['activity', 'education', 'social']);
const MIN_CHIPS = 8;
const MAX_CHIPS = 12;
const REVALIDATE_S = 21600; // 6h

function apiBase(): string {
  // Default to the stable public API so the graph works in prod even when the
  // env var is unset (env is currently unset in prod — see deploy-gate note).
  return process.env.NEXT_PUBLIC_API_URL ?? 'https://api.dailyfitai.app';
}

/** Shorten a catalog title into a clean chip label. */
function cleanTitle(raw: string): string {
  let t = raw.trim();
  t = t.replace(/^DailyFit\s+/i, ''); // drop brand prefix (self-supply titles)
  t = t.replace(/^\d{4}\s+/, ''); // drop leading year ("2026 한강 …")
  // cut at the first descriptor separator: " — " / " - " / "(" / "[" / "|" /
  // fullwidth "｜" (catalog "…｜강좌번호 : 5") / "·강좌번호"
  t = t.split(/\s*[—–]\s*|\s+-\s+|\s*[（(【[|｜]|\s*강좌번호/)[0];
  t = t.replace(/[)\]）】]/g, ' '); // drop stray closers left over from the cut
  return t.replace(/\s+/g, ' ').trim();
}

function tagFor(category: string, source: string): string {
  const s = source.toLowerCase();
  if (s.startsWith('internal') || s.includes('dailyfit')) return '자체 운영';
  if (category === 'education') return '배움';
  if (category === 'social') return '모임';
  return '여가'; // activity (운동·레포츠·나들이 등)
}

type Candidate = { title?: unknown; category?: unknown; source?: unknown };

function extractCandidates(data: unknown): Candidate[] {
  if (typeof data !== 'object' || data === null) return [];
  const d = data as Record<string, unknown>;
  const arr = d.candidates ?? d.results ?? d.activities ?? d.cards;
  return Array.isArray(arr) ? (arr as Candidate[]) : [];
}

async function getGuestSession(base: string): Promise<string | null> {
  try {
    const res = await fetch(`${base}/api/guest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
      signal: AbortSignal.timeout(8000),
      next: { revalidate: REVALIDATE_S },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Record<string, unknown>;
    const sid = data.session_id ?? data.session_token ?? data.token;
    return typeof sid === 'string' && sid ? sid : null;
  } catch {
    return null;
  }
}

async function search(base: string, sid: string, transcript: string): Promise<Candidate[]> {
  try {
    const res = await fetch(`${base}/api/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sid}`,
        'X-Guest-Session': sid,
      },
      body: JSON.stringify({ transcript, language: 'ko', modality: 'text' }),
      signal: AbortSignal.timeout(12000),
      next: { revalidate: REVALIDATE_S },
    });
    if (!res.ok) return [];
    return extractCandidates(await res.json());
  } catch {
    return [];
  }
}

/**
 * Returns the live activity chips for the homepage ticker. Never throws; always
 * returns a full, real list (live catalog, or the confirmed-real fallback).
 */
export async function getLiveActivities(): Promise<ActivityChip[]> {
  // Dev/preview: skip the live search. It's LLM-backed (C3 intent + C5) and
  // Next can't cache POST fetches, so in dev it would re-run on EVERY request
  // (30–120s + API cost per load). Show the curated real set instantly instead.
  // Production runs the live fetch once per ISR window (revalidate 6h), in the
  // background — users always get cached HTML. Set FORCE_LIVE_ACTIVITIES=1 to
  // exercise the live path locally.
  if (process.env.NODE_ENV !== 'production' && !process.env.FORCE_LIVE_ACTIVITIES) {
    return FALLBACK;
  }

  const base = apiBase();
  const sid = await getGuestSession(base);
  if (!sid) return FALLBACK;

  const batches = await Promise.all(QUERIES.map((q) => search(base, sid, q)));

  // Round-robin across queries so each theme (운동·배움·모임·나들이) contributes
  // before any one query fills the graph — keeps the marquee varied.
  const interleaved: Candidate[] = [];
  const maxLen = Math.max(0, ...batches.map((b) => b.length));
  for (let i = 0; i < maxLen; i++) {
    for (const b of batches) if (b[i]) interleaved.push(b[i]);
  }

  const seen = new Set<string>();
  const chips: ActivityChip[] = [];
  for (const c of interleaved) {
    if (typeof c.title !== 'string') continue;
    const category = typeof c.category === 'string' ? c.category : '';
    if (!ALLOWED_CATEGORIES.has(category)) continue; // no jobs/welfare
    const name = cleanTitle(c.title);
    if (name.length < 2 || name.length > 20 || seen.has(name)) continue;
    seen.add(name);
    chips.push({ tag: tagFor(category, typeof c.source === 'string' ? c.source : ''), name });
  }

  // Self-supply (our differentiators) leads the marquee.
  chips.sort((a, b) => (a.tag === '자체 운영' ? -1 : 0) - (b.tag === '자체 운영' ? -1 : 0));

  if (chips.length < MIN_CHIPS) return FALLBACK; // too thin → safe, full fallback
  return chips.slice(0, MAX_CHIPS);
}
