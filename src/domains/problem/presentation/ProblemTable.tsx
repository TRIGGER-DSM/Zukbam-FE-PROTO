import * as S from './ProblemTable.styles';
import * as UI from '../../../shared/ui/primitives.styles';
import { difficulties, type Problem } from '../domain/problem';
import { ProblemAsset } from './ProblemAsset';

interface ProblemTableProps {
  problems: Problem[];
  onSelect: (problem: Problem) => void;
}

export function ProblemTable({ problems, onSelect }: ProblemTableProps) {
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
                  <UI.HiddenText>미해결</UI.HiddenText>
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
                <button
                  aria-label={`${problem.title} 분류: ${problem.categories.join(', ')}`}
                  title={problem.categories.join(', ')}
                  onClick={() => onSelect(problem)}
                >
                  <ProblemAsset name="tag" />
                </button>
              </S.TagCell>
              <S.XpCell>
                <span>
                  <ProblemAsset name="xp" />+{problem.xp}
                </span>
              </S.XpCell>
              <S.SolversCell>{problem.solvers.toLocaleString()}</S.SolversCell>
              <S.AttemptsCell>{problem.attempts.toFixed(2)}</S.AttemptsCell>
            </tr>
          ))}
        </tbody>
      </S.Table>
      {!problems.length && (
        <S.Empty>
          <strong>표시할 문제가 없어요</strong>
          <p>검색어나 필터 조건을 바꿔보세요.</p>
        </S.Empty>
      )}
    </S.Scroll>
  );
}
