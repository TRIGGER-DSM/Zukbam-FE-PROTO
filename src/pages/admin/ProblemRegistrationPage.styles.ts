import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router';
import { colors } from '../../shared/styles/colors';
import { Card, Panel, Select } from './AdminDashboardPage.styles';

const fieldStyle = css`
  width: 100%;
  min-width: 0;
  padding: 0.875rem 1rem;
  border: 1px solid ${colors.line.alternative};
  border-radius: 0.875rem;
  background-color: ${colors.background.alternative};
  color: ${colors.label.normal};
  font: inherit;
  color-scheme: dark;
  &::placeholder {
    color: ${colors.label.alternative};
  }
  &:focus-visible {
    outline: 1px solid ${colors.primary.normal};
  }
  &[aria-invalid='true'] {
    border-color: ${colors.status.negative};
  }
`;

export const Form = styled(Panel.withComponent('form'))`
  padding-bottom: clamp(1.25rem, 3.125vw, 60px);
`;

export const Section = styled(Card)<{ $plain?: boolean }>`
  gap: clamp(1rem, 1.25vw, 24px);
  ${({ $plain }) =>
    $plain &&
    css`
      padding: 0;
      background: transparent;
    `}
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  background: ${colors.fill.normal};
  color: ${colors.label.neutral};
  > span {
    display: grid;
    width: 1.5rem;
    height: 1.5rem;
    place-items: center;
    border-radius: 50%;
    background: ${colors.fill.raised};
    font-weight: 700;
  }
`;

export const CaseSummary = styled(Card.withComponent('div'))`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  > div {
    display: grid;
    gap: 0.25rem;
  }
`;

export const Alert = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  background: ${colors.status.negativeHeavy};
  white-space: pre-line;
  > span {
    display: grid;
    flex: none;
    width: 1.5rem;
    height: 1.5rem;
    place-items: center;
    border-radius: 50%;
    background: ${colors.status.negativeStrong};
    font-weight: 700;
  }
`;

export const BasicFields = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(0, 0.65fr) minmax(0, 1fr);
  gap: 1rem;
  @media (max-width: 720px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Pair = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  @media (max-width: 600px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Field = styled.label`
  display: grid;
  align-content: start;
  gap: 0.5rem;
  min-width: 0;
  font-size: 0.875rem;
  font-weight: 700;
`;

export const FieldName = styled.span`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
`;

export const FieldLabel = FieldName.withComponent('label');

export const Input = styled.input`
  ${fieldStyle}
  min-height: clamp(3rem, 2.92vw, 56px);
  font-size: 1rem;
  font-weight: 400;
`;

export const Text = styled.textarea`
  ${fieldStyle}
  resize: vertical;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
`;

export const RankSelect = styled(Select)`
  background-color: ${colors.background.alternative};
  font-size: 1rem;
  font-weight: 400;
  &[aria-invalid='true'] {
    border-color: ${colors.status.negative};
  }
`;

export const Hint = styled.span`
  display: block;
  color: ${colors.label.alternative};
  font-size: 0.875rem;
  font-weight: 400;
`;

export const Error = styled.span`
  display: block;
  color: ${colors.status.negative};
  font-size: 0.875rem;
  font-weight: 500;
`;

export const CategoryPicker = styled.div`
  ${fieldStyle}
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  min-height: clamp(3rem, 2.92vw, 56px);
  padding: 0.375rem 0.75rem;
  + span {
    margin-top: 0.5rem;
  }
`;

export const Chip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.5rem;
  border-radius: 0.375rem;
  background: ${colors.fill.normal};
  font-size: 0.875rem;
  font-weight: 700;
`;

export const CategoryMenu = styled.details`
  flex: 1 0 auto;
  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    min-height: 2rem;
    list-style: none;
    cursor: pointer;
  }
  summary::-webkit-details-marker {
    display: none;
  }
  summary img {
    margin-left: auto;
  }
  > div {
    position: absolute;
    z-index: 1;
    inset: calc(100% + 0.375rem) 0 auto;
    display: grid;
    padding: 0.5rem;
    border: 1px solid ${colors.line.normal};
    border-radius: 0.875rem;
    background: ${colors.background.elevated};
  }
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    cursor: pointer;
  }
  input {
    accent-color: ${colors.primary.normal};
  }
`;

export const Examples = styled.div`
  display: grid;
  gap: clamp(0.875rem, 1.04vw, 20px);
  margin-top: clamp(0.5rem, 1.4vw, 28px);
  h3 {
    font-size: 1rem;
  }
`;

export const Example = styled.div`
  display: grid;
  gap: 0.875rem;
  padding: clamp(0.75rem, 1.04vw, 20px);
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const Remove = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: ${colors.label.alternative};
  font-size: 0.875rem;
  font-weight: 700;
`;

export const Add = styled.button`
  display: flex;
  min-height: 3.5rem;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1.5px dashed ${colors.line.strong};
  border-radius: 0.875rem;
  color: ${colors.label.neutral};
  font-weight: 700;
`;

export const Memory = styled.div`
  display: flex;
  gap: 0.5rem;
  + span {
    display: block;
    margin-top: 0.5rem;
  }
`;

export const Units = styled.div`
  display: flex;
  padding: 0.25rem;
  border-radius: 0.875rem;
  background: ${colors.fill.normal};
  button {
    padding-inline: clamp(0.5rem, 0.8vw, 1rem);
    border-radius: 0.625rem;
    color: ${colors.label.alternative};
    font-size: 0.875rem;
    font-weight: 700;
  }
  button[aria-pressed='true'] {
    color: ${colors.label.strong};
    background: ${colors.fill.raised};
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: clamp(0.375rem, 1vw, 20px);
`;

const action = css`
  padding: 0.875rem clamp(1rem, 1.46vw, 28px);
  border-radius: 0.875rem;
  font-weight: 700;
`;

export const Cancel = styled(Link)`
  ${action}
  border: 1.5px solid ${colors.line.normal};
  background: ${colors.fill.normal};
`;

export const Secondary = styled.button`
  ${action}
  border: 1.5px solid ${colors.line.normal};
  background: ${colors.fill.normal};
`;

export const Delete = styled.button`
  ${action}
  margin-right: auto;
  background: ${colors.status.negative};
  color: ${colors.static.black};
  box-shadow: 0 4px ${colors.status.negativeHeavy};
  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }
`;

export const Submit = styled.button`
  ${action}
  background: ${colors.primary.normal};
  box-shadow: 0 4px ${colors.primary.heavy};
  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }
`;
