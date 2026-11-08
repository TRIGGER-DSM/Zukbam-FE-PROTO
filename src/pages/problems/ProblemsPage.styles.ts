import { colors } from '../../shared/styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ProblemAsset } from '../../domains/problem/presentation/ProblemAsset';

interface SortArrowStyleProps {
  $descending?: boolean;
}

export const Page = styled('main', {
  label: 'Page',
  target: 'e-l-0',
})(
  ({ theme }) => css`
    & {
      width: 100%;
      max-width: var(--page-max-width);
      margin-inline: auto;
      padding: clamp(1.5rem, 3vw, 2.5rem) var(--page-gutter) 3rem;
      display: flex;
      flex-direction: column;
      gap: var(--section-gap);
    }
    & input {
      font-family: inherit;
      min-width: 0;
      color: ${colors.static.white};
      font-size: 0.875rem;
      line-height: 1.375rem;
    }
    & select {
      font-family: inherit;
      min-width: 0;
      color: ${colors.static.white};
      font-size: 0.875rem;
      line-height: 1.375rem;
    }
    & input::placeholder {
      color: ${theme.colors.label.assistive};
      opacity: 1;
    }
    & input:focus-visible {
      outline: 2px solid ${theme.colors.primary.strong};
      outline-offset: 0.1875rem;
    }
    & select:focus-visible {
      outline: 2px solid ${theme.colors.primary.strong};
      outline-offset: 0.1875rem;
    }
  `,
);

export const Browse = styled('div', {
  label: 'Browse',
  target: 'e-l-1',
})`
  & {
    display: grid;
    grid-template-columns: clamp(16rem, 25%, 21rem) minmax(0, 1fr);
    gap: var(--section-gap);
  }
  @media (max-width: 850px) {
    & {
      grid-template-columns: 1fr;
    }
  }
`;

export const Results = styled('section', {
  label: 'Results',
  target: 'e-l-2',
})`
  & {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-self: start;
  }
  @media (max-width: 550px) {
    & {
      gap: 1.25rem;
    }
  }
`;

export const Search = styled.form`
  margin: 0;
`;

export const SearchInput = styled.input`
  display: block;
  width: 100%;
  min-width: 0;
  min-height: 5rem;
  padding: 1.625rem 4.5rem;
  border: 1px solid ${colors.line.normal};
  border-radius: 1.25rem;
  outline: none;
  appearance: none;
  color: ${colors.label.normal};
  font: inherit;
  font-size: 1rem;
  line-height: 1.625rem;
  background-color: ${colors.background.alternative};
  background-image: url('/images/problems/search.svg'), url('/images/problems/arrow.svg');
  background-repeat: no-repeat;
  background-position:
    left 1.75rem center,
    right 1.75rem center;
  background-size: 1.75rem;

  &::placeholder {
    color: ${colors.label.assistive};
    opacity: 1;
  }

  &:focus {
    border-color: ${colors.primary.strong};
  }

  @media (max-width: 550px) {
    min-height: 3.75rem;
    padding: 1.125rem 3rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    line-height: 1.375rem;
    background-position:
      left 1rem center,
      right 1rem center;
    background-size: 1.375rem;
  }
`;

export const Count = styled('p', {
  label: 'Count',
  target: 'e-l-4',
})(
  ({ theme }) => css`
    & {
      padding-top: 0.5rem;
      display: flex;
      gap: 0.375rem;
      color: ${theme.colors.label.alternative};
      font-size: 1rem;
      line-height: 1.625rem;
    }
    & strong {
      color: ${colors.static.white};
    }
    @media (max-width: 550px) {
      & {
        font-size: 0.875rem;
      }
    }
  `,
);

export const Sort = styled('div', {
  label: 'Sort',
  target: 'e-l-5',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      border-top: 1px solid ${theme.colors.line.alternative};
      padding-top: 1.5rem;
    }
    & > strong {
      font-size: 1rem;
      line-height: 1.625rem;
    }
    @media (max-width: 1200px) {
      & {
        gap: 0.875rem;
        overflow-x: auto;
        padding-bottom: 2px;
      }
      & > strong {
        flex-shrink: 0;
      }
    }
    @media (max-width: 550px) {
      & {
        gap: 0.875rem;
        padding-top: 1.25rem;
      }
      & > strong {
        font-size: 0.875rem;
      }
    }
  `,
);

export const SortButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  position: relative;
  padding-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.25rem;
  color: ${({ theme }) => theme.colors.label.alternative};
  white-space: nowrap;

  &[aria-pressed='true'] {
    color: ${colors.static.white};
  }

  &[aria-pressed='true']::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    height: 2px;
    border-radius: 1px;
    background: ${({ theme }) => theme.colors.primary.normal};
  }

  @media (max-width: 1200px) {
    font-size: 0.75rem;
  }
`;

export const SortArrow = styled(ProblemAsset, {
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<SortArrowStyleProps>`
  rotate: ${({ $descending }) => ($descending ? '180deg' : 'none')};
`;

export const Pagination = styled('nav', {
  label: 'Pagination',
  target: 'e-l-7',
})(
  ({ theme }) => css`
    & {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.375rem;
      padding-top: 0.5rem;
    }
    & > span {
      color: ${theme.colors.label.alternative};
      font-size: 0.875rem;
      font-weight: 700;
    }
    @media (max-width: 550px) {
      & {
        gap: 0.3125rem;
      }
      & > span {
        font-size: 0.75rem;
      }
    }
  `,
);

export const PageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.colors.fill.normal};
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.label.neutral};

  &[aria-current='page'] {
    color: ${colors.label.onPrimary};
    background: ${({ theme }) => theme.colors.primary.normal};
  }

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }

  @media (max-width: 550px) {
    width: 2rem;
    height: 2.125rem;
    border-radius: 0.625rem;
    font-size: 0.75rem;
  }
`;
