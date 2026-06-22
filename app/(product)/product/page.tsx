import type { Metadata } from 'next';
import { Reveal } from '@/components/motion/Reveal';
import { StoreBadge } from '@/components/product/StoreBadge';
import { HabitGamification } from '@/components/gami/HabitGamification';
import { storeLinks } from '@/lib/site';

export const metadata: Metadata = {
  title: '내가 설계하는 나의 하루',
  description:
    '매일 아침, 나에게 꼭 맞는 하루를 제안받으세요. AI가 돕고, 결정은 언제나 내가 합니다.',
};

// /product — 시니어 고객용 페이지 (mockup product-page-customer.html 기준).
// 단일 청자: 시니어. 2인칭 카피 허용 구역. 본문 ≥18px (시니어 a11y 플로어).
// 정직성: 가짜 후기·별점 게재 금지 — 실사용 후기는 베타 고객 동의 후 추가.
// 스토어 링크 = lib/site.ts storeLinks 단일 출처(env override 가능). 6/26 앱 공개
// 시 채우면 StoreBadge가 실링크 + UTM 전달(Play referrer). 비면 "곧 출시" 안전 배포.
// 광고 착지 = 이 페이지(/product). 진입 UTM은 그대로 보존되며(미들웨어/리다이렉트
// 없음) StoreBadge 클릭 시 스토어로 전달된다.
// TODO(Michael): 히어로 실사 이미지(공원 아침 산책, 자연광·따뜻한 색조) 입고.

export default function ProductPage() {
  return (
    <>
      {/* 1. hero */}
      <section className="hero-field relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="aurora aurora-1" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-2 lg:pb-24 lg:pt-24">
          <div>
            <p className="eyebrow-mono text-sage">5060 세대를 위한 AI 일상 동반자</p>
            <h1 className="mt-5 text-[42px] font-extrabold leading-[1.16] tracking-[-0.03em] text-ink sm:text-[54px]">
              내가 설계하는
              <br />
              <span className="text-sage">나의 하루.</span>
            </h1>
            <p className="mt-6 max-w-[40ch] text-[20px] leading-[1.7] text-ink-soft">
              매일 아침, 나에게 꼭 맞는 하루를 제안받으세요. AI가 돕고, 결정은
              언제나 내가 합니다.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#get"
                className="inline-flex min-h-[58px] items-center rounded-xl bg-sage px-9 text-[18px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
              >
                앱 다운로드
              </a>
              <a
                href="#features"
                className="inline-flex min-h-[58px] items-center rounded-xl border border-ink/15 bg-white/50 px-9 text-[18px] font-bold text-ink transition-colors hover:border-sage hover:text-sage active:scale-[0.98]"
              >
                기능 둘러보기
              </a>
            </div>
            <p className="mt-5 text-[15px] text-ink-soft">
              무료로 시작 · 5분이면 충분합니다
            </p>
          </div>
          <div className="flex aspect-[4/3] items-end rounded-3xl bg-gradient-to-br from-[#E7EEE4] via-[#F4EDE0] to-[#FCF8EF] p-5 shadow-[0_30px_70px_-40px_rgba(30,45,64,0.3)]">
            <span className="rounded-lg bg-white/80 px-3 py-2 text-caption italic text-ink-soft">
              공원에서 아침 산책하는 60대 · 자연광, 따뜻한 색조
            </span>
          </div>
        </div>
      </section>

      {/* 2. problem */}
      <section className="border-y border-line bg-ivory py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="max-w-[54ch]">
            <p className="eyebrow-mono text-sage">이런 적 있으셨나요</p>
            <h2 className="mt-4 text-[30px] font-extrabold tracking-[-0.03em] text-ink sm:text-[38px]">
              은퇴 다음 날, 하루가 막막했습니다.
            </h2>
            <p className="mt-4 text-[19px] leading-[1.7] text-ink-soft">
              누구나 겪지만, 아무도 먼저 말하지 않는 변화입니다.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <ProblemCard n="01" title="출근 없는 첫 월요일" delay={0}>
              하루를 시작하는 신호가 사라집니다.
            </ProblemCard>
            <ProblemCard n="02" title="흐려진 하루의 리듬" delay={100}>
              매일이 비슷하게 흘러가 버립니다.
            </ProblemCard>
            <ProblemCard n="03" title="혼자 시작하는 부담" delay={200}>
              새 일을 시작할 계기를 찾기 어렵습니다.
            </ProblemCard>
            <ProblemCard n="04" title="놓치는 신청 날짜" delay={300}>
              가고 싶던 강좌가 신청 당일에 마감됩니다.
            </ProblemCard>
          </div>
        </div>
      </section>

      {/* 3. solution */}
      <section id="features" className="bg-bg py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-line bg-white p-7 shadow-[0_30px_70px_-40px_rgba(30,45,64,0.35)]">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="text-[17px] font-extrabold text-ink">DailyFit</span>
                <span className="text-caption text-ink-soft">오늘의 하루</span>
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <Bubble who="DailyFit">어제 저녁 산책은 어떠셨어요?</Bubble>
                <Bubble who="나" me>
                  무릎이 좀 뻐근했어
                </Bubble>
                <Bubble who="DailyFit">
                  오늘은 가벼운 실내 스트레칭 15분 어떠세요? 오후엔 사진 동호회
                  모임도 있어요.
                </Bubble>
                <Bubble who="나" me>
                  좋아, 그렇게 할게
                </Bubble>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow-mono text-sage">DailyFit이란</p>
            <h2 className="mt-4 text-[30px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[38px]">
              나의 하루를
              <br />
              함께 설계합니다.
            </h2>
            <p className="mt-5 text-[19px] leading-[1.7] text-ink-soft">
              AI가 제안하고, 내가 결정하는 일상 동반자.
            </p>
            <div className="mt-8 flex flex-col gap-3.5">
              <ValueItem title="결정은 내 몫입니다">
                AI는 제안만 합니다. 무엇을 할지는 언제나 내가 정합니다.
              </ValueItem>
              <ValueItem title="매일 나에게 맞춥니다">
                어제 어땠는지 기억해, 오늘의 하루를 다시 조정합니다.
              </ValueItem>
              <ValueItem title="혼자가 아닙니다">
                비슷한 또래의 활동과 관심사를 함께 나눕니다.
              </ValueItem>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. how it works */}
      <section className="border-y border-line bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto max-w-[54ch] text-center">
            <p className="eyebrow-mono text-sage">작동 방식</p>
            <h2 className="mt-4 text-[30px] font-extrabold tracking-[-0.03em] text-ink sm:text-[38px]">
              3단계, 5분이면 시작합니다.
            </h2>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
            <StepCard n="1" title="오늘을 말합니다" delay={0}>
              오늘 하루 어떠셨는지, 말하듯 편하게 알려주세요.
            </StepCard>
            <StepCard n="2" title="내일을 제안받습니다" delay={100}>
              나에게 맞춘 내일의 하루를 설계해 드립니다.
            </StepCard>
            <StepCard n="3" title="골라서 시작합니다" delay={200}>
              마음에 드는 것을 고르면 하루가 시작됩니다.
            </StepCard>
          </div>
        </div>
      </section>

      {/* 5. helpers (agent capabilities in customer terms) */}
      <section className="bg-bg py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto max-w-[54ch] text-center">
            <p className="eyebrow-mono text-sage">나를 돕는 AI</p>
            <h2 className="mt-4 text-[30px] font-extrabold tracking-[-0.03em] text-ink sm:text-[38px]">
              하루를 함께 만드는 네 가지 도움
            </h2>
            <p className="mt-4 text-[19px] leading-[1.7] text-ink-soft">
              각자 맡은 역할로, 나의 하루를 곁에서 돕습니다.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            <HelpCard title="새 활동을 찾아드려요" delay={0}>
              내 관심사에 맞는 강좌·모임·활동을, 동네 밖 몰랐던 것까지 찾아
              보여드립니다.
            </HelpCard>
            <HelpCard title="신청 날짜를 챙겨드려요" delay={100}>
              &ldquo;내일 아침 9시 신청이에요&rdquo; — 놓치기 쉬운 시점을 미리
              알려드립니다.
            </HelpCard>
            <HelpCard title="나를 기억해요" delay={200}>
              어제의 선택을 기억해, 쓸수록 더 잘 맞는 하루가 됩니다.
            </HelpCard>
            <HelpCard title="함께할 사람을 이어드려요" delay={300}>
              비슷한 또래의 모임과 동호회로, 혼자가 아닌 하루를 만듭니다.
            </HelpCard>
          </div>
        </div>
      </section>

      {/* 5.5 habit / gamification — senior-facing (2nd person). Real characters
          + levels + welcome points, mirrored from the in-app screens. */}
      <HabitGamification />

      {/* 6. FAQ */}
      <section id="faq" className="border-y border-line bg-ivory py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal className="text-center">
            <p className="eyebrow-mono text-sage">자주 묻는 질문</p>
            <h2 className="mt-4 text-[30px] font-extrabold tracking-[-0.03em] text-ink sm:text-[38px]">
              궁금한 점을 모았습니다
            </h2>
          </Reveal>
          <div className="mt-10 flex flex-col gap-3.5">
            <Faq q="정말 무료인가요?" open>
              무료로 시작하실 수 있습니다. 카드 등록 없이 앱만 받으면 바로
              시작됩니다.
            </Faq>
            <Faq q="스마트폰이 익숙하지 않아도 괜찮을까요?">
              평소 말하듯 입력하거나 음성으로 말씀하시면 됩니다. 큰 글씨와
              단순한 화면으로, 처음 켜는 순간부터 안내해 드립니다.
            </Faq>
            <Faq q="제 정보는 안전하게 보관되나요?">
              대화 내용은 암호화해 보관하며, 본인 동의 없이 외부에 제공하지
              않습니다. 언제든 직접 내려받거나 삭제하실 수 있습니다.
            </Faq>
            <Faq q="AI가 정해주는 대로 따라야 하나요?">
              아닙니다. AI는 제안만 합니다. 무엇을 할지는 언제나 본인이
              고르시면 되고, 마음에 들지 않으면 다른 제안을 받아보실 수
              있습니다.
            </Faq>
          </div>
        </div>
      </section>

      {/* 7. final CTA */}
      <section id="get" className="bg-gradient-to-b from-sage to-sage-dk py-24 text-center text-white sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <h2 className="mx-auto max-w-[20ch] text-[32px] font-extrabold leading-[1.2] tracking-[-0.03em] sm:text-[42px]">
              오늘부터, 내가 설계하는 하루.
            </h2>
            <p className="mt-5 text-[19px] text-white/85">
              지금 앱을 받고 첫 하루를 시작해 보세요.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <StoreBadge store="Google Play" href={storeLinks.android} />
              <StoreBadge store="App Store" href={storeLinks.ios} />
            </div>
            <p className="mt-6 text-[15px] text-white/70">
              무료로 시작 · 카드 등록 없이
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ───────────────────────── partials ───────────────────────── */

function ProblemCard({
  n,
  title,
  delay,
  children,
}: {
  n: string;
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div className="h-full rounded-2xl border border-line bg-white p-7">
        <p className="eyebrow-mono text-sage">{n}</p>
        <h3 className="mt-3 text-[20px] font-bold text-ink">{title}</h3>
        <p className="mt-2 text-[18px] leading-relaxed text-ink-soft">{children}</p>
      </div>
    </Reveal>
  );
}

function Bubble({
  who,
  me,
  children,
}: {
  who: string;
  me?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        me
          ? 'max-w-[84%] self-end rounded-2xl rounded-br-md bg-sage px-4 py-3 text-white'
          : 'max-w-[84%] self-start rounded-2xl rounded-bl-md bg-surface px-4 py-3 text-ink'
      }
    >
      <span className="block text-[11px] font-bold uppercase tracking-wider opacity-60">
        {who}
      </span>
      <span className="text-[18px] leading-relaxed">{children}</span>
    </div>
  );
}

function ValueItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line border-l-[3px] border-l-sage bg-white px-6 py-5">
      <p className="text-[18px] font-bold text-ink">{title}</p>
      <p className="mt-1 text-[18px] leading-relaxed text-ink-soft">{children}</p>
    </div>
  );
}

function StepCard({
  n,
  title,
  delay,
  children,
}: {
  n: string;
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div className="h-full rounded-2xl border border-line bg-white p-7 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage text-[20px] font-extrabold text-white">
          {n}
        </span>
        <h3 className="mt-4 text-[20px] font-bold text-ink">{title}</h3>
        <p className="mt-2 text-[18px] leading-relaxed text-ink-soft">{children}</p>
      </div>
    </Reveal>
  );
}

function HelpCard({
  title,
  delay,
  children,
}: {
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div className="h-full rounded-2xl border border-line bg-white p-7">
        <h3 className="text-[20px] font-bold text-ink">{title}</h3>
        <p className="mt-2 text-[18px] leading-relaxed text-ink-soft">{children}</p>
      </div>
    </Reveal>
  );
}

function Faq({
  q,
  open,
  children,
}: {
  q: string;
  open?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details
      open={open}
      className="group rounded-2xl border border-line bg-white px-6 py-1 open:pb-5"
    >
      <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-bold text-ink [&::-webkit-details-marker]:hidden">
        {q}
        <span
          className="text-sage transition-transform group-open:rotate-45"
          aria-hidden="true"
        >
          +
        </span>
      </summary>
      <p className="border-t border-line pt-4 text-[18px] leading-[1.75] text-ink-soft">
        {children}
      </p>
    </details>
  );
}
