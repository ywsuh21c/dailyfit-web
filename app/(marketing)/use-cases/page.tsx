import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Use cases',
  description:
    'DailyFit의 에이전트가 실제로 쓰이는 곳 — 개인 시니어의 하루부터 기관 파트너의 운영까지.',
};

// /use-cases — Option-B 신규 페이지. Source: option-b-content-strategist-
// use-cases.md + approved mockup (use-cases.html). Honesty rule from the
// spec: every card carries a confidence badge (Real / Probable /
// Aspirational) — 진행 중과 탐색 중을 절대 섞지 않는다.

const mailto = `mailto:${site.contactEmail}`;

export default function UseCasesPage() {
  return (
    <>
      {/* hero */}
      <section className="hero-field relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-20 lg:pt-24">
          <p className="eyebrow-mono text-sage">Use cases · How DailyFit is being used</p>
          <h1 className="mt-5 max-w-[24ch] text-[38px] font-extrabold leading-[1.18] tracking-[-0.03em] text-ink sm:text-[48px]">
            DailyFit이 함께 만드는 <span className="text-sage">하루의 시나리오</span>들.
          </h1>
          <p className="mt-6 max-w-[58ch] text-body text-ink-soft">
            개인 시니어의 일상부터 복지관·동호회 같은 기관 파트너의 운영까지 —
            DailyFit의 에이전트는 이미 여러 맥락에서 하루를 설계하고 있습니다.
          </p>
          <p className="mt-3 max-w-[58ch] text-base text-ink-soft/80">
            각 카드는 신뢰도(Real · Probable · Aspirational)를 명시합니다. 진행
            중인 사례와 탐색 중인 가능성을 분명히 구분합니다.
          </p>
        </div>
      </section>

      {/* launchable scenarios */}
      <section className="bg-bg py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="max-w-[54ch]">
            <p className="eyebrow-mono text-sage">Launchable scenarios</p>
            <h2 className="mt-4 text-[30px] font-extrabold tracking-[-0.03em] text-ink sm:text-[36px]">
              지금 작동하는 시나리오
            </h2>
            <p className="mt-4 text-body text-ink-soft">
              현재 제품 capability 안에서 가능한 사례들 — 영업과 검증의
              출발점입니다.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <CaseCard
              real
              cat="시니어 개인"
              title="65세, 새 취미를 시작한 하루"
              persona="대상: 베타 사용자 (composite persona)"
              delay={0}
            >
              매일의 대화로 그날의 흐름을 설계하고, 어제의 반응을 기억해 오늘의
              제안이 더 맞아갑니다. 산책·실내 스트레칭·동호회 모임이 한 사람의
              리듬 위에서 이어집니다.
            </CaseCard>
            <CaseCard
              cat="B2B2C 파트너"
              title="복지관 프로그램 큐레이션 채널"
              persona="대상: 복지관 · 평생학습관 운영자"
              delay={100}
            >
              분기마다 열리는 프로그램이 신청 당일에 마감됩니다. DailyFit은
              회원별 관심사에 맞는 프로그램을 미리 알리고, 신청 시점을 챙기는
              기관의 큐레이션 채널이 됩니다.
            </CaseCard>
            <CaseCard
              cat="시니어 개인 · 자녀 채널"
              title="떨어져 사는 부모, 자녀의 안심 채널"
              persona="대상: 시니어 부모를 둔 30~40대 자녀"
              delay={200}
            >
              매일 안부 전화에 &ldquo;괜찮다&rdquo;만 돌아오던 관계가, 옵트인
              기반 일일 활동 요약으로 바뀝니다. 자녀는 1줄 요약을 받고, 부모는
              공유하는 가치를 인식합니다.
            </CaseCard>
            <CaseCard
              cat="커뮤니티"
              title="시니어 동호회 운영 도구"
              persona="대상: 동호회 · 모임 리더"
              delay={300}
            >
              또래 활동을 연결하고 모임을 활성화합니다. 새 멤버에게 맞는 모임을
              찾아주고, 모임 일정은 멤버들의 하루 설계 안에 자연스럽게
              들어갑니다.
            </CaseCard>
          </div>
          <p className="mt-8 max-w-[64ch] text-caption text-ink-soft/80">
            * 인물 시나리오는 실제 베타 사용자 데이터 기반의 composite
            persona이며, 개인 사용 결과는 다를 수 있습니다. 파트너 시나리오의
            정량 추정치는 검증 전 가설입니다.
          </p>
        </div>
      </section>

      {/* vision — clearly separated */}
      <section className="border-y border-line bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="max-w-[54ch]">
            <p className="eyebrow-mono text-sage">Vision · What we&rsquo;re exploring</p>
            <h2 className="mt-4 text-[30px] font-extrabold tracking-[-0.03em] text-ink sm:text-[36px]">
              아직 진행 중이 아닌, 탐색 중인 방향
            </h2>
            <p className="mt-4 text-body text-ink-soft">
              아래는 체결된 파트너십이 아닙니다. 에이전트가 닿을 수 있는
              가능성의 스케치 — 함께 검증할 파트너를 찾고 있습니다.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <VisionCard cat="보험사" title="시니어 웰니스 번들" delay={0}>
              활동적인 일상이 곧 건강 지표입니다. 보험 가입자 대상 웰니스
              프로그램으로 제공하는 모델을 탐색합니다.
            </VisionCard>
            <VisionCard cat="통신사" title="시니어 요금제 번들" delay={100}>
              시니어 요금제 가입 시 DailyFit을 부가가치로 제공 — 부가가치
              인식이 가입 유지율로 이어지는지 검증합니다.
            </VisionCard>
            <VisionCard cat="Your partnership" title="여기에 당신의 시나리오가" delay={200}>
              시니어 시장에서 DailyFit과 함께 검증하고 싶은 채널이 있으신가요?
              첫 사례를 함께 설계합니다.
            </VisionCard>
          </div>
        </div>
      </section>

      {/* final CTA */}
      <section className="bg-gradient-to-b from-sage to-sage-dk py-24 text-center text-white sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <h2 className="mx-auto max-w-[22ch] text-[32px] font-extrabold leading-[1.2] tracking-[-0.03em] sm:text-[40px]">
              파트너십을 함께 만들 분을 찾습니다.
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-base text-white/80">
              복지관·동호회·플랫폼·보험·통신 — 시니어의 하루에 닿는 채널을
              운영하신다면, 첫 사례를 함께 설계하고 싶습니다. 창업자가 직접
              응답합니다.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a
                href={mailto}
                className="inline-flex min-h-[56px] items-center rounded-xl bg-white px-8 text-[17px] font-bold text-sage-dk transition-colors hover:bg-ivory active:scale-[0.98]"
              >
                Talk to us
              </a>
              <Link
                href="/technology"
                className="inline-flex min-h-[56px] items-center rounded-xl border border-white/40 px-8 text-[17px] font-bold text-white transition-colors hover:border-white hover:bg-white/10 active:scale-[0.98]"
              >
                기술 자세히 보기 →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function CaseCard({
  real,
  cat,
  title,
  persona,
  delay,
  children,
}: {
  // Confidence tier drives BOTH label and style — copy can't drift from styling.
  real?: boolean;
  cat: string;
  title: string;
  persona: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="eyebrow-mono text-ink-soft/70">{cat}</span>
          <span
            className={`rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${real ? 'bg-sage text-white' : 'border border-sage/25 bg-sage/10 text-sage'}`}
          >
            {real ? 'Real · 베타' : 'Probable'}
          </span>
        </div>
        <h3 className="mt-4 text-[21px] font-bold text-ink">{title}</h3>
        <p className="mt-1 text-caption font-semibold text-sage">{persona}</p>
        <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">{children}</p>
      </div>
    </Reveal>
  );
}

function VisionCard({
  cat,
  title,
  delay,
  children,
}: {
  cat: string;
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex h-full flex-col rounded-2xl border border-dashed border-ink/20 bg-white/60 p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="eyebrow-mono text-ink-soft/70">{cat}</span>
          <span className="rounded-md border border-ink/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-soft">
            Aspirational
          </span>
        </div>
        <h3 className="mt-4 text-[19px] font-bold text-ink">{title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{children}</p>
      </div>
    </Reveal>
  );
}
