import type { Metadata } from 'next';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { activeCatalogCount, site } from '@/lib/site';
import { CountUp } from '@/components/motion/CountUp';
import { FlowLine } from '@/components/motion/FlowLine';
import { OrbitRings } from '@/components/motion/OrbitRings';

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
          <StatCard suffix="건" label="라이브 활동 데이터베이스">
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
          lead="한국 55–70세 액티브 시니어 시장이 지금 변곡점을 맞은 이유: 디지털 친숙도, 인구 구조, 그리고 일상을 스스로 설계하려는 수요가 동시에 교차합니다."
        />
        <p className="mt-6 max-w-prose text-body text-ink-soft">
          {/* TODO(SA dependency #1): 시장 명제 1문장 + 2문단 lock 후 교체 */}
          액티브 시니어는 더 이상 돌봄의 대상이 아니라 자기 하루의 저자입니다.
          데이터 출처와 시장 규모 근거는 미팅에서 직접 공유드립니다.
        </p>
        <div className="mt-12">
          <OrbitRings
            aria="시장 확장: 한국 1,500만 비치헤드에서 동아시아, 글로벌 시니어 시장으로"
            coreTop="한국 1,500만"
            coreBottom="비치헤드"
            mid="동아시아"
            outer="글로벌 시니어 시장"
          />
        </div>
      </Section>

      {/* 3. What we're building — product glimpse, no "how" */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="What we're building"
          title="무엇을 만들고 있나"
          lead="DailyFit은 시니어가 매일을 의미 있게 설계하도록 돕는 AI Agent입니다. 카카오톡 위에서, 익숙한 대화로."
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
          <GlimpseStep n="3" title="신청까지 보조">
            외부 포털 신청·접수까지 대신 처리하고, 마지막 확인만 사용자가.
          </GlimpseStep>
        </div>
      </Section>

      {/* 4. Who's building it */}
      <Section tone="light">
        <SectionHeader eyebrow="Who's building it" title="누가 만드나" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <FounderCard
            name="서영우 (Youngwoo Suh)"
            role="공동창업자 · CEO"
            bio="Boston University → Bain → PYLER(Corporate Development Lead) → DailyFit. 전략·기업개발 백그라운드로 시니어 일상을 제품으로 설계합니다."
          />
          <FounderCard
            name="김현진"
            role="공동창업자"
            bio="제품·기술 파트너. 솔로 파운더 우려를 선제적으로 해소하는 2인 창업 팀입니다."
            // TODO(IR scope §2): 현진 사진/풀 bio 본인 동의 필요
          />
        </div>
      </Section>

      {/* 5. Momentum — proof, not metrics (option C) */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="Momentum"
          title="진행 증거"
          lead="정확한 수치와 코호트 곡선은 미팅에서 공유드립니다."
        />
        <ul className="mt-6 max-w-prose space-y-3 text-body text-ink">
          {/* TODO(D2/D3/D4): 팟캐스트·정부 프로그램·베타 코호트 수치 확정 후 교체 */}
          <li>· 베타 출시 후 첫 코호트 측정: 시니어 헬스앱 업계 평균 대비 리텐션 추적 중.</li>
          <li>· 60+ 시니어 1:1 인터뷰 누적 · 매주 신규 베타 신청자 유입.</li>
          <li>· 팟캐스트 &ldquo;있는 것들이 더해&rdquo; 운영: 창업자 내러티브 자산.</li>
        </ul>
      </Section>

      {/* 6. Get in touch — founder-direct only */}
      <Section tone="surface" id="contact">
        <SectionHeader
          eyebrow="Get in touch"
          title="직접 이야기 나눠요"
          lead="덱을 받기 전에, 먼저 창업자에게 직접 연락 주세요. 가장 빠르고 정확한 대화입니다."
        />
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink
            href={`mailto:${site.contactEmail}`}
            variant="primary"
            size="lg"
            external
          >
            창업자에게 이메일 보내기
          </ButtonLink>
          {/* TODO(D5): Calendly 슬롯 링크 확정 후 노출 */}
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
    <div className="rounded-xl border border-line bg-bg p-6">
      <p className="text-h3 font-semibold text-ink">{name}</p>
      <p className="mt-1 text-base text-sage">{role}</p>
      <p className="mt-3 text-body text-ink-soft">{bio}</p>
    </div>
  );
}
