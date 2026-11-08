import { colors } from '../../../shared/styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface LevelStyleProps {
  $filled?: boolean;
}

export const Panel = styled('aside', {
  label: 'Panel',
  target: 'e-4-0',
})(
  ({ theme }) => css`
    & {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      border-radius: 1.25rem;
      background: ${theme.colors.background.elevated};
    }
    @media (max-width: 1600px) {
      & {
        padding: 1.75rem;
      }
    }
    @media (max-width: 700px) {
      & {
        padding: 1.5rem;
        border-radius: 1rem;
        gap: 1.25rem;
      }
    }
  `,
);

export const Difficulty = styled('div', {
  label: 'Difficulty',
  target: 'e-4-1',
})(
  ({ theme }) => css`
    & {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.625rem;
      text-align: center;
    }
    & h2 {
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.5rem;
      color: ${theme.colors.label.alternative};
    }
    & > img {
      width: 6rem;
      height: 6rem;
    }
    & > strong {
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 2rem;
    }
    & > p {
      font-size: 1.125rem;
      line-height: 1.875rem;
      color: ${theme.colors.label.alternative};
    }
    @media (max-width: 1600px) {
      & > p {
        font-size: 1rem;
        line-height: 1.625rem;
      }
    }
  `,
);

export const Levels = styled('div', {
  label: 'Levels',
  target: 'e-4-2',
})(
  ({ theme }) => css`
    & {
      display: flex;
      gap: 0.375rem;
    }
    & i {
      width: 1.75rem;
      height: 0.5rem;
      border-radius: 0.25rem;
      background: ${theme.colors.fill.normal};
    }
  `,
);

export const Level = styled('i', {
  label: 'Level',
  target: 'e-4-3',
})<LevelStyleProps>(
  ({ $filled }) => css`
    ${
      $filled === true &&
      css`
        ${Levels} & {
          background: ${colors.accent.water};
        }
      `
    }
  `,
);

export const Xp = styled('span', {
  label: 'Xp',
  target: 'e-4-4',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.375rem 0.875rem 0.375rem 0.625rem;
      border-radius: 62.4375rem;
      background: ${theme.colors.fill.normal};
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.5rem;
      color: ${theme.colors.status.cautionary};
    }
    & img {
      width: 1.125rem;
      height: 1.125rem;
      object-fit: contain;
    }
  `,
);

export const Limits = styled('dl', {
  label: 'Limits',
  target: 'e-4-5',
})(
  ({ theme }) => css`
    & {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding-top: 1.5rem;
      border-top: 1px solid ${theme.colors.line.alternative};
      margin: 0;
    }
    & > div {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 1rem;
    }
    & dt {
      font-size: 1.125rem;
      line-height: 1.875rem;
      color: ${theme.colors.label.alternative};
    }
    & dd {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 700;
      line-height: 1.625rem;
      text-align: right;
      color: ${colors.label.normal};
    }
    @media (max-width: 700px) {
      & dt {
        font-size: 1rem;
      }
      & dd {
        font-size: 1rem;
      }
    }
  `,
);

export const Write = styled('button', {
  label: 'Write',
  target: 'e-4-6',
})(
  ({ theme }) => css`
    & {
      padding: 0.875rem 1.75rem;
      border-radius: 0.875rem;
      background: ${theme.colors.primary.normal};
      color: ${colors.static.white};
      font-size: 1.125rem;
      font-weight: 700;
      line-height: 1.625rem;
      box-shadow: 0 0.25rem ${colors.primary.heavy};
    }
    &:active {
      transform: translateY(2px);
      box-shadow: 0 2px ${colors.primary.heavy};
    }
    @media (max-width: 700px) {
      & {
        font-size: 1rem;
      }
    }
  `,
);

export const Locked = styled('div', {
  label: 'Locked',
  target: 'e-4-7',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      background: ${colors.fill.strong};
      border-radius: 1.25rem;
    }
    & > div {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    & > img {
      width: 1.25rem;
      height: 1.25rem;
    }
    & strong {
      color: ${theme.colors.label.neutral};
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.5rem;
    }
    & p {
      color: ${theme.colors.label.alternative};
      font-size: 1.125rem;
      line-height: 1.875rem;
    }
    @media (max-width: 1600px) {
      & p {
        font-size: 1rem;
        line-height: 1.625rem;
      }
    }
    @media (max-width: 700px) {
      & {
        padding: 0.875rem;
        border-radius: 0.875rem;
      }
      & p {
        font-size: 0.875rem;
      }
      & strong {
        font-size: 0.875rem;
      }
    }
  `,
);
