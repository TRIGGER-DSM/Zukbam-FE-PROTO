import { queryOptions } from '@tanstack/react-query';
import { apiJson, apiResponse } from '../../../shared/api/client';
import type { PageInfo } from '../../../shared/api/pagination';

interface XpHistory {
  xpHistoryId: number;
  amount: number;
  reason: string;
  problemId?: number | null;
  problemTitle?: string | null;
  createdAt: string;
}

interface XpHistoryPage extends PageInfo {
  xpHistories: XpHistory[];
}

export const xpHistoryKey = ['xp-histories'] as const;

export function xpHistoryOptions(userId: number, page: number) {
  return queryOptions({
    queryKey: [...xpHistoryKey, userId, page],
    queryFn: ({ signal }) =>
      apiJson<XpHistoryPage>(`/users/${userId}/xp-histories?page=${page}&size=20`, {
        authenticated: true,
        signal,
      }),
  });
}

export async function recalculateMyXp() {
  await apiResponse('/users/me/xp/recalculate', { method: 'POST', authenticated: true });
}
