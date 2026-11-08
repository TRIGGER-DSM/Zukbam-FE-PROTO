import { queryOptions } from '@tanstack/react-query';
import { apiJson, apiResponse, getAccessToken } from '../../../shared/api/client';
import { collectPages, type PageInfo } from '../../../shared/api/pagination';
import { getUser, studentNumber } from '../../member/infrastructure/profileApi';
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
            requestedAt: `${new Date(request.requestedAt).toLocaleString('ko-KR')} 요청`,
            status: 'pending',
          })),
        };
      }, signal),
  });
}

export function searchUserOptions(userId: number) {
  return queryOptions({
    queryKey: ['user', userId, Boolean(getAccessToken())],
    enabled: Number.isSafeInteger(userId) && userId > 0,
    queryFn: async ({ signal }): Promise<FriendSearchResult> => {
      const user = await getUser(userId, signal);
      return {
        id: String(user.userId),
        studentNumber: studentNumber(user),
        name: user.name,
        tierLabel: user.rank,
        requestStatus: 'available',
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
