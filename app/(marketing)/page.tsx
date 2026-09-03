import Link from 'next/link';
import { externalLinkProps, productAppUrl } from '@/lib/site';
import { getCatalogCount, formatAsOf } from '@/lib/catalog-count';
import { getCatalogSample } from '@/lib/catalog-sample';
import { getRegionFacets } from '@/lib/catalog-facets';
import { getPublishedPosts } from '@/lib/writing';
import { AgentConsole } from '@/components/home/AgentConsole';
import { CatalogStrip } from '@/components/home/CatalogStrip';
import { DeviceShot } from '@/components/home/DeviceShot';
import { Reveal } from '@/components/motion/Reveal';
import { Eyebrow, Spread, SpreadTitle } from '@/components/ui/Editorial';

// Home (/) — Option-B company site (locked 2026-06-11).
// Audience: VC · press · AI-savvy visitors. Zero senior 2nd-person CTAs;
// the people we build for appear in the 3rd person only (HARD RULE §3).
//
// Art direction "Editorial Daylight" (2026-09-03): the page is a printed
// spread on ivory paper — numbered sections, warm hairline rules, left-aligned
// asymmetric grids. Only two surfaces stay dark because they mean something:
// the agent console (a runtime) and the closing stage. Everything shown is
// real: the console's plan items are catalog rows, the strip is the live
// catalog with the supplier's own photos, the phone screens are the shipped
// app (public/app, 2026-09 build), and every number is read from the API.
//
// Verified content sources (copy below is the Michael-reviewed 2026-07 set;
// presentation changed, sentences kept unless a fact moved):
// - 카탈로그 수치: getCatalogCount() (GET /api/activities/count) · 폴백 lib/site.ts
// - 지역 수: getRegionFacets() (GET /api/activities/public-facets) · 실패 시 미표기
// - Agent 3티어·메모리 moat·텍스트 병행: Critical Docs 260604 V2 Alignment Note
// - 시장 수치: 1,300만(행안부 주민등록 인구통계 2026.6). 1,500만은 폐기 — 복원 금지.
// - 앱 화면: 2. Outputs/gtm-launch/2026-08-31-orc-android-release-pipeline/store-screenshots

// 카탈로그 스트립·숫자는 6시간마다 재검증(ISR); 나머지는 정적.
export const revalidate = 21600;

export default async function HomePage() {
  const [{ count: catalogCount, asOf }, cards, facets] = await Promise.all([
    getCatalogCount(),
    getCatalogSample(12),
    getRegionFacets(),
  ]);
  const posts = getPublishedPosts('ko').slice(0, 3);

  return (
    <>
      {/* ─────────────── HERO — paper, with the runtime as an instrument ─────────────── */}
      <section className="ed-hero">
        <div className="ed-hero-grid" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-wrap gap-12 px-5 pb-16 pt-16 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-16 lg:pb-20 lg:pt-24">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 text-eyebrow uppercase text-sage">
              <span className="inline-block h-2 w-2 rounded-full bg-sage" aria-hidden="true" />
              Agent-as-a-Service · Seoul
            </p>
            <h1 className="mt-7 text-display-sm text-ink sm:text-[52px] sm:leading-[1.06] lg:text-display">
              55세 이상 어른들을 위한
              <br />
              <span className="text-sage">AI Agent</span>를 만듭니다.
            </h1>
            <p className="mt-7 max-w-[34rem] text-[19px] leading-[1.65] text-ink-soft sm:text-lead">
              스마트폰으로 배우고, 만나고, 즐기기 시작한 5060 세대.
              <br />
              전 세계에서 가장 빠르게 늘어나는 세대의 하루를, Agent가 대신 움직여 설계합니다.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <Link
                href="/contact"
                className="inline-flex min-h-[56px] items-center rounded-xl bg-sage px-7 text-[17px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
              >
                Talk to us
              </Link>
              <a
                href="#runtime"
                className="inline-flex min-h-[56px] items-center rounded-xl border border-hair-strong bg-white/50 px-7 text-[17px] font-bold text-ink transition-colors hover:border-sage hover:text-sage active:scale-[0.98]"
              >
                작동 방식 보기 ↓
              </a>
            </div>

            {/* live metrics — each number comes from the API at build; a metric we
                could not read is omitted rather than remembered. */}
            <dl className="mt-12 grid max-w-[40rem] grid-cols-2 gap-x-6 gap-y-6 border-t border-hair-strong pt-6 sm:grid-cols-3">
              <div>
                <dd className="num text-[30px] font-extrabold leading-none tracking-[-0.03em] text-ink">
                  {catalogCount.toLocaleString('ko-KR')}
                  <span className="ml-0.5 text-[16px] font-bold">건</span>
                </dd>
                <dt className="mt-2 text-[13px] text-ink-soft">활성 활동 · {formatAsOf(asOf)} 기준</dt>
              </div>
              {facets && (
                <div>
                  <dd className="num text-[30px] font-extrabold leading-none tracking-[-0.03em] text-ink">
                    {facets.districts}
                    <span className="ml-0.5 text-[16px] font-bold">개 지역</span>
                  </dd>
                  {/* 🔴 라벨을 손으로 적지 않는다. 첫 판은 「서울과 수도권」이라고 썼는데
                      라이브 facets 는 18개 시·도 162개 시·군·구였다(서울+경기+인천은 58개).
                      화면이 데이터보다 좁게 말하면 그건 겸손이 아니라 틀린 말이다. */}
                  <dt className="mt-2 text-[13px] text-ink-soft">
                    시·군·구 단위 · 전국 {facets.cityCount}개 시·도
                  </dt>
                </div>
              )}
              <div>
                <dd className="num text-[30px] font-extrabold leading-none tracking-[-0.03em] text-ink">
                  3<span className="ml-0.5 text-[16px] font-bold">티어</span>
                </dd>
                <dt className="mt-2 text-[13px] text-ink-soft">탐색 · 리마인드 · 신청대행 Agent</dt>
              </div>
            </dl>
          </div>

          {/* the runtime, visible — the only dark surface above the fold */}
          <div className="lg:col-span-5">
            <AgentConsole catalogCount={catalogCount} />
          </div>
        </div>
      </section>

      {/* ─────────────── LIVE CATALOG — real rows, real photos, real links ─────────────── */}
      <section className="ed-paper pb-20 sm:pb-24">
        <CatalogStrip
          cards={cards}
          label="활동 데이터베이스 · 지금 등록된 실제 활동"
          note="사진과 제목은 카탈로그 원문 그대로 · 6시간마다 갱신"
        />
      </section>

      {/* ─────────────── 01 · THE PROBLEM ─────────────── */}
      <section className="border-t border-hair bg-bg py-24 sm:py-32">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="01" label="The problem">
            <Reveal>
              <SpreadTitle>
                5060 세대는 시간도, 호기심도 있습니다.
                <br />
                무엇을 할지 찾는 게 어려울 뿐입니다.
              </SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                배울 곳, 만날 사람, 나들이 갈 곳. 정보는 수십 개 기관과 포털에 흩어져 있습니다.
                찾기도 어렵고, 신청은 더 복잡합니다.
              </p>
            </Reveal>
          </Spread>
        </div>
      </section>

      {/* ─────────────── 02 · WHAT WE BUILT — copy | the shipped app ─────────────── */}
      <section className="ed-paper border-t border-hair py-24 sm:py-32">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="02" label="What we built">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:gap-16">
              <Reveal>
                <SpreadTitle>
                  대화 한 번으로,
                  <br />
                  하루가 설계됩니다.
                </SpreadTitle>
                <p className="mt-7 max-w-[34rem] text-body text-ink-soft">
                  취미와 일상을 설계하는 멀티 Agent 플랫폼. 평소처럼 말하면 Agent들이 협업해
                  그날의 하루를 구성하고, 번거로운 신청 절차를 회원 대신 밟습니다.
                </p>
                <p className="mt-8 max-w-[34rem] border-t border-hair-strong pt-6 text-[19px] font-semibold leading-relaxed text-ink">
                  AI는 제안합니다.
                  <br />
                  결정은 언제나 사용자가 합니다.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <div className="flex items-end justify-center gap-5 lg:justify-end">
                  <DeviceShot
                    src="/app/05-voice-search.webp"
                    alt="말로 활동을 찾는 DailyFit 앱 화면"
                    className="w-[44%] max-w-[200px]"
                  />
                  <DeviceShot
                    src="/app/04-top3-recommend.webp"
                    alt="딱 맞는 활동 세 개를 추천한 DailyFit 앱 화면"
                    className="w-[50%] max-w-[224px] -translate-y-6"
                  />
                </div>
                <p className="mt-5 text-center text-[13px] text-ink-soft lg:text-right">
                  실제 앱 화면 · 2026년 9월 빌드
                </p>
              </Reveal>
            </div>
          </Spread>
        </div>
      </section>

      {/* ─────────────── 03 · HOW THE AGENT WORKS — orchestration pipeline ─────────────── */}
      <section id="runtime" className="border-t border-hair bg-bg py-24 sm:py-32">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="03" label="How the agent works">
            <Reveal>
              <SpreadTitle>Agent가 하루를 설계하는 과정</SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                말 한마디 안에 있는 의도를 읽고, 과거 기억을 떠올리고, 공공·제휴 API로 모은 활동
                Database에서 최적 활동을 골라 하루를 설계합니다.
              </p>
            </Reveal>
            {/* 히어로 콘솔의 시스템 어휘(intent·memory·search·plan)를 그대로 그린 장식 그래픽. */}
            <Reveal className="mt-12" delay={120}>
              <div className="hx-runtime-board">
                <div className="hx-stage-grid" aria-hidden="true" />
                <div className="hx-grain" aria-hidden="true" />
                <div className="hx-flow relative" aria-hidden="true">
                  <span className="hx-flow-node hx-flow-node-user">&gt;</span>
                  <span className="hx-flow-edge" />
                  <span className="hx-flow-node">intent</span>
                  <span className="hx-flow-edge" />
                  <span className="hx-flow-node">memory</span>
                  <span className="hx-flow-edge" />
                  <span className="hx-flow-node">search</span>
                  <span className="hx-flow-edge" />
                  <span className="hx-flow-node hx-flow-node-done">✓ plan</span>
                </div>
              </div>
            </Reveal>
          </Spread>
        </div>
      </section>

      {/* ─────────────── 04 · MEET THE AGENTS ─────────────── */}
      <section id="agents" className="ed-paper border-t border-hair py-24 sm:py-32">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="04" label="Meet the agents">
            <Reveal>
              <SpreadTitle>하루를 대신 움직이는 세 명의 Agent</SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                탐색 · 리마인드 · 신청대행. 각 Agent가 맡은 일을 실제로 처리하고, 맡는 범위가
                넓어질수록 상위 Agent로 이어집니다.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <AgentCard tier="Discovery" title="탐색 Agent" level={1} delay={0}>
                관심사를 학습해 동네 밖, 평소 몰랐던 활동까지 정확하게 찾아냅니다.
              </AgentCard>
              <AgentCard tier="Planning · Reminders" title="리마인더 Agent" level={2} delay={100}>
                &ldquo;내일 아침 9시에 신청하셔야 해요.&rdquo; 놓치기 쉬운 신청 시점과 일정을 대신 챙깁니다.
              </AgentCard>
              <AgentCard tier="Auto-apply" title="신청대행 Agent" level={3} delay={200}>
                회원가입·신청서·접수처럼 번거로운 과정을 사용자 대신 처리합니다. 복잡한 절차는
                Agent가 밟고, 사용자는 마지막 확인만 하면 됩니다.
              </AgentCard>
            </div>
          </Spread>
        </div>
      </section>

      {/* ─────────────── 05 · DELEGATION, AS SHIPPED — the app doing the work ─────────────── */}
      <section className="border-t border-hair bg-bg py-24 sm:py-32">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="05" label="Auto-apply, in the app">
            <Reveal>
              <SpreadTitle>신청대행은 이렇게 움직입니다</SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                회원이 고른 활동에서 시작해, 로그인·신청서·접수를 Agent가 진행합니다. 결제와
                본인인증처럼 회원만 할 수 있는 단계는 그 순간 회원에게 넘깁니다.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-6">
              <ShotStep
                n="1"
                src="/app/01-delegate-button.webp"
                alt="활동 상세에서 «내 Agent가 대신 신청» 버튼을 보여주는 앱 화면"
                delay={0}
              >
                회원이 고른 강좌에서 &ldquo;내 Agent가 대신 신청&rdquo; 한 번으로 대행이 시작됩니다.
              </ShotStep>
              <ShotStep
                n="2"
                src="/app/02-openrun-reserved.webp"
                alt="선착순 접수 시각에 맞춰 대행이 예약된 앱 화면"
                delay={100}
              >
                선착순 강좌는 접수 시작 시각에 맞춰 Agent가 대신 신청합니다.
              </ShotStep>
              <ShotStep
                n="3"
                src="/app/08-portal-payment.webp"
                alt="기관 포털 결제 단계를 회원에게 넘기는 앱 화면"
                delay={200}
              >
                로그인부터 신청서까지 Agent가 진행하고, 결제와 본인인증은 회원이 직접 합니다.
              </ShotStep>
            </div>
            <p className="mt-8 text-[13px] text-ink-soft">실제 앱 화면 · 2026년 9월 빌드</p>
          </Spread>
        </div>
      </section>

      {/* ─────────────── 06 · WRITING — we write as we build ─────────────── */}
      {posts.length > 0 && (
        <section className="ed-paper border-t border-hair py-24 sm:py-32">
          <div className="mx-auto max-w-wrap px-5 sm:px-8">
            <Spread n="06" label="Writing">
              <Reveal>
                <SpreadTitle>만들면서 씁니다.</SpreadTitle>
                <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                  AI Agent 팀으로 회사를 운영하는 방법, 5060 시장이라는 가설, 그리고 잘 안 풀린
                  것들까지. 결론보다 사고 과정을 남깁니다.
                </p>
              </Reveal>
              <div className="mt-10 divide-y divide-hair border-y border-hair">
                {posts.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 80}>
                    <Link
                      href={`/writing/${p.slug}`}
                      className="group grid gap-2 py-6 sm:grid-cols-[150px_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
                    >
                      <span className="text-eyebrow uppercase text-sage">{p.category}</span>
                      <span className="text-[21px] font-bold leading-[1.3] tracking-[-0.02em] text-ink transition-colors group-hover:text-sage">
                        {p.title}
                      </span>
                      <span className="num text-[14px] text-ink-soft">{p.date?.replace(/-/g, '.')}</span>
                    </Link>
                  </Reveal>
                ))}
              </div>
              <Link
                href="/writing"
                className="mt-8 inline-flex min-h-tap items-center font-bold text-sage underline-offset-4 hover:underline"
              >
                모든 글 보기 →
              </Link>
            </Spread>
          </div>
        </section>
      )}

      {/* ─────────────── CLOSING STAGE — the runtime bookend ─────────────── */}
      <section className="ed-stage py-24 text-center sm:py-32">
        <div className="hx-stage-grid" aria-hidden="true" />
        <div className="hx-grain" aria-hidden="true" />
        <div className="relative mx-auto max-w-wrap px-5 sm:px-8">
          <Reveal>
            <Eyebrow invert>Agent-as-a-Service</Eyebrow>
            <h2 className="mx-auto mt-6 max-w-[18ch] text-[34px] font-extrabold leading-[1.16] tracking-[-0.035em] text-ivory sm:text-[46px]">
              55세 이상 어른들을 위한 차세대 AI를 만듭니다.
            </h2>
            <p className="mt-5 text-base text-ivory/60">Building the next AI for adults 55+.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex min-h-[56px] items-center rounded-xl bg-sage px-8 text-[17px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
              >
                Talk to us
              </Link>
              <Link
                href={productAppUrl}
                {...externalLinkProps}
                className="inline-flex min-h-[56px] items-center rounded-xl border border-ivory/25 bg-white/5 px-8 text-[17px] font-bold text-ivory transition-colors hover:border-sage-lt hover:text-sage-lt active:scale-[0.98]"
              >
                DailyFit 시작하기 →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ───────────────────────── partials ───────────────────────── */

function AgentCard({
  tier,
  title,
  level,
  delay,
  children,
}: {
  tier: string;
  title: string;
  level: 1 | 2 | 3;
  delay: number;
  children: React.ReactNode;
}) {
  const top = level === 3;
  return (
    <Reveal delay={delay} className="h-full">
      <div
        className={
          top
            ? 'flex h-full flex-col rounded-[20px] border border-navy bg-navy p-7 text-ivory'
            : 'ed-card ed-card-lift flex h-full flex-col p-7'
        }
      >
        <span
          className={
            top
              ? 'self-start rounded-md border border-sage-lt/40 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-sage-lt'
              : 'self-start rounded-md border border-sage/30 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-sage'
          }
        >
          {tier} · Lv {level}
        </span>
        <h3 className="mt-5 text-[23px] font-bold">{title}</h3>
        <p className={`mt-3 flex-1 text-[15.5px] leading-[1.7] ${top ? 'text-ivory/75' : 'text-ink-soft'}`}>
          {children}
        </p>
        <div className="mt-6 flex items-center gap-2" aria-label={`자율성 단계 ${level} / 3`}>
          <span className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${top ? 'text-ivory/50' : 'text-ink-soft/60'}`}>
            autonomy
          </span>
          <span className="ml-auto flex gap-1.5" aria-hidden="true">
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={`h-1.5 w-8 rounded-full ${
                  n <= level ? (top ? 'agent-bar bg-sage-lt' : 'agent-bar bg-sage') : top ? 'bg-ivory/15' : 'bg-hair'
                }`}
                style={n <= level ? { transitionDelay: `${300 + n * 140}ms` } : undefined}
              />
            ))}
          </span>
        </div>
      </div>
    </Reveal>
  );
}

function ShotStep({
  n,
  src,
  alt,
  delay,
  children,
}: {
  n: string;
  src: string;
  alt: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex flex-col gap-5">
        <DeviceShot src={src} alt={alt} className="mx-auto w-[70%] max-w-[240px] sm:w-full" />
        <div className="flex gap-3">
          <span className="num shrink-0 text-eyebrow text-sage">{n.padStart(2, '0')}</span>
          <p className="text-[16px] leading-[1.7] text-ink">{children}</p>
        </div>
      </div>
    </Reveal>
  );
}
