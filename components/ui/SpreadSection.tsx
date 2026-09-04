import { cn } from '@/lib/cn';
import { Spread } from '@/components/ui/Editorial';

/**
 * One numbered spread, with its band. Every company-site section is this shape:
 *
 *   <section tone + top hairline>
 *     <div max-width + gutters>
 *       <Spread n label>{children}</Spread>
 *
 * That wrapper was hand-written ~30 times across the KO and EN pages, and every
 * copy was a chance for one page to drift to a different width or a different
 * band colour. `tone` alternates the paper: 'bg' is the off-white ground,
 * 'paper' the warmer ivory. The alternation is what gives the page its rhythm,
 * so it stays an explicit choice at the call site rather than something derived
 * from the section index (inserting a section must not restripe the page).
 */
export function SpreadSection({
  n,
  label,
  tone = 'bg',
  id,
  className,
  children,
}: {
  n: string;
  label: string;
  tone?: 'bg' | 'paper';
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        'border-t border-hair py-20 sm:py-28',
        tone === 'paper' ? 'ed-paper' : 'bg-bg',
        className,
      )}
    >
      <div className="mx-auto max-w-wrap px-5 sm:px-8">
        <Spread n={n} label={label}>
          {children}
        </Spread>
      </div>
    </section>
  );
}
