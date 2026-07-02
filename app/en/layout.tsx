import Link from 'next/link';
import { externalLinkProps, productAppUrl, site } from '@/lib/site';
import { BrandMark } from '@/components/brand/BrandMark';

// English shell. The Korean root ("/") is always the default landing; this
// subtree is reached only by explicit language toggle (no locale redirect).
// `lang="en"` gives screen readers correct pronunciation for this subtree.
export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
        <nav
          className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-5"
          aria-label="Main menu"
        >
          <Link href="/en" className="flex min-h-tap items-center gap-2.5" aria-label={`${site.name} home`}>
            <BrandMark className="h-8 w-8" />
            <span className="text-[22px] font-extrabold tracking-tight text-ink">{site.name}</span>
          </Link>
          <div className="flex items-center gap-1.5">
            <Link
              href="/en/research"
              className="flex min-h-tap items-center rounded-lg px-3 text-base font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink"
            >
              Research
            </Link>
            <Link
              href="/"
              className="flex min-h-tap items-center rounded-lg px-3 text-base font-semibold text-ink-soft transition-colors hover:bg-surface hover:text-ink"
            >
              한국어
            </Link>
            <Link
              href={productAppUrl}
              {...externalLinkProps}
              className="flex min-h-tap items-center whitespace-nowrap rounded-lg bg-sage px-5 text-base font-semibold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
            >
              Try DailyFit →
            </Link>
          </div>
        </nav>
      </header>

      <main id="main">{children}</main>

      <footer className="bg-navy-deep text-ivory/70">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <Link href="/en" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
            <BrandMark className="h-8 w-8" />
            <span className="text-[22px] font-extrabold tracking-tight text-ivory">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-[56ch] text-base leading-relaxed">
            Building AI agents for the active senior generation.
          </p>
          <div className="mt-8 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-caption sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 {site.name}. All rights reserved.</p>
            <a href={`mailto:${site.contactEmail}`} className="transition-colors hover:text-ivory">
              {site.contactEmail}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
