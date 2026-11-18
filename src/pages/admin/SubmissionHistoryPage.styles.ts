import styled from '@emotion/styled';
import { Link } from 'react-router';
import { colors } from '../../shared/styles/colors';
import { Filters, Search } from './AdminDashboardPage.styles';

export const FilterForm = Filters.withComponent('form');
export const SearchBox = Search.withComponent('div');

export const Back = styled(Link)`
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 0.375rem;
  color: ${colors.label.alternative};
  font-size: 0.875rem;
`;

export const Person = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  span {
    color: ${colors.label.alternative};
  }
`;

export const Muted = styled.span`
  color: ${colors.label.alternative};
`;

export const TableScroll = styled.div`
  overflow-x: auto;
  border: 1px solid ${colors.line.alternative};
  border-radius: 1rem;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 740px;
  border-collapse: collapse;
  white-space: nowrap;
  text-align: left;
  font-variant-numeric: tabular-nums;
  th,
  td {
    padding: 0.75rem clamp(0.5rem, 1vw, 20px);
  }
  tr > :first-child {
    padding-left: clamp(0.75rem, 1.25vw, 24px);
  }
  th:nth-child(2) {
    width: 34%;
  }
  tr > :nth-child(n + 5) {
    text-align: right;
  }
  thead {
    color: ${colors.label.alternative};
    background: ${colors.background.alternative};
    font-size: 0.875rem;
  }
  thead th {
    height: clamp(2.75rem, 2.5vw, 48px);
  }
  tbody tr {
    height: clamp(3.25rem, 3.33vw, 64px);
    border-top: 1px solid ${colors.line.alternative};
  }
  td[colspan] {
    text-align: center;
    color: ${colors.label.alternative};
  }
`;

export const Sort = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 700;
  th[aria-sort] & {
    color: ${colors.label.strong};
  }
  th[aria-sort='ascending'] & img {
    transform: rotate(180deg);
  }
`;

export const Problem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Result = styled.span`
  display: inline-block;
  padding: 0.25rem 0.625rem;
  border-radius: 0.5rem;
  background: ${colors.fill.normal};
  color: ${colors.label.neutral};
  font-size: 0.875rem;
  font-weight: 700;
  &[data-status='ACCEPTED'] {
    color: ${colors.primary.normal};
  }
  &[data-status='WRONG_ANSWER'],
  &[data-status='RUNTIME_ERROR'] {
    color: ${colors.status.negative};
  }
  &[data-status='TIME_LIMIT_EXCEEDED'] {
    color: ${colors.status.cautionary};
  }
`;

export const CodeButton = styled.button`
  display: inline-flex;
  align-items: center;
  color: ${colors.primary.normal};
  font-weight: 700;
`;

export const Pages = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.375rem;
  color: ${colors.label.neutral};
  button {
    display: grid;
    place-items: center;
    min-width: 2.5rem;
    height: 2.5rem;
    padding-inline: 0.375rem;
    border-radius: 0.75rem;
    background: ${colors.fill.normal};
    font-weight: 700;
  }
  button[aria-current] {
    color: ${colors.static.black};
    background: ${colors.primary.normal};
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const Code = styled.pre`
  overflow: auto;
  max-height: 50vh;
  padding: 1rem;
  background: ${colors.background.alternative};
`;
