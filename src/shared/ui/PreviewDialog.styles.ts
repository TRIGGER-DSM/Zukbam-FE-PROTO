import { colors, alpha } from '../styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import * as PrimitivesStyles from './primitives.styles';

export const Dialog = styled('dialog', {
  label: 'Dialog',
  target: 'e-r-0',
})(
  ({ theme }) => css`
    & {
      color: ${colors.static.white};
      background: ${theme.colors.background.elevated};
      border: 1px solid ${colors.fill.heavy};
      border-radius: 1.25rem;
      padding: 1.75rem;
      width: min(40rem, calc(100% - 2rem));
      max-height: 85vh;
    }
    &::backdrop {
      background: ${alpha(colors.static.black, 0.6)};
      backdrop-filter: blur(0.25rem);
    }
    & > :is(${PrimitivesStyles.Muted}, ${PrimitivesStyles.MutedInline}) {
      margin-top: 0.75rem;
    }
    @media (max-width: 700px) {
      & {
        padding: 1.375rem;
      }
      & h2 {
        font-size: 1.1875rem;
      }
    }
  `,
);
