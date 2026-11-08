import styled from '@emotion/styled';
import { colors } from '../../../shared/styles/colors';
import { Asset } from '../../../shared/ui/Asset';

interface TierStyleProps {
  $current: boolean;
  $locked: boolean;
}

export const Card = styled.section`
  display: grid;
  grid-template-columns: 11.8125rem minmax(0, 1fr) minmax(0, 1fr);
  gap: 2.5rem;
  align-items: start;
  min-width: 0;
  padding: 1.625rem 1.5rem;
  border: 1px solid ${colors.line.alternative};
  border-radius: 1.25rem;
  background: ${colors.background.elevated};
  h2 {
    color: ${colors.label.neutral};
    font-size: 1.5rem;
    line-height: 1.333;
  }
  @media (max-width: 1100px) {
    grid-template-columns: 9.375rem minmax(0, 1fr);
    gap: 20px;
  }
  @media (max-width: 600px) {
    grid-template-columns: 64px minmax(0, 1fr);
    gap: 12px;
  }
`;

export const Medal = styled(Asset)`
  align-self: center;
  width: 100%;
  height: auto;
  &[alt=''] {
    opacity: 0.45;
  }
`;

export const Progress = styled.div`
  display: grid;
  gap: 0.75rem;
  min-width: 0;
  h3 {
    font-size: 2rem;
    line-height: 1.3125;
    font-weight: 900;
  }
`;

export const Bamboo = styled(Asset)`
  display: block;
  width: 100%;
  height: auto;
`;

export const Track = styled.div`
  min-height: 1.625rem;
  margin-block: 1rem 0.625rem;
  border-radius: 5px;
  background: ${colors.fill.strong};
`;

export const XpLabels = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${colors.label.assistive};
  font-size: 1rem;
  strong {
    color: ${colors.label.neutral};
  }
`;

export const Ladder = styled.div`
  display: grid;
  gap: 0.75rem;
  min-width: 0;
  @media (max-width: 1100px) {
    grid-column: 1 / -1;
  }
`;

export const Tiers = styled.ol`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 0.375rem;
`;

export const Tier = styled.li<TierStyleProps>`
  display: grid;
  justify-items: center;
  gap: 0.625rem;
  padding: 0.875rem 3px;
  border: 2px solid ${({ $current }) => ($current ? colors.label.assistive : 'transparent')};
  border-radius: 0.875rem;
  background: ${({ $current }) => ($current ? colors.fill.strong : 'transparent')};
  color: ${({ $current }) => ($current ? colors.static.white : colors.label.alternative)};
  font-size: 1rem;
  white-space: nowrap;
  opacity: ${({ $locked }) => ($locked ? 0.45 : 1)};
  img {
    width: min(100%, 4.625rem);
    height: auto;
  }
  @media (max-width: 600px) {
    font-size: 11px;
  }
`;
