/**
 * Thesis aid — self-acceleration explained by contrast, no math.
 * Ordinary automation ends at the result; a self-accelerating Agent feeds the
 * result back into the next run. Two rows of chips; the loop-back arrow is
 * the whole point. Server component, no motion needed.
 */

function Chip({ children, on }: { children: React.ReactNode; on?: boolean }) {
  return (
    <span
      className={
        on
          ? 'rounded-lg border border-sage/30 bg-sage/10 px-3.5 py-1.5 text-[14px] font-semibold text-sage'
          : 'rounded-lg border border-line bg-white px-3.5 py-1.5 text-[14px] font-medium text-ink-soft'
      }
    >
      {children}
    </span>
  );
}

const Arrow = ({ on }: { on?: boolean }) => (
  <span aria-hidden="true" className={on ? 'text-sage' : 'text-ink-soft/40'}>
    →
  </span>
);

export function LoopContrast({ lang = 'ko' }: { lang?: 'ko' | 'en' }) {
  const L =
    lang === 'en'
      ? {
          rowA: 'ordinary automation',
          a: ['run', 'result', 'done'],
          rowB: 'self-accelerating Agent',
          b: ['run', 'result', 'learn'],
          loop: '↺ back into the next run',
          cap1: 'The result changes the next run.',
          cap2: 'That is why it gets faster with use.',
        }
      : {
          rowA: '여느 자동화',
          a: ['실행', '결과', '끝'],
          rowB: 'Self-accelerating Agent',
          b: ['실행', '결과', '학습'],
          loop: '↺ 다음 실행으로',
          cap1: '결과가 다음 실행을 바꿉니다.',
          cap2: '쓸수록 빨라지는 이유입니다.',
        };

  return (
    <div className="mx-auto max-w-[560px] rounded-2xl border border-line bg-white p-7 text-left shadow-[0_24px_56px_-40px_rgba(30,45,64,0.35)]">
      {/* row A — dead end */}
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft/60">{L.rowA}</p>
      <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
        <Chip>{L.a[0]}</Chip>
        <Arrow />
        <Chip>{L.a[1]}</Chip>
        <Arrow />
        <span className="text-[14px] font-medium text-ink-soft/50">{L.a[2]}</span>
      </div>

      {/* row B — the loop closes */}
      <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.14em] text-sage">{L.rowB}</p>
      <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
        <Chip on>{L.b[0]}</Chip>
        <Arrow on />
        <Chip on>{L.b[1]}</Chip>
        <Arrow on />
        <Chip on>{L.b[2]}</Chip>
        <span className="text-[14px] font-bold text-sage">{L.loop}</span>
      </div>

      <p className="mt-6 border-t border-line pt-5 text-[14.5px] font-semibold leading-relaxed text-ink">
        {L.cap1}
        <br />
        {L.cap2}
      </p>
    </div>
  );
}
