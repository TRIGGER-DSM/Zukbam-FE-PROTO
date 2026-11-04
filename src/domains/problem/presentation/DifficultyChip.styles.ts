import { colors } from '../../../shared/styles/colors';
import styled from '@emotion/styled';

export const Root = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem 0.25rem 0.375rem;
  border-radius: 999px;
  background: ${colors.fill.normal};
  color: ${colors.accent.waterLight};
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1rem;
  white-space: nowrap;
  img {
    width: 1.375rem;
    height: 1.375rem;
  }
`;
