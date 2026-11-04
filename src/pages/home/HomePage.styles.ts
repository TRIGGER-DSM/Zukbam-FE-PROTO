import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Page = styled('main', {
  label: 'Page',
  target: 'e-j-0',
})(
  () => css`
    & {
      padding: 3rem 5rem;
      max-width: 130rem;
      margin: auto;
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }
    @media (max-width: 1700px) {
      & {
        padding-inline: 2.5rem;
      }
    }
    @media (max-width: 1250px) {
      & {
        gap: 1.75rem;
        padding: 2rem;
      }
    }
    @media (max-width: 700px) {
      & {
        padding: 1.5rem 1rem;
        gap: 1.25rem;
      }
    }
    @media (min-width: 701px) {
      & {
        max-width: var(--page-max-width);
        margin-inline: auto;
        padding-inline: var(--page-gutter);
      }
    }
    @media (min-width: 701px) {
      & {
        padding-block: 1.75rem;
        gap: var(--section-gap);
      }
    }
    @media (min-width: 701px) {
      & h2 {
        font-size: 19px;
        line-height: 28px;
      }
    }
  `,
);

export const KpiGrid = styled('div', {
  label: 'KpiGrid',
  target: 'e-j-1',
})(
  () => css`
    & {
      display: grid;
      grid-template-columns: minmax(0, 960fr) minmax(0, 776fr);
      gap: 1.5rem;
    }
    @media (max-width: 1700px) {
      & {
        grid-template-columns: 1.1fr 1fr;
      }
    }
    @media (max-width: 1250px) {
      & {
        grid-template-columns: 1fr;
      }
    }
    @media (max-width: 700px) {
      & {
        gap: 1.25rem;
      }
    }
    @media (min-width: 701px) {
      & {
        gap: 1.25rem;
      }
    }
  `,
);

export const ActivityGrid = styled('div', {
  label: 'ActivityGrid',
  target: 'e-j-2',
})(
  () => css`
    & {
      display: grid;
      grid-template-columns: minmax(0, 1157fr) minmax(0, 579fr);
      gap: 1.5rem;
    }
    @media (max-width: 1700px) {
      & {
        grid-template-columns: 1.7fr 1fr;
      }
    }
    @media (max-width: 1250px) {
      & {
        grid-template-columns: 1fr;
      }
    }
    @media (max-width: 700px) {
      & {
        gap: 1.25rem;
      }
    }
    @media (min-width: 701px) {
      & {
        gap: 1.25rem;
      }
    }
  `,
);

export const Notices = styled('ul', {
  label: 'Notices',
  target: 'e-j-3',
})(
  ({ theme }) => css`
    & {
      margin-top: 1.25rem;
    }
    & button {
      padding: 1rem 0;
      display: flex;
      gap: 1rem;
      text-align: left;
      line-height: 1.6;
    }
    & li + li {
      border-top: 1px solid ${theme.colors.line.alternative};
    }
  `,
);
