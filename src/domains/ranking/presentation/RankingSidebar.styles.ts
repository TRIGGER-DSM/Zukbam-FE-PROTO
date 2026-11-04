import styled from '@emotion/styled';
import { colors } from '../../../shared/styles/colors';
import { rankingSize as size, rankingScale as scale } from './rankingSize';

export const Root = styled.aside`
  position: absolute;
  top: ${size(234)};
  right: 0;
  width: 20%;
  display: flex;
  flex-direction: column;
  gap: ${size(24)};
  @media (max-width: 1250px) {
    position: static;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
    margin-top: 1.5rem;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.section`
  padding: ${size(24)};
  border: 1px solid ${colors.line.alternative};
  border-radius: ${size(20)};
  background: ${colors.fill.normal};
  p {
    color: ${colors.label.alternative};
    font-size: ${scale(14)};
    line-height: ${scale(22)};
  }
`;

export const MyRank = styled(Panel)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${size(16)};
  > [role='progressbar'] {
    font-size: ${scale(16)};
    height: ${size(27)};
  }
`;

export const Summary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${size(4)};
  padding-bottom: ${size(8)};
  > img {
    width: ${size(72)};
    height: ${size(84)};
  }
  h2 {
    color: ${colors.label.neutral};
    font-size: ${scale(14)};
    line-height: ${scale(20)};
  }
  > strong {
    font-size: ${scale(32)};
    line-height: ${scale(42)};
    font-weight: 900;
    letter-spacing: -0.025em;
  }
`;

export const NextRank = styled.div`
  display: flex;
  align-items: baseline;
  width: 100%;
  gap: ${size(6)};
  font-size: ${scale(18)};
  line-height: ${scale(26)};
  > strong:last-child {
    color: ${colors.status.cautionary};
  }
`;

export const TierGuide = styled(Panel)`
  h2 {
    margin-bottom: ${size(4)};
    font-size: ${scale(18)};
    line-height: ${scale(26)};
  }
  ol {
    display: flex;
    flex-direction: column;
    gap: ${size(4)};
    margin-top: ${size(4)};
  }
  li {
    display: flex;
    align-items: center;
    gap: ${size(12)};
    padding: ${size(8)} ${size(12)} ${size(8)} ${size(10)};
    border-radius: ${size(12)};
  }
  li > img {
    width: ${size(36)};
    height: ${size(42)};
  }
  li > strong {
    flex: 1;
    font-size: ${scale(16)};
    line-height: ${scale(24)};
    white-space: nowrap;
  }
  li > span {
    color: ${colors.label.alternative};
    font-size: ${scale(14)};
    line-height: ${scale(22)};
    white-space: nowrap;
  }
  li[aria-current='step'] > strong {
    color: ${colors.primary.strong};
  }
`;
