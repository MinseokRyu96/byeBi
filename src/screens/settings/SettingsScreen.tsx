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
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 24, marginBottom: 24 }}
        aria-label="뒤로"
      >
        ←
      </button>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 32 }}>설정</h2>
      <button
        onClick={handleReset}
        style={{
          width: '100%',
          padding: '16px',
          background: '#fff',
          color: '#f04452',
          border: '1px solid #f04452',
          borderRadius: 12,
          fontSize: 16,
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        처음부터 다시 시작하기
      </button>
      <p style={{ fontSize: 13, color: '#aaa', marginTop: 8 }}>
        모든 체크리스트 데이터가 삭제되며 복구할 수 없어요.
      </p>

      {showConfirm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ background: '#fff', borderRadius: 16, padding: '24px', margin: '0 24px', width: '100%', maxWidth: 360 }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 700 }}>정말 초기화할까요?</h3>
            <p style={{ margin: '0 0 24px', fontSize: 15, color: '#555' }}>
              모든 데이터가 삭제되며 복구할 수 없어요.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setShowConfirm(false)}
                style={{ flex: 1, padding: '14px', background: '#f5f5f5', border: 'none', borderRadius: 10, fontSize: 16, cursor: 'pointer' }}
              >
                취소
              </button>
              <button
                onClick={confirmReset}
                style={{ flex: 1, padding: '14px', background: '#f04452', color: '#fff', border: 'none', borderRadius: 10, fontSize: 16, cursor: 'pointer' }}
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
