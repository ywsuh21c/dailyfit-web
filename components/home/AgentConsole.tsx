'use client';

import { useEffect, useState } from 'react';

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
 * - 활동 그래프 11,530건 — source: `2. Outputs/service-build/
 *   2026-06-10-orc-c8-supply-handoff/summary.md`.
 *   TODO(Michael): 수도권 트림(옵션3, 보류 중) 실행 시 수치 갱신 필요.
 * - 한옥공예/AI 교실 — LJS 인터뷰 특이취미 예시 + 자체공급 라이브 활동.
 */
const CYCLE_MS = 15000;

const STEPS = [
  { tag: 'mikyung', label: '의도 분석', body: '학습 · 새로운 것 · 다음 주 오전', delay: 'console-d2' },
  { tag: 'memory', label: '리콜', body: '문정동 · 오전 선호 · 지난주: 스트레칭', delay: 'console-d3' },
  { tag: 'curation', label: '활동 그래프 탐색', body: '11,530건 중 특색 활동 2건 선별', delay: 'console-d4' },
];

export function AgentConsole() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="console" aria-label="DailyFit 에이전트가 하루를 설계하는 과정 데모">
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
            <span className="console-step-label">다음 주 하루 설계 완료</span>
          </p>
          <ul className="console-plan-items">
            <li>화 10:00 — 한옥공예 입문 (송파여성문화회관)</li>
            <li>목 09:30 — AI 교실 · DailyFit 직접 운영</li>
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
