import { colors } from '../../../shared/styles/colors';
import styled from '@emotion/styled';

export const Root = styled.section`
  display: flex;
  align-items: center;
  gap: 1.75rem;
  padding: 2rem 2.25rem;
  border-radius: 1.5rem;
  background: ${colors.background.elevated};
  @media (max-width: 1150px) {
    flex-wrap: wrap;
  }
  @media (max-width: 600px) {
    padding: 1.25rem;
    gap: 1rem;
    & > img {
      width: 4rem;
      height: 4rem;
    }
  }
`;

export const Info = styled.div`
  display: grid;
  gap: 0.625rem;
  flex: 1;
  min-width: 13rem;
`;

export const Name = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  h3 {
    margin: 0;
    font-size: 2rem;
    line-height: 1.3125;
    font-weight: 900;
    letter-spacing: -0.025em;
  }
  span {
    padding: 0.3125rem 0.75rem;
    background: ${colors.fill.normal};
    border-radius: 999px;
    color: ${colors.label.alternative};
    font-size: 0.875rem;
  }
`;

export const Tier = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  white-space: nowrap;
  img {
    width: 1.25rem;
    height: 1.25rem;
  }
  img:first-of-type {
    width: 1.75rem;
    height: 2.0625rem;
  }
  span {
    color: ${colors.label.assistive};
  }
`;

export const Xp = styled.strong`
  color: ${colors.status.cautionary};
`;

export const Stats = styled.dl`
  display: flex;
  margin: 0;
  flex-wrap: wrap;
  div {
    display: grid;
    gap: 0.375rem;
    padding: 0 1.5rem;
    border-right: 1px solid ${colors.line.normal};
  }
  div:last-child {
    border-right: 0;
  }
  dt {
    color: ${colors.label.alternative};
    font-size: 0.875rem;
  }
  dd {
    margin: 0;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
  }
  @media (max-width: 600px) {
    width: 100%;
    gap: 1rem 0;
    div {
      width: 50%;
      padding-left: 0.75rem;
    }
    div:nth-of-type(2n) {
      border: 0;
    }
  }
`;
