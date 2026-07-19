import { useState } from 'react';
import type { ResignationStatus, NextCareerStatus, UserCondition } from '@/types/plan';

interface OnboardingState {
  resignationStatus: ResignationStatus | null;
  resignationDate: string | null;
  nextCareerStatus: NextCareerStatus | null;
  conditions: UserCondition[];
}

export function useOnboardingFlow() {
  const [state, setState] = useState<OnboardingState>({
    resignationStatus: null,
    resignationDate: null,
    nextCareerStatus: null,
    conditions: [],
  });

  function setResignationStatus(status: ResignationStatus) {
    setState((prev) => ({ ...prev, resignationStatus: status }));
  }

  function setResignationDate(date: string | null) {
    setState((prev) => ({ ...prev, resignationDate: date }));
  }

  function setNextCareerStatus(status: NextCareerStatus) {
    setState((prev) => ({ ...prev, nextCareerStatus: status }));
  }

  function toggleCondition(condition: UserCondition) {
    setState((prev) => {
      const has = prev.conditions.includes(condition);
      return {
        ...prev,
        conditions: has
          ? prev.conditions.filter((c) => c !== condition)
          : [...prev.conditions, condition],
      };
    });
  }

  return { state, setResignationStatus, setResignationDate, setNextCareerStatus, toggleCondition };
}
