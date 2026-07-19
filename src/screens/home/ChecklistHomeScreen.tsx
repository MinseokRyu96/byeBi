import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChecklist } from '@/features/checklist/useChecklist';
import { useProgress } from '@/features/progress/useProgress';
import { ProgressSummary } from '@/features/progress/components/ProgressSummary';
import { ChecklistCard } from '@/features/checklist/components/ChecklistCard';
import { ChecklistSection } from '@/features/checklist/components/ChecklistSection';
import { EmptyState } from '@/components/EmptyState';
import { trackEvent } from '@/analytics/events';
import { getUserPlan } from '@/storage/userPlan';
import { CATEGORY_LABELS } from '@/content/categories';
import type { ChecklistCategory } from '@/types/checklist';

export function ChecklistHomeScreen() {
  const navigate = useNavigate();
  const [plan] = useState(() => getUserPlan());
  const { items, completedIds, toggleItem, completedCount, totalCount } = useChecklist(plan);
  const { ddayLabel, progress } = useProgress(plan, completedCount, totalCount);

  useEffect(() => {
    if (!plan) {
      navigate('/', { replace: true });
      return;
    }
    trackEvent('checklist_home_view');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    const key = item.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  if (items.length === 0) return <EmptyState variant="no-data" />;

  return (
    <div style={{ padding: '24px 24px 80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>퇴사 준비</h1>
        <button
          onClick={() => navigate('/settings')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 24 }}
          aria-label="설정"
        >
          ⚙️
        </button>
      </div>
      <ProgressSummary
        ddayLabel={ddayLabel}
        progress={progress}
        completedCount={completedCount}
        totalCount={totalCount}
      />
      {Object.entries(grouped).map(([category, categoryItems]) => (
        <ChecklistSection key={category} title={CATEGORY_LABELS[category as ChecklistCategory]}>
          {categoryItems.map((item) => (
            <ChecklistCard
              key={item.id}
              item={item}
              isCompleted={completedIds.has(item.id)}
              onToggle={() => {
                trackEvent(completedIds.has(item.id) ? 'checklist_item_uncomplete' : 'checklist_item_complete', { itemId: item.id });
                toggleItem(item.id);
              }}
              onDetailClick={() => {
                trackEvent('checklist_detail_click', { itemId: item.id });
                navigate(`/detail/${item.id}`);
              }}
            />
          ))}
        </ChecklistSection>
      ))}
      <button
        onClick={() => {
          trackEvent('checklist_share_click');
          navigate('/share');
        }}
        style={{
          width: '100%',
          padding: '14px',
          background: '#f5f8ff',
          color: '#3182f6',
          border: '1px solid #3182f6',
          borderRadius: 12,
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer',
          marginTop: 8,
        }}
      >
        준비 현황 공유하기
      </button>
    </div>
  );
}
