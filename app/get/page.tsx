'use client';

import { useEffect, useState } from 'react';

// 광고 랜딩(구글 디맨드젠·카카오): 자동 리다이렉트를 쓰면 도착 도메인이
// dailyfitai.app → apple.com 으로 튀어 구글이 "도착 도메인 불일치"로 반려한다.
// 그래서 자동 이동을 제거하고 유저가 직접 누르는 버튼 페이지로 유지한다.
// (2026-07-04 현진 요청 — 광고 심사 요건.)
const IOS_URL = 'https://apps.apple.com/kr/app/dailyfit/id6773802603';
const AOS_URL = 'https://forms.gle/gUKFvTzUz2Sg5WDg7';

const INK = '#1E2D40';
const SAGE = '#4A7C59';
const CREAM = '#F5F0E8';

export default function GetPage() {
  // UTM(쿼리스트링)은 iOS 목적지에만 전달. forms.gle(안드)에는 붙이지 않음 —
  // 원본 로직 유지. 자동 이동이 없어졌으므로 버튼 href에 마운트 후 부착한다.
  const [iosHref, setIosHref] = useState(IOS_URL);
  useEffect(() => {
    const qs = window.location.search; // includes leading '?' or ''
    if (qs) setIosHref(IOS_URL + qs);
  }, []);

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 32,
        padding: '48px 24px 24px',
        textAlign: 'center',
        backgroundColor: CREAM,
        color: INK,
        fontFamily:
          'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          maxWidth: 360,
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>데일리핏 앱 받기</h1>
        <p style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.8, margin: 0 }}>
          말로 물어보면 동네 활동을 찾아서<br />신청까지 대신해 드려요.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 320 }}>
          <a
            href={iosHref}
            style={{
              backgroundColor: SAGE,
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
              color: INK,
              border: `1px solid ${INK}`,
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
      </div>

      {/* 광고 심사 요건 — 개인정보 수집·이용 안내 + 사업자정보.
          카카오 광고 랜딩은 이 두 가지를 요구한다. */}
      <footer
        style={{
          width: '100%',
          maxWidth: 480,
          borderTop: `1px solid rgba(30,45,64,0.12)`,
          paddingTop: 16,
          fontSize: 12,
          lineHeight: 1.7,
          color: 'rgba(30,45,64,0.7)',
          textAlign: 'left',
        }}
      >
        <p style={{ margin: '0 0 8px', fontWeight: 600, color: 'rgba(30,45,64,0.85)' }}>
          개인정보 수집·이용 안내
        </p>
        <p style={{ margin: '0 0 12px' }}>
          Android 사전신청 시 수집 항목은 이름·연락처이며, 출시 안내 목적으로만
          이용하고 목적 달성 시 지체 없이 파기합니다. 본인 동의 없이 제3자에게
          제공하지 않습니다. 자세한 내용은{' '}
          <a href="/privacy" style={{ color: SAGE, fontWeight: 600 }}>개인정보처리방침</a>
          {' · '}
          <a href="/terms" style={{ color: SAGE, fontWeight: 600 }}>이용약관</a>
          을 확인해 주세요.
        </p>
        {/* 사업자정보 — 예비창업 신분 유지(사업자등록 전)라 사업자등록번호는 표기하지
            않는다. 상호·대표·주소·연락처(이메일)로 카카오 랜딩 요건 시도(2026-07-04).
            전화번호(010-8807-6397)는 Michael 요청으로 비공개 — 카카오가 '연락처(전화)
            누락'으로 반려 시 아래 주석 연락처 줄을 살려 1줄만 추가한다. */}
        <p style={{ margin: '0 0 8px', fontWeight: 600, color: 'rgba(30,45,64,0.85)' }}>
          사업자정보
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 10, rowGap: 3 }}>
          <span style={{ fontWeight: 600 }}>상호</span>
          <span>DailyFit (데일리핏)</span>
          <span style={{ fontWeight: 600 }}>대표</span>
          <span>서영우</span>
          <span style={{ fontWeight: 600 }}>주소</span>
          <span>서울 강남구 테헤란로 217, 3층</span>
          <span style={{ fontWeight: 600 }}>문의</span>
          <span>
            <a href="mailto:dailyfitkorea@gmail.com" style={{ color: SAGE, fontWeight: 600 }}>
              dailyfitkorea@gmail.com
            </a>
          </span>
          {/* 카카오가 전화 요구 시 살릴 것:
          <span style={{ fontWeight: 600 }}>연락처</span>
          <span>010-8807-6397</span> */}
        </div>
      </footer>
    </main>
  );
}
