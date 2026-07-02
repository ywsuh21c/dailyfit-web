# Handoff — DailyFit 웹 프론트엔드 디자인 인수 (2026-06-25)

**From:** 영우 (Youngwoo) · **To:** 현진 (이제부터 웹 프론트엔드 디자인 오너)

## TL;DR
- 너가 회사 웹사이트(`dailyfit-web`)의 **프론트엔드 디자인**을 이어받는다.
- 목적: **투자자 + 우리 서비스에 관심 있는 사람**에게 DailyFit이 *AI-네이티브하고 기술 중심인 회사*임을 보여주기.
- **지금 라이브가 아니라 draft 브랜치**에서 이어서 작업. 아래 디자인 4건 + 컴플라이언스 2건.
- **너는 배포 안 한다.** 다 되면 PR 열고 영우에게 넘김 — 게시는 영우만 가능(Netlify).

## 레포 & 실행
- 경로: `~/Hive-work/dailyfit-web` (앱 코드와 별개 레포 · Next.js 15 App Router · pnpm)
- 작업 브랜치: **`feat/web-gamification-design-draft`** (영우가 방금 리뷰한 그 리디자인. HOLD 해제됨)
- 실행: `pnpm install && pnpm dev` → http://localhost:3000
- 구조(락): **Option B** — 루트 `/` = 회사 사이트(AI-savvy 청중), `/product` = 고객 랜딩. **화면당 단일 청중**(트윈 홈페이지 금지).

## 라이브 vs 네가 편집할 것
- **LIVE (`dailyfitai.app`) = `main`** — 현재의 단순한 홈(게이미피케이션 리디자인 없음).
- **DRAFT = `feat/web-gamification-design-draft`** — 마스코트 + 캐릭터/레벨 게이미피케이션 + BM 반영. **이걸 발전시킨다.**
- 이 브랜치는 main 대비 **4 ahead / 4 behind**. 시작할 때 **`origin/main`을 먼저 머지**해서 CVE 패치(next 15.1.12 / react 19.2.7) + CS 변경을 받아와라.

## 작업 (영우 피드백)

### 1. 타이포 · 숫자 일관성
- 폰트는 **이미 단일**이다 (Pretendard Variable — `app/layout.tsx:8`, tailwind `fontFamily.sans`). 문제는 **폰트 패밀리가 아니라** 섹션마다 제각각인 **굵기·크기 스케일** + **숫자 정렬**.
- 헤딩/본문 타입 스케일 통일. 모든 수치에 **`tabular-nums`** 적용 — 메트릭 스트립, `CountUp`(TractionItem), `parts.tsx:44`의 `Lv.` 숫자. 읽기 쉽고 아름답게.

### 2. 실제 앱을 더 보여주기 (네가 디자인한 컴포넌트)
- `public/screenshots`·`public/media` 폴더가 **아직 없다** — 만들고 실제 앱 스크린샷을 넣어라.
- 히어로의 "콘솔"은 목업 — 실제 앱 UI로 교체/보강.
- 게이미피케이션은 이미 `apps/mobile/src/v2/level/LevelHome.tsx` + `apps/mobile/assets/brand/*`를 1:1 미러링 중. **네가 만든 실제 앱 화면/컴포넌트**를 홈 히어로 + `/product`에 가져와라.
- 이유: 투자자·관심자가 추상적 카피가 아니라 **잘 만든 제품**을 봐야 한다.

### 3. 영문 버전 (중요)
- 현재 `app/en/`엔 `layout.tsx` + `investors`뿐. `/en` 인덱스는 404.
- **i18n 라이브러리 없음** — `app/en/` 하위에 라우트를 **수동 복제**하는 구조.
- 핵심 페이지(`home`·`product`·`technology`·`use-cases`·`how-we-work`·`about`)의 `/en` 미러를 만들고 nav에 연결. → AI-네이티브/기술 중심 시그널. (페이지별 독립이라 병렬화하기 좋음.)

### 4. 에이전트 레벨 순서 버그
- `components/gami/parts.tsx:63` `SAMPLE = [health Lv3, hobby Lv2, learn Lv4]` → **임의 순서**.
- 레벨이 오를수록 캐릭터가 **더 잘 차려입은** 것처럼 보여야 하므로, 깔끔한 **상승 progression**으로 정렬(또는 그렇게 읽히도록 재구성).
- 참고: 같은 파일 `LevelUpStrip`(`parts.tsx:82`, `health-1..5.png`, 1→5)은 **이미 올바른 순서** — 이걸 본보기로.

## 컴플라이언스 (깨지 말 것)
- **약력:** `app/(marketing)/page.tsx:381` `"Bain → PE → PYLER"` → **`"Bain → PYLER"`** (IMM PE / "PE" 제외 — 영우 공식 이력 규칙). `/en` 약력도 동일.
- **펀딩 모금 문구 0** (라운드·금액·"we're raising" 등 금지). 창업자 컨택 CTA만.
- **화면당 단일 청중** — 루트엔 시니어 2인칭 CTA 0 (시니어는 3인칭 "증거"로만). `/product`만 시니어 청자.
- 미해결 자산 TODO(`page.tsx:378`): 창업자 사진 + 현진 bio/사진 게재 동의.

## 디자인 시스템 (이미 깔려 있음 — 여기 맞춰)
- 테마: 따뜻한 에디토리얼 **라이트** (Sierra풍). 다크는 에이전트 콘솔·푸터만.
- 팔레트 토큰: `sage / ink / ivory / surface / line` (`app/globals.css`, `tailwind.config.ts`).
- 모션: **CSS-only** (`Reveal`·`CountUp`·`char-float`·ticker). 무거운 새 의존성 금지.

## 다 되면 → 영우에게 넘기기 (게시 게이트)
- **너는 배포 안 한다.** 게시는 **Netlify**(프로젝트 `dailyfit-beta`)로 나가고, **영우만** 인증된 계정 + 인식되는 git contributor다. (Netlify 무료플랜: 영우 외 커밋은 preview에서 "Unrecognized Git contributor"로 막힐 수 있음 — production은 영우의 main 머지로 트리거.)
- 절차:
  1. 브랜치에 커밋 → push → `github.com/ywsuh21c/dailyfit-web`에 **main 대상 PR** 오픈.
  2. 로컬 **`pnpm build` 통과** 확인(19+ 라우트 prerender).
  3. 영우에게 **PR 번호 + 한 줄 변경 요약** 전달.
- 영우가 머지 → Netlify 자동 빌드·배포 → `dailyfitai.app` 갱신(~1분).
- (네 일 아님) 스토어 다운로드 링크 플립 = 앱 공개 시 영우의 env 작업.

## Definition of Done (PR 기준)
- [ ] 타이포/숫자 스케일 통일 + tabular numerals
- [ ] 홈 + `/product`에 실제 앱 스크린샷/컴포넌트
- [ ] 핵심 페이지 `/en` 미러 + nav 연결
- [ ] 레벨 카드가 깔끔한 상승 progression으로 정렬
- [ ] 약력 수정(IMM PE 제외) · 펀딩 문구 0 · 단일 청중 유지
- [ ] `pnpm build` green

---

## ▶ Claude Code 시작 프롬프트 (이 파일과 한 세트 — 그대로 붙여넣기)

```
DailyFit 회사 웹사이트(dailyfit-web)의 프론트엔드 디자인을 이어받아 진행해줘. 이 사이트의
목적은 투자자와 우리 서비스에 관심 있는 사람들에게 DailyFit이 AI-네이티브하고 기술 중심인
회사임을 보여주는 거야. 영우가 리뷰한 리디자인 draft에서 이어서, 아래 4가지를 반영하면 돼.

시작 전에 전체 맥락·정확한 파일 위치·제약·게시 절차가 정리된 핸드오프를 읽어:
  ~/Hive-work/dailyfit-web/HANDOFF-frontend-design-20260625.md

작업 브랜치: feat/web-gamification-design-draft. 시작 시 origin/main을 먼저 머지해 CVE
패치·CS 변경을 받아와. 실행: pnpm install && pnpm dev.

여러 파일에 걸친 디자인 인수라 판단이 필요해 — plan 모드로 시작해서 현재 상태를 훑고
변경안을 먼저 제시한 뒤 편집해. think hard.

1. 타이포·숫자 일관성: 폰트는 이미 Pretendard 단일(app/layout.tsx). 문제는 섹션마다 제각각인
   굵기·크기 스케일 + 숫자 정렬. 헤딩/본문 스케일 통일하고 모든 수치(메트릭 스트립·CountUp·
   parts.tsx:44 Lv. 숫자)에 tabular-nums 적용. 읽기 쉽고 아름답게.
2. 실제 앱 노출: public/screenshots·media 폴더가 없으니 만들고 실제 앱 스크린샷을 넣어.
   히어로 콘솔은 목업이니 실제 앱 UI로 교체/보강. 게이미피케이션은 이미
   apps/mobile/src/v2/level/LevelHome.tsx를 미러링 중 — 네가 만든 실제 앱 컴포넌트/화면을
   홈과 /product에 가져와.
3. 영문 버전(중요): 지금 app/en엔 layout+investors뿐(/en은 404). i18n 라이브러리 없이
   app/en/ 하위에 라우트를 수동 복제하는 구조야. 핵심 페이지(home·product·technology·
   use-cases·how-we-work·about)의 /en 미러를 만들어 nav에 연결. 페이지별로 독립적이니
   서브에이전트로 병렬 처리하면 빨라.
4. 레벨 순서 버그: components/gami/parts.tsx:63 SAMPLE이 [health Lv3, hobby Lv2, learn Lv4]로
   임의 순서야. 레벨이 오를수록 캐릭터가 더 잘 차려입은 것처럼 보여야 하니 깔끔한 상승
   progression으로 정렬해. 같은 파일 LevelUpStrip(1→5)은 이미 올바른 순서니 본보기로.

지키기: 약력 page.tsx:381 "Bain → PE → PYLER" → "Bain → PYLER"(IMM PE 제외, /en도). 펀딩
모금 문구 절대 금지(창업자 컨택 CTA만). 화면당 단일 청중(루트=AI-savvy/ /product=시니어,
루트엔 시니어 2인칭 CTA 0). 기존 디자인 시스템(라이트 테마·sage/ink/ivory 토큰·CSS-only
모션) 안에서. 새 무거운 의존성·사이트 구조 재설계 금지 — 위 4가지 + 시각 폴리시에 집중.

배포는 하지 마. 다 되면 pnpm build 통과 확인 후 github.com/ywsuh21c/dailyfit-web에 main 대상
PR을 열고, PR 번호 + 한 줄 요약을 영우에게 전달해. 게시(Netlify)는 영우만 권한이 있어.
```
