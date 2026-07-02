import type { Metadata } from 'next';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { productAppUrl } from '@/lib/site';
import { AgentConsole } from '@/components/home/AgentConsole';
import { FlowLine } from '@/components/motion/FlowLine';
import { OrbitRings } from '@/components/motion/OrbitRings';

export const metadata: Metadata = {
  title: '기술',
  description:
    '시니어의 일상을 시니어의 목소리로 누적하는 AI Agent. DailyFit이 푸는 기술 문제와 시스템 아키텍처.',
};

// Company-site Technology page — VC/press audience, 3rd-person voice.
// Market framing is global (Korean is the beachhead, not the ceiling).
// brand.md forbidden words (노인/돌봄/완전자동화) must never appear here.
// No em-dash (—) in copy — use periods / colons / middots.

export default function TechnologyPage() {
  return (
    <>
      {/* 1. The technical problem */}
      <Section tone="light" className="pt-24">
        <p className="text-base font-semibold text-sage">DailyFit · Technology</p>
        <h1 className="mt-3 max-w-3xl text-h1">
          시니어의 일상은, 시니어의 목소리 그대로 쌓여야 의미가 생깁니다.
        </h1>
        <div className="mt-6 max-w-prose space-y-4 text-body text-ink-soft">
          <p>
            범용 LLM은 시니어가 하루를 표현하는 방식을 잘 읽지 못합니다. 느린
            말, 사투리, 어제의 맥락까지. 우리는 시니어가 실제로 쓰는 말투와
            일상의 맥락을 매일 누적합니다.
          </p>
          <ul className="space-y-2">
            <li>· 일상 맥락: &ldquo;어제 무릎이 아팠다&rdquo;가 오늘의 제안을 바꿉니다.</li>
            <li>· 시니어 말투: 번역이 아니라, 세대가 실제로 쓰는 말 그대로의 이해.</li>
            <li>· 누적되는 데이터: 쓸수록 시니어 표현 패턴이 자산으로 쌓입니다.</li>
          </ul>
          <p className="text-ink-soft/80">
            지금은 한국어 시니어부터. 같은 구조로 각 시장의 언어와 세대로
            확장합니다.
          </p>
        </div>
      </Section>

      {/* 2. How the agent works — real chat demo */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="작동 방식"
          title="익숙한 대화 한 번이면 됩니다"
          lead="카카오톡에서 ‘오늘 어땠어요?’로 시작해, 사용자의 하루에 맞는 제안을 카드로 받습니다."
        />
        <div className="mx-auto mt-8 max-w-2xl">
          <AgentConsole />
        </div>
        <p className="mt-6 text-h3 font-semibold text-ink">
          AI가 결정하지 않습니다. AI는 제안하고, 사용자가 선택합니다.
        </p>
      </Section>

      {/* 3. Data & privacy */}
      <Section tone="light">
        <SectionHeader eyebrow="데이터 · 개인정보" title="데이터는 사용자의 것입니다" />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <PrincipleCard title="최소 권한" body="필요한 정보만, 필요한 순간에만 사용합니다." />
          <PrincipleCard
            title="명시적 동의"
            body="무엇을 쓰는지 먼저 알리고, 사용자가 허락한 범위에서만 동작합니다."
          />
          <PrincipleCard
            title="개인정보보호법 준수"
            body="개인정보보호법(PIPA) 기준에 맞춰 안전하게 보관·암호화합니다."
          />
        </div>
      </Section>

      {/* 4. System architecture — real layer stack */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="System architecture"
          title="프로덕션에서 동작하는 AI-native 시스템"
          lead="4개 레이어, 12개 컴포넌트. 음성·카카오·검색·매칭·외부 채널을 잇는 Agent 구조."
        />
        <div className="mt-8 flex flex-col">
          <LayerRow tag="Layer 1 · User Channel">
            실시간 STT · 텍스트 · 카카오 로그인
          </LayerRow>
          <FlowLine vertical />
          <LayerRow tag="Layer 2 · Agents">
            탐색 · 리마인더 · 신청대행 Agent 오케스트레이션
          </LayerRow>
          <FlowLine vertical />
          <LayerRow tag="Layer 3 · Data">
            프로필 · per-user 메모리 · 검색·매칭
          </LayerRow>
          <FlowLine vertical />
          <LayerRow tag="Layer 4 · External">
            활동 데이터베이스 (공공 OpenAPI · 스크래퍼 · 자체 공급)
          </LayerRow>
        </div>
      </Section>

      {/* 5. Tech stack */}
      <Section tone="light">
        <SectionHeader
          eyebrow="Tech stack"
          title="기술 스택"
          lead="표준적이되 의도된 선택. 각 선택에는 이유가 있습니다."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <StackRow label="LLM · Agents" value="Anthropic Claude (의도 분석·큐레이션·신청대행)" />
          <StackRow label="Automation" value="Playwright (외부 포털 신청 자동화)" />
          <StackRow label="Backend" value="Python · FastAPI · PostgreSQL" />
          <StackRow label="Voice" value="WebSocket 실시간 스트리밍 STT + 텍스트 병행" />
          <StackRow label="Client" value="React Native · Expo + 카카오 로그인" />
          <StackRow label="Data" value="공공 OpenAPI + 스크래퍼 + 자체 공급 (idempotent upsert)" />
        </div>
      </Section>

      {/* 5b. Defensibility — data moat (랜딩에서 이관 2026-07-01) */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="Defensibility"
          title="DailyFit's Moat"
          lead="진짜 해자는 데이터입니다. 그리고 이 데이터는 우리만 쌓을 수 있습니다."
        />
        <div className="mt-10">
          <OrbitRings
            aria="데이터 해자: 사용자별 일상 데이터를 중심으로 음성 데이터와 개인화 레이어가 겹겹이 쌓인 모습"
            coreTop="per-user 일상 데이터"
            coreBottom="매일 쌓입니다"
            mid="독점 음성 레이어"
            outer="데이터 플라이휠"
          />
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <MoatItem title="독점 음성 데이터">
            빅테크도, 대기업도 갖지 못한 액티브 시니어의 날것 그대로의 ‘일상
            대화’ 음성. 우리의 가장 큰 해자입니다.
          </MoatItem>
          <MoatItem title="누적되는 개인화">
            취향·이력·이동 패턴이 유저별로 쌓입니다. 쓸수록 더 잘 맞고, 범용
            모델은 이 레이어를 복제할 수 없습니다.
          </MoatItem>
          <MoatItem title="데이터 플라이휠">
            데이터가 쌓일수록 Agent가 똑똑해지고, 더 많이 쓰일수록 데이터가 더
            쌓입니다. 시간이 갈수록 격차가 벌어집니다.
          </MoatItem>
        </div>
      </Section>

      {/* 6. Hive meta narrative */}
      <Section tone="light">
        <SectionHeader
          eyebrow="Radically Transparent"
          title="회사 자체가 AI Agent 팀입니다"
          lead="DailyFit의 제품은 AI Agent가 시니어의 하루를 함께 설계하고, 운영은 AI Agent 팀이 회사를 함께 굴립니다. 같은 구조(isomorphic)입니다."
        />
        <p className="mt-6 max-w-prose text-body text-ink-soft">
          Strategy · Finance · Product · Technology. 각 디비전을 AI Agent 팀이
          ADR로 문서화하고 함께 운영합니다. 시스템 프롬프트 원문과 실제 운영
          데이터는 공개하지 않습니다.
        </p>
      </Section>

      {/* 7. Open vs closed declaration + CTA */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="공개 · 비공개"
          title="우리는 아키텍처를 공개합니다"
          lead="카피될 위험보다, 우리가 어떤 회사인지 시그널을 못 보내는 위험이 더 큽니다. 단, 시니어의 실제 일상 데이터는 절대 공개하지 않습니다."
        />
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href={productAppUrl} external variant="primary" size="lg">
            DailyFit 시작하기 →
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}

function LayerRow({ tag, children }: { tag: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-line bg-white px-6 py-4 sm:flex-row sm:items-center sm:gap-6">
      <span className="text-base font-bold text-sage sm:min-w-[220px]">{tag}</span>
      <span className="text-body text-ink-soft">{children}</span>
    </div>
  );
}

function PrincipleCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-6">
      <p className="text-h3 font-semibold text-ink">{title}</p>
      <p className="mt-2 text-body text-ink-soft">{body}</p>
    </div>
  );
}

function MoatItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line border-t-[3px] border-t-sage bg-white p-6">
      <p className="text-h3 font-semibold text-ink">{title}</p>
      <p className="mt-2 text-body text-ink-soft">{children}</p>
    </div>
  );
}

function StackRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-line bg-surface p-5">
      <span className="text-base font-semibold text-sage">{label}</span>
      <span className="text-body text-ink">{value}</span>
    </div>
  );
}
