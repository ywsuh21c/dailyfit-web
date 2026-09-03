import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import { getCatalogCount } from '@/lib/catalog-count';
import { AgentConsole } from '@/components/home/AgentConsole';
import { OrbitRings } from '@/components/motion/OrbitRings';
import { OrgTree } from '@/components/motion/OrgTree';
import { Reveal } from '@/components/motion/Reveal';
import { Spread, SpreadTitle } from '@/components/ui/Editorial';

export const metadata: Metadata = pageSeo({
  path: '/technology',
  title: '기술',
  description:
    '5060 세대의 일상을 그 세대의 목소리로 누적하는 AI Agent. DailyFit이 푸는 기술 문제와 시스템 아키텍처.',
});

// Company-site Technology page — VC/press audience, 3rd-person voice.
// Market framing is global (Korean is the beachhead, not the ceiling).
// brand.md forbidden words (노인/돌봄/완전자동화) must never appear here.
// No em-dash (—) in copy: periods / colons / middots.
// 2026-07-04 (Michael): tech-stack section removed (needless architecture
// disclosure), security section added at a non-revealing altitude, org chart
// drawn as an infographic.
// 2026-09-03: Editorial Daylight — numbered spreads (01~06), the layer stack
// redrawn as a numbered ladder instead of four look-alike boxes. Copy unchanged.

const LAYERS = [
  {
    tag: 'Layer 1',
    name: 'User Channel',
    body: '실시간 음성 인식(STT, Speech-to-Text) · 텍스트 · 카카오 로그인',
  },
  {
    tag: 'Layer 2',
    name: 'Agents',
    body: '탐색 · 리마인더 · 신청대행 Agent 오케스트레이션',
  },
  {
    tag: 'Layer 3',
    name: 'Data',
    body: '프로필 · per-user 메모리 · 검색·매칭',
  },
  {
    tag: 'Layer 4',
    name: 'External',
    body: '활동 데이터베이스 (공공 OpenAPI · 스크래퍼 · 자체 공급)',
  },
];

const SECURITY = [
  {
    title: '최소 권한 원칙',
    body: '모든 시스템 계정은 필요한 최소 범위의 권한만 갖습니다. 데이터 접근은 역할별로 분리됩니다.',
  },
  { title: '전 구간 암호화', body: '개인정보는 이동 중에도, 저장된 상태에서도 암호화됩니다.' },
  {
    title: '민감 정보 격리',
    body: '민감 정보는 분리된 경계 안에서만 다루고, 외부에 노출되는 표면 자체를 최소화합니다.',
  },
  {
    title: '상시 감사와 대응',
    body: '민감한 작업은 기록되고 검토됩니다. 공격을 가정하고 방어를 먼저 배치합니다.',
  },
];

// 콘솔 안의 활동 수도 라이브 카운트에서 온다 — 홈·investors 와 같은 창(6h).
export const revalidate = 21600;

export default async function TechnologyPage() {
  const { count: catalogCount } = await getCatalogCount();

  return (
    <>
      <section className="ed-hero">
        <div className="ed-hero-grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-wrap px-5 pb-16 pt-16 sm:px-8 lg:pb-20 lg:pt-24">
          <p className="text-eyebrow uppercase text-sage">About our technology</p>
          <h1 className="mt-6 max-w-[22ch] text-display-sm text-ink sm:text-[48px] sm:leading-[1.1] lg:text-[56px]">
            5060 세대의 일상은, 그 세대의 목소리 그대로 쌓여야 의미가 생깁니다.
          </h1>
          <div className="mt-8 grid max-w-[62rem] gap-8 lg:grid-cols-2">
            <p className="text-body text-ink-soft">
              범용 LLM은 이 세대가 하루를 표현하는 방식을 잘 읽지 못합니다. 느린 말, 사투리,
              어제의 맥락까지. 저희는 이분들이 실제로 쓰는 말투와 일상의 맥락을 매일 누적합니다.
              <br />
              <br />
              지금은 한국의 5060부터. 같은 구조로 글로벌 시장의 언어와 세대로 확장합니다.
            </p>
            <ul className="flex flex-col divide-y divide-hair border-y border-hair">
              <li className="py-4 text-[17px] leading-[1.7] text-ink">
                <strong className="font-bold">일상 맥락</strong> · &ldquo;어제 무릎이
                아팠다&rdquo;가 오늘의 제안을 바꿉니다.
              </li>
              <li className="py-4 text-[17px] leading-[1.7] text-ink">
                <strong className="font-bold">세대의 말투</strong> · 번역이 아니라, 실제로 쓰는 말
                그대로의 이해.
              </li>
              <li className="py-4 text-[17px] leading-[1.7] text-ink">
                <strong className="font-bold">누적되는 데이터</strong> · 쓸수록 이 세대의 표현
                패턴이 자산으로 쌓입니다.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 01 · 작동 방식 */}
      <section className="border-t border-hair bg-bg py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="01" label="작동 방식">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
              <Reveal>
                <SpreadTitle>평소와 같은 대화 한 번이면 됩니다</SpreadTitle>
                <p className="mt-7 text-body text-ink-soft">
                  앱에서 편하게 대화를 시작하면, 사용자의 하루에 맞는 제안을 카드로 받습니다.
                </p>
                {/* Why the human holds go/no-go — the Overview repeats the one-liner;
                    here we state the reasoning behind it (Michael 2026-07-04). */}
                <div className="mt-9 border-l-[3px] border-sage pl-6">
                  <p className="text-[21px] font-semibold leading-[1.5] text-ink">
                    마지막 결정은 언제나 사용자의 몫입니다.
                  </p>
                  <p className="mt-4 text-body text-ink-soft">
                    신청대행처럼 Agent가 깊이 개입할수록, 그 결과는 사용자의 실제 하루에 닿습니다.
                    그래서 저희는 기술적으로 자동화할 수 있는 영역에서도 실행 직전의 Go/No-go
                    판단만은 언제나 사용자에게 남겨두도록 설계했습니다.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <AgentConsole catalogCount={catalogCount} />
              </Reveal>
            </div>
          </Spread>
        </div>
      </section>

      {/* 02 · 아키텍처 — 번호가 붙은 사다리 */}
      <section className="ed-paper border-t border-hair py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="02" label="System architecture">
            <Reveal>
              <SpreadTitle>말 한마디가 하루 계획이 되기까지</SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                사용자의 말이 4개의 레이어를 지나 하루 설계로 바뀝니다. 전부 실제 서비스에서 매일
                동작하는 구조입니다.
              </p>
            </Reveal>
            <ol className="mt-10 flex flex-col divide-y divide-hair border-y border-hair">
              {LAYERS.map((l, i) => (
                <Reveal key={l.tag} delay={i * 80}>
                  <li className="grid gap-1 py-6 sm:grid-cols-[110px_200px_minmax(0,1fr)] sm:items-baseline sm:gap-6">
                    <span className="num text-eyebrow text-sage">{l.tag}</span>
                    <span className="text-[19px] font-bold text-ink">{l.name}</span>
                    <span className="text-[16.5px] leading-[1.7] text-ink-soft">{l.body}</span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </Spread>
        </div>
      </section>

      {/* 03 · 데이터 · 개인정보 */}
      <section className="border-t border-hair bg-bg py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="03" label="데이터 · 개인정보">
            <Reveal>
              <SpreadTitle>데이터는 사용자의 것입니다</SpreadTitle>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <PrincipleCard
                title="최소 권한"
                body="필요한 정보만, 필요한 순간에만 사용합니다."
                delay={0}
              />
              <PrincipleCard
                title="명시적 동의"
                body="무엇을 쓰는지 먼저 알리고, 사용자가 허락한 범위에서만 작동합니다."
                delay={80}
              />
              <PrincipleCard
                title="개인정보보호법 준수"
                body="개인정보보호법(PIPA) 기준에 맞춰 안전하게 보관·암호화합니다."
                delay={160}
              />
            </div>
          </Spread>
        </div>
      </section>

      {/* 04 · 보안 — assurance without disclosure (Michael 2026-07-04).
          Copy stays at principles altitude on purpose: naming concrete tools or
          vendors would hand attackers a map. Every claim is true of the live system. */}
      <section className="ed-paper border-t border-hair py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="04" label="Security architecture">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center lg:gap-14">
              <div>
                <Reveal>
                  <SpreadTitle>개인정보는 여러 겹의 방어 아래에 있습니다</SpreadTitle>
                  <p className="mt-7 max-w-[36rem] text-body text-ink-soft">
                    보안의 세부 구조는 신중하게 다룹니다. 대신, 저희가 지키는 원칙은 투명하게
                    공개합니다.
                  </p>
                </Reveal>
                <div className="mt-9 grid gap-3.5 sm:grid-cols-2">
                  {SECURITY.map((s, i) => (
                    <Reveal key={s.title} delay={i * 70}>
                      <div className="ed-card h-full p-6">
                        <p className="text-[17px] font-bold text-ink">{s.title}</p>
                        <p className="mt-2 text-[15px] leading-[1.7] text-ink-soft">{s.body}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
                <p className="mt-8 max-w-[36rem] text-[16px] text-ink-soft">
                  이 모든 장치는 개인정보보호법(PIPA) 기준 위에서 작동합니다.
                </p>
              </div>
              <Reveal delay={120}>
                <DefenseLayers />
              </Reveal>
            </div>
          </Spread>
        </div>
      </section>

      {/* 05 · Defensibility (랜딩에서 이관 2026-07-01) */}
      <section className="border-t border-hair bg-bg py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="05" label="Defensibility">
            <Reveal>
              <SpreadTitle>DailyFit&rsquo;s Moat</SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                쓸수록 사용자를 더 깊이 이해하게 됩니다. 이 이해의 깊이가 저희의 해자입니다.
              </p>
            </Reveal>
            <Reveal className="mt-12">
              <OrbitRings
                aria="데이터 해자: 사용자별 일상 데이터를 중심으로 음성 데이터와 개인화 레이어가 겹겹이 쌓인 모습"
                coreTop="per-user 일상 데이터"
                coreBottom="매일 쌓입니다"
                mid="독점 음성 레이어"
                outer="Data Flywheel"
              />
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <MoatItem title="Raw Conversation Insight" delay={0}>
                5060 세대의 날것 그대로의 &lsquo;일상 대화&rsquo;. 저희의 가장 큰 해자입니다.
              </MoatItem>
              <MoatItem title="Increasing Personalization" delay={80}>
                취향·이력·이동 패턴이 유저별로 쌓입니다. 쓸수록 더 잘 맞고, 범용 모델은 이 레이어를
                복제할 수 없습니다.
              </MoatItem>
              <MoatItem title="Data Flywheel" delay={160}>
                데이터가 쌓일수록 Agent가 똑똑해지고, 더 많이 쓰일수록 데이터가 더 쌓입니다. 시간이
                갈수록 격차가 벌어집니다.
              </MoatItem>
            </div>
          </Spread>
        </div>
      </section>

      {/* 06 · Hive meta narrative — the company itself, drawn */}
      <section className="ed-paper border-t border-hair py-20 sm:py-28">
        <div className="mx-auto max-w-wrap px-5 sm:px-8">
          <Spread n="06" label="Radically Transparent">
            <Reveal>
              <SpreadTitle>회사 자체가 AI Agent 팀입니다</SpreadTitle>
              <p className="mt-7 max-w-[40rem] text-body text-ink-soft">
                DailyFit의 제품은 AI Agent가 회원의 하루를 함께 설계하고, 운영은 AI Agent 팀이
                회사를 함께 굴립니다. Strategy · Finance · Product · Technology. 각 Division을 AI
                Agent 팀이 ADR로 문서화하고 함께 운영합니다.
              </p>
            </Reveal>
            <div className="mt-12">
              <OrgTree />
            </div>
          </Spread>
        </div>
      </section>
    </>
  );
}

function PrincipleCard({ title, body, delay }: { title: string; body: string; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="ed-card h-full p-7">
        <p className="text-[20px] font-bold text-ink">{title}</p>
        <p className="mt-3 text-[16px] leading-[1.7] text-ink-soft">{body}</p>
      </div>
    </Reveal>
  );
}

function MoatItem({
  title,
  delay,
  children,
}: {
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div className="ed-card h-full border-t-[3px] border-t-sage p-7">
        <p className="text-[19px] font-bold text-ink">{title}</p>
        <p className="mt-3 text-[16px] leading-[1.7] text-ink-soft">{children}</p>
      </div>
    </Reveal>
  );
}

/**
 * Defense-in-depth, drawn: nested boundaries around the PII core. Labels are
 * deliberately generic layers, not our real topology.
 */
function DefenseLayers() {
  const layers = ['네트워크 · 접근 제어', '애플리케이션 경계', '데이터 암호화'];
  return (
    <div className="mx-auto w-full max-w-[420px]">
      <svg
        viewBox="0 0 420 340"
        role="img"
        aria-label="다층 방어 구조: 네트워크, 애플리케이션, 암호화 경계 안쪽에 개인정보 코어가 놓인 모습"
        className="h-auto w-full"
      >
        {layers.map((label, i) => {
          const inset = i * 44;
          return (
            <g key={label}>
              <rect
                x={16 + inset}
                y={16 + inset}
                width={388 - inset * 2}
                height={308 - inset * 2}
                rx={20 - i * 4}
                fill="#4A7C59"
                fillOpacity={0.04 + i * 0.03}
                stroke="#4A7C59"
                strokeOpacity={0.35}
                strokeWidth="1.5"
                strokeDasharray={i === 0 ? '6 8' : undefined}
              />
              <text
                x={32 + inset}
                y={40 + inset}
                className="fill-sage"
                style={{ fontWeight: 600, fontSize: 11.5, letterSpacing: '0.1em' }}
              >
                {label}
              </text>
            </g>
          );
        })}
        {/* the PII core */}
        <g>
          <rect x={128} y={148} width={164} height={64} rx={12} fill="#1E2D40" />
          <text
            x={210}
            y={175}
            textAnchor="middle"
            className="fill-ivory"
            style={{ fontWeight: 700, fontSize: 13.5 }}
          >
            개인정보 코어
          </text>
          <text
            x={210}
            y={196}
            textAnchor="middle"
            className="fill-sage-lt"
            style={{ fontWeight: 600, fontSize: 10, letterSpacing: '0.06em' }}
          >
            ISOLATED · ENCRYPTED
          </text>
        </g>
      </svg>
    </div>
  );
}
