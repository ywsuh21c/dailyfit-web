'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Living-lab visual — the learning loop, logged.
 *
 * Same console design language as the landing AgentConsole (.console-* CSS),
 * but the content is one self-improvement pass: a run hits an obstacle, the
 * Agent stores the pattern, and the NEXT run clears it faster with zero human
 * input. Replays every CYCLE_MS; motion off under prefers-reduced-motion.
 */
const CYCLE_MS = 14000;

type Line = { tag: string; label: string; body: string; delay: string };
type Content = {
  aria: string;
  title: string;
  run: string;
  lines: Line[];
  doneTag: string;
  doneLabel: string;
  doneItems: string[];
};

const KO: Content = {
  aria: '신청대행 Agent가 장애물을 학습해 다음 실행에서 더 빨라지는 과정 데모',
  title: 'dailyfit · learning loop',
  run: 'run #847 · 신청대행 · 커뮤니티 포털',
  lines: [
    { tag: 'obstacle', label: '장애물', body: '신청 양식 변경 감지 · 1차 시도 실패', delay: 'console-d2' },
    { tag: 'learn', label: '패턴 저장', body: '라벨 매칭 > 위치 매칭 · 전략 업데이트', delay: 'console-d3' },
    { tag: 'apply', label: '자가 적용', body: '사람의 지시 없이 다음 실행에 반영', delay: 'console-d4' },
  ],
  doneTag: 'run #848',
  doneLabel: '같은 포털 · 재시도 없이 통과',
  doneItems: ['처리 시간 Δ -14s', '사람 개입 0'],
};

const EN: Content = {
  aria: 'Demo: the Auto-apply Agent learning from an obstacle and running faster the next time',
  title: 'dailyfit · learning loop',
  run: 'run #847 · auto-apply · community portal',
  lines: [
    { tag: 'obstacle', label: 'Obstacle', body: 'form changed · first attempt failed', delay: 'console-d2' },
    { tag: 'learn', label: 'Pattern stored', body: 'match by label, not position · strategy updated', delay: 'console-d3' },
    { tag: 'apply', label: 'Self-applied', body: 'carried into the next run, unprompted', delay: 'console-d4' },
  ],
  doneTag: 'run #848',
  doneLabel: 'same portal · passes without retry',
  doneItems: ['processing time Δ -14s', 'human input: zero'],
};

export function ResearchConsole({ lang = 'ko' }: { lang?: 'ko' | 'en' }) {
  const c = lang === 'en' ? EN : KO;
  const [cycle, setCycle] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = rootRef.current;
    if (!el) return;
    let t: ReturnType<typeof setInterval> | null = null;
    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && t === null) {
        t = setInterval(() => setCycle((n) => n + 1), CYCLE_MS);
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
        <span className="console-title">{c.title}</span>
        <span className="console-live">
          <span className="console-live-dot" aria-hidden="true" />
          live
        </span>
      </div>

      <div key={cycle} className="console-body">
        <p className="console-line console-user console-d1">
          <span className="console-prompt" aria-hidden="true">&gt;</span>
          <span className="console-type">{c.run}</span>
        </p>

        {c.lines.map((s) => (
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
            <span className="console-tag">{c.doneTag}</span>
            <span className="console-step-label">{c.doneLabel}</span>
          </p>
          <ul className="console-plan-items">
            {c.doneItems.map((item) => (
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
