import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/lib/site';

// /event/ai-class — 숏폼 수업 1기(7/20~24) 주간 시간표 랜딩 (2026-07-16).
// 문자 안내(앱 미보유 안드로이드 수신자)의 착지 페이지 — 수신자 전원이 앱이
// 없으므로 dailyfit:// 딥링크·스토어 배지는 의도적으로 넣지 않는다(무반응
// 막다른 길 방지). 신청 경로는 문자 회신(sms: 프리필) + 전화 두 가지뿐.
// 패턴은 /i/[code] 착지 페이지와 동형: 정적 metadata(브랜드 OG) + 히어로 + 카드.

const PHONE = '01049017898';

type ClassDay = {
  dow: string; // 요일 한 글자 — sms 프리필 본문에 들어감
  date: string;
  title: string;
  subtitle: string | null;
  times: [string, string]; // [오전, 오후] — 오전이 sms 프리필 기본값
  afternoonNote: string | null; // 목요일만 오후 4시 — 카드에서 눈에 띄게
};

const WEEK: ClassDay[] = [
  {
    dow: '월',
    date: '7월 20일',
    title: 'AI랑 처음 친해지기',
    subtitle: '말로 물어보면 답해줘요',
    times: ['오전 9시', '오후 3시'],
    afternoonNote: null,
  },
  {
    dow: '화',
    date: '7월 21일',
    title: 'AI로 사진 만들기',
    subtitle: '생일 카드부터',
    times: ['오전 9시', '오후 3시'],
    afternoonNote: null,
  },
  {
    dow: '수',
    date: '7월 22일',
    title: 'AI로 내 이야기 1분 영상 만들기',
    subtitle: null,
    times: ['오전 9시', '오후 3시'],
    afternoonNote: null,
  },
  {
    dow: '목',
    date: '7월 23일',
    title: 'AI와 함께 하는 노후 자금 계획',
    subtitle: '첫걸음',
    times: ['오전 9시', '오후 4시'],
    afternoonNote: '목요일은 오후 4시에 해요',
  },
  {
    dow: '금',
    date: '7월 24일',
    title: 'AI로 시작하는 주식 공부',
    subtitle: '뉴스 읽는 법부터',
    times: ['오전 9시', '오후 3시'],
    afternoonNote: null,
  },
];

// 문자 프리필 — "신청 월요일 오전 9시" 형태. 요일·기본시간(오전)을 채워 보내고,
// 오후를 원하면 사용자가 시간만 바꿔 보내면 된다(카드에 안내 문구).
function smsHref(day: ClassDay): string {
  return `sms:${PHONE}?body=${encodeURIComponent(`신청 ${day.dow}요일 ${day.times[0]}`)}`;
}

const PAGE_TITLE = '이번 주 무료 줌 수업 — 매일 30분, 시간표에서 골라보세요';
const PAGE_DESCRIPTION =
  '7월 20일(월)부터 24일(금)까지, 매일 오전 9시와 오후 3시(목요일만 오후 4시)에 줌으로 만나요. 무료이고, 신청은 문자 한 통이면 돼요.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    type: 'website',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${site.url}/event/ai-class`,
    siteName: site.name,
    // 사이트 공용 브랜드 OG(1200×630) — 카톡 미리보기 큰 카드 규격
    // (/i/[code]와 같은 폴백 패턴 — 이벤트 전용 OG 에셋이 생기면 교체).
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export default function AiClassEventPage() {
  return (
    <article>
      {/* 히어로 — 수업 초대 톤 */}
      <header className="hero-field relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 pb-12 pt-16 text-center lg:pt-20">
          <Image
            src="/brand/mascot.png"
            alt=""
            width={88}
            height={88}
            className="mx-auto rounded-full"
            priority
          />
          <p className="eyebrow-mono mt-6 text-sage">DailyFit 무료 수업</p>
          <h1 className="mt-4 text-[32px] font-extrabold leading-[1.25] tracking-[-0.03em] text-ink sm:text-[42px]">
            이번 주 무료 줌 수업
            <br />
            매일 30분, 시간표에서 골라보세요
          </h1>
          <p className="mt-6 text-[19px] leading-[1.7] text-ink-soft">
            7월 20일(월)~24일(금) · 매일 오전 9시·오후 3시
            <br />
            (목요일만 오후 4시) · 줌(Zoom) 온라인 · 무료
          </p>

          {/* 신청 방법 안내 — 페이지에서 가장 먼저 읽혀야 하는 문장 */}
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-sage/30 bg-sage/10 px-6 py-5 text-left">
            <p className="text-[18px] leading-[1.8] text-ink">
              신청은 문자 한 통이면 돼요. 원하는 요일과 시간을 보내주시면 저희가
              접수하고, 수업 전날 줌 링크를 문자로 보내드려요.
            </p>
          </div>
        </div>
      </header>

      {/* 주간 시간표 — 모바일 1열 카드 스택 */}
      <section className="bg-bg py-12 sm:py-16" aria-labelledby="timetable-heading">
        <div className="mx-auto max-w-3xl px-5">
          <h2 id="timetable-heading" className="text-[24px] font-bold text-ink sm:text-[28px]">
            주간 시간표
          </h2>
          <p className="mt-2 text-[18px] leading-[1.8] text-ink-soft">
            문자 버튼을 누르면 요일과 시간이 미리 적혀 있어요. 오후 수업을
            원하시면 문자에서 시간만 바꿔서 보내주세요.
          </p>

          <ul className="mt-8 flex flex-col gap-5">
            {WEEK.map((day) => (
              <li
                key={day.dow}
                className="rounded-2xl border border-line bg-white p-6 shadow-sm"
              >
                {/* 날짜 */}
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage text-[20px] font-bold text-ivory">
                    {day.dow}
                  </span>
                  <span className="text-[18px] font-semibold text-ink-soft">
                    {day.date} {day.dow}요일
                  </span>
                </div>

                {/* 과목명 */}
                <h3 className="mt-4 text-[22px] font-bold leading-[1.4] text-ink">
                  {day.title}
                </h3>
                {day.subtitle && (
                  <p className="mt-1 text-[18px] leading-[1.7] text-ink-soft">
                    {day.subtitle}
                  </p>
                )}

                {/* 시간 */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {day.times.map((time) => (
                    <span
                      key={time}
                      className="rounded-full bg-surface px-4 py-2 text-[18px] font-semibold text-ink"
                    >
                      {time}
                    </span>
                  ))}
                  {day.afternoonNote && (
                    <span className="text-[16px] font-semibold text-sage">
                      {day.afternoonNote}
                    </span>
                  )}
                </div>

                {/* 신청 CTA — 문자(프리필) + 전화 */}
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={smsHref(day)}
                    className="inline-flex min-h-tap flex-1 items-center justify-center rounded-xl bg-sage px-6 text-[18px] font-bold text-ivory transition-colors hover:bg-sage-dk active:scale-[0.98]"
                  >
                    문자로 신청
                  </a>
                  <a
                    href={`tel:${PHONE}`}
                    className="inline-flex min-h-tap flex-1 items-center justify-center rounded-xl border-2 border-sage px-6 text-[18px] font-bold text-sage transition-colors hover:bg-sage/10 active:scale-[0.98]"
                  >
                    전화로 신청
                  </a>
                </div>
              </li>
            ))}
          </ul>

          {/* 신청 후 흐름 — 기대치 고정 */}
          <div className="mt-10 rounded-2xl bg-surface px-6 py-5">
            <p className="text-[18px] leading-[1.8] text-ink-soft">
              문자를 보내주시면 저희가 확인하고 접수 문자를 드려요. 줌 링크는
              수업 전날 문자로 보내드리니, 시간에 맞춰 누르기만 하면 돼요.
            </p>
          </div>
        </div>
      </section>

      {/* 서비스 소개 한 줄 + 홈 링크 — 딥링크·스토어 유도 없음 */}
      <section className="border-t border-line bg-bg py-10">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="text-[18px] leading-[1.8] text-ink-soft">
            DailyFit은 대화 한 번으로 나에게 맞는 활동을 찾아주는 AI 서비스예요.
          </p>
          <Link
            href="/"
            className="mt-3 inline-flex min-h-tap items-center text-[18px] font-bold text-sage underline underline-offset-4 hover:text-sage-dk"
          >
            데일리핏 홈 보기
          </Link>
        </div>
      </section>
    </article>
  );
}
