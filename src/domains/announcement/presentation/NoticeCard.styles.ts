import styled from '@emotion/styled';
import { colors } from '../../../shared/styles/colors';

export const Card = styled.section`
  min-width: 0;
  padding: 1.75rem 1.5rem 1.25rem;
  border: 1px solid ${colors.line.alternative};
  border-radius: 1.25rem;
  background: ${colors.background.elevated};
  h2 {
    font-size: 1.5rem;
    line-height: 1.333;
    white-space: nowrap;
  }
  li {
    border-top: 1px solid ${colors.line.alternative};
  }
  li button {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 1rem;
    min-height: 4.375rem;
    text-align: left;
    font-size: 1rem;
  }
  li button > img {
    width: 1rem;
    flex-shrink: 0;
  }
`;

export const Bell = styled.span`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: ${colors.fill.strong};
  img {
    width: 1.25rem;
  }
`;

export const Date = styled.span`
  flex-shrink: 0;
  color: ${colors.label.assistive};
`;

export const Name = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const NewBadge = styled.span`
  flex-shrink: 0;
  padding: 2px 6px;
  border-radius: 999px;
  color: ${colors.static.black};
  background: ${colors.primary.normal};
  font-size: 0.75rem;
  font-weight: 700;
`;
