import type { UserPlan } from '@/types/plan';
import { STORAGE_KEYS } from './keys';

export function getUserPlan(): UserPlan | null {
  const raw = localStorage.getItem(STORAGE_KEYS.USER_PLAN);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserPlan;
  } catch {
    return null;
  }
}

export function saveUserPlan(plan: UserPlan): void {
  localStorage.setItem(STORAGE_KEYS.USER_PLAN, JSON.stringify(plan));
}

export function clearUserPlan(): void {
  localStorage.removeItem(STORAGE_KEYS.USER_PLAN);
}
