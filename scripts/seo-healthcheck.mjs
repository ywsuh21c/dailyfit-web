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
/** 사이트맵에서 뽑아 canonical·구조화 데이터를 검사할 활동 상세 표본 수. */
const SAMPLE = Number(process.env.SEO_SAMPLE || 5);

/** 정본 URL(사이트맵에 실린 주소) → 실제로 요청할 URL. BASE==SITE 면 그대로. */
const toFetchUrl = (canonicalUrl) =>
  BASE === SITE ? canonicalUrl : canonicalUrl.replace(SITE, BASE);

const results = [];
const pass = (name, detail) => results.push({ ok: true, name, detail });
const fail = (name, detail) => results.push({ ok: false, name, detail });

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

    // ── 표본 canonical 자기참조 ─────────────────────────────────────────────
    const step = Math.max(1, Math.floor(activities.length / SAMPLE));
    const sample = Array.from({ length: Math.min(SAMPLE, activities.length) }, (_, i) => activities[i * step]);
    let bad = 0;
    // 구조화 데이터 집계 — Event 로 승격된 비율과 필수 속성 위반을 같은 순회에서 본다.
    const schema = { Event: 0, WebPage: 0, none: 0, withPhoto: 0, violations: [] };
    for (const url of sample) {
      // url = 정본(사이트맵) 주소. 요청은 BASE 로, 기대 canonical 은 정본 주소.
      const page = await get(toFetchUrl(url));
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
    if (bad === 0) pass('활동 canonical 자기참조', `표본 ${sample.length}건 전부 자기참조`);

    // ── 활동 구조화 데이터 ───────────────────────────────────────────────────
    // 왜 가드가 필요한가: Event 는 `startDate`·`location` 이 없으면 리치결과가 아니라
    // **수동조치 대상**이다. 백엔드가 날짜를 null 로 주기 시작하거나 계약이 바뀌면
    // 웹은 조용히 "필수 속성 없는 Event" 를 10,000장 규모로 내보낼 수 있다.
    if (schema.violations.length === 0) {
      pass(
        '활동 구조화 데이터 유효',
        `Event ${schema.Event}건 · WebPage ${schema.WebPage}건 · 실사진 ${schema.withPhoto}건 (표본 ${sample.length}) — 위반 0`
      );
    } else {
      fail('활동 구조화 데이터 유효', schema.violations.slice(0, 5).join('\n      '));
    }
    if (schema.none === 0) pass('활동 JSON-LD 존재', `표본 ${sample.length}건 전부 존재`);
    else fail('활동 JSON-LD 존재', `${schema.none}건에 Event/WebPage 블록이 없음`);
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
  console.log(`\nSEO 헬스체크 — ${BASE}\n${'─'.repeat(60)}`);
  for (const r of results) console.log(`${r.ok ? '✓' : '✗'} ${r.name}\n    ${r.detail}`);
  console.log(`${'─'.repeat(60)}`);
  console.log(`${results.length - failed.length}/${results.length} 통과`);
  if (failed.length) {
    console.log(`\n실패 ${failed.length}건: ${failed.map((f) => f.name).join(' · ')}`);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(`✗ 헬스체크 자체가 실패: ${e?.message ?? e}`);
  process.exit(1);
});
