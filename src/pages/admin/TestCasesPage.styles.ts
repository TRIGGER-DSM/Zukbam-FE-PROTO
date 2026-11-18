import styled from '@emotion/styled';
import { Link } from 'react-router';
import { alpha, colors } from '../../shared/styles/colors';
import { Dialog } from '../../shared/ui/PreviewDialog.styles';

export const Back = styled(Link)`
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 0.375rem;
  color: ${colors.label.alternative};
  font-size: 0.875rem;
`;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const TableScroll = styled.div`
  overflow-x: auto;
  border: 1px solid ${colors.line.alternative};
  border-radius: 1rem;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 33rem;
  table-layout: fixed;
  border-collapse: collapse;
  text-align: left;

  thead {
    background: ${colors.background.alternative};
  }
  th,
  td {
    padding: 0.875rem clamp(0.625rem, 1.25vw, 24px);
  }
  th {
    color: ${colors.label.alternative};
  }
  thead th {
    height: clamp(2.75rem, 2.5vw, 48px);
    font-size: 0.875rem;
  }
  tbody tr {
    height: clamp(3.125rem, 3.125vw, 60px);
    border-top: 1px solid ${colors.line.alternative};
  }
  th:first-child {
    width: clamp(3rem, 3.33vw, 64px);
  }
  thead th:nth-child(3) {
    width: 22%;
  }
  thead th:nth-child(4) {
    width: 7rem;
  }
  thead th:last-child {
    width: 3.5rem;
  }
  td:nth-last-child(2) {
    padding-inline: 0.25rem;
    text-align: right;
  }
  td:last-child {
    padding-inline: 0.375rem;
    text-align: center;
  }
  td[colspan] {
    text-align: center;
    color: ${colors.label.alternative};
  }
`;

export const Value = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 0.3125rem 0.625rem;
  border-radius: 0.5rem;
  color: ${colors.primary.normal};
  background: ${colors.fill.normal};
  font-size: 0.875rem;
  font-weight: 700;
`;

export const Edit = styled.button`
  display: inline-grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
`;

export const DialogForm = styled.form`
  display: grid;
  gap: 1rem;
  > div:last-child {
    justify-content: flex-end;
  }
`;

export const EditDialog = styled(Dialog)`
  && {
    width: min(760px, calc(100% - 2rem));
    padding: clamp(1.25rem, 2vw, 32px) clamp(1.25rem, 2vw, 36px);
    border-color: ${colors.line.normal};
    border-radius: 28px;
  }
  &&::backdrop {
    background: ${alpha(colors.static.black, 0.72)};
    backdrop-filter: none;
  }
  ${DialogForm} {
    gap: clamp(1rem, 1.25vw, 24px);
  }
  textarea {
    min-height: clamp(7rem, 10vw, 180px);
    border-color: ${colors.line.normal};
    &:focus {
      outline: 1px solid ${colors.primary.normal};
      border-color: ${colors.primary.normal};
    }
  }
`;

export const DialogHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  h2 {
    font-size: clamp(1.25rem, 1.25vw, 24px);
  }
`;

export const Close = styled.button`
  display: grid;
  place-items: center;
  flex: none;
`;

export const Stack = styled.div`
  display: grid;
  gap: 1rem;
`;

export const Io = styled(Stack)`
  grid-template-columns: repeat(2, minmax(0, 1fr));
  @media (max-width: 540px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const Check = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  input {
    accent-color: ${colors.primary.normal};
  }
  input[role='switch'] {
    appearance: none;
    display: inline-flex;
    align-items: center;
    width: 44px;
    height: 26px;
    margin: 0 0.25rem 0 0;
    padding: 3px;
    border-radius: 999px;
    background: ${colors.fill.heavy};
    cursor: pointer;
  }
  input[role='switch']::before {
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${colors.static.white};
  }
  input[role='switch']:checked {
    justify-content: flex-end;
    background: ${colors.primary.normal};
  }
`;

export const Generate = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  color: ${colors.primary.normal};
  font-size: 0.875rem;
  font-weight: 700;
  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

export const Format = styled.code`
  color: ${colors.label.neutral};
  overflow-wrap: anywhere;
`;
