import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { Reveal } from '@/components/motion/Reveal';
import { OrgOrbit } from '@/components/motion/OrgOrbit';

export const metadata: Metadata = {
  title: 'How we work',
  description:
    'AI-네이티브하게, 컨설팅처럼 체계적으로. DailyFit이 Agent 팀으로 일하는 방식.',
};

// /how-we-work — recruiting layer. HANDOFF §2: UNPROVEN bet — 실제 오픈
// 포지션 확인 전 과투자 금지 → intentionally lean (hero + principles +
// agent-org + soft talent CTA). No fake job listings.

const mailto = `mailto:${site.contactEmail}`;

export default function HowWeWorkPage() {
  return (
    <>
      {/* hero */}
      <section className="hero-field relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-20 lg:pt-24">
          <p className="eyebrow-mono text-sage">How we work</p>
          <h1 className="mt-5 max-w-[20ch] text-[38px] font-extrabold leading-[1.18] tracking-[-0.03em] text-ink sm:text-[48px]">
            AI-네이티브하게.
            <br />
            컨설팅처럼 체계적으로.
          </h1>
          <p className="mt-6 max-w-[54ch] text-body text-ink-soft">
            스타트업처럼 빠르게 움직이지만, 모든 판단은 다음 판단의 자산으로
            쌓입니다. 우리가 실제로 일하는 방식을 공개합니다.
          </p>
        </div>
      </section>

      {/* operating principles */}
      <section className="bg-bg py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="max-w-[54ch]">
            <p className="eyebrow-mono text-sage">Operating principles</p>
            <h2 className="mt-4 text-[30px] font-extrabold tracking-[-0.03em] text-ink sm:text-[36px]">
              우리가 지키는 네 가지 원칙
            </h2>
            <p className="mt-4 text-body text-ink-soft">
              작은 팀이 큰 조직의 속도와 체계를 동시에 갖는 방법.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            <PrincipleCard k="01 · AI-native" title="사람은 판단, Agent는 실행" delay={0}>
              전략·리서치·제품·디자인의 실행을 역할별 AI Agent가 맡습니다.
              사람은 방향을 세우고, 마지막 판단을 내립니다.
            </PrincipleCard>
            <PrincipleCard k="02 · Transparency" title="Radically Transparent" delay={100}>
              의사결정과 실패를 공개합니다. 무엇을 왜 결정했는지, 어디서
              틀렸는지 기록으로 남깁니다.
            </PrincipleCard>
            <PrincipleCard k="03 · Compounding" title="모든 판단을 자산으로" delay={200}>
              회의록·결정·교훈이 Agent의 컨텍스트로 누적됩니다. 오늘의
              판단이 내일의 판단을 더 빠르고 정확하게 만듭니다.
            </PrincipleCard>
            <PrincipleCard k="04 · Speed" title="작지만 빠른 팀" delay={300}>
              의사결정 단계가 짧습니다. 보고를 위한 보고가 없고, 만든 것으로
              이야기합니다.
            </PrincipleCard>
          </div>
        </div>
      </section>

      {/* how we actually work */}
      <section className="border-y border-line bg-surface py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow-mono text-sage">How we actually work</p>
            <h2 className="mt-4 text-[30px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[36px]">
              사람은 방향을 정하고,
              <br />
              Agent가 실행합니다.
            </h2>
            <p className="mt-6 max-w-[46ch] text-body text-ink-soft">
              DailyFit은 AI Agent 팀을 직접 운영하는 회사입니다. 두 명의
              팀이 큰 조직의 속도와 체계를 동시에 내는 이유입니다.
            </p>
            <p className="mt-4 max-w-[46ch] text-body font-semibold text-ink">
              이것은 데모용 장치가 아니라 우리가 실제로 일하는 방식입니다.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <OrgOrbit />
          </Reveal>
        </div>
        <div className="mx-auto mt-14 grid max-w-6xl gap-3.5 px-5 md:grid-cols-3">
          <Reveal delay={0}>
            <WorkItem title="실행은 Agent가 분담">
              전략·리서치·제품·디자인 실행을 역할별 Agent가 병렬로
              처리합니다.
            </WorkItem>
          </Reveal>
          <Reveal delay={100}>
            <WorkItem title="판단과 방향은 사람이">
              고객을 만나고, 가설을 세우고, 마지막 결정을 내리는 일은 사람의
              몫입니다.
            </WorkItem>
          </Reveal>
          <Reveal delay={200}>
            <WorkItem title="모든 산출물은 기록으로">
              결정·실패·교훈이 문서로 남아 다음 Agent의 컨텍스트가
              됩니다.
            </WorkItem>
          </Reveal>
        </div>
      </section>

      {/* talent — soft CTA only (no open positions yet) */}
      <section className="bg-bg py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <Reveal>
            <p className="eyebrow-mono text-sage">Work with us</p>
            <h2 className="mx-auto mt-4 max-w-[24ch] text-[30px] font-extrabold tracking-[-0.03em] text-ink sm:text-[36px]">
              공식 채용 공고는 아직 없습니다.
            </h2>
            <p className="mx-auto mt-5 max-w-[50ch] text-body text-ink-soft">
              그래도 이 방식이 끌린다면, Agent와 함께 일하는 회사를 먼저
              경험해 보고 싶다면, 미리 연락 주세요. 다음 채용은 여기서
              시작됩니다.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a
                href={mailto}
                className="inline-flex min-h-[56px] items-center rounded-xl bg-sage px-8 text-[17px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
              >
                먼저 인사하기
              </a>
              <Link
                href="/writing"
                className="inline-flex min-h-[56px] items-center rounded-xl border border-ink/15 px-8 text-[17px] font-bold text-ink transition-colors hover:border-sage hover:text-sage active:scale-[0.98]"
              >
                Read our writing
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function PrincipleCard({
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
        <h3 className="mt-4 text-[21px] font-bold text-ink">{title}</h3>
        <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">{children}</p>
      </div>
    </Reveal>
  );
}

function WorkItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line border-l-[3px] border-l-sage bg-white px-6 py-5">
      <p className="text-base font-bold text-ink">{title}</p>
      <p className="mt-1 text-[14.5px] text-ink-soft">{children}</p>
    </div>
  );
}
