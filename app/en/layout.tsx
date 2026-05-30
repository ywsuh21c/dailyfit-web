import Link from 'next/link';
import { site } from '@/lib/site';

// Minimal English shell. Full per-locale <html lang="en"> + shared chrome
// arrives with the next-intl upgrade (see HANDOFF.md). The `lang="en"` wrapper
// gives screen readers correct pronunciation for this subtree in the meantime.
export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="en">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link
            href="/en/investors"
            className="flex min-h-tap items-center text-h3 font-bold text-sage"
          >
            {site.name}
          </Link>
          <Link
            href="/investors"
            className="flex min-h-tap items-center rounded-lg px-4 text-base text-ink hover:bg-surface"
          >
            한국어 →
          </Link>
        </nav>
      </header>
      <main id="main" className="min-h-[60vh]">
        {children}
      </main>
      <footer className="border-t border-line bg-navy py-10 text-center text-caption text-ivory/70">
        <p>© {site.name}. All rights reserved.</p>
        <a href={`mailto:${site.contactEmail}`} className="hover:text-ivory">
          {site.contactEmail}
        </a>
      </footer>
    </div>
  );
}
