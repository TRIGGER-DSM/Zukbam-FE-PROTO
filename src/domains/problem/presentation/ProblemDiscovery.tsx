import * as S from './ProblemDiscovery.styles';
import type { Problem, RecommendedProblem, FriendProblem } from '../domain/problem';
import { difficulties } from '../domain/problem';
import { ProblemAsset } from './ProblemAsset';
import { RankingAsset } from '../../ranking/presentation/RankingAsset';
import type { ReactNode } from 'react';
import { formatDateTime } from '../../../shared/format';
import { HiddenText } from '../../../shared/ui/primitives.styles';
import { ApiFeedback } from '../../../shared/ui/ApiFeedback';

interface ProblemDiscoveryProps {
  recommended: RecommendedProblem[];
  friends: FriendProblem[];
  recommendationFeedback?: ReactNode;
  friendPending: boolean;
  friendError: Error | null;
  onSelect: (problem: Problem) => void;
}

export function ProblemDiscovery({
  recommended,
  friends,
  recommendationFeedback,
  friendPending,
  friendError,
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
          {friends.length > 0 && <p>같이 풀면 더 오래 가요</p>}
        </S.Heading>
        {friendError && <ApiFeedback error={friendError} />}
        {friends.length === 0 && !friendError && (
          <HiddenText role="status">
            {friendPending ? '친구 풀이를 불러오는 중이에요.' : '친구 풀이 데이터가 아직 없어요.'}
          </HiddenText>
        )}
        <S.FriendGrid>
          {friends.length === 0 && !friendError && <FriendSkeletons />}
          {friends.map(({ problem, friend, additionalFriends, time, tone, tier }) => (
            <S.FriendCard key={problem.id} onClick={() => onSelect(problem)}>
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
                  <strong>
                    {friend}님{additionalFriends > 0 ? ` 외 ${additionalFriends}명이` : '이'}{' '}
                    풀었어요
                  </strong>
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

function FriendSkeletons() {
  return [1, 2, 3, 4].map((slot) => (
    <S.FriendCard as="div" key={slot} aria-hidden="true">
      <S.FriendArt>
        <S.AvatarPlaceholder />
      </S.FriendArt>
      <S.FriendBody>
        <S.Placeholder />
        <S.Placeholder />
        <S.Placeholder />
      </S.FriendBody>
    </S.FriendCard>
  ));
}
