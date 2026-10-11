import { Nav } from '@/components/layout/Nav';
import { SunsetBanner } from '@/components/layout/SunsetBanner';
import { Footer } from '@/components/layout/Footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SunsetBanner />
      <Nav />
      <main id="main" className="min-h-[60vh]">
        {children}
      </main>
      <Footer />
    </>
  );
}
