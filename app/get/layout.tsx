import type { Metadata } from 'next';

// Bare redirect surface for ad smart-links (당근·구글). No marketing nav/footer —
// this route sits OUTSIDE the (marketing) route group, so it inherits only the
// root html shell.
export const metadata: Metadata = {
  title: '데일리핏 앱 받기',
  robots: { index: false, follow: false },
};

export default function GetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
