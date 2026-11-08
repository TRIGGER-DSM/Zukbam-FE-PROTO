import type { ActivityDay } from './growth';

export interface ActivitySummary {
  streak: number;
  nextStreak: number;
  longestStreak: number;
  daysToRecord: number;
  completedWeekdays: number;
  year: number;
  monthlySolved: number;
  week?: boolean[];
  todayIndex?: number;
  activityDays?: ActivityDay[];
}
