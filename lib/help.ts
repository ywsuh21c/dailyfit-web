import { site } from '@/lib/site';

/**
 * Help content source — FAQ + contact for the seniors product page (/product).
 *
 * ── SINGLE SOURCE OF TRUTH ──────────────────────────────────────────────────
 * Canonical source = backend `GET /api/help` (same payload the app reads), so
 * the website FAQ and the in-app FAQ never drift. The whole site reads help
 * content ONLY through `getHelp()` below — swap the source by changing that one
 * function; every caller keeps working.
 *
 * Safe-fallback rule: if NEXT_PUBLIC_API_URL is unset OR the fetch fails, we
 * fall back to FALLBACK_FAQ / FALLBACK_CONTACT (the SAME 10 items the app
 * ships) so the page renders identical content offline and NEVER breaks.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type FaqItem = {
  id: string;
  category: string;
  q: string;
  a: string;
  /** true = answer should route the user to the "사람과 연결" handoff. */
  escalate: boolean;
};

export type HelpContact = {
  email: string;
  kakao_channel_url: string;
  kakao_label: string;
  response_note: string;
};

export type Help = {
  faq: FaqItem[];
  contact: HelpContact;
};

/**
 * Local fallback FAQ — MUST stay verbatim-identical to the app's 10 items.
 * Canonical source is `GET /api/help`; this only renders when the API is
 * unreachable so the page degrades gracefully without content drift.
 */
const FALLBACK_FAQ: FaqItem[] = [
  {
    id: 'first-time',
    category: '시작하기',
    q: '앱을 처음 켰는데 뭘 해야 하나요?',
    a: '화면 가운데 큰 버튼을 누르고, 찾고 싶은 걸 편하게 말씀하세요. 예: "집 근처 운동", "노래 교실". 그러면 추천 카드가 나오고, 카드를 누르면 자세한 내용을 볼 수 있어요.',
    escalate: false,
  },
  {
    id: 'voice-only',
    category: '사용법',
    q: '꼭 말로 해야 하나요? 글자로는 못 쓰나요?',
    a: '지금은 말로 검색하는 방식이에요. 주변이 시끄럽거나 말하기 불편하시면 조용한 곳에서 한 문장으로 또박또박 말씀해 보세요. 글자로 입력하는 기능은 준비하고 있어요.',
    escalate: false,
  },
  {
    id: 'mic-permission',
    category: '문제 해결',
    q: '마이크가 안 켜져요.',
    a: '휴대폰 설정 → 앱 → 데일리핏 → 권한 → 마이크를 켜 주세요. 그래도 안 되면 앱을 껐다 다시 켜 보세요.',
    escalate: false,
  },
  {
    id: 'no-results',
    category: '사용법',
    q: '말했는데 결과가 안 나오거나 이상해요.',
    a: '① 짧은 한 단어보다 "주말에 할 만한 취미"처럼 문장으로 말해 보세요. ② 다른 말로 바꿔 보세요(예: "체조" 대신 "운동"). ③ 마음에 드는 카드의 하트(♡)를 누르면 비슷한 걸 더 보여드려요.',
    escalate: false,
  },
  {
    id: 'only-jobs',
    category: '사용법',
    q: '일자리만 나오고 취미·여가는 잘 안 보여요.',
    a: '활동을 매일 늘려가고 있어요. "그림 교실", "등산 모임"처럼 구체적으로 말씀하시면 더 잘 찾아요. 원하시는 활동이 안 보이면 알려 주세요 — 우선해서 채워 넣을게요.',
    escalate: false,
  },
  {
    id: 'font-size',
    category: '문제 해결',
    q: '글자가 너무 작아요. 크게 볼 수 없나요?',
    a: '휴대폰 설정에서 글자 크기를 키우시면 앱 글자도 함께 커져요. 아이폰: 설정 → 디스플레이 및 밝기 → 텍스트 크기. 안드로이드: 설정 → 디스플레이 → 글꼴 크기.',
    escalate: false,
  },
  {
    id: 'download',
    category: '시작하기',
    q: '앱 다운로드가 안 돼요. QR이 안 읽혀요.',
    a: '① 문자로 받은 설치 링크를 다시 눌러 보세요. ② 그래도 안 되면 앱스토어·플레이스토어에서 "데일리핏"으로 검색해 보세요. ③ 계속 안 되면 아래 "사람과 연결"로 편하게 연락 주세요. 같이 봐 드릴게요.',
    escalate: true,
  },
  {
    id: 'privacy',
    category: '개인정보',
    q: '제 정보는 안전한가요? 개인정보를 얼마나 모으나요?',
    a: '활동을 추천하는 데 필요한 나이와 관심사 정도만 사용해요. 동의 없이 다른 곳에 정보를 넘기지 않고, 대한민국 개인정보 보호법을 따릅니다. 자세한 내용은 개인정보처리방침에서 보실 수 있어요.',
    escalate: false,
  },
  {
    id: 'slow',
    category: '문제 해결',
    q: '앱이 느리거나 말을 잘 못 알아들어요.',
    a: '① 와이파이나 데이터 연결이 안정적인지 확인해 주세요. ② 앱을 껐다 켜 보세요. ③ 조금 천천히, 휴대폰에 가까이 대고 말씀해 보세요.',
    escalate: false,
  },
  {
    id: 'delegation',
    category: '신청·지원',
    q: '신청 버튼을 누르면 저 대신 신청해 주나요? 어디까지 진행됐는지 어떻게 아나요?',
    a: '지금은 해당 기관의 신청 페이지로 안내해 드리는 단계예요. 저희가 처음부터 끝까지 대신 신청해 드리는 기능은 준비하고 있어요. 진행 상황이 궁금하시면 아래 "사람과 연결"로 물어봐 주세요.',
    escalate: true,
  },
];

/**
 * Local fallback contact. Email comes from the canonical site constant; Kakao
 * stays empty until the channel is live (the page hides the Kakao CTA when the
 * URL is empty), so we never render a dead link.
 */
const FALLBACK_CONTACT: HelpContact = {
  email: site.contactEmail,
  kakao_channel_url: '',
  kakao_label: '카카오톡으로 문의하기',
  response_note: '평일 기준 하루 안에 답변드려요. 편하게 연락 주세요.',
};

const FALLBACK_HELP: Help = { faq: FALLBACK_FAQ, contact: FALLBACK_CONTACT };

function isFaqItem(v: unknown): v is FaqItem {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.category === 'string' &&
    typeof o.q === 'string' &&
    typeof o.a === 'string'
  );
}

/**
 * Returns FAQ + contact. Reads the canonical `GET /api/help` when
 * NEXT_PUBLIC_API_URL is set; otherwise (or on any error / malformed payload)
 * returns the bundled fallback so /product always renders.
 *
 * Cached for 1h (`next: { revalidate: 3600 }`) — content is not user-specific.
 */
export async function getHelp(): Promise<Help> {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) return FALLBACK_HELP;

  try {
    const res = await fetch(`${base}/api/help`, { next: { revalidate: 3600 } });
    if (!res.ok) return FALLBACK_HELP;

    const data = (await res.json()) as Partial<Help>;
    const faq = Array.isArray(data.faq) ? data.faq.filter(isFaqItem) : [];
    if (faq.length === 0) return FALLBACK_HELP; // empty/invalid → safe fallback

    const c = data.contact ?? ({} as Partial<HelpContact>);
    const contact: HelpContact = {
      email: typeof c.email === 'string' && c.email ? c.email : site.contactEmail,
      kakao_channel_url:
        typeof c.kakao_channel_url === 'string' ? c.kakao_channel_url : '',
      kakao_label:
        typeof c.kakao_label === 'string' && c.kakao_label
          ? c.kakao_label
          : FALLBACK_CONTACT.kakao_label,
      response_note:
        typeof c.response_note === 'string' && c.response_note
          ? c.response_note
          : FALLBACK_CONTACT.response_note,
    };

    return {
      faq: faq.map((item) => ({ ...item, escalate: item.escalate === true })),
      contact,
    };
  } catch {
    return FALLBACK_HELP; // network/parse failure → never break the page
  }
}
