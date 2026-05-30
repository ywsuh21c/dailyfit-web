import { Button } from './Button';

/**
 * 4-state primitives (Loading / Error / Empty). Guards the v1 failures:
 * error states had no icon + no retry; loading had no skeleton.
 */

export function LoadingState({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">불러오는 중…</span>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-5 w-full animate-pulse rounded bg-surface"
          style={{ width: `${90 - i * 12}%` }}
        />
      ))}
    </div>
  );
}

export function ErrorState({
  message = '문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className="flex flex-col items-start gap-4 rounded-xl border border-line bg-surface p-6"
    >
      <div className="flex items-center gap-3">
        <WarningIcon />
        <p className="text-body text-ink">{message}</p>
      </div>
      {onRetry && (
        <Button variant="ghost" onClick={onRetry}>
          다시 시도
        </Button>
      )}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-line bg-surface p-10 text-center">
      <p className="text-h3 text-ink">{title}</p>
      {description && <p className="text-body text-ink-soft">{description}</p>}
      {action}
    </div>
  );
}

function WarningIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 text-sage"
    >
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
