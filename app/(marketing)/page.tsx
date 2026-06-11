import Link from 'next/link';
import { site } from '@/lib/site';
import { AgentConsole } from '@/components/home/AgentConsole';
import { Reveal } from '@/components/motion/Reveal';

// Home (/) — Option-B company site, full-launch version (locked 2026-06-11).
// Audience: VC · press · AI-savvy visitors. Zero senior 2nd-person CTAs;
// seniors appear as 3rd-person evidence only (HARD RULE §3).
// Visual language: agent-runtime — navy-dominant dark, sage as the live accent.
//
// Verified content sources:
// - 활동 그래프 11,530건: 2. Outputs/service-build/2026-06-10-orc-c8-supply-handoff/summary.md
//   TODO(Michael): 수도권 트림(옵션3, 보류) 실행 시 수치 갱신.
// - 에이전트 3종(미경/윤목/영우)·취미 포지셔닝·메모리 moat·텍스트 병행:
//   Critical Docs 260604-V2 Alignment-Co-founder Note (DECIDED #1~#10).
//   TODO(Michael): 에이전트 네이밍 ideation open (#14) — 이름 확정 시 갱신.
// - 1,500만 시장: approved 2026-05-31 mockup (option-b-v2-company-site.html).
// - TODO(Michael): 정식 출시일 확정(6월 말 예정) — metric strip · traction.

const mailto = `mailto:${site.contactEmail}`;

export default function HomePage() {
  return (
    <>
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="hero-field relative overflow-hidden text-ivory">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:pb-32 lg:pt-28">
          <div>
            <p className="eyebrow-mono text-sage-lt">
              Agent-as-a-Service · 한국 액티브 시니어 세대
            </p>
            <h1 className="mt-6 text-[44px] font-extrabold leading-[1.15] tracking-[-0.03em] sm:text-[58px]">
              한국 시니어를 위한
              <br />
              <span className="text-sage-lt">AI 에이전트</span>를 만듭니다.
            </h1>
            <p className="eyebrow-mono mt-5 normal-case tracking-[0.02em] text-ivory/45">
              We build AI agents for Korea&rsquo;s active senior generation.
            </p>
            <p className="mt-7 max-w-[44ch] text-body text-ivory/75">
              1,500만 명, 가장 빠르게 디지털로 옮겨오는 세대.
              그들의 하루를 설계하는 에이전트 팀을 만듭니다.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={mailto}
                className="inline-flex min-h-[56px] items-center rounded-xl bg-sage px-8 text-[17px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
              >
                Talk to us
              </a>
              <a
                href="#agents"
                className="inline-flex min-h-[56px] items-center rounded-xl border border-ivory/25 px-8 text-[17px] font-bold text-ivory transition-colors hover:border-sage-lt hover:text-sage-lt active:scale-[0.98]"
              >
                에이전트 만나보기 ↓
              </a>
            </div>
          </div>
          <AgentConsole />
        </div>

        {/* metric strip */}
        <div className="relative border-t border-ivory/10">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 px-5 lg:grid-cols-4">
            {[
              ['11,530', '활동 그래프 인덱싱'],
              ['3', '에이전트 캐퍼빌리티 티어'],
              ['음성 + 텍스트', '멀티모달 인터페이스'],
              ['2026.06', '정식 출시'],
            ].map(([value, label], i) => (
              <div
                key={label}
                className={`py-7 pr-6 ${i > 0 ? 'lg:border-l lg:border-ivory/10 lg:pl-8' : ''} ${i % 2 === 1 ? 'border-l border-ivory/10 pl-6 lg:pl-8' : ''}`}
              >
                <dt className="sr-only">{label}</dt>
                <dd className="font-mono text-[26px] font-bold tracking-tight text-ivory" style={{ fontFamily: 'var(--mono)' }}>
                  {value}
                </dd>
                <dd className="mt-1 text-caption text-ivory/50">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────────────────── WHAT WE BUILD ───────────────────── */}
      <section className="bg-bg py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow-mono text-sage">What we build</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[42px]">
              대화 한 번으로,
              <br />
              하루가 설계됩니다.
            </h2>
            <p className="mt-6 max-w-[46ch] text-body text-ink-soft">
              DailyFit은 시니어의 취미 활동과 일상을 설계하는 멀티 에이전트
              플랫폼입니다. 사용자는 평소처럼 말하고, 에이전트들이 협업해
              그날의 하루를 구성합니다.
            </p>
            <p className="mt-4 text-body font-semibold text-ink">
              AI는 제안합니다. 결정은 언제나 사용자가 합니다.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-line bg-white p-7 shadow-[0_30px_70px_-40px_rgba(30,45,64,0.35)]">
              <div className="flex flex-col gap-3">
                <ChatBubble who="DailyFit">어제 저녁 산책은 어떠셨어요?</ChatBubble>
                <ChatBubble who="사용자" me>
                  무릎이 좀 뻐근했어
                </ChatBubble>
                <ChatBubble who="DailyFit">
                  오늘은 가벼운 실내 스트레칭 15분, 오후엔 사진 동호회 모임이
                  있어요. 이렇게 시작해볼까요?
                </ChatBubble>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────── MEET THE AGENTS ──────────────────── */}
      <section id="agents" className="bg-navy py-24 text-ivory sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto max-w-[58ch] text-center">
            <p className="eyebrow-mono text-sage-lt">Meet the agents</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] sm:text-[42px]">
              하나의 하루를 만드는
              <br className="sm:hidden" /> 세 개의 에이전트
            </h2>
            <p className="mt-5 text-body text-ivory/65">
              역량 단계가 다른 세 에이전트가 한 사람의 하루를 나눠 맡습니다.
              정식 출시 앱에는 최상위 에이전트가 기본 탑재됩니다.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <AgentCard
              name="MIKYUNG"
              tier="Full autonomy"
              title="슈퍼 에이전트"
              level={3}
              delay={0}
            >
              일상 설계 A부터 Z까지. 탐색·플래닝·신청까지 끝까지 책임지는
              풀 오토노미 에이전트입니다.
            </AgentCard>
            <AgentCard
              name="YUNMOK"
              tier="Planning · Reminders"
              title="리마인더 에이전트"
              level={2}
              delay={120}
            >
              &ldquo;내일 아침 9시에 신청하셔야 해요.&rdquo; 놓치기 쉬운 신청
              시점과 일정을 대신 챙깁니다.
            </AgentCard>
            <AgentCard
              name="YOUNGWOO"
              tier="Discovery"
              title="탐색 에이전트"
              level={1}
              delay={240}
            >
              관심사를 학습해 활동을 발굴합니다. 동네 밖, 평소 몰랐던 가치까지
              찾아냅니다.
            </AgentCard>
          </div>
        </div>
      </section>

      {/* ───────────────────── ARCHITECTURE ────────────────────── */}
      <section className="bg-navy-deep py-24 text-ivory sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto max-w-[56ch] text-center">
            <p className="eyebrow-mono text-sage-lt">How it works</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] sm:text-[42px]">
              단순한 LLM 호출이 아닙니다.
            </h2>
            <p className="mt-5 text-body text-ivory/65">
              시니어 컨텍스트 위에서 작동하는 4계층 시스템.
            </p>
          </Reveal>
          <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-3">
            <ArchLayer tag="Interface" title="음성·텍스트 멀티모달 대화" delay={0}>
              큰 글씨, 익숙한 대화 흐름 — 시니어가 쓰는 방식 그대로
            </ArchLayer>
            <FlowArrow />
            <ArchLayer tag="Agents" title="Multi-agent orchestration" delay={100}>
              탐색 → 큐레이션 → 플래닝 → 리마인드를 에이전트가 분담
            </ArchLayer>
            <FlowArrow />
            <ArchLayer tag="Memory" title="Per-user 메모리 + 히스토리 리콜" delay={200}>
              &ldquo;지난번엔 문정동, 이번엔 강서구 — 이사하셨나요?&rdquo;
            </ArchLayer>
            <FlowArrow />
            <ArchLayer tag="Data" title="한국 시니어 활동 그래프" delay={300}>
              공공 API · 스크래핑 · 자체 공급 — 365일 끊기지 않는 카탈로그
            </ArchLayer>
          </div>
          <Reveal className="mt-12 text-center" delay={150}>
            <Link
              href="/technology"
              className="inline-flex min-h-tap items-center rounded-xl border border-ivory/25 px-7 text-base font-bold text-ivory transition-colors hover:border-sage-lt hover:text-sage-lt"
            >
              Read the full technology →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────── WHY THIS IS HARD ─────────────────── */}
      <section className="bg-bg py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto max-w-[54ch] text-center">
            <p className="eyebrow-mono text-sage">Why this is hard</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[42px]">
              흉내낼 수 없는 세 가지
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <MoatCard k="01 · Curation" title="몰랐던 가치의 발굴" delay={0}>
              이미 아는 활동은 검색으로 충분합니다. 평소 몰랐던 것, 동네 밖의
              특색 — 지갑이 열리는 큐레이션은 발굴력에서 나옵니다.
            </MoatCard>
            <MoatCard k="02 · Memory" title="누적되는 개인화" delay={120}>
              범용 챗봇은 매번 처음부터 시작합니다. DailyFit은 어제의 선택을
              기억해, 쓸수록 더 잘 맞는 하루가 됩니다.
            </MoatCard>
            <MoatCard k="03 · Continuity" title="365일 공급" delay={240}>
              공공 프로그램은 분기에 한 번 열립니다. 그 사이를 자체 운영
              활동으로 메워 하루도 비지 않게 합니다.
            </MoatCard>
          </div>
          <Reveal className="mt-16 text-center" delay={150}>
            <p className="text-[26px] font-extrabold tracking-[-0.02em] text-ink sm:text-[30px]">
              AI is the tool. The senior is the identity.
            </p>
            <p className="mt-3 text-base font-semibold text-ink-soft">
              AI는 수단, 시니어가 정체성입니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────── EVIDENCE ──────────────────────── */}
      <section className="bg-ivory py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="max-w-[54ch]">
            <p className="eyebrow-mono text-sage">Who it&rsquo;s for</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[42px]">
              우리가 만드는 것을 쓰는 사람들
            </h2>
            <p className="mt-5 text-body text-ink-soft">
              개인 시니어부터 기관 파트너까지 — 실제 사용이 회사의 증거입니다.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <EvidenceCard tag="End-user" title="개인 시니어" scene="혼자 사는 65세의 하루" delay={0}>
              아침 산책부터 동호회까지, 에이전트가 함께 설계한 일상.
            </EvidenceCard>
            <EvidenceCard tag="Partnership" title="B2B2C 파트너" scene="복지관 프로그램 큐레이션" delay={120}>
              기관이 회원에게 맞춤 활동을 추천하는 채널.
            </EvidenceCard>
            <EvidenceCard tag="Community" title="시니어 커뮤니티" scene="시니어 동호회 운영" delay={240}>
              또래 활동을 연결하고 모임을 활성화하는 도구.
            </EvidenceCard>
          </div>
          <Reveal className="mt-10" delay={150}>
            <Link
              href="/use-cases"
              className="inline-flex min-h-tap items-center rounded-xl border border-ink/15 px-7 text-base font-bold text-ink transition-colors hover:border-sage hover:text-sage"
            >
              See all use cases →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────── HOW WE WORK ───────────────────── */}
      <section className="bg-navy py-24 text-ivory sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow-mono text-sage-lt">How we work</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] sm:text-[42px]">
              AI-네이티브하게.
              <br />
              컨설팅처럼 체계적으로.
            </h2>
            <p className="mt-6 max-w-[44ch] text-body text-ivory/70">
              DailyFit은 작은 팀이지만, AI 에이전트 팀을 직접 운영해 큰 조직의
              속도와 체계를 만듭니다. 우리가 일하는 방식을 공개합니다.
            </p>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <Link
                href="/how-we-work"
                className="inline-flex min-h-tap items-center rounded-xl bg-sage px-6 text-base font-bold text-white transition-colors hover:bg-sage-dk"
              >
                How we work →
              </Link>
              <Link
                href="/writing"
                className="inline-flex min-h-tap items-center rounded-xl border border-ivory/25 px-6 text-base font-bold text-ivory transition-colors hover:border-sage-lt hover:text-sage-lt"
              >
                Read our writing
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col gap-3.5">
              <WorkItem title="에이전트 팀으로 운영합니다">
                전략·리서치·제품·디자인을 AI 에이전트가 분담하고, 사람이
                판단합니다.
              </WorkItem>
              <WorkItem title="투명하게 일합니다">
                의사결정과 실패를 공개합니다 — &ldquo;Radically
                Transparent&rdquo;.
              </WorkItem>
              <WorkItem title="체계적으로 누적합니다">
                모든 판단이 다음 판단의 자산이 되도록 구조화합니다.
              </WorkItem>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────── TEAM + TRACTION ──────────────────── */}
      <section className="bg-bg py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto max-w-[56ch] text-center">
            <p className="eyebrow-mono text-sage">Team &amp; traction</p>
            <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[42px]">
              부모님이 매일 필요로 하는 것을 본 창업자들
            </h2>
          </Reveal>
          {/* TODO(Michael): 창업자 사진 자산 + 현진 bio/사진 게재 동의 */}
          <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
            <TeamCard name="Youngwoo Suh" role="Founder · CEO" delay={0}>
              Bain → PE → PYLER. AI 에이전트 팀을 직접 운영. 팟캐스트 「있는
              것들이 더해」.
            </TeamCard>
            <TeamCard name="김현진" role="Co-founder" delay={120}>
              제품·기술 총괄. DailyFit의 하루를 코드로 만듭니다.
            </TeamCard>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 text-center sm:grid-cols-3">
            <TractionItem big="2026.06" label="정식 출시" delay={0} />
            <TractionItem big="1,500만" label="한국 5060 세대 시장" delay={100} />
            <TractionItem big="11,530" label="활동 그래프 인덱싱" delay={200} />
          </div>
        </div>
      </section>

      {/* ─────────────────────── FINAL CTA ─────────────────────── */}
      <section className="bg-gradient-to-b from-navy to-navy-deep py-28 text-center text-ivory sm:py-36">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="eyebrow-mono text-sage-lt">
              Agent-as-a-Service
            </p>
            <h2 className="mx-auto mt-5 max-w-[18ch] text-[36px] font-extrabold leading-[1.18] tracking-[-0.03em] sm:text-[46px]">
              한국 시니어를 위한 다음 AI를 만듭니다.
            </h2>
            <p className="mt-4 text-base text-ivory/55">
              Building the next AI for Korea&rsquo;s seniors.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={mailto}
                className="inline-flex min-h-[56px] items-center rounded-xl bg-sage px-8 text-[17px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
              >
                Talk to us
              </a>
              <Link
                href="/product"
                className="inline-flex min-h-[56px] items-center rounded-xl border border-ivory/25 px-8 text-[17px] font-bold text-ivory transition-colors hover:border-sage-lt hover:text-sage-lt active:scale-[0.98]"
              >
                제품 사용해보기 →
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
  name,
  tier,
  title,
  level,
  delay,
  children,
}: {
  name: string;
  tier: string;
  title: string;
  level: 1 | 2 | 3;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div className="agent-card flex h-full flex-col p-8">
        <div className="flex items-center justify-between gap-3">
          <span className="eyebrow-mono text-sage-lt">{name}</span>
          <span className="rounded-md border border-sage-lt/30 bg-sage/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-sage-lt">
            {tier}
          </span>
        </div>
        <h3 className="mt-5 text-[22px] font-bold text-ivory">{title}</h3>
        <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-ivory/60">
          {children}
        </p>
        <div
          className="mt-6 flex items-center gap-2 border-t border-ivory/10 pt-5"
          aria-label={`자율성 단계 ${level} / 3`}
        >
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ivory/40"
            style={{ fontFamily: 'var(--mono)' }}
          >
            autonomy
          </span>
          <span className="ml-auto flex gap-1.5" aria-hidden="true">
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={`h-1.5 w-7 rounded-full ${n <= level ? 'bg-sage-lt' : 'bg-ivory/15'}`}
              />
            ))}
          </span>
        </div>
      </div>
    </Reveal>
  );
}

function ArchLayer({
  tag,
  title,
  delay,
  children,
}: {
  tag: string;
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex items-center gap-6 rounded-2xl border border-sage-lt/20 bg-navy-2 px-7 py-5">
        <span className="eyebrow-mono min-w-[96px] text-sage-lt">{tag}</span>
        <div>
          <p className="text-[17px] font-bold text-ivory">{title}</p>
          <p className="mt-0.5 text-[14.5px] text-ivory/55">{children}</p>
        </div>
      </div>
    </Reveal>
  );
}

function FlowArrow() {
  return (
    <div className="flow-pulse text-center text-[17px] text-sage-lt" aria-hidden="true">
      ↓
    </div>
  );
}

function MoatCard({
  k,
  title,
  delay,
  children,
}: {
  k: string;
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div className="h-full rounded-2xl border border-line border-t-[3px] border-t-sage bg-white p-8">
        <p className="eyebrow-mono text-sage">{k}</p>
        <h3 className="mt-4 text-[22px] font-bold text-ink">{title}</h3>
        <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">
          {children}
        </p>
      </div>
    </Reveal>
  );
}

function EvidenceCard({
  tag,
  title,
  scene,
  delay,
  children,
}: {
  tag: string;
  title: string;
  scene: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div className="h-full overflow-hidden rounded-2xl border border-line bg-white">
        {/* TODO(Michael): 실사 use-case 이미지 자산 입고 시 교체 */}
        <div className="flex aspect-[16/10] items-end bg-gradient-to-br from-[#E7EEE4] to-[#F4EDE0] p-4">
          <span className="rounded-lg bg-white/80 px-2.5 py-1.5 text-caption italic text-ink-soft">
            {scene}
          </span>
        </div>
        <div className="p-6">
          <p className="eyebrow-mono text-sage">{tag}</p>
          <h3 className="mt-2 text-[19px] font-bold text-ink">{title}</h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">
            {children}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

function WorkItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-sage-lt/20 bg-navy-2 px-6 py-5">
      <p className="text-base font-bold text-ivory">{title}</p>
      <p className="mt-1 text-[14.5px] text-ivory/55">{children}</p>
    </div>
  );
}

function TeamCard({
  name,
  role,
  delay,
  children,
}: {
  name: string;
  role: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex h-full items-center gap-5 rounded-2xl border border-line bg-white p-7">
        <div
          className="h-[72px] w-[72px] flex-shrink-0 rounded-full bg-gradient-to-br from-[#DFE9DF] to-[#F3ECDF]"
          aria-hidden="true"
        />
        <div>
          <h3 className="text-[18px] font-bold text-ink">{name}</h3>
          <p className="text-caption font-semibold text-sage">{role}</p>
          <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">
            {children}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

function TractionItem({
  big,
  label,
  delay,
}: {
  big: string;
  label: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <p
        className="text-[30px] font-extrabold tracking-tight text-sage"
        style={{ fontFamily: 'var(--mono)' }}
      >
        {big}
      </p>
      <p className="mt-1 text-caption text-ink-soft">{label}</p>
    </Reveal>
  );
}
