import styled from '@emotion/styled';
import { colors } from '../../../shared/styles/colors';
import * as Friend from './FriendRow.styles';
import { Sent } from './FriendSearchRow.styles';

interface RequestStyleProps {
  $rejected: boolean;
}

export const Row = styled(Friend.Row)<RequestStyleProps>`
  > img {
    opacity: ${({ $rejected }) => ($rejected ? 0.5 : 1)};
  }
  strong {
    color: ${({ $rejected }) => ($rejected ? colors.label.alternative : colors.static.white)};
  }
  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr);
  }
`;

export const Name = styled(Friend.Name)`
  flex-wrap: wrap;
  row-gap: 0;
`;

export const Time = styled.span`
  color: ${colors.label.alternative};
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  @media (max-width: 600px) {
    grid-column: 2;
    justify-self: end;
  }
`;

export const Status = styled(Sent)<RequestStyleProps>`
  color: ${({ $rejected }) => ($rejected ? colors.label.assistive : colors.primary.heavy)};
`;

export const Pending = styled.span`
  padding: 0.1875rem 0.625rem;
  border-radius: 999px;
  color: ${colors.primary.normal};
  background: ${colors.primary.subtle};
  font-size: 0.875rem;
  line-height: 1.25rem;
`;
