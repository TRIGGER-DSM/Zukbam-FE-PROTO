import { colors, alpha } from '../../../shared/styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface ProgressStyleProps {
  $complete?: boolean;
  $progress: string;
}

export const Card = styled('section', {
  label: 'Card',
  target: 'e-a-0',
})(
  ({ theme }) => css`
    & {
      background: ${theme.colors.background.elevated};
      border: 1px solid ${theme.colors.line.alternative};
      border-radius: 1.25rem;
      min-width: 0;
    }
    & {
      padding: 1.25rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.875rem;
    }
    @media (max-width: 1250px) {
      & {
        min-height: 12.875rem;
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
        gap: 0.75rem;
      }
    }
    @media (min-width: 701px) {
      & {
        padding: 1rem 1.25rem;
        min-height: 11rem;
      }
    }
  `,
);

export const Timer = styled('span', {
  label: 'Timer',
  target: 'e-a-1',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      color: ${theme.colors.status.cautionary};
      font-weight: 700;
      white-space: nowrap;
    }
    @media (max-width: 700px) {
      & {
        font-size: 0.75rem;
      }
    }
  `,
);

export const s = styled('ul', {
  label: 's',
  target: 'e-a-2',
})(
  () => css`
    & {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      padding: 0.75rem 0 0.25rem;
    }
    & li {
      display: flex;
      align-items: center;
      gap: 0.625rem;
    }
    & li > img:first-of-type {
      width: 1.875rem;
      height: 1.875rem;
    }
    & li > img:last-child {
      width: 2.125rem;
      height: 2.125rem;
      opacity: 0.9;
    }
    @media (max-width: 1250px) {
      & {
        gap: 0.5rem;
      }
    }
    @media (max-width: 700px) {
      & {
        gap: 0.875rem;
      }
    }
    @media (max-width: 700px) {
      & li {
        gap: 0.375rem;
        flex-wrap: wrap;
      }
    }
    @media (max-width: 700px) {
      & li > img:last-child {
        width: 1.75rem;
        height: 1.75rem;
      }
    }
  `,
);

export const Name = styled('span', {
  label: 'Name',
  target: 'e-a-3',
})(
  () => css`
    & {
      width: 12.25rem;
      flex-shrink: 0;
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.5rem;
    }
    @media (max-width: 1700px) {
      & {
        width: 10.625rem;
        font-size: 0.875rem;
      }
    }
    @media (max-width: 1250px) {
      & {
        width: 12.25rem;
        font-size: 1rem;
      }
    }
    @media (max-width: 700px) {
      & {
        width: calc(100% - 2.5rem);
        font-size: 0.875rem;
      }
    }
  `,
);

export const Progress = styled('div', {
  label: 'Progress',
  target: 'e-a-4',
})<ProgressStyleProps>(
  ({ $complete, $progress }) => css`
    --progress: ${$progress};
    & {
      flex: 1;
      height: 1.6875rem;
      position: relative;
      background: ${colors.progress.track};
      border-radius: 0.5rem;
      box-shadow: inset 0 -0.3125rem ${colors.progress.trackDepth};
      overflow: hidden;
      min-width: 2.5rem;
    }
    &::after {
      content: '';
      position: absolute;
      left: 0.3125rem;
      right: 0.3125rem;
      height: 0.25rem;
      top: 2px;
      border-radius: 0.25rem;
      background: ${alpha(colors.static.black, 0.219608)};
    }
    ${
      $complete === true &&
      css`
        & ${Fill} {
          background-color: ${colors.progress.complete};
          box-shadow: inset 0 -0.3125rem ${colors.progress.completeDepth};
        }
      `
    }
    ${
      $complete === true &&
      css`
        & ${Fill}::after {
          background: ${colors.progress.completeLight};
        }
      `
    }
  & > span {
      position: absolute;
      z-index: 1;
      right: 0.75rem;
      top: 0.1875rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 700;
      color: ${alpha(colors.static.white, 0.8)};
    }
    @media (max-width: 700px) {
      & {
        margin-left: 2.25rem;
      }
    }
  `,
);

export const Fill = styled('div', {
  label: 'Fill',
  target: 'e-a-5',
})(
  () => css`
    & {
      width: var(--progress);
      height: 100%;
      border-radius: 0.5rem;
      background:
        repeating-linear-gradient(
          115deg,
          transparent 0 0.8125rem,
          ${alpha(colors.static.white, 0.278431)} 0.8125rem 1.0625rem,
          transparent 1.0625rem 1.3125rem,
          ${alpha(colors.static.white, 0.160784)} 1.3125rem 1.5rem,
          transparent 1.5rem 2.0625rem
        ),
        ${colors.progress.active};
      box-shadow: inset 0 -0.3125rem ${colors.progress.activeDepth};
      position: relative;
    }
    &::after {
      content: '';
      position: absolute;
      top: 0.1875rem;
      left: 0.3125rem;
      right: 0.3125rem;
      height: 0.3125rem;
      border-radius: 0.25rem;
      background: ${colors.progress.activeLight};
    }
  `,
);
