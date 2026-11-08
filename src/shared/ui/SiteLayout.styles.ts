import { colors } from '../styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link } from 'react-router';

export const SkipLink = styled('a', {
  label: 'SkipLink',
  target: 'e-t-0',
})(
  ({ theme }) => css`
    & {
      position: fixed;
      top: -3.75rem;
      left: 0.75rem;
      z-index: 20;
      padding: 0.75rem;
      color: ${colors.static.black};
      background: ${theme.colors.primary.normal};
    }
    &:focus {
      top: 0.75rem;
    }
  `,
);

export const Header = styled('header', {
  label: 'Header',
  target: 'e-t-1',
})(
  ({ theme }) => css`
    & {
      height: 5rem;
      padding: 0 5rem;
      border-bottom: 1px solid ${theme.colors.line.alternative};
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1.5rem;
    }
    & nav {
      display: flex;
      gap: 0.5rem;
    }
    & nav button {
      padding: 0.5rem 1rem;
      border-radius: 62.4375rem;
      color: ${theme.colors.label.alternative};
      font-size: 1.375rem;
      font-weight: 600;
      line-height: 1.875rem;
      letter-spacing: -0.42px;
      white-space: nowrap;
    }
    & nav ${NavLink} {
      padding: 0.5rem 1rem;
      border-radius: 62.4375rem;
      color: ${theme.colors.label.alternative};
      font-size: 1.375rem;
      font-weight: 600;
      line-height: 1.875rem;
      letter-spacing: -0.42px;
      white-space: nowrap;
    }
    & nav [aria-current='page'] {
      color: ${theme.colors.primary.strong};
      background: ${colors.fill.heavy};
    }
    @media (max-width: 1250px) {
      & nav button {
        font-size: 1.125rem;
        padding: 0.5rem 0.75rem;
      }
      & nav ${NavLink} {
        font-size: 1.125rem;
        padding: 0.5rem 0.75rem;
      }
    }
    @media (max-width: 700px) {
      & {
        padding: 0.625rem var(--page-gutter) 0;
        height: 7.25rem;
        align-items: flex-start;
        position: relative;
      }
      & nav {
        position: absolute;
        bottom: 0.625rem;
        left: var(--page-gutter);
        right: var(--page-gutter);
        gap: clamp(0.25rem, 1.5vw, 0.75rem);
      }
      & nav button {
        font-size: 1rem;
        line-height: 1.5rem;
        padding: 0.375rem clamp(0.5rem, 2vw, 0.875rem);
      }
      & nav ${NavLink} {
        font-size: 1rem;
        line-height: 1.5rem;
        padding: 0.375rem clamp(0.5rem, 2vw, 0.875rem);
      }
    }
    @media (min-width: 701px) {
      & {
        height: 60px;
        padding-inline: max(
          var(--page-gutter),
          calc((100% - var(--page-max-width)) / 2 + var(--page-gutter))
        );
      }
      & nav button {
        font-size: 16px;
        line-height: 24px;
        padding: 5px 12px;
      }
      & nav ${NavLink} {
        font-size: 16px;
        line-height: 24px;
        padding: 5px 12px;
      }
    }
  `,
);

export const HeaderContent = styled('div', {
  label: 'HeaderContent',
  target: 'e-t-2',
})`
  & {
    display: flex;
    gap: 3.25rem;
    align-items: center;
  }
  & > a img {
    width: 17.625rem;
    height: 4.4375rem;
  }
  @media (max-width: 1250px) {
    & {
      gap: 1.25rem;
    }
    & > a img {
      width: 13.125rem;
      height: auto;
    }
  }
  @media (max-width: 700px) {
    & > a img {
      width: clamp(7.5rem, 35vw, 10rem);
      height: auto;
    }
  }
  @media (min-width: 701px) {
    & {
      gap: 2rem;
    }
    & > a img {
      width: 14rem;
      height: auto;
    }
  }
`;

export const NavLink = styled(Link, {
  label: 'NavLink',
  target: 'e-t-3',
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})(() => css``);

export const Profile = styled('button', {
  label: 'Profile',
  target: 'e-t-4',
})`
  & {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    font-size: 1.375rem;
    font-weight: 500;
    white-space: nowrap;
  }
  & img {
    border: 2px solid ${colors.line.normal};
    border-radius: 50%;
    width: 2.625rem;
    height: 2.625rem;
  }
  @media (max-width: 1250px) {
    & {
      font-size: 1rem;
      gap: 0.625rem;
    }
  }
  @media (max-width: 700px) {
    & {
      margin-top: 0.25rem;
      font-size: 0.8125rem;
      gap: 0.5rem;
    }
    & img {
      width: 2rem;
      height: 2rem;
    }
  }
  @media (min-width: 701px) {
    & {
      font-size: 15px;
      gap: 10px;
    }
    & img {
      width: 32px;
      height: 32px;
    }
  }
`;

export const Footer = styled('footer', {
  label: 'Footer',
  target: 'e-t-5',
})(
  ({ theme }) => css`
    & {
      padding: clamp(1.75rem, 3vw, 2.5rem)
        max(var(--page-gutter), calc((100% - var(--page-max-width)) / 2 + var(--page-gutter)));
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: var(--section-gap);
      background: ${theme.colors.background.elevated};
      border-top: 1px solid ${theme.colors.line.alternative};
    }
  `,
);

export const Brand = styled('div', {
  label: 'Brand',
  target: 'e-t-6',
})(
  ({ theme }) => css`
    & {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    & > p {
      color: ${theme.colors.label.alternative};
      font-size: 0.875rem;
      line-height: 1.375rem;
    }
    & > small {
      color: ${theme.colors.label.assistive};
      font-size: 0.75rem;
      line-height: 1.125rem;
    }
  `,
);

export const Logo = styled(Link, {
  label: 'Logo',
  target: 'e-t-7',
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})`
  & {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 2.25rem;
  }
`;

export const Team = styled('div', {
  label: 'Team',
  target: 'e-t-8',
})(
  ({ theme }) => css`
    & h2 {
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: ${theme.colors.label.neutral};
      margin-bottom: 1rem;
    }
    & ul {
      display: flex;
      gap: 0.75rem;
    }
    & li {
      display: flex;
      padding: 0.875rem 1.125rem 0.875rem 0.875rem;
      gap: 0.75rem;
      align-items: center;
      background: ${theme.colors.fill.normal};
      border: 1px solid ${theme.colors.line.alternative};
      border-radius: 1rem;
    }
    @media (max-width: 1250px) {
      & ul {
        flex-wrap: wrap;
      }
    }
    @media (max-width: 700px) {
      & {
        width: 100%;
      }
      & ul {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.625rem;
      }
      & li {
        padding: 0.75rem 0.875rem;
      }
    }
  `,
);

export const MemberName = styled('div', {
  label: 'MemberName',
  target: 'e-t-9',
})`
  & {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 1rem;
    line-height: 1.5rem;
    white-space: nowrap;
  }
  & > span {
    border-radius: 62.4375rem;
    padding: 2px 0.5rem;
    background: ${colors.fill.strong};
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1rem;
  }
  @media (max-width: 700px) {
    & {
      font-size: 0.875rem;
    }
  }
`;

export const Github = styled('div', {
  label: 'Github',
  target: 'e-t-a',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      margin-top: 0.25rem;
      color: ${theme.colors.label.alternative};
      font-size: 0.75rem;
      line-height: 1.125rem;
    }
  `,
);
