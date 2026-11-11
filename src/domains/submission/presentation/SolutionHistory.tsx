import { formatDateTime } from '../../../shared/format';
import { useState } from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { ApiFeedback } from '../../../shared/ui/ApiFeedback';
import { myProfileOptions } from '../../member/infrastructure/profileApi';
import { Spinner } from '../../../shared/ui/Spinner';
import * as S from './SolutionHistory.styles';
import {
  resultPath,
  solutionHistoryOptions,
  solutionStatusLabels,
} from '../infrastructure/solutionApi';

interface SolutionHistoryProps {
  problemId: number;
}

export function SolutionHistory({ problemId }: SolutionHistoryProps) {
  const [page, setPage] = useState(1);
  const profile = useQuery(myProfileOptions());
  const history = useQuery(solutionHistoryOptions(problemId, profile.data?.email ?? '', page));
  const result = history.data;
  return (
    <>
      <ApiFeedback
        pending={profile.isPending || history.isLoading}
        error={profile.error ?? history.error}
      />
      {result &&
        (result.solutions.length ? (
          <ul aria-live="polite">
            {result.solutions.map((solution) => (
              <li key={solution.solutionId}>
                <Link to={resultPath(problemId, solution)}>
                  #{solution.solutionId} · {solution.language} ·{' '}
                  <S.Status $status={solution.status}>
                    {solution.status === 'PENDING' && <Spinner />}
                    {solutionStatusLabels[solution.status]}
                  </S.Status>{' '}
                  · {formatDateTime(solution.submittedAt)}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>제출 기록이 없어요.</p>
        ))}
      {result && result.totalPages > 1 && (
        <nav aria-label="제출 기록 페이지">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            이전
          </button>
          <span>
            {' '}
            {page} / {result.totalPages}{' '}
          </span>
          <button disabled={page >= result.totalPages} onClick={() => setPage(page + 1)}>
            다음
          </button>
        </nav>
      )}
    </>
  );
}
