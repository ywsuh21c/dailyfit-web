import Link from 'next/link';
import { footerNav, legalNav, site } from '@/lib/site';

export function Footer() {
  return (
    <footer className="border-t border-line bg-navy text-ivory">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="text-h3 font-bold">{site.name}</p>
            <p className="mt-2 text-base text-ivory/80">{site.description}</p>
          </div>

          <nav aria-label="푸터 메뉴">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-tap items-center text-base text-ivory/90 hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-ivory/15 pt-6 text-caption text-ivory/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {site.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ivory">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.contactEmail}`} className="hover:text-ivory">
                {site.contactEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
