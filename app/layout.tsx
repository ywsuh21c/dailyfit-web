import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { site } from '@/lib/site';
import { verificationMetadata } from '@/lib/seo';
import { organizationJsonLd, websiteJsonLd } from '@/lib/jsonld';
import { JsonLd } from '@/components/seo/JsonLd';
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
  // KO root is the canonical default; /en carries its own via pageSeo().
  alternates: {
    canonical: '/',
    languages: { 'ko-KR': '/', 'en-US': '/en', 'x-default': '/' },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: site.name,
    url: site.url,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
  },
  // Search-console ownership proof. Renders nothing until the tokens are
  // filled in — see lib/seo.ts for the one-time console walkthrough.
  verification: verificationMetadata(),
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
        {/* Entity declaration — site-wide, so every page carries it. "DailyFit"
            is a crowded name (US fitness apps, an unrelated dailyfitai.com,
            Korean 데일리핏 gyms); this is how we claim which one we are. */}
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Analytics />
      </body>
    </html>
  );
}
