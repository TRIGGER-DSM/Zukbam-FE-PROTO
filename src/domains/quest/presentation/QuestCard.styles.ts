import styled from '@emotion/styled';
import { colors } from '../../../shared/styles/colors';
import { Asset } from '../../../shared/ui/Asset';

export const Card = styled.section`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.75rem;
  border: 1px solid ${colors.line.alternative};
  border-radius: 1.25rem;
  background: ${colors.background.elevated};
`;

export const Title = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
  h2 {
    font-size: 1.5rem;
    line-height: 1.333;
  }
`;

export const Timer = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${colors.accent.streak};
  white-space: nowrap;
  font-size: 1rem;
  font-weight: 700;
  img {
    width: 1.125rem;
  }
`;

export const List = styled.ul`
  display: grid;
  gap: 1.5rem;
  padding-block: 0.5rem 0.25rem;
`;

export const Item = styled.li`
  display: grid;
  grid-template-columns: 5.5rem minmax(0, 1fr);
  align-items: center;
  gap: 1.25rem;
  @media (max-width: 700px) {
    grid-template-columns: 40px minmax(0, 1fr);
    gap: 10px;
  }
`;

export const Icon = styled(Asset)`
  display: block;
  width: 100%;
  height: auto;
`;

export const Details = styled.div`
  min-width: 0;
  display: grid;
  gap: 0.5rem;
  strong {
    font-size: 1.125rem;
    line-height: 1.45;
  }
`;

export const Meter = styled.div`
  display: flex;
  align-items: center;
  > [role='progressbar'] {
    flex: 1;
    height: 2.3125rem;
  }
`;

export const Reward = styled(Asset)`
  position: relative;
  width: 3.25rem;
  height: auto;
  margin-inline-start: -8px;
`;
