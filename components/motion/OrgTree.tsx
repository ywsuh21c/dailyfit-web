import { Reveal } from '@/components/motion/Reveal';

/**
 * Technology-page centerpiece — the company's real AI-agent org chart, drawn
 * as a dark schematic board (echoes the landing hero's runtime-stage look):
 * one human on top, the Orchestrator routing underneath, six divisions with
 * their agent roster below. Data mirrors the actual workspace org
 * (1. Agents/ divisions) at a public-safe altitude: role names only, no
 * internals. Connectors reuse `.glyph-flow` (globals.css) so the "packets"
 * visibly flow from human intent down into the divisions; static under
 * prefers-reduced-motion.
 */

const DIVISIONS: Array<{ name: string; agents: string[] }> = [
  { name: 'CEO Office', agents: ['Legal', 'Consultant'] },
  { name: 'Strategy', agents: ['Strategy', 'IR'] },
  { name: 'Finance', agents: ['Finance'] },
  { name: 'Product', agents: ['Product'] },
  { name: 'Technology', agents: ['CTO', 'Full-stack', 'Frontend', 'Backend', 'QA'] },
  { name: 'Marketing', agents: ['Web', 'Brand', 'Content'] },
];

// Time-boxed workers under 1. Agents/Intern Team — real agents, not a division,
// so the "6 divisions" count holds while the roster totals 15+.
const INTERNS = ['Gov Aid', 'BD Research'];

/** Vertical animated connector between tree levels. */
function Drop({ tall }: { tall?: boolean }) {
  return (
    <svg
      viewBox="0 0 2 40"
      className={`mx-auto ${tall ? 'h-10' : 'h-8'} w-[2px]`}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <line x1="1" y1="0" x2="1" y2="40" stroke="#8FBF9F" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="3 6" strokeLinecap="round" className="glyph-flow" />
    </svg>
  );
}

export function OrgTree({ lang = 'ko' }: { lang?: 'ko' | 'en' }) {
  const en = lang === 'en';
  // 1인 체제(2026-08-20) — 창업자는 한 명이다.
  const humansLabel = en ? 'Youngwoo Michael Suh' : '서영우';
  const orchestratorDesc = en
    ? 'Routes every request to the right Agent'
    : '모든 요청을 읽고 담당 Agent에게 라우팅';
  return (
    <Reveal>
      <div className="hx-runtime-board relative mx-auto max-w-4xl overflow-hidden rounded-[24px] px-5 py-10 sm:px-10 sm:py-12">
        <div className="hx-stage-grid" aria-hidden="true" />
        <div className="hx-grain" aria-hidden="true" />

        <div className="relative flex flex-col items-center">
          {/* humans — direction and final say */}
          <div className="flex items-center gap-2.5 rounded-xl border border-sage-lt/40 bg-sage/20 px-6 py-3.5">
            <span className="console-live-dot !bg-sage-lt" aria-hidden="true" />
            <span className="text-[15px] font-bold text-ivory">{humansLabel}</span>
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.14em] text-ivory/60 sm:inline">
              Human · direction, final say
            </span>
          </div>

          <Drop />

          {/* the orchestrator — routes every task */}
          <div className="rounded-xl border border-ivory/20 bg-white/5 px-6 py-3">
            <span className="eyebrow-mono !text-[11px] text-sage-lt">Orchestrator</span>
            <span className="ml-3 text-[13px] text-ivory/70">{orchestratorDesc}</span>
          </div>

          <Drop tall />

          {/* divisions + agent roster */}
          <div className="grid w-full gap-3 sm:grid-cols-3">
            {DIVISIONS.map((d) => (
              <div key={d.name} className="rounded-xl border border-ivory/12 bg-white/[0.04] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sage-lt">
                  {d.name}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {d.agents.map((a) => (
                    <span
                      key={a}
                      className="rounded-md border border-ivory/15 bg-navy/60 px-2 py-1 text-[11.5px] font-medium text-ivory/80"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* interns — real workers under 1. Agents/Intern Team, shown apart
              from the six divisions so the roster count matches the stat line */}
          <div className="mt-3 flex w-full flex-col items-center gap-2 rounded-xl border border-ivory/12 bg-white/[0.02] p-4 sm:flex-row sm:justify-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sage-lt">
              Intern Team
            </p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {INTERNS.map((a) => (
                <span
                  key={a}
                  className="rounded-md border border-ivory/15 bg-navy/60 px-2 py-1 text-[11.5px] font-medium text-ivory/80"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* the stat line that carries the claim */}
          <p className="eyebrow-mono mt-8 text-center !text-[11.5px] text-ivory/50">
            1 human · 1 orchestrator · 15+ agents · 6 divisions ·{' '}
            <span className="text-sage-lt">More to come!</span>
          </p>
        </div>
      </div>
    </Reveal>
  );
}
