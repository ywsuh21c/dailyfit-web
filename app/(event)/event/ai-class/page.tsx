import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/lib/site';

// /event/ai-class — 숏폼 수업 1기(7/20~24) 프로그램 소개 랜딩 (2026-07-16 개편).
// 동선(현진 확정): "잘 만들어진 프로그램 페이지"를 먼저 보여주고, 신청하기를
// 누르면 RN웹(my.dailyfitai.app)의 시간표 신청 화면(/class-picker)으로 보낸다 —
// 거기서 로그인(카카오 가입)을 거쳐 신청한다. 비회원 신청 금지.
// dailyfit:// 딥링크·스토어 배지는 여전히 넣지 않는다(수신자 전원 앱 미보유,
// 무반응 막다른 길 방지).
// 2026-07-17 현진 확정: 문자·전화 신청 폴백 섹션 삭제 — 신청은 전부 웹(class-picker)
// 으로만 받는다(문자 답장 접수 폐지, KPI 측정 단일화).

// RN웹 신규 신청 화면 — 라우트명 /class-picker 는 병렬 트랙과 고정 합의됨.
// UTM은 문자 캠페인(class-w1) 귀속용.
const CLASS_PICKER_URL =
  'https://my.dailyfitai.app/class-picker?utm_source=sms&utm_campaign=class-w1';

type ClassDay = {
  dow: string;
  date: string;
  title: string;
  intro: string; // 한 줄 소개 — 운영 카드 "오늘 배우는 것"에서 발췌
  photo: string; // public/event/ 웹 최적화본(960px webp)
  photoAlt: string;
  times: [string, string]; // [오전, 오후]
  afternoonNote: string | null;
};

const WEEK: ClassDay[] = [
  {
    dow: '월',
    date: '7월 20일',
    title: 'AI랑 처음 친해지기',
    intro: '챗GPT를 열고 말로 물어보는 것부터 시작해요.',
    photo: '/event/photo-L1-chatgpt.webp',
    photoAlt: '스마트폰으로 챗GPT와 대화하는 모습',
    times: ['오전 9시', '오후 3시'],
    afternoonNote: null,
  },
  {
    dow: '화',
    date: '7월 21일',
    title: 'AI로 사진 만들기',
    intro: 'AI에게 말해서 생일 카드에 쓸 그림을 만들어요.',
    photo: '/event/photo-L2-ai-art.webp',
    photoAlt: 'AI로 만든 그림과 생일 카드',
    times: ['오전 9시', '오후 3시'],
    afternoonNote: null,
  },
  {
    dow: '수',
    date: '7월 22일',
    title: 'AI로 내 이야기 1분 영상 만들기',
    intro: '사진 다섯 장으로 나만의 1분 영상을 만들어요.',
    photo: '/event/photo-L3-video.webp',
    photoAlt: '사진으로 만든 1분 영상 화면',
    times: ['오전 9시', '오후 3시'],
    afternoonNote: null,
  },
  // 목요일(7/23) 노후자금 — 2026-07-17 취소 (안드 출시일과 겹침). 시간표에서 제외.
  {
    dow: '금',
    date: '7월 24일',
    title: 'AI로 시작하는 주식 공부',
    intro: '어려운 경제 뉴스를 AI가 쉬운 말로 풀어줘요.',
    photo: '/event/photo-L5-stock.webp',
    photoAlt: '경제 뉴스를 쉽게 풀어 보는 화면',
    times: ['오전 9시', '오후 3시'],
    afternoonNote: null,
  },
];

const PAGE_TITLE = '이번 주 무료 줌 수업 — 하루 30분, 시간표에서 골라보세요';
const PAGE_DESCRIPTION =
  '7월 20일(월)~24일(금), 월·화·수·금 오전 9시와 오후 3시에 줌으로 만나요. 무료이고, 원하는 요일과 시간에 체크만 하면 신청돼요.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  // 자기참조 canonical — 없으면 루트 레이아웃의 canonical '/' 를 상속해 이
  // 페이지가 "홈의 사본"으로 선언된다(빌드 실측 2026-08-08). 문자 캠페인 착지라
  // 색인 대상도 아니므로 /get 과 같은 정책으로 noindex 를 함께 명시한다
  // (기수 종료 후에도 문자 링크는 계속 열려야 하니 페이지 자체는 유지).
  alternates: { canonical: '/event/ai-class' },
  robots: { index: false, follow: true },
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

// 신청 CTA + 보조 안내 — 카드마다 반복되는 한 덩어리.
function ApplyCta() {
  return (
    <div className="mt-5">
      <a
        href={CLASS_PICKER_URL}
        className="inline-flex min-h-tap w-full items-center justify-center rounded-xl bg-sage px-6 text-[18px] font-bold text-ivory transition-colors hover:bg-sage-dk active:scale-[0.98]"
      >
        신청하기
      </a>
      <p className="mt-2 text-center text-[16px] leading-[1.7] text-ink-soft">
        카카오로 30초 가입하면 바로 신청돼요
      </p>
    </div>
  );
}

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
            하루 30분, 시간표에서 골라보세요
          </h1>
          <p className="mt-6 text-[19px] leading-[1.7] text-ink-soft">
            7월 20일(월)~24일(금) · 월·화·수·금
            <br />
            오전 9시·오후 3시 · 줌(Zoom) 온라인 · 무료
          </p>

          {/* 신청 방법 안내 — 페이지에서 가장 먼저 읽혀야 하는 문장 */}
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-sage/30 bg-sage/10 px-6 py-5 text-left">
            <p className="text-[18px] leading-[1.8] text-ink">
              같은 수업이 하루 두 번 열려요. 아래 시간표에서 듣고 싶은 수업을
              보고, 신청하기를 눌러 원하는 요일과 시간에 체크만 하면 돼요.
              여러 개 들으셔도 돼요.
            </p>
          </div>
        </div>
      </header>

      {/* 주간 시간표 — 모바일 1열 카드 스택, 카드마다 사진 + 신청 CTA */}
      <section className="bg-bg py-12 sm:py-16" aria-labelledby="timetable-heading">
        <div className="mx-auto max-w-3xl px-5">
          <h2 id="timetable-heading" className="text-[24px] font-bold text-ink sm:text-[28px]">
            주간 시간표
          </h2>
          <p className="mt-2 text-[18px] leading-[1.8] text-ink-soft">
            하루 30분, 줌으로 편하게 들어요. 신청도 수업도 모두 무료예요.
          </p>

          <ul className="mt-8 flex flex-col gap-6">
            {WEEK.map((day) => (
              <li
                key={day.dow}
                className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm"
              >
                {/* 과목 사진 — "잘 만들어진 프로그램 페이지" 인상의 핵심 */}
                <Image
                  src={day.photo}
                  alt={day.photoAlt}
                  width={960}
                  height={536}
                  className="h-auto w-full"
                  sizes="(max-width: 768px) 100vw, 720px"
                />

                <div className="p-6">
                  {/* 날짜 */}
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage text-[20px] font-bold text-ivory">
                      {day.dow}
                    </span>
                    <span className="text-[18px] font-semibold text-ink-soft">
                      {day.date} {day.dow}요일
                    </span>
                  </div>

                  {/* 과목명 + 한 줄 소개 */}
                  <h3 className="mt-4 text-[22px] font-bold leading-[1.4] text-ink">
                    {day.title}
                  </h3>
                  <p className="mt-1 text-[18px] leading-[1.7] text-ink-soft">
                    {day.intro}
                  </p>

                  {/* 시간 칩 */}
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

                  <ApplyCta />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 수업 방식 안내 — 기대치 고정 */}
      <section className="border-t border-line bg-surface py-12" aria-labelledby="how-heading">
        <div className="mx-auto max-w-3xl px-5">
          <h2 id="how-heading" className="text-[24px] font-bold text-ink sm:text-[28px]">
            수업은 이렇게 진행돼요
          </h2>
          <ul className="mt-5 flex flex-col gap-4">
            <li className="rounded-2xl bg-white px-6 py-5">
              <p className="text-[18px] leading-[1.8] text-ink">
                신청하시면 수업 전날 문자로 줌 링크를 보내드려요. 수업 시간에 그
                링크만 누르면 들어와져요.
              </p>
            </li>
            <li className="rounded-2xl bg-white px-6 py-5">
              <p className="text-[18px] leading-[1.8] text-ink">
                스마트폰만 있으면 돼요. 따로 설치하거나 준비할 건 없어요.
              </p>
            </li>
            <li className="rounded-2xl bg-white px-6 py-5">
              <p className="text-[18px] leading-[1.8] text-ink">
                소규모 반으로 진행해요. 궁금한 건 그 자리에서 바로 물어볼 수
                있어요.
              </p>
            </li>
          </ul>

          {/* 마무리 CTA — 시간표를 다 읽고 내려온 사람용 */}
          <div className="mx-auto mt-8 max-w-xl">
            <ApplyCta />
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
