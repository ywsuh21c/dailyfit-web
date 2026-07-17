'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * StickyScene — the generic scrollytelling engine.
 *
 * The visual panel stays pinned (right column on desktop, top strip on
 * mobile) while narrative steps scroll past on the left; the step crossing
 * the middle of the viewport becomes active and drives the visual's state.
 *
 * - IntersectionObserver with a center band; no per-frame JS.
 * - Steps dim/lift via `.rs-step(.on)` CSS (static under reduced-motion).
 * - DOM order puts the visual first so the mobile top-strip variant sticks
 *   above the steps; desktop reorders with lg:order-*.
 */
export type SceneStep = {
  kicker: string;
  title: React.ReactNode;
  body: React.ReactNode;
};

export function StickyScene({
  steps,
  visual,
  stickyBgClass = 'bg-surface',
  ariaLabel,
}: {
  steps: SceneStep[];
  visual: (active: number) => React.ReactNode;
  /** mobile top-strip background — must match the hosting section's bg */
  stickyBgClass?: string;
  ariaLabel?: string;
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(Number((e.target as HTMLElement).dataset.step ?? 0));
          }
        });
      },
      { rootMargin: '-42% 0px -42% 0px' },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [steps.length]);

  return (
    <div
      className="lg:grid lg:grid-cols-[minmax(0,0.9fr)_1.1fr] lg:items-start lg:gap-16"
      role="group"
      aria-label={ariaLabel}
    >
      {/* pinned visual */}
      <div
        className={`sticky top-[64px] z-10 -mx-5 px-5 pb-4 pt-3 ${stickyBgClass} shadow-[0_18px_18px_-18px_rgba(30,45,64,0.12)] lg:top-[104px] lg:z-auto lg:order-2 lg:mx-0 lg:flex lg:min-h-[calc(100vh-190px)] lg:items-center lg:bg-transparent lg:p-0 lg:shadow-none`}
      >
        <div className="mx-auto w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[560px]">
          {visual(active)}
        </div>
      </div>

      {/* narrative steps */}
      <div className="lg:order-1">
        {steps.map((s, i) => (
          <div
            key={i}
            data-step={i}
            ref={(n) => {
              refs.current[i] = n;
            }}
            className={`rs-step flex items-center py-8 ${
              i === steps.length - 1
                ? 'min-h-[44vh] lg:min-h-[52vh]'
                : 'min-h-[58vh] lg:min-h-[76vh]'
            } ${active === i ? 'on' : ''}`}
          >
            <div>
              <p className="rs-step-idx">{s.kicker}</p>
              <h3 className="mt-3 text-[25px] font-extrabold leading-[1.28] tracking-[-0.02em] text-ink sm:text-[31px]">
                {s.title}
              </h3>
              <div className="mt-4 max-w-[46ch] text-body text-ink-soft">{s.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
