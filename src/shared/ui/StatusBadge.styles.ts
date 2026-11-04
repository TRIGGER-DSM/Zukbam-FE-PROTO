import { colors } from '../styles/colors';
import styled from '@emotion/styled';
import type { Relationship } from './StatusBadge';

interface RootStyleProps {
  $status: Relationship;
}

export const Root = styled.span<RootStyleProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.875rem 1.25rem 0.875rem 1.125rem;
  min-height: 3.25rem;
  border-radius: 0.875rem;
  background: ${colors.fill.normal};
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 700;
  color: ${({ $status }) => ({ accepted: colors.primary.heavy, rejected: colors.label.assistive, sent: colors.label.alternative, friend: colors.label.neutral })[$status]};
  img {
    width: 1.25rem;
    height: 1.25rem;
  }
`;
