import { useNavigate } from 'react-router-dom';
import { ConditionCheckboxList } from '@/features/onboarding/components/ConditionCheckboxList';
import { BottomCTA } from '@/components/BottomCTA';
import { StepIndicator } from '@/components/StepIndicator';
import { trackEvent } from '@/analytics/events';
import type { UserCondition } from '@/types/plan';
import { saveUserPlan } from '@/storage/userPlan';
import { useOnboardingContext } from '@/app/providers';
import { CONTENT_VERSION } from '@/content/checklistItems';

const OPTIONS: { value: UserCondition; label: string }[] = [
  { value: 'WORKED_OVER_ONE_YEAR', label: '1년 이상 근무했어요.' },
  { value: 'HAS_REMAINING_LEAVE', label: '남은 연차가 있어요.' },
  { value: 'USES_COMPANY_ASSETS', label: '회사 장비를 사용하고 있어요.' },
  { value: 'HAS_COMPANY_BENEFITS', label: '회사에서 지원받은 복지나 비용이 있어요.' },
  { value: 'WANTS_BENEFIT_INFO', label: '실업급여 정보를 확인하고 싶어요.' },
  { value: 'NEEDS_PORTFOLIO', label: '포트폴리오를 준비해야 해요.' },
];

export function ConditionsScreen() {
  const navigate = useNavigate();
  const { state, toggleCondition } = useOnboardingContext();

  function handleComplete() {
    if (!state.resignationStatus) return;
    trackEvent('onboarding_conditions_submit', { conditions: state.conditions });

    const now = new Date().toISOString();
    saveUserPlan({
      id: crypto.randomUUID(),
      resignationStatus: state.resignationStatus,
      resignationDate: state.resignationDate,
      nextCareerStatus: state.nextCareerStatus,
      conditions: state.conditions,
      createdAt: now,
      updatedAt: now,
      contentVersion: CONTENT_VERSION,
    });

    navigate('/result');
  }

  return (
    <div style={{ padding: '24px 24px 120px' }}>
      <StepIndicator current={4} total={4} />
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, marginTop: 24 }}>해당하는 상황을 모두 선택해주세요.</h2>
      <p style={{ fontSize: 15, color: '#888', marginBottom: 32 }}>선택하지 않아도 괜찮아요.</p>
      <ConditionCheckboxList
        options={OPTIONS}
        selected={state.conditions}
        onToggle={toggleCondition}
      />
      <BottomCTA>
        <button
          onClick={handleComplete}
          style={{
            width: '100%',
            padding: '16px',
            background: '#3182f6',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            fontSize: 17,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          체크리스트 만들기
        </button>
      </BottomCTA>
    </div>
  );
}
