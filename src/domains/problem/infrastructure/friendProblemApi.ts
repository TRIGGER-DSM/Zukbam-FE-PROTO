import { queryOptions } from '@tanstack/react-query';
import { apiJson } from '../../../shared/api/client';
import { tierThresholds } from '../../ranking/domain/leaderboard';
import type { FriendCardTone, FriendProblem } from '../domain/problem';
import { toProblem, type ProblemSummaryResponse } from './problemApi';

interface SolvedFriendResponse {
  name: string;
  rankName: string;
  solvedAt: string;
}

interface FriendSolvedProblemResponse extends ProblemSummaryResponse {
  friends: SolvedFriendResponse[];
}

const tones: FriendCardTone[] = ['red', 'blue', 'green', 'yellow'];
export const friendProblemsKey = ['friend-problems'] as const;

export function friendProblemOptions(signedIn: boolean) {
  return queryOptions({
    queryKey: [...friendProblemsKey, signedIn],
    enabled: signedIn,
    queryFn: async ({ signal }): Promise<FriendProblem[]> => {
      const { problems } = await apiJson<{ problems: FriendSolvedProblemResponse[] }>(
        `/friends/solved-problems?page=0&size=${tones.length}`,
        { authenticated: true, signal },
      );
      return problems.flatMap(({ friends, ...problem }, index) => {
        const [latestFriend] = friends;
        if (!latestFriend) return [];

        return [
          {
            problem: toProblem(problem),
            friend: latestFriend.name,
            time: latestFriend.solvedAt,
            tier: tierThresholds.find(({ label }) => label === latestFriend.rankName)?.id,
            tone: tones[index % tones.length],
            additionalFriends: friends.length - 1,
          },
        ];
      });
    },
  });
}
