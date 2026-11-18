import * as S from './ProblemDiscovery.styles';
import type { Problem, RecommendedProblem, FriendProblem } from '../domain/problem';
import { difficulties } from '../domain/problem';
import { ProblemAsset } from './ProblemAsset';
import { RankingAsset } from '../../ranking/presentation/RankingAsset';
import type { ReactNode } from 'react';
import { formatDateTime } from '../../../shared/format';

interface ProblemDiscoveryProps {
  recommended: RecommendedProblem[];
  friends: FriendProblem[];
  recommendationFeedback?: ReactNode;
  friendFeedback?: ReactNode;
  onSelect: (problem: Problem) => void;
}

export function ProblemDiscovery({
  recommended,
  friends,
  recommendationFeedback,
  friendFeedback,
  onSelect,
}: ProblemDiscoveryProps) {
  return (
    <S.Root>
      <S.Recommendations aria-labelledby="recommended-title">
        <S.Heading>
          <h2 id="recommended-title">추천 문제</h2>
          <p>{recommended.length ? '풀어볼 문제를 골라봐요' : '표시할 추천 문제가 없어요.'}</p>
        </S.Heading>
        {recommendationFeedback}
        {recommended.map(({ problem }) => (
          <S.Recommendation key={problem.id} onClick={() => onSelect(problem)}>
            <ProblemAsset
              name={
                problem.difficulty === 'cup' || problem.difficulty === 'bottle'
                  ? `${problem.difficulty}-large`
                  : problem.difficulty
              }
            />
            <S.Copy>
              <S.Title>
                <span>{problem.id}</span>
                <strong>{problem.title}</strong>
              </S.Title>
              <S.Reason>
                {difficulties.find((item) => item.id === problem.difficulty)?.label}
              </S.Reason>
            </S.Copy>
            {problem.xp !== undefined && (
              <S.Xp>
                <ProblemAsset name="xp" />+{problem.xp} XP
              </S.Xp>
            )}
          </S.Recommendation>
        ))}
      </S.Recommendations>
      <S.Friends aria-labelledby="friends-title">
        <S.Heading>
          <h2 id="friends-title">친구가 최근에 푼 문제</h2>
          <p>{friends.length ? '같이 풀면 더 오래 가요' : '친구 풀이 데이터가 아직 없어요.'}</p>
        </S.Heading>
        {friendFeedback}
        <S.FriendGrid>
          {friends.map(({ problem, friend, friendId, time, tone, tier }) => (
            <S.FriendCard key={`${friendId}-${problem.id}`} onClick={() => onSelect(problem)}>
              <S.FriendArt $tone={tone} aria-hidden="true">
                <S.FriendAvatar name={friend} size={164} />
                {tier && (
                  <S.FriendBadge>
                    <RankingAsset name={`tier-${tier}`} />
                  </S.FriendBadge>
                )}
              </S.FriendArt>
              <S.FriendBody>
                <S.FriendAuthor>
                  <strong>{friend}님이 풀었어요</strong>
                  <span>· {formatDateTime(time)}</span>
                </S.FriendAuthor>
                <S.Title>
                  <span>{problem.id}</span>
                  <strong>{problem.title}</strong>
                </S.Title>
                <S.Difficulty>
                  <ProblemAsset name={problem.difficulty} />
                  {difficulties.find((item) => item.id === problem.difficulty)?.label}
                </S.Difficulty>
              </S.FriendBody>
            </S.FriendCard>
          ))}
        </S.FriendGrid>
      </S.Friends>
    </S.Root>
  );
}
