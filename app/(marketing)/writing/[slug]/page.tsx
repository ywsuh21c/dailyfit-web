import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'markdown-to-jsx';
import { getPostBySlug, getPublishedPosts } from '@/lib/writing';

// /writing/[slug] — published essays only. Drafts + unknown slugs → 404
// (dynamicParams=false serves ONLY pre-generated published slugs).
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Writing' };
  return {
    title: post.title,
    description: post.summary,
    openGraph: { type: 'article', title: post.title, description: post.summary },
  };
}

function formatDate(iso: string | null): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${y}.${m}.${d}`;
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      {/* header */}
      <header className="hero-field relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 pb-12 pt-20 lg:pt-24">
          <Link href="/writing" className="eyebrow-mono text-sage hover:underline">
            ← Writing
          </Link>
          <div className="mt-6 flex items-center gap-3">
            <span className="eyebrow-mono text-sage">{post.category}</span>
            <span className="text-caption text-ink-soft">{formatDate(post.date)}</span>
          </div>
          <h1 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[44px]">
            {post.title}
          </h1>
          <p className="mt-6 text-base font-semibold text-ink">— {post.author}</p>
        </div>
      </header>

      {/* body */}
      <div className="bg-bg py-14 sm:py-20">
        <div className="prose-essay mx-auto max-w-3xl px-5">
          <Markdown>{post.body}</Markdown>
        </div>
      </div>

      {/* back */}
      <div className="border-t border-line bg-surface py-12">
        <div className="mx-auto max-w-3xl px-5">
          <Link
            href="/writing"
            className="inline-flex min-h-tap items-center font-bold text-sage hover:underline"
          >
            ← 다른 글 보기
          </Link>
        </div>
      </div>
    </article>
  );
}
