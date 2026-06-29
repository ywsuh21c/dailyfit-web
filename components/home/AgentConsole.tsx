'use client';

import { useEffect, useRef, useState } from 'react';
import { activeCatalogCount } from '@/lib/site';

/**
 * Hero centerpiece — the agent runtime, visible. A live-feeling console
 * showing one real orchestration pass: utterance (typed live) → intent →
 * memory recall → curation over the activity graph → a designed day.
 *
 * Motion: CSS keyframes (globals.css `.console-*`); the whole sequence
 * replays every CYCLE_MS by remounting the body. Both the replay loop and
 * the keyframes are disabled under prefers-reduced-motion.
 *
 * Content notes:
 * - 카탈로그 수치는 lib/site.ts activeCatalogCount 단일 출처.
 * - 한옥공예/AI 교실 — LJS 인터뷰 특이취미 예시 + 자체공급 라이브 활동.
 * - 에이전트명은 홈 AgentCard·이 콘솔 tag·/technology Layer 2 세 곳에 존재
 *   — 네이밍 변경 시 세 곳 모두 갱신.
 */
const CYCLE_MS = 15000;

const STEPS = [
  { tag: '의도', label: '의도 분석', body: '학습 · 새로운 것 · 다음 주 오전', delay: 'console-d2' },
  { tag: 'memory', label: '리콜', body: '문정동 · 오전 선호 · 지난주: 스트레칭', delay: 'console-d3' },
  {
    tag: '큐레이션',
    label: '활동 큐레이션',
    body: `${activeCatalogCount.toLocaleString('ko-KR')}건 중 딱 맞는 활동 선별`,
    delay: 'console-d4',
  },
];

export function AgentConsole() {
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
    <div ref={rootRef} className="console" aria-label="DailyFit 에이전트가 하루를 설계하는 과정 데모">
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
            &ldquo;다음 주엔 뭔가 새로운 걸 배워보고 싶은데&rdquo;
          </span>
        </p>

        {STEPS.map((s) => (
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
            <span className="console-step-label">하루 설계 · 신청 대행 완료</span>
          </p>
          <ul className="console-plan-items">
            <li>화 10:00 — 바리스타 취미반</li>
            <li>→ 복잡한 신청은 DailyFit이 대신 접수했어요</li>
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
