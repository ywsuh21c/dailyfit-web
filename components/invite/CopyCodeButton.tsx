'use client';

import { useState } from 'react';

/**
 * 초대 코드 복사 버튼 — /i/[code] 랜딩 전용.
 * navigator.clipboard 미지원(구형 인앱 브라우저)이면 버튼을 숨기지 않고
 * 실패 시에도 조용히 넘어간다(코드가 바로 옆에 크게 보이므로 수동 입력 폴백).
 */
export function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* 클립보드 미지원 — 코드가 화면에 크게 보이므로 무시 */
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex min-h-tap items-center rounded-lg border-2 border-sage bg-white px-5 text-base font-semibold text-sage hover:bg-sage hover:text-white"
      aria-label="추천 코드 복사"
    >
      {copied ? '복사됐어요 ✓' : '코드 복사'}
    </button>
  );
}
