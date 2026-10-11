import Link from 'next/link';
import { companyNav, externalLinkProps, primaryNav, productCta, site } from '@/lib/site';
import { localizeHref, type Locale } from '@/lib/i18n';
import { BrandMark } from '@/components/brand/BrandMark';
import { LangToggle } from '@/components/layout/LangToggle';

/**
 * Global nav — shared by both locales (Option-B structure):
 * Product / Technology / Research / Company ▾ + language toggle + product CTA.
 * `locale` prefixes every internal href (/en for English); the labels are
 * English on both locales by design (brand + section names). The language
 * toggle is section-aware (see LangToggle).
 * Company dropdown is pure CSS (hover + focus-within) — keyboard reachable.
 */
export function Nav({ locale = 'ko' }: { locale?: Locale }) {
  const ariaMenu = locale === 'en' ? 'Main menu' : '주요 메뉴';
  const ariaHome = locale === 'en' ? `${site.name} home` : `${site.name} 홈`;
  const ctaLabel = locale === 'en' ? 'Try DailyFit' : productCta.label;

  return (
    <header className="sticky top-0 z-40 border-b border-hair bg-ivory/90 backdrop-blur-md">
      <nav
        className="mx-auto flex h-[72px] max-w-wrap items-center justify-between gap-4 px-5 sm:px-8"
        aria-label={ariaMenu}
      >
        <Link
          href={localizeHref('/', locale)}
          className="flex min-h-tap items-center gap-2.5"
          aria-label={ariaHome}
        >
          <BrandMark className="h-8 w-8" />
          {/* Below sm the mascot stands in for the wordmark (390px overflow). */}
          <span className="hidden text-[22px] font-extrabold tracking-tight text-ink sm:inline">
            {site.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link
                href={localizeHref(item.href, locale)}
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
            <ul className="nav-sub absolute left-0 top-full min-w-[180px] rounded-xl border border-hair bg-white p-1.5 shadow-soft">
              {companyNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localizeHref(item.href, locale)}
                    className="flex min-h-tap items-center rounded-lg px-3.5 text-base text-ink-soft transition-colors hover:bg-surface hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>

        <div className="flex items-center gap-1.5">
          <LangToggle locale={locale} />
          {/* 2026-10-11 서비스 종료(10/20) — 가입 입구를 «비활성화»가 아니라 «제거»한다.
              살아 있으면 종료를 공지하면서 새 개인정보를 계속 수집하는 셈이고,
              그건 「목적 달성으로 파기했다」와 정면으로 어긋난다(개인정보 보호법 제21조).
              되살리려면 이 블록과 `productCta`·`ctaLabel` 을 함께 복원한다. */}
        </div>
      </nav>
    </header>
  );
}
