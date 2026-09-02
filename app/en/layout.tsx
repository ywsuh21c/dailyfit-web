import type { Metadata } from 'next';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { site } from '@/lib/site';

// Title template for the English subtree. The root layout's template carries the
// Korean brand token (`%s · 데일리핏`) because Korean search is where the brand
// query lives; without this override every English page would inherit it and
// read "About · 데일리핏" to an English-reading investor. Locale-correct titles
// are the whole point of having an /en subtree at all.
// `default` 는 Next 타입이 template 과 짝으로 요구한다(둘 중 하나만은 불가). 실제로
// 쓰이는 경우는 /en 하위에서 title 을 안 정한 페이지뿐이고, 현재는 전부 정하고 있다.
export const metadata: Metadata = {
  title: {
    default: `${site.name} · AI Agents for adults 55+`,
    template: `%s · ${site.name}`,
  },
};

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
