import styled from '@emotion/styled';
import { colors } from '../../shared/styles/colors';

export const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.0071em;
`;

export const Remember = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: ${colors.label.neutral};
  cursor: pointer;
`;

export const Checkbox = styled.input`
  appearance: none;
  width: 22px;
  height: 22px;
  margin: 0;
  border: 1px solid ${colors.line.normal};
  border-radius: 7px;
  background: ${colors.background.alternative};
  cursor: pointer;

  &:checked {
    border-color: ${colors.primary.normal};
    background: ${colors.primary.normal} url('/images/login/check.svg') center no-repeat;
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.strong};
    outline-offset: 3px;
  }
`;

export const TextButton = styled.button`
  color: ${colors.label.alternative};
`;
