import { colors } from '../../../shared/styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Sample = styled('div', {
  label: 'Sample',
  target: 'e-h-0',
})(
  ({ theme }) => css`
    & {
      border: 1px solid ${theme.colors.line.alternative};
      background: ${colors.background.alternative};
      border-radius: 0.75rem;
      min-width: 0;
      overflow: hidden;
    }
    & > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.625rem 0.875rem 0.625rem 1rem;
      border-bottom: 1px solid ${theme.colors.line.alternative};
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 700;
      color: ${theme.colors.label.alternative};
    }
    & button {
      color: ${theme.colors.label.assistive};
      font-weight: 700;
    }
    & pre {
      margin: 0;
      padding: 0.75rem 1rem 0.875rem;
      font-family: 'JetBrains Mono', Consolas, monospace;
      font-size: 0.875rem;
      line-height: 1.375rem;
      min-height: 11.25rem;
      overflow: auto;
    }
    @media (max-width: 650px) {
      & > div {
        padding: 0.625rem;
        font-size: 0.75rem;
      }
    }
    @media (max-width: 650px) {
      & pre {
        padding: 0.625rem;
        font-size: 0.75rem;
        line-height: 1.25rem;
      }
    }
  `,
);

export const Panel = styled('section', {
  label: 'Panel',
  target: 'e-h-1',
})(
  ({ theme }) => css`
    & {
      height: 70.5625rem;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border-radius: 1.25rem;
      border: 1px solid ${theme.colors.line.alternative};
      background: ${theme.colors.background.elevated};
      min-width: 0;
    }
    @media (max-width: 1100px) {
      & {
        width: 100%;
      }
    }
    @media (max-width: 1100px) {
      & {
        height: 37.5rem;
      }
    }
    @media (max-width: 650px) {
      & {
        height: 33.75rem;
        border-radius: 1rem;
      }
    }
    @media (min-width: 1101px) {
      & {
        height: clamp(480px, calc(100dvh - 150px), 55rem);
      }
    }
  `,
);

export const Tabs = styled('div', {
  label: 'Tabs',
  target: 'e-h-2',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-self: stretch;
      padding: 0.875rem 1.25rem;
      border-bottom: 1px solid ${theme.colors.line.alternative};
      position: relative;
      gap: 0.25rem;
    }
    &::before {
      content: '';
      position: absolute;
      left: 1.25rem;
      top: 0.875rem;
      width: 14.5rem;
      height: 2.75rem;
      border-radius: 62.4375rem;
      background: ${theme.colors.fill.normal};
    }
    & > button {
      position: relative;
      padding: 0.5rem 1.125rem;
      margin-block: 0.25rem;
      border-radius: 62.4375rem;
      color: ${theme.colors.label.alternative};
      font-size: 0.875rem;
      font-weight: 700;
      line-height: 1.25rem;
    }
    & > button:first-of-type {
      margin-left: 0.25rem;
    }
    & > button[aria-selected='true'] {
      background: ${colors.fill.strong};
      color: ${colors.static.white};
    }
    @media (max-width: 650px) {
      & {
        padding-inline: 0.75rem;
      }
    }
    @media (max-width: 650px) {
      &::before {
        left: 0.75rem;
      }
    }
    @media (max-width: 650px) {
      & > button {
        padding-inline: 1rem;
      }
    }
  `,
);

export const Body = styled('div', {
  label: 'Body',
  target: 'e-h-3',
})(
  ({ theme }) => css`
    & {
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
      overflow-y: auto;
      padding: 1.75rem 2rem 2rem;
      flex: 1;
      min-height: 0;
      scrollbar-width: thin;
      scrollbar-color: ${theme.colors.label.assistive} transparent;
    }
    & h1 {
      display: flex;
      align-items: baseline;
      gap: 0.625rem;
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 2rem;
      padding-bottom: 1.75rem;
      border-bottom: 1px solid ${theme.colors.line.alternative};
    }
    & h1 > span {
      color: ${theme.colors.label.assistive};
      font-size: 1.125rem;
      line-height: 1.625rem;
    }
    & section {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
    }
    & h2 {
      font-size: 1.125rem;
      font-weight: 700;
      line-height: 1.625rem;
    }
    & p {
      font-size: 1rem;
      line-height: 1.625rem;
      color: ${colors.label.normal};
      overflow-wrap: anywhere;
    }
    & ul {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.875rem 1rem;
      background: ${colors.background.alternative};
      border-radius: 0.75rem;
    }
    & li {
      position: relative;
      padding-left: 1rem;
      font-size: 0.875rem;
      line-height: 1.375rem;
    }
    & li::before {
      content: '';
      position: absolute;
      width: 0.375rem;
      height: 0.375rem;
      border-radius: 50%;
      background: ${theme.colors.primary.normal};
      left: 0;
      top: 0.5rem;
    }
    @media (max-width: 1600px) {
      & {
        padding-inline: 1.5rem;
      }
    }
    @media (max-width: 650px) {
      & {
        padding: 1.25rem 1rem 1.5rem;
        gap: 1.5rem;
      }
    }
    @media (max-width: 650px) {
      & h1 {
        font-size: 1.3125rem;
        line-height: 1.875rem;
        padding-bottom: 1.25rem;
      }
    }
    @media (max-width: 650px) {
      & h1 > span {
        font-size: 0.9375rem;
      }
    }
    @media (max-width: 650px) {
      & h2 {
        font-size: 1.0625rem;
      }
    }
    @media (max-width: 650px) {
      & p {
        font-size: 0.875rem;
        line-height: 1.5rem;
      }
    }
    @media (max-width: 650px) {
      & li {
        font-size: 0.75rem;
        line-height: 1.25rem;
      }
    }
    @media (max-width: 650px) {
      & ul {
        padding: 0.75rem;
      }
    }
    @media (min-width: 1101px) {
      & {
        padding: 1.25rem 1.5rem;
        gap: 1.5rem;
      }
    }
    @media (min-width: 1101px) {
      & h1 {
        padding-bottom: 1.25rem;
      }
    }
  `,
);

export const Samples = styled('div', {
  label: 'Samples',
  target: 'e-h-4',
})(
  () => css`
    & {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 0.75rem;
    }
    @media (max-width: 650px) {
      & {
        gap: 0.625rem;
      }
    }
  `,
);

export const Limits = styled('div', {
  label: 'Limits',
  target: 'e-h-5',
})(
  ({ theme }) => css`
    & {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    & > span {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.375rem 0.875rem;
      border-radius: 62.4375rem;
      background: ${theme.colors.fill.normal};
      color: ${theme.colors.label.alternative};
      font-size: 0.875rem;
      line-height: 1.375rem;
    }
    & strong {
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: ${colors.static.white};
    }
    @media (max-width: 650px) {
      & > span {
        font-size: 0.75rem;
      }
    }
    @media (max-width: 650px) {
      & strong {
        font-size: 0.75rem;
      }
    }
  `,
);

export const Empty = styled('div', {
  label: 'Empty',
  target: 'e-h-6',
})(
  ({ theme }) => css`
    & {
      padding: 0.75rem 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    & > p {
      color: ${theme.colors.label.alternative};
    }
  `,
);
