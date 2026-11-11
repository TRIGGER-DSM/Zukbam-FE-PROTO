import { formatNumber } from '../../../shared/format';
import * as S from './ProblemTable.styles';
import * as UI from '../../../shared/ui/primitives.styles';
import type { ReactNode } from 'react';
import { difficulties, type Problem } from '../domain/problem';
import { ProblemAsset } from './ProblemAsset';

interface ProblemTableProps {
  problems: Problem[];
  emptyContent: ReactNode;
  onSelect: (problem: Problem) => void;
}

export function ProblemTable({ problems, emptyContent, onSelect }: ProblemTableProps) {
  return (
    <S.Scroll>
      <S.Table>
        <UI.HiddenCaption>문제 목록</UI.HiddenCaption>
        <colgroup>
          <S.ColStatus />
          <S.ColId />
          <col />
          <S.ColTag />
          <S.ColXp />
          <S.ColSolvers />
          <S.ColAttempts />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">
              <UI.HiddenText>해결 상태</UI.HiddenText>
            </th>
            <th scope="col">#</th>
            <th scope="col">제목</th>
            <th scope="col">분류</th>
            <th scope="col">획득 XP</th>
            <th scope="col">푼 사람 수</th>
            <th scope="col">평균 시도</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem.id}>
              <S.StatusCell>
                {problem.status === 'solved' ? (
                  <ProblemAsset name="solved" alt="해결" />
                ) : problem.status === 'attempted' ? (
                  <S.Attempted role="img" aria-label="시도했으나 미해결" />
                ) : (
                  <UI.HiddenText>{problem.status ? '미해결' : '해결 상태 정보 없음'}</UI.HiddenText>
                )}
              </S.StatusCell>
              <td>
                <S.Number>
                  <ProblemAsset
                    name={problem.difficulty}
                    alt={difficulties.find((item) => item.id === problem.difficulty)?.label}
                  />
                  <strong>{problem.id}</strong>
                </S.Number>
              </td>
              <td>
                <S.Title onClick={() => onSelect(problem)}>
                  {problem.title}
                  {problem.beginner && <span>입문</span>}
                </S.Title>
              </td>
              <S.TagCell>
                {problem.categories.length > 0 ? (
                  <button
                    aria-label={`${problem.title} 분류: ${problem.categories.join(', ')}`}
                    title={problem.categories.join(', ')}
                    onClick={() => onSelect(problem)}
                  >
                    <ProblemAsset name="tag" />
                  </button>
                ) : (
                  '—'
                )}
              </S.TagCell>
              <S.XpCell>
                {problem.xp === undefined ? (
                  '—'
                ) : (
                  <span>
                    <ProblemAsset name="xp" />+{problem.xp}
                  </span>
                )}
              </S.XpCell>
              <S.SolversCell>{formatNumber(problem.solvers)}</S.SolversCell>
              <S.AttemptsCell>{problem.attempts?.toFixed(2) ?? '—'}</S.AttemptsCell>
            </tr>
          ))}
        </tbody>
      </S.Table>
      {problems.length === 0 && <S.Empty>{emptyContent}</S.Empty>}
    </S.Scroll>
  );
}
