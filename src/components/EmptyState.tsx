type EmptyStateVariant = 'completed' | 'no-data' | 'restore-failed';

interface EmptyStateProps {
  variant: EmptyStateVariant;
}

const MESSAGES: Record<EmptyStateVariant, { title: string; description: string }> = {
  completed: {
    title: '모든 항목을 완료했어요!',
    description: '퇴사 준비가 잘 되고 있어요.',
  },
  'no-data': {
    title: '아직 체크리스트가 없어요',
    description: '상황을 입력하면 맞춤 체크리스트를 만들어드려요.',
  },
  'restore-failed': {
    title: '데이터를 불러올 수 없어요',
    description: '처음부터 다시 시작할 수 있어요.',
  },
};

export function EmptyState({ variant }: EmptyStateProps) {
  const { title, description } = MESSAGES[variant];
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
      <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{title}</p>
      <p style={{ fontSize: 14, color: '#666' }}>{description}</p>
    </div>
  );
}
