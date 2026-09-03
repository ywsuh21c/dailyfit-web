import { cn } from '@/lib/cn';

/**
 * Editorial Daylight layout primitives (2026-09-03 redesign).
 *
 * A page is a sequence of numbered "spreads": a narrow side column carrying
 * the section number and label, and a wide content column. On small screens
 * the side column stacks above the content. Every company-site page composes
 * from these three pieces so the site reads as one document, not a set of
 * templates.
 */

/** Section label — small caps, sage, tracked. */
export function Eyebrow({
  children,
  className,
  invert,
}: {
  children: React.ReactNode;
  className?: string;
  invert?: boolean;
}) {
  return (
    <p className={cn('text-eyebrow uppercase', invert ? 'text-sage-lt' : 'text-sage', className)}>
      {children}
    </p>
  );
}

/**
 * Numbered spread: `n` + `label` in the side column, `children` in the wide
 * column. Use `sticky` to keep the side label in view while long content
 * scrolls (desktop only).
 */
export function Spread({
  n,
  label,
  children,
  className,
  sticky = true,
  invert,
}: {
  n: string;
  label: string;
  children: React.ReactNode;
  className?: string;
  sticky?: boolean;
  invert?: boolean;
}) {
  return (
    <div className={cn('ed-marker', className)}>
      <div className={cn('flex items-baseline gap-4 lg:flex-col lg:gap-2', sticky && 'ed-marker-side')}>
        <span className={cn('ed-num', invert && '!text-sage-lt')} aria-hidden="true">
          {n}
        </span>
        <span className={cn('text-[15px] font-semibold', invert ? 'text-ivory/70' : 'text-ink-soft')}>
          {label}
        </span>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

/** Section headline inside a Spread — one size, one weight, everywhere. */
export function SpreadTitle({
  children,
  className,
  invert,
}: {
  children: React.ReactNode;
  className?: string;
  invert?: boolean;
}) {
  return (
    <h2
      className={cn(
        'text-[32px] font-bold leading-[1.16] tracking-[-0.03em] sm:text-[40px] lg:text-[46px] lg:tracking-[-0.035em]',
        invert ? 'text-ivory' : 'text-ink',
        className,
      )}
    >
      {children}
    </h2>
  );
}
