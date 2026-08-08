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
 *
 * 사용법:
 *   node scripts/seo-healthcheck.mjs              # prod
 *   BASE=https://deploy-preview-53--x.netlify.app node scripts/seo-healthcheck.mjs
 *
 * 종료코드: 0 = 전부 통과, 1 = 하나라도 실패.
 */

const BASE = (process.env.BASE || 'https://dailyfitai.app').replace(/\/$/, '');
const KEY = process.env.INDEXNOW_KEY || 'e45cb2375308eb5b91fc5a68d981f7e4';
/** 사이트맵에서 뽑아 canonical 을 검사할 활동 상세 표본 수. */
const SAMPLE = Number(process.env.SEO_SAMPLE || 5);

const results = [];
const pass = (name, detail) => results.push({ ok: true, name, detail });
const fail = (name, detail) => results.push({ ok: false, name, detail });

async function get(path, init) {
  const url = path.startsWith('http') ? path : `${BASE}${path}`;
  const res = await fetch(url, { redirect: 'manual', cache: 'no-store', ...init });
  const body = res.status >= 300 && res.status < 400 ? '' : await res.text().catch(() => '');
  return { res, body, url };
}

function canonicalOf(html) {
  const m = html.match(/<link[^>]+rel="canonical"[^>]*>/i);
  if (!m) return null;
  const href = m[0].match(/href="([^"]+)"/i);
  return href ? href[1] : null;
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

    const foreign = locs.filter((u) => !u.startsWith(BASE));
    if (foreign.length === 0) pass('사이트맵 전부 자기 호스트', `${locs.length}건`);
    else fail('사이트맵 전부 자기 호스트', `타 호스트 ${foreign.length}건: ${foreign[0]}`);

    const investors = locs.filter((u) => /\/investors\b/.test(u));
    if (investors.length === 0) pass('noindex 페이지 사이트맵 제외', '/investors 없음');
    else fail('noindex 페이지 사이트맵 제외', `/investors 계열 ${investors.length}건이 실려 있음`);

    // ── 표본 canonical 자기참조 ─────────────────────────────────────────────
    const step = Math.max(1, Math.floor(activities.length / SAMPLE));
    const sample = Array.from({ length: Math.min(SAMPLE, activities.length) }, (_, i) => activities[i * step]);
    let bad = 0;
    for (const url of sample) {
      const page = await get(url);
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
    }
    if (bad === 0) pass('활동 canonical 자기참조', `표본 ${sample.length}건 전부 자기참조`);
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
