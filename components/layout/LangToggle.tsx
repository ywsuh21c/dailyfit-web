'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { switchLocalePath, type Locale } from '@/lib/i18n';

/**
 * Language switch. Reads the current path and links to the SAME section in the
 * other language (e.g. /technology → /en/technology), so switching language
 * keeps the visitor where they were. `locale` is the current page's locale;
 * the button offers the other one.
 */
export function LangToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? (locale === 'en' ? '/en' : '/');
  const to: Locale = locale === 'en' ? 'ko' : 'en';
  const href = switchLocalePath(pathname, to);
  return (
    <Link
      href={href}
      className="flex min-h-tap items-center rounded-lg px-3 text-base font-semibold text-ink-soft transition-colors hover:bg-surface hover:text-ink"
      aria-label={to === 'en' ? 'English version' : '한국어 버전'}
    >
      {to === 'en' ? 'EN' : '한국어'}
    </Link>
  );
}
