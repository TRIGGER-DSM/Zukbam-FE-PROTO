export type StreakDayStatus = 'completed' | 'today' | 'upcoming';

export interface StreakMilestone {
  days: number;
  bestDays: number;
  week: {
    label: string;
    status: StreakDayStatus;
  }[];
}

export function daysUntilBest(milestone: StreakMilestone) {
  return Math.max(0, milestone.bestDays - milestone.days);
}
