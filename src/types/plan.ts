export type ResignationStatus =
  | 'CONSIDERING'
  | 'DISCUSSING_DATE'
  | 'DATE_CONFIRMED'
  | 'ALREADY_LEFT';

export type NextCareerStatus =
  | 'NEXT_JOB_CONFIRMED'
  | 'JOB_SEARCHING'
  | 'CAREER_BREAK'
  | 'UNDECIDED';

export type UserCondition =
  | 'WORKED_OVER_ONE_YEAR'
  | 'HAS_REMAINING_LEAVE'
  | 'USES_COMPANY_ASSETS'
  | 'HAS_COMPANY_BENEFITS'
  | 'WANTS_BENEFIT_INFO'
  | 'NEEDS_PORTFOLIO';

export interface UserPlan {
  id: string;
  resignationStatus: ResignationStatus;
  resignationDate: string | null;
  nextCareerStatus: NextCareerStatus | null;
  conditions: UserCondition[];
  createdAt: string;
  updatedAt: string;
  contentVersion: string;
}
