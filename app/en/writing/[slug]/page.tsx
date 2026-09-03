import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'markdown-to-jsx';
import { getPostBySlug, getPublishedPosts } from '@/lib/writing';
import { pageSeo } from '@/lib/seo';

// /en/writing/[slug] — published essays only. Drafts + unknown slugs → 404
// (dynamicParams=false serves ONLY pre-generated published slugs).
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPosts('en').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'en');
  if (!post) return { title: 'Writing' };
  // pageSeo 로 자기참조 canonical 을 명시한다 — alternates 없이 두면 루트
  // 레이아웃의 canonical '/' 를 상속해 이 글이 "홈의 사본"으로 선언된다
  // (KO 쪽 /writing/[slug] 는 처음부터 pageSeo 를 썼다. 빌드 실측 2026-08-08).
  return pageSeo({
    path: `/en/writing/${post.slug}`,
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
  const post = getPostBySlug(slug, 'en');
  if (!post) notFound();

  return (
    <article>
      {/* header */}
      <header className="ed-hero">
        <div className="ed-hero-grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 pb-12 pt-20 lg:pt-24">
          <Link href="/en/writing" className="text-eyebrow uppercase text-sage hover:underline">
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
            href="/en/writing"
            className="inline-flex min-h-tap items-center font-bold text-sage hover:underline"
          >
            ← Read more essays
          </Link>
        </div>
      </div>
    </article>
  );
}
