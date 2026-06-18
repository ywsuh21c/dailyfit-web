import { site } from '@/lib/site';

/**
 * Help content source — FAQ + contact for the seniors product page (/product).
 *
 * ── SINGLE SOURCE OF TRUTH ──────────────────────────────────────────────────
 * Canonical source = backend `GET /api/help` (same payload the app reads), so
 * the website FAQ and the in-app FAQ never drift. The website reads help content
 * ONLY through `getHelp()` below.
 *
 * The payload mirrors the app's two source files (apps/mobile/src/lib/
 * supportFaq.ts FAQ_ITEMS + support.ts contact). The website renders FAQ q/a and
 * the email/Kakao handoff; it deliberately does NOT surface a public phone
 * number (founder decision — phone is shared only inside Kakao 1:1).
 *
 * Safe-fallback rule: if NEXT_PUBLIC_API_URL is unset OR the fetch fails / is
 * malformed, fall back to FALLBACK_FAQ / FALLBACK_CONTACT (the SAME items the
 * app ships) so the page renders identical content and NEVER breaks.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type FaqItem = {
  id: string;
  q: string;
  a: string;
};

export type HelpContact = {
  email: string;
  /** KakaoTalk channel 1:1 https URL. Empty until the channel is live → CTA hidden. */
  kakao_url: string;
  kakao_handle: string;
  response_note: string;
};

export type Help = {
  faq: FaqItem[];
  contact: HelpContact;
};

/**
 * Local fallback FAQ — verbatim mirror of the app's FAQ_ITEMS (supportFaq.ts).
 * Canonical source is `GET /api/help`; this only renders when the API is
 * unreachable so the page degrades gracefully without content drift.
 */
const FALLBACK_FAQ: FaqItem[] = [
  {
    id: 'what',
    q: 'DailyFit은 어떤 앱인가요?',
    a: '말이나 글로 "이런 활동 하고 싶어요"라고 하면, 가까운 곳에서 할 수 있는 활동을 찾아드리는 앱이에요. 운동·배움·모임·나들이 같은 활동을 한곳에서 찾을 수 있어요.',
  },
  {
    id: 'search',
    q: '활동은 어떻게 찾나요?',
    a: '첫 화면에서 마이크 버튼을 누르고 말씀하시거나, 글로 적어서 찾을 수 있어요. 예를 들어 "주말에 가족이랑 갈 만한 곳"이라고 하시면 돼요.',
  },
  {
    id: 'guest',
    q: '회원가입을 꼭 해야 하나요?',
    a: '아니에요. 가입 없이 게스트로 둘러볼 수 있어요. 다만 카카오로 로그인하면 즐겨찾기와 검색 기록이 안전하게 저장돼요.',
  },
  {
    id: 'kakao',
    q: '카카오 로그인은 어떻게 하나요?',
    a: '왼쪽 메뉴나 설정에서 "카카오로 시작하기"를 누르면 돼요. 카카오톡에 로그인되어 있으면 한 번에 연결돼요.',
  },
  {
    id: 'apply',
    q: '활동 신청은 앱에서 바로 되나요?',
    a: '신청 방법을 단계별로 안내해드려요. 다만 외부 기관 신청·결제처럼 되돌리기 어려운 일은 마지막 "신청" 버튼을 꼭 본인이 직접 누르도록 되어 있어요.',
  },
  {
    id: 'location',
    q: '위치 정보는 왜 필요한가요?',
    a: '가까운 활동을 먼저 보여드리려고 사용해요. 검색할 때만 확인하고, 설정 > 이용 환경에서 언제든 끌 수 있어요.',
  },
  {
    id: 'fontsize',
    q: '글자가 작아요. 크게 볼 수 있나요?',
    a: '네. 설정 > 이용 환경에서 "글자 크기"를 "크게"로 바꾸면 앱 전체 글자가 커져요.',
  },
  {
    id: 'privacy',
    q: '개인정보는 안전한가요?',
    a: '활동 추천에 필요한 최소한의 정보만 모으고, 게스트 모드에서는 본인 정보를 모으지 않아요. 자세한 내용은 설정 > 개인정보 처리방침에서 보실 수 있어요.',
  },
  {
    id: 'withdraw',
    q: '회원탈퇴는 어떻게 하나요?',
    a: '설정 > 회원탈퇴에서 할 수 있어요. 탈퇴하면 내 정보·즐겨찾기·신청 기록이 모두 지워지고 되돌릴 수 없어요.',
  },
  {
    id: 'history',
    q: '검색 기록을 지우고 싶어요.',
    a: '설정 > 검색 기록 삭제에서 한 번에 지울 수 있어요.',
  },
];

/**
 * Local fallback contact. Email comes from the canonical site constant; Kakao
 * stays empty until the channel is live (the page hides the Kakao CTA when the
 * URL is empty), so we never render a dead link.
 */
const FALLBACK_CONTACT: HelpContact = {
  email: site.contactEmail,
  kakao_url: '',
  kakao_handle: '@데일리핏',
  response_note: '문의 주시면 운영시간 안에 순서대로 답변드려요.',
};

const FALLBACK_HELP: Help = { faq: FALLBACK_FAQ, contact: FALLBACK_CONTACT };

function isFaqItem(v: unknown): v is FaqItem {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return typeof o.id === 'string' && typeof o.q === 'string' && typeof o.a === 'string';
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
    const faq = Array.isArray(data.faq)
      ? data.faq.filter(isFaqItem).map((item) => ({ id: item.id, q: item.q, a: item.a }))
      : [];
    if (faq.length === 0) return FALLBACK_HELP; // empty/invalid → safe fallback

    const c = (data.contact ?? {}) as Record<string, unknown>;
    const contact: HelpContact = {
      email: typeof c.email === 'string' && c.email ? c.email : site.contactEmail,
      kakao_url: typeof c.kakao_url === 'string' ? c.kakao_url : '',
      kakao_handle:
        typeof c.kakao_handle === 'string' && c.kakao_handle
          ? c.kakao_handle
          : FALLBACK_CONTACT.kakao_handle,
      response_note:
        typeof c.response_note === 'string' && c.response_note
          ? c.response_note
          : FALLBACK_CONTACT.response_note,
    };

    return { faq, contact };
  } catch {
    return FALLBACK_HELP; // network/parse failure → never break the page
  }
}
