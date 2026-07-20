import { useNavigate } from 'react-router-dom';
import { BottomCTA } from '@/components/BottomCTA';
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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', padding: '0 24px', paddingBottom: 'calc(80px + env(safe-area-inset-bottom))' }}>
      {/* 상단 영역 */}
      <div style={{ flex: 1, paddingTop: 60 }}>
        {/* 아이콘 */}
        <div style={{
          width: 64, height: 64, borderRadius: 18,
          background: 'linear-gradient(135deg, #3182f6 0%, #1b64da 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 28, boxShadow: '0 8px 24px rgba(49, 130, 246, 0.3)',
        }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="8" y="4" width="16" height="3" rx="1.5" fill="white" opacity="0.7" />
            <rect x="10" y="2" width="12" height="5" rx="2" fill="white" />
            <rect x="6" y="7" width="20" height="22" rx="3" fill="white" opacity="0.15" stroke="white" strokeWidth="1.5" />
            <path d="M11 15l2.5 2.5L21 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 22h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>

        {/* 헤드라인 */}
        <h1 style={{
          fontSize: 26, fontWeight: 700, lineHeight: 1.3,
          color: 'var(--color-text-primary)', marginBottom: 12, letterSpacing: -0.5,
        }}>
          퇴사 준비,<br />무엇부터 해야 할까요?
        </h1>
        <p style={{
          fontSize: 15, color: 'var(--color-text-secondary)',
          lineHeight: 1.6, marginBottom: 36,
        }}>
          현재 상황을 알려주시면 해야 할 일을<br />순서대로 정리해드려요.
        </p>

        {/* 혜택 카드 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { icon: '📋', text: '퇴사 전·후 준비 사항 정리' },
            { icon: '✨', text: '내 상황에 맞는 맞춤 체크리스트' },
            { icon: '📊', text: '완료 진행률 한눈에 확인' },
          ].map(({ icon, text }) => (
            <div key={text} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 16px',
              background: 'var(--color-surface-secondary)',
              borderRadius: 'var(--radius-md)',
            }}>
              <span style={{ fontSize: 18 }}>{icon}</span>
              <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-text-primary)' }}>{text}</span>
            </div>
          ))}
        </div>

        {/* 법적 고지 */}
        <p style={{
          marginTop: 24, fontSize: 12, color: 'var(--color-text-tertiary)', lineHeight: 1.6,
        }}>
          이 서비스는 정보 제공 목적이며 법률·노무 자문을 제공하지 않습니다.
        </p>
      </div>

      <BottomCTA>
        <button
          onClick={handleStart}
          style={{
            width: '100%', padding: '16px',
            background: 'var(--color-primary)', color: '#fff',
            border: 'none', borderRadius: 'var(--radius-md)',
            fontSize: 17, fontWeight: 600, cursor: 'pointer',
            letterSpacing: -0.2,
          }}
        >
          내 체크리스트 만들기
        </button>
      </BottomCTA>
    </div>
  );
}
