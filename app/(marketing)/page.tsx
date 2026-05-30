import { Section, SectionHeader } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';

// Home (/) — Option-A (senior-first) DEFAULT per plan. Hero copy + section
// order are the Option-A/B swap surface, decided on beta data (~launch +2-4w).
// Everything here is structured so a swap touches copy, not layout.

export default function HomePage() {
  return (
    <>
      {/* Hero — SWAP SURFACE (Option A vs B). Option-A default below. */}
      <Section tone="light" className="pt-24">
        <h1 className="max-w-3xl text-h1">
          매일이 다시 설렙니다.
          <br />
          당신의 하루, AI와 함께 설계하세요.
        </h1>
        <p className="mt-6 max-w-prose text-body text-ink-soft">
          DailyFit은 활동적인 한국 시니어(55–70)가 매일을 의미 있게 설계하도록
          돕는 AI 일상 설계 서비스입니다. 익숙한 카카오톡 대화 한 번이면 충분합니다.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="#download" variant="primary" size="lg">
            앱 다운로드
          </ButtonLink>
          <ButtonLink href="/technology" variant="ghost" size="lg">
            어떻게 작동하나요? →
          </ButtonLink>
        </div>
      </Section>

      {/* 문제 */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="왜 DailyFit인가"
          title="나이 듦은 문제가 아니라, 설계의 대상입니다"
          lead="활동적인 시니어는 돌봄의 대상이 아니라 자기 하루의 저자입니다. 다만 하루를 의미 있게 채우는 일은 매일 새롭게 어렵습니다."
        />
      </Section>

      {/* 해결 / 작동방식 (요약) */}
      <Section tone="light">
        <SectionHeader
          eyebrow="작동 방식"
          title="대화하면, 하루가 설계됩니다"
          lead="오늘 기분과 컨디션을 말하면, 어제를 기억한 AI가 오늘에 맞는 활동·모임·일자리를 제안합니다. 결정은 언제나 당신의 몫입니다."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <Step n="1" title="오늘을 말합니다" body="‘오늘 무릎이 좀 아파요’ 한마디면 됩니다." />
          <Step n="2" title="AI가 제안합니다" body="어제를 기억해 오늘에 맞는 하루를 카드로." />
          <Step n="3" title="당신이 선택합니다" body="마음에 드는 것만 고르세요. AI는 제안만 합니다." />
        </div>
      </Section>

      {/* 창업자 / Trends preview / 최종 CTA 는 Sanity·자산 입고 후 확장.
          현재는 backbone 구조만. */}
      <Section tone="dark" id="download">
        <SectionHeader
          invert
          title="베타 앱을 받아보세요"
          lead="가장 먼저 DailyFit과 하루를 설계할 분들을 모십니다."
        />
        <div className="mt-8">
          {/* TODO(PM): App Store / Play Store 링크 입고 */}
          <ButtonLink href={`mailto:`} variant="primary" size="lg" external>
            베타 신청 안내받기
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-6">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage text-h3 font-bold text-white">
        {n}
      </span>
      <p className="mt-4 text-h3 font-semibold text-ink">{title}</p>
      <p className="mt-2 text-body text-ink-soft">{body}</p>
    </div>
  );
}
