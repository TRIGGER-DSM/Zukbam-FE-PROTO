import { colors } from '../../shared/styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link } from 'react-router';

export const Page = styled('main', {
  label: 'Page',
  target: 'e-n-0',
})(
  ({ theme }) => css`
    & {
      padding: clamp(1.5rem, 4vw, 2rem) var(--page-gutter) 3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
    }
    & h1 {
      color: ${theme.colors.primary.strong};
      font-size: clamp(1.875rem, 3vw, 2.625rem);
      font-weight: 900;
      line-height: 1.25;
      letter-spacing: -0.09375rem;
      text-align: center;
    }
  `,
);

export const Mascot = styled('img', {
  label: 'Mascot',
  target: 'e-n-1',
})`
  & {
    display: block;
    width: 22.5rem;
    height: 20rem;
    object-fit: contain;
    max-width: 100%;
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
`;

export const Description = styled('p', {
  label: 'Description',
  target: 'e-n-2',
})(
  ({ theme }) => css`
    & {
      color: ${theme.colors.label.neutral};
      font-size: 1rem;
      line-height: 1.625rem;
      text-align: center;
    }
    @media (max-width: 700px) {
      & {
        max-width: 22rem;
        font-size: 0.875rem;
        line-height: 1.5rem;
        text-wrap: pretty;
      }
    }
  `,
);

export const Stats = styled('dl', {
  label: 'Stats',
  target: 'e-n-3',
})(
  ({ theme }) => css`
    & {
      display: flex;
      gap: 1rem;
      padding-top: 0.75rem;
      margin: 0;
    }
    & > div {
      width: 12.5rem;
      padding: 1.125rem 0.125rem;
      border-radius: 1.25rem;
      background: ${theme.colors.background.elevated};
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }
    & dt {
      order: 1;
      padding: 0.375rem 0;
      font-size: 0.875rem;
      line-height: 1.375rem;
      color: ${theme.colors.label.alternative};
      text-align: center;
    }
    & dd {
      margin: 0;
      padding: 1rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      font-size: 2rem;
      font-weight: 900;
      line-height: 2.625rem;
      letter-spacing: -0.05rem;
    }
    @media (max-width: 700px) {
      & {
        width: 100%;
        gap: 0.5rem;
      }
      & > div {
        flex: 1;
        min-width: 0;
        width: auto;
        padding: 0.75rem 0.125rem;
        border-radius: 1rem;
      }
      & dd {
        padding: 0.5rem 0;
        gap: 0.125rem;
        font-size: 1.375rem;
        line-height: 2rem;
      }
      & dt {
        font-size: 0.75rem;
        line-height: 1.25rem;
      }
    }
    @media (min-width: 701px) {
      & > div {
        width: 11rem;
        padding-block: 0.75rem;
      }
      & dd {
        padding-block: 0.75rem;
        font-size: 26px;
      }
    }
  `,
);

export const Xp = styled('div', {
  label: 'Xp',
  target: 'e-n-4',
})(
  ({ theme }) => css`
    & dd {
      color: ${theme.colors.status.cautionary};
    }
  `,
);

export const Time = styled('div', {
  label: 'Time',
  target: 'e-n-5',
})`
  & dd {
    color: ${colors.accent.water};
  }
`;

export const Streak = styled('div', {
  label: 'Streak',
  target: 'e-n-6',
})(
  ({ theme }) => css`
    & dd {
      color: ${theme.colors.primary.strong};
    }
  `,
);

export const Growth = styled('section', {
  label: 'Growth',
  target: 'e-n-7',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      width: 41.25rem;
      max-width: 100%;
      padding: 1.25rem 1.5rem;
      border-radius: 1.25rem;
      background: ${theme.colors.background.elevated};
    }
    @media (max-width: 700px) {
      & {
        position: relative;
        padding: 1.125rem 1rem;
        gap: 0.75rem;
        flex-wrap: wrap;
      }
    }
  `,
);

export const Medal = styled('img', {
  label: 'Medal',
  target: 'e-n-8',
})`
  & {
    flex-shrink: 0;
  }
`;

export const GrowthDetails = styled('div', {
  label: 'GrowthDetails',
  target: 'e-n-9',
})(
  ({ theme }) => css`
    & {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    & > p:first-of-type {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    & strong {
      font-size: 1rem;
      line-height: 1.5rem;
    }
    & span {
      font-size: 0.875rem;
      line-height: 1.375rem;
      color: ${theme.colors.label.alternative};
    }
    @media (max-width: 700px) {
      & {
        flex-basis: calc(100% - 4.5rem);
      }
      & strong {
        font-size: 0.875rem;
      }
      & span {
        font-size: 0.75rem;
        line-height: 1.25rem;
      }
    }
  `,
);

export const Progress = styled('div', {
  label: 'Progress',
  target: 'e-n-a',
})`
  & {
    width: 100%;
    overflow: hidden;
  }
  & img {
    width: 100%;
    height: auto;
    aspect-ratio: 421 / 27;
  }
`;

export const GrowthCaption = styled('p', {
  label: 'GrowthCaption',
  target: 'e-n-b',
})(
  ({ theme }) => css`
    & {
      font-size: 0.875rem;
      line-height: 1.375rem;
      color: ${theme.colors.label.alternative};
    }
    @media (max-width: 700px) {
      & {
        font-size: 0.75rem;
        line-height: 1.25rem;
      }
    }
  `,
);

export const XpBadge = styled('span', {
  label: 'XpBadge',
  target: 'e-n-c',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.375rem 0.75rem 0.375rem 0.5rem;
      border-radius: 999px;
      background: ${colors.label.onPrimary};
      color: ${theme.colors.primary.strong};
      font-size: 0.875rem;
      font-weight: 700;
      line-height: 1.25rem;
      white-space: nowrap;
    }
    @media (max-width: 700px) {
      & {
        margin-left: auto;
        font-size: 0.75rem;
      }
    }
  `,
);

export const Actions = styled('div', {
  label: 'Actions',
  target: 'e-n-d',
})(
  ({ theme }) => css`
    & {
      padding-top: 0.75rem;
      display: flex;
      gap: 0.75rem;
    }
    & > button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.875rem 1.75rem;
      border-radius: 0.875rem;
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 700;
      text-align: center;
    }
    & > a {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.875rem 1.75rem;
      border-radius: 0.875rem;
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 700;
      text-align: center;
    }
    & > button {
      border: 1.5px solid ${colors.line.normal};
      background: ${theme.colors.fill.normal};
      color: ${colors.label.normal};
    }
    & > ${Next} {
      color: ${colors.label.onPrimary};
      background: ${theme.colors.primary.normal};
      box-shadow: 0 0.25rem ${colors.primary.heavy};
    }
    @media (max-width: 700px) {
      & {
        width: 100%;
        gap: 0.5rem;
      }
      & > button {
        flex: 1;
        padding: 0.875rem 0.5rem;
        font-size: 0.875rem;
      }
      & > a {
        flex: 1;
        padding: 0.875rem 0.5rem;
        font-size: 0.875rem;
      }
    }
  `,
);

export const Next = styled(Link, {
  label: 'Next',
  target: 'e-n-e',
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})`
  &:hover {
    filter: brightness(1.08);
  }
  &:active {
    transform: translateY(2px);
    box-shadow: 0 2px ${colors.primary.heavy};
  }
`;

export const Unavailable = styled('main', {
  label: 'Unavailable',
  target: 'e-n-f',
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
