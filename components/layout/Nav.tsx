import Link from 'next/link';
import { companyNav, externalLinkProps, primaryNav, productCta, site } from '@/lib/site';
import Image from 'next/image';

/**
 * Global nav — light, Option-B structure:
 * Product / Technology / Use cases / Company ▾ + 제품 사용해보기 →.
 * Company dropdown is pure CSS (hover + focus-within) — keyboard reachable.
 * TODO(phase-2): mobile hamburger — below md only brand + CTA show.
 */
export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <nav
        className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-5"
        aria-label="주요 메뉴"
      >
        <Link
          href="/"
          className="flex min-h-tap items-center gap-2.5"
          aria-label={`${site.name} 홈`}
        >
          <Image
            src="/brand/dailyfit-logo.png"
            alt=""
            aria-hidden="true"
            width={38}
            height={38}
            className="h-9 w-9 object-contain"
          />
          <span className="text-[22px] font-extrabold tracking-tight text-ink">
            {site.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex min-h-tap items-center rounded-lg px-3.5 text-base font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="nav-company relative">
            <button
              type="button"
              className="flex min-h-tap items-center gap-1.5 rounded-lg px-3.5 text-base font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink"
              aria-haspopup="true"
            >
              Company
              <span aria-hidden="true" className="text-[10px] opacity-60">
                ▾
              </span>
            </button>
            <ul className="nav-sub absolute left-0 top-full min-w-[180px] rounded-xl border border-line bg-white p-1.5 shadow-xl shadow-navy/15">
              {companyNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-tap items-center rounded-lg px-3.5 text-base text-ink-soft transition-colors hover:bg-surface hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>

        <Link
          href={productCta.href}
          {...externalLinkProps}
          className="flex min-h-tap items-center whitespace-nowrap rounded-lg bg-sage px-5 text-base font-semibold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
        >
          {productCta.label} →
        </Link>
      </nav>
    </header>
  );
}
