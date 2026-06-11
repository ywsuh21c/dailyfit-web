import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    '우리는 만들면서 씁니다 — DailyFit을 만드는 동안 배운 것, 틀린 것, 그리고 그 사고 과정.',
};

// /writing — Option-B 의무 페이지 (thought leadership = 핵심 acquisition
// lever). 정직성 원칙: 본문 없는 글에 가짜 발행일을 달지 않는다 — 시드
// 에세이 입고 전까지 전부 "곧 공개" 티저.
// TODO(Michael): 시드 에세이 3편 (mockup 제목 기준: Radically Transparent /
// AI 에이전트 팀 운영 / 한국 시니어 시장 thesis). 입고 시 발행일 + 본문
// 라우트(/writing/[slug]) 연결.
// TODO(Michael): 팟캐스트 링크 + 공개 가능 수치 (HANDOFF §7 콘텐츠 펜딩).

const ESSAYS: Array<{ cat: string; title: string; teaser: string }> = [
  {
    cat: 'Principles',
    title: 'Radically Transparent — 우리가 실패를 공개하는 이유',
    teaser:
      '대부분의 회사는 잘된 것만 보여줍니다. 우리는 반대로 합니다. 틀린 가설, 엎은 결정, 안 풀린 실험을 공개하는 것이 신뢰와 더 나은 판단으로 이어지는 이유.',
  },
  {
    cat: 'Operating',
    title: 'AI 에이전트 팀으로 회사를 운영한다는 것',
    teaser:
      '전략·리서치·제품·디자인을 AI 에이전트가 분담하고, 사람이 판단합니다. 작은 팀이 큰 조직의 속도와 체계를 만드는 실제 운영 구조.',
  },
  {
    cat: 'Thesis',
    title: '한국 시니어 시장이라는 thesis',
    teaser:
      '1,500만 명, 가장 빠르게 디지털로 옮겨오는 세대. 왜 이 시장이 다음 10년의 기회인지 — AI는 수단, 시니어가 정체성입니다.',
  },
  {
    cat: 'Product',
    title: '멀티 에이전트가 하루를 설계하는 법 — orchestration 설계 노트',
    teaser:
      '단순한 LLM 호출과 멀티 에이전트 오케스트레이션의 차이. 시조·민요·판소리 — 에이전트 패밀리가 한 사람의 하루를 구성하기까지의 설계 결정.',
  },
  {
    cat: 'Data',
    title: '영어 LLM에 없는 것 — 한국어 시니어 언어 데이터를 모으는 일',
    teaser:
      '왜 직접 데이터를 수집하고 정제하는가. 톤·표현·맥락이 모델의 진짜 해자가 되는 과정과, 그 작업의 현실적인 어려움.',
  },
  {
    cat: 'Building',
    title: '베타까지 — 작은 팀이 매주 출하하기 위해 버린 것들',
    teaser:
      '속도를 위해 의도적으로 하지 않기로 한 결정들. 우선순위를 좁히는 일이 기능을 더하는 일보다 어려웠던 이유.',
  },
];

export default function WritingPage() {
  return (
    <>
      {/* manifesto hero */}
      <section className="hero-field relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 pb-16 pt-20 lg:pt-24">
          <p className="eyebrow-mono text-sage">Writing</p>
          <h1 className="mt-5 text-[38px] font-extrabold leading-[1.18] tracking-[-0.03em] text-ink sm:text-[48px]">
            우리는 만들면서 씁니다.
          </h1>
          <p className="mt-7 text-body text-ink-soft">
            DailyFit을 만드는 동안 배운 것들을 정리해 공개합니다. AI 에이전트
            팀으로 회사를 운영하는 방법, 한국 시니어 시장이라는 가설, 그리고{' '}
            <strong className="text-ink">잘 안 풀린 것들</strong>까지.
          </p>
          <p className="mt-4 text-body text-ink-soft">
            완성된 결론보다, 결론에 닿기까지의 사고 과정을 남기려 합니다.
            우리가 무엇을 믿고, 무엇을 틀렸는지 공개하는 것이 더 나은 회사를
            만든다고 보기 때문입니다. 우리는 이것을{' '}
            <strong className="text-ink">Radically Transparent</strong>라고
            부릅니다.
          </p>
          <p className="mt-6 text-base font-semibold text-ink">
            — Youngwoo Suh, Founder · DailyFit
          </p>
        </div>
      </section>

      {/* essay list — all teasers until seed essays land */}
      <section className="bg-bg py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <span className="eyebrow-mono text-ink-soft/70">Essays</span>
            <span className="text-caption text-ink-soft">곧 공개</span>
          </div>
          <div className="divide-y divide-line">
            {ESSAYS.map((e) => (
              <article key={e.title} className="py-9">
                <div className="flex items-center gap-3">
                  <span className="eyebrow-mono text-sage">{e.cat}</span>
                  <span className="rounded-md bg-sage/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-sage">
                    곧 공개
                  </span>
                </div>
                <h2 className="mt-3 text-[24px] font-bold leading-[1.3] tracking-[-0.02em] text-ink">
                  {e.title}
                </h2>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">
                  {e.teaser}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* podcast teaser */}
      <section className="border-t border-line bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5">
          <div className="flex flex-col gap-6 rounded-2xl border border-line bg-white p-8 sm:flex-row sm:items-center">
            <div
              className="h-[88px] w-[88px] flex-shrink-0 rounded-2xl bg-gradient-to-br from-navy to-navy-deep"
              aria-hidden="true"
            />
            <div>
              <p className="eyebrow-mono text-sage">Founder&rsquo;s podcast</p>
              <h2 className="mt-2 text-[22px] font-bold text-ink">
                「있는 것들이 더해」
              </h2>
              <p className="mt-2 text-[15.5px] leading-relaxed text-ink-soft">
                글보다 말이 편한 날의 기록 — 창업자의 사고 과정을 목소리로
                남깁니다.
                {/* TODO(Michael): 팟캐스트 링크 연결 */}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
