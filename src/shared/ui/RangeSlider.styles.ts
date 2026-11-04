import { colors } from '../styles/colors';
import styled from '@emotion/styled';

interface RootStyleProps {
  $low: number;
  $high: number;
}

interface InputStyleProps {
  $front?: boolean;
}

export const Root = styled.div<RootStyleProps>`
  --low: ${({ $low }) => $low}%;
  --high: ${({ $high }) => $high}%;
  position: relative;
  height: 1rem;
  width: 100%;
`;

export const Track = styled.div`
  position: absolute;
  inset: calc(50% - 2px) 0.5rem auto;
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(
    to right,
    ${colors.line.normal} var(--low),
    ${colors.primary.normal} var(--low),
    ${colors.primary.normal} var(--high),
    ${colors.line.normal} var(--high)
  );
`;

export const Input = styled.input<InputStyleProps>`
  position: absolute;
  inset: 0;
  appearance: none;
  width: 100%;
  height: 1rem;
  margin: 0;
  background: transparent;
  pointer-events: none;
  z-index: ${({ $front }) => ($front ? 3 : 2)};
  &::-webkit-slider-thumb {
    appearance: none;
    width: 1rem;
    height: 1rem;
    border: 3px solid ${colors.primary.normal};
    border-radius: 50%;
    background: ${colors.static.white};
    pointer-events: auto;
    cursor: grab;
  }
  &::-moz-range-thumb {
    width: 0.625rem;
    height: 0.625rem;
    border: 3px solid ${colors.primary.normal};
    border-radius: 50%;
    background: ${colors.static.white};
    pointer-events: auto;
    cursor: grab;
  }
  &:focus-visible {
    outline: none;
  }
  &:focus-visible::-webkit-slider-thumb {
    outline: 3px solid ${colors.static.white};
    outline-offset: 3px;
  }
  &:focus-visible::-moz-range-thumb {
    outline: 3px solid ${colors.static.white};
    outline-offset: 3px;
  }
`;
