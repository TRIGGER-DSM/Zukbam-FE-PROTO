import { queryOptions } from '@tanstack/react-query';
import { apiJson, apiResponse } from '../../../shared/api/client';
import type { Quest } from '../domain/quest';

export function todayQuestsOptions(userId?: number) {
  return queryOptions({
    queryKey: ['today-quests', userId],
    enabled: userId !== undefined,
    queryFn: async ({ signal }) => {
      const { quests, resetAt } = await apiJson<{
        quests: (Omit<Quest, 'id'> & { type: string })[];
        resetAt: string;
      }>('/quests/today', { authenticated: true, signal });
      return { quests: quests.map(({ type, ...quest }) => ({ id: type, ...quest })), resetAt };
    },
    refetchInterval: ({ state }) => {
      const resetAt = state.data?.resetAt;
      if (!resetAt) return false;
      const deadline = questResetTime(resetAt);
      return Number.isFinite(deadline) ? Math.max(1000, deadline - Date.now()) : false;
    },
  });
}

export function questResetTime(resetAt: string) {
  return Date.parse(resetAt + (/Z$|[+-]\d\d:\d\d$/.test(resetAt) ? '' : '+09:00'));
}

export function claimQuestReward(id: string) {
  return apiResponse(`/quests/${encodeURIComponent(id)}/reward`, {
    method: 'POST',
    authenticated: true,
  });
}
