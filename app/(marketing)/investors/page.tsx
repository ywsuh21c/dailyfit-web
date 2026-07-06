import type { Metadata } from 'next';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { activeCatalogCount } from '@/lib/site';
import { CountUp } from '@/components/motion/CountUp';
import { FlowLine } from '@/components/motion/FlowLine';
import { MarketExpansion } from '@/components/motion/MarketExpansion';

export const metadata: Metadata = {
  title: 'Investors',
  description:
    '액티브 시니어(55–70)를 위한 AI 일상 설계 플랫폼. 무엇을, 왜 지금, 누가 만드는지.',
  // Per plan decision D / IR Q24: keep out of top nav; indexing decision pending.
  robots: { index: false, follow: true },
};

// Source copy: ir-investors-page-scope.md (IR Strategist, 2026-05-28).
// HARD RULE [[feedback_no_fundraise_disclosure_on_web]]: no "we are raising"
// language anywhere — founder-direct contact only.
// PENDING Michael decisions flagged inline (D1–D7 in source doc).

export default function InvestorsPage() {
  return (
    <>
      {/* 1. Hero teaser — Draft B (market-thesis). 14M figure pending D1 confirm. */}
      <Section tone="light" className="pt-24">
        <p className="eyebrow-mono text-sage">DailyFit · Investors</p>
        <h1 className="mt-3 max-w-3xl text-h1">
          한국에서 가장 빠르게 늘어나는 인구는 디지털을 씁니다.
        </h1>
        <p className="mt-6 max-w-prose text-body text-ink-soft">
          1,500만 명의 한국 시니어(55–70세)가 이미 카카오톡으로 하루를 운영합니다.
          DailyFit은 그 위에 AI Agent를 얹어 &ldquo;건강하게 오래 사는 일상&rdquo;을
          매일 설계합니다.
        </p>
        <div className="mt-8">
          <ButtonLink href="#contact" variant="primary" size="lg">
            창업자에게 직접 연락하기 →
          </ButtonLink>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <StatCard suffix="만 명" label="한국 55–70 액티브 시니어">
            <CountUp to={1500} />
          </StatCard>
          <StatCard suffix="건" label="보유 프로그램·활동 DB (실시간)">
            <CountUp to={activeCatalogCount} />
          </StatCard>
          <StatCard suffix="티어" label="Agent 자율성 단계">
            <CountUp to={3} duration={900} />
          </StatCard>
        </div>
      </Section>

      {/* 2. Why now */}
      <Section tone="light">
        <SectionHeader
          eyebrow="Why now"
          title="왜 지금인가"
          lead={
            <>
              한국 55–70세 액티브 시니어 시장이 변곡점을 맞은 이유는
              세 가지 흐름이 동시에 교차하기 때문입니다.
              <br />
              <br />
              <strong className="text-ink">디지털 친숙도</strong>
              <br />
              <strong className="text-ink">인구 구조</strong>
              <br />
              <strong className="text-ink">스스로 하루를 설계하려는 수요</strong>
            </>
          }
        />
        <p className="mt-6 max-w-prose text-body text-ink-soft">
          {/* TODO(SA dependency #1): 시장 명제 1문장 + 2문단 lock 후 교체 */}
          액티브 시니어는 더 이상 돌봄의 대상이 아니라 자기 하루의 저자입니다.
        </p>
        <div className="mt-12">
          <MarketExpansion />
        </div>
      </Section>

      {/* 3. What we're building — product glimpse, no "how" */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="What we're building"
          title="무엇을 만들고 있나"
          lead={
            <>
              DailyFit은 시니어가 매일을 의미 있게 설계하도록 돕는 AI Agent입니다.
              <br />
              인기 복지관·문화센터 프로그램은 신청이 복잡하고 경쟁이 치열합니다.
              DailyFit은 시니어 대신 활동을 찾아 신청까지 대행하는 Agent as a
              Service입니다. 카카오톡 위에서, 익숙한 대화로 움직입니다.
            </>
          }
        />
        <div className="mt-10">
          <FlowLine />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <GlimpseStep n="1" title="말로 요청">
            &ldquo;뭔가 새로운 걸 배우고 싶어&rdquo; 처럼, 평소 말투 그대로.
          </GlimpseStep>
          <GlimpseStep n="2" title="Agent가 설계">
            의도를 읽고 활동을 탐색·큐레이션해 하루를 구성합니다.
          </GlimpseStep>
          <GlimpseStep n="3" title="신청까지 대행">
            인기 프로그램의 외부 포털 신청·접수까지 대신 처리하고, 마지막 확인만 사용자가.
          </GlimpseStep>
        </div>
      </Section>

      {/* 4. Get in touch — founder-direct only. Team bios & momentum live on
          /about; this page stays lean and routes to the shared Talk-to-us page. */}
      <Section tone="surface" id="contact">
        <SectionHeader
          eyebrow="Get in touch"
          title="직접 이야기 나눠요"
          lead="덱을 받기 전에, 먼저 창업자에게 직접 연락 주세요. 가장 빠르고 정확한 대화입니다."
        />
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/contact" variant="primary" size="lg">
            직접 이야기 나누기 →
          </ButtonLink>
          <ButtonLink href="/en/investors" variant="ghost" size="lg">
            English →
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}

function StatCard({
  suffix,
  label,
  children,
}: {
  suffix: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-6 text-center">
      <p className="text-[34px] font-extrabold tracking-tight text-sage">
        {children}
        <span className="ml-1 text-[20px] font-bold text-ink">{suffix}</span>
      </p>
      <p className="mt-1 text-[13.5px] font-semibold text-ink-soft">{label}</p>
    </div>
  );
}

function GlimpseStep({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line bg-bg p-6">
      <span className="eyebrow-mono text-sage">Step {n}</span>
      <p className="mt-3 text-h3 font-semibold text-ink">{title}</p>
      <p className="mt-2 text-body text-ink-soft">{children}</p>
    </div>
  );
}
