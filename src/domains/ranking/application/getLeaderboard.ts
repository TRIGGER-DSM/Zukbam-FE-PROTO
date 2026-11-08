import { sortLeaderboard, type RankingMetric, type RankingPeriod } from '../domain/leaderboard';
import { leaderboardFixtures } from '../infrastructure/leaderboardFixture';

export function getLeaderboard(period: RankingPeriod, metric: RankingMetric) {
  const users = sortLeaderboard(leaderboardFixtures[period], metric);
  return {
    podium: users.slice(0, 3),
    rows: users.slice(3),
  };
}
