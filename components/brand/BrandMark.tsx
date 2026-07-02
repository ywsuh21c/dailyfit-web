import Image from 'next/image';

/**
 * DailyFit logo mark — the mascot (LOCKED 2026-06-18; supersedes the retired
 * v1 "bound page" planner mark). Raster master lives in
 * `4. Reference/Critical Docs/brand-assets/logo/`; the shipped copy is
 * `public/brand/dailyfit-mascot.png` (transparent cutout, 512²). Per brand
 * canon: never recolor, rotate, distort, or re-render — use the file as
 * shipped. Sage mascot reads cleanly on both the light nav and the navy
 * footer (both are approved grounds).
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/dailyfit-mascot.png"
      alt=""
      width={40}
      height={40}
      priority
      aria-hidden="true"
      className={className}
    />
  );
}
