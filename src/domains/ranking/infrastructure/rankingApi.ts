import { queryOptions } from '@tanstack/react-query';
import { apiJson } from '../../../shared/api/client';
import type { PageInfo } from '../../../shared/api/pagination';
import { tierThresholds, type RankingMetric, type RankingPeriod } from '../domain/leaderboard';

interface RankingResponse {
  position: number;
  userId: number;
  name: string;
  rankName: string;
  xp: number;
  solvedCount: number;
  streak: number;
}

const metrics = { xp: 'XP', solved: 'SOLVED_COUNT', streak: 'STREAK' } as const;

export function rankingPageOptions(period: RankingPeriod, metric: RankingMetric, page: number) {
  const rankingPeriod = metric === 'streak' ? 'all' : period;
  return queryOptions({
    queryKey: ['rankings', rankingPeriod, metric, page],
    queryFn: async ({ signal }) => {
      const params = new URLSearchParams({
        metric: metrics[metric],
        period: rankingPeriod.toUpperCase(),
        page: String(page),
        size: '20',
      });
      const data = await apiJson<PageInfo & { rankings: RankingResponse[] }>(
        `/rankings?${params}`,
        { authenticated: true, signal },
      );
      return {
        ...data,
        users: data.rankings.map(
          ({ userId, position, name, rankName, xp, solvedCount, streak }) => ({
            id: String(userId),
            position,
            name,
            xp,
            solved: solvedCount,
            streak,
            tier: tierThresholds.find(({ label }) => label === rankName)?.id,
          }),
        ),
      };
    },
  });
}
