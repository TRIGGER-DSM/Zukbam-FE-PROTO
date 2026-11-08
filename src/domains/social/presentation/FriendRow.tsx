import type { Friend } from '../domain/friend';
import * as S from './FriendRow.styles';

interface FriendRowProps {
  friend: Friend;
  onRemove: (friend: Friend) => void;
  busy?: boolean;
}

export function FriendRow({ friend, onRemove, busy }: FriendRowProps) {
  return (
    <S.Row aria-label={`${friend.name} 친구 정보`}>
      <S.Profile name={friend.name} size={56} />
      <S.Info>
        <S.Name>
          <strong>{friend.name}</strong>
          <span>{friend.id}</span>
        </S.Name>
        {friend.streakDays !== undefined && (
          <S.Meta>
            <S.Tier>
              <img src={`/images/friends/tier-${friend.tier}.svg`} alt="" />
              {friend.tierLabel}
            </S.Tier>
            <S.Dot aria-hidden="true">·</S.Dot>
            <S.Streak $active={friend.streakDays > 0}>
              <img src="/images/friends/streak.svg" alt="" />
              {friend.streakDays > 0 ? `${friend.streakDays}일` : '스트릭 끊김'}
            </S.Streak>
            <S.Dot aria-hidden="true">·</S.Dot>
            <S.Activity>{friend.recentActivity}</S.Activity>
          </S.Meta>
        )}
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
