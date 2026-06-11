import Link from 'next/link';
import { site } from '@/lib/site';
import { BrandMark } from '@/components/brand/BrandMark';

// Product (customer) chrome — the other side of the bridge. Single audience:
// seniors (2nd-person OK here). Company nav/footer intentionally absent;
// the only link back is the top bridge bar (Anthropic→Claude pattern).

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-navy text-center text-[14px] text-ivory/80">
        <Link
          href="/"
          className="inline-flex min-h-[40px] items-center px-4 hover:text-ivory"
        >
          ← DailyFit 회사 소개
        </Link>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-md">
        <nav
          className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-5"
          aria-label="제품 메뉴"
        >
          <Link
            href="/product"
            className="flex min-h-tap items-center gap-2.5"
            aria-label={`${site.name} 제품 홈`}
          >
            <BrandMark idPrefix="product-logo" className="h-8 w-8" />
            <span className="text-[22px] font-extrabold tracking-tight text-ink">
              {site.name}
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <a
              href="#features"
              className="hidden min-h-tap items-center rounded-lg px-4 text-[17px] font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink sm:flex"
            >
              기능
            </a>
            <a
              href="#faq"
              className="hidden min-h-tap items-center rounded-lg px-4 text-[17px] font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink sm:flex"
            >
              자주 묻는 질문
            </a>
            <a
              href="#get"
              className="ml-2 flex min-h-tap items-center whitespace-nowrap rounded-lg bg-sage px-5 text-[17px] font-semibold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
            >
              앱 다운로드
            </a>
          </div>
        </nav>
      </header>

      <main id="main" className="min-h-[60vh]">
        {children}
      </main>

      <footer className="bg-navy-deep py-12 text-ivory/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <BrandMark idPrefix="product-footer-logo" className="h-7 w-7" />
            <span className="text-[19px] font-extrabold tracking-tight text-ivory">
              {site.name}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
            <Link href="/" className="hover:text-ivory">
              DailyFit 회사 소개
            </Link>
            <a href={`mailto:${site.contactEmail}`} className="hover:text-ivory">
              {site.contactEmail}
            </a>
            <span className="text-ivory/45">© 2026 {site.name}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
