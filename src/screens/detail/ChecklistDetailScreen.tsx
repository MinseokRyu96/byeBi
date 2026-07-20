import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ALL_CHECKLIST_ITEMS } from '@/content/checklistItems';
import { InformationNotice } from '@/components/InformationNotice';
import { EmptyState } from '@/components/EmptyState';
import { BottomCTA } from '@/components/BottomCTA';
import { getChecklistStates, saveChecklistStates } from '@/storage/checklistState';
import { getUserPlan } from '@/storage/userPlan';
import { trackEvent } from '@/analytics/events';

export function ChecklistDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = ALL_CHECKLIST_ITEMS.find((i) => i.id === id);
  const [plan] = useState(() => getUserPlan());
  const [completed, setCompleted] = useState(() => {
    const states = getChecklistStates();
    return states.some((s) => s.itemId === id && s.isCompleted);
  });

  if (!item) return <EmptyState variant="no-data" />;

  function handleToggleComplete() {
    if (!plan || !id) return;
    const now = new Date().toISOString();
    const states = getChecklistStates();
    const next = !completed;
    const updated = states.filter((s) => s.itemId !== id);
    updated.push({ planId: plan.id, itemId: id, isCompleted: next, completedAt: next ? now : null, createdAt: now, updatedAt: now });
    saveChecklistStates(updated);
    setCompleted(next);
    trackEvent(next ? 'checklist_item_complete' : 'checklist_item_uncomplete', { itemId: id, source: 'detail' });
  }

  return (
    <div style={{ padding: '24px 24px 120px' }}>
      <button
        onClick={() => navigate(-1)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', marginBottom: 20, display: 'flex', alignItems: 'center' }}
        aria-label="뒤로"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="var(--color-text-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>{item.recommendedTiming}</p>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, letterSpacing: -0.4, color: 'var(--color-text-primary)' }}>{item.title}</h2>
      <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>
        {item.detailDescription}
      </p>
      {item.confirmationTarget && (
        <div style={{ background: 'var(--color-surface-secondary)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: 12, border: '1px solid var(--color-border-light)' }}>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--color-text-tertiary)', fontWeight: 600, letterSpacing: 0.2, textTransform: 'uppercase' }}>확인 대상</p>
          <p style={{ margin: '6px 0 0', fontSize: 15, fontWeight: 500, color: 'var(--color-text-primary)' }}>{item.confirmationTarget}</p>
        </div>
      )}
      {item.cautionMessage && (
        <div style={{ background: '#fff8f0', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: 12, border: '1px solid #ffd8a8' }}>
          <p style={{ margin: 0, fontSize: 12, color: '#e67700', fontWeight: 600, letterSpacing: 0.2, textTransform: 'uppercase' }}>주의사항</p>
          <p style={{ margin: '6px 0 0', fontSize: 15, color: 'var(--color-text-primary)' }}>{item.cautionMessage}</p>
        </div>
      )}
      <InformationNotice />
      <BottomCTA>
        <button
          onClick={handleToggleComplete}
          style={{
            width: '100%',
            padding: '16px',
            background: completed ? 'var(--color-surface-secondary)' : 'var(--color-primary)',
            color: completed ? 'var(--color-text-secondary)' : '#fff',
            border: completed ? '1px solid var(--color-border)' : 'none',
            borderRadius: 'var(--radius-md)',
            fontSize: 17,
            fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: -0.2,
          }}
        >
          {completed ? '완료됨 · 취소하기' : '완료로 표시하기'}
        </button>
      </BottomCTA>
    </div>
  );
}
