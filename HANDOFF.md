# HANDOFF — dailyfit-web

_Last updated: 2026-05-31 · Shared-backbone scaffold complete & building._

## 무엇이 되어 있나 (this session)

빌드 통과하는 **shared-backbone 스캐폴드**. 플랜의 "옵션 A/B 결정 없이 지금 빌드 가능"
범위. `pnpm build` ✓ · `pnpm typecheck` ✓ · 9개 정적 라우트.

- Next.js 15 + TS strict + Tailwind + pnpm 셋업
- LOCKED brand.md 토큰 → Tailwind + CSS vars (Amber 슬라이드전용 제외, lime 제외)
- 시니어 a11y 베이스라인 (18px 본문 · 48px tap · keep-all · skip link · focus-visible)
- Pretendard Variable **self-host** (`public/fonts/` — v1의 외부 CDN 의존 실패 수정)
- Nav · Footer · 4-state 컴포넌트(Loading/Error/Empty, icon+retry) — v1 실패 가드 반영
- 페이지: `/` `/about` `/technology`(7섹션) `/investors`(6섹션) `/en/investors` `/trends`
- `/investors` · `/technology`는 플래닝 산출물의 **실제 카피** 적용
- robots(투자자 noindex) · sitemap · 404 · error boundary

## 의도적으로 단순화한 것

- **i18n**: full next-intl 미도입. `/en/investors`만 단일 미러(`lang="en"` 래퍼).
  영문 페이지 확장 시 next-intl 도입 (setup-spec §5). 라우팅 구조는 이미 호환.
- **Sanity/Resend/Postgres**: 코드 미연결. 계정 발급 후 붙임. `.env.example` 참조.

## 계정/액션 블로커 (Michael — 코드로 못 푸는 것)

1. **도메인 DNS** — `dailyfitai.app` → Vercel 연결 (Tier-1 결정 C에서 확정)
2. **GitHub org** `dailyfit` 생성 + 이 repo push (현재 로컬 git만)
3. **Vercel** 프로젝트 + 결제
4. **Sanity** 프로젝트 (project id → `.env`)
5. **Resend** 가입 + DKIM/SPF DNS (`team@dailyfitai.app`)

## 카피/콘텐츠 펜딩 (코드에 `TODO`로 마킹)

- `/investors`: 1,400만 수치 공개(D1) · 팟캐스트 수치(D2) · 정부 프로그램(D3) ·
  베타 코호트 처리(D4) · Calendly(D5) · 현진 사진/bio 동의
- `/technology`: M1 Sample Mockup · M2 아키텍처 다이어그램 (CTO 자산)
- `/`: 앱스토어/플레이스토어 링크(PM) · 창업자/Trends preview 섹션 확장
- **HARD RULE 준수됨**: web에 fundraise "We are raising" 언급 0 — founder 직접 컨택만

## 다음 작업 후보

1. Michael 계정 셋업(위 5건) → Vercel staging 배포
2. Sanity 스키마 빌드(trendPost·teamMember·page·investorMomentum) + GROQ + ISR
3. 폼 3종(beta-signup·newsletter·investor-contact) + Postgres + Resend + zod
4. Option A/B Home hero swap (베타 데이터 +2~4주 후 결정)
