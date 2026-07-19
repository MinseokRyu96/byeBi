import type { UserChecklistState } from '@/types/checklist';
import { STORAGE_KEYS } from './keys';

export function getChecklistStates(): UserChecklistState[] {
  const raw = localStorage.getItem(STORAGE_KEYS.CHECKLIST_STATE);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as UserChecklistState[];
  } catch {
    return [];
  }
}

export function saveChecklistStates(states: UserChecklistState[]): void {
  localStorage.setItem(STORAGE_KEYS.CHECKLIST_STATE, JSON.stringify(states));
}

export function clearChecklistStates(): void {
  localStorage.removeItem(STORAGE_KEYS.CHECKLIST_STATE);
}
