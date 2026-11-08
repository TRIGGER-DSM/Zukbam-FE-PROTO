import { colors } from '../../../shared/styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface DayStyleProps {
  $status?: string;
}

export const Content = styled('div', {
  label: 'Content',
  target: 'e-1-0',
})`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.875rem;
  }
  & h2 {
    font-size: 2rem;
    font-weight: 900;
    line-height: 2.625rem;
    letter-spacing: -0.05rem;
    text-align: center;
  }
  @media (max-width: 700px) {
    & {
      gap: 0.75rem;
    }
    & h2 {
      font-size: 1.5rem;
      line-height: 2.125rem;
    }
  }
`;

export const Art = styled('img', {
  label: 'Art',
  target: 'e-1-1',
})`
  & {
    width: 100%;
    height: auto;
    aspect-ratio: 400 / 200;
  }
`;

export const Count = styled('strong', {
  label: 'Count',
  target: 'e-1-2',
})(
  ({ theme }) => css`
    & {
      color: ${theme.colors.status.cautionary};
      font-size: 4.5rem;
      font-weight: 900;
      line-height: 5rem;
      letter-spacing: -0.09375rem;
    }
    @media (max-width: 700px) {
      & {
        font-size: 3.75rem;
        line-height: 4.25rem;
      }
    }
  `,
);

export const Description = styled('p', {
  label: 'Description',
  target: 'e-1-3',
})(
  ({ theme }) => css`
    & {
      font-size: 1rem;
      line-height: 1.625rem;
      color: ${theme.colors.label.alternative};
      text-align: center;
    }
    @media (max-width: 700px) {
      & {
        font-size: 0.8125rem;
        line-height: 1.375rem;
      }
    }
  `,
);

export const Week = styled('ul', {
  label: 'Week',
  target: 'e-1-4',
})(
  ({ theme }) => css`
    & {
      align-self: stretch;
      display: flex;
      gap: 0.375rem;
    }
    & li {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 0.625rem 0 0.75rem;
      border-radius: 0.75rem;
      background: ${theme.colors.fill.normal};
      color: ${theme.colors.label.alternative};
      font-size: 0.875rem;
      font-weight: 700;
      line-height: 1.25rem;
    }
    @media (max-width: 700px) {
      & {
        gap: 0.25rem;
      }
      & li {
        font-size: 0.75rem;
      }
    }
  `,
);

export const Day = styled('li', {
  label: 'Day',
  target: 'e-1-5',
})<DayStyleProps>(
  ({ theme, $status }) => css`
    ${
      $status === 'completed' &&
      css`
        & ${DayMark} {
          border: 0;
          background: ${colors.accent.streakStrong};
          color: ${colors.static.black};
        }
      `
    }
    ${
      $status === 'today' &&
      css`
        ${Week} & {
          color: ${theme.colors.status.cautionary};
        }
      `
    }
  ${
      $status === 'today' &&
      css`
        & ${DayMark} {
          border: 2px solid ${colors.static.white};
          background: ${theme.colors.status.cautionary};
        }
      `
    }
  `,
);

export const DayMark = styled('span', {
  label: 'DayMark',
  target: 'e-1-6',
})`
  & {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 999px;
    border: 2px dashed ${colors.line.normal};
  }
  @media (max-width: 700px) {
    & {
      width: 1.875rem;
      height: 1.875rem;
    }
  }
`;

export const Best = styled('p', {
  label: 'Best',
  target: 'e-1-7',
})(
  ({ theme }) => css`
    & {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: ${theme.colors.label.alternative};
      font-size: 0.875rem;
      line-height: 1.375rem;
      text-align: center;
    }
    @media (max-width: 700px) {
      & {
        font-size: 0.75rem;
        line-height: 1.25rem;
      }
    }
  `,
);

export const Actions = styled('div', {
  label: 'Actions',
  target: 'e-1-8',
})`
  & {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding-top: 0.625rem;
  }
`;

export const Continue = styled('button', {
  label: 'Continue',
  target: 'e-1-9',
})(
  ({ theme }) => css`
    & {
      width: 100%;
      padding: 0.875rem 1.75rem;
      border-radius: 0.875rem;
      background: ${theme.colors.primary.normal};
      box-shadow: 0 0.25rem ${colors.primary.heavy};
      color: ${colors.label.onPrimary};
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.5rem;
    }
    &:active {
      transform: translateY(2px);
      box-shadow: 0 2px ${colors.primary.heavy};
    }
  `,
);

export const Share = styled('button', {
  label: 'Share',
  target: 'e-1-a',
})(
  ({ theme }) => css`
    & {
      color: ${theme.colors.primary.strong};
      font-size: 0.875rem;
      font-weight: 700;
      line-height: 1.25rem;
    }
  `,
);

export const ShareMessage = styled('p', {
  label: 'ShareMessage',
  target: 'e-1-b',
})(
  ({ theme }) => css`
    & {
      max-width: 100%;
      color: ${theme.colors.label.neutral};
      font-size: 0.875rem;
      line-height: 1.375rem;
      text-align: center;
      overflow-wrap: anywhere;
    }
  `,
);
