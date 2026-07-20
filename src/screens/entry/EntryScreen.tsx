import { useNavigate } from 'react-router-dom';
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
    <div style={{
      display: 'flex', flexDirection: 'column', minHeight: '100dvh',
      background: '#0d1221',
    }}>
      {/* 상단 콘텐츠 */}
      <div style={{ flex: 1, padding: '56px 24px 32px', display: 'flex', flexDirection: 'column' }}>

        {/* 브랜드 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 52 }}>
          <span style={{ fontSize: 22 }}>👋</span>
          <span style={{
            fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: -0.5,
          }}>byebye</span>
        </div>

        {/* 메인 카피 */}
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: 28, fontWeight: 700, lineHeight: 1.35,
            color: '#fff', marginBottom: 4, letterSpacing: -0.8,
          }}>
            퇴사부터<br />새로운 시작까지,
          </h1>
          <h2 style={{
            fontSize: 28, fontWeight: 700, lineHeight: 1.35,
            color: 'var(--color-primary)', marginBottom: 24, letterSpacing: -0.8,
          }}>
            놓치는 것 없이<br />준비하세요
          </h2>
          <p style={{
            fontSize: 15, color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7,
          }}>
            체크리스트와 D-DAY로<br />퇴사 준비를 체계적으로 도와드려요
          </p>

          {/* 피처 리스트 */}
          <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: '맞춤 체크리스트', desc: '내 상황에 맞는 준비 항목 자동 생성' },
              { label: 'D-DAY 카운트다운', desc: '퇴사일까지 남은 날 한눈에 확인' },
              { label: '단계별 진행 관리', desc: '완료 항목 체크하며 준비 상황 추적' },
            ].map(({ label, desc }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--color-primary)', marginTop: 7, flexShrink: 0,
                }} />
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#fff' }}>{label}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 CTA — dark 테마에 맞게 직접 배치 */}
      <div style={{
        padding: '16px 24px',
        paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
        background: 'rgba(255,255,255,0.04)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}>
        <button
          onClick={handleStart}
          style={{
            width: '100%', padding: '17px',
            background: 'var(--color-primary)', color: '#fff',
            border: 'none', borderRadius: 'var(--radius-md)',
            fontSize: 17, fontWeight: 700, cursor: 'pointer',
            letterSpacing: -0.3,
          }}
        >
          내 체크리스트 만들기
        </button>
        <p style={{
          textAlign: 'center', marginTop: 12,
          fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.5,
        }}>
          이 서비스는 정보 제공 목적이며 법률·노무 자문을 제공하지 않습니다.
        </p>
      </div>
    </div>
  );
}
