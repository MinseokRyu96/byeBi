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
  if (dday === 0) return 'D-Day';
  if (dday > 0) return `D-${dday}`;
  return `D+${Math.abs(dday)}`;
}

const DAY_KO = ['일', '월', '화', '수', '목', '금', '토'];

export function formatResignationDate(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const dow = DAY_KO[d.getDay()];
  return `${y}.${m}.${day} (${dow}) 퇴사 예정`;
}
