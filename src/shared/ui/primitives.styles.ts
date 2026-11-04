import styled from '@emotion/styled';
import { css, type Theme } from '@emotion/react';

interface ThemeProps {
  theme: Theme;
}

const mutedText = ({ theme }: ThemeProps) => css`
  color: ${theme.colors.label.alternative};
  font-size: 1rem;
  line-height: 1.625rem;
`;

const headingLayout = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;

  & > button {
    font-size: 1rem;
    font-weight: 700;
    white-space: nowrap;
  }

  @media (max-width: 700px) {
    & > button {
      font-size: 0.8125rem;
    }
  }
`;

const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const Muted = styled('p', { label: 'Muted', target: 'e-s-0' })(mutedText);

export const Heading = styled('div', { label: 'Heading', target: 'e-s-1' })(headingLayout);

export const NoticeHeading = styled('div', { label: 'NoticeHeading', target: 'e-s-2' })(
  headingLayout,
  css`
    padding-bottom: 0.75rem;

    & > div {
      display: flex;
      align-items: center;
      gap: 0.625rem;
    }

    @media (max-width: 700px) {
      padding-bottom: 0.625rem;
    }
  `,
);

export const HiddenText = styled('span', { label: 'HiddenText', target: 'e-s-3' })(visuallyHidden);

export const HiddenCaption = styled('caption', { label: 'HiddenCaption', target: 'e-s-4' })(
  visuallyHidden,
);

export const HiddenHeading = styled('h1', { label: 'HiddenHeading', target: 'e-s-5' })(
  visuallyHidden,
);

export const Description = styled('p', { label: 'Description', target: 'e-s-6' })(
  ({ theme }) => css`
    color: ${theme.colors.label.neutral};
    line-height: 1.8;
    margin: 1.75rem 0;
  `,
);

export const MutedInline = styled('span', { label: 'MutedInline', target: 'e-s-7' })(mutedText);
