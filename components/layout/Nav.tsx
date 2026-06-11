import Link from 'next/link';
import { companyNav, primaryNav, productCta, site } from '@/lib/site';
import { BrandMark } from '@/components/brand/BrandMark';

/**
 * Global nav — dark (navy), Option-B structure:
 * Product / Technology / Use cases / Company ▾ + 제품 사용해보기 →.
 * Company dropdown is pure CSS (hover + focus-within) — keyboard reachable.
 * TODO(phase-2): mobile hamburger — below md only brand + CTA show.
 */
export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-ivory/10 bg-navy/85 backdrop-blur-md">
      <nav
        className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-5"
        aria-label="주요 메뉴"
      >
        <Link
          href="/"
          className="flex min-h-tap items-center gap-2.5"
          aria-label={`${site.name} 홈`}
        >
          <BrandMark idPrefix="nav-logo" className="h-8 w-8" />
          <span className="text-[22px] font-extrabold tracking-tight text-ivory">
            {site.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex min-h-tap items-center rounded-lg px-3.5 text-base font-medium text-ivory/75 transition-colors hover:bg-ivory/5 hover:text-ivory"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="nav-company relative">
            <button
              type="button"
              className="flex min-h-tap items-center gap-1.5 rounded-lg px-3.5 text-base font-medium text-ivory/75 transition-colors hover:bg-ivory/5 hover:text-ivory"
              aria-haspopup="true"
            >
              Company
              <span aria-hidden="true" className="text-[10px] opacity-60">
                ▾
              </span>
            </button>
            <ul className="nav-sub absolute left-0 top-full min-w-[180px] rounded-xl border border-ivory/10 bg-navy-2 p-1.5 shadow-2xl shadow-navy-deep/60">
              {companyNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-tap items-center rounded-lg px-3.5 text-base text-ivory/80 transition-colors hover:bg-ivory/5 hover:text-ivory"
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
          className="flex min-h-tap items-center whitespace-nowrap rounded-lg bg-sage px-5 text-base font-semibold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
        >
          {productCta.label} →
        </Link>
      </nav>
    </header>
  );
}
