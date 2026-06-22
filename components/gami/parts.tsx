import Image from 'next/image';
import { Fragment } from 'react';
import { Reveal } from '@/components/motion/Reveal';

// Real gamification pieces mirrored 1:1 from the app:
//   apps/mobile/src/v2/level/LevelHome.tsx (level cards · weekly attendance)
//   apps/mobile/src/v2/welcome/WelcomePointsModal.tsx (welcome 20,000P)
//   apps/mobile/src/v2/attend/AttendSuccess.tsx (celebration)
//   apps/mobile/assets/brand/* (mascot · 3 category characters · 15 level avatars)
// Category meta + gradients = LevelHome GROUP_META.
// All numbers here are ILLUSTRATIVE (예시) — no traction claims, no hard prices.

type CatKey = 'health' | 'hobby' | 'learn';
const CAT: Record<CatKey, { ko: string; grad: string }> = {
  health: { ko: '건강', grad: 'cat-health' },
  hobby: { ko: '취미', grad: 'cat-hobby' },
  learn: { ko: '배움', grad: 'cat-learn' },
};

function LevelCard({ cat, level, pct }: { cat: CatKey; level: number; pct: number }) {
  const c = CAT[cat];
  const maxed = level >= 5;
  return (
    <div
      className={`relative overflow-hidden rounded-[20px] p-6 text-white shadow-[0_18px_44px_-22px_rgba(40,30,15,0.55)] ${c.grad}`}
    >
      <div className="flex items-center gap-4">
        <div className="grid h-[84px] w-[84px] shrink-0 place-items-center rounded-full bg-white/20">
          <Image
            src={`/brand/levels/${cat}-${level}.png`}
            alt={`${c.ko} 캐릭터 레벨 ${level}`}
            width={74}
            height={74}
            className="char-float h-[74px] w-[74px] object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[19px] font-extrabold">{c.ko}</p>
          <p className="mt-0.5 text-[13px]" aria-label={`레벨 ${level}`}>
            {'⭐'.repeat(level)}
          </p>
        </div>
        <p className="text-[15px] font-extrabold opacity-90">
          Lv.<span className="text-[34px] tracking-tight">{level}</span>
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between text-[12.5px] font-bold opacity-95">
        <span>{maxed ? '최고 레벨이에요' : '다음 레벨까지'}</span>
        {!maxed && <span>{100 - pct}% 남음</span>}
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/30">
        <div className="h-full rounded-full bg-white" style={{ width: `${pct}%` }} />
      </div>

      <div className="mt-4 rounded-xl bg-white/15 px-3.5 py-2.5 text-[13px] font-semibold leading-snug">
        레벨이 오를수록 더 많은 혜택을 받아요
      </div>
    </div>
  );
}

const SAMPLE: Array<{ cat: CatKey; level: number; pct: number }> = [
  { cat: 'health', level: 3, pct: 70 },
  { cat: 'hobby', level: 2, pct: 40 },
  { cat: 'learn', level: 4, pct: 85 },
];

export function LevelCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {SAMPLE.map((s, i) => (
        <Reveal key={s.cat} delay={i * 100}>
          <LevelCard {...s} />
        </Reveal>
      ))}
    </div>
  );
}

// One character growing across levels 1→5 (uses the 건강 set as the exemplar).
export function LevelUpStrip() {
  const steps = [1, 2, 3, 4, 5];
  return (
    <div className="flex flex-wrap items-end justify-center gap-2 sm:gap-3">
      {steps.map((lvl, i) => (
        <Fragment key={lvl}>
          <figure className="flex flex-col items-center">
            <div className="grid h-[84px] w-[84px] place-items-center rounded-2xl bg-[#EAF0F7] sm:h-[92px] sm:w-[92px]">
              <Image
                src={`/brand/levels/health-${lvl}.png`}
                alt={`레벨 ${lvl} 캐릭터`}
                width={76}
                height={76}
                className="h-[68px] w-[68px] object-contain sm:h-[76px] sm:w-[76px]"
              />
            </div>
            <figcaption className="mt-2 text-[13px] font-bold text-ink-soft">Lv.{lvl}</figcaption>
          </figure>
          {i < steps.length - 1 && (
            <span className="mb-7 text-xl text-sage" aria-hidden="true">
              →
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}

const WEEK = ['월', '화', '수', '목', '금', '토', '일'];
export function WeekAttendance() {
  const attended = [true, true, false, true, true, false, false];
  const today = 4;
  return (
    <div className="flex justify-between rounded-2xl border border-line bg-white px-3 py-4 sm:px-5">
      {WEEK.map((l, i) => (
        <div key={l} className="flex flex-col items-center gap-2">
          <span className={`text-[13px] font-bold ${i === today ? 'text-sage' : 'text-ink-soft/70'}`}>
            {l}
          </span>
          <span
            className={`grid h-9 w-9 place-items-center rounded-full text-[15px] font-bold ${
              attended[i] ? 'bg-sage text-white' : 'bg-surface text-ink-soft/40'
            } ${i === today ? 'ring-2 ring-sage ring-offset-2' : ''}`}
          >
            {attended[i] ? '✓' : ''}
          </span>
        </div>
      ))}
    </div>
  );
}

// Welcome 20,000P moment — mascot hands it over (mirrors WelcomePointsModal).
export function WelcomePoints() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-ivory px-6 py-10 text-center">
      <span className="sparkle-tw absolute left-[16%] top-[16%] text-[18px] text-[#B8923C]" aria-hidden="true">
        ✦
      </span>
      <span
        className="sparkle-tw absolute right-[20%] top-[22%] text-[14px] text-[#6E9A7C]"
        aria-hidden="true"
        style={{ animationDelay: '0.6s' }}
      >
        ✦
      </span>
      <span
        className="sparkle-tw absolute right-[31%] top-[13%] text-[15px] text-[#C2703D]"
        aria-hidden="true"
        style={{ animationDelay: '1.1s' }}
      >
        ✦
      </span>

      <div className="mx-auto grid h-[150px] w-[150px] place-items-center rounded-full bg-[#E9F0EB]">
        <Image
          src="/brand/mascot.png"
          alt="데일리핏 마스코트"
          width={112}
          height={112}
          className="char-float h-28 w-28 object-contain"
        />
      </div>
      <p className="mt-5 text-[17px] font-bold text-ink-soft">데일리핏에 오신 걸 환영해요</p>
      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="coin-gold grid h-10 w-10 place-items-center rounded-full text-[18px] font-black text-white">
          P
        </span>
        <span className="text-[52px] font-black leading-none tracking-tight text-ink">20,000</span>
        <span className="mt-3 text-[22px] font-black text-[#B8923C]">P</span>
      </div>
      <p className="mt-3 text-[21px] font-extrabold text-ink">웰컴 포인트가 도착했어요</p>
      <p className="mt-1 text-[15px] text-ink-soft">20,000원처럼 사용할 수 있어요</p>
    </div>
  );
}

export function Mascot({ className }: { className?: string }) {
  return (
    <Image src="/brand/mascot.png" alt="" aria-hidden="true" width={96} height={96} className={className} />
  );
}
