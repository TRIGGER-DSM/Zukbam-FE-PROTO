import type { FriendRequest, FriendRequestStatus } from '../domain/friend';
import * as Friend from './FriendRow.styles';
import { Request } from './FriendSearchRow.styles';
import * as S from './FriendRequestRow.styles';

interface FriendRequestRowProps {
  request: FriendRequest;
  busy?: boolean;
  onRespond: (request: FriendRequest, status: Exclude<FriendRequestStatus, 'pending'>) => void;
}

export function FriendRequestRow({ request, onRespond, busy }: FriendRequestRowProps) {
  const isRejected = request.status === 'rejected';
  const statusLabel = isRejected ? '거절됨' : '수락함';

  return (
    <S.Row $rejected={isRejected} aria-label={`${request.name} ${request.id} 친구 요청`}>
      <Friend.Profile name={request.name} size={56} />
      <Friend.Info>
        <S.Name>
          <strong>{request.name}</strong>
          <span>{request.id}</span>
        </S.Name>
        <Friend.Meta>
          {request.tier && (
            <>
              <Friend.Tier>
                <img src={`/images/friends/tier-${request.tier}.svg`} alt="" />
                {request.tierLabel}
              </Friend.Tier>
              <Friend.Dot aria-hidden="true">·</Friend.Dot>
            </>
          )}
          <S.Time>{request.requestedAt}</S.Time>
        </Friend.Meta>
      </Friend.Info>
      <S.Actions>
        {request.status === 'pending' ? (
          <>
            <Friend.Action
              variant="secondary"
              disabled={busy}
              aria-label={`${request.name} 친구 요청 거절`}
              onClick={() => onRespond(request, 'rejected')}
            >
              거절
            </Friend.Action>
            <Request
              disabled={busy}
              aria-label={`${request.name} 친구 요청 수락`}
              onClick={() => onRespond(request, 'accepted')}
            >
              수락
            </Request>
          </>
        ) : (
          <S.Status $rejected={isRejected} aria-label={`${request.name} ${statusLabel}`}>
            <img src={`/images/friends/request-${request.status}.svg`} alt="" />
            {statusLabel}
          </S.Status>
        )}
      </S.Actions>
    </S.Row>
  );
}
