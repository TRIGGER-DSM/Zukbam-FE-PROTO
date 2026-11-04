import { colors, alpha } from '../styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Dialog = styled('dialog', {
  label: 'Dialog',
  target: 'e-q-0',
})(
  ({ theme }) => css`
    & {
      width: 30rem;
      max-width: calc(100% - 2rem);
      max-height: calc(100dvh - 2rem);
      padding: 2.25rem 2.5rem 2rem;
      margin: auto;
      border: 1px solid ${colors.line.normal};
      border-radius: 1.75rem;
      color: ${colors.static.white};
      background: ${theme.colors.background.elevated};
      box-shadow: 0 1.5rem 4rem ${alpha(colors.static.black, 0.533333)};
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: ${theme.colors.label.assistive} transparent;
    }
    &::backdrop {
      background: ${colors.static.black};
    }
    &:focus {
      outline: none;
    }
    @media (max-width: 700px) {
      & {
        padding: 1.5rem 1.25rem;
        border-radius: 1.25rem;
      }
    }
    @media (min-width: 701px) {
      & {
        width: 28rem;
        padding: 1.75rem 2rem 1.5rem;
      }
    }
  `,
);
