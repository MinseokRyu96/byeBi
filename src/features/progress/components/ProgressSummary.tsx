interface ProgressSummaryProps {
  ddayLabel: string;
  progress: number;
  completedCount: number;
  totalCount: number;
}

export function ProgressSummary({ ddayLabel, progress, completedCount, totalCount }: ProgressSummaryProps) {
  const isComplete = progress === 100;

  return (
    <div
      style={{
        background: isComplete
          ? 'linear-gradient(135deg, #00b493 0%, #009a7d 100%)'
          : 'linear-gradient(135deg, #3182f6 0%, #1b64da 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 20px 18px',
        marginBottom: 24,
        boxShadow: isComplete
          ? '0 4px 16px rgba(0, 180, 147, 0.25)'
          : '0 4px 16px rgba(49, 130, 246, 0.25)',
      }}
    >
      <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.75)', marginBottom: 4 }}>
        {isComplete ? '모두 완료했어요!' : '퇴사까지'}
      </p>
      <p style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: -0.5 }}>
        {ddayLabel}
      </p>

      <div style={{ marginTop: 16, background: 'rgba(255,255,255,0.25)', borderRadius: 'var(--radius-full)', height: 6 }}>
        <div
          style={{
            width: `${progress}%`,
            background: '#fff',
            height: '100%',
            borderRadius: 'var(--radius-full)',
            transition: 'width 0.4s ease',
          }}
        />
      </div>

      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
          {completedCount}/{totalCount}개 완료
        </p>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#fff' }}>
          {progress}%
        </p>
      </div>
    </div>
  );
}
