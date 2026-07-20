import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomCTA } from '@/components/BottomCTA';
import { StepIndicator } from '@/components/StepIndicator';
import { trackEvent } from '@/analytics/events';
import { isValidDateString } from '@/utils/date';
import { useOnboardingContext } from '@/app/providers';

export function ResignationDateScreen() {
  const navigate = useNavigate();
  const { setResignationDate } = useOnboardingContext();
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function handleNext() {
    if (value && !isValidDateString(value)) {
      setError('날짜 형식을 확인해주세요. (예: 2025-08-31)');
      return;
    }
    trackEvent('onboarding_date_submit', { hasDate: !!value });
    setResignationDate(value || null);
    navigate('/onboarding/career');
  }

  function handleSkip() {
    setResignationDate(null);
    navigate('/onboarding/career');
  }

  return (
    <div style={{ padding: '24px 20px 120px' }}>
      <StepIndicator current={2} total={4} />
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, marginTop: 24 }}>퇴사 예정일이 언제인가요?</h2>
      <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', marginBottom: 32 }}>모르시면 건너뛰어도 괜찮아요.</p>
      <input
        type="date"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setError('');
        }}
        style={{
          width: '100%',
          padding: '16px',
          border: `2px solid ${error ? 'var(--color-danger)' : 'var(--color-border)'}`,
          borderRadius: 'var(--radius-md)',
          fontSize: 16,
          boxSizing: 'border-box',
          fontFamily: 'var(--font-family)',
          color: 'var(--color-text-primary)',
        }}
      />
      {error && <p style={{ color: 'var(--color-danger)', fontSize: 13, marginTop: 8 }}>{error}</p>}
      <button
        onClick={handleSkip}
        style={{ marginTop: 16, background: 'none', border: 'none', color: 'var(--color-text-secondary)', fontSize: 15, cursor: 'pointer' }}
      >
        날짜를 아직 모르겠어요
      </button>
      <BottomCTA>
        <button
          onClick={handleNext}
          style={{
            width: '100%',
            padding: '16px',
            background: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontSize: 17,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          다음
        </button>
      </BottomCTA>
    </div>
  );
}
