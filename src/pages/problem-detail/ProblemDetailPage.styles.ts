import * as Example from '../../domains/problem/presentation/ProblemExample.styles';
import { colors } from '../../shared/styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ProblemDetailAsset } from '../../domains/problem/presentation/ProblemDetailAsset';

export const Page = styled('main', {
  label: 'Page',
  target: 'e-k-0',
})`
  --detail-gutter: var(--page-gutter);
`;

export const Content = styled('div', {
  label: 'Content',
  target: 'e-k-1',
})`
  & {
    padding: 3rem var(--detail-gutter) 1.875rem;
    max-width: var(--page-max-width);
    margin-inline: auto;
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(17rem, 1fr);
    gap: var(--section-gap);
    align-items: start;
  }
  @media (max-width: 850px) {
    & {
      grid-template-columns: 1fr;
      padding: 2rem var(--detail-gutter);
      gap: 2.5rem;
    }
  }
  @media (max-width: 700px) {
    & {
      padding: 1.75rem 1.25rem 2rem;
      gap: 2rem;
    }
  }
`;

export const Statement = styled('article', {
  label: 'Statement',
  target: 'e-k-2',
})(
  () => css`
    & {
      min-width: 0;
      & > ${Example.Section} {
        gap: 0.875rem;
      }
      & h2 {
        font-size: 1.5rem;
        line-height: 2rem;
      }
      & > ${Example.Section} > p {
        font-size: 1.125rem;
        line-height: 1.875rem;
      }
      & ${Example.Grid} {
        gap: 1.5rem;
      }
      & ${Example.Code} {
        gap: 0.625rem;
        h3,
        button {
          font-size: 1rem;
          line-height: 1.5rem;
        }
        pre {
          padding: 1rem 1.25rem;
          height: 14.75rem;
          font-size: 1rem;
          line-height: 1.625rem;
        }
      }
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }
    @media (max-width: 700px) {
      & {
        gap: 2rem;
      }
    }
  `,
);

export const Rules = styled('ul', {
  label: 'Rules',
  target: 'e-k-3',
})(
  ({ theme }) => css`
    & {
      color: ${colors.label.normal};
      font-size: 1.125rem;
      line-height: 1.875rem;
      overflow-wrap: anywhere;
    }
    & {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
    }
    & li {
      position: relative;
      padding-left: 1rem;
    }
    & li::before {
      content: '';
      position: absolute;
      top: 0.75rem;
      left: 0;
      width: 0.375rem;
      height: 0.375rem;
      border-radius: 50%;
      background: ${theme.colors.primary.normal};
    }
    @media (max-width: 700px) {
      & {
        font-size: 1.125rem;
        line-height: 1.875rem;
      }
    }
  `,
);

export const Sidebar = styled('div', {
  label: 'Sidebar',
  target: 'e-k-4',
})`
  & {
    position: relative;
    min-width: 0;
  }
  @media (max-width: 1100px) {
    & {
      max-width: 40.625rem;
      width: 100%;
      justify-self: center;
    }
  }
`;

export const Mascot = styled(ProblemDetailAsset)`
  position: absolute;
  left: 50%;
  top: -12rem;
  transform: translateX(-50%);
  width: 18.75rem;
  height: 12.4375rem;
  object-fit: contain;
  pointer-events: none;
  @media (max-width: 1100px) {
    position: static;
    display: block;
    margin-inline: auto;
    transform: none;
  }
`;

export const Unavailable = styled('main', {
  label: 'Unavailable',
  target: 'e-k-6',
})(
  ({ theme }) => css`
    & {
      padding: 6.25rem 1.5rem;
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 1.5rem;
      text-align: center;
    }
    & h1 {
      font-size: 1.75rem;
    }
    & > p {
      color: ${theme.colors.label.alternative};
    }
    & > a {
      color: ${theme.colors.primary.strong};
      text-decoration: underline;
    }
  `,
);
