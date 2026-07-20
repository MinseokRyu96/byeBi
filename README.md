# 👋 byebye — 퇴사 준비 체크리스트 미니앱

토스(Toss) 앱인토스 플랫폼에서 동작하는 퇴사 준비 체크리스트 미니앱입니다.  
퇴사 상황에 맞는 맞춤 체크리스트를 자동 생성하고, D-DAY 카운트다운으로 준비 과정을 도와드려요.

---

## 주요 기능

- **맞춤 체크리스트 자동 생성** — 퇴사 상태, 이직 여부, 재직 기간 등 조건에 따라 항목 자동 구성
- **D-DAY 카운트다운** — 퇴사일까지 남은 날 실시간 표시
- **단계별 진행 관리** — 항목 체크 및 진행률 추적
- **다크모드 지원** — 시스템 설정 자동 감지 + 수동 토글
- **공유 기능** — 준비 현황 공유

---

## 기술 스택

| 항목 | 내용 |
|---|---|
| 프레임워크 | React 19 + TypeScript |
| 빌드 도구 | Vite 6 |
| 라우팅 | react-router-dom v7 |
| 상태 관리 | React Context + useState |
| 데이터 저장 | LocalStorage (서버 없음, MVP) |
| 번들링 | @apps-in-toss/web-framework (ait build) |
| 디자인 | Toss 디자인 시스템 기반 CSS 커스텀 토큰 |

---

## 개발 환경 설정

```bash
# 패키지 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드 + .ait 번들 생성
npm run build

# 빌드 결과 미리보기
npm run preview
```

> `npm run build` 실행 시 `tsc → vite build → ait build` 순으로 실행되며  
> 프로젝트 루트에 `byebye.ait` 파일이 자동 생성됩니다.

---

## 앱인토스 배포

1. `npm run build` 실행 → `byebye.ait` 생성 확인
2. [앱인토스 콘솔](https://console.apps-in-toss.com) → 앱 출시 → 번들 업로드
3. 검토 요청 → 승인 후 출시

---

## 프로젝트 구조

```
src/
├── main.tsx                  # 앱 진입점 (테마 초기화 포함)
├── App.tsx                   # RouterProvider + AppProviders
│
├── app/
│   ├── router.tsx            # 라우트 정의 (10개 경로)
│   └── providers.tsx         # OnboardingContext
│
├── screens/                  # 화면 단위
│   ├── entry/                # 진입 화면
│   ├── onboarding/           # 온보딩 4단계
│   ├── result/               # 체크리스트 생성 완료
│   ├── home/                 # 체크리스트 홈
│   ├── detail/               # 항목 상세
│   ├── share/                # 공유
│   └── settings/             # 설정 및 초기화
│
├── features/                 # 기능별 로직 + UI 컴포넌트
│   ├── onboarding/
│   ├── checklist/
│   ├── progress/
│   └── sharing/
│
├── components/               # 공통 재사용 컴포넌트
├── content/                  # 체크리스트 콘텐츠 데이터
├── rules/                    # 체크리스트 생성 룰 엔진
├── storage/                  # LocalStorage 추상화
├── hooks/                    # 커스텀 훅 (useTheme 등)
├── analytics/                # 이벤트 트래킹
├── types/                    # TypeScript 타입 정의
└── utils/                    # 유틸리티 함수
```

---

## 라우팅

| 경로 | 화면 |
|---|---|
| `/` | 진입 화면 |
| `/onboarding/status` | 퇴사 상태 선택 |
| `/onboarding/date` | 퇴사일 입력 |
| `/onboarding/career` | 이직 상태 선택 |
| `/onboarding/conditions` | 추가 조건 선택 |
| `/result` | 체크리스트 생성 완료 |
| `/home` | 체크리스트 홈 |
| `/detail/:id` | 항목 상세 |
| `/share` | 공유 결과 |
| `/settings` | 설정 |

---

## 데이터 흐름

```
온보딩 입력
  → OnboardingContext (React state)
  → ConditionsScreen에서 UserPlan 생성 → LocalStorage 저장

체크리스트 홈 진입
  → getUserPlan() → generateChecklist(plan, ALL_ITEMS)
  → useChecklist hook에서 completedIds 관리
  → 체크 시 즉시 saveChecklistStates() → UI 업데이트
```

---

## MVP 제외 기능

퇴직금 계산, 실업급여 판정, 노무사 연결, AI 문서 작성, 캘린더 등록, 유료 구독
