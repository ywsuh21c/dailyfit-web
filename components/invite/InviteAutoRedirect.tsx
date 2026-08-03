'use client';

// /i/[code] 자동 이동 — §11 델타 v5 (현진 2026-08-03 23:26: "버튼을 또 눌러야 하는
// 중간 단계를 없앤다").
//
// 흐름(마운트 후 0.9초 안내 → 이동):
//   모바일(iOS·안드) = 딥링크(dailyfit://login?ref=CODE) 먼저 — 앱 설치자는 앱이 열리며
//   코드가 자동 입력된다(앱 커밋 32f70e204). 1.2초 내 미전환이면:
//     · iOS  → 코드를 클립보드에 복사 후 App Store (스토어는 파라미터를 못 물어 복사가 차선)
//     · 안드 → 웹앱 https://my.dailyfitai.app/login?ref=CODE (코드 유실 0)
//   데스크톱 = 딥링크 없이 바로 웹앱 login?ref (§11 권고: iOS=스토어 / 그 외=웹앱).
//
// 시니어 원칙: 무예고 이동은 사고로 읽힌다 — 안내 문구를 반드시 먼저 보여주고,
// 자동 이동이 실패해도 수동 링크 3개(웹/App Store/Google Play)가 페이지에 남는다.
import { useEffect, useState } from 'react';

const WEBAPP_LOGIN = 'https://my.dailyfitai.app/login';
const DEEPLINK = 'dailyfit://login';
const NOTICE_MS = 900; // 안내 화면 체류(0.5~1초 — §11)
const DEEPLINK_WAIT_MS = 1200; // 앱 전환 감지 대기

export function InviteAutoRedirect({ code, iosStoreUrl }: { code: string; iosStoreUrl: string }) {
  const [phase, setPhase] = useState<'notice' | 'moving'>('notice');

  useEffect(() => {
    const ua = navigator.userAgent;
    const isIos = /iPhone|iPad|iPod/.test(ua);
    const isAndroid = /Android/.test(ua);
    const webappUrl = `${WEBAPP_LOGIN}?ref=${encodeURIComponent(code)}`;

    const goFallback = async () => {
      if (isIos && iosStoreUrl) {
        // 스토어는 ?ref 를 못 전달 — 이동 직전 클립보드 자동 복사(실패는 조용히 무시:
        // 페이지에 코드·복사 버튼이 그대로 남아 수동 경로가 살아 있다).
        try { await navigator.clipboard.writeText(code); } catch { /* 무시 */ }
        window.location.href = iosStoreUrl;
      } else {
        window.location.href = webappUrl;
      }
    };

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => {
      setPhase('moving');
      if (isIos || isAndroid) {
        // 앱 설치자 우선 — 딥링크 시도 후 미전환이면 폴백. 전환되면 탭이 hidden 이 된다.
        const started = Date.now();
        window.location.href = `${DEEPLINK}?ref=${encodeURIComponent(code)}`;
        timers.push(setTimeout(() => {
          if (document.visibilityState === 'visible' && Date.now() - started >= DEEPLINK_WAIT_MS - 100) {
            void goFallback();
          }
        }, DEEPLINK_WAIT_MS));
      } else {
        void goFallback();
      }
    }, NOTICE_MS));
    return () => timers.forEach(clearTimeout);
  }, [code, iosStoreUrl]);

  return (
    <div
      className="mx-auto mt-6 max-w-xl rounded-2xl border border-sage/25 bg-sage/5 px-6 py-4 text-center"
      role="status"
      aria-live="polite"
    >
      <p className="text-[17px] font-bold text-ink">
        {phase === 'notice' ? '초대를 확인했어요' : '이동하고 있어요…'}
      </p>
      <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">
        코드 <strong className="tracking-[0.12em] text-sage">{code}</strong> 는 자동으로
        이어드려요. 잠시 후 이동해요 — 안 되면 아래 버튼을 눌러 주세요.
      </p>
    </div>
  );
}
