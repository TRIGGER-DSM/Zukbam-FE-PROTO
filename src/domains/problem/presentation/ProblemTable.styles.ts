import { colors } from '../../../shared/styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { problemPageSize } from '../domain/problem';

export const Scroll = styled('div', {
  label: 'Scroll',
  target: 'e-8-0',
})(
  ({ theme }) => css`
    & {
      --header-height: 3.25rem;
      --row-height: 3.75rem;
      --body-height: calc(${problemPageSize} * var(--row-height));
      min-height: calc(var(--header-height) + var(--body-height) + 2px);
      overflow-x: auto;
      border: 1px solid ${theme.colors.line.alternative};
      border-radius: 1.25rem;
      background: ${theme.colors.background.elevated};
    }
    @media (max-width: 550px) {
      & {
        --header-height: 2.875rem;
        --row-height: 3.5rem;
        border-radius: 1rem;
      }
    }
  `,
);

export const Table = styled('table', {
  label: 'Table',
  target: 'e-8-1',
})(
  ({ theme }) => css`
    & {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }
    & thead {
      background: ${colors.background.alternative};
    }
    & th {
      height: var(--header-height);
      color: ${theme.colors.label.alternative};
      font-size: 0.75rem;
      line-height: 1rem;
      font-weight: 700;
      text-align: left;
    }
    & tr > :nth-child(4) {
      padding-inline: 0;
      text-align: center;
    }
    & th:nth-of-type(n + 5) {
      text-align: right;
    }
    & td {
      height: var(--row-height);
      padding: 0;
      border-top: 1px solid ${theme.colors.line.alternative};
      font-size: 1rem;
      line-height: 1.625rem;
    }
    & th:last-child {
      padding-right: 1.75rem;
    }
    & td:last-child {
      padding-right: 1.75rem;
    }
    @media (max-width: 1600px) {
      & th:last-child {
        padding-right: 1rem;
      }
      & td:last-child {
        padding-right: 1rem;
      }
    }
    @media (max-width: 1200px) {
      & {
        min-width: 45rem;
      }
    }
    @media (max-width: 550px) {
      & {
        min-width: 43.75rem;
      }
      & td {
        font-size: 0.875rem;
      }
      & th {
        font-size: 0.6875rem;
      }
    }
  `,
);

export const ColStatus = styled('col', {
  label: 'ColStatus',
  target: 'e-8-2',
})`
  & {
    width: 3.75rem;
  }
  @media (max-width: 1600px) {
    & {
      width: 2.75rem;
    }
  }
`;

export const ColId = styled('col', {
  label: 'ColId',
  target: 'e-8-3',
})`
  & {
    width: 6.875rem;
  }
  @media (max-width: 1600px) {
    & {
      width: 6.125rem;
    }
  }
`;

export const ColTag = styled('col', {
  label: 'ColTag',
  target: 'e-8-4',
})`
  & {
    width: 4.5rem;
  }
  @media (max-width: 1600px) {
    & {
      width: 3.25rem;
    }
  }
`;

export const ColXp = styled('col', {
  label: 'ColXp',
  target: 'e-8-5',
})`
  & {
    width: 6.25rem;
  }
  @media (max-width: 1600px) {
    & {
      width: 4.75rem;
    }
  }
`;

export const ColSolvers = styled('col', {
  label: 'ColSolvers',
  target: 'e-8-6',
})`
  & {
    width: 9.375rem;
  }
  @media (max-width: 1600px) {
    & {
      width: 6.875rem;
    }
  }
`;

export const ColAttempts = styled('col', {
  label: 'ColAttempts',
  target: 'e-8-7',
})`
  & {
    width: 9.25rem;
  }
  @media (max-width: 1600px) {
    & {
      width: 6.25rem;
    }
  }
`;

export const StatusCell = styled('td', {
  label: 'StatusCell',
  target: 'e-8-8',
})`
  & > img {
    margin-left: 1.5rem;
    width: 1.25rem;
    height: 1.25rem;
  }
  @media (max-width: 1600px) {
    & > img {
      margin-left: 0.75rem;
    }
  }
`;

export const Attempted = styled('span', {
  label: 'Attempted',
  target: 'e-8-9',
})(
  ({ theme }) => css`
    & {
      display: block;
      width: 0.625rem;
      height: 0.625rem;
      background: ${theme.colors.status.cautionary};
      border-radius: 50%;
      margin-left: 1.5rem;
    }
    @media (max-width: 1600px) {
      & {
        margin-left: 0.75rem;
      }
    }
  `,
);

export const Number = styled('span', {
  label: 'Number',
  target: 'e-8-a',
})`
  & {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  & > img {
    width: 1.375rem;
    height: 1.375rem;
    object-fit: contain;
  }
`;

export const Title = styled('button', {
  label: 'Title',
  target: 'e-8-b',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-align: left;
    }
    &:hover {
      color: ${theme.colors.primary.strong};
    }
    & > span {
      font-size: 0.6875rem;
      font-weight: 700;
      line-height: 1rem;
      padding: 1px 0.375rem;
      background: ${colors.fill.strong};
      border-radius: 0.25rem;
      color: ${theme.colors.label.alternative};
    }
    @media (max-width: 550px) {
      & > span {
        font-size: 0.625rem;
      }
    }
  `,
);

export const TagCell = styled('td', {
  label: 'TagCell',
  target: 'e-8-c',
})`
  & > button {
    display: block;
    margin: auto;
  }
`;

export const XpCell = styled('td', {
  label: 'XpCell',
  target: 'e-8-d',
})(
  ({ theme }) => css`
    & > span {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.25rem;
      font-weight: 700;
      color: ${theme.colors.status.cautionary};
    }
    & img {
      width: 1.125rem;
      height: 1.125rem;
      object-fit: contain;
    }
  `,
);

export const SolversCell = styled('td', {
  label: 'SolversCell',
  target: 'e-8-e',
})`
  & {
    text-align: right;
    font-weight: 700;
    color: ${colors.label.normal};
  }
`;

export const AttemptsCell = styled('td', {
  label: 'AttemptsCell',
  target: 'e-8-f',
})(
  ({ theme }) => css`
    & {
      text-align: right;
      color: ${theme.colors.label.neutral};
    }
  `,
);

export const Empty = styled('div', {
  label: 'Empty',
  target: 'e-8-g',
})(
  ({ theme }) => css`
    & {
      position: sticky;
      inset-inline-start: 0;
      display: grid;
      place-items: center;
      min-height: var(--body-height);
      padding: 1rem;
      text-align: center;
      color: ${theme.colors.label.alternative};
      font-size: 0.875rem;
    }
  `,
);
