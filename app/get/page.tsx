'use client';

import { useEffect, useState } from 'react';
import { androidStoreLive, storeLinks } from '@/lib/site';

// 광고 랜딩(구글 디맨드젠·카카오): 자동 리다이렉트를 쓰면 도착 도메인이
// dailyfitai.app → apple.com 으로 튀어 구글이 "도착 도메인 불일치"로 반려한다.
// 그래서 자동 이동을 제거하고 유저가 직접 누르는 버튼 페이지로 유지한다.
// (2026-07-04 현진 요청 — 광고 심사 요건.)
const IOS_URL = 'https://apps.apple.com/kr/app/dailyfit/id6773802603';
// 안드로이드: 앱 출시 전에는 사전신청 구글폼, 출시 후에는 Play 스토어(+referrer 귀속).
// 🚀 이 페이지 안에서는 ANDROID_APP_LIVE 하나가 **버튼 목적지·버튼 라벨·footer 개인정보
//   안내**를 제어한다. 다만 그 값의 **정본은 이 파일이 아니라 `lib/site.ts` 의
//   `androidAppLive`** 다 — 사이트 전체(스토어 배지·JSON-LD·llms.txt)가 같은 값에서
//   파생돼야 출시일에 한 곳만 켜고 나머지를 놓치는 일이 없다.
const AOS_FORM_URL = 'https://forms.gle/gUKFvTzUz2Sg5WDg7'; // 사전신청(출시 전)
const AOS_PLAY_URL = storeLinks.android; // 출시 후 (미출시면 빈 문자열 — 아래 스위치가 꺼져 안 쓰인다)
//
// ⏸️ 2026-08-17 false 로 되돌림 — 이 플립은 **전제가 아직 안 왔는데** 켜져 있었다.
//   8/8 에 true 로 머지됐으나(#42) 그 전제인 Play 프로덕션 승인은 7/30 에 거절됐고,
//   재신청 D-day 는 8/20 이었다(테스터 연속일 카운터 11/14, 8/17 기준).
//   ↑ 이 줄은 지난 이야기다. 현재(2026-09-02): 빌드 vc37 이 Play **프로덕션 draft** 로
//     올라가 있고 공개 URL 은 여전히 404 다 — 영우가 「출시 시작」을 누르면 200 이 된다.
//   그 9일간 라이브 실측: 버튼 라벨 "Android · 플레이스토어에서 받기" → 목적지
//   `play.google.com/…?id=kr.dailyfit.app` = **HTTP 404**. 초대 링크를 받은 안드로이드
//   사용자 전원이 막힌 페이지에 부딪혔고, 그들은 이유를 남기지 않고 이탈한다.
//   (`/get` 은 noindex 라 검색 유입엔 무영향 — 영우가 직접 보낸 링크만 해당됐다.)
//
// 🔴 2026-09-02: 이 상수는 **더 이상 여기서 정의하지 않는다.** 출시 스위치가 이 파일에만
//   있어서, 같은 날 함께 뒤집혀야 할 네 곳(`storeLinks.android` · JSON-LD `sameAs` ·
//   `mobileAppJsonLd().operatingSystem` · `/llms.txt`)이 뒤에 남는 구조였다.
//   정본은 `lib/site.ts` 의 `androidAppLive` 하나이고, 켜는 조건(공개 Play URL 200)과
//   그 조건을 실측하는 가드도 거기 주석에 적혀 있다. 여기서는 읽기만 한다.
//   🔴 읽는 값은 `androidAppLive` 가 아니라 **`androidStoreLive`** 다 — env 오버라이드가
//   그 사이에 끼기 때문에, 저작 스위치를 직접 읽으면 이 버튼만 뒤에 남는다(뮤테이션 실측).
const ANDROID_APP_LIVE = androidStoreLive;

const INK = '#1E2D40';
const SAGE = '#4A7C59';
const CREAM = '#F5F0E8';

export default function GetPage() {
  // UTM(쿼리스트링)은 iOS 목적지에만 전달. forms.gle(안드)에는 붙이지 않음 —
  // 원본 로직 유지. 자동 이동이 없어졌으므로 버튼 href에 마운트 후 부착한다.
  const [iosHref, setIosHref] = useState(IOS_URL);
  const [aosHref, setAosHref] = useState(ANDROID_APP_LIVE ? AOS_PLAY_URL : AOS_FORM_URL);
  useEffect(() => {
    const qs = window.location.search; // includes leading '?' or ''
    if (qs) setIosHref(IOS_URL + qs);

    // 안드 UTM 귀속: 앱 출시 후 Play 링크에 referrer(UTM 인코딩)를 붙여 Install Referrer
    // API 로 설치→가입 채널 귀속이 이어지게 한다. referrer 는 통째로 1개 파라미터라 내부
    // &,= 를 encodeURIComponent 로 재인코딩(백엔드 adlink.py /l/ 의 referrer 규약과 동일).
    if (ANDROID_APP_LIVE) {
      try {
        const src = new URLSearchParams(qs);
        const ref = new URLSearchParams();
        for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid']) {
          const v = src.get(k);
          if (v) ref.set(k, v);
        }
        const refStr = ref.toString();
        // 🔴 `&referrer=` 를 하드코딩하지 않는다. AOS_PLAY_URL 은 이제 env 로 갈아끼울 수
        //    있고(`storeLinks.android`), 쿼리스트링이 없는 URL 이 오면 `&` 가 첫 파라미터를
        //    망가뜨려 Install Referrer 귀속이 조용히 죽는다. URL 로 조립하면 ?/& 를 알아서 고른다.
        if (refStr) {
          try {
            const u = new URL(AOS_PLAY_URL);
            u.searchParams.set('referrer', refStr);
            setAosHref(u.toString());
          } catch {
            setAosHref(AOS_PLAY_URL);
          }
        } else {
          setAosHref(AOS_PLAY_URL);
        }
      } catch {
        /* referrer 부착 실패 시 순수 Play 링크로 폴백 */
      }
    }

    // 광고 클릭 계측 — utm(또는 gclid) 있는 방문=광고 유입 도착만 백엔드 /l/ 에
    // fire-and-forget 비콘 → ad_click 이벤트로 /admin/data/ads 에 집계. 이 페이지는
    // 랜딩(자동 이동 없음)이라 리다이렉트가 아니라 로드 시점에 1회 기록. no-cors GET
    // 이라 CORS 설정 불필요, keepalive 로 이탈해도 완주. 실패는 무시(광고 UX 무영향).
    try {
      const p = new URLSearchParams(qs);
      if (p.get('utm_source') || p.get('gclid')) {
        fetch('https://api.dailyfitai.app/l/get' + qs, { mode: 'no-cors', keepalive: true });
      }
    } catch {
      /* 계측 실패 무시 */
    }
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
            href={aosHref}
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
            {ANDROID_APP_LIVE ? 'Android · 플레이스토어에서 받기' : 'Android · 사전신청 하기'}
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
          {/* 출시 전 = 사전신청 폼으로 이름·연락처를 수집하므로 그 고지가 필요.
              출시 후 = 이 페이지는 스토어로 보내기만 하고 아무것도 수집하지 않는다 →
              같은 문구를 남겨두면 사실과 다른 고지가 된다(광고 심사·PIPA 양쪽에서 리스크).
              ANDROID_APP_LIVE 하나로 함께 뒤집히게 묶어 둔다. */}
          {ANDROID_APP_LIVE ? (
            <>
              이 페이지는 앱 설치 안내만 제공하며 개인정보를 수집하지 않습니다.
              앱에서 수집·이용하는 항목은{' '}
            </>
          ) : (
            <>
              Android 사전신청 시 수집 항목은 이름·연락처이며, 출시 안내 목적으로만
              이용하고 목적 달성 시 지체 없이 파기합니다. 본인 동의 없이 제3자에게
              제공하지 않습니다. 자세한 내용은{' '}
            </>
          )}
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
