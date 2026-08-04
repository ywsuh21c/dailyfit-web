import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { getPublishedPosts } from '@/lib/writing';
import { hasTwin, localizeHref } from '@/lib/i18n';
import { listPublicActivityIds } from '@/lib/activity-index';

/**
 * sitemap.xml.
 *
 * ── 2026-08-04 감사 ─────────────────────────────────────────────────────────
 * 이전 버전은 9개 URL 뿐이었고, 라이브인 /research 와 EN 전체가 빠져 있었다.
 * 사이트맵에 없는 페이지는 "발견되지 않은 페이지"라 색인이 늦거나 아예 안 된다.
 * 여기서는 **라우트가 실재하고 index 가 허용된 것 전부**를 담고, 각 항목에
 * hreflang(ko/en) 대체 URL도 실어 언어 쌍을 검색엔진이 바로 알게 한다.
 *
 * 제외 대상(의도적):
 *  · /investors, /en/investors  — noindex (IR 결정 잠금 전, plan D/IR Q24)
 *  · /terms 및 EN legal 페이지  — 각 페이지 metadata 의 기존 noindex 정책을 따름
 *  · /get, /i/[code]            — noindex (광고 착지·개인 초대 링크)
 *  · /trends                    — /writing 로 리다이렉트 (Option-B IA)
 *
 * /activity/[id] 는 여기 함께 담긴다 — 지금은 백엔드에 공개 목록 엔드포인트가
 * 없어 0건이지만(lib/activity-index.ts 참조), 그 엔드포인트가 배포되는 즉시
 * 코드 변경 없이 수천 건이 자동으로 채워진다. 사이트맵 상한은 50,000 URL 이라
 * 현재 카탈로그 규모(3,377건, 2026-08-04 실측)는 한 파일에 충분히 들어간다.
 * ────────────────────────────────────────────────────────────────────────────
 */

/** KO routes that are live AND indexable. EN twins are derived, not listed. */
const KO_ROUTES: {
  path: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly';
}[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/product', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/technology', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/research', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/writing', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/how-we-work', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'monthly' },
  { path: '/account-deletion', priority: 0.3, changeFrequency: 'monthly' },
];

function urlFor(path: string): string {
  return path === '/' ? site.url : `${site.url}${path}`;
}

/** hreflang block for a KO path — omitted when the route has no EN twin. */
function alternatesFor(koPath: string) {
  if (!hasTwin(koPath)) return undefined;
  return {
    languages: {
      'ko-KR': urlFor(localizeHref(koPath, 'ko')),
      'en-US': urlFor(localizeHref(koPath, 'en')),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of KO_ROUTES) {
    entries.push({
      url: urlFor(route.path),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: alternatesFor(route.path),
    });
    // EN twin — same page, lower priority (KO is the default locale).
    if (hasTwin(route.path)) {
      entries.push({
        url: urlFor(localizeHref(route.path, 'en')),
        changeFrequency: route.changeFrequency,
        priority: Math.max(0.3, Number((route.priority - 0.2).toFixed(1))),
        alternates: alternatesFor(route.path),
      });
    }
  }

  for (const locale of ['ko', 'en'] as const) {
    for (const post of getPublishedPosts(locale)) {
      const koPath = `/writing/${post.slug}`;
      entries.push({
        url: urlFor(localizeHref(koPath, locale)),
        lastModified: post.date ?? undefined,
        changeFrequency: 'monthly',
        priority: locale === 'ko' ? 0.6 : 0.4,
        alternates: alternatesFor(koPath),
      });
    }
  }

  // 활동 상세 — 카탈로그가 곧 롱테일 검색 유입의 본체다. 공개 목록
  // 엔드포인트가 없으면 0건(빈 배열)이라 사이트맵은 여전히 유효하다.
  for (const activity of await listPublicActivityIds()) {
    entries.push({
      url: urlFor(`/activity/${activity.id}`),
      lastModified: activity.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.5,
    });
  }

  return entries;
}
