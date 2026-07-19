import type { UserPlan } from '@/types/plan';
import type { ChecklistItem } from '@/types/checklist';
import { matchesPlan } from './matchesPlan';
import { sortByTiming } from './sortByTiming';

export function generateChecklist(plan: UserPlan, items: ChecklistItem[]): ChecklistItem[] {
  const seen = new Set<string>();
  return items
    .filter((item) => matchesPlan(item, plan))
    .filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    })
    .sort(sortByTiming);
}
