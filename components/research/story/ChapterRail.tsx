'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Chapter rail + reading progress — the essay chrome.
 *
 * A thin progress bar hugs the top of the viewport, and on wide screens
 * (1360px+) a fixed left rail lists the chapters; the active one stretches
 * its bar and shows its label (scrollspy via IntersectionObserver).
 * Both are pure chrome: aria-hidden progress, real anchor links in the rail.
 */
export type Chapter = { id: string; num: string; label: string };

export function ChapterRail({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState<string>('');
  const fillRef = useRef<HTMLDivElement>(null);

  // reading progress bar
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        fillRef.current?.style.setProperty('transform', `scaleX(${p})`);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // chapter scrollspy
  useEffect(() => {
    const els = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      // a band around the upper-middle of the viewport decides the chapter
      { rootMargin: '-25% 0px -65% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [chapters]);

  return (
    <>
      <div className="rs-progress" aria-hidden="true">
        <div ref={fillRef} className="rs-progress-fill" />
      </div>
      <nav className="rs-rail" aria-label="chapters">
        {chapters.map((c) => (
          <a key={c.id} href={`#${c.id}`} className={`rs-rail-item ${active === c.id ? 'on' : ''}`}>
            <span className="rs-rail-num">{c.num}</span>
            <span className="rs-rail-bar" aria-hidden="true" />
            <span className="rs-rail-label">{c.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
