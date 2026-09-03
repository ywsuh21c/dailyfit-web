import type { Config } from 'tailwindcss';

/**
 * Design tokens — sourced from the LOCKED brand system
 * (`0. _SYSTEM/context/brand.md`, §2 Color / §3 Typography, locked 2026-04-30).
 *
 * HARD RULES encoded here:
 *  - Warm Amber (#D4A843) is SLIDE-ONLY → intentionally NOT exposed as a web token.
 *  - Bright lime (#2ECC71) is app-internal only → never added here.
 *  - Senior-floor: body ≥ 18px, tap target ≥ 48px, Korean body line-height ≥ 1.8.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette
        sage: '#4A7C59', // Brand Primary — CTA, accents
        navy: '#1E2D40', // Brand Dark — dark backgrounds, footer
        ivory: '#F5F0E8', // Brand Light — light bg, text-on-dark
        // Supporting palette
        ink: '#1A1A1A', // Text Primary
        'ink-soft': '#4A4A6A', // Text Secondary
        bg: '#FAFAF8', // Page background
        surface: '#F4F1EC', // Card / alternating section
        line: '#E5E7EB', // Border
        // Expression shades of the locked primaries (all present in the
        // approved 2026-05-31 mockup) — not new brand colors.
        'sage-dk': '#3C6549',
        'sage-lt': '#8FBF9F',
        'navy-2': '#24344A',
        'navy-deep': '#16202E',
        // Editorial hairlines — ink at low alpha so rules read warm on the
        // ivory ground (the cool #E5E7EB `line` stays for white cards).
        hair: 'rgba(26, 26, 26, 0.10)',
        'hair-strong': 'rgba(26, 26, 26, 0.18)',
      },
      boxShadow: {
        // One shadow family, warm navy-tinted, used everywhere a surface lifts.
        card: '0 1px 2px rgba(30, 45, 64, 0.04), 0 14px 36px -22px rgba(30, 45, 64, 0.24)',
        soft: '0 28px 70px -36px rgba(30, 45, 64, 0.32)',
        device: '0 40px 90px -44px rgba(30, 45, 64, 0.45)',
      },
      fontFamily: {
        sans: ['var(--font-pretendard)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Web type scale from brand.md §3 (senior-friendly floors)
        caption: ['0.875rem', { lineHeight: '1.6' }], // 14px
        body: ['1.125rem', { lineHeight: '1.8' }], // 18px — senior floor
        h3: ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }], // 24px
        h2: ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }], // 36px
        h1: ['3.25rem', { lineHeight: '1.2', fontWeight: '700' }], // 52px
        // Editorial additions (2026-09-03 redesign) — one display size for
        // page openers, one lead size for the sentence under a headline, one
        // eyebrow for section labels. Every page uses these three instead of
        // ad-hoc px values so the site reads as one typographic system.
        display: ['4rem', { lineHeight: '1.04', fontWeight: '800', letterSpacing: '-0.04em' }], // 64px
        'display-sm': ['2.5rem', { lineHeight: '1.1', fontWeight: '800', letterSpacing: '-0.035em' }], // 40px (mobile)
        lead: ['1.3125rem', { lineHeight: '1.6' }], // 21px
        eyebrow: ['0.8125rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '0.16em' }], // 13px
      },
      maxWidth: {
        prose: '68ch',
        wrap: '1200px', // editorial page width
      },
      minHeight: {
        tap: '48px', // senior tap-target floor
      },
      minWidth: {
        tap: '48px',
      },
    },
  },
  plugins: [],
};

export default config;
