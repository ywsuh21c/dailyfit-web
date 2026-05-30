import type { Metadata } from 'next';
import { Section, SectionHeader } from '@/components/ui/Section';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: '소개',
  description: `${site.name} — ${site.tagline}. 활동적인 한국 시니어의 하루를 함께 설계하는 팀.`,
};

// /about — structure + brand-voice placeholder copy. Body sections move to
// Sanity `page` document once CMS is provisioned.

export default function AboutPage() {
  return (
    <>
      <Section tone="light" className="pt-24">
        <p className="text-base font-semibold text-sage">About DailyFit</p>
        <h1 className="mt-3 max-w-3xl text-h1">{site.tagline}</h1>
        <p className="mt-6 max-w-prose text-body text-ink-soft">
          {site.description} 우리는 시니어를 유능한 성인으로 대하고, 기술이 아니라
          더 활기찬 하루로 이야기를 시작합니다.
        </p>
      </Section>

      <Section tone="surface">
        <SectionHeader
          eyebrow="미션"
          title="모두가 자기 하루의 저자가 되도록"
          lead="DailyFit은 돌봄 앱도, 모니터링 도구도, 의료 서비스도 아닙니다. 자기결정·활력·구조 — 시니어가 스스로 하루를 설계하는 도구입니다."
        />
      </Section>

      <Section tone="light">
        <SectionHeader eyebrow="팀" title="함께 만드는 사람들" />
        <p className="mt-6 max-w-prose text-body text-ink-soft">
          {/* TODO(Sanity teamMember): 팀 사진 + 풀 bio 입고 */}
          서영우(Michael)와 김현진이 함께 만듭니다. 자세한 소개는 곧 추가됩니다.
        </p>
      </Section>
    </>
  );
}
