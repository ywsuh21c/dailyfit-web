import { Reveal } from '@/components/motion/Reveal';
import { LevelCards, LevelUpStrip, Mascot } from '@/components/gami/parts';

// Home (company, 3rd person) — the real character/level/credit/referral loops
// framed as the retention engine for VC/press. Same in-app gamification, told
// in 3rd person (zero senior 2nd-person CTAs). The colorful character cards are
// a deliberate fun counterpoint to the austere company chrome. Honesty caveat:
// gamification is built+live in-app; numbers validated at launch, no prices.
export function RetentionEngine() {
  return (
    <section className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-[62ch] text-center">
          <Mascot className="char-float mx-auto mb-5 h-20 w-20 object-contain" />
          <p className="eyebrow-mono text-sage">Retention engine</p>
          <h2 className="mt-4 text-[34px] font-extrabold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[42px]">
            다시 오게 만드는 건, 캐릭터입니다.
          </h2>
          <p className="mt-5 text-body text-ink-soft">
            활동에 참여할수록 캐릭터가 자라고 레벨이 오릅니다. 건강·취미·배움 세
            갈래로 쌓이는 성취가 매일의 복귀를 만드는 — 겨루지 않는 리텐션 엔진.
          </p>
          <p className="mt-3 text-caption text-ink-soft/70">
            캐릭터·레벨·출석은 앱에 실제 구현돼 작동합니다. 수치는 정식 출시로
            검증합니다.
          </p>
        </Reveal>

        <div className="mt-14">
          <LevelCards />
        </div>

        <Reveal
          className="mt-12 rounded-3xl border border-line bg-white p-8 text-center sm:p-10"
          delay={120}
        >
          <p className="text-[20px] font-extrabold text-ink">출석할수록, 캐릭터가 자랍니다</p>
          <p className="mt-2 text-body text-ink-soft">
            시니어가 매일 돌아올 이유 — 눈에 보이는 성장.
          </p>
          <div className="mt-8">
            <LevelUpStrip />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-line border-l-[3px] border-l-sage bg-white p-6">
            <p className="text-base font-bold text-ink">가치가 먼저인 크레딧</p>
            <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">
              충분한 웰컴 포인트로 시작해, 가치를 전달한 뒤에만 과금합니다. 돈이
              빠지는 고통이 아니라, 받은 다음의 지불.
            </p>
          </div>
          <div className="rounded-2xl border border-line border-l-[3px] border-l-sage bg-white p-6">
            <p className="text-base font-bold text-ink">또래로 번지는 확산</p>
            <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">
              만족한 사용자가 또래를 데려오고, 아파트·동네 커뮤니티를 타고 퍼지는
              검증된 추천.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
