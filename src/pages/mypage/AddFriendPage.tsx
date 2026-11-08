import { useState, type FormEvent } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiFeedback } from '../../shared/ui/ApiFeedback';
import { MyPageLayout } from './MyPageLayout';
import {
  searchUserOptions,
  sendFriendRequest,
} from '../../domains/social/infrastructure/friendApi';
import type { FriendSearchResult } from '../../domains/social/domain/friend';
import { FriendSearchRow } from '../../domains/social/presentation/FriendSearchRow';
import * as S from './FriendsPage.styles';

export function AddFriendPage() {
  const [searchInput, setSearchInput] = useState('');
  const [userId, setUserId] = useState(0);
  const [requestedIds, setRequestedIds] = useState<string[]>([]);
  const [announcement, setAnnouncement] = useState('');
  const userSearch = useQuery(searchUserOptions(userId));
  const request = useMutation({
    mutationFn: (person: FriendSearchResult) => sendFriendRequest(Number(person.id)),
    onSuccess: (_, person) => {
      setRequestedIds((previous) => [...previous, person.id]);
      setAnnouncement(`${person.name}님에게 친구 요청을 보냈어요.`);
    },
  });
  const foundUser = userSearch.data;
  const person =
    foundUser && requestedIds.includes(foundUser.id)
      ? { ...foundUser, requestStatus: 'requested' as const }
      : foundUser;

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (request.isPending) return;
    const trimmedInput = searchInput.trim();
    const searchedUserId = Number(trimmedInput);
    if (
      !/^\d+$/.test(trimmedInput) ||
      !Number.isSafeInteger(searchedUserId) ||
      searchedUserId <= 0
    ) {
      setUserId(0);
      setAnnouncement('사용자 번호를 숫자로 입력해 주세요.');
      return;
    }
    request.reset();
    if (searchedUserId === userId) void userSearch.refetch();
    setUserId(searchedUserId);
    setAnnouncement('');
  }

  function handleRequest(person: FriendSearchResult) {
    if (!request.isPending) request.mutate(person);
  }

  return (
    <MyPageLayout>
      <S.Panel aria-labelledby="add-friend-title">
        <S.Heading>
          <h1 id="add-friend-title">친구 추가</h1>
          <p>사용자 번호로 친구를 찾아 친구 요청을 보내요.</p>
        </S.Heading>
        <S.Search role="search" onSubmit={handleSearch}>
          <S.Field>
            <img src="/images/friends/search.svg" alt="" />
            <input
              type="search"
              inputMode="numeric"
              aria-label="사용자 번호"
              placeholder="사용자 번호로 검색"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </S.Field>
          <S.SearchButton type="submit" variant="secondary" disabled={request.isPending}>
            검색
          </S.SearchButton>
        </S.Search>
        <S.Count>
          검색 결과 <strong>{person ? 1 : 0}</strong>
        </S.Count>
        <ApiFeedback pending={userSearch.isLoading} error={userSearch.error ?? request.error} />
        {person && (
          <ul aria-label="친구 검색 결과">
            <FriendSearchRow person={person} busy={request.isPending} onRequest={handleRequest} />
          </ul>
        )}
        {announcement && <S.Notice role="status">{announcement}</S.Notice>}
      </S.Panel>
    </MyPageLayout>
  );
}
