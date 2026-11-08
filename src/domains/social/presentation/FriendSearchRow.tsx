import type { FriendSearchResult } from '../domain/friend';
import * as Row from './FriendRow.styles';
import * as S from './FriendSearchRow.styles';

interface FriendSearchRowProps {
  person: FriendSearchResult;
  busy?: boolean;
  onRequest: (person: FriendSearchResult) => void;
}

export function FriendSearchRow({ person, onRequest, busy }: FriendSearchRowProps) {
  return (
    <Row.Row aria-label={`${person.name} ${person.id}`}>
      <Row.Profile name={person.name} size={56} />
      <Row.Info>
        <Row.Name>
          <strong>{person.name}</strong>
          <span>{person.studentNumber || person.id}</span>
        </Row.Name>
        <Row.Meta>
          <Row.Tier>
            {person.tier && <img src={`/images/friends/tier-${person.tier}.svg`} alt="" />}
            {person.tierLabel}
          </Row.Tier>
        </Row.Meta>
      </Row.Info>
      {person.requestStatus === 'requested' ? (
        <S.Sent aria-label={`${person.name} ${person.id} 요청 보냄`}>
          <img src="/images/friends/request-sent.svg" alt="" />
          요청 보냄
        </S.Sent>
      ) : (
        <S.Request
          disabled={busy}
          onClick={() => onRequest(person)}
          aria-label={`${person.name} ${person.id} 친구 요청`}
        >
          친구 요청
        </S.Request>
      )}
    </Row.Row>
  );
}
