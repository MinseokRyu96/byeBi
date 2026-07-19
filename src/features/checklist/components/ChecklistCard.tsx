import type { ChecklistItem } from '@/types/checklist';

interface ChecklistCardProps {
  item: ChecklistItem;
  isCompleted: boolean;
  onToggle: () => void;
  onDetailClick: () => void;
}

const PRIORITY_LABEL = { HIGH: '중요', MEDIUM: '보통', LOW: '낮음' };

export function ChecklistCard({ item, isCompleted, onToggle, onDetailClick }: ChecklistCardProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        borderRadius: 12,
        background: isCompleted ? '#f8f8f8' : '#fff',
        border: '1px solid #e5e5e5',
        marginBottom: 8,
        gap: 12,
      }}
    >
      <button
        onClick={onToggle}
        aria-label={isCompleted ? '완료 취소' : '완료'}
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          border: `2px solid ${isCompleted ? '#3182f6' : '#ccc'}`,
          background: isCompleted ? '#3182f6' : 'transparent',
          cursor: 'pointer',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: 14,
        }}
      >
        {isCompleted ? '✓' : ''}
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontSize: 15,
            fontWeight: 500,
            textDecoration: isCompleted ? 'line-through' : 'none',
            color: isCompleted ? '#aaa' : '#1a1a1a',
          }}
        >
          {item.title}
        </p>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#888' }}>
          {item.recommendedTiming} · {PRIORITY_LABEL[item.priority]}
        </p>
      </div>
      <button
        onClick={onDetailClick}
        aria-label="상세 보기"
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: 20 }}
      >
        ›
      </button>
    </div>
  );
}
