import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { site } from '@/lib/site';
import { Reveal } from '@/components/motion/Reveal';
import { JourneyPath } from '@/components/motion/JourneyPath';

export const metadata: Metadata = {
  title: '소개',
  description: `${site.name} · ${site.tagline}. 액티브 시니어를 위한 AI Agent를 만드는 팀.`,
};

// /about — Option-B tone: "AI agent founder" 내러티브 (시니어 케어 founder
// 톤에서 swap, IA spec). 시니어 배제 아님 — 3인칭 존중 유지.

export default function AboutPage() {
  return (
    <>
      <section className="hero-field relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="aurora aurora-1" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-24 lg:pt-28">
          <p className="eyebrow-mono text-sage">About DailyFit</p>
          <h1 className="mt-5 max-w-3xl text-h1">{site.tagline}</h1>
          <p className="mt-6 max-w-prose text-body text-ink-soft">
            DailyFit은 액티브 시니어 세대를 위한 AI Agent를 만듭니다. 취미와
            일상을 설계하는 Agent 팀입니다. 우리는 시니어를 유능한 성인으로
            대하고, 기술이 아니라 더 활기찬 하루로 이야기를 시작합니다.
          </p>
        </div>
      </section>

      <Section tone="surface">
        <SectionHeader
          eyebrow="미션"
          title="모두가 자기 하루의 저자가 되도록"
          lead="DailyFit은 돌봄 앱도, 모니터링 도구도, 의료 서비스도 아닙니다. 자기결정·활력·구조, 시니어가 스스로 하루를 설계하는 도구입니다."
        />
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="How we operate"
          title="회사도 Agent로 운영합니다"
          lead="제품은 시니어의 하루를 설계하는 Agent, 회사는 AI Agent 팀이 운영하는 조직. 같은 구조입니다. 우리가 일하는 방식을 공개합니다."
        />
        <div className="mt-8">
          <ButtonLink href="/how-we-work" variant="ghost" size="lg">
            How we work →
          </ButtonLink>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader eyebrow="팀" title="부모님의 하루에서 시작했습니다" />
        {/* TODO(Michael): 창업자 사진 + 현진 풀 bio 게재 동의 */}
        <Reveal className="mt-12">
          <JourneyPath />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <FounderCard
            name="Youngwoo Suh"
            role="Founder · CEO"
            bio="Boston University → Bain → PYLER → DailyFit. AI Agent 팀을 직접 운영하며 시니어의 하루를 제품으로 설계합니다. 팟캐스트 「있는 것들이 더해」."
          />
          <FounderCard
            name="김현진"
            role="Co-founder"
            bio="제품·기술 총괄. DailyFit의 하루를 코드로 만듭니다."
          />
        </div>
        <p className="mt-8 max-w-prose text-body text-ink-soft">
          궁금한 점이 있다면{' '}
          <Link href={`mailto:${site.contactEmail}`} className="font-semibold text-sage underline-offset-4 hover:underline">
            {site.contactEmail}
          </Link>
          . 창업자가 직접 읽고 답합니다.
        </p>
      </Section>
    </>
  );
}

function FounderCard({
  name,
  role,
  bio,
}: {
  name: string;
  role: string;
  bio: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-white p-6">
      <p className="text-h3 font-semibold text-ink">{name}</p>
      <p className="mt-1 text-base font-semibold text-sage">{role}</p>
      <p className="mt-3 text-body text-ink-soft">{bio}</p>
    </div>
  );
}
