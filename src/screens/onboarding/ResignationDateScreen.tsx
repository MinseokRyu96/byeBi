import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomCTA } from '@/components/BottomCTA';
import { StepIndicator } from '@/components/StepIndicator';
import { trackEvent } from '@/analytics/events';
import { useOnboardingContext } from '@/app/providers';
import type { ResignationStatus } from '@/types/plan';

function getDaysInMonth(year: number, month: number): number {
  if (!year || !month) return 31;
  return new Date(year, month, 0).getDate();
}

const COPY: Record<ResignationStatus, { title: string; subtitle: string; skip: string }> = {
  CONSIDERING: {
    title: '생각 중인 퇴사 시기가 있나요?',
    subtitle: '아직 없다면 건너뛰어도 괜찮아요.',
    skip: '아직 생각해보지 않았어요',
  },
  DISCUSSING_DATE: {
    title: '협의 중인 퇴사일이 언제인가요?',
    subtitle: '확정 전이라도 대략적인 날짜로 괜찮아요.',
    skip: '아직 결정되지 않았어요',
  },
  DATE_CONFIRMED: {
    title: '퇴사일이 언제인가요?',
    subtitle: 'D-DAY 카운트다운을 시작해드려요.',
    skip: '앱에 입력하지 않을게요',
  },
  ALREADY_LEFT: {
    title: '퇴사일이 언제였나요?',
    subtitle: '정확하지 않아도 괜찮아요.',
    skip: '정확히 기억나지 않아요',
  },
};

const NOW = new Date();
const CURRENT_YEAR = NOW.getFullYear();

function getYearOptions(status: ResignationStatus | null): number[] {
  if (status === 'ALREADY_LEFT') {
    return [CURRENT_YEAR - 1, CURRENT_YEAR];
  }
  return [CURRENT_YEAR, CURRENT_YEAR + 1, CURRENT_YEAR + 2];
}

const selectStyle: React.CSSProperties = {
  flex: 1,
  padding: '14px 8px',
  border: '2px solid var(--color-border)',
  borderRadius: 'var(--radius-md)',
  fontSize: 16,
  fontFamily: 'var(--font-family)',
  color: 'var(--color-text-primary)',
  background: 'var(--color-surface)',
  appearance: 'none',
  WebkitAppearance: 'none',
  textAlign: 'center',
  cursor: 'pointer',
  outline: 'none',
};

export function ResignationDateScreen() {
  const navigate = useNavigate();
  const { state, setResignationDate } = useOnboardingContext();
  const status = state.resignationStatus;
  const copy = status ? COPY[status] : COPY.DATE_CONFIRMED;
  const yearOptions = getYearOptions(status);

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [error, setError] = useState('');

  const isPartiallyFilled = year || month || day;
  const isFullyFilled = year && month && day;

  const maxDay = year && month ? getDaysInMonth(Number(year), Number(month)) : 31;

  function buildDateValue(): string | null {
    if (!isFullyFilled) return null;
    const mm = month.padStart(2, '0');
    const dd = day.padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  }

  function handleNext() {
    if (isPartiallyFilled && !isFullyFilled) {
      setError('연도, 월, 일을 모두 선택해주세요.');
      return;
    }
    const dateValue = buildDateValue();
    if (dateValue) {
      const d = new Date(dateValue);
      if (isNaN(d.getTime())) {
        setError('올바른 날짜를 선택해주세요.');
        return;
      }
    }
    trackEvent('onboarding_date_submit', { hasDate: !!dateValue });
    setResignationDate(dateValue);
    navigate('/onboarding/career');
  }

  function handleSkip() {
    setResignationDate(null);
    navigate('/onboarding/career');
  }

  return (
    <div style={{ padding: '24px 20px 120px' }}>
      <StepIndicator current={2} total={4} />
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, marginTop: 24 }}>
        {copy.title}
      </h2>
      <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', marginBottom: 32 }}>
        {copy.subtitle}
      </p>

      <div style={{ display: 'flex', gap: 8 }}>
        {/* 연도 */}
        <div style={{ flex: '2', position: 'relative' }}>
          <select
            value={year}
            onChange={(e) => { setYear(e.target.value); setError(''); }}
            style={{
              ...selectStyle,
              width: '100%',
              borderColor: error && !year ? 'var(--color-danger)' : 'var(--color-border)',
            }}
          >
            <option value="">연도</option>
            {yearOptions.map((y) => (
              <option key={y} value={String(y)}>{y}년</option>
            ))}
          </select>
        </div>

        {/* 월 */}
        <div style={{ flex: '1.2', position: 'relative' }}>
          <select
            value={month}
            onChange={(e) => { setMonth(e.target.value); setDay(''); setError(''); }}
            style={{
              ...selectStyle,
              width: '100%',
              borderColor: error && !month ? 'var(--color-danger)' : 'var(--color-border)',
            }}
          >
            <option value="">월</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={String(m)}>{m}월</option>
            ))}
          </select>
        </div>

        {/* 일 */}
        <div style={{ flex: '1.2', position: 'relative' }}>
          <select
            value={day}
            onChange={(e) => { setDay(e.target.value); setError(''); }}
            style={{
              ...selectStyle,
              width: '100%',
              borderColor: error && !day ? 'var(--color-danger)' : 'var(--color-border)',
            }}
          >
            <option value="">일</option>
            {Array.from({ length: maxDay }, (_, i) => i + 1).map((d) => (
              <option key={d} value={String(d)}>{d}일</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <p style={{ color: 'var(--color-danger)', fontSize: 13, marginTop: 8 }}>{error}</p>
      )}

      <button
        onClick={handleSkip}
        style={{
          marginTop: 20,
          background: 'none',
          border: 'none',
          color: 'var(--color-text-secondary)',
          fontSize: 15,
          cursor: 'pointer',
          padding: '4px 0',
        }}
      >
        {copy.skip}
      </button>

      <BottomCTA>
        <button
          onClick={handleNext}
          style={{
            width: '100%',
            padding: '16px',
            background: isFullyFilled ? 'var(--color-primary)' : isPartiallyFilled ? 'var(--color-border)' : 'var(--color-primary)',
            color: isPartiallyFilled && !isFullyFilled ? 'var(--color-text-disabled)' : '#fff',
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
