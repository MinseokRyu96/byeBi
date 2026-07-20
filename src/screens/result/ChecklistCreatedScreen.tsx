import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomCTA } from '@/components/BottomCTA';
import { trackEvent } from '@/analytics/events';
import { getUserPlan } from '@/storage/userPlan';
import { generateChecklist } from '@/rules/generateChecklist';
import { ALL_CHECKLIST_ITEMS } from '@/content/checklistItems';

export function ChecklistCreatedScreen() {
  const navigate = useNavigate();
  const plan = getUserPlan();
  const count = plan ? generateChecklist(plan, ALL_CHECKLIST_ITEMS).length : 0;

  useEffect(() => {
    trackEvent('checklist_created_view');
  }, []);

  return (
    <div style={{ padding: '60px 24px 120px', textAlign: 'center' }}>
      <div style={{
        width: 72, height: 72, borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, #3182f6 0%, #1b64da 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 28px',
        boxShadow: '0 8px 24px rgba(49, 130, 246, 0.3)',
      }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M8 18l7 7 13-13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 10, letterSpacing: -0.5, color: 'var(--color-text-primary)' }}>
        체크리스트가 준비됐어요!
      </h2>
      <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
        총 <strong style={{ color: 'var(--color-text-primary)' }}>{count}개</strong>의 준비 항목을 확인해보세요.
      </p>
      <BottomCTA>
        <button
          onClick={() => navigate('/home', { replace: true })}
          style={{
            width: '100%',
            padding: '16px',
            background: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontSize: 17,
            fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: -0.2,
          }}
        >
          체크리스트 확인하기
        </button>
      </BottomCTA>
    </div>
  );
}
