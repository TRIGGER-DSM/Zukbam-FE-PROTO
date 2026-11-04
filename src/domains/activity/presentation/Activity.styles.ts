import { colors } from '../../../shared/styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Asset } from '../../../shared/ui/Asset';
import * as PrimitivesStyles from '../../../shared/ui/primitives.styles';

interface WeekdayStyleProps {
  $today?: boolean;
}

interface DayCheckStyleProps {
  $complete?: boolean;
  $today?: boolean;
}

interface HeatLevelStyleProps {
  $level?: number;
}

export const StreakCard = styled('section', {
  label: 'StreakCard',
  target: 'e-0-0',
})(
  ({ theme }) => css`
    & {
      background: ${theme.colors.background.elevated};
      border: 1px solid ${theme.colors.line.alternative};
      border-radius: 1.25rem;
      min-width: 0;
    }
    & {
      display: flex;
      align-items: center;
      gap: 2rem;
      padding: 1.25rem 1.5rem;
      min-height: 12.875rem;
    }
    @media (max-width: 1700px) {
      & {
        gap: 1rem;
      }
    }
    @media (max-width: 1250px) {
      & {
        gap: 2rem;
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
        flex-wrap: wrap;
        gap: 1rem;
      }
    }
    @media (min-width: 701px) {
      & {
        padding: 1rem 1.25rem;
        min-height: 11rem;
      }
    }
    @media (min-width: 701px) {
      & {
        gap: 1rem;
      }
    }
  `,
);

export const Week = styled('div', {
  label: 'Week',
  target: 'e-0-1',
})(
  () => css`
    & {
      flex: 1;
      min-width: 0;
    }
    & > :is(${PrimitivesStyles.Muted}, ${PrimitivesStyles.MutedInline}) {
      margin-top: 0.25rem;
      white-space: nowrap;
    }
    @media (max-width: 1700px) {
      & > :is(${PrimitivesStyles.Muted}, ${PrimitivesStyles.MutedInline}) {
        white-space: normal;
        font-size: 0.875rem;
      }
    }
    @media (max-width: 1250px) {
      & > :is(${PrimitivesStyles.Muted}, ${PrimitivesStyles.MutedInline}) {
        font-size: 1rem;
      }
    }
    @media (max-width: 700px) {
      & {
        flex-basis: 100%;
      }
    }
    @media (max-width: 700px) {
      & > :is(${PrimitivesStyles.Muted}, ${PrimitivesStyles.MutedInline}) {
        font-size: 0.75rem;
        line-height: 1.25rem;
        margin-top: 0.375rem;
      }
    }
  `,
);

export const Weekdays = styled('ol', {
  label: 'Weekdays',
  target: 'e-0-2',
})(
  ({ theme }) => css`
    & {
      display: flex;
      gap: 0.625rem;
      margin-top: 0.875rem;
    }
    & li {
      flex: 1;
      min-width: 0;
      padding: 0.75rem 0 0.875rem;
      border-radius: 0.875rem;
      background: ${theme.colors.fill.normal};
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: 700;
      line-height: 1.25rem;
      color: ${theme.colors.label.assistive};
    }
    & li:nth-of-type(-n + 2) {
      color: ${theme.colors.label.neutral};
    }
    @media (max-width: 700px) {
      & {
        gap: 0.375rem;
      }
    }
    @media (max-width: 700px) {
      & li {
        padding: 0.625rem 0;
        font-size: 0.75rem;
      }
    }
  `,
);

export const Weekday = styled('li', {
  label: 'Weekday',
  target: 'e-0-3',
})<WeekdayStyleProps>(
  ({ theme, $today }) => css`
    ${
      $today === true &&
      css`
        ${Weekdays} & {
          color: ${theme.colors.status.cautionary};
        }
      `
    }
  `,
);

export const DayCheck = styled('span', {
  label: 'DayCheck',
  target: 'e-0-4',
})<DayCheckStyleProps>(
  ({ theme, $complete, $today }) => css`
    & {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px dashed ${colors.line.normal};
      border-radius: 50%;
      width: 2.125rem;
      height: 2.125rem;
      background: ${theme.colors.background.elevated};
    }
    ${
      $complete === true &&
      css`
        && {
          background: ${theme.colors.status.cautionary};
          box-shadow: 0 0.1875rem #d96e00;
          border: 0;
        }
      `
    }
    ${
      $today === true &&
      $complete === true &&
      css`
        && {
          background: ${colors.accent.streakStrong};
        }
      `
    }
  @media (max-width: 700px) {
      & {
        width: 1.75rem;
        height: 1.75rem;
      }
    }
  `,
);

export const Count = styled('div', {
  label: 'Count',
  target: 'e-0-5',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      gap: 0.375rem;
    }
    & > div {
      text-align: right;
    }
    & strong {
      color: ${theme.colors.status.cautionary};
      font-size: 4rem;
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -1.28px;
      white-space: nowrap;
    }
    & small {
      font-size: 1.625rem;
      margin-left: 2px;
    }
    & :is(${PrimitivesStyles.Muted}, ${PrimitivesStyles.MutedInline}) {
      font-size: 0.875rem;
      line-height: 1.125rem;
    }
    & > img {
      width: 9.375rem;
      height: 9.375rem;
    }
    @media (max-width: 1700px) {
      & > img {
        width: 6.25rem;
        height: 6.25rem;
      }
    }
    @media (max-width: 1700px) {
      & strong {
        font-size: 3.25rem;
      }
    }
    @media (max-width: 1250px) {
      & > img {
        width: 9.375rem;
        height: 9.375rem;
      }
    }
    @media (max-width: 700px) {
      & {
        width: 100%;
        justify-content: flex-end;
      }
    }
    @media (max-width: 700px) {
      & > img {
        width: 4.375rem;
        height: 4.375rem;
      }
    }
    @media (max-width: 700px) {
      & strong {
        font-size: 2.5rem;
      }
    }
    @media (max-width: 700px) {
      & small {
        font-size: 1.25rem;
      }
    }
    @media (max-width: 700px) {
      & :is(${PrimitivesStyles.Muted}, ${PrimitivesStyles.MutedInline}) {
        font-size: 0.75rem;
      }
    }
    @media (min-width: 701px) {
      & strong {
        font-size: 44px;
      }
    }
    @media (min-width: 701px) {
      & small {
        font-size: 20px;
      }
    }
    @media (min-width: 701px) {
      & > img {
        width: 76px;
        height: 76px;
      }
    }
  `,
);

export const Card = styled('section', {
  label: 'Card',
  target: 'e-0-6',
})(
  ({ theme }) => css`
    & {
      background: ${theme.colors.background.elevated};
      border: 1px solid ${theme.colors.line.alternative};
      border-radius: 1.25rem;
      min-width: 0;
    }
    & {
      padding: 1.5rem;
      min-height: 20.6875rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1.125rem;
    }
    @media (max-width: 1250px) {
      & {
        min-height: 18.75rem;
      }
    }
    @media (max-width: 700px) {
      & {
        border-radius: 1rem;
      }
    }
    @media (max-width: 700px) {
      & {
        min-height: 16.875rem;
        padding: 1.25rem 1rem;
        gap: 1.25rem;
      }
    }
    @media (min-width: 701px) {
      & {
        padding: 1.25rem;
        min-height: 18rem;
        gap: 1rem;
      }
    }
  `,
);

export const Year = styled('span', {
  label: 'Year',
  target: 'e-0-7',
})(
  ({ theme }) => css`
    & {
      padding: 0.375rem 0.875rem;
      border-radius: 62.4375rem;
      background: ${theme.colors.fill.normal};
      color: ${theme.colors.label.neutral};
      font-weight: 700;
    }
    @media (max-width: 700px) {
      & {
        font-size: 0.75rem;
        padding: 0.3125rem 0.625rem;
      }
    }
  `,
);

export const HeatmapScroll = styled('div', {
  label: 'HeatmapScroll',
  target: 'e-0-8',
})(
  () => css`
    & {
      overflow-x: auto;
    }
  `,
);

export const Heatmap = styled(Asset, {
  label: 'Heatmap',
  target: 'e-0-9',
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})(
  () => css`
    & {
      width: 100%;
      height: auto;
    }
    @media (max-width: 700px) {
      & {
        min-width: 38.75rem;
      }
    }
    @media (max-width: 700px) {
      & {
        height: 5rem;
      }
    }
  `,
);

export const Months = styled('div', {
  label: 'Months',
  target: 'e-0-a',
})(
  ({ theme }) => css`
    & {
      display: flex;
      justify-content: space-between;
      margin-top: 1.25rem;
      color: ${theme.colors.label.assistive};
      font-size: 0.875rem;
      line-height: 1.375rem;
    }
    @media (max-width: 700px) {
      & {
        min-width: 38.75rem;
      }
    }
  `,
);

export const Legend = styled('div', {
  label: 'Legend',
  target: 'e-0-b',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding-top: 0.25rem;
      font-size: 0.875rem;
      line-height: 1.375rem;
      color: ${theme.colors.label.alternative};
    }
    & > div {
      display: flex;
      gap: 0.25rem;
      align-items: center;
      font-size: 0.75rem;
      color: ${theme.colors.label.assistive};
    }
    @media (max-width: 700px) {
      & {
        font-size: 0.6875rem;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
    }
    @media (max-width: 700px) {
      & > div {
        font-size: 0.625rem;
      }
    }
  `,
);

export const HeatLevel = styled('i', {
  label: 'HeatLevel',
  target: 'e-0-c',
})<HeatLevelStyleProps>(
  ({ theme, $level }) => css`
    & {
      display: block;
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 0.1875rem;
    }
    ${
      $level === 0 &&
      css`
        & {
          background: ${colors.activity.level0};
        }
      `
    }
    ${
      $level === 1 &&
      css`
        & {
          background: ${colors.activity.level1};
        }
      `
    }
  ${
      $level === 2 &&
      css`
        & {
          background: ${colors.activity.level2};
        }
      `
    }
  ${
      $level === 3 &&
      css`
        & {
          background: ${colors.activity.level3};
        }
      `
    }
  ${
      $level === 4 &&
      css`
        & {
          background: ${theme.colors.activity.level4};
        }
      `
    }
  @media (max-width: 700px) {
      & {
        width: 0.5625rem;
        height: 0.5625rem;
      }
    }
  `,
);
