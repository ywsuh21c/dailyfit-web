# HANDOFF — dailyfit-web (Full Launch Homepage)

_갱신: 2026-06-15 · **이 문서가 최신.** 2026-06-11 버전(A/B 결정 대기·원격 없음)은 폐기됨 — 그 사이 Option B 락인 + GitHub 푸시 + 12개 페이지 빌드까지 진행됨._

> 새 세션은 **이 repo(`~/Hive-work/dailyfit-web`)를 열고 이 문서만 읽으면** 이어받을 수 있습니다.
> 직전 작업 세션(claude.ai/code, 모델 "Fable 5")이 도구 결과 직후 **멈춰서** 핸드오프를 못 남겼고,
> 이 문서는 그 세션의 git 산출물 + 트랜스크립트를 역추적해 2026-06-15에 재구성한 것입니다.

---

## 0. 30초 요약 (현재 상태)

- **무엇**: DailyFit 풀 런칭용 회사 홈페이지(Option B). prod 도메인 `dailyfitai.app`. 출시 ~2026년 6월 말.
- **코드**: `~/Hive-work/dailyfit-web` — Next.js 15. **GitHub `ywsuh21c/dailyfit-web`에 푸시 완료**(origin/main = 로컬, 0/0). 워킹트리 clean. 12개 페이지 빌드됨.
- **방향**: **Option B 락인** (루트 = 회사 사이트 / 시니어 제품 페이지는 우상단 버튼 뒤). A/B 고민 끝남.
- **검증**: 직전 세션에서 `/verify`(실브라우저) + `/code-review`(10건→11픽스) 통과. 그 후 코드 변경 0이라 여전히 green일 것(새 세션은 `pnpm build`로 1회 재확인 권장).
- **Writing CMS-lite + Analytics = ✅ 완료 (2026-06-15, 커밋 `f878032`)**: 파일 기반 글 시스템(`/writing/[slug]`) + Plausible env-gated 래퍼 구현·푸시. '전면 사이트 편집화'는 Michael 결정으로 보류("Writing만 가볍게"). 상세 §5.
- **라이브까지 막힌 것**: Vercel 연결 → DNS → (Sanity·Resend) 계정. 전부 Michael 액션 (§6).

---

## 1. 현재 코드 상태 (ground truth)

- repo: `~/Hive-work/dailyfit-web`, 브랜치 `main`, remote `github.com/ywsuh21c/dailyfit-web` (푸시 완료).
- 최신 커밋 `4b809fe fix(review)`. 이력(오래된→최신):
  - `9096ef0` 공용 백본 스캐폴드
  - `f249f72` 풀런칭 Home — "agent-runtime" 비주얼 (Option B, 처음엔 다크)
  - `bf9875b` **light-first 리테마 + 모션 5종** (Michael 6/11 피드백)
  - `bb2b3d8` **phase 2 — Option B 전체 페이지 셋 + Sijo/Minyo/Pansori 에이전트 패밀리**
  - `df153e5` favicon(`app/icon.svg`) — 유일한 404 제거
  - `4b809fe` 코드리뷰 11픽스 (a11y 18px·legal 404·앵커·perf·5207 단일상수 등)
- **페이지 12개**: `/` · `/technology` · `/use-cases` · `/about` · `/how-we-work` · `/writing` · `/investors` · `/product`(시니어 전용, 자체 chrome) · `/privacy` · `/terms` · `/trends`(→ `/writing` 리다이렉트) · `/en/investors`(영문 미러).
- **컴포넌트**: `home/AgentConsole`(15s 루프+타이핑) · `motion/Reveal` · `motion/CountUp` · `brand/BrandMark` · `(product)/layout`(제품측 별도 chrome). `app/globals.css`에 비주얼 언어 토큰·모션 전부.

---

## 2. 락인된 결정 (코드만 봐선 놓치는 "왜")

1. **Option B 락인 (Michael 6/11).** 루트=회사(VC·프레스·AI-savvy), 제품(시니어)은 우상단 "제품 사용해보기" 버튼 뒤. 5/31 mockup의 **콘텐츠·IA·하드룰은 유지, 비주얼 언어만 교체**(다크→라이트). nav = Product / Technology / Use cases / Company▾(About·How we work·Writing·Investors). 패턴=Linear/Cursor/Anthropic.
2. **에이전트 리네이밍 → Sijo·Minyo·Pansori (시조·민요·판소리), 락인.** 기존 이름은 **사람 이름(Mikyung/Yunmok/Youngwoo)**이었고, Michael이 "Anthropic이 Sonnet→Opus 하듯 **스토리텔링 되는** 이름"을 원함. 채택된 논리 = 한국 시가 스케일이 자율성 티어에 매핑:
   - **Sijo 시조** = Discovery(짧고 정밀한 탐색)
   - **Minyo 민요** = Planning/Reminders(everyday 리듬, 대중 티어)
   - **Pansori 판소리** = Full autonomy(혼자 몇 시간 서사를 완성하는 슈퍼에이전트)
   - 서사가 길수록 더 많은 하루를 맡는다. VC에겐 Anthropic 오마주, 시니어에겐 친숙. **이름 등장 3곳**(Home AgentCard · AgentConsole STEPS 태그 · `/technology` Layer 2) — 바꾸려면 세 곳 모두. (Michael이 싫어하면 카드 `name` 필드로 교체 가능.)
3. **Light-first + 모션 (Michael 6/11 원문):** "난 Dark Theme 안 좋아해. 조금 더 밝았으면. Animation 더. Video 도 들어갈 수 있나?" → warm ivory 베이스 + sage 강조, **다크는 hero 콘솔·푸터에만** 잔류. 모션 5종(hero aurora·콘솔 루프/타이핑·활동 티커 마퀴·숫자 count-up·아키텍처 패킷플로우, 전부 코드 생성). **Video는 기술적으로 trivial, 자산만 없음** → `public/media/demo.mp4` seam 대기(15~30s 폰 화면녹화 음성검색→큐레이션 권장). **hero 배경 비디오는 비권장**(aurora+콘솔로 충분).
4. **카탈로그 수치 = 5,207, `lib/site.ts:21` 단일 출처.** 원래 11,530이었으나 6/11 **수도권 트림**(동시 다른 세션)으로 active 5,207. 허위 방지로 전 사이트 5,207 정렬. **트림 원복 시 이 상수만 11,530으로** 바꾸면 사이트 전체 따라옴.
5. **정직성 strip (mockup 허구 제거):** `/writing` 가짜 발행일 삭제(전부 "곧 공개"), `/product` 가짜 별점 후기 삭제, `/use-cases` Real/Probable/Aspirational 신뢰도 배지(미체결 파트너십을 시그널로 오인 방지). 사이트의 모든 숫자는 읽은 문서 출처가 있거나 TODO.

---

## 3. 절대 규칙 (HARD RULES — 유지)

1. **fundraise 진행 노출 0.** `/investors`는 티저 + founder 직접 컨택만.
2. **서피스당 단일 청자.** 루트/회사 페이지엔 **시니어 2인칭 CTA 0** (시니어는 3인칭 증거로만). 2인칭 CTA는 `/product`에서만. 트윈 홈페이지 금지.
3. **브랜드 토큰 LOCKED**: Sage `#4A7C59` · Navy `#1E2D40` · Ivory `#F5F0E8` · ink `#1A1A1A`. Amber=슬라이드 전용(웹 미사용), lime 미사용.
4. **시니어 a11y floor** (특히 `/product`): 본문 ≥18px · tap ≥48px · 행간 1.75–1.8 · `word-break:keep-all`. Pretendard self-host.
5. **카피 간결·줄 wrap 회피·깔끔·PPT 아이콘 금지·의료/돌봄 이미지 0.** 검증 안 된 수치는 안 쓴다(TODO 처리).

---

## 4. 비주얼/메시징 톤 (현재 Home 기준)

- Hero: eyebrow "Agent-as-a-Service · 한국 액티브 시니어 세대" / H1 "한국 시니어를 위한 **AI 에이전트**를 만듭니다." + 영문 미러 1줄 / "1,500만 명…" / CTA = **Talk to us**(mailto) + "에이전트 만나보기 ↓".
- Metric strip: 5,207 활성 카탈로그 · 3 티어 · 음성+텍스트 · 2026.06 출시.
- 라이브 활동 티커(마퀴) = 문서 출처 활동명. AgentConsole = 우측 다크 패널, 15s 루프.

---

## 5. ✅ Writing CMS-lite + Analytics — 완료 (2026-06-15, 이 세션 / 커밋 `f878032`)

직전 Fable 세션이 논의만 하고 멈춘 부분을 **Michael 결정("Writing만 가볍게")대로 구현·푸시**함.

**무엇이 됐나:**
- **파일 기반 글 시스템** — `content/writing/*.md`(frontmatter + 마크다운). 저자=영우·현진이 GitHub로 커밋. `lib/writing.ts`의 3함수(`getAllPosts`/`getPublishedPosts`/`getPostBySlug`)가 **유일한 데이터 통로 = Sanity 교체 seam**. 비기술 저자 합류 시 이 3함수만 GROQ로 바꾸면 끝(호출부 무변경, ~30분).
- **`/writing/[slug]`** — markdown-to-jsx 렌더, `.prose-essay` 스타일(시니어 가독 19px). SSG(published만 정적 생성), draft·미존재 slug = 404.
- **`/writing` 목록** — 하드코딩 배열 제거 → 로더. published=링크+발행일, draft=`곧 공개` 티저.
- **정직성 유지** — `published:false`는 발행일 없이 티저만(가짜 날짜 금지). 현재 **시드 1편 발행**(`we-write-as-we-build`, Youngwoo 작성 — **검토/수정/비공개 가능**, frontmatter `published: false`로 내림) + **드래프트 5편**(기존 티저 이관) + 작성 가이드 `_TEMPLATE.md`.
- **Analytics** — `components/analytics/Analytics.tsx` = Plausible(no-cookie·PIPA) **env-gated 래퍼**. `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` 없으면 무출력(추적 0). Vercel에서 값 넣으면 자동 활성. sitemap에 발행 글 포함.
- **검증**: typecheck+build green(19 정적), 실서버 probe(목록/본문 렌더·draft 404·analytics off) 통과.

**글 쓰는 법(영우·현진):** `content/writing/_TEMPLATE.md` 복사 → `content/writing/<영문-slug>.md` → frontmatter 채우고 `published: true` → 커밋. 파일명이 URL(`/writing/<slug>`).

**"다른 섹션도 편집 가능?" → 보류(결정됨):** Michael이 "Writing만 가볍게" 선택. 전면 CMS화는 pre-seed 단계 과설계 → 안 함. 마케팅 카피는 코드 유지. 추후 필요한 면(use-cases·trends 등)만 점진 확장.

**남은 콘텐츠 작업(계정 불필요, Michael):** 드래프트 5편 본문 채우기 · 시드글 검토 · 팟캐스트 링크 (자산 목록 §7).

---

## 6. 배포/계정 체인 (라이브 전 필수, 순서대로 — Michael 액션)

1. **GitHub** — ✅ **완료** (`ywsuh21c/dailyfit-web` 푸시됨). _주의: 6/11 핸드오프의 "원격 없음=로컬안전"은 무효. origin/main이 라이브임._
2. **Vercel** — ⏳ 연결만 하면 staging 뜸. (import → 빌드)
3. **DNS `dailyfitai.app`** — ⏳ Vercel 후. `/guide-me`로 클릭 단위 안내.
4. **Sanity** — ⏳ CMS 갈 경우. (§5 결정 후)
5. **Resend** — ⏳ 폼 메일. DKIM/SPF.
6. **Plausible** — ⏳ analytics 도메인 활성.

> `/guide-me`는 직전 세션이 계속 제안했지만 Michael이 아직 안 누름. 위 2~6을 클릭 단위로 안내해줌.

---

## 7. Michael이 제공할 자산 (코드에 TODO/seam으로 대기 — 지어내지 말 것)

- 앱스토어/플레이스토어 링크
- 창업자 사진 + 현진 bio 동의
- Writing 시드 에세이(입고 전까지 "곧 공개" 유지) · 팟캐스트 링크
- 제품 데모 영상 → `public/media/demo.mp4` (drop 시 home what-we-build 우측 패널 `<video>`로 교체)
- 정식 출시일 확정 문구(6월 말)
- `/product` 실제 베타 후기(동의 후) — 가짜 후기는 이미 제거됨

---

## 8. 빠른 시작

```bash
cd ~/Hive-work/dailyfit-web
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # 인계 상태 green 재확인
pnpm typecheck

# 승인된 디자인 정답지(참고): 워크스페이스
open "/Users/youngwoomichaelsuh/Hive-work/1. Entrepreneurship/2. Outputs/marketing-web/2026-05-31-web-homepage-mockups/option-b-v2-company-site.html"
```

핵심 파일: `lib/site.ts`(nav·5207·CTA) · `app/(marketing)/page.tsx`(Home, 상단 주석에 출처·TODO) · `app/(marketing)/writing/page.tsx`(CMS 픽업 대상) · `.env.example`(스택 stub) · `app/globals.css`(비주얼 언어).

---

## 9. 참고
- 직전 세션 재구성 출처: 트랜스크립트 `~/.claude/projects/-Users-…-Entrepreneurship/b9498ab2-…jsonl` (도구결과 직후 정지, work 손실 0 — 미시작 CMS/analytics만 미완).
- 오케스트레이터 규칙: `~/Hive-work/1. Entrepreneurship/CLAUDE.md`
- 콘텐츠 펜딩 원전: Critical Docs `260604-V2 Alignment-Co-founder Note` (DECIDED #1~#10).
