# Handoff — dailyfit-web 홈 리디자인 세션 인계 (2026-06-30)

**From:** 영우 (영우 맥에서 진행) · **To:** 현진
**Branch:** `feat/web-redesign-feedback-20260629` (origin 푸시됨)

## 지금 상황 (먼저 읽기)
- 영우가 6/29~30에 **회사 홈(dailyfit-web)** 게이미피케이션 리디자인에 피드백 8건을 줬고, **그중 7건은 내가(영우 세션) 반영해 이 브랜치에 커밋**했음.
- **남은 2건이 네 영역이라 너한테 인계** — ① 백엔드 count 엔드포인트+배포, ⑥ 레벨 아바타 아트 재제작.
- 작업 기준 = **게이미피케이션 draft**(`feat/web-gamification-design-draft`)에서 갈라진 브랜치. 그래서 **origin/main보다 뒤처짐**(CVE 패치·PR#8 webapp버튼·PR#7 약력 미포함) — 마무리 시 `origin/main` 머지 필요.

## 실행 / 프리뷰
- clone `ywsuh21c/dailyfit-web` → `git checkout feat/web-redesign-feedback-20260629` → `git merge origin/main`(CVE 패치 등 받아오기) → `pnpm install && pnpm dev`.
- (영우 맥에서 cloudflared 터널로 임시 라이브 프리뷰 중이지만 영우 세션 끝나면 죽음 — 너는 로컬 dev로 봐.)

## ✅ 반영 완료 (이 브랜치, 영우 6/29~30 피드백)
- **7** "흉내낼 수 없는 세 가지"(moat 자랑) 섹션 **삭제** — 브랜드 태그라인 "AI는 수단, 시니어가 정체성"만 보존.
- **8** 리텐션 헤드라인 "다시 오게 만드는 건, 캐릭터입니다" → **"캐릭터와 함께, 매일이 이어집니다"** (자뻑/해자-구걸 톤 제거).
- **3** 홈 티커: 가짜 활동명(한옥공예·AI교실·와인시음 등) + 거짓 "live" 라벨 → **prod `/api/activities`에서 확인한 실제 카탈로그 활동** + "활동 카탈로그 · 지금 등록된 실제 활동" 라벨. (`app/(marketing)/page.tsx` TICKER)
- **2** 탭 favicon: 옛 '묶인 페이지' 마크 제거 → **새 마스코트**(`public/brand/dailyfit-icon.png` → `app/icon.png`·`apple-icon.png`).
- **5** what-we-build 채팅: "어제 산책 어땠어요?" → **선제 추천형**(날씨+과거활동 기반, 실제 프로그램 '이것만 알면 나도 사진작가' 추천, 신청대행 멘트). 히어로 콘솔도 가짜 "한옥공예 입문(송파여성문화회관)" → 실제 "바리스타 취미반".
- **4** what-we-build 2단 → **그래픽(대화 카드) 단독 섹션 먼저 + 카피 단독 섹션** 으로 분리.
- **6(부분)** 레벨 카드 순서 임의(Lv3·2·4) → **오름차순(Lv2→3→4)** 버그 수정 (`components/gami/parts.tsx` SAMPLE) + "레벨↑=캐릭터 꾸미기" 카피 (`components/gami/RetentionEngine.tsx`).

## 🟡 남은 일 (네 결정·작업)

### ① 활동 수 실시간 연동 (백엔드 — 네 영역)
- 현재 홈 "활성 활동 카탈로그" 숫자 = **하드코딩 `5207`** (`lib/site.ts` `activeCatalogCount`). 실시간 아님(라이브는 이미 5,195로 어긋남).
- 영우 결정 = **(a) 빌드 때 실제 count 가져와 "기준일" 표기** (진짜·자동갱신).
- 필요: **공개 count 엔드포인트 신규**(예 `GET /api/activities/count` → `{active, as_of}`) + **prod API 배포**(Cloud Run `dailyfit-api`, asia-northeast3, project dailyfit-499109). 그 뒤 마케팅 사이트가 빌드 때 fetch.
- ⚠️ **prod API 배포 주의**: prod 코드 기준(현재 main/배포 리비전)에서만. 영우 맥 트리는 main보다 17커밋 뒤(딴 브랜치)라 거기서 배포 시 prod 롤백 위험 — clean origin/main에서 할 것.
- (지금 browse `/api/activities`는 게스트 헤더 `X-Guest-Session` 필요 + 페이지네이션이라 total 안 줌. self_supply·인기 플래그도 공개 미노출 → 카운트/필터 엔드포인트가 있어야 함.)

### ⑥ 레벨 아바타 아트 재제작 (디자인 — 네 영역)
- 코드 순서·카피는 "레벨↑=꾸미기"로 맞췄는데 **실제 아바타 아트가 거꾸로**: `public/brand/levels/health-1.png`(점프로프·아령·재킷 등 많이 차려입음)가 `health-5.png`(헤드밴드·수건)보다 **더 꾸며져 있음**.
- 진짜 "레벨 오를수록 멋지게 꾸며진다"를 보여주려면 **아바타 15종**(health/hobby/learn × Lv1~5) 재제작 = 레벨↑일수록 아이템·꾸밈↑. (앱 `apps/mobile/assets/brand/*`와 1:1 미러라 앱이랑 같이 가야 함.)

## ⚠️ 지뢰
- **게시(Netlify `dailyfit-beta`)는 영우만** — `main` 머지가 배포 트리거. 너 push/PR은 OK, 최종 머지는 영우.
- **단일 청중**(루트=AI-savvy / `/product`=시니어, 루트엔 시니어 2인칭 CTA 0) · **펀딩 모금 문구 0** · 약력 IMM PE 제외(`Bain → PYLER`).
- 디자인 시스템: 라이트 테마·sage/ink/ivory 토큰·CSS-only 모션. 새 무거운 의존성·구조 재설계 금지.

## 마무리 경로
①⑥ 처리 → `origin/main` 머지 → `main` 대상 PR → 영우 리뷰·머지 → Netlify 자동 배포.
