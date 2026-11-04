import { colors } from '../../../shared/styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Asset } from '../../../shared/ui/Asset';
import * as PrimitivesStyles from '../../../shared/ui/primitives.styles';

interface TierStyleProps {
  $current?: boolean;
  $locked?: boolean;
}

export const Card = styled('section', {
  label: 'Card',
  target: 'e-d-0',
})(
  ({ theme }) => css`
    & {
      background: ${theme.colors.background.elevated};
      border: 1px solid ${theme.colors.line.alternative};
      border-radius: 1.25rem;
      min-width: 0;
    }
    & {
      padding: 1.625rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 2.5rem;
      min-height: 18.125rem;
    }
    & h2 {
      color: ${theme.colors.label.neutral};
    }
    @media (max-width: 1700px) {
      & {
        gap: 1.5rem;
      }
    }
    @media (max-width: 1250px) {
      & {
        flex-wrap: wrap;
      }
    }
    @media (max-width: 700px) {
      & {
        border-radius: 1rem;
      }
    }
    @media (max-width: 700px) {
      & {
        padding: 1.25rem 1rem;
        gap: 1.25rem 0.875rem;
      }
    }
    @media (min-width: 701px) {
      & {
        padding: 1.25rem;
        min-height: 16rem;
        gap: 1.5rem;
      }
    }
  `,
);

export const Medal = styled(Asset, {
  label: 'Medal',
  target: 'e-d-1',
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})(
  () => css`
    & {
      width: 10.5rem;
      height: 12.25rem;
    }
    @media (max-width: 1700px) {
      & {
        width: 8.125rem;
        height: auto;
      }
    }
    @media (max-width: 700px) {
      & {
        width: 5.5rem;
      }
    }
    @media (min-width: 701px) {
      & {
        width: 104px;
        height: auto;
      }
    }
  `,
);

export const Progress = styled('div', {
  label: 'Progress',
  target: 'e-d-2',
})(
  () => css`
    & {
      flex: 1;
      min-width: 0;
      align-self: stretch;
    }
    & h3 {
      font-size: 2rem;
      font-weight: 900;
      line-height: 2.625rem;
      letter-spacing: -0.8px;
      margin-top: 0.75rem;
    }
    & > p {
      margin-top: 0.75rem;
    }
    @media (max-width: 1250px) {
      & {
        flex-basis: calc(100% - 12.125rem);
      }
    }
    @media (max-width: 700px) {
      & {
        flex-basis: calc(100% - 6.5rem);
      }
    }
    @media (max-width: 700px) {
      & h3 {
        font-size: 1.5625rem;
        line-height: 2.125rem;
        margin-top: 0.375rem;
      }
    }
    @media (max-width: 700px) {
      & > p {
        font-size: 0.75rem;
        line-height: 1.25rem;
        margin-top: 0.375rem;
      }
    }
    @media (min-width: 701px) {
      & h3 {
        font-size: 26px;
        line-height: 36px;
      }
    }
  `,
);

export const Bamboo = styled(Asset, {
  label: 'Bamboo',
  target: 'e-d-3',
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})(
  () => css`
    & {
      width: 100%;
      height: 4.375rem;
      object-fit: fill;
      margin-top: 0.25rem;
    }
    @media (max-width: 700px) {
      & {
        height: 1.875rem;
        margin-top: 0.625rem;
      }
    }
  `,
);

export const XpLabels = styled('div', {
  label: 'XpLabels',
  target: 'e-d-4',
})(
  ({ theme }) => css`
    & {
      display: flex;
      justify-content: space-between;
      margin-top: 0.5rem;
      color: ${theme.colors.label.neutral};
      font-size: 1rem;
      line-height: 1.625rem;
    }
    & > span {
      color: ${theme.colors.label.assistive};
    }
    @media (max-width: 700px) {
      & {
        font-size: 0.75rem;
        line-height: 1.25rem;
      }
    }
  `,
);

export const Ladder = styled('div', {
  label: 'Ladder',
  target: 'e-d-5',
})(
  () => css`
    & {
      width: 45.125rem;
      align-self: stretch;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    & > p {
      margin-top: auto;
    }
    @media (max-width: 1700px) {
      & {
        width: 38.125rem;
      }
    }
    @media (max-width: 1250px) {
      & {
        width: 100%;
      }
    }
    @media (max-width: 1250px) {
      & > p {
        margin-top: 0;
      }
    }
    @media (max-width: 700px) {
      & {
        overflow: hidden;
      }
    }
    @media (max-width: 700px) {
      & > :is(${PrimitivesStyles.Muted}, ${PrimitivesStyles.MutedInline}) {
        font-size: 0.75rem;
      }
    }
  `,
);

export const Tiers = styled('ol', {
  label: 'Tiers',
  target: 'e-d-6',
})(
  ({ theme }) => css`
    & {
      display: flex;
      gap: 0.375rem;
    }
    & li {
      width: 6.125rem;
      padding: 0.875rem 0.375rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.625rem;
      border: 2px solid transparent;
      border-radius: 0.875rem;
      color: ${theme.colors.label.alternative};
    }
    & img {
      width: 4.625rem;
      height: 5.375rem;
    }
    @media (max-width: 1700px) {
      & li {
        width: 5.125rem;
      }
    }
    @media (max-width: 1250px) {
      & {
        justify-content: space-between;
      }
    }
    @media (max-width: 1250px) {
      & li {
        flex: 1;
      }
    }
    @media (max-width: 700px) {
      & {
        overflow-x: auto;
        justify-content: flex-start;
        padding-bottom: 0.375rem;
      }
    }
    @media (max-width: 700px) {
      & li {
        min-width: 4.625rem;
        flex: 0 0 4.625rem;
        padding: 0.625rem 2px;
        font-size: 0.75rem;
      }
    }
    @media (max-width: 700px) {
      & img {
        width: 3.75rem;
        height: auto;
      }
    }
  `,
);

export const Tier = styled('li', {
  label: 'Tier',
  target: 'e-d-7',
})<TierStyleProps>(
  ({ theme, $current, $locked }) => css`
    ${
      $current === true &&
      css`
        ${Tiers} & {
          border-color: ${theme.colors.label.assistive};
          background: ${colors.fill.strong};
          color: ${colors.static.white};
        }
      `
    }
    ${
      $locked === true &&
      css`
        ${Tiers} & strong {
          opacity: 0.6;
        }
      `
    }
  `,
);
