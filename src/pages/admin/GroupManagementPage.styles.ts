import styled from '@emotion/styled';
import { alpha, colors } from '../../shared/styles/colors';
import { Dialog } from '../../shared/ui/PreviewDialog.styles';
import { Input } from './ProblemRegistrationPage.styles';

export const Columns = styled.div`
  display: grid;
  grid-template-columns: minmax(15rem, 31fr) minmax(0, 69fr);
  align-items: start;
  gap: clamp(0.875rem, 1.05vw, 20px);
  @media (max-width: 1150px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Stack = styled.div`
  display: grid;
  gap: clamp(0.875rem, 1.05vw, 20px);
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const Form = styled.form`
  display: grid;
  gap: clamp(0.875rem, 1vw, 20px);
`;

export const GroupInput = styled(Input)`
  border-color: ${colors.line.normal};
`;

export const GroupList = styled.ul`
  display: grid;
  gap: 0.75rem;
`;

export const GroupButton = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.875rem 1.125rem;
  border-radius: 0.875rem;
  text-align: left;
  color: ${colors.label.neutral};
  > span {
    display: grid;
    gap: 0.25rem;
    overflow-wrap: anywhere;
  }
  img {
    opacity: 0.55;
  }
  &[aria-pressed='true'] {
    color: ${colors.label.strong};
    background: ${colors.fill.strong};
    img {
      opacity: 1;
    }
  }
`;

export const TableScroll = styled.div`
  overflow-x: auto;
  border: 1px solid ${colors.line.alternative};
  border-radius: 1rem;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 650px;
  border-collapse: collapse;
  white-space: nowrap;
  text-align: left;
  font-variant-numeric: tabular-nums;

  th,
  td {
    padding: 0.75rem clamp(0.5rem, 0.8vw, 16px);
  }
  tr > :first-child {
    padding-left: clamp(0.75rem, 1.25vw, 24px);
  }
  tr > :nth-child(n + 4) {
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
    height: clamp(3.5rem, 3.75vw, 72px);
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

export const Person = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

export const Owner = styled.span`
  margin-left: 0.5rem;
  padding: 0.125rem 0.5rem;
  border-radius: 0.5rem;
  background: ${colors.fill.normal};
  color: ${colors.primary.normal};
  font-size: 0.875rem;
  font-weight: 700;
`;

export const Detail = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  color: ${colors.primary.normal};
  font-size: 0.875rem;
  font-weight: 700;
`;

export const GroupModal = styled(Dialog)`
  && {
    width: min(560px, calc(100% - 2rem));
    padding: clamp(1.25rem, 2vw, 32px) clamp(1.25rem, 2vw, 36px);
    border-color: ${colors.line.normal};
    border-radius: 28px;
  }
  &&::backdrop {
    background: ${alpha(colors.static.black, 0.72)};
    backdrop-filter: none;
  }
  input:focus {
    outline: 1px solid ${colors.primary.normal};
    border-color: ${colors.primary.normal};
  }
`;

export const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  h2 {
    font-size: clamp(1.25rem, 1.25vw, 24px);
  }
`;

export const Types = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 4px;
  padding: 4px;
  border-radius: 1rem;
  background: ${colors.fill.normal};
  button {
    min-height: 44px;
    color: ${colors.label.alternative};
    cursor: default;
  }
`;

export const Danger = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 1rem;
  border-radius: 1rem;
  background: ${colors.fill.normal};
  > div {
    flex: 1;
    min-width: 0;
  }
  strong {
    color: ${colors.status.negativeStrong};
  }
  p {
    margin-top: 0.25rem;
    color: ${colors.label.neutral};
    font-size: 0.875rem;
  }
  button {
    margin: 0;
    white-space: nowrap;
  }
  @media (max-width: 420px) {
    flex-wrap: wrap;
  }
`;

export const DialogActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.75rem;
  button {
    margin-right: 0;
  }
`;
