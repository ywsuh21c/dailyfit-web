import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata: Metadata = pageSeo({
  path: '/account-deletion',
  title: '계정 및 데이터 삭제',
  description:
    'DailyFit 계정과 데이터를 삭제하는 방법 안내 — 앱 내 회원 탈퇴 및 이메일 요청.',
});

// 계정·데이터 삭제 안내 — Google Play 계정 삭제 URL 요구사항 대응(App content →
// Data safety). 앱 내 탈퇴(설정 → 회원탈퇴 → app/withdraw.tsx)와 삭제 항목을
// 그대로 미러링. 이메일 대체 경로 포함.

export default function AccountDeletionPage() {
  return (
    <section className="bg-bg py-24">
      <div className="mx-auto max-w-3xl px-5">
        <p className="eyebrow-mono text-sage">Legal</p>
        <h1 className="mt-4 text-h2 text-ink">계정 및 데이터 삭제</h1>
        <p className="mt-6 text-body leading-[1.75] text-ink-soft">
          {site.name} 계정과 계정에 연결된 데이터는 언제든지 삭제하실 수 있습니다.
          아래 두 가지 방법 중 하나를 이용하세요.
        </p>

        <div className="mt-10 border-t border-line pt-8">
          <h2 className="text-h3 text-ink">
            <span className="text-sage">1.</span> 앱에서 직접 탈퇴하기 (권장)
          </h2>
          <ol className="mt-4 space-y-2 text-body leading-[1.75] text-ink-soft">
            <li>① {site.name} 앱을 실행합니다.</li>
            <li>② 하단 [설정] 화면으로 이동합니다.</li>
            <li>③ [회원탈퇴]를 선택합니다.</li>
            <li>
              ④ 삭제 안내를 확인하고 &ldquo;위 내용을 모두 확인했어요&rdquo;에
              체크한 뒤 [탈퇴하기]를 누릅니다. (되돌릴 수 없으므로 최종 확인을 한
              번 더 거칩니다.)
            </li>
          </ol>
        </div>

        <div className="mt-10 border-t border-line pt-8">
          <h2 className="text-h3 text-ink">
            <span className="text-sage">2.</span> 이메일로 요청하기
          </h2>
          <p className="mt-4 text-body leading-[1.75] text-ink-soft">
            앱에 접근하기 어려우신 경우, 가입하신 계정 정보와 함께{' '}
            <a
              href={`mailto:${site.contactEmail}`}
              className="font-semibold text-sage underline-offset-4 hover:underline"
            >
              {site.contactEmail}
            </a>
            로 삭제를 요청해 주시면 지체 없이 처리해 드립니다.
          </p>
        </div>

        <div className="mt-10 border-t border-line pt-8">
          <h2 className="text-h3 text-ink">삭제되는 정보</h2>
          <p className="mt-4 text-body leading-[1.75] text-ink-soft">
            회원 탈퇴 시 아래 정보가 지체 없이 파기되며 복구할 수 없습니다.
          </p>
          <ul className="mt-3 space-y-1 text-body leading-[1.7] text-ink-soft">
            <li>· 내 정보 (이름·관심사·연락처)</li>
            <li>· 음성 검색으로 생성된 텍스트 기록</li>
            <li>· 즐겨찾기한 활동</li>
            <li>· 신청한 활동 기록</li>
            <li>· 검색 기록</li>
            <li>· 모은 포인트</li>
          </ul>
          <p className="mt-4 text-sm leading-[1.7] text-ink-soft/80">
            음성 원본(오디오)은 애초에 저장하지 않으며 실시간 변환 후 폐기됩니다.
            다만 관계 법령에 따라 보존 의무가 있는 최소한의 기록은 해당 법정 기간
            동안 보관 후 파기됩니다.
          </p>
        </div>

        <div className="mt-10 border-t border-line pt-8">
          <p className="text-body leading-[1.75] text-ink-soft">
            개인정보 처리에 관한 전체 내용은{' '}
            <a
              href="/privacy"
              className="font-semibold text-sage underline-offset-4 hover:underline"
            >
              개인정보처리방침
            </a>
            에서 확인하실 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
