import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'markdown-to-jsx';
import { getPostBySlug, getPublishedPosts } from '@/lib/writing';
import { pageSeo } from '@/lib/seo';
import { blogPostingJsonLd, breadcrumbJsonLd } from '@/lib/jsonld';
import { JsonLd } from '@/components/seo/JsonLd';

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
  return pageSeo({
    path: `/writing/${post.slug}`,
    title: post.title,
    description: post.summary,
    ogType: 'article',
  });
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

  const path = `/writing/${post.slug}`;

  return (
    <article>
      <JsonLd
        data={blogPostingJsonLd({
          title: post.title,
          summary: post.summary,
          author: post.author,
          date: post.date,
          path,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'DailyFit', path: '/' },
          { name: 'Writing', path: '/writing' },
          { name: post.title, path },
        ])}
      />

      {/* header */}
      <header className="ed-hero">
        <div className="ed-hero-grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 pb-12 pt-20 lg:pt-24">
          <Link href="/writing" className="text-eyebrow uppercase text-sage hover:underline">
            ← Writing
          </Link>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-eyebrow uppercase text-sage">{post.category}</span>
            <span className="num text-caption text-ink-soft">{formatDate(post.date)}</span>
          </div>
          <h1 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[44px]">
            {post.title}
          </h1>
          <p className="mt-6 text-base font-semibold text-ink">{post.author}</p>
        </div>
      </header>

      {/* body */}
      <div className="bg-bg py-14 sm:py-20">
        <div className="prose-essay mx-auto max-w-3xl px-5">
          <Markdown>{post.body}</Markdown>
        </div>
      </div>

      {/* back */}
      <div className="border-t border-hair ed-paper py-12">
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
