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
    <div style={{ padding: '48px 24px 120px' }}>
      <button
        onClick={() => navigate(-1)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 24, marginBottom: 24 }}
        aria-label="뒤로"
      >
        ←
      </button>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>준비 현황을 공유해요</h2>
      <ShareCard ddayLabel={ddayLabel} progress={progress} completedCount={completedCount} />
      <BottomCTA>
        <button
          onClick={share}
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
          공유하기
        </button>
      </BottomCTA>
    </div>
  );
}
