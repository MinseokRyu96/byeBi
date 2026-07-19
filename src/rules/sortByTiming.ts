import type { ChecklistItem } from '@/types/checklist';
import { CATEGORY_ORDER } from '@/content/categories';

export function sortByTiming(a: ChecklistItem, b: ChecklistItem): number {
  const ai = CATEGORY_ORDER.indexOf(a.category);
  const bi = CATEGORY_ORDER.indexOf(b.category);
  if (ai !== bi) return ai - bi;

  const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
  return priorityOrder[a.priority] - priorityOrder[b.priority];
}
