import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import Link from 'next/link';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { site } from '@/lib/site';
import { Reveal } from '@/components/motion/Reveal';
import { JourneyPath } from '@/components/motion/JourneyPath';

export const metadata: Metadata = pageSeo({
  path: '/about',
  title: '소개',
  description: `${site.name} · ${site.tagline}. 액티브 시니어를 위한 AI Agent를 만드는 팀.`,
});

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
            DailyFit은 액티브 시니어 세대를 위한 AI Agent를 만듭니다.
            <br />
            취미와 일상을 설계하는 Agent 팀입니다.
            <br />
            우리는 시니어를 그 누구보다 매력적인 세그먼트라고 봅니다.
            <br />
            그래서 기술보다 먼저, 더 활기찬 하루를 이야기합니다.
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
          lead={
            <>
              제품은 시니어의 하루를 설계하는 Agent, 회사는 AI Agent 팀이 운영하는 조직.
              <br />
              우리가 일하는 방식을 공개합니다.
            </>
          }
        />
        <div className="mt-8">
          <ButtonLink href="/how-we-work" variant="ghost" size="lg">
            How we work →
          </ButtonLink>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader eyebrow="팀" title="부모님의 하루에서 시작했습니다" />
        {/* 창업 백스토리 — 모두의창업 지원서 Q2 내러티브의 웹 압축본
            (어머니 퇴직 → "내 하루를 짜줄 서비스" 한 마디 → DailyFit). */}
        <Reveal>
          <div className="mt-8 max-w-prose space-y-4 text-body text-ink-soft">
            <p>
              2025년 초, 창업자 서영우의 어머니가 30년 넘게 다니던 직장에서
              퇴직하셨습니다. 하루아침에 오전 9시 출근이 사라졌고, 삶을
              지탱하던 일정도 함께 사라졌습니다.
              <br />
              골프도 여행도 좋지만 매일일 수는 없었습니다.
              <br />
              &lsquo;오늘 뭐 하지&rsquo;라는 막막함으로 하루가 시작됐습니다.
            </p>
            <p className="border-l-[3px] border-sage pl-5 text-[19px] font-semibold leading-relaxed text-ink">
              &ldquo;너가 맨날 일할 때 쓰는 &lsquo;에이전트&rsquo;...
              <br />
              내 하루를 나 대신 계획해줄 친구 만들어줘!&rdquo;
            </p>
            <p>
              아들이 일할 때 AI Agent를 쓰는 걸 어머니도 보셨습니다. 하지만
              정작 당신의 하루를 대신 챙겨줄 Agent는 어디에도 없었습니다. 겨우
              찾은 프로그램은 신청 절차가 복잡해 중도에 포기하게 됐습니다.
              어머니의 친구들도, 그 주변도 같은 이야기를 했습니다. 그 한
              마디가 DailyFit의 출발점입니다.
            </p>
          </div>
        </Reveal>
        {/* TODO(Michael): 창업자 사진 + 현진 풀 bio 게재 동의 */}
        <Reveal className="mt-12">
          <JourneyPath />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <FounderCard
            name="Youngwoo Michael Suh"
            role="Co-founder · CEO"
            bio="Boston University → Fudan University → Bain → PYLER → DailyFit. AI Agent 팀을 직접 운영하며 시니어의 하루를 AaaS로 설계합니다."
          />
          <FounderCard
            name="Hyunjin Jake Kim"
            role="Co-founder · Head of Strategy"
            bio="고려대학교 → EY-Parthenon → Bain → University of Virginia MBA → DailyFit. 전략과 글로벌 확장을 이끌며 시니어의 하루를 함께 설계합니다."
          />
        </div>
        <p className="mt-8 max-w-prose text-body text-ink-soft">
          궁금한 점이 있다면{' '}
          <Link href={`mailto:${site.contactEmail}`} className="font-semibold text-sage underline-offset-4 hover:underline">
            {site.contactEmail}
          </Link>
          로 보내주세요. 저희가 직접 읽고 답합니다.
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
