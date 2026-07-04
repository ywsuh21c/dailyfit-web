import { Reveal } from '@/components/motion/Reveal';

/**
 * Research principles, redesigned (Michael 2026-07-04: the old P1~P4 cards
 * read as four disconnected slogans). The message the section must carry:
 * self-accelerating agents are powerful AND risky, so nothing we build ships
 * unless it clears four gates. The infographic draws exactly that: a learning
 * loop entering a gate rail and coming out as "deploy". Shared by /research
 * and /en/research so the locales cannot drift.
 */

type Principle = { num: string; tag: string; title: string; body: React.ReactNode; glyph: React.ReactNode };

const GLYPH_STROKE = { fill: 'none', stroke: '#4A7C59', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

/** Live service pulse — production, not benchmark. */
function LiveGlyph() {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden="true">
      <polyline points="3,24 12,24 16,12 22,32 26,20 31,24 37,24" {...GLYPH_STROKE} />
      <circle cx="31" cy="24" r="3" fill="#4A7C59" stroke="none" className="console-live-dot" />
    </svg>
  );
}

/** Scale — value must outweigh cost. */
function RoiGlyph() {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden="true">
      <line x1="20" y1="7" x2="20" y2="33" {...GLYPH_STROKE} />
      <line x1="8" y1="12" x2="32" y2="12" {...GLYPH_STROKE} />
      <path d="M 8 12 L 4 22 A 5 4 0 0 0 12 22 Z" {...GLYPH_STROKE} />
      <path d="M 32 12 L 28 19 A 5 4 0 0 0 36 19 Z" {...GLYPH_STROKE} />
      <line x1="14" y1="33" x2="26" y2="33" {...GLYPH_STROKE} />
    </svg>
  );
}

/** Human check — the go/no-go stays with the user. */
function HumanGlyph() {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden="true">
      <circle cx="20" cy="13" r="6" {...GLYPH_STROKE} />
      <path d="M 8 34 C 8 26, 32 26, 32 34" {...GLYPH_STROKE} />
      <polyline points="25,30 28,33 34,25" {...GLYPH_STROKE} stroke="#1E2D40" />
    </svg>
  );
}

/** Rewind arrow — every intervention reversible. */
function UndoGlyph() {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden="true">
      <path d="M 12 10 L 6 16 L 12 22" {...GLYPH_STROKE} />
      <path d="M 6 16 H 26 A 8 8 0 0 1 26 32 H 14" {...GLYPH_STROKE} />
    </svg>
  );
}

const KO: Principle[] = [
  {
    num: 'P1',
    tag: 'Production-first',
    title: '실전에서만 검증합니다',
    glyph: <LiveGlyph />,
    body: (
      <>
        논문 속 벤치마크가 아니라,
        <br />
        매일 돌아가는 라이브 서비스가 우리의 실험실입니다.
        <br />
        실전에서 통하지 않는 개선은 개선이 아닙니다.
      </>
    ),
  },
  {
    num: 'P2',
    tag: 'ROI-gated',
    title: '비용을 스스로 증명해야 합니다',
    glyph: <RoiGlyph />,
    body: (
      <>
        학습에는 토큰과 시간이 듭니다. 개선 가치가 비용보다 크다는 것을
        증명하지 못하는 학습 루프는 멈춥니다.
      </>
    ),
  },
  {
    num: 'P3',
    tag: 'User sovereignty',
    title: '마지막 결정은 사용자의 것',
    glyph: <HumanGlyph />,
    body: (
      <>
        Agent의 자율성이 아무리 높아져도, 실행의 Go/No-go는 언제나
        사용자에게 있습니다. 이것은 기술 한계가 아니라 설계 원칙입니다.
      </>
    ),
  },
  {
    num: 'P4',
    tag: 'Safe failure',
    title: '실패해도 안전해야 합니다',
    glyph: <UndoGlyph />,
    body: (
      <>
        모든 개입은 기록되고, 즉시 되돌릴 수 있습니다. 안전하게 실패할 수
        있는 구조라야 과감하게 실험할 수 있습니다.
      </>
    ),
  },
];

const EN: Principle[] = [
  {
    num: 'P1',
    tag: 'Production-first',
    title: 'Proven in production only',
    glyph: <LiveGlyph />,
    body: (
      <>
        Our lab is a live service running every day, not a paper benchmark.
        An improvement that does not survive production is not an improvement.
      </>
    ),
  },
  {
    num: 'P2',
    tag: 'ROI-gated',
    title: 'Every loop pays for itself',
    glyph: <RoiGlyph />,
    body: (
      <>
        Learning costs tokens and time. A learning loop that cannot prove its
        value exceeds its cost gets switched off.
      </>
    ),
  },
  {
    num: 'P3',
    tag: 'User sovereignty',
    title: 'The final call belongs to the user',
    glyph: <HumanGlyph />,
    body: (
      <>
        However autonomous the Agent becomes, the go/no-go on execution always
        stays with the user. A design principle, not a technical limit.
      </>
    ),
  },
  {
    num: 'P4',
    tag: 'Safe failure',
    title: 'Failure must be safe',
    glyph: <UndoGlyph />,
    body: (
      <>
        Every intervention is logged and instantly reversible. Only a
        structure that fails safely lets us experiment boldly.
      </>
    ),
  },
];

export function Principles({ lang = 'ko' }: { lang?: 'ko' | 'en' }) {
  const items = lang === 'en' ? EN : KO;
  const intro =
    lang === 'en' ? (
      <>
        Self-accelerating agents are powerful, and that is exactly why they
        need discipline. Nothing we build ships unless it clears four gates.
      </>
    ) : (
      <>
        스스로 진화하는 Agent는 강력합니다. 그래서 더 엄격해야 합니다.
        <br />
        우리가 만드는 모든 학습 루프는 네 개의 게이트를 통과해야만 세상에
        나갑니다.
      </>
    );
  const railStart = lang === 'en' ? 'learning loop' : '학습 루프';
  const railEnd = lang === 'en' ? 'ship' : '배포';

  return (
    <div>
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-body text-ink-soft">{intro}</p>
      </Reveal>

      {/* the gate rail — a loop passes through 4 gates before shipping */}
      <Reveal className="mt-10 hidden md:block" delay={80}>
        <div className="mx-auto flex max-w-4xl items-center gap-0" aria-hidden="true">
          <span className="whitespace-nowrap rounded-lg border border-line bg-white px-3.5 py-1.5 text-[12px] font-semibold text-ink-soft">
            {railStart}
          </span>
          {items.map((p) => (
            <span key={p.num} className="flex flex-1 items-center">
              <svg viewBox="0 0 60 8" className="h-2 w-full min-w-6" preserveAspectRatio="none">
                <line x1="0" y1="4" x2="60" y2="4" stroke="#4A7C59" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="4 7" strokeLinecap="round" className="glyph-flow" />
              </svg>
              <span className="whitespace-nowrap rounded-lg border border-sage/35 bg-sage/10 px-3.5 py-1.5 text-[12px] font-bold text-sage">
                {p.num}
              </span>
            </span>
          ))}
          <span className="flex flex-1 items-center">
            <svg viewBox="0 0 60 8" className="h-2 w-full min-w-6" preserveAspectRatio="none">
              <line x1="0" y1="4" x2="60" y2="4" stroke="#4A7C59" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="4 7" strokeLinecap="round" className="glyph-flow" />
            </svg>
            <span className="whitespace-nowrap rounded-lg bg-sage px-3.5 py-1.5 text-[12px] font-bold text-white">
              {railEnd} ✓
            </span>
          </span>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p, i) => (
          <Reveal key={p.num} delay={i * 80}>
            <div className="flex h-full flex-col rounded-2xl border border-line border-t-[3px] border-t-sage bg-white p-6">
              {p.glyph}
              <div className="mt-4 flex items-baseline gap-2.5">
                <span className="text-[20px] font-extrabold tracking-tight text-sage">{p.num}</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft/60">
                  {p.tag}
                </span>
              </div>
              <h3 className="mt-2 text-[17px] font-bold text-ink">{p.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
