import type { Metadata } from 'next';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: '기술',
  description:
    '한국 시니어의 일상을 한국어로, 시니어의 목소리로 누적하는 AI 에이전트 — DailyFit이 푸는 기술적 문제와 시스템 아키텍처.',
};

// Source copy: cto-technology-page-scope.md (CTO, 2026-05-28).
// Vertical flow: senior-friendly (1–3) → explicit boundary → VC depth (4–7).
// brand.md forbidden words (노인/돌봄/완전자동화) must never appear here.

export default function TechnologyPage() {
  return (
    <>
      {/* 1. The technical problem — senior-first, VC-second */}
      <Section tone="light" className="pt-24">
        <p className="text-base font-semibold text-sage">DailyFit · Technology</p>
        <h1 className="mt-3 max-w-3xl text-h1">
          한국 시니어의 일상은 한국어로, 시니어의 목소리로 쌓여야 의미가 생깁니다.
        </h1>
        <div className="mt-6 max-w-prose space-y-4 text-body text-ink-soft">
          <p>
            영문 중심 LLM은 한국 시니어가 하루를 표현하는 방식을 잘 읽지 못합니다.
            우리는 일상의 맥락, 한국어 표현 패턴, 시니어가 실제로 쓰는 말투를
            매일 누적합니다.
          </p>
          <ul className="space-y-2">
            <li>· 일상 맥락 — "어제 무릎이 아팠다"가 오늘의 제안을 바꿉니다.</li>
            <li>· 한국어 LLM 제약 — 번역이 아니라 한국어 그대로의 이해.</li>
            <li>· 시니어 표현 패턴 — 세대의 말투를 학습합니다.</li>
          </ul>
        </div>
      </Section>

      {/* 2. How the agent works — senior-first + mockup slot */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="작동 방식"
          title="익숙한 대화 한 번이면 됩니다"
          lead="카카오톡에서 ‘오늘 어땠어요?’로 시작해, 당신의 하루에 맞는 제안을 카드로 받습니다."
        />
        <div className="mt-8 rounded-xl border border-line bg-bg p-8 text-center text-ink-soft">
          {/* TODO(CTO M1): Sample Interaction Mockup (정적 카카오톡 대화 이미지) */}
          샘플 대화 미리보기 — 4-turn mockup 입고 예정
        </div>
        <p className="mt-6 text-h3 font-semibold text-ink">
          AI가 결정하지 않습니다. AI는 제안하고, 당신이 선택합니다.
        </p>
      </Section>

      {/* 3. Data & privacy */}
      <Section tone="light">
        <SectionHeader
          eyebrow="데이터 · 개인정보"
          title="당신의 일상은 당신만의 것 — 우리는 빌려쓸 뿐입니다"
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <PrincipleCard
            title="최소 권한"
            body="필요한 정보만, 필요한 순간에만 사용합니다."
          />
          <PrincipleCard
            title="명시적 동의"
            body="무엇을 쓰는지 먼저 여쭙고, 당신이 허락한 범위에서만 동작합니다."
          />
          <PrincipleCard
            title="한국 PIPA 준수"
            body="국내 개인정보보호법 기준에 맞춰 안전하게 보관·암호화합니다."
          />
        </div>

        {/* Explicit senior → VC boundary (CTO §4.3) */}
        <p className="mt-12 max-w-prose rounded-xl bg-surface p-6 text-body text-ink-soft">
          여기까지만 보셔도 충분합니다. 아래는 기술자·투자자를 위한 자세한
          내용입니다.
        </p>
      </Section>

      {/* 4. System architecture — VC-first */}
      <Section tone="dark">
        <SectionHeader
          invert
          eyebrow="System architecture"
          title="프로덕션에서 동작하는 AI-native 시스템"
          lead="4개 레이어, 12개 컴포넌트 — 음성·카카오·검색·매칭·외부 채널을 잇는 에이전트 구조."
        />
        <div className="mt-8 rounded-xl border border-ivory/20 bg-navy p-8 text-center text-ivory/70">
          {/* TODO(CTO M2): AI Agent Architecture Diagram (정적 PNG, 4-layer/12-component) */}
          아키텍처 다이어그램 입고 예정 — 4-layer · 12-component
        </div>
        <div className="mt-6 grid gap-4 text-base text-ivory/80 sm:grid-cols-2">
          <p>· Layer 1 — User Channel (카카오 · 음성 · 검색)</p>
          <p>· Layer 2 — Service (에이전트 오케스트레이션)</p>
          <p>· Layer 3 — Data (프로필 · 메모리 · 매칭)</p>
          <p>· Layer 4 — External (복지 · 일자리 · 외부 포털)</p>
        </div>
      </Section>

      {/* 5. Tech stack high-level */}
      <Section tone="light">
        <SectionHeader
          eyebrow="Tech stack"
          title="기술 스택"
          lead="표준적이되 의도된 선택 — 각 선택에는 한국 시니어 컨텍스트라는 이유가 있습니다."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <StackRow label="LLM" value="Anthropic Claude — 한국어 시니어 voice 적합도" />
          <StackRow label="Backend" value="Python · FastAPI · Postgres" />
          <StackRow label="Channel" value="Kakao i 오픈빌더 — 시니어 친숙 채널 우선" />
          <StackRow label="Voice" value="음성 입력 — 타이핑 부담 없는 진입점" />
        </div>
      </Section>

      {/* 6. Hive meta narrative */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="Radically Transparent"
          title="회사 자체가 AI 에이전트 팀입니다"
          lead="DailyFit의 제품 = AI 에이전트가 시니어 일상을 함께 설계. DailyFit의 운영 = AI 에이전트가 회사를 함께 운영. 같은 구조(isomorphic)입니다."
        />
        <p className="mt-6 max-w-prose text-body text-ink-soft">
          Strategy · Finance · Product · Technology — 각 디비전을 AI 에이전트 팀이
          ADR로 문서화하고 함께 운영합니다. 시스템 프롬프트 원문과 실제 운영 데이터는
          공개하지 않습니다.
        </p>
      </Section>

      {/* 7. Open vs closed declaration + CTA */}
      <Section tone="dark">
        <SectionHeader
          invert
          eyebrow="공개 · 비공개"
          title="우리는 아키텍처를 공개합니다"
          lead="카피될 위험보다, 우리가 어떤 회사인지 시그널을 못 보내는 위험이 더 큽니다. 단, 시니어의 실제 일상 데이터는 절대 공개하지 않습니다."
        />
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/#download" variant="primary" size="lg">
            앱 다운로드
          </ButtonLink>
          <ButtonLink href="/investors" variant="ghost" size="lg">
            투자자 페이지 →
          </ButtonLink>
        </div>
      </Section>
    </>
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

function StackRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-line bg-surface p-5">
      <span className="text-base font-semibold text-sage">{label}</span>
      <span className="text-body text-ink">{value}</span>
    </div>
  );
}
