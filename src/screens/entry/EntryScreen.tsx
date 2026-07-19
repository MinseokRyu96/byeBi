import { useNavigate } from 'react-router-dom';
import { BottomCTA } from '@/components/BottomCTA';
import { InformationNotice } from '@/components/InformationNotice';
import { trackEvent } from '@/analytics/events';
import { useEffect, useState } from 'react';
import { getUserPlan } from '@/storage/userPlan';

export function EntryScreen() {
  const navigate = useNavigate();
  const [plan] = useState(() => getUserPlan());

  useEffect(() => {
    if (plan) {
      navigate('/home', { replace: true });
      return;
    }
    trackEvent('resignation_intro_view');
  }, []);

  function handleStart() {
    trackEvent('resignation_start_click');
    navigate('/onboarding/status');
  }

  return (
    <div style={{ padding: '48px 24px 120px' }}>
      <div style={{ fontSize: 48, marginBottom: 24 }}>📋</div>
      <h1 style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.4, marginBottom: 12 }}>
        퇴사 준비,
        <br />
        무엇부터 해야 할까요?
      </h1>
      <p style={{ fontSize: 16, color: '#555', lineHeight: 1.6 }}>
        현재 상황을 알려주시면 해야 할 일을 순서대로 정리해드려요.
      </p>
      <ul style={{ margin: '24px 0', padding: 0, listStyle: 'none' }}>
        {['퇴사 전·후 준비 사항 정리', '내 상황에 맞는 맞춤 체크리스트', '완료 진행률 한눈에 확인'].map(
          (text) => (
            <li
              key={text}
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontSize: 15 }}
            >
              <span style={{ color: '#3182f6' }}>✓</span>
              {text}
            </li>
          ),
        )}
      </ul>
      <InformationNotice />
      <BottomCTA>
        <button
          onClick={handleStart}
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
          내 체크리스트 만들기
        </button>
      </BottomCTA>
    </div>
  );
}
