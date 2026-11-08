import styled from '@emotion/styled';
import { colors } from '../../shared/styles/colors';

export const Page = styled.main`
  padding: clamp(1.5rem, 4vw, 3rem) var(--page-gutter);
  background: ${colors.background.elevated};
`;

export const Shell = styled.div`
  --ranking-aside-width: clamp(16rem, 24%, 20rem);
  position: relative;
  max-width: var(--page-content-width);
  margin-inline: auto;
  container-type: inline-size;
`;

export const Toolbar = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: end;
  gap: clamp(0.75rem, 2vw, 1.5rem);
  margin-bottom: 1rem;

  @media (max-width: 700px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const Intro = styled.div`
  flex-shrink: 0;
  > span {
    display: inline-block;
    padding: 0.375rem 0.75rem 0.375rem 0.5rem;
    margin-bottom: 0.75rem;
    border-radius: 62.4375rem;
    background: ${colors.fill.strong};
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1rem;
  }
  h1 {
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    line-height: 1.3125;
    font-weight: 900;
    letter-spacing: -0.025em;
  }
`;

export const Countdown = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem 0.875rem;
  max-width: 100%;
  padding: 0.625rem clamp(0.875rem, 2vw, 1.5rem);
  border: 1px solid ${colors.line.alternative};
  border-radius: 62.4375rem;
  background: ${colors.fill.strong};
  white-space: nowrap;
  > span {
    color: ${colors.label.alternative};
    font-size: 0.875rem;
  }
  > div {
    display: flex;
    align-items: baseline;
    gap: 0.125rem;
  }
  strong {
    font-size: 1.5rem;
    line-height: 2rem;
  }
  small {
    margin-right: 0.25rem;
    color: ${colors.label.assistive};
    font-size: 0.875rem;
  }
  small:last-child {
    margin-right: 0;
  }
`;

export const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  @media (max-width: 700px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
`;

export const Segment = styled.div`
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  border-radius: 62.4375rem;
  background: ${colors.fill.normal};
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem 0.625rem 1rem;
    border-radius: 62.4375rem;
    color: ${colors.label.alternative};
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.5rem;
    white-space: nowrap;
  }
  button > img {
    width: 1.5rem;
    height: 1.5rem;
    object-fit: contain;
    opacity: 0.55;
  }
  button[aria-pressed='true'] {
    background: ${colors.fill.heavy};
    color: ${colors.static.white};
    img {
      opacity: 1;
    }
  }
  @media (max-width: 700px) {
    button {
      flex: 1;
      padding-inline: 0.625rem;
    }
  }
`;

export const PeriodSegment = styled(Segment)`
  width: fit-content;
  padding: 0.25rem;
  gap: 0.25rem;
  button {
    flex: 1 1 0;
    min-width: 0;
    padding: 0.5rem 1.25rem;
  }
  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const Results = styled.div`
  padding-bottom: 2rem;
  @media (max-width: 1250px) {
    margin-top: 1rem;
    padding-bottom: 0;
  }
`;
