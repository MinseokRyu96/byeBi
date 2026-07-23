import type { ChecklistItem } from '@/types/checklist';

export const CONTENT_VERSION = '1.2.0';

export const ALL_CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'common-leave-check',
    category: 'FOUR_WEEKS_BEFORE',
    title: '남은 연차 확인하기',
    shortDescription: '퇴사 전 사용할 수 있는 연차를 확인하세요.',
    detailDescription:
      '인사팀 또는 사내 시스템에서 잔여 연차 일수를 확인하세요. 퇴사일 이전에 소진하거나 수당으로 받을 수 있습니다.',
    recommendedTiming: '퇴사 4주 전',
    priority: 'HIGH',
    applicableRules: [{ conditions: ['HAS_REMAINING_LEAVE'] }],
    confirmationTarget: '인사팀',
    cautionMessage: '연차 수당 지급 여부는 회사 취업규칙에 따라 다릅니다.',
    links: [
      {
        label: '고용노동부',
        url: 'https://www.moel.go.kr',
        description: '연차 발생 기준, 미사용 수당 규정 및 노동 법률 상담을 받을 수 있어요.',
      },
    ],
  },
  {
    id: 'common-handover',
    category: 'TWO_WEEKS_BEFORE',
    title: '업무 인수인계 준비하기',
    shortDescription: '담당 업무 목록과 진행 중인 업무를 정리하세요.',
    detailDescription:
      '현재 담당 업무 전체 목록, 진행 상황, 연락처, 주의사항을 문서로 정리합니다. 후임자 또는 팀원에게 원활히 전달할 수 있도록 준비하세요.',
    recommendedTiming: '퇴사 2주 전',
    priority: 'HIGH',
    applicableRules: [{}],
    confirmationTarget: '직속 상사',
  },
  {
    id: 'common-docs-request',
    category: 'ONE_WEEK_BEFORE',
    title: '회사에 서류 발급 요청하기',
    shortDescription: '경력증명서, 재직증명서 등 필요 서류를 미리 요청하세요.',
    detailDescription:
      '퇴직 후 필요한 경력증명서, 재직증명서를 퇴사 전에 요청해두면 편리합니다. 발급까지 수일이 걸릴 수 있으니 여유 있게 신청하세요. 졸업증명서 등 개인 서류는 정부24에서 온라인 발급이 가능합니다.',
    recommendedTiming: '퇴사 1주 전',
    priority: 'HIGH',
    applicableRules: [{}],
    confirmationTarget: '인사팀',
    links: [
      {
        label: '정부24 — 증명서 발급',
        url: 'https://www.gov.kr',
        description: '졸업증명서, 주민등록등본 등 각종 증명서를 온라인으로 발급받을 수 있어요.',
      },
    ],
  },
  {
    id: 'common-return-assets',
    category: 'ON_THE_DAY',
    title: '회사 장비 및 물품 반납하기',
    shortDescription: '노트북, 사원증, 법인카드 등을 반납하세요.',
    detailDescription:
      '지급받은 노트북, 사원증, 출입카드, 법인카드, 기타 비품을 반납합니다. 반납 목록을 미리 정리해두면 누락 없이 처리할 수 있습니다.',
    recommendedTiming: '퇴사 당일',
    priority: 'HIGH',
    applicableRules: [{ conditions: ['USES_COMPANY_ASSETS'] }],
    confirmationTarget: '총무팀',
  },
  {
    id: 'common-health-insurance',
    category: 'AFTER_LEAVING',
    title: '건강보험 지역가입자 전환 확인하기',
    shortDescription: '퇴사 후 건강보험 유지 방법을 확인하세요.',
    detailDescription:
      '퇴사하면 직장가입자 자격이 상실되어 지역가입자로 자동 전환됩니다. 보험료 부담이 늘 수 있으니, 퇴직 후 2개월 내에 임의계속가입을 신청하면 최대 36개월간 직장가입자 수준의 보험료를 유지할 수 있습니다.',
    recommendedTiming: '퇴사 후 2주 내',
    priority: 'HIGH',
    applicableRules: [{}],
    confirmationTarget: '국민건강보험공단',
    links: [
      {
        label: '국민건강보험공단',
        url: 'https://www.nhis.or.kr',
        description: '지역가입자 전환 및 임의계속가입 신청을 할 수 있어요.',
      },
      {
        label: '건강보험 임의계속가입 신청',
        url: 'https://www.nhis.or.kr',
        description: '퇴직 후 2개월 내 신청하면 보험료 부담을 줄일 수 있어요. 홈페이지에서 임의계속가입을 검색하세요.',
      },
    ],
  },
  {
    id: 'unemployment-benefit',
    category: 'AFTER_LEAVING',
    title: '실업급여 수급 조건 확인하기',
    shortDescription: '실업급여 신청 방법과 조건을 미리 파악하세요.',
    detailDescription:
      '고용보험 피보험자격 상실 후 구직 등록을 통해 신청합니다. 이직 확인서 발급 여부를 사전에 회사에 확인하세요. 이직일 이전 18개월 중 피보험단위기간이 180일 이상이어야 수급 자격이 됩니다.',
    recommendedTiming: '퇴사 후 가능한 빨리',
    priority: 'MEDIUM',
    applicableRules: [
      { conditions: ['WANTS_BENEFIT_INFO'] },
      { nextCareerStatus: ['CAREER_BREAK', 'UNDECIDED'] },
    ],
    confirmationTarget: '고용노동부 고용센터',
    links: [
      {
        label: '고용24 — 실업급여 신청',
        url: 'https://www.work24.go.kr',
        description: '온라인으로 실업급여 신청, 구직 등록, 수급 자격 확인을 모두 할 수 있어요.',
      },
    ],
  },
  {
    id: 'pension-check',
    category: 'AFTER_LEAVING',
    title: '퇴직연금(IRP) 수령 방법 확인하기',
    shortDescription: '퇴직연금 수령 또는 IRP 계좌 이전을 확인하세요.',
    detailDescription:
      '퇴직 시 퇴직연금은 개인형 퇴직연금(IRP) 계좌로 이전됩니다. 55세 이전 중도 인출 시 퇴직소득세 외 기타소득세 16.5%가 추가로 부과되므로, 가능하면 연금 형태로 유지하는 것이 유리합니다. 근로복지공단 또는 가입 금융기관에 문의하세요.',
    recommendedTiming: '퇴사 후 14일 내',
    priority: 'HIGH',
    applicableRules: [{}],
    confirmationTarget: '퇴직연금 사업자(은행/증권사)',
    cautionMessage: '55세 이전 중도 인출 시 세금 부담이 커질 수 있습니다.',
    links: [
      {
        label: '근로복지공단 — 퇴직연금',
        url: 'https://pension.comwel.or.kr',
        description: '퇴직연금 DB·DC형 수령 방법과 IRP 계좌 이전을 안내받을 수 있어요.',
      },
      {
        label: '금융감독원 — 통합연금포털',
        url: 'https://www.fss.or.kr/fss/lifeplan/lifeplanIndex/index.do?menuNo=201101',
        description: '내 퇴직연금 가입 현황과 예상 수령액을 한눈에 확인할 수 있어요.',
      },
    ],
  },
  {
    id: 'national-pension-check',
    category: 'AFTER_LEAVING',
    title: '국민연금 납부 예외 신청하기',
    shortDescription: '소득이 없어지면 국민연금 납부 예외를 신청할 수 있어요.',
    detailDescription:
      '퇴직 후 소득이 없는 기간에는 국민연금 납부 예외를 신청해 보험료 부담을 줄일 수 있습니다. 납부 예외 기간은 추후 추납 제도를 통해 채울 수 있습니다.',
    recommendedTiming: '퇴사 후 1개월 내',
    priority: 'MEDIUM',
    applicableRules: [
      { nextCareerStatus: ['CAREER_BREAK', 'UNDECIDED', 'JOB_SEARCHING'] },
    ],
    confirmationTarget: '국민연금공단',
    links: [
      {
        label: '국민연금공단',
        url: 'https://www.nps.or.kr',
        description: '납부 예외 신청 및 연금 가입 이력을 확인할 수 있어요.',
      },
      {
        label: '내 연금 알아보기',
        url: 'https://csa.nps.or.kr',
        description: '예상 연금 수령액을 미리 조회해볼 수 있어요.',
      },
    ],
  },
  {
    id: 'portfolio-prep',
    category: 'BEFORE_DECISION',
    title: '포트폴리오 작업물 미리 정리하기',
    shortDescription: '재직 중 작업한 결과물을 퇴사 전에 정리해두세요.',
    detailDescription:
      '퇴사 후에는 사내 시스템 접근이 불가합니다. 개인 소유가 가능한 작업물, 수상 내역, 실적 데이터 등을 미리 정리하세요.',
    recommendedTiming: '퇴사 결정 직후',
    priority: 'MEDIUM',
    applicableRules: [{ conditions: ['NEEDS_PORTFOLIO'] }],
    cautionMessage: '회사 기밀정보나 저작권 자료는 반출하지 않습니다.',
  },
  {
    id: 'next-job-docs',
    category: 'JOB_SEARCH',
    title: '새 회사 제출 서류 준비하기',
    shortDescription: '입사에 필요한 서류 목록을 미리 확인하세요.',
    detailDescription:
      '경력증명서, 건강검진 결과서, 졸업증명서 등 새 회사에서 요구하는 서류를 미리 파악하고 준비합니다. 정부24에서 대부분의 공공 증명서를 온라인 발급할 수 있습니다.',
    recommendedTiming: '퇴사 전 또는 직후',
    priority: 'HIGH',
    applicableRules: [{ nextCareerStatus: ['NEXT_JOB_CONFIRMED'] }],
    links: [
      {
        label: '정부24 — 증명서 발급',
        url: 'https://www.gov.kr',
        description: '졸업증명서, 경력증명서 등 각종 공공 서류를 온라인으로 발급받을 수 있어요.',
      },
      {
        label: '건강검진 결과 확인',
        url: 'https://www.nhis.or.kr',
        description: '국민건강보험공단 홈페이지에서 건강검진 결과서를 온라인으로 출력할 수 있어요.',
      },
    ],
  },
  {
    id: 'emergency-fund',
    category: 'BEFORE_DECISION',
    title: '비상자금 점검하기',
    shortDescription: '생활비 여유 기간을 계산해두세요.',
    detailDescription:
      '현재 저축액과 월 지출을 기준으로 소득 없이 생활 가능한 기간을 계산합니다. 최소 3개월분의 생활비 확보를 권장합니다.',
    recommendedTiming: '퇴사 결정 전',
    priority: 'HIGH',
    applicableRules: [
      { nextCareerStatus: ['CAREER_BREAK', 'UNDECIDED', 'JOB_SEARCHING'] },
    ],
  },
];
