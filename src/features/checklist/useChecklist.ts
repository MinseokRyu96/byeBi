import { useState, useEffect } from 'react';
import type { ChecklistItem } from '@/types/checklist';
import type { UserPlan } from '@/types/plan';
import { generateChecklist } from '@/rules/generateChecklist';
import { ALL_CHECKLIST_ITEMS } from '@/content/checklistItems';
import { getChecklistStates, saveChecklistStates } from '@/storage/checklistState';

export function useChecklist(plan: UserPlan | null) {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const planId = plan?.id ?? null;

  useEffect(() => {
    if (!plan) return;
    setItems(generateChecklist(plan, ALL_CHECKLIST_ITEMS));
    const states = getChecklistStates();
    setCompletedIds(new Set(states.filter((s) => s.isCompleted).map((s) => s.itemId)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planId]);

  function toggleItem(itemId: string) {
    if (!plan) return;
    const now = new Date().toISOString();
    setCompletedIds((prev) => {
      const next = new Set(prev);
      next.has(itemId) ? next.delete(itemId) : next.add(itemId);

      const states = items.map((item) => ({
        planId: plan.id,
        itemId: item.id,
        isCompleted: next.has(item.id),
        completedAt: next.has(item.id) ? now : null,
        createdAt: now,
        updatedAt: now,
      }));
      saveChecklistStates(states);
      return next;
    });
  }

  const completedCount = completedIds.size;
  const totalCount = items.length;
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return { items, completedIds, toggleItem, completedCount, totalCount, progress };
}
