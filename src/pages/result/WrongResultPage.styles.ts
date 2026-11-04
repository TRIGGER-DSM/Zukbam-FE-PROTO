import { colors } from '../../shared/styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link } from 'react-router';

export const Page = styled('main', {
  label: 'Page',
  target: 'e-o-0',
})(
  () => css`
    & {
      --wrong-accent: ${colors.status.negative};
      padding: 3rem 5rem 4.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
    }
    & h1 {
      font-size: 3rem;
      line-height: 3.75rem;
      font-weight: 900;
      letter-spacing: -0.09375rem;
      text-align: center;
      color: var(--wrong-accent);
    }
    @media (max-width: 700px) {
      & {
        padding: 2rem 1rem 3rem;
      }
    }
    @media (max-width: 700px) {
      & h1 {
        font-size: 1.875rem;
        line-height: 2.625rem;
        letter-spacing: -0.05rem;
        text-wrap: balance;
      }
    }
    @media (min-width: 701px) {
      & {
        padding-block: 2rem 3rem;
        gap: 1rem;
      }
    }
    @media (min-width: 701px) {
      & h1 {
        font-size: 36px;
        line-height: 46px;
      }
    }
  `,
);

export const Mascot = styled('img', {
  label: 'Mascot',
  target: 'e-o-1',
})(
  () => css`
    & {
      width: 22.5rem;
      height: 20rem;
      max-width: 100%;
      object-fit: contain;
    }
    @media (max-width: 700px) {
      & {
        width: 15.75rem;
        height: 14rem;
      }
    }
    @media (min-width: 701px) {
      & {
        width: 18rem;
        height: 16rem;
      }
    }
  `,
);

export const Description = styled('p', {
  label: 'Description',
  target: 'e-o-2',
})(
  ({ theme }) => css`
    & {
      font-size: 1rem;
      line-height: 1.625rem;
      color: ${theme.colors.label.neutral};
      text-align: center;
    }
    @media (max-width: 700px) {
      & {
        font-size: 0.875rem;
        line-height: 1.5rem;
        text-wrap: pretty;
      }
    }
  `,
);

export const Summary = styled('section', {
  label: 'Summary',
  target: 'e-o-3',
})(
  ({ theme }) => css`
    & {
      width: 50rem;
      max-width: 100%;
      padding: 1.5rem 1.75rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      border-radius: 1.25rem;
      background: ${theme.colors.background.elevated};
    }
    @media (max-width: 700px) {
      & {
        padding: 1.25rem 1rem;
        gap: 1rem;
      }
    }
  `,
);

export const SummaryHeading = styled('div', {
  label: 'SummaryHeading',
  target: 'e-o-4',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
    }
    & > div {
      display: flex;
      align-items: center;
    }
    & {
      justify-content: space-between;
      gap: 1rem;
    }
    & > div {
      gap: 0.625rem;
    }
    & h2 {
      font-size: 1.125rem;
      line-height: 1.625rem;
      letter-spacing: -0.0125rem;
    }
    & > p {
      font-size: 0.875rem;
      line-height: 1.375rem;
      color: ${theme.colors.label.alternative};
    }
    @media (max-width: 700px) {
      & {
        flex-wrap: wrap;
        gap: 0.5rem;
      }
    }
    @media (max-width: 700px) {
      & > p {
        font-size: 0.75rem;
      }
    }
  `,
);

export const Status = styled('span', {
  label: 'Status',
  target: 'e-o-5',
})(
  () => css`
    & {
      padding: 0.25rem 0.625rem;
      border-radius: 999px;
      font-size: 0.875rem;
      font-weight: 700;
      line-height: 1.25rem;
      color: ${colors.static.black};
      background: var(--wrong-accent);
      white-space: nowrap;
    }
  `,
);

export const ProgressSection = styled('div', {
  label: 'ProgressSection',
  target: 'e-o-6',
})(
  ({ theme }) => css`
    & {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    & > div:first-of-type {
      display: flex;
      justify-content: space-between;
      gap: 0.75rem;
      font-size: 0.875rem;
      font-weight: 700;
      line-height: 1.25rem;
      color: ${theme.colors.label.neutral};
    }
    & strong {
      color: var(--wrong-accent);
    }
  `,
);

export const Progress = styled('div', {
  label: 'Progress',
  target: 'e-o-7',
})(
  () => css`
    & img {
      width: 100%;
      height: auto;
      aspect-ratio: 744 / 27;
    }
  `,
);

export const Statistics = styled('dl', {
  label: 'Statistics',
  target: 'e-o-8',
})(
  ({ theme }) => css`
    & {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 0.75rem;
      margin: 0;
    }
    & > div {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 0.75rem 0.875rem;
      border-radius: 0.75rem;
      background: ${theme.colors.fill.normal};
    }
    & dt {
      color: ${theme.colors.label.alternative};
      font-size: 0.875rem;
      line-height: 1.375rem;
    }
    & dd {
      margin: 0;
      color: ${colors.label.normal};
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.5rem;
    }
    @media (max-width: 700px) {
      & {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.5rem;
      }
    }
    @media (max-width: 700px) {
      & dt {
        font-size: 0.75rem;
        line-height: 1.25rem;
      }
    }
  `,
);

export const Notice = styled('p', {
  label: 'Notice',
  target: 'e-o-9',
})(
  ({ theme }) => css`
    & {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      color: ${theme.colors.label.alternative};
      font-size: 0.875rem;
      line-height: 1.375rem;
    }
    @media (max-width: 700px) {
      & {
        font-size: 0.75rem;
        line-height: 1.25rem;
      }
    }
    @media (max-width: 700px) {
      & {
        align-items: flex-start;
      }
    }
    @media (max-width: 700px) {
      & img {
        margin-top: 0.125rem;
      }
    }
  `,
);

export const Hint = styled('aside', {
  label: 'Hint',
  target: 'e-o-a',
})(
  ({ theme }) => css`
    & {
      width: 50rem;
      max-width: 100%;
      display: flex;
      align-items: center;
      gap: 0.875rem;
      padding: 1.25rem 1.5rem;
      border-radius: 1.25rem;
      background: ${theme.colors.background.elevated};
    }
    & > strong {
      flex-shrink: 0;
      padding: 0.375rem 0.75rem;
      border-radius: 999px;
      background: ${theme.colors.status.cautionary};
      color: ${colors.static.black};
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
    & p {
      font-size: 0.875rem;
      line-height: 1.375rem;
      color: ${theme.colors.label.neutral};
      overflow-wrap: anywhere;
    }
    @media (max-width: 700px) {
      & p {
        font-size: 0.75rem;
        line-height: 1.25rem;
      }
    }
    @media (max-width: 700px) {
      & {
        padding: 1.125rem 1rem;
        gap: 0.75rem;
        align-items: flex-start;
      }
    }
  `,
);

export const Reward = styled('p', {
  label: 'Reward',
  target: 'e-o-b',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: ${theme.colors.label.alternative};
      font-size: 0.875rem;
      line-height: 1.375rem;
    }
    @media (max-width: 700px) {
      & {
        font-size: 0.75rem;
        line-height: 1.25rem;
      }
    }
    @media (max-width: 700px) {
      & {
        max-width: 100%;
        text-wrap: pretty;
      }
    }
  `,
);

export const Actions = styled('div', {
  label: 'Actions',
  target: 'e-o-c',
})(
  () => css`
    & {
      display: flex;
      gap: 0.75rem;
      padding-top: 0.5rem;
    }
    & a {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.875rem 1.75rem;
      border-radius: 0.875rem;
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.5rem;
      color: ${colors.label.normal};
      text-align: center;
    }
    & a:hover {
      filter: brightness(1.08);
    }
    @media (max-width: 700px) {
      & {
        width: 100%;
        gap: 0.5rem;
      }
    }
    @media (max-width: 700px) {
      & a {
        flex: 1;
        padding: 0.875rem 0.5rem;
        font-size: 0.875rem;
      }
    }
  `,
);

export const Review = styled(Link, {
  label: 'Review',
  target: 'e-o-d',
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})(
  ({ theme }) => css`
    & {
      border: 1.5px solid ${colors.line.normal};
      background: ${theme.colors.fill.normal};
    }
  `,
);

export const Retry = styled(Link, {
  label: 'Retry',
  target: 'e-o-e',
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})(
  () => css`
    & {
      background: var(--wrong-accent);
      box-shadow: 0 0.25rem ${colors.status.negativeHeavy};
    }
    &:active {
      transform: translateY(2px);
      box-shadow: 0 2px ${colors.status.negativeHeavy};
    }
  `,
);

export const Unavailable = styled('main', {
  label: 'Unavailable',
  target: 'e-o-f',
})(
  ({ theme }) => css`
    & {
      min-height: 60vh;
      padding: 3rem 1.25rem;
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
    & > a {
      color: ${theme.colors.primary.strong};
    }
  `,
);
