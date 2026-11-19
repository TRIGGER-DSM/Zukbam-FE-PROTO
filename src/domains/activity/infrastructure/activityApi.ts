import { queryOptions } from '@tanstack/react-query';
import { apiJson, getAccessToken } from '../../../shared/api/client';
import type { ActivityDay, GrowthSummary } from '../domain/growth';

interface StreakResponse {
  currentStreak: number;
  maxStreak: number;
  lastSolvedDate: string | null;
}

interface GrassResponse {
  from: string;
  to: string;
  days: ActivityDay[];
}

function dateAfter(date: string, offset: number) {
  const day = new Date(`${date}T00:00:00Z`);
  day.setUTCDate(day.getUTCDate() + offset);
  return day.toISOString().slice(0, 10);
}

export function streakOptions() {
  return queryOptions({
    queryKey: ['streak', Boolean(getAccessToken())],
    queryFn: ({ signal }) =>
      apiJson<StreakResponse>('/streaks/me', { authenticated: true, signal }),
  });
}

export function userStreakOptions(userId: number) {
  return queryOptions({
    queryKey: ['streak', userId, Boolean(getAccessToken())],
    enabled: Number.isSafeInteger(userId) && userId > 0 && Boolean(getAccessToken()),
    queryFn: ({ signal }) =>
      apiJson<StreakResponse>(`/streaks/${userId}`, { authenticated: true, signal }),
  });
}

export function growthOptions(userId?: number, viewerId?: number) {
  const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul' }).format(new Date());
  const from = dateAfter(today, -364);
  const path = userId === undefined ? '/streaks/me' : `/streaks/${userId}`;
  return queryOptions({
    queryKey: ['growth', today, Boolean(getAccessToken()), userId, viewerId],
    queryFn: async ({ signal }): Promise<GrowthSummary> => {
      const [streak, grass] = await Promise.all([
        apiJson<StreakResponse>(path, { authenticated: true, signal }),
        apiJson<GrassResponse>(`${path}/grass?from=${from}&to=${today}`, {
          authenticated: true,
          signal,
        }),
      ]);
      const byDate = new Map(grass.days.map((day) => [day.date, day.solvedCount]));
      const activityDays = Array.from({ length: 365 }, (_, index) => {
        const date = dateAfter(from, index);
        return { date, solvedCount: byDate.get(date) ?? 0 };
      });
      const solvedDays = activityDays.filter((day) => day.solvedCount > 0);
      const todayIndex = (new Date(`${today}T00:00:00Z`).getUTCDay() + 6) % 7;
      const week = Array.from(
        { length: 7 },
        (_, index) => (byDate.get(dateAfter(today, index - todayIndex)) ?? 0) > 0,
      );
      return {
        currentStreak: streak.currentStreak,
        longestStreak: streak.maxStreak,
        activeDays: solvedDays.length,
        monthlySolved: solvedDays
          .filter((day) => day.date.startsWith(today.slice(0, 7)))
          .reduce((total, day) => total + day.solvedCount, 0),
        referenceDate: today,
        completedWeekdays: week.filter(Boolean).length,
        week,
        todayIndex,
        streakDates: solvedDays.map((day) => day.date),
        activityDays,
      };
    },
  });
}
