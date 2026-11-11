import styled from '@emotion/styled';
import { colors } from '../../../shared/styles/colors';

export const Section = styled.section`
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid ${colors.line.alternative};
`;

export const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const List = styled.ul`
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid ${colors.line.alternative};
  }

  li > div {
    display: grid;
    gap: 0.25rem;
    min-width: 0;
    overflow-wrap: anywhere;
  }

  time,
  li span {
    color: ${colors.label.alternative};
    font-size: 0.875rem;
  }
`;

export const Amount = styled.strong<{ $deducted: boolean }>`
  white-space: nowrap;
  color: ${({ $deducted }) => ($deducted ? colors.status.negative : colors.primary.strong)};
`;
