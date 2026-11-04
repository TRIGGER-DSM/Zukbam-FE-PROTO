import { colors } from '../../../shared/styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Card = styled('section', {
  label: 'Card',
  target: 'e-2-0',
})(
  ({ theme }) => css`
    & {
      background: ${theme.colors.background.elevated};
      border: 1px solid ${theme.colors.line.alternative};
      border-radius: 1.25rem;
      min-width: 0;
    }
    & {
      padding: 1.75rem 1.5rem 1.25rem;
    }
    & li {
      border-top: 1px solid ${theme.colors.line.alternative};
    }
    & li button {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 1rem;
      padding: 0.8125rem 0;
      font-size: 1rem;
      line-height: 1.875rem;
      text-align: left;
    }
    @media (max-width: 1250px) {
      & li button {
        line-height: 1.625rem;
      }
    }
    @media (max-width: 700px) {
      & {
        border-radius: 1rem;
      }
    }
    @media (max-width: 700px) {
      & {
        padding: 1.25rem 1rem 0.625rem;
      }
    }
    @media (max-width: 700px) {
      & li button {
        font-size: 0.8125rem;
        gap: 0.625rem;
      }
    }
    @media (min-width: 701px) {
      & {
        padding: 1.25rem;
      }
    }
  `,
);

export const Bell = styled('span', {
  label: 'Bell',
  target: 'e-2-1',
})(
  () => css`
    & {
      display: grid;
      place-items: center;
      width: 2.75rem;
      height: 2.75rem;
      background: ${colors.fill.strong};
      border-radius: 50%;
    }
    @media (max-width: 700px) {
      & {
        width: 2.25rem;
        height: 2.25rem;
      }
    }
  `,
);

export const Date = styled('span', {
  label: 'Date',
  target: 'e-2-2',
})(
  ({ theme }) => css`
    & {
      color: ${theme.colors.label.assistive};
      flex-shrink: 0;
    }
  `,
);

export const Name = styled('span', {
  label: 'Name',
  target: 'e-2-3',
})(
  () => css`
    & {
      flex: 1;
      min-width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `,
);

export const NewBadge = styled('span', {
  label: 'NewBadge',
  target: 'e-2-4',
})(
  ({ theme }) => css`
    & {
      padding: 2px 0.375rem;
      border-radius: 62.4375rem;
      color: ${colors.static.black};
      background: ${theme.colors.primary.normal};
      font-size: 0.75rem;
      font-weight: 700;
      line-height: 1rem;
    }
  `,
);
