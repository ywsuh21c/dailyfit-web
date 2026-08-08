#!/usr/bin/env node
/**
 * IndexNow 제출기 — 로그인 없이 검색엔진에 "이 URL 다시 크롤해줘"를 통지한다.
 *
 * 왜 필요한가 (2026-08-08):
 *   색인 보류 수리(PR #52)로 활동 상세 10,282장의 canonical 이 자기참조로
 *   돌아왔다. 하지만 검색엔진은 **다시 크롤해야** 그 수리를 본다. 서치콘솔
 *   재제출은 사람 로그인이 필요한데, IndexNow 는 API 키 파일 하나로 Bing ·
 *   Naver · Yandex · Seznam 에 프로그램적으로 통지할 수 있다.
 *   (Google 은 IndexNow 미참여 — 구글은 서치콘솔 사이트맵 재제출로만.)
 *
 * 계약:
 *   · 제출 대상 = /sitemap.xml 에 실린 URL 전부. 즉 "색인 허용된 것"의 정의를
 *     사이트맵 한 곳에만 두고 여기서 복제하지 않는다. noindex 페이지는
 *     사이트맵에 없으므로 자동으로 제외된다.
 *   · 키 파일(public/<KEY>.txt)이 라이브가 아니면 IndexNow 는 422 로 거절한다.
 *     그래서 제출 전에 키 파일 도달성을 **먼저 실측**하고, 실패하면 중단한다.
 *   · 배치 상한 10,000 URL/요청 (IndexNow 명세).
 *
 * 사용법:
 *   node scripts/indexnow.mjs --dry            # 무엇을 보낼지만 출력(발신 없음)
 *   node scripts/indexnow.mjs --limit 10       # 상위 10건만 실제 제출(파일럿)
 *   node scripts/indexnow.mjs                  # 사이트맵 전부 제출
 *   node scripts/indexnow.mjs --url https://…  # 특정 URL 만 (반복 가능)
 */

const KEY = process.env.INDEXNOW_KEY || 'e45cb2375308eb5b91fc5a68d981f7e4';
const HOST = process.env.INDEXNOW_HOST || 'dailyfitai.app';
const ORIGIN = `https://${HOST}`;
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const BATCH = 10_000;

const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const valueOf = (f) => {
  const i = argv.indexOf(f);
  return i === -1 ? undefined : argv[i + 1];
};
const valuesOf = (f) =>
  argv.reduce((acc, a, i) => (a === f && argv[i + 1] ? [...acc, argv[i + 1]] : acc), []);

const DRY = has('--dry');
const LIMIT = valueOf('--limit') ? Number(valueOf('--limit')) : undefined;

function die(msg) {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

/** 키 파일이 라이브인지 실측. 이게 통과 못 하면 제출은 전부 422 다. */
async function assertKeyLive() {
  const res = await fetch(KEY_LOCATION, { cache: 'no-store' });
  if (!res.ok) {
    die(
      `키 파일이 라이브가 아님: ${KEY_LOCATION} → HTTP ${res.status}\n` +
        `  public/${KEY}.txt 가 배포되었는지 확인할 것 (배포 전에는 제출 불가).`
    );
  }
  const body = (await res.text()).trim();
  if (body !== KEY) die(`키 파일 내용 불일치: 기대 "${KEY}", 실제 "${body.slice(0, 40)}"`);
  console.log(`✓ 키 파일 라이브 확인: ${KEY_LOCATION}`);
}

async function urlsFromSitemap() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`, { cache: 'no-store' });
  if (!res.ok) die(`사이트맵을 못 읽음: HTTP ${res.status}`);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  // hreflang <xhtml:link> 는 <loc> 가 아니라 매치되지 않는다 — 정본 URL 만 남는다.
  const own = locs.filter((u) => u.startsWith(ORIGIN));
  const dropped = locs.length - own.length;
  if (dropped) console.log(`· 타 호스트 URL ${dropped}건 제외 (IndexNow 는 동일 호스트만 허용)`);
  return [...new Set(own)];
}

async function submit(batch, idx, total) {
  const payload = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: batch };
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  const text = await res.text().catch(() => '');
  const label = `배치 ${idx}/${total} (${batch.length}건)`;
  // 200 = 접수, 202 = 접수했으나 키 검증 대기. 그 외는 실패로 취급.
  if (res.status === 200 || res.status === 202) {
    console.log(`✓ ${label} → HTTP ${res.status}${text ? ` ${text.slice(0, 120)}` : ''}`);
    return true;
  }
  console.error(`✗ ${label} → HTTP ${res.status} ${text.slice(0, 300)}`);
  return false;
}

async function main() {
  const explicit = valuesOf('--url');
  let urls = explicit.length ? explicit : await urlsFromSitemap();
  if (!explicit.length) console.log(`· 사이트맵 URL ${urls.length}건`);
  if (LIMIT) {
    urls = urls.slice(0, LIMIT);
    console.log(`· --limit ${LIMIT} 적용 → ${urls.length}건`);
  }
  if (!urls.length) die('제출할 URL 이 없음');

  if (DRY) {
    console.log(`[dry] ${urls.length}건 제출 예정. 앞 5건:`);
    urls.slice(0, 5).forEach((u) => console.log(`   ${u}`));
    console.log(`[dry] 키 위치: ${KEY_LOCATION} · 엔드포인트: ${ENDPOINT}`);
    console.log('[dry] 발신하지 않았음.');
    return;
  }

  await assertKeyLive();

  const batches = [];
  for (let i = 0; i < urls.length; i += BATCH) batches.push(urls.slice(i, i + BATCH));

  let ok = 0;
  for (const [i, batch] of batches.entries()) {
    if (await submit(batch, i + 1, batches.length)) ok += 1;
  }
  console.log(`\n제출 완료: 배치 ${ok}/${batches.length} 성공 · URL ${urls.length}건`);
  if (ok !== batches.length) process.exit(1);
}

main().catch((e) => die(e?.message ?? String(e)));
