import { colors } from '../../../shared/styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface BannerStyleProps {
  $variant?: string;
  $position?: string;
}

interface DotStyleProps {
  $selected?: boolean;
}

export const Hero = styled('section', {
  label: 'Hero',
  target: 'e-i-0',
})(
  ({ theme }) => css`
    & {
      background: ${theme.colors.background.elevated};
      overflow: hidden;
      padding: 2rem 0;
    }
    @media (max-width: 700px) {
      & {
        padding: 1.25rem 0;
      }
    }
    @media (min-width: 701px) {
      & {
        padding-block: 1.25rem;
      }
    }
  `,
);

export const Stage = styled('div', {
  label: 'Stage',
  target: 'e-i-1',
})(
  () => css`
    & {
      height: 24.5rem;
      position: relative;
    }
    @media (max-width: 1250px) {
      & {
        height: 20.875rem;
      }
    }
    @media (max-width: 700px) {
      & {
        height: calc((100vw - 2rem) * 0.38889);
      }
    }
    @media (min-width: 701px) and (max-width: 1250px) {
      & {
        height: min(24.5rem, calc((100vw - 4rem) * 0.38889));
      }
    }
    @media (min-width: 701px) {
      & {
        height: min(21rem, calc((100vw - 64px) * 0.38889));
      }
    }
  `,
);

export const Banner = styled('button', {
  label: 'Banner',
  target: 'e-i-2',
})<BannerStyleProps>(
  ({ $variant, $position }) => css`
    & {
      position: absolute;
      top: 0;
      left: 50%;
      width: 63rem;
      height: 24.5rem;
      border-radius: 2.45rem;
      text-align: left;
      overflow: hidden;
      isolation: isolate;
      transition:
        transform 0.4s ease,
        opacity 0.4s ease;
      transform: translateX(-50%);
    }
    ${
      $position === 'active' &&
      css`
        && {
          z-index: 2;
        }
      `
    }
    ${
      $position === 'previous' &&
      css`
        && {
          transform: translateX(calc(-150% - 1.5rem));
          opacity: 0.45;
        }
      `
    }
  ${
      $position === 'next' &&
      css`
        && {
          transform: translateX(calc(50% + 1.5rem));
          opacity: 0.45;
        }
      `
    }
  ${
      $variant === 'recommend' &&
      css`
        & {
          background: ${colors.banner.pickBg};
        }
      `
    }
  ${
      $variant === 'hot' &&
      css`
        & {
          background: ${colors.banner.hotBg};
        }
      `
    }
  ${
      $variant === 'live' &&
      css`
        & {
          background: ${colors.banner.liveBg};
        }
      `
    }
  ${
      $variant === 'hot' &&
      css`
        & ${Copy} {
          top: 5.425rem;
        }
      `
    }
  ${
      $variant === 'hot' &&
      css`
        & ${Pill} {
          left: 48.825rem;
          top: 19.25rem;
        }
      `
    }
  @media (max-width: 1250px) {
      & {
        scale: 0.85;
      }
    }
    ${
      $position === 'previous' &&
      css`
        @media (max-width: 1250px) {
          && {
            transform: translateX(calc(-150% - 1.5rem));
          }
        }
      `
    }
    ${
      $position === 'next' &&
      css`
        @media (max-width: 1250px) {
          && {
            transform: translateX(calc(50% + 1.5rem));
          }
        }
      `
    }
  @media (max-width: 700px) {
      & {
        scale: none;
        width: calc(100vw - 2rem);
        height: calc((100vw - 2rem) * 0.38889);
        border-radius: 1rem;
      }
    }
    ${
      $variant === 'hot' &&
      css`
        @media (max-width: 700px) {
          & ${Copy} {
            top: 22.14%;
          }
        }
      `
    }
    ${
      $variant === 'hot' &&
      css`
        @media (max-width: 700px) {
          & ${Pill} {
            left: 77.5%;
            top: 78.57%;
          }
        }
      `
    }
  @media (min-width: 701px) and (max-width: 1250px) {
      & {
        width: min(63rem, calc(100vw - 4rem));
        height: auto;
        aspect-ratio: 1008 / 392;
        scale: 1;
        container-type: inline-size;
      }
    }
    ${
      $variant === 'hot' &&
      css`
        @media (min-width: 701px) and (max-width: 1250px) {
          & ${Copy} {
            top: 22.14%;
          }
        }
      `
    }
    ${
      $variant === 'hot' &&
      css`
        @media (min-width: 701px) and (max-width: 1250px) {
          & ${Pill} {
            left: 77.5%;
            top: 78.57%;
          }
        }
      `
    }
  @media (min-width: 701px) {
      & {
        width: min(54rem, calc(100vw - 64px));
        height: auto;
        aspect-ratio: 1008 / 392;
        scale: 1;
        container-type: inline-size;
        border-radius: 1.75rem;
      }
    }
    ${
      $variant === 'hot' &&
      css`
        @media (min-width: 701px) {
          & ${Copy} {
            top: 22.14%;
          }
        }
      `
    }
    ${
      $variant === 'hot' &&
      css`
        @media (min-width: 701px) {
          & ${Pill} {
            left: 77.5%;
            top: 78.57%;
          }
        }
      `
    }
  `,
);

export const Art = styled('span', {
  label: 'Art',
  target: 'e-i-3',
})(
  () => css`
    & {
      position: absolute;
      inset: 0;
      z-index: -1;
    }
    & > img {
      position: absolute;
      width: 63rem;
      height: 24.5rem;
      object-fit: fill;
      left: 0;
      top: 0;
    }
    & > img[src$='hot-deco.svg'] {
      width: 71.75rem;
      height: 57.75rem;
    }
    & > img[src$='hot-cyan.svg'] {
      top: -0.875rem;
    }
    @media (max-width: 700px) {
      & {
        width: 100%;
        height: 100%;
        zoom: 1;
        transform: none;
      }
    }
    @media (max-width: 700px) {
      & > img {
        width: 100%;
        height: 100%;
      }
    }
    @media (max-width: 700px) {
      & > img[src$='hot-deco.svg'] {
        width: 113.89%;
        height: 235.71%;
      }
    }
    @media (max-width: 700px) {
      & > img[src$='hot-cyan.svg'] {
        top: -3.57%;
      }
    }
    @media (min-width: 701px) and (max-width: 1250px) {
      & > img {
        width: 100%;
        height: 100%;
      }
    }
    @media (min-width: 701px) and (max-width: 1250px) {
      & > img[src$='hot-deco.svg'] {
        width: 113.89%;
        height: 235.71%;
      }
    }
    @media (min-width: 701px) and (max-width: 1250px) {
      & > img[src$='hot-cyan.svg'] {
        top: -3.57%;
      }
    }
    @media (min-width: 701px) {
      & > img {
        width: 100%;
        height: 100%;
      }
    }
    @media (min-width: 701px) {
      & > img[src$='hot-deco.svg'] {
        width: 113.89%;
        height: 235.71%;
      }
    }
    @media (min-width: 701px) {
      & > img[src$='hot-cyan.svg'] {
        top: -3.57%;
      }
    }
  `,
);

export const YellowTag = styled('span', {
  label: 'YellowTag',
  target: 'e-i-4',
})(
  () => css`
    & {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: 'Black Han Sans', sans-serif;
      font-size: 3.5rem;
      white-space: nowrap;
    }
    & small {
      font-family: 'Noto Sans KR', sans-serif;
      font-size: 1.4rem;
      font-weight: 900;
    }
    & {
      left: 45.5rem;
      top: 4.0625rem;
      color: #2a2433;
      transform: rotate(8deg);
    }
    @media (max-width: 700px) {
      & {
        font-size: 5.55vw;
      }
    }
    @media (max-width: 700px) {
      & small {
        font-size: 2.22vw;
      }
    }
    @media (max-width: 700px) {
      & {
        left: 72.22%;
        top: 16.58%;
      }
    }
    @media (min-width: 701px) and (max-width: 1250px) {
      & {
        font-size: 5.55cqw;
      }
    }
    @media (min-width: 701px) and (max-width: 1250px) {
      & small {
        font-size: 2.22cqw;
      }
    }
    @media (min-width: 701px) and (max-width: 1250px) {
      & {
        left: 72.22%;
        top: 16.58%;
      }
    }
    @media (min-width: 701px) {
      & {
        font-size: 5.55cqw;
      }
    }
    @media (min-width: 701px) {
      & small {
        font-size: 2.22cqw;
      }
    }
    @media (min-width: 701px) {
      & {
        left: 72.22%;
        top: 16.58%;
      }
    }
  `,
);

export const CyanTag = styled('span', {
  label: 'CyanTag',
  target: 'e-i-5',
})(
  () => css`
    & {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: 'Black Han Sans', sans-serif;
      font-size: 3.5rem;
      white-space: nowrap;
    }
    & small {
      font-family: 'Noto Sans KR', sans-serif;
      font-size: 1.4rem;
      font-weight: 900;
    }
    & {
      left: 45.6875rem;
      top: 12.25rem;
      color: #1b3b57;
      transform: rotate(-8deg);
    }
    @media (max-width: 700px) {
      & {
        font-size: 5.55vw;
      }
    }
    @media (max-width: 700px) {
      & small {
        font-size: 2.22vw;
      }
    }
    @media (max-width: 700px) {
      & {
        left: 72.52%;
        top: 50%;
      }
    }
    @media (min-width: 701px) and (max-width: 1250px) {
      & {
        font-size: 5.55cqw;
      }
    }
    @media (min-width: 701px) and (max-width: 1250px) {
      & small {
        font-size: 2.22cqw;
      }
    }
    @media (min-width: 701px) and (max-width: 1250px) {
      & {
        left: 72.52%;
        top: 50%;
      }
    }
    @media (min-width: 701px) {
      & {
        font-size: 5.55cqw;
      }
    }
    @media (min-width: 701px) {
      & small {
        font-size: 2.22cqw;
      }
    }
    @media (min-width: 701px) {
      & {
        left: 72.52%;
        top: 50%;
      }
    }
  `,
);

export const Copy = styled('span', {
  label: 'Copy',
  target: 'e-i-6',
})(
  () => css`
    & {
      position: absolute;
      left: 3.85rem;
      top: 3.85rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    & > strong {
      font-family: 'Black Han Sans', sans-serif;
      font-weight: 400;
      font-size: 4.025rem;
      line-height: 4.9rem;
    }
    & em {
      color: ${colors.banner.highlight};
      font-style: normal;
    }
    @media (max-width: 700px) {
      & {
        left: 6.11%;
        top: 15.71%;
        gap: 1.9vw;
      }
    }
    @media (max-width: 700px) {
      & > strong {
        font-size: 6.39vw;
        line-height: 1.22;
      }
    }
    @media (min-width: 701px) and (max-width: 1250px) {
      & {
        left: 6.11%;
        top: 15.71%;
        gap: 1.98cqw;
      }
    }
    @media (min-width: 701px) and (max-width: 1250px) {
      & > strong {
        font-size: 6.389cqw;
        line-height: 1.22;
      }
    }
    @media (min-width: 701px) {
      & {
        left: 6.11%;
        top: 15.71%;
        gap: 1.98cqw;
      }
    }
    @media (min-width: 701px) {
      & > strong {
        font-size: 6.389cqw;
        line-height: 1.22;
      }
    }
  `,
);

export const Eyebrow = styled('span', {
  label: 'Eyebrow',
  target: 'e-i-7',
})(
  () => css`
    & {
      font-size: 1.75rem;
      font-weight: 500;
      line-height: 2.45rem;
      color: ${colors.banner.sub};
    }
    @media (max-width: 700px) {
      & {
        font-size: 2.78vw;
        line-height: 1.4;
      }
    }
    @media (min-width: 701px) and (max-width: 1250px) {
      & {
        font-size: 2.78cqw;
        line-height: 1.4;
      }
    }
    @media (min-width: 701px) {
      & {
        font-size: 2.78cqw;
        line-height: 1.4;
      }
    }
  `,
);

export const Pill = styled('span', {
  label: 'Pill',
  target: 'e-i-8',
})(
  () => css`
    & {
      position: absolute;
      left: 3.85rem;
      top: 18.725rem;
      padding: 0.525rem 1.4rem;
      background: ${colors.banner.pill};
      border-radius: 62.4375rem;
      font-size: 1.4875rem;
      font-weight: 500;
      line-height: 2.1rem;
    }
    @media (max-width: 700px) {
      & {
        left: 6.11%;
        top: 76.43%;
        font-size: 2.36vw;
        line-height: 1.4;
        padding: 0.83vw 2.22vw;
      }
    }
    @media (min-width: 701px) and (max-width: 1250px) {
      & {
        left: 6.11%;
        top: 76.43%;
        padding: 0.833cqw 2.22cqw;
        font-size: 2.36cqw;
        line-height: 1.4;
      }
    }
    @media (min-width: 701px) {
      & {
        left: 6.11%;
        top: 76.43%;
        padding: 0.833cqw 2.22cqw;
        font-size: 2.36cqw;
        line-height: 1.4;
      }
    }
  `,
);

export const Board = styled('span', {
  label: 'Board',
  target: 'e-i-9',
})(
  () => css`
    & {
      position: absolute;
      left: 42.875rem;
      top: 14.875rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 0.35rem;
    }
    & > span {
      font-size: 1.225rem;
      font-weight: 700;
      color: #7a7e8c;
    }
    & > strong {
      font-family: 'Black Han Sans', sans-serif;
      color: #2a2433;
      font-size: 2.625rem;
      font-weight: 400;
    }
    @media (max-width: 700px) {
      & {
        left: 68.05%;
        top: 60.71%;
        gap: 0.55vw;
      }
    }
    @media (max-width: 700px) {
      & > span {
        font-size: 1.94vw;
      }
    }
    @media (max-width: 700px) {
      & > strong {
        font-size: 4.16vw;
      }
    }
    @media (min-width: 701px) and (max-width: 1250px) {
      & {
        left: 68.05%;
        top: 60.71%;
        gap: 0.55cqw;
      }
    }
    @media (min-width: 701px) and (max-width: 1250px) {
      & > span {
        font-size: 1.944cqw;
      }
    }
    @media (min-width: 701px) and (max-width: 1250px) {
      & > strong {
        font-size: 4.167cqw;
      }
    }
    @media (min-width: 701px) {
      & {
        left: 68.05%;
        top: 60.71%;
        gap: 0.55cqw;
      }
    }
    @media (min-width: 701px) {
      & > span {
        font-size: 1.944cqw;
      }
    }
    @media (min-width: 701px) {
      & > strong {
        font-size: 4.167cqw;
      }
    }
  `,
);

export const Dots = styled('div', {
  label: 'Dots',
  target: 'e-i-a',
})(
  () => css`
    & {
      display: flex;
      gap: 0.375rem;
      justify-content: center;
      margin-top: 1.25rem;
      height: 0.5rem;
    }
    & button {
      position: relative;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 0.25rem;
      background: ${colors.fill.strong};
    }
    & button::after {
      content: '';
      position: absolute;
      inset: -0.625rem -2px;
    }
    @media (max-width: 700px) {
      & {
        margin-top: 1rem;
      }
    }
    @media (min-width: 701px) {
      & {
        margin-top: 1rem;
      }
    }
  `,
);

export const Dot = styled('button', {
  label: 'Dot',
  target: 'e-i-b',
})<DotStyleProps>(
  ({ $selected }) => css`
    ${
      $selected === true &&
      css`
        ${Dots} & {
          width: 1.5rem;
          background: ${colors.static.white};
        }
      `
    }
  `,
);
