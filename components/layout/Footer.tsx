import Link from 'next/link';
import { externalLinkProps, footerNav, legalNav, productCta, site } from '@/lib/site';
import { localizeHref, type Locale } from '@/lib/i18n';
import { BrandMark } from '@/components/brand/BrandMark';

// English labels for the two legal links (Korean by default in lib/site.ts).
const LEGAL_EN: Record<string, string> = {
  '/terms': 'Terms of Service',
  '/privacy': 'Privacy Policy',
};

export function Footer({ locale = 'ko' }: { locale?: Locale }) {
  const ariaHome = locale === 'en' ? `${site.name} home` : `${site.name} 홈`;
  const footerAria = (heading: string) =>
    locale === 'en' ? `Footer · ${heading}` : `푸터 · ${heading}`;
  const ctaLabel = locale === 'en' ? 'Try DailyFit' : productCta.label;

  return (
    <footer className="bg-navy-deep text-ivory/70">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href={localizeHref('/', locale)}
              className="flex items-center gap-2.5"
              aria-label={ariaHome}
            >
              <BrandMark className="h-8 w-8" />
              <span className="text-[22px] font-extrabold tracking-tight text-ivory">
                {site.name}
              </span>
            </Link>
            {/* One line, always (Michael 2026-07-04) — sizes step down so the
                sentence never wraps even at 320px viewports. */}
            <p className="mt-4 whitespace-nowrap text-[12.5px] leading-relaxed min-[400px]:text-[14px] sm:text-base">
              Building AI agents for the active senior generation.
            </p>
          </div>

          {footerNav.map((col) => (
            <nav key={col.heading} aria-label={footerAria(col.heading)}>
              <p className="text-caption font-bold uppercase tracking-wider text-ivory">
                {col.heading}
              </p>
              <ul className="mt-4">
                {/* koOnly 항목은 EN 에서 제외 — EN 트윈이 없어 /en/… 로
                    바뀌면 404 가 된다. */}
                {col.items
                  .filter((item) => !(item.koOnly && locale === 'en'))
                  .map((item) => (
                    <li key={item.href}>
                      <Link
                        href={localizeHref(item.href, locale)}
                        className="flex min-h-tap items-center text-base transition-colors hover:text-ivory"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          ))}

          <nav aria-label={footerAria('Contact')}>
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
                  {...externalLinkProps}
                  className="flex min-h-tap items-center text-base transition-colors hover:text-ivory"
                >
                  {ctaLabel} →
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
                <Link
                  href={localizeHref(item.href, locale)}
                  className="transition-colors hover:text-ivory"
                >
                  {locale === 'en' ? LEGAL_EN[item.href] ?? item.label : item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
