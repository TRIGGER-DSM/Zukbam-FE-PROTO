import styled from '@emotion/styled';
import { alpha, colors } from '../../../shared/styles/colors';

interface PanelProps {
  $failed: boolean;
}

export const Panel = styled.div<PanelProps>`
  flex-shrink: 0;
  padding: 0.875rem 1rem;
  border-top: 1px solid
    ${({ $failed }) => alpha($failed ? colors.status.negative : colors.primary.normal, 0.3)};
  background: ${({ $failed }) => alpha($failed ? colors.status.negative : colors.primary.normal, 0.06)};
  color: ${({ $failed }) => ($failed ? colors.status.negative : colors.primary.strong)};
`;

export const Summary = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  strong {
    font-size: 0.9375rem;
  }
  p {
    margin-top: 0.25rem;
    font-size: 0.75rem;
    line-height: 1.5;
    color: ${colors.label.neutral};
    white-space: pre-wrap;
  }
  button {
    margin-left: auto;
    flex-shrink: 0;
    padding: 0.5rem;
    border: 1px solid currentColor;
    border-radius: 0.5rem;
    font-size: 0.75rem;
  }
`;

export const Icon = styled.span`
  display: grid;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${alpha(colors.label.normal, 0.06)};
  font-weight: 700;
`;

export const Steps = styled.ol`
  display: flex;
  gap: 1.25rem;
  margin-top: 0.75rem;
  li {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    color: ${colors.label.alternative};
    font-size: 0.75rem;
  }
  li[aria-current='step'],
  li[data-complete='true'] {
    color: inherit;
  }
  li[aria-current='step'] {
    font-weight: 700;
  }
`;
