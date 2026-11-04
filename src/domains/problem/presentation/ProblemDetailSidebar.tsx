import * as S from './ProblemDetailSidebar.styles';
import { difficulties } from '../domain/problem';
import type { ProblemDetail } from '../domain/problemDetail';
import { ProblemDetailAsset } from './ProblemDetailAsset';
import { ProblemAsset } from './ProblemAsset';

interface ProblemDetailSidebarProps {
  problem: ProblemDetail;
  onWrite: () => void;
}

export function ProblemDetailSidebar({ problem, onWrite }: ProblemDetailSidebarProps) {
  const level = difficulties.findIndex((item) => item.id === problem.difficulty);
  return (
    <S.Panel aria-label="난이도와 풀이 안내">
      <S.Difficulty>
        <h2>난이도</h2>
        <ProblemDetailAsset name="difficulty.svg" />
        <strong>{difficulties[level].label}</strong>
        <S.Levels aria-label={`5단계 중 ${level + 1}단계`}>
          {difficulties.map((item, index) => (
            <S.Level key={item.id} $filled={index <= level} />
          ))}
        </S.Levels>
        <p>
          5단계 중 {level + 1}단계 · {problem.difficultyDescription}
        </p>
        <S.Xp>
          <ProblemAsset name="xp" />
          해결하면 +{problem.xp} XP
        </S.Xp>
      </S.Difficulty>
      <S.Limits>
        <div>
          <dt>시간 제한</dt>
          <dd>{problem.timeLimit}</dd>
        </div>
        <div>
          <dt>메모리 제한</dt>
          <dd>{problem.memoryLimit}</dd>
        </div>
        <div>
          <dt>분류</dt>
          <dd>{problem.category}</dd>
        </div>
      </S.Limits>
      <S.Write onClick={onWrite}>풀이 작성하기</S.Write>
      <S.Locked aria-label="다른 사람 풀이 보기, 문제를 해결하면 열려요">
        <ProblemDetailAsset name="lock.svg" />
        <div>
          <strong>다른 사람 풀이 보기</strong>
          <p>문제를 해결하면 열려요</p>
        </div>
      </S.Locked>
    </S.Panel>
  );
}
