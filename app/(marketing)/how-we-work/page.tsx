import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { OrgOrbit } from '@/components/motion/OrgOrbit';
import { Spread, SpreadTitle } from '@/components/ui/Editorial';

export const metadata: Metadata = pageSeo({
  path: '/how-we-work',
  title: 'How we work',
  description: 'AI-Native. DailyFit이 Agent 팀으로 일하는 방식.',
});

// /how-we-work — recruiting layer. HANDOFF §2: UNPROVEN bet — 실제 오픈
// 포지션 확인 전 과투자 금지 → intentionally lean (hero + principles +
// agent-org + soft talent CTA). No fake job listings.
// 2026-09-03: Editorial Daylight — 원칙 4개를 카드 격자에서 번호 붙은 목록으로.
// 카드 4개가 나란히 서면 «읽는 순서»가 사라지는데, 이 페이지는 01→04 가
// 곧 논지의 전개다. 문장은 그대로.

const PRINCIPLES = [
  {
    k: 'AI-native',
    title: '사람은 판단, Agent는 실행',
    body: '전략·리서치·제품·디자인의 실행을 역할별 AI Agent가 맡습니다. 사람은 방향을 세우고, 마지막 판단을 내립니다.',
  },
  {
    k: 'Transparency',
    title: 'Radically Transparent',
    body: '의사결정과 실패를 공개합니다. 무엇을 왜 결정했는지, 어디서 틀렸는지 기록으로 남깁니다.',
  },
  {
    k: 'Compounding',
    title: '모든 판단을 자산으로',
    body: '회의록·결정·교훈이 Agent의 컨텍스트로 누적됩니다. 오늘의 판단이 내일의 판단을 더 빠르고 정확하게 만듭니다.',
  },
  {
    k: 'Speed',
    title: '작지만 빠른 팀',
    body: '의사결정 단계가 극단적으로 효율적입니다. 보고를 위한 보고가 없고, 만든 것으로 이야기합니다.',
  },
];

const WORK = [
  {
    title: '실행은 Agent가 분담',
    body: '전략·리서치·제품·디자인 실행을 역할별 Agent가 병렬로 처리합니다.',
  },
  {
    title: '판단과 방향은 사람이',
    body: '고객을 만나고, 가설을 세우고, 마지막 결정을 내리는 일은 사람의 몫입니다.',
  },
  {
    title: '모든 산출물은 기록으로',
    body: '결정·실패·교훈이 문서로 남아 다음 Agent의 컨텍스트가 됩니다.',
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      <section className="ed-hero">
        <div className="ed-hero-grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-wrap px-5 pb-16 pt-16 sm:px-8 lg:pb-20 lg:pt-24">
          <p className="text-eyebrow uppercase text-sage">How we work</p>
          <h1 className="mt-6 text-display-sm text-ink sm:text-[52px] sm:leading-[1.08] lg:text-display">
            AI-Native.
          </h1>
          <p className="mt-7 max-w-[44rem] text-[19px] leading-[1.7] text-ink-soft sm:text-lead">
            우리가 실제로 일하는 방식을 공개합니다.
          </p>
        </div>
      </section>

      {/* 01 · 원칙 */}
      <section className="border-t border-hair bg-bg py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="01" label="Operating principles">
            <Reveal>
              <SpreadTitle>우리가 지키는 네 가지 원칙</SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                작은 팀이 큰 조직의 속도와 체계를 동시에 갖는 방법.
              </p>
            </Reveal>
            <ol className="mt-10 flex flex-col divide-y divide-hair border-y border-hair">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={p.k} delay={i * 70}>
                  <li className="grid gap-2 py-7 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-8">
                    <div className="flex items-baseline gap-3 sm:flex-col sm:gap-1.5">
                      <span className="num text-eyebrow text-sage">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-soft">
                        {p.k}
                      </span>
                    </div>
                    <div>
                      <p className="text-[22px] font-bold leading-[1.35] text-ink">{p.title}</p>
                      <p className="mt-3 max-w-[42rem] text-[16.5px] leading-[1.75] text-ink-soft">
                        {p.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </Spread>
        </div>
      </section>

      {/* 02 · 실제로 어떻게 */}
      <section className="ed-paper border-t border-hair py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="02" label="How we actually work">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:items-center lg:gap-14">
              <Reveal>
                <SpreadTitle>
                  사람은 방향을 정하고,
                  <br />
                  Agent가 실행합니다.
                </SpreadTitle>
                <p className="mt-7 max-w-[36rem] text-body text-ink-soft">
                  DailyFit은 AI Agent 팀을 직접 운영하는 회사입니다. 한 사람과 Agent 팀이 큰 조직의
                  속도와 체계를 동시에 내는 이유입니다.
                </p>
                <p className="mt-5 max-w-[36rem] text-body font-semibold text-ink">
                  이것은 데모용 장치가 아니라 우리가 실제로 일하는 방식입니다.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <OrgOrbit />
              </Reveal>
            </div>
            <div className="mt-12 grid gap-3.5 md:grid-cols-3">
              {WORK.map((w, i) => (
                <Reveal key={w.title} delay={i * 80}>
                  <div className="ed-card h-full border-l-[3px] border-l-sage p-6">
                    <p className="text-[17px] font-bold text-ink">{w.title}</p>
                    <p className="mt-2 text-[15px] leading-[1.7] text-ink-soft">{w.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Spread>
        </div>
      </section>

      {/* 03 · 채용 — soft CTA only (no open positions yet) */}
      <section className="border-t border-hair bg-bg py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="03" label="Work with us">
            <Reveal>
              <SpreadTitle>공식 채용 공고는 아직 없습니다.</SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                그래도 이 방식이 끌린다면, Agent와 함께 일하는 회사를 먼저 경험해 보고 싶다면, 미리
                연락 주세요. 다음 채용은 여기서 시작됩니다.
              </p>
              <div className="mt-9 flex flex-wrap gap-3.5">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[56px] items-center rounded-xl bg-sage px-7 text-[17px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
                >
                  먼저 인사하기
                </Link>
                <Link
                  href="/writing"
                  className="inline-flex min-h-[56px] items-center rounded-xl border border-hair-strong px-7 text-[17px] font-bold text-ink transition-colors hover:border-sage hover:text-sage active:scale-[0.98]"
                >
                  Read our writing
                </Link>
              </div>
            </Reveal>
          </Spread>
        </div>
      </section>
    </>
  );
}
