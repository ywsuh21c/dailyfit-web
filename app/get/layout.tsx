import type { Metadata } from 'next';

// Bare redirect surface for ad smart-links (당근·구글) and Kakao shares. No
// marketing nav/footer — this route sits OUTSIDE the (marketing) route group,
// so it inherits only the root html shell.
//
// Consumer-facing OG override: the root OG copy ("AI는 수단, 시니어가 정체성")
// reads as a company positioning line, which looks off when the link is pasted
// into KakaoTalk to friends/parents. Here we swap in a plain "what it does for
// you" card + preview image so the share renders a proper photo card.
// Image URL resolves against `metadataBase` (root layout → site.url).
export const metadata: Metadata = {
  title: '데일리핏 — 동네 활동, 찾고 신청까지',
  description:
    '말로 물어보면 동네 활동을 찾아서 신청까지 대신해요. 지금 앱 받기.',
  robots: { index: false, follow: false },
  openGraph: {
    title: '데일리핏 — 동네 활동, 찾고 신청까지',
    description: '말로 물어보면 동네 활동을 찾아서 신청까지 대신해요.',
    url: '/get',
    siteName: '데일리핏',
    locale: 'ko_KR',
    type: 'website',
    images: [{ url: '/og-get.png', width: 1200, height: 630, alt: '데일리핏 — 동네 활동, 찾고 신청까지' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '데일리핏 — 동네 활동, 찾고 신청까지',
    description: '말로 물어보면 동네 활동을 찾아서 신청까지 대신해요.',
    images: ['/og-get.png'],
  },
};

export default function GetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
