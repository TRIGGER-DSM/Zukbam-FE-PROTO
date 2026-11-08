import { colors, alpha } from '../../../shared/styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface RangeStyleProps {
  $low: string;
  $high: string;
}

export const Field = styled('div', {
  label: 'Field',
  target: 'e-9-0',
})`
  & {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const Range = styled('div', {
  label: 'Range',
  target: 'e-9-1',
})<RangeStyleProps>(
  ({ theme, $low, $high }) => css`
    --low: ${$low};
    --high: ${$high};
    & {
      position: relative;
      height: 2.75rem;
      margin: 0;
      padding: 0 0.3125rem;
    }
    & input[type='range'] {
      position: absolute;
      left: 0.3125rem;
      top: 0;
      width: calc(100% - 0.625rem);
      height: 1.125rem;
      padding: 0;
      margin: 0;
      background: transparent;
      appearance: none;
      pointer-events: none;
    }
    & input[type='range']::-webkit-slider-runnable-track {
      height: 0.375rem;
      background: transparent;
    }
    & input[type='range']::-webkit-slider-thumb {
      appearance: none;
      width: 1.125rem;
      height: 1.125rem;
      border-radius: 50%;
      background: ${colors.static.white};
      border: 0.1875rem solid ${theme.colors.primary.strong};
      box-shadow: 0 2px 0.25rem ${alpha(colors.static.black, 0.4)};
      margin-top: -0.375rem;
      cursor: pointer;
      pointer-events: auto;
    }
    & input[type='range']::-moz-range-track {
      height: 0.375rem;
      background: transparent;
    }
    & input[type='range']::-moz-range-thumb {
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 50%;
      background: ${colors.static.white};
      border: 0.1875rem solid ${theme.colors.primary.strong};
      cursor: pointer;
      pointer-events: auto;
    }
  `,
);

export const Inputs = styled('div', {
  label: 'Inputs',
  target: 'e-9-2',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    & input {
      padding: 0.6875rem 0.875rem;
      width: 0;
      flex: 1;
      background: ${colors.background.alternative};
      border: 1px solid ${colors.line.normal};
      border-radius: 0.75rem;
    }
    & input::-webkit-inner-spin-button {
      appearance: none;
    }
    & > span {
      color: ${theme.colors.label.alternative};
      font-size: 0.875rem;
      font-weight: 700;
    }
    & > button {
      padding: 0.6875rem;
      background: ${theme.colors.fill.normal};
      border-radius: 0.75rem;
    }
  `,
);
