import { colors, alpha } from '../../../shared/styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Avatar } from '../../../shared/ui/Avatar';
import type { FriendCardTone } from '../domain/problem';

interface FriendArtStyleProps {
  $tone: FriendCardTone;
}

export const Root = styled('div', {
  label: 'Root',
  target: 'e-5-0',
})`
  & {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 2.5rem;
  }
  @media (max-width: 1600px) {
    & {
      gap: 1.5rem;
    }
  }
  @media (max-width: 1200px) {
    & {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
  @media (min-width: 701px) {
    & {
      gap: 1.75rem;
    }
  }
`;

export const Recommendations = styled('section', {
  label: 'Recommendations',
  target: 'e-5-1',
})(
  () => css`
    & {
      min-width: 0;
    }
    & {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-self: start;
    }
    @media (max-width: 1200px) {
      & {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      & > ${Heading} {
        grid-column: 1 / -1;
      }
    }
    @media (max-width: 850px) {
      & {
        grid-template-columns: 1fr;
      }
    }
  `,
);

export const Heading = styled('div', {
  label: 'Heading',
  target: 'e-5-2',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      min-height: 2rem;
    }
    & h2 {
      white-space: nowrap;
    }
    & p {
      color: ${theme.colors.label.alternative};
      font-size: 0.875rem;
      line-height: 1.375rem;
    }
    @media (max-width: 1600px) {
      & {
        flex-wrap: wrap;
        gap: 0.25rem 0.625rem;
      }
    }
    @media (max-width: 550px) {
      & h2 {
        font-size: 1.25rem;
        line-height: 1.75rem;
      }
      & p {
        font-size: 0.75rem;
        line-height: 1.25rem;
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

export const Recommendation = styled('button', {
  label: 'Recommendation',
  target: 'e-5-3',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      width: 100%;
      text-align: left;
      padding: 1.125rem 1.5rem;
      background: ${theme.colors.background.elevated};
      border: 1px solid ${theme.colors.line.alternative};
      border-radius: 1.25rem;
    }
    & > img {
      width: 5rem;
      height: 5rem;
    }
    @media (max-width: 1600px) {
      & {
        padding: 1.125rem 1rem;
        gap: 0.75rem;
      }
      & > img {
        width: 4rem;
        height: 4rem;
      }
    }
    @media (max-width: 1200px) {
      & {
        min-width: 0;
      }
    }
    @media (max-width: 550px) {
      & {
        padding: 1rem 0.75rem;
        border-radius: 1rem;
      }
      & > img {
        width: 3rem;
        height: 3rem;
      }
    }
    @media (min-width: 701px) {
      & {
        padding: 0.875rem 1rem;
        gap: 1rem;
      }
      & > img {
        width: 4rem;
        height: 4rem;
      }
    }
  `,
);

export const Copy = styled('span', {
  label: 'Copy',
  target: 'e-5-4',
})(
  ({ theme }) => css`
    & {
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      flex: 1;
    }
    & > small {
      color: ${theme.colors.label.alternative};
      font-size: 0.75rem;
      line-height: 1.125rem;
    }
    @media (max-width: 550px) {
      & {
        gap: 0.25rem;
      }
      & > small {
        font-size: 0.625rem;
      }
    }
  `,
);

export const Title = styled('span', {
  label: 'Title',
  target: 'e-5-5',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    & > span {
      color: ${theme.colors.label.alternative};
      font-size: 0.875rem;
      font-weight: 700;
      line-height: 1.25rem;
    }
    & > strong {
      font-size: 1.125rem;
      line-height: 1.625rem;
      letter-spacing: -0.2px;
    }
    @media (max-width: 1600px) {
      & > strong {
        font-size: 1rem;
      }
    }
    @media (max-width: 1200px) {
      & {
        flex-wrap: wrap;
        gap: 0.25rem 0.5rem;
      }
    }
    @media (max-width: 550px) {
      & > span {
        font-size: 0.75rem;
      }
      & > strong {
        font-size: 0.875rem;
        line-height: 1.375rem;
      }
    }
  `,
);

export const Reason = styled('span', {
  label: 'Reason',
  target: 'e-5-6',
})(
  ({ theme }) => css`
    & {
      color: ${theme.colors.label.neutral};
      font-size: 0.875rem;
      line-height: 1.375rem;
    }
    @media (max-width: 1600px) {
      & {
        font-size: 0.75rem;
      }
    }
    @media (max-width: 1200px) {
      & {
        line-height: 1.25rem;
      }
    }
  `,
);

export const Xp = styled('span', {
  label: 'Xp',
  target: 'e-5-7',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.375rem 0.75rem 0.375rem 0.5rem;
      background: ${theme.colors.fill.normal};
      border-radius: 62.4375rem;
      font-size: 0.75rem;
      font-weight: 700;
      line-height: 1rem;
      white-space: nowrap;
    }
    & > img {
      width: 1rem;
      height: 1rem;
      object-fit: contain;
    }
    @media (max-width: 1200px) {
      & {
        font-size: 0.625rem;
        padding-inline: 0.375rem;
      }
    }
    @media (max-width: 550px) {
      & {
        gap: 2px;
        padding: 0.25rem 0.375rem;
      }
      & > img {
        width: 0.75rem;
        height: 0.75rem;
      }
    }
  `,
);

export const Friends = styled('section', {
  label: 'Friends',
  target: 'e-5-8',
})`
  & {
    min-width: 0;
  }
`;

export const FriendGrid = styled('div', {
  label: 'FriendGrid',
  target: 'e-5-9',
})`
  & {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 1rem;
    margin-top: 1rem;
  }
  @media (max-width: 1200px) {
    & {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
  @media (max-width: 850px) {
    & {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (max-width: 550px) {
    & {
      gap: 0.75rem;
    }
  }
`;

export const FriendCard = styled('button', {
  label: 'FriendCard',
  target: 'e-5-a',
})(
  ({ theme }) => css`
    & {
      text-align: left;
      overflow: hidden;
      background: ${theme.colors.background.elevated};
      border: 1px solid ${theme.colors.line.alternative};
      border-radius: 1.25rem;
      min-width: 0;
    }
    @media (max-width: 550px) {
      & {
        border-radius: 1rem;
      }
    }
  `,
);

export const FriendArt = styled('span', {
  label: 'FriendArt',
  target: 'e-5-b',
})<FriendArtStyleProps>(
  ({ $tone }) => css`
    & {
      display: block;
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 9.375rem;
      background: ${colors.friendCard[$tone]};
    }
    @media (max-width: 1200px) {
      & {
        height: 7.5rem;
      }
    }
    @media (max-width: 850px) {
      & {
        height: 9.375rem;
      }
    }
    @media (max-width: 550px) {
      & {
        height: 6.5625rem;
      }
    }
    @media (min-width: 701px) {
      & {
        height: 8rem;
      }
    }
  `,
);

export const FriendAvatar = styled(Avatar)`
  position: absolute;
  left: 50%;
  top: 6.666667%;
  transform: translateX(-50%);
  height: 109.333333%;
  width: auto;
  aspect-ratio: 1;
`;

export const FriendBadge = styled.span`
  position: absolute;
  top: 6.666667%;
  right: 2.380952%;
  display: grid;
  place-items: center;
  height: 32%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: ${colors.line.normal};
  box-shadow: 0 0.3125rem 0 ${alpha(colors.static.black, 0.2)};

  img {
    width: 58.333333%;
    height: auto;
  }
`;

export const FriendBody = styled('span', {
  label: 'FriendBody',
  target: 'e-5-c',
})(
  () => css`
    & {
      padding: 1rem 1.25rem 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      align-items: flex-start;
    }
    @media (max-width: 1600px) {
      & {
        padding-inline: 0.875rem;
      }
    }
    @media (max-width: 550px) {
      & {
        padding: 0.75rem 0.625rem 0.875rem;
        gap: 0.375rem;
      }
      & ${Title} > strong {
        font-size: 0.8125rem;
      }
      & ${Title} {
        gap: 0.1875rem 0.375rem;
      }
    }
  `,
);

export const FriendAuthor = styled('span', {
  label: 'FriendAuthor',
  target: 'e-5-d',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.75rem;
      line-height: 1.125rem;
    }
    & > strong {
      font-size: 0.75rem;
      line-height: 1rem;
    }
    & > span {
      color: ${theme.colors.label.alternative};
    }
    @media (max-width: 1200px) {
      & {
        flex-wrap: wrap;
        gap: 2px;
      }
    }
    @media (max-width: 550px) {
      & > strong {
        font-size: 0.625rem;
      }
      & > span {
        font-size: 0.625rem;
      }
    }
  `,
);

export const Difficulty = styled('span', {
  label: 'Difficulty',
  target: 'e-5-e',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.25rem 0.75rem 0.25rem 0.375rem;
      background: ${theme.colors.fill.normal};
      border-radius: 62.4375rem;
      font-size: 0.75rem;
      font-weight: 700;
      color: ${colors.accent.waterLight};
      line-height: 1rem;
    }
    & > img {
      width: 1.375rem;
      height: 1.375rem;
      object-fit: contain;
    }
    @media (max-width: 550px) {
      & {
        font-size: 0.625rem;
        padding: 0.1875rem 0.5rem 0.1875rem 0.25rem;
        gap: 0.25rem;
      }
      & > img {
        width: 1.125rem;
        height: 1.125rem;
      }
    }
  `,
);
