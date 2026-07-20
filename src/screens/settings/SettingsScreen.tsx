import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearUserPlan } from '@/storage/userPlan';
import { clearChecklistStates } from '@/storage/checklistState';
import { trackEvent } from '@/analytics/events';
import { STORAGE_KEYS } from '@/storage/keys';

export function SettingsScreen() {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  function handleReset() {
    trackEvent('settings_reset_click');
    setShowConfirm(true);
  }

  function confirmReset() {
    trackEvent('settings_reset_confirm');
    clearUserPlan();
    clearChecklistStates();
    localStorage.removeItem(STORAGE_KEYS.ONBOARDING_COMPLETE);
    navigate('/', { replace: true });
  }

  return (
    <div style={{ padding: '24px' }}>
      <button
        onClick={() => navigate(-1)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', marginBottom: 20, display: 'flex', alignItems: 'center' }}
        aria-label="뒤로"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="var(--color-text-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 32, letterSpacing: -0.4 }}>설정</h2>
      <button
        onClick={handleReset}
        style={{
          width: '100%',
          padding: '16px',
          background: 'var(--color-surface)',
          color: 'var(--color-danger)',
          border: '1px solid var(--color-danger)',
          borderRadius: 'var(--radius-md)',
          fontSize: 15,
          fontWeight: 500,
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        처음부터 다시 시작하기
      </button>
      <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)', marginTop: 8 }}>
        모든 체크리스트 데이터가 삭제되며 복구할 수 없어요.
      </p>

      {showConfirm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
        >
          <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: '24px', margin: '0 24px', width: '100%', maxWidth: 360, boxShadow: 'var(--shadow-lg)' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: 18, fontWeight: 700, letterSpacing: -0.3 }}>정말 초기화할까요?</h3>
            <p style={{ margin: '0 0 24px', fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              모든 데이터가 삭제되며 복구할 수 없어요.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setShowConfirm(false)}
                style={{ flex: 1, padding: '14px', background: 'var(--color-surface-secondary)', border: 'none', borderRadius: 'var(--radius-sm)', fontSize: 15, fontWeight: 500, cursor: 'pointer', color: 'var(--color-text-primary)' }}
              >
                취소
              </button>
              <button
                onClick={confirmReset}
                style={{ flex: 1, padding: '14px', background: 'var(--color-danger)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
              >
                초기화
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
