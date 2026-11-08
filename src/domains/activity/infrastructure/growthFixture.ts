import type { GrowthSummary } from '../domain/growth';

export const growthFixture: GrowthSummary = {
  currentStreak: 12,
  longestStreak: 31,
  activeDays: 187,
  monthlySolved: 18,
  referenceDate: '2026-11-04',
  completedWeekdays: 3,
  streakDates: [
    '2026-10-24',
    '2026-10-25',
    '2026-10-26',
    '2026-10-27',
    '2026-10-28',
    '2026-10-29',
    '2026-10-30',
    '2026-10-31',
    '2026-11-01',
    '2026-11-02',
    '2026-11-03',
    '2026-11-04',
  ],
};
