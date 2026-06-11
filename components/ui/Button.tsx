import Link from 'next/link';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'inline-flex min-h-tap items-center justify-center rounded-lg font-semibold transition-opacity transition-colors disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary: 'bg-sage text-white hover:opacity-90 active:scale-[0.98]',
  secondary: 'bg-navy text-ivory hover:opacity-90 active:scale-[0.98]',
  ghost: 'border border-line bg-transparent text-ink hover:bg-surface',
};

const sizes: Record<Size, string> = {
  md: 'px-5 text-base',
  lg: 'px-7 text-h3 min-h-[56px]',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  href,
  external,
  children,
}: CommonProps & { href: string; external?: boolean }) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (external) {
    // mailto/tel must not get target=_blank — browsers leave a dead blank tab
    // behind while the mail client opens.
    const newTab = !/^(mailto|tel):/.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
