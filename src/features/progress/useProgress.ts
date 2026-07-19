import { calcDday, formatDday } from '@/utils/dday';
import type { UserPlan } from '@/types/plan';

export function useProgress(plan: UserPlan | null, completedCount: number, totalCount: number) {
  const dday = plan ? calcDday(plan.resignationDate) : null;
  const ddayLabel = formatDday(dday);
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  const remaining = totalCount - completedCount;

  return { dday, ddayLabel, progress, completedCount, remaining, totalCount };
}
