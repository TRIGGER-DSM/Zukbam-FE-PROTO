import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiFeedback } from '../../shared/ui/ApiFeedback';
import { MyPageLayout } from './MyPageLayout';
import * as UI from '../../shared/ui/primitives.styles';
import type { Friend } from '../../domains/social/domain/friend';
import { filterFriends } from '../../domains/social/application/filterFriends';
import {
  friendsKey,
  friendsOptions,
  removeFriend,
} from '../../domains/social/infrastructure/friendApi';
import { FriendRow } from '../../domains/social/presentation/FriendRow';
import * as S from './FriendsPage.styles';

export function FriendsPage() {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastRemovedFriend, setLastRemovedFriend] = useState<Friend | null>(null);
  const queryClient = useQueryClient();
  const directory = useQuery(friendsOptions());
  const removal = useMutation({
    mutationFn: (friend: Friend) => {
      if (friend.friendshipId === undefined) throw new Error('친구 관계 번호를 찾을 수 없어요.');
      return removeFriend(friend.friendshipId);
    },
    onSuccess: async (_, friend) => {
      setLastRemovedFriend(friend);
      await queryClient.cancelQueries({ queryKey: friendsKey });
      queryClient.setQueriesData<Friend[]>({ queryKey: friendsKey }, (previous) =>
        previous?.filter((item) => item.friendshipId !== friend.friendshipId),
      );
      await queryClient.invalidateQueries({ queryKey: friendsKey });
    },
  });
  const visibleFriends = filterFriends(directory.data ?? [], searchQuery);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchQuery(searchInput.trim());
  }

  function handleRemove(friend: Friend) {
    if (!removal.isPending) removal.mutate(friend);
  }

  return (
    <MyPageLayout>
      <S.Panel aria-labelledby="friends-title">
        <S.Heading>
          <h1 id="friends-title">친구 목록</h1>
          <p>친구들의 랭크와 스트릭, 최근에 푼 문제를 한눈에 확인해요.</p>
        </S.Heading>
        <S.Search role="search" onSubmit={handleSearch}>
          <S.Field>
            <img src="/images/friends/search.svg" alt="" />
            <input
              type="search"
              aria-label="친구 이름 또는 사용자 번호"
              placeholder="이름 또는 사용자 번호로 검색"
              value={searchInput}
              onChange={(event) => {
                setSearchInput(event.target.value);
                if (!event.target.value) setSearchQuery('');
              }}
            />
          </S.Field>
          <S.SearchButton type="submit" variant="secondary">
            검색
          </S.SearchButton>
        </S.Search>
        <S.Count>
          친구 <strong>{visibleFriends.length}</strong>
        </S.Count>
        {lastRemovedFriend && (
          <S.Notice role="status">
            <span>{lastRemovedFriend.name}님을 친구 목록에서 삭제했어요.</span>
          </S.Notice>
        )}
        <ApiFeedback pending={directory.isPending} error={directory.error ?? removal.error} />
        {directory.isSuccess &&
          (visibleFriends.length > 0 ? (
            <ul aria-label="친구 목록">
              {visibleFriends.map((friend) => (
                <FriendRow
                  key={friend.id}
                  friend={friend}
                  busy={removal.isPending}
                  onRemove={handleRemove}
                />
              ))}
            </ul>
          ) : (
            <S.Empty role="status">
              <strong>검색 결과가 없어요</strong>
              <p>이름이나 사용자 번호를 다시 확인해 주세요.</p>
            </S.Empty>
          ))}
        <UI.HiddenText role="status">
          {searchQuery ? `검색 결과 ${visibleFriends.length}명` : ''}
        </UI.HiddenText>
      </S.Panel>
    </MyPageLayout>
  );
}
