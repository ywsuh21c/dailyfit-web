'use client';

import { useEffect, useRef } from 'react';

/**
 * Word-illuminated interlude — the page's cinematic beat.
 *
 * A tall (~2.3 viewport) dark stage whose inner panel is sticky: while the
 * reader scrolls through, the manifesto lights up word by word, tied to
 * scroll progress (not time). The mechanic Anthropic's essay pages use for
 * their thesis statements, rebuilt on brand tokens.
 *
 * - Scroll handler writes classList only (no React re-render per frame).
 * - Runs only while on screen (IntersectionObserver gate).
 * - prefers-reduced-motion: every word lit from the start, no listener.
 * - NOTE: the sticky child carries `overflow-hidden`, never this section —
 *   an overflow-hidden ancestor would disable position:sticky.
 */
export type InterludeWord = { t: string; em?: boolean };

export function Interlude({
  eyebrow,
  lines,
  heightVh = 230,
}: {
  eyebrow?: string;
  lines: InterludeWord[][];
  heightVh?: number;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const total = lines.reduce((n, l) => n + l.length, 0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      wordRefs.current.forEach((w) => w?.classList.add('on'));
      return;
    }
    const el = rootRef.current;
    if (!el) return;
    let raf = 0;
    let watching = false;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 1;
      // +2 overshoot: the last words land a beat before the stage releases
      const lit = Math.floor(p * (total + 2));
      wordRefs.current.forEach((w, i) => w?.classList.toggle('on', i < lit));
    };
    const onScroll = () => {
      if (!watching) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([entry]) => {
      watching = !!entry?.isIntersecting;
      if (watching) update();
    });
    io.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [total]);

  let k = 0;
  return (
    <section ref={rootRef} className="rs-stage" style={{ height: `${heightVh}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="rs-stage-grid" aria-hidden="true" />
        <div className="rs-stage-glow rs-stage-glow-a" aria-hidden="true" />
        <div className="rs-stage-glow rs-stage-glow-b" aria-hidden="true" />
        <div className="rs-stage-grain" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-4xl px-5 text-center">
          {eyebrow ? <p className="eyebrow-mono text-sage-lt/80">{eyebrow}</p> : null}
          <p className="mt-9 text-[29px] font-extrabold leading-[1.42] tracking-[-0.02em] sm:text-[42px] sm:leading-[1.36]">
            {lines.map((line, li) => (
              <span key={li} className={li > 0 ? 'mt-5 block sm:mt-7' : 'block'}>
                {line.map((w) => {
                  const idx = k;
                  k += 1;
                  return (
                    <span
                      key={idx}
                      ref={(n) => {
                        wordRefs.current[idx] = n;
                      }}
                      className={w.em ? 'rs-word rs-word-em' : 'rs-word'}
                    >
                      {w.t}{' '}
                    </span>
                  );
                })}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
