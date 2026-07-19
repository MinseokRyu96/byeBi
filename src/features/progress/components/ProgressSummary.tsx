interface ProgressSummaryProps {
  ddayLabel: string;
  progress: number;
  completedCount: number;
  totalCount: number;
}

export function ProgressSummary({ ddayLabel, progress, completedCount, totalCount }: ProgressSummaryProps) {
  return (
    <div
      style={{
        background: '#f5f8ff',
        borderRadius: 16,
        padding: '20px 24px',
        marginBottom: 24,
      }}
    >
      <p style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{ddayLabel}</p>
      <div style={{ marginTop: 12, background: '#e5e5e5', borderRadius: 8, height: 8 }}>
        <div
          style={{
            width: `${progress}%`,
            background: '#3182f6',
            height: '100%',
            borderRadius: 8,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      <p style={{ margin: '8px 0 0', fontSize: 14, color: '#555' }}>
        {completedCount}/{totalCount}개 완료 · {progress}%
      </p>
    </div>
  );
}
