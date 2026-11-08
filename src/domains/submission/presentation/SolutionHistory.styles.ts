import styled from '@emotion/styled';
import { alpha, colors } from '../../../shared/styles/colors';
import type { Solution } from '../infrastructure/solutionApi';

interface StatusProps {
  $status: Solution['status'];
}

export const Status = styled.span<StatusProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-inline: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  background: ${alpha(colors.label.normal, 0.06)};
  color: ${({ $status }) => ($status === 'PENDING' ? colors.accent.waterLight : $status === 'ACCEPTED' ? colors.primary.strong : colors.status.negative)};
  font-weight: 700;
`;
