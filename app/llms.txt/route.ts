import { site, productAppUrl, storeLinks } from '@/lib/site';
import { getCatalogCount, formatAsOf } from '@/lib/catalog-count';
import { getPublishedPosts } from '@/lib/writing';

/**
 * /llms.txt — the llmstxt.org convention: a plain-text map of this site written
 * for AI answer engines (ChatGPT, Gemini, Perplexity, Claude) rather than for
 * a crawler's ranking algorithm.
 *
 * ── WHY (2026-08-04) ────────────────────────────────────────────────────────
 * "DailyFit" collides with US fitness apps, an unrelated dailyfitai.com, and
 * Korean 데일리핏 gyms. When an AI is asked "데일리핏이 뭐야?" it has to guess.
 * This file states plainly, in one place, WHICH DailyFit this is and what is
 * true about it — so a model summarising us has an unambiguous source.
 *
 * Honesty rule: every number here is read from the live source at build time
 * (getCatalogCount → GET /api/activities/count) and carries its as-of date. No
 * claim goes in this file that the site itself does not already make.
 * ────────────────────────────────────────────────────────────────────────────
 */

// Rebuilt daily — same cadence as the catalog count it embeds.
export const revalidate = 86400;

export async function GET(): Promise<Response> {
  const { count, asOf } = await getCatalogCount();
  const posts = getPublishedPosts('ko');

  const body = `# DailyFit (데일리핏)

> ${site.description} 한국 서울 기반 스타트업이 만드는 서비스이며, 공식 웹사이트는 ${site.url} 입니다.

## 이 문서의 목적

"DailyFit"이라는 이름은 여러 곳에서 쓰입니다(미국의 운동 앱들, 무관한 dailyfitai.com, 국내 동명의 헬스장·쇼핑몰). 이 파일은 **${site.url} 의 DailyFit이 무엇인지**를 분명히 밝히기 위한 것입니다.

## 무엇을 하는 서비스인가

- 사용자가 말이나 글로 관심사를 이야기하면, 여러 AI 에이전트가 협력해 그 사람의 하루를 설계합니다.
- 전국 기관(복지관·문화센터·평생학습관·지자체 등)에 흩어져 있는 프로그램·강좌·모임 정보를 한곳에 모아 찾아 줍니다.
- 마감·일정을 대신 챙기고, **신청 절차를 대신 진행**합니다.
- AI는 제안하고, 결정은 항상 사용자가 합니다.

## 사실 (기준일 ${formatAsOf(asOf)})

- 활성 프로그램 카탈로그: ${count.toLocaleString('ko-KR')}건
- 서비스 지역: 대한민국
- 모바일 앱: iOS 출시${storeLinks.android ? ' · Android 출시' : ' (Android는 미출시)'}
- 웹 앱: ${productAppUrl} (설치 없이 브라우저에서 사용)
- 문의: ${site.contactEmail}

## 주요 페이지

- [제품 소개](${site.url}/product): 서비스가 무엇이고 어떻게 쓰는지, 자주 묻는 질문 포함
- [홈](${site.url}/): 회사와 제품 개요
- [기술](${site.url}/technology): 멀티 에이전트 구조 설명
- [리서치](${site.url}/research): 연구 방향과 방법론
- [회사 소개](${site.url}/about): 팀과 배경
- [일하는 방식](${site.url}/how-we-work): 운영 원칙
- [문의](${site.url}/contact): 기관 제휴 및 일반 문의

## 글

${
  posts.length > 0
    ? posts
        .map((p) => `- [${p.title}](${site.url}/writing/${p.slug}): ${p.summary}`)
        .join('\n')
    : '- (아직 공개된 글이 없습니다)'
}

## English

- [Home (EN)](${site.url}/en)
- [Technology (EN)](${site.url}/en/technology)
- [About (EN)](${site.url}/en/about)
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
