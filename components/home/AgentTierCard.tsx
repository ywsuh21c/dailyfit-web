import { Reveal } from '@/components/motion/Reveal';

/**
 * One Agent tier (discovery → reminders → auto-apply). The top tier inverts to
 * navy because the tier ladder is the point of the section: the card that does
 * the most is the one that looks different. Shared by the KO and EN homes —
 * they had a byte-identical 60-line copy each, so a tweak to the autonomy bar
 * silently applied to one locale only.
 */
export function AgentTierCard({
  tier,
  title,
  level,
  delay,
  autonomyLabel,
  children,
}: {
  tier: string;
  title: string;
  level: 1 | 2 | 3;
  delay: number;
  /** Screen-reader label for the autonomy meter, localized by the caller. */
  autonomyLabel: string;
  children: React.ReactNode;
}) {
  const top = level === 3;
  return (
    <Reveal delay={delay} className="h-full">
      <div
        className={
          top
            ? 'flex h-full flex-col rounded-[20px] border border-navy bg-navy p-7 text-ivory'
            : 'ed-card ed-card-lift flex h-full flex-col p-7'
        }
      >
        <span
          className={`self-start rounded-md border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${
            top ? 'border-sage-lt/40 text-sage-lt' : 'border-sage/30 text-sage'
          }`}
        >
          {tier} · Lv {level}
        </span>
        <h3 className="mt-5 text-[23px] font-bold">{title}</h3>
        <p className={`mt-3 flex-1 text-[15.5px] leading-[1.7] ${top ? 'text-ivory/75' : 'text-ink-soft'}`}>
          {children}
        </p>
        <div className="mt-6 flex items-center gap-2" aria-label={autonomyLabel}>
          <span
            className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
              top ? 'text-ivory/50' : 'text-ink-soft/60'
            }`}
          >
            autonomy
          </span>
          <span className="ml-auto flex gap-1.5" aria-hidden="true">
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={`h-1.5 w-8 rounded-full ${
                  n <= level
                    ? `agent-bar ${top ? 'bg-sage-lt' : 'bg-sage'}`
                    : top
                      ? 'bg-ivory/15'
                      : 'bg-hair'
                }`}
                style={n <= level ? { transitionDelay: `${300 + n * 140}ms` } : undefined}
              />
            ))}
          </span>
        </div>
      </div>
    </Reveal>
  );
}
