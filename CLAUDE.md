# 퇴사 준비 미니앱 (resignation-miniapp)

토스 미니앱 형식의 퇴사 준비 체크리스트 웹 앱.

## 기술 스택

- React 19 + TypeScript + Vite 6
- react-router-dom v7 (SPA 라우팅)
- LocalStorage (서버 없음, MVP)
- 외부 UI 라이브러리 없음 (Toss Design System 도입 예정)

## 개발 명령어

```bash
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
```

## 프로젝트 구조

```
src/
├── main.tsx                  # React 앱 진입점
├── App.tsx                   # RouterProvider + AppProviders
│
├── app/
│   ├── router.tsx            # 라우트 정의 (10개 경로)
│   └── providers.tsx         # OnboardingContext (전역 온보딩 상태)
│
├── screens/                  # 화면 단위 (문서 Screen ID 기준)
│   ├── entry/                # EXT-001 진입 화면
│   ├── onboarding/           # ONB-001~004 온보딩 4단계
│   ├── result/               # RST-001 체크리스트 생성 완료
│   ├── home/                 # HOM-001 체크리스트 홈
│   ├── detail/               # DTL-001 항목 상세
│   ├── share/                # SHR-001 공유
│   └── settings/             # SET-001 설정 및 초기화
│
├── features/                 # 기능별 로직 + UI 조각
│   ├── onboarding/           # 온보딩 상태 관리, 선택 컴포넌트
│   ├── checklist/            # 체크리스트 상태, 카드/섹션 컴포넌트
│   ├── progress/             # 진행률 계산, ProgressSummary 컴포넌트
│   └── sharing/              # 공유 로직, ShareCard 컴포넌트
│
├── components/               # 공통 재사용 컴포넌트
│   ├── BottomCTA.tsx         # Safe Area 고려 하단 고정 버튼
│   ├── EmptyState.tsx        # 빈 상태 (완료/없음/복구실패)
│   └── InformationNotice.tsx # 법률·노무 면책 안내 문구
│
├── content/                  # 체크리스트 콘텐츠 데이터 (교체 가능)
│   ├── checklistItems.ts     # 전체 항목 정의 + CONTENT_VERSION
│   └── categories.ts         # 카테고리 레이블 + 순서
│
├── rules/                    # 체크리스트 생성 룰 엔진
│   ├── generateChecklist.ts  # UserPlan → ChecklistItem[] 변환
│   ├── matchesPlan.ts        # 항목이 플랜 조건에 해당하는지 판별
│   └── sortByTiming.ts       # 카테고리·우선순위 정렬
│
├── storage/                  # LocalStorage 추상화
│   ├── keys.ts               # STORAGE_KEYS 상수
│   ├── userPlan.ts           # UserPlan 읽기/쓰기/삭제
│   └── checklistState.ts     # UserChecklistState 읽기/쓰기/삭제
│
├── analytics/
│   └── events.ts             # 이벤트 트래킹 (Apps-in-Toss SDK 연동 예정)
│
├── types/
│   ├── plan.ts               # UserPlan, ResignationStatus, NextCareerStatus, UserCondition
│   └── checklist.ts          # ChecklistItem, UserChecklistState, ChecklistCategory
│
└── utils/
    ├── dday.ts               # D-day 계산 및 포맷
    └── date.ts               # 날짜 포맷, 유효성 검사
```

## 라우팅 구조

| 경로 | 화면 | Screen ID |
|------|------|-----------|
| `/` | 진입 화면 | EXT-001 |
| `/onboarding/status` | 퇴사 상태 선택 | ONB-001 |
| `/onboarding/date` | 퇴사 예정일 입력 | ONB-002 |
| `/onboarding/career` | 이직 상태 선택 | ONB-003 |
| `/onboarding/conditions` | 추가 조건 선택 | ONB-004 |
| `/result` | 생성 완료 | RST-001 |
| `/home` | 체크리스트 홈 | HOM-001 |
| `/detail/:id` | 항목 상세 | DTL-001 |
| `/share` | 공유 결과 | SHR-001 |
| `/settings` | 설정 | SET-001 |

## 데이터 흐름

```
온보딩 입력
  → OnboardingContext (React state, 세션 유지)
  → ConditionsScreen에서 UserPlan 생성 후 LocalStorage 저장

체크리스트 홈 진입
  → getUserPlan() → generateChecklist(plan, ALL_ITEMS)
  → useChecklist hook에서 completedIds 관리
  → 체크 시 즉시 saveChecklistStates() → UI 업데이트
```

## 주의사항

- **OnboardingContext는 React state**: 온보딩 중 페이지 새로고침 시 상태 초기화됨.
  Phase 2에서 sessionStorage 또는 URL params로 개선 예정.
- **CONTENT_VERSION**: `src/content/checklistItems.ts`에서 관리.
  콘텐츠 변경 시 버전을 올리면 데이터 마이그레이션 로직이 동작.
- **analytics/events.ts**: 현재 `console.debug`만 출력. Apps-in-Toss SDK 연동 시 교체.
- **Safe Area**: `BottomCTA`는 `env(safe-area-inset-bottom)` 적용됨.

## MVP 제외 기능

퇴직금 계산, 실업급여 판정, 노무사 연결, AI 문서 작성, 캘린더 등록, 유료 구독.
자세한 내용은 `/docs` 폴더의 원본 문서 참고.

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool.

Key routing rules:
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship
