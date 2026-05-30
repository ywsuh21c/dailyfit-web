# dailyfit-web

DailyFit 마케팅 사이트 (homepage v2) — production: **`dailyfitai.app`**

기존 정적 랜딩(`dailyfit-website`, Netlify/Vercel)을 대체하는 Next.js 사이트. 베타 런칭 시점에 DNS cut-over로 교체한다. 두 repo는 launch까지 공존한다.

## Stack

- **Next.js 15** (App Router) · React 19 · TypeScript strict
- **Tailwind CSS v3.4** + CSS variables — 디자인 토큰은 LOCKED `brand.md` 기준
- **pnpm** · Node 20+
- 셋업 예정(계정 필요): Sanity CMS · Vercel Postgres · Resend · Plausible

## Dev

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm typecheck  # tsc --noEmit
pnpm lint
```

## 구조

```
app/
  (marketing)/        한국어 라우트 그룹 (Nav + Footer 공유)
    page.tsx          /          Home (Option-A 기본)
    about/            /about
    technology/       /technology (7섹션)
    investors/        /investors  (6섹션, noindex)
    trends/           /trends     (Sanity 연결 전 EmptyState)
  en/
    investors/        /en/investors (영문 미러)
  layout.tsx          root — Pretendard self-host, skip link, lang="ko"
components/ui/        Button · Section · States(Loading/Error/Empty)
components/layout/    Nav · Footer
lib/site.ts           사이트 config + nav (Option A/B 스왑 지점)
```

## 디자인 토큰 (LOCKED brand.md §2/§3)

| 토큰 | HEX | 용도 |
|---|---|---|
| `sage` | `#4A7C59` | CTA · 강조 |
| `navy` | `#1E2D40` | 다크 배경 · 푸터 |
| `ivory` | `#F5F0E8` | 라이트 · 다크 위 텍스트 |
| `ink` / `ink-soft` | `#1A1A1A` / `#4A4A6A` | 본문 / 보조 |

> Warm Amber(`#D4A843`)는 **슬라이드 전용** — 웹 토큰에 의도적으로 미포함.
> 시니어 a11y floor: 본문 ≥ 18px, tap target ≥ 48px, 한글 행간 1.8, `word-break: keep-all`.

## 참고

- 빌드 스펙: `1. Entrepreneurship/2. Outputs/marketing-web/2026-05-28-homepage-v2-planning/frontend-engineer-setup-spec.md`
- 인수인계 + 미완 항목: [HANDOFF.md](./HANDOFF.md)
