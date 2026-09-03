import { cn } from '@/lib/cn';

type Tone = 'light' | 'surface' | 'paper' | 'dark';

const tones: Record<Tone, string> = {
  light: 'bg-bg text-ink',
  surface: 'bg-surface text-ink',
  paper: 'ed-paper text-ink',
  dark: 'bg-navy text-ivory',
};

/**
 * Consistent section wrapper — vertical rhythm + tone. `rule` draws the warm
 * hairline along the top edge (the editorial page break); most sections on
 * the company site set it.
 */
export function Section({
  tone = 'light',
  className,
  children,
  id,
  rule,
}: {
  tone?: Tone;
  className?: string;
  id?: string;
  rule?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(tones[tone], rule && 'border-t border-hair', 'py-20 sm:py-28', className)}
    >
      <div className="mx-auto max-w-wrap px-5 sm:px-8">{children}</div>
    </section>
  );
}

/** Section heading + optional eyebrow/lead, consistent spacing. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  invert,
}: {
  eyebrow?: string;
  title: string;
  lead?: React.ReactNode;
  invert?: boolean;
}) {
  return (
    <div className="max-w-prose">
      {eyebrow && (
        <p className={cn('text-eyebrow uppercase', invert ? 'text-sage-lt' : 'text-sage')}>
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-[30px] font-bold leading-[1.18] tracking-[-0.03em] sm:text-[38px]">
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            'mt-5 text-body',
            invert ? 'text-ivory/80' : 'text-ink-soft',
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
