import styled from '@emotion/styled';
import { colors, alpha } from '../../../shared/styles/colors';

interface RowStyleProps {
  $mine: boolean;
}

export const Panel = styled.section`
  position: relative;
  width: calc(100% - var(--ranking-aside-width, 0px) - 1.5rem);
  padding: 1.5rem 1.5rem 2rem;
  border: 1px solid ${colors.line.alternative};
  border-radius: 1.5rem;
  background: ${colors.background.elevated};
  @media (max-width: 1250px) {
    width: 100%;
  }
  @media (max-width: 700px) {
    padding: 1rem 0.625rem 1.25rem;
    border-radius: 1rem;
  }
`;

export const Table = styled.table`
  display: block;
  width: 100%;
  border-collapse: collapse;
  thead,
  tbody {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  thead {
    margin-bottom: 0.5rem;
  }
  tr {
    display: grid;
    grid-template-columns: 4.5rem 6rem 8.125rem minmax(0, 1fr) 7.5rem;
    grid-template-rows: minmax(0, 1fr);
    align-items: center;
    gap: 1rem;
    padding-inline: 1.5rem;
  }
  thead tr {
    height: 2.25rem;
  }
  th {
    color: ${colors.label.assistive};
    font-size: 0.8125rem;
    line-height: 1.125rem;
    font-weight: 400;
    text-align: left;
  }
  th:nth-of-type(-n + 2) {
    text-align: center;
  }
  th:last-child {
    text-align: right;
  }
  td {
    min-width: 0;
    padding: 0;
  }
  @media (max-width: 700px) {
    tr {
      grid-template-columns: 1.875rem 3rem 3.3125rem minmax(0, 1fr) 3rem;
      gap: 0.375rem;
      padding-inline: 0.5rem;
    }
    th {
      font-size: 0.625rem;
      line-height: 0.875rem;
    }
  }
`;

export const Position = styled.td`
  color: ${colors.label.alternative};
  font-size: 1.5rem;
  line-height: 1.625rem;
  font-weight: 900;
  text-align: center;
  @media (max-width: 700px) {
    font-size: 1.125rem;
  }
`;

export const CardCell = styled.td`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 0;
  > img {
    width: 5.875rem;
    height: 7.875rem;
    max-width: none;
  }
  @media (max-width: 700px) {
    > img {
      width: 3.625rem;
      height: auto;
    }
  }
`;

export const Score = styled.td`
  > span {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    color: ${colors.label.alternative};
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
  }
  img {
    width: 0.875rem;
    height: 0.875rem;
    object-fit: contain;
  }
  @media (max-width: 700px) {
    > span {
      gap: 2px;
      font-size: 0.625rem;
    }
    img {
      width: 0.625rem;
      height: 0.625rem;
    }
  }
`;

export const User = styled.td`
  > span {
    display: flex;
    align-items: center;
    gap: 0.875rem;
  }
  img {
    width: 2.5rem;
    height: 2.5rem;
  }
  strong {
    font-size: 1rem;
    line-height: 1.5rem;
    white-space: nowrap;
  }
  small {
    padding: 1px 0.5rem;
    margin-left: -0.5rem;
    border-radius: 999px;
    background: ${colors.label.assistive};
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 700;
  }
  @media (max-width: 700px) {
    > span {
      gap: 0.3125rem;
      flex-wrap: wrap;
    }
    img {
      width: 1.375rem;
      height: 1.375rem;
    }
    strong {
      font-size: 0.6875rem;
      line-height: 1.125rem;
    }
    small {
      margin-left: 0;
      padding: 0 0.3125rem;
      font-size: 0.5625rem;
    }
  }
`;

export const Solved = styled.td`
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: 2px;
  color: ${colors.label.alternative};
  strong {
    font-size: 0.9375rem;
  }
  small {
    font-size: 0.75rem;
    white-space: nowrap;
  }
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-end;
    gap: 0;
    strong {
      font-size: 0.6875rem;
    }
    small {
      font-size: 0.5rem;
    }
  }
`;

export const Row = styled.tr<RowStyleProps>`
  height: ${({ $mine }) => ($mine ? '7.75rem' : '7rem')};
  border-radius: 1rem;
  background: ${({ $mine }) =>
    $mine
      ? `linear-gradient(90deg, ${alpha(colors.static.white, 0.070588)}, transparent), ${colors.fill.raised}`
      : colors.fill.normal};
  ${({ $mine }) =>
    $mine &&
    `
    td:nth-of-type(1) { color: ${colors.static.white}; }
    td:nth-of-type(2) > img { width: 7.5rem; height: 11.125rem; }
    td:nth-of-type(3) > span { color: ${colors.label.normal}; font-size: 0.9375rem; }
    td:nth-of-type(4) strong { font-size: 1.25rem; font-weight: 900; }
  `}
  @media (max-width: 700px) {
    height: ${({ $mine }) => ($mine ? '5.625rem' : '4.875rem')};
    border-radius: 0.625rem;
    ${({ $mine }) =>
      $mine &&
      `
      td:nth-of-type(2) > img { width: 4rem; height: auto; }
      td:nth-of-type(3) > span { font-size: 0.625rem; }
      td:nth-of-type(4) strong { font-size: 0.75rem; }
    `}
  }
`;

export const Ellipsis = styled.tr`
  height: 2.125rem;
  color: ${colors.label.assistive};
  font-size: 1.125rem;
  font-weight: 700;
  text-align: center;
  td {
    grid-column: 1 / -1;
  }
`;
