import styled from '@emotion/styled';
import { colors } from '../../../shared/styles/colors';

export const Root = styled.aside`
  position: absolute;
  top: clamp(9rem, 15cqw, 13rem);
  right: 0;
  width: var(--ranking-aside-width);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  padding: 1.5rem;
  border: 1px solid ${colors.line.alternative};
  border-radius: 1.25rem;
  background: ${colors.fill.normal};
  p {
    color: ${colors.label.alternative};
    font-size: 0.875rem;
    line-height: 1.375rem;
  }
`;

export const MyRank = styled(Panel)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  > [role='progressbar'] {
    font-size: 1rem;
    height: 1.6875rem;
  }
`;

export const Summary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding-bottom: 0.5rem;
  > img {
    width: 4.5rem;
    height: 5.25rem;
  }
  h2 {
    color: ${colors.label.neutral};
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  > strong {
    font-size: 2rem;
    line-height: 2.625rem;
    font-weight: 900;
    letter-spacing: -0.025em;
  }
`;

export const NextRank = styled.div`
  display: flex;
  align-items: baseline;
  width: 100%;
  gap: 0.375rem;
  font-size: 1.125rem;
  line-height: 1.625rem;
  > strong:last-child {
    color: ${colors.status.cautionary};
  }
`;

export const TierGuide = styled(Panel)`
  h2 {
    margin-bottom: 0.25rem;
    font-size: 1.125rem;
    line-height: 1.625rem;
  }
  ol {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-top: 0.25rem;
  }
  li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0.75rem 0.5rem 0.625rem;
    border-radius: 0.75rem;
  }
  li > img {
    width: 2.25rem;
    height: 2.625rem;
  }
  li > strong {
    flex: 1;
    font-size: 1rem;
    line-height: 1.5rem;
    white-space: nowrap;
  }
  li > span {
    color: ${colors.label.alternative};
    font-size: 0.875rem;
    line-height: 1.375rem;
    white-space: nowrap;
  }
  li[aria-current='step'] > strong {
    color: ${colors.primary.strong};
  }
`;
