import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import Link from 'next/link';
import { site } from '@/lib/site';
import { Reveal } from '@/components/motion/Reveal';
import { JourneyPath } from '@/components/motion/JourneyPath';
import { Spread, SpreadTitle } from '@/components/ui/Editorial';

export const metadata: Metadata = pageSeo({
  path: '/about',
  title: '소개',
  description: `${site.name} · ${site.tagline}. 55세 이상 어른들을 위한 AI Agent를 만드는 팀.`,
});

// /about — Option-B tone: "AI agent founder" 내러티브. 우리가 만드는 대상을
// 3인칭으로 존중해 부른다(2인칭 CTA 0). 2026-09-03: Editorial Daylight 적용 —
// 번호 붙은 스프레드(01 미션 · 02 시작 · 03 운영)로 재구성. 문장은 그대로 두고
// 배치만 바꿨다(창업 백스토리는 모두의창업 지원서 Q2 내러티브의 웹 압축본).
// 창업자 사실은 lib/site.ts `founder` 한 곳에서 파생 — 1인 체제(2026-08-20).

export default function AboutPage() {
  return (
    <>
      <section className="ed-hero">
        <div className="ed-hero-grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-wrap px-5 pb-16 pt-16 sm:px-8 lg:pb-20 lg:pt-24">
          <p className="text-eyebrow uppercase text-sage">About DailyFit</p>
          <h1 className="mt-6 max-w-[18ch] text-display-sm text-ink sm:text-[52px] sm:leading-[1.08] lg:text-[60px]">
            {site.tagline}
          </h1>
          <p className="mt-7 max-w-[44rem] text-[19px] leading-[1.7] text-ink-soft sm:text-lead">
            DailyFit은 55세 이상 어른들을 위한 AI Agent를 만듭니다. 취미와 일상을 설계하는
            Agent 팀입니다. 우리는 이 세대를 그 누구보다 매력적인 세그먼트라고 봅니다. 그래서
            기술보다 먼저, 더 활기찬 하루를 이야기합니다.
          </p>
        </div>
      </section>

      {/* 01 · 미션 */}
      <section className="border-t border-hair bg-bg py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="01" label="Mission">
            <Reveal>
              <SpreadTitle>모두가 자기 하루의 저자가 되도록</SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                DailyFit은 돌봄 앱도, 모니터링 도구도, 의료 서비스도 아닙니다. 자기결정·활력·구조,
                스스로 하루를 설계하는 도구입니다.
              </p>
            </Reveal>
          </Spread>
        </div>
      </section>

      {/* 02 · 시작 */}
      <section className="ed-paper border-t border-hair py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="02" label="How it started">
            <Reveal>
              <SpreadTitle>부모님의 하루에서 시작했습니다</SpreadTitle>
              <div className="mt-7 max-w-[40rem] space-y-5 text-body text-ink-soft">
                <p>
                  2025년 초, 창업자 서영우의 어머니가 30년 넘게 다니던 직장에서 퇴직하셨습니다.
                  하루아침에 오전 9시 출근이 사라졌고, 삶을 지탱하던 일정도 함께 사라졌습니다.
                  골프도 여행도 좋지만 매일일 수는 없었습니다. &lsquo;오늘 뭐 하지&rsquo;라는
                  막막함으로 하루가 시작됐습니다.
                </p>
                <blockquote className="border-l-[3px] border-sage pl-6 text-[21px] font-semibold leading-[1.6] text-ink">
                  &ldquo;너가 맨날 일할 때 쓰는 &lsquo;에이전트&rsquo;...
                  <br />내 하루를 나 대신 계획해줄 친구 만들어줘!&rdquo;
                </blockquote>
                <p>
                  아들이 일할 때 AI Agent를 쓰는 걸 어머니도 보셨습니다. 하지만 정작 당신의 하루를
                  대신 챙겨줄 Agent는 어디에도 없었습니다. 겨우 찾은 프로그램은 신청 절차가 복잡해
                  중도에 포기하게 됐습니다. 어머니의 친구들도, 그 주변도 같은 이야기를 했습니다.
                  그 한 마디가 DailyFit의 출발점입니다.
                </p>
              </div>
            </Reveal>

            <Reveal className="mt-14">
              <JourneyPath />
            </Reveal>

            {/* 창업자 카드 — 1인 체제(2026-08-20). 사실은 lib/site.ts 에서 파생한다. */}
            <Reveal className="mt-12">
              <div className="ed-card max-w-[34rem] p-7">
                <p className="text-[22px] font-bold text-ink">{site.founder.name}</p>
                <p className="mt-1 text-base font-semibold text-sage">{site.founder.role}</p>
                <p className="mt-4 text-body text-ink-soft">
                  Boston University → Fudan University → Bain → PYLER → DailyFit. AI Agent 팀을 직접
                  운영하며 5060 세대의 하루를 AaaS로 설계합니다.
                </p>
              </div>
            </Reveal>
          </Spread>
        </div>
      </section>

      {/* 03 · 운영 */}
      <section className="border-t border-hair bg-bg py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="03" label="How we operate">
            <Reveal>
              <SpreadTitle>회사도 Agent로 운영합니다</SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                제품은 회원의 하루를 설계하는 Agent, 회사는 AI Agent 팀이 운영하는 조직. 우리가
                일하는 방식을 공개합니다.
              </p>
              <div className="mt-9 flex flex-wrap gap-3.5">
                <Link
                  href="/how-we-work"
                  className="inline-flex min-h-[56px] items-center rounded-xl border border-hair-strong px-7 text-[17px] font-bold text-ink transition-colors hover:border-sage hover:text-sage active:scale-[0.98]"
                >
                  How we work →
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[56px] items-center rounded-xl bg-sage px-7 text-[17px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
                >
                  Talk to us
                </Link>
              </div>
              <p className="mt-8 max-w-[40rem] text-body text-ink-soft">
                궁금한 점이 있다면{' '}
                <Link
                  href={`mailto:${site.contactEmail}`}
                  className="font-semibold text-sage underline-offset-4 hover:underline"
                >
                  {site.contactEmail}
                </Link>
                로 보내주세요. 저희가 직접 읽고 답합니다.
              </p>
            </Reveal>
          </Spread>
        </div>
      </section>
    </>
  );
}
