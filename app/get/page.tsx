'use client';

import { useEffect } from 'react';

// 현진 원본 로직 그대로: 기기 감지 → iOS는 앱스토어, 안드/기타는 구글폼.
const IOS_URL = 'https://apps.apple.com/kr/app/dailyfit/id6773802603';
const AOS_URL = 'https://forms.gle/gUKFvTzUz2Sg5WDg7';

function detectIsIOS(): boolean {
  const ua = navigator.userAgent || '';
  return (
    /iPad|iPhone|iPod/.test(ua) ||
    // iPadOS 13+ reports as MacIntel with touch.
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

// UTM(쿼리스트링)은 iOS 목적지에만 전달. forms.gle(안드)에는 붙이지 않음 — 원본 로직.
function iosDestination(): string {
  const qs = window.location.search; // includes leading '?' or ''
  return qs ? IOS_URL + qs : IOS_URL;
}

export default function GetPage() {
  useEffect(() => {
    const target = detectIsIOS() ? iosDestination() : AOS_URL;
    window.location.replace(target);
  }, []);

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        padding: 24,
        textAlign: 'center',
        backgroundColor: '#F5F0E8',
        color: '#1E2D40',
        fontFamily:
          'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>데일리핏 앱 받기</h1>
      <p style={{ fontSize: 15, opacity: 0.75, margin: 0 }}>
        앱스토어로 이동 중입니다. 자동으로 넘어가지 않으면 아래 버튼을 눌러주세요.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 320 }}>
        <a
          href={IOS_URL}
          style={{
            backgroundColor: '#4A7C59',
            color: '#FFFFFF',
            padding: '14px 20px',
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          iPhone · 앱스토어에서 받기
        </a>
        <a
          href={AOS_URL}
          style={{
            backgroundColor: '#FFFFFF',
            color: '#1E2D40',
            border: '1px solid #1E2D40',
            padding: '14px 20px',
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Android · 사전신청 하기
        </a>
      </div>
    </main>
  );
}
