import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-start justify-center px-5 py-24"
    >
      <h1 className="text-h1">페이지를 찾을 수 없습니다</h1>
      <p className="mt-4 text-body text-ink-soft">
        주소가 바뀌었거나 삭제된 페이지일 수 있습니다. 처음 화면으로 돌아가
        다시 시작해 주세요.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-tap items-center rounded-lg bg-sage px-6 text-base font-semibold text-white hover:opacity-90"
      >
        홈으로 돌아가기
      </Link>
    </main>
  );
}
