import type { UserPlan } from '@/types/plan';

export function useShare(plan: UserPlan | null, progress: number, completedCount: number) {
  function share() {
    if (!plan) return;
    const text = [
      '퇴사 준비 현황을 공유해요!',
      `진행률: ${progress}% (${completedCount}개 완료)`,
      '',
      '퇴사 준비 체크리스트 앱으로 준비해보세요.',
    ].join('\n');

    if (navigator.share) {
      navigator.share({ text }).catch(() => undefined);
    } else {
      navigator.clipboard.writeText(text).catch(() => undefined);
    }
  }

  return { share };
}
