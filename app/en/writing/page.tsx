import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import Link from 'next/link';
import { getAllPosts } from '@/lib/writing';
import { Reveal } from '@/components/motion/Reveal';
import { site } from '@/lib/site';

export const metadata: Metadata = pageSeo({
  path: '/en/writing',
  title: 'Writing',
  description:
    'We write as we build. What we learned, what we got wrong, and the thinking behind it, while building DailyFit.',
});

// /en/writing — English mirror of app/(marketing)/writing (thought leadership
// = core acquisition lever). Content source: content/writing/en/*.md via
// lib/writing.ts (locale='en'). Honesty rule: published:false posts render as
// "Coming soon" teasers with no publish date, never a fabricated one.
// Keep structure in sync with the Korean source.

function formatDate(iso: string | null): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${y}.${m}.${d}`;
}

export default function WritingPage() {
  const posts = getAllPosts('en');
  const publishedCount = posts.filter((p) => p.published).length;

  return (
    <>
      <section className="ed-hero">
        <div className="ed-hero-grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-wrap px-5 pb-16 pt-16 sm:px-8 lg:pb-20 lg:pt-24">
          <Reveal>
            <p className="text-eyebrow uppercase text-sage">Writing</p>
            <h1 className="mt-6 text-display-sm text-ink sm:text-[52px] sm:leading-[1.08] lg:text-[60px]">
              We write as we build.
            </h1>
            <div className="mt-8 grid max-w-[62rem] gap-8 lg:grid-cols-2">
              <p className="text-body text-ink-soft">
                We publish what we learn while building DailyFit. How we run a company as a team of
                AI Agents, our hypothesis about the 55+ market, and even{' '}
                <strong className="font-semibold text-ink">the things that did not work out</strong>.
              </p>
              <p className="text-body text-ink-soft">
                Rather than finished conclusions, we try to leave behind the thinking that led to
                them. We believe making public what we believe, and where we were wrong, builds a
                better company. We call this{' '}
                <strong className="font-semibold text-ink">Radically Transparent</strong>.
              </p>
            </div>
            <p className="mt-8 text-base font-semibold text-ink">
              {site.founder.name}, Founder · {site.name}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-hair bg-bg py-16 sm:py-20">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <div className="flex items-baseline justify-between border-b border-hair-strong pb-4">
            <span className="text-eyebrow uppercase text-ink-soft">Essays</span>
            <span className="num text-caption text-ink-soft">
              {publishedCount > 0
                ? `${publishedCount} published`
                : 'Coming soon'}
            </span>
          </div>
          <div className="divide-y divide-hair">
            {posts.map((p, i) =>
              p.published ? (
                <Reveal key={p.slug} delay={Math.min(i * 70, 280)}>
                  <Link
                    href={`/en/writing/${p.slug}`}
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
                        Read →
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
                        Coming soon
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
