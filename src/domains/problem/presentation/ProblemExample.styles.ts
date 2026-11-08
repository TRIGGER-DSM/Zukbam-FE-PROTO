import { colors } from '../../../shared/styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Code = styled('div', {
  label: 'Code',
  target: 'e-6-0',
})(
  ({ theme }) => css`
    & {
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
    }
    & > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    & h3 {
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.5rem;
      color: ${theme.colors.label.alternative};
    }
    & button {
      color: ${theme.colors.label.assistive};
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.5rem;
    }
    & pre {
      margin: 0;
      padding: 1rem 1.25rem;
      height: 14.75rem;
      border-radius: 0.75rem;
      background: ${colors.background.alternative};
      overflow: auto;
      color: ${colors.label.normal};
      font-family: 'JetBrains Mono', Consolas, monospace;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.625rem;
      tab-size: 4;
    }
    & code {
      font: inherit;
    }
    & pre:focus-visible {
      outline: 2px solid ${theme.colors.primary.strong};
      outline-offset: 0.1875rem;
    }
    @media (max-width: 700px) {
      & pre {
        padding: 0.875rem;
        font-size: 0.875rem;
        line-height: 1.5rem;
        height: 13.125rem;
      }
      & h3 {
        font-size: 0.8125rem;
        line-height: 1.375rem;
      }
      & button {
        font-size: 0.8125rem;
        line-height: 1.375rem;
      }
    }
  `,
);

export const Section = styled('section', {
  label: 'Section',
  target: 'e-6-1',
})`
  & {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }
  & > p {
    color: ${colors.label.normal};
    font-size: 1.125rem;
    line-height: 1.875rem;
    overflow-wrap: anywhere;
  }
  @media (max-width: 700px) {
    & h2 {
      font-size: 1.3125rem;
      line-height: 1.875rem;
    }
    & > p {
      font-size: 0.9375rem;
      line-height: 1.6875rem;
    }
  }
`;

export const Grid = styled('div', {
  label: 'Grid',
  target: 'e-6-2',
})`
  & {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 1.5rem;
  }
  @media (max-width: 700px) {
    & {
      gap: 1rem;
    }
  }
`;
