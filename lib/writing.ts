import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/**
 * Writing content source — file-based (content/writing/*.md) for now.
 *
 * ── THE SWAP SEAM ───────────────────────────────────────────────────────────
 * The whole site reads Writing ONLY through the three exported functions below.
 * Authors today = 영우·현진, who commit markdown files via GitHub (no CMS, no
 * account, no editor app). When a non-technical writer joins, swap to Sanity by
 * reimplementing ONLY these three functions with GROQ queries — every caller
 * (/writing list, /writing/[slug]) keeps working unchanged. Keep the return
 * types identical and the swap is ~30 minutes.
 *
 * Honesty rule: a post is public ONLY when `published: true`. Drafts render as
 * "곧 공개" teasers and have NO detail page — we never show a fabricated date.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type WritingMeta = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  /** ISO yyyy-mm-dd. null for drafts (never fake a publish date). */
  date: string | null;
  published: boolean;
};

export type WritingPost = WritingMeta & { body: string };

const CONTENT_DIR = path.join(process.cwd(), 'content', 'writing');

function toDateString(v: unknown): string | null {
  if (!v) return null;
  // gray-matter / YAML auto-parses unquoted `date:` into a Date object.
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v).slice(0, 10);
}

function readAll(): WritingPost[] {
  let files: string[];
  try {
    files = fs.readdirSync(CONTENT_DIR);
  } catch {
    return []; // content dir not present yet → no posts, no crash
  }
  return files
    // ignore the author template (_TEMPLATE.md) and dotfiles
    .filter((f) => f.endsWith('.md') && !f.startsWith('_') && !f.startsWith('.'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      const published = data.published === true;
      return {
        slug,
        title: String(data.title ?? slug),
        summary: String(data.summary ?? ''),
        category: String(data.category ?? 'Writing'),
        author: String(data.author ?? 'DailyFit'),
        date: published ? toDateString(data.date) : null,
        published,
        body: content.trim(),
      };
    });
}

/** Newest published first; drafts last (in title order). */
function byRecency(a: WritingPost, b: WritingPost): number {
  if (a.published !== b.published) return a.published ? -1 : 1;
  if (a.date && b.date) return a.date < b.date ? 1 : -1;
  return a.title.localeCompare(b.title);
}

/** All posts (published + drafts), meta only — for the /writing list. */
export function getAllPosts(): WritingMeta[] {
  return readAll()
    .sort(byRecency)
    .map(({ body: _body, ...meta }) => meta);
}

/** Published posts only — for static params / sitemap. */
export function getPublishedPosts(): WritingMeta[] {
  return getAllPosts().filter((p) => p.published);
}

/** Full post incl. body. Returns null for missing OR unpublished slugs. */
export function getPostBySlug(slug: string): WritingPost | null {
  const post = readAll().find((p) => p.slug === slug);
  if (!post || !post.published) return null;
  return post;
}
