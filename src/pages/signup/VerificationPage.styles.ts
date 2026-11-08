import styled from '@emotion/styled';
import { Link } from 'react-router';
import { colors } from '../../shared/styles/colors';
import * as Auth from '../../shared/ui/auth/Auth.styles';

export const Panel = styled(Auth.Panel)`
  position: relative;
  align-self: stretch;
  align-content: center;
  padding-block: 80px;

  @media (max-width: 760px) {
    gap: 32px;
    padding-block: 32px 0;
  }
`;

export const Back = styled(Link)`
  display: inline-flex;
  justify-self: start;
  align-items: center;
  gap: 4px;
  color: ${colors.label.alternative};
  font-size: 14px;
  line-height: 22px;
`;

export const Intro = styled.p`
  overflow-wrap: anywhere;

  & strong {
    color: ${colors.label.strong};
  }
`;

export const Code = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: clamp(0.375rem, 2.5%, 0.625rem);

  &:focus-within > [data-active='true'] {
    border-color: ${colors.primary.normal};
    box-shadow: inset 0 0 0 1px ${colors.primary.normal};
  }

  &:focus-within > [data-active='true']:empty::after {
    content: '';
    width: 2px;
    height: 30px;
    border-radius: 1px;
    background: ${colors.primary.normal};
  }
`;

export const CodeInput = styled.input`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
`;

export const Digit = styled.span`
  display: grid;
  place-items: center;
  min-height: 3.25rem;
  aspect-ratio: 9 / 10;
  border: 1px solid ${colors.line.normal};
  border-radius: 14px;
  background: ${colors.background.alternative};
  color: ${colors.label.strong};
  font-size: clamp(24px, 4.5vw, 32px);
  font-weight: 900;
  line-height: 1;
  cursor: text;

  &:not(:empty) {
    border-color: ${colors.line.strong};
  }
`;

export const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 6px 12px;
  padding-top: 4px;
`;

export const Timer = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${colors.accent.streakStrong};
  font-variant-numeric: tabular-nums;
`;

export const Resend = styled.button`
  color: ${colors.label.strong};
`;

export const Submit = styled(Auth.Submit)`
  &&:disabled {
    color: ${colors.label.neutral};
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 18px;
  border-radius: 14px;
  background: ${colors.fill.normal};
  color: ${colors.label.alternative};
  font-size: 14px;
  line-height: 22px;
`;

export const Legal = styled.nav`
  position: absolute;
  inset: auto 0 38px;
  display: flex;
  justify-content: center;
  gap: 8px;
  color: ${colors.label.assistive};
  font-size: 14px;
  line-height: 22px;

  @media (max-width: 760px) {
    position: static;
  }
`;
