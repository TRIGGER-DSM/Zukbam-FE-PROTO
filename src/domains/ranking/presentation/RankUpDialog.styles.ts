import { colors } from '../../../shared/styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Content = styled('div', {
  label: 'Content',
  target: 'e-f-0',
})`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.875rem;
  }
  & h2 {
    font-size: 2rem;
    font-weight: 900;
    line-height: 2.625rem;
    letter-spacing: -0.05rem;
    text-align: center;
    white-space: nowrap;
  }
  @media (max-width: 700px) {
    & {
      gap: 0.75rem;
    }
    & h2 {
      font-size: 1.5rem;
      line-height: 2.125rem;
      white-space: normal;
      text-wrap: balance;
    }
  }
  @media (min-width: 701px) {
    & h2 {
      font-size: 26px;
      line-height: 36px;
    }
  }
`;

export const Art = styled('img', {
  label: 'Art',
  target: 'e-f-1',
})`
  & {
    width: 100%;
    height: auto;
    aspect-ratio: 400 / 230;
  }
  @media (max-width: 700px) {
    & {
      max-width: 20rem;
    }
  }
`;

export const Label = styled('span', {
  label: 'Label',
  target: 'e-f-2',
})(
  ({ theme }) => css`
    & {
      padding: 0.375rem 0.75rem;
      border-radius: 999px;
      background: ${colors.label.onPrimary};
      color: ${theme.colors.primary.strong};
      font-size: 0.875rem;
      font-weight: 700;
      line-height: 1.25rem;
    }
  `,
);

export const Description = styled('p', {
  label: 'Description',
  target: 'e-f-3',
})(
  ({ theme }) => css`
    & {
      font-size: 1rem;
      line-height: 1.625rem;
      color: ${theme.colors.label.alternative};
      white-space: pre-line;
      text-align: center;
    }
    @media (max-width: 700px) {
      & {
        font-size: 0.875rem;
        line-height: 1.5rem;
      }
    }
  `,
);

export const Transition = styled('div', {
  label: 'Transition',
  target: 'e-f-4',
})`
  & {
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
  }
`;

export const Previous = styled('div', {
  label: 'Previous',
  target: 'e-f-5',
})(
  ({ theme }) => css`
    & {
      color: ${theme.colors.label.assistive};
    }
  `,
);

export const Current = styled('div', {
  label: 'Current',
  target: 'e-f-6',
})(
  ({ theme }) => css`
    & {
      color: ${theme.colors.primary.strong};
    }
  `,
);

export const Next = styled('section', {
  label: 'Next',
  target: 'e-f-7',
})(
  ({ theme }) => css`
    & {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.875rem 1rem;
      border-radius: 1rem;
      background: ${theme.colors.fill.normal};
    }
    & > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
    }
    & p {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      color: ${theme.colors.label.alternative};
      font-size: 0.875rem;
      line-height: 1.375rem;
    }
    & strong {
      color: ${theme.colors.status.cautionary};
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
    @media (max-width: 700px) {
      & {
        padding: 0.75rem;
      }
    }
  `,
);

export const Progress = styled('img', {
  label: 'Progress',
  target: 'e-f-8',
})`
  & {
    width: 100%;
    height: auto;
    aspect-ratio: 366 / 27;
  }
`;

export const Actions = styled('div', {
  label: 'Actions',
  target: 'e-f-9',
})(
  ({ theme }) => css`
    & {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      padding-top: 0.625rem;
    }
    & button {
      width: 100%;
      padding: 0.875rem 1.75rem;
      border-radius: 0.875rem;
      background: ${theme.colors.primary.normal};
      box-shadow: 0 0.25rem ${colors.primary.heavy};
      color: ${colors.label.onPrimary};
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.5rem;
    }
    & button:active {
      transform: translateY(2px);
      box-shadow: 0 2px ${colors.primary.heavy};
    }
    & a {
      color: ${theme.colors.primary.strong};
      font-size: 0.875rem;
      font-weight: 700;
      line-height: 1.25rem;
    }
  `,
);
