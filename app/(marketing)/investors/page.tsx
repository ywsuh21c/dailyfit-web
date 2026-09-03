import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import { ButtonLink } from '@/components/ui/Button';
import { getCatalogCount, formatAsOf } from '@/lib/catalog-count';
import { CountUp } from '@/components/motion/CountUp';
import { OrbitRings } from '@/components/motion/OrbitRings';
import { Reveal } from '@/components/motion/Reveal';
import { Spread, SpreadTitle } from '@/components/ui/Editorial';

// Per plan decision D / IR Q24: keep out of top nav; noindex until the
// indexing decision is locked.
export const metadata: Metadata = pageSeo({
  path: '/investors',
  title: 'Investors',
  description: '55–70세를 위한 AI 일상 설계 플랫폼. 무엇을, 왜 지금, 누가 만드는지.',
  noindex: true,
});

// Source copy: ir-investors-page-scope.md (IR Strategist, 2026-05-28).
// 🔴 HARD RULE [[feedback_no_fundraise_disclosure_on_web]]: no "we are raising"
// language anywhere on this page — founder-direct contact only. That rule is
// why the closing section is a contact CTA and not a deck request form.
// 인구 캐논 = 1,301만(행안부 주민등록 인구통계 2026.6). 1,500만은 폐기 — 복원 금지.
// 2026-09-03: Editorial Daylight — numbered spreads; the catalog stat now reads
// the LIVE count (was a bundled constant that quietly aged).

// 카탈로그 수치가 살아 있으므로 이 페이지도 함께 재검증한다.
export const revalidate = 21600;

const EVIDENCE = [
  {
    stat: '96.5% vs 65.6%',
    claim: '이 세대의 디지털 접근은 이미 보편입니다. 활용 역량과의 30%p 격차가 Agent의 기회 공간입니다.',
    source: '과기정통부·NIA 디지털정보격차 실태조사 2024',
  },
  {
    stat: '1,051만 명',
    claim: '65세 이상 인구, 전체의 20.3%. 2036년에는 30.9%까지 늘어납니다.',
    source: '통계청 고령자 통계 2025 · 장래인구추계',
  },
  {
    stat: '88.2%',
    claim: '65세 이상 대다수가 청년기에 여가 경험이 없었습니다. 원하지 않는 게 아니라, 시작할 방법이 없었습니다.',
    source: '서울시50플러스재단 50+리포트',
  },
];

const STEPS = [
  { n: '1', title: '말로 요청', body: '“뭔가 새로운 걸 배우고 싶어” 처럼, 평소 말투 그대로.' },
  { n: '2', title: 'Agent가 설계', body: '의도를 읽고 활동을 탐색·큐레이션해 하루를 구성합니다.' },
  {
    n: '3',
    title: '신청까지 대행',
    body: '인기 프로그램의 외부 포털 신청·접수까지 대신 처리하고, 마지막 확인만 사용자가.',
  },
];

const MODEL = [
  {
    tag: 'Credit',
    title: '쓴 만큼만 과금',
    body: '활동 탐색과 제안은 무료입니다. 신청 대행이 성공했을 때만 크레딧이 차감되고, 난이도에 따라 건당 가격이 달라집니다.',
  },
  {
    tag: 'Why not subscription',
    title: '구독제가 아닌 이유',
    body: '앞서 시도된 동일 세대 구독 서비스의 공개 지표(월 9,900원, 유료 전환 약 10%)가 천장을 시사합니다. 성과 기반 과금이 그 천장을 넘는 설계입니다.',
  },
  {
    tag: 'Fun-driven',
    title: '재미가 이끄는 참여',
    body: '가입·출석·친구 초대로 포인트를 게임처럼 모으고, 모은 포인트를 대행에 씁니다. 자발적 참여가 결제 전의 습관을 만듭니다.',
  },
];

export default async function InvestorsPage() {
  const { count: catalogCount, asOf } = await getCatalogCount();

  return (
    <>
      {/* Hero — market thesis */}
      <section className="ed-hero">
        <div className="ed-hero-grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-wrap px-5 pb-16 pt-16 sm:px-8 lg:pb-20 lg:pt-24">
          <p className="text-eyebrow uppercase text-sage">DailyFit · Investors</p>
          <h1 className="mt-6 max-w-[22ch] text-display-sm text-ink sm:text-[48px] sm:leading-[1.1] lg:text-[56px]">
            한국에서 가장 빠르게 늘어나는 인구는 디지털을 씁니다.
          </h1>
          <p className="mt-7 max-w-[44rem] text-[19px] leading-[1.7] text-ink-soft">
            한국의 55–70세 1,300만 명이 이미 카카오톡으로 하루를 운영합니다. DailyFit은 그 위에 AI
            Agent를 얹어 &ldquo;건강하게 오래 재미나게 의미있게 사는 일상&rdquo;을 매일 설계합니다.
          </p>
          <div className="mt-9">
            <ButtonLink href="/contact" variant="primary" size="lg">
              창업자에게 직접 연락하기 →
            </ButtonLink>
          </div>

          <dl className="mt-14 grid gap-x-6 gap-y-8 border-t border-hair-strong pt-8 sm:grid-cols-3">
            <StatCard suffix="만 명" label="한국 55–70세 인구">
              <CountUp to={1300} />
            </StatCard>
            <StatCard suffix="건" label={`보유 프로그램·활동 DB · ${formatAsOf(asOf)} 기준`}>
              <CountUp to={catalogCount} />
            </StatCard>
            <StatCard suffix="티어" label="Agent 자율성 단계">
              <CountUp to={3} duration={900} />
            </StatCard>
          </dl>
          <p className="mt-4 text-[12.5px] text-ink-soft/70">
            인구 수치 출처: 행정안전부 주민등록 인구통계, 2026년 6월 기준(55~70세 13,014,756명)
          </p>
        </div>
      </section>

      {/* 01 · Why now */}
      <section className="border-t border-hair bg-bg py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="01" label="Why now">
            <Reveal>
              <SpreadTitle>왜 지금인가</SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                한국 55–70세 시장이 변곡점을 맞은 이유는 세 가지 흐름이 동시에 교차하기 때문입니다.
                디지털 친숙도 · 인구 구조 · 스스로 하루를 설계하려는 수요.
              </p>
            </Reveal>
            {/* 세 흐름 각각에 1차 출처 수치를 붙인 근거 카드 (2026-07-09, 어머니 피드백 r6-05).
                수치는 전부 primary — 통계청/과기정통부·NIA/서울시50플러스재단. */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {EVIDENCE.map((e, i) => (
                <Reveal key={e.stat} delay={i * 80}>
                  <div className="ed-card flex h-full flex-col p-7">
                    <p className="num text-[26px] font-extrabold tracking-[-0.02em] text-sage">
                      {e.stat}
                    </p>
                    <p className="mt-3 flex-1 text-[15.5px] leading-[1.7] text-ink-soft">{e.claim}</p>
                    <p className="mt-5 border-t border-hair pt-4 text-[12px] text-ink-soft/70">
                      {e.source}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-9 max-w-[40rem] text-body font-semibold text-ink">
              이 세대는 더 이상 돌봄의 대상이 아니라 자기 하루의 저자입니다.
            </p>
            <Reveal className="mt-12">
              <OrbitRings
                aria="시장 확장: 한국 1,300만 첫 시장에서 동아시아, 글로벌 5060 시장으로"
                coreTop="한국 1,300만"
                coreBottom="첫 시장"
                mid="동아시아"
                outer="글로벌 5060 시장"
              />
            </Reveal>
          </Spread>
        </div>
      </section>

      {/* 02 · What we're building */}
      <section className="ed-paper border-t border-hair py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="02" label="What we're building">
            <Reveal>
              <SpreadTitle>무엇을 만들고 있나</SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                DailyFit은 회원이 매일을 의미 있게 설계하도록 돕는 AI Agent입니다. 인기 복지관·문화
                센터 프로그램은 신청이 복잡하고 경쟁이 치열합니다. DailyFit은 회원 대신 활동을 찾아
                신청까지 대행하는 Agent as a Service입니다. 카카오톡 위에서, 익숙한 대화로
                움직입니다.
              </p>
            </Reveal>
            <ol className="mt-10 flex flex-col divide-y divide-hair border-y border-hair">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 80}>
                  <li className="grid gap-2 py-6 sm:grid-cols-[110px_220px_minmax(0,1fr)] sm:items-baseline sm:gap-6">
                    <span className="num text-eyebrow text-sage">STEP {s.n}</span>
                    <span className="text-[19px] font-bold text-ink">{s.title}</span>
                    <span className="text-[16.5px] leading-[1.7] text-ink-soft">{s.body}</span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </Spread>
        </div>
      </section>

      {/* 03 · The evidence — 수요 근거는 자체 베타 인터뷰(정성). 인용은 실제 발화
          near-verbatim, 실명·개인정보 없음. 정량 지표 미보유 사실을 명시(정직성). */}
      <section className="border-t border-hair bg-bg py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="03" label="The evidence">
            <Reveal>
              <SpreadTitle>수요는 인터뷰에서 확인했습니다</SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                베타 사용자 심층 인터뷰로 수요를 정성 검증했습니다. 가장 강한 신호는 대행입니다.
                검색은 공짜지만, 대행에는 지갑이 열립니다.
              </p>
              <blockquote className="mt-9 max-w-[44rem] border-l-[3px] border-sage pl-6 text-[21px] font-medium leading-[1.65] text-ink">
                &ldquo;검색은 무료 대체재라 돈 안 낸다. 대행만이 차별화다. 대행이 진짜 되면 신청당
                5천 원에서 2만 원도 낸다. 한 번 묶이면 유튜브처럼 못 떠난다.&rdquo;
              </blockquote>
              <p className="mt-4 text-[13.5px] text-ink-soft">
                베타 인터뷰 참가자, 60대 남성 · 2026년 6월, 대면
              </p>
              <p className="mt-7 max-w-[40rem] text-[14px] text-ink-soft/80">
                지금은 정성 검증 단계입니다. 유료 전환 등 정량 지표는 유료화와 함께 측정해
                공개합니다.
              </p>
            </Reveal>
          </Spread>
        </div>
      </section>

      {/* 04 · Business model — 크레딧 모델(검색 무료·대행 과금). 매출 수치·LTV
          비공개(미검증), 벤치마크는 회사명 없이 공개 보도 수치만. */}
      <section className="ed-paper border-t border-hair py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="04" label="Business model">
            <Reveal>
              <SpreadTitle>검색은 무료, 대행에 과금합니다</SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                Agent as a Service의 크레딧 모델입니다. 대행이 성공했을 때만 지불하는 구조가 이
                세대의 소비 습관과 맞습니다.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {MODEL.map((m, i) => (
                <Reveal key={m.tag} delay={i * 80}>
                  <div className="ed-card h-full p-7">
                    <span className="text-eyebrow uppercase text-sage">{m.tag}</span>
                    <p className="mt-4 text-[19px] font-bold text-ink">{m.title}</p>
                    <p className="mt-3 text-[16px] leading-[1.7] text-ink-soft">{m.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-5 text-[12.5px] text-ink-soft/70">
              구독 벤치마크 수치는 공개 언론 보도 기준입니다.
            </p>
          </Spread>
        </div>
      </section>

      {/* 05 · Get in touch — founder-direct only. Team bios live on /about. */}
      <section id="contact" className="border-t border-hair bg-bg py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="05" label="Get in touch">
            <Reveal>
              <SpreadTitle>직접 이야기 나눠요</SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                덱을 받기 전에, 먼저 창업자에게 직접 연락 주세요. 가장 빠르고 정확한 대화입니다.
              </p>
              <div className="mt-9 flex flex-wrap gap-3.5">
                <ButtonLink href="/contact" variant="primary" size="lg">
                  직접 이야기 나누기 →
                </ButtonLink>
                <ButtonLink href="/en/investors" variant="ghost" size="lg">
                  English →
                </ButtonLink>
              </div>
            </Reveal>
          </Spread>
        </div>
      </section>
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
    <div>
      <dd className="num text-[38px] font-extrabold leading-none tracking-[-0.03em] text-ink">
        {children}
        <span className="ml-1 text-[18px] font-bold">{suffix}</span>
      </dd>
      <dt className="mt-3 text-[13.5px] font-semibold text-ink-soft">{label}</dt>
    </div>
  );
}
