import { colors } from '../styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import type { ButtonState, ButtonVariant } from './Button';

interface RootStyleProps {
  $variant: ButtonVariant;
  $state: ButtonState;
}

const palettes = {
  primary: {
    base: colors.primary.normal,
    hover: colors.primary.strong,
    active: colors.primary.heavy,
    text: colors.label.onPrimary,
    border: 'transparent',
    edge: colors.static.black,
    pressed: colors.primary.subtle,
    focus: colors.primary.strong,
    disabled: colors.primary.heavy,
  },
  secondary: {
    base: colors.fill.normal,
    hover: colors.fill.strong,
    active: colors.fill.heavy,
    text: colors.label.normal,
    border: colors.line.normal,
    edge: 'transparent',
    pressed: 'transparent',
    focus: colors.label.assistive,
    disabled: colors.fill.normal,
  },
  danger: {
    base: colors.status.negative,
    hover: colors.status.negativeStrong,
    active: colors.status.negativeHeavy,
    text: colors.static.black,
    border: 'transparent',
    edge: colors.status.negativeHeavy,
    pressed: colors.status.negativeSubtle,
    focus: colors.status.negativeHeavy,
    disabled: colors.fill.normal,
  },
};

export const Root = styled.button<RootStyleProps>(({ $variant, $state }) => {
  const p = palettes[$variant];
  const hover = css`
    background: ${p.hover};
    border-color: ${$variant === 'secondary' ? p.focus : p.border};
  `;
  const active = css`
    background: ${p.active};
    box-shadow: 0 1px 0 ${p.pressed};
    border-color: ${$variant === 'secondary' ? p.focus : p.border};
  `;
  const focus = css`
    outline: 3px solid ${p.focus};
    outline-offset: -3px;
  `;
  return css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: calc(0.875rem - 1.5px) calc(1.75rem - 1.5px);
    min-height: 3.25rem;
    border: 1.5px solid ${p.border};
    border-radius: 0.875rem;
    background: ${p.base};
    color: ${p.text};
    box-shadow: 0 4px 0 ${p.edge};
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.5;
    white-space: nowrap;
    cursor: pointer;
    transition:
      background 0.15s,
      box-shadow 0.15s;
    &:hover {
      filter: none;
    }
    ${
      $state === 'default' &&
      css`
        &:hover:not(:disabled) {
          ${hover}
        }
        &:active:not(:disabled) {
          ${active}
        }
      `
    }
    &:focus-visible {
      ${focus}
    }
    ${$state === 'hover' && hover}
    ${$state === 'active' && active}
    ${$state === 'focus' && focus}
    &:disabled {
      cursor: not-allowed;
      color: ${colors.label.assistive};
      background: ${p.disabled};
      box-shadow: none;
      border-color: ${$variant === 'secondary' ? colors.line.alternative : 'transparent'};
    }
    & > img {
      width: 1.25rem;
      height: 1.25rem;
    }
  `;
});
