import type { Metadata } from 'next';
import { GrowthEngine } from '@/components/home/GrowthEngine';

// Internal pick page — Variant A vs B for the home Growth-engine section.
// noindex (not for the public). Once Michael chooses, set the home
// <GrowthEngine variant="…" /> prop and delete the losing path + this page.
export const metadata: Metadata = {
  title: 'Growth engine — 디자인 안 비교 (내부)',
  robots: { index: false, follow: false },
};

export default function GrowthEnginePreview() {
  return (
    <>
      <section className="bg-navy py-12 text-center text-ivory">
        <div className="mx-auto max-w-6xl px-5">
          <p className="eyebrow-mono text-sage-lt">Internal preview · 택1</p>
          <h1 className="mt-3 text-[28px] font-extrabold tracking-tight">
            Growth engine — 두 가지 방향
          </h1>
          <p className="mx-auto mt-3 max-w-[62ch] text-[15px] leading-relaxed text-ivory/70">
            같은 세 개의 루프, 다른 비주얼입니다. 아래 두 안 중 하나를 고르면 홈의{' '}
            <code className="rounded bg-white/10 px-1.5 py-0.5">
              &lt;GrowthEngine variant=&quot;…&quot; /&gt;
            </code>{' '}
            를 그 값으로 두고 나머지 안은 정리합니다.
          </p>
        </div>
      </section>

      <VariantLabel
        n="A"
        name="시스템 루프 (systems diagram)"
        note="아키텍처·패킷 모션 DNA와 일관 · 엔지니어링 인상 (VC 친화)"
      />
      <GrowthEngine variant="a" />

      <VariantLabel
        n="B"
        name="키네틱 카운터 (living momentum)"
        note="더 톡톡 튀고 따뜻함 · 현재 홈에 들어가 있는 안"
      />
      <GrowthEngine variant="b" />
    </>
  );
}

function VariantLabel({ n, name, note }: { n: string; name: string; note: string }) {
  return (
    <div className="border-y border-line bg-ivory">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 px-5 py-4">
        <span className="rounded-md bg-sage px-2.5 py-1 text-[13px] font-extrabold text-white">
          안 {n}
        </span>
        <span className="text-[17px] font-bold text-ink">{name}</span>
        <span className="text-[14px] text-ink-soft">— {note}</span>
      </div>
    </div>
  );
}
