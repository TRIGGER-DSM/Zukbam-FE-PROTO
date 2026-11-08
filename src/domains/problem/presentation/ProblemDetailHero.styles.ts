import { colors } from '../../../shared/styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link } from 'react-router';

export const Hero = styled('section', {
  label: 'Hero',
  target: 'e-3-0',
})(
  ({ theme }) => css`
    & {
      padding: clamp(1.5rem, 3vw, 2.25rem)
        max(var(--detail-gutter), calc((100% - var(--page-max-width)) / 2 + var(--detail-gutter)));
      background: ${theme.colors.background.elevated};
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.5rem;
    }
    @media (max-width: 700px) {
      & {
        gap: 1.25rem;
      }
    }
  `,
);

export const Back = styled(Link, {
  label: 'Back',
  target: 'e-3-1',
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})(
  ({ theme }) => css`
    & {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.375rem 0.875rem 0.375rem 0.625rem;
      border-radius: 62.4375rem;
      background: ${theme.colors.fill.normal};
      color: ${theme.colors.label.neutral};
      font-size: 1rem;
      line-height: 1.625rem;
      font-weight: 700;
    }
    & > span {
      font-size: 1.125rem;
    }
    @media (max-width: 700px) {
      & {
        font-size: 0.875rem;
        line-height: 1.375rem;
      }
    }
  `,
);

export const Content = styled('div', {
  label: 'Content',
  target: 'e-3-2',
})`
  & {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: 65.909091%;
    @media (max-width: 1100px) {
      width: 100%;
    }
  }
  @media (max-width: 700px) {
    & {
      gap: 1.25rem;
    }
  }
`;

export const Title = styled('div', {
  label: 'Title',
  target: 'e-3-3',
})`
  & {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  & > span {
    padding: 0.375rem 0.75rem;
    border-radius: 62.4375rem;
    background: ${colors.fill.strong};
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.5rem;
  }
  & h1 {
    font-size: 2rem;
    font-weight: 900;
    line-height: 2.625rem;
    letter-spacing: -0.8px;
  }
  @media (max-width: 700px) {
    & > span {
      font-size: 0.8125rem;
      line-height: 1.25rem;
      padding: 0.3125rem 0.625rem;
    }
    & h1 {
      font-size: 1.75rem;
      line-height: 2.375rem;
    }
  }
`;

export const Statistics = styled('dl', {
  label: 'Statistics',
  target: 'e-3-4',
})(
  ({ theme }) => css`
    & {
      display: flex;
      margin: 0;
      align-self: flex-start;
    }
    & > div {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.25rem;
      padding: 0 1.75rem;
    }
    & > div + div {
      border-left: 1px solid ${theme.colors.line.alternative};
    }
    & > div:last-child {
      padding-right: 0;
    }
    & dt {
      color: ${theme.colors.label.assistive};
      font-size: 1rem;
      line-height: 1.625rem;
    }
    & dd {
      margin: 0;
      font-size: 1.5rem;
      line-height: 2rem;
      font-weight: 700;
      letter-spacing: -0.4px;
    }
    @media (max-width: 700px) {
      & {
        width: 100%;
      }
      & > div {
        flex: 1;
        padding: 0 1rem;
        align-items: center;
      }
      & > div:first-of-type {
        padding-left: 0;
      }
      & > div:last-child {
        padding-right: 0;
      }
      & dt {
        font-size: 0.8125rem;
        line-height: 1.375rem;
      }
      & dd {
        font-size: 1.3125rem;
        line-height: 1.875rem;
      }
    }
  `,
);

export const Friends = styled('div', {
  label: 'Friends',
  target: 'e-3-5',
})(
  ({ theme }) => css`
    & {
      position: absolute;
      top: 0;
      left: 10.1875rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.625rem 1rem;
      border-radius: 0.875rem 0.875rem 0.875rem 0;
      background: ${colors.fill.strong};
    }
    & p {
      font-size: 1.125rem;
      line-height: 1.875rem;
      color: ${theme.colors.label.neutral};
      white-space: nowrap;
    }
    & strong {
      font-size: 1rem;
      line-height: 1.5rem;
      color: ${colors.static.white};
    }
    @media (max-width: 1100px) {
      & {
        left: 9.6875rem;
        gap: 0.5rem;
        padding: 0.625rem 0.75rem;
      }
      & p {
        font-size: 0.875rem;
      }
      & strong {
        font-size: 0.875rem;
      }
    }
    @media (max-width: 700px) {
      & {
        position: static;
        align-self: flex-start;
        width: 100%;
        padding: 0.75rem;
      }
      & p {
        font-size: 14px;
        line-height: 22px;
        white-space: normal;
      }
      & strong {
        font-size: 14px;
      }
    }
  `,
);

export const Avatars = styled('div', {
  label: 'Avatars',
  target: 'e-3-6',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
    }
    & > span {
      padding: 2px;
      background: ${theme.colors.background.normal};
      border-radius: 50%;
    }
    & > span + span {
      margin-left: -0.625rem;
    }
    & img {
      width: 2.25rem;
      height: 2.25rem;
    }
    & ${MoreFriends} {
      width: 2.5rem;
      height: 2.5rem;
      display: grid;
      place-items: center;
      border: 2px solid ${theme.colors.background.normal};
      background: ${colors.fill.strong};
      font-size: 1rem;
      font-weight: 700;
      color: ${theme.colors.label.neutral};
    }
    @media (max-width: 700px) {
      & > span {
        padding: 2px;
      }
      & img {
        width: 1.625rem;
        height: 1.625rem;
      }
      & ${MoreFriends} {
        width: 1.875rem;
        height: 1.875rem;
        font-size: 0.75rem;
      }
    }
  `,
);

export const MoreFriends = styled('span', {
  label: 'MoreFriends',
  target: 'e-3-7',
})(() => css``);
