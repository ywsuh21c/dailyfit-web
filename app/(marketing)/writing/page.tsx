import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import Link from 'next/link';
import { getAllPosts } from '@/lib/writing';
import { Reveal } from '@/components/motion/Reveal';
import { site } from '@/lib/site';

export const metadata: Metadata = pageSeo({
  path: '/writing',
  title: 'Writing',
  description:
    '우리는 만들면서 씁니다. DailyFit을 만드는 동안 배운 것, 틀린 것, 그리고 그 사고 과정.',
});

// /writing — Option-B 의무 페이지 (thought leadership = 핵심 acquisition lever).
// 콘텐츠 출처: content/writing/*.md → lib/writing.ts (swap seam). 저자는 각 글의
// front-matter 가 정본이다. 비기술 저자 합류 시 lib/writing.ts 3개 함수만 교체.
// 정직성: published:false 글은 발행일 없이 "곧 공개" 티저로만 — 가짜 날짜 금지.
// 2026-09-03: Editorial Daylight — 목록을 «색인»으로. 카테고리·날짜가 왼쪽 칸에
// 고정되고 제목이 본문 칸을 차지해, 훑을 때 눈이 한 축을 따라 내려간다.

function formatDate(iso: string | null): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${y}.${m}.${d}`;
}

export default function WritingPage() {
  const posts = getAllPosts();
  const publishedCount = posts.filter((p) => p.published).length;

  return (
    <>
      <section className="ed-hero">
        <div className="ed-hero-grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-wrap px-5 pb-16 pt-16 sm:px-8 lg:pb-20 lg:pt-24">
          <Reveal>
            <p className="text-eyebrow uppercase text-sage">Writing</p>
            <h1 className="mt-6 text-display-sm text-ink sm:text-[52px] sm:leading-[1.08] lg:text-[60px]">
              저희는 만들면서 씁니다.
            </h1>
            <div className="mt-8 grid max-w-[62rem] gap-8 lg:grid-cols-2">
              <p className="text-body text-ink-soft">
                DailyFit을 만드는 동안 배운 것들을 정리해 공개합니다. AI Agent 팀으로 회사를
                운영하는 방법, 5060 시장이라는 가설, 그리고{' '}
                <strong className="font-semibold text-ink">잘 안 풀린 것들</strong>까지.
              </p>
              <p className="text-body text-ink-soft">
                완성된 결론보다, 결론에 닿기까지의 사고 과정을 남기려 합니다. 저희가 무엇을 믿고,
                무엇을 틀렸는지 공개하는 것이 더 나은 회사를 만든다고 보기 때문입니다. 저희는 이것을{' '}
                <strong className="font-semibold text-ink">Radically Transparent</strong>라고
                부릅니다.
              </p>
            </div>
            <p className="mt-8 text-base font-semibold text-ink">
              {site.founder.name}, Founder · {site.name}
            </p>
          </Reveal>
        </div>
      </section>

      {/* essay index — published essays link out; drafts stay "곧 공개" teasers */}
      <section className="border-t border-hair bg-bg py-16 sm:py-20">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <div className="flex items-baseline justify-between border-b border-hair-strong pb-4">
            <span className="text-eyebrow uppercase text-ink-soft">Essays</span>
            <span className="num text-caption text-ink-soft">
              {publishedCount > 0 ? `${publishedCount}편 발행` : '곧 공개'}
            </span>
          </div>
          <div className="divide-y divide-hair">
            {posts.map((p, i) =>
              p.published ? (
                <Reveal key={p.slug} delay={Math.min(i * 70, 280)}>
                  <Link
                    href={`/writing/${p.slug}`}
                    className="group grid gap-3 py-8 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-10"
                  >
                    <div className="flex items-baseline gap-3 lg:flex-col lg:gap-1.5">
                      <span className="text-eyebrow uppercase text-sage">{p.category}</span>
                      <span className="num text-caption text-ink-soft">{formatDate(p.date)}</span>
                    </div>
                    <div>
                      <h2 className="text-[26px] font-bold leading-[1.3] tracking-[-0.025em] text-ink transition-colors group-hover:text-sage">
                        {p.title}
                      </h2>
                      <p className="mt-3 max-w-[46rem] text-[16.5px] leading-[1.75] text-ink-soft">
                        {p.summary}
                      </p>
                      <span className="mt-4 inline-block text-eyebrow uppercase text-sage opacity-0 transition-opacity group-hover:opacity-100">
                        읽기 →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ) : (
                <Reveal key={p.slug} delay={Math.min(i * 70, 280)}>
                  <article className="grid gap-3 py-8 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-10">
                    <div className="flex items-baseline gap-3 lg:flex-col lg:gap-1.5">
                      <span className="text-eyebrow uppercase text-sage">{p.category}</span>
                      <span className="rounded-md bg-sage/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-sage">
                        곧 공개
                      </span>
                    </div>
                    <div>
                      <h2 className="text-[26px] font-bold leading-[1.3] tracking-[-0.025em] text-ink">
                        {p.title}
                      </h2>
                      <p className="mt-3 max-w-[46rem] text-[16.5px] leading-[1.75] text-ink-soft">
                        {p.summary}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}
