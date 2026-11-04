import styled from '@emotion/styled';
import { colors, alpha } from '../../../shared/styles/colors';
import { rankingSize as size, rankingScale as scale } from './rankingSize';

interface RowStyleProps {
  $mine: boolean;
}

export const Panel = styled.section`
  position: relative;
  width: 77.954545%;
  padding: ${size(24)} ${size(24)} ${size(32)};
  border: 1px solid ${colors.line.alternative};
  border-radius: ${size(24)};
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
    gap: ${size(8)};
  }
  thead {
    margin-bottom: ${size(8)};
  }
  tr {
    display: grid;
    grid-template-columns: ${size(72)} ${size(96)} ${size(130)} minmax(0, 1fr) ${size(120)};
    grid-template-rows: minmax(0, 1fr);
    align-items: center;
    gap: ${size(16)};
    padding-inline: ${size(24)};
  }
  thead tr {
    height: ${size(36)};
  }
  th {
    color: ${colors.label.assistive};
    font-size: ${scale(13)};
    line-height: ${scale(18)};
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
  font-size: ${scale(24)};
  line-height: ${scale(26)};
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
    width: ${size(94)};
    height: ${size(126)};
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
    gap: ${size(6)};
    color: ${colors.label.alternative};
    font-size: ${scale(14)};
    font-weight: 500;
    line-height: ${scale(20)};
  }
  img {
    width: ${size(14)};
    height: ${size(14)};
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
    gap: ${size(14)};
  }
  img {
    width: ${size(40)};
    height: ${size(40)};
  }
  strong {
    font-size: ${scale(16)};
    line-height: ${scale(24)};
    white-space: nowrap;
  }
  small {
    padding: 1px ${size(8)};
    margin-left: ${size(-8)};
    border-radius: 999px;
    background: ${colors.label.assistive};
    font-size: ${scale(12)};
    line-height: ${scale(16)};
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
    font-size: ${scale(15)};
  }
  small {
    font-size: ${scale(12)};
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
  height: ${({ $mine }) => size($mine ? 124 : 112)};
  border-radius: ${size(16)};
  background: ${({ $mine }) =>
    $mine
      ? `linear-gradient(90deg, ${alpha(colors.static.white, 0.070588)}, transparent), ${colors.fill.raised}`
      : colors.fill.normal};
  ${({ $mine }) =>
    $mine &&
    `
    td:nth-of-type(1) { color: ${colors.static.white}; }
    td:nth-of-type(2) > img { width: ${size(120)}; height: ${size(178)}; }
    td:nth-of-type(3) > span { color: ${colors.label.normal}; font-size: ${scale(15)}; }
    td:nth-of-type(4) strong { font-size: ${scale(20)}; font-weight: 900; }
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
  height: ${size(34)};
  color: ${colors.label.assistive};
  font-size: ${scale(18)};
  font-weight: 700;
  text-align: center;
  td {
    grid-column: 1 / -1;
  }
`;
