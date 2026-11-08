import * as S from './ProblemDetailHero.styles';
import type { ProblemDetail } from '../domain/problemDetail';
import { ProblemDetailAsset } from './ProblemDetailAsset';

interface ProblemDetailHeroProps {
  problem: ProblemDetail;
}

export function ProblemDetailHero({ problem }: ProblemDetailHeroProps) {
  return (
    <S.Hero aria-label="문제 정보">
      <S.Back to="/problems">
        <span aria-hidden="true">‹</span> 문제 목록
      </S.Back>
      <S.Content>
        <S.Title>
          <span>문제 {problem.id}</span>
          <h1>{problem.title}</h1>
        </S.Title>
        <S.Statistics>
          <div>
            <dt>정답률</dt>
            <dd>{problem.acceptance === undefined ? '—' : `${problem.acceptance}%`}</dd>
          </div>
          <div>
            <dt>제출</dt>
            <dd>{problem.submissions?.toLocaleString() ?? '—'}</dd>
          </div>
          <div>
            <dt>맞힌 사람</dt>
            <dd>
              {problem.solvedCount === undefined
                ? '—'
                : `${problem.solvedCount.toLocaleString()}명`}
            </dd>
          </div>
        </S.Statistics>
        {problem.friends.length > 0 && (
          <S.Friends>
            <S.Avatars aria-hidden="true">
              {[0, 1, 2].map((index) => (
                <span key={index}>
                  <ProblemDetailAsset name="avatar.svg" />
                </span>
              ))}
              <S.MoreFriends>+{problem.additionalFriends}</S.MoreFriends>
            </S.Avatars>
            <p>
              <strong>{problem.friends.join(', ')}</strong>{' '}
              <span>외 {problem.additionalFriends}명이 이 문제를 풀었어요!</span>
            </p>
          </S.Friends>
        )}
      </S.Content>
    </S.Hero>
  );
}
