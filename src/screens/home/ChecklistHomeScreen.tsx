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
    <div style={{ padding: '24px 20px 80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: -0.3 }}>퇴사 준비</h1>
        <button
          onClick={() => navigate('/settings')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-label="설정"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="3" stroke="var(--color-text-secondary)" strokeWidth="1.6" />
            <path d="M11 2v2M11 18v2M2 11h2M18 11h2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M4.22 17.78l1.42-1.42M16.36 5.64l1.42-1.42"
              stroke="var(--color-text-secondary)" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
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
          padding: '15px',
          background: 'var(--color-primary-light)',
          color: 'var(--color-primary)',
          border: '1.5px solid var(--color-primary)',
          borderRadius: 'var(--radius-md)',
          fontSize: 15,
          fontWeight: 600,
          cursor: 'pointer',
          marginTop: 8,
          letterSpacing: -0.2,
        }}
      >
        준비 현황 공유하기
      </button>
    </div>
  );
}
