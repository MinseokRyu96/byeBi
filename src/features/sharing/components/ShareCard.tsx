interface ShareCardProps {
  ddayLabel: string;
  progress: number;
  completedCount: number;
}

export function ShareCard({ ddayLabel, progress, completedCount }: ShareCardProps) {
  return (
    <div
      style={{
        background: '#ebf3ff',
        borderRadius: 16,
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <p style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>{ddayLabel}</p>
      <p style={{ fontSize: 16, color: '#555', margin: '8px 0 0' }}>
        준비 진행률 {progress}% · {completedCount}개 완료
      </p>
      <p style={{ fontSize: 13, color: '#888', margin: '16px 0 0' }}>퇴사 준비 체크리스트</p>
    </div>
  );
}
