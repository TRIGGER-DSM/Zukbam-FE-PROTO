import { detailSize as size } from './problemDetailSize';
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
      padding: ${size(36)} max(var(--detail-gutter), calc((100% - 1760px) / 2));
      background: ${theme.colors.background.elevated};
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: ${size(24)};
    }
    @media (max-width: 1600px) {
      & {
        padding-inline: var(--detail-gutter);
      }
    }
    @media (max-width: 1100px) {
      & {
        padding: ${size(28)} var(--detail-gutter);
      }
    }
    @media (max-width: 700px) {
      & {
        padding: ${size(24)} ${size(20)};
        gap: ${size(20)};
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
      gap: ${size(4)};
      padding: ${size(6)} ${size(14)} ${size(6)} ${size(10)};
      border-radius: ${size(999)};
      background: ${theme.colors.fill.normal};
      color: ${theme.colors.label.neutral};
      font-size: ${size(16)};
      line-height: ${size(26)};
      font-weight: 700;
    }
    & > span {
      font-size: ${size(18)};
    }
    @media (max-width: 700px) {
      & {
        font-size: ${size(14)};
        line-height: ${size(22)};
      }
    }
  `,
);

export const Content = styled('div', {
  label: 'Content',
  target: 'e-3-2',
})(
  () => css`
    & {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: ${size(20)};
      width: 65.909091%;
      @media (max-width: 1100px) {
        width: 100%;
      }
    }
    @media (max-width: 700px) {
      & {
        gap: ${size(20)};
      }
    }
  `,
);

export const Title = styled('div', {
  label: 'Title',
  target: 'e-3-3',
})(
  () => css`
    & {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: ${size(12)};
    }
    & > span {
      padding: ${size(6)} ${size(12)};
      border-radius: ${size(999)};
      background: ${colors.fill.strong};
      font-size: ${size(16)};
      font-weight: 700;
      line-height: ${size(24)};
    }
    & h1 {
      font-size: ${size(32)};
      font-weight: 900;
      line-height: ${size(42)};
      letter-spacing: -0.8px;
    }
    @media (max-width: 700px) {
      & > span {
        font-size: ${size(13)};
        line-height: ${size(20)};
        padding: ${size(5)} ${size(10)};
      }
    }
    @media (max-width: 700px) {
      & h1 {
        font-size: ${size(28)};
        line-height: ${size(38)};
      }
    }
  `,
);

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
      gap: ${size(4)};
      padding: 0 ${size(28)};
    }
    & > div + div {
      border-left: 1px solid ${theme.colors.line.alternative};
    }
    & > div:last-child {
      padding-right: 0;
    }
    & dt {
      color: ${theme.colors.label.assistive};
      font-size: ${size(16)};
      line-height: ${size(26)};
    }
    & dd {
      margin: 0;
      font-size: ${size(24)};
      line-height: ${size(32)};
      font-weight: 700;
      letter-spacing: -0.4px;
    }
    @media (max-width: 700px) {
      & {
        width: 100%;
      }
    }
    @media (max-width: 700px) {
      & > div {
        flex: 1;
        padding: 0 ${size(16)};
        align-items: center;
      }
    }
    @media (max-width: 700px) {
      & > div:first-of-type {
        padding-left: 0;
      }
    }
    @media (max-width: 700px) {
      & > div:last-child {
        padding-right: 0;
      }
    }
    @media (max-width: 700px) {
      & dt {
        font-size: ${size(13)};
        line-height: ${size(22)};
      }
    }
    @media (max-width: 700px) {
      & dd {
        font-size: ${size(21)};
        line-height: ${size(30)};
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
      left: ${size(163)};
      display: flex;
      align-items: center;
      gap: ${size(12)};
      padding: ${size(10)} ${size(16)};
      border-radius: ${size(14)} ${size(14)} ${size(14)} 0;
      background: ${colors.fill.strong};
    }
    & p {
      font-size: ${size(18)};
      line-height: ${size(30)};
      color: ${theme.colors.label.neutral};
      white-space: nowrap;
    }
    & strong {
      font-size: ${size(16)};
      line-height: ${size(24)};
      color: ${colors.static.white};
    }
    @media (max-width: 1100px) {
      & {
        left: ${size(155)};
        gap: ${size(8)};
        padding: ${size(10)} ${size(12)};
      }
    }
    @media (max-width: 1100px) {
      & p {
        font-size: ${size(14)};
      }
    }
    @media (max-width: 1100px) {
      & strong {
        font-size: ${size(14)};
      }
    }
    @media (max-width: 700px) {
      & {
        position: static;
        align-self: flex-start;
        width: 100%;
        padding: ${size(12)};
      }
    }
    @media (max-width: 700px) {
      & p {
        font-size: 14px;
        line-height: 22px;
        white-space: normal;
      }
    }
    @media (max-width: 700px) {
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
      margin-left: ${size(-10)};
    }
    & img {
      width: ${size(36)};
      height: ${size(36)};
    }
    & ${MoreFriends} {
      width: ${size(40)};
      height: ${size(40)};
      display: grid;
      place-items: center;
      border: 2px solid ${theme.colors.background.normal};
      background: ${colors.fill.strong};
      font-size: ${size(16)};
      font-weight: 700;
      color: ${theme.colors.label.neutral};
    }
    @media (max-width: 700px) {
      & > span {
        padding: 2px;
      }
    }
    @media (max-width: 700px) {
      & img {
        width: ${size(26)};
        height: ${size(26)};
      }
    }
    @media (max-width: 700px) {
      & ${MoreFriends} {
        width: ${size(30)};
        height: ${size(30)};
        font-size: ${size(12)};
      }
    }
  `,
);

export const MoreFriends = styled('span', {
  label: 'MoreFriends',
  target: 'e-3-7',
})(() => css``);
