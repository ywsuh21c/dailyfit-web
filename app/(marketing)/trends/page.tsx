import type { Metadata } from 'next';
import { Section, SectionHeader } from '@/components/ui/Section';
import { EmptyState } from '@/components/ui/States';

export const metadata: Metadata = {
  title: '트렌드',
  description:
    '활동적인 시니어를 위한 일상·건강·라이프스타일 이야기 — DailyFit 트렌드.',
};

// /trends — index shell. Posts come from Sanity `trendPost` once CMS is
// provisioned (Content Strategist 8-week calendar). Until then: EmptyState.

export default function TrendsPage() {
  return (
    <>
      <Section tone="light" className="pt-24">
        <p className="text-base font-semibold text-sage">Trends</p>
        <h1 className="mt-3 max-w-3xl text-h1">활기찬 하루를 위한 이야기</h1>
        <p className="mt-6 max-w-prose text-body text-ink-soft">
          계절·건강·취미·관계 — 시니어의 하루를 더 풍성하게 만드는 이야기를
          모았습니다.
        </p>
      </Section>

      <Section tone="surface">
        <SectionHeader title="최신 글" />
        <div className="mt-8">
          <EmptyState
            title="곧 첫 글을 만나보세요"
            description="트렌드 글은 준비 중입니다. CMS 연결 후 순차적으로 공개됩니다."
          />
        </div>
      </Section>
    </>
  );
}
