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
      },
      minHeight: {
        tap: '48px', // senior tap-target floor
      },
      minWidth: {
        tap: '48px',
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
};

export default config;
