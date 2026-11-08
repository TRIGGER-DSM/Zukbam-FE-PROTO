import { colors } from '../../shared/styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link } from 'react-router';
import * as SiteLayoutStyles from '../../shared/ui/SiteLayout.styles';

interface WorkspaceStyleProps {
  $problemWidth: string;
}

interface OutputStyleProps {
  $empty?: boolean;
}

export const Unavailable = styled('main', {
  label: 'Unavailable',
  target: 'e-p-0',
})(
  ({ theme }) => css`
    & {
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      flex-direction: column;
      padding: 2.5rem 1.25rem;
    }
    & > a {
      color: ${theme.colors.primary.strong};
    }
  `,
);

export const Page = styled('main', {
  label: 'Page',
  target: 'e-p-1',
})(
  () => css`
    & ~ ${SiteLayoutStyles.Footer} ${SiteLayoutStyles.Brand} > small {
      font-size: 0.875rem;
      line-height: 1.375rem;
    }
    & ~ ${SiteLayoutStyles.Footer} ${SiteLayoutStyles.Github} {
      font-size: 0.875rem;
      line-height: 1.375rem;
    }
    & ~ ${SiteLayoutStyles.Footer} ${SiteLayoutStyles.MemberName} > span {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
    @media (max-width: 650px) {
      & ~ ${SiteLayoutStyles.Footer} ${SiteLayoutStyles.Brand} > small {
        font-size: 0.75rem;
      }
      & ~ ${SiteLayoutStyles.Footer} ${SiteLayoutStyles.Github} {
        font-size: 0.75rem;
      }
      & ~ ${SiteLayoutStyles.Footer} ${SiteLayoutStyles.MemberName} > span {
        font-size: 0.75rem;
      }
    }
  `,
);

export const ProblemBar = styled('div', {
  label: 'ProblemBar',
  target: 'e-p-2',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.25rem;
      width: min(calc(100% - 2 * var(--page-gutter)), 110rem);
      margin-inline: auto;
      padding-block: 0.875rem;
    }
    & nav {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      min-width: 0;
    }
    & nav > span {
      font-size: 0.875rem;
      line-height: 1.375rem;
      color: ${theme.colors.label.assistive};
    }
    & nav > span:nth-of-type(2) {
      color: ${theme.colors.label.alternative};
    }
    @media (max-width: 1100px) {
      & {
        flex-wrap: wrap;
      }
    }
    @media (max-width: 650px) {
      & {
        padding-block: 1.25rem 0.5rem;
        gap: 0.875rem;
      }
      & nav {
        flex-wrap: wrap;
        gap: 0.375rem;
      }
      & nav > span {
        font-size: 0.75rem;
      }
    }
  `,
);

export const Back = styled(Link, {
  label: 'Back',
  target: 'e-p-3',
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})(
  ({ theme }) => css`
    & {
      padding: 0.375rem 0.875rem 0.375rem 0.625rem;
      background: ${theme.colors.fill.normal};
      border-radius: 62.4375rem;
      color: ${theme.colors.label.neutral};
      font-size: 0.875rem;
      font-weight: 700;
      line-height: 1.5rem;
      white-space: nowrap;
    }
    @media (max-width: 650px) {
      & {
        font-size: 0.75rem;
        padding: 0.3125rem 0.625rem;
      }
    }
  `,
);

export const ProblemTitle = styled(Link, {
  label: 'ProblemTitle',
  target: 'e-p-4',
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})`
  & {
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.5rem;
    white-space: nowrap;
  }
  @media (max-width: 650px) {
    & {
      font-size: 0.875rem;
    }
  }
`;

export const Navigation = styled('div', {
  label: 'Navigation',
  target: 'e-p-5',
})(
  ({ theme }) => css`
    & {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      font-size: 0.875rem;
      font-weight: 700;
      line-height: 1.25rem;
      white-space: nowrap;
      color: ${theme.colors.label.neutral};
    }
    & > button {
      padding: 0.375rem 0.875rem;
      border: 1px solid ${colors.line.normal};
      border-radius: 62.4375rem;
    }
    @media (max-width: 1100px) {
      & {
        margin-left: auto;
      }
    }
    @media (max-width: 650px) {
      & {
        font-size: 0.75rem;
        gap: 0.375rem;
        margin: 0;
        width: 100%;
        justify-content: space-between;
      }
      & > button {
        padding: 0.375rem 0.625rem;
      }
    }
  `,
);

export const Elapsed = styled('span', {
  label: 'Elapsed',
  target: 'e-p-6',
})(
  ({ theme }) => css`
    & {
      padding: 0.375rem 0.75rem 0.375rem 0.625rem;
      border-radius: 62.4375rem;
      background: ${theme.colors.fill.normal};
      font-variant-numeric: tabular-nums;
    }
    @media (max-width: 650px) {
      & {
        padding: 0.375rem 0.625rem;
      }
    }
  `,
);

export const Workspace = styled('div', {
  label: 'Workspace',
  target: 'e-p-7',
})<WorkspaceStyleProps>(
  ({ $problemWidth }) => css`
    --problem-width: ${$problemWidth};
    & {
      display: grid;
      grid-template-columns: minmax(0, var(--problem-width)) 1rem minmax(0, 1fr);
      width: min(calc(100% - 2 * var(--page-gutter)), 110rem);
      margin-inline: auto;
      padding-block: 0.75rem 2rem;
      align-items: start;
    }
    @media (max-width: 1100px) {
      & {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
    }
    @media (max-width: 650px) {
      & {
        gap: 1.25rem;
      }
    }
  `,
);

export const Resizer = styled('div', {
  label: 'Resizer',
  target: 'e-p-8',
})(
  ({ theme }) => css`
    & {
      height: 70.5625rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: col-resize;
      touch-action: none;
      user-select: none;
    }
    & > span {
      width: 0.25rem;
      height: 2.5rem;
      border-radius: 2px;
      background: ${theme.colors.label.assistive};
    }
    &:hover > span {
      background: ${theme.colors.primary.normal};
    }
    &:focus-visible > span {
      background: ${theme.colors.primary.normal};
    }
    @media (max-width: 1100px) {
      & {
        display: none;
      }
    }
    @media (min-width: 1101px) {
      & {
        height: clamp(480px, calc(100dvh - 150px), 55rem);
      }
    }
  `,
);

export const Editor = styled('section', {
  label: 'Editor',
  target: 'e-p-9',
})(
  ({ theme }) => css`
    & {
      display: flex;
      flex-direction: column;
      height: 55rem;
      border: 1px solid ${theme.colors.line.alternative};
      border-radius: 1.25rem;
      overflow: hidden;
      background: ${theme.colors.background.elevated};
      min-width: 0;
    }
    @media (max-width: 1100px) {
      & {
        width: 100%;
      }
      & {
        height: 48.75rem;
      }
    }
    @media (max-width: 650px) {
      & {
        height: 45rem;
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

export const Toolbar = styled('div', {
  label: 'Toolbar',
  target: 'e-p-a',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid ${theme.colors.line.alternative};
    }
    @media (max-width: 1600px) {
      & {
        gap: 0.5rem;
      }
    }
    @media (max-width: 650px) {
      & {
        padding: 0.75rem;
        flex-wrap: wrap;
        row-gap: 0.75rem;
      }
    }
  `,
);

export const Language = styled('div', {
  label: 'Language',
  target: 'e-p-b',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    & select {
      padding: 0.5rem 0.75rem 0.5rem 0.875rem;
      background: ${theme.colors.fill.normal};
      color: ${colors.label.normal};
      border: 0;
      border-radius: 0.625rem;
      font-size: 0.875rem;
      font-weight: 700;
      line-height: 1.25rem;
    }
    & > span {
      border-radius: 62.4375rem;
      background: ${colors.background.alternative};
      padding: 0.375rem 0.75rem 0.375rem 0.625rem;
      font-size: 0.75rem;
      line-height: 1.125rem;
      color: ${theme.colors.label.alternative};
    }
    @media (max-width: 1600px) {
      & > span {
        display: none;
      }
    }
    @media (max-width: 1100px) {
      & > span {
        display: block;
      }
    }
    @media (max-width: 650px) {
      & {
        width: 100%;
        justify-content: space-between;
      }
      & select {
        font-size: 0.75rem;
      }
    }
  `,
);

export const Tools = styled('div', {
  label: 'Tools',
  target: 'e-p-c',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      white-space: nowrap;
    }
    & > span {
      margin-right: 0.5rem;
      color: ${theme.colors.label.neutral};
      font-size: 0.875rem;
      font-weight: 700;
      line-height: 1.25rem;
    }
    & > button {
      padding: 0.25rem;
      border-radius: 0.5rem;
    }
    & > button:disabled {
      opacity: 0.4;
      cursor: default;
    }
    & > strong {
      font-size: 1rem;
      line-height: 1.5rem;
      min-width: 2.375rem;
      text-align: center;
    }
    & > i {
      height: 1.125rem;
      width: 1px;
      background: ${colors.line.normal};
      margin: 0 0.625rem;
    }
    & > ${Reset} {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding-right: 0.5rem;
      font-size: 0.875rem;
      font-weight: 700;
      line-height: 1.25rem;
      color: ${theme.colors.label.neutral};
    }
    @media (max-width: 1600px) {
      & > span {
        display: none;
      }
      & > i {
        margin-inline: 0.25rem;
      }
    }
    @media (max-width: 1100px) {
      & > span {
        display: block;
      }
    }
    @media (max-width: 650px) {
      & {
        width: 100%;
        justify-content: flex-end;
      }
      & > span {
        margin-right: auto;
        font-size: 0.75rem;
      }
      & > strong {
        font-size: 0.875rem;
      }
      & > ${Reset} {
        font-size: 0.75rem;
      }
    }
  `,
);

export const Reset = styled('button', {
  label: 'Reset',
  target: 'e-p-d',
})(() => css``);

export const Console = styled('div', {
  label: 'Console',
  target: 'e-p-e',
})(
  ({ theme }) => css`
    & {
      padding: 1rem 1.25rem;
      border-top: 1px solid ${theme.colors.line.alternative};
      min-height: 4.375rem;
      flex-shrink: 0;
    }
    @media (max-width: 650px) {
      & {
        padding: 0.75rem;
        min-height: 3.875rem;
      }
    }
  `,
);

export const ConsoleTabs = styled('div', {
  label: 'ConsoleTabs',
  target: 'e-p-f',
})(
  ({ theme }) => css`
    & {
      display: inline-flex;
      padding: 0.1875rem;
      align-items: center;
      gap: 0.25rem;
      border-radius: 62.4375rem;
      background: ${theme.colors.fill.normal};
    }
    & > button {
      padding: 0.3125rem 0.875rem;
      border-radius: 62.4375rem;
      color: ${theme.colors.label.alternative};
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 700;
    }
    & > button[aria-selected='true'] {
      background: ${colors.fill.strong};
      color: ${colors.static.white};
    }
    @media (max-width: 650px) {
      & > button {
        font-size: 0.75rem;
        padding-inline: 0.75rem;
      }
    }
  `,
);

export const Output = styled('div', {
  label: 'Output',
  target: 'e-p-g',
})<OutputStyleProps>(
  ({ theme, $empty }) => css`
    & {
      padding-top: 1rem;
      font-size: 0.875rem;
      line-height: 1.375rem;
      color: ${theme.colors.label.neutral};
    }
    & > label {
      display: block;
      margin-bottom: 0.5rem;
    }
    & > textarea {
      display: block;
      width: 100%;
      height: 6.875rem;
      resize: vertical;
      padding: 0.625rem 0.75rem;
      border: 1px solid ${colors.line.normal};
      border-radius: 0.625rem;
      background: ${colors.background.alternative};
      color: ${colors.label.normal};
      font-family: 'JetBrains Mono', Consolas, monospace;
      font-size: 0.875rem;
      line-height: 1.375rem;
    }
    & > p {
      margin-top: 0.375rem;
    }
    ${
      $empty === true &&
      css`
        && {
          padding-top: 0;
          height: 0;
          overflow: hidden;
        }
      `
    }
  `,
);

export const RunBar = styled('div', {
  label: 'RunBar',
  target: 'e-p-h',
})(
  ({ theme }) => css`
    & {
      padding: 0.75rem 1rem 0.75rem 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      border-top: 1px solid ${theme.colors.line.alternative};
      flex-shrink: 0;
    }
    & > p {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: ${theme.colors.label.neutral};
      font-size: 0.875rem;
      line-height: 1.375rem;
    }
    & > button {
      padding: 0.875rem 1.75rem;
      border: 1.5px solid ${colors.line.normal};
      border-radius: 0.875rem;
      background: ${theme.colors.fill.normal};
      color: ${colors.label.normal};
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.5rem;
      white-space: nowrap;
    }
    @media (max-width: 650px) {
      & {
        padding: 0.75rem;
        flex-wrap: wrap;
      }
      & > p {
        flex-basis: 100%;
        font-size: 0.75rem;
      }
      & > button {
        margin-left: auto;
        padding: 0.625rem 1.25rem;
        font-size: 0.875rem;
      }
    }
  `,
);
