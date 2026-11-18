import { ApiError } from '../../../shared/api/client';
import { queryOptions } from '@tanstack/react-query';
import { getUser } from '../../member/infrastructure/profileApi';
import { tierThresholds } from '../../ranking/domain/leaderboard';
import type { Friend } from '../../social/domain/friend';
import { recentSubmissions } from '../../submission/infrastructure/solutionApi';
import type { FriendCardTone, FriendProblem } from '../domain/problem';
import { problemDetailOptions } from './problemApi';

const tones: FriendCardTone[] = ['red', 'blue', 'green', 'yellow'];
const recentWindow = 7 * 86_400_000;

export function friendProblemOptions(viewerId: number | undefined, friends: Friend[]) {
  const candidates = friends.slice(0, 4);
  return queryOptions({
    queryKey: ['friend-problems', viewerId, candidates.map(({ id }) => id)],
    enabled: viewerId !== undefined && candidates.length > 0,
    staleTime: 60_000,
    queryFn: async ({ signal, client }): Promise<FriendProblem[]> => {
      const cutoff = Date.now() - recentWindow;
      const matches = await Promise.all(
        candidates.map(async (friend, index) => {
          const profile = await getUser(Number(friend.id), signal);
          if (!profile.email) return [];
          const tier =
            tierThresholds.find(({ label }) => label === profile.rank)?.id ?? friend.tier;
          const submissions = await recentSubmissions(profile.email, cutoff, signal);
          const accepted = new Map<number, string>();
          for (const { problemId, status, submittedAt } of submissions) {
            if (problemId && status === 'ACCEPTED' && !accepted.has(problemId)) {
              accepted.set(problemId, submittedAt);
            }
          }
          return [...accepted].map(([problemId, time]) => ({
            problemId,
            time,
            friend: profile.name,
            friendId: friend.id,
            tone: tones[index],
            tier,
          }));
        }),
      );
      const latest = matches
        .flat()
        .sort((a, b) => Date.parse(b.time) - Date.parse(a.time))
        .slice(0, 4);
      const cards = await Promise.all(
        latest.map(async ({ problemId, ...record }) => {
          try {
            const problem = await client.fetchQuery(problemDetailOptions(problemId));
            return { ...record, problem: { ...problem, categories: [] } };
          } catch (error) {
            if (error instanceof ApiError && error.status === 404) return undefined;
            throw error;
          }
        }),
      );
      return cards.filter((card) => card !== undefined);
    },
  });
}
