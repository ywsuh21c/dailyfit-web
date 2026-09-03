/**
 * One number in a metric row: the figure, its unit, and what it counts.
 * Rendered inside a <dl>. Tabular numerals so a row of figures lines up.
 */
export function StatFigure({
  suffix,
  label,
  size = 'md',
  children,
}: {
  /** Unit that hugs the number ('건' · '만 명' · 'M'). Empty for a bare count. */
  suffix?: string;
  label: string;
  /** 'md' for the home metric row, 'lg' for the investor hero. */
  size?: 'md' | 'lg';
  children: React.ReactNode;
}) {
  const big = size === 'lg';
  return (
    <div>
      <dd
        className={`num font-extrabold leading-none tracking-[-0.03em] text-ink ${
          big ? 'text-[38px]' : 'text-[30px]'
        }`}
      >
        {children}
        {suffix ? (
          <span className={`ml-0.5 font-bold ${big ? 'text-[18px]' : 'text-[16px]'}`}>{suffix}</span>
        ) : null}
      </dd>
      <dt className={`text-ink-soft ${big ? 'mt-3 text-[13.5px] font-semibold' : 'mt-2 text-[13px]'}`}>
        {label}
      </dt>
    </div>
  );
}
