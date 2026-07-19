type EventName =
  | 'resignation_intro_view'
  | 'resignation_start_click'
  | 'onboarding_status_select'
  | 'onboarding_date_submit'
  | 'onboarding_career_select'
  | 'onboarding_conditions_submit'
  | 'checklist_created_view'
  | 'checklist_home_view'
  | 'checklist_item_complete'
  | 'checklist_item_uncomplete'
  | 'checklist_detail_click'
  | 'checklist_share_click'
  | 'settings_reset_click'
  | 'settings_reset_confirm';

export function trackEvent(name: EventName, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  console.debug('[analytics]', name, params);
  // TODO: Apps-in-Toss SDK 연동
}
