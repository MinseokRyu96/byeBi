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
    <div style={{ padding: '48px 24px 120px', textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>체크리스트가 준비됐어요!</h2>
      <p style={{ fontSize: 16, color: '#555' }}>
        총 <strong>{count}개</strong>의 준비 항목을 확인해보세요.
      </p>
      <BottomCTA>
        <button
          onClick={() => navigate('/home', { replace: true })}
          style={{
            width: '100%',
            padding: '16px',
            background: '#3182f6',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            fontSize: 17,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          체크리스트 확인하기
        </button>
      </BottomCTA>
    </div>
  );
}
