import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import { Reveal } from '@/components/motion/Reveal';
import { StoreBadge } from '@/components/product/StoreBadge';
import { DeviceShot } from '@/components/home/DeviceShot';
import { HabitGamification } from '@/components/gami/HabitGamification';
import { ButtonLink } from '@/components/ui/Button';
import { storeLinks, site, productAppUrl, externalLinkProps } from '@/lib/site';
import { getHelp, type FaqItem } from '@/lib/help';
import { faqJsonLd, mobileAppJsonLd } from '@/lib/jsonld';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = pageSeo({
  path: '/product',
  title: '번거로운 신청, 내 Agent가 대신 해 드려요',
  description:
    '우리 동네 활동을 말 한마디로 찾아드리고, 번거로운 신청을 내 Agent가 대신 진행해 드립니다. AI가 돕고, 결정은 언제나 내가 합니다.',
});

// /product — 고객용 페이지. 단일 청자이고 2인칭 카피 허용 구역이다.
// 본문 ≥18px · tap target ≥48px. 광고 착지 = 이 페이지(진입 UTM 보존 → StoreBadge 가 스토어로 전달).
// 정직성: 가짜 후기·별점 게재 금지 — 실사용 후기는 고객 동의 후에만 추가한다.
//
// 🔴 2026-09-03 개편이 문 두 가지 결정
// ① FD-014(편익 서열) — **안도감 → 즐거움 → 간편함**. 「말만 하면 딸깍」(간편함)을 히어로에
//    세우지 않는다. 같은 화자가 「내가 하면 되는데」라며 천 원을 거절했다. 지갑이 열린 쪽은
//    「내 힘으로 안 돼서」였다. 간편함은 3순위 자리에서 쓴다(금지되는 건 «리드»이지 «사용»이 아니다).
//    ★조건: 안도감 문장은 **전부 현재형**. 외부 기관 대행의 외부 회원 `done` 이 0건이라
//    「몇 번을 떨어졌는데 이번엔 됐어요」류 과거형 성공담은 우리 기록으로 받칠 수 없다.
//    「무조건」·「100%」 보장 워딩 금지.
// ② FD-015(회사 한 줄 약속) — 「할 줄 몰라서 못 하는 일이 없는 삶」 +
//    「마음먹은 일은 끝까지 되게 한다」. 마무리 절이 이 문장을 문다.
//
// 대행 표현은 앱의 정직 분기를 그대로 옮긴 것이다(ApplyScreen):
//   자체활동 = 「저희가 끝까지 신청해 드려요」
//   외부기관 = 「정보는 미리 준비하고, 본인인증 단계는 그때 안내해 드려요」
// 히어로 자리표시자(그라데이션 박스 + "공원에서 아침 산책하는 60대" 캡션)는 실제 앱 화면으로
// 교체했다 — 실물이 있는데 자리표시자를 두는 건 우리 손해다.

const PROBLEMS = [
  { n: '01', title: '어디서 뭘 하는지 찾기가 어렵다', body: '기관마다 홈페이지가 다르고, 한곳에 모여 있지 않습니다.' },
  { n: '02', title: '겨우 찾으면 신청이 또 일이다', body: '전화하고, 회원가입하고, 서류를 내야 합니다.' },
  { n: '03', title: '“선착순”인데 알았을 땐 마감', body: '접수 시작 시각을 놓치면 그걸로 끝입니다.' },
  { n: '04', title: '혼자 시작하기가 부담이다', body: '같이 갈 사람도, 시작할 계기도 마땅치 않습니다.' },
];

const STEPS = [
  { n: '1', title: '말로 물어보세요', body: '“이번 주에 배울 만한 거 있어?” 두서없이 말해도 다 알아들어요.' },
  { n: '2', title: '딱 맞는 활동을 골라드려요', body: '주민센터·복지관·도서관·문화센터·평생학습관을 한자리에 모아 보여드려요.' },
  { n: '3', title: '신청은 Agent가 진행해요', body: '복잡한 절차는 Agent가 밟고, 마지막 확인만 하시면 돼요.' },
];

export default async function ProductPage() {
  // FAQ + contact from the single source of truth (GET /api/help). On unset
  // NEXT_PUBLIC_API_URL or any failure, getHelp() returns the bundled fallback
  // (the same items the app ships) so this page never breaks. See lib/help.ts —
  // 🔴 프로드에는 그 env 가 없어서 «폴백이 상시 화면»이다. 거기 값을 고치는 것은
  //    비상용을 손보는 일이 아니라 라이브를 바꾸는 일이다.
  const { faq, contact } = await getHelp();

  return (
    <>
      {/* 검색·AI 답변엔진용 구조화 데이터. FAQ 는 화면에 렌더되는 것과 동일한 원본에서
          나온다 — 숨은 콘텐츠를 마크업하지 않는다. */}
      <JsonLd data={mobileAppJsonLd()} />
      {faq.length > 0 && <JsonLd data={faqJsonLd(faq)} />}

      {/* ─────────── 1. hero — 안도감이 먼저다 (FD-014) ─────────── */}
      <section className="ed-hero">
        <div className="ed-hero-grid" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-wrap gap-12 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-center lg:gap-16 lg:pb-24 lg:pt-20">
          <div>
            <p className="text-eyebrow uppercase text-sage">55세 이상 어른들을 위한 AI Agent</p>
            <h1 className="mt-6 text-[38px] font-extrabold leading-[1.16] tracking-[-0.03em] text-ink sm:text-[50px] lg:text-[56px]">
              번거로운 신청,
              <br />
              <span className="text-sage">내 Agent가 대신</span> 해 드려요.
            </h1>
            <p className="mt-7 max-w-[34rem] text-[20px] leading-[1.7] text-ink-soft">
              우리 동네 활동을 말 한마디로 찾아드리고, 접수까지 함께합니다. AI가 돕고, 결정은
              언제나 내가 합니다.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <a
                href={productAppUrl}
                {...externalLinkProps}
                className="inline-flex min-h-[60px] items-center rounded-xl bg-sage px-8 text-[19px] font-extrabold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
              >
                웹에서 바로 시작하기
              </a>
              <a
                href="#how"
                className="inline-flex min-h-[60px] items-center rounded-xl border border-hair-strong bg-white/60 px-8 text-[18px] font-bold text-ink transition-colors hover:border-sage hover:text-sage active:scale-[0.98]"
              >
                어떻게 쓰나요?
              </a>
            </div>
            <p className="mt-5 text-[16px] text-ink-soft">설치하지 않아도 됩니다 · 무료로 시작</p>
          </div>
          <Reveal delay={100}>
            <DeviceShot
              src="/app/01-delegate-button.webp"
              alt="활동 화면에서 «내 Agent가 대신 신청» 버튼을 누르는 DailyFit 앱 화면"
              className="mx-auto w-[68%] max-w-[300px] lg:w-full"
              priority
            />
            <p className="mt-4 text-center text-[15px] text-ink-soft">실제 앱 화면</p>
          </Reveal>
        </div>
      </section>

      {/* ─────────── 2. 이런 적 있으셨지요 ─────────── */}
      <section className="border-t border-hair bg-bg py-20 sm:py-24">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Reveal className="max-w-[46rem]">
            <p className="text-eyebrow uppercase text-sage">이런 적 있으셨지요</p>
            <h2 className="mt-4 text-[30px] font-extrabold leading-[1.25] tracking-[-0.03em] text-ink sm:text-[38px]">
              찾는 것도 일이고, 신청은 더 일입니다.
            </h2>
            <p className="mt-5 text-[19px] leading-[1.7] text-ink-soft">
              DailyFit은 그 두 가지를 대신 해 드리려고 만들었습니다.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <div className="ed-card h-full p-7">
                  <p className="num text-eyebrow text-sage">{p.n}</p>
                  <h3 className="mt-4 text-[20px] font-bold leading-[1.4] text-ink">{p.title}</h3>
                  <p className="mt-3 text-[18px] leading-[1.7] text-ink-soft">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 3. 어떻게 쓰나요 — 실제 앱 화면 3장 ─────────── */}
      <section id="how" className="ed-paper border-t border-hair py-20 sm:py-24">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Reveal className="max-w-[46rem]">
            <p className="text-eyebrow uppercase text-sage">이렇게 쓰세요</p>
            <h2 className="mt-4 text-[30px] font-extrabold leading-[1.25] tracking-[-0.03em] text-ink sm:text-[38px]">
              말 한마디로 시작해서, 신청까지.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-12 sm:grid-cols-3 sm:gap-6">
            <StepShot
              step={STEPS[0]}
              src="/app/05-voice-search.webp"
              alt="마이크를 누르고 말로 활동을 찾는 앱 화면"
              delay={0}
            />
            <StepShot
              step={STEPS[1]}
              src="/app/04-top3-recommend.webp"
              alt="나에게 맞는 활동 세 개를 추천한 앱 화면"
              delay={100}
            />
            <StepShot
              step={STEPS[2]}
              src="/app/02-openrun-reserved.webp"
              alt="접수 시작 시각에 맞춰 대신 신청이 예약된 앱 화면"
              delay={200}
            />
          </div>
          <p className="mt-8 text-[15px] text-ink-soft">실제 앱 화면 · 2026년 9월 빌드</p>
        </div>
      </section>

      {/* ─────────── 4. 무엇을 대신 해 드리나 — 정직 분기 그대로 ─────────── */}
      <section className="border-t border-hair bg-bg py-20 sm:py-24">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <p className="text-eyebrow uppercase text-sage">신청, 어디까지 대신 하나요</p>
              <h2 className="mt-4 text-[30px] font-extrabold leading-[1.25] tracking-[-0.03em] text-ink sm:text-[38px]">
                할 수 있는 데까지 하고,
                <br />
                못 하는 건 그때 말씀드려요.
              </h2>
              <p className="mt-6 max-w-[34rem] text-[19px] leading-[1.7] text-ink-soft">
                기관마다 절차가 다릅니다. 어디까지 대신 할 수 있는지 미리 알려 드리고, 그 앞까지는
                Agent가 진행합니다.
              </p>
            </Reveal>
            <div className="flex flex-col gap-4">
              <Reveal delay={80}>
                <div className="ed-card border-l-[3px] border-l-sage p-7">
                  <p className="text-[19px] font-bold text-ink">DailyFit이 여는 활동</p>
                  <p className="mt-3 text-[18px] leading-[1.7] text-ink-soft">
                    저희가 끝까지 신청해 드려요. 신청이 끝나면 결과를 알려 드립니다.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <div className="ed-card border-l-[3px] border-l-sage p-7">
                  <p className="text-[19px] font-bold text-ink">기관·문화센터 프로그램</p>
                  <p className="mt-3 text-[18px] leading-[1.7] text-ink-soft">
                    정보는 미리 준비해 두고, 본인인증이나 결제처럼 본인만 하실 수 있는 단계는 그때
                    안내해 드려요.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={240}>
                <div className="ed-card border-l-[3px] border-l-sage p-7">
                  <p className="text-[19px] font-bold text-ink">선착순 강좌</p>
                  <p className="mt-3 text-[18px] leading-[1.7] text-ink-soft">
                    접수 시작 시각에 맞춰 Agent가 대신 신청합니다. 새벽에 기다리지 않으셔도 돼요.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── 5. 즐거움 — 캐릭터·레벨 (앱 화면 1:1 미러) ─────────── */}
      <HabitGamification />

      {/* ─────────── 6. FAQ ─────────── */}
      <section id="faq" className="border-t border-hair bg-bg py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <p className="text-eyebrow uppercase text-sage">자주 묻는 질문</p>
            <h2 className="mt-4 text-[30px] font-extrabold tracking-[-0.03em] text-ink sm:text-[38px]">
              궁금한 점을 모았습니다
            </h2>
          </Reveal>
          <div className="mt-10 divide-y divide-hair border-y border-hair">
            {faq.map((item, i) => (
              <Faq key={item.id} item={item} open={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 7. 사람과 연결 — FAQ로 안 풀리면 진짜 사람에게 ─────────── */}
      <section id="contact" className="ed-paper border-t border-hair py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <p className="text-eyebrow uppercase text-sage">사람과 연결</p>
            <h2 className="mt-4 text-[30px] font-extrabold tracking-[-0.03em] text-ink sm:text-[36px]">
              여전히 궁금한 점이 있으신가요?
            </h2>
            <p className="mx-auto mt-5 max-w-[46ch] text-[19px] leading-[1.7] text-ink-soft">
              찾으시는 답이 없으면, 사람이 직접 도와드립니다. 편하게 연락 주세요.
            </p>
            <div className="mt-9 flex flex-col flex-wrap items-center justify-center gap-3.5 sm:flex-row">
              {contact.kakao_url ? (
                <ButtonLink
                  href={contact.kakao_url}
                  external
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  카카오톡으로 문의하기
                </ButtonLink>
              ) : null}
              <ButtonLink
                href={`mailto:${contact.email || site.contactEmail}`}
                external
                variant={contact.kakao_url ? 'ghost' : 'primary'}
                size="lg"
                className="w-full sm:w-auto"
              >
                이메일로 문의하기
              </ButtonLink>
            </div>
            {contact.phones.length > 0 ? (
              <div className="mt-8 flex flex-col items-center gap-3">
                <p className="text-[17px] font-bold text-ink">전화로 바로 연결</p>
                <div className="flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row">
                  {contact.phones.map((p) => (
                    <ButtonLink
                      key={p.tel}
                      href={`tel:${p.tel}`}
                      external
                      variant="ghost"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      {p.label} · {p.display}
                    </ButtonLink>
                  ))}
                </div>
              </div>
            ) : null}
            {contact.response_note ? (
              <p className="mt-7 text-[16px] leading-[1.6] text-ink-soft">{contact.response_note}</p>
            ) : null}
          </Reveal>
        </div>
      </section>

      {/* ─────────── 8. 마무리 — FD-015 회사 한 줄 약속 ─────────── */}
      <section id="get" className="ed-stage py-24 text-center sm:py-28">
        <div className="hx-stage-grid" aria-hidden="true" />
        <div className="hx-grain" aria-hidden="true" />
        <div className="relative mx-auto max-w-wrap px-5 sm:px-8">
          <Reveal>
            <h2 className="mx-auto max-w-[20ch] text-[34px] font-extrabold leading-[1.22] tracking-[-0.03em] text-ivory sm:text-[46px]">
              할 줄 몰라서
              <br />못 하는 일이 없는 삶.
            </h2>
            <p className="mx-auto mt-6 max-w-[40ch] text-[19px] leading-[1.7] text-ivory/70">
              마음먹은 일은 끝까지 되게 하는 것. DailyFit이 하는 약속입니다.
            </p>
            {/* 웹이 1순위 출구다 — 안드로이드는 아직 스토어에 없어서(“곧 출시” 비클릭 배지)
                여기까지 온 안드 방문자는 이 버튼이 없으면 아무 데도 못 간다. 2026-08-04. */}
            <div className="mt-10 flex justify-center">
              <a
                href={productAppUrl}
                {...externalLinkProps}
                className="inline-flex min-h-[62px] items-center rounded-xl bg-white px-9 text-[19px] font-extrabold text-sage-dk transition-transform hover:bg-ivory active:scale-[0.98]"
              >
                웹에서 바로 시작하기
              </a>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3.5">
              <StoreBadge store="Google Play" href={storeLinks.android} />
              <StoreBadge store="App Store" href={storeLinks.ios} />
            </div>
            <p className="mt-6 text-[16px] text-ivory/60">무료로 시작 · 카드 등록 없이</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ───────────────────────── partials ───────────────────────── */

function StepShot({
  step,
  src,
  alt,
  delay,
}: {
  step: { n: string; title: string; body: string };
  src: string;
  alt: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex flex-col gap-6">
        <DeviceShot src={src} alt={alt} className="mx-auto w-[70%] max-w-[260px] sm:w-full" />
        <div>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-sage text-[19px] font-extrabold text-white">
            {step.n}
          </span>
          <h3 className="mt-4 text-[21px] font-bold leading-[1.4] text-ink">{step.title}</h3>
          <p className="mt-2 text-[18px] leading-[1.7] text-ink-soft">{step.body}</p>
        </div>
      </div>
    </Reveal>
  );
}

function Faq({ item, open }: { item: FaqItem; open?: boolean }) {
  return (
    <details open={open} className="group py-1 open:pb-5">
      <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 text-[19px] font-bold text-ink [&::-webkit-details-marker]:hidden">
        {item.q}
        <span className="shrink-0 text-[22px] text-sage transition-transform group-open:rotate-45" aria-hidden="true">
          +
        </span>
      </summary>
      <p className="whitespace-pre-line pt-2 text-[18px] leading-[1.75] text-ink-soft">{item.a}</p>
    </details>
  );
}
