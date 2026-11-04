import { colors } from '../styles/colors';
import styled from '@emotion/styled';

interface FillStyleProps extends Size {
  $value: number;
  $complete: boolean;
}

interface Size {
  $size: 'large' | 'small';
}

export const Root = styled.div<Size>`
  position: relative;
  width: 100%;
  height: ${({ $size }) => ($size === 'large' ? '2.3125rem' : '1.6875rem')};
`;

export const Track = styled.div<Size>`
  position: absolute;
  inset: 0 0 0.3125rem;
  border-radius: 999px;
  background: ${colors.progress.track};
  box-shadow: 0 0.3125rem 0 ${colors.progress.trackDepth};
  &::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 2%;
    right: 2%;
    height: 4px;
    border-radius: 999px;
    background: ${colors.progress.trackDepth};
  }
`;

export const Fill = styled.div<FillStyleProps>`
  position: absolute;
  inset: 0 auto 0.3125rem 0;
  width: ${({ $value }) => $value}%;
  border-radius: 999px;
  background: ${({ $complete }) => ($complete ? colors.progress.complete : colors.progress.active)};
  box-shadow: 0 0.3125rem 0
    ${({ $complete }) => ($complete ? colors.progress.completeDepth : colors.progress.activeDepth)};
  &::before {
    content: '';
    position: absolute;
    top: ${({ $size }) => ($size === 'large' ? '16%' : '15%')};
    left: 0.5rem;
    right: 0.5rem;
    height: 14%;
    border-radius: 999px;
    background: ${({ $complete }) => ($complete ? colors.progress.completeLight : colors.progress.activeLight)};
  }
  transition: width 0.2s ease;
`;

export const Label = styled.span<Size>`
  position: absolute;
  inset: 0 0 0.3125rem;
  display: grid;
  place-items: center;
  color: ${colors.static.white};
  font-weight: 700;
  font-size: ${({ $size }) => ($size === 'large' ? '1rem' : '.875rem')};
  line-height: 1.5;
  text-shadow: 0 1px 2px ${colors.static.black};
`;
