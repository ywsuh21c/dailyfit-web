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
// 콘텐츠 출처: content/writing/*.md → lib/writing.ts (swap seam). 저자=영우·현진
// GitHub 커밋. 비기술 저자 합류 시 lib/writing.ts 3개 함수만 Sanity로 교체.
// 정직성: published:false 글은 발행일 없이 "곧 공개" 티저로만 — 가짜 날짜 금지.
// TODO(Michael): 공개 가능 수치 (HANDOFF §7 콘텐츠 펜딩).

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
      {/* manifesto hero */}
      <section className="hero-field relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="aurora aurora-1" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 pb-16 pt-20 lg:pt-24">
          <Reveal>
          <p className="eyebrow-mono text-sage">Writing</p>
          <h1 className="mt-5 text-[38px] font-extrabold leading-[1.18] tracking-[-0.03em] text-ink sm:text-[48px]">
            저희는 만들면서 씁니다.
          </h1>
          <svg viewBox="0 0 360 14" aria-hidden="true" className="mt-3 h-[14px] w-[min(360px,80%)]">
            <path
              className="draw-short"
              d="M 4 9 C 70 4, 150 12, 220 7 C 280 3, 330 9, 356 6"
              fill="none"
              stroke="#4A7C59"
              strokeOpacity="0.6"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <p className="mt-7 text-body text-ink-soft">
            DailyFit을 만드는 동안 배운 것들을 정리해 공개합니다.
            <br />
            AI Agent 팀으로 회사를 운영하는 방법, 5060 시장이라는
            가설, 그리고{' '}
            <strong className="text-ink">잘 안 풀린 것들</strong>까지.
          </p>
          <p className="mt-4 text-body text-ink-soft">
            완성된 결론보다, 결론에 닿기까지의 사고 과정을 남기려 합니다.
            <br />
            저희가 무엇을 믿고, 무엇을 틀렸는지 공개하는 것이 더 나은 회사를
            만든다고 보기 때문입니다.
            <br />
            저희는 이것을{' '}
            <strong className="text-ink">Radically Transparent</strong>라고
            부릅니다.
          </p>
          <p className="mt-6 text-base font-semibold text-ink">
            {site.founder.name}, Founder · {site.name}
          </p>
          </Reveal>
        </div>
      </section>

      {/* essay list — published essays link out; drafts stay "곧 공개" teasers */}
      <section className="bg-bg py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <span className="eyebrow-mono text-ink-soft/70">Essays</span>
            <span className="text-caption text-ink-soft">
              {publishedCount > 0 ? `${publishedCount}편 발행` : '곧 공개'}
            </span>
          </div>
          <div className="divide-y divide-line">
            {posts.map((p, i) =>
              p.published ? (
                <Reveal key={p.slug} delay={Math.min(i * 90, 360)}>
                <Link href={`/writing/${p.slug}`} className="group block py-9 transition-transform duration-300 hover:translate-x-1.5">
                  <div className="flex items-center gap-3">
                    <span className="eyebrow-mono text-sage">{p.category}</span>
                    <span className="text-caption text-ink-soft">{formatDate(p.date)}</span>
                  </div>
                  <h2 className="mt-3 text-[24px] font-bold leading-[1.3] tracking-[-0.02em] text-ink transition-colors group-hover:text-sage">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">
                    {p.summary}
                  </p>
                  <span className="eyebrow-mono mt-3 inline-block text-sage opacity-0 transition-opacity group-hover:opacity-100">
                    읽기 →
                  </span>
                </Link>
                </Reveal>
              ) : (
                <Reveal key={p.slug} delay={Math.min(i * 90, 360)}>
                <article className="py-9">
                  <div className="flex items-center gap-3">
                    <span className="eyebrow-mono text-sage">{p.category}</span>
                    <span className="rounded-md bg-sage/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-sage">
                      곧 공개
                    </span>
                  </div>
                  <h2 className="mt-3 text-[24px] font-bold leading-[1.3] tracking-[-0.02em] text-ink">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">
                    {p.summary}
                  </p>
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
