/**
 * 서비스 종료 공지 배너.
 *
 * 2026-10-11 영우 결정 — DailyFit 서비스를 2026-10-20 에 종료한다.
 * 회원 138명 중 푸시·이메일로 닿는 사람은 20명뿐이고, 59명은 어떤 연락 수단도 없다.
 * 그래서 **이 배너가 그 59명에게 닿는 유일한 경로**다. 모든 마케팅 페이지
 * (홈 · /privacy · /terms 포함) 최상단에 고정으로 뜬다.
 *
 * 닫기 버튼을 두지 않는다 — 한 번 닫으면 다시 못 보고, 그러면 공지 기능을 잃는다.
 * 종료일 이후 이 배너의 문구는 과거형으로 바꾼다(`isAfterShutdown`).
 *
 * 법적 근거: 앱 이용약관 §3 「중요한 변경은 미리 알려드려요」 ·
 * 개인정보 보호법 제21조(목적 달성 시 지체 없이 파기) · 제35조(열람권).
 */

const CONTACT = 'dailyfitkorea@gmail.com';

type Props = {
  /** 영어 서브트리(/en)에서 true */
  en?: boolean;
};

export function SunsetBanner({ en = false }: Props) {
  if (en) {
    return (
      <aside
        role="region"
        aria-label="Service closure notice"
        className="bg-navy text-ivory"
      >
        <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-6">
          <p className="text-base font-semibold sm:text-lg">
            DailyFit closes on 20 October 2026.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ivory/85 sm:text-base">
            All member data will be permanently deleted on 26 October 2026. DailyFit never
            charged its members, so there is nothing to refund. For questions, write to{' '}
            <a
              href={`mailto:${CONTACT}`}
              className="font-medium underline underline-offset-4 hover:text-white"
            >
              {CONTACT}
            </a>
            .
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside
      role="region"
      aria-label="서비스 종료 안내"
      className="bg-navy text-ivory"
    >
      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-6">
        <p className="text-lg font-semibold leading-snug sm:text-xl">
          DailyFit 은 2026년 10월 20일(화)에 서비스를 마칩니다.
        </p>
        <p className="mt-3 text-base leading-relaxed text-ivory/85 sm:text-lg">
          그동안 써 주셔서 고맙습니다. 끝까지 함께하지 못해 죄송합니다.
        </p>

        <ul className="mt-4 space-y-2 text-base leading-relaxed text-ivory/85 sm:text-lg">
          <li>
            <strong className="font-semibold text-ivory">10월 19일(월)</strong>까지
            알려 주시면, 회원님의 정보를 정리해서 보내 드립니다.
          </li>
          <li>
            <strong className="font-semibold text-ivory">10월 20일(화)</strong>에 앱과
            홈페이지가 멈추고, 가지고 계신 포인트도 함께 없어집니다.
          </li>
          <li>
            <strong className="font-semibold text-ivory">10월 26일(월)</strong>에
            회원님의 정보를 되살릴 수 없는 방법으로 모두 지웁니다.
          </li>
        </ul>

        <p className="mt-4 text-base leading-relaxed text-ivory/85 sm:text-lg">
          DailyFit 은 지금까지 요금을 받은 적이 없어 돌려드릴 금액은 없습니다.
          문의와 정보 요청은{' '}
          <a
            href={`mailto:${CONTACT}`}
            className="font-semibold underline underline-offset-4 hover:text-white"
          >
            {CONTACT}
          </a>{' '}
          으로 주세요. 이 주소는 앱이 멈춘 뒤에도 계속 씁니다.
        </p>
      </div>
    </aside>
  );
}
