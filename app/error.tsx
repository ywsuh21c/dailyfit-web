'use client';

import { ErrorState } from '@/components/ui/States';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center px-5 py-24"
    >
      <ErrorState
        message="화면을 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."
        onRetry={reset}
      />
    </main>
  );
}
