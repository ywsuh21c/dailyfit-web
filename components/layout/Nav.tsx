import Link from 'next/link';
import { primaryNav, site } from '@/lib/site';

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3"
        aria-label="주요 메뉴"
      >
        <Link
          href="/"
          className="flex min-h-tap items-center text-h3 font-bold text-sage"
          aria-label={`${site.name} 홈`}
        >
          {site.name}
        </Link>

        <div className="flex items-center gap-0.5 sm:gap-2">
          <ul className="flex items-center gap-0.5 sm:gap-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-tap items-center rounded-lg px-3 text-base text-ink transition-colors hover:bg-surface sm:px-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/#download"
            className="ml-1 flex min-h-tap items-center rounded-lg bg-sage px-4 text-base font-semibold text-white transition-opacity hover:opacity-90 sm:px-5"
          >
            <span className="hidden sm:inline">앱 다운로드</span>
            <span className="sm:hidden">다운로드</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
