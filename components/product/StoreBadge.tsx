'use client';

import { useEffect, useState } from 'react';

type Store = 'App Store' | 'Google Play';

/**
 * Store badge — the /product ad→install conversion exit.
 *
 * - `href` empty (앱 공개 전, 2026-06-26 이전): 비클릭 "곧 출시" 상태. 정직하게
 *   먼저 배포 가능. lib/site.ts storeLinks 채우면 실링크로 전환된다.
 * - `href` set: 실 설치 링크. 클릭 시 착지 URL의 UTM/클릭 파라미터를 스토어로
 *   전달한다 — Google Play는 install `referrer`(Play Install Referrer API가 읽음),
 *   App Store는 쿼리 append(best-effort). 클라이언트에서 처리해 페이지는 정적으로
 *   유지(빠른 로드). JS 없으면 기본 스토어 URL로 폴백(UTM만 미전달).
 */
export function StoreBadge({
  store,
  href,
  tone = 'dark',
}: {
  store: Store;
  href: string;
  /** 'dark' = on navy/sage grounds (default) · 'light' = on white cards (activity aside). */
  tone?: 'dark' | 'light';
}) {
  const [resolved, setResolved] = useState(href);
  const frame =
    tone === 'light'
      ? 'border-hair-strong bg-white text-ink'
      : 'border-white/35 bg-white/10 text-white';
  const sub = tone === 'light' ? 'text-ink-soft' : 'text-white/70';
  const hover = tone === 'light' ? 'hover:border-sage hover:text-sage' : 'hover:bg-white/20';

  useEffect(() => {
    if (!href) return;
    const search = window.location.search; // ?utm_source=naver&utm_medium=cpc&...
    if (!search) {
      setResolved(href);
      return;
    }
    const incoming = new URLSearchParams(search);
    try {
      const url = new URL(href);
      if (store === 'Google Play') {
        // Play Install Referrer: UTM 문자열을 referrer 파라미터로 전달.
        url.searchParams.set('referrer', incoming.toString());
      } else {
        // App Store: 표준 UTM 전달 없음 — best-effort로 쿼리 append.
        incoming.forEach((value, key) => url.searchParams.set(key, value));
      }
      setResolved(url.toString());
    } catch {
      setResolved(href);
    }
  }, [href, store]);

  if (!href) {
    return (
      <span className={`inline-flex min-h-[58px] items-center gap-3 rounded-xl border px-7 ${frame}`}>
        <span className="text-left leading-tight">
          <span className={`block text-[12px] ${sub}`}>{store}</span>
          <span className="block text-[17px] font-bold">곧 출시</span>
        </span>
      </span>
    );
  }

  return (
    <a
      href={resolved}
      rel="noopener"
      className={`inline-flex min-h-[58px] items-center gap-3 rounded-xl border px-7 transition-colors active:scale-[0.98] ${frame} ${hover}`}
    >
      <span className="text-left leading-tight">
        <span className={`block text-[12px] ${sub}`}>{store}</span>
        <span className="block text-[17px] font-bold">다운로드</span>
      </span>
    </a>
  );
}
