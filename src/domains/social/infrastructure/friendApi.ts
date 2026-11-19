import { formatDateTime } from '../../../shared/format';
import { queryOptions } from '@tanstack/react-query';
import { apiJson, apiResponse, getAccessToken } from '../../../shared/api/client';
import { collectPages, type PageInfo } from '../../../shared/api/pagination';
import { studentNumber, type UserProfile } from '../../member/infrastructure/profileApi';
import type {
  Friend,
  FriendRequest,
  FriendRequestStatus,
  FriendSearchResult,
} from '../domain/friend';

interface FriendResponse {
  friendshipId: number;
  userId: number;
  name: string;
  acceptedAt: string;
}

interface ReceivedRequestResponse {
  friendshipId: number;
  requesterId: number;
  requesterName: string;
  requestedAt: string;
}

export const friendsKey = ['friends'] as const;
export const requestsKey = ['friend-requests'] as const;

export function friendsOptions() {
  return queryOptions({
    queryKey: [...friendsKey, Boolean(getAccessToken())],
    queryFn: ({ signal }) =>
      collectPages<Friend>(async (page, requestSignal) => {
        const result = await apiJson<PageInfo & { friends: FriendResponse[] }>(
          `/friends?page=${page}&size=100`,
          { authenticated: true, signal: requestSignal },
        );
        return {
          ...result,
          items: result.friends.map((friend) => ({
            id: String(friend.userId),
            friendshipId: friend.friendshipId,
            name: friend.name,
            tierLabel: '',
            recentActivity: '',
          })),
        };
      }, signal),
  });
}

export function receivedRequestsOptions() {
  return queryOptions({
    queryKey: [...requestsKey, Boolean(getAccessToken())],
    queryFn: ({ signal }) =>
      collectPages<FriendRequest>(async (page, requestSignal) => {
        const result = await apiJson<PageInfo & { requests: ReceivedRequestResponse[] }>(
          `/friends/requests/received?page=${page}&size=100`,
          { authenticated: true, signal: requestSignal },
        );
        return {
          ...result,
          items: result.requests.map((request) => ({
            id: String(request.requesterId),
            friendshipId: request.friendshipId,
            name: request.requesterName,
            tierLabel: '',
            requestedAt: `${formatDateTime(request.requestedAt)} 요청`,
            status: 'pending',
          })),
        };
      }, signal),
  });
}

interface UserSearchResponse extends Pick<UserProfile, 'userId' | 'name' | 'student'> {
  rankName: string;
}

export function searchUserOptions(keyword: string, page: number) {
  return queryOptions({
    queryKey: ['user-search', keyword, page, Boolean(getAccessToken())],
    enabled: keyword.length > 0,
    queryFn: async ({ signal }) => {
      const params = new URLSearchParams({ keyword, page: String(page), size: '20' });
      const result = await apiJson<PageInfo & { users: UserSearchResponse[] }>(
        `/users/search?${params}`,
        { authenticated: true, signal },
      );
      return {
        ...result,
        users: result.users.map((user): FriendSearchResult => ({
          id: String(user.userId),
          studentNumber: studentNumber(user),
          name: user.name,
          tierLabel: user.rankName,
          requestStatus: 'available',
        })),
      };
    },
  });
}

export function sendFriendRequest(receiverId: number) {
  return apiResponse('/friends/requests', {
    method: 'POST',
    authenticated: true,
    body: { receiverId },
  });
}

export function removeFriend(friendshipId: number) {
  return apiResponse(`/friends/${friendshipId}`, { method: 'DELETE', authenticated: true });
}

export function respondToFriendRequest(
  friendshipId: number,
  status: Exclude<FriendRequestStatus, 'pending'>,
) {
  const action = status === 'accepted' ? 'accept' : 'reject';
  return apiResponse(`/friends/requests/${friendshipId}/${action}`, {
    method: 'PATCH',
    authenticated: true,
  });
}
