import Link from 'next/link';
import { footerNav, legalNav, productCta, site } from '@/lib/site';
import { BrandMark } from '@/components/brand/BrandMark';

export function Footer() {
  return (
    <footer className="bg-navy-deep text-ivory/70">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} 홈`}>
              <BrandMark idPrefix="footer-logo" className="h-8 w-8" />
              <span className="text-[22px] font-extrabold tracking-tight text-ivory">
                {site.name}
              </span>
            </Link>
            <p className="mt-4 max-w-[30ch] text-base leading-relaxed">
              Building AI agents for Korea&rsquo;s active senior generation.
            </p>
          </div>

          {footerNav.map((col) => (
            <nav key={col.heading} aria-label={`푸터 — ${col.heading}`}>
              <p className="text-caption font-bold uppercase tracking-wider text-ivory">
                {col.heading}
              </p>
              <ul className="mt-4">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex min-h-tap items-center text-base transition-colors hover:text-ivory"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label="푸터 — Contact">
            <p className="text-caption font-bold uppercase tracking-wider text-ivory">
              Contact
            </p>
            <ul className="mt-4">
              <li>
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="flex min-h-tap items-center text-base transition-colors hover:text-ivory"
                >
                  {site.contactEmail}
                </a>
              </li>
              <li>
                <Link
                  href={productCta.href}
                  className="flex min-h-tap items-center text-base transition-colors hover:text-ivory"
                >
                  {productCta.label} →
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-ivory/10 pt-6 text-caption sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-ivory">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
