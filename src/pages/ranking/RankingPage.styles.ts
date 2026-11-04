import styled from '@emotion/styled';
import { colors } from '../../shared/styles/colors';
import {
  rankingSize as size,
  rankingScale as scale,
} from '../../domains/ranking/presentation/rankingSize';
import * as Site from '../../shared/ui/SiteLayout.styles';

export const Layout = styled.div`
  --ranking-scale: clamp(0.875px, calc(0.5px + 0.026041667vw), 1px);

  @media (min-width: 701px) {
    > ${Site.Footer} {
      --page-max-width: ${scale(1920)};
      --page-gutter: clamp(24px, 4.166667vw, 80px);
      padding-block: ${scale(48)};
      gap: ${scale(40)};
    }
    ${Site.Brand} {
      gap: ${scale(12)};
      > p {
        font-size: ${scale(14)};
        line-height: ${scale(22)};
      }
      > small {
        font-size: ${scale(12)};
        line-height: ${scale(18)};
      }
    }
    ${Site.Team} {
      h2 {
        margin-bottom: ${scale(16)};
        font-size: ${scale(14)};
        line-height: ${scale(20)};
      }
      ul {
        gap: ${scale(12)};
      }
      li {
        padding: ${scale(14)} ${scale(18)} ${scale(14)} ${scale(14)};
        gap: ${scale(12)};
        border-radius: ${scale(16)};
      }
    }
    ${Site.MemberName} {
      font-size: ${scale(16)};
      line-height: ${scale(24)};
      > span {
        font-size: ${scale(12)};
        line-height: ${scale(16)};
      }
    }
    ${Site.Github} {
      font-size: ${scale(12)};
      line-height: ${scale(18)};
    }
  }

  @media (min-width: 701px) and (max-width: 1250px) {
    --ranking-scale: 1px;
  }

  @media (max-width: 700px) {
    --ranking-scale: 1px;
  }
`;

export const Page = styled.main`
  --page-gutter: clamp(24px, 4.166667vw, 80px);
  padding: ${scale(48)} var(--page-gutter);
  background: ${colors.background.elevated};
  @media (max-width: 700px) {
    padding: 1.5rem 1rem;
  }
`;

export const Shell = styled.div`
  position: relative;
  max-width: ${scale(1760)};
  margin-inline: auto;
  container-type: inline-size;
  > * {
    --ranking-unit: 0.05681818cqw;
  }
  @media (max-width: 1250px) {
    > * {
      --ranking-unit: 0.875px;
    }
  }
`;

export const Toolbar = styled.div`
  position: absolute;
  inset: 0 0 auto;
  z-index: 2;
  display: grid;
  grid-template-columns: ${size(494)} ${size(567)} minmax(0, 1fr);
  align-items: flex-end;
  padding: ${size(44)} 0 0 ${size(48)};
  @media (max-width: 1600px) {
    display: flex;
    justify-content: space-between;
    gap: ${scale(12)};
    padding-left: 0;
  }
  @media (max-width: 1250px) {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    gap: ${scale(24)};
    padding: 0;
  }
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const Intro = styled.div`
  flex-shrink: 0;
  > span {
    display: inline-block;
    padding: ${size(6)} ${size(12)} ${size(6)} ${size(8)};
    margin-bottom: ${size(12)};
    border-radius: ${scale(999)};
    background: ${colors.fill.strong};
    font-size: ${scale(12)};
    font-weight: 700;
    line-height: ${scale(16)};
  }
  h1 {
    font-size: ${scale(32)};
    line-height: ${scale(42)};
    font-weight: 900;
    letter-spacing: -0.025em;
    white-space: nowrap;
  }
  @media (max-width: 1250px) {
    position: static;
    h1 {
      font-size: 1.5rem;
      line-height: 2rem;
      white-space: normal;
    }
  }
`;

export const Countdown = styled.div`
  justify-self: start;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: ${size(14)};
  padding: ${size(10)} ${size(24)} ${size(10)} ${size(22)};
  border: 1px solid ${colors.line.alternative};
  border-radius: ${scale(999)};
  background: ${colors.fill.strong};
  white-space: nowrap;
  > span {
    color: ${colors.label.alternative};
    font-size: ${scale(14)};
  }
  > div {
    display: flex;
    align-items: baseline;
    gap: ${size(2)};
  }
  strong {
    font-size: ${scale(24)};
    line-height: ${scale(32)};
  }
  small {
    margin-right: ${size(4)};
    color: ${colors.label.assistive};
    font-size: ${scale(14)};
  }
  small:last-child {
    margin-right: 0;
  }
  @media (max-width: 1250px) {
    position: static;
  }
`;

export const Filters = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: ${size(24)};
  @media (max-width: 1250px) {
    position: static;
    grid-column: 1 / -1;
    justify-content: flex-end;
    gap: ${scale(24)};
  }
  @media (max-width: 700px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
`;

export const Segment = styled.div`
  display: flex;
  gap: ${size(4)};
  padding: ${size(4)};
  border-radius: ${scale(999)};
  background: ${colors.fill.normal};
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${size(8)};
    padding: ${size(10)} ${size(20)} ${size(10)} ${size(16)};
    border-radius: ${scale(999)};
    color: ${colors.label.alternative};
    font-size: ${scale(16)};
    font-weight: 700;
    line-height: ${scale(24)};
    white-space: nowrap;
  }
  button > img {
    width: ${size(24)};
    height: ${size(24)};
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
  width: ${scale(226)};
  height: ${scale(52)};
  padding: ${scale(4)};
  gap: ${scale(4)};
  button {
    flex: 1 1 0;
    min-width: 0;
    padding: ${scale(8)} ${scale(20)};
  }
  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const Results = styled.div`
  padding-bottom: ${size(32)};
  @media (max-width: 1250px) {
    margin-top: 1rem;
    padding-bottom: 0;
  }
`;
