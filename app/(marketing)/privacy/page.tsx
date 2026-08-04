import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata: Metadata = pageSeo({
  path: '/privacy',
  title: '개인정보처리방침',
  description:
    'DailyFit 개인정보처리방침 — 수집 항목·이용 목적·보유기간·국외 이전·정보주체의 권리를 안내합니다.',
});

// 정식 개인정보처리방침 v1 — 워크스페이스 초안(개인정보처리방침-draft-v2)에서 입고.
// 운영자=개인(예비창업, 사업자 미등록) · 국외이전=Deepgram/Anthropic(미국) ·
// 탈퇴 시 회원 계정 연결 기록 파기(현진 코드 확인 2026-07-12).
// 게시 전 외부 변호사 1회 검수 권고(리스크 저감용, 하드 게이트 아님).

function Section({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10 border-t border-line pt-8">
      <h2 className="text-h3 text-ink">
        <span className="text-sage">{n}.</span> {title}
      </h2>
      <div className="mt-4 space-y-3 text-body leading-[1.75] text-ink-soft">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <section className="bg-bg py-24">
      <div className="mx-auto max-w-3xl px-5">
        <p className="eyebrow-mono text-sage">Legal</p>
        <h1 className="mt-4 text-h2 text-ink">개인정보처리방침</h1>
        <p className="mt-3 text-sm text-ink-soft/70">최종 개정 · 2026년 7월</p>

        <p className="mt-6 text-body leading-[1.75] text-ink-soft">
          {site.name} 서비스 운영자(이하 &ldquo;운영자&rdquo;)는 이용자의
          개인정보를 중요하게 생각하며 「개인정보 보호법」 등 관련 법령을
          준수합니다. 본 방침은 운영자가 어떤 개인정보를 어떻게
          수집·이용·보관·파기하는지 알려드리기 위한 것입니다. 운영자는 현재 개인
          자격으로 서비스를 운영하며, 사업자 등록 시 본 방침의 처리자 정보를
          갱신·고지합니다.
        </p>

        {/* 쉬운 요약 — 시니어 이용자용 */}
        <div className="mt-8 rounded-2xl border border-sage/20 bg-sage/[0.06] p-6">
          <p className="text-h3 text-ink">쉬운 요약</p>
          <ul className="mt-3 space-y-2 text-body leading-[1.7] text-ink-soft">
            <li>
              · <strong>무엇을 모으나요</strong> — 딱 맞는 활동을 찾아드리는 데
              필요한 정보만 모아요(관심 활동, 연령대, 지역, 말씀하신 음성).
            </li>
            <li>
              · <strong>왜 모으나요</strong> — 회원님께 더 잘 맞는 활동을 찾고,
              원하시면 신청까지 도와드리기 위해서예요.
            </li>
            <li>
              · <strong>누구에게 맡기나요</strong> — 음성을 글로 바꾸고 뜻을
              이해하는 데 전문 기술 회사(미국)의 도움을 받아요(아래 5항).
            </li>
            <li>
              · <strong>언제 지우나요</strong> — 회원 탈퇴하시거나 요청하시면
              지워드려요.
            </li>
            <li>
              · <strong>거부할 수 있나요</strong> — 네. 필수가 아닌 정보는 안
              주셔도 되고, 게스트로도 이용하실 수 있어요.
            </li>
          </ul>
        </div>

        <Section n={1} title="수집하는 개인정보 항목">
          <p>운영자는 서비스 제공을 위해 다음 정보를 수집합니다.</p>
          <p>
            <strong>(가) 카카오 계정 로그인 시</strong> (선택 — 게스트 이용 시
            미수집): 이름, 이메일, 출생연도(카카오로부터 이용자 동의 하에
            제공받음)
          </p>
          <p>
            <strong>(나) 서비스 이용 과정에서</strong>: 프로필(연령대·관심
            활동·활동 지역), 음성 검색 데이터(말씀하신 음성을 변환한 텍스트 —
            음성 원본 파일은 저장하지 않고 실시간 변환 후 폐기), 위치 정보(주변
            활동 추천을 위한 경위도 — 이용자 동의 시), 활동 신청 정보(신청 대행
            시 필요한 이름·연락처 등, 이용자의 개별 위임 동의 하에),
            포인트·리워드 이용 내역, 푸시 알림 수신을 위한 기기 토큰(선택)
          </p>
          <p>
            <strong>(다) 자동 수집 항목</strong>: 서비스 이용 기록, 기기 식별
            정보, 접속 로그(부정 가입 방지 및 안정적 운영 목적)
          </p>
        </Section>

        <Section n={2} title="개인정보의 수집·이용 목적">
          <p>
            맞춤형 활동 검색·추천 제공, 음성 명령의 인식 및 이해, 이용자 요청 시
            외부 프로그램 신청 보조(신청 대행), 회원 식별·관리 및 부정
            이용(중복·파밍 가입) 방지, 포인트·리워드 운영, 고객 문의 응대 및
            서비스 개선.
          </p>
        </Section>

        <Section n={3} title="개인정보의 보유·이용 기간">
          <p>
            원칙적으로 회원 탈퇴 시 또는 수집·이용 목적 달성 시 지체 없이
            파기합니다.
          </p>
          <p>
            음성 원본(오디오)은 저장하지 않고 실시간 변환 후 폐기하며, 변환된
            텍스트 및 활동 이용 기록은 맞춤 추천·개인화를 위해 서비스 이용 기간
            동안 보관하고 회원 탈퇴 시 지체 없이 파기합니다.
          </p>
          <p>
            다만 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관하며,
            부정 가입 방지를 위한 최소한의 기기·식별 정보는 목적 달성에 필요한
            기간 동안 보관 후 파기합니다.
          </p>
        </Section>

        <Section n={4} title="개인정보의 제3자 제공 및 신청 대행(위임)">
          <p>운영자는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.</p>
          <p>
            <strong>신청 대행 기능</strong>: 이용자가 특정 활동·프로그램의 신청을
            요청하는 경우, 운영자는 이용자의 개별 위임 동의에 따라 해당 외부
            기관·포털에 신청에 필요한 정보를 이용자를 대신하여 제출합니다. 이는
            이용자 본인의 위임에 근거한 대리 제출이며, 위임 범위는 신청 완료에
            필요한 최소한으로 한정됩니다. 본인인증·최종 제출 등 되돌릴 수 없는
            행위는 이용자 본인의 확인을 거칩니다.
          </p>
        </Section>

        <Section n={5} title="개인정보 처리의 위탁 및 국외 이전">
          <p>
            원활한 서비스 제공을 위해 아래와 같이 개인정보 처리를 위탁하며, 일부는
            국외에서 처리됩니다.
          </p>
          <div className="overflow-x-auto">
            <table className="mt-2 w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line text-ink">
                  <th className="py-2 pr-4 font-semibold">수탁자</th>
                  <th className="py-2 pr-4 font-semibold">위탁 업무</th>
                  <th className="py-2 pr-4 font-semibold">이전 항목</th>
                  <th className="py-2 pr-4 font-semibold">소재국</th>
                  <th className="py-2 font-semibold">처리·보관</th>
                </tr>
              </thead>
              <tbody className="text-ink-soft">
                <tr className="border-b border-line/60 align-top">
                  <td className="py-2 pr-4">Deepgram, Inc.</td>
                  <td className="py-2 pr-4">음성→텍스트 변환(STT)</td>
                  <td className="py-2 pr-4">음성 데이터</td>
                  <td className="py-2 pr-4">미국</td>
                  <td className="py-2">
                    모델 학습에 사용하지 않음. 수탁자 정책에 따라 처리 후
                    보관·삭제
                  </td>
                </tr>
                <tr className="border-b border-line/60 align-top">
                  <td className="py-2 pr-4">Anthropic, PBC</td>
                  <td className="py-2 pr-4">발화 텍스트 의도 분석(AI)</td>
                  <td className="py-2 pr-4">
                    검색 발화 텍스트(전화·주민등록번호·이메일 마스킹 후 전송)
                  </td>
                  <td className="py-2 pr-4">미국</td>
                  <td className="py-2">
                    모델 학습에 사용하지 않음. 수탁자 정책에 따라 원칙적으로 30일
                    이내 삭제
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-2 pr-4">Google LLC (Google Cloud)</td>
                  <td className="py-2 pr-4">서버·데이터 보관</td>
                  <td className="py-2 pr-4">서비스 이용 데이터(변환 텍스트 포함)</td>
                  <td className="py-2 pr-4">대한민국(서울 리전)</td>
                  <td className="py-2">위탁계약 종료 시 또는 회원 탈퇴 시까지</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm">
            Google Cloud 서울 리전에서 처리되어 국외 이전에 해당하지 않으며, 국외
            이전은 위 Deepgram·Anthropic 2사에 한합니다. 이용자는 국외 이전을
            거부할 수 있으며, 다만 이 경우 음성 검색 등 일부 기능 이용이 제한될 수
            있습니다.
          </p>
        </Section>

        <Section n={6} title="정보주체의 권리·의무 및 행사 방법">
          <p>
            이용자는 언제든지 자신의 개인정보에 대해 열람·정정·삭제·처리정지를
            요구할 수 있으며, 앱 내 고객센터 또는 아래 연락처를 통해 요청하실 수
            있습니다. 운영자는 지체 없이 조치합니다. 위치·음성·신청 대행 등 개별
            동의 항목은 언제든지 동의를 철회할 수 있습니다.
          </p>
        </Section>

        <Section n={7} title="개인정보의 파기">
          <p>보유기간 경과 또는 목적 달성 시 지체 없이 파기합니다.</p>
          <p>
            회원 계정에 연결된 음성·텍스트 기록 및 관련 이용 기록(출석·포인트·추천
            등)은 회원 탈퇴 시 지체 없이 파기합니다. 회원가입 이전 비회원(게스트)
            상태에서 생성된 이용 기록은 개인을 식별할 수 있는 정보 없이 임시 세션
            식별자로만 보관되며, 회원 정보와 연결되지 않습니다.
          </p>
          <p>
            전자적 파일은 복구 불가능한 방법으로 삭제하고, 출력물은
            분쇄·소각합니다.
          </p>
        </Section>

        <Section n={8} title="개인정보의 안전성 확보 조치">
          <p>
            접근 권한 관리, 접근 통제, 전송·저장 구간 암호화, 접속 기록 보관 등
            관리적·기술적 보호조치를 시행하며, 개인정보를 취급하는 인원을
            최소화하고 정기적으로 관리합니다.
          </p>
        </Section>

        <Section n={9} title="개인정보 자동 수집 장치(쿠키 등)">
          <p>
            서비스 운영·통계 목적으로 최소한의 이용 기록을 수집할 수 있으며,
            이용자는 기기 설정을 통해 이를 제한할 수 있습니다.
          </p>
        </Section>

        <Section n={10} title="개인정보 보호책임자">
          <p>
            개인정보 보호책임자: 서영우 ({site.name} 서비스 운영자)
            <br />
            문의:{' '}
            <a
              href={`mailto:${site.contactEmail}`}
              className="font-semibold text-sage underline-offset-4 hover:underline"
            >
              {site.contactEmail}
            </a>{' '}
            / 앱 내 고객센터
          </p>
          <p>
            이용자는 개인정보 관련 문의·불만·피해구제를 위 연락처로 문의하실 수
            있습니다.
          </p>
        </Section>

        <Section n={11} title="권익침해 구제 방법">
          <p>
            개인정보 침해로 인한 상담·신고가 필요하신 경우 아래 기관에 문의하실 수
            있습니다.
          </p>
          <ul className="space-y-1">
            <li>· 개인정보분쟁조정위원회 (privacy.go.kr / 1833-6972)</li>
            <li>· 개인정보침해신고센터 (privacy.go.kr / 118)</li>
            <li>· 대검찰청 사이버수사과 (1301), 경찰청 사이버수사국 (182)</li>
          </ul>
        </Section>

        <Section n={12} title="고지의 의무">
          <p>
            본 방침은 법령·서비스 변경에 따라 개정될 수 있으며, 개정 시 시행일 및
            변경 내용을 앱 내 공지 또는 본 페이지를 통해 사전 고지합니다.
          </p>
        </Section>
      </div>
    </section>
  );
}
