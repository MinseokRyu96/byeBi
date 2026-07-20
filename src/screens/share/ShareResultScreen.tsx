import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShareCard } from '@/features/sharing/components/ShareCard';
import { useShare } from '@/features/sharing/useShare';
import { useChecklist } from '@/features/checklist/useChecklist';
import { useProgress } from '@/features/progress/useProgress';
import { BottomCTA } from '@/components/BottomCTA';
import { getUserPlan } from '@/storage/userPlan';

export function ShareResultScreen() {
  const navigate = useNavigate();
  const [plan] = useState(() => getUserPlan());
  const { completedCount, totalCount } = useChecklist(plan);
  const { ddayLabel, progress } = useProgress(plan, completedCount, totalCount);
  const { share } = useShare(plan, progress, completedCount);

  return (
    <div style={{ padding: '24px 20px 120px' }}>
      <button
        onClick={() => navigate(-1)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', marginBottom: 20, display: 'flex', alignItems: 'center' }}
        aria-label="뒤로"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="var(--color-text-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, letterSpacing: -0.4 }}>준비 현황을 공유해요</h2>
      <ShareCard ddayLabel={ddayLabel} progress={progress} completedCount={completedCount} />
      <BottomCTA>
        <button
          onClick={share}
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
          공유하기
        </button>
      </BottomCTA>
    </div>
  );
}
