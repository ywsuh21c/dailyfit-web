'use client';

import { useEffect, useRef, useState } from 'react';
import { activeCatalogCount } from '@/lib/site';

/**
 * Hero centerpiece — the agent runtime, visible. A live-feeling console
 * showing one orchestration pass: utterance (typed live) → intent → memory
 * recall → curation over the activity database → a designed day.
 *
 * Motion: CSS keyframes (globals.css `.console-*`); the whole sequence
 * replays every CYCLE_MS by remounting the body. Both the replay loop and
 * the keyframes are disabled under prefers-reduced-motion.
 *
 * Content notes:
 * - 카탈로그 수치는 홈이 getCatalogCount() live count를 prop으로 주입
 *   (미배포/실패 시 lib/site.ts activeCatalogCount 폴백) — 8a620f5 기능 보존.
 * - 플랜 활동명은 라이브 카탈로그 실데이터(보태니컬 아트=평생학습 강좌,
 *   AI·디지털 첫걸음 교실=DailyFit 자체 운영). 임의 예시 금지.
 * - 콘솔 step tag 는 기능 라벨(intent·memory·search·plan). Agent 고유
 *   네이밍(시조/판소리 등)은 보류 — Michael 2026-07-01.
 * - `lang` prop: 'ko'(기본, 프리즈됨) / 'en'(영어 랜딩 /en). KO 렌더는 불변.
 */
const CYCLE_MS = 15000;

type ConsoleStep = { tag: string; label: string; body: string; delay: string };
type ConsoleContent = {
  aria: string;
  utterance: string;
  steps: ConsoleStep[];
  planLabel: string;
  planItems: string[];
};

const makeKO = (count: number): ConsoleContent => ({
  aria: 'DailyFit Agent가 하루를 설계하는 과정 데모',
  utterance: '다음 주엔 뭔가 새로운 걸 배워보고 싶은데',
  steps: [
    { tag: 'intent', label: '의도 분석', body: '학습 · 새로운 것 · 다음 주 오전', delay: 'console-d2' },
    { tag: 'memory', label: '리콜', body: '문정동 · 오전 선호 · 지난주: 스트레칭', delay: 'console-d3' },
    {
      tag: 'search',
      label: '활동 DB 검색',
      body: `${count.toLocaleString('ko-KR')}건 중 특색 활동 2건 선별`,
      delay: 'console-d4',
    },
  ],
  planLabel: '다음 주 하루 설계 완료',
  planItems: [
    '화 10:00 · 보태니컬 아트 · 평생학습 강좌',
    '목 09:30 · AI·디지털 첫걸음 교실 · DailyFit 자체 운영',
  ],
});

const makeEN = (count: number): ConsoleContent => ({
  aria: 'Demo: a DailyFit Agent designing a day',
  utterance: 'I’d like to learn something new next week',
  steps: [
    { tag: 'intent', label: 'Intent', body: 'learn · something new · next week, AM', delay: 'console-d2' },
    { tag: 'memory', label: 'Recall', body: 'Munjeong-dong · prefers mornings · last week: stretching', delay: 'console-d3' },
    {
      tag: 'search',
      label: 'Search activity DB',
      body: `2 standout picks from ${count.toLocaleString('en-US')}`,
      delay: 'console-d4',
    },
  ],
  planLabel: 'Next week: day designed',
  planItems: [
    'Tue 10:00 · Botanical Art · lifelong-learning class',
    'Thu 09:30 · AI & Digital Basics · run by DailyFit',
  ],
});

export function AgentConsole({
  lang = 'ko',
  catalogCount = activeCatalogCount,
}: {
  lang?: 'ko' | 'en';
  catalogCount?: number;
}) {
  const c = lang === 'en' ? makeEN(catalogCount) : makeKO(catalogCount);
  const [cycle, setCycle] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  // Replay loop runs only while the console is actually on screen.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = rootRef.current;
    if (!el) return;
    let t: ReturnType<typeof setInterval> | null = null;
    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && t === null) {
        t = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
      } else if (!entry?.isIntersecting && t !== null) {
        clearInterval(t);
        t = null;
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      if (t !== null) clearInterval(t);
    };
  }, []);

  return (
    <div ref={rootRef} className="console" aria-label={c.aria}>
      <div className="console-bar">
        <span className="console-title">dailyfit · agent runtime</span>
        <span className="console-live">
          <span className="console-live-dot" aria-hidden="true" />
          live
        </span>
      </div>

      <div key={cycle} className="console-body">
        <p className="console-line console-user console-d1">
          <span className="console-prompt" aria-hidden="true">&gt;</span>
          <span className="console-type">
            &ldquo;{c.utterance}&rdquo;
          </span>
        </p>

        {c.steps.map((s) => (
          <p key={s.tag} className={`console-line console-step ${s.delay}`}>
            <span className="console-glyph" aria-hidden="true">◆</span>
            <span className="console-tag">{s.tag}</span>
            <span className="console-step-label">{s.label}</span>
            <span className="console-step-body">{s.body}</span>
          </p>
        ))}

        <div className="console-line console-plan console-d5">
          <p className="console-plan-head">
            <span className="console-glyph console-glyph-done" aria-hidden="true">✓</span>
            <span className="console-tag">plan</span>
            <span className="console-step-label">{c.planLabel}</span>
          </p>
          <ul className="console-plan-items">
            {c.planItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <p className="console-line console-caret-line console-d6" aria-hidden="true">
          <span className="console-prompt">&gt;</span>
          <span className="console-caret" />
        </p>
      </div>
    </div>
  );
}
