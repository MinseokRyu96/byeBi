import type { UserPlan } from '@/types/plan';
import type { ChecklistItem, ChecklistRule } from '@/types/checklist';

function ruleMatches(rule: ChecklistRule, plan: UserPlan): boolean {
  if (rule.resignationStatus && !rule.resignationStatus.includes(plan.resignationStatus)) {
    return false;
  }
  if (rule.nextCareerStatus) {
    if (!plan.nextCareerStatus || !rule.nextCareerStatus.includes(plan.nextCareerStatus)) {
      return false;
    }
  }
  if (rule.conditions) {
    const hasAll = rule.conditions.every((c) => plan.conditions.includes(c));
    if (!hasAll) return false;
  }
  return true;
}

export function matchesPlan(item: ChecklistItem, plan: UserPlan): boolean {
  if (item.applicableRules.length === 0) return true;
  return item.applicableRules.some((rule) => ruleMatches(rule, plan));
}
