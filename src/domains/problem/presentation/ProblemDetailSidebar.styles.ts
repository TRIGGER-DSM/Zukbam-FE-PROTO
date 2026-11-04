import { detailSize as size } from './problemDetailSize';
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
      padding: ${size(32)};
      display: flex;
      flex-direction: column;
      gap: ${size(24)};
      border-radius: ${size(20)};
      background: ${theme.colors.background.elevated};
    }
    @media (max-width: 1600px) {
      & {
        padding: ${size(28)};
      }
    }
    @media (max-width: 700px) {
      & {
        padding: ${size(24)};
        border-radius: ${size(16)};
        gap: ${size(20)};
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
      gap: ${size(10)};
      text-align: center;
    }
    & h2 {
      font-size: ${size(16)};
      font-weight: 700;
      line-height: ${size(24)};
      color: ${theme.colors.label.alternative};
    }
    & > img {
      width: ${size(96)};
      height: ${size(96)};
    }
    & > strong {
      font-size: ${size(24)};
      font-weight: 700;
      line-height: ${size(32)};
    }
    & > p {
      font-size: ${size(18)};
      line-height: ${size(30)};
      color: ${theme.colors.label.alternative};
    }
    @media (max-width: 1600px) {
      & > p {
        font-size: ${size(16)};
        line-height: ${size(26)};
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
      gap: ${size(6)};
    }
    & i {
      width: ${size(28)};
      height: ${size(8)};
      border-radius: ${size(4)};
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
      gap: ${size(6)};
      padding: ${size(6)} ${size(14)} ${size(6)} ${size(10)};
      border-radius: ${size(999)};
      background: ${theme.colors.fill.normal};
      font-size: ${size(16)};
      font-weight: 700;
      line-height: ${size(24)};
      color: ${theme.colors.status.cautionary};
    }
    & img {
      width: ${size(18)};
      height: ${size(18)};
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
      gap: ${size(12)};
      padding-top: ${size(24)};
      border-top: 1px solid ${theme.colors.line.alternative};
      margin: 0;
    }
    & > div {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: ${size(16)};
    }
    & dt {
      font-size: ${size(18)};
      line-height: ${size(30)};
      color: ${theme.colors.label.alternative};
    }
    & dd {
      margin: 0;
      font-size: ${size(18)};
      font-weight: 700;
      line-height: ${size(26)};
      text-align: right;
      color: ${colors.label.normal};
    }
    @media (max-width: 700px) {
      & dt {
        font-size: ${size(16)};
      }
    }
    @media (max-width: 700px) {
      & dd {
        font-size: ${size(16)};
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
      padding: ${size(14)} ${size(28)};
      border-radius: ${size(14)};
      background: ${theme.colors.primary.normal};
      color: ${colors.static.white};
      font-size: ${size(18)};
      font-weight: 700;
      line-height: ${size(26)};
      box-shadow: 0 ${size(4)} ${colors.primary.heavy};
    }
    &:active {
      transform: translateY(2px);
      box-shadow: 0 2px ${colors.primary.heavy};
    }
    @media (max-width: 700px) {
      & {
        font-size: ${size(16)};
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
      gap: ${size(12)};
      padding: ${size(16)} ${size(20)};
      background: ${colors.fill.strong};
      border-radius: ${size(20)};
    }
    & > div {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    & > img {
      width: ${size(20)};
      height: ${size(20)};
    }
    & strong {
      color: ${theme.colors.label.neutral};
      font-size: ${size(16)};
      font-weight: 700;
      line-height: ${size(24)};
    }
    & p {
      color: ${theme.colors.label.alternative};
      font-size: ${size(18)};
      line-height: ${size(30)};
    }
    @media (max-width: 1600px) {
      & p {
        font-size: ${size(16)};
        line-height: ${size(26)};
      }
    }
    @media (max-width: 700px) {
      & {
        padding: ${size(14)};
        border-radius: ${size(14)};
      }
    }
    @media (max-width: 700px) {
      & p {
        font-size: ${size(14)};
      }
    }
    @media (max-width: 700px) {
      & strong {
        font-size: ${size(14)};
      }
    }
  `,
);
