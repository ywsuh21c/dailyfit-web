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

// /en/writing — English mirror of the Option-B Writing page (thought leadership
// = core acquisition lever). Content source: content/writing/en/*.md via
// lib/writing.ts (locale='en'). Authors commit markdown via GitHub. When a
// non-technical author joins, swap only the 3 lib/writing.ts functions to Sanity.
// Honesty rule: published:false posts render as "Coming soon" teasers with no
// publish date, never a fabricated one.
// TODO(Michael): shareable numbers (HANDOFF §7 content pending).

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
      {/* manifesto hero */}
      <section className="hero-field relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="aurora aurora-1" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 pb-16 pt-20 lg:pt-24">
          <Reveal>
          <p className="eyebrow-mono text-sage">Writing</p>
          <h1 className="mt-5 text-[38px] font-extrabold leading-[1.18] tracking-[-0.03em] text-ink sm:text-[48px]">
            We write as we build.
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
            We publish what we learn while building DailyFit.
            <br />
            How we run a company as a team of AI Agents, our hypothesis about the
            55+ market, and even{' '}
            <strong className="text-ink">the things that did not work out</strong>.
          </p>
          <p className="mt-4 text-body text-ink-soft">
            More than finished conclusions, we want to leave behind the thinking
            that leads to them.
            <br />
            We believe that being open about what we believe and where we were
            wrong builds a better company.
            <br />
            We call this{' '}
            <strong className="text-ink">Radically Transparent</strong>.
          </p>
          <p className="mt-6 text-base font-semibold text-ink">
            {site.founder.name}, Founder · {site.name}
          </p>
          </Reveal>
        </div>
      </section>

      {/* essay list — published essays link out; drafts stay "Coming soon" teasers */}
      <section className="bg-bg py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <span className="eyebrow-mono text-ink-soft/70">Essays</span>
            <span className="text-caption text-ink-soft">
              {publishedCount > 0 ? `${publishedCount} published` : 'Coming soon'}
            </span>
          </div>
          <div className="divide-y divide-line">
            {posts.map((p, i) =>
              p.published ? (
                <Reveal key={p.slug} delay={Math.min(i * 90, 360)}>
                <Link href={`/en/writing/${p.slug}`} className="group block py-9 transition-transform duration-300 hover:translate-x-1.5">
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
                    Read →
                  </span>
                </Link>
                </Reveal>
              ) : (
                <Reveal key={p.slug} delay={Math.min(i * 90, 360)}>
                <article className="py-9">
                  <div className="flex items-center gap-3">
                    <span className="eyebrow-mono text-sage">{p.category}</span>
                    <span className="rounded-md bg-sage/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-sage">
                      Coming soon
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
