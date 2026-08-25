// ⚠️ 이식본 — 캐논은 `dailyfit-workspace` 의
//    `6.-service-build/apps/mobile/src/lib/descriptionFacts.ts` 다.
//    **여기서 로직을 고치지 말 것.** 고쳐야 하면 캐논을 고치고 이 파일을 다시 복사한다
//    (두 곳이 갈리면 같은 활동이 앱과 랜딩에서 다르게 읽힌다 — 레인 드리프트).
//    이식 시점 2026-08-25 · 이식 이유: 랜딩만 라벨 분해를 못 받아 설명이 가운뎃점
//    한 덩어리로 보였다(길재혁 #dev-error-log 2026-08-17).
//    import 0개의 순수 모듈이라 한 글자도 바꾸지 않고 그대로 옮겼다.

// 활동 「소개」를 읽히는 형태로 — 한 줄로 이어붙은 사실들을 항목으로 쪼갠다.
//
// 영우 2026-08-03 (#dev-error-log): "활동에 대한 상세 내용이 여전히 body paragraph
// 형식으로 쓰여 있는데, 깔끔한 bullet-point 로 정리되어 있으면 가독성이 더 좋을듯."
//
// 공급처(서울공공서비스예약 등)에서 들어오는 설명은 실제로는 **문장이 아니라 표**다:
//   "구분: 체육시설 예약(대관·강습) · 장소: 종각파크골프연습장 · 이용기간: 2026-05-07 ~
//    2026-12-31 · 대상: 제한없음 · 비용: 유료(요금안내문의) · 문의: 02-2290-6525 · 출처: …"
// 이걸 그대로 흘려 쓰면 55~70세 사용자가 「이용기간」 하나 찾는 데 문장 전체를 훑어야 한다.
//
// 그래서 **원문이 이미 표일 때만** 표로 되돌린다. 진짜 산문(줄글 소개)은 손대지 않는다 —
// 억지로 쪼개면 문장이 토막 나서 지금보다 나빠진다. 판정 기준은 아래 parseFacts 주석 참조.

export type DescriptionFact = { label: string; value: string };

/** 구분자 — 공급처마다 ' · ' / ' | ' / ' / ' 를 쓴다. 앞뒤 공백이 있는 것만(날짜의 '/' 보호). */
const SEP = /\s+[·|]\s+|\s+\/\s+/;

/** "라벨: 값" — 라벨은 짧은 낱말이어야 한다(문장 속 콜론을 라벨로 오인하지 않게). */
const FACT = /^\s*([^:：]{1,14}?)\s*[:：]\s*(\S[\s\S]*)$/;

/** 🔴 2026-08-10 영우 재보고: 콜론 **없는** 라벨은 못 읽고 있었다.
 *
 * 8/3 에 이 파서를 만든 뒤 백화점 문화센터 4사가 카탈로그에 들어왔는데, 그쪽 설명은
 * 콜론을 안 쓴다 — "롯데백화점 문화센터 강남점 · 공예 · 강좌기간 2026.11.23 ~ …
 *  · 강사 김종현 · 접수상태 접수중 · 준비물·특이사항 …". 그래서 `FACT` 가 하나도 안
 * 걸리고(정확히는 "월 11:30~13:00" 의 시각 콜론 하나만 걸려) 통째로 산문으로 떨어졌다.
 * 영우가 8/3 과 **똑같은 지적**을 8/10 에 다시 한 이유가 이것이다.
 *
 * 어휘는 지어내지 않는다 — 서버쪽 `sources/base.schedule_dates_from_description` 이
 * prod 표본으로 실측해 둔 라벨 분포(강좌기간 26 · 기간 9 · 이용기간 4 · 강의기간 1 ·
 * 신청기간 1 · 교육기간 1)에 화면에서 확인한 것(강사·접수상태·준비물·특이사항·학기)을
 * 더한 것이다. 목록에 없는 낱말은 라벨로 승격하지 않는다(값의 첫 단어를 라벨로 잘못
 * 떼면 "강남점 문화센터" 같은 엉뚱한 행이 생긴다).
 */
const SPACE_LABELS = [
  '강좌기간', '강의기간', '교육기간', '신청기간', '이용기간', '접수기간', '기간',
  '강사', '접수상태', '준비물·특이사항', '준비물', '특이사항', '정원', '대상',
  '장소', '비용', '수강료', '문의', '요일', '시간', '학기',
] as const;

/** "<라벨> <값>" (콜론 없음). 라벨은 위 어휘에 정확히 있는 것만. */
function spaceFact(part: string): DescriptionFact | null {
  for (const label of SPACE_LABELS) {
    if (part.length > label.length && part.startsWith(label)) {
      const rest = part.slice(label.length);
      // 라벨 직후는 공백이어야 한다 — "기간"이 "기간제"를 먹지 않게.
      if (!/^\s/.test(rest)) continue;
      const value = rest.trim();
      if (value) return { label, value };
    }
  }
  return null;
}

/** 🔴 2026-08-21 길재혁 제보(#dev-error-log 10:49): "접수상태에 중산신청이라고 뜨는데
 *  이게 정확히 무슨 뜻인지를 모르겠음" — 화면 실물은 「접수상태  중간신청」이었다.
 *
 *  「중간신청」은 **현대백화점 문화센터의 내부 표기**를 우리가 가공 없이 그대로 흘린 것이다.
 *  공급처 용어는 그쪽 직원과 단골에겐 통하지만 우리 사용자(55~70)에겐 통하지 않는다.
 *  prod 실측 분포(라이브 태그, 2026-08-21): 접수중 6,555 · 신청가능 963 · 대기접수 397 ·
 *  **중간신청 302** · 마감임박 178 · 대기신청 120 · 지점문의 47.
 *
 *  🔴 **모르는 값은 손대지 않는다.** 표에 없는 상태는 원문 그대로 둔다 — 뜻을 지어내는 것이
 *  못 알아보는 것보다 나쁘다(잘못된 안내가 되어 사용자가 헛걸음한다).
 *  이미 평이한 값(접수중·신청가능·마감임박)도 그대로 둔다 — 바꿀 이유가 없다.
 */
const PLAIN_STATUS: Record<string, string> = {
  중간신청: '중간 참여 가능 (이미 시작한 수업)',
  대기접수: '자리가 차서 대기 신청만 가능',
  대기신청: '자리가 차서 대기 신청만 가능',
  지점문의: '전화로 문의해야 신청 가능',
};

/** 접수상태 값만 평이한 말로. 그 외 라벨·모르는 값은 원문 그대로 돌려준다. */
export function plainFact(fact: DescriptionFact): DescriptionFact {
  if (fact.label !== '접수상태') return fact;
  const plain = PLAIN_STATUS[fact.value.trim()];
  return plain ? { label: fact.label, value: plain } : fact;
}

/**
 * 설명을 (항목 목록 · 남은 산문)으로 가른다.
 *
 * 표로 판정하는 조건 — 넷 다 만족해야 한다. 하나라도 어긋나면 원문을 그대로 돌려준다.
 *  1. 줄바꿈이 없다 — 이미 줄로 정리된 설명은 건드릴 이유가 없다.
 *  2. 구분자로 잘랐을 때 조각이 3개 이상이다(2개는 우연히 걸릴 수 있다).
 *  3. "라벨: 값" 꼴이 **3개 이상**이고, 그게 전체 조각의 **절반 이상**이다.
 *     비율만 보면 꼬리에 문장 하나 붙은 진짜 표를 놓치고("… · 준비물은 편한 신발이면 됩니다"),
 *     개수만 보면 산문 속 콜론 몇 개에 끌려간다. 둘 다 걸어야 한다.
 *  4. 라벨이 두 종류 이상이다 — 전부 '문의'뿐이면 표로 보이지 않는다.
 */
export function parseFacts(description?: string | null): {
  facts: DescriptionFact[];
  /** 라벨이 없는 조각들 — 문단으로 뭉치지 않고 불릿으로 보여준다(영우 2026-08-10). */
  bullets: string[];
  rest: string;
} {
  const raw = (description ?? '').trim();
  const none = { facts: [], bullets: [], rest: raw };
  if (!raw || raw.includes('\n')) return none;

  const parts = raw.split(SEP).map((s) => s.trim()).filter(Boolean);
  // 조각이 1개면 쪼갤 것이 없다. 2개는 «전부 라벨일 때만» 표로 본다(아래 labeledEnough).
  // 🔴 종전엔 3개 미만을 전부 버렸다. 그 탓에 관광공사 활동 1,068건의
  //    "주소: … · 출처: …"(조각 2개)가 통째로 산문으로 남았고, 주소가 **화면에 글자로만**
  //    있고 데이터로는 없는 상태가 됐다 — `activity-detail` 의 `resolveAddressText` 는
  //    이 `facts` 를 읽어 「오시는 길」·지도를 그리므로, 주소를 눈앞에 두고도 못 쓴 것이다.
  //    실측(2026-08-24 프로드): kor_tour 1,068건 중 `location.address_text` 가 있는 건 55건뿐.
  if (parts.length < 2) return none;

  const facts: DescriptionFact[] = [];
  const leftovers: string[] = [];
  for (const p of parts) {
    const m = FACT.exec(p);
    // 🔴 시각의 콜론을 라벨로 오인하지 않는다. "월 11:30~13:00, 총 1회" 가 그대로
    //    "월 11 | 30~13:00, 총 1회" 라는 쓰레기 행이 되고 있었다(2026-08-10 실측).
    //    라벨이 숫자로 끝나면 그건 시각이다.
    const colonLabel = m && !/\d$/.test(m[1].trim()) ? { label: m[1].trim(), value: m[2].trim() } : null;
    // 콜론 라벨이 우선, 없으면 어휘 기반 공백 라벨.
    const labeled = colonLabel ?? spaceFact(p);
    if (labeled) facts.push(plainFact(labeled));
    else leftovers.push(p);
  }

  // 표로 볼지 판정. 두 갈래 중 하나면 표다.
  //  ⓐ 라벨 붙은 항목이 3개 이상이고 전체의 절반 이상 — 8/3 이후 써 온 기존 기준.
  //  ⓑ 조각이 4개 이상이고 그중 3개 이상이 짧다(≤30자) — 라벨이 거의 없어도 **목록**이다.
  //     백화점 설명("… 강남점 · 공예 · 가을학기 · 강사 김종현 …")이 여기 걸린다.
  //     산문은 조각이 적고 조각마다 길어서 이 조건에 안 걸린다(그래서 손대지 않는다).
  //  ⓒ 조각이 2개인데 **둘 다 라벨** — 「주소: … · 출처: …」 처럼 짧은 표. 하나라도 라벨이
  //     없으면 표로 보지 않는다(산문 한 문장이 ' · ' 를 품은 경우를 표로 오인하지 않기 위해).
  const labeledEnough =
    (facts.length >= 3 && facts.length * 2 >= parts.length) ||
    (parts.length === 2 && facts.length === 2);
  const shortCount = parts.filter((p) => p.length <= 30).length;
  const listLike = parts.length >= 4 && shortCount >= 3;
  if (!labeledEnough && !listLike) return none;

  // 라벨이 전부 같으면(예: 전부 '문의') 표로 보이지 않는다 — 목록 판정이 아니면 산문으로.
  if (labeledEnough && new Set(facts.map((f) => f.label)).size < 2 && !listLike) return none;

  // 남은 조각을 어떻게 보여줄지 — **개수와 길이**로 가른다.
  //  · 짧은 조각이 2개 이상이면 그건 목록이다 → 불릿. 이어붙이면 다시 줄글이 되고,
  //    그게 영우가 8/10 에 다시 지적한 바로 그 상태다("강남점 · 공예 · 가을학기").
  //  · 그 외(꼬리 문장 하나 등)는 종전대로 `rest` 문단 — 문장 하나를 불릿으로 만들면
  //    오히려 어색하다(기존 테스트가 이 계약을 지킨다).
  const shortLeftovers = leftovers.filter((l) => l.length <= 30);
  if (shortLeftovers.length >= 2 && shortLeftovers.length === leftovers.length) {
    return { facts, bullets: leftovers, rest: '' };
  }
  return { facts, bullets: [], rest: leftovers.join(' · ') };
}
