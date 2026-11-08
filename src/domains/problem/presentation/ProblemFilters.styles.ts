import { colors, alpha } from '../../../shared/styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface RangeStyleProps {
  $low: string;
  $high: string;
}

export const Panel = styled('aside', {
  label: 'Panel',
  target: 'e-7-0',
})(
  ({ theme }) => css`
    & {
      padding: 1.75rem;
      background: ${theme.colors.background.elevated};
      border: 1px solid ${theme.colors.line.alternative};
      border-radius: 1.25rem;
    }
    @media (max-width: 1600px) {
      & {
        padding: 1.5rem 1.25rem;
      }
    }
    @media (max-width: 1200px) {
      & {
        padding-inline: 1rem;
      }
    }
    @media (max-width: 850px) {
      & {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 1.5rem;
        padding: 1.5rem;
      }
    }
    @media (max-width: 550px) {
      & {
        display: block;
        padding: 1.25rem;
        border-radius: 1rem;
      }
    }
    @media (min-width: 701px) {
      & {
        padding: 1.25rem;
      }
    }
  `,
);

export const Header = styled('div', {
  label: 'Header',
  target: 'e-7-1',
})(
  ({ theme }) => css`
    & {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 1.25rem;
      border-bottom: 1px solid ${theme.colors.line.alternative};
    }
    & h2 {
      font-size: 1.125rem;
      line-height: 1.625rem;
    }
    & button {
      display: flex;
      gap: 0.25rem;
      align-items: center;
      font-size: 0.875rem;
      font-weight: 700;
      line-height: 1.25rem;
      color: ${theme.colors.label.alternative};
    }
    @media (max-width: 850px) {
      & {
        grid-column: 1 / -1;
      }
    }
  `,
);

export const Section = styled('section', {
  label: 'Section',
  target: 'e-7-2',
})(
  ({ theme }) => css`
    & {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1.5rem 0;
      border-bottom: 1px solid ${theme.colors.line.alternative};
    }
    &:last-child {
      border: 0;
    }
    & h3 {
      font-size: 1rem;
      line-height: 1.5rem;
    }
    @media (max-width: 850px) {
      &:last-child {
        grid-column: 1 / -1;
      }
    }
    @media (max-width: 550px) {
      & {
        padding: 1.25rem 0;
      }
      &:last-child {
        padding-bottom: 0;
      }
    }
    @media (min-width: 701px) {
      & {
        padding-block: 1.125rem;
        gap: 0.75rem;
      }
    }
  `,
);

export const Range = styled('div', {
  label: 'Range',
  target: 'e-7-3',
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
    & {
      height: 3.25rem;
    }
    & ${Labels} > img {
      width: 1.25rem;
      height: 1.25rem;
      object-fit: contain;
    }
  `,
);

export const Track = styled('div', {
  label: 'Track',
  target: 'e-7-4',
})(
  ({ theme }) => css`
    & {
      position: absolute;
      left: 0.875rem;
      right: 0.875rem;
      top: 0.375rem;
      height: 0.375rem;
      border-radius: 0.1875rem;
      background: linear-gradient(
        to right,
        ${colors.fill.heavy} 0 var(--low),
        ${theme.colors.primary.strong} var(--low) var(--high),
        ${colors.fill.heavy} var(--high) 100%
      );
    }
  `,
);

export const Labels = styled('div', {
  label: 'Labels',
  target: 'e-7-5',
})(
  ({ theme }) => css`
    & {
      position: absolute;
      left: 0.3125rem;
      right: 0.3125rem;
      top: 1.6875rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    & > span {
      position: relative;
      min-width: 1.125rem;
      text-align: center;
      font-size: 0.6875rem;
      line-height: 1.125rem;
      color: ${theme.colors.label.alternative};
    }
    & > span::before {
      content: '';
      position: absolute;
      top: -0.625rem;
      left: calc(50% - 1px);
      width: 2px;
      height: 0.5rem;
      border-radius: 1px;
      background: ${theme.colors.label.assistive};
    }
  `,
);

export const DifficultyFields = styled('div', {
  label: 'DifficultyFields',
  target: 'e-7-6',
})(
  ({ theme }) => css`
    & {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 1.625rem minmax(0, 1fr);
      gap: 0.5rem;
      align-items: center;
    }
    & > label {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      background: ${theme.colors.fill.normal};
      border: 1px solid ${colors.line.normal};
      border-radius: 0.75rem;
      padding: 0.625rem;
    }
    & > label:nth-of-type(2) {
      grid-column: 3;
      grid-row: 1;
    }
    & > span {
      grid-column: 2;
      grid-row: 1;
      text-align: center;
      color: ${theme.colors.label.alternative};
    }
    & label > img:first-of-type {
      width: 1.25rem;
      height: 1.25rem;
      object-fit: contain;
    }
    & label > img:last-child {
      width: 1rem;
      height: 1rem;
    }
    & select {
      appearance: none;
      width: 100%;
      background: none;
      border: 0;
      font-weight: 700;
      line-height: 1.25rem;
      padding: 0;
      cursor: pointer;
    }
    & option {
      background: ${theme.colors.fill.normal};
    }
    @media (max-width: 1200px) {
      & {
        grid-template-columns: minmax(0, 1fr) 0.625rem minmax(0, 1fr);
        gap: 0.375rem;
      }
      & > label {
        padding: 0.5rem 0.375rem;
        gap: 0.1875rem;
      }
      & select {
        font-size: 0.75rem;
      }
      & label > img:first-of-type {
        width: 1rem;
        height: 1rem;
      }
    }
    @media (max-width: 850px) {
      & select {
        font-size: 0.875rem;
      }
      & > label {
        padding: 0.625rem;
      }
    }
  `,
);

export const Heading = styled('div', {
  label: 'Heading',
  target: 'e-7-7',
})`
  & {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Logic = styled('div', {
  label: 'Logic',
  target: 'e-7-8',
})(
  ({ theme }) => css`
    & {
      display: flex;
      padding: 2px;
      gap: 2px;
      background: ${theme.colors.fill.normal};
      border-radius: 0.5rem;
    }
    & button {
      padding: 0.1875rem 0.625rem;
      border-radius: 0.375rem;
      color: ${theme.colors.label.alternative};
      font-size: 0.75rem;
      font-weight: 700;
      line-height: 1rem;
    }
    & button[aria-pressed='true'] {
      background: ${colors.fill.heavy};
      color: ${colors.static.white};
    }
  `,
);

export const CategoryInput = styled('label', {
  label: 'CategoryInput',
  target: 'e-7-9',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.8125rem 0.875rem 0.8125rem 1rem;
      background: ${colors.background.alternative};
      border: 1px solid ${colors.line.normal};
      border-radius: 0.75rem;
    }
    & input {
      flex: 1;
      width: 100%;
      border: 0;
      background: none;
      outline: 0;
    }
    &:focus-within {
      border-color: ${theme.colors.primary.strong};
    }
  `,
);

export const StatusOptions = styled('div', {
  label: 'StatusOptions',
  target: 'e-7-a',
})(
  ({ theme }) => css`
    & {
      display: flex;
      flex-wrap: wrap;
      gap: 0.375rem;
    }
    & button {
      padding: 0.375rem 0.75rem;
      border-radius: 62.4375rem;
      background: ${theme.colors.fill.normal};
      border: 1px solid ${colors.line.normal};
      color: ${theme.colors.label.neutral};
      font-size: 0.75rem;
      font-weight: 700;
      line-height: 1rem;
      white-space: nowrap;
    }
    & button[aria-pressed='true'] {
      background: ${theme.colors.primary.normal};
      color: ${colors.label.onPrimary};
      border-color: ${theme.colors.primary.strong};
    }
    @media (max-width: 850px) {
      & {
        align-content: flex-start;
      }
    }
  `,
);
