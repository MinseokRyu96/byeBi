import { useNavigate } from 'react-router-dom';
import { StatusOptionList } from '@/features/onboarding/components/StatusOptionList';
import { BottomCTA } from '@/components/BottomCTA';
import { StepIndicator } from '@/components/StepIndicator';
import { trackEvent } from '@/analytics/events';
import type { ResignationStatus } from '@/types/plan';
import { useOnboardingContext } from '@/app/providers';

const OPTIONS: { value: ResignationStatus; label: string }[] = [
  { value: 'CONSIDERING', label: '퇴사를 고민 중이에요.' },
  { value: 'DISCUSSING_DATE', label: '퇴사일을 협의 중이에요.' },
  { value: 'DATE_CONFIRMED', label: '퇴사일이 정해졌어요.' },
  { value: 'ALREADY_LEFT', label: '이미 퇴사했어요.' },
];

export function ResignationStatusScreen() {
  const navigate = useNavigate();
  const { state, setResignationStatus } = useOnboardingContext();

  function handleNext() {
    if (!state.resignationStatus) return;
    trackEvent('onboarding_status_select', { status: state.resignationStatus });
    navigate('/onboarding/date');
  }

  return (
    <div style={{ padding: '24px 24px 120px' }}>
      <StepIndicator current={1} total={4} />
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 32, marginTop: 24 }}>현재 어떤 상황인가요?</h2>
      <StatusOptionList
        options={OPTIONS}
        selected={state.resignationStatus}
        onSelect={setResignationStatus}
      />
      <BottomCTA>
        <button
          onClick={handleNext}
          disabled={!state.resignationStatus}
          style={{
            width: '100%',
            padding: '16px',
            background: state.resignationStatus ? '#3182f6' : '#e5e5e5',
            color: state.resignationStatus ? '#fff' : '#aaa',
            border: 'none',
            borderRadius: 12,
            fontSize: 17,
            fontWeight: 600,
            cursor: state.resignationStatus ? 'pointer' : 'not-allowed',
          }}
        >
          다음
        </button>
      </BottomCTA>
    </div>
  );
}
