import { useState, type FormEvent } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiFeedback } from '../../shared/ui/ApiFeedback';
import { MyPageLayout } from './MyPageLayout';
import {
  searchUserOptions,
  sendFriendRequest,
  friendsOptions,
} from '../../domains/social/infrastructure/friendApi';
import type { FriendSearchResult } from '../../domains/social/domain/friend';
import { FriendSearchRow } from '../../domains/social/presentation/FriendSearchRow';
import * as S from './FriendsPage.styles';
import { Button } from '../../shared/ui/Button';

export function AddFriendPage() {
  const [searchInput, setSearchInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [requestedIds, setRequestedIds] = useState<string[]>([]);
  const [announcement, setAnnouncement] = useState('');
  const userSearch = useQuery(searchUserOptions(keyword, page));
  const friends = useQuery({ ...friendsOptions(), refetchOnMount: 'always' });
  const friendIds = new Set(friends.data?.map(({ id }) => id));
  const request = useMutation({
    mutationFn: (person: FriendSearchResult) => sendFriendRequest(Number(person.id)),
    onSuccess: (_, person) => {
      setRequestedIds((previous) => [...previous, person.id]);
      setAnnouncement(`${person.name}님에게 친구 요청을 보냈어요.`);
    },
  });
  const people = (userSearch.data?.users ?? []).map((person): FriendSearchResult => {
    if (friendIds.has(person.id)) return { ...person, requestStatus: 'friend' };
    if (requestedIds.includes(person.id)) return { ...person, requestStatus: 'requested' };
    return person;
  });

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (request.isPending) return;
    const trimmedInput = searchInput.trim();
    if (!trimmedInput) {
      setKeyword('');
      setPage(0);
      setAnnouncement('이름이나 네 자리 학번을 입력해 주세요.');
      return;
    }
    request.reset();
    if (trimmedInput === keyword && page === 0) void userSearch.refetch();
    setKeyword(trimmedInput);
    setPage(0);
    setAnnouncement('');
  }

  function handleRequest(person: FriendSearchResult) {
    if (friends.isSuccess && !friendIds.has(person.id) && !request.isPending) {
      request.mutate(person);
    }
  }

  return (
    <MyPageLayout>
      <S.Panel aria-labelledby="add-friend-title">
        <S.Heading>
          <h1 id="add-friend-title">친구 추가</h1>
          <p>이름이나 네 자리 학번으로 친구를 찾아 요청을 보내요.</p>
        </S.Heading>
        <S.Search role="search" onSubmit={handleSearch}>
          <S.Field>
            <img src="/images/friends/search.svg" alt="" />
            <input
              type="search"
              aria-label="이름 또는 학번"
              placeholder="이름 또는 학번으로 검색"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </S.Field>
          <S.SearchButton type="submit" variant="secondary" disabled={request.isPending}>
            검색
          </S.SearchButton>
        </S.Search>
        <S.Count>
          검색 결과 <strong>{userSearch.data?.totalElements ?? 0}</strong>
        </S.Count>
        <ApiFeedback
          pending={userSearch.isLoading || friends.isPending}
          error={userSearch.error ?? friends.error ?? request.error}
        />
        {friends.isSuccess && people.length > 0 && (
          <ul aria-label="친구 검색 결과">
            {people.map((person) => (
              <FriendSearchRow
                key={person.id}
                person={person}
                busy={request.isPending}
                onRequest={handleRequest}
              />
            ))}
          </ul>
        )}
        {userSearch.isSuccess && !people.length && <S.Empty>검색 결과가 없어요.</S.Empty>}
        {userSearch.data && userSearch.data.totalPages > 1 && (
          <S.Pagination aria-label="친구 검색 결과 페이지">
            <Button
              variant="secondary"
              disabled={page === 0 || request.isPending}
              onClick={() => setPage(page - 1)}
            >
              이전
            </Button>
            <span>
              {page + 1} / {userSearch.data.totalPages}
            </span>
            <Button
              variant="secondary"
              disabled={page + 1 >= userSearch.data.totalPages || request.isPending}
              onClick={() => setPage(page + 1)}
            >
              다음
            </Button>
          </S.Pagination>
        )}
        {announcement && <S.Notice role="status">{announcement}</S.Notice>}
      </S.Panel>
    </MyPageLayout>
  );
}
