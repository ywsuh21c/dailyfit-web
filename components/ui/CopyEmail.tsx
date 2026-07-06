'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Contact-page email row — the address, huge and copyable. Copy-to-clipboard is
 * the only action: a mailto: link silently no-ops on machines without a mail
 * client (the exact bug that killed the old "Talk to us" buttons), so we don't
 * offer one.
 */
export function CopyEmail({
  email,
  lang = 'ko',
}: {
  email: string;
  lang?: 'ko' | 'en';
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const labels =
    lang === 'en'
      ? { copy: 'Copy email address', copied: 'Copied ✓' }
      : { copy: '이메일 주소 복사', copied: '복사했습니다 ✓' };

  // Clear a pending reset timer if we unmount mid-window (nav away within 2s).
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard API blocked (older browsers / permissions) — fall back to
      // a selection-based copy so the button never no-ops.
      const ta = document.createElement('textarea');
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="break-all text-center text-[24px] font-extrabold tracking-tight text-ink sm:text-[34px]">
        {email}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-[56px] items-center rounded-xl bg-sage px-8 text-[17px] font-bold text-white transition-colors hover:bg-sage-dk active:scale-[0.98]"
        >
          {copied ? labels.copied : labels.copy}
        </button>
      </div>
    </div>
  );
}
