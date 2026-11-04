import { detailSize as size } from '../../domains/problem/presentation/problemDetailSize';
import * as Example from '../../domains/problem/presentation/ProblemExample.styles';
import { colors } from '../../shared/styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ProblemDetailAsset } from '../../domains/problem/presentation/ProblemDetailAsset';

export const Page = styled('main', {
  label: 'Page',
  target: 'e-k-0',
})(
  () => css`
    --detail-scale: clamp(0.875px, calc(0.5px + 0.026041667vw), 1px);
    --detail-gutter: clamp(24px, 4.166667vw, 80px);
    @media (max-width: 700px) {
      --detail-scale: 0.875px;
      --detail-gutter: 20px;
    }
  `,
);

export const Content = styled('div', {
  label: 'Content',
  target: 'e-k-1',
})(
  () => css`
    & {
      padding: ${size(48)} var(--detail-gutter) ${size(30)};
      max-width: 1920px;
      margin-inline: auto;
      min-height: ${size(964)};
      display: grid;
      grid-template-columns: minmax(0, 1160fr) minmax(0, 536fr);
      gap: ${size(64)};
      align-items: start;
    }
    @media (max-width: 1600px) {
      & {
        padding-inline: var(--detail-gutter);
        gap: ${size(40)};
        grid-template-columns: minmax(0, 1160fr) minmax(0, 536fr);
      }
    }
    @media (max-width: 1100px) {
      & {
        grid-template-columns: 1fr;
        padding: ${size(32)} var(--detail-gutter);
        min-height: 0;
        gap: ${size(40)};
      }
    }
    @media (max-width: 700px) {
      & {
        padding: ${size(28)} ${size(20)} ${size(32)};
        gap: ${size(32)};
      }
    }
  `,
);

export const Statement = styled('article', {
  label: 'Statement',
  target: 'e-k-2',
})(
  () => css`
    & {
      min-width: 0;
      & > ${Example.Section} {
        gap: ${size(14)};
      }
      & h2 {
        font-size: ${size(24)};
        line-height: ${size(32)};
      }
      & > ${Example.Section} > p {
        font-size: ${size(18)};
        line-height: ${size(30)};
      }
      & ${Example.Grid} {
        gap: ${size(24)};
      }
      & ${Example.Code} {
        gap: ${size(10)};
        h3,
        button {
          font-size: ${size(16)};
          line-height: ${size(24)};
        }
        pre {
          padding: ${size(16)} ${size(20)};
          height: ${size(236)};
          font-size: ${size(16)};
          line-height: ${size(26)};
        }
      }
      display: flex;
      flex-direction: column;
      gap: ${size(48)};
    }
    @media (max-width: 700px) {
      & {
        gap: ${size(32)};
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
      font-size: ${size(18)};
      line-height: ${size(30)};
      overflow-wrap: anywhere;
    }
    & {
      display: flex;
      flex-direction: column;
      gap: ${size(10)};
    }
    & li {
      position: relative;
      padding-left: ${size(16)};
    }
    & li::before {
      content: '';
      position: absolute;
      top: ${size(12)};
      left: 0;
      width: ${size(6)};
      height: ${size(6)};
      border-radius: 50%;
      background: ${theme.colors.primary.normal};
    }
    @media (max-width: 700px) {
      & {
        font-size: ${size(18)};
        line-height: ${size(30)};
      }
    }
  `,
);

export const Sidebar = styled('div', {
  label: 'Sidebar',
  target: 'e-k-4',
})(
  () => css`
    & {
      position: relative;
      min-width: 0;
    }
    @media (max-width: 1100px) {
      & {
        max-width: ${size(650)};
        width: 100%;
        justify-self: center;
      }
    }
  `,
);

export const Mascot = styled(ProblemDetailAsset)`
  position: absolute;
  left: 50%;
  top: ${size(-192)};
  transform: translateX(-50%);
  width: ${size(300)};
  height: ${size(199)};
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
      padding: ${size(100)} ${size(24)};
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: ${size(24)};
      text-align: center;
    }
    & h1 {
      font-size: ${size(28)};
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
