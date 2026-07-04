import type { Metadata } from 'next';
import { Section, SectionHeader } from '@/components/ui/Section';
import { AgentConsole } from '@/components/home/AgentConsole';
import { FlowLine } from '@/components/motion/FlowLine';
import { OrbitRings } from '@/components/motion/OrbitRings';
import { OrgTree } from '@/components/motion/OrgTree';

export const metadata: Metadata = {
  title: '기술',
  description:
    '시니어의 일상을 시니어의 목소리로 누적하는 AI Agent. DailyFit이 푸는 기술 문제와 시스템 아키텍처.',
};

// Company-site Technology page — VC/press audience, 3rd-person voice.
// Market framing is global (Korean is the beachhead, not the ceiling).
// brand.md forbidden words (노인/돌봄/완전자동화) must never appear here.
// No em-dash (—) in copy — use periods / colons / middots.
// 2026-07-04 (Michael feedback): tech-stack section removed (needless
// architecture disclosure), security section added (assurance at a
// non-revealing altitude), org chart drawn as an infographic.

export default function TechnologyPage() {
  return (
    <>
      {/* 1. The technical problem */}
      <Section tone="light" className="pt-24">
        <p className="text-base font-semibold text-sage">About our technology</p>
        <h1 className="mt-3 max-w-3xl text-h1">
          시니어의 일상은, 시니어의 목소리 그대로 쌓여야 의미가 생깁니다.
        </h1>
        <div className="mt-6 max-w-prose space-y-4 text-body text-ink-soft">
          <p>
            범용 LLM은 시니어가 하루를 표현하는 방식을 잘 읽지 못합니다.
            <br />
            느린 말, 사투리, 어제의 맥락까지.
            <br />
            우리는 시니어가 실제로 쓰는 말투와 일상의 맥락을 매일 누적합니다.
          </p>
          <ul className="space-y-2">
            <li>· 일상 맥락: &ldquo;어제 무릎이 아팠다&rdquo;가 오늘의 제안을 바꿉니다.</li>
            <li>· 시니어 말투: 번역이 아니라, 세대가 실제로 쓰는 말 그대로의 이해.</li>
            <li>· 누적되는 데이터: 쓸수록 시니어 표현 패턴이 자산으로 쌓입니다.</li>
          </ul>
          <p className="text-ink-soft/80">
            지금은 한국어 시니어부터.
            <br />
            같은 구조로 글로벌 시장의 언어와 세대로 확장합니다.
          </p>
        </div>
      </Section>

      {/* 2. How the agent works — real chat demo + the ethics of autonomy */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="작동 방식"
          title="평소와 같은 대화 한 번이면 됩니다"
          lead="앱에서 편하게 대화를 시작하면, 사용자의 하루에 맞는 제안을 카드로 받습니다."
        />
        <div className="mx-auto mt-8 max-w-2xl">
          <AgentConsole />
        </div>
        {/* Why the human holds go/no-go — the Overview repeats the one-liner;
            here we state the reasoning behind it (Michael 2026-07-04). */}
        <div className="mx-auto mt-12 max-w-prose rounded-2xl border border-line border-l-[3px] border-l-sage bg-white p-8">
          <p className="text-h3 font-semibold text-ink">
            자율성이 높아질수록, 마지막 결정은 더 단단히 사용자의 것이어야 합니다.
          </p>
          <p className="mt-4 text-body text-ink-soft">
            신청대행처럼 Agent가 깊이 개입할수록, 그 결과는 사용자의 실제
            하루에 닿습니다. 그래서 우리는 기술적으로 자동화할 수 있는
            영역에서도 실행 직전의 Go/No-go 판단만은 언제나 사용자에게
            남겨두도록 설계했습니다.
          </p>
          <p className="mt-4 text-body text-ink-soft">
            기술이 부족해서가 아닙니다. 자기 하루의 주인은 자기 자신이어야
            한다는, 우리의 윤리적 결정입니다.
          </p>
        </div>
      </Section>

      {/* 3. Data & privacy */}
      <Section tone="light">
        <SectionHeader eyebrow="데이터 · 개인정보" title="데이터는 사용자의 것입니다" />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <PrincipleCard
            title="최소 권한"
            body={
              <>
                필요한 정보만,
                <br />
                필요한 순간에만 사용합니다.
              </>
            }
          />
          <PrincipleCard
            title="명시적 동의"
            body={
              <>
                무엇을 쓰는지 먼저 알리고,
                <br />
                사용자가 허락한 범위에서만 동작합니다.
              </>
            }
          />
          <PrincipleCard
            title="개인정보보호법 준수"
            body="개인정보보호법(PIPA) 기준에 맞춰 안전하게 보관·암호화합니다."
          />
        </div>
      </Section>

      {/* 3b. Security architecture — assurance without disclosure
          (Michael 2026-07-04: PIPA 한 줄을 별도 섹션으로 승격). Copy stays at
          principles altitude on purpose: naming concrete tools/vendors would
          hand attackers a map. Every claim below is true of the live system. */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="Security architecture"
          title="개인정보는 여러 겹의 방어 아래에 있습니다"
          lead={
            <>
              구체적인 보안 구조는 공개하지 않습니다. 그것까지가 보안입니다.
              <br />
              다만 어떤 원칙으로 지키는지는 공개합니다.
            </>
          }
        />
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <DefenseLayers />
          <div className="grid gap-4 sm:grid-cols-2">
            <SecurityCard title="최소 권한 원칙">
              모든 시스템 계정은 필요한 최소 범위의 권한만 갖습니다. 데이터
              접근은 역할별로 분리됩니다.
            </SecurityCard>
            <SecurityCard title="전 구간 암호화">
              개인정보는 이동 중에도, 저장된 상태에서도 암호화됩니다.
            </SecurityCard>
            <SecurityCard title="민감 정보 격리">
              민감 정보는 분리된 경계 안에서만 다루고, 외부에 노출되는 표면
              자체를 최소화합니다.
            </SecurityCard>
            <SecurityCard title="상시 감사와 대응">
              민감한 작업은 기록되고 검토됩니다. 공격을 가정하고 방어를 먼저
              배치합니다.
            </SecurityCard>
          </div>
        </div>
        <p className="mt-8 max-w-prose text-body text-ink-soft/80">
          이 모든 장치는 개인정보보호법(PIPA) 기준 위에서 동작합니다.
        </p>
      </Section>

      {/* 4. System architecture — real layer stack */}
      <Section tone="light">
        <SectionHeader
          eyebrow="System architecture"
          title="말 한마디가 하루 계획이 되기까지"
          lead="사용자의 말이 4개의 레이어를 지나 하루 설계로 바뀝니다. 전부 실제 서비스에서 매일 동작하는 구조입니다."
        />
        <div className="mt-8 flex flex-col">
          <LayerRow tag="Layer 1 · User Channel">
            실시간 STT · 텍스트 · 카카오 로그인
          </LayerRow>
          <FlowLine vertical />
          <LayerRow tag="Layer 2 · Agents">
            탐색 · 리마인더 · 신청대행 Agent 오케스트레이션
          </LayerRow>
          <FlowLine vertical />
          <LayerRow tag="Layer 3 · Data">
            프로필 · per-user 메모리 · 검색·매칭
          </LayerRow>
          <FlowLine vertical />
          <LayerRow tag="Layer 4 · External">
            활동 데이터베이스 (공공 OpenAPI · 스크래퍼 · 자체 공급)
          </LayerRow>
        </div>
      </Section>

      {/* 5. Defensibility — data moat (랜딩에서 이관 2026-07-01) */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="Defensibility"
          title="DailyFit's Moat"
          lead="진짜 해자는 데이터입니다. 그리고 이 데이터는 우리만 쌓을 수 있습니다."
        />
        <div className="mt-10">
          <OrbitRings
            aria="데이터 해자: 사용자별 일상 데이터를 중심으로 음성 데이터와 개인화 레이어가 겹겹이 쌓인 모습"
            coreTop="per-user 일상 데이터"
            coreBottom="매일 쌓입니다"
            mid="독점 음성 레이어"
            outer="Data Flywheel"
          />
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <MoatItem title="Raw Conversation Insight">
            액티브 시니어의 날것 그대로의 &lsquo;일상 대화&rsquo;.
            <br />
            우리의 가장 큰 해자입니다.
          </MoatItem>
          <MoatItem title="Increasing Personalization">
            취향·이력·이동 패턴이 유저별로 쌓입니다.
            <br />
            쓸수록 더 잘 맞고, 범용 모델은 이 레이어를 복제할 수 없습니다.
          </MoatItem>
          <MoatItem title="Data Flywheel">
            데이터가 쌓일수록 Agent가 똑똑해지고, 더 많이 쓰일수록 데이터가 더
            쌓입니다. 시간이 갈수록 격차가 벌어집니다.
          </MoatItem>
        </div>
      </Section>

      {/* 6. Hive meta narrative — the company itself, drawn */}
      <Section tone="light">
        <SectionHeader
          eyebrow="Radically Transparent"
          title="회사 자체가 AI Agent 팀입니다"
          lead={
            <>
              DailyFit의 제품은 AI Agent가 시니어의 하루를 함께 설계하고,
              <br />
              운영은 AI Agent 팀이 회사를 함께 굴립니다.
            </>
          }
        />
        <p className="mt-6 max-w-prose text-body text-ink-soft">
          Strategy · Finance · Product · Technology.
          <br />각 Division을 AI Agent 팀이 ADR로 문서화하고 함께 운영합니다.
        </p>
        <div className="mt-12">
          <OrgTree />
        </div>
      </Section>
    </>
  );
}

function LayerRow({ tag, children }: { tag: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-line bg-white px-6 py-4 sm:flex-row sm:items-center sm:gap-6">
      <span className="text-base font-bold text-sage sm:min-w-[220px]">{tag}</span>
      <span className="text-body text-ink-soft">{children}</span>
    </div>
  );
}

function PrincipleCard({ title, body }: { title: string; body: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-6">
      <p className="text-h3 font-semibold text-ink">{title}</p>
      <p className="mt-2 text-body text-ink-soft">{body}</p>
    </div>
  );
}

function SecurityCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-white p-6">
      <p className="text-[17px] font-bold text-ink">{title}</p>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{children}</p>
    </div>
  );
}

/**
 * Defense-in-depth, drawn: nested boundaries around the PII core. Labels are
 * deliberately generic layers, not our real topology.
 */
function DefenseLayers() {
  const layers = [
    { label: '네트워크 · 접근 제어', inset: 0 },
    { label: '애플리케이션 경계', inset: 1 },
    { label: '데이터 암호화', inset: 2 },
  ];
  return (
    <div className="mx-auto w-full max-w-[420px]">
      <svg viewBox="0 0 420 340" role="img" aria-label="다층 방어 구조: 네트워크, 애플리케이션, 암호화 경계 안쪽에 개인정보 코어가 놓인 모습" className="h-auto w-full">
        {layers.map((l, i) => {
          const inset = i * 44;
          return (
            <g key={l.label}>
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
                {l.label}
              </text>
            </g>
          );
        })}
        {/* the PII core */}
        <g>
          <rect x={148} y={148} width={124} height={64} rx={12} fill="#1E2D40" />
          <text x={210} y={175} textAnchor="middle" className="fill-ivory" style={{ fontWeight: 700, fontSize: 13.5 }}>
            개인정보 코어
          </text>
          <text x={210} y={196} textAnchor="middle" className="fill-sage-lt" style={{ fontWeight: 600, fontSize: 10.5, letterSpacing: '0.1em' }}>
            ISOLATED · ENCRYPTED
          </text>
        </g>
      </svg>
    </div>
  );
}

function MoatItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line border-t-[3px] border-t-sage bg-white p-6">
      <p className="text-h3 font-semibold text-ink">{title}</p>
      <p className="mt-2 text-body text-ink-soft">{children}</p>
    </div>
  );
}
