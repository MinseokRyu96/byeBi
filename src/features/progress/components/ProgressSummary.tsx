import { formatResignationDate } from '@/utils/dday';

interface ProgressSummaryProps {
  dday: number | null;
  ddayLabel: string;
  resignationDate: string | null;
  progress: number;
  completedCount: number;
  totalCount: number;
}

export function ProgressSummary({ dday, ddayLabel, resignationDate, progress, completedCount, totalCount }: ProgressSummaryProps) {
  const isComplete = progress === 100;
  const dateLabel = formatResignationDate(resignationDate);
  const isOver = dday !== null && dday < 0;

  return (
    <div
      style={{
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        marginBottom: 20,
        border: '1px solid var(--color-border-light)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* 헤더 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)', letterSpacing: 0.3 }}>
          퇴사 D-DAY
        </span>
        {isComplete && (
          <span style={{
            fontSize: 11, fontWeight: 600, color: 'var(--color-success)',
            background: 'var(--color-success-light)', borderRadius: 'var(--radius-full)',
            padding: '2px 8px',
          }}>
            완료
          </span>
        )}
      </div>

      {/* D-DAY 숫자 */}
      <p style={{
        margin: 0,
        fontSize: 40,
        fontWeight: 700,
        letterSpacing: -1.5,
        color: isComplete
          ? 'var(--color-success)'
          : isOver
            ? 'var(--color-text-secondary)'
            : 'var(--color-primary)',
        lineHeight: 1.1,
      }}>
        {ddayLabel}
      </p>

      {/* 날짜 */}
      {dateLabel && (
        <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--color-text-tertiary)' }}>
          {dateLabel}
        </p>
      )}

      {/* 구분선 */}
      <div style={{ margin: '16px 0 14px', height: 1, background: 'var(--color-border-light)' }} />

      {/* 진행률 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: 'var(--color-text-secondary)', fontWeight: 500 }}>전체 진행률</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)' }}>{progress}%</span>
      </div>

      <div style={{ background: 'var(--color-border)', borderRadius: 'var(--radius-full)', height: 5 }}>
        <div
          style={{
            width: `${progress}%`,
            background: isComplete ? 'var(--color-success)' : 'var(--color-primary)',
            height: '100%',
            borderRadius: 'var(--radius-full)',
            transition: 'width 0.4s ease',
          }}
        />
      </div>

      <p style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--color-text-tertiary)' }}>
        {completedCount}/{totalCount}개 완료
      </p>
    </div>
  );
}
