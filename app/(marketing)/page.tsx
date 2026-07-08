import Link from 'next/link';
import { externalLinkProps, productAppUrl } from '@/lib/site';
import { getLiveActivities } from '@/lib/activities';
import { getCatalogCount } from '@/lib/catalog-count';
import { AgentConsole } from '@/components/home/AgentConsole';
import { Reveal } from '@/components/motion/Reveal';

// Home (/) — Option-B company site, full-launch version (locked 2026-06-11).
// Audience: VC · press · AI-savvy visitors. Zero senior 2nd-person CTAs;
// seniors appear as 3rd-person evidence only (HARD RULE §3).
//
// Art direction "Runtime & Daylight" (2026-07-04): the page opens inside the
// agent runtime — a monumental dark navy stage with the LIVE console as the
// hero centerpiece — then scrolls out into daylight (the warm light field
// where the designed day lives). Dark = the machine working; light = the
// life it produces ("AI는 수단, 시니어가 정체성" encoded visually). The final
// CTA returns to the runtime stage as a bookend. Body sections stay
// light-first (Michael 2026-06-11); dark is reserved for the two stages.
// All hx-* styles are namespaced in globals.css — /en keeps the legacy hero.
//
// Verified content sources (copy is FROZEN — presentation-layer only):
// - 카탈로그 수치: lib/site.ts activeCatalogCount 단일 출처 (수도권 트림
//   2026-06-11 후 active 기준; 트림 원복 시 그 상수만 갱신).
// - Agent 3티어·취미 포지셔닝·메모리 moat·텍스트 병행:
//   Critical Docs 260604-V2 Alignment-Co-founder Note (DECIDED #1~#10).
//   Agent 고유 네이밍(시조/민요/판소리)은 보류 — Michael 2026-07-01.
//   현재 Agent는 기능명(탐색·리마인더·슈퍼)으로만 표기.
// - 시장 수치: 1,500만(구 mockup)은 미검증으로 폐기 — 2026-07-09부터 캐논은
//   1,300만(행안부 주민등록 인구통계 2026.6, 55~70세 13,014,756명). 복원 금지.
// - 티커 활동명: LJS 인터뷰 특이취미 + 자체공급 라이브 활동 (전부 문서 출처).
// - TODO(Michael): 정식 출시일 확정(6월 말 예정) — metric strip · traction.
// - TODO(Michael): 제품 데모 비디오 자산 입고 시 what-we-build 우측 패널을
//   <video autoplay muted loop playsinline> 로 교체 (public/media/demo.mp4).

// Floating data motes inside the runtime stage — deterministic positions
// (no Math.random: server/client markup must match). Pure decoration.
const MOTES: Array<{ left: string; top: string; size: number; dur: string; delay: string }> = [
  { left: '6%', top: '72%', size: 3, dur: '13s', delay: '0s' },
  { left: '11%', top: '34%', size: 2, dur: '17s', delay: '1.8s' },
  { left: '19%', top: '58%', size: 2, dur: '15s', delay: '4.2s' },
  { left: '27%', top: '20%', size: 3, dur: '19s', delay: '2.6s' },
  { left: '38%', top: '80%', size: 2, dur: '14s', delay: '6.1s' },
  { left: '47%', top: '14%', size: 2, dur: '18s', delay: '0.9s' },
  { left: '56%', top: '66%', size: 3, dur: '16s', delay: '3.4s' },
  { left: '64%', top: '28%', size: 2, dur: '13.5s', delay: '5.2s' },
  { left: '73%', top: '75%', size: 2, dur: '17.5s', delay: '1.2s' },
  { left: '81%', top: '40%', size: 3, dur: '15.5s', delay: '7.4s' },
  { left: '89%', top: '62%', size: 2, dur: '14.5s', delay: '2.1s' },
  { left: '94%', top: '22%', size: 2, dur: '18.5s', delay: '4.8s' },
];

// 활동 그래프는 라이브 카탈로그에서 자동으로 끌어온다 (lib/activities). 최대
// 6h 마다 재검증(ISR); 나머지 페이지는 정적. 임의 예시 하드코딩 금지.
export const revalidate = 21600;

export default async function HomePage() {
  const ticker = await getLiveActivities();
  const { count: catalogCount } = await getCatalogCount();
  return (
    <>
      {/* ─────────────── HERO — the runtime stage ─────────────── */}
      <section className="px-3 pt-3 sm:px-5 sm:pt-4">
        <div className="hx-stage mx-auto max-w-[1400px] rounded-[24px] sm:rounded-[32px]">
          <div className="hx-stage-grid" aria-hidden="true" />
          <div className="hx-aurora hx-aurora-a" aria-hidden="true" />
          <div className="hx-aurora hx-aurora-b" aria-hidden="true" />
          <div aria-hidden="true">
            {MOTES.map((m, i) => (
              <span
                key={i}
                className="hx-mote"
                style={{
                  left: m.left,
                  top: m.top,
                  width: m.size,
                  height: m.size,
                  ['--dur' as string]: m.dur,
                  ['--delay' as string]: m.delay,
                }}
              />
            ))}
          </div>
          <div className="hx-grain" aria-hidden="true" />

          <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 pb-20 pt-16 text-center sm:px-10 sm:pb-24 sm:pt-24">
            <p className="hx-chip-live">Agent-as-a-Service</p>
            <h1 className="mt-8 text-[30px] font-extrabold leading-[1.1] tracking-[-0.04em] text-ivory min-[430px]:text-[34px] sm:text-[60px] sm:leading-[1.08] lg:text-[72px]">
              액티브 시니어를 위한
              <br />
              <span className="hx-glow-text">AI Agent</span>를 만듭니다.
            </h1>
            <p className="mt-7 max-w-[44ch] text-[18px] leading-relaxed text-ivory/70 sm:text-[21px]">
              <span className="block">스마트폰으로 배우고, 만나고, 즐기기 시작한 액티브 시니어.</span>
              <span className="mt-2 block">전 세계에서 가장 빠르게 늘어나는 세대의 하루를 설계합니다.</span>
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="hx-glow-cta inline-flex min-h-[56px] items-center rounded-xl bg-sage px-8 text-[17px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
              >
                Talk to us
              </Link>
              <a
                href="#runtime"
                className="inline-flex min-h-[56px] items-center rounded-xl border border-ivory/25 bg-white/5 px-8 text-[17px] font-bold text-ivory transition-colors hover:border-sage-lt hover:text-sage-lt active:scale-[0.98]"
              >
                작동 방식 보기 ↓
              </a>
            </div>

            {/* The runtime, visible — the product working, front and center. */}
            <div className="relative mt-16 w-full max-w-2xl sm:mt-20">
              <div className="hx-console-halo" aria-hidden="true" />
              <div className="hx-console-tilt">
                <AgentConsole catalogCount={catalogCount} />
              </div>
            </div>
          </div>
          <div className="hx-horizon" aria-hidden="true" />
        </div>
      </section>

      {/* ─────────────────────── PROBLEM ─────────────────────── */}
      <section className="bg-bg py-28 sm:py-40">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <Reveal>
            <p className="hx-eyebrow eyebrow-mono text-sage">The problem</p>
            <h2 className="mt-6 text-[30px] font-extrabold leading-[1.18] tracking-[-0.035em] text-ink sm:text-[42px]">
              액티브 시니어들은 시간도, 호기심도 있습니다.
              <br />
              무엇을 할지 찾는 게 어려울 뿐입니다.
            </h2>
            <p className="mx-auto mt-7 max-w-3xl text-body text-ink-soft">
              배울 곳, 만날 사람, 나들이 갈 곳.
              <br />
              정보는 수십 개 기관과 포털에 흩어져 있습니다.
              <br />
              찾기도 어렵고, 신청은 더 복잡합니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────────────── WHAT WE BUILD (solution) ─────────────── */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow-mono text-sage">Solution: What we built</p>
            <h2 className="mt-5 text-[34px] font-extrabold leading-[1.15] tracking-[-0.035em] text-ink sm:text-[46px]">
              대화 한 번으로,
              <br />
              하루가 설계됩니다.
            </h2>
            <p className="mt-7 max-w-[46ch] text-body text-ink-soft">
              취미와 일상을 설계하는 멀티 Agent 플랫폼.
              <br />
              평소처럼 말하면 Agent들이 협업해 그날의 하루를 구성합니다.
            </p>
            <p className="hx-pull mt-8 text-[19px] font-semibold leading-relaxed text-ink">
              <span className="block">AI는 제안합니다.</span>
              <span className="mt-2 block">결정은 언제나 사용자가 합니다.</span>
            </p>
          </Reveal>
          {/* TODO(Michael): 데모 비디오 입고 시 이 패널을 video로 교체 */}
          <Reveal delay={120}>
            <div className="hx-window">
              <div className="hx-window-bar" aria-hidden="true">
                <span className="hx-window-dot" style={{ background: '#E5E1D8' }} />
                <span className="hx-window-dot" style={{ background: '#D9D4C9' }} />
                <span className="hx-window-dot" style={{ background: '#8FBF9F' }} />
              </div>
              <div className="flex flex-col gap-3 p-7">
                <Reveal delay={150}>
                  <div className="flex flex-col">
                    <ChatBubble who="DailyFit">어제 저녁 산책은 어떠셨어요?</ChatBubble>
                  </div>
                </Reveal>
                <Reveal delay={420}>
                  <div className="flex flex-col">
                    <ChatBubble who="사용자" me>
                      무릎이 좀 뻐근했어
                    </ChatBubble>
                  </div>
                </Reveal>
                <Reveal delay={700}>
                  <div className="flex flex-col">
                    <ChatBubble who="DailyFit">
                      오늘은 가벼운 스트레칭 15분, 오후엔 근처에서 열리는
                      독서토론회가 있어요. 이렇게 시작해볼까요?
                    </ChatBubble>
                  </div>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── AGENT RUNTIME — 오케스트레이션 파이프라인 ───────────── */}
      <section id="runtime" className="bg-bg pt-24 sm:pt-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <p className="hx-eyebrow eyebrow-mono text-sage">How our agent works</p>
            <h2 className="mt-6 text-[30px] font-extrabold leading-[1.18] tracking-[-0.035em] text-ink sm:text-[44px]">
              Agent가 하루를 설계하는 과정
            </h2>
            <p className="mx-auto mt-6 max-w-6xl text-body text-ink-soft">
              말 한마디 안에 있는 의도를 읽고, 과거 기억을 떠올리고, 공공·제휴 API로 모은 활동 Database에서 최적 활동을 추천해 하루를 설계합니다.
            </p>
          </Reveal>
          {/* Orchestration pipeline — 히어로 콘솔의 시스템 어휘(intent·memory·
              search·plan)를 그대로 시각화한 장식 그래픽. 신규 카피 아님. */}
          <Reveal className="mt-14" delay={120}>
            <div className="hx-runtime-board mx-auto max-w-4xl">
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
            {/* 파이프라인이 아래 라이브 DB 스트림(티커)으로 흘러든다 */}
            <div className="hx-flow-drop" aria-hidden="true" />
          </Reveal>
        </div>
      </section>

      {/* ─────────────── LIVE ACTIVITY TICKER ─────────────── */}
      <div className="hx-ticker border-y border-line bg-bg py-5" aria-label="활동 데이터베이스에 적재된 활동 예시">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-3 flex items-center justify-center gap-2.5">
            <span className="console-live-dot !bg-sage" aria-hidden="true" />
            <span className="eyebrow-mono text-ink-soft/70">활동 데이터베이스 · live</span>
          </div>
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {[...ticker, ...ticker].map(({ tag, name }, i) => (
              <span className="chip" key={`${name}-${i}`} aria-hidden={i >= ticker.length}>
                <span className="chip-tag">{tag}</span>
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ──────────────────── MEET THE AGENTS ──────────────────── */}
      <section id="agents" className="hx-agents border-b border-line py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="hx-eyebrow eyebrow-mono text-sage">Meet the agents</p>
            <h2 className="mt-6 text-[30px] font-extrabold leading-[1.18] tracking-[-0.035em] text-ink sm:text-[42px]">
              하루를 대신 움직이는 세 명의 Agent
            </h2>
            <p className="mt-6 text-body text-ink-soft">
              탐색 · 리마인드 · 신청대행. 각 Agent가 맡은 일을 실제로 처리하고, 맡는 범위가 넓어질수록 상위 Agent로 이어집니다.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <AgentCard
              tier="Discovery"
              title="탐색 Agent"
              level={1}
              delay={0}
            >
              관심사를 학습해 동네 밖,
              <br />
              평소 몰랐던 활동까지 정확하게 찾아냅니다.
            </AgentCard>
            <AgentCard
              tier="Planning · Reminders"
              title="리마인더 Agent"
              level={2}
              delay={120}
            >
              &ldquo;내일 아침 9시에 신청하셔야 해요&rdquo;
              <br />
              놓치기 쉬운 신청 시점과 일정을 대신 챙깁니다.
            </AgentCard>
            <AgentCard
              tier="Auto-apply"
              title="신청대행 Agent"
              level={3}
              delay={240}
            >
              회원가입·신청서·접수처럼 번거로운 과정을 사용자 대신 처리합니다.
              <br />
              복잡한 절차는 Agent가 밟고, 사용자는 마지막 확인만 하면 됩니다.
            </AgentCard>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE · DEFENSIBILITY(Moat) — 랜딩에서 제거 (Michael 2026-07-01):
          기술 상세 + 데이터 해자는 /technology 페이지에서 다룬다. */}

      {/* EVIDENCE / "Who it's for" — HELD 2026-07-01 (Michael): 실제 사용자
          인터뷰 확보 전까지 aspirational use-case 노출 금지. /use-cases 페이지와
          함께 홀드. 인터뷰 후 이 섹션 + _use-cases 라우트 복구. */}

      {/* HOW WE WORK · TRACTION — 랜딩에서 제거 (Michael 2026-07-01):
          일하는 방식은 /how-we-work 상세 페이지에서 설명. Traction 수치는
          비공개 자리에서만 노출(랜딩 미표기). */}

      {/* ────────── FINAL CTA — return to the runtime (bookend) ────────── */}
      <section className="px-3 py-20 sm:px-5 sm:py-24">
        <div className="hx-stage mx-auto max-w-[1400px] rounded-[24px] py-24 text-center sm:rounded-[32px] sm:py-32">
          <div className="hx-stage-grid" aria-hidden="true" />
          <div className="hx-aurora hx-aurora-a" aria-hidden="true" />
          <div className="hx-aurora hx-aurora-b" aria-hidden="true" />
          <div className="hx-grain" aria-hidden="true" />
          <svg
            viewBox="0 0 1200 600"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
            preserveAspectRatio="xMidYMid slice"
          >
            <circle cx="600" cy="300" r="260" fill="none" stroke="#8FBF9F" strokeWidth="1.5" className="ripple-ring" />
            <circle cx="600" cy="300" r="260" fill="none" stroke="#8FBF9F" strokeWidth="1.5" className="ripple-ring ripple-d1" />
            <circle cx="600" cy="300" r="260" fill="none" stroke="#8FBF9F" strokeWidth="1.5" className="ripple-ring ripple-d2" />
          </svg>
          <div className="relative mx-auto max-w-6xl px-5">
            <Reveal>
              <p className="eyebrow-mono text-sage-lt/80">Agent-as-a-Service</p>
              <h2 className="mx-auto mt-6 max-w-[18ch] text-[34px] font-extrabold leading-[1.16] tracking-[-0.035em] text-ivory sm:text-[46px]">
                액티브 시니어를 위한 차세대 AI를 만듭니다.
              </h2>
              <p className="mt-5 text-base text-ivory/60">
                Building the next AI for active seniors.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="hx-glow-cta inline-flex min-h-[56px] items-center rounded-xl bg-sage px-8 text-[17px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
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
        </div>
      </section>
    </>
  );
}

/* ───────────────────────── partials ───────────────────────── */

function ChatBubble({
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
      <span className="text-[15.5px] leading-relaxed">{children}</span>
    </div>
  );
}

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
  return (
    <Reveal delay={delay}>
      <div className={`hx-agent-card ${level === 3 ? 'hx-agent-crown' : ''}`}>
        {/* tier watermark — `level` 데이터의 시각화 (카피 아님) */}
        <span className="hx-agent-num" aria-hidden="true">
          {String(level).padStart(2, '0')}
        </span>
        <span className="relative self-start rounded-md border border-sage/25 bg-sage/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-sage">
          {tier}
        </span>
        <h3 className="relative mt-5 text-[22px] font-bold text-ink">{title}</h3>
        <p className="relative mt-3 flex-1 text-[14px] leading-relaxed text-ink-soft">
          {children}
        </p>
        <div
          className="relative mt-6 flex items-center gap-2 border-t border-line pt-5"
          aria-label={`자율성 단계 ${level} / 3`}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft/60">
            level of autonomy
          </span>
          <span className="ml-auto flex gap-1.5" aria-hidden="true">
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={`h-2 w-8 rounded-full ${
                  n <= level
                    ? 'agent-bar bg-sage shadow-[0_0_10px_rgba(74,124,89,0.45)]'
                    : 'bg-line'
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
