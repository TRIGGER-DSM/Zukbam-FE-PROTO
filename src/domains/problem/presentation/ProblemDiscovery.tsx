import * as S from './ProblemDiscovery.styles';
import type { Problem, RecommendedProblem, FriendProblem } from '../domain/problem';
import { difficulties } from '../domain/problem';
import { ProblemAsset } from './ProblemAsset';
import { RankingAsset } from '../../ranking/presentation/RankingAsset';

interface ProblemDiscoveryProps {
  recommended: RecommendedProblem[];
  friends: FriendProblem[];
  onSelect: (problem: Problem) => void;
}

export function ProblemDiscovery({ recommended, friends, onSelect }: ProblemDiscoveryProps) {
  return (
    <S.Root>
      <S.Recommendations aria-labelledby="recommended-title">
        <S.Heading>
          <h2 id="recommended-title">추천 문제</h2>
          <p>대나무 5m인 민서님께 맞춰 골랐어요</p>
        </S.Heading>
        {recommended.map(({ problem, reason, acceptance }) => (
          <S.Recommendation key={problem.id} onClick={() => onSelect(problem)}>
            <ProblemAsset name={`${problem.difficulty}-large`} />
            <S.Copy>
              <S.Title>
                <span>{problem.id}</span>
                <strong>{problem.title}</strong>
              </S.Title>
              <S.Reason>{reason}</S.Reason>
              <small>정답률 {acceptance}%</small>
            </S.Copy>
            <S.Xp>
              <ProblemAsset name="xp" />+{problem.xp} XP
            </S.Xp>
          </S.Recommendation>
        ))}
      </S.Recommendations>
      <S.Friends aria-labelledby="friends-title">
        <S.Heading>
          <h2 id="friends-title">친구가 최근에 푼 문제</h2>
          <p>같이 풀면 더 오래 가요</p>
        </S.Heading>
        <S.FriendGrid>
          {friends.map(({ problem, friend, time, tone, tier }) => (
            <S.FriendCard key={problem.id} onClick={() => onSelect(problem)}>
              <S.FriendArt $tone={tone} aria-hidden="true">
                <S.FriendAvatar name={friend} size={164} />
                <S.FriendBadge>
                  <RankingAsset name={`tier-${tier}`} />
                </S.FriendBadge>
              </S.FriendArt>
              <S.FriendBody>
                <S.FriendAuthor>
                  <strong>{friend}님이 풀었어요</strong>
                  <span>· {time}</span>
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
