import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { RankingAsset } from './RankingAsset';

interface PlaceStyleProps {
  $place?: number;
}

interface BadgeStyleProps {
  $place?: number;
}

interface LayerStyleProps {
  $layer?: string;
  $place?: number;
}

export const Scene = styled('section', {
  label: 'Scene',
  target: 'e-c-0',
})`
  & {
    height: 47.7273cqw;
    position: relative;
    pointer-events: none;
  }
  @media (max-width: 1250px) {
    & {
      height: 65.5909cqw;
      overflow: hidden;
    }
  }
  @media (max-width: 900px) {
    & {
      height: 75.9091cqw;
    }
  }
  @media (max-width: 700px) {
    & {
      height: 62cqw;
      overflow: hidden;
    }
    & {
      height: 87.84cqw;
    }
  }
`;

export const Canvas = styled.div`
  position: absolute;
  inset: 0;
  container-type: inline-size;
  @media (min-width: 701px) and (max-width: 1250px) {
    width: 150%;
    left: -12.5%;
    top: -6cqw;
  }
  @media (min-width: 701px) and (max-width: 900px) {
    width: 180%;
    left: -25%;
    top: -10cqw;
  }
`;

export const StageArt = styled(RankingAsset, {
  label: 'StageArt',
  target: 'e-c-1',
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})`
  & {
    position: absolute;
    width: 100%;
    height: auto;
    inset: 0;
  }
  @media (max-width: 700px) {
    & {
      width: 135%;
      left: -10%;
    }
    & {
      width: 205%;
      left: -33.3%;
      top: -10cqw;
    }
  }
`;

export const Place = styled('div', {
  label: 'Place',
  target: 'e-c-2',
})<PlaceStyleProps>(
  ({ $place }) => css`
    & {
      position: absolute;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    & > strong {
      font-weight: 900;
      line-height: 1;
    }
    ${
      $place === 1 &&
      css`
        & {
          left: 38.5227%;
          top: 35.2273cqw;
          width: 4.2045%;
          gap: 0.3409cqw;
        }
      `
    }
    ${
      $place === 1 &&
      css`
        & > strong {
          font-size: 5.2273cqw;
          text-shadow: 0 0.3125rem #d98a00;
        }
      `
    }
  ${
      $place === 1 &&
      css`
        & > img {
          width: 100%;
          height: auto;
        }
      `
    }
  ${
      $place === 2 &&
      css`
        & {
          left: 23.0682%;
          top: 38.8636cqw;
          width: 3.2955%;
          gap: 0.3409cqw;
        }
      `
    }
  ${
      $place === 2 &&
      css`
        & > strong {
          font-size: 3.9773cqw;
          text-shadow: 0 0.3125rem #8e9caa;
        }
      `
    }
  ${
      $place === 2 &&
      css`
        & > img {
          width: 100%;
          height: auto;
        }
      `
    }
  ${
      $place === 3 &&
      css`
        & {
          left: 55.2273%;
          top: 40.7955cqw;
          width: 2.6136%;
          gap: 0.1136cqw;
        }
      `
    }
  ${
      $place === 3 &&
      css`
        & > strong {
          font-size: 3.0682cqw;
          text-shadow: 0 0.3125rem #a4613a;
        }
      `
    }
  ${
      $place === 3 &&
      css`
        & > img {
          width: 100%;
          height: auto;
        }
      `
    }
  @media (max-width: 700px) {
      & {
        transform: scale(1.35);
        transform-origin: top left;
      }
    }
    ${
      $place === 1 &&
      css`
        @media (max-width: 700px) {
          & {
            left: 42.0057%;
            top: 47.55cqw;
          }
        }
      `
    }
    ${
      $place === 2 &&
      css`
        @media (max-width: 700px) {
          & {
            left: 21.14%;
            top: 52.46cqw;
          }
        }
      `
    }
  ${
      $place === 3 &&
      css`
        @media (max-width: 700px) {
          & {
            left: 64.56%;
            top: 55.07cqw;
          }
        }
      `
    }
  @media (max-width: 700px) {
      & {
        transform: scale(2.05);
      }
    }
    ${
      $place === 1 &&
      css`
        @media (max-width: 700px) {
          & {
            left: 45.6715%;
            top: 62.2159cqw;
          }
        }
      `
    }
    ${
      $place === 2 &&
      css`
        @media (max-width: 700px) {
          & {
            left: 13.9898%;
            top: 69.6704cqw;
          }
        }
      `
    }
  ${
      $place === 3 &&
      css`
        @media (max-width: 700px) {
          & {
            left: 79.916%;
            top: 73.6308cqw;
          }
        }
      `
    }
  `,
);

export const Badge = styled('article', {
  label: 'Badge',
  target: 'e-c-3',
})<BadgeStyleProps>(
  ({ $place }) => css`
    & {
      position: absolute;
      width: 24.0909%;
      aspect-ratio: 424 / 387;
    }
    ${
      $place === 1 &&
      css`
        & {
          left: 27.7841%;
          top: 9.0301cqw;
          width: 25.6818%;
          aspect-ratio: 1;
          z-index: 1;
        }
      `
    }
    ${
      $place === 2 &&
      css`
        & {
          left: 12.6705%;
          top: 16.3563cqw;
        }
      `
    }
  ${
      $place === 3 &&
      css`
        & {
          left: 44.4886%;
          top: 18.629cqw;
        }
      `
    }
  ${
      $place === 3 &&
      css`
        & ${Score} {
          background: #7e3d1c73;
        }
      `
    }
  ${
      $place === 3 &&
      css`
        & ${User} > strong {
          text-shadow: 0 1.5px 2px #7e3d1c99;
        }
      `
    }
  ${
      $place === 3 &&
      css`
        & ${CrownNumber} {
          text-shadow: 0 1.5px #a4613a;
        }
      `
    }
  ${
      $place === 1 &&
      css`
        & ${CrownNumber} {
          left: 48.4513%;
          top: 10.385%;
          font-size: 1.25cqw;
          text-shadow: 0 1.5px #d98a00;
        }
      `
    }
  ${
      $place === 1 &&
      css`
        & ${User} {
          top: 58.9978%;
        }
      `
    }
  ${
      $place === 1 &&
      css`
        & ${User} > img {
          width: 2.0455cqw;
          height: 2.0455cqw;
        }
      `
    }
  ${
      $place === 1 &&
      css`
        & ${User} > strong {
          font-size: 1.25rem;
          text-shadow: 0 1.5px 2px #9a530099;
        }
      `
    }
  ${
      $place === 1 &&
      css`
        & ${Score} {
          top: 69.1748%;
          background: #9a530073;
        }
      `
    }
  @media (max-width: 700px) {
      & {
        transform: scale(1.35);
        transform-origin: top left;
      }
    }
    ${
      $place === 1 &&
      css`
        @media (max-width: 700px) {
          & {
            left: 27.5%;
            top: 12.19cqw;
          }
        }
      `
    }
    ${
      $place === 2 &&
      css`
        @media (max-width: 700px) {
          & {
            left: 7.1%;
            top: 22.08cqw;
          }
        }
      `
    }
  ${
      $place === 3 &&
      css`
        @media (max-width: 700px) {
          & {
            left: 50.1%;
            top: 25.15cqw;
          }
        }
      `
    }
  @media (max-width: 700px) {
      & {
        transform: scale(2.05);
      }
    }
    ${
      $place === 1 &&
      css`
        @media (max-width: 700px) {
          & {
            left: 23.6574%;
            top: 8.5117cqw;
          }
        }
      `
    }
    ${
      $place === 2 &&
      css`
        @media (max-width: 700px) {
          & {
            left: -7.3255%;
            top: 23.5304cqw;
          }
        }
      `
    }
  ${
      $place === 3 &&
      css`
        @media (max-width: 700px) {
          & {
            left: 57.9016%;
            top: 28.1895cqw;
          }
        }
      `
    }
  ${
      $place === 1 &&
      css`
        @media (max-width: 700px) {
          & ${User} > strong {
            font-size: 1.7cqw;
          }
        }
      `
    }
  ${
      $place === 1 &&
      css`
        @media (max-width: 700px) {
          & ${Score} {
            font-size: 1.15cqw;
          }
        }
      `
    }
  `,
);

export const Layer = styled(RankingAsset, {
  label: 'Layer',
  target: 'e-c-4',
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<LayerStyleProps>(
  ({ $layer, $place }) => css`
    & {
      position: absolute;
      object-fit: fill;
    }
    ${
      $layer === 'deco' &&
      css`
        & {
          inset: 0;
          width: 100%;
          height: 100%;
        }
      `
    }
    ${
      $layer === 'sparkles' &&
      css`
        & {
          inset: 0;
          width: 100%;
          height: 100%;
        }
      `
    }
  ${
      $layer === 'shadow' &&
      css`
        & {
          left: 33.5142%;
          top: 95.3747%;
          width: 32.9717%;
          height: 3.6176%;
        }
      `
    }
  ${
      $layer === 'shield' &&
      css`
        & {
          left: 28.3019%;
          top: 36.6925%;
          width: 43.3962%;
          height: 61.4987%;
        }
      `
    }
  ${
      $layer === 'inner' &&
      css`
        & {
          left: 29.717%;
          top: 38.2429%;
          width: 40.566%;
          height: 56.0724%;
        }
      `
    }
  ${
      $layer === 'medal' &&
      css`
        & {
          left: 35.3774%;
          top: 16.261%;
          width: 29.2453%;
          height: 37.4677%;
        }
      `
    }
  ${
      $layer === 'crown' &&
      css`
        & {
          left: 43.6321%;
          top: 9.4315%;
          width: 12.7358%;
          height: 10.9638%;
        }
      `
    }
  ${
      $place === 3 &&
      $layer === 'medal' &&
      css`
        & {
          top: 16.0026%;
        }
      `
    }
  ${
      $place === 1 &&
      $layer === 'shadow' &&
      css`
        & {
          left: 32.1681%;
          top: 96.0398%;
          width: 35.6637%;
          height: 3.0973%;
        }
      `
    }
  ${
      $place === 1 &&
      $layer === 'shield' &&
      css`
        & {
          left: 26.5487%;
          top: 36.7257%;
          width: 46.9027%;
          height: 61.7257%;
        }
      `
    }
  ${
      $place === 1 &&
      $layer === 'inner' &&
      css`
        & {
          left: 27.8761%;
          top: 38.0531%;
          width: 44.2478%;
          height: 57.0796%;
        }
      `
    }
  ${
      $place === 1 &&
      $layer === 'medal' &&
      css`
        & {
          left: 33.1858%;
          top: 14.6615%;
          width: 33.6283%;
          height: 39.1593%;
        }
      `
    }
  ${
      $place === 1 &&
      $layer === 'crown' &&
      css`
        & {
          left: 42.6991%;
          top: 6.9491%;
          width: 14.6018%;
          height: 11.4735%;
        }
      `
    }
  `,
);

export const CrownNumber = styled('strong', {
  label: 'CrownNumber',
  target: 'e-c-5',
})`
  & {
    position: absolute;
    left: 48.7028%;
    top: 12.62%;
    font-size: 1.0227cqw;
    font-weight: 900;
    text-shadow: 0 1.5px #8e9caa;
    line-height: 1.5;
  }
`;

export const User = styled('div', {
  label: 'User',
  target: 'e-c-6',
})`
  & {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 58.225%;
    display: flex;
    align-items: center;
    gap: 0.4545cqw;
    white-space: nowrap;
  }
  & > img {
    width: 1.8182cqw;
    height: 1.8182cqw;
  }
  & > strong {
    font-size: 1.0625rem;
    text-shadow: 0 1.5px 2px #4a5b6e99;
  }
  @media (max-width: 700px) {
    & {
      justify-content: center;
    }
    & > img {
      display: none;
    }
    & > strong {
      font-size: 1.6cqw;
    }
  }
`;

export const Score = styled('div', {
  label: 'Score',
  target: 'e-c-7',
})`
  & {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 69.0775%;
    display: flex;
    align-items: center;
    gap: 0.2841cqw;
    padding: 0.1705cqw 0.6818cqw 0.1705cqw 0.5682cqw;
    border-radius: 62.4375rem;
    font-size: 0.8125rem;
    background: #4a5b6e73;
    white-space: nowrap;
  }
  & > img {
    width: 0.7955cqw;
    height: 0.7955cqw;
    object-fit: contain;
  }
  @media (max-width: 700px) {
    & {
      font-size: 1.15cqw;
    }
  }
`;
