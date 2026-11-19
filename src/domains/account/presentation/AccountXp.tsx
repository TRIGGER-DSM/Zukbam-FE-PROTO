import { formatNumber, formatDateTime } from '../../../shared/format';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ApiFeedback } from '../../../shared/ui/ApiFeedback';
import { Button } from '../../../shared/ui/Button';
import { xpHistoryOptions } from '../infrastructure/xpApi';
import * as S from './AccountXp.styles';

interface AccountXpProps {
  userId: number;
}

const dateOptions = { dateStyle: 'medium', timeStyle: 'short' } as const;

export function AccountXp({ userId }: AccountXpProps) {
  const [page, setPage] = useState(0);
  const history = useQuery(xpHistoryOptions(userId, page));
  const result = history.data;

  return (
    <S.Section aria-labelledby="account-xp-title">
      <h2 id="account-xp-title">XP 내역</h2>
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
