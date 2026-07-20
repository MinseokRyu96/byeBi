import type { ChecklistItem } from '@/types/checklist';

interface ChecklistCardProps {
  item: ChecklistItem;
  isCompleted: boolean;
  onToggle: () => void;
  onDetailClick: () => void;
}

const PRIORITY_COLOR = {
  HIGH: 'var(--color-danger)',
  MEDIUM: 'var(--color-warning)',
  LOW: 'var(--color-text-tertiary)',
};

const PRIORITY_LABEL = { HIGH: '중요', MEDIUM: '보통', LOW: '낮음' };

export function ChecklistCard({ item, isCompleted, onToggle, onDetailClick }: ChecklistCardProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '14px 16px',
        borderRadius: 'var(--radius-md)',
        background: isCompleted ? 'var(--color-surface-secondary)' : 'var(--color-surface)',
        border: `1px solid ${isCompleted ? 'var(--color-border-light)' : 'var(--color-border)'}`,
        marginBottom: 8,
        gap: 12,
        transition: 'background 0.15s ease',
      }}
    >
      <button
        onClick={onToggle}
        aria-label={isCompleted ? '완료 취소' : '완료로 표시'}
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          border: `2px solid ${isCompleted ? 'var(--color-primary)' : 'var(--color-border)'}`,
          background: isCompleted ? 'var(--color-primary)' : 'transparent',
          cursor: 'pointer',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.15s ease',
          padding: 0,
        }}
      >
        {isCompleted && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontSize: 15,
            fontWeight: 500,
            color: isCompleted ? 'var(--color-text-disabled)' : 'var(--color-text-primary)',
            textDecoration: isCompleted ? 'line-through' : 'none',
            letterSpacing: -0.1,
          }}
        >
          {item.title}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{item.recommendedTiming}</span>
          <span style={{ width: 2, height: 2, borderRadius: '50%', background: 'var(--color-border)', display: 'inline-block' }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: PRIORITY_COLOR[item.priority] }}>
            {PRIORITY_LABEL[item.priority]}
          </span>
        </div>
      </div>

      <button
        onClick={onDetailClick}
        aria-label="상세 보기"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, flexShrink: 0, display: 'flex', alignItems: 'center' }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4l4 4-4 4" stroke="var(--color-text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
