import { getCatalog, CATALOG_REVALIDATE } from '@/lib/activity-catalog';
import { productAppUrl } from '@/lib/site';

/**
 * `my.dailyfitai.app` 의 활동 사이트맵.
 *
 * ── 이 라우트가 왜 dailyfitai.app 에 있는가 ─────────────────────────────────
 * 청자 분리 방침(2026-08-05)상 활동 상세의 정본 주소는 `my.` 다. 그런데 `my.` 는
 * Expo 정적 export 라 수천 건짜리 사이트맵을 만들 수 없다. 그래서 생성은 여기서
 * 하고, `my.` 의 vercel.json rewrite 가 이 결과를
 *   https://my.dailyfitai.app/sitemap-activities.xml
 * 로 서빙한다. **<loc> 는 전부 my. 주소**라서, 검색엔진이 보기엔 my. 가 만든
 * 사이트맵과 다를 게 없다.
 *
 * 이 파일 자체가 dailyfitai.app 경로로도 열리지만 문제되지 않는다 — 안에 든 URL 이
 * 전부 my. 라서 dailyfitai.app 색인에 활동이 추가되지는 않는다.
 * ────────────────────────────────────────────────────────────────────────────
 */

export const revalidate = 86400; // = CATALOG_REVALIDATE (Next 는 리터럴만 인식)

/** 사이트맵 1파일 상한은 50,000 URL. 현재 카탈로그(~3.8천)는 여유롭다. */
const MAX_URLS = 45000;

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function GET(): Promise<Response> {
  const activities = (await getCatalog()).slice(0, MAX_URLS);

  const urls = activities
    .map(
      (a) =>
        `  <url>\n` +
        `    <loc>${xmlEscape(`${productAppUrl}/activity/${a.id}`)}</loc>\n` +
        `    <changefreq>weekly</changefreq>\n` +
        `    <priority>0.6</priority>\n` +
        `  </url>`,
    )
    .join('\n');

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    (urls ? `${urls}\n` : '') +
    `</urlset>\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': `public, max-age=0, s-maxage=${CATALOG_REVALIDATE}, stale-while-revalidate=604800`,
    },
  });
}
