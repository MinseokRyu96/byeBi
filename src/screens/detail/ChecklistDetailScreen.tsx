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
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 24, marginBottom: 16 }}
        aria-label="뒤로"
      >
        ←
      </button>
      <p style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>{item.recommendedTiming}</p>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>{item.title}</h2>
      <p style={{ fontSize: 16, color: '#333', lineHeight: 1.7, marginBottom: 24 }}>
        {item.detailDescription}
      </p>
      {item.confirmationTarget && (
        <div style={{ background: '#f5f5f5', borderRadius: 12, padding: '16px', marginBottom: 12 }}>
          <p style={{ margin: 0, fontSize: 13, color: '#888' }}>확인 대상</p>
          <p style={{ margin: '4px 0 0', fontSize: 15, fontWeight: 500 }}>{item.confirmationTarget}</p>
        </div>
      )}
      {item.cautionMessage && (
        <div style={{ background: '#fff8f0', borderRadius: 12, padding: '16px', marginBottom: 12, border: '1px solid #ffd8a8' }}>
          <p style={{ margin: 0, fontSize: 13, color: '#e67700' }}>주의사항</p>
          <p style={{ margin: '4px 0 0', fontSize: 15 }}>{item.cautionMessage}</p>
        </div>
      )}
      <InformationNotice />
      <BottomCTA>
        <button
          onClick={handleToggleComplete}
          style={{
            width: '100%',
            padding: '16px',
            background: completed ? '#f5f5f5' : '#3182f6',
            color: completed ? '#555' : '#fff',
            border: completed ? '1px solid #ddd' : 'none',
            borderRadius: 12,
            fontSize: 17,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {completed ? '✓ 완료됨 · 취소하기' : '완료로 표시하기'}
        </button>
      </BottomCTA>
    </div>
  );
}
