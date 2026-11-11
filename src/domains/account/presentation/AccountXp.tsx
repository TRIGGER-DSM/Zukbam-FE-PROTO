import { formatNumber, formatDateTime } from '../../../shared/format';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiFeedback } from '../../../shared/ui/ApiFeedback';
import { Button } from '../../../shared/ui/Button';
import { recalculateMyXp, xpHistoryKey, xpHistoryOptions } from '../infrastructure/xpApi';
import * as S from './AccountXp.styles';

interface AccountXpProps {
  userId: number;
}

const dateOptions = { dateStyle: 'medium', timeStyle: 'short' } as const;

export function AccountXp({ userId }: AccountXpProps) {
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();
  const history = useQuery(xpHistoryOptions(userId, page));
  const recalculate = useMutation({
    mutationFn: recalculateMyXp,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['me'] }),
        queryClient.invalidateQueries({ queryKey: xpHistoryKey }),
      ]);
    },
  });
  const result = history.data;

  return (
    <S.Section aria-labelledby="account-xp-title">
      <S.Bar>
        <h2 id="account-xp-title">XP 내역</h2>
        <Button
          variant="secondary"
          disabled={recalculate.isPending}
          onClick={() => recalculate.mutate()}
        >
          {recalculate.isPending ? '재계산 중…' : '내 XP 재계산'}
        </Button>
      </S.Bar>
      <ApiFeedback error={recalculate.error} />
      {recalculate.isSuccess && <p role="status">XP 재계산을 완료했어요.</p>}
      <ApiFeedback pending={history.isPending} error={history.error} />
      {result &&
        (result.xpHistories.length > 0 ? (
          <S.List>
            {result.xpHistories.map((entry) => (
              <li key={entry.xpHistoryId}>
                <div>
                  <strong>{entry.problemTitle || entry.reason}</strong>
                  {entry.problemTitle && <span>{entry.reason}</span>}
                  <time dateTime={entry.createdAt}>
                    {formatDateTime(entry.createdAt, dateOptions)}
                  </time>
                </div>
                <S.Amount $deducted={entry.amount < 0}>
                  {entry.amount > 0 ? '+' : ''}
                  {formatNumber(entry.amount, 'ko-KR')} XP
                </S.Amount>
              </li>
            ))}
          </S.List>
        ) : (
          <p>XP 내역이 없어요.</p>
        ))}
      {result && result.totalPages > 1 && (
        <S.Bar as="nav" aria-label="XP 내역 페이지">
          <Button variant="secondary" disabled={page === 0} onClick={() => setPage(page - 1)}>
            이전
          </Button>
          <span>
            {page + 1} / {result.totalPages}
          </span>
          <Button
            variant="secondary"
            disabled={page + 1 >= result.totalPages}
            onClick={() => setPage(page + 1)}
          >
            다음
          </Button>
        </S.Bar>
      )}
    </S.Section>
  );
}
