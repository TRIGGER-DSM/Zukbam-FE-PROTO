export interface GrowthSummary {
  currentStreak: number;
  longestStreak: number;
  activeDays: number;
  monthlySolved: number;
  referenceDate: string;
  completedWeekdays: number;
  streakDates: string[];
  week?: boolean[];
  todayIndex?: number;
  activityDays?: ActivityDay[];
}

export interface ActivityDay {
  date: string;
  solvedCount: number;
}

export interface CalendarDay {
  date: string;
  day: number;
  completed: boolean;
  current: boolean;
  startsBand: boolean;
  endsBand: boolean;
}
