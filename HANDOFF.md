# HANDOFF — dailyfit-web (Full Launch Homepage)

_작성: 2026-06-11 · 목적: 새 Claude Code 세션이 이 진행 상태에서 그대로 이어받기 위한 단일 인수인계 문서._

> **이 문서 하나만 읽고 시작해도 됩니다.** 코드 위치, 승인된 디자인 방향, 절대 규칙,
> 막힌 지점, 다음 작업이 전부 아래에 있습니다. 막연한 "셋업 필요" 대신 정확한 경로와 명령을 적었습니다.

---

## 0. 30초 요약 (두괄식)

- **무엇**: DailyFit 풀 런칭용 마케팅 홈페이지(v2). 프로덕션 도메인 `dailyfitai.app`. 런칭 시 기존 정적 랜딩을 DNS cut-over로 교체.
- **목표 시점**: 앱 풀 런칭 **2026년 6월 말 경** (홈페이지는 그 시점에 베타 랜딩을 대체).
- **지금 상태**: Next.js 15 스캐폴드가 **빌드는 통과**하지만 *공용 백본(shared backbone)* 6개 라우트만 존재. 승인된 디자인(Option B 회사사이트 구조)의 페이지들은 **아직 코드로 안 옮겨짐**.
- **승인된 방향**: Option B "회사 사이트 = 루트 / 제품 페이지 = 우상단 버튼" 구조. Michael이 mockup 단계에서 승인함. 단 **최종 락은 아니었고**, 원래는 베타 데이터(~7/25)를 보고 확정하기로 했음 → **런칭이 6월 말로 당겨졌으니 이 타이밍 충돌을 Michael에게 먼저 확인할 것** (§6).
- **가장 큰 갭**: 승인된 10페이지 HTML 프로토타입이 **현재 워킹트리에 없음**(삭제됨). git 히스토리에서 복원 가능 (§3).
- **막힌 것**: 배포·CMS·폼은 전부 Michael의 **계정 발급** 대기 (§5). 코드로 못 푸는 부분.

---

## 1. 두 개의 산출물 — 위치와 상태

이 작업은 **별개의 두 곳**에 흩어져 있습니다. 둘 다 실재합니다.

### (A) 코드 — `~/Hive-work/dailyfit-web/` ← 지금 이 repo
- Next.js 15 App Router + TS strict + Tailwind v3.4 + pnpm.
- `pnpm build` ✓ · `pnpm typecheck` ✓.
- **git: 로컬 `main`, 커밋 1개(`9096ef0` shared-backbone scaffold), 원격 미연결(no remote).**
- 기존 v1 정적 랜딩은 **다른 repo** `~/Hive-work/dailyfit-website/` (`ywsuh21c/dailyfit-website`, 764KB index.html) — 런칭까지 공존, 건드리지 말 것.

**현재 라우트 (6개, 전부 공용 백본):**
```
app/(marketing)/page.tsx          /            Home (Option-A 임시 — 교체 대상)
app/(marketing)/about/            /about
app/(marketing)/technology/       /technology  (7섹션)
app/(marketing)/investors/        /investors   (6섹션, noindex)
app/(marketing)/trends/           /trends      (Sanity 연결 전 EmptyState)
app/en/investors/                 /en/investors (영문 단일 미러)
lib/site.ts                       사이트 config + nav (Option A/B 스왑 지점)
components/ui/                     Button · Section · States(Loading/Error/Empty)
components/layout/                 Nav · Footer
```

**이미 된 것 (재작업 금지):**
- LOCKED `brand.md` 토큰 → Tailwind + CSS vars
- 시니어 a11y 베이스라인 (본문 18px · tap 48px · 행간 1.8 · `word-break:keep-all` · skip link · focus-visible)
- Pretendard Variable **self-host** (`public/fonts/` — v1의 외부 CDN 의존 실패를 의도적으로 수정)
- Nav · Footer · 4-state UI(Loading/Error/Empty + icon/retry)
- robots(investors noindex) · sitemap · 404 · error boundary

### (B) 디자인 + 기획 — 오케스트레이터 워크스페이스 안
경로 베이스: `~/Hive-work/1. Entrepreneurship/2. Outputs/marketing-web/`

- **`2026-05-28-homepage-v2-planning/`** ← **현재 존재함**. 각 에이전트의 상세 빌드 스펙:
  - `summary.md` — 전체 플랜 (공용 백본 + 옵션별 작업 분해)
  - `frontend-engineer-setup-spec.md` — 스캐폴드/스택/i18n 스펙 (코드의 근거)
  - `option-b-web-designer-ia-wireframe.md` — **Option B 페이지별 IA·와이어프레임** (코드로 옮길 청사진)
  - `option-b-brand-designer-visual-system.md` — Option B 비주얼 시스템
  - `option-b-content-strategist-use-cases.md` — use-cases 페이지 카피
  - `option-b-sa-ai-first-framing.md` — AI-first 메시징 프레임
  - `cto-technology-page-scope.md` · `ir-investors-page-scope.md` — /technology, /investors 실제 카피 소스
  - (Option A 버전 파일들도 같이 있음: `web-designer-ia-wireframe.md`, `brand-designer-visual-system.md` 등)
- **`2026-05-31-web-homepage-mockups/`** ← **워킹트리에서 삭제됨. git 복원 필요 (§3).** 승인된 클릭형 HTML 프로토타입 10페이지.

---

## 2. 승인된 디자인 방향 — Option B "회사 사이트" 구조

2026-05-31에 Michael이 HTML mockup을 보고 잡은 방향. **단일 청자 원칙을 깨는 PYLER식 twin-homepage가 아니라**, 위계가 분명한 구조:

- **루트 `/` = 회사 사이트** (청자: VC·프레스·탤런트 = AI-savvy). 레퍼런스 = **Sierra** (Harvey/Cursor 류). Anthropic 아님 — DailyFit은 *응용* vertical-AI 회사로 프레임("한국 시니어를 위한 AI를 푼 팀"), "AI 연구 파워하우스" 과대주장 금지.
- **제품 페이지 = 우상단 단일 버튼**("제품 사용해보기")으로만 도달하는 고객(시니어) destination. Anthropic→Claude 패턴.
- **"Meet the agents" 섹션이 핵심** — 4 에이전트(Planner/Wellbeing/Companion/Memory, 잠정 네이밍) 이름+설명.
- **루트엔 시니어 2인칭 CTA 0개**. 단 시니어는 **3인칭 *증거***(트랙션·use-case 카드)로는 유지. (이 구분을 Michael이 명시 수용함.)
- 채용 레이어: `/how-we-work` + `/writing` + 팀 소개. **단 UNPROVEN 베팅** — 실제 오픈 포지션 확인 전 과투자 금지(VC 목표가 우선).
- 제품 버튼 라벨은 "제품 사용해보기"(회사명=제품명이라 "Try DailyFit" 회피). 앱 서브브랜드 네이밍은 backlog.

**승인된 페이지 셋 (회사 사이트):** Home(`option-b-v2-company-site.html`) · `technology` · `use-cases` · `about` · `how-we-work` · `writing` · `investors`
**제품 측:** `product-page-customer.html` (우상단 버튼으로 진입, 상단에 "← 회사 소개" 역링크)

> ⚠️ **mockup 단계 승인 ≠ 프로덕션 락.** Michael이 "나중에 페이지별로 더 손볼 거야"라고 했고, 디테일 폴리시 패스 전에 멈췄음.

---

## 3. ⚠️ 먼저 할 일 — 삭제된 mockup 복원

승인된 프로토타입 폴더가 워킹트리에 없습니다. git 히스토리(커밋 `59294482`)에 있으니 복원하세요:

```bash
cd "/Users/youngwoomichaelsuh/Hive-work/1. Entrepreneurship"
git checkout 59294482 -- "2. Outputs/marketing-web/2026-05-31-web-homepage-mockups/"
```

복원되는 파일 (11개):
```
option-b-v2-company-site.html   ★ 회사 사이트 Home (진입점 — 브라우저로 먼저 열어볼 것)
technology.html  use-cases.html  about.html  how-we-work.html  writing.html  investors.html
product-page-customer.html      ★ 제품(고객) 페이지
option-a-senior-first.html  option-b-ai-first.html   (구버전, 참고용)
summary.md                      (방향·검증·차이표 전체 정리)
```
`option-b-v2-company-site.html`을 브라우저로 열면 nav/footer/CTA로 전 페이지 클릭 이동됩니다. **이게 코드로 옮길 시각적 정답지입니다.**

---

## 4. 절대 규칙 (HARD RULES — 깨면 안 됨)

1. **fundraise 진행 노출 0.** 웹 어디에도 "We are raising / 투자 유치 중" 류 금지. `/investors`는 티저 + **founder 직접 컨택 CTA만**. (Michael 강한 reject 이력.)
2. **서피스당 단일 청자.** 루트=회사(AI-savvy), 제품 페이지=시니어. 한 페이지에 두 청자 섞지 말 것. **고객/투자자 트윈 홈페이지 절대 제안 금지** (PYLER 사고).
3. **루트 회사 페이지에 시니어 2인칭 CTA 금지.** "앱 받기" 류 제거. 시니어는 3인칭 증거로만.
4. **브랜드 토큰 LOCKED**: Sage `#4A7C59` · Navy `#1E2D40` · Ivory `#F5F0E8` · ink `#1A1A1A`. **Warm Amber `#D4A843`는 슬라이드 전용 — 웹 미사용.** lime 미사용.
5. **Pretendard self-host** (외부 CDN 의존 금지 — v1 실패 원인).
6. **시니어 a11y floor**: 본문 ≥18px, 행간 1.75–1.8, `word-break:keep-all`, tap ≥48px, `:active` scale.
7. **UI 카피·디자인 원칙**: 카피 간결 · 줄 wrap 회피 · 깔끔 · **PPT식 아이콘 절대 금지** · 의료/돌봄 이미지 0.
8. **로고**: 실제 자산 = `~/Hive-work/1. Entrepreneurship/4. Reference/Critical Docs/brand-assets/logo/` (Direction E "the bound page", Sage on Ivory, 2026-05-26 락). 마스터 SVG 인라인.

---

## 5. 계정/액션 블로커 — Michael만 가능 (코드로 못 푸는 것)

배포·CMS·폼·이메일은 전부 여기서 막힘. 코드를 다 짜도 이게 없으면 라이브 못 감.

| # | 블로커 | 결과물 |
|---|---|---|
| 1 | 도메인 DNS `dailyfitai.app` → Vercel 연결 | 프로덕션 도메인 |
| 2 | GitHub org `dailyfit` 생성 + 이 repo push | 원격/CI (현재 로컬 git만) |
| 3 | Vercel 프로젝트 + 결제 | 호스팅/staging |
| 4 | Sanity 프로젝트 (project id → `.env`) | CMS (trends/team/page) |
| 5 | Resend 가입 + DKIM/SPF DNS (`team@dailyfitai.app`) | 폼 메일 발송 |

> 막혔을 때 Michael에게 넘기는 방식: `/guide-me` 스킬로 클릭 단위 가이드 제공.

---

## 6. ⚠️ 결정 포인트 — 새 세션이 Michael에게 먼저 물을 것

원래 계획: Option A vs B 최종 확정은 **베타 데이터(~2026-07-25) 보고** 결정. 그동안은 *공용 백본*만 빌드.
그런데 **앱 풀 런칭이 6월 말로 잡혔음** → 홈페이지도 그때 라이브여야 함 → 데이터 트리거(7/25)보다 **빠름**.

**→ 충돌. 단독 결정 금지. 첫 응답에서 Michael에게 확인할 것:**
- "런칭이 6월 말이면 Option B 회사사이트 방향을 **지금 락**하고 빌드 들어갈까요, 아니면 런칭엔 v1 랜딩 유지하고 v2는 데이터 후로 미룰까요?"
- 옵션표 → 권고 → 멈춰서 확정받기 (단독 결정 금지 규칙).

---

## 7. 다음 작업 (Option B 락 가정 시, 우선순위순)

1. **mockup 복원**(§3) → `option-b-v2-company-site.html` 브라우저로 확인.
2. **Option B 페이지를 코드로 이식** — `option-b-web-designer-ia-wireframe.md` + 복원한 HTML을 정답지로:
   - Home `/` 교체 (현재 Option-A 임시본 → Option B 회사사이트), `lib/site.ts` nav를 Option B 구조로.
   - 신규 라우트 추가: `/use-cases` · `/how-we-work` · `/writing` · 제품 페이지(`/product` 또는 버튼 destination).
   - 기존 `/technology` `/investors` `/about`은 Option B 카피로 정렬(스펙 파일 참조).
3. **콘텐츠 펜딩(코드에 `TODO` 마킹된 것):**
   - `/investors`: 1,400만 수치 공개여부 · 팟캐스트 수치 · 정부 프로그램 · 베타 코호트 처리 · Calendly · 현진 사진/bio 동의
   - `/technology`: Sample Mockup · 아키텍처 다이어그램 (CTO 자산 대기)
   - Home: 앱스토어/플레이스토어 링크(PM) · 창업자/Trends preview 확장
4. **계정 발급 후(§5):** Vercel staging 배포 → Sanity 스키마(trendPost·teamMember·page·investorMomentum) + GROQ + ISR → 폼 3종(beta-signup·newsletter·investor-contact) + Postgres + Resend + zod.
5. **i18n**: 현재 next-intl 미도입(`/en/investors` 단일 미러만). 영문 확장 시 도입 (setup-spec §5). 라우팅 구조는 이미 호환.

---

## 8. 빠른 시작 명령

```bash
# 코드
cd ~/Hive-work/dailyfit-web
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # 프로덕션 빌드 확인
pnpm typecheck

# 승인된 디자인 정답지 복원 + 열기
cd "/Users/youngwoomichaelsuh/Hive-work/1. Entrepreneurship"
git checkout 59294482 -- "2. Outputs/marketing-web/2026-05-31-web-homepage-mockups/"
open "2. Outputs/marketing-web/2026-05-31-web-homepage-mockups/option-b-v2-company-site.html"

# 빌드 스펙 읽기
open "2. Outputs/marketing-web/2026-05-28-homepage-v2-planning/option-b-web-designer-ia-wireframe.md"
```

---

## 9. 참고 문서

- 이 repo: `README.md`, `.env.example`
- 빌드 스펙: `…/2026-05-28-homepage-v2-planning/frontend-engineer-setup-spec.md`
- 방향·검증 정리: `…/2026-05-31-web-homepage-mockups/summary.md` (복원 후)
- 오케스트레이터 규칙: `~/Hive-work/1. Entrepreneurship/CLAUDE.md`
