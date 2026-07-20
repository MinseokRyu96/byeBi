import { useNavigate } from 'react-router-dom';
import { StatusOptionList } from '@/features/onboarding/components/StatusOptionList';
import { BottomCTA } from '@/components/BottomCTA';
import { StepIndicator } from '@/components/StepIndicator';
import { trackEvent } from '@/analytics/events';
import type { NextCareerStatus } from '@/types/plan';
import { useOnboardingContext } from '@/app/providers';

const OPTIONS: { value: NextCareerStatus; label: string }[] = [
  { value: 'NEXT_JOB_CONFIRMED', label: '다음 회사가 확정됐어요.' },
  { value: 'JOB_SEARCHING', label: '이직을 준비하고 있어요.' },
  { value: 'CAREER_BREAK', label: '당분간 쉴 예정이에요.' },
  { value: 'UNDECIDED', label: '아직 정하지 않았어요.' },
];

export function NextCareerScreen() {
  const navigate = useNavigate();
  const { state, setNextCareerStatus } = useOnboardingContext();

  function handleNext() {
    if (!state.nextCareerStatus) return;
    trackEvent('onboarding_career_select', { career: state.nextCareerStatus });
    navigate('/onboarding/conditions');
  }

  return (
    <div style={{ padding: '24px 20px 120px' }}>
      <StepIndicator current={3} total={4} />
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 32, marginTop: 24 }}>퇴사 후 계획이 어떻게 되세요?</h2>
      <StatusOptionList
        options={OPTIONS}
        selected={state.nextCareerStatus}
        onSelect={setNextCareerStatus}
      />
      <BottomCTA>
        <button
          onClick={handleNext}
          disabled={!state.nextCareerStatus}
          style={{
            width: '100%',
            padding: '16px',
            background: state.nextCareerStatus ? 'var(--color-primary)' : 'var(--color-border)',
            color: state.nextCareerStatus ? '#fff' : 'var(--color-text-disabled)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontSize: 17,
            fontWeight: 600,
            cursor: state.nextCareerStatus ? 'pointer' : 'not-allowed',
          }}
        >
          다음
        </button>
      </BottomCTA>
    </div>
  );
}
