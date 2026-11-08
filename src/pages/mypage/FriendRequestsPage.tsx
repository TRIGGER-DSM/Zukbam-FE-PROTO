import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiFeedback } from '../../shared/ui/ApiFeedback';
import type { FriendRequest, FriendRequestStatus } from '../../domains/social/domain/friend';
import {
  friendsKey,
  requestsKey,
  receivedRequestsOptions,
  respondToFriendRequest,
} from '../../domains/social/infrastructure/friendApi';
import { FriendRequestRow } from '../../domains/social/presentation/FriendRequestRow';
import { Pending } from '../../domains/social/presentation/FriendRequestRow.styles';
import * as UI from '../../shared/ui/primitives.styles';
import { MyPageLayout } from './MyPageLayout';
import * as S from './FriendsPage.styles';

interface RequestResponse {
  request: FriendRequest;
  status: Exclude<FriendRequestStatus, 'pending'>;
}

export function FriendRequestsPage() {
  const queryClient = useQueryClient();
  const requestsQuery = useQuery(receivedRequestsOptions());
  const [handledRequests, setHandledRequests] = useState<FriendRequest[]>([]);
  const [announcement, setAnnouncement] = useState('');
  const pendingRequests = (requestsQuery.data ?? []).filter(
    (request) => !handledRequests.some((handled) => handled.friendshipId === request.friendshipId),
  );
  const requests = [...pendingRequests, ...handledRequests];
  const pendingCount = pendingRequests.length;
  const response = useMutation({
    mutationFn: ({ request, status }: RequestResponse) => {
      if (request.friendshipId === undefined) throw new Error('친구 요청 번호를 찾을 수 없어요.');
      return respondToFriendRequest(request.friendshipId, status);
    },
    onSuccess: async (_, { request, status }) => {
      setHandledRequests((previous) => [...previous, { ...request, status }]);
      setAnnouncement(
        `${request.name}님의 친구 요청을 ${status === 'accepted' ? '수락' : '거절'}했어요.`,
      );
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: requestsKey }),
        queryClient.invalidateQueries({ queryKey: friendsKey }),
      ]);
    },
  });

  function handleRespond(request: FriendRequest, status: RequestResponse['status']) {
    if (!response.isPending) response.mutate({ request, status });
  }

  return (
    <MyPageLayout pendingCount={pendingCount}>
      <S.Panel aria-labelledby="friend-requests-title">
        <S.Heading>
          <h1 id="friend-requests-title">받은 요청</h1>
        </S.Heading>
        <S.Count>
          받은 요청 <strong>{requests.length}</strong>
          <Pending>대기 {pendingCount}</Pending>
        </S.Count>
        <ApiFeedback
          pending={requestsQuery.isPending}
          error={requestsQuery.error ?? response.error}
        />
        {requestsQuery.isSuccess && requests.length === 0 && (
          <S.Empty>받은 친구 요청이 없어요.</S.Empty>
        )}
        <ul aria-label="받은 친구 요청">
          {requests.map((request) => (
            <FriendRequestRow
              key={request.friendshipId}
              request={request}
              busy={response.isPending}
              onRespond={handleRespond}
            />
          ))}
        </ul>
        <UI.HiddenText role="status">{announcement}</UI.HiddenText>
      </S.Panel>
    </MyPageLayout>
  );
}
