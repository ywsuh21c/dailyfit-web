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
 *   node scripts/gsc.mjs status    # 사이트맵 제출 이력 (언제 냈나 · 구글이 가져갔나 · 오류)
 *   node scripts/gsc.mjs queries   # 최근 28일 검색 노출 실측 (노출수·클릭·평균순위)
 *   node scripts/gsc.mjs submit    # 🔴 사이트맵 제출 (구글에 쓰기)
 *
 * 🔴 **「색인 장수」는 이 API 로 못 읽는다.** 그 숫자는 서치콘솔 «페이지 색인 생성»
 * 리포트에만 있고 공개 API 에 없다. 처음엔 `status` 가 그걸 준다고 적어 뒀는데
 * 구현은 사이트맵만 읽고 있었다(코드리뷰 적발) — 그래서 문구를 구현에 맞췄다.
 * 대신 `queries` 가 더 직접적인 답을 준다: **우리가 검색 결과에 뜨긴 하는가**
 * (노출수 0 이면 색인이 안 됐거나 아무 질의에도 안 걸린 것이다).
 *
 * 스코프가 없으면 어느 명령이든 **정확한 한 줄 명령**을 안내하고 종료한다.
 * ────────────────────────────────────────────────────────────────────────────
 */

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const SITE = process.env.GSC_SITE || 'https://dailyfitai.app/';
const SITEMAP = process.env.GSC_SITEMAP || 'https://dailyfitai.app/sitemap.xml';
const SCOPE = 'https://www.googleapis.com/auth/webmasters';

/**
 * 액세스 토큰.
 *
 * 🔴 **ADC(application-default) 를 먼저 본다.** `gcloud auth login` 은 `--scopes` 를
 * 아예 받지 않는다(SDK 573 실측: `unrecognized arguments: --scopes`). 스코프를 지정해
 * 로그인할 수 있는 경로는 `gcloud auth application-default login --scopes=...` 뿐이고,
 * 그 자격증명은 `gcloud auth application-default print-access-token` 으로 읽힌다.
 *
 * 처음엔 `gcloud auth login --update-adc --scopes=...` 를 안내했는데 그 명령은
 * **존재하지 않는다.** 그런데 실행하면 gcloud 가 에러를 찍고도 **종료코드 0** 을 준다 —
 * 종료코드만 보고 "권한 받았다"고 넘어갈 뻔했고, `tokeninfo` 로 실측해서 잡았다.
 * 그래서 이 스크립트는 항상 **스코프를 직접 확인**한다(`hasScope`).
 */
function token() {
  for (const args of [
    ['auth', 'application-default', 'print-access-token'],
    ['auth', 'print-access-token'],
  ]) {
    try {
      const t = execFileSync('gcloud', args, {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();
      if (t) return t;
    } catch {
      /* 다음 경로 시도 */
    }
  }
  console.error('✗ gcloud 액세스 토큰을 못 읽었다. `gcloud auth login` 먼저.');
  process.exit(2);
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
  // openid·email 은 ADC 로그인이 알아서 붙이므로 명시 목록에서 뺀다(중복 경고 방지).
  const merged = Array.from(new Set([...current, SCOPE])).filter(
    (x) => x.startsWith('https://')
  );
  return `gcloud auth application-default login --scopes="${merged.join(',')}"`;
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
      '  · 🔴 이 명령은 **ADC(application-default) 자격증명을 덮어쓴다.** 위 목록에 지금 쓰는',
      '    스코프가 전부 들어 있는지 확인하고 그대로 실행할 것 — 짧게 줄이면 배포용 권한이 빠진다.',
      '  · 되돌리기: `gcloud auth application-default revoke` 후 평소 쓰던 로그인으로 다시',
      '    (또는 백업해 둔 ~/.config/gcloud/application_default_credentials.json 복원).',
      '',
    ].join('\n')
  );
  process.exit(3);
}

/**
 * ADC 로 인증하면 구글이 **쿼터 프로젝트 헤더**를 요구한다 —
 * `403: requires a quota project, which is not set by default` (9/2 실측).
 * `gcloud auth application-default login` 이 ADC 파일에 `quota_project_id` 를 넣어 주므로
 * 거기서 읽어 `x-goog-user-project` 로 보낸다. env 로 덮어쓸 수 있게 둔다.
 */
function quotaProject() {
  if (process.env.GSC_QUOTA_PROJECT) return process.env.GSC_QUOTA_PROJECT;
  try {
    const raw = readFileSync(
      `${process.env.HOME}/.config/gcloud/application_default_credentials.json`,
      'utf8'
    );
    return JSON.parse(raw).quota_project_id || '';
  } catch {
    return '';
  }
}

async function api(path, init) {
  const qp = quotaProject();
  const res = await fetch(`https://www.googleapis.com/webmasters/v3${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token()}`,
      ...(qp ? { 'x-goog-user-project': qp } : {}),
      ...(init?.headers || {}),
    },
  });
  if (res.status === 403) {
    const body = await res.text().catch(() => '');
    if (/SCOPE_INSUFFICIENT|insufficient/i.test(body)) await explainScope();
    console.error(`✗ 403 — ${body.slice(0, 300)}`);
    process.exit(4);
  }
  const text = await res.text().catch(() => '');
  if (!text) return { status: res.status, body: null };
  try {
    return { status: res.status, body: JSON.parse(text) };
  } catch {
    // 프록시·게이트웨이가 HTML 오류면을 돌려주면 JSON.parse 가 «Unexpected token '<'»
    // 로 죽어 정작 알아야 할 HTTP 상태를 가린다 (코드리뷰 적발). 상태를 먼저 말한다.
    console.error(`✗ HTTP ${res.status} — JSON 이 아닌 응답: ${text.slice(0, 200)}`);
    process.exit(4);
  }
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

/**
 * 최근 28일 검색 실적. **색인 장수를 못 읽는 대신 이걸 본다** — "우리가 검색 결과에
 * 뜨긴 하는가"에 대한 1차 관측이다. 노출수 0 이면 색인이 안 됐거나 아무 질의에도
 * 안 걸린 것이고, 둘 중 뭔지는 사이트맵 제출 이력(`status`)과 함께 봐야 갈린다.
 *
 * GSC 데이터는 2~3일 지연된다 — 오늘 제출하고 오늘 재면 당연히 0 이다.
 */
async function cmdQueries() {
  const enc = encodeURIComponent(SITE);
  const end = new Date();
  const start = new Date(end.getTime() - 28 * 86400_000);
  const iso = (d) => d.toISOString().slice(0, 10);
  const { status, body } = await api(`/sites/${enc}/searchAnalytics/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      startDate: iso(start),
      endDate: iso(end),
      dimensions: ['query'],
      rowLimit: 25,
    }),
  });
  if (status !== 200) {
    console.error(`✗ HTTP ${status}`, body);
    process.exit(4);
  }
  const rows = body?.rows || [];
  console.log(`검색 실적 ${iso(start)} ~ ${iso(end)} (구글 데이터는 2~3일 지연)`);
  if (!rows.length) {
    console.log('⚠ 노출 0건 — 이 기간에 어떤 질의로도 검색 결과에 뜨지 않았다.');
    console.log('   사이트맵 제출 이력을 함께 볼 것: `node scripts/gsc.mjs status`');
    return;
  }
  const tot = rows.reduce(
    (a, r) => ({ imp: a.imp + (r.impressions || 0), clk: a.clk + (r.clicks || 0) }),
    { imp: 0, clk: 0 }
  );
  console.log(`상위 ${rows.length}개 질의 합계 — 노출 ${tot.imp} · 클릭 ${tot.clk}\n`);
  console.log('  노출   클릭  평균순위  질의');
  for (const r of rows)
    console.log(
      `  ${String(r.impressions ?? 0).padStart(5)} ${String(r.clicks ?? 0).padStart(6)}  ` +
        `${(r.position ?? 0).toFixed(1).padStart(7)}  ${r.keys?.[0] ?? ''}`
    );
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
const run = { check: cmdCheck, status: cmdStatus, queries: cmdQueries, submit: cmdSubmit }[cmd];
if (!run) {
  console.error('사용법: node scripts/gsc.mjs [check|status|queries|submit]');
  process.exit(1);
}
run().catch((e) => {
  console.error(`✗ 실패: ${e?.message ?? e}`);
  process.exit(1);
});
