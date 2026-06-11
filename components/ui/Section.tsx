import { cn } from '@/lib/cn';

type Tone = 'light' | 'surface' | 'dark';

const tones: Record<Tone, string> = {
  light: 'bg-bg text-ink',
  surface: 'bg-surface text-ink',
  dark: 'bg-navy text-ivory',
};

/** Consistent section wrapper — controls vertical rhythm + light/dark tone. */
export function Section({
  tone = 'light',
  className,
  children,
  id,
}: {
  tone?: Tone;
  className?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn(tones[tone], 'py-16 sm:py-24', className)}>
      <div className="mx-auto max-w-6xl px-5">{children}</div>
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
  lead?: string;
  invert?: boolean;
}) {
  return (
    <div className="max-w-prose">
      {eyebrow && (
        <p className={cn('eyebrow-mono', invert ? 'text-sage-lt' : 'text-sage')}>
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-h2">{title}</h2>
      {lead && (
        <p
          className={cn(
            'mt-4 text-body',
            invert ? 'text-ivory/80' : 'text-ink-soft',
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
