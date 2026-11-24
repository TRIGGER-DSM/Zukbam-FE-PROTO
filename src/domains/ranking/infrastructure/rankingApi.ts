import { infiniteQueryOptions } from '@tanstack/react-query';
import { apiJson } from '../../../shared/api/client';
import type { PageInfo } from '../../../shared/api/pagination';
import {
  tierThresholds,
  type RankedUser,
  type RankingMetric,
  type RankingPeriod,
} from '../domain/leaderboard';

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

interface RankingPage extends PageInfo {
  users: RankedUser[];
}

export function rankingOptions(period: RankingPeriod, metric: RankingMetric) {
  const rankingPeriod = metric === 'streak' ? 'all' : period;
  return infiniteQueryOptions({
    queryKey: ['rankings', 'infinite', rankingPeriod, metric],
    initialPageParam: 0,
    getNextPageParam: (lastPage: RankingPage) =>
      lastPage.users.length > 0 && lastPage.page + 1 < lastPage.totalPages
        ? lastPage.page + 1
        : undefined,
    queryFn: async ({ signal, pageParam }): Promise<RankingPage> => {
      const params = new URLSearchParams({
        metric: metrics[metric],
        period: rankingPeriod.toUpperCase(),
        page: String(pageParam),
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
