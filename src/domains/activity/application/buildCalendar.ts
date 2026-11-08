import type { CalendarDay, GrowthSummary } from '../domain/growth';

export function buildCalendar(
  year: number,
  month: number,
  summary: GrowthSummary,
): (CalendarDay | null)[] {
  const firstWeekday = new Date(year, month, 1).getDay();
  const dayCount = new Date(year, month + 1, 0).getDate();
  const completedDates = new Set(summary.streakDates);
  const days = Array.from({ length: dayCount }, (_, index) => {
    const day = index + 1;
    const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return {
      date,
      day,
      completed: completedDates.has(date),
      current: date === summary.referenceDate,
    };
  });
  const cells: (CalendarDay | null)[] = Array.from({ length: firstWeekday }, () => null);
  days.forEach((day, index) => {
    const weekday = (firstWeekday + index) % 7;
    cells.push({
      ...day,
      startsBand: day.completed && (weekday === 0 || !days[index - 1]?.completed),
      endsBand: day.completed && (weekday === 6 || !days[index + 1]?.completed),
    });
  });
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
