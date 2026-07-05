import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';

// English shell. The Korean root ("/") is always the default landing; this
// subtree is reached only by the explicit language toggle (no locale redirect).
// `lang="en"` gives screen readers correct pronunciation for this subtree.
// Chrome (nav/footer) is the SAME components as the Korean site, in `en` mode,
// so design + the section-aware language toggle stay in lockstep across locales.
export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en">
      <Nav locale="en" />
      <main id="main" className="min-h-[60vh]">
        {children}
      </main>
      <Footer locale="en" />
    </div>
  );
}
