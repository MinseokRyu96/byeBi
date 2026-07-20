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
import { useTheme } from '@/hooks/useTheme';
import type { ChecklistCategory } from '@/types/checklist';

export function ChecklistHomeScreen() {
  const navigate = useNavigate();
  const [plan] = useState(() => getUserPlan());
  const { items, completedIds, toggleItem, completedCount, totalCount } = useChecklist(plan);
  const { dday, ddayLabel, progress } = useProgress(plan, completedCount, totalCount);
  const { theme, toggle: toggleTheme } = useTheme();

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
    <div style={{ background: 'var(--color-bg)', minHeight: '100dvh' }}>
      {/* 헤더 */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 20px 12px',
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border-light)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 16 }}>👋</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: -0.3 }}>byebye</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button
            onClick={toggleTheme}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
          >
            {theme === 'dark' ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="5" stroke="var(--color-text-secondary)" strokeWidth="1.8" />
                <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                  stroke="var(--color-text-secondary)" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="var(--color-text-secondary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <button
            onClick={() => navigate('/settings')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="설정"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="3" stroke="var(--color-text-secondary)" strokeWidth="1.6" />
              <path d="M11 2v2M11 18v2M2 11h2M18 11h2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M4.22 17.78l1.42-1.42M16.36 5.64l1.42-1.42"
                stroke="var(--color-text-secondary)" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div style={{ padding: '16px 20px 80px' }}>
      <ProgressSummary
        dday={dday}
        ddayLabel={ddayLabel}
        resignationDate={plan?.resignationDate ?? null}
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
    </div>
  );
}
