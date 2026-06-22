import { Reveal } from '@/components/motion/Reveal';
import { LevelCards, LevelUpStrip, WeekAttendance, WelcomePoints } from '@/components/gami/parts';

// /product (senior, 2nd person) — the felt, fun version of the gamification.
// Mirrors the in-app screens (LevelHome · WelcomePoints · AttendSuccess) with
// the real characters. Tone = warm encouragement, non-competitive. Body ≥18px.
export function HabitGamification() {
  return (
    <section className="bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-[54ch] text-center">
          <p className="eyebrow-mono text-sage">함께 자라는 하루</p>
          <h2 className="mt-4 text-[30px] font-extrabold tracking-[-0.03em] text-ink sm:text-[38px]">
            캐릭터와 함께, 매일 한 걸음.
          </h2>
          <p className="mt-4 text-[19px] leading-[1.7] text-ink-soft">
            활동에 다녀올수록 나의 캐릭터가 자라고 단계가 오릅니다. 남과 겨루지
            않아요 — 어제의 나와의 약속이에요.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-xl">
          <WelcomePoints />
        </Reveal>

        <div className="mt-12">
          <LevelCards />
        </div>

        <Reveal
          className="mt-12 rounded-3xl border border-line bg-white p-8 text-center sm:p-10"
          delay={80}
        >
          <p className="text-[22px] font-extrabold text-ink">출석할수록, 캐릭터가 자라요</p>
          <p className="mt-2 text-[18px] text-ink-soft">
            한 걸음씩 다녀오면 캐릭터가 멋지게 성장합니다.
          </p>
          <div className="mt-8">
            <LevelUpStrip />
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-xl">
          <p className="mb-3 text-[18px] font-bold text-ink">이번 주 출석</p>
          <WeekAttendance />
          <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">
            다녀오신 뒤 사진 한 장이면 출석 완료 — &ldquo;출석이 인증되었어요!&rdquo;
            하고 함께 기뻐해요.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
