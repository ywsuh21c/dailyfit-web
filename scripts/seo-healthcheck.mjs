#!/usr/bin/env node
/**
 * SEO 불변식 헬스체크 — 색인 보류 수리(PR #52)가 조용히 되돌아가는 것을 막는다.
 *
 * 왜 필요한가 (2026-08-08):
 *   색인 보류의 원인은 코드 한 줄(`myIndexLive`)과 canonical 상속 2건이었다.
 *   전부 "빌드는 통과하고 화면도 정상인데 검색엔진만 죽는" 종류다. 즉 타입체크
 *   ·테스트로는 절대 안 잡힌다. 그래서 **라이브 HTTP 로 직접 확인**하는 가드를
 *   따로 둔다. 배포 후 한 번 돌리는 것이 계약.
 *
 * 실측하는 불변식:
 *   1. 활동 상세의 canonical 이 **자기 자신**을 가리킨다 (my. 로 넘기지 않는다).
 *      → 이게 깨지면 10,282장이 통째로 색인에서 빠진다. 8/6 실사고 그 자체.
 *   2. /my-sitemap.xml 이 비어 있다 (myIndexLive=false 와 정합).
 *   3. /sitemap.xml 이 활동 상세를 담고 있다 (수천 건 규모).
 *   4. 사이트맵에 실린 URL 이 **자기참조 canonical** 을 갖는다 (표본).
 *      → "대체 페이지(적절한 표준 태그 포함)" 로 빠지는 상태를 직접 잡는다.
 *   5. robots.txt 가 사이트맵을 선언하고 Yeti(네이버)·Bingbot 을 허용한다.
 *   6. noindex 여야 하는 페이지(/investors)가 사이트맵에 없다.
 *   7. www → apex 301, apex 200.
 *   8. IndexNow 키 파일이 라이브다.
 *   9. 활동 구조화 데이터가 유효하다 (2026-08-09 추가) — Event 면 `name`·`startDate`
 *      ·`location` 필수, `startDate` ISO, 역전 구간 없음, `organizer` 없음,
 *      `image` 는 있으면 그 URL 이 화면 `<img>` 에도 있어야 하고(숨은 값 금지),
 *      Event 인 페이지는 화면에도 날짜가 보인다. Event 는 필수 속성이 없으면
 *      리치결과가 아니라 **수동조치 대상**이라 무효 Event 를 만 장 규모로 내보내는
 *      것이 가장 큰 위험이다.
 *  11. 홈·활동 상세 title 에 한글 브랜드 토큰("데일리핏")이 있다 (2026-08-17 추가)
 *      — 없으면 네이버 브랜드 질의에 구조적으로 안 잡힌다. 홈과 활동 상세는 title 을
 *      얻는 경로가 달라(default vs template) 따로 검사한다.
 *  10. 사이트맵에 실린 URL 이 실제로 살아있다 (2026-08-13 추가) — 만료 URL 이
 *      섞이는 것 자체는 구조상 정상(사이트맵 일 1회 갱신 vs 매일 마감)이므로
 *      소량은 경고, 임계 초과만 실패. 이 검사가 **canonical 검사보다 먼저** 돈다.
 *
 * 판정 3단계: ✓ 통과 · ⚠ 경고(통과하되 기록) · ✗ 실패(종료코드 1).
 * 경고를 만든 이유는 8/10 사고다 — 무해한 lag 이 빨간불로 올라오면 가드 전체가
 * 신뢰를 잃고, 실제로 그날 빨간불은 아무도 열어보지 않은 채 지나갔다.
 *
 * 사용법:
 *   node scripts/seo-healthcheck.mjs              # prod
 *   BASE=https://deploy-preview-56--x.netlify.app node scripts/seo-healthcheck.mjs
 *   BASE=http://localhost:3000 node scripts/seo-healthcheck.mjs
 *
 * ⚠️ BASE 는 "어디로 요청하나"이고 SEO_SITE_URL 은 "정본이 어디여야 하나"다(기본 prod).
 * 사이트맵·canonical 은 항상 정본 주소로 나오므로, preview 를 검사할 때도 정본 기대값은
 * prod 주소다. 둘을 섞으면 preview 에서 가짜 실패가 난다.
 *
 * 종료코드: 0 = 전부 통과, 1 = 하나라도 실패.
 */

/** 요청을 실제로 보낼 곳. prod 가 기본, deploy preview·localhost 도 가능. */
const BASE = (process.env.BASE || 'https://dailyfitai.app').replace(/\/$/, '');
/**
 * 정본 오리진 — sitemap 의 `<loc>` 와 canonical 은 **항상 이 주소**로 나온다
 * (`lib/site.ts` 의 `site.url`). BASE 와 분리해 둬야 preview 검증이 가능하다:
 * preview 를 때리면서 "정본은 prod 주소여야 한다"를 검사하는 게 올바른 판정이다.
 *
 * 🔴 이 분리가 없던 첫 버전은 `BASE=localhost` 로 돌리면 표본 URL 이 prod 를
 * 때려서(사이트맵이 절대 prod URL 을 담으므로) "자기 호스트 아님 · canonical 불일치"
 * 라는 **가짜 실패 3건**을 냈다. 헤더에 적어 둔 preview 사용법이 실제로는 안 됐다.
 */
const SITE = (process.env.SEO_SITE_URL || 'https://dailyfitai.app').replace(/\/$/, '');
const KEY = process.env.INDEXNOW_KEY || 'e45cb2375308eb5b91fc5a68d981f7e4';
/**
 * Play 공개 스토어 URL — `lib/site.ts` 의 `androidPlayUrl` 과 같은 값이어야 한다.
 * BRAND_KO 와 같은 이유로 import 하지 않고 복제한다: 이 스크립트는 **라이브 HTTP 만**
 * 보는 것이 계약이고, 소스를 읽기 시작하면 "배포된 판"이 아니라 "워크트리"를 검사하게 된다.
 */
const PLAY_URL =
  process.env.SEO_PLAY_URL || 'https://play.google.com/store/apps/details?id=kr.dailyfit.app';
/**
 * title 에 반드시 있어야 하는 한글 브랜드 토큰. `lib/site.ts` 의 `nameKo` 와 같은
 * 값이어야 한다 — 이 스크립트는 라이브 HTTP 만 보므로 소스를 import 하지 않고
 * 문자열을 복제한다. 브랜드 표기를 바꾸면 **두 곳 다** 바꿔야 하고, 안 바꾸면
 * 이 가드가 즉시 빨간불로 알려준다(그게 이 복제가 안전한 이유다).
 */
const BRAND_KO = process.env.SEO_BRAND_KO || '데일리핏';
/** 사이트맵에서 뽑아 canonical·구조화 데이터를 검사할 활동 상세 표본 수. */
const SAMPLE = Number(process.env.SEO_SAMPLE || 5);

/** 활동 활성 건수를 대조할 백엔드. 사이트맵 전체 규모가 맞는지 보는 데만 쓴다. */
const API_BASE = (process.env.SEO_API_BASE || 'https://api.dailyfitai.app').replace(/\/$/, '');

/**
 * 만료 URL 을 "실패"로 올릴 임계.
 *
 * 사이트맵은 하루 1회 갱신되고 활동은 매일 마감되므로, 최대 하루치 만료분이
 * 사이트맵에 남는 것은 **구조상 정상**이다(2026-08-13 실측: 8/12 322건 3.3% ·
 * 8/13 22건 0.24% — 그날 몇 건이 마감되냐에 따라 크게 흔들린다).
 * 임계를 넘는다는 건 lag 이 아니라 **사이트맵 갱신 자체가 멈췄다**는 뜻이다.
 *
 * 이 두 상수가 "경고냐 실패냐"를 정하는 유일한 지점이다 — 정책을 되돌리려면
 * 0 으로 낮추면 만료 URL 이 1건만 있어도 실패한다.
 */
const EXPIRED_FAIL_RATIO = Number(process.env.SEO_EXPIRED_FAIL_RATIO || 0.2); // 표본 기준
const TOTAL_LAG_FAIL_RATIO = Number(process.env.SEO_TOTAL_LAG_FAIL_RATIO || 0.05); // 전체 기준

/** 정본 URL(사이트맵에 실린 주소) → 실제로 요청할 URL. BASE==SITE 면 그대로. */
const toFetchUrl = (canonicalUrl) =>
  BASE === SITE ? canonicalUrl : canonicalUrl.replace(SITE, BASE);

const results = [];
const pass = (name, detail) => results.push({ ok: true, name, detail });
const fail = (name, detail) => results.push({ ok: false, name, detail });
/** 통과시키되 기록만 남긴다 — "알아야 하지만 고칠 건 아닌" 상태 전용. */
const warn = (name, detail) => results.push({ ok: true, warned: true, name, detail });

async function get(path, init) {
  const url = path.startsWith('http') ? path : `${BASE}${path}`;
  // 재시도 + 어느 URL 이 죽었는지 말하는 오류. 맨 처음 CI 실행이 "fetch failed"
  // 한 줄만 남기고 죽었다 — 어떤 요청인지 알 수 없으면 가드가 아니라 소음이다.
  // 사이트맵은 백엔드를 타는 동적 라우트라 콜드 스타트에 30초 넘게 걸릴 수 있다.
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const res = await fetch(url, {
        redirect: 'manual',
        cache: 'no-store',
        signal: AbortSignal.timeout(Number(process.env.SEO_TIMEOUT_MS || 60_000)),
        headers: { 'User-Agent': 'DailyFit-SEO-Healthcheck/1.0' },
        ...init,
      });
      const body =
        res.status >= 300 && res.status < 400 ? '' : await res.text().catch(() => '');
      return { res, body, url };
    } catch (e) {
      lastErr = e;
      const why = e?.cause?.code || e?.cause?.message || e?.name || '';
      console.error(`  · 요청 실패 (${attempt}/3) ${url} — ${e?.message}${why ? ` [${why}]` : ''}`);
      if (attempt < 3) await new Promise((r) => setTimeout(r, attempt * 3000));
    }
  }
  const why = lastErr?.cause?.code || lastErr?.cause?.message || lastErr?.name || '';
  throw new Error(`요청 3회 모두 실패: ${url} — ${lastErr?.message}${why ? ` [${why}]` : ''}`);
}

function canonicalOf(html) {
  const m = html.match(/<link[^>]+rel="canonical"[^>]*>/i);
  if (!m) return null;
  const href = m[0].match(/href="([^"]+)"/i);
  return href ? href[1] : null;
}

/**
 * 활동 상세의 주 JSON-LD 블록(Event 또는 WebPage)을 감사한다.
 *
 * 검사 대상은 "우리가 지키기로 한 것" 그대로다:
 *   · Event 면 `name`·`startDate`·`location` 이 전부 있어야 한다 (구글 필수).
 *   · `startDate` 는 ISO 날짜여야 한다 — 형식이 깨진 날짜는 수동조치 위험.
 *   · `organizer` 는 없어야 한다 — DB 에 실제 주최기관이 없어 일부러 뺐다.
 *   · `image` 가 있으면 그 URL 이 **페이지 <img> 에도 실제로 있어야** 한다 — 구조화
 *     데이터에만 있는 사진은 "숨은 값"이고 그게 이 검사가 막는 것이다.
 *   · Event 면 화면에도 날짜가 보여야 한다 (구조화 데이터 = 보이는 내용).
 */
function auditActivitySchema(html, url, acc) {
  const blocks = [];
  for (const m of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  )) {
    try {
      blocks.push(JSON.parse(m[1]));
    } catch {
      acc.violations.push(`${url} — JSON-LD 파싱 실패`);
    }
  }
  const main = blocks.find((b) => b?.['@type'] === 'Event' || b?.['@type'] === 'WebPage');
  if (!main) {
    acc.none += 1;
    return;
  }
  const type = main['@type'];
  acc[type] += 1;
  if (main.organizer) acc.violations.push(`${url} — organizer 가 들어갔다(DB 에 없는 사실)`);

  // `image` 는 이제 있어도 된다(2026-08-09 상세면이 실사진을 렌더함). 대신 **화면과
  // 같은 값인지**를 검사한다 — 구조화 데이터에만 있는 사진은 "숨은 값"이고, 그게
  // 이 항목이 원래 막으려던 것이다. 마크업의 URL 이 페이지 <img src> 에 실제로 있어야 한다.
  const declared = Array.isArray(main.image) ? main.image : main.image ? [main.image] : [];
  for (const src of declared) {
    if (!html.includes(src)) {
      acc.violations.push(`${url} — image 가 화면에 없다(숨은 값): ${String(src).slice(0, 70)}`);
    } else {
      acc.withPhoto += 1;
    }
  }
  if (type !== 'Event') return;

  for (const key of ['name', 'startDate', 'location']) {
    if (!main[key]) acc.violations.push(`${url} — Event 필수 속성 ${key} 없음`);
  }
  if (main.startDate && !/^\d{4}-\d{2}-\d{2}/.test(main.startDate)) {
    acc.violations.push(`${url} — startDate 형식 불량: "${main.startDate}"`);
  }
  if (main.endDate && main.startDate && main.endDate < main.startDate) {
    acc.violations.push(`${url} — 역전된 구간 (${main.startDate} > ${main.endDate})`);
  }
  if (!/<time [^>]*>[^<]+<\/time>/i.test(html)) {
    acc.violations.push(`${url} — Event 인데 화면에 날짜가 안 보인다`);
  }
}

async function main() {
  /**
   * 브랜드 토큰 검사(아래)가 쓸 표본 하나. 사이트맵 표본 중 **살아있는 것**에서
   * 고른다 — 404 페이지는 루트 레이아웃 title 을 상속해서, 죽은 URL 로 검사하면
   * 활동 상세 template 이 깨져도 홈 title 을 보고 통과해 버린다.
   */
  let liveActivityUrl = null;

  // ── 사이트맵 ──────────────────────────────────────────────────────────────
  const sitemap = await get('/sitemap.xml');
  if (!sitemap.res.ok) {
    fail('sitemap.xml 도달', `HTTP ${sitemap.res.status}`);
  } else {
    const locs = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
    const activities = locs.filter((u) => u.includes('/activity/'));
    pass('sitemap.xml 도달', `URL ${locs.length}건`);

    if (activities.length >= 1000) {
      pass('사이트맵에 활동 상세 포함', `${activities.length}건`);
    } else {
      fail(
        '사이트맵에 활동 상세 포함',
        `${activities.length}건 — 롱테일 검색 유입의 본체가 빠졌다 (public-index 엔드포인트 확인)`
      );
    }

    const foreign = locs.filter((u) => !u.startsWith(SITE));
    if (foreign.length === 0) pass('사이트맵 전부 정본 호스트', `${locs.length}건 모두 ${SITE}`);
    else fail('사이트맵 전부 정본 호스트', `타 호스트 ${foreign.length}건: ${foreign[0]}`);

    const investors = locs.filter((u) => /\/investors\b/.test(u));
    if (investors.length === 0) pass('noindex 페이지 사이트맵 제외', '/investors 없음');
    else fail('noindex 페이지 사이트맵 제외', `/investors 계열 ${investors.length}건이 실려 있음`);

    // ── 사이트맵 ↔ 백엔드 활성 건수 대조 ──────────────────────────────────────
    // 표본은 몇십 건이라 3% 수준의 lag 을 통째로 놓칠 수 있다(8/12 실측 3.3% 인데
    // 표본 10건 중 1건만 걸렸다). 전체 규모를 직접 맞춰야 "사이트맵이 며칠째 안
    // 갱신되고 있다" 는 큰 고장이 잡힌다.
    //   초과(사이트맵 > 활성) = 마감됐는데 아직 실려 있는 것 — 이번 사안.
    //   부족(사이트맵 < 활성) = 새로 생겼는데 아직 안 실린 것 — 같은 lag 의 반대편.
    // 백엔드가 안 뜨면 실패가 아니라 경고다. SEO 가드가 백엔드 가용성까지 판정하면
    // 빨간불의 의미가 흐려진다.
    try {
      const cnt = await get(`${API_BASE}/api/activities/count`);
      const active = Number(JSON.parse(cnt.body)?.active);
      if (!Number.isFinite(active) || active <= 0) {
        warn('사이트맵 규모 대조', `백엔드 활성 건수를 못 읽음 — ${cnt.body.slice(0, 80)}`);
      } else {
        const diff = activities.length - active;
        const ratio = Math.abs(diff) / active;
        const how = diff >= 0 ? '초과(마감분 잔류)' : '부족(신규 미반영)';
        const detail =
          `사이트맵 ${activities.length}건 · 백엔드 활성 ${active}건 → ` +
          `${diff >= 0 ? '+' : ''}${diff}건 ${how}, ${(ratio * 100).toFixed(1)}%`;
        if (ratio >= TOTAL_LAG_FAIL_RATIO) {
          fail(
            '사이트맵 규모 대조',
            `${detail} — 임계 ${(TOTAL_LAG_FAIL_RATIO * 100).toFixed(0)}% 초과. 일 1회 갱신 lag 으로는 ` +
              `설명이 안 되는 크기다. 사이트맵 재생성이 멈췄는지 볼 것`
          );
        } else {
          pass('사이트맵 규모 대조', detail);
        }
      }
    } catch (e) {
      warn('사이트맵 규모 대조', `백엔드 대조 실패(가드 판정에서 제외) — ${e?.message ?? e}`);
    }

    // ── 표본: 먼저 살아있는지, 그다음 canonical·구조화 데이터 ────────────────
    //
    // 🔴 이 순서가 핵심이다. 2026-08-10 가드 빨간불의 정체는 canonical 회귀가
    // 아니라 **표본으로 뽑힌 활동이 그 사이 마감돼 404 였던 것**이었다. 404 페이지는
    // 루트 레이아웃의 canonical '/' 을 상속하므로, 상태코드를 안 보고 canonical 만
    // 보면 `canonical="https://dailyfitai.app" (다른 주소를 정본으로 선언)` 이라고
    // 찍힌다 — 8/6 실사고와 글자까지 똑같아서 진짜 회귀로 오독된다. 그래서 죽은
    // URL 은 canonical·구조화 데이터 검사에서 **제외**하고 별도 신호로 보고한다.
    const step = Math.max(1, Math.floor(activities.length / SAMPLE));
    const sample = Array.from({ length: Math.min(SAMPLE, activities.length) }, (_, i) => activities[i * step]);
    const expired = [];
    const live = [];
    let bad = 0;
    // 구조화 데이터 집계 — Event 로 승격된 비율과 필수 속성 위반을 같은 순회에서 본다.
    const schema = { Event: 0, WebPage: 0, none: 0, withPhoto: 0, violations: [] };
    for (const url of sample) {
      // url = 정본(사이트맵) 주소. 요청은 BASE 로, 기대 canonical 은 정본 주소.
      const page = await get(toFetchUrl(url));
      if (page.res.status === 404 || page.res.status === 410) {
        expired.push(url);
        continue;
      }
      live.push(url);
      if (!liveActivityUrl) liveActivityUrl = url;
      const canon = canonicalOf(page.body);
      if (!canon) {
        bad += 1;
        fail('활동 canonical 존재', `${url} — canonical 태그 없음`);
      } else if (canon.replace(/\/$/, '') !== url.replace(/\/$/, '')) {
        bad += 1;
        fail(
          '활동 canonical 자기참조',
          `${url}\n      → canonical="${canon}" (다른 주소를 정본으로 선언 = 색인 제외)`
        );
      }
      auditActivitySchema(page.body, url, schema);
    }

    // ── 사이트맵 URL 생존 (표본) ─────────────────────────────────────────────
    const expiredRatio = sample.length ? expired.length / sample.length : 0;
    const expiredPct = (expiredRatio * 100).toFixed(0);
    if (expired.length === 0) {
      pass('사이트맵 URL 생존', `표본 ${sample.length}건 전부 응답`);
    } else if (expiredRatio >= EXPIRED_FAIL_RATIO) {
      fail(
        '사이트맵 URL 생존',
        `사이트맵에 만료 URL ${expired.length}/${sample.length}건 (${expiredPct}%) — 임계 ` +
          `${(EXPIRED_FAIL_RATIO * 100).toFixed(0)}% 초과. canonical 문제가 아니라 사이트맵 갱신이 ` +
          `멈췄을 가능성을 먼저 볼 것\n      ${expired[0]}`
      );
    } else {
      warn(
        '사이트맵 URL 생존',
        `사이트맵에 만료 URL ${expired.length}/${sample.length}건 (${expiredPct}%) — 일 1회 갱신 lag, ` +
          `정상 범위(임계 ${(EXPIRED_FAIL_RATIO * 100).toFixed(0)}%). 만료면 404 이고 404 는 noindex 라 색인 위험 없음`
      );
    }

    if (live.length === 0) {
      // 표본이 전부 죽으면 canonical·구조화 데이터는 "위반 0"으로 조용히 통과한다.
      // 검사를 못 한 것을 통과로 읽지 않도록 여기서 명시적으로 실패시킨다.
      fail('활동 canonical 자기참조', `표본 ${sample.length}건이 전부 만료라 canonical 을 검사하지 못했다`);
    } else if (bad === 0) {
      pass('활동 canonical 자기참조', `살아있는 표본 ${live.length}건 전부 자기참조`);
    }

    // ── 활동 구조화 데이터 ───────────────────────────────────────────────────
    // 왜 가드가 필요한가: Event 는 `startDate`·`location` 이 없으면 리치결과가 아니라
    // **수동조치 대상**이다. 백엔드가 날짜를 null 로 주기 시작하거나 계약이 바뀌면
    // 웹은 조용히 "필수 속성 없는 Event" 를 10,000장 규모로 내보낼 수 있다.
    if (schema.violations.length > 0) {
      fail('활동 구조화 데이터 유효', schema.violations.slice(0, 5).join('\n      '));
    } else if (live.length > 0) {
      pass(
        '활동 구조화 데이터 유효',
        `Event ${schema.Event}건 · WebPage ${schema.WebPage}건 · 실사진 ${schema.withPhoto}건 (살아있는 표본 ${live.length}) — 위반 0`
      );
    }
    if (live.length > 0) {
      if (schema.none === 0) pass('활동 JSON-LD 존재', `살아있는 표본 ${live.length}건 전부 존재`);
      else fail('활동 JSON-LD 존재', `${schema.none}건에 Event/WebPage 블록이 없음`);
    }
  }

  // ── my-sitemap (myIndexLive=false 정합) ───────────────────────────────────
  const mySitemap = await get('/my-sitemap.xml');
  const myLocs = (mySitemap.body.match(/<loc>/g) || []).length;
  if (myLocs === 0) pass('my-sitemap 비어 있음', `loc ${myLocs}건 (myIndexLive=false 와 정합)`);
  else
    fail(
      'my-sitemap 비어 있음',
      `loc ${myLocs}건 — myIndexLive 가 켜졌다면 my. rewrite 가 살아있는지 먼저 확인할 것`
    );

  // ── 한글 브랜드 토큰 (2026-08-17 추가) ────────────────────────────────────
  //
  // 왜 가드가 필요한가: 8/17 실측에서 홈·활동 상세 8,701장의 title 에 "데일리핏"
  // 이라는 한글 문자열이 **0회**였다. 전부 `· DailyFit` 접미였다. 이건 화면상
  // 아무 이상이 없고 빌드도 통과하는 종류의 고장이라 — 8/6 색인 사고와 성질이
  // 같다 — 사람 눈으로는 영원히 안 잡힌다. 그리고 지금 그 토큰은 `app/layout.tsx`
  // 의 title.template **한 줄**에 걸려 있어서, 누가 그 줄을 영문으로 되돌리면
  // 만 장 규모가 조용히 함께 되돌아간다.
  //
  // 활동 상세를 홈과 **따로** 검사하는 이유: 둘은 서로 다른 경로로 title 을 얻는다
  // (홈 = title.default, 활동 = title.template). 홈만 보면 template 회귀를 놓친다.
  {
    const home = await get('/');
    const homeTitle = (home.body.match(/<title>([^<]*)<\/title>/i) || [])[1] || '';
    if (homeTitle.includes(BRAND_KO))
      pass('홈 title 한글 브랜드', `"${homeTitle}"`);
    else
      fail(
        '홈 title 한글 브랜드',
        `"${homeTitle}" — "${BRAND_KO}" 없음. 네이버는 어휘 매칭 비중이 높아 이 토큰이 ` +
          `없으면 브랜드 질의에 구조적으로 안 잡힌다 (lib/site.ts nameKo)`
      );

    if (!liveActivityUrl) {
      warn('활동 상세 title 한글 브랜드', '살아있는 표본 URL 이 없어 검사 못 함');
    } else {
      const act = await get(toFetchUrl(liveActivityUrl));
      const actTitle = (act.body.match(/<title>([^<]*)<\/title>/i) || [])[1] || '';
      if (actTitle.includes(BRAND_KO))
        pass('활동 상세 title 한글 브랜드', `"${actTitle}"`);
      else
        fail(
          '활동 상세 title 한글 브랜드',
          `"${actTitle}" — "${BRAND_KO}" 없음. 롱테일 ${'수천'}장이 통째로 브랜드 토큰을 ` +
            `잃은 상태다 (app/layout.tsx 의 title.template 확인)`
        );
    }
  }

  // ── robots ────────────────────────────────────────────────────────────────
  const robots = await get('/robots.txt');
  if (!robots.res.ok) fail('robots.txt 도달', `HTTP ${robots.res.status}`);
  else {
    const r = robots.body;
    const checks = [
      [/Sitemap:\s*\S*sitemap\.xml/i, 'Sitemap 선언'],
      [/Yeti/i, 'Yeti(네이버) 언급'],
      [/Bingbot/i, 'Bingbot 언급'],
    ];
    const missing = checks.filter(([re]) => !re.test(r)).map(([, label]) => label);
    if (!missing.length) pass('robots.txt 정합', 'Sitemap + Yeti + Bingbot');
    else fail('robots.txt 정합', `누락: ${missing.join(', ')}`);
    if (/^\s*Disallow:\s*\/\s*$/im.test(r))
      fail('robots.txt 전체차단 아님', 'Disallow: / 가 있다 — 사이트 전체가 크롤 차단 상태');
    else pass('robots.txt 전체차단 아님', '전역 Disallow: / 없음');
  }

  // ── 도메인 ────────────────────────────────────────────────────────────────
  if (BASE === 'https://dailyfitai.app') {
    const www = await get('https://www.dailyfitai.app/');
    const loc = www.res.headers.get('location') || '';
    if (www.res.status === 301 && loc.startsWith('https://dailyfitai.app'))
      pass('www → apex 301', `${www.res.status} → ${loc}`);
    else fail('www → apex 301', `HTTP ${www.res.status} location="${loc}"`);
  }

  // ── 안드 출시 스위치 ↔ Play 공개 URL (2026-09-02 추가) ────────────────────
  // 왜 여기인가: 8/8 에 #42 가 `ANDROID_APP_LIVE=true` 로 머지됐는데 그 전제인
  // Play 프로덕션 승인은 7/30 에 거절된 상태였다. **9일간** `/get` 의 안드 버튼이
  // 404 로 보냈고, 빌드·타입체크·테스트 어느 것도 못 잡았다 — 이건 코드가 아니라
  // **바깥 세상과의 정합**이라 라이브 HTTP 로만 잡힌다.
  //
  // 🔴 양방향으로 판정한다. 한쪽만 보면 반대편 사고가 그대로 남는다:
  //   · 켰는데 Play 가 404      → ✗ 실패. 사용자가 막힌 페이지에 부딪힌다
  //   · Play 가 200 인데 껐음   → ⚠ 경고. 출시했는데 사이트가 "미출시"라고 말한다
  //     (실패가 아닌 이유: 출시 직후 배포 전까지는 정상적으로 이 상태를 지난다)
  //
  // 사이트가 실제로 어느 쪽인지는 **라이브에서** 읽는다 — 소스 상수를 import 하지
  // 않는다. 이 가드는 "배포된 판"을 검사하는 것이지 "워크트리"를 검사하는 게 아니다.
  // 판정 근거 = `/product` 의 MobileApplication JSON-LD `operatingSystem`
  // (`androidAppLive` 에서 파생되는 값이라 이게 곧 배포된 스위치의 상태다).
  // 🔴 이 블록은 스크립트의 **첫 서드파티 호출**이다. Play 가 흔들리면 get() 이 3회
  //    재시도 뒤 throw 하고, main() 에 try/catch 가 없어 **앞서 쌓은 결과 11건이 통째로
  //    버려진 채** 리포트도 못 찍고 죽는다. 남의 집 사정으로 우리 가드 전체가 침묵하면
  //    안 되므로, 여기만 따로 감싸서 «판정 불가» 로 강등한다 (코드리뷰 적발).
  try {
    const productForSwitch = await get('/product');
    const playProbe = await get(PLAY_URL);
    // 🔴 소프트-404 대조군. "200 이면 게시됨"은 Play 가 없는 앱에도 200 을 주는 순간
    // 무너진다. 그래서 **존재할 수 없는 패키지 id** 를 같은 방식으로 한 번 때려 보고,
    // 그쪽도 200 이면 상태코드 자체를 판정에 못 쓴다고 선언한다(미상 처리).
    const playControl = await get(PLAY_URL.replace(/id=.*$/, 'id=kr.dailyfit.app.nonexistent'));
    const statusIsMeaningful = playControl.res.status !== 200;

    // 🔴 사이트 쪽 판정은 **JSON-LD 가 실제로 있을 때만** 유효하다. 종전 정규식은
    //    "operatingSystem 에 Android 가 없다"와 "MobileApplication 자체가 없다"를
    //    구분하지 못해, <JsonLd data={mobileAppJsonLd()} /> 를 지우면 이 검사가
    //    영원히 초록이 됐다 — 아무것도 안 재고 통과하는 가드다 (코드리뷰 적발).
    const osMatch = productForSwitch.body.match(/"operatingSystem"\s*:\s*"([^"]*)"/i);
    if (!productForSwitch.res.ok)
      fail('안드 출시 스위치 ↔ Play 공개 URL', `/product 가 HTTP ${productForSwitch.res.status} — 판정 근거를 못 읽었다`);
    else if (!osMatch)
      fail(
        '안드 출시 스위치 ↔ Play 공개 URL',
        '/product 에 MobileApplication 의 operatingSystem 이 없다 — ' +
          '스위치를 읽을 근거가 사라졌다(JsonLd 블록이 지워졌는지 확인). 이 가드는 그 상태를 초록으로 넘기지 않는다'
      );
    // 🔴 상태코드는 **200/404 일 때만** 판정에 쓴다. 403·429·5xx 를 "미게시"로 읽으면,
    //    출시 후 CI 아이피가 429 를 한 번 맞는 순간 가드가 "살아있는 앱을 내려라"고
    //    지시한다. 대조군도 같이 막히므로 소프트-404 검사로는 안 걸러진다 (코드리뷰 적발).
    else if (![200, 404].includes(playProbe.res.status))
      warn(
        '안드 출시 스위치 ↔ Play 공개 URL',
        `판정 불가 — Play 가 HTTP ${playProbe.res.status} 를 줬다` +
          `${playProbe.res.headers.get('location') ? ` (location="${playProbe.res.headers.get('location')}")` : ''}. ` +
          `200/404 가 아니면 게시 여부를 가를 수 없다(차단·레이트리밋·장애 구분 불가)`
      );
    else if (!statusIsMeaningful)
      warn(
        '안드 출시 스위치 ↔ Play 공개 URL',
        '판정 불가 — 없는 패키지에도 HTTP 200 이 돌아왔다(소프트-404). ' +
          '상태코드로는 게시 여부를 못 가른다. Play Console 에서 직접 확인할 것'
      );
    else {
      const siteSaysAndroidLive = /Android/i.test(osMatch[1]);
      const playIsPublic = playProbe.res.status === 200;
      if (siteSaysAndroidLive && !playIsPublic)
        fail(
          '안드 출시 스위치 ↔ Play 공개 URL',
          `사이트는 Android 출시라고 말하는데 Play 공개 URL 이 HTTP ${playProbe.res.status} 다 — ` +
            `/get 의 안드 버튼이 막힌 페이지로 보낸다. lib/site.ts 의 androidAppLive 를 false 로.`
        );
      else if (!siteSaysAndroidLive && playIsPublic)
        warn(
          '안드 출시 스위치 ↔ Play 공개 URL',
          `Play 공개 URL 이 200(게시됨)인데 사이트는 아직 "미출시"로 말한다 — ` +
            `lib/site.ts 의 androidAppLive 를 true 로 켜고 배포할 것. ` +
            `(스토어 배지 · sameAs · MobileApplication · /llms.txt 가 한꺼번에 따라온다)`
        );
      else
        pass(
          '안드 출시 스위치 ↔ Play 공개 URL',
          siteSaysAndroidLive
            ? `양쪽 다 출시됨 (operatingSystem="${osMatch[1]}" · Play 200)`
            : `양쪽 다 미출시 (operatingSystem="${osMatch[1]}" · Play 404)`
        );
    }
  } catch (e) {
    warn(
      '안드 출시 스위치 ↔ Play 공개 URL',
      `판정 불가 — 요청이 끝내 실패했다: ${e?.message ?? e}. ` +
        `다른 검사를 죽이지 않으려고 경고로 강등한다(가드가 침묵하는 것보다 낫다)`
    );
  }

  // ── IndexNow 키 파일 ──────────────────────────────────────────────────────
  const key = await get(`/${KEY}.txt`);
  if (key.res.ok && key.body.trim() === KEY) pass('IndexNow 키 파일 라이브', `/${KEY}.txt`);
  else
    fail(
      'IndexNow 키 파일 라이브',
      `HTTP ${key.res.status} — 배포 전이면 정상. 배포 후에도 실패면 public/ 서빙 확인`
    );

  // ── 리포트 ────────────────────────────────────────────────────────────────
  const failed = results.filter((r) => !r.ok);
  const warned = results.filter((r) => r.warned);
  console.log(`\nSEO 헬스체크 — ${BASE}\n${'─'.repeat(60)}`);
  for (const r of results)
    console.log(`${!r.ok ? '✗' : r.warned ? '⚠' : '✓'} ${r.name}\n    ${r.detail}`);
  console.log(`${'─'.repeat(60)}`);
  console.log(`${results.length - failed.length}/${results.length} 통과${warned.length ? ` (경고 ${warned.length}건)` : ''}`);
  if (warned.length) console.log(`경고 ${warned.length}건: ${warned.map((w) => w.name).join(' · ')}`);
  if (failed.length) {
    console.log(`\n실패 ${failed.length}건: ${failed.map((f) => f.name).join(' · ')}`);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(`✗ 헬스체크 자체가 실패: ${e?.message ?? e}`);
  process.exit(1);
});
