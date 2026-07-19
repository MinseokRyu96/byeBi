import type { ResignationStatus, NextCareerStatus, UserCondition } from './plan';

export type ChecklistCategory =
  | 'BEFORE_DECISION'
  | 'FOUR_WEEKS_BEFORE'
  | 'TWO_WEEKS_BEFORE'
  | 'ONE_WEEK_BEFORE'
  | 'ON_THE_DAY'
  | 'AFTER_LEAVING'
  | 'JOB_SEARCH'
  | 'CAREER_BREAK';

export type ChecklistRule = {
  resignationStatus?: ResignationStatus[];
  nextCareerStatus?: NextCareerStatus[];
  conditions?: UserCondition[];
};

export interface ChecklistItem {
  id: string;
  category: ChecklistCategory;
  title: string;
  shortDescription: string;
  detailDescription: string;
  recommendedTiming: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  applicableRules: ChecklistRule[];
  confirmationTarget?: string;
  cautionMessage?: string;
  sourceUpdatedAt?: string;
}

export interface UserChecklistState {
  planId: string;
  itemId: string;
  isCompleted: boolean;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
