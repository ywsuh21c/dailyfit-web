import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/writing';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    '우리는 만들면서 씁니다 — DailyFit을 만드는 동안 배운 것, 틀린 것, 그리고 그 사고 과정.',
};

// /writing — Option-B 의무 페이지 (thought leadership = 핵심 acquisition lever).
// 콘텐츠 출처: content/writing/*.md → lib/writing.ts (swap seam). 저자=영우·현진
// GitHub 커밋. 비기술 저자 합류 시 lib/writing.ts 3개 함수만 Sanity로 교체.
// 정직성: published:false 글은 발행일 없이 "곧 공개" 티저로만 — 가짜 날짜 금지.
// TODO(Michael): 팟캐스트 링크 + 공개 가능 수치 (HANDOFF §7 콘텐츠 펜딩).

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
        <div className="relative mx-auto max-w-3xl px-5 pb-16 pt-20 lg:pt-24">
          <p className="eyebrow-mono text-sage">Writing</p>
          <h1 className="mt-5 text-[38px] font-extrabold leading-[1.18] tracking-[-0.03em] text-ink sm:text-[48px]">
            우리는 만들면서 씁니다.
          </h1>
          <p className="mt-7 text-body text-ink-soft">
            DailyFit을 만드는 동안 배운 것들을 정리해 공개합니다. AI 에이전트
            팀으로 회사를 운영하는 방법, 한국 시니어 시장이라는 가설, 그리고{' '}
            <strong className="text-ink">잘 안 풀린 것들</strong>까지.
          </p>
          <p className="mt-4 text-body text-ink-soft">
            완성된 결론보다, 결론에 닿기까지의 사고 과정을 남기려 합니다.
            우리가 무엇을 믿고, 무엇을 틀렸는지 공개하는 것이 더 나은 회사를
            만든다고 보기 때문입니다. 우리는 이것을{' '}
            <strong className="text-ink">Radically Transparent</strong>라고
            부릅니다.
          </p>
          <p className="mt-6 text-base font-semibold text-ink">
            — Youngwoo Suh, Founder · DailyFit
          </p>
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
            {posts.map((p) =>
              p.published ? (
                <Link key={p.slug} href={`/writing/${p.slug}`} className="group block py-9">
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
              ) : (
                <article key={p.slug} className="py-9">
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
              ),
            )}
          </div>
        </div>
      </section>

      {/* podcast teaser */}
      <section className="border-t border-line bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5">
          <div className="flex flex-col gap-6 rounded-2xl border border-line bg-white p-8 sm:flex-row sm:items-center">
            <div
              className="h-[88px] w-[88px] flex-shrink-0 rounded-2xl bg-gradient-to-br from-navy to-navy-deep"
              aria-hidden="true"
            />
            <div>
              <p className="eyebrow-mono text-sage">Founder&rsquo;s podcast</p>
              <h2 className="mt-2 text-[22px] font-bold text-ink">
                「있는 것들이 더해」
              </h2>
              <p className="mt-2 text-[15.5px] leading-relaxed text-ink-soft">
                글보다 말이 편한 날의 기록 — 창업자의 사고 과정을 목소리로
                남깁니다.
                {/* TODO(Michael): 팟캐스트 링크 연결 */}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
