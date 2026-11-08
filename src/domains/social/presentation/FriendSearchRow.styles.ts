import styled from '@emotion/styled';
import { Button } from '../../../shared/ui/Button';
import { colors } from '../../../shared/styles/colors';

export const Request = styled(Button)`
  min-height: 3.375rem;
  padding: 0.875rem 1.75rem;
  border-radius: 0.875rem;
  color: ${colors.static.white};
  box-shadow: 0 0.25rem ${colors.primary.heavy};
  font-size: 1rem;
  line-height: 1.5rem;
  flex-shrink: 0;
  @media (max-width: 600px) {
    min-height: 40px;
    padding: 8px 12px;
    font-size: 13px;
  }
`;

export const Sent = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  gap: 0.375rem;
  padding: 0.875rem 1.25rem 0.875rem 1.125rem;
  border-radius: 0.875rem;
  background: ${colors.fill.normal};
  color: ${colors.label.alternative};
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;
  img {
    width: 1.25rem;
    height: 1.25rem;
  }
  @media (max-width: 600px) {
    padding: 10px;
    font-size: 12px;
  }
`;
