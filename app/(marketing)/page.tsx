import Link from 'next/link';
import { externalLinkProps, productAppUrl, site } from '@/lib/site';
import { getLiveActivities } from '@/lib/activities';
import { AgentConsole } from '@/components/home/AgentConsole';
import { Reveal } from '@/components/motion/Reveal';

// Home (/) — Option-B company site, full-launch version (locked 2026-06-11).
// Audience: VC · press · AI-savvy visitors. Zero senior 2nd-person CTAs;
// seniors appear as 3rd-person evidence only (HARD RULE §3).
// Visual language: agent-runtime on a LIGHT field (Michael 2026-06-11:
// brighter, more motion). Dark survives only in the console + footer.
//
// Verified content sources:
// - 카탈로그 수치: lib/site.ts activeCatalogCount 단일 출처 (수도권 트림
//   2026-06-11 후 active 기준; 트림 원복 시 그 상수만 갱신).
// - Agent 3티어·취미 포지셔닝·메모리 moat·텍스트 병행:
//   Critical Docs 260604-V2 Alignment-Co-founder Note (DECIDED #1~#10).
//   Agent 고유 네이밍(시조/민요/판소리)은 보류 — Michael 2026-07-01.
//   현재 Agent는 기능명(탐색·리마인더·슈퍼)으로만 표기.
// - 1,500만 시장: approved 2026-05-31 mockup (option-b-v2-company-site.html).
// - 티커 활동명: LJS 인터뷰 특이취미 + 자체공급 라이브 활동 (전부 문서 출처).
// - TODO(Michael): 정식 출시일 확정(6월 말 예정) — metric strip · traction.
// - TODO(Michael): 제품 데모 비디오 자산 입고 시 what-we-build 우측 패널을
//   <video autoplay muted loop playsinline> 로 교체 (public/media/demo.mp4).

const mailto = `mailto:${site.contactEmail}`;

// 활동 그래프는 라이브 카탈로그에서 자동으로 끌어온다 (lib/activities). 최대
// 6h 마다 재검증(ISR); 나머지 페이지는 정적. 임의 예시 하드코딩 금지.
export const revalidate = 21600;

export default async function HomePage() {
  const ticker = await getLiveActivities();
  return (
    <>
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="hero-field relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="aurora aurora-1" aria-hidden="true" />
        <div className="aurora aurora-2" aria-hidden="true" />

        {/* Clean, spacious hero (Anthropic-style): headline + one short lead.
            인포그래픽(콘솔)·지표스트립은 아래 독립 섹션/트랙션으로 분리. */}
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-28 pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-40 lg:pt-36">
          <div>
            <p className="eyebrow-mono text-sage">Agent-as-a-Service</p>
            <h1 className="mt-6 text-[42px] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink sm:text-[60px]">
              액티브 시니어를 위한
              <br />
              <span className="text-sage">AI Agent</span>를 만듭니다.
            </h1>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={mailto}
                className="inline-flex min-h-[56px] items-center rounded-xl bg-sage px-8 text-[17px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
              >
                Talk to us
              </a>
              <a
                href="#runtime"
                className="inline-flex min-h-[56px] items-center rounded-xl border border-ink/15 bg-white/50 px-8 text-[17px] font-bold text-ink transition-colors hover:border-sage hover:text-sage active:scale-[0.98]"
              >
                작동 방식 보기 ↓
              </a>
            </div>
          </div>
          <p className="max-w-[38ch] text-[19px] leading-relaxed text-ink-soft sm:text-[22px]">
            <span className="block">스마트폰으로 배우고, 만나고, 즐기기 시작한 액티브 시니어.</span>
            <span className="mt-3 block">전 세계에서 가장 빠르게 커지는 세대의 하루를 설계합니다.</span>
          </p>
        </div>
      </section>

      {/* ─────────────────────── PROBLEM ─────────────────────── */}
      <section className="bg-bg py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <Reveal>
            <p className="eyebrow-mono text-sage">The problem</p>
            <h2 className="mt-4 text-[28px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[38px]">
              액티브 시니어들은 시간도, 호기심도 있습니다.
              <br />
              무엇을 할지 찾는 게 어려울 뿐입니다.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-body text-ink-soft">
              배울 곳, 만날 사람, 나들이 갈 곳. 정보는 수십 개 기관과 포털에 흩어져 있습니다.
              <br />
              찾기도 어렵고, 신청은 더 복잡합니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────── WHAT WE BUILD (solution) ─────────────── */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow-mono text-sage">Solution: What we built</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[42px]">
              대화 한 번으로,
              <br />
              하루가 설계됩니다.
            </h2>
            <p className="mt-6 max-w-[46ch] text-body text-ink-soft">
              취미와 일상을 설계하는 멀티 Agent 플랫폼.
              <br />
              평소처럼 말하면 Agent들이 협업해 그날의 하루를 구성합니다.
            </p>
            <p className="mt-4 text-body font-semibold text-ink">
              <span className="block">AI는 제안합니다.</span>
              <span className="mt-2 block">결정은 언제나 사용자가 합니다.</span>
            </p>
          </Reveal>
          {/* TODO(Michael): 데모 비디오 입고 시 이 패널을 video로 교체 */}
          <Reveal delay={120}>
            <div className="rounded-2xl border border-line bg-white p-7 shadow-[0_30px_70px_-40px_rgba(30,45,64,0.35)]">
              <div className="flex flex-col gap-3">
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

      {/* ───────────── AGENT RUNTIME — 인포그래픽 독립 섹션 ───────────── */}
      <section id="runtime" className="bg-bg py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <p className="eyebrow-mono text-sage">How our agent works</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[44px]">
              Agent가 하루를 설계하는 과정
            </h2>
            <p className="mx-auto mt-5 max-w-6xl text-body text-ink-soft">
              말 한마디 안에 있는 의도를 읽고, 과거 기억을 떠올리고, 공공·제휴 API로 모은 활동 Database에서 최적 활동을 추천해 하루를 설계합니다.
            </p>
          </Reveal>
          <Reveal className="mx-auto mt-12 max-w-2xl" delay={120}>
            <AgentConsole />
          </Reveal>
        </div>
      </section>

      {/* ─────────────── LIVE ACTIVITY TICKER ─────────────── */}
      <div className="border-y border-line bg-bg py-5" aria-label="활동 데이터베이스에 적재된 활동 예시">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-3 flex items-center gap-2.5">
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
      <section id="agents" className="border-y border-line bg-ivory py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow-mono text-sage">Meet the agents</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[42px]">
              하루를 설계해주는 세 명의 Agent
            </h2>
            <p className="mt-5 text-body text-ink-soft">
              탐색 · 리마인드 · 신청대행. 맡는 범위가 넓어질수록 상위 Agent로 이어집니다.
              <br />
              정식 출시 앱에는 최상위 Agent가 기본 탑재됩니다.
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

      {/* ─────────────────────── FINAL CTA ─────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sage to-sage-dk py-28 text-center text-white sm:py-36">
        <svg
          viewBox="0 0 1200 600"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="600" cy="300" r="260" fill="none" stroke="#FFFFFF" strokeWidth="1.5" className="ripple-ring" />
          <circle cx="600" cy="300" r="260" fill="none" stroke="#FFFFFF" strokeWidth="1.5" className="ripple-ring ripple-d1" />
          <circle cx="600" cy="300" r="260" fill="none" stroke="#FFFFFF" strokeWidth="1.5" className="ripple-ring ripple-d2" />
        </svg>
        <div className="relative mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="eyebrow-mono text-white/70">Agent-as-a-Service</p>
            <h2 className="mx-auto mt-5 max-w-[18ch] text-[36px] font-extrabold leading-[1.18] tracking-[-0.03em] sm:text-[46px]">
              액티브 시니어를 위한 차세대 AI를 만듭니다.
            </h2>
            <p className="mt-4 text-base text-white/70">
              Building the next AI for active seniors.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={mailto}
                className="inline-flex min-h-[56px] items-center rounded-xl bg-white px-8 text-[17px] font-bold text-sage-dk transition-colors hover:bg-ivory active:scale-[0.98]"
              >
                Talk to us
              </a>
              <Link
                href={productAppUrl}
                {...externalLinkProps}
                className="inline-flex min-h-[56px] items-center rounded-xl border border-white/40 px-8 text-[17px] font-bold text-white transition-colors hover:border-white hover:bg-white/10 active:scale-[0.98]"
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
      <div className="agent-card flex h-full flex-col p-8">
        <span className="self-start rounded-md border border-sage/25 bg-sage/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-sage">
          {tier}
        </span>
        <h3 className="mt-5 text-[22px] font-bold text-ink">{title}</h3>
        <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink-soft">
          {children}
        </p>
        <div
          className="mt-6 flex items-center gap-2 border-t border-line pt-5"
          aria-label={`자율성 단계 ${level} / 3`}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft/60">
            autonomy
          </span>
          <span className="ml-auto flex gap-1.5" aria-hidden="true">
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={`h-1.5 w-7 rounded-full ${n <= level ? 'agent-bar bg-sage' : 'bg-line'}`}
                style={n <= level ? { transitionDelay: `${300 + n * 140}ms` } : undefined}
              />
            ))}
          </span>
        </div>
      </div>
    </Reveal>
  );
}


