import { Reveal } from '@/components/motion/Reveal';
import { CountUp } from '@/components/motion/CountUp';

// Growth engine — company-face (3rd-person) presentation of DailyFit's three
// compounding loops: Habit (retention), Trust (value→monetization), Spread
// (referral). HARD RULE §3: zero senior 2nd-person CTAs here — this is the
// business MECHANISM narrative for VC/press, not a "earn credits!" pitch.
// The senior-facing, felt version of the same loops lives on /product.
//
// Honesty (Radically Transparent): the credit model is an UNVALIDATED
// hypothesis (0 payments at time of writing) and prices are not finalized —
// so this section claims no results and exposes no hard prices. The wallet is
// the only piece live in prod; the rest "turns on" at launch.
//
// Two visual directions (Michael picks — see /preview/growth-engine):
//   variant 'a' — interlocking loops (systems diagram; matches the arch/packet
//                 DNA, reads as engineering, VC-leaning)
//   variant 'b' — kinetic momentum (living counters; warmer, more 톡톡)

type Loop = { tag: string; ko: string; title: string; body: string };

const LOOPS: Loop[] = [
  {
    tag: 'Habit',
    ko: '습관',
    title: '머무르게 하는 루프',
    body: '활동에 참여하면 경험치가 되고, 매일의 작은 성취가 다음 날을 부릅니다. 겨루지 않는 격려 — 이탈을 막는 리텐션.',
  },
  {
    tag: 'Trust',
    ko: '신뢰',
    title: '가치가 먼저인 루프',
    body: '충분한 무료 크레딧으로 시작해, 가치를 전달한 뒤에만 과금합니다. 돈이 빠지는 고통이 아니라, 받은 다음의 지불.',
  },
  {
    tag: 'Spread',
    ko: '확산',
    title: '또래로 번지는 루프',
    body: '만족한 사용자가 또래를 데려오고, 아파트·동네 커뮤니티를 타고 퍼집니다. 검증된 추천만 보상하는 확산.',
  },
];

export function GrowthEngine({ variant = 'b' }: { variant?: 'a' | 'b' }) {
  return (
    <section className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-[60ch] text-center">
          <p className="eyebrow-mono text-sage">Growth engine</p>
          <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[42px]">
            성장은 우연이 아니라 설계입니다.
          </h2>
          <p className="mt-5 text-body text-ink-soft">
            세 개의 루프가 맞물려 제품이 스스로 자랍니다 — 머무르고, 가치를
            주고받고, 또래로 번지는.
          </p>
          <p className="mt-3 text-caption text-ink-soft/70">
            지갑은 이미 작동합니다. 나머지 루프는 정식 출시와 함께 켜고, 수치는
            그때 검증합니다.
          </p>
        </Reveal>

        {variant === 'a' ? <LoopDiagram /> : <LoopCards />}
      </div>
    </section>
  );
}

/* ───────────── Variant A — interlocking loops (systems) ───────────── */

function LoopDiagram() {
  return (
    <Reveal delay={120} className="mt-16">
      <div
        className="flex flex-col items-center justify-center gap-5 md:flex-row md:gap-4"
        aria-hidden="true"
      >
        {LOOPS.map((l, i) => (
          <Ring key={l.tag} index={i} label={l.ko} tag={l.tag} last={i === LOOPS.length - 1} />
        ))}
        <span className="ge-arrow" title="다시 처음으로">
          ↻
        </span>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {LOOPS.map((l) => (
          <div
            key={l.tag}
            className="rounded-2xl border border-line bg-white p-7 text-center"
          >
            <p className="eyebrow-mono text-sage">
              {l.tag} · {l.ko}
            </p>
            <h3 className="mt-3 text-[20px] font-bold text-ink">{l.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{l.body}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function Ring({
  index,
  label,
  tag,
  last,
}: {
  index: number;
  label: string;
  tag: string;
  last: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-5 md:flex-row md:gap-4">
      <div className="ge-ring h-[124px] w-[124px]">
        <div className="ge-ring-core">
          <span className="block text-[22px] font-extrabold normal-case tracking-normal text-ink">
            {label}
          </span>
          <span className="text-[11px]">{tag}</span>
        </div>
        <div className={`ge-ring-spin ${index === 1 ? 's2' : index === 2 ? 's3' : ''}`}>
          <span className="ge-ring-dot" />
        </div>
      </div>
      {!last && <span className="ge-arrow rotate-90 md:rotate-0">→</span>}
    </div>
  );
}

/* ───────────── Variant B — kinetic momentum (living) ───────────── */

function LoopCards() {
  const viz = [<HabitViz key="h" />, <TrustViz key="t" />, <SpreadViz key="s" />];
  return (
    <div className="mt-16 grid gap-5 md:grid-cols-3">
      {LOOPS.map((l, i) => (
        <Reveal key={l.tag} delay={i * 120}>
          <article className="agent-card flex h-full flex-col p-8">
            <div className="flex h-[88px] items-center">{viz[i]}</div>
            <p className="eyebrow-mono mt-6 text-sage">
              {l.tag} · {l.ko}
            </p>
            <h3 className="mt-2 text-[21px] font-bold text-ink">{l.title}</h3>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-soft">
              {l.body}
            </p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

function HabitViz() {
  return (
    <div className="flex items-center gap-5">
      <div className="ge-ring h-[80px] w-[80px]">
        <div className="ge-ring-core">
          <span className="block text-[19px] font-extrabold normal-case tracking-normal text-ink">
            Lv.4
          </span>
        </div>
        <div className="ge-ring-spin">
          <span className="ge-ring-dot" />
        </div>
      </div>
      <div>
        <p
          className="text-[26px] font-extrabold tracking-tight text-sage"
          style={{ fontFamily: 'var(--mono)' }}
        >
          <CountUp to={21} />일
        </p>
        <p className="text-caption text-ink-soft">연속 참여 (예시)</p>
      </div>
    </div>
  );
}

function TrustViz() {
  return (
    <div className="w-full">
      <div className="ge-bar relative h-3 w-full">
        <span className="ge-bar-shimmer" aria-hidden="true" />
      </div>
      <div className="mt-3 flex items-center justify-between text-[12.5px] font-semibold">
        <span className="text-sage">무료체험으로 시작</span>
        <span className="text-ink-soft/60" aria-hidden="true">
          →
        </span>
        <span className="text-ink">가치 전달 후 과금</span>
      </div>
    </div>
  );
}

function SpreadViz() {
  const sats: Array<[number, number]> = [
    [20, 26],
    [82, 22],
    [26, 80],
    [80, 76],
  ];
  return (
    <div className="relative h-[84px] w-full" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {sats.map(([x, y], i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={x}
            y2={y}
            stroke="rgba(74,124,89,0.22)"
            strokeWidth="0.8"
          />
        ))}
      </svg>
      <span
        className="ge-node absolute"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}
      />
      {sats.map(([x, y], i) => (
        <span
          key={i}
          className="ge-node ge-node-sm absolute"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: 'translate(-50%,-50%)',
            animationDelay: `${i * 0.45}s`,
          }}
        />
      ))}
    </div>
  );
}
