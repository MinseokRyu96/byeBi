import type { ChecklistCategory } from '@/types/checklist';

export const CATEGORY_LABELS: Record<ChecklistCategory, string> = {
  BEFORE_DECISION: '퇴사 결정 전',
  FOUR_WEEKS_BEFORE: '퇴사 4주 전',
  TWO_WEEKS_BEFORE: '퇴사 2주 전',
  ONE_WEEK_BEFORE: '퇴사 1주 전',
  ON_THE_DAY: '퇴사 당일',
  AFTER_LEAVING: '퇴사 후',
  JOB_SEARCH: '이직 준비',
  CAREER_BREAK: '휴식 및 구직 준비',
};

export const CATEGORY_ORDER: ChecklistCategory[] = [
  'BEFORE_DECISION',
  'FOUR_WEEKS_BEFORE',
  'TWO_WEEKS_BEFORE',
  'ONE_WEEK_BEFORE',
  'ON_THE_DAY',
  'AFTER_LEAVING',
  'JOB_SEARCH',
  'CAREER_BREAK',
];
