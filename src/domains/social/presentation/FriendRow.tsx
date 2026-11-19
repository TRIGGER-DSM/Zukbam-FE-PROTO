import type { Friend } from '../domain/friend';
import * as S from './FriendRow.styles';
import { useQuery } from '@tanstack/react-query';
import { studentNumber, userProfileOptions } from '../../member/infrastructure/profileApi';
import { tierThresholds } from '../../ranking/domain/leaderboard';
import { RankingAsset } from '../../ranking/presentation/RankingAsset';
import { ApiFeedback } from '../../../shared/ui/ApiFeedback';
import { userStreakOptions } from '../../activity/infrastructure/activityApi';
import { formatDateTime } from '../../../shared/format';

interface FriendRowProps {
  friend: Friend;
  onRemove: (friend: Friend) => void;
  busy?: boolean;
}

export function FriendRow({ friend, onRemove, busy }: FriendRowProps) {
  const profile = useQuery(userProfileOptions(Number(friend.id)));
  const streak = useQuery(userStreakOptions(Number(friend.id)));
  const streakDays = streak.data?.currentStreak ?? friend.streakDays;
  const recentActivity = streak.data?.lastSolvedDate
    ? `${formatDateTime(streak.data.lastSolvedDate)} 풀이`
    : friend.recentActivity;
  const rank = profile.data?.rank || friend.tierLabel;
  const tier = tierThresholds.find(({ label }) => label === rank)?.id ?? friend.tier;
  return (
    <S.Row aria-label={`${friend.name} 친구 정보`}>
      <S.Profile name={friend.name} size={56} />
      <S.Info>
        <S.Name>
          <strong>{friend.name}</strong>
          <span>{profile.data ? studentNumber(profile.data) || friend.id : friend.id}</span>
        </S.Name>
        {(rank || streakDays !== undefined) && (
          <S.Meta>
            {rank && (
              <S.Tier>
                {tier && <RankingAsset name={`tier-${tier}`} />}
                {rank}
              </S.Tier>
            )}
            {streakDays !== undefined && (
              <>
                {rank && <S.Dot aria-hidden="true">·</S.Dot>}
                <S.Streak $active={streakDays > 0}>
                  <img src="/images/friends/streak.svg" alt="" />
                  {streakDays > 0 ? `${streakDays}일` : '스트릭 끊김'}
                </S.Streak>
              </>
            )}
            {recentActivity && (
              <>
                <S.Dot aria-hidden="true">·</S.Dot>
                <S.Activity>{recentActivity}</S.Activity>
              </>
            )}
          </S.Meta>
        )}
        <ApiFeedback error={profile.error ?? streak.error} />
      </S.Info>
      <S.Action
        variant="secondary"
        disabled={busy}
        aria-label={`${friend.name} 친구 삭제`}
        onClick={() => onRemove(friend)}
      >
        삭제
      </S.Action>
    </S.Row>
  );
}
