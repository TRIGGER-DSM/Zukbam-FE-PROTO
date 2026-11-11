import type { RankingPeriod } from './leaderboard';

export type CountdownPeriod = Exclude<RankingPeriod, 'all'>;

const koreaOffsetMs = 9 * 60 * 60 * 1000;

export function getRankingCountdown(period: CountdownPeriod, now: number) {
  // Shift into Korean time before reading UTC fields so the browser time zone is irrelevant.
  const koreaDate = new Date(now + koreaOffsetMs);
  const year = koreaDate.getUTCFullYear();
  const month = koreaDate.getUTCMonth();
  const daysUntilMonday = 7 - ((koreaDate.getUTCDay() + 6) % 7);
  const cutoff =
    period === 'monthly'
      ? Date.UTC(year, month + 1, 1)
      : Date.UTC(year, month, koreaDate.getUTCDate() + daysUntilMonday);
  const secondsLeft = Math.ceil((cutoff - koreaOffsetMs - now) / 1000);

  return {
    days: Math.floor(secondsLeft / 86400),
    hours: Math.floor((secondsLeft % 86400) / 3600),
    minutes: Math.floor((secondsLeft % 3600) / 60),
    seconds: secondsLeft % 60,
  };
}
