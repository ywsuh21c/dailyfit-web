import Script from 'next/script';

/**
 * Google Analytics 4.
 *
 * ── 왜 GA4인가 (현진 결정 2026-08-04) ───────────────────────────────────────
 * 직전 구현은 Plausible(무쿠키·유료 $9/월)이었는데, 계정이 없어 env 가 비어
 * 있었고 그래서 **라이브에 측정 스크립트가 한 줄도 없었다** — 지금까지 웹
 * 방문자 수를 아무도 모르는 상태였다. 새 유료 계정을 트는 대신 무료인 GA4로
 * 간다. 트레이드오프는 쿠키다 — 아래 PIPA 항목 참고.
 *
 * ── ENV 게이트 (스왑 심) ────────────────────────────────────────────────────
 * NEXT_PUBLIC_GA_MEASUREMENT_ID 가 없으면 **아무것도 렌더하지 않는다** —
 * 로컬 개발과 미설정 상태에서 추적 스크립트도, 네트워크 호출도 0. 벤더를
 * 갈아끼울 땐 이 컴포넌트 하나만 교체하면 된다(Plausible → GA4 도 그렇게 했다).
 *
 * ── 이 작업(검색 노출)과의 연결 ─────────────────────────────────────────────
 * GA4 는 유입 도메인을 기록하므로 보고서 > 획득 > 트래픽 획득에서
 * chatgpt.com · perplexity.ai · gemini.google.com 을 필터하면
 * **AI 답변엔진에서 넘어온 방문**을 그대로 볼 수 있다. 검색엔진 유입은
 * google / naver / bing 소스로 잡힌다. 별도 배선이 필요 없다.
 *
 * ── PIPA 주의 (미해결, 법무 판단 필요) ──────────────────────────────────────
 * GA4 는 쿠키를 쓴다. 개인정보처리방침의 쿠키·국외이전 항목이 이 사실과 맞는지
 * 확인이 필요하고, 동의 배너가 필요한지도 판단 사항이다. 그때까지의 최소
 * 안전조치로 Consent Mode v2 기본값을 잡아둔다:
 *   · ads_storage / ad_user_data / ad_personalization = denied
 *     → 광고 리마케팅용 식별자를 만들지 않는다.
 *   · analytics_storage = granted → 이걸 막으면 측정 자체가 안 된다.
 * 동의 배너를 붙이기로 하면 배너 응답에서 gtag('consent','update',…) 만
 * 호출하면 되도록 기본값을 이 형태로 잡아뒀다.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'granted'
          });
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
