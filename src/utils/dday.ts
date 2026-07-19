export function calcDday(resignationDate: string | null): number | null {
  if (!resignationDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(resignationDate);
  target.setHours(0, 0, 0, 0);
  const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

export function formatDday(dday: number | null): string {
  if (dday === null) return '날짜 미정';
  if (dday === 0) return '퇴사 D-Day';
  if (dday > 0) return `퇴사 D-${dday}`;
  return `퇴사 D+${Math.abs(dday)}`;
}
