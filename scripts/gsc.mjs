#!/usr/bin/env node
/**
 * Google Search Console — 사이트맵 제출 · 색인 현황 조회 CLI.
 *
 * ── 왜 이 스크립트가 있는가 ─────────────────────────────────────────────────
 * 「구글 서치콘솔에 사이트맵 재제출」은 2026-08-08 · 08-17 · 08-19 세 번의 세션이
 * 모두 "영우 손, 2분"으로 남긴 채 **3주 넘게 닫히지 않은 항목**이다. 그동안
 * 우리가 구글 색인에 몇 장이나 들어가 있는지도 **한 번도 재지 못했다** —
 * `site:` 질의는 봇 차단·CAPTCHA 로 0 을 돌려주는데 그 0 은 측정 실패지 사실이
 * 아니라서 판정에 쓸 수 없었다.
 *
 * 막고 있던 것은 권한 하나다: gcloud 기본 토큰에 `webmasters` 스코프가 없어
 * 403 이 난다(2026-08-17 · 09-02 두 번 실측, 같은 결과).
 *
 * 그 스코프는 **한 번만** 받으면 된다. 그 뒤로는 사람이 콘솔에 들어갈 일 없이
 * 이 스크립트가 제출·조회를 대신한다. 즉 이 파일의 값은 "2분을 아껴 준다"가
 * 아니라 **반복 가능한 측정 수단을 만든다**는 데 있다.
 *
 * ── 쓰는 법 ─────────────────────────────────────────────────────────────────
 *   node scripts/gsc.mjs check     # 권한·속성 확인만 (아무것도 바꾸지 않음)
 *   node scripts/gsc.mjs status    # 사이트맵 제출 이력·색인 장수·상위 질의
 *   node scripts/gsc.mjs submit    # 🔴 사이트맵 제출 (구글에 쓰기)
 *
 * 스코프가 없으면 어느 명령이든 **정확한 한 줄 명령**을 안내하고 종료한다.
 * ────────────────────────────────────────────────────────────────────────────
 */

import { execFileSync } from 'node:child_process';

const SITE = process.env.GSC_SITE || 'https://dailyfitai.app/';
const SITEMAP = process.env.GSC_SITEMAP || 'https://dailyfitai.app/sitemap.xml';
const SCOPE = 'https://www.googleapis.com/auth/webmasters';

/** gcloud 가 들고 있는 액세스 토큰. 없으면 명확히 죽는다(조용한 폴백 금지). */
function token() {
  try {
    return execFileSync('gcloud', ['auth', 'print-access-token'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    console.error('✗ gcloud 액세스 토큰을 못 읽었다. `gcloud auth login` 먼저.');
    process.exit(2);
  }
}

/**
 * 🔴 재로그인은 **기존 스코프를 덮어쓴다.** 그래서 안내 명령을 상수로 박아두면
 * 안 된다 — 지금 토큰이 들고 있는 스코프(cloud-platform·compute·appengine.admin
 * ·sqlservice.login 등 배포에 쓰이는 것들)가 조용히 **빠진다**. 그러면 SEO 를
 * 재려다가 배포를 끊는다.
 *
 * 그래서 현재 스코프를 **라이브로 읽어** 거기에 webmasters 만 더한 명령을 만든다.
 * 실패하면 명령을 지어내지 않고 그 사실을 말한다(fail-closed).
 */
async function grantCommand() {
  let current = [];
  try {
    const res = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token()}`
    );
    const info = await res.json();
    current = String(info.scope || '').split(/\s+/).filter(Boolean);
  } catch {
    return null;
  }
  if (!current.length) return null;
  // 지금 있는 것 전부 + webmasters. 순서는 그대로 두고 중복만 뺀다.
  const merged = Array.from(new Set([...current, SCOPE]));
  return `gcloud auth login --update-adc --scopes="${merged.join(',')}"`;
}

async function explainScope() {
  const cmd = await grantCommand();
  console.error(
    [
      '',
      '✗ 이 토큰에는 Search Console(webmasters) 스코프가 없다 — 403.',
      '  (2026-08-17 · 09-02 두 번 같은 결과. 이건 버그가 아니라 권한이 없는 것이다.)',
      '',
      '  🔑 딱 한 번만 아래를 실행하면 그 뒤로는 이 스크립트가 계속 쓸 수 있다:',
      '',
      cmd
        ? `    ${cmd}`
        : '    (현재 스코프를 못 읽어 안전한 명령을 만들 수 없다 — 지어내지 않는다.\n' +
          '     `gcloud auth print-access-token` 이 되는지 먼저 확인할 것.)',
      '',
      '  · 브라우저가 열리고 구글 로그인 → 권한 동의 화면에서 "허용" 한 번.',
      '  · 🔴 서치콘솔 속성을 소유한 계정으로 로그인할 것 (dailyfitai.app 을 등록한 그 계정).',
      '  · 🔴 위 명령에는 **지금 쓰고 있는 스코프가 전부 포함돼 있다.** 재로그인이 스코프를',
      '    덮어쓰기 때문에, 짧은 명령을 대신 치면 배포용 권한(cloud-platform·compute 등)이',
      '    조용히 빠진다. 그대로 복사해서 쓸 것.',
      '  · 되돌리기: `gcloud auth revoke` 후 평소 쓰던 로그인으로 다시.',
      '',
    ].join('\n')
  );
  process.exit(3);
}

async function api(path, init) {
  const res = await fetch(`https://www.googleapis.com/webmasters/v3${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token()}`, ...(init?.headers || {}) },
  });
  if (res.status === 403) {
    const body = await res.text().catch(() => '');
    if (/SCOPE_INSUFFICIENT|insufficient/i.test(body)) await explainScope();
    console.error(`✗ 403 — ${body.slice(0, 300)}`);
    process.exit(4);
  }
  const text = await res.text().catch(() => '');
  return { status: res.status, body: text ? JSON.parse(text) : null };
}

async function cmdCheck() {
  const { status, body } = await api('/sites');
  if (status !== 200) {
    console.error(`✗ HTTP ${status}`, body);
    process.exit(4);
  }
  const entries = body?.siteEntry || [];
  console.log(`✓ 스코프 있음. 접근 가능한 속성 ${entries.length}개:`);
  for (const e of entries) console.log(`   · ${e.siteUrl}  (${e.permissionLevel})`);
  const mine = entries.find((e) => e.siteUrl === SITE);
  console.log(
    mine
      ? `✓ 대상 속성 ${SITE} 접근 가능 (${mine.permissionLevel})`
      : `⚠ 대상 속성 ${SITE} 이 목록에 없다 — 속성 주소 표기(도메인 vs URL 접두어)를 확인할 것`
  );
}

async function cmdStatus() {
  const enc = encodeURIComponent(SITE);
  const { status, body } = await api(`/sites/${enc}/sitemaps`);
  if (status !== 200) {
    console.error(`✗ HTTP ${status}`, body);
    process.exit(4);
  }
  const maps = body?.sitemap || [];
  if (!maps.length) {
    console.log('⚠ 제출된 사이트맵이 **하나도 없다.** 이게 색인이 안 되는 이유일 수 있다.');
    console.log('   → `node scripts/gsc.mjs submit` 으로 제출.');
    return;
  }
  console.log(`제출된 사이트맵 ${maps.length}건:`);
  for (const m of maps) {
    const web = (m.contents || []).find((c) => c.type === 'web') || {};
    console.log(
      `  · ${m.path}\n` +
        `      최종 제출 : ${m.lastSubmitted || '미상'}\n` +
        `      최종 다운로드: ${m.lastDownloaded || '아직 안 가져감'}\n` +
        `      제출 URL  : ${web.submitted ?? '?'}   색인됨: ${web.indexed ?? '(구글이 이 값을 더 이상 안 준다)'}\n` +
        `      오류/경고 : ${m.errors ?? 0} / ${m.warnings ?? 0}`
    );
  }
}

async function cmdSubmit() {
  const enc = encodeURIComponent(SITE);
  const encMap = encodeURIComponent(SITEMAP);
  const { status, body } = await api(`/sites/${enc}/sitemaps/${encMap}`, { method: 'PUT' });
  if (status === 204 || status === 200) {
    console.log(`✓ 제출 완료 — ${SITEMAP}`);
    console.log('  구글이 실제로 가져갔는지는 `status` 로 확인 (lastDownloaded 가 채워진다).');
    console.log(`  🔴 회복 추적 기준 시각으로 이 시각을 기록할 것: ${new Date().toISOString()}`);
    return;
  }
  console.error(`✗ HTTP ${status}`, body);
  process.exit(4);
}

const cmd = process.argv[2] || 'check';
const run = { check: cmdCheck, status: cmdStatus, submit: cmdSubmit }[cmd];
if (!run) {
  console.error('사용법: node scripts/gsc.mjs [check|status|submit]');
  process.exit(1);
}
run().catch((e) => {
  console.error(`✗ 실패: ${e?.message ?? e}`);
  process.exit(1);
});
