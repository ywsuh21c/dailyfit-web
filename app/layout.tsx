import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { site } from '@/lib/site';
import { Analytics } from '@/components/analytics/Analytics';
import './globals.css';

// Self-hosted Pretendard Variable (fixes v1's external-CDN dependency).
const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="font-sans">
        {/* Reveal/CountUp depend on client JS — without it, force content visible. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <a href="#main" className="skip-link">
          본문으로 건너뛰기
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
